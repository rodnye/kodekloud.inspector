# GIT Merging branches - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GIT-for-Beginners/Git-Branches/GIT-Merging-branches)

---

## Table of Contents

- GIT Merging branches
  - Step-by-Step Merge Process
  - Fast-forward Merge
  - No Fast-forward Merge
  - Learn More About Git Merging
  - Watch Video
  - Practice Lab

---

## Content

GIT for Beginners

Git Branches

# GIT Merging branches

When developing a new feature, it's best practice to work on a separate branch—such as `feature/sign-up`. Once the feature is complete and thoroughly tested, the next step is to integrate the changes into the `master` branch using Git's merge functionality.

> [!important]
> **Tip**
>
> Before merging, ensure your local repository is up-to-date to minimize merge conflicts.

## Step-by-Step Merge Process

1.  **Switch to the Master Branch**  
    Start by switching to the `master` branch:

    ```
    git checkout master
    ```

2.  **Merge the Feature Branch**  
    Next, merge the feature branch (`feature/sign-up`) into `master`:

    ```
    git merge feature/sign-up
    ```

Git supports two types of merges: fast-forward merges and no fast-forward merges.

## Fast-forward Merge

A fast-forward merge occurs when the current branch (`master`) has no additional commits relative to the feature branch (`feature/sign-up`). In this case, Git simply moves the branch pointer forward to incorporate all the new commits, integrating the changes directly without creating a new commit.

## No Fast-forward Merge

A no fast-forward merge is applied when the `master` branch has unique commits that are not part of the feature branch. In this scenario, Git creates a new merge commit that records the integration of both branches, featuring two parent commits—one from `master` and one from `feature/sign-up`.

![The image illustrates a Git branching and merging workflow, showing branches, commits, and merge types, including fast-forward and no fast-forward merges.](https://kodekloud.com/kk-media/image/upload/v1752875544/notes-assets/images/GIT-for-Beginners-GIT-Merging-branches/frame_110.jpg)

> [!important]
> **Note**
>
> After a successful merge—whether fast-forward or no fast-forward—the `master` branch will contain all the changes from the feature branch.

## Learn More About Git Merging

For more practical experience and deeper insights into Git workflows, visit the [Labs: GIT for Beginners](https://learn.kodekloud.com/user/courses/labs-git-for-beginners).

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/git-for-beginners/module/f1029b40-9a1e-4ccc-bca9-46b9d8945ab7/lesson/30180df2-3a58-4fec-b79d-0df9d4306444)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/git-for-beginners/module/f1029b40-9a1e-4ccc-bca9-46b9d8945ab7/lesson/a0a3fe69-8cc3-4fc1-8dec-8f3fb823aab4)**
>
> Practice lab
