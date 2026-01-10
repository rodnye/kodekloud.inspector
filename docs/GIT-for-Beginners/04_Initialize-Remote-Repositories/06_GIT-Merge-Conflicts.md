# GIT Merge Conflicts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GIT-for-Beginners/Initialize-Remote-Repositories/GIT-Merge-Conflicts)

---

## Table of Contents

- GIT Merge Conflicts
  - Steps to Resolve a Merge Conflict
  - Watch Video
  - Practice Lab

---

## Content

GIT for Beginners

Initialize Remote Repositories

# GIT Merge Conflicts

In most cases, Git efficiently determines how to merge file modifications from different branches. However, when changes overlap in the same file, Git may be unable to decide which modifications to keep, resulting in a merge conflict.

Consider the following scenario:

- Sarah starts working on the fourth story and makes her changes.
- Without coordinating with Sarah, Max also begins working on the same fourth story.
- Sarah completes her work quickly and merges her updated version into the master branch.
- Later, when Max attempts to merge his changes into master, he encounters a conflict because the master branch now contains Sarah's modifications, which differ from his changes.

Since the master branch reflects Sarah's version while Max's copy shows his own alterations, Git cannot automatically determine the preferred version. To highlight this discrepancy, Git inserts special conflict markers into the file, displaying both sets of changes along with the surrounding context.

> [!important]
> **Note**
>
> When you see conflict markers in a file, it indicates that Git requires your intervention to decide which changes to keep.

## Steps to Resolve a Merge Conflict

To resolve the conflict, follow these steps:

1.  **Open the Conflicting File**:  
    Open the file (e.g., `fourth story.txt`) in your code editor.
2.  **Examine the Conflict Markers**:  
    Each conflict is marked with extra lines that indicate which part belongs to which branch. Decide whether to keep Sarah's version, Max's version, or a combination of both.
3.  **Remove Conflict Markers**:  
    After making your decision, delete the conflict markers and any extraneous lines that you do not need.
4.  **Save and Stage the File**:  
    Save your changes, and add the resolved file to Git using the command:

    ```
    git add fourth story.txt
    ```

5.  **Complete the Merge**:  
    Once all conflicts are resolved and staged, complete the merge process. The master branch will now include the integrated changes from both Sarah and Max.

> [!important]
> **Tip**
>
> Always review each section of the conflict carefully. This ensures that you neither accidentally discard important changes nor introduce errors during the merge resolution.

This guide demonstrates how merge conflicts occur and provides a clear process for resolving them manually. By following these steps, you ensure that the master branch correctly incorporates changes from all contributors.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/git-for-beginners/module/299037d1-d4d5-4d22-8eb3-b8fc6af3f8d2/lesson/434d73dd-06d1-4aed-a34b-71f6fb9d6d8f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/git-for-beginners/module/299037d1-d4d5-4d22-8eb3-b8fc6af3f8d2/lesson/b3cbb4c5-fcf2-4684-ab67-e420c906bf00)**
>
> Practice lab
