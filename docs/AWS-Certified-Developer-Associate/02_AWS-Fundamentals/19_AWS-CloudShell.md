# AWS CloudShell - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/AWS-CloudShell)

---

## Table of Contents

- AWS CloudShell
  - Traditional AWS CLI Setup
  - Simplified Workflow with AWS CloudShell
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# AWS CloudShell

AWS CloudShell is an integrated terminal available directly in the AWS Console, providing a preconfigured AWS CLI environment. This means you can start executing commands immediately without the need for local setup or additional configuration.

> [!important]
> **Note**
>
> AWS CloudShell automatically uses the credentials of the AWS Console user you are logged in as, streamlining your workflow by eliminating manual authentication steps.

## Traditional AWS CLI Setup

Before utilizing AWS CloudShell, many users follow the traditional setup process for the AWS CLI on their local machines. Typically, this involves:

1.  Installing the AWS CLI on your machine.
2.  Generating AWS credentials from AWS Identity and Access Management (IAM).
3.  Configuring the AWS CLI with the generated credentials.
4.  Opening a terminal and running the desired commands.

![The image is a guide for setting up AWS CLI, showing four steps: installing AWS CLI, generating AWS credentials from IAM, configuring AWS CLI with credentials, and running commands on the terminal. It includes a CLI icon and is labeled "CloudShell."](https://kodekloud.com/kk-media/image/upload/v1752858129/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CloudShell/aws-cli-setup-guide-cloudshell.jpg)

## Simplified Workflow with AWS CloudShell

There are scenarios where setting up everything locally can be cumbersome, especially for quick tasks such as verifying configurations, launching a simple command, or performing minor deletions. AWS CloudShell provides an immediate solution by offering:

- A preconfigured AWS CLI environment.
- Instant command execution using your active AWS Console session.
- Elimination of the need to manually manage local CLI configurations.

For example, with AWS CloudShell, you can execute an AWS CLI command like:

```
aws ec2 run-instances
```

This command runs using the credentials of the user currently logged into the AWS Console, offering a streamlined and efficient workflow.

> [!important]
> **Quick Tip**
>
> Consider using AWS CloudShell when working on machines that aren’t preconfigured with AWS tools or when you need a fast, reliable environment for AWS CLI operations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/510151eb-1657-4f5e-a16b-660fe388c4f7)**
>
> Watch video content
