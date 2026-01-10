# Demo Configuring Jenkins Pipeline for Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Kubernetes/Demo-Configuring-Jenkins-Pipeline-for-Kubernetes)

---

## Table of Contents

- Demo Configuring Jenkins Pipeline for Kubernetes
  - 1. Configuring Credentials in Jenkins
  - 2. Creating the Jenkins Pipeline
  - 3. Reviewing and Updating the Jenkinsfile
  - 4. Troubleshooting File Permission Issues
  - 5. Updating Application Code
  - Watch Video
  - Practice Lab

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Kubernetes

# Demo Configuring Jenkins Pipeline for Kubernetes

In this lesson, you'll learn how to configure a Jenkins pipeline to deploy a Dockerized application to a Kubernetes cluster using [AWS EKS](https://learn.kodekloud.com/user/courses/aws-eks). The guide covers setting up Jenkins credentials, creating the pipeline, reviewing the Jenkinsfile, and troubleshooting file permission issues with the kubeconfig file.

---

## 1\. Configuring Credentials in Jenkins

Begin by navigating to **Manage Jenkins → Credentials**. Note that Docker credentials are preconfigured. You now need to create a credential for the kubeconfig file, which typically resides in your home directory at `.kube/config`.

![The image shows a Jenkins dashboard displaying a list of credentials, including IDs and names for various global domains.](https://kodekloud.com/kk-media/image/upload/v1752879924/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Configuring-Jenkins-Pipeline-for-Kubernetes/jenkins-dashboard-credentials-list.jpg)

Click on **Add Credentials**. Choose the credential type "Secret file". For the file field, enter the full path (for example, `/home/username/.kube/config`) and assign a credential ID such as `kubeconfig-credentials-id`.

![The image shows a Jenkins interface for creating new credentials, specifically a secret file with fields for scope, file, ID, and description. The "Create" button is visible at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752879925/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Configuring-Jenkins-Pipeline-for-Kubernetes/jenkins-create-credentials-secret-file.jpg)

---

## 2\. Creating the Jenkins Pipeline

Next, set up a new pipeline project. Click on **New Item**, give it a name (for example, "Amazon EKS Pipeline"), and select **Pipeline** as the project type.

![The image shows a Jenkins interface displaying a list of global credentials, including secret texts, SSH keys, and usernames with passwords.](https://kodekloud.com/kk-media/image/upload/v1752879925/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Configuring-Jenkins-Pipeline-for-Kubernetes/jenkins-global-credentials-interface.jpg)

Configure the job by enabling the GitHub hook trigger for Git SCM polling. Under the pipeline configuration, select "Pipeline script from SCM" and set the SCM option to Git. Enter your Git repository URL and select the branch (in this example, **main**).

![The image shows a Jenkins interface for creating a new item, with options to select different project types such as Freestyle project, Pipeline, and Multi-configuration project. The item name "EKS-Pipeline" is entered in the text box.](https://kodekloud.com/kk-media/image/upload/v1752879927/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Configuring-Jenkins-Pipeline-for-Kubernetes/jenkins-new-item-eks-pipeline.jpg)

![The image shows a configuration screen for setting up a pipeline, with options to select a source control management (SCM) system, enter a repository URL, and manage credentials. The SCM is set to Git, and there's a prompt to enter a Git repository URL.](https://kodekloud.com/kk-media/image/upload/v1752879928/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Configuring-Jenkins-Pipeline-for-Kubernetes/pipeline-configuration-git-scm.jpg)

![The image shows a configuration screen for a pipeline setup, with options to specify branches to build and other repository settings. The branch specifier is set to "*/main".](https://kodekloud.com/kk-media/image/upload/v1752879929/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Configuring-Jenkins-Pipeline-for-Kubernetes/pipeline-setup-configuration-main.jpg)

---

## 3\. Reviewing and Updating the Jenkinsfile

The Jenkinsfile outlines the environment variables and defines various stages for building, testing, and deploying your application. It includes credentials for the kubeconfig file and AWS keys, which are necessary for working with Amazon EKS.

Below is the enhanced Jenkinsfile that includes stages for environment setup (with troubleshooting for kubeconfig permissions), testing, Docker Hub login, image building and pushing, and deployments to both staging and production clusters.

```
pipeline {
    agent any


    environment {
        IMAGE_NAME = 'sanjeevkt720/jenkins-flask-app'
        IMAGE_TAG = "${IMAGE_NAME}:${env.GIT_COMMIT}"
        KUBECONFIG = credentials('kubeconfig-credentials-id')
        AWS_ACCESS_KEY_ID = credentials('aws-access-key')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')
    }


    stages {
        stage('Setup') {
            steps {
                // List kubeconfig file permissions for troubleshooting.
                sh 'ls -la $KUBECONFIG'
                // Adjust file permissions if necessary.
                sh 'chmod 644 $KUBECONFIG'
                sh 'ls -la $KUBECONFIG'
                // Install Python dependencies.
                sh 'pip install -r requirements.txt'
            }
        }
        stage('Test') {
            steps {
                sh 'pytest'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-creds',
                                                  usernameVariable: 'USERNAME',
                                                  passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                    echo 'Docker login successful'
                }
            }
        }
        stage('Build and Push Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_TAG .'
                echo 'Docker image built successfully'
                sh 'docker image ls'
                sh 'docker push $IMAGE_TAG'
                echo 'Docker image pushed successfully'
            }
        }
        stage('Deploy to Staging') {
            steps {
                // Switch Kubernetes context to the staging cluster.
                sh 'kubectl config use-context user@staging.us-east-1.eksctl.io'
                sh 'kubectl config current-context'
                // Update the staging deployment image.
                sh "kubectl set image deployment/flask-app flask-app=$IMAGE_TAG"
                // Retrieve service endpoint and run acceptance tests.
                script {
                    def service = sh(script: "kubectl get svc flask-app-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}:{.spec.ports[0].port}'", returnStdout: true).trim()
                    echo "Service endpoint: ${service}"
                    sh "k6 run -e SERVICE=${service} acceptance-test.js"
                }
            }
        }
        stage('Deploy to Production') {
            steps {
                // Switch Kubernetes context to the production cluster.
                sh 'kubectl config use-context user@prod.us-east-1.eksctl.io'
                sh 'kubectl config current-context'
                // Update the production deployment image.
                sh "kubectl set image deployment/flask-app flask-app=$IMAGE_TAG"
            }
        }
    }
}
```

**Key highlights of this Jenkinsfile:**

- **Setup**: Lists and updates kubeconfig file permissions to ensure Jenkins has write access. It then installs the required Python dependencies.
- **Test**: Runs the test suite using pytest.
- **Login to Docker Hub**: Authenticates with Docker Hub using stored credentials.
- **Build and Push Docker Image**: Builds the Docker image, verifies it by listing images, and then pushes it to Docker Hub.
- **Deploy to Staging**: Switches to the staging Kubernetes context, updates the deployment's image, retrieves the service endpoint, and runs acceptance tests with K6.
- **Deploy to Production**: Switches the Kubernetes context to production and updates the deployment with the new image.

---

## 4\. Troubleshooting File Permission Issues

During one of the builds, a file permission error occurred when attempting to change the Kubernetes context, indicating that the kubeconfig file was not writable. To resolve this issue, the Jenkinsfile was enhanced with diagnostic commands that:

- List the kubeconfig file permissions using `ls -la $KUBECONFIG`.
- Adjust file permissions with `chmod 644 $KUBECONFIG`.
- Confirm the updated permissions before proceeding.

Review the Jenkins build output to verify that the permissions have been updated successfully. Once the permissions are correct, subsequent commands (such as switching contexts with `kubectl config use-context`) will execute without error.

![The image shows a Jenkins dashboard for an "EKS-Pipeline" with build history and status details, including recent build times and outcomes.](https://kodekloud.com/kk-media/image/upload/v1752879929/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Configuring-Jenkins-Pipeline-for-Kubernetes/jenkins-dashboard-eks-pipeline.jpg)

---

## 5\. Updating Application Code

After successfully deploying the initial version, you may update your application code. For example, consider the following HTML snippet for a simple Todo App (version 1):

```
<html>
<head>
    <style>
        .task-item {
        }
        .task-text {
            margin: 0;
        }
    </style>
</head>
<body>
    <h1>Todo App: v1</h1>
    <!-- Add Task Form -->
    <form method="post">
        <input type="text" name="task_content" placeholder="Enter a new task" />
        <input type="submit" name="add_task" value="Add Task" />
    </form>
    <!-- Display Tasks -->
</body>
</html>
```

When you update the app to a new version (e.g., version 2) and push the changes to Git, a new build will be triggered. Once the build completes successfully, verify that both the staging and production environments reflect the updated version.

---

By following these steps, you can implement a robust Jenkins pipeline that automates the build, testing, and deployment of a Dockerized application on Kubernetes using Amazon EKS. This streamlined pipeline also addresses common permission issues, ensuring a smooth continuous delivery workflow.

> [!important]
> **Key Benefit**
>
> Automating the deployment with Jenkins reduces manual errors and accelerates your development pipeline, helping you achieve faster delivery cycles while maintaining consistency across environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/1d8036bf-2606-4587-beef-925546e0c655/lesson/78e4d6a9-d800-4037-bb91-bc0313ef84f7)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/1d8036bf-2606-4587-beef-925546e0c655/lesson/5f22840b-1725-481b-834d-2633965d98b0)**
>
> Practice lab
