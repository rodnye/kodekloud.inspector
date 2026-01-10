# GIT Log - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GIT-for-Beginners/GIT-Introduction/GIT-Log)

---

## Table of Contents

- GIT Log
  - Default Git Log Output
  - One-line Commit View
  - Customizing Git Log Output
  - Watch Video
  - Practice Lab

---

## Content

GIT for Beginners

GIT Introduction

# GIT Log

The git log command displays your project's commit history directly in the terminal. It provides essential details for each commit, including the commit hash, author name, commit date, and commit message. Understanding these components is critical for tracking changes, debugging issues, and collaborating effectively.

> [!important]
> **Tip**
>
> Using git log can help you quickly identify important commits in your project history, making it easier to revert to previous states or understand code evolution.

## Default Git Log Output

When you run the git log command without any options, it presents detailed information for each commit. Below is an example of the default output:

```
$ git log
commit 67c833e3…ecb7df62f (HEAD -> master)
Author: John Doe <john@doe>
Date:   Sun Jun 14 14:45:07 2020 -0700


    Added first story
```

In this output:

- **Commit Hash:** A unique identifier for the commit.
- **Author:** Name and email of the person who made the commit.
- **Date:** When the commit was created.
- **Message:** A brief description of the changes made.

## One-line Commit View

If you prefer a more concise overview of your commit history, the `--oneline` option condenses each commit into a single line. This format is perfect for a quick scan through the project's history:

```
$ git log --oneline
67c833e (HEAD -> master) Added first story
```

This compact format emphasizes the commit hash and the commit message, making it easier to browse through many commits quickly.

## Customizing Git Log Output

Git log offers various configuration options to tailor the display of commit history to your needs. You can combine different options to achieve custom formats, filter commits, and graphically represent branch structures. Experimenting with these options can provide deeper insights into your project’s development flow.

For additional details, refer to the [Git Documentation](https://git-scm.com/docs/git-log).

By mastering these git log options, you will enhance your version control workflow and gain a better understanding of your project's evolution.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/git-for-beginners/module/99d7786d-6e68-4866-8a3b-e01fcfc804b5/lesson/6639a1a0-a6a5-4ba8-9229-a3c9ad2b5474)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/git-for-beginners/module/99d7786d-6e68-4866-8a3b-e01fcfc804b5/lesson/761f6611-e603-492d-8553-57c78053a50d)**
>
> Practice lab
