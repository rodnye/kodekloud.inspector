# Permissions Resource Policies Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Permissions-Resource-Policies-Demo)

---

## Table of Contents

- Permissions Resource Policies Demo
  - Resource-Based Policies
  - Summary
  - Watch Video
    - Load Balancer Configuration
    - API Gateway Trigger
    - S3 Event Trigger
    - SQS Trigger Consideration

---

## Content

AWS Certified Developer - Associate

Serverless

# Permissions Resource Policies Demo

In this lesson, we explore IAM permissions for Lambda functions and how resource policies control access when external services invoke your Lambda function.

When you create a Lambda function, AWS automatically creates an execution role for it. This execution role is an IAM role that your Lambda function uses when interacting with other AWS services. If your Lambda function performs operations such as writing logs to CloudWatch, you must grant the necessary permissions on its execution role.

> [!important]
> **Important**
>
> For example, the default policy attached to a Lambda function allows it to create a log group in CloudWatch, establish a log stream, and put log events into CloudWatch. Ensure that your execution role has all the necessary permissions for your intended operations.

Below is an example of a default logging policy:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:us-east-1:841860927337:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:us-east-1:841860927337:log-group:/aws/lambda/lambdaDemo:*"
        }
    ]
}
```

If your Lambda function needs to access additional services—such as retrieving an image from S3—you must update its execution role's policies accordingly. To grant additional permissions, like S3 full access, you would attach the appropriate policy via IAM.

Here’s another sample policy demonstrating similar logging permissions:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:us-east-1:841869273737:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:us-east-1:841869273737:log-group:/aws/lambda/lambdaDemo:*"
        }
    ]
}
```

Below is an example of a simple Lambda function handler. This code logs the event and returns it as the response:

```
export const handler = async (event) => {
    // TODO: implement
    console.log(event);
    const response = {
        statusCode: 200,
        body: event,
    };
    return response;
};
```

## Resource-Based Policies

Resource-based policies determine who is allowed to invoke your Lambda function. They are distinct from the IAM policies attached to the execution role. These policies control which services or AWS accounts can directly call your Lambda function.

For example, if you want a load balancer to trigger your Lambda function, you would configure a resource policy. Initially, no resource policy exists if no external service is invoking your function. Once you add a trigger (e.g., a load balancer), AWS automatically creates the necessary resource policy.

### Load Balancer Configuration

After you create a load balancer (e.g., "demo-lb-lambda"), select default settings, and associate your Lambda function with a target group, refresh your Lambda configuration to see the newly added resource policy entry.

Consider the following policy, which permits the Elastic Load Balancing service to invoke the Lambda function:

```
{
    "Version": "2012-10-17",
    "Id": "default",
    "Statement": [
        {
            "Sid": "AWS-ALB_Invoke-targetgroup-my-tg-lambda-ab20a3e4d6d3e20",
            "Effect": "ALLOW",
            "Principal": {
                "Service": "elasticloadbalancing.amazonaws.com"
            },
            "Action": "lambda:InvokeFunction",
            "Resource": "arn:aws:lambda:us-east-1:841860927337:function:lambdaDemo",
            "Condition": {
                "ArnLike": {
                    "AWS:SourceArn": "arn:aws:elasticloadbalancing:us-east-1:841860927337:targetgroup/my-"
                }
            }
        }
    ]
}
```

A similar policy entry might appear as follows:

```
{
  "Effect": "Allow",
  "Principal": {
    "Service": "elasticloadbalancing.amazonaws.com"
  },
  "Action": "lambda:InvokeFunction",
  "Resource": "arn:aws:lambda:us-east-1:841869297337:function:lambdaDemo",
  "Condition": {
    "StringEquals": {
      "AWS:SourceArn": "arn:aws:elasticloadbalancing:us-east-1:841869297337:targetgroup/my-tg-lambda/ab20a3e4d6d3e20"
    }
  }
}
```

In these examples, the policy clearly defines that a load balancer (as identified by its source ARN) is permitted to invoke the Lambda function.

### API Gateway Trigger

When you add an API Gateway trigger that integrates with your Lambda function, AWS creates a corresponding resource policy entry. The following example illustrates how API Gateway is authorized to invoke the Lambda function:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AWS-ALB_Invoke-targetgroup-my-tg-lambda-ab20a34e6d6d3e20",
      "Effect": "Allow",
      "Principal": {
        "Service": "elasticloadbalancing.amazonaws.com"
      },
      "Action": "lambda:InvokeFunction",
      "Resource": "arn:aws:lambda:us-east-1:841869297337:function:lambdaDemo",
      "Condition": {
        "ArnLike": {
          "AWS:SourceArn": "arn:aws:elasticloadbalancing:us-east-1:841869297337:targetgroup/my-tg-*"
        }
      }
    },
    {
      "Sid": "lambda-af41fde6-4511-4a36-83c-85eab1b3b26",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "lambda:InvokeFunction",
      "Resource": "arn:aws:lambda:us-east-1:841869297337:function:lambdaDemo",
      "Condition": {
        "ArnLike": {
          "AWS:SourceArn": "arn:aws:execute-api:us-east-1:841869297337:qxmq2ysm22f/*/*/lambdaDemo"
        }
      }
    }
  ]
}
```

This policy entry authorizes API Gateway to invoke the Lambda function using the designated source ARN.

### S3 Event Trigger

Similarly, when you configure S3 to trigger your Lambda function (for example, upon object creation), a corresponding resource policy is automatically added. Consider the example below:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "lambda-19e6dfcf-b9df-495e-974c-305e313348c8",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "lambda:InvokeFunction",
      "Resource": "arn:aws:lambda:us-east-1:841869297337:function:lambdaDemo",
      "Condition": {
        "ArnLike": {
          "AWS:SourceArn": "arn:aws:execute-api:us-east-1:841869297337:xmq2ysm22f/*/*/lambdaDemo"
        }
      }
    },
    {
      "Sid": "lambda-19e6dfcf-b9df-495e-974c-305e313348c8",
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "lambda:InvokeFunction",
      "Resource": "arn:aws:lambda:us-east-1:841869297337:function:lambdaDemo",
      "Condition": {
        "StringEquals": {
          "AWS:SourceAccount": "841869297337"
        },
        "ArnLike": {
          "AWS:SourceArn": "arn:aws:s3::athena-demo-kodekloud"
        }
      }
    }
  ]
}
```

This configuration enables S3 to invoke your Lambda function when a specified object creation event occurs in the designated bucket.

### SQS Trigger Consideration

A key point to note is that SQS interacts differently with Lambda. Instead of invoking the Lambda function directly, Lambda polls the SQS queue for messages. If the Lambda execution role lacks necessary permissions, you might encounter an error stating, "The provided execution role does not have permissions to receive messages on SQS."

To resolve this, update your Lambda function's execution role to include the necessary permissions for receiving messages from SQS—either by granting full SQS access or by specifying the required permissions. Once updated, the SQS trigger should function correctly, and you can confirm the changes via the Permissions tab in the Lambda console.

![The image shows an AWS Lambda function configuration page, displaying a diagram with a Lambda function named "lambdaDemo" and an Application Load Balancer trigger. The page includes details like execution role and resource summary.](https://kodekloud.com/kk-media/image/upload/v1752859598/notes-assets/images/AWS-Certified-Developer-Associate-Permissions-Resource-Policies-Demo/aws-lambda-function-configuration-diagram.jpg)

![The image shows an AWS Lambda function configuration page for "lambdaDemo," displaying its triggers, including an Application Load Balancer and API Gateway. The function overview includes options to add destinations and view details like the function ARN.](https://kodekloud.com/kk-media/image/upload/v1752859600/notes-assets/images/AWS-Certified-Developer-Associate-Permissions-Resource-Policies-Demo/aws-lambda-function-configuration.jpg)

![The image shows an AWS IAM console where a user is attaching a policy to a role named "lambdaDemo-role-5h7kil1d." Various SQS-related permission policies are listed for selection.](https://kodekloud.com/kk-media/image/upload/v1752859601/notes-assets/images/AWS-Certified-Developer-Associate-Permissions-Resource-Policies-Demo/aws-iam-console-attach-policy-lambda.jpg)

![The image shows an AWS Lambda console screen displaying the permissions section for an execution role, detailing Amazon CloudWatch Logs resources and actions allowed.](https://kodekloud.com/kk-media/image/upload/v1752859603/notes-assets/images/AWS-Certified-Developer-Associate-Permissions-Resource-Policies-Demo/aws-lambda-console-permissions-logs.jpg)

## Summary

- When your Lambda function interacts with AWS services (e.g., polling an SQS queue or accessing S3), ensure its execution role is configured with the required IAM permissions.
- When external services need to invoke your Lambda function (such as API Gateway, Application Load Balancer, or S3 event notifications), AWS automatically applies a resource-based policy to specify who can call the function.

Understanding these key differences is crucial, especially when preparing for the [AWS Certified Developer - Associate](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate) exam.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/009aa7fd-59da-46c2-80c7-82f762c0f0be)**
>
> Watch video content
