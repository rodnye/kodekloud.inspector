# Lambda with CLI Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Lambda-with-CLI-Demo)

---

## Table of Contents

- Lambda with CLI Demo
  - Lambda Invocation Modes
  - Creating and Deploying a Lambda Function
  - Listing Lambda Functions
  - Invoking the Lambda Function Synchronously
  - Invoking the Lambda Function Asynchronously
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless

# Lambda with CLI Demo

In this lesson, you will learn how to manage AWS Lambda functions using the AWS CLI. We cover listing functions, creating a function, and invoking it both synchronously and asynchronously.

---

## Lambda Invocation Modes

Before diving into the CLI commands, it's important to understand the two primary invocation modes for Lambda functions:

- **Synchronous:** The function returns an immediate response, making it ideal when a load balancer or API Gateway invokes your Lambda.
- **Asynchronous:** The function is executed in the background, which is suitable for processing events from sources like SQS.

![The image is a screenshot from the AWS Lambda Operator Guide, comparing different Lambda invocation modes: synchronous, asynchronous, and polling, with examples of services for each mode.](https://kodekloud.com/kk-media/image/upload/v1752859566/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-with-CLI-Demo/aws-lambda-invocation-modes-comparison.jpg)

Using the AWS CLI, you can invoke functions in both of these modes.

---

## Creating and Deploying a Lambda Function

Let's begin by creating a Lambda function. For demonstration purposes, we will name the function `lambdaDemo` and use the default settings. The function logs the incoming event and returns it as the response.

Below is the final version of our handler code:

```
export const handler = async (event) => {
    // TODO implement
    console.log(event);
    const response = {
        statusCode: 200,
        body: event,
    };
    return response;
};
```

After updating the code, deploy your Lambda function to apply the changes.

---

## Listing Lambda Functions

You can list all Lambda functions in a specific region using the AWS CLI. For example, to list functions in the US East (N. Virginia) region, run the following command:

```
aws lambda list-functions --region us-east-1
```

This command outputs a JSON with details about each function. A sample output is shown below:

```
[cloudshell-user@ip-10-130-87-123 ~]$ aws lambda list-functions --region us-east-1
{
    "Functions": [
        {
            "FunctionName": "lambdaDemo",
            "FunctionArn": "arn:aws:lambda:us-east-1:841860927373:function:lambdaDemo",
            "Runtime": "nodejs20.x",
            "Role": "arn:aws:iam::841860927373:role/service-role/lambdaDemo-role-5h7killd",
            "Handler": "index.handler",
            "CodeSize": 244,
            "Description": "",
            "Timeout": 3,
            "MemorySize": 128,
            "LastModified": "2024-04-04T23:55:45.000+0000",
            "CodeSha256": "OziJva6DXkgm2GmBvd2GIkZc7+KLotei0VgJEYYc=",
            "Version": "$LATEST",
            "TracingConfig": {
                "Mode": "PassThrough"
            },
            "RevisionId": "f22a055c-0a86-4a25-9545-e69424b71c85",
            "PackageType": "Zip",
            "Architectures": [
                "x86_64"
            ],
            "EphemeralStorage": {
                "Size": 512
            }
        }
    ]
}
```

---

## Invoking the Lambda Function Synchronously

Invoking your Lambda function synchronously returns an immediate response. Use the command below to invoke `lambdaDemo` with a JSON payload that serves as the event object:

```
aws lambda invoke \
    --function-name lambdaDemo \
    --cli-binary-format raw-in-base64-out \
    --payload '{"key1":"value1", "key2":"value2"}' \
    --region us-east-1 \
    response.json
```

This command returns an output similar to:

```
{
    "StatusCode": 200,
    "ExecutedVersion": "$LATEST"
}
```

The response details are saved in the file `response.json`. To inspect its contents, execute:

```
ls
cat response.json
```

You should see output such as:

```
{"statusCode":200,"body":{"key1":"value1","key2":"value2"}}
```

> [!important]
> **Note**
>
> The synchronous invocation returns both the status code and the response body directly.

---

## Invoking the Lambda Function Asynchronously

For asynchronous invocation, add the `--invocation-type Event` flag. In this mode, the function's response is not returned directly; instead, a status code is provided to indicate that the request was accepted.

Run the following command:

```
aws lambda invoke \
    --function-name lambdaDemo \
    --cli-binary-format raw-in-base64-out \
    --payload '{"key1":"value1", "key2":"value2"}' \
    --invocation-type Event \
    --region us-east-1 \
    response.json
```

The asynchronous invocation returns a status code, for example:

```
{
    "StatusCode": 202
}
```

Since execution happens in the background, the output is not stored in `response.json`. To check the results of the function, review the associated CloudWatch logs.

![The image shows an AWS CloudWatch interface displaying log events for a Lambda function, with details such as timestamps, request IDs, and memory usage.](https://kodekloud.com/kk-media/image/upload/v1752859568/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-with-CLI-Demo/aws-cloudwatch-lambda-logs.jpg)

> [!important]
> **Warning**
>
> When invoking functions asynchronously, ensure you monitor CloudWatch logs to verify execution and troubleshoot issues.

---

## Summary

In this lesson, you've learned how to:

- List Lambda functions in a specific AWS region.
- Create and deploy a Lambda function that logs and returns the event object.
- Invoke the Lambda function synchronously to immediately receive a response.
- Invoke the Lambda function asynchronously and use CloudWatch logs to track outputs.

By using the AWS CLI with the appropriate flags, you can efficiently test and manage your Lambda functions in both synchronous and asynchronous modes.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/bc03da63-49ac-4ecf-9968-c7d526e81b0d)**
>
> Watch video content
