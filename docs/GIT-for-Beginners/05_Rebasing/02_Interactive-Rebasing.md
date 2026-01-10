# Interactive Rebasing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GIT-for-Beginners/Rebasing/Interactive-Rebasing)

---

## Table of Contents

- Interactive Rebasing
  - How to Start an Interactive Rebase
  - Squashing Commits
  - Why Use Interactive Rebasing?
  - Additional Resources
  - Watch Video
  - Practice Lab

---

## Content

GIT for Beginners

Rebasing

# Interactive Rebasing

Interactive rebasing in Git empowers you to modify your branch’s commit history before merging it into other branches. This process is particularly useful when you want to clean up a feature branch by consolidating several related commits into a single, meaningful commit.

Imagine you have been working on a feature branch and ended up with multiple commits that logically belong together. For example, several commits related to "the second story" could be merged into one commit to maintain a clear commit history. Interactive rebase lets you squash these commits into a single commit, streamlining your branch's history.

## How to Start an Interactive Rebase

To begin, you need to tell Git which commits you want to modify. In this example, we will update the last four commits. Run the following command to open an interactive editor with a list of these commits:

```
git rebase -i HEAD~4
```

When you execute this command, Git displays a list of the selected commits along with the default command (usually "pick") and a set of instructions. The output may look like this:

```
pick fb9f191 Added second story
pick aaba5e7 Changes to second story
pick 8ad5d7b Oops more changes to second story
pick 6a6f68b More changes to second story
# Rebase dc9ad3c..6a6f68b onto 6a6f68b (4 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = execute command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# r, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit> | <label> [# <oneline>]]
#   : <message> (or the oneline, if no original merge commit was
#     specified). Use <commit> to reword the commit message.
```

## Squashing Commits

The essential step in this interactive rebase is defining which commits to squash. In this case, change the commands for the second, third, and fourth commits from `pick` to `squash`. This instructs Git to combine these commits into the first one. Once you update the commands, save the file and exit the editor. Git will then squash the commits, resulting in a single commit that encapsulates all the changes from the selected commits.

> [!important]
> **Tip**
>
> Interactive rebase is not limited to squashing commits. It also allows you to edit commit messages, reorder commits, or drop commits entirely. These options help you maintain an informative and concise commit history.

## Why Use Interactive Rebasing?

Refining your commit history before merging is crucial for collaboration and future maintenance. By squashing related commits, you make your history easier to understand for team members and maintainers. This practice ultimately enhances the clarity and professionalism of your version control workflow.

Interactive rebasing is a powerful feature for managing your development history, ensuring that when changes finally merge into the main branch, they are both clean and logically organized.

## Additional Resources

For further information on Git and interactive rebasing, check out these resources:

- [Git Documentation](https://git-scm.com/doc)
- [Interactive Rebase Tutorial](https://www.atlassian.com/git/tutorials/rewriting-history)

By mastering interactive rebasing, you'll be better equipped to maintain a clean project history and improve your team's overall workflow.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/git-for-beginners/module/a6f9b38c-d180-4e22-aabc-786d19f78672/lesson/308bc512-0c77-4c2d-b26b-3186053a703f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/git-for-beginners/module/a6f9b38c-d180-4e22-aabc-786d19f78672/lesson/8ebeda6d-a4ba-4269-b0ff-130327adf46c)**
>
> Practice lab
