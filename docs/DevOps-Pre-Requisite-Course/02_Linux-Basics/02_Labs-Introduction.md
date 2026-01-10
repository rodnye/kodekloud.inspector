# Labs Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Linux-Basics/Labs-Introduction)

---

## Table of Contents

- Labs Introduction
  - Lab Interface Overview
  - Multiple-Choice Questions
  - Task-Based Questions
  - Session Duration and Navigation
  - Additional Features and Troubleshooting
  - Watch Video
  - Practice Lab
    - Example: Creating an Empty File

---

## Content

DevOps Pre-Requisite Course

Linux Basics

# Labs Introduction

In this article, we introduce the hands-on labs available throughout this course. Each lab offers a unique interactive experience designed to reinforce your learning by providing a live Linux terminal alongside a quiz portal. After you complete a lesson, any associated lab will automatically launch in your browser.

> [!important]
> **Lab Loading Time**
>
> Please be aware that labs may take a few minutes to fully load. Patience is key!

## Lab Interface Overview

Once launched, the lab interface is divided into two main sections:

1.  **Live Linux Terminal:** Access a real-time Linux environment where you can execute commands.
2.  **Quiz Portal:** Complete a series of tasks divided into:
    - **Exploratory (Multiple-Choice) Questions**
    - **Task-Based Questions**, where you perform specific actions using the terminal.

If you require additional workspace during your lab session, simply click the button to hide the curriculum window:

![The image shows a DevOps course lab setup interface on Katacoda, with a terminal loading environment and options to connect to different ports.](https://kodekloud.com/kk-media/image/upload/v1752873496/notes-assets/images/DevOps-Pre-Requisite-Course-Labs-Introduction/frame_30.jpg)

## Multiple-Choice Questions

When a multiple-choice question is presented, review the question and select the correct answer. If you're uncertain about the solution, click the hint button to receive guidance or reveal the exact command required. An example of a multiple-choice question interface is shown below:

![The image shows a question asking about the number of directories and files in a specified directory, with four multiple-choice answers and a hint button.](https://kodekloud.com/kk-media/image/upload/v1752873497/notes-assets/images/DevOps-Pre-Requisite-Course-Labs-Introduction/frame_60.jpg)

## Task-Based Questions

Task-based questions require you to execute specific commands. For example, one task might ask you to list the structure of a directory. To complete such a task, use the following command:

```
tree /home/thor/test_dir
```

This command might display that there are three directories and three files, which confirms the correct answer.

Another typical task involves identifying which text file is missing from the home directory. For instance, if the files "test_file1.txt", "test_file2.txt", and "test_file4.txt" are visible, then "test_file3.txt" is the missing file. If you select an incorrect option, the interface will provide an error message:

![A quiz interface asks which text file is not present in a directory, with four options. An incorrect attempt is indicated.](https://kodekloud.com/kk-media/image/upload/v1752873498/notes-assets/images/DevOps-Pre-Requisite-Course-Labs-Introduction/frame_180.jpg)

### Example: Creating an Empty File

For a task-based question that requires creating an empty file, follow these steps:

```
cd /home/thor/test_dir
ls
cd ..
pwd
touch empty_file.txt
```

After executing the `touch` command, verify that the file has been created successfully. If not, the lab interface will alert you with an error message similar to the one below:

![The image shows a task interface instructing to create an empty file named "empty_file.txt" in the "/home/thor/" directory, with a "Tasks not completed" error.](https://kodekloud.com/kk-media/image/upload/v1752873499/notes-assets/images/DevOps-Pre-Requisite-Course-Labs-Introduction/frame_200.jpg)

## Session Duration and Navigation

Each lab session lasts one hour. While you can access labs multiple times, every session will always start at the first question. If you need to pause and restart—say after completing five questions—you can skip ahead on subsequent sessions. However, note that once you skip a question, it cannot be revisited.

> [!important]
> **Session Expiry**
>
> If your internet connection is lost, your lab session will expire. In this case, refresh the terminal or re-select the lab from the curriculum.

## Additional Features and Troubleshooting

- **Multiple Terminal Windows:** You can open a new terminal window during your lab session by clicking the plus button. This is particularly useful when accessing hosted web servers. When clicking on a server URL, a new browser window will open, forwarding your request to the appropriate remote server.
- **Browser Refresh:** If the lab interface does not load consistently, try refreshing your browser. Should the issue persist, contact our support team at [support@kodekloud.com](mailto:support@kodekloud.com) with a screenshot or detailed error information.

If you require further assistance or have additional questions, please visit our [community website](#) to drop a note. Enjoy your interactive learning experience!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/c990b480-a646-4321-89b4-a6fbc217f4e2/lesson/da2ebe94-0257-4006-b65c-d9bff2ab9b19)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/c990b480-a646-4321-89b4-a6fbc217f4e2/lesson/6bf17dcb-32ed-4d92-a9ca-52fd4caad9a2)**
>
> Practice lab
