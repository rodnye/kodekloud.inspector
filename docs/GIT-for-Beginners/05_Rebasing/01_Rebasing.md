# Rebasing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GIT-for-Beginners/Rebasing/Rebasing)

---

## Table of Contents

- Rebasing
  - Merging the Master Branch
  - Rebasing Branches
  - Key Considerations
  - Summary
  - Watch Video

---

## Content

GIT for Beginners

Rebasing

# Rebasing

When working on a feature branch, it's essential to incorporate the latest updates from the master branch. There are two common approaches to achieve this: merging and rebasing. Both methods integrate changes from master but differ in how they manage commit history.

## Merging the Master Branch

Merging is a straightforward way to combine the master branch with your feature branch. This method creates a new merge commit that brings in all the changes from master:

```
(sarah)$ git merge master
```

## Rebasing Branches

Rebasing involves reapplying your feature branch's commits onto the tip of the updated master branch, resulting in a cleaner, linear commit history. Unlike merging, rebasing creates new commit hashes because it rewrites the commit history.

```
(sarah)$ git rebase master
```

> [!important]
> **Note**
>
> Rebasing offers a streamlined history but requires careful coordination when working in a team environment. Ensure that your team is aware of the rewritten commit history to avoid confusion.

## Key Considerations

- Merging preserves the original commit history, including unique commit hash identifiers.
- Rebasing copies commits from one branch to another, which means new commit hashes are generated.
- Collaborating on a branch that has been rebased may require additional communication with team members to prevent integration issues.

## Summary

Rebasing provides an effective method to update your feature branch by placing its commits on top of the latest master branch changes. While this approach creates a cleaner commit history, it alters commit hashes by rewriting history, so proper coordination with your team is critical.

For further guidance on Git workflows, explore our [Git Documentation](https://git-scm.com/doc).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/git-for-beginners/module/a6f9b38c-d180-4e22-aabc-786d19f78672/lesson/99b73565-87da-40dc-ac43-e2b6f48040b3)**
>
> Watch video content
