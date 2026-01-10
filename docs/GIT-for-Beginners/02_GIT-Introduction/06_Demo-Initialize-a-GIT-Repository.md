# Demo Initialize a GIT Repository - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GIT-for-Beginners/GIT-Introduction/Demo-Initialize-a-GIT-Repository)

---

## Table of Contents

- Demo Initialize a GIT Repository
  - Modifying a Tracked File
  - Committing Multiple Changes
  - Handling Modifications on a Staged File
  - Committing Specific Files
  - Managing Untracked Personal Files
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

GIT for Beginners

GIT Introduction

# Demo Initialize a GIT Repository

Welcome to this practical demonstration that complements the lecture content. In this guide, you will learn about the different states a file can have in your Git working directory and how to transition files between these states using Git commands.

We start by creating a new file named `story_one.txt` in an existing Git repository within the `story_blog` directory. This file will include sample content to illustrate the process.

Below is an example of initializing a Git repository and verifying its structure:

```
sarah ()$ pwd
/Users/sarah/story-blog
sarah ()$ git init
Initialized empty Git repository in /Users/sarah/story-blog/.git
sarah (master)$ ls -al
total 0
drwxr-xr-x  3 sarah  staff   96 Aug 14 08:35 .
drwxr-xr-x  8 sarah  staff  256 Aug 14 08:35 ..
drwxr-xr-x  9 sarah  staff  288 Aug 14 08:35 .git
sarah (master)$
```

When a new file is created for the first time, Git considers it "untracked." Once you decide the file is ready to be permanently saved (committed), you add it to the staging area. For instance, after creating a file named `story1.txt` with some content, check its status:

```
sarah (master)$ echo "line1" > story1.txt
sarah (master)$ git status
On branch master


No commits yet


Untracked files:
  (use "git add <file>..." to include in what will be committed)
	story1.txt


nothing added to commit but untracked files present (use "git add" to track)
sarah (master)$ git add story1.txt
sarah (master)$ git status
On branch master


No commits yet


Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   story1.txt


sarah (master)$
```

At this stage, the file is in the staging area. Before proceeding with a commit, ensure that Git is configured with your username and email. This information will be recorded as the author for the commit:

```
sarah (master)$ git config user.name "sarah"
sarah (master)$ git config user.email "sarah@example.com"
```

To commit the staged changes, run:

```
sarah (master)$ git commit
```

After entering your commit message in the default text editor, Git creates the commit. The output will look similar to this:

```
sarah (master)$ git commit
[master (root-commit) 7427b86] Added first story
 1 file changed, 1 insertion(+)
 create mode 100644 story1.txt
sarah (master)$
```

A commit saves a snapshot of your file's current state in the `.git` folder. This snapshot allows you to safely restore previous versions of the file even if modifications or corruption occur later.

After a successful commit, your working area will be clean:

```
sarah (master)$ git status
On branch master
nothing to commit, working tree clean
sarah (master)$
```

## Modifying a Tracked File

If you modify a file after committing, its state changes to modified (unstaged). For example, let’s add a new line to `story1.txt`:

```
sarah (master)$ cat story1.txt
line1
sarah (master)$ echo "line2" >> story1.txt
sarah (master)$ cat story1.txt
line1
line2
sarah (master)$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   story1.txt


no changes added to commit (use "git add" and/or "git commit -a")
sarah (master)$
```

If the changes are unintentional, restore the file to its previously staged version:

```
sarah (master)$ git restore story1.txt
sarah (master)$ cat story1.txt
line1
```

When you intentionally update the file, add it to the staging area, then commit the changes. You can include the commit message directly using the `-m` flag:

```
sarah (master)$ echo "line2" >> story1.txt
sarah (master)$ cat story1.txt
line1
line2
sarah (master)$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   story1.txt


no changes added to commit (use "git add" and/or "git commit -a")
sarah (master)$ git add story1.txt
sarah (master)$ git commit -m "Updated first story"
[master c1efc4b] Updated first story
 1 file changed, 1 insertion(+)
sarah (master)$
```

With this commit, Git archives the current version of the file, preserving its history for future reference.

## Committing Multiple Changes

Consider a scenario where you update `story1.txt` and create a new file named `story2.txt`:

```
sarah (master)$ git status
On branch master
nothing to commit, working tree clean
sarah (master)$ echo "line3" >> story1.txt
sarah (master)$ echo "line1" > story2.txt
sarah (master)$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   story1.txt


Untracked files:
  (use "git add <file>..." to include in what will be committed)
	story2.txt


no changes added to commit (use "git add" and/or "git commit -a")
sarah (master)$
```

If both changes are related, you can stage them together:

```
sarah (master)$ git add .
sarah (master)$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   story1.txt
	new file:   story2.txt


sarah (master)$ git commit -m "Added second story and updated first story"
[master 8f19f2a] Added second story and updated first story
 2 files changed, 2 insertions(+)
 create mode 100644 story2.txt
sarah (master)$ git status
On branch master
nothing to commit, working tree clean
```

> [!important]
> **Atomic Commits**
>
> It is best practice to commit unrelated changes separately. Keeping commits atomic makes it easier to understand your project's history and revert changes as necessary. For example, if one commit contains both a front page addition and an unrelated bug fix, it can be difficult to isolate one change without affecting the other.

The following diagram illustrates the contrast between good and bad commit practices:

![The image shows a comparison of two Git commit histories, highlighting changes made by different users with corresponding avatars.](https://kodekloud.com/kk-media/image/upload/v1752875530/notes-assets/images/GIT-for-Beginners-Demo-Initialize-a-GIT-Repository/frame_480.jpg)

A good commit history keeps each commit focused on a single change. In contrast, mixing unrelated changes into a single commit creates confusion. The diagram below further compares "bad" and "good" Git commit messages:

![The image compares "bad" and "good" Git commit messages, showing improvements in clarity and specificity for each commit.](https://kodekloud.com/kk-media/image/upload/v1752875532/notes-assets/images/GIT-for-Beginners-Demo-Initialize-a-GIT-Repository/frame_580.jpg)

## Handling Modifications on a Staged File

Imagine you add a new line (line4) to `story1.txt`:

```
sarah (master)$ cat story1.txt
line1
line2
line3
sarah (master)$ echo "line4" >> story1.txt
sarah (master)$ cat story1.txt
line1
line2
line3
line4
sarah (master)$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   story1.txt


no changes added to commit (use "git add" and/or "git commit -a")
```

If you accidentally overwrite its contents after staging, Git will indicate that the file is both staged and modified:

```
sarah (master)$ echo "sdfsdfsdfs" > story1.txt
sarah (master)$ cat story1.txt
sdfsdfsdfs
sarah (master)$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   story1.txt


Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   story1.txt
```

Since Git retains the staged version, you can restore it with:

```
sarah (master)$ git restore story1.txt
sarah (master)$ cat story1.txt
line1
line2
line3
line4
```

## Committing Specific Files

Now consider a scenario with two files in different modification states. Suppose `story1.txt` is staged while `story2.txt` is modified:

```
sarah (master)$ echo "line2" >> story2.txt
sarah (master)$ cat story2.txt
line1
line2
sarah (master)$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   story1.txt


Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   story2.txt
```

To commit `story2.txt` separately without including the staged changes from `story1.txt`, first remove `story1.txt` from the staging area:

```
sarah (master)$ git restore --staged story1.txt
sarah (master)$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
	modified:   story1.txt
	modified:   story2.txt


no changes added to commit (use "git add" and/or "git commit -a")
```

Then add and commit `story2.txt`:

```
sarah (master)$ git add story2.txt
sarah (master)$ git commit -m "Updated second story"
[master eb3fa8c] Updated second story
 1 file changed, 1 insertion(+)
sarah (master)$
```

At this point, `story1.txt` remains modified and can be committed later with its own commit message.

## Managing Untracked Personal Files

Sometimes you may have personal files that should not be tracked by Git, such as a file named `notes.txt` for your personal ideas:

```
sarah (master)$ echo "My story ideas" > notes.txt
sarah (master)$ git status
On branch master
Changes not staged for commit:
        modified:   story1.txt


Untracked files:
        notes.txt


no changes added to commit (use "git add" and/or "git commit -a")
```

If you stage all changes with `git add .`, `notes.txt` will also be staged along with `story1.txt`:

```
sarah (master)$ git add .
sarah (master)$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   notes.txt
	modified:   story1.txt
```

Since `notes.txt` is a personal file that you do not want to commit, remove it from the staging area using the cached option:

```
sarah (master)$ git rm notes.txt
error: the following file has changes staged in the index:
	notes.txt
	use --cached to keep the file, or -f to force removal)
sarah (master)$ git rm --cached notes.txt
rm 'notes.txt'
sarah (master)$ ls
notes.txt  story1.txt  story2.txt
sarah (master)$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   story1.txt


Untracked files:
  (use "git add <file>..." to include in what will be committed)
	notes.txt
sarah (master)$
```

> [!important]
> **Tip**
>
> To permanently prevent accidental staging of personal or sensitive files like `notes.txt`, add the filename to your `.gitignore` file:

Add `notes.txt` to your `.gitignore`:

```
sarah (master)$ echo "notes.txt" >> .gitignore
sarah (master)$ cat .gitignore
notes.txt
sarah (master)$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   story1.txt


Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
sarah (master)$
```

Including a `.gitignore` file in your repository is a best practice—it clearly communicates to your team which files or directories (such as logs, caches, or build artifacts) should be ignored by Git.

## Conclusion

This demonstration covers how to:

- Initialize a Git repository.
- Track, stage, and commit new and modified files.
- Handle scenarios where only specific files should be committed.
- Maintain a clean working directory with best practices like atomic commits and proper use of `.gitignore`.

Head over to the labs and practice these commands to reinforce your understanding of Git file states and commit best practices. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/git-for-beginners/module/99d7786d-6e68-4866-8a3b-e01fcfc804b5/lesson/d50761b6-2b8d-4848-b7eb-363622d91975)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/git-for-beginners/module/99d7786d-6e68-4866-8a3b-e01fcfc804b5/lesson/ad29b041-30cc-412b-bf33-84f5ac5e1940)**
>
> Practice lab
