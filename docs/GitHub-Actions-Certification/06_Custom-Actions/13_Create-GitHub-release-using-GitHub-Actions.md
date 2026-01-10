# Create GitHub release using GitHub Actions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Custom-Actions/Create-GitHub-release-using-GitHub-Actions)

---

## Table of Contents

- Create GitHub release using GitHub Actions
  - 1. Manual Release Workflow
  - 2. Choosing an Action
  - 3. Minimal Workflow Example
  - 4. Adding Assets to Your Release
  - 5. Implementing the Auto-Release Workflow
  - 6. Commit, Tag, and Push
  - 7. Verify the Workflow
  - 8. Review and Publish Your Release
  - References
  - Watch Video

---

## Content

GitHub Actions Certification

Custom Actions

# Create GitHub release using GitHub Actions

Automate your GitHub release workflow with GitHub Actions—no more manual tagging or UI clicks. In this tutorial, we’ll use the **Troubleshooting JavaScript Actions** repository as our example, transforming a once-manual process into a seamless pipeline.

## 1\. Manual Release Workflow

Before automation, releases were created by hand:

1.  Navigate to **Releases** in your repo.
2.  Select an existing tag or create a new one.
3.  Choose the target branch.
4.  Write release notes and publish.

![The image shows a GitHub repository page titled "troubleshooting-js-actions" with a list of files and folders, including `.github`, `.vscode`, and `README.md`.](https://kodekloud.com/kk-media/image/upload/v1752876026/notes-assets/images/GitHub-Actions-Certification-Create-GitHub-release-using-GitHub-Actions/troubleshooting-js-actions-repo-files.jpg)

For each release, you specify the tag, assign the branch, and craft release notes:

![The image shows a GitHub interface for creating a new release in a repository, with options to choose a tag, target branch, and write release notes.](https://kodekloud.com/kk-media/image/upload/v1752876028/notes-assets/images/GitHub-Actions-Certification-Create-GitHub-release-using-GitHub-Actions/github-new-release-interface-options.jpg)

Each published release is tied to a Git tag, pointing to a precise code snapshot. Automating this ensures consistency and saves time.

## 2\. Choosing an Action

GitHub’s Actions Marketplace provides community-maintained workflows. A search for **“release”** surfaces many options. We’ll use the popular [`softprops/action-gh-release`](https://github.com/softprops/action-gh-release) action:

![The image shows a GitHub Marketplace page displaying search results for "release" under the Actions category, listing various GitHub Actions for automating development workflows.](https://kodekloud.com/kk-media/image/upload/v1752876028/notes-assets/images/GitHub-Actions-Certification-Create-GitHub-release-using-GitHub-Actions/github-marketplace-actions-release-search-results.jpg)

![The image shows a GitHub Marketplace page for the "GH Release" action, which is used for creating GitHub Releases on various platforms. It includes details about the action, usage instructions, and links to related resources.](https://kodekloud.com/kk-media/image/upload/v1752876030/notes-assets/images/GitHub-Actions-Certification-Create-GitHub-release-using-GitHub-Actions/github-marketplace-gh-release-action.jpg)

> **Why `softprops/action-gh-release`?**
>
> - Automatically creates releases from tags
> - Supports asset uploads
> - Handles prerequisites (permissions, checks)

## 3\. Minimal Workflow Example

Below is the simplest setup: trigger on semver tags starting with `v` and create a release.

```
name: Create Release
on:
  push:
    tags:
      - "v*.*.*"
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: softprops/action-gh-release@v2
```

> [!important]
> **Semantic Versioning Pattern**
>
> Use tag patterns to control when the workflow runs:
>
> | Pattern  | Matches              |
> | -------- | -------------------- |
> | `v*.*.*` | v1.0.0, v2.3.4, etc. |
> | `*`      | All tags             |

## 4\. Adding Assets to Your Release

To upload build artifacts (e.g., binaries, docs), extend the workflow:

```
name: Create Release with Assets
on:
  push:
    tags:
      - "v*.*.*"
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Artifact
        run: echo ${{ github.sha }} > release_info.txt
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        if: startsWith(github.ref, 'refs/tags/')
        with:
          files: release_info.txt
```

## 5\. Implementing the Auto-Release Workflow

1.  Clone your repo and open it in VS Code.
2.  Create a new workflow file at `.github/workflows/autorelease.yaml`.

![The image shows a Visual Studio Code interface with a file explorer open on the left, displaying various files, and a terminal at the bottom with a command prompt ready for input.](https://kodekloud.com/kk-media/image/upload/v1752876030/notes-assets/images/GitHub-Actions-Certification-Create-GitHub-release-using-GitHub-Actions/visual-studio-code-file-explorer-terminal.jpg)

3.  Paste the following content:

```
name: Auto Release Workflow
on:
  push:
    tags:
      - "*"
permissions:
  contents: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
      - name: Create Release & Upload dist/index.js
        uses: softprops/action-gh-release@v2
        with:
          files: dist/index.js
```

> [!important]
> **Permissions Required**
>
> The workflow needs `contents: write` permission to publish releases and upload assets.
> Without it, the release step will fail.

## 6\. Commit, Tag, and Push

```
git add .github/workflows/autorelease.yaml
git commit -m "feat: add auto release workflow and upload dist/index.js"
git push origin main
```

Create and push a new tag to trigger the workflow:

```
git tag v1.0.0
git push origin v1.0.0
```

## 7\. Verify the Workflow

Navigate to the **Actions** tab and look for **Auto Release Workflow**:

![The image shows a GitHub Actions interface with a list of workflow runs, including "Auto Release Workflow" and "Troubleshooting JavaScript Action," displaying their status and details.](https://kodekloud.com/kk-media/image/upload/v1752876032/notes-assets/images/GitHub-Actions-Certification-Create-GitHub-release-using-GitHub-Actions/github-actions-workflow-runs-interface.jpg)

Open the run to ensure all steps—checkout, release creation, and asset upload—completed successfully:

![The image shows a GitHub Actions workflow page where a build job has successfully completed, including steps like creating a release and uploading an artifact.](https://kodekloud.com/kk-media/image/upload/v1752876033/notes-assets/images/GitHub-Actions-Certification-Create-GitHub-release-using-GitHub-Actions/github-actions-workflow-build-success.jpg)

## 8\. Review and Publish Your Release

After execution, go to **Releases**. You’ll see:

- A new release named `v1.0.0`
- Release notes from your git commit message
- `index.js` attached under **Assets**

To push your Action to the Marketplace, click **Edit release** and follow the **Publish to Marketplace** prompts:

![The image shows a GitHub interface for editing a release in a repository, with options to generate release notes and add a description.](https://kodekloud.com/kk-media/image/upload/v1752876034/notes-assets/images/GitHub-Actions-Certification-Create-GitHub-release-using-GitHub-Actions/github-release-edit-interface-options.jpg)

Congratulations—you now have a fully automated GitHub release pipeline!

---

## References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [softprops/action-gh-release](https://github.com/softprops/action-gh-release)
- [Semantic Versioning](https://semver.org)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/428391ee-45d0-4e9c-9e06-78d0c5ff7657/lesson/86b20cb4-560b-489d-ae7b-184d14a93bea)**
>
> Watch video content
