# Permissions Resource Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Permissions-Resource-Policies)

---

## Table of Contents

- Permissions Resource Policies
  - Lambda Execution Roles
  - Resource Policies for Invoking Lambda Functions
  - Example Resource Policy
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless

# Permissions Resource Policies

This article explains everything you need to know about permissions and resource policies for AWS Lambda functions. Understanding these concepts is crucial to securely and efficiently manage your Lambda functions.

## Lambda Execution Roles

When you create a Lambda function, you must assign it an execution role. This role defines the permissions that allow your Lambda function to interact with other AWS services. For instance, if your Lambda function needs to read from or write to an Amazon S3 bucket, the execution role must include the appropriate permissions.

Whenever you need to expand your Lambda function’s permissions, simply locate its associated execution role in AWS Identity and Access Management (IAM) and update the permissions accordingly.

## Resource Policies for Invoking Lambda Functions

In addition to execution roles, resource policies help control who can invoke your Lambda function. An invoking user or service must have the adequate permissions, or a resource policy can be configured on the Lambda function to allow the invocation.

For example, to enable an Amazon S3 bucket to automatically trigger a Lambda function when a file is uploaded, you would set up a resource policy on the Lambda function permitting that action.

Resource policies are also vital for enabling cross-account interactions. If a user or service in one AWS account needs to invoke a Lambda function in another account, a proper resource policy must authorize this cross-account access.

![The image illustrates a resource policy where an S3 bucket in AWS Account A allows invocation of a Lambda function in AWS Account B.](https://kodekloud.com/kk-media/image/upload/v1752859604/notes-assets/images/AWS-Certified-Developer-Associate-Permissions-Resource-Policies/s3-bucket-lambda-invocation-policy.jpg)

> [!important]
> **Note**
>
> Ensure that both execution roles and resource policies are configured correctly to maintain security while enabling the required interactions among AWS services.

## Example Resource Policy

Below is an example of a typical resource policy. In this policy, the Lambda function allows invocation by the S3 service from Account A:

```
{
  "Effect": "Allow",
  "Principal": {
    "Service": "s3.amazonaws.com"
  },
  "Action": "lambda:InvokeFunction",
  "Resource": "arn:aws:lambda:...",
  "Condition": {
    "StringEquals": {
      "AWS:SourceAccount": "Account A ID"
    }
  }
}
```

In this policy:

- The "Action" is set to "lambda:InvokeFunction."
- The policy uses a condition to ensure that only requests originating from Account A (identified by "Account A ID") are allowed to invoke the Lambda function. This configuration is crucial for enabling S3-triggered Lambda invocations or other cross-account interactions.

## Summary

By understanding and correctly configuring both execution roles and resource policies, you can effectively secure and manage your AWS Lambda functions. Proper settings ensure that interactions with other services are safe and that cross-account access is granted only when necessary.

For more detailed information, consider reviewing the [AWS Lambda documentation](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) and the [AWS IAM guidelines](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/44ed33e5-a138-4984-9474-5290287befbc)**
>
> Watch video content
