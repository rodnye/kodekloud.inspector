# Workflow to Generate ASCII Artwork - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/Workflow-to-Generate-ASCII-Artwork)

---

## Table of Contents

- Workflow to Generate ASCII Artwork
  - 1. Create the Workflow File
  - 2. Workflow Steps Overview
  - 3. Workflow Execution & Results
  - 4. Ephemeral Runner Environment
  - 5. Disabling Unused Workflows
  - Links and References
  - Watch Video
    - Installation Logs
    - Generate & Verify Art
    - List Workspace Files

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# Workflow to Generate ASCII Artwork

Automate ASCII art creation on every push with a dedicated GitHub Actions workflow. Using `cowsay`, you’ll generate and display art in your CI logs, verify its output, and explore how ephemeral runners handle generated files.

## 1\. Create the Workflow File

Under `.github/workflows`, create `generate-ascii.yaml`:

```
name: Generate ASCII Artwork
on:
  push:

jobs:
  ascii_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4

      - name: Install Cowsay
        run: sudo apt-get update && sudo apt-get install cowsay -y

      - name: Execute Cowsay
        run: cowsay -f dragon "Run for cover, I am a DRAGON....RAWR" >> dragon.txt

      - name: Verify Output
        run: grep -i "dragon" dragon.txt

      - name: Display Artwork
        run: cat dragon.txt

      - name: List Repository Files
        run: ls -ltra
```

## 2\. Workflow Steps Overview

| Step               | Purpose                              | Command                                                 |
| ------------------ | ------------------------------------ | ------------------------------------------------------- |
| Checkout Repo      | Fetch code from GitHub               | `actions/checkout@v4`                                   |
| Install Cowsay     | Add ASCII-art generator to runner    | `sudo apt-get update && sudo apt-get install cowsay -y` |
| Generate ASCII Art | Create the dragon artwork            | `cowsay -f dragon "..." >> dragon.txt`                  |
| Verify Output      | Confirm “dragon” appears in the file | `grep -i "dragon" dragon.txt`                           |
| Display Artwork    | Print the generated ASCII art        | `cat dragon.txt`                                        |
| List Repo Files    | Inspect runner workspace contents    | `ls -ltra`                                              |

> [!important]
> **Note**
>
> Installing `cowsay` is crucial. Without it, any `cowsay` commands will fail.

## 3\. Workflow Execution & Results

Once you commit and push, GitHub Actions triggers all workflows on `push`. In our example:

![The image shows a GitHub Actions page with a list of workflow runs, including their status, branch, and action details. Some workflows are in progress, while others have completed with different outcomes.](https://kodekloud.com/kk-media/image/upload/v1752876685/notes-assets/images/GitHub-Actions-Workflow-to-Generate-ASCII-Artwork/github-actions-workflow-runs-status.jpg)

- The legacy workflow fails because it skips the `cowsay` install.
- **Generate ASCII Artwork** completes successfully.

### Installation Logs

```
Run sudo apt-get update && sudo apt-get install cowsay -y
Reading package lists...
Building dependency tree...
Reading state information...
Suggested packages:
  filters cowsay-off
The following NEW packages will be installed:
  cowsay
0 upgraded, 1 newly installed, 0 to remove and 30 not upgraded.
Need to get 18.6 kB of archives.
...
```

### Generate & Verify Art

```
cowsay -f dragon "Run for cover, I am a DRAGON....RAWR" >> dragon.txt
grep -i "dragon" dragon.txt
cat dragon.txt
```

### List Workspace Files

```
ls -ltra
total 24
drwxr-xr-x 3 runner docker 4096 Oct 11 11:04 .
-rw-r--r-- 1 runner docker  227 Oct 11 11:04 README.md
drwxr-xr-x 8 runner docker 4096 Oct 11 11:04 .github
drwxr-xr-x 4 runner docker 4096 Oct 11 11:04 .git
-rw-r--r-- 1 runner docker 1017 Oct 11 11:04 dragon.txt
```

## 4\. Ephemeral Runner Environment

> [!important]
> **Warning**
>
> Art files like `dragon.txt` exist only on the runner VM. Once the job ends, the VM is torn down and all generated files are lost.

![The image shows a GitHub repository page titled "actions-1" with a README file open, discussing GitHub Actions for automating workflows.](https://kodekloud.com/kk-media/image/upload/v1752876686/notes-assets/images/GitHub-Actions-Workflow-to-Generate-ASCII-Artwork/github-repository-actions-readme-workflows.jpg)

## 5\. Disabling Unused Workflows

If you have multiple workflows on the same event, disable any you don’t need:

1.  Go to your repo’s **Actions** tab.
2.  Select the workflow to disable.
3.  Click **Disable workflow**.

This saves CI minutes and reduces clutter.

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [actions/checkout](https://github.com/actions/checkout)
- [Cowsay on Wikipedia](https://en.wikipedia.org/wiki/Cowsay)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/d4195049-5a87-418b-8deb-38ee9f083393)**
>
> Watch video content
