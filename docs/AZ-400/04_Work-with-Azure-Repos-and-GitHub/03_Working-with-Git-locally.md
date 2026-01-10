# Working with Git locally - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Work-with-Azure-Repos-and-GitHub/Working-with-Git-locally)

---

## Table of Contents

- Working with Git locally
  - 1. Configure Your Identity
  - 2. Initialize a Git Repository
  - 3. Branching and Feature Workflows
  - 4. Merging Changes Back into Master
  - 5. Cloning a Remote Repository
  - 6. GUI Client: GitHub Desktop
  - Summary
  - References
  - Watch Video
    - Common Git Commands
    - 5.1 From GitHub
    - 5.2 Using Visual Studio Code
    - 5.3 Inside Visual Studio
    - 5.4 Cloning from Azure Repos

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Work with Azure Repos and GitHub

# Working with Git locally

In this guide, you’ll master the core Git workflows for local development: initializing repositories, configuring identity, staging and committing changes, branching and merging, and cloning from remote hosts like [GitHub](https://github.com) and [Azure Repos](https://learn.microsoft.com/en-us/azure/devops/repos/?view=azure-devops). We’ll also explore graphical tools in [Visual Studio Code](https://code.visualstudio.com/), [Visual Studio](https://visualstudio.microsoft.com/), and [GitHub Desktop](https://desktop.github.com/).

---

## 1\. Configure Your Identity

Before you make any commits, set up your name and email. These values appear in each commit’s metadata.

```
git config --global user.name "Jeremy Morgan"
git config --global user.email "jeremy@kodekloud.com"
```

> [!important]
> **Note**
>
> Use `--global` to apply settings across all repositories on your machine. To override identity per-repo, omit `--global` and run the commands inside the repository directory.

---

## 2\. Initialize a Git Repository

1.  Create and enter a new project folder:

    ```
    PS C:\Users\jeremy\Projects> mkdir my-project
    PS C:\Users\jeremy\Projects> cd my-project
    ```

2.  Initialize Git:

    ```
    git init
    ```

    Output:

    ```
    Initialized empty Git repository in C:/Users/jeremy/Projects/my-project/.git/
    ```

3.  Create a file and check status:

    ```
    echo "Hello Git!" > hello.txt
    git status
    ```

    You should see `hello.txt` listed as an untracked file.

4.  Stage and commit:

    ```
    git add hello.txt
    git commit -m "Initial commit: add hello.txt"
    ```

5.  Review your commit history:

    ```
    git log --oneline --decorate
    ```

    Example output:

    ```
    395883b (HEAD -> master) Initial commit: add hello.txt
    ```

### Common Git Commands

| Command                   | Description                                |
| ------------------------- | ------------------------------------------ |
| git init                  | Create a new local repository              |
| git status                | Show untracked, staged, and modified files |
| git add <file>            | Stage changes for the next commit          |
| git commit -m "message"   | Save staged changes with a commit message  |
| git log --oneline --graph | View a condensed, graphical commit history |

---

## 3\. Branching and Feature Workflows

1.  Create and switch to a new branch:

    ```
    git branch feature/1900
    git checkout feature/1900
    ```

    Output:

    ```
    Switched to branch 'feature/1900'
    ```

2.  Update `hello.txt` to:

    ```
    Hello Azure Repos!
    ```

3.  Stage and commit your change:

    ```
    git status
    git add hello.txt
    git commit -m "Update greeting for Azure Repos"
    ```

![The image shows a Visual Studio Code interface with a file named "hello.txt" open, containing the text "Hello".](https://kodekloud.com/kk-media/image/upload/v1752868181/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-Git-locally/visual-studio-code-hello-txt.jpg)

4.  Visualize the branch history:

    ```
    git log --oneline --graph --decorate --all
    ```

    Output:

    ```
    * 7c4495d (HEAD -> feature/1900) Update greeting for Azure Repos
    | * 395883b (master) Initial commit: add hello.txt
    |/
    ```

---

## 4\. Merging Changes Back into Master

Switch to `master` and merge:

```
git checkout master
git merge feature/1900
```

You’ll typically see a fast-forward merge:

```
Updating 395883b..7c4495d
Fast-forward
 hello.txt | 1 +
```

Verify the merged content:

```
Get-Content .\hello.txt
# Output: Hello Azure Repos!
```

---

## 5\. Cloning a Remote Repository

### 5.1 From GitHub

1.  On [GitHub New Repository](https://github.com/new), create **my-cool-project** (private), initialize with a README.

![The image shows a GitHub interface for creating a new repository, with options to set the repository name, description, visibility, and initialization settings.](https://kodekloud.com/kk-media/image/upload/v1752868182/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-Git-locally/github-new-repository-interface-settings.jpg)

2.  Clone via HTTPS:

    ```
    git clone https://github.com/YourUser/my-cool-project.git
    ```

3.  Add, commit, and push a file:

    ```
    cd my-cool-project
    echo "Hello world" > hello.txt
    git add hello.txt
    git commit -m "Add hello.txt"
    git push origin main
    ```

    You’ll now see `hello.txt` in your GitHub repo.

### 5.2 Using Visual Studio Code

Open the cloned folder in VS Code. The **Source Control** view shows your changes:

![The image shows a text editor with a file named "hello.txt" containing the text "Hello world!" and "I have added some stuff today!" It also displays a Git changes panel indicating the file has been modified.](https://kodekloud.com/kk-media/image/upload/v1752868184/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-Git-locally/text-editor-hello-txt-git-changes.jpg)

### 5.3 Inside Visual Studio

In [Visual Studio](https://visualstudio.microsoft.com/), use the **Git Changes** window to stage, commit, and push:

![The image shows a Visual Studio interface with a Git Changes panel open, displaying a commit with the message "Added stuff" and a list of changed files.](https://kodekloud.com/kk-media/image/upload/v1752868184/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-Git-locally/visual-studio-git-changes-commit.jpg)

### 5.4 Cloning from Azure Repos

```
PS C:\Users\jeremy\Projects> mkdir azure-test
PS C:\Users\jeremy\Projects> cd azure-test
PS C:\Users\jeremy\Projects\azure-test> git clone https://KodeKloudDemo@dev.azure.com/KodeKloudDemo/KodeKloud%20Hotel/_git/SmartHotel360
```

---

## 6\. GUI Client: GitHub Desktop

GitHub Desktop provides an intuitive interface for cloning, committing, and pushing. After installing and signing in, configure your identity:

![The image shows a Git configuration screen where a user can choose to use their GitHub account name and email or configure them manually. It includes fields for name and email, with a space-themed illustration on the right.](https://kodekloud.com/kk-media/image/upload/v1752868186/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-Git-locally/git-configuration-screen-github-illustration.jpg)

Clone your repo and open it in VS Code. When prompted:

![The image shows a Visual Studio Code window with a prompt asking if the user trusts the authors of the files in a specific folder. The background also displays a GitHub authorization page in a browser.](https://kodekloud.com/kk-media/image/upload/v1752868187/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-Git-locally/vscode-trust-authors-github-prompt.jpg)

> [!important]
> **Warning**
>
> Only trust workspaces you recognize. Untrusted code can run arbitrary scripts on your machine.

---

## Summary

You now know how to:

- Configure Git identity
- Initialize, stage, and commit a repository
- Create, switch, and merge branches
- Clone and contribute to remote repositories
- Use GUI tools like VS Code, Visual Studio, and GitHub Desktop

With these skills, you’re ready to collaborate efficiently across any Git-based project.

---

## References

- [Git Documentation](https://git-scm.com/docs)
- [GitHub Docs](https://docs.github.com/)
- [Azure Repos](https://learn.microsoft.com/en-us/azure/devops/repos/?view=azure-devops)
- [Visual Studio Code Docs](https://code.visualstudio.com/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/11f92647-aa61-4572-85b2-a96b279268f5/lesson/ba329efe-aa8d-4c14-a451-be9721841a5e)**
>
> Watch video content
