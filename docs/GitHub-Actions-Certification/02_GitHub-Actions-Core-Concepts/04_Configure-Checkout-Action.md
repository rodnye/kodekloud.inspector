# Configure Checkout Action - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-Core-Concepts/Configure-Checkout-Action)

---

## Table of Contents

- Configure Checkout Action
  - Initial Workflow
  - Finding the Checkout Action
  - Using the Checkout Action
  - Viewing the Action Source
  - Updating the Workflow
  - Inspecting the Workflow Run
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

GitHub Actions Core Concepts

# Configure Checkout Action

In this guide, you’ll learn how to integrate the `actions/checkout` step into your GitHub Actions workflow so that the runner can retrieve your repository’s code. This is a fundamental building block for most CI/CD pipelines on **GitHub Actions**.

## Initial Workflow

Begin with a simple workflow that triggers on every push and runs a few basic commands:

```
name: My First Workflow
on: push


jobs:
  first_job:
    runs-on: ubuntu-latest
    steps:
      - name: Welcome message
        run: echo "My first GitHub Actions Job"


      - name: List files
        run: ls


      - name: Read file
        run: cat README.md
```

At this point:

- The workflow prints a message.
- It lists directory contents.
- It reads the `README.md` file.

However, the repository itself has not yet been checked out.

## Finding the Checkout Action

To add code checkout functionality:

1.  Open the [GitHub Marketplace](https://github.com/marketplace?type=actions) and select **Actions**.
2.  Search for **checkout**.
3.  Locate the official **actions/checkout** maintained by GitHub (look for the verified badge).
4.  Click through to view its version history and usage details.

![The image shows the GitHub Marketplace search results for "checkout" under the Actions category, displaying various actions related to checking out repositories.](https://kodekloud.com/kk-media/image/upload/v1752876115/notes-assets/images/GitHub-Actions-Certification-Configure-Checkout-Action/github-marketplace-checkout-actions-results.jpg)

The details page provides version information (currently v4) and all supported inputs:

![The image shows a GitHub Marketplace page for the "Checkout" GitHub Action, detailing its version, features, and usage instructions. It includes information about the action's functionality, updates, and contributors.](https://kodekloud.com/kk-media/image/upload/v1752876116/notes-assets/images/GitHub-Actions-Certification-Configure-Checkout-Action/github-marketplace-checkout-action-details.jpg)

## Using the Checkout Action

A minimal checkout step looks like this:

```
- uses: actions/checkout@v4
```

You can customize the checkout with these optional inputs:

| Input             | Description                                           | Default                      |
| ----------------- | ----------------------------------------------------- | ---------------------------- |
| `repository`      | The repo to checkout (owner/repo).                    | `\\${{ github.repository }}` |
| `ref`             | Branch, tag, or SHA to checkout.                      | `\\${{ github.ref }}`        |
| `token`           | Token for authentication (PAT or `GITHUB_TOKEN`).     | `\\${{ github.token }}`      |
| `ssh-key`         | SSH private key for SSH-based fetch.                  | _none_                       |
| `ssh-known-hosts` | Additional SSH hosts (use `ssh-keyscan` to populate). | _none_                       |

> [!important]
> **Note**
>
> If you need to access private repositories or submodules, set `token` to a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with appropriate scopes.

## Viewing the Action Source

All code for `actions/checkout` is available on GitHub. You can inspect the v4 README for implementation details and examples:

![The image shows a GitHub repository page with a list of files and directories, contributor information, and a section describing "Checkout V4" in the README.md file.](https://kodekloud.com/kk-media/image/upload/v1752876118/notes-assets/images/GitHub-Actions-Certification-Configure-Checkout-Action/github-repo-checkout-v4-readme.jpg)

Visit the [actions/checkout repository](https://github.com/actions/checkout) to explore tests, issues, and version history.

## Updating the Workflow

Insert the checkout step before any `run` commands to ensure your code is present on the runner:

```
name: My First Workflow
on: push


jobs:
  first_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4


      - name: Welcome message
        run: echo "My first GitHub Actions Job"


      - name: List files
        run: ls


      - name: Read file
        run: cat README.md
```

Commit and push your changes. The runner will now fetch your repo first, then execute subsequent commands.

## Inspecting the Workflow Run

After pushing, navigate to the GitHub Actions tab to view your workflow run. You should see:

1.  The **Checkout repository** step downloading your code.
2.  Logs and timestamps for each subsequent step.
3.  Options to download raw logs or archives for debugging.

![The image shows a GitHub Actions workflow run interface, displaying logs for a job that has successfully completed.](https://kodekloud.com/kk-media/image/upload/v1752876119/notes-assets/images/GitHub-Actions-Certification-Configure-Checkout-Action/github-actions-workflow-logs-success.jpg)

That’s all it takes to configure and use the **Checkout Action** in your GitHub Actions workflows. With your repository checked out, you can now build, test, and deploy your code automatically.

## Links and References

- [GitHub Marketplace](https://github.com/marketplace?type=actions)
- [actions/checkout on GitHub](https://github.com/actions/checkout)
- [Personal access tokens (PATs)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub Actions documentation](https://docs.github.com/actions%5D)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/a22f6153-fc73-4c83-9175-156211d903c1)**
>
> Watch video content
