# Lambda Basics Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Lambda-Basics-Demo)

---

## Table of Contents

- Lambda Basics Demo
  - Creating a Lambda Function
  - Function Code Overview
  - Testing Your Lambda Function
  - Reviewing Configuration and Monitoring
  - Reviewing Permissions
  - Deleting the Lambda Function
  - Watch Video
    - General Configuration
    - Monitoring and CloudWatch Logs

---

## Content

AWS Certified Developer - Associate

Serverless

# Lambda Basics Demo

In this lesson, we walk through a complete demonstration of working with AWS Lambda. You will learn how to create a Lambda function from scratch, test it, review its configuration and permissions, and finally clean up by deleting the function. This guide is ideal for developers looking to get started with serverless computing on AWS.

---

## Creating a Lambda Function

Begin by logging into the AWS Management Console and searching for “Lambda.” Click on the **Create Function** button to start. AWS Lambda provides several options for authoring your function:

- **Author from scratch** – Create a simple “hello world” example.
- **Use a blueprint** – Leverage sample code and pre-configurations.
- **Use a container image** – Deploy your containerized application as a Lambda function.

For this demonstration, we will **author the function from scratch**. Enter a name for your function (for example, "demoFunction") and choose a runtime. AWS supports recent versions of various languages such as Python 3.12, Ruby 3.3, and Node.js 20.x. You may also select your preferred code architecture (the default is x86_64).

Once you provide the function details, AWS will prompt you to create an execution role to grant the necessary permissions. You can use an existing role or create a new one. In this demo, we create a new role specifically for our Lambda function.

![The image shows the AWS Lambda console where a user is creating a new function named "demoFunction" with Node.js 20.x as the runtime and x86_64 architecture.](https://kodekloud.com/kk-media/image/upload/v1752859487/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics-Demo/aws-lambda-console-demofunction-nodejs.jpg)

Review any advanced settings if required, then click **Create function**.

![The image shows the AWS Lambda console where a user is setting permissions and advanced settings for creating a new function. Options for execution roles and advanced settings like code signing and VPC are visible.](https://kodekloud.com/kk-media/image/upload/v1752859488/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics-Demo/aws-lambda-console-permissions-settings.jpg)

---

## Function Code Overview

Once the function is created, you will be presented with an overview screen displaying its configuration and triggers (for example, API Gateway or load balancer events). In the code editor section, you will typically find a default file (such as `index.js` for Node.js projects).

Below is an example of a simple handler function:

```
exports.handler = async (event) => {
    console.log(event);
    return 'Hello from Lambda!';
};
```

This handler logs the incoming event and sends back a string response. The `event` parameter contains details about the invoking trigger, which can include payloads, query parameters, or path parameters.

> [!important]
> **Important**
>
> When invoking your Lambda function from various sources, always inspect the event object to understand the source and details of the invocation.

---

## Testing Your Lambda Function

AWS Lambda allows you to easily test your function directly from the console without setting up the actual trigger. To test your function:

1.  Click the **Test** button.
2.  Create a new test event by assigning a name (e.g., "API Gateway Test") and select an event template. AWS provides pre-defined templates that mimic events from various sources like API Gateway, SNS, or SQS.

For instance, an API Gateway event template might look like this:

```
{
  "body": "eyJ2ZXJzaW9uIjoiMS43LjIifQ==",
  "resource": "/{proxy+}",
  "path": "/path/to/resource",
  "httpMethod": "POST",
  "isBase64Encoded": true,
  "queryStringParameters": {
    "foo": "bar"
  }
}
```

Another example template could be:

```
{
  "body": "eyJ2ZXJzaW9uIjoxLCJpZCI6IiJ9",
  "resource": "/{proxy+}",
  "path": "/path/to/resource",
  "httpMethod": "POST",
  "isBase64Encoded": true,
  "queryStringParameters": {
    "foo": "bar"
  }
}
```

Save the test event, select it from the dropdown, and run the test. A typical response may resemble:

```
{
  "statusCode": 200,
  "body": "\"Hello from Lambda\""
}
```

The console will display logs, execution duration, and other metrics along with the response details.

---

## Reviewing Configuration and Monitoring

### General Configuration

Under the **Configuration** tab, you can review and adjust various settings including:

- **Memory allocation:** e.g., 128 MB
- **Ephemeral storage size**
- **Timeout settings:** defaults are 3 seconds (maximum 15 minutes)
- **Execution IAM role details**

![The image shows an AWS Lambda console screen with a function named "demoFunction" and its configuration details, including execution role and permissions.](https://kodekloud.com/kk-media/image/upload/v1752859489/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics-Demo/aws-lambda-console-demo-function.jpg)

### Monitoring and CloudWatch Logs

AWS Lambda automatically collects CloudWatch metrics such as invocation counts, execution duration, and error rates. To access the logs:

1.  Click **View CloudWatch logs** from the Lambda console.
2.  This action will redirect you to the corresponding log group in CloudWatch, where you can explore individual log streams.

![The image shows the AWS Lambda console, specifically the monitoring tab for a function named "demoFunction," displaying CloudWatch metrics such as invocations, duration, and error count.](https://kodekloud.com/kk-media/image/upload/v1752859491/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics-Demo/aws-lambda-monitoring-demo-function.jpg)

Logs include vital details such as request ID, duration, billed duration, memory usage, and any custom messages logged through `console.log`. For instance, after adding a log statement:

```
console.log("Hey this is my application log message");
```

You might see output similar to:

```
START RequestId: 431b959c-4e5d-4ae0-9c50-37b38ada3a87 Version: $LATEST
2024-04-01T21:31:15.771Z    431b959c-4e5d-4ae0-9c50-37b38ada3a87    INFO    Hey this is my application log message
END RequestId: 431b959c-4e5d-4ae0-9c50-37b38ada3a87
REPORT RequestId: 431b959c-4e5d-4ae0-9c50-37b38ada3a87 Duration: 23.77 ms Billed Duration: 24 ms Memory Size: 128 MB Max Memory Used: 66 MB Init Duration: 190.14 ms
```

To review detailed logs, select the latest log stream within CloudWatch:

![The image shows an AWS CloudWatch interface displaying log groups, each with options for configuration and retention settings.](https://kodekloud.com/kk-media/image/upload/v1752859499/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics-Demo/aws-cloudwatch-log-groups-interface.jpg)

![The image shows an AWS CloudWatch interface displaying log group details for a Lambda function, including log streams and various configuration options.](https://kodekloud.com/kk-media/image/upload/v1752859500/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics-Demo/aws-cloudwatch-lambda-log-details.jpg)

![The image shows an AWS CloudWatch interface displaying log events for a Lambda function, including timestamps and messages related to function execution.](https://kodekloud.com/kk-media/image/upload/v1752859501/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics-Demo/aws-cloudwatch-lambda-logs-interface.jpg)

---

## Reviewing Permissions

Within the **Configuration** tab, examine the IAM role associated with your Lambda function. By default, AWS creates an IAM role with permissions to write logs to CloudWatch. An example of such a policy is:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "logs:CreateLogGroup",
      "Resource": "arn:aws:logs:us-east-1:841869297337:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": [
        "arn:aws:logs:us-east-1:841869297337:log-group:/aws/lambda/demoFunction:*"
      ]
    }
  ]
}
```

If your function requires access to other AWS services such as S3, update the IAM role with the necessary permissions. Below is a summary example of assigned permissions:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "logs:CreateLogGroup",
      "Resource": "arn:aws:logs:us-east-1:841868_codegen:l:arn:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": [
        "arn:aws:logs:us-east-1:841868927337:log-group:/aws/lambda/demoFunction:*"
      ]
    }
  ]
}
```

![The image shows an AWS Lambda console screen, specifically the configuration tab for a function named "demoFunction." It displays the execution role details and resource permissions related to Amazon CloudWatch Logs.](https://kodekloud.com/kk-media/image/upload/v1752859503/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics-Demo/aws-lambda-demo-function-config.jpg)

---

## Deleting the Lambda Function

After testing or if you need to free up resources, deleting your Lambda function is straightforward. From the Lambda console:

1.  Click on **Actions**.
2.  Select **Delete function**.
3.  Confirm the deletion when prompted.

AWS will remove the function along with its associated configurations.

![The image shows the AWS Lambda console with details of a function named "demoFunction," including its configuration and execution role.](https://kodekloud.com/kk-media/image/upload/v1752859504/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics-Demo/aws-lambda-console-demo-function-2.jpg)

---

This demonstration has provided you with the fundamentals of creating, testing, monitoring, and managing an AWS Lambda function. With these skills, you can further explore advanced integrations and configurations to scale your serverless applications.

For additional resources and detailed guides on AWS Lambda, consider visiting the [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/37f598f2-4e1c-4861-98e6-299a0c13ef40)**
>
> Watch video content
