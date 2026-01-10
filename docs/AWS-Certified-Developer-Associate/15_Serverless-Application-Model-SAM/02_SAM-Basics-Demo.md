# SAM Basics Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless-Application-Model-SAM/SAM-Basics-Demo)

---

## Table of Contents

- SAM Basics Demo
  - Installing the AWS SAM CLI
  - Creating a Basic Lambda Function
  - Deploying the Application
  - Verifying Resource Creation
  - Invoking the Lambda Function from the CLI
  - Updating Code Efficiently with SAM Sync
  - Listing Deployed Resources
  - Cleaning Up
  - Watch Video
    - Setting Up the Project Structure
    - Creating the SAM Template
    - Running a Guided Deployment
    - In S3
    - In CloudFormation
    - In Lambda

---

## Content

AWS Certified Developer - Associate

Serverless Application Model SAM

# SAM Basics Demo

In this guide, we demonstrate how to use the AWS SAM CLI to create, deploy, and update a basic Lambda function application. We'll cover installing the SAM CLI, creating a sample Hello World Lambda function, deploying it using SAM, and efficiently updating your function using the SAM sync command.

---

## Installing the AWS SAM CLI

Before you begin, review the AWS Serverless Application Model Developer Guide's Getting Started section for installation instructions specific to your operating system. For instance, when following the Linux instructions, you will find a downloadable installer.

![The image shows a webpage from the AWS documentation, specifically the AWS Serverless Application Model Developer Guide, detailing the installation process for the AWS SAM CLI. It includes prerequisites and steps for first-time installation.](https://kodekloud.com/kk-media/image/upload/v1752859427/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics-Demo/aws-sam-cli-installation-guide.jpg)

Likewise, Linux and macOS users have dedicated installers or package options, while Windows users can download and run the appropriate installer.

![The image shows a webpage from the AWS documentation site, specifically the section on installing the AWS SAM CLI, with instructions for different operating systems.](https://kodekloud.com/kk-media/image/upload/v1752859429/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics-Demo/aws-sam-cli-installation-guide-2.jpg)

![The image shows a webpage from the AWS Serverless Application Model Developer Guide, specifically detailing instructions for installing the AWS SAM CLI on macOS. It includes information about package installer options for different Mac hardware.](https://kodekloud.com/kk-media/image/upload/v1752859430/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics-Demo/aws-sam-cli-install-macos-guide.jpg)

After installation, verify it by running:

```
sam --version
```

You should see output similar to:

```
SAM CLI, <latest version>
```

For example, on a Windows machine, the command might return:

```
Microsoft Windows [Version 10.0.22631.3296]
(c) Microsoft Corporation. All rights reserved.


C:\Users\sanje\OneDrive\Documents\courses-sanjeev-desktop\aws-developer-associate\MAS-Basics>sam --version
SAM CLI, version 1.114.0


C:\Users\sanje\OneDrive\Documents\courses-sanjeev-desktop\aws-developer-associate\MAS-Basics>
```

It's also recommended to review available commands and options by running:

```
sam --help
```

Some essential commands include:

- **docs** – Opens the CLI documentation in your browser.
- **init** – Bootstraps a new AWS SAM application.
- **build** – Builds your serverless function code.
- **sync** – Synchronizes your changes with AWS.
- **package** and **deploy** – Package and deploy your Lambda functions and configurations.

---

## Creating a Basic Lambda Function

In this section, we will manually create the files for our Lambda function. In future demos, we will use the SAM CLI init command to bootstrap projects.

### Setting Up the Project Structure

1.  Create a folder called `Hello-world`.
2.  Inside this folder, create a file named `app.js` (note that the file name can be arbitrary, but the SAM template must reflect the correct handler).

Paste the following code into `app.js`:

```
export const handler = async (event) => {
    console.log(event);
    const response = {
        statusCode: 200,
        body: JSON.stringify("Hello from Lambda! v2 blah blah"),
    };
    return response;
};
```

Save the file after pasting the code.

### Creating the SAM Template

Create a file called `template.yaml` in your project root. This file documents your serverless application resources. Below is a basic configuration defining a Lambda function resource named `HelloWorld`:

```
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: A simple Hello World Serverless project
Resources:
  HelloWorld:
    Type: AWS::Serverless::Function
    Properties:
      Runtime: nodejs20.x
      Handler: app.handler
      CodeUri: hello-world/
      MemorySize: 128
      Timeout: 5
```

In this configuration:

- The **Runtime** is set to Node.js 20.x.
- **Handler: app.handler** indicates that SAM will look in the `app.js` file for the exported `handler` function.
- **CodeUri** specifies the folder containing your Lambda source code.
- **MemorySize** and **Timeout** define your function's memory allocation and execution timeout.

---

## Deploying the Application

With your code and template ready, you can deploy your application using the SAM CLI.

### Running a Guided Deployment

Start the guided deployment process by running:

```
sam deploy --guided
```

Since no `samconfig.toml` file exists initially, SAM will prompt you for deployment options. An example session might look like:

```
Configuring SAM deploy
======================
Looking for config file [samconfig.toml] : Not found
Setting default arguments for 'sam deploy'
==============================
Stack Name [sam-app]:
AWS Region [us-east-1]:
Confirm changes before deploy [y/n]: y
Allow SAM CLI IAM role creation [Y/n]: y
Disable rollback [y/N]: n
Save arguments to configuration file [Y/n]: y
SAM configuration file [samconfig.toml]:
SAM configuration environment [default]:
```

Confirm the prompts to save your deployment preferences. SAM packages your code to an S3 bucket and creates a CloudFormation stack with the necessary resources.

An example output might include:

```
Deploying with following values
==============================
Stack name          : sam-app
Region              : us-east-1
Confirm changeset   : True
Disable rollback    : False
Deployment s3 bucket: aws-sam-cli-managed-default-samclisourcebucket-bcsnwuJ3iqx5
Capabilities        : ["CAPABILITY_IAM"]
Parameter overrides : {}
Signing Profiles    : {}


Initiating deployment
=======================
Uploading template to sam-app/...
Waiting for changeset to be created...
```

Once you review and confirm the changeset by responding with `y`, CloudFormation provisions the required resources, including an IAM role and the Lambda function.

---

## Verifying Resource Creation

After deployment, verify that the resources have been created in AWS.

### In S3

An S3 bucket is created to store your deployment artifacts. For example:

![The image shows an Amazon S3 bucket interface with a list of objects, including their names, types, last modified dates, sizes, and storage classes. The interface includes options for managing the objects, such as copying URLs, downloading, and uploading files.](https://kodekloud.com/kk-media/image/upload/v1752859431/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics-Demo/amazon-s3-bucket-interface.jpg)

### In CloudFormation

The CloudFormation console displays the `sam-app` stack with resources like the Lambda function and its associated IAM role.

![The image shows an AWS CloudFormation console with a list of stacks, their statuses, creation times, and descriptions. Some stacks are marked as "CREATE_COMPLETE" while one is "CREATE_FAILED."](https://kodekloud.com/kk-media/image/upload/v1752859433/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics-Demo/aws-cloudformation-stacks-statuses.jpg)

![The image shows an AWS CloudFormation console with details of a stack named "sam-app," displaying events and statuses such as "CREATE_COMPLETE" and "CREATE_IN_PROGRESS."](https://kodekloud.com/kk-media/image/upload/v1752859434/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics-Demo/aws-cloudformation-sam-app-stack.jpg)

![The image shows an AWS CloudFormation console with a stack named "sam-app" that has two resources: a Lambda function and an IAM role, both with a status of "CREATE_COMPLETE."](https://kodekloud.com/kk-media/image/upload/v1752859435/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics-Demo/aws-cloudformation-sam-app-stack-2.jpg)

### In Lambda

Visit the Lambda console to verify the deployed function. Check the function's code, memory settings (128 MB), timeout (5 seconds), and the attached IAM role.

![The image shows the AWS Lambda console with a list of functions, including their names, package types, runtimes, and last modified times. There is also a tutorial section on the right for creating a simple web app.](https://kodekloud.com/kk-media/image/upload/v1752859436/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics-Demo/aws-lambda-console-functions-tutorial.jpg)

Selecting the function will display its configuration details:

![The image shows an AWS Lambda console interface displaying the configuration details of a Lambda function named "sam-app-HelloWorld." It includes sections for general configuration, triggers, permissions, and other settings.](https://kodekloud.com/kk-media/image/upload/v1752859437/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Basics-Demo/aws-lambda-console-sam-app-settings.jpg)

---

## Invoking the Lambda Function from the CLI

You can test your deployed Lambda function directly from the CLI. Run the following command:

```
sam remote invoke HelloWorld --stack-name sam-app
```

The output will display details such as the status code, request IDs, duration, and memory usage. For example:

```
Invoking Lambda Function HelloWorld
START RequestId: ec97239c-224a-43c0-8848-b9ffb056176e Version: $LATEST
2024-04-08T12:39:13.566Z ...
END RequestId: ec97239c-224a-43c0-8848-b9ffb056176e
REPORT RequestId: ec97239c-224a-43c0-8848-b9ffb056176e  Duration: 155.78 ms  Billed Duration: 15 ms  Memory Size: 128 MB  Max Memory Used: 67 MB
{"statusCode":200,"body":"Hello from Lambda!"}
```

This method allows you to test your function quickly without switching between the AWS Console and the CLI.

---

## Updating Code Efficiently with SAM Sync

For iterative development, rather than performing a full deploy each time you modify your code, use the SAM sync command to update your function quickly.

For example, after changing the response message in `app.js`, update the code like this:

```
export const handler = async (event) => {
    console.log(event);
    const response = {
        statusCode: 200,
        body: JSON.stringify("Hello from Lambda! this is v2"),
    };
    return response;
};
```

Next, invoke the function again from the CLI:

```
sam remote invoke HelloWorld --stack-name sam-app
```

If a full deployment feels too slow for development, run:

```
sam sync --stack-name sam-app
```

Initially, this command might perform a full redeploy. On subsequent changes, it will watch your local files and automatically sync updates to AWS, providing a fast feedback loop.

The CLI output may look like this:

```
Syncing Lambda Function HelloWorld...
Building codeuri: C:\... \hello-world, runtime: nodejs20.x ...
Finished syncing Lambda Function HelloWorld.
```

Review the updated behavior either in the Lambda console or by invoking the function via the CLI.

---

## Listing Deployed Resources

The SAM CLI also provides a way to list the resources and endpoints deployed by your SAM application. To do this, run:

```
sam list resources
```

This command will show resources such as the HelloWorld Lambda function and its IAM role. If your application includes API Gateway endpoints, they will also be listed.

After a guided deployment, your configuration details are stored in `samconfig.toml`. An example configuration might be:

```
version = 0.1


[default.deploy.parameters]
stack_name = "sam-app"
resolve_s3 = true
s3_prefix = "sam-app"
region = "us-east-1"
confirm_changeset = true
capabilities = "CAPABILITY_IAM"
image_repositories = []
```

For future deployments, you can simply run:

```
sam deploy
```

without having to reenter the guided options.

---

## Cleaning Up

When you're finished testing, clean up the deployed resources by running:

```
sam delete
```

The CLI will prompt you for confirmation before deleting the CloudFormation stack and the associated S3 artifacts. For example:

```
Are you sure you want to delete the stack sam-app in the region us-east-1 ? [y/N]: y
Are you sure you want to delete the folder sam-app in S3 which contains the artifacts? [y/N]: y
- Deleting S3 object with key sam-app/...
...
Deleted successfully
```

> [!important]
> **Note**
>
> This process ensures that no unnecessary resources are left running, which can help avoid unwanted charges.

---

This concludes our introductory demonstration of working with the AWS SAM CLI. In our next article, we'll explore more advanced functionalities of the SAM CLI and discuss further optimization techniques for your development workflow.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/26824094-9722-4ee8-a5f1-c862a88a2caf/lesson/45295e9c-33b6-47f2-900b-8780ef5933b2)**
>
> Watch video content
