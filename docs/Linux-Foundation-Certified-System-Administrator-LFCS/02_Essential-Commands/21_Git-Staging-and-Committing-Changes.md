# Git Staging and Committing Changes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Essential-Commands/Git-Staging-and-Committing-Changes)

---

## Table of Contents

- Git Staging and Committing Changes
  - 1. Modifying Files in the Working Area
  - 2. Staging Changes
  - 3. Committing Changes
  - Reviewing Project History
  - Recap
  - Watch Video
    - Demo Scenario
    - Example: Removing a File
      - Staging Multiple Files with Shortcuts

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Essential Commands

# Git Staging and Committing Changes

In this lesson, we explore how to effectively stage and commit changes using Git. The process involves three key steps: modifying files in your working directory, adding desired changes to the staging area, and finally committing these changes. Let's walk through each step in detail.

## 1\. Modifying Files in the Working Area

Your working area (or working directory) is the local project directory on your computer. Every modification—whether it's updating existing files or creating new ones—takes place here. For example, if you add a new file or change content within an existing file, you are modifying the working area.

## 2\. Staging Changes

The staging area gives you the flexibility to select which changes you want to include in your next commit. Instead of automatically tracking every change, Git allows you to only add the modifications relevant to a specific feature or bug fix. This selective process is useful when a file is still in progress or when grouping logically related changes together.

For instance, if you add 50 lines of code today and plan to add another 50 lines tomorrow, you might not want to commit the half-finished feature immediately. Similarly, if you alter 10 different files to introduce a new feature, you can combine these into a single, cohesive commit.

![The image illustrates the process of staging and committing changes in Git, showing a transition from the working area to the staging area, with a note about not tracking partial changes.](https://kodekloud.com/kk-media/image/upload/v1752881252/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Git-Staging-and-Committing-Changes/git-staging-committing-process-diagram.jpg)

![The image illustrates the process of staging and committing changes in Git, showing a transition from a working area to a staging area.](https://kodekloud.com/kk-media/image/upload/v1752881254/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Git-Staging-and-Committing-Changes/git-staging-committing-process.jpg)

### Demo Scenario

Consider a project with two files. Start by creating these files with the following commands:

```
echo "This is the ORIGINAL line of code in file1" > file1
echo "This is the ORIGINAL line of code in file2" > file2
```

To review what changes have been made, use the `git status` command. This command displays untracked files and changes in your working directory:

```
jeremy@kodekloud:~/project$ git status
On branch master


No commits yet


Untracked files:
  (use "git add <file>..." to include in what will be committed)
    file1
    file2


nothing added to commit but untracked files present (use "git add" to track)
```

Add the files to the staging area:

```
jeremy@kodekloud:~/project$ git add file1 file2
```

After staging the files, run `git status` again to confirm that the files are ready for commit:

```
jeremy@kodekloud:~/project$ git status
On branch master


No commits yet


Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
    new file:   file1
    new file:   file2
```

If you need to unstage a file, run:

```
git reset file2
```

This command removes file2 from the staging area but keeps it in your working directory. In this demo, we are satisfied with the staging configuration.

#### Staging Multiple Files with Shortcuts

In larger projects, staging or unstaging multiple files can be streamlined with patterns:

- **Add HTML Files from the Current Directory**

  ```
  git add "*.html"
  ```

  Remember to enclose the pattern in quotes to prevent shell expansion of the asterisk.

- **Stage an Entire Subdirectory**

  ```
  git add products/
  ```

- **Stage Only HTML Files from a Subdirectory**

  ```
  git add "products/*.html"
  ```

- **Unstage Multiple Files with a Pattern**

  ```
  git reset "products/*.html"
  ```

> [!important]
> **Note**
>
> Staging with patterns can save time and ensure that only specific files are included in your commit. Always verify your changes using `git status` before committing.

## 3\. Committing Changes

Committing creates a snapshot of your project based on the files in the staging area. It’s best practice to include a concise commit message describing why the changes were made. For example, to commit the two files with a message, run:

```
git commit -m "Added our first two files to get the project started"
```

The output might look like this:

```
[master (root-commit) e354e75] Added our first two files to get the project started
 2 files changed, 2 insertions(+)
 create mode 100644 file1
 create mode 100644 file2
```

When you commit, Git saves the current state of the staged files. Later, you can use tools like `git diff` to compare snapshots. The diff output highlights removed lines in red and added lines in green. Consider the following excerpt from a diff (from the Linux kernel repository):

```
@@ -317,7 +317,7 @@ static int nfs_readdir_folio_array_append(struct folio *folio,
 name = nfs_readdir_copy_name(entry->name, entry->len);

-       array = kmap_atomic(folio_page(folio, 0));
+       array = kmap_local_folio(folio, 0);
 if (!name)
         goto out;
 ret = nfs_readdir_array_can_expand(array);
@@ -340,7 +340,7 @@ static int nfs_readdir_folio_array_append(struct folio *folio,
 out:
-       *cookie = array->last_cookie;
-       kunmap_atomic(array);
+       *cookie = array->last_cookie;
+       kunmap_local(array);
 return ret;
 }
```

This diff shows how a function was replaced by a new one, helping team members clearly understand the changes.

> [!important]
> **Tip**
>
> Clear commit messages and detailed diffs are invaluable for collaborative environments where tracking changes is critical.

## Reviewing Project History

Each commit in Git forms part of your project's history, allowing you to track all changes over time. A well-written commit message helps team members understand the purpose behind each update. Git not only detects additions but also modifications and deletions.

### Example: Removing a File

Suppose you added a feature via a new file (file3) but later discovered a bug. First, create and commit the file:

```
echo "this feature is buggy" > file3
git add file3
git commit -m "Added new feature"
```

To remove file3 from both the working and staging areas, use:

```
git rm file3
```

List the directory contents to verify that file3 has been removed:

```
ls
# Output: file1  file2
```

Finally, commit the change to record the file removal:

```
git commit -m "Removed buggy feature file3"
```

## Recap

To summarize, Git change tracking consists of three main steps:

1.  Modify your working area (project directory).
2.  Stage the changes you want to capture.
3.  Commit these changes to save a snapshot of your project's state.

Here’s a quick recap of staging and committing in a typical scenario:

```
git add file1 file2
git commit -m "Added our first two files to get the project started"
```

By following these steps, you ensure that each commit is deliberate and meaningful, aiding in both individual development and team collaboration. Advanced concepts such as branching and merging build on these foundations and will be covered in future lessons.

Happy committing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/115b1db7-7970-4cc8-91d4-0ac4892fed9f/lesson/ed378ae8-6434-4056-8f27-f197b6f5cfdf)**
>
> Watch video content
