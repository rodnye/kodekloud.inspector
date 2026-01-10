# Dead Letter Queue Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Dead-Letter-Queue-Demo)

---

## Table of Contents

- Dead Letter Queue Demo
  - Step 1: Creating the Lambda Function
  - Step 2: Testing the Lambda Function
  - Step 3: Simulating an Error
  - Step 4: Configuring the Dead Letter Queue (DLQ)
  - Step 5: Updating the IAM Role
  - Step 6: Testing the DLQ Configuration
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless

# Dead Letter Queue Demo

In this lesson, you'll learn how to configure a dead letter queue (DLQ) for an AWS Lambda function. When your Lambda is invoked asynchronously and encounters errors, AWS Lambda automatically retries the invocation a predetermined number of times. If the function continues to fail, the event is forwarded to an Amazon SQS queue that acts as the dead letter queue. This setup enables you to analyze and troubleshoot problematic events effectively.

## Step 1: Creating the Lambda Function

Begin by creating a new Lambda function named "Lambda DLQ" using the AWS Lambda console.

![The image shows the AWS Lambda console where a user is creating a new function. Options for authoring from scratch, using a blueprint, or a container image are available, along with fields for function name, runtime, and architecture.](https://kodekloud.com/kk-media/image/upload/v1752859449/notes-assets/images/AWS-Certified-Developer-Associate-Dead-Letter-Queue-Demo/aws-lambda-console-new-function.jpg)

After creating the function, update the code to log the event and return a simple response. Deploy your changes with the following code:

```
export const handler = async (event) => {
    // Log the event to CloudWatch
    console.log(event);
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
```

## Step 2: Testing the Lambda Function

Test the function by invoking it asynchronously via AWS CloudShell. Make sure to specify the invocation type as `Event` and include a sample payload. A status code of 202 confirms that your request for asynchronous processing has been accepted.

Additionally, review CloudWatch logs to verify that the event data has been logged correctly.

> [!important]
> **Note**
>
> Even though the explanation repeats similar code blocks, only one instance of working code is maintained.

## Step 3: Simulating an Error

To simulate a failure, modify the Lambda function code so that it throws an error. Update your function code as shown:

![The image shows an AWS Lambda console screen with a function named "lambdaDLQ" successfully updated. It displays monitoring metrics such as invocations, duration, and error count in the CloudWatch section.](https://kodekloud.com/kk-media/image/upload/v1752859450/notes-assets/images/AWS-Certified-Developer-Associate-Dead-Letter-Queue-Demo/aws-lambda-console-lambdadlq-updated.jpg)

```
export const handler = async (event) => {
    console.log(event);
    throw new Error('OOPS, something went wrong');
    const response = {
        statusCode: 200,
        body: event,
    };
    return response;
};
```

Invoke the function again and inspect the CloudWatch log stream. You should see error messages indicating the function failed with the message "OOPS, something went wrong."

## Step 4: Configuring the Dead Letter Queue (DLQ)

To forward failed invocations to a DLQ, follow these steps:

1.  Navigate to your Lambda function’s configuration page and select the **Asynchronous invocation** section.
2.  Configure the "Maximum age of event" and set the "Retry attempts" (by default, AWS retries twice).
3.  Specify an SQS queue to serve as your dead letter queue.

![The image shows the AWS Lambda console, specifically the "Edit asynchronous configuration" page. It includes settings for maximum age of event, retry attempts, and dead-letter queue service.](https://kodekloud.com/kk-media/image/upload/v1752859451/notes-assets/images/AWS-Certified-Developer-Associate-Dead-Letter-Queue-Demo/aws-lambda-edit-asynchronous-config.jpg)

If you haven't created a DLQ yet, go to the SQS service in the AWS Management Console and create a new standard queue named "lambda DL queue" with default settings.

![The image shows an AWS CloudWatch interface with a search for "sqs" displaying services like Simple Queue Service and Amazon Pinpoint SMS. The right side shows log details with an error message.](https://kodekloud.com/kk-media/image/upload/v1752859452/notes-assets/images/AWS-Certified-Developer-Associate-Dead-Letter-Queue-Demo/aws-cloudwatch-sqs-search-log-details.jpg)

Return to your Lambda configuration, refresh the DLQ settings, select the new "lambda DL queue", and save the configuration. If you encounter a permission error for SendMessage on the SQS queue, proceed to update the Lambda function's IAM role.

## Step 5: Updating the IAM Role

To address permission issues, update the Lambda function’s execution role:

1.  Open the IAM console and locate the execution role via the Permissions tab in the Lambda configuration.
2.  Attach a policy granting permissions to interact with SQS.

![The image shows an AWS Lambda console interface displaying the function "lambdaDLQ" with a diagram view and options for testing, monitoring, and configuration.](https://kodekloud.com/kk-media/image/upload/v1752859454/notes-assets/images/AWS-Certified-Developer-Associate-Dead-Letter-Queue-Demo/aws-lambda-console-lambdadlq-diagram.jpg)

After updating the role, return to the Lambda configuration and save the asynchronous settings once again.

![The image shows an AWS IAM console screen where a user is attaching a policy to a role named "lambdaDLQ-role-e90uty3b." It lists various permission policies available for selection.](https://kodekloud.com/kk-media/image/upload/v1752859455/notes-assets/images/AWS-Certified-Developer-Associate-Dead-Letter-Queue-Demo/aws-iam-console-attach-policy-lambda-role.jpg)

## Step 6: Testing the DLQ Configuration

With the DLQ configured, it’s time to test the setup. Since the function now throws an error, AWS Lambda retries the invocation (twice, as configured) before sending the failed event to the DLQ.

Use the following AWS CLI command in CloudShell to trigger the function:

```
aws lambda invoke --function-name lambdaDLQ --cli-binary-format raw-in-base64-out --payload '{"key1": "value1"}' --invocation-type Event --region us-east-1 response.json
```

A status code of 202 confirms that the invocation was accepted. CloudWatch logs will show multiple retries and corresponding error messages, similar to this output:

```
{
  "errorType": "Error",
  "errorMessage": "OOPS something went wrong",
  "stack": [
    "Error: OOPS something went wrong",
    "    at Runtime.handler (file:///var/task/index.js:4:9)",
    "    at Runtime.handleOnce (file:///var/runtime/index.js:117:29)"
  ]
}
```

Finally, visit the SQS console to poll for messages. The message sent by the Lambda function, including error details, should appear in the DLQ.

![The image shows an AWS console interface for sending and receiving messages, with options to enter a message, set delivery delay, and poll for messages. It displays message polling settings and indicates that there are two messages available.](https://kodekloud.com/kk-media/image/upload/v1752859456/notes-assets/images/AWS-Certified-Developer-Associate-Dead-Letter-Queue-Demo/aws-console-message-polling-interface.jpg)

## Conclusion

This lesson demonstrated how to set up and test a dead letter queue for an AWS Lambda function. By configuring asynchronous invocation settings and properly updating the Lambda execution role, you ensure that failed events are captured in an SQS DLQ for detailed analysis and troubleshooting. This robust approach helps maintain the reliability and resilience of your serverless applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/609df5b9-68f4-4c37-8058-fa8841d573e8)**
>
> Watch video content
