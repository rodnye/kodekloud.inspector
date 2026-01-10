# Create a Javascript Action - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Custom-Actions/Create-a-Javascript-Action)

---

## Table of Contents

- Create a Javascript Action
  - Prerequisites
  - 1. Project Setup
  - 2. Define Action Metadata
  - 3. Install Dependencies
  - 4. Write the Action Code
  - 5. Bundle with ncc
  - 6. Ignore Unnecessary Files
  - 7. Publish to GitHub
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Custom Actions

# Create a Javascript Action

In this tutorial, you’ll build a JavaScript GitHub Action that posts a random “thank you” GIF from Giphy whenever a new pull request is opened. We’ll cover project setup, metadata definition, coding, bundling dependencies, and publishing to your GitHub repository.

![The image shows a GitHub documentation page titled "Creating a JavaScript action," which provides a guide on building a JavaScript action using the actions toolkit. The page includes an introduction and a sidebar with related topics.](https://kodekloud.com/kk-media/image/upload/v1752876046/notes-assets/images/GitHub-Actions-Certification-Create-a-Javascript-Action/github-documentation-javascript-action-guide.jpg)

## Prerequisites

Before you begin, verify that you have the following:

| Requirement    | Description                             |
| -------------- | --------------------------------------- |
| Node.js 20.x   | JavaScript runtime for your action      |
| npm            | Package manager to install dependencies |
| GitHub account | Host your repository and run workflows  |

![The image shows a GitHub documentation page about creating a JavaScript action, including prerequisites like downloading Node.js and creating a GitHub repository.](https://kodekloud.com/kk-media/image/upload/v1752876046/notes-assets/images/GitHub-Actions-Certification-Create-a-Javascript-Action/github-js-action-creation-guide.jpg)

## 1\. Project Setup

Create a fresh directory and initialize npm. This scaffolds your package and creates essential files:

```
mkdir js-action-pr-giphy-comment
cd js-action-pr-giphy-comment
npm init -y
touch README.md action.yml index.js
```

## 2\. Define Action Metadata

The `action.yml` file tells GitHub how to run your action. Specify inputs and the entrypoint:

```
name: 'Giphy PR Comment'
description: 'Posts a Giphy GIF comment on new pull requests.'
inputs:
  github-token:
    description: 'GitHub token for authentication'
    required: true
  giphy-api-key:
    description: 'Your Giphy API key'
    required: true
runs:
  using: 'node20'
  main: 'dist/index.js'
```

> [!important]
> **Note**
>
> The `github-token` input is usually provided via `${{ secrets.GITHUB_TOKEN }}`.
> Be sure to store your `giphy-api-key` in GitHub Secrets to keep it secure.

## 3\. Install Dependencies

Install the GitHub Actions Toolkit and Giphy client:

```
npm install @actions/core@1.10.0 \
            @actions/github@5.1.1 \
            @octokit/rest@20.0.1 \
            giphy-api@2.0.2
```

Here’s a quick reference of what each package does:

| Package         | Version | Purpose                                          |
| --------------- | ------- | ------------------------------------------------ |
| @actions/core   | ^1.10.0 | Read inputs, set outputs, and report failures    |
| @actions/github | ^5.1.1  | Access GitHub context and helpers                |
| @octokit/rest   | ^20.0.1 | Interact with the GitHub REST API                |
| giphy-api       | ^2.0.2  | Fetch random or search-based GIFs from Giphy API |

Check your `package.json` to confirm these are listed under `dependencies`.

## 4\. Write the Action Code

In `index.js`, import the necessary modules, fetch a random “thank you” GIF, and post it as a comment on the pull request:

```
const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/rest');
const Giphy = require('giphy-api');


async function run() {
  try {
    const githubToken = core.getInput('github-token');
    const giphyApiKey = core.getInput('giphy-api-key');
    const octokit = new Octokit({ auth: githubToken });
    const giphy = Giphy(giphyApiKey);


    const { owner, repo, number: issue_number } = github.context.issue;
    const prComment = await giphy.random('thank you');


    await octokit.issues.createComment({
      owner,
      repo,
      issue_number,
      body: [
        '### 🎉 Thank you for your contribution!',
        '',
        `![Giphy](${prComment.data.images.downsized.url})`
      ].join('\n')
    });


    core.setOutput('comment-url', prComment.data.images.downsized.url);
  } catch (error) {
    core.setFailed(error.message);
  }
}


run();
```

![The image shows a GitHub repository page for "docker-action-pr-giphy-comment," displaying files like Dockerfile, README.md, and action.yml, along with recent commit activity.](https://kodekloud.com/kk-media/image/upload/v1752876047/notes-assets/images/GitHub-Actions-Certification-Create-a-Javascript-Action/github-repo-docker-action-pr-giphy.jpg)

## 5\. Bundle with ncc

To avoid committing `node_modules`, bundle your code and dependencies into a single file using [Vercel ncc](https://github.com/vercel/ncc):

```
npm install --save-dev @vercel/ncc@0.38.0
npx ncc build index.js -o dist
```

> [!important]
> **Note**
>
> `ncc` produces `dist/index.js` with your action logic and all dependencies. This simplifies deployment.

## 6\. Ignore Unnecessary Files

Add a `.gitignore` to keep your repository clean:

```
node_modules
dist/**/*.map
```

## 7\. Publish to GitHub

Initialize and push your project:

```
git init
git add .
git commit -m "Initial JavaScript action"
git branch -M main
git remote add origin https://github.com/<your-username>/js-action-pr-giphy-comment.git
git push -u origin main
```

![The image shows a GitHub interface for creating a new repository, with fields for the repository name, description, visibility options, and initialization settings.](https://kodekloud.com/kk-media/image/upload/v1752876048/notes-assets/images/GitHub-Actions-Certification-Create-a-Javascript-Action/github-new-repository-interface.jpg)

After pushing, your repository will look like this:

![The image shows a GitHub repository page titled "js-action-pr-giphy-comment," displaying files like `.gitignore`, `README.md`, and `index.js`. The repository is public with no stars or forks.](https://kodekloud.com/kk-media/image/upload/v1752876050/notes-assets/images/GitHub-Actions-Certification-Create-a-Javascript-Action/github-repo-js-action-giphy-comment.jpg)

---

You’ve now successfully created, bundled, and published a JavaScript GitHub Action. Next, tag a release and submit it to the [GitHub Marketplace](https://github.com/marketplace/actions) so others can use it!

---

## Links and References

- [GitHub Actions Toolkit](https://github.com/actions/toolkit)
- [Vercel ncc – Next.js Compiler](https://github.com/vercel/ncc)
- [GitHub Marketplace](https://github.com/marketplace/actions)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Giphy Developers](https://developers.giphy.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/428391ee-45d0-4e9c-9e06-78d0c5ff7657/lesson/d577dc08-becc-45c8-ac7b-77d45b70a673)**
>
> Watch video content
