# Publishing Packages

This repository uses [Changesets](https://github.com/changesets/changesets) for version management and publishing packages to NPM.

## Published Packages

The following packages are published to NPM:
- `@adobe/uix-commons-contract` (shared dependency)
- `@adobe/uix-cf-admin-contract`
- `@adobe/uix-cf-editor-contract`
- `@adobe/uix-universal-editor-contract`

Note: `@adobe/uix-commons-contract` is also published because the other three packages depend on it.

## Workflow

### 1. Making Changes

When you make changes to one or more packages that need to be published:

```bash
# After making your changes, create a changeset
pnpm changeset
```

This will prompt you to:
1. Select which packages have changed
2. Choose the type of change (major, minor, or patch)
3. Write a summary of the changes

The changeset will be saved as a markdown file in the `.changeset` directory.

### 2. Versioning

When changes are pushed to the `main` branch, the GitHub Actions workflow will:
- Detect any changesets
- Create or update a "Version Packages" pull request
- The PR will update package versions and CHANGELOG files based on all pending changesets

### 3. Publishing

When you merge the "Version Packages" pull request:
- The GitHub Actions workflow will automatically publish the updated packages to NPM
- Changesets will be consumed and removed
- Git tags will be created for the new versions

### 4. Manual Trigger

You can also manually trigger the publish workflow from the GitHub Actions UI:
1. Go to the "Actions" tab in GitHub
2. Select the "Publish Packages" workflow
3. Click "Run workflow"

## Manual Publishing (Local)

If needed, you can also publish manually from your local machine:

```bash
# 1. Make sure you have the NPM token set
export NPM_TOKEN=your_npm_token_here

# 2. Build all packages
pnpm run build

# 3. Publish (this will prompt for OTP if 2FA is enabled)
pnpm run release
```

## Changeset Types

- **Patch** (0.0.x): Bug fixes and minor changes
- **Minor** (0.x.0): New features that are backward compatible
- **Major** (x.0.0): Breaking changes

## Example Changeset

```markdown
---
"@adobe/uix-cf-admin-contract": minor
"@adobe/uix-cf-editor-contract": minor
---

Add new field validation API
```

## Configuration

The publishing workflow is configured in:
- `.github/workflows/publish.yml` - GitHub Actions workflow
- `.changeset/config.json` - Changesets configuration
- `.npmrc` - NPM registry authentication
- Root `package.json` - Scripts for version and release

## NPM Token

The workflow uses the `ADOBE_BOT_NPM_TOKEN` repository secret for authentication with NPM. Make sure this secret is configured in your repository settings.

## What if I Forget to Create a Changeset?

### Prevention: CI Check

A GitHub Actions workflow (`changeset-check.yml`) runs on pull requests that modify publishable packages. It will **fail the CI check** if:
- You modify a package in `packages/commons-contract/`, `packages/cf-admin-contract/`, `packages/cf-editor-contract/`, or `packages/universal-editor/`
- AND there's no changeset in the `.changeset` directory

This prevents merging PRs without changesets.

### If Already Merged Without a Changeset

If changes are already on `main` without a changeset:

1. **Create a changeset now**:
   ```bash
   git checkout main
   git pull
   pnpm changeset
   ```

2. **Commit and push**:
   ```bash
   git add .changeset
   git commit -m "chore: add missing changeset"
   git push origin main
   ```

3. The next workflow run will pick up the changeset and create the Version Packages PR.

### Intentional Changes Without Publishing

If you make changes that shouldn't trigger a release (e.g., internal refactoring, tests):

```bash
# Create an empty changeset to satisfy the CI check
pnpm changeset --empty
```

This documents that the lack of version bump is intentional.

