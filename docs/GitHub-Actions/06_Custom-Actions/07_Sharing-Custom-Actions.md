# Sharing Custom Actions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Custom-Actions/Sharing-Custom-Actions)

---

## Table of Contents

- Sharing Custom Actions
  - Repository Overview
  - Prerequisites
  - Initial Publishing Attempt
  - Update action.yml Metadata
  - Create a Release
  - Verify Release Downloads
  - View the Marketplace Listing
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Custom Actions

# Sharing Custom Actions

In this lesson, you’ll publish your JavaScript action to the GitHub Marketplace. We’ve already built three custom actions—composite, Docker container, and JavaScript—and now it’s time to share our **PR Giphy Comment** action with the world.

## Repository Overview

Navigate to your repository on GitHub. You should see these key files:

| File         | Purpose                                     |
| ------------ | ------------------------------------------- |
| `.gitignore` | Excludes files from version control         |
| `README.md`  | Project overview and usage instructions     |
| `index.js`   | Entry point for the JavaScript logic        |
| `action.yml` | Metadata for GitHub Actions and Marketplace |

## Prerequisites

Before publishing, make sure you have:

- **Accepted the GitHub Marketplace Terms**
- **Enabled Two-Factor Authentication (2FA)** on your account

> [!important]
> **Note**
>
> GitHub requires 2FA for all Marketplace publishers. If you haven’t set it up yet, follow the prompts under **Settings → Security → Two-factor authentication**.

## Initial Publishing Attempt

When you click **Create new release**, GitHub validates your `action.yml`. Common errors include:

- A non-unique `name` field
- Missing `branding` section (icon or color)

> [!important]
> **Warning**
>
> If you see “Action name must be unique” or “Branding information missing,” update your `action.yml` before you can publish.

## Update action.yml Metadata

Open `action.yml` in your editor and ensure the following fields are defined:

| Field         | Description                                 | Example                              |
| ------------- | ------------------------------------------- | ------------------------------------ |
| `name`        | Unique identifier for your action           | KodeKloud Giphy PR Comment           |
| `description` | Short summary of what the action does       | Add a Giphy GIF comment to PRs       |
| `inputs`      | Required parameters (token, API keys, etc.) | github-token, giphy-api-key          |
| `runs`        | Runtime environment and entry point         | using `node20`, main `dist/index.js` |
| `branding`    | Marketplace icon and color                  | icon `award`, color `green`          |

Here’s a complete example configuration:

```
name: 'KodeKloud Giphy PR Comment'
description: 'Add a Giphy GIF comment to new pull requests.'
inputs:
  github-token:
    description: 'GitHub Token'
    required: true
  giphy-api-key:
    description: 'Giphy API Key'
    required: true
runs:
  using: 'node20'
  main: 'dist/index.js'
branding:
  icon: 'award'
  color: 'green'
```

Commit and push these changes to your feature branch.

## Create a Release

1.  On GitHub, click **Create new release**.
2.  Enter the **Tag** (e.g., `1.0.0-alpha`), **Title** (e.g., _Alpha Release_), and a brief **Description** (e.g., “Demo release for the Giphy PR comment action.”).
3.  Publish the release.

Consider using [Semantic Versioning](https://semver.org/) for your tags.

## Verify Release Downloads

After publishing, the release page will display download links:

- Source code (ZIP)
- Source code (tar.gz)

Ensure both links are available—this confirms your release artifacts are correctly packaged.

## View the Marketplace Listing

Your action is now live! Click the **View it on GitHub Marketplace** link provided on the release page to see the “KodeKloud Giphy PR Comment” listing. You can further enhance your listing by adding:

- Usage examples
- Detailed configuration instructions
- Screenshots or GIFs

We’ll use this published action in one of our upcoming workflows.

## Links and References

- [GitHub Marketplace Documentation](https://docs.github.com/en/marketplace)
- [GitHub Actions Inputs](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#inputs)
- [Semantic Versioning](https://semver.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/cdb7c2b7-442d-440c-a4f1-d6679733ffd8/lesson/21b08919-69f3-41e2-a27c-c86e16822451)**
>
> Watch video content
