# Migrating Jenkins Pipeline to GitHub Action - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Backup-and-Configuration-Management/Migrating-Jenkins-Pipeline-to-GitHub-Action)

---

## Table of Contents

- Migrating Jenkins Pipeline to GitHub Action
  - Table of Contents
  - Prerequisites
  - Install GitHub CLI & Importer
  - Authenticate GitHub CLI
  - Generate and Configure Tokens
  - Configure the Importer
  - Update the Importer
  - Dry-Run a Pipeline Migration
  - Migrate to GitHub Actions
  - Verify the Workflow
  - Conclusion & References
  - Links and References
  - Watch Video
    - On Debian/Ubuntu
    - Add the Actions Importer Extension
    - 1. GitHub Personal Access Token (Classic)
    - 2. Jenkins API Token

---

## Content

Advanced Jenkins

Backup and Configuration Management

# Migrating Jenkins Pipeline to GitHub Action

Learn how to seamlessly migrate your existing Jenkins jobs into GitHub Actions workflows using the GitHub Actions Importer CLI extension. This guide walks you through installation, configuration, and execution, so you can automate CI/CD with GitHub’s native tooling.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Install GitHub CLI & Importer](#install-github-cli--importer)
3.  [Authenticate GitHub CLI](#authenticate-github-cli)
4.  [Generate and Configure Tokens](#generate-and-configure-tokens)
5.  [Configure the Importer](#configure-the-importer)
6.  [Update the Importer](#update-the-importer)
7.  [Dry-Run a Pipeline Migration](#dry-run-a-pipeline-migration)
8.  [Migrate to GitHub Actions](#migrate-to-github-actions)
9.  [Verify the Workflow](#verify-the-workflow)
10. [Conclusion & References](#conclusion--references)

---

## Prerequisites

Before starting the migration, ensure you have the following resources in place:

| Resource                        | Purpose                                                    |
| ------------------------------- | ---------------------------------------------------------- |
| Jenkins account or organization | Source of pipelines/jobs to migrate                        |
| Jenkins personal API token      | Grants API access to read pipeline definitions             |
| Docker                          | Required to run the Importer CLI in a container (optional) |
| GitHub CLI (`gh`) v2+           | Manages GitHub authentication and extensions               |
| GitHub Personal Access Token    | Requires the `workflow` scope for creating workflows       |

> [!important]
> **Warning**
>
> The importer cannot migrate **scripted pipelines**, secrets, or unknown plugins. Make sure your Jenkins jobs use declarative pipelines or simple freestyle jobs.

![The image shows a GitHub documentation page about migrating from Jenkins to GitHub Actions using the GitHub Actions Importer. It includes prerequisites, limitations, and installation instructions for the CLI extension.](https://kodekloud.com/kk-media/image/upload/v1752868818/notes-assets/images/Advanced-Jenkins-Migrating-Jenkins-Pipeline-to-GitHub-Action/github-actions-migration-jenkins-docs.jpg)

---

## Install GitHub CLI & Importer

### On Debian/Ubuntu

```
# 1. Install prerequisites
type -p wget >/dev/null || sudo apt update && sudo apt-get install -y wget


# 2. Add GitHub CLI apt repository
sudo mkdir -p /etc/apt/keyrings
wget -qO- https://cli.github.com/packages/githubcli-archive-keyring.gpg \
  | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg
sudo chmod 644 /etc/apt/keyrings/githubcli-archive-keyring.gpg


echo \
  "deb [arch=$(dpkg --print-architecture) \
  signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] \
  https://cli.github.com/repos/cli/cli/releases stable main" \
  | sudo tee /etc/apt/sources.list.d/github-cli.list >/dev/null


sudo apt update && sudo apt install -y gh
```

### Add the Actions Importer Extension

```
gh extension install github/gh-actions-importer
```

Verify the installation:

```
gh actions-importer --help
```

---

## Authenticate GitHub CLI

Login interactively to GitHub:

```
gh auth login
```

Follow the browser prompts to complete authentication.

![The image shows a GitHub authorization page where the GitHub CLI is requesting access to a user's account, with options to authorize or cancel the request. Various permissions and organization accesses are listed.](https://kodekloud.com/kk-media/image/upload/v1752868820/notes-assets/images/Advanced-Jenkins-Migrating-Jenkins-Pipeline-to-GitHub-Action/github-cli-authorization-page.jpg)

---

## Generate and Configure Tokens

### 1\. GitHub Personal Access Token (Classic)

1.  Navigate to **Settings → Developer settings → Personal access tokens → Tokens (classic)**
2.  Click **Generate new token**, name it (e.g. `jenkins-importer`), and select the `workflow` scope
3.  Copy the token for later use

![The image shows a GitHub settings page for creating a new personal access token, with various scopes and options selected. The note field indicates "jenkins-importer," and a message states that the note has already been taken.](https://kodekloud.com/kk-media/image/upload/v1752868821/notes-assets/images/Advanced-Jenkins-Migrating-Jenkins-Pipeline-to-GitHub-Action/github-personal-access-token-settings.jpg)

### 2\. Jenkins API Token

1.  Sign in to Jenkins and go to **Manage Jenkins → Users**
2.  Select your user and click **Configure**
3.  Under **API Token**, select **Add new Token**, name it (e.g. `GitHub Importer`), then generate and copy it

![The image shows a Jenkins dashboard interface with a list of build jobs, their statuses, and options for managing Jenkins projects. The sidebar includes navigation options like "Build History" and "Manage Jenkins."](https://kodekloud.com/kk-media/image/upload/v1752868822/notes-assets/images/Advanced-Jenkins-Migrating-Jenkins-Pipeline-to-GitHub-Action/jenkins-dashboard-build-jobs.jpg)

![The image shows a Jenkins user configuration page with fields for full name, description, and API token management. The interface includes options to save or apply changes.](https://kodekloud.com/kk-media/image/upload/v1752868823/notes-assets/images/Advanced-Jenkins-Migrating-Jenkins-Pipeline-to-GitHub-Action/jenkins-user-configuration-page.jpg)

![The image shows a configuration screen for a user named "siddharth" with sections for description and API tokens. It includes options to add new tokens and a warning about copying tokens securely.](https://kodekloud.com/kk-media/image/upload/v1752868824/notes-assets/images/Advanced-Jenkins-Migrating-Jenkins-Pipeline-to-GitHub-Action/siddharth-configuration-api-tokens.jpg)

---

## Configure the Importer

Run the configuration command:

```
gh actions-importer configure
```

When prompted, enter:

- **GitHub Personal Access Token**
- **GitHub Base URL**: `https://github.com`
- **Jenkins Personal Access Token**
- **Jenkins Username**
- **Jenkins Base URL** (e.g. `http://your.jenkins.server:8080`)

Successful output:

```
Environment variables successfully updated.
```

---

## Update the Importer

Keep your extension up-to-date:

```
gh actions-importer update
```

Example output:

```
ghcr.io/actions-importer/cli:latest up-to-date
```

---

## Dry-Run a Pipeline Migration

Preview the generated workflow YAML locally without pushing changes:

```
gh actions-importer dry-run jenkins \
  --source-url http://your.jenkins.server:8080/job/Generate%20ASCII%20Artwork/ \
  --output-dir tmp/dry-run
```

On success, inspect the file:

```
tmp/dry-run/Generate_ASCII_Artwork/.github/workflows/generate_ascii_artwork.yml
```

```
# tmp/dry-run/Generate_ASCII_Artwork/.github/workflows/generate_ascii_artwork.yml
name: Generate_ASCII_Artwork
on:
  workflow_dispatch:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Run command
        shell: bash
        run: |
          curl -s https://api.adviceslip.com/advice > advice.json
          jq -r .slip.advice advice.json > advice.message
          [[ $(wc -w < advice.message) -gt 5 ]] || { echo "Advice has 5 words or less"; exit 1; }
          sudo apt-get update && sudo apt-get install -y cowsay
          export PATH="$PATH:/usr/games:/usr/local/games"
          cowsay -f "$(ls /usr/share/cowsay/cows | shuf -n1)" "$(cat advice.message)"
```

---

## Migrate to GitHub Actions

Generate a pull request with the new workflow files:

```
gh actions-importer migrate jenkins \
  --source-url http://your.jenkins.server:8080/job/Generate%20ASCII%20Artwork/ \
  --target-url https://github.com/<owner>/jenkins-to-actions \
  --output-dir tmp/migrate
```

This command creates a PR in the target repository for review and merge.

![The image shows a GitHub repository page titled "jenkins-to-actions," with an initial commit made 16 minutes ago. The repository is public and contains a README file.](https://kodekloud.com/kk-media/image/upload/v1752868825/notes-assets/images/Advanced-Jenkins-Migrating-Jenkins-Pipeline-to-GitHub-Action/jenkins-to-actions-repo-initial-commit.jpg)

![The image shows a GitHub pull request page titled "Convert Generate_ASCII_Artwork to GitHub Actions," with details about the commit and options to merge the request.](https://kodekloud.com/kk-media/image/upload/v1752868826/notes-assets/images/Advanced-Jenkins-Migrating-Jenkins-Pipeline-to-GitHub-Action/github-pull-request-convert-actions.jpg)

Merge the PR to apply the workflow to the `main` branch.

---

## Verify the Workflow

After merging, trigger the workflow manually or via push. Monitor runs in the **Actions** tab:

![The image shows a GitHub Actions interface with a list of workflow runs, including "Update generate_ascii_artwork.yml" and "Generate_ASCII_Artwork," displaying their status and details.](https://kodekloud.com/kk-media/image/upload/v1752868827/notes-assets/images/Advanced-Jenkins-Migrating-Jenkins-Pipeline-to-GitHub-Action/github-actions-workflow-runs-status.jpg)

---

## Conclusion & References

The GitHub Actions Importer CLI accelerates the transition from Jenkins to GitHub’s CI/CD platform. For full details, visit the official documentation.

> [!important]
> **Note**
>
> Enjoy seamless pipeline migration and take advantage of GitHub Actions for robust workflow automation.

## Links and References

- [Migrating from Jenkins to GitHub Actions](https://docs.github.com/en/actions/migrating-from-jenkins)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [Jenkins User Guide](https://www.jenkins.io/doc/)

![The image shows a GitHub documentation page about migrating from Jenkins to GitHub Actions using the GitHub Actions Importer. It includes a sidebar with navigation links and a section detailing prerequisites for the migration process.](https://kodekloud.com/kk-media/image/upload/v1752868829/notes-assets/images/Advanced-Jenkins-Migrating-Jenkins-Pipeline-to-GitHub-Action/github-actions-migration-jenkins.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/6f55f1ac-064a-4aec-a91a-450caaf82d63/lesson/ad83e116-9585-4ed4-9510-3e34ad12a386)**
>
> Watch video content
