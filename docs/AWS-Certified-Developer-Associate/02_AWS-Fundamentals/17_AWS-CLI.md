# AWS CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/AWS-CLI)

---

## Table of Contents

- AWS CLI
  - Example: Creating an EC2 Instance
  - Benefits of Using AWS CLI
  - Configuring AWS CLI Credentials
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# AWS CLI

Learn how to leverage the AWS Command Line Interface (CLI) to manage your AWS resources quickly and efficiently. Unlike the AWS Management Console, which requires navigating multiple windows, the AWS CLI lets you interact directly with AWS services using simple commands. This approach not only speeds up operations but also simplifies routine tasks like creating an EC2 instance.

## Example: Creating an EC2 Instance

To create an EC2 instance using the AWS CLI, execute a command similar to the following:

```
aws ec2 run-instances --image-id ami-xxxxxxxx --count 1 --instance-type t2.micro --key-name MyKeyPair --security-group-ids sg-903004f8 --subnet-id subnet-6e7f829e
```

This command utilizes the `run-instances` operation in the EC2 service. Each flag (such as `--image-id`, `--count`, `--instance-type`, `--key-name`, `--security-group-ids`, and `--subnet-id`) corresponds to the parameters you would normally configure via the AWS console.

## Benefits of Using AWS CLI

The AWS CLI offers several key advantages:

1.  **Efficiency:**  
    Using the CLI is much faster compared to the console. Instead of clicking through menus, you execute commands, making it convenient to copy, paste, and share instructions with colleagues.
2.  **Enhanced Configuration Options:**  
    Some advanced features and settings are accessible only through the CLI, offering you greater control over AWS services.
3.  **Collaboration:**  
    Command-line instructions standardize operations and simplify troubleshooting. CLI logs provide quick insights into any issues without the need to sift through the console interface.

> [!important]
> **Note**
>
> For many scenarios, using the CLI will streamline your workflow and maintain consistency across your team.

![The image displays four colorful icons representing benefits: Efficiency, Configuration Options, Collaboration, and Troubleshooting. Each icon is numbered and has a corresponding graphic.](https://kodekloud.com/kk-media/image/upload/v1752858111/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CLI/benefits-icons-efficiency-config-collab-troubleshoot.jpg)

## Configuring AWS CLI Credentials

To communicate with AWS, the CLI requires valid credentials, which you can obtain from AWS Identity and Access Management (IAM). These credentials consist of an access key and a secret key tied to a specific IAM user account.

The diagram below outlines the process of transmitting these credentials from the user to IAM via the CLI:

![The image illustrates the flow of AWS credentials from a user to the AWS Identity and Access Management (IAM) via a Command Line Interface (CLI).](https://kodekloud.com/kk-media/image/upload/v1752858112/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CLI/aws-credentials-flow-iam-cli.jpg)

After securing your credentials, configure the CLI by setting your access key and secret key as follows:

```
ACCESS_KEY: 2jf234234234
SECRET_KEY: aaaj0032kfss
```

Once configured, the AWS CLI can authenticate your requests and enable you to efficiently create or modify AWS resources.

For more detailed information on AWS CLI commands and configurations, refer to the [AWS CLI Documentation](https://aws.amazon.com/cli/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/b2683746-59f4-42d4-9e1d-58bc4b4efe20)**
>
> Watch video content
