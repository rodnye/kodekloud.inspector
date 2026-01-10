# Reflog - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GIT-for-Beginners/Resetting-and-Reverting/Reflog)

---

## Table of Contents

- Reflog
  - Watch Video

---

## Content

GIT for Beginners

Resetting and Reverting

# Reflog

Everyone makes mistakes, and it's completely normal to occasionally need a recovery strategy for your Git repository.

Sometimes, you might find your repository in a state where you wish you could start over. For example, Sarah once felt she had made an unnecessary commit. In an attempt to correct her mistake, she executed a hard reset with the following command:

```
$ git reset --hard HEAD~1
```

Shortly after, Sarah realized that the commit she had removed was actually important. Since the hard reset removes the commit from the current branch history, it might seem as though the data is lost. Here's what happened:

```
$ git reset --hard HEAD~1
```

> [!important]
> **Warning**
>
> Be cautious when using `git reset --hard` as it can permanently remove commits from your immediate branch history.

Thankfully, Git records every action you take with the repository, whether it's a merge, a reset, or a revert, using the `reflog` command. The Git reflog shows a detailed history that includes even those actions which don't create new commits. This information is invaluable when you need to undo changes.

For instance, running the reflog might display output similar to this:

```
$ git reflog
a340aae HEAD@{0}: reset: moving to HEAD~1
8ad5d8c HEAD@{1}: commit: Added third story
aaba51e HEAD@{2}: commit: Changes to second story
fb9f13e HEAD@{3}: commit: Added second story
```

In Sarah's case, she identified that the state of her repository before the hard reset was represented by `HEAD@{1}`, corresponding to the commit with hash `8ad5d8c`. To restore the repository to that state, she ran:

```
$ git reset --hard 8ad5d8c
```

After executing the command, her repository was successfully reverted to the desired state, and this action was duly noted in the reflog.

> [!important]
> **Note**
>
> While `git log` shows the history of commits, `git reflog` provides an exhaustive record of all repository state changes, including those that do not result in new commits. This makes it an essential tool for troubleshooting and recovering lost work.

Understanding and utilizing Git reflog will help ensure that you can recover from accidental changes and maintain a robust workflow in your Git repository.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/git-for-beginners/module/6d339cba-e512-4329-a340-dccbb0454385/lesson/53db1871-6483-488a-97c3-3cfa5332bb26)**
>
> Watch video content
