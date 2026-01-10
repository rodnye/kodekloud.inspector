# Create a Docker Action - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Custom-Actions/Create-a-Docker-Action)

---

## Table of Contents

- Create a Docker Action
  - External APIs
  - 1. Create the Repository
  - 2. Define the Action Structure
  - 3. Test Your Action
  - 4. Commit, Push, and Trigger
  - Next Steps
  - Links and References
  - Watch Video
    - Giphy API: Random GIF Endpoint
    - GitHub REST API: Post a Comment
    - Add Giphy API Key as a Secret
    - Dockerfile
    - Entrypoint Script (entrypoint.sh)
    - Action Metadata (action.yml)

---

## Content

GitHub Actions

Custom Actions

# Create a Docker Action

In this tutorial, you’ll build a custom Docker Action that:

1.  Triggers when a pull request is opened.
2.  Fetches a random “thank you” GIF from Giphy.
3.  Posts a comment with the GIF on the PR using the GitHub REST API.

This pattern can be adapted to any third-party API integration.

---

## External APIs

We rely on two REST APIs:

| API                                | Endpoint                                                                                        | Purpose                        |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------ |
| Giphy API                          | `https://api.giphy.com/v1/gifs/random?api_key=YOUR_GIPHY_API_KEY&tag=thank%20you&rating=g`      | Get a random “thank you” GIF   |
| GitHub REST API for Issue Comments | [Create an Issue Comment](https://docs.github.com/rest/issues/comments#create-an-issue-comment) | Post comments on PRs or issues |

### Giphy API: Random GIF Endpoint

Request URL:

```
https://api.giphy.com/v1/gifs/random?api_key=YOUR_GIPHY_API_KEY&tag=thank%20you&rating=g
```

Sample response:

```
{
  "data": {
    "type": "gif",
    "id": "l119IDMNbVskgyf5u",
    "images": {
      "original": { "url": "https://media1.giphy.com/media/l119IDMNbVskgyf5u/giphy.gif" },
      "downsized": { "url": "https://media1.giphy.com/media/l119IDMNbVskgyf5u/200.gif" }
    },
    "title": "sci-fi comedy GIF by Ghosted"
  }
}
```

![The image shows the GIPHY Developers API Explorer interface, where users can input sample queries to test the API. It includes options to choose an app/API key, resource, endpoint, and parameters like tag and rating.](https://kodekloud.com/kk-media/image/upload/v1752876566/notes-assets/images/GitHub-Actions-Create-a-Docker-Action/giphy-developers-api-explorer-interface.jpg)

### GitHub REST API: Post a Comment

Use the Issues API to add a comment:

```
curl -s -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -d '{"body":"![GIF](GIF_URL)\nThank you for this contribution!"}' \
  https://api.github.com/repos/OWNER/REPO/issues/ISSUE_NUMBER/comments
```

![The image shows a GitHub documentation page for the REST API, specifically focusing on managing issues, with links to various related actions like creating, updating, and locking issues.](https://kodekloud.com/kk-media/image/upload/v1752876567/notes-assets/images/GitHub-Actions-Create-a-Docker-Action/github-rest-api-managing-issues.jpg)

---

## 1\. Create the Repository

1.  On GitHub, create a new public repo named `docker-action-pr-giphy-comment`.
2.  Initialize with a `README.md`.

![The image shows a GitHub page for creating a new repository, with fields for the repository name, description, and visibility options.](https://kodekloud.com/kk-media/image/upload/v1752876568/notes-assets/images/GitHub-Actions-Create-a-Docker-Action/github-new-repository-creation-page.jpg)

After creation, you’ll see the default commit:

![The image shows a GitHub repository page titled "docker-action-pr-giphy-comment" with an initial commit and a README file. The repository has no stars, forks, or releases.](https://kodekloud.com/kk-media/image/upload/v1752876570/notes-assets/images/GitHub-Actions-Create-a-Docker-Action/github-repo-docker-action-readme.jpg)

### Add Giphy API Key as a Secret

1.  Go to **Settings → Secrets and variables → Actions**.
2.  Add a new secret `GIPHY_API_KEY` with your Giphy API key.

> [!important]
> **Note**
>
> Keep your secrets safe. Never hard-code API keys in your code or Docker image.

![The image shows a GitHub repository settings page where a new secret is being added under "Actions secrets." The secret is named "GIPHY_API_KEY."](https://kodekloud.com/kk-media/image/upload/v1752876570/notes-assets/images/GitHub-Actions-Create-a-Docker-Action/github-repo-settings-actions-secret-giphy-api-key.jpg)

Once saved, the secret appears in the list:

![The image shows a GitHub repository settings page, specifically the "Secrets and variables" section, with a repository secret named "GIPHY_API_KEY" listed.](https://kodekloud.com/kk-media/image/upload/v1752876572/notes-assets/images/GitHub-Actions-Create-a-Docker-Action/github-repo-settings-secrets-giphy-api-key.jpg)

---

## 2\. Define the Action Structure

In your repo root, create:

- `Dockerfile`
- `entrypoint.sh`
- `action.yml`

### Dockerfile

```
FROM alpine:3.10


# Install curl and jq
RUN apk update && apk add --no-cache curl jq


# Copy and set entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


ENTRYPOINT ["/entrypoint.sh"]
```

### Entrypoint Script (`entrypoint.sh`)

This script retrieves a GIF and posts a comment on the PR:

```
#!/bin/sh
set -e


GITHUB_TOKEN=$1
GIPHY_API_KEY=$2


# Get PR number
pr_number=$(jq --raw-output .pull_request.number "$GITHUB_EVENT_PATH")
echo "PR #$pr_number"


# Fetch GIF
response=$(curl -s "https://api.giphy.com/v1/gifs/random?api_key=$GIPHY_API_KEY&tag=thank%20you&rating=g")
gif_url=$(echo "$response" | jq --raw-output .data.images.downsized.url)
echo "GIF URL: $gif_url"


# Post comment
comment=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d "{\"body\":\"### PR #$pr_number\n\n🎉 Thank you for this contribution!\n\n![GIF]($gif_url)\"}" \
  "https://api.github.com/repos/$GITHUB_REPOSITORY/issues/$pr_number/comments")


echo "Comment posted: $(echo "$comment" | jq --raw-output .html_url)"
```

Make it executable:

```
chmod +x entrypoint.sh
```

### Action Metadata (`action.yml`)

```
name: "Giphy PR Comment"
description: "Add a Giphy GIF comment to new pull requests."
inputs:
  github-token:
    description: "GitHub token for API calls"
    required: true
  giphy-api-key:
    description: "Giphy API key"
    required: true
runs:
  using: "docker"
  image: "Dockerfile"
  args:
    - ${{ inputs.github-token }}
    - ${{ inputs.giphy-api-key }}
```

---

## 3\. Test Your Action

Create a test workflow at `.github/workflows/test.yml`:

```
on:
  pull_request:
    types: [opened]


jobs:
  testing-action:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v3


      - name: Post PR comment
        uses: ./
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          giphy-api-key: ${{ secrets.GIPHY_API_KEY }}
```

Create the workflow folder:

```
mkdir -p .github/workflows
```

![The image shows a Visual Studio Code interface with a project open, displaying a file explorer on the left and a README.md file in the main editor area. The project appears to involve Docker and GitHub workflows.](https://kodekloud.com/kk-media/image/upload/v1752876573/notes-assets/images/GitHub-Actions-Create-a-Docker-Action/visual-studio-code-docker-github-workflow.jpg)

---

## 4\. Commit, Push, and Trigger

1.  Commit all changes and push to GitHub.
2.  Edit `README.md` on a new branch and open a pull request.

![The image shows a GitHub repository interface where a user is editing the README.md file in a project named "docker-action-pr-giphy-comment."](https://kodekloud.com/kk-media/image/upload/v1752876574/notes-assets/images/GitHub-Actions-Create-a-Docker-Action/github-repo-editing-readme-docker-action.jpg)

![The image shows a GitHub interface where a user is proposing changes to a README.md file, with options to commit directly or create a new branch.](https://kodekloud.com/kk-media/image/upload/v1752876575/notes-assets/images/GitHub-Actions-Create-a-Docker-Action/github-readme-changes-commit-branch.jpg)

When the PR opens, your action runs automatically:

![The image shows a GitHub Actions interface for a project named "Solar System Workflow," displaying a list of workflow runs with details such as event triggers, status, and branch information.](https://kodekloud.com/kk-media/image/upload/v1752876577/notes-assets/images/GitHub-Actions-Create-a-Docker-Action/github-actions-solar-system-workflow.jpg)

![The image shows a GitHub Actions interface with a successful workflow run named "testing-action," detailing steps like setting up a job, checking out a repository, and posting a PR comment.](https://kodekloud.com/kk-media/image/upload/v1752876578/notes-assets/images/GitHub-Actions-Create-a-Docker-Action/github-actions-successful-workflow-testing-action.jpg)

You’ll see a comment from the `github-actions` bot on your pull request:

![The image shows a GitHub Actions interface with a successful workflow run, displaying logs and details of a "testing-action" job, including environment variables and a Giphy API response.](https://kodekloud.com/kk-media/image/upload/v1752876579/notes-assets/images/GitHub-Actions-Create-a-Docker-Action/github-actions-success-workflow-logs.jpg)

---

## Next Steps

You’ve built and tested a Docker-based GitHub Action that posts Giphy comments on PRs. To take it further:

- Publish your action to the [GitHub Marketplace](https://github.com/marketplace/actions).
- Consume the published action in other repositories.

## Links and References

- [Giphy API Documentation](https://developers.giphy.com/docs/)
- [GitHub REST API: Issues](https://docs.github.com/rest/issues/comments#create-an-issue-comment)
- [GitHub Actions Guide](https://docs.github.com/actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/cdb7c2b7-442d-440c-a4f1-d6679733ffd8/lesson/b96418a4-9ba6-40c9-855c-a2fcd120a5aa)**
>
> Watch video content
