# Fetching and Pulling - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GIT-for-Beginners/Initialize-Remote-Repositories/Fetching-and-Pulling)

---

## Table of Contents

- Fetching and Pulling
  - Using Git Fetch
  - Merging the Fetched Changes
  - Using Git Pull
  - Watch Video
  - Practice Lab

---

## Content

GIT for Beginners

Initialize Remote Repositories

# Fetching and Pulling

In this guide, you'll learn how to update your local Git repository with the latest commits from the remote master branch. Recently, we merged changes from the origin-sara branch into the remote master branch. However, these changes are not automatically reflected in your local repository. Follow the steps below to keep your local copy up to date.

## Using Git Fetch

The `git fetch` command updates your local copy of the remote-tracking branches. This command downloads the latest updates from the remote repository without modifying your working branch. To update your local repository with the latest remote master branch information, execute:

```
$ git fetch
```

After running this command, your local repository will contain the most recent commit history from the remote branch. However, note that your current working branch is still not updated with these fetched changes.

> [!important]
> **Note**
>
> Remember that fetching does not merge any changes automatically. It only downloads the data from the remote repository.

## Merging the Fetched Changes

Once you have fetched the latest commits, you need to merge the remote master branch into your local master branch. This merge operation incorporates the fetched changes into your working branch, ensuring that your codebase is current with the remote repository.

## Using Git Pull

If you'd prefer a single-step solution, you can use the `git pull` command. Essentially, the `git pull` command performs both a fetch and a merge operation. To update your local master branch directly, run:

```
$ git pull origin master
```

This command combines the `git fetch` and `git merge` operations, ensuring your local repository is synchronized with the remote master branch.

> [!important]
> **Key Point**
>
> Using `git pull` is a convenient and efficient way to update your local repository with the latest changes. However, if you need more control over the merge process, consider using `git fetch` followed by an explicit merge.

With these commands, your local repository will reflect all the latest updates from the remote master branch, enabling you to work with the most recent version of the code. It's time to put these commands into practice and continue developing with the most current codebase.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/git-for-beginners/module/299037d1-d4d5-4d22-8eb3-b8fc6af3f8d2/lesson/7b4998ea-792b-4faf-9aad-78b5ba937af3)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/git-for-beginners/module/299037d1-d4d5-4d22-8eb3-b8fc6af3f8d2/lesson/f4f5af52-339c-449f-a291-663bcc7bbca9)**
>
> Practice lab
