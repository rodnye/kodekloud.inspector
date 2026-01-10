# Cloud9 Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-CICD-Developer-Tools/Cloud9-Demo)

---

## Table of Contents

- Cloud9 Demo
  - Creating a Cloud9 Environment
  - Accessing Your Cloud9 Environment
  - Exploring the Cloud9 IDE
  - Using the Integrated Terminal
  - Integrated Git and AWS Explorer Features
  - Advanced Functionality and Collaboration
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS CICD Developer Tools

# Cloud9 Demo

In this article, we explore how to effectively set up and use [AWS Cloud9](https://aws.amazon.com/cloud9/)—a robust, cloud-hosted IDE that empowers you to write, run, and debug code directly in your browser.

## Creating a Cloud9 Environment

Begin by clicking on the **Create Environment** button. Enter a name for your environment (for example, "demo") and select your preferred environment type.

![The image shows the AWS Cloud9 interface for creating a new environment, where users can input details like name and description, and choose between a new EC2 instance or existing compute resources.](https://kodekloud.com/kk-media/image/upload/v1752857918/notes-assets/images/AWS-Certified-Developer-Associate-Cloud9-Demo/aws-cloud9-new-environment-interface.jpg)

At this stage, you can either launch a new EC2 instance or utilize an existing one. For demonstration purposes, we will create a new EC2 instance. Select the desired instance type (for instance, the most cost-effective option), choose the platform (e.g., Amazon Linux 2023), and set the timeout—here, the environment will automatically time out after 30 minutes of inactivity.

![The image shows an AWS console screen for creating a new EC2 instance, with options for instance type, platform, timeout settings, and network connection preferences.](https://kodekloud.com/kk-media/image/upload/v1752857920/notes-assets/images/AWS-Certified-Developer-Associate-Cloud9-Demo/aws-ec2-instance-creation-console.jpg)

> [!important]
> **Tip**
>
> When configuring your environment, consider setting a timeout that reflects your usage patterns to manage resources more efficiently.

## Accessing Your Cloud9 Environment

Next, determine how you want to access your Cloud9 environment. You can configure SSH for direct access or use AWS Systems Manager. Although you have the option to customize VPC and subnet settings, this demo will utilize the default VPC configuration. After all settings are in place, click **Create**.

Once the environment is ready, click the **Open** button. This action launches your Cloud9 IDE in a new browser tab.

![The image shows the AWS Cloud9 console with a list of environments, including one named "demo," which is an EC2 instance connected via AWS Systems Manager. A green notification bar indicates successful creation of the environment.](https://kodekloud.com/kk-media/image/upload/v1752857921/notes-assets/images/AWS-Certified-Developer-Associate-Cloud9-Demo/aws-cloud9-console-environment-demo.jpg)

## Exploring the Cloud9 IDE

Upon launching, the Cloud9 interface presents several key features:

- **File Explorer**: Located on the left, it displays all your source files, including a default README file.
- **Built-in Terminal**: Embedded at the bottom, this terminal is already configured with your AWS credentials and the AWS CLI.
- **Project Organization**: Easily create new folders (e.g., "src") and files (e.g., "index.js") to organize your projects.

![The image shows the AWS Cloud9 integrated development environment (IDE) with a README.md file open, displaying a welcome message and instructions for getting started. The interface includes a file explorer on the left and a terminal at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752857922/notes-assets/images/AWS-Certified-Developer-Associate-Cloud9-Demo/aws-cloud9-ide-readme-welcome.jpg)

## Using the Integrated Terminal

The built-in terminal in Cloud9 simplifies running AWS CLI commands without additional configuration. For example, you can list directory contents and verify the AWS CLI version:

```
user:~/environment $ ls
README.md  src
user:~/environment $ aws --version
aws-cli/2.15.32 Python/3.11.8 Linux/6.1.79-99.167.amzn2023.x86_64 exe/x86_64.amzn.2023 prompt/off
user:~/environment $
```

You can also run commands to interact with AWS services, such as listing your S3 buckets:

```
2023-10-15 14:25:13 antanna-demo-kokeloud
2023-10-15 14:25:14 aws-cloudtrail-logs-841869297337-ca2967c1
2023-10-16 21:27:12 cdk-hnb659fds-cf-templates-ij0aifuzfdko-us-east-1
2023-10-16 14:19:20 codepipeline-demo-sir
2023-10-21 23:14:12 config-bucket-841869297337
2023-10-22 01:37:19 elasticbeanstalk-us-east-1-841869297337
2023-10-22 05:37:17 elasticbeanstalk-us-west-1-841869297337
2023-10-22 06:37:17 kinesis-kokeloud-demo
user:~/environment $
```

> [!important]
> **Ensure Compatibility**
>
> Always verify that you are using the latest version of the AWS CLI to benefit from the latest features and security updates.

## Integrated Git and AWS Explorer Features

AWS Cloud9 comes with built-in Git support accessible via a graphical interface. You can initialize repositories, commit changes, and manage your version control processes without leaving the IDE.

Additionally, the AWS Explorer feature allows you to browse AWS resources—such as S3 buckets and ECS clusters—directly within Cloud9. This tight integration eliminates the need to alternate between the IDE and the AWS Management Console.

## Advanced Functionality and Collaboration

Cloud9 also offers advanced features to enhance your development experience:

- **Built-in Debugger**: Quickly diagnose and fix issues in your code.
- **Customizable Settings**: Tailor your environment settings to match your workflow.
- **Collaboration**: Share your Cloud9 environment via URL and define access permissions (read-only or read-write) to collaborate effectively with your team.

Here’s an example that demonstrates fetching CloudTrail logs using the terminal:

```
user@ip-172-31-53-172:~$ aws cloudtrail logs-841860297737-ca2967c1
aws cloudtrail logs-841860297737-default-smallisourcebucket-bcsnmevjiq5
cp observability-workshop-setupbucket-rztfn3hvk487q
cf-templates-llj9afziufdko-us-east-1
deploy-demo
config-bucket-841860297737
elasticbeanstalk-us-east-1-841860297737
elasticbeanstalk-us-west-1-841860297737
```

## Conclusion

This guide provided a step-by-step overview of setting up and using AWS Cloud9, from environment creation and terminal usage to leveraging integrated Git support and the AWS Explorer. Diving into AWS Cloud9 reveals a powerful toolset aimed at enhancing your productivity and streamlining your development workflow.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/184641b0-93ba-48d1-a9d7-1bc2b57db724/lesson/c6531634-eed1-4b94-9cc9-7f630d0add3c)**
>
> Watch video content
