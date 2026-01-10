# Code Quality Pipeline Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Advanced-Pipelines/Code-Quality-Pipeline-Demo)

---

## Table of Contents

- Code Quality Pipeline Demo
  - Generating a GitHub Access Token
  - Adding GitHub Credentials in Jenkins
  - Organizing Your Pipelines
  - Configuring Branch Sources in Jenkins
  - Understanding the Jenkinsfile for Code Quality Pipeline
  - Excluding the Main Branch from the Code Quality Pipeline
  - Triggering the Code Quality Pipeline with Pull Requests
  - Next Steps
  - Watch Video

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Advanced Pipelines

# Code Quality Pipeline Demo

In this lesson, we will build our pipelines starting with the code quality pipeline. Both the code quality and release pipelines require a GitHub access token. This token is essential for avoiding GitHub’s rate limits when accessing public repositories and is necessary for publishing tags and releases in the release pipeline.

> [!important]
> **Important**
>
> Using an access token when accessing GitHub repositories via a public URL ensures that you avoid accidental rate limiting.

## Generating a GitHub Access Token

To generate an access token:

1.  Click on your user icon in GitHub.
2.  Go to **Settings** and then open **Developer settings** in a new tab.
3.  Under the **Personal Access Tokens** section, select **Token (classic)** and click **Generate new token**.
4.  Provide a name (e.g., "Jenkins") and select the required scopes (for instance, the "repo" scope for full control over private repositories).
5.  Generate the token and copy it.

![The image shows a GitHub repository page for a project named "course-jenkins-project," displaying a list of files and folders along with commit details. The repository is public and includes information about branches, tags, and contributors.](https://kodekloud.com/kk-media/image/upload/v1752879824/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Code-Quality-Pipeline-Demo/github-repo-course-jenkins-project.jpg)

![The image shows a GitHub settings page for creating a new personal access token, with options to select various scopes for access permissions.](https://kodekloud.com/kk-media/image/upload/v1752879825/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Code-Quality-Pipeline-Demo/github-settings-personal-access-token.jpg)

## Adding GitHub Credentials in Jenkins

After copying your token, switch to Jenkins and perform the following steps:

1.  Navigate to **Credentials > System > Global credentials (unrestricted)**.
2.  Add a new credential of type **Username with password**.
3.  Use a placeholder username (e.g., "Jenkins") and paste your access token as the password.
4.  Assign an ID, such as "GitHub-access-token," then save the credential.

![The image shows a Jenkins interface where new credentials are being added, including fields for username, password, and ID. The "Create" button is visible at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752879825/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Code-Quality-Pipeline-Demo/jenkins-add-credentials-interface.jpg)

Once saved, return to the Jenkins main dashboard.

![The image shows a Jenkins interface displaying a list of global credentials, including IDs, names, kinds, and descriptions for various secret texts, SSH keys, and usernames with passwords.](https://kodekloud.com/kk-media/image/upload/v1752879826/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Code-Quality-Pipeline-Demo/jenkins-global-credentials-list.jpg)

## Organizing Your Pipelines

To keep your pipelines organized:

1.  Create a new folder by selecting **New Item**.
2.  Name it "Final Project" and choose the **Folder** type.
3.  Optionally assign a display name, then click **Save**.

![The image shows a Jenkins interface where a user is creating a new item named "Final Project." Various project types like Freestyle, Pipeline, and Multibranch Pipeline are listed as options.](https://kodekloud.com/kk-media/image/upload/v1752879827/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Code-Quality-Pipeline-Demo/jenkins-new-item-final-project.jpg)

Within the "Final Project" folder, create a new pipeline:

1.  Name it "pipeline code-quality".
2.  Select **Multibranch Pipeline** as the project type. This option provides features such as running the pipeline on multiple branches and triggering builds for pull requests.

## Configuring Branch Sources in Jenkins

In the **Branch Sources** configuration:

- Select **GitHub**.
- Choose the previously created credentials (GitHub-access-token). Even for public repositories, these credentials help avoid rate limits.
- Paste the repository URL and adjust branch discovery settings. Here, exclude branches filed as pull requests.
- For pull requests from the origin, select the option to merge the pull request with the target branch’s current revision. This ensures the pipeline tests the final merged code.
- Set the script path to "Jenkinsfile - code quality".
- Choose a periodic scan interval (e.g., every two minutes for demonstration purposes) and save your configuration.

![The image shows a configuration page for a project in Jenkins, specifically focusing on the "Branch Sources" section where GitHub credentials are being selected from a dropdown menu.](https://kodekloud.com/kk-media/image/upload/v1752879828/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Code-Quality-Pipeline-Demo/jenkins-branch-sources-github-config.jpg)

![The image shows a configuration screen for a code quality tool, with options for discovering branches and pull requests. A dropdown menu is open, displaying branch discovery strategies.](https://kodekloud.com/kk-media/image/upload/v1752879829/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Code-Quality-Pipeline-Demo/code-quality-tool-configuration-dropdown.jpg)

![The image shows a Jenkins configuration page for a project, detailing settings for multibranch pipeline triggers and orphaned item strategy.](https://kodekloud.com/kk-media/image/upload/v1752879830/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Code-Quality-Pipeline-Demo/jenkins-multibranch-pipeline-config.jpg)

After saving, Jenkins will scan your repository. The scan log should indicate that the main branch has been processed. For example, you might see output resembling the following in the scan log:

```
Started by user sanjeev
[Thu Sep 12 09:04:30 UTC 2024] Starting branch indexing...
09:04:30 Connecting to https://api.github.com using jenkins/******
Examining kodekloudhub/course-jenkins-project


Checking branches...
Getting remote branches...
Checking branch main


Getting remote pull requests...
'Jenkinsfile-Code-Quality' found
Met criteria
Scheduled build for branch: main


1 branches were processed
Checking pull-requests...
0 pull requests were processed


Finished examining kodekloudhub/course-jenkins-project
[Thu Sep 12 09:04:31 UTC 2024] Finished branch indexing. Indexing took 0.83 sec
Finished: SUCCESS
```

Opening the main branch build confirms that the Jenkinsfile was detected and that a build was triggered immediately after processing.

## Understanding the Jenkinsfile for Code Quality Pipeline

The Jenkinsfile for the code quality pipeline comprises multiple stages:

- In the **Pull Request Number** stage, a conditional block prints the pull request number using the environment variable `CHANGE_ID` if the build is triggered by a pull request.
- The **Environment Variables** stage prints all Jenkins-provided environment details such as commit hash, branch name, and build URLs.

Below is an example Jenkinsfile:

```
pipeline {
    agent any
    stages {
        stage('Environment Variables') {
            steps {
                sh 'printenv'
                sh 'ls -la'
            }
        }
        stage('Pull Request Number') {
            when {
                changeRequest target: 'main'
            }
            steps {
                echo "PR: ${CHANGE_ID}"
            }
        }
        stage('Setup') {
            steps {
                sh 'poetry install --with dev'
            }
        }
        stage('Test') {
            steps {
                sh 'poetry run pytest'
            }
        }
    }
}
```

When a pull request triggers a build, the pipeline prints the pull request number and then proceeds to install dependencies and execute tests.

After updating your Jenkinsfile, commit and push your changes with the following commands:

```
git add Jenkinsfile
git commit -m "Add/update Jenkinsfile for code quality pipeline"
git push
```

An example snippet from the subsequent build log might look like this:

```
The recommended git tool is: NONE
using credential github-access-token
/usr/bin/git rev-parse --resolve-git-dir /var/lib/jenkins/workspace/Final_Project_Code-Quality_main/.git # timeout=10
...
Commit message: "initial commit"
...
+ ls -la
total 152
drwxr-xr-x  7 jenkins jenkins 16384 Sep 12 09:08 .
...
```

## Excluding the Main Branch from the Code Quality Pipeline

To ensure that the code quality pipeline does not run on pushes to the main branch (allowing the release pipeline to handle these events):

1.  Modify the branch source configuration to include a name filter with wildcards.
2.  Add an exclude filter for the main branch, then save the configuration.

![The image shows a Jenkins interface displaying a "Scan Repository Log" for a project, indicating successful branch indexing. The log details the process of checking branches and pull requests.](https://kodekloud.com/kk-media/image/upload/v1752879831/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Code-Quality-Pipeline-Demo/jenkins-scan-repository-log-success.jpg)

After pushing new commits to the main branch, Jenkins will no longer trigger a build for that branch in the code quality pipeline. You can verify this exclusion via the Jenkins UI.

## Triggering the Code Quality Pipeline with Pull Requests

To demonstrate how pull requests trigger the pipeline:

1.  Ensure your local repository is up-to-date:

    ```
    git pull
    ```

2.  Create a new feature branch:

    ```
    git checkout -b feature-one
    ```

3.  Make changes (e.g., updating version identifiers or modifying code) and commit your changes.
4.  Push the feature branch:

    ```
    git push origin feature-one
    ```

Once the new branch is detected by Jenkins, a new build entry will appear under the "Final Project/Code-Quality" folder. You can open the build’s console output to inspect environment variables, such as the branch name now set to "feature-one."

![The image shows a Jenkins dashboard for a project named "feature1," displaying build information and permalinks for recent builds. A dropdown menu is open, showing various build and pipeline options.](https://kodekloud.com/kk-media/image/upload/v1752879832/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Code-Quality-Pipeline-Demo/jenkins-dashboard-feature1-build-info.jpg)

The console output will display values for variables like WORKSPACE, JOB_NAME, and GIT_COMMIT. For example:

```
HOME=/var/lib/jenkins
LANG=C.UTF-8
JENKINS_URL=http://ec2-44-210-155-37.compute-1.amazonaws.com:8080/
JOB_BASE_NAME=feature1
JOB_NAME=Final_Project_Code-Quality/feature1
...
CHANGE_BRANCH=feature-one
...
```

After the build completes, the output confirms that dependencies were installed and tests executed successfully:

```
- Installing tomlkit (0.13.2)
- Installing Werkzeug (0.3.3)
- Installing Flask (0.3.3)
- Installing pytest (8.3.2)
- Installing python-semantic-release (9.8.6)
...
+ poetry run pytest
============================= test session starts ==============================
platform linux -- Python 3.9.16, pytest-8.3.2, pluggy-1.5.0
rootdir: /var/lib/jenkins/workspace/Final_Project_Code-Quality_feature-one
collected 3 items
test_app.py ...      [100%]
============================== 3 passed in 0.26s ===============================
```

When the new feature branch is ready, create a pull request from the feature branch to the main branch. The Jenkins multibranch pipeline will then detect the pull request and build it accordingly.

![The image shows a GitHub repository page for a project named "course-jenkins-project," displaying files, branches, and recent commits. It includes options for code management and a notification about recent pushes to a branch.](https://kodekloud.com/kk-media/image/upload/v1752879833/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Code-Quality-Pipeline-Demo/github-repo-course-jenkins-project-2.jpg)

After creating the pull request, Jenkins will generate a build. In the build’s console output, you will notice environment variables such as `CHANGE_BRANCH` (indicating the feature branch), `CHANGE_TARGET` (showing "main"), and `CHANGE_ID` (the pull request number):

```
PWD=/var/lib/jenkins/workspace/Final_Project_Code-Quality_PR-31
...
CHANGE_BRANCH=feature-one
...
CHANGE_TARGET=main
...
CHANGE_ID=31
...
```

Jenkins then runs the conditional stage that echoes the pull request number and proceeds with the setup and test stages:

```
[Pipeline] stage (Pull Request Number)
[Pipeline] echo
PR: 31
[Pipeline] stage (Setup)
[Pipeline] sh
+ poetry install --with dev
...
```

After a successful test run, GitHub is notified of the build result.

![The image shows a Jenkins console output with various environment variables and URLs related to a project build. It includes details like job name, workspace path, and GitHub repository links.](https://kodekloud.com/kk-media/image/upload/v1752879835/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Code-Quality-Pipeline-Demo/jenkins-console-output-environment-variables.jpg)

Once the pull request is reviewed and merged into the main branch, no build is triggered in the code quality pipeline due to the exclusion. The release pipeline will handle main branch integrations instead.

![The image shows a GitHub pull request page for a project named "course-jenkins-project." The pull request is open, with all checks passed and no conflicts with the base branch.](https://kodekloud.com/kk-media/image/upload/v1752879836/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Code-Quality-Pipeline-Demo/github-pull-request-course-jenkins.jpg)

![The image shows a GitHub pull request page where a pull request has been successfully merged and closed. There are options to add a comment and delete the branch, with various details about the pull request visible.](https://kodekloud.com/kk-media/image/upload/v1752879836/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Code-Quality-Pipeline-Demo/github-pull-request-merged.jpg)

## Next Steps

This concludes the setup and demonstration for the code quality pipeline. In the next lesson, we will focus on configuring the release pipeline to handle main branch commits exclusively.

For more detailed documentation on Jenkins pipelines and continuous integration best practices, explore the [Jenkins Documentation](https://www.jenkins.io/doc/) and related [CI/CD guides](https://www.atlassian.com/continuous-delivery/ci-vs-cd).

Happy building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/79ea1422-fc3a-48da-851d-232fc09690de/lesson/139ce66e-884a-42fc-b2bd-2eb1d30e0828)**
>
> Watch video content
