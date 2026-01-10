# Input - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Jenkins/Input)

---

## Table of Contents

- Input
  - Watch Video
  - Practice Lab

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Jenkins

# Input

In this lesson, you will learn how to integrate manual intervention into your CI/CD pipeline using the Jenkins input step within a Jenkinsfile. This functionality allows a manager or team lead to verify the application in a staging environment before the production deployment proceeds, ensuring an extra layer of validation.

Below is a simple example of a Jenkins pipeline with two stages: Build and Deploy. In the Deploy stage, the pipeline pauses and prompts the user for approval. When the user selects the “Yes, proceed!” option, the pipeline resumes and executes the subsequent steps.

---

Consider the following Jenkinsfile:

```
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                // Build steps go here
            }
        }
        stage('Deploy') {
            steps {
                // Deployment steps go here
            }
            input {
                message "Do you want to proceed with deployment?"
                ok "Yes, proceed!"
            }
        }
    }
}
```

When you run this pipeline, the console output will display progress through the various stages. Upon reaching the Deploy stage, you will see an input prompt similar to the following:

```
[Pipeline] stage
[Pipeline] { (Declarative: Tool Install)
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] }
[Pipeline] // stage
[Pipeline] withEnv
[Pipeline] {
[Pipeline] stage
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] withEnv
[Pipeline] {
[Pipeline] echo
building app
[Pipeline] }
[Pipeline] // withEnv
[Pipeline] }
[Pipeline] // stage
[Pipeline] stage
[Pipeline] stage
[Pipeline] { (Deploy)
[Pipeline] input
Do you want to proceed with deployment?
Yes, proceed! or Abort
```

At this point, the user must either click “Yes, proceed!” or choose to abort the process. Once approval is granted, the console output logs the approving user's information:

```
[Pipeline] // stage
[Pipeline] stage
[Pipeline] { (Deploy)
[Pipeline] input
Do you want to proceed with deployment?
Yes, proceed! or Abort
Approved by sanjeev
[Pipeline] tool
[Pipeline] envVarsForTool
```

After approval, the pipeline continues executing the remaining stages.

---

Below is another comprehensive example where the Jenkinsfile consists of three stages: Setup, Test, and Deployment. In this scenario, the Deployment stage halts for manual confirmation before proceeding. Notice that the input step is embedded within the stage, ensuring that the pause happens immediately before the stage's associated steps are executed.

```
pipeline {
    stages {
        stage('Setup') {
            steps {
                // The withCredentials block safely handles your credentials for the build
                withCredentials([usernamePassword(credentialsId: 'server-creds',
                                                  usernameVariable: 'USER',
                                                  passwordVariable: 'PASS')]) {
                    // Credentials can be used here if needed
                }
                // Install required packages
                sh "pip install -r requirements.txt"
            }
        }
        stage('Test') {
            steps {
                // Run tests using pytest
                sh "pytest"
            }
        }
        stage('Deployment') {
            input {
                message "Do you want to proceed further?"
            }
            steps {
                // Deployment steps go here
                echo "Running Deployment"
            }
        }
    }
}
```

After saving and pushing this Jenkinsfile to your Git repository, navigate to your Jenkins job. When viewing the console output, you will observe that the build completes the Setup and Test stages seamlessly. Once it reaches the Deployment stage, the pipeline pauses and prompts for manual confirmation. You have the option to hit “Yes” to continue or abort the process. Upon clicking “Yes,” the approval is logged with your username, and the deployment phase proceeds.

> [!important]
> **Note**
>
> Integrating manual input into your Jenkins pipeline adds an important checkpoint to ensure critical stages only execute after proper verification. This practice is especially useful in environments where a review process is necessary before a production deployment.

By following this guide, you can confidently incorporate manual interventions into your CI/CD workflows, reinforcing higher standards of quality control during deployments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/4b025d4d-3ef9-479d-a483-3aa7a206a553/lesson/b41f91fe-e3fb-42ba-be7b-d0cce0a5576c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/4b025d4d-3ef9-479d-a483-3aa7a206a553/lesson/4420473e-7a8d-4278-acf6-90ff6b7d69ad)**
>
> Practice lab
