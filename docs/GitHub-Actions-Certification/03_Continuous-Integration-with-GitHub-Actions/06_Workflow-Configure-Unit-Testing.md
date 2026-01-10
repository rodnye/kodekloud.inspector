# Workflow Configure Unit Testing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/Workflow-Configure-Unit-Testing)

---

## Table of Contents

- Workflow Configure Unit Testing
  - 1. Clone the Repository and Create a Feature Branch
  - 2. Open in VS Code and Add Your Workflow
  - 3. Enable the Actions Tab in GitHub
  - 4. Trigger and Inspect the Workflow
  - 5. Configure the Application’s Database Connection
  - 6. Add Environment Variables and Secrets
  - 7. Verify Workflow Success
  - Summary of Workflow Steps
  - References
  - Watch Video
    - 6.1 Add the MONGO_PASSWORD Secret
    - 6.2 Add the MONGO_USERNAME Variable

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# Workflow Configure Unit Testing

In this tutorial, you’ll set up an automated unit testing pipeline for your Node.js Solar System application using GitHub Actions. By the end, every push to `main` or any `feature/*` branch will trigger tests, ensuring code quality and reliability.

## 1\. Clone the Repository and Create a Feature Branch

First, clone your GitHub repository and explore the project structure.

![The image shows a GitHub repository page for a project named "solar-system," displaying a list of files and directories along with commit messages and timestamps. The repository has no stars, forks, or releases.](https://kodekloud.com/kk-media/image/upload/v1752875996/notes-assets/images/GitHub-Actions-Certification-Workflow-Configure-Unit-Testing/github-repo-solar-system-files.jpg)

Now, create a feature branch for your workflow changes:

```
git checkout -b feature/exploring-workflows
```

![The image shows a GitHub repository page for a project named "solar-system," displaying the code files and a branch selection dropdown.](https://kodekloud.com/kk-media/image/upload/v1752875997/notes-assets/images/GitHub-Actions-Certification-Workflow-Configure-Unit-Testing/github-repo-solar-system-code-files.jpg)

## 2\. Open in VS Code and Add Your Workflow

Launch the repository in VS Code (e.g., by editing the URL to `.dev`). Then create a new workflow file at `.github/workflows/solar-system.yml`:

![The image shows a Visual Studio Code interface with the GitHub Actions extension page open, displaying details about the extension and a file explorer on the left.](https://kodekloud.com/kk-media/image/upload/v1752875998/notes-assets/images/GitHub-Actions-Certification-Workflow-Configure-Unit-Testing/vscode-github-actions-extension-interface.jpg)

Paste the following YAML to install Node.js, dependencies, and run tests:

```
name: Solar System Workflow

on:
  workflow_dispatch:
  push:
    branches:
      - main
      - 'feature/*'

jobs:
  unit-testing:
    name: Unit Testing
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm install

      - name: Run Unit Tests
        run: npm test
```

This workflow triggers manually (`workflow_dispatch`) and on every push to `main` or any `feature/*` branch. It uses `actions/setup-node@v3`, which supports parameters like `node-version`, `check-latest`, and `node-version-file`.

![The image shows a GitHub page for the "setup-node" action, detailing its functionality and usage for GitHub Actions, including options for Node.js version management.](https://kodekloud.com/kk-media/image/upload/v1752876000/notes-assets/images/GitHub-Actions-Certification-Workflow-Configure-Unit-Testing/github-setup-node-action-overview.jpg)

> [!important]
> **Note**
>
> Customize `actions/setup-node` by specifying `check-latest: true` to always fetch the latest patch release.

Commit and push your workflow:

```
git add .github/workflows/solar-system.yml
git commit -m "Add unit testing workflow"
git push --set-upstream origin feature/exploring-workflows
```

## 3\. Enable the Actions Tab in GitHub

By default, the Actions tab might be hidden. Open the repository page to confirm:

![The image shows a GitHub repository page named "solar-system" with various files and directories listed, along with options for code management and branch protection.](https://kodekloud.com/kk-media/image/upload/v1752876000/notes-assets/images/GitHub-Actions-Certification-Workflow-Configure-Unit-Testing/github-repo-solar-system-files-2.jpg)

Go to **Settings > Actions > General**, and under **Actions permissions** allow all actions and reusable workflows:

![The image shows the GitHub settings page for a repository named "solar-system," focusing on the "Actions permissions" section. It includes options for enabling or disabling actions and settings for artifact and log retention.](https://kodekloud.com/kk-media/image/upload/v1752876001/notes-assets/images/GitHub-Actions-Certification-Workflow-Configure-Unit-Testing/github-settings-solar-system-actions-permissions.jpg)

After saving, GitHub suggests available workflows:

![The image shows a GitHub Actions setup page with options to configure various workflows like Docker image, Node.js package, and Jekyll using Docker.](https://kodekloud.com/kk-media/image/upload/v1752876002/notes-assets/images/GitHub-Actions-Certification-Workflow-Configure-Unit-Testing/github-actions-workflows-setup-docker.jpg)

> [!important]
> **Warning**
>
> Allowing all actions grants workflows broad permissions. Review [GitHub Actions security best practices](https://docs.github.com/actions/learn-github-actions/security-hardening-your-workflow) before enabling.

## 4\. Trigger and Inspect the Workflow

Push an empty commit to trigger the CI pipeline on your feature branch:

```
git commit --allow-empty -m "Trigger CI"
git push
```

In the **Actions** tab, open the **Unit Testing** run and review the logs:

![The image shows a GitHub Actions interface with a failed unit testing job in a workflow. The job details and logs are displayed, indicating a setup process for Node.js.](https://kodekloud.com/kk-media/image/upload/v1752876003/notes-assets/images/GitHub-Actions-Certification-Workflow-Configure-Unit-Testing/github-actions-failed-unit-test-nodejs.jpg)

The failure indicates missing MongoDB credentials.

## 5\. Configure the Application’s Database Connection

Open `app.js` to see how MongoDB connects:

```
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  user: process.env.MONGO_USERNAME,
  pass: process.env.MONGO_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) {
    console.error("MongoDB connection error:", err);
  }
});
```

You must supply the `MONGO_URI`, `MONGO_USERNAME`, and `MONGO_PASSWORD` via your workflow.

## 6\. Add Environment Variables and Secrets

Update `.github/workflows/solar-system.yml` to define global `env` variables:

```
env:
  MONGO_URI: 'mongodb+srv://supercluster.d83jj.mongodb.net/superData'
  MONGO_USERNAME: ${{ vars.MONGO_USERNAME }}
  MONGO_PASSWORD: ${{ secrets.MONGO_PASSWORD }}
```

The full workflow becomes:

```
name: Solar System Workflow

on:
  workflow_dispatch:
  push:
    branches:
      - main
      - 'feature/*'

env:
  MONGO_URI: 'mongodb+srv://supercluster.d83jj.mongodb.net/superData'
  MONGO_USERNAME: ${{ vars.MONGO_USERNAME }}
  MONGO_PASSWORD: ${{ secrets.MONGO_PASSWORD }}

jobs:
  unit-testing:
    name: Unit Testing
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm install

      - name: Run Unit Tests
        run: npm test
```

### 6.1 Add the `MONGO_PASSWORD` Secret

In **Settings > Secrets and variables > Actions**, click **New repository secret** and add `MONGO_PASSWORD`:

![The image shows a GitHub repository settings page where a new secret named "MONGO_PASSWORD" with the value "SuperPassword" is being added. The interface is dark-themed, and the "Add secret" button is visible.](https://kodekloud.com/kk-media/image/upload/v1752876005/notes-assets/images/GitHub-Actions-Certification-Workflow-Configure-Unit-Testing/github-repo-settings-add-secret-mongo-password.jpg)

### 6.2 Add the `MONGO_USERNAME` Variable

Under **Settings > Secrets and variables > Actions > Variables**, create `MONGO_USERNAME`:

![The image shows a GitHub settings page where a new action variable is being added, with the name "MONGO_USERNAME" and the value "superuser."](https://kodekloud.com/kk-media/image/upload/v1752876006/notes-assets/images/GitHub-Actions-Certification-Workflow-Configure-Unit-Testing/github-settings-new-action-variable.jpg)

Commit and push your changes:

```
git add .github/workflows/solar-system.yml
git commit -m "Define env vars for MongoDB in workflow"
git push
```

## 7\. Verify Workflow Success

After pushing, GitHub Actions will rerun the workflow, connect to MongoDB using your provided credentials, and execute unit tests without errors. All steps—including Node.js setup and `npm test`—should pass.

> [!important]
> **Note**
>
> To retain logs and coverage reports after the run completes, consider uploading test artifacts using [actions/upload-artifact](https://github.com/actions/upload-artifact).

---

## Summary of Workflow Steps

| Step | Description                   | Command / File                             |
| ---- | ----------------------------- | ------------------------------------------ |
| 1    | Create feature branch         | `git checkout -b feature/...`              |
| 2    | Add GitHub Actions workflow   | `.github/workflows/solar-system.yml`       |
| 3    | Enable Actions in repository  | **Settings > Actions > General**           |
| 4    | Trigger CI run                | `git commit --allow-empty -m "Trigger CI"` |
| 5    | Inspect DB config in `app.js` | `mongoose.connect(...)`                    |
| 6    | Define secrets & variables    | GitHub Settings > Secrets and Variables    |
| 7    | Confirm passing unit tests    | **Actions** tab                            |

## References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [actions/setup-node GitHub Repo](https://github.com/actions/setup-node)
- [Mongoose Connection Guide](https://mongoosejs.com/docs/connections.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/77c8321f-4040-414d-8565-fd1c2bdf60f8)**
>
> Watch video content
