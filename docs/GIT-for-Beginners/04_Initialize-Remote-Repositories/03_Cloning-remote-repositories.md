# Cloning remote repositories - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GIT-for-Beginners/Initialize-Remote-Repositories/Cloning-remote-repositories)

---

## Table of Contents

- Cloning remote repositories
  - How to Clone a Repository
  - Navigating the Cloned Repository
  - Watch Video
  - Practice Lab

---

## Content

GIT for Beginners

Initialize Remote Repositories

# Cloning remote repositories

When a new team member joins a project, providing access to the remote repository is essential. Cloning the repository using Git is the standard method to obtain a complete local copy of your project data.

## How to Clone a Repository

To clone a repository, use the Git clone command followed by the SSH link of the remote repository. Below is the generic command format:

```
$ git clone [ssh link]
```

For this guide, we focus on cloning a repository from GitHub.

> [!important]
> **Tip**
>
> When you visit a repository on GitHub, locate the prominent green "Clone" button. Clicking it reveals a flyout that contains the SSH link required for cloning.

After obtaining the SSH link, clone the repository locally by running:

```
$ git clone git@github.com:account/remote-repo.git
Cloning into 'remote-repo'...
remote: Enumerating objects: 59, done.
remote: Counting objects: 100% (59/59), done.
remote: Compressing objects: 100% (43/43), done.
remote: Total 2948 (delta 28), reused 18 (delta 6)
Receiving objects: 100% (2948/2948), 1.93 MiB | 2.53 MiB/s, done.
Resolving deltas: 100% (1526/1526), done.
```

By default, Git creates a local folder with the same name as the remote repository.

## Navigating the Cloned Repository

After cloning, switch to the newly created repository directory with the following command:

```
$ cd remote-repo
```

To review the complete history of the repository, use the git log command. This command displays all commits, allowing you to understand the project's evolution:

```
$ git log
commit 67c833e3...ecb7df62f (HEAD -> origin/master)
Author: John Doe <john@doe>
Date:   Sun Jun 14 14:45:07 2020 -0700

    Added first story
```

> [!important]
> **Review Commits**
>
> The `git log` command is a useful tool not only for tracing the project history but also for identifying important changes made by your team.

With a cloned repository, you can now work locally and interact with the remote repository for seamless team collaboration.

For more information on Git commands and efficient project collaboration, visit the [Git Documentation](https://git-scm.com/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/git-for-beginners/module/299037d1-d4d5-4d22-8eb3-b8fc6af3f8d2/lesson/ccf54d0a-57ff-4001-a710-d4129f1708c7)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/git-for-beginners/module/299037d1-d4d5-4d22-8eb3-b8fc6af3f8d2/lesson/98603f2e-51a0-4029-bea4-5f53c7a1cd42)**
>
> Practice lab
