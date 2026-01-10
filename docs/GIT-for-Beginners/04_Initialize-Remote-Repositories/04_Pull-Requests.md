# Pull Requests - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GIT-for-Beginners/Initialize-Remote-Repositories/Pull-Requests)

---

## Table of Contents

- Pull Requests
  - Pushing Your Changes
  - Creating a Pull Request
  - Reviewing and Merging
  - Watch Video
  - Practice Lab

---

## Content

GIT for Beginners

Initialize Remote Repositories

# Pull Requests

When collaborating in a team, it is considered a best practice to use pull requests instead of merging changes directly into the master branch. Pull requests enable team members to review changes, discuss improvements, and ensure code quality before integration. This guide explains how to push your changes to GitHub and create a pull request.

## Pushing Your Changes

Before creating a pull request, push your latest changes to the branch you're working on. For instance, if your branch is named "sarah", execute the following command in your terminal:

```
git push origin sarah
```

After pushing, GitHub will display a notification indicating that the master branch is one commit behind the "sarah" branch. This reminder serves as your cue to open a pull request to merge the changes.

## Creating a Pull Request

Initiate the pull request process by clicking the pull request button in the top navigation bar, or by using the prompt from the notification pop-up. GitHub will then present a comparison view between the "sarah" branch and the master branch, showcasing the changes made.

> [!important]
> **Tip**
>
> Ensure that you review the differences carefully before proceeding. Providing a detailed title, description, and appropriate labels can help your team understand the purpose of your changes.

Let's create a pull request:

![The image shows a GitHub interface comparing changes between branches, with one commit adding a file titled "second_story.md."](https://kodekloud.com/kk-media/image/upload/v1752875547/notes-assets/images/GIT-for-Beginners-Pull-Requests/frame_70.jpg)

On the pull request page, you can include additional information about your submission such as the title, detailed description, and relevant labels. You can also assign reviewers who will examine and comment on your changes.

![The image shows a GitHub interface for creating a pull request, with a description "Added second story" and options for reviewers, assignees, and labels.](https://kodekloud.com/kk-media/image/upload/v1752875548/notes-assets/images/GIT-for-Beginners-Pull-Requests/frame_80.jpg)

## Reviewing and Merging

Once the pull request is submitted, your team members can review the modifications and provide feedback. When the changes are approved, you can merge them into the master branch by clicking the "Merge pull request" button. This process avoids the need to check out the master branch locally, as the merge is performed directly on GitHub.

![The image shows a GitHub pull request titled "Added second story," indicating a merged commit from a branch named "sarah" into "master" with a comment section.](https://kodekloud.com/kk-media/image/upload/v1752875549/notes-assets/images/GIT-for-Beginners-Pull-Requests/frame_110.jpg)

> [!important]
> **Important**
>
> In larger teams or enterprise environments, merging into the master branch may require specific permissions. If you encounter restrictions, consult with a team member who has the necessary access rights.

By using pull requests, you not only streamline the code review process but also maintain a well-documented history of changes. This approach is essential for efficient team collaboration and high-quality code integration.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/git-for-beginners/module/299037d1-d4d5-4d22-8eb3-b8fc6af3f8d2/lesson/11e3e56d-e32d-4594-981f-0d66d8380fe0)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/git-for-beginners/module/299037d1-d4d5-4d22-8eb3-b8fc6af3f8d2/lesson/180214d6-c269-41dc-87e8-753a0b852823)**
>
> Practice lab
