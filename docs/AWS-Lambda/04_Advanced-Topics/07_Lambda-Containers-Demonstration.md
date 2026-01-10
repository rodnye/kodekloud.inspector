# Lambda Containers Demonstration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Advanced-Topics/Lambda-Containers-Demonstration)

---

## Table of Contents

- Lambda Containers Demonstration
  - Environment Setup
  - Project Structure
  - Create an ECR Repository
  - Build and Push the Container Image
  - Deploy the Lambda Function
  - Test the Lambda Function
  - Summary
  - Links and References
  - Watch Video
    - app.py
    - requirements.txt
    - Dockerfile

---

## Content

AWS Lambda

Advanced Topics

# Lambda Containers Demonstration

In this tutorial, we’ll guide you through building, pushing, and deploying an AWS Lambda function packaged as a container image, using the AWS Management Console.

## Environment Setup

Before you begin, ensure you have the following:

- A local development workstation (Windows, macOS, or Linux)
- An IDE such as [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- The [AWS CLI](https://aws.amazon.com/cli/) configured with proper credentials
- An active AWS account logged into the [AWS Management Console](https://aws.amazon.com/console/)

![The image is a slide titled "Container Demo" showing the environment setup, including AWS CLI, Visual Studio Code, Docker Desktop, and AWS Console.](https://kodekloud.com/kk-media/image/upload/v1752863070/notes-assets/images/AWS-Lambda-Lambda-Containers-Demonstration/container-demo-environment-setup-aws-docker.jpg)

## Project Structure

Create a new directory for your demo and add the following files:

| File             | Purpose                      |
| ---------------- | ---------------------------- |
| app.py           | Python Lambda handler        |
| requirements.txt | Python dependencies          |
| Dockerfile       | Container build instructions |

![The image shows a Visual Studio Code interface with a project directory open, displaying files such as `app.py`, `Dockerfile`, and an open `requirements.txt` file. The terminal at the bottom is set to a directory path.](https://kodekloud.com/kk-media/image/upload/v1752863071/notes-assets/images/AWS-Lambda-Lambda-Containers-Demonstration/visual-studio-code-project-directory-files.jpg)

### app.py

```
import sys


def handler(event, context):
    return 'Hello from KodeKloud with AWS Lambda using Python ' + sys.version + '!'
```

### requirements.txt

Leave this file empty for no external dependencies, or list any libraries your function needs.

> [!important]
> **Note**
>
> If you require additional packages, add them to `requirements.txt` before building the image.

### Dockerfile

```
FROM public.ecr.aws/lambda/python:3.8


# Install dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"


# Copy function code
COPY app.py ${LAMBDA_TASK_ROOT}


# Define the handler
CMD [ "app.handler" ]
```

## Create an ECR Repository

The AWS Elastic Container Registry (ECR) hosts your container images. In the [AWS Management Console](https://aws.amazon.com/console/), navigate to **Elastic Container Registry**.

![The image shows the Amazon Elastic Container Registry (ECR) webpage, which offers services for sharing and deploying container software. It includes options to create a repository and information on pricing.](https://kodekloud.com/kk-media/image/upload/v1752863073/notes-assets/images/AWS-Lambda-Lambda-Containers-Demonstration/amazon-ecr-webpage-container-services.jpg)

Click **Create repository**, set visibility to **Private**, and name it `KodeKloudDemo`. Optionally enable image scanning on push, then click **Create repository**.

![The image shows the AWS Elastic Container Registry interface for creating a new repository, with options for setting visibility and naming the repository.](https://kodekloud.com/kk-media/image/upload/v1752863074/notes-assets/images/AWS-Lambda-Lambda-Containers-Demonstration/aws-elastic-container-registry-repository.jpg)

Once the repository appears, select **View push commands**.

![The image shows an Amazon Elastic Container Registry (ECR) interface with a notification indicating a repository named "kodeklouddemo" has been successfully created. The repository details, such as URI and creation date, are displayed.](https://kodekloud.com/kk-media/image/upload/v1752863076/notes-assets/images/AWS-Lambda-Lambda-Containers-Demonstration/amazon-ecr-repository-kodeklouddemo-created.jpg)

## Build and Push the Container Image

Open your terminal and follow these steps, replacing `<region>` and `<account-id>` with your AWS Region and account number.

> [!important]
> **Warning**
>
> Keep your AWS credentials secure. Do not hard-code them in scripts.

1.  Authenticate Docker to ECR:

    ```
    aws ecr get-login-password --region <region> \
      | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
    ```

2.  Build your image locally:

    ```
    docker build -t kodeklouddemo .
    ```

3.  Tag the image for your repository:

    ```
    docker tag kodeklouddemo:latest \
      <account-id>.dkr.ecr.<region>.amazonaws.com/kodeklouddemo:latest
    ```

4.  Push the image to ECR:

    ```
    docker push <account-id>.dkr.ecr.<region>.amazonaws.com/kodeklouddemo:latest
    ```

Example response after login:

```
Login Succeeded
```

Successful push output:

```
... latest: digest: sha256:573b0a9049137d606c681c973b197727ace46f6ebbed4bff7eb2e61f0f1 size: 2205
```

Refresh the ECR console to verify the **latest** tag.

![The image shows the Amazon Elastic Container Registry (ECR) interface displaying a repository named "kodeklouddemo" with one image tagged as "latest," pushed on November 30, 2022, with a size of 180.66 MB.](https://kodekloud.com/kk-media/image/upload/v1752863077/notes-assets/images/AWS-Lambda-Lambda-Containers-Demonstration/amazon-ecr-repository-kodeklouddemo-latest.jpg)

## Deploy the Lambda Function

1.  Go to **AWS Lambda** in the [AWS Management Console](https://aws.amazon.com/console/).
2.  Click **Create function**, choose **Container image**, and enter `KodeKloudDemo` as the function name.
3.  Under **Container image**, click **Browse images**, select your `kodeklouddemo:latest` image, and click **Select image**.
4.  Keep the remaining settings at their defaults and click **Create function**.

![The image shows the AWS Lambda function creation page, where a user is entering a function name and selecting options for a container image and architecture.](https://kodekloud.com/kk-media/image/upload/v1752863078/notes-assets/images/AWS-Lambda-Lambda-Containers-Demonstration/aws-lambda-function-creation-page.jpg)

After provisioning, you’ll see your new function listed in the console.

![The image shows an AWS Lambda console with a function named "kodeklouddemo" successfully created. It includes options to add triggers and destinations, and displays the function's ARN.](https://kodekloud.com/kk-media/image/upload/v1752863079/notes-assets/images/AWS-Lambda-Lambda-Containers-Demonstration/aws-lambda-console-kodeklouddemo-function.jpg)

## Test the Lambda Function

1.  In your Lambda function console, click **Test**.
2.  Choose **Create new test event** (the default template is fine) and save.
3.  Click **Test** again to invoke the function.
4.  Confirm the **Execution results** show your greeting message and Python version.

## Summary

In this demo, you learned how to:

- Structure a simple Python Lambda project
- Create a Dockerfile compatible with AWS Lambda
- Build and push a container image to Amazon ECR
- Deploy a Lambda function from your container image
- Invoke and test the Lambda function via the AWS Console

## Links and References

- [AWS Lambda Documentation](https://aws.amazon.com/lambda/)
- [Amazon ECR Documentation](https://aws.amazon.com/ecr/)
- [AWS CLI Reference](https://aws.amazon.com/cli/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Visual Studio Code](https://code.visualstudio.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/71600a46-a390-4f40-884f-7588445b5976/lesson/cb5358f9-f4dd-43ad-b55f-e12846cd2f91)**
>
> Watch video content
