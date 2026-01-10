# Install Dependencies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Setting-Up-CI-Pipeline/Install-Dependencies)

---

## Table of Contents

- Install Dependencies
  - Original Pipeline: Checking Node.js and npm Versions
  - Updated Pipeline: Installing Dependencies
  - Expected Installation Output
  - Verifying Dependency Installation
  - Watch Video

---

## Content

Jenkins Pipelines

Setting Up CI Pipeline

# Install Dependencies

In this article, we will demonstrate how to add a new stage in your Jenkins pipeline to install Node.js dependencies. We begin by modifying the existing "VM Node Version" stage, then renaming and updating it to handle dependency installation efficiently.

## Original Pipeline: Checking Node.js and npm Versions

Initially, the pipeline checks the versions of Node.js and npm using a multi-line shell command. Below is the original configuration:

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

## Updated Pipeline: Installing Dependencies

We have refactored the stage to install Node.js dependencies using a single-line shell command. The command now includes the `--no-audit` flag to bypass the audit process (which will be addressed in a later stage). The updated pipeline configuration is shown below:

```
pipeline {
    agent any
    tools {
        nodejs 'nodejs-22-6-0'
    }
    stages {
        stage('Installing Dependencies') {
            steps {
                sh 'npm install --no-audit'
            }
        }
    }
}
```

Once the changes are committed and pushed, Jenkins automatically triggers a new pipeline run. You can verify the successful execution using the Jenkins Blue Ocean interface. A successful build status in the corresponding job confirms that your pipeline has run correctly.

![The image shows a Jenkins dashboard displaying the activity of a project named "solar-system" under "Gitea-Organization," with a list of recent builds, their status, commit IDs, branches, messages, durations, and completion times.](https://kodekloud.com/kk-media/image/upload/v1752879787/notes-assets/images/Jenkins-Pipelines-Install-Dependencies/jenkins-dashboard-solar-system-gitea.jpg)

## Expected Installation Output

During the installation stage, the terminal output should resemble the following:

```
npm install --no-audit
added 365 packages in 5s

44 packages are looking for funding
run `npm fund` for details
```

> [!important]
> **Note**
>
> The output confirms that the Node.js environment is set up properly and that the necessary dependencies have been installed.

## Verifying Dependency Installation

After the installation is complete, check the `node_modules` folder in the Jenkins workspace to confirm that all dependencies have been added correctly. This view can be accessed via the Jenkins workspace interface:

![The image shows a Jenkins workspace interface displaying a list of folders and files within the "node_modules" directory. The interface includes navigation options and a search bar.](https://kodekloud.com/kk-media/image/upload/v1752879788/notes-assets/images/Jenkins-Pipelines-Install-Dependencies/jenkins-workspace-node-modules-interface.jpg)

With these steps, your Jenkins pipeline is now set up to install Node.js dependencies correctly with every repository push, setting the stage for subsequent pipeline processes.

For more information on Jenkins pipelines and dependency management, visit the [Jenkins Documentation](https://www.jenkins.io/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/7e239b62-2dfd-4594-85cf-e51c0707121c/lesson/8b696533-a64a-4edb-a091-20ce1775edcd)**
>
> Watch video content
