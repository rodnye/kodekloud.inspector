# Git Question 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Git/Git-Question-2)

---

## Table of Contents

- Git Question 2
  - Step-by-Step Approach
  - Practical Example: Using Git Blame
  - Interview Summary
  - Conclusion
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Git

# Git Question 2

In this lesson, we discuss how to properly manage changes to an infrastructure-as-code file—for example, modifying a Terraform file (main.tf) to update a machine type. Imagine the file currently specifies a machine type "R4 2xlarge" that was changed 30 days ago, and you need to update it (perhaps to "t2.micro" or another type). The key consideration is to determine whether to simply update the file or follow a systematic approach.

![The image contains a question about making a change to a Git commit from 30 days ago related to a machine type, with handwritten notes and a diagram.](https://kodekloud.com/kk-media/image/upload/v1752873350/notes-assets/images/DevOps-Interview-Preparation-Course-Git-Question-2/git-commit-change-handwritten-notes.jpg)

> [!important]
> **Remember:**
>
> Before making any modifications, investigate the change history. Understanding who made the original change and why helps avoid unintended consequences—especially in a collaborative environment.

## Step-by-Step Approach

Follow these steps to ensure that your changes are well-informed and maintain the repository's history:

1.  **Clone the Repository**  
    Start by cloning the repository to your local environment.
2.  **Create a New Branch**  
    Create and switch to a new branch to isolate your changes.
3.  **Review the Change History**  
    Use the GitHub UI and the Git Blame feature to inspect the file history. Identify the commit that modified the machine type and review its commit message for context:
    - **Commit Analysis:** Determine why the change was made.
    - **Author Details:** Check who made the change and when.

4.  **Evaluate the Change**  
    Based on your investigation, decide if the modification is still valid or if further team discussion is necessary.
5.  **Implement the Update**  
    Once you are confident about the context, update the file with the correct machine type on your new branch.
6.  **Commit the Changes**  
    Commit your modifications and document your reasons clearly for future reference.

![The image contains a question about making a change to a Git commit from 30 days ago, with handwritten notes discussing machine types and a file named "main.tf".](https://kodekloud.com/kk-media/image/upload/v1752873351/notes-assets/images/DevOps-Interview-Preparation-Course-Git-Question-2/git-commit-change-handwritten-notes-2.jpg)

## Practical Example: Using Git Blame

Consider a scenario where you need to modify a function in a Python file. The following code snippet illustrates a simple calculator and a tax function:

```
def calculator(a, b):
    result = a + b
    print(result)


def tax():
    print("tax")
```

Using Git Blame, you can identify who last modified each line of code along with the associated commit details. Hovering over a commit message (e.g., “update”) reveals the author, the date (possibly three months ago), and the reason behind the change. This information is crucial to determine if the current implementation meets the intended behavior or if further modifications are necessary.

## Interview Summary

When explaining your approach in an interview, you might summarize the process as follows:

```
git clone -> create new branch -> review changes on GitHub UI -> use Git Blame to inspect history -> analyze commit messages -> make necessary changes -> commit updates
```

This clear sequence ensures that you are aware of the historical context behind changes and helps maintain the integrity of your infrastructure code.

> [!important]
> **Key Takeaway:**
>
> Always investigate the context of past modifications before updating an infrastructure-as-code file. This practice not only ensures accuracy but also facilitates smoother team communication.

## Conclusion

Following this systematic approach is essential for a DevOps engineer working with multiple repositories. By using Git Blame and carefully analyzing commit history, you can update your infrastructure code responsibly, preserving its integrity and historical context.

Thank you for going through this lesson. For further reading, check out [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) and [Terraform Registry](https://registry.terraform.io/).

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/4edc26e9-82be-4ac9-a2bf-bf09a6c3bb98/lesson/f9447d12-0bcd-48ec-92af-523e6b389c6f)**
>
> Watch video content
