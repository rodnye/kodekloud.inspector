# Jenkinsfile Walkthrough - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-with-Jenkins-CI-Pipeline/Jenkinsfile-Walkthrough)

---

## Table of Contents

- Jenkinsfile Walkthrough
  - Credentials and Tokens
  - Docker Pipeline Integration
  - Cloning and Updating the GitOps Repository
  - Updating the Deployment Manifest and Raising a Pull Request
  - Exploring Gitea REST APIs
  - Summary
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD with Jenkins CI Pipeline

# Jenkinsfile Walkthrough

In this lesson, we'll explore the Jenkinsfile used by the Solar System application. The walkthrough covers the various pipeline stages—from running unit tests and building a Docker image to updating a GitOps repository and raising a pull request for deploying updated Kubernetes manifests.

The pipeline leverages several environment variables such as the application name, version (a combination of the Jenkins build ID and Git commit), Docker Hub repository credentials, and tokens for ArgoCD and Gitea.

Below is an example Jenkinsfile outlining these processes:

```
pipeline {
    agent any


    environment {
        NAME = "solar-system"
        VERSION = "${env.BUILD_ID}-${env.GIT_COMMIT}"
        IMAGE_REPO = "siddharth67"
        ARGOCD_TOKEN = credentials('argocd-token')
        GITEA_TOKEN = credentials('gitea-token')
    }


    stages {
        stage('Unit Tests') {
            steps {
                echo 'Implement unit tests if applicable.'
                echo 'This stage is a sample placeholder'
            }
        }


        stage('Build Image') {
            steps {
                sh 'docker build -t ${NAME} .'
                sh 'docker tag ${NAME}:latest ${IMAGE_REPO}/${NAME}:${VERSION}'
            }
        }


        stage('Push Image') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub', url: ""]) {
                    sh 'docker push ${IMAGE_REPO}/${NAME}:${VERSION}'
                }
            }
        }


        stage('Clone/Pull Repo') {
            steps {
                script {
                    if (fileExists('gitops-argocd')) {
                        echo 'Repository exists. Pulling latest changes.'
                        dir('gitops-argocd') {
                            sh 'git pull'
                        }
                    } else {
                        echo 'Repository does not exist - Cloning repo'
                        sh 'git clone -b feature-gitea http://139.59.21.103:3000/siddharth/gitops-argocd'
                    }
                }
            }
        }


        stage('Update Manifest') {
            steps {
                dir('gitops-argocd/jenkins-demo') {
                    // The sed command updates the image tag in the Kubernetes deployment YAML.
                    // Ensure the search string matches the existing image value.
                    sh 'sed -i "s#siddharth67/planets:[^ ]*#${IMAGE_REPO}/${NAME}:${VERSION}#g" deployment.yaml'
                    sh 'cat deployment.yaml'
                }
            }
        }


        stage('Commit & Push') {
            steps {
                dir('gitops-argocd/jenkins-demo') {
                    sh 'git config --global user.email "jenkins@ci.com"'
                    sh 'git remote set-url origin http://$GITEA_TOKEN@139.59.21.103:3000/siddharth/gitops-argocd'
                    sh 'git checkout feature-gitea'
                    sh 'git add -A'
                    sh 'git commit -am "Updated image version for Build - $VERSION"'
                    sh 'git push origin feature-gitea'
                }
            }
        }


        stage('Raise PR') {
            steps {
                // Execute the shell script to raise a pull request via the Gitea REST API.
                sh 'bash pr.sh'
            }
        }
    }
}
```

> [!important]
> **Note**
>
> Ensure that environment variables and credentials are correctly configured in Jenkins to enable smooth execution of the pipeline.

## Credentials and Tokens

The Jenkinsfile specifies credentials for:

- **ARGOCD_TOKEN:** Authenticates image updates and interactions with ArgoCD.
- **GITEA_TOKEN:** Authenticates operations with the Git repository.

These tokens are managed by Jenkins' credentials manager. You can view the current credentials list in Jenkins:

![The image shows a Jenkins dashboard displaying a list of credentials, including details like store, domain, ID, and name for each entry.](https://kodekloud.com/kk-media/image/upload/v1752877584/notes-assets/images/GitOps-with-ArgoCD-Jenkinsfile-Walkthrough/jenkins-dashboard-credentials-list.jpg)

## Docker Pipeline Integration

The pipeline utilizes the Docker Pipeline plugin. In the “Push Image” stage, the `withDockerRegistry` wrapper provides Docker Hub credentials to tag and push the image securely.

![The image shows the Jenkins Plugin Manager interface, specifically the "Installed" tab, displaying Docker-related plugins such as "Docker Commons Plugin" and "Docker Pipeline."](https://kodekloud.com/kk-media/image/upload/v1752877585/notes-assets/images/GitOps-with-ArgoCD-Jenkinsfile-Walkthrough/jenkins-plugin-manager-docker-plugins.jpg)

## Cloning and Updating the GitOps Repository

After building and pushing the Docker image, the pipeline manages the GitOps repository which contains the Kubernetes manifest files. The repository, named `gitops-argocd`, typically holds a directory called `jenkins-demo`, which contains a deployment YAML file resembling the example below:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: solar-system
  name: solar-system
spec:
  replicas: 1
  selector:
    matchLabels:
      app: solar-system
  strategy: {}
  template:
    metadata:
      labels:
        app: solar-system
    spec:
      containers:
        - image: siddharth67/planets:14-ff81d8d8981516a2fb6d184d3aa80155641d7af
          name: solar-system
          ports:
            - containerPort: 80
```

The "Clone/Pull Repo" stage checks if the repository already exists. If present, the pipeline performs a `git pull` to update it; if not, it clones the repository.

## Updating the Deployment Manifest and Raising a Pull Request

Once the repository is up-to-date, the "Update Manifest" stage modifies the deployment YAML file using a `sed` command to update the image version. Following this change, the pipeline commits the update and pushes it to the `feature-gitea` branch.

The final "Raise PR" stage triggers a shell script (`pr.sh`) that uses a REST API call to Gitea to automatically create a pull request. Below is an example of the curl command used within the script:

```
echo "Opening a Pull Request"


curl -X 'POST' \
  'http://139.59.21.103:3000/api/v1/repos/siddharth/gitops-argocd/pulls' \
  -H 'accept: application/json' \
  -H "authorization: $ARGOCD_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "assignee": "siddharth",
  "assignees": [
    "siddharth"
  ],
  "base": "main",
  "body": "Updated deployment specification with a new image version.",
  "head": "feature-gitea",
  "title": "Updated Solar System Image"
}'


echo "Success"
```

## Exploring Gitea REST APIs

Gitea provides a comprehensive suite of REST APIs that you can explore via its Swagger interface. For example, to search repositories, you can use the following GET request:

```
curl -X 'GET' \
  'http://139.59.21.103:3000/api/v1/repos/search' \
  -H 'accept: application/json'
```

The response returns repository details in JSON format. For complete information on creating pull requests and other functionalities, refer to Gitea’s Swagger documentation:

![The image shows a Swagger API documentation interface with various sections like admin, miscellaneous, and repository, along with HTTP methods for interacting with a Git repository.](https://kodekloud.com/kk-media/image/upload/v1752877586/notes-assets/images/GitOps-with-ArgoCD-Jenkinsfile-Walkthrough/swagger-api-documentation-git-repo.jpg)

When using the Swagger UI, you might encounter a lock icon next to an API call. Click it to provide your authentication details (such as your Gitea token). An example interface for API authorization is shown below:

![The image shows a web interface for API authorization, displaying sections for available authorizations, basic authorization with a username and masked password, and a sudo header for API key input.](https://kodekloud.com/kk-media/image/upload/v1752877587/notes-assets/images/GitOps-with-ArgoCD-Jenkinsfile-Walkthrough/api-authorization-web-interface.jpg)

## Summary

This lesson provided a detailed overview of the Jenkins pipeline for the Solar System application. Key points include:

- Defining environment variables to specify application details and repository credentials.
- Executing stages for running unit tests, building and pushing a Docker image, and updating Kubernetes manifests.
- Managing the GitOps repository with conditional cloning/pulling, manifest updates, and pushing changes to a feature branch.
- Automating the creation of pull requests using a shell script that interacts with Gitea’s REST API.

In the next lesson, we will execute the Jenkins build and observe the pipeline working in real time.

Happy CI/CD building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/2a9a275c-6019-4953-b2cf-96d9f4c303a8/lesson/1c0325a4-21e1-4ced-8960-97ecd602417f)**
>
> Watch video content
