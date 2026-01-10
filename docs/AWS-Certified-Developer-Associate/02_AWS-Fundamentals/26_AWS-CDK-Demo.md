# AWS CDK Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/AWS-CDK-Demo)

---

## Table of Contents

- AWS CDK Demo
  - Prerequisites
  - Installing the AWS CDK CLI
  - Initializing a New CDK Project
  - Configuring the Python Virtual Environment
  - Editing the CDK Stack for an S3 Bucket
  - Synthesizing the CloudFormation Template
  - Configuring AWS Credentials
  - Validating the Deployment with CDK Diff
  - Bootstrapping and Deploying the CDK Application
  - Verifying the Deployed Template
  - Destroying the Stack
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# AWS CDK Demo

In this guide, you'll learn how to use the AWS Cloud Development Kit (CDK) to create and manage AWS resources. We'll cover installing prerequisites, initializing a CDK project, exploring generated files, and then deploying, verifying, and cleaning up a simple S3 bucket infrastructure.

---

## Prerequisites

Before you begin with AWS CDK, ensure that [Node.js](https://nodejs.org/) is installed on your machine. Node.js comes with NPM (Node Package Manager), which is required to install the AWS CDK CLI tool.

After installing Node.js, run these commands to install and verify the AWS CDK CLI:

```
aws sts get-caller-identity
```

```
npm install -g aws-cdk
```

```
cdk --version
```

Ensure Node.js is installed correctly by referring to the [Node.js documentation](https://nodejs.org/en/docs/). The site usually detects your operating system and provides the appropriate download options.

![The image shows the Node.js download page, offering options to download the LTS and Current versions for Windows (x64). It also mentions available security releases.](https://kodekloud.com/kk-media/image/upload/v1752858090/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CDK-Demo/nodejs-download-page-lts-current.jpg)

---

## Installing the AWS CDK CLI

Once Node.js and NPM are installed, you can install the AWS CDK CLI with:

```
npm install -g aws-cdk
```

Then, verify your installation by running:

```
cdk --help
```

You should see a list of available commands such as:

- `cdk list` (or `cdk ls`): List all stacks in the app.
- `cdk synth` (or `cdk synthesize`): Generate the CloudFormation template.
- `cdk bootstrap`: Deploy the CDK toolkit stack into your AWS environment.
- `cdk deploy`: Deploy your stack(s) to your AWS account.
- `cdk destroy`: Remove the deployed stack(s).
- `cdk diff`: Compare your local template with the deployed stack.

---

## Initializing a New CDK Project

To quickly get started with a new project, initialize a boilerplate application with:

```
cdk init app --language python
```

If you prefer a sample project template that includes a demo application, you can run:

```
cdk init sample-app --language python
```

This command creates multiple files and directories to jumpstart your CDK project:

- **Python Virtual Environment:** Isolates project dependencies.
- **Activation Script:** A file like `source.bash` (or equivalent for Mac/Linux) to activate the virtual environment.
- **requirements.txt:** Lists third-party dependencies (typically including `aws-cdk-lib` and `constructs`).

Example `requirements.txt` content:

```
aws-cdk-lib==2.101.0
constructs>=10.0.0,<11.0.0
```

- **README:** Contains instructions for installing dependencies and running commands:

```
python -m venv .venv
cdk synth
pytest
```

- **cdk.json:** Contains project configuration. For example:

```
{
  "app": "python app.py",
  "watch": {
    "include": [
      "**"
    ],
    "exclude": [
      "README.md",
      "cdk*.json",
      "requirements*.txt",
      "source.bat",
      "**/__init__.py",
      "python/__pycache__",
      "tests"
    ]
  },
  "context": {
    "@aws-cdk/aws-lambda:recognizeLayerVersion": true,
    "@aws-cdk/core:checkSecretUsage": true,
    "@aws-cdk/core:target-partitions": [
      "aws",
      "aws-cn"
    ]
  }
}
```

- **app.py:** Initializes your CDK application and instantiates a stack:

```
#!/usr/bin/env python3


import aws_cdk as cdk
from cdk.cdk_stack import CdkStack


app = cdk.App()
CdkStack(app, "CdkStack")
app.synth()
```

- **Stack File (e.g., `cdk/cdk_stack.py`):** Initially defines resources like an SQS queue and an SNS topic with a subscription:

```
from constructs import Construct
from aws_cdk import (
    Duration,
    Stack,
    aws_sqs as sqs,
    aws_sns as sns,
    aws_sns_subscriptions as subs,
)


class CdkStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        queue = sqs.Queue(
            self, "CdkQueue",
            visibility_timeout=Duration.seconds(300),
        )

        topic = sns.Topic(
            self, "CdkTopic"
        )

        topic.add_subscription(subs.SqsSubscription(queue))
```

> [!important]
> **Tip**
>
> In this demo, we will comment out the SQS/SNS implementation to focus on creating an S3 bucket.

---

## Configuring the Python Virtual Environment

Set up your Python virtual environment and install the necessary packages:

1.  **Create and Activate the Virtual Environment:**

    ```
    python -m venv .venv
    ```

    On Windows, activate with:

    ```
    .venv\Scripts\activate.bat
    ```

    On Mac/Linux, use:

    ```
    source .venv/bin/activate
    ```

2.  **Install Dependencies:**

    ```
    pip install -r requirements.txt
    ```

Once these steps are completed, you're ready to work on your CDK project.

---

## Editing the CDK Stack for an S3 Bucket

For this demo, we'll modify the CDK stack to create an S3 bucket. First, update the import statements to include AWS S3 (and optionally AWS KMS if you need encryption):

```
from constructs import Construct
from aws_cdk import (
    Duration,
    Stack,
    aws_s3 as s3,
    aws_iam as iam,
    aws_sqs as sqs,
    aws_sns as sns,
    aws_sns_subscriptions as subs,
)
# Additional imports (e.g., for encryption) can be added as required.
```

Then update the stack definition to include the S3 bucket:

```
class CdkStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create a basic S3 bucket.
        bucket = s3.Bucket(self, "My-kodekloud-cdk-bucket")
```

> [!important]
> **Bucket Naming**
>
> Remember that bucket names must be globally unique. The CDK will append extra characters to ensure uniqueness.

For advanced configurations such as encryption using a KMS key, you might use:

```
bucket = s3.Bucket(self, "MyEncryptedBucket",
    encryption=s3.BucketEncryption.KMS
)


# To verify, you can access the encryption key:
# assert(bucket.encryption_key instanceof kms.Key)
```

In this demo, however, we use the basic bucket configuration.

---

## Synthesizing the CloudFormation Template

To generate the CloudFormation templates from your CDK app, run:

```
cdk synth
```

This command synthesizes templates that detail the AWS resources like the S3 bucket and any related policies. A sample snippet of the generated output might be:

```
> cdk synth
Resources:
  MykodekloudcdkbucketB75EFD9A:
    Type: AWS::S3::Bucket
    UpdateReplacePolicy: Retain
    DeletionPolicy: Retain
    Metadata:
      aws:cdk:path: CdkStack/My-kodekloud-cdk-bucket/Resource
    CDKMetadata:
      Type: AWS::CDK::Metadata
      Properties:
        Analytics: v2:deflate64:...
```

---

## Configuring AWS Credentials

Before deploying, configure your AWS CLI credentials since the AWS CDK utilizes them for resource deployment. Run:

```
aws configure
```

You will be prompted to enter your AWS Access Key ID, AWS Secret Access Key, default region, and output format. For example:

```
AWS Access Key ID [********************SQ5B]: AKIA4IAWSJ5UJ5XRRTMAI
AWS Secret Access Key [********************aRv]: <your-secret-key>
Default region name [us-east-1]:
Default output format [json]:
```

> [!important]
> **Security Reminder**
>
> It is best practice to create a dedicated IAM user with limited permissions for CDK deployments in production. Avoid using full administrative privileges.

The following screenshots illustrate the process of creating an IAM user and generating access keys:

![The image shows the AWS IAM console where a user is specifying details to create a new user, including a field for the username and options for providing access to the AWS Management Console.](https://kodekloud.com/kk-media/image/upload/v1752858091/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CDK-Demo/aws-iam-console-create-user.jpg)

![The image shows an AWS IAM console screen for creating a user, with details like user name, permissions summary, and an option to add tags. The "Create user" button is visible at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752858093/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CDK-Demo/aws-iam-create-user-console.jpg)

![The image shows an AWS console screen for creating an access key, with options for different use cases like CLI, local code, and third-party services.](https://kodekloud.com/kk-media/image/upload/v1752858095/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CDK-Demo/aws-console-access-key-creation.jpg)

---

## Validating the Deployment with CDK Diff

Before deploying your changes, run a diff to compare your local template with what is currently deployed:

```
cdk diff
```

The output will indicate which resources are set to be created, modified, or deleted. Since the S3 bucket hasn't been deployed yet, the diff output should reflect that a new S3 bucket will be created.

---

## Bootstrapping and Deploying the CDK Application

Certain environments require bootstrapping before deployment. If you encounter an error such as:

```
Error: CdkStack: SSM parameter /cdk-bootstrap/hnb659fds/version not found. Has the environment been bootstrapped? Please run 'cdk bootstrap'
```

Run the bootstrap command:

```
cdk bootstrap
```

After successful bootstrapping, deploy your stack with:

```
cdk deploy
```

During deployment, you will see messages indicating synthesis progress, publishing steps, and CloudFormation resource creation. An example output might include:

```
CdkStack: deploying... [1/1]
CdkStack: creating CloudFormation changeset...
...
Deployment time: 33.21s
Stack ARN:
arn:aws:cloudformation:us-east-1:841860927337:stack/CdkStack/b0a6b4c0-6bd7-11ee-9353-0a5897cc66
```

Once the deployment is complete, verify the S3 bucket in the AWS Management Console by refreshing the Buckets page.

![The image shows an Amazon S3 bucket interface with no objects listed, and options to upload or manage files.](https://kodekloud.com/kk-media/image/upload/v1752858096/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CDK-Demo/amazon-s3-bucket-interface-empty.jpg)

Also, inspect the CloudFormation console to ensure the stack was deployed correctly:

![The image shows an AWS CloudFormation console with a list of stacks, their statuses, and creation times. One stack has a "DELETE_FAILED" status, while others are marked "CREATE_COMPLETE."](https://kodekloud.com/kk-media/image/upload/v1752858099/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CDK-Demo/aws-cloudformation-stacks-statuses.jpg)

![The image shows an AWS CloudFormation console with a stack named "CdkStack" that has completed creation. It lists resources like "My-kodekloud-cdk-bucket" and "CDKMetadata" with a status of "CREATE_COMPLETE."](https://kodekloud.com/kk-media/image/upload/v1752858100/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CDK-Demo/aws-cloudformation-cdkstack-complete.jpg)

---

## Verifying the Deployed Template

After deployment, run the diff again to ensure that your deployed state matches your local configuration:

```
cdk diff
```

Expected output:

```
Stack CdkStack
There were no differences
Number of stacks with differences: 0
```

This confirms that the deployed environment is in sync with your CDK application.

---

## Destroying the Stack

When you're finished with your demo, you can clean up your AWS environment by destroying the stack:

```
cdk destroy
```

You'll be prompted to confirm deletion:

```
Are you sure you want to delete: CdkStack (y/n)? y
CdkStack: destroying... [1/1]
```

After destruction, confirm in the AWS console that both the CloudFormation stack and the S3 bucket have been removed.

![The image shows an Amazon S3 dashboard with a list of buckets, their regions, access settings, and creation dates.](https://kodekloud.com/kk-media/image/upload/v1752858102/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CDK-Demo/amazon-s3-dashboard-buckets-list.jpg)

---

## Conclusion

This guide provided an overview of using AWS CDK to manage AWS resources. You learned how to install and set up AWS CDK, initialize a Python project, modify the CDK stack to create an S3 bucket, deploy your infrastructure using CloudFormation, verify your deployment, and finally clean up resources.

Happy building with AWS CDK!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/0591c752-a231-4bac-8bca-6023f4d25f5d)**
>
> Watch video content
