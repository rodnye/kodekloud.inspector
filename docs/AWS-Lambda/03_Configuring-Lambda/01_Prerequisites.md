# Prerequisites - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Configuring-Lambda/Prerequisites)

---

## Table of Contents

- Prerequisites
  - AWS Lambda Configuration Methods
  - IAM User Accounts and Permissions
  - Watch Video
    - 1. AWS Management Console
    - 2. AWS Command Line Interface (CLI)
    - 3. AWS SDKs
    - 4. AWS CloudFormation
    - 5. AWS Serverless Application Model (SAM)

---

## Content

AWS Lambda

Configuring Lambda

# Prerequisites

Before we dive into configuring AWS Lambda functions, make sure you have the following:

- An active AWS account (free tier available)
- AWS credentials with permissions to create and manage Lambda functions
- Basic familiarity with terminal commands (for CLI demos)

## AWS Lambda Configuration Methods

You can set up and manage Lambda functions using five methods:

| Method                                 | Description                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| AWS Management Console                 | Graphical interface for creating, configuring, and monitoring functions                          |
| AWS Command Line Interface             | Scriptable command-line tool for automation and rapid deployments                                |
| AWS SDKs                               | Language-specific libraries (Python, JavaScript, Java, etc.) to invoke and manage functions      |
| AWS CloudFormation                     | JSON/YAML templates for “infrastructure as code,” enabling versioning and repeatable deployments |
| AWS Serverless Application Model (SAM) | Extension of CloudFormation with shorthand syntax and pre-built serverless templates             |

---

### 1\. AWS Management Console

The AWS Management Console is the most straightforward way to interact with Lambda:

1.  Open your browser and navigate to the AWS Console: https://aws.amazon.com/console
2.  Sign in with your AWS account or create a free tier account if needed.

> [!important]
> **Note**
>
> Many AWS services—including Lambda—offer a monthly free tier. Track your usage and delete any test resources to avoid unexpected charges.

---

### 2\. AWS Command Line Interface (CLI)

The AWS CLI lets you automate Lambda operations directly from your terminal.

1.  Download and install the AWS CLI: https://aws.amazon.com/cli/
2.  Follow instructions for Windows, macOS, or Linux.
3.  Configure your credentials and default region:

```
aws configure
```

![The image provides information about the AWS Command Line Interface (CLI), including a download link and supported operating systems: Windows, MacOS, and Linux.](https://kodekloud.com/kk-media/image/upload/v1752863161/notes-assets/images/AWS-Lambda-Prerequisites/aws-cli-download-supported-os-info.jpg)

---

### 3\. AWS SDKs

[AWS SDKs](https://aws.amazon.com/developer/tools/) enable you to manage Lambda functions within your application code. Available for multiple languages:

- Python (`boto3`)
- Node.js (`aws-sdk`)
- Java (`AWS SDK for Java`)

Use familiar language constructs to deploy, invoke, and monitor functions.

---

### 4\. AWS CloudFormation

Define your serverless infrastructure in JSON or YAML templates with [AWS CloudFormation](https://aws.amazon.com/cloudformation/). Benefits include:

- Version control for templates
- Repeatable, automated deployments
- Integration with CI/CD pipelines

![The image shows two ways to configure AWS Lambda: AWS CloudFormation and AWS Serverless Application Model.](https://kodekloud.com/kk-media/image/upload/v1752863162/notes-assets/images/AWS-Lambda-Prerequisites/aws-lambda-configuration-cloudformation-serverless.jpg)

---

### 5\. AWS Serverless Application Model (SAM)

[AWS SAM](https://aws.amazon.com/serverless/sam/) extends CloudFormation with a simplified syntax for serverless resources:

```
Resources:
  MyFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs14.x
      CodeUri: ./src
```

SAM also provides built-in commands to build, test, and deploy locally or to AWS.

---

## IAM User Accounts and Permissions

To manage Lambda functions, you need an AWS identity with the correct permissions. You can use:

- **Root user account** (not recommended for daily operations)
- **IAM user or role** with administrative or scoped permissions

> [!important]
> **Warning**
>
> Avoid using the root account for routine tasks. Instead, create an IAM user with only the permissions required for Lambda operations.

If you must manage IAM users or policies, visit the [AWS IAM console](https://aws.amazon.com/iam/).

![The image shows two icons representing user accounts, labeled "Root User Account" and "Administrative User Account," under the heading "Prerequisites."](https://kodekloud.com/kk-media/image/upload/v1752863163/notes-assets/images/AWS-Lambda-Prerequisites/user-accounts-root-admin-prerequisites.jpg)

---

With your environment ready and permissions in place, you’re all set to create your first Lambda function. In the next section, we’ll walk through building a simple “Hello World” function from scratch and then explore AWS-provided blueprints to accelerate development. Let’s get started!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/8fef3e34-137a-46d4-8dec-61fb5bae4e0e/lesson/49538093-5c9a-4b6d-926b-6e2cd241acd0)**
>
> Watch video content
