# SAM Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless-Application-Model-SAM/SAM-Basics)

---

## Table of Contents

- SAM Basics
  - Key Benefits of SAM
  - Core Components of SAM
  - Leveraging the SAM CLI
  - Continuous Development with SAM Sync
  - Summary
  - Watch Video
    - SAM Template Details

---

## Content

AWS Certified Developer - Associate

Serverless Application Model SAM

# SAM Basics

In this lesson, we will explore the AWS Serverless Application Model (SAM) and learn how it simplifies the development, deployment, and management of serverless applications.

Imagine constructing a house with a skilled crew. While they could build it manually, having a set of specialized tools significantly speeds up and simplifies the process. In the same way, SAM serves as a powerful toolkit that streamlines serverless application development by automating key tasks.

## Key Benefits of SAM

- Simplifies deployment by allowing you to define serverless applications and infrastructure as code, eliminating the need for manual configuration via the AWS Console.
- As an extension of AWS CloudFormation, SAM ensures reliability through features such as automated rollbacks and version management.
- Supports local development, testing, and debugging. You can invoke Lambda functions on your local machine, thereby accelerating your development cycle.

SAM integrates seamlessly with AWS services like Lambda, DynamoDB, and API Gateway, making it an essential tool for modern serverless architectures.

![The image outlines the features of the Serverless Application Model (SAM), including simplified serverless deployment, extension of AWS CloudFormation, local development and testing, and integration with AWS services.](https://kodekloud.com/kk-media/image/upload/v1752859438/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics/serverless-application-model-features.jpg)

By using SAM templates, you can provision and manage these services efficiently. Additionally, SAM fits well within CI/CD pipelines to automate build, test, and deployment processes, ensuring a consistent release workflow.

## Core Components of SAM

SAM consists of three main components:

1.  **SAM Template**: A configuration file that details all the AWS resources to be created.
2.  **SAM CLI**: A command-line tool for building and deploying your serverless applications.
3.  **SAM Repository**: A managed repository for storing and sharing reusable serverless applications.

![The image shows three components of SAM: SAM Template, SAM CLI, and SAM Repository, each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752859440/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics/sam-template-cli-repository-icons.jpg)

### SAM Template Details

The SAM template is akin to a CloudFormation template but is customized for serverless applications. For example, if you need to configure a Lambda function or an API Gateway, you would specify them in the SAM template along with details such as the function name, runtime, handler, and code location.

![The image is a diagram of a SAM (Serverless Application Model) template, showing components for Lambda and API Gateway with fields like Name, Runtime, Handler, Code Location, Type, and Path.](https://kodekloud.com/kk-media/image/upload/v1752859441/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics/sam-template-lambda-api-gateway-diagram.jpg)

Moreover, the template can include output sections to display critical information, such as the API Gateway URL after deployment.

![The image is a diagram of a SAM (Serverless Application Model) template, showing components for Lambda and API Gateway, including fields like Name, Runtime, Type, and Path.](https://kodekloud.com/kk-media/image/upload/v1752859443/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics/sam-template-lambda-api-gateway-diagram-2.jpg)

Every SAM template begins with two crucial lines: the AWS template version and the transform declaration. The transform keyword instructs AWS to convert the SAM syntax into CloudFormation code during deployment. For instance:

```
AWSTemplateFormatVersion: '2010-09-09'
Transform: 'AWS::Serverless-2016-10-31'
Description: A simple AWS SAM template for a serverless application.
```

> [!important]
> **Note**
>
> The transform declaration is essential—it enables AWS to process the SAM template as CloudFormation, ensuring seamless resource management.

## Leveraging the SAM CLI

The SAM CLI is designed to simplify both the initial scaffolding of your project and the ongoing deployment process. Here are some key SAM CLI commands:

- **sam init**: Initializes a new SAM application, setting up a template, a basic function, and boilerplate documentation.
- **sam build**: Compiles your source code, resolves dependencies, processes the SAM template, and prepares the deployment package.
- **sam deploy**: Packages and deploys your application to AWS, converting the SAM template into a CloudFormation stack, uploading artifacts to an S3 bucket, and deploying the stack.
- **sam logs**: Retrieves, tails, and filters logs from your AWS Lambda functions, which is extremely useful for debugging and monitoring.
- **sam local invoke**: Executes Lambda functions locally for testing without deploying to AWS.
- **sam validate**: Checks your SAM template for configuration errors.
- **sam publish**: Publishes your application to the AWS Serverless Application Repository.

The typical workflow with SAM involves initializing your project with `sam init`, building it with `sam build`, and deploying it with `sam deploy`. Previously, the `sam package` command was used to handle deployment artifacts, but its functionality is now incorporated into the `sam deploy` process.

![The image illustrates a DevOps workflow for deploying AWS Lambda functions using AWS SAM, involving steps like initialization, building, packaging, and deployment through services like S3, CloudFormation, and API Gateway.](https://kodekloud.com/kk-media/image/upload/v1752859444/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics/devops-workflow-aws-lambda-sam.jpg)

## Continuous Development with SAM Sync

One of the standout features of SAM is the **sam sync** command. This command automatically synchronizes your local code changes with AWS Lambda, allowing for continuous iteration without manually redeploying changes each time.

![The image illustrates the process of syncing code from a local machine to AWS Lambda using "SAM Sync."](https://kodekloud.com/kk-media/image/upload/v1752859445/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics/aws-lambda-sam-sync-process.jpg)

## Summary

SAM is a robust toolkit designed to enable developers to build, deploy, and manage serverless applications on AWS efficiently. It allows you to define AWS resources as code, leverages AWS CloudFormation for reliable deployments, and offers a powerful CLI with commands including init, build, deploy, and sync.

![The image is a summary of AWS SAM, highlighting its features such as ease of building serverless applications, defining resources through code, using CloudFormation, and key commands like init, build, package, and deploy. It also mentions SAM sync for code synchronization.](https://kodekloud.com/kk-media/image/upload/v1752859446/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics/aws-sam-summary-features.jpg)

Embrace SAM to streamline your serverless application development and enjoy a more efficient, automated, and scalable workflow for AWS deployments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/26824094-9722-4ee8-a5f1-c862a88a2caf/lesson/66725755-0ec4-4ea1-b442-7ce78fc6912b)**
>
> Watch video content
