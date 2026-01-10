# Recovering Data by Using Git Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configuring-and-Managing-Repositories/Recovering-Data-by-Using-Git-Commands)

---

## Table of Contents

- Recovering Data by Using Git Commands
  - 1. Restoring a Deleted Commit
  - 2. Undoing the Last Commit
  - 3. Recovering a Deleted Branch
  - Links and References
  - Watch Video
    - 2.1 Soft Reset
    - 2.2 Hard Reset

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configuring and Managing Repositories

# Recovering Data by Using Git Commands

Git’s built-in history tracking and reflog functionality serve as a powerful “time machine” for your repository. In this guide, you’ll learn how to:

- Restore deleted commits
- Undo recent commits
- Recover deleted branches

These techniques help you safely navigate and recover from mistakes in your Git workflow.

## 1\. Restoring a Deleted Commit

When a commit disappears (e.g., via a force-push or a branch deletion), Git’s reflog can track its SHA-1 hash.

```
git reflog
```

This displays a chronological list of all `HEAD` movements. Locate the desired commit hash in the reflog output.

```
git checkout <commit-hash>
```

You’re now in a “detached HEAD” state. To preserve this commit on a branch:

```
git checkout -b restore-branch <commit-hash>
```

This creates a new branch named `restore-branch` pointing at the recovered commit.

> [!important]
> **Note**
>
> By default, Git keeps reflog entries for 90 days. If you don’t find your commit, it may have been pruned. Configure retention with [`gc.reflogExpire`](https://git-scm.com/docs/git-config#Documentation/git-config.txt-gcreflogExpire).

## 2\. Undoing the Last Commit

If you simply want to undo the very last commit on your current branch, use `git reset`. Choose between a **soft** or **hard** reset based on whether you need to preserve your worktree and index.

| Reset Type | Description                                      | Command                   |
| ---------- | ------------------------------------------------ | ------------------------- |
| Soft       | Undo commit, keep changes staged                 | `git reset --soft HEAD~1` |
| Mixed      | Undo commit, unstage changes (default behavior)  | `git reset HEAD~1`        |
| Hard       | Undo commit and discard staged & working changes | `git reset --hard HEAD~1` |

### 2.1 Soft Reset

```
git reset --soft HEAD~1
```

- Moves the branch pointer back by one commit.
- Leaves your working directory and index untouched.

### 2.2 Hard Reset

```
git reset --hard HEAD~1
```

- Moves the branch pointer back by one commit.
- Resets both your index and working directory to the new `HEAD`.

> [!important]
> **Warning**
>
> `git reset --hard` irreversibly discards all uncommitted changes. Make sure you really want to lose those changes.

For more on reset modes, see [Git Reset Documentation](https://git-scm.com/docs/git-reset).

## 3\. Recovering a Deleted Branch

Accidentally deleted a branch? You can bring it back if its commits still exist in the reflog.

1.  View the reflog:

    ```
    git reflog
    ```

2.  Find the commit hash where your branch last pointed.
3.  Recreate the branch:

    ```
    git checkout -b <branch-name> <commit-hash>
    ```

Your deleted branch is now restored, complete with its history.

---

## Links and References

- [Git Reflog](https://git-scm.com/docs/git-reflog)
- [Git Checkout](https://git-scm.com/docs/git-checkout)
- [Git Reset](https://git-scm.com/docs/git-reset)
- [Git Configuration](https://git-scm.com/docs/git-config)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/e7d3282b-80bc-4acd-8009-2fcf5dee0c86/lesson/a2a881b2-be7c-4537-8387-a94c9d93be60)**
>
> Watch video content
