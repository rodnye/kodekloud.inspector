# Exploring AWS and Setting up Jenkins Instance - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Containerization-and-Deployment/Exploring-AWS-and-Setting-up-Jenkins-Instance)

---

## Table of Contents

- Exploring AWS and Setting up Jenkins Instance
  - Viewing Your AWS EC2 Instance
  - Configuring AWS Credentials for Jenkins
  - Installing the AWS Step Functions Plugin in Jenkins
  - Adding AWS Credentials in Jenkins
  - Configuring SSH for EC2 Instance Access
  - Summary
  - Watch Video

---

## Content

Jenkins Pipelines

Containerization and Deployment

# Exploring AWS and Setting up Jenkins Instance

In this guide, we launch into the deployment phase of our pipeline by leveraging several AWS services—EC2, S3, and Lambda—and by configuring Jenkins with the appropriate AWS credentials. Follow along for a step-by-step walkthrough of setting up your AWS environment and integrating it with Jenkins.

---

## Viewing Your AWS EC2 Instance

Begin by logging into the AWS Management Console and navigating to the EC2 dashboard. Here, you'll notice an instance named "dev deploy" that is currently running.

![The image shows an AWS EC2 console displaying details of a running instance named "dev-deploy" with instance ID "i-0457e1f4819e4dc85". It includes information such as the instance type (t2.micro), public and private IP addresses, and status checks.](https://kodekloud.com/kk-media/image/upload/v1752879630/notes-assets/images/Jenkins-Pipelines-Exploring-AWS-and-Setting-up-Jenkins-Instance/aws-ec2-console-dev-deploy-instance.jpg)

After connecting to this plain Ubuntu EC2 instance (which comes with Docker pre-installed), you can verify the active Docker container with the following command:

```
ubuntu@ip-172-31-25-250:~$ sudo docker ps
CONTAINER ID        IMAGE                                       NAMES
1f09299ee8feb      siddharth67/solar-system:7d1e24920bd455706b179c6724d556c6d979634   0.0.0.0:3000->3000/tcp   solar-system
```

The output confirms that the "solar system" container is running. This container, created three days ago, serves as the target virtual machine where the new image will be deployed from the feature branch.

---

## Configuring AWS Credentials for Jenkins

As part of our deployment process, we will eventually push artifacts to an S3 bucket and deploy Lambda functions. To enable Jenkins to interact with these services (EC2, S3, and Lambda), you need an IAM user with the appropriate credentials.

Visit the IAM dashboard in the AWS console and locate the user named "jenkins-user," which has been configured with full access policies for Amazon EC2, Amazon S3, and AWS Lambda.

![The image shows an AWS Identity and Access Management (IAM) console screen for a user named "jenkins-user," displaying their permissions policies, which include AmazonEC2FullAccess, AmazonS3FullAccess, and AWSLambda_FullAccess.](https://kodekloud.com/kk-media/image/upload/v1752879631/notes-assets/images/Jenkins-Pipelines-Exploring-AWS-and-Setting-up-Jenkins-Instance/aws-iam-console-jenkins-user-permissions.jpg)

> [!important]
> **Note**
>
> Although full access is provided for demo purposes, it is recommended to use the principle of least privilege in production environments.

After attaching the policies, you will receive an access key and a secret key. Store these credentials securely in Jenkins.

![The image shows an AWS Identity and Access Management (IAM) console screen, displaying user details, including access keys and multi-factor authentication settings.](https://kodekloud.com/kk-media/image/upload/v1752879633/notes-assets/images/Jenkins-Pipelines-Exploring-AWS-and-Setting-up-Jenkins-Instance/aws-iam-console-user-details.jpg)

---

## Installing the AWS Step Functions Plugin in Jenkins

Next, you need to configure Jenkins to store the AWS credentials. Start by installing the AWS Step Functions plugin (also known as the AWS Steps plugin) along with other AWS-related plugins available in Jenkins.

![The image shows a Jenkins interface displaying the download progress of various plugins, with some marked as "Success" and others as "Pending." The left sidebar includes options like Updates, Available plugins, Installed plugins, and Download progress.](https://kodekloud.com/kk-media/image/upload/v1752879634/notes-assets/images/Jenkins-Pipelines-Exploring-AWS-and-Setting-up-Jenkins-Instance/jenkins-plugin-download-progress-interface.jpg)

Once the plugins are installed, restart Jenkins. For a comprehensive overview of the plugin capabilities—including operations on S3 buckets, deployment APIs, SNS publishing, ECR, and ELBs—refer to the official documentation.

![The image shows a webpage from Jenkins documentation, detailing features of a plugin for interacting with AWS API, including a list of pipeline steps and related links.](https://kodekloud.com/kk-media/image/upload/v1752879635/notes-assets/images/Jenkins-Pipelines-Exploring-AWS-and-Setting-up-Jenkins-Instance/jenkins-aws-api-plugin-features.jpg)

Below is an example snippet showing how you can use the plugin in a Jenkins pipeline to interact with S3:

```
exists = s3DoesObjectExist(bucket: 'my-bucket', path: 'path/to/source/file.txt')


files = s3FindFiles(bucket: 'my-bucket')
files = s3FindFiles(bucket: 'my-bucket', glob: 'path/to/targetFolder/file.ext')
files = s3FindFiles(bucket: 'my-bucket', path: 'path/to/targetFolder/', glob: 'file.ext')
files = s3FindFiles(bucket: 'my-bucket', path: 'path/to/targetFolder/', glob: '*')
```

After confirming that the plugin installation is complete, you can proceed to create the AWS credentials in Jenkins.

---

## Adding AWS Credentials in Jenkins

To add your AWS credentials, navigate to:

Manage Jenkins > Credentials > Global > Add Credentials

Select the AWS credentials type provided by the plugin. For this demonstration, name the credential "AWS S3-EC2-Lambda" and provide the description "AWS credentials." Input the access key and secret key obtained from AWS, then click Create.

Upon successful creation, Jenkins will confirm that the credentials are valid and have access to multiple availability zones.

![The image shows a Jenkins interface displaying AWS credentials, including an Access Key ID and a concealed Secret Access Key, with options for managing these credentials.](https://kodekloud.com/kk-media/image/upload/v1752879636/notes-assets/images/Jenkins-Pipelines-Exploring-AWS-and-Setting-up-Jenkins-Instance/jenkins-aws-credentials-interface.jpg)

---

## Configuring SSH for EC2 Instance Access

In addition to using AWS credentials, SSH access to the EC2 instance is required. This is achieved using a private key. In Jenkins, install the SSH Agent plugin which simplifies providing SSH credentials to your builds.

After the SSH Agent plugin is installed, add a new credential by navigating to:

Manage Jenkins > Credentials > Global > Add Credentials

Select "SSH Username with private key," use "Ubuntu" as the username, and paste your private key. It is advisable to name this credential "AWS DevOps deploy EC2 instance" with the description "SSH username and private key for EC2."

![The image shows a Jenkins interface where a user is adding new credentials, with options like "Username with password" and "SSH Username with private key" visible in a dropdown menu.](https://kodekloud.com/kk-media/image/upload/v1752879637/notes-assets/images/Jenkins-Pipelines-Exploring-AWS-and-Setting-up-Jenkins-Instance/jenkins-add-credentials-interface.jpg)

---

## Summary

In this article, we have:

- Reviewed the AWS EC2 dashboard and verified that our instance is running a Docker container.
- Configured an IAM user with full access to EC2, S3, and Lambda services.
- Installed the AWS Step Functions plugin in Jenkins and stored the necessary AWS credentials.
- Set up SSH access by installing the SSH Agent plugin and adding the EC2 instance's private key.

In the next article, we will create a pipeline stage that connects to the EC2 instance and deploys the Docker image.

Thank you for reading.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/a1289a46-be38-4446-a056-0b9730d05dfd/lesson/b75b3b60-4cfd-4d4f-b416-57be4e9c6bf0)**
>
> Watch video content
