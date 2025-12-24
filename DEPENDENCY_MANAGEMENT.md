# Dependency Management Guide

This document outlines best practices for managing dependencies in the 3000Studios Next.js project.

## Overview

We use npm as our package manager with strict version control and lock file management to ensure consistent builds across all environments.

## Configuration

### .npmrc Settings

The project includes an `.npmrc` file with the following configuration:

- `engine-strict=true`: Enforces Node.js version requirements specified in package.json
- `save-exact=false`: Allows compatible version ranges (uses ^ and ~ in package.json)
- `package-lock=true`: Ensures package-lock.json is always generated and updated
- `fund=false`: Suppresses funding messages during install
- `audit=true`: Enables security audits during install

### Node.js Version

The project requires Node.js >= 20.0.0 as specified in package.json engines field.

## Dependency Management Scripts

The following npm scripts are available for dependency management:

### `npm run clean:deps`
Removes node_modules and package-lock.json completely. Use when you need a completely fresh start.

```bash
npm run clean:deps
```

### `npm run fresh:install`
Performs a clean installation by removing existing dependencies and lock file, then reinstalling everything from scratch.

```bash
npm run fresh:install
```

**When to use:**
- After pulling major changes from the repository
- When experiencing unexplained dependency conflicts
- When package-lock.json appears corrupted
- After changing Node.js versions

### `npm run deps:audit`
Runs npm audit and attempts to automatically fix security vulnerabilities by updating dependencies.

```bash
npm run deps:audit
```

**When to use:**
- Regularly as part of maintenance
- When security vulnerabilities are reported
- Before production deployments

### `npm run deps:update`
Updates all dependencies to their latest versions within the version ranges specified in package.json.

```bash
npm run deps:update
```

**When to use:**
- Periodically to keep dependencies up to date
- When you need bug fixes from newer package versions
- As part of regular maintenance (monthly recommended)

## Handling Dependency Updates

### Adding New Dependencies

1. Install the package:
   ```bash
   npm install <package-name>
   ```

2. For development dependencies:
   ```bash
   npm install -D <package-name>
   ```

3. Verify the installation:
   ```bash
   npm run build
   npm run lint
   npm run test
   ```

4. Commit both package.json and package-lock.json

### Updating Existing Dependencies

1. Update to the latest compatible version:
   ```bash
   npm update <package-name>
   ```

2. Update to a specific version:
   ```bash
   npm install <package-name>@<version>
   ```

3. Update all dependencies (within semver ranges):
   ```bash
   npm run deps:update
   ```

4. Always test after updates:
   ```bash
   npm run build
   npm run type-check
   npm run lint
   npm run test
   ```

### Removing Dependencies

1. Remove the package:
   ```bash
   npm uninstall <package-name>
   ```

2. Verify the removal didn't break anything:
   ```bash
   npm run build
   npm run test
   ```

3. Commit the changes

## Resolving Dependency Conflicts

### Peer Dependency Warnings

If you see peer dependency warnings:

1. Check if the warning is critical (npm will indicate if it's blocking)
2. Install the required peer dependency if needed:
   ```bash
   npm install <peer-dependency>@<version>
   ```
3. If the warning is non-critical and expected, document it in this file

### Version Conflicts

When multiple packages require different versions of the same dependency:

1. Try updating packages to their latest versions:
   ```bash
   npm run deps:update
   ```

2. If conflicts persist, check for major version updates:
   ```bash
   npm outdated
   ```

3. Update packages one at a time to identify the source of conflict

4. As a last resort, use overrides in package.json (not recommended unless necessary)

### Lock File Corruption

If package-lock.json appears corrupted or causes issues:

1. Run a fresh installation:
   ```bash
   npm run fresh:install
   ```

2. If issues persist:
   ```bash
   # Delete node_modules and lock file (cross-platform)
   npm run clean:deps
   
   # Clear npm cache
   npm cache clean --force
   
   # Reinstall
   npm install
   ```

3. Verify the installation:
   ```bash
   npm run build
   npm run test
   ```

## Best Practices

### Version Pinning

- **Production dependencies**: Use caret ranges (^) to allow minor and patch updates
- **Critical dependencies**: Consider exact versions if stability is crucial
- **Development dependencies**: More flexible ranges are acceptable

### Regular Maintenance

1. **Weekly**: Run `npm audit` to check for security vulnerabilities
2. **Monthly**: Review and update dependencies with `npm run deps:update`
3. **Quarterly**: Review all dependencies for major version updates

### Before Committing

Always commit both `package.json` and `package-lock.json` together:

```bash
git add package.json package-lock.json
git commit -m "Update dependencies: description of changes"
```

### CI/CD Considerations

- Always use `npm ci` in CI/CD pipelines (not `npm install`)
- `npm ci` is faster and more reliable for automated environments
- It requires a package-lock.json file and will fail if it's missing or inconsistent

### Security

1. **Never commit node_modules** - it's in .gitignore
2. **Always audit dependencies**: Run `npm audit` regularly
3. **Keep dependencies updated**: Outdated packages may have security vulnerabilities
4. **Review dependency changes**: Use `npm ls <package>` to understand the dependency tree

## Troubleshooting

### Build Fails After Install

```bash
# Clear everything and start fresh
npm run fresh:install

# Regenerate Prisma client
npm run postinstall

# Try building
npm run build
```

### Type Errors After Update

```bash
# Check TypeScript
npm run type-check

# May need to update @types packages
npm update @types/node @types/react @types/react-dom
```

### Tests Fail After Update

```bash
# Ensure test dependencies are installed
npm install -D @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm run test
```

### Prisma Issues

```bash
# Regenerate Prisma client
npx prisma generate

# Reset database if needed (CAUTION: destroys data)
npx prisma migrate reset
```

## Getting Help

If you encounter persistent dependency issues:

1. Check the [npm documentation](https://docs.npmjs.com/)
2. Review the package's GitHub issues
3. Try the package's documentation for compatibility notes
4. Clear npm cache: `npm cache clean --force`
5. Try a completely fresh clone of the repository

## Common Package-Specific Notes

### React 19
- Requires compatible versions of React DOM and other React ecosystem packages
- Some third-party libraries may not yet support React 19

### Next.js 16
- Ensure React version compatibility
- Review Next.js upgrade guide for breaking changes

### Prisma
- Always run `npx prisma generate` after installing or updating
- Database migrations may be needed after schema changes

### TypeScript
- Type definitions (@types/*) should match their corresponding package versions
- Running `npm run type-check` helps catch type issues early

## Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
