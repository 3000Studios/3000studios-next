# Automation Infrastructure

This repository implements a fully automated, self-validating, self-healing CI/CD pipeline.

## Pre-Commit Automation

**Husky + lint-staged** automatically runs on every commit:

- Formats code with Prettier
- Fixes lint issues with ESLint
- Enforces conventional commit messages

### Setup

Pre-commit hooks are automatically installed via `pnpm install` (runs `prepare` script).

### Manual Trigger

```bash
pnpm run fix
```

## Continuous Integration

**GitHub Actions** workflow (`.github/workflows/ci-cd.yml`) runs on every push and PR:

1. **Validate & Auto-Fix**
   - Format check → auto-format if needed
   - Lint → auto-fix if possible
   - Type check (strict)
   - Auto-commit fixes back to branch

2. **Build**
   - Validate app structure
   - Build Next.js application
   - Upload artifacts

3. **Deploy** (main branch only)
   - Deploy to Vercel production
   - Health check
   - Auto-rollback on failure

## Dependency Management

**Automated weekly updates** (`.github/workflows/dependency-update.yml`):

- Updates all dependencies to latest compatible versions
- Runs full test suite
- Creates PR if successful

## Security Scanning

**CodeQL** runs weekly to detect security vulnerabilities.

## Commands

```bash
# Development
pnpm dev                 # Start dev server

# Validation
pnpm run lint            # Lint (warnings allowed)
pnpm run lint:strict     # Lint (no warnings)
pnpm run lint:fix        # Auto-fix lint issues
pnpm run format          # Format all files
pnpm run format:check    # Check formatting
pnpm run type-check      # TypeScript validation
pnpm run validate        # Run all checks

# Fixes
pnpm run fix             # Format + lint fix

# Build
pnpm run build           # Production build

# Testing
pnpm test                # Run tests
pnpm test:ui             # Test UI
```

## Deployment

Deployments are fully automatic:

1. Push to `main` branch
2. CI validates and builds
3. Deploys to Vercel production
4. Health check verifies deployment
5. Auto-rollback if health check fails

### Manual Deployment

Not recommended, but available:

```bash
vercel --prod
```

## Configuration Files

- `.husky/` - Git hooks
- `.github/workflows/` - CI/CD pipelines
- `package.json` - Scripts and lint-staged config
- `.prettierrc.json` - Code formatting rules
- `eslint.config.mjs` - Linting rules
- `tsconfig.json` - TypeScript configuration

## Safety Mechanisms

1. **Pre-commit validation** - Prevents bad commits
2. **Conventional commits** - Enforces commit message format
3. **Auto-formatting** - Ensures consistent code style
4. **Type checking** - Catches type errors before deployment
5. **Build validation** - Ensures app builds successfully
6. **Health checks** - Verifies deployment is working
7. **Auto-rollback** - Reverts failed deployments

## Maintenance

The system is self-maintaining:

- Dependencies update automatically
- Code formatting is automatic
- Lint issues are auto-fixed where possible
- Failed deployments rollback automatically

No manual intervention required for normal operations.
