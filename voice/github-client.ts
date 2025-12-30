/**
 * GITHUB API INTEGRATION FOR VOICE COMMITS
 * Voice commands → GitHub API → Direct commits → Auto-deploy
 */

import { Octokit } from '@octokit/rest';
import { readFileSync } from 'fs';
import { dirname } from 'path';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const REPO_OWNER = '3000studios';
const REPO_NAME = '3000studios-next';
const REPO_BRANCH = 'main';

interface CommitResult {
  success: boolean;
  message: string;
  sha?: string;
  url?: string;
}

/**
 * Get file content from GitHub
 */
async function getFileFromGithub(filePath: string): Promise<string> {
  try {
    const response = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      ref: REPO_BRANCH,
    });

    if (Array.isArray(response.data)) {
      throw new Error('Path is a directory');
    }

    const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
    return content;
  } catch (error) {
    throw new Error(`Failed to get file from GitHub: ${error}`);
  }
}

/**
 * Update file via GitHub API
 */
async function updateFileOnGithub(
  filePath: string,
  newContent: string,
  message: string
): Promise<CommitResult> {
  try {
    // Get current file SHA
    const response = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      ref: REPO_BRANCH,
    });

    if (Array.isArray(response.data)) {
      throw new Error('Path is a directory');
    }

    const sha = response.data.sha;

    // Update file
    const updateResponse = await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      message,
      content: Buffer.from(newContent).toString('base64'),
      sha,
      branch: REPO_BRANCH,
    });

    return {
      success: true,
      message: `File updated: ${filePath}`,
      sha: updateResponse.data.commit.sha,
      url: updateResponse.data.commit.html_url,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to update file: ${error}`,
    };
  }
}

/**
 * Create new file via GitHub API
 */
async function createFileOnGithub(
  filePath: string,
  content: string,
  message: string
): Promise<CommitResult> {
  try {
    const createResponse = await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      message,
      content: Buffer.from(content).toString('base64'),
      branch: REPO_BRANCH,
    });

    return {
      success: true,
      message: `File created: ${filePath}`,
      sha: createResponse.data.commit.sha,
      url: createResponse.data.commit.html_url,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create file: ${error}`,
    };
  }
}

export { getFileFromGithub, updateFileOnGithub, createFileOnGithub };
