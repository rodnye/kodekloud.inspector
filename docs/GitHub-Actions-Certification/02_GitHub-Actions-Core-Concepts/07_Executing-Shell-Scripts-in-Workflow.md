# Executing Shell Scripts in Workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-Core-Concepts/Executing-Shell-Scripts-in-Workflow)

---

## Table of Contents

- Executing Shell Scripts in Workflow
  - 1. Why Consolidate run Steps?
  - 2. Create a Reusable Shell Script
  - 3. Refactor Your Workflow to Invoke the Script
  - 4. Troubleshoot “Permission denied”
  - 5. Grant Execute Permissions in the Workflow
  - 6. Verify the Successful Run
  - References
  - Watch Video

---

## Content

GitHub Actions Certification

GitHub Actions Core Concepts

# Executing Shell Scripts in Workflow

Running multiple commands as separate `run` steps can clutter your GitHub Actions workflow. By bundling them into a single shell script, you simplify maintenance, improve readability, and reduce duplication.

## 1\. Why Consolidate `run` Steps?

When you split each command into its own `run`, your workflow becomes long and harder to manage:

```
jobs:
  ascii_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4


      - name: Install Cowsay
        run: sudo apt-get install cowsay -y


      - name: Generate ASCII Art
        run: cowsay -f dragon "Run for cover; I am a DRAGON... RAWR!" >> dragon.txt


      - name: Search for "dragon"
        run: grep -i "dragon" dragon.txt


      - name: Display File Contents
        run: cat dragon.txt


      - name: List Repo Files
        run: ls -ltra
```

| Approach                 | Pros                          | Cons                         |
| ------------------------ | ----------------------------- | ---------------------------- |
| Multiple `run` steps     | Easy to read individual steps | Repetitive YAML; longer file |
| Single shell script call | Cleaner workflow; reusability | Must manage external script  |

## 2\. Create a Reusable Shell Script

Add a file named `ascii-script.sh` at the root of your repository with all commands:

```
#!/bin/sh
sudo apt-get update
sudo apt-get install cowsay -y
cowsay -f dragon "Run for cover; I am a DRAGON... RAWR!" >> dragon.txt
grep -i "dragon" dragon.txt
cat dragon.txt
ls -ltra
```

Make sure to commit this script:

```
git add ascii-script.sh
git commit -m "Add ASCII art shell script"
```

> [!important]
> **Note**
>
> You can reference this pattern for any multi-step process—testing, building, or deployment—by swapping commands in your script.

## 3\. Refactor Your Workflow to Invoke the Script

Update your workflow to run only the script:

```
jobs:
  ascii_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4


      - name: List Current Files
        run: ls -ltra


      - name: Run ASCII Art Script
        run: ./ascii-script.sh
```

After pushing, navigate to the **Actions** tab to see your new workflow run:

![The image shows a GitHub Actions page with a list of workflow runs, displaying their status, branch, and timestamps. Some workflows are marked as successful, while others have failed or are in progress.](https://kodekloud.com/kk-media/image/upload/v1752876142/notes-assets/images/GitHub-Actions-Certification-Executing-Shell-Scripts-in-Workflow/github-actions-workflow-runs-status.jpg)

## 4\. Troubleshoot “Permission denied”

If you see an exit code 126, it means the script lacks execute permissions:

![The image shows a GitHub Actions page where a workflow named "Executing Shell Script" has failed. The job "ascii_job" completed with an exit code 126.](https://kodekloud.com/kk-media/image/upload/v1752876143/notes-assets/images/GitHub-Actions-Certification-Executing-Shell-Scripts-in-Workflow/github-actions-executing-shell-script-failed.jpg)

```
/home/runner/work/_temp/.../script.sh: line 1: ./ascii-script.sh: Permission denied
Error: Process completed with exit code 126
```

> [!important]
> **Warning**
>
> Always ensure your script is executable. You can either set the permission locally with `chmod +x ascii-script.sh` before committing, or update your workflow to grant permissions at runtime.

## 5\. Grant Execute Permissions in the Workflow

Modify the step to add execution rights before running the script:

```
jobs:
  ascii_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4


      - name: List Current Files
        run: ls -ltra


      - name: Run ASCII Art Script
        run: |
          chmod +x ascii-script.sh
          ./ascii-script.sh
```

Commit and push these changes to restart the workflow.

## 6\. Verify the Successful Run

When the workflow reruns, you’ll see:

```
Run ls -ltra
total 24
-rw-r--r-- 1 runner docker 161 Oct 11 11:17 ascii-script.sh
-rw-r--r-- 1 runner docker 227 Oct 11 11:17 README.md
...
```

And then:

```
chmod +x ascii-script.sh
./ascii-script.sh
shell: /usr/bin/bash -e {0}
# [sudo] password for runner:
# Get:1 http://archive.ubuntu.com/ubuntu focal InRelease [265 kB]
# ...
# Code generated by Cowsay
dragon: I'm a DRAGON... RAWR!
# dragon.txt
...
```

Your script installs Cowsay, generates ASCII art, searches and displays content, and lists files—all in one step.

---

## References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [actions/checkout](https://github.com/actions/checkout)
- [GitHub Actions: Workflow syntax for GitHub Actions](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/157ab81c-6566-4b68-9876-7b3fd0ab660a)**
>
> Watch video content
