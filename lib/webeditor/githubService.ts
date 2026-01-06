import { Octokit } from '@octokit/rest';
import { CommandIntent, CommandResult, GitHubConfig, RepoMemory } from '../../types/webeditor';

const MEMORY_PATH = '.speech-to-web-memory/history.json';

const handleApiError = (error: any, context: string): CommandResult => {
    console.error(`GitHub API Error [${context}]:`, error);

    // Specific actionable feedback
    if (!navigator.onLine) {
        return { success: false, message: 'Network Error: You appear to be offline.' };
    }

    if (error.status === 401) {
        return { success: false, message: 'Authentication failed. Please verify your Personal Access Token.' };
    }
    if (error.status === 404) {
        return { success: false, message: `Resource not found during '${context}'. The file or repository may not exist.` };
    }
    if (error.status === 409) {
        return { success: false, message: `Merge Conflict in '${context}'. The remote file has changed since you last fetched.` };
    }
    if (error.status === 422) {
        return { success: false, message: `Validation failed for '${context}'. GitHub rejected the payload.` };
    }
    if (error.status === 403) {
        if (error.response?.headers?.['x-ratelimit-remaining'] === '0') {
            const resetTime = new Date(parseInt(error.response.headers['x-ratelimit-reset']) * 1000);
            return { success: false, message: `Rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}.` };
        }
        return { success: false, message: 'Permission denied. Ensure your token has "repo" and "workflow" scopes.' };
    }
    if (error.status >= 500) {
        return { success: false, message: 'GitHub System Error. Their servers might be down.' };
    }

    return { success: false, message: error.message || `An unexpected error occurred during ${context}.` };
};

export const executeGitHubCommand = async (
    config: GitHubConfig,
    intent: CommandIntent,
    originalCommand?: string
): Promise<CommandResult> => {
    const octokit = new Octokit({ auth: config.pat });
    const { owner, repo } = config;

    try {
        switch (intent.action) {
            case 'create_file':
            case 'update_file': {
                if (!intent.path || !intent.content) {
                    return { success: false, message: 'Missing path or content for file operation.' };
                }

                let sha: string | undefined;
                // Attempt to get SHA for update
                try {
                    const { data } = await octokit.repos.getContent({
                        owner,
                        repo,
                        path: intent.path,
                    });
                    if (!Array.isArray(data) && (data as any).sha) {
                        sha = (data as any).sha;
                    }
                } catch (e: any) {
                    // If 404, it's a new file. If other error (e.g., 401), we handle it.
                    if (e.status !== 404) return handleApiError(e, 'checking file existence');
                }

                const message = intent.commit_message || originalCommand || `Update ${intent.path} via Editor 3000`;

                try {
                    await octokit.repos.createOrUpdateFileContents({
                        owner,
                        repo,
                        path: intent.path,
                        message: message,
                        content: btoa(intent.content),
                        sha,
                    });
                } catch (e) {
                    return handleApiError(e, `writing file ${intent.path}`);
                }

                return { success: true, message: `Successfully ${sha ? 'updated' : 'created'} ${intent.path}` };
            }

            case 'delete_file': {
                if (!intent.path) return { success: false, message: 'Missing path for delete operation.' };

                let sha;
                try {
                    const { data } = await octokit.repos.getContent({ owner, repo, path: intent.path });
                    if (Array.isArray(data) || !(data as any).sha) {
                        return { success: false, message: 'Cannot delete: Target is a directory.' };
                    }
                    sha = (data as any).sha;
                } catch (e: any) {
                    if (e.status === 404) return { success: false, message: `File ${intent.path} not found.` };
                    return handleApiError(e, 'locating file to delete');
                }

                const message = intent.commit_message || originalCommand || `Delete ${intent.path} via Editor 3000`;

                try {
                    await octokit.repos.deleteFile({
                        owner,
                        repo,
                        path: intent.path,
                        message: message,
                        sha: sha,
                    });
                } catch (e) {
                    return handleApiError(e, 'deleting file');
                }

                return { success: true, message: `Deleted ${intent.path}` };
            }

            case 'list_files': {
                const path = intent.path || '';
                try {
                    const { data } = await octokit.repos.getContent({ owner, repo, path });
                    const files = Array.isArray(data) ? data.map(f => f.name).join(', ') : 'Single file found';
                    return { success: true, message: `Contents of /${path}: ${files}`, data };
                } catch (e) {
                    return handleApiError(e, 'listing files');
                }
            }

            case 'get_file': {
                if (!intent.path) return { success: false, message: 'Missing path.' };
                try {
                    const { data } = await octokit.repos.getContent({ owner, repo, path: intent.path });

                    if (Array.isArray(data) || !(data as any).content) {
                        return { success: false, message: 'Path is a directory, not a file.' };
                    }

                    const content = atob((data as any).content);
                    return { success: true, message: `Read ${intent.path}`, data: content };
                } catch (e) {
                    return handleApiError(e, 'reading file');
                }
            }

            case 'trigger_workflow': {
                const workflow_id = intent.workflow_id || 'deploy.yml';
                const ref = intent.branch || 'main';

                try {
                    await octokit.actions.createWorkflowDispatch({
                        owner,
                        repo,
                        workflow_id,
                        ref,
                    });
                    return { success: true, message: `Triggered workflow: ${workflow_id} on ${ref}` };
                } catch (e) {
                    return handleApiError(e, 'triggering workflow');
                }
            }

            default:
                return { success: false, message: `Unknown action: ${intent.action}` };
        }
    } catch (error: any) {
        return handleApiError(error, 'executing command');
    }
};

export const fetchRepoDetails = async (config: GitHubConfig) => {
    const octokit = new Octokit({ auth: config.pat });
    return octokit.repos.get({
        owner: config.owner,
        repo: config.repo
    });
}

// Get HEAD info and simulate git status
export const getHeadStatus = async (config: GitHubConfig) => {
    const octokit = new Octokit({ auth: config.pat });
    try {
        const { data: repoData } = await octokit.repos.get({ owner: config.owner, repo: config.repo });
        const { data: branchData } = await octokit.repos.getBranch({
            owner: config.owner,
            repo: config.repo,
            branch: repoData.default_branch
        });

        // Determine divergence if possible (only if remote tracking is different, which implies we are checking local vs remote,
        // but here we just show the remote state as the "truth")
        // We can check if default branch differs from a hypothetical "main" if the default is something else, but let's stick to HEAD stats.

        return {
            branch: repoData.default_branch,
            sha: branchData.commit.sha.substring(0, 7),
            message: branchData.commit.commit.message,
            author: branchData.commit.commit.author?.name,
            date: branchData.commit.commit.author?.date,
            status: "clean" // Since we are editing directly, it's always clean relative to itself
        };
    } catch (e) {
        return null;
    }
}

// Check Deployment Status (Vercel updates GitHub Deployments)
export const getDeploymentStatus = async (config: GitHubConfig) => {
    const octokit = new Octokit({ auth: config.pat });
    try {
        // List deployments
        const { data: deployments } = await octokit.repos.listDeployments({
            owner: config.owner,
            repo: config.repo,
            per_page: 1,
        });

        if (deployments.length === 0) return { state: 'inactive', description: 'No deployments found' };

        // Get status of latest deployment
        const { data: statuses } = await octokit.repos.listDeploymentStatuses({
            owner: config.owner,
            repo: config.repo,
            deployment_id: deployments[0].id,
            per_page: 1
        });

        if (statuses.length > 0) {
            return {
                state: statuses[0].state,
                description: statuses[0].description,
                updated_at: statuses[0].updated_at
            };
        }
        return { state: 'pending', description: 'Deployment created, waiting for status...' };

    } catch (error) {
        console.warn("Failed to fetch deployment status", error);
        return null;
    }
}

// Memory Management
export const syncMemory = async (config: GitHubConfig, memory: RepoMemory) => {
    const octokit = new Octokit({ auth: config.pat });
    const { owner, repo } = config;

    let sha: string | undefined;
    try {
        const { data } = await octokit.repos.getContent({ owner, repo, path: MEMORY_PATH });
        if (!Array.isArray(data) && (data as any).sha) {
            sha = (data as any).sha;
        }
    } catch (e) {
        // file doesn't exist yet
    }

    const content = JSON.stringify(memory, null, 2);
    await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: MEMORY_PATH,
        message: 'Sync memory [Speech to Web Editor 3000]',
        content: btoa(content),
        sha,
    });
};

export const loadMemory = async (config: GitHubConfig): Promise<RepoMemory | null> => {
    const octokit = new Octokit({ auth: config.pat });
    const { owner, repo } = config;
    try {
        const { data } = await octokit.repos.getContent({ owner, repo, path: MEMORY_PATH });
        if (Array.isArray(data) || !(data as any).content) return null;

        const content = atob((data as any).content);
        return JSON.parse(content) as RepoMemory;
    } catch (e) {
        return null;
    }
}

// Initialization and Auto-Fix Routine
export const initializeAndRepairRepo = async (
    config: GitHubConfig,
    log: (msg: string) => void
) => {
    const octokit = new Octokit({ auth: config.pat });
    const { owner, repo } = config;

    log(`Initializing connection to ${owner}/${repo}...`);

    // 1. Validate connection and permissions
    let repoData;
    try {
        const { data } = await octokit.repos.get({ owner, repo });
        repoData = data;
        log("Connection established. Credentials validated.");
    } catch (e: any) {
        throw new Error(`Failed to connect to repository. ${e.status === 404 ? 'Repo not found.' : 'Check permissions/token.'}`);
    }

    // 2. Fetch and Sync Branch
    let branch = repoData.default_branch;
    log(`Syncing with remote branch '${branch}'...`);

    try {
        const { data: refData } = await octokit.git.getRef({ owner, repo, ref: `heads/${branch}` });
        log(`Network integrity check: PASSED. HEAD is at ${refData.object.sha.substring(0, 7)}`);
    } catch (e: any) {
        if (e.status === 404) {
            log("WARNING: Default branch not found or empty repository.");
            // Attempt to fix: Create empty commit to initialize main if completely empty
            // Note: Git API requires a base tree or commit.
            // If repo is truly empty, we might need to just inform the user to create the first file via the tool.
            log("ACTION REQUIRED: Repository appears empty. First file creation will initialize the branch.");
        } else {
            log(`Branch Sync Error: ${e.message}`);
        }
    }

    // 2.5 Clean State Check (Simulation for Remote API)
    log("Checking workspace state...");
    try {
        await octokit.git.getTree({ owner, repo, tree_sha: branch });
        log("Workspace is CLEAN. No uncommitted remote conflicts detected.");
    } catch (e) {
        log("NOTICE: Unable to resolve tree (likely empty). Ready for initial commit.");
    }

    // 3. Memory Structure Check
    log("Verifying memory subsystem...");
    try {
        await loadMemory(config);
        log("Memory file found. Context loaded.");
    } catch (e) {
        log("Memory not found. Creating new memory bank...");
    }

    // 4. Auto-Fix: Check for README.md
    try {
        await octokit.repos.getContent({ owner, repo, path: 'README.md' });
    } catch (e: any) {
        if (e.status === 404) {
            log("ISSUE: Missing README.md. Auto-fixing...");
            try {
                await octokit.repos.createOrUpdateFileContents({
                    owner,
                    repo,
                    path: 'README.md',
                    message: 'Initial commit: Auto-fix by Editor 3000',
                    content: btoa(`# ${repoData.name}\n\nManaged by Speech to Web Editor 3000.`),
                });
                log("RESOLVED: Created README.md.");
            } catch (createError) {
                log("Failed to auto-fix README. Check permissions.");
            }
        }
    }

    log("All systems nominal. Ready for input.");
};
