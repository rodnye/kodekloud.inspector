# Deploy AWS EC2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Containerization-and-Deployment/Deploy-AWS-EC2)

---

## Table of Contents

- Deploy AWS EC2
  - Adding the AWS EC2 Deployment Stage
  - Generating the SSH Agent Block
  - Removing the Existing Container and Running the New Docker Image
  - Incorporating Scripted Steps into the Declarative Pipeline
  - Adding a When Condition for Feature Branches
  - Example of a Declarative Pipeline with a Script Block
  - Global Environment and Pipeline Configuration Overview
  - Verifying the Deployment
  - Using When Conditions for Controlled Deployment
  - Conclusion
  - Watch Video

---

## Content

Jenkins Pipelines

Containerization and Deployment

# Deploy AWS EC2

In this guide, you will learn how to deploy your Docker-based application on an [AWS EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) instance using a [Jenkins](https://learn.kodekloud.com/user/courses/jenkins) pipeline. We will introduce a new pipeline stage that deploys your application right after pushing the Docker image. This article details all the necessary modifications and explains each step in order.

---

## Adding the AWS EC2 Deployment Stage

After the "Push Docker Image" stage, we introduce a new stage named "Deploy - AWS EC2". The first step is to remove any references to the Docker registry. The basic structure of the pipeline stages is as follows:

```
stage('Build Docker Image') {
}


stage('Trivy Vulnerability Scanner') {
}


stage('Push Docker Image') {
    steps {
    }
}


post {
    always {
    }
}
```

Next, we add the AWS deployment stage using SSH:

```
stage('Deploy - AWS EC2') {
    steps {
    }
}
```

> [!important]
> **Note**
>
> Ensure the SSH Agent plugin is installed in [Jenkins](https://learn.kodekloud.com/user/courses/jenkins) and you have set up the correct credentials (including the private key and the username, "ubuntu") necessary for connecting to your [AWS EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) instance.

---

## Generating the SSH Agent Block

You can generate an SSH agent snippet by searching for "SSH". This snippet will help you insert the proper command using your credentials. The following code demonstrates the required SSH configuration:

```
stage('Deploy - AWS EC2') {
    steps {
        sshagent(['aws-dev-deploy-ec2-instance']) {
            sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@3.140.244.188 "
                if sudo docker ps -a | grep -q 'solar-system'; then
                    echo "Container found. Stopping..."
                    sudo docker stop "solar-system" && sudo docker rm "solar-system"
                    echo "Container stopped and removed."
                fi
            '''
        }
    }
}
```

In this command, the SSH option `StrictHostKeyChecking=no` prevents runtime prompts when connecting to a new host. Note that the EC2 instance’s IP address is hard-coded, so you might consider making this dynamic later.

---

## Removing the Existing Container and Running the New Docker Image

Before deploying the new Docker image, the script connects to the EC2 instance and checks if a container named "solar-system" is already running. If found, it stops and removes the container. Below is an improved version of the deployment command:

```
stage('Deploy - AWS EC2') {
    steps {
        sshagent(['aws-dev-deploy-ec2-instance']) {
            sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@3.140.244.188 "
                if sudo docker ps -a | grep -q 'solar-system'; then
                    echo "Container found. Stopping..."
                    sudo docker stop "solar-system" && sudo docker rm "solar-system"
                    echo "Container stopped and removed."
                fi

                sudo docker run --name solar-system \\
                    -e MONGO_URI=$MONGO_URI \\
                    -e MONGO_USERNAME=$MONGO_USERNAME \\
                    -e MONGO_PASSWORD=$MONGO_PASSWORD \\
                    -p 3000:3000 -d siddharth67/solar-system:$GIT_COMMIT
                "
            '''
        }
    }
}
```

This block stops and removes any existing container before starting a new one with:

- Environment variables for MongoDB (`MONGO_URI`, `MONGO_USERNAME`, and `MONGO_PASSWORD`)
- Port mapping from 3000 to 3000
- The Docker image tagged with `$GIT_COMMIT` from Docker Hub

---

## Incorporating Scripted Steps into the Declarative Pipeline

Because the Jenkins Declarative Pipeline does not directly support inline Groovy conditional statements, use the `script` block to execute such commands. Below is the complete deployment stage with the `script` block:

```
stage('Deploy - AWS EC2') {
    steps {
        script {
            sshagent(['aws-dev-deploy-ec2-instance']) {
                sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@3.140.244.188 "
                    if sudo docker ps -a | grep -q 'solar-system'; then
                        echo 'Container found. Stopping...'
                        sudo docker stop 'solar-system' && sudo docker rm 'solar-system'
                        echo 'Container stopped and removed.'
                    fi
                    sudo docker run --name solar-system \\
                        -e MONGO_URI=$MONGO_URI \\
                        -e MONGO_USERNAME=$MONGO_USERNAME \\
                        -e MONGO_PASSWORD=$MONGO_PASSWORD \\
                        -p 3000:3000 -d siddharth67/solar-system:$GIT_COMMIT
                    "
                '''
            }
        }
    }
}
```

Using the `script` block ensures that your shell commands with control structures execute correctly within the declarative pipeline.

---

## Adding a When Condition for Feature Branches

To ensure that the AWS deployment stage executes only on feature branches, use the `when` condition with a branch pattern. Below is the final version of the deployment stage with this condition:

```
stage('Deploy - AWS EC2') {
    when {
        branch 'feature/*'
    }
    steps {
        script {
            sshagent(['aws-dev-deploy-ec2-instance']) {
                sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@3.140.244.188 "
                    if sudo docker ps -a | grep -q 'solar-system'; then
                        echo "Container found. Stopping..."
                        sudo docker stop "solar-system" && sudo docker rm "solar-system"
                        echo "Container stopped and removed."
                    fi
                    sudo docker run --name solar-system \\
                        -e MONGO_URI=$MONGO_URI \\
                        -e MONGO_USERNAME=$MONGO_USERNAME \\
                        -e MONGO_PASSWORD=$MONGO_PASSWORD \\
                        -p 3000:3000 -d siddharth67/solar-system:$GIT_COMMIT
                    "
                '''
            }
        }
    }
}
```

The `when` clause checks if the branch name starts with "feature". If it matches, the stage is executed.

---

## Example of a Declarative Pipeline with a Script Block

Below is a simplified example of a complete declarative Jenkins pipeline that uses a `script` block for running a loop:

```
pipeline {
    agent any
    stages {
        stage('Example') {
            steps {
                echo 'Hello World'
                script {
                    def browsers = ['chrome', 'firefox']
                    for (int i = 0; i < browsers.size(); ++i) {
                        echo "Testing the ${browsers[i]} browser"
                    }
                }
            }
        }
    }
}
```

This example demonstrates the requirement for using the `script` block when incorporating control structures in a declarative pipeline.

---

## Global Environment and Pipeline Configuration Overview

The snippet below shows the global configuration in the Jenkinsfile, including environment variables and tooling setup:

```
pipeline {
    agent any


    tools {
    }


    environment {
        MONGO_URI = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
        MONGO_DB_CREDS = credentials('mongo-db-credentials')
        MONGO_USERNAME = credentials('mongo-db-username')
        MONGO_PASSWORD = credentials('mongo-db-password')
        SONAR_SCANNER_HOME = tool 'sonarqube-scanner-610'
    }


    options {
    }


    stages {
        stage('Installing Dependencies') {
        }

        stage('Dependency Scanning') {
        }

        stage('Unit Testing') {
        }

        stage('Code Coverage') {
        }
    }
}
```

This configuration sets up global variables and credentials that can be used across multiple stages in your pipeline, including the AWS deployment.

---

## Verifying the Deployment

After the pipeline runs, you can verify the deployment by checking the logs. You should see messages indicating that SSH has connected to your EC2 instance, checked for the "solar-system" container, and removed it if necessary. An example log output might look like:

```
+ ssh -o StrictHostKeyChecking=no ubuntu@3.140.244.188 "if sudo docker ps -a | grep -q 'solar-system'; then echo 'Container found. Stopping...' && sudo docker stop 'solar-system' && sudo docker rm 'solar-system'; fi"
```

Once the container is removed, Docker pulls the new image (if not already available) and starts the container. To verify, log into your [AWS EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) instance and run:

```
sudo docker ps
```

This command should display the container running on port 3000. Accessing the public IP address on port 3000 will confirm that your application has been deployed successfully.

---

## Using When Conditions for Controlled Deployment

Below is an image that visually demonstrates how you can configure when conditions in the Jenkins interface. Do not modify the image link or its description:

![The image shows a Jenkins interface with a dropdown menu for selecting conditions to execute a stage in a pipeline. Various options like "allOf," "anyOf," and "branch" are visible for configuring execution conditions.](https://kodekloud.com/kk-media/image/upload/v1752879629/notes-assets/images/Jenkins-Pipelines-Deploy-AWS-EC2/jenkins-pipeline-conditions-dropdown.jpg)

This dropdown allows you to configure conditions—such as selecting a branch—to ensure that specific stages run only when those conditions are met.

---

## Conclusion

In this article, we enhanced our [Jenkins](https://learn.kodekloud.com/user/courses/jenkins) pipeline to deploy Docker containers onto an [AWS EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) instance by:

- Utilizing the SSH agent to securely connect to EC2.
- Checking for and removing an existing "solar-system" container before deploying the new container.
- Implementing Docker commands within a `script` block to support conditional logic.
- Adding a `when` condition to ensure that the deployment stage only executes for feature branches.

In the next article, we will cover integration testing procedures to verify that your deployed application performs as expected post-deployment.

Thank you for reading!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/a1289a46-be38-4446-a056-0b9730d05dfd/lesson/a5392b8d-0874-4806-a052-f10c2d4754f3)**
>
> Watch video content
