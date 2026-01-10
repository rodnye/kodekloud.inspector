# Intialize a GIT Repository - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GIT-for-Beginners/GIT-Introduction/Intialize-a-GIT-Repository)

---

## Table of Contents

- Intialize a GIT Repository
  - Watch Video

---

## Content

GIT for Beginners

GIT Introduction

# Intialize a GIT Repository

In this lesson, you will learn how to initialize a local Git repository for your project. This step is essential for tracking changes and collaborating with teams.

First, open your terminal, navigate to your project folder, and run the following command:

```
$ git init
Initialized empty Git repository in /Users/lydiahallie/Desktop/myproject/.git/
```

This command creates a hidden `.git` directory containing all of Git’s tracking information for your project.

To confirm that the repository was created correctly, list all files in the directory (including hidden ones) with:

```
$ ls -a
.  ..
.git
```

Next, add a new file to your project. In this example, we will create a simple text file called `story1.txt` that contains a short sentence. Execute the following commands:

```
$ touch story1.txt
$ echo "This is a beautiful story" >> story1.txt
```

Even though you have created the file, Git is not yet tracking it. To check the current status of your repository, run:

```
$ git status
On branch master


No commits yet


Untracked files:
  story1.txt


nothing added to commit but untracked files present
```

The status output indicates that you are on the default branch (master) and that `story1.txt` is untracked. Untracked files are those that Git recognizes but has not been added to the staging area.

> [!important]
> **Tip**
>
> Before committing, always add your new or modified files to the staging area with `git add`.

To start tracking your new file, add it to the staging area:

```
$ git add story1.txt
```

With the file now staged, you're ready to commit your changes. Always include a concise and descriptive commit message when committing. For example:

```
$ git commit -m "Added first story"
```

This commit records the current state of your project in your local Git repository. It serves as a reference point for you and your teammates, allowing you to revert to this state if necessary.

By following these steps, you have successfully initialized a Git repository and made your first commit. This foundation is crucial for efficient version control and collaboration throughout your project's lifecycle.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/git-for-beginners/module/99d7786d-6e68-4866-8a3b-e01fcfc804b5/lesson/ded2276b-64a8-4a63-b52c-3f4bf363d8b6)**
>
> Watch video content
