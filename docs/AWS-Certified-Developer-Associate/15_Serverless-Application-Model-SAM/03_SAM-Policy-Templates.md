# SAM Policy Templates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless-Application-Model-SAM/SAM-Policy-Templates)

---

## Table of Contents

- SAM Policy Templates
  - Including Policy Templates in a SAM Template
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless Application Model SAM

# SAM Policy Templates

In this lesson, you'll learn how to leverage SAM policy templates to simplify permission management for your AWS Lambda functions. When deploying resources using a SAM template, you typically have multiple Lambda functions that require permissions to interact with various AWS services such as DynamoDB, S3, and SQS. For instance, a Lambda function might need to write data to a DynamoDB table or read objects from an S3 bucket.

Instead of manually crafting IAM policies for each Lambda function, AWS offers pre-built policy templates based on common use cases. These templates include:

- **S3 Read Policy:** Grants permissions required for reading objects from an S3 bucket.
- **DynamoDB CRUD Policy:** Provides the necessary permissions for creating, reading, updating, and deleting items in a DynamoDB table.
- **SQS Poller Policy:** Enables Lambda functions to poll messages from an SQS queue.

![The image illustrates AWS SAM policy templates, showing connections between AWS Lambda functions and specific policies for S3, DynamoDB, and SQS services.](https://kodekloud.com/kk-media/image/upload/v1752859448/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Policy-Templates/aws-sam-policy-templates-diagram.jpg)

> [!important]
> **Note**
>
> Using these pre-configured policies in your SAM template means that permissions are automatically granted to your Lambda functions for common use cases. This approach not only simplifies permission management but also reduces the potential for errors when manually configuring IAM policies.

## Including Policy Templates in a SAM Template

To integrate a policy template into your SAM template, add it under the Policies section of your Lambda function definition. For example, if you need a Lambda function to poll an SQS queue, specify the SQS Poller Policy along with any required attributes, such as the queue name.

Below is an example YAML snippet that demonstrates how to include the SQS Poller Policy:

```
MyFunction:
  Type: 'AWS::Serverless::Function'
  Properties:
    CodeUri: ${codeuri}
    Handler: hello.handler
    Runtime: python2.7
    Policies:
      - SQSPollerPolicy:
          QueueName: !GetAtt MyQueue.QueueName
```

In this configuration, the `SQSPollerPolicy` automatically provides the necessary permissions for your Lambda function to poll the specified SQS queue.

For a complete list of available SAM policy templates, refer to the [AWS SAM Policy Templates Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-policy-templates.html).

This streamlined approach to permission management helps you focus on application logic rather than intricate IAM configurations, ensuring a more efficient deployment process.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/26824094-9722-4ee8-a5f1-c862a88a2caf/lesson/04c203e4-9817-4d27-844d-0014577df9a8)**
>
> Watch video content
