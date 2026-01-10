# Add Jenkinsfile to Solar System Repo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Setting-Up-CI-Pipeline/Add-Jenkinsfile-to-Solar-System-Repo)

---

## Table of Contents

- Add Jenkinsfile to Solar System Repo
  - Enabling CI/CD with a Jenkinsfile
  - Next Steps
  - Watch Video
    - 1. Clone the Repository
    - 2. Create a Feature Branch
    - 3. Create and Configure the Jenkinsfile
    - 4. Verify in the Jenkins UI
    - 5. Review the Organization Scan Log
    - 6. Pipeline Execution
    - 7. Using a Configured Node.js Installation

---

## Content

Jenkins Pipelines

Setting Up CI Pipeline

# Add Jenkinsfile to Solar System Repo

This guide demonstrates how to configure a Jenkinsfile in the Solar System repository to enable CI/CD. Previously, a GITHUB organization folder was set up in Jenkins, which successfully discovered repositories containing a Jenkinsfile. Since the Solar System repository did not include a Jenkinsfile, it was not picked up by Jenkins, and the corresponding webhook was missing.

![The image shows a Jenkins dashboard for a Gitea organization, displaying a repository named "parameterized-pipeline-job-init" with various configuration options on the left sidebar.](https://kodekloud.com/kk-media/image/upload/v1752879753/notes-assets/images/Jenkins-Pipelines-Add-Jenkinsfile-to-Solar-System-Repo/jenkins-dashboard-gitea-repo.jpg)

When you check the repository settings under webhooks, no webhook is present:

![The image shows a Gitea repository settings page focused on webhooks, with options to add a webhook and a sidebar menu for various settings.](https://kodekloud.com/kk-media/image/upload/v1752879753/notes-assets/images/Jenkins-Pipelines-Add-Jenkinsfile-to-Solar-System-Repo/gitea-repository-webhooks-settings.jpg)

> [!important]
> **Overview**
>
> Adding a Jenkinsfile to the repository allows Jenkins to automatically detect and trigger builds using webhooks. This setup ensures that every branch with a Jenkinsfile receives its own pipeline job.

## Enabling CI/CD with a Jenkinsfile

Follow these steps to add a Jenkinsfile to the Solar System repository and enable its CI/CD pipeline:

### 1\. Clone the Repository

Clone the Solar System repository to your virtual machine:

```
git clone http://64.227.187.25:5555/dasher-org/solar-system.git
Cloning into 'solar-system'...
remote: Enumerating objects: 83, done.
remote: Counting objects: 100% (83/83), done.
remote: Compressing objects: 100% (60/60), done.
remote: Total 83 (delta 23), reused 83 (delta 23), pack-reused 0 (from 0)
Receiving objects: 100% (83/83), 1.71 MiB | 35.72 MiB/s, done.
Resolving deltas: 100% (23/23), done.
cd solar-system
```

### 2\. Create a Feature Branch

Create a new feature branch to add the Jenkinsfile and various pipeline stages:

```
git checkout -b feature/enabling-cicd
Switched to a new branch 'feature/enabling-cicd'
```

### 3\. Create and Configure the Jenkinsfile

In your project explorer, create a file named `Jenkinsfile` and add the following pipeline definition. This simple pipeline prints the Node.js and npm versions using a shell step:

```
pipeline {
    agent any


    stages {
        stage('VM Node Version') {
            steps {
                sh '''
                    node -v
                    npm -v
                '''
            }
        }
    }
}
```

Commit your changes and push the branch. Once the Jenkinsfile is committed, the webhook will trigger the pipeline automatically.

### 4\. Verify in the Jenkins UI

Open the Jenkins UI and navigate to the Solar System repository. Verify that the `feature/enabling-cicd` branch is recognized and the Jenkinsfile is detected. You will be able to see the branch details and pipeline execution history.

![The image shows a web interface of a code repository with a list of files and commit messages. It includes a section about a "Solar System NodeJS Application" project.](https://kodekloud.com/kk-media/image/upload/v1752879755/notes-assets/images/Jenkins-Pipelines-Add-Jenkinsfile-to-Solar-System-Repo/solar-system-nodejs-app-repo.jpg)

Inspect the webhook settings to confirm the creation of webhooks:

![The image shows a Gitea repository settings page focused on webhooks, displaying two webhook URLs with options to edit or delete them.](https://kodekloud.com/kk-media/image/upload/v1752879756/notes-assets/images/Jenkins-Pipelines-Add-Jenkinsfile-to-Solar-System-Repo/gitea-repository-webhooks-settings-2.jpg)

### 5\. Review the Organization Scan Log

The Jenkins organization folder project scans repositories and branches. For example, during the scan, Jenkins evaluates whether a branch contains a Jenkinsfile:

```
Checking repository parameterized-pipeline-job-init
Proposing parameterized-pipeline-job-init
Looking up repository dasher-org/parameterized-pipeline-job-init


Checking branches...
Checking branch main
    'Jenkinsfile' found
Met criteria


1 branches were processed (query completed)


Checking repository solar-system
Proposing solar-system
Looking up repository dasher-org/solar-system


Checking branches...
Checking branch main
    'Jenkinsfile' not found
Does not meet criteria


1 branches were processed
Checking pull requests...
0 pull requests were processed


3 repositories were processed
[Mon Sep 23 07:23:10 UTC 2024] Finished organization scan. Scan took 1.8 sec
Finished: SUCCESS
```

A subsequent scan confirms that the feature branch meets the criteria:

```
Checking repository parameterized-pipeline-job-init
Proposing parameterized-pipeline-job-init
Looking up repository dasher-org/parameterized-pipeline-job-init


Checking branches...
Checking branch main
  'Jenkinsfile' found
Met criteria
1 branches were processed (query completed)


Checking repository solar-system
Proposing solar-system
Looking up repository dasher-org/solar-system


Checking branches...
Checking branch feature/enabling-cicd
  'Jenkinsfile' found
Met criteria
1 branches were processed (query completed)


3 repositories were processed
[Mon Sep 23 07:40:50 UTC 2024] Finished organization scan. Scan took 1.9 sec
Finished: SUCCESS
```

### 6\. Pipeline Execution

After the Jenkinsfile is detected, Jenkins creates a job for the Solar System repository on the `feature/enabling-cicd` branch. The pipeline checks out the source code from SCM and executes the defined stage:

![The image shows a Jenkins dashboard displaying the status of a CI/CD pipeline for a project named "feature/enabling-cicd" with successful build steps. It includes details like build history and permalinks for recent builds.](https://kodekloud.com/kk-media/image/upload/v1752879757/notes-assets/images/Jenkins-Pipelines-Add-Jenkinsfile-to-Solar-System-Repo/jenkins-dashboard-cicd-pipeline-status.jpg)

The stage runs a shell script to print the Node.js version and npm version. The output is similar to:

```
node -v
v20.16.0
npm -v
10.8.1
```

### 7\. Using a Configured Node.js Installation

To utilize a specific Node.js installation configured in Jenkins, update the Jenkinsfile with the tool configuration. Replace the existing pipeline definition with the updated version below:

```
pipeline {
    agent any


    tools {
        nodejs 'nodejs-22-6-0'
    }


    stages {
        stage('VM Node Version') {
            steps {
                sh '''
                    node -v
                    npm -v
                '''
            }
        }
    }
}
```

Commit and push the changes. When the build is triggered, you will see output indicating that the pipeline uses Node.js version 22.6.0:

```
+ node -v
v22.6.0
+ npm -v
10.8.2
```

With this configuration, the Solar System repository demonstrates how the Jenkins organization folder scans and creates jobs automatically for any branch containing a Jenkinsfile.

![The image shows a Jenkins dashboard for a Gitea organization, displaying repositories and various configuration options. The interface includes options like scanning the organization log and managing organization folders.](https://kodekloud.com/kk-media/image/upload/v1752879758/notes-assets/images/Jenkins-Pipelines-Add-Jenkinsfile-to-Solar-System-Repo/jenkins-dashboard-gitea-organization.jpg)

![The image shows a Jenkins pipeline console displaying the successful completion of a build process, specifically highlighting the "Tool Install" stage with details about the execution time and status.](https://kodekloud.com/kk-media/image/upload/v1752879759/notes-assets/images/Jenkins-Pipelines-Add-Jenkinsfile-to-Solar-System-Repo/jenkins-pipeline-build-success-tool-install.jpg)

Additionally, you can review the Jenkins workspace to see the list of checked-out files:

![The image shows a Jenkins workspace interface displaying a list of files and directories with their sizes and modification dates. The interface includes options like "Console Output" and "Open Blue Ocean."](https://kodekloud.com/kk-media/image/upload/v1752879760/notes-assets/images/Jenkins-Pipelines-Add-Jenkinsfile-to-Solar-System-Repo/jenkins-workspace-file-list-interface.jpg)

## Next Steps

In the next session, we will enhance the pipeline further by installing the necessary dependencies and expanding the configuration beyond this basic setup. This foundational lesson illustrates how Jenkins automatically discovers and configures pipelines for branches with a Jenkinsfile, streamlining your CI/CD process.

Thank you for following along.

> [!important]
> **Additional Resources**
>
> - For more details on Jenkins pipelines, visit the [Jenkins Documentation](https://www.jenkins.io/doc/).
> - Learn more about how webhooks and organization folder projects work in Jenkins by exploring related guides.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/7e239b62-2dfd-4594-85cf-e51c0707121c/lesson/43796d86-44df-404b-b579-2335e077d886)**
>
> Watch video content
