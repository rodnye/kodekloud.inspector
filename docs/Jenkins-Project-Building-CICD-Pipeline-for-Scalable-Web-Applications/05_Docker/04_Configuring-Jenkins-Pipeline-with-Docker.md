# Configuring Jenkins Pipeline with Docker - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Docker/Configuring-Jenkins-Pipeline-with-Docker)

---

## Table of Contents

- Configuring Jenkins Pipeline with Docker
  - Pipeline Workflow
  - Setting Up Docker Hub
  - Jenkins Pipeline Configuration
  - Summary
  - Watch Video
    - Key Pipeline Components

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Docker

# Configuring Jenkins Pipeline with Docker

In this lesson, we will walk through setting up a CI/CD pipeline in Jenkins that leverages Docker for building and deploying applications. The pipeline automates tasks such as checking out code, running tests, building Docker images, and pushing those images to Docker Hub. This guide will help you understand each step of the process, ensuring your builds are traceable and consistent.

## Pipeline Workflow

The CI/CD pipeline is structured with the following stages:

1.  **Check out the source code.**
2.  **Run tests and verify code quality.**
3.  **Build a Docker image.**
4.  **Push the Docker image to Docker Hub.**

Before pushing an image, ensure that Jenkins has the appropriate Docker credentials for authentication. Also, verify that Docker is installed on the Jenkins machine so that it can execute Docker CLI commands.

![The image shows a pipeline configuration flowchart with four stages: "Checkout Code," "Test," "Build Docker Image," and "Push Image to DockerHub."](https://kodekloud.com/kk-media/image/upload/v1752879859/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Configuring-Jenkins-Pipeline-with-Docker/pipeline-configuration-flowchart-docker.jpg)

## Setting Up Docker Hub

To begin, create a Docker Hub repository. For example, you might name it "jenkins-flask-app" under your Docker Hub username. The repository path should adhere to the following format:  
<username>/jenkins-flask-app

![The image is a guide to creating a DockerHub repository, showing a Docker Hub icon and a sample repository path format: `<username>/jenkins-flask-app`.](https://kodekloud.com/kk-media/image/upload/v1752879860/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Configuring-Jenkins-Pipeline-with-Docker/dockerhub-repository-guide.jpg)

When building the Docker image, you should use the format `<username>/<repo-name>` along with a tag. In our example, we append the Git SHA (provided as an environment variable in Jenkins) to the image tag, ensuring each image can be correlated with a specific Git commit for easier troubleshooting.

> [!important]
> **Note**
>
> Remember to add Jenkins credentials for Docker access (username and password) so Jenkins can authenticate and push images to Docker Hub securely.

![The image shows a diagram for configuring DockerHub credentials, featuring a character holding a coffee cup above a box labeled with "Username" and "Password."](https://kodekloud.com/kk-media/image/upload/v1752879861/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Configuring-Jenkins-Pipeline-with-Docker/dockerhub-credentials-diagram.jpg)

## Jenkins Pipeline Configuration

Below is an example of a Jenkins pipeline configuration that integrates Docker build and push steps:

```
pipeline {
    agent any
    environment {
        // Define the base image name and tag using the Git commit SHA for unique identification
        IMAGE_NAME = 'sanjeevkt720/jenkins-flask-app'
        IMAGE_TAG = "${IMAGE_NAME}:${env.GIT_COMMIT}"
    }
    stages {
        // Setup stage: Install necessary dependencies
        stage('Setup') {
            steps {
                sh "pip install -r requirements.txt"
            }
        }
        // Test stage: Run tests using Pytest
        stage('Test') {
            steps {
                sh "pytest"
            }
        }
        // Docker Hub Login stage: Authenticate Jenkins with Docker Hub using secure credentials
        stage('Login to docker hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'echo ${PASSWORD} | docker login -u ${USERNAME} --password-stdin'
                    echo 'Logged in successfully'
                }
            }
        }
        // Build Docker Image stage: Build the Docker image with the defined tag and verify its creation
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_TAG} .'
                echo "Docker image built successfully"
                sh 'docker image ls'
            }
        }
        // Push Docker Image stage: Push the Docker image to Docker Hub
        stage('Push Docker Image') {
            steps {
                sh 'docker push ${IMAGE_TAG}'
                echo "Docker image pushed successfully"
            }
        }
    }
}
```

### Key Pipeline Components

- **Environment Configuration:**  
  The pipeline sets the `IMAGE_NAME` and `IMAGE_TAG` using the Git commit SHA. This ensures that each Docker image can be traced back to its corresponding commit.
- **Setup Stage:**  
  Installs necessary dependencies as defined in your `requirements.txt`.
- **Test Stage:**  
  Executes tests using Pytest to verify code quality before proceeding with the build.
- **Docker Authentication:**  
  Uses a secure method to log in to Docker Hub. The credentials stored in Jenkins are injected and passed to the Docker CLI, ensuring they are not exposed in logs or command history.
- **Build and Push Stages:**  
  The Docker image is built using the specified tag and subsequently pushed to Docker Hub, making it ready for deployment.

## Summary

This automated pipeline integrates manual Docker build and push steps into your CI/CD process in Jenkins. By associating every build with a specific Git commit, this configuration enhances traceability and simplifies troubleshooting.

For more information on setting up CI/CD with Jenkins and Docker, check out [Jenkins Documentation](https://www.jenkins.io/doc/) and [Docker Documentation](https://docs.docker.com/).

This concludes the configuration for integrating Jenkins with Docker in your CI/CD workflow.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/9eb65ce1-0aef-4f00-b661-5f8308aef2bd/lesson/80fefaac-fdb4-47b5-88a9-7c744b806d10)**
>
> Watch video content
