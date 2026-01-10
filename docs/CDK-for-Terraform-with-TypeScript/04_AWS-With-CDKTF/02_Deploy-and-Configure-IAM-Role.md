# Deploy and Configure IAM Role - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/AWS-With-CDKTF/Deploy-and-Configure-IAM-Role)

---

## Table of Contents

- Deploy and Configure IAM Role
  - Creating the IAM Role
  - Verifying the IAM Role in AWS Console
  - Deployment Flow Overview
  - What's Next?
  - Watch Video

---

## Content

CDK for Terraform with TypeScript

AWS With CDKTF

# Deploy and Configure IAM Role

In this guide, we demonstrate how to deploy and configure an IAM role that enables AWS Lambda to securely execute a function. This specific function randomly selects a name from a predefined list. By following this tutorial, you'll learn how to create an IAM role with the necessary trust relationships and permissions.

## Creating the IAM Role

To create an instance of an IAM role, provide a unique name and specify an assume role policy that grants AWS Lambda the required permissions to assume the role. The sample code below illustrates the creation of the IAM role:

```
const lambdaRole = new iamRole.IamRole(this, 'lambda-execution-role', {
  name: 'name-picker-execution-role',
  assumeRolePolicy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [{
      Effect: 'Allow',
      Principal: { Service: 'lambda.amazonaws.com' },
      Action: 'sts:AssumeRole'
    }],
  })
});
```

In this snippet:

- The `name` property specifies the IAM role's name.
- The `assumeRolePolicy` property sets up a policy that allows the AWS Lambda service (designated in the `Principal` field) to assume this role using the `sts:AssumeRole` action.

> [!important]
> **Note**
>
> Every AWS Lambda function must be associated with an IAM role that defines the permissions it needs to run. This setup ensures secure and controlled access to AWS resources.

## Verifying the IAM Role in AWS Console

After deploying the role, you can verify its configuration in the AWS Management Console. The image below displays the IAM role details, including creation date and permissions:

![The image shows an AWS Identity and Access Management (IAM) console screen displaying details of a role named "cdktf-name-picker-api-execution-role," including its creation date and permissions settings.](https://kodekloud.com/kk-media/image/upload/v1752869564/notes-assets/images/CDK-for-Terraform-with-TypeScript-Deploy-and-Configure-IAM-Role/aws-iam-console-cdktf-role-details.jpg)

Within the "Trust Relationships" tab of the role, you will find the trust policy that was defined in the code above.

## Deployment Flow Overview

Every AWS Lambda function is bound to a specific IAM role, ensuring it has the necessary permissions to perform its tasks. The following flowchart provides a high-level overview of the deployment process, from configuring the IAM role to extending functionality with additional infrastructure components:

![The image is a flowchart with five steps for deploying and configuring an IAM role, constructing a Lambda function, API Gateway, backend strategies, and adding more functionality with multiple stacks.](https://kodekloud.com/kk-media/image/upload/v1752869565/notes-assets/images/CDK-for-Terraform-with-TypeScript-Deploy-and-Configure-IAM-Role/iam-role-deployment-flowchart.jpg)

## What's Next?

In the next section, we will walk through creating a construct for the Lambda function itself. Stay tuned to learn how to integrate the IAM role with your Lambda deployment for secure and scalable applications.

For more detailed information on AWS IAM roles and Lambda functions, be sure to check out the [AWS Documentation](https://docs.aws.amazon.com/).

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/4625ff69-dbd8-42ac-9542-d0e60a85e2ae/lesson/6099b48a-109c-4a8c-88b7-3c38e290379a)**
>
> Watch video content
