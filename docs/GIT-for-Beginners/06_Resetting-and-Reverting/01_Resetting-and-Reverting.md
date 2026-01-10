# Resetting and Reverting - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GIT-for-Beginners/Resetting-and-Reverting/Resetting-and-Reverting)

---

## Table of Contents

- Resetting and Reverting
  - Reverting a Commit
  - Resetting a Commit
  - Summary
  - Watch Video
  - Practice Lab
    - Soft Reset
    - Hard Reset

---

## Content

GIT for Beginners

Resetting and Reverting

# Resetting and Reverting

Sometimes you may commit changes only to later realize they weren't needed. Git provides multiple strategies for undoing commits while keeping your project's history intact. In this guide, we'll explore two fundamental techniques: reverting and resetting commits.

## Reverting a Commit

If you want to reverse the effects of a commit without rewriting the project history, the `git revert` command is the best option. For example, suppose you committed the addition of a third story (i.e., adding `third_story.md`), but later determined that change should be undone. Running the command below will generate a new commit that cancels out the changes introduced by the specified commit:

![The image shows a timeline of story additions and changes by a user named Sarah, with corresponding icons and identifiers.](https://kodekloud.com/kk-media/image/upload/v1752875550/notes-assets/images/GIT-for-Beginners-Resetting-and-Reverting/frame_20.jpg)

```
$ git revert 8ad5d
```

The output might resemble:

```
$ git revert 8ad5d
Reverted "Added third story" @sarah
```

This new commit effectively reverses the changes—such as deleting `third_story.md`—while preserving your project's commit history.

> [!important]
> **Note**
>
> Using `git revert` is particularly helpful in collaborative environments because it maintains the integrity of shared history.

## Resetting a Commit

Another method to undo changes is by using the `git reset` command. The `reset` command comes in multiple forms, allowing you to either preserve or discard the changes made in a commit.

### Soft Reset

A soft reset moves the branch pointer back to a previous commit without altering the working directory or staging area. This approach lets you review and re-commit the changes if needed. For example, to reset the last commit (which added `third_story.md`) while keeping its changes staged, execute:

```
$ git reset --soft HEAD~1
```

After running a soft reset, you can verify the status with:

```
$ git reset --soft HEAD~1
$ git status
On branch sarah
Changes to be committed:
  added:   third_story.md
```

The output confirms that even though the commit has been undone, the changes are still staged for potential modifications or re-commitment.

### Hard Reset

In contrast, a hard reset moves the branch pointer and discards all changes in the working directory related to the commit. Using a hard reset for the `third_story.md` commit will completely remove the file:

```
$ git reset --hard HEAD~1
```

> [!important]
> **Warning**
>
> A hard reset is irreversible for local changes. Ensure you truly want to discard all modifications before using this command.

## Summary

| Command                 | Description                                                                                 | Example                     |
| ----------------------- | ------------------------------------------------------------------------------------------- | --------------------------- |
| git revert <commit>     | Creates a new commit that reverses changes while preserving commit history.                 | `$ git revert 8ad5d`        |
| git reset --soft HEAD~1 | Moves the branch pointer back one commit, keeping changes in the staging area for review.   | `$ git reset --soft HEAD~1` |
| git reset --hard HEAD~1 | Moves the branch pointer back one commit and discards all changes in the working directory. | `$ git reset --hard HEAD~1` |

Using these commands effectively enables you to manage your commit history and maintain a clean project state.

Happy coding, and see you in the next article!

For more detailed Git documentation, visit the [Git Documentation](https://git-scm.com/docs). Enjoy your Git journey!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/git-for-beginners/module/6d339cba-e512-4329-a340-dccbb0454385/lesson/a97b24ef-7f5a-4dae-9177-aa517786273c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/git-for-beginners/module/6d339cba-e512-4329-a340-dccbb0454385/lesson/97872df7-b164-4b05-8a51-3c35fcc217f4)**
>
> Practice lab
