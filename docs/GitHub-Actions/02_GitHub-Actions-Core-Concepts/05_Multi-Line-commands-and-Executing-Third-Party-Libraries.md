# Multi Line commands and Executing Third Party Libraries - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/Multi-Line-commands-and-Executing-Third-Party-Libraries)

---

## Table of Contents

- Multi Line commands and Executing Third Party Libraries
  - Why Combine Commands in One Step?
  - Executing a Third-Party CLI (cowsay)
  - Quick Reference Table
  - Links and References
  - Watch Video
    - Separate run Steps Example
    - Single Multi-Line run Step
    - Installing and Running cowsay

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# Multi Line commands and Executing Third Party Libraries

In this guide, you’ll learn how to:

- Chain multiple shell commands in a single GitHub Actions step
- Install and invoke a third-party CLI tool (`cowsay`) on the Ubuntu runner

## Why Combine Commands in One Step?

By default, each `run` step in a job runs in its own shell session. This can lead to redundant setup and slower workflows. Using YAML’s pipe syntax (`|`) lets you:

- Share the same shell environment
- Reduce runner overhead
- Improve readability

> [!important]
> **Note**
>
> Every `run` step runs in a fresh shell. Use multi-line commands to keep related tasks together.

### Separate `run` Steps Example

```
name: My First Workflow
on: push


jobs:
  first_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4


      - name: Welcome message
        run: echo "My first GitHub Actions Job"


      - name: List files
        run: ls


      - name: Read file
        run: cat README.md
```

### Single Multi-Line `run` Step

```
name: My First Workflow
on: push


jobs:
  first_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4


      - name: List and Read files
        run: |
          echo "My first GitHub Actions Job"
          ls -ltra
          cat README.md
```

## Executing a Third-Party CLI (`cowsay`)

Suppose you want to generate ASCII art using `cowsay`. Since it isn’t installed by default on the Ubuntu runner, invoking it directly will fail:

```
      - name: Generate ASCII Artwork
        run: cowsay -f dragon "Run for cover, I am a DRAGON....RAWR" >> dragon.txt
```

![The image shows a GitHub Actions workflow interface with a job titled "first_job" that has failed. The steps include setting up the job, checking out the repository, listing and reading a file, generating ASCII artwork, and completing the job.](https://kodekloud.com/kk-media/image/upload/v1752876639/notes-assets/images/GitHub-Actions-Multi-Line-commands-and-Executing-Third-Party-Libraries/github-actions-first-job-failed.jpg)

The error indicates that `cowsay` is not found.

> [!important]
> **Warning**
>
> Non-native tools must be installed before you can use them in your workflow.

### Installing and Running `cowsay`

Add an installation step and then run the command:

```
name: My First Workflow
on: push


jobs:
  first_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4


      - name: Install cowsay
        run: sudo apt-get update && sudo apt-get install -y cowsay


      - name: Generate ASCII Artwork
        run: |
          cowsay -f dragon "Run for cover, I am a DRAGON....RAWR" >> dragon.txt
          cat dragon.txt
```

## Quick Reference Table

| Task                        | Command                                   |
| --------------------------- | ----------------------------------------- |
| Update package lists        | `sudo apt-get update`                     |
| Install `cowsay`            | `sudo apt-get install -y cowsay`          |
| Chain commands in one step  | Use \\`run:                               |
| Invoke third-party CLI tool | `cowsay -f <file> "message" > output.txt` |

## Links and References

- [GitHub Actions `run` Syntax](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsrun)
- [cowsay Package on Ubuntu](https://packages.ubuntu.com/)
- [Using Third-Party Actions in Workflows](https://docs.github.com/actions/using-jobs/using-third-party-actions-in-workflows)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/ab676c2d-a863-4700-b32a-780b68b18480)**
>
> Watch video content
