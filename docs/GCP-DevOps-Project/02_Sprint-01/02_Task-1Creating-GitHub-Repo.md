# Task 1Creating GitHub Repo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-01/Task-1Creating-GitHub-Repo)

---

## Table of Contents

- Task 1Creating GitHub Repo
  - Prerequisites
  - Step 1: Access GitHub
  - Step 2: Sign In or Sign Up
  - Step 3: Create a New Repository
  - Step 4: Initialize Locally & Push
  - Watch Video

---

## Content

GCP DevOps Project

Sprint 01

# Task 1Creating GitHub Repo

In this lesson, you'll set up a new GitHub repository named **gcp-devops-project**. Follow these steps to get started.

## Prerequisites

- A GitHub account (sign in or sign up at [GitHub.com](https://github.com))
- Git installed locally (https://git-scm.com)

---

## Step 1: Access GitHub

1.  Open your browser and navigate to https://github.com
2.  Click **Sign in** to log in, or **Sign up** to register.

![The image shows the GitHub homepage with a space-themed background, featuring the text "Let's build from here" and options to sign up or start a free enterprise trial.](https://kodekloud.com/kk-media/image/upload/v1752875407/notes-assets/images/GCP-DevOps-Project-Task-1Creating-GitHub-Repo/github-homepage-space-background-signup.jpg)

> [!important]
> **Note**
>
> If you have Two-Factor Authentication enabled, create a [personal access token](https://docs.github.com/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) before signing in.

---

## Step 2: Sign In or Sign Up

1.  Enter your **username (or email)** and **password**.
2.  Click **Sign in**.
3.  If you don't have an account yet, select **Sign up** and follow the registration flow.

![The image shows the GitHub login page in a web browser, with fields for entering a username or email and password. There are options to sign in, create an account, or recover a forgotten password.](https://kodekloud.com/kk-media/image/upload/v1752875408/notes-assets/images/GCP-DevOps-Project-Task-1Creating-GitHub-Repo/github-login-page-browser-fields.jpg)

---

## Step 3: Create a New Repository

1.  From your dashboard, click **Create a new repository**.
2.  Configure the repository settings:

| Visibility | Description                            | When to Use                            |
| ---------- | -------------------------------------- | -------------------------------------- |
| Private    | Only you and collaborators can view it | Company code, internal projects        |
| Public     | Anyone can view and clone it           | Tutorials, demos, open-source projects |

3.  For this tutorial, choose **Public**.
4.  Name the repository **gcp-devops-project**.
5.  Click **Create repository**.

![The image shows a GitHub dashboard with options to start a new repository and create a profile README. It includes sections for recent activity and tools for developers.](https://kodekloud.com/kk-media/image/upload/v1752875409/notes-assets/images/GCP-DevOps-Project-Task-1Creating-GitHub-Repo/github-dashboard-repository-readme-tools.jpg)

---

## Step 4: Initialize Locally & Push

Run these commands in your terminal to initialize, commit, and push to GitHub:

```
# 1. Create a README and initialize Git
echo "# gcp-devops-project" >> README.md
git init


# 2. Stage and commit your initial file
git add README.md
git commit -m "first commit"


# 3. Rename default branch, add remote, and push
git branch -M main
git remote add origin git@github.com:learnwithraghu/gcp-devops-project.git
git push -u origin main
```

> [!important]
> **Warning**
>
> Always verify your remote URL with `git remote -v` to avoid pushing to the wrong repository.

---

Congratulations! Your **gcp-devops-project** repository is now live on GitHub. In the next lesson, we'll explore branching strategies and collaboration workflows.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/a334971a-4fa2-4c61-8891-9c189e2aab64/lesson/d5f6891e-ca11-4dd9-bbba-0e757760c9a5)**
>
> Watch video content
