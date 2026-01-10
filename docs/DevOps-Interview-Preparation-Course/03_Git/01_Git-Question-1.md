# Git Question 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Git/Git-Question-1)

---

## Table of Contents

- Git Question 1
  - Using the -m Option to Pass a Commit Message
  - The Importance of Descriptive Commit Messages
  - Summary
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Git

# Git Question 1

Committing code changes with clear, descriptive messages is essential in Git. It not only creates a precise project history but also facilitates smoother code reviews and easier collaboration. In this article, we explain how to include a commit message when committing your code and why it is a best practice.

## Using the -m Option to Pass a Commit Message

When you create a commit in Git, you can include a message describing your changes by using the `-m` flag. This ensures that anyone reviewing the repository can immediately understand the purpose behind each commit. The basic command syntax is:

```
git commit -m "My message"
```

In this example, Git records your changes along with the message “My message.” For instance, if you commit with a message like “Python with Docker,” that description will appear in your GitHub repository’s commit history and any associated pull requests, providing clear context for your changes.

> [!important]
> **Note**
>
> Always include a concise and descriptive commit message to help reviewers and future maintainers understand your changes quickly.

## The Importance of Descriptive Commit Messages

A well-crafted commit message is crucial for several reasons:

- **Clarifies Changes:** It provides an immediate explanation of the alterations made in the commit.
- **Enhances Code Reviews:** A meaningful message speeds up the review process by offering context without the need to inspect every code change.
- **Maintains a Clean History:** A clear commit history makes it easier to trace the evolution of your project and troubleshoot issues later.

While it is technically possible to commit without a message, doing so creates an empty commit message which can lead to confusion and extra effort when reviewing the project’s history. Therefore, it is always best to include a descriptive message with your commits:

```
git commit -m "Python with Docker"
```

> [!important]
> **Warning**
>
> Avoid vague commit messages like "fix bug" or "update" that lack detail. Such messages can hinder effective code reviews and make it challenging to track changes in the long run.

## Summary

Every commit in Git, along with its corresponding message, is stored in your repository's history. Make commit messages part of your project’s documentation by ensuring that each message clearly communicates the impact and intent of the changes made. This practice not only enhances collaboration but also simplifies future maintenance and troubleshooting.

Let's move on to our next question.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/4edc26e9-82be-4ac9-a2bf-bf09a6c3bb98/lesson/20d9f2bf-cbef-4296-8c4b-8435d53b544f)**
>
> Watch video content
