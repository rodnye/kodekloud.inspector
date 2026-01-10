# Exam tips - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless-Application-Model-SAM/Exam-tips)

---

## Table of Contents

- Exam tips
  - Key AWS SAM CLI Commands
  - Understanding SAM Templates
  - Benefits of Using AWS SAM
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless Application Model SAM

# Exam tips

In this guide, we provide essential tips for the [AWS Certified Developer - Associate](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate) exam with a focus on AWS SAM (Serverless Application Model). AWS SAM is a toolkit that simplifies building serverless applications on AWS by allowing developers to define resources as code and deploy them using a CLI. This streamlined approach relies on AWS CloudFormation, meaning that SAM templates are eventually transformed into CloudFormation stacks.

## Key AWS SAM CLI Commands

AWS SAM CLI offers various commands to simplify the development, building, and deployment of serverless applications:

- **sam init**: Creates a new SAM project with a predefined directory structure.
- **sam build**: Compiles your serverless application into a deployment-ready package.
- **sam deploy**: Deploys your application to AWS. This command handles packaging and processes the CloudFormation transformation.
- **sam sync**: Updates the Lambda function code deployed on AWS by directly syncing it with your local code, bypassing the CloudFormation process.

![The image provides exam tips for AWS SAM, highlighting its use for building serverless applications, utilizing CloudFormation, and key CLI commands like SAM Init, SAM Build, SAM Deploy, and SAM Sync.](/images/AWS-Certified-Developer-Associate-Exam-tips/aws-sam-exam-tips-serverless.jpg)

## Understanding SAM Templates

In your SAM template, the `Transform` keyword is essential. It signals AWS to treat the template as a SAM template, converting it to CloudFormation code during deployment. Leveraging SAM policy templates further simplifies assigning permissions to Lambda functions based on common usage patterns.

> [!important]
> **Note**
>
> For a complete list of available SAM policy templates and additional details, refer to the [AWS SAM documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html).

![The image provides exam tips for AWS SAM, explaining the use of the "Transform" keyword, SAM policy templates, and where to find a list of templates.](/images/AWS-Certified-Developer-Associate-Exam-tips/aws-sam-exam-tips-transform.jpg)

## Benefits of Using AWS SAM

Using AWS SAM provides several benefits:

| Feature              | Benefits                                             | Example Command |
| -------------------- | ---------------------------------------------------- | --------------- |
| Project Scaffolding  | Quickly generates a new serverless project structure | `sam init`      |
| Build Process        | Transforms your code into a deployable package       | `sam build`     |
| Deployment           | Handles packaging and CloudFormation transformation  | `sam deploy`    |
| Code Synchronization | Syncs local updates directly with AWS Lambda         | `sam sync`      |

By mastering these concepts and commands, you'll be well-prepared for the serverless components of the AWS Certified Developer - Associate exam. This understanding not only enhances your deployment strategies but also ensures you are leveraging AWS best practices for building scalable serverless applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/26824094-9722-4ee8-a5f1-c862a88a2caf/lesson/fc7a2d83-b02c-4254-9606-a592f88144bf)**
>
> Watch video content
