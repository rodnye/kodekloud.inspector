# Create a Docker Action - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Custom-Actions/Create-a-Docker-Action)

---

## Table of Contents

- Create a Docker Action
  - Table of Contents
  - 1. Giphy REST API
  - 2. GitHub REST API for Comments
  - 3. Creating the Repository
  - 4. Configuring GitHub Secrets
  - 5. Project Structure Overview
  - 6. Dockerfile Configuration
  - 7. Entrypoint Script
  - 8. Action Metadata (action.yml)
  - 9. Test Workflow Setup
  - 10. Opening a Pull Request
  - 11. Verifying the Workflow
  - 12. Reviewing the Bot Comment
  - 13. Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Custom Actions

# Create a Docker Action

In this tutorial, learn how to develop a custom Docker-based GitHub Action that automatically posts a random “Thank You” GIF from Giphy whenever someone opens a pull request. This CI/CD integration covers:

- Triggering on `pull_request` events
- Fetching a random GIF via the Giphy REST API
- Commenting on the pull request with the GitHub REST API

We’ll securely store API keys in GitHub Secrets and encapsulate the entire implementation in a Docker container.

## Table of Contents

1.  [Giphy REST API](#1-giphy-rest-api)
2.  [GitHub REST API for Comments](#2-github-rest-api-for-comments)
3.  [Creating the Repository](#3-creating-the-repository)
4.  [Configuring GitHub Secrets](#4-configuring-github-secrets)
5.  [Project Structure Overview](#5-project-structure-overview)
6.  [Dockerfile Configuration](#6-dockerfile-configuration)
7.  [Entrypoint Script](#7-entrypoint-script)
8.  [Action Metadata (`action.yml`)](#8-action-metadata-actionyml)
9.  [Test Workflow Setup](#9-test-workflow-setup)
10. [Opening a Pull Request](#10-opening-a-pull-request)
11. [Verifying the Workflow](#11-verifying-the-workflow)
12. [Reviewing the Bot Comment](#12-reviewing-the-bot-comment)
13. [Links and References](#13-links-and-references)

---

## 1\. Giphy REST API

Use the Giphy **[Random GIF endpoint](https://developers.giphy.com/docs/api/endpoint#random)** to retrieve a random “thank you” GIF. Store your GIPHY API key in GitHub Secrets and reference it in the action:

```
GET https://api.giphy.com/v1/gifs/random?api_key=<GIPHY_API_KEY>&tag=thank%20you&rating=g
```

A sample JSON response:

```
{
  "data": {
    "images": {
      "original": {
        "url": "https://media1.giphy.com/media/l119IDMNbVsKgyf5u/giphy.gif"
      },
      "downsized": {
        "url": "https://media1.giphy.com/media/l119IDMNbVsKgyf5u/200w_d.gif"
      }
    }
  }
}
```

Extract the GIF URL from `.data.images.downsized.url` using [`jq`](https://stedolan.github.io/jq/).

---

## 2\. GitHub REST API for Comments

To comment on a PR, call GitHub’s **[Create an issue comment](https://docs.github.com/rest/issues/comments#create-an-issue-comment)** endpoint. Issues and pull request comments use the same API.

![The image shows a GitHub documentation page for the REST API, specifically focusing on managing issues, with links to various related actions like listing, creating, and updating issues.](https://kodekloud.com/kk-media/image/upload/v1752876036/notes-assets/images/GitHub-Actions-Certification-Create-a-Docker-Action/github-rest-api-managing-issues.jpg)

| HTTP Method | Endpoint                                                                     | Purpose             |
| ----------- | ---------------------------------------------------------------------------- | ------------------- |
| POST        | `https://api.github.com/repos/{owner}/{repo}/issues/{issue_number}/comments` | Create a PR comment |

Example `curl` command:

```
curl -s -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  https://api.github.com/repos/OWNER/REPO/issues/ISSUE_NUMBER/comments \
  -d '{"body":"Thank you for this contribution! 🎉"}'
```

---

## 3\. Creating the Repository

Initialize a new public repository named `docker-action-pr-giphy-comment` with a `README.md`:

![The image shows a GitHub page for creating a new repository, with fields for the repository name, description, and options for public or private settings.](https://kodekloud.com/kk-media/image/upload/v1752876037/notes-assets/images/GitHub-Actions-Certification-Create-a-Docker-Action/github-new-repository-creation-page.jpg)

After creation, you’ll see the initial commit:

![The image shows a GitHub repository page titled "docker-action-pr-giphy-comment" with an initial commit and a README file. The repository has no stars, forks, or releases.](https://kodekloud.com/kk-media/image/upload/v1752876039/notes-assets/images/GitHub-Actions-Certification-Create-a-Docker-Action/github-repo-docker-action-readme.jpg)

---

## 4\. Configuring GitHub Secrets

Store sensitive information under **Settings > Secrets and variables > Actions**:

![The image shows a GitHub repository settings page where a new secret is being added under "Actions secrets." The secret is named "GIPHY_API_KEY."](https://kodekloud.com/kk-media/image/upload/v1752876040/notes-assets/images/GitHub-Actions-Certification-Create-a-Docker-Action/github-repo-settings-add-secret-giphy-api-key.jpg)

> [!important]
> **Note**
>
> You will add:
>
> - `GIPHY_API_KEY` for the Giphy API
> - Use the built-in `GITHUB_TOKEN` for commenting on PRs

---

## 5\. Project Structure Overview

Your repository should contain the following files:

![The image shows a code editor with a project directory open, displaying files like `action.yml`, `Dockerfile`, and `entrypoint.sh` in a GitHub repository. The `README.md` file is open in the editor pane.](https://kodekloud.com/kk-media/image/upload/v1752876041/notes-assets/images/GitHub-Actions-Certification-Create-a-Docker-Action/code-editor-github-repo-files.jpg)

| File                         | Purpose                            |
| ---------------------------- | ---------------------------------- |
| `Dockerfile`                 | Defines the container environment  |
| `entrypoint.sh`              | Handles the action logic           |
| `action.yml`                 | Action metadata and inputs         |
| `.github/workflows/test.yml` | Workflow to test the action on PRs |

---

## 6\. Dockerfile Configuration

Create a lightweight container with required utilities:

```
FROM alpine:3.10

# Install HTTP client and JSON parser
RUN apk update && apk add --no-cache curl jq

# Copy and set entrypoint script permissions
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
```

---

## 7\. Entrypoint Script

The `entrypoint.sh` script orchestrates:

1.  Reading the PR number from the GitHub event payload
2.  Fetching a random “thank you” GIF
3.  Parsing the GIF URL
4.  Posting a comment on the PR

```
#!/bin/sh

GITHUB_TOKEN=$1
GIPHY_API_KEY=$2

# Get PR number
pr_number=$(jq --raw-output .pull_request.number "$GITHUB_EVENT_PATH")
echo "PR Number: $pr_number"

# Fetch GIF from Giphy
giphy_response=$(curl -s \
  "https://api.giphy.com/v1/gifs/random?api_key=$GIPHY_API_KEY&tag=thank%20you&rating=g")
echo "Giphy Response: $giphy_response"

# Extract GIF URL
gif_url=$(echo "$giphy_response" | jq --raw-output .data.images.downsized.url)
echo "GIF URL: $gif_url"

# Post comment
response=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d "{\"body\": \"Thank you for your contribution! 🎉\n![GIF]($gif_url)\"}" \
  "https://api.github.com/repos/$GITHUB_REPOSITORY/issues/$pr_number/comments")
echo "Comment posted: $(echo "$response" | jq --raw-output .html_url)"
```

---

## 8\. Action Metadata (`action.yml`)

Define inputs and Docker run settings:

```
name: 'Giphy PR Comment'
description: 'Automatically add a thank-you Giphy GIF to pull requests.'
inputs:
  github-token:
    description: 'Token for GitHub API authentication'
    required: true
  giphy-api-key:
    description: 'Secret key for Giphy API'
    required: true
runs:
  using: 'docker'
  image: 'Dockerfile'
  args:
    - ${{ inputs.github-token }}
    - ${{ inputs.giphy-api-key }}
```

---

## 9\. Test Workflow Setup

Configure `.github/workflows/test.yml` to trigger on PR opens:

```
on:
  pull_request:
    types: [opened]

jobs:
  test-giphy-action:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Invoke Giphy PR Comment Action
        uses: ./
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          giphy-api-key: ${{ secrets.GIPHY_API_KEY }}
```

---

## 10\. Opening a Pull Request

Make a small update (e.g., edit `README.md`) in a feature branch to trigger the workflow:

![The image shows a GitHub repository interface where a user is editing the `README.md` file in a project named "docker-action-pr-giphy-comment."](https://kodekloud.com/kk-media/image/upload/v1752876042/notes-assets/images/GitHub-Actions-Certification-Create-a-Docker-Action/github-repo-edit-readme-docker-action.jpg)

Create and submit the PR:

![The image shows a GitHub pull request page for updating a README.md file. It indicates that some checks are pending, and the branch has no conflicts with the base branch.](https://kodekloud.com/kk-media/image/upload/v1752876043/notes-assets/images/GitHub-Actions-Certification-Create-a-Docker-Action/github-pull-request-readme-update.jpg)

---

## 11\. Verifying the Workflow

Monitor the Action run under **Actions**. A successful run indicates:

![The image shows a GitHub Actions interface with a successful workflow run named "testing-action," detailing steps like setting up a job, checking out a repository, and posting a PR comment.](https://kodekloud.com/kk-media/image/upload/v1752876044/notes-assets/images/GitHub-Actions-Certification-Create-a-Docker-Action/github-actions-successful-workflow-testing-action.jpg)

View detailed logs for build and script outputs:

![The image shows a GitHub Actions interface with a successful workflow run for "testing-action," displaying job setup details and steps like "Checkout Repository" and "Post PR Comment."](https://kodekloud.com/kk-media/image/upload/v1752876045/notes-assets/images/GitHub-Actions-Certification-Create-a-Docker-Action/github-actions-successful-workflow-testing-action-2.jpg)

---

## 12\. Reviewing the Bot Comment

Your PR will now contain an automated comment with a thank-you message and a Giphy GIF. 🎉

---

## 13\. Links and References

- [Giphy Random GIF Endpoint](https://developers.giphy.com/docs/api/endpoint#random)
- [GitHub Create an Issue Comment API](https://docs.github.com/rest/issues/comments#create-an-issue-comment)
- [jq Manual](https://stedolan.github.io/jq/)
- [GitHub Actions](https://docs.github.com/actions)

Congratulations! You have built a reusable Docker Action that integrates external APIs to enhance your pull request workflow. Consider publishing this action to the [GitHub Marketplace](https://docs.github.com/actions/creating-actions/publishing-actions-in-github-marketplace) next.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/428391ee-45d0-4e9c-9e06-78d0c5ff7657/lesson/6a13e90c-0182-4cdf-963b-fe5f7186b59b)**
>
> Watch video content
