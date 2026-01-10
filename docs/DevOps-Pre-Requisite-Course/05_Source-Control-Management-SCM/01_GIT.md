# GIT - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Source-Control-Management-SCM/GIT)

---

## Table of Contents

- GIT
  - Main Application Code
  - Initializing and Using Git
  - Tracking and Staging Files
  - Committing Changes
  - Git Workflow Overview
  - Watch Video
  - Practice Lab
    - Repository Initialization

---

## Content

DevOps Pre-Requisite Course

Source Control Management SCM

# GIT

In today's DevOps and Cloud environments, Git is an essential tool for developers, system administrators, customer support professionals, and project managers alike. This guide explores Git fundamentals, including installing, initializing, and managing Git repositories. You'll learn how to clone remote repositories, make modifications to your code, and use commits to track those changes over time.

We illustrate these concepts using a simple Python web application built with Flask. The application includes a LICENSE file, a README file, a requirements.txt file, and the primary Python file.

## Main Application Code

Below is the code from the main Python file (main.py):

```
from flask import Flask, escape


app = Flask(__name__)


app_color = 'Blue'


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/user/<username>')
def show_user_profile(username):
    return 'User %s' % escape(username)


@app.route('/post/<int:post_id>')
def show_post(post_id):
    return 'Post %d' % post_id


@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # Show the subpath after /path/
    return 'Subpath %s' % escape(subpath)
```

Initially, the code is straightforward. However, changes might be made – for example, modifying the welcome message in the root route. Consider the following update as an example:

```
from flask import Flask, escape


app = Flask(__name__)


app_color = 'Blue'


@app.route('/')
def hello():
    return 'Welcome to the community!'


@app.route('/user/<username>')
def show_user_profile(username):
    return 'User %s' % escape(username)


@app.route('/post/<int:post_id>')
def show_post(post_id):
    return 'Post %d' % post_id


@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # Show the subpath after /path/
    return 'Subpath %s' % escape(subpath)
```

Tracking such modifications becomes critical as your application grows and more developers contribute simultaneously. This is where source control management (SCM) systems like Git come into play. Git excels at tracking changes, merging contributions from multiple developers, and maintaining a clear history of your application over time.

Consider another version of the application with minor modifications:

```
from flask import Flask, escape


app = Flask(__name__)
app_color = 'Green'


@app.route('/')
def hello():
    return 'Welcome to the community!'


@app.route('/user/<username>')
def show_user_profile(username):
    return 'User %s' % escape(username)


@app.route('/post/<int:post_id>')
def show_post(post_id):
    return 'Post Number %d' % post_id


@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # Show the subpath after /path
    return 'Subpath %s' % escape(subpath)
```

Git allows you to track such modifications and record who made changes and when, ultimately helping you maintain and manage a robust history of your project.

## Initializing and Using Git

Before tracking any changes, Git must be installed on your system. For CentOS systems, you can use the following command:

```
yum install git
```

After installation, verify Git by checking its version:

```
git version
```

Example output:

```
git version 1.8.3.1
```

### Repository Initialization

To start tracking your code, initialize a Git repository by running the following command in your project’s root directory:

```
git init
```

This command creates a hidden directory named `.git`, which stores all metadata and information about your repository.

## Tracking and Staging Files

Before adding files to your repository, check the current status with:

```
git status
```

Initially, Git will classify all files as untracked. To track files while excluding, for example, `notes.txt`, you can add specific files using:

```
git add LICENSE README.md requirements.txt main.py utils.py db.py backend.py cache.py
```

After running the above command, executing `git status` shows these files as staged for commit. Modifications to any file (e.g., `main.py`) will be marked as modified. Stage these changes with:

```
git add main.py
```

A typical `git status` output might look like this:

```
On branch master
No commits yet


Changes to be committed:
  new file:   LICENSE
  new file:   README.md
  new file:   backend.py
  new file:   cache.py
  new file:   db.py
  new file:   main.py
  new file:   requirements.txt
  new file:   utils.py


Untracked files:
  notes.txt
```

## Committing Changes

Once files are staged, commit the changes with a descriptive message:

```
git commit -m "Initial Commit"
```

The output confirms the commit and lists the changes:

```
[master (root-commit) f5cdb03] Initial commit
 8 files changed, 1 insertion(+)
 create mode 100644 LICENSE
 create mode 100644 README.md
 create mode 100644 backend.py
 create mode 100644 cache.py
 create mode 100644 db.py
 create mode 100644 main.py
 create mode 100644 requirements.txt
 create mode 100644 utils.py
```

Each commit in Git captures a new version of your repository. Subsequent commits should be clear and descriptive to indicate the nature of the changes applied.

## Git Workflow Overview

Git operates in three main steps:

1.  **Initialization:** Set up a new repository.
2.  **Staging:** Track your file changes.
3.  **Committing:** Capture and save the state of your project.

This workflow ensures that the evolution of your code is well-documented and that you can easily revert or analyze the changes over time.

![The image illustrates a Git workflow, showing a repository with files, versions, and staging, alongside steps for initializing, configuring, tracking, staging, and committing changes.](https://kodekloud.com/kk-media/image/upload/v1752873523/notes-assets/images/DevOps-Pre-Requisite-Course-GIT/frame_320.jpg)

> [!important]
> **Note**
>
> While this guide presents the basic Git workflow, real-world projects may require additional configurations and best practices tailored to specific development environments.

That concludes the introduction to Git. In the next section, you'll have the opportunity to reinforce these concepts with hands-on exercises and further exploration of Git commands and workflows.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/c106a6e8-1fac-45a3-b1ae-48e996a5a9ff/lesson/6366dee5-5c51-4904-a3f6-39c4aade174b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/c106a6e8-1fac-45a3-b1ae-48e996a5a9ff/lesson/b8c52c00-2b8e-4514-b4d9-209750edeae5)**
>
> Practice lab
