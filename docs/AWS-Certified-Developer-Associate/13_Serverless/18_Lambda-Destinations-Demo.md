# Lambda Destinations Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Lambda-Destinations-Demo)

---

## Table of Contents

- Lambda Destinations Demo
  - Creating the Lambda Function
  - Setting Up the Trigger
  - Configuring Lambda Destinations
  - Testing the Successful Invocation
  - Testing the Failure Scenario
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless

# Lambda Destinations Demo

In this lesson, you'll learn how to configure AWS Lambda destinations to manage the outcome of asynchronous invocations. We'll create a Lambda function that processes new user registrations and routes successful events and errors to separate Amazon SQS queues.

## Creating the Lambda Function

Begin by creating a Lambda function named "lambda_new_user". This function will execute every time a new user registers.

![The image shows an AWS Lambda console with a function named "lambda_new_user" successfully created. It includes options to add triggers, destinations, and view function details like ARN and last modified time.](https://kodekloud.com/kk-media/image/upload/v1752859515/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Destinations-Demo/aws-lambda-console-new-user-function.jpg)

Update the function code to log the event and return a simple message confirming the registration:

```
export const handler = async (event) => {
    console.log(event);
    // Simulate a new user registration.
    return {
        statusCode: 200,
        body: JSON.stringify('New User Registered'),
    };
};
```

Deploy these changes before proceeding.

## Setting Up the Trigger

Next, configure your Lambda function to be triggered when a new registration message is published to an SNS topic.

1.  When a new user registers, your application will publish a message to an SNS topic.
2.  In your Lambda function configuration, add the SNS topic as a trigger.

![The image shows an AWS Lambda interface where a user is adding a trigger, with a dropdown menu listing various AWS services like Alexa, API Gateway, and CloudFront.](https://kodekloud.com/kk-media/image/upload/v1752859517/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Destinations-Demo/aws-lambda-trigger-dropdown-menu.jpg)

Select your "new user" SNS topic:

![The image shows an AWS Lambda interface where a trigger is being added, specifically an SNS topic with an ARN provided. The "Add" button is highlighted, indicating the action to add the trigger.](https://kodekloud.com/kk-media/image/upload/v1752859518/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Destinations-Demo/aws-lambda-add-sns-trigger.jpg)

## Configuring Lambda Destinations

Set up asynchronous invocation destinations for your Lambda function to handle both successful and failed events. In this example, you'll configure two Amazon SQS queues:

- One for successful invocations (e.g., "new_user_success").
- One for failed invocations (e.g., "new_user_failure").

![The image shows the "Create queue" page in the Amazon SQS (Simple Queue Service) interface, where users can configure queue details such as type, name, and message settings.](https://kodekloud.com/kk-media/image/upload/v1752859519/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Destinations-Demo/amazon-sqs-create-queue-page.jpg)

1.  Create the two SQS queues.
2.  In the Lambda function configuration, under the destinations section (for asynchronous invocations, not event source mapping), set the destination for an on-failure event using the failure SQS queue.
3.  Similarly, configure the destination for an on-success event using the success SQS queue.

![The image shows an AWS Lambda function configuration page for "lambda_new_user," with a diagram illustrating its integration with SNS and Amazon SQS.](https://kodekloud.com/kk-media/image/upload/v1752859520/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Destinations-Demo/aws-lambda-new-user-sns-sqs-diagram.jpg)

Alternatively, you can configure these settings using the AWS CLI if preferred.

## Testing the Successful Invocation

To verify your configuration:

1.  Open the SNS topic in the AWS SNS console.
2.  Publish a message, for example using "user one" as the username, with an optional message like "new user registered."

![The image shows an Amazon SNS (Simple Notification Service) interface for publishing a message to a topic, with fields for message details like subject and time to live (TTL).](https://kodekloud.com/kk-media/image/upload/v1752859521/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Destinations-Demo/amazon-sns-publish-message-interface.jpg)

After publishing the message, the Lambda function processes the event and sends a message to the success SQS queue. Verify that the success queue contains a message similar to:

```
{
  "body": "1aa2c035c0d0",
  "functionArn": "arn:aws:lambda:us-east-1:841860927337:function:lambda_new_user:$LATEST",
  "condition": "Success",
  "approximateInvokeCount": 1,
  "requestPayload": {
    "Records": [
      {
        "EventSource": "aws:sns",
        "EventVersion": "1.0",
        "EventSubscriptionArn": "arn:aws:sns:us-east-1:841860927337:..."
      }
    ]
  }
}
```

![The image shows an Amazon SQS queue details page for a queue named "newUser_success" in the AWS Management Console. It includes information such as the queue type, URL, ARN, and encryption details.](https://kodekloud.com/kk-media/image/upload/v1752859522/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Destinations-Demo/amazon-sqs-newuser-success-details.jpg)

You can inspect the message details by polling the SQS queue.

![The image shows a pop-up window displaying a message with a unique identifier and a body of encoded text, likely from a cloud service interface. The background appears to be a web page with options for sending and receiving messages.](https://kodekloud.com/kk-media/image/upload/v1752859523/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Destinations-Demo/cloud-service-message-popup-window.jpg)

> [!important]
> **Note**
>
> Ensure that your SNS topic and Lambda function have the proper permissions for integration.

## Testing the Failure Scenario

Next, update your Lambda function to simulate an error. Modify the code to throw an error, allowing you to test the on-failure destination configuration:

```
export const handler = async (event) => {
    console.log(event);
    // Simulate an error in processing.
    throw new Error('something went wrong');
    // The response below will not be returned.
    return {
        statusCode: 200,
        body: JSON.stringify('New User Registered'),
    };
};
```

Deploy this updated code. Then publish a new message to the SNS topic (for example, using "user two" as the username). The Lambda function will fail and trigger asynchronous retry behavior. After two retry attempts, the event is sent to the failure SQS queue.

Check CloudWatch logs for error details. A sample error log might look like this:

```
{
  "errorType": "Error",
  "errorMessage": "something went wrong",
  "stack": [
    "Error: something went wrong",
    "    at Runtime.handler (file:///var/task/index.mjs:4:19)",
    "    at Runtime.handleOneConstreaming (file:///var/runtime/index.mjs:1173:29)"
  ]
}
```

Once verified, navigate to the SQS failure queue.

![The image shows an Amazon Web Services (AWS) Simple Queue Service (SQS) interface for sending and receiving messages. It includes fields for entering a message body, setting a delivery delay, and options for polling messages.](https://kodekloud.com/kk-media/image/upload/v1752859524/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Destinations-Demo/aws-sqs-interface-messaging.jpg)

Poll the failure queue to view the failed message. An example message might include:

```
{
  "version": "1.0",
  "timestamp": "2024-04-05T02:53:09.185Z",
  "requestContext": {
    "requestId": "79187a77-1b5e-47e2-a659-747328bd5988"
  },
  "functionArn": "arn:aws:lambda:us-east-1:841186092733:function:lambda_new_user:$LATEST",
  "condition": "RetriesExhausted",
  "approximateInvokeCount": 3
}
```

The error details within the message body may appear as follows:

```
{
  "errorType": "Error",
  "errorMessage": "something went wrong",
  "trace": [
    "Error: something went wrong",
    "    at Runtime.handler (file:///var/task/index.mjs:4:9)",
    "    at Runtime.handleOnceNonStreaming (file:///var/runtime/index.mjs:1173:29)"
  ]
}
```

![The image shows an AWS console interface for sending and receiving messages from a queue. It includes sections for entering a message, setting delivery delay, and viewing received messages with details like message ID and size.](https://kodekloud.com/kk-media/image/upload/v1752859525/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Destinations-Demo/aws-console-message-queue-interface.jpg)

> [!important]
> **Warning**
>
> Remember that failing invocations will trigger retries. Monitor CloudWatch to ensure that errors are handled as expected.

## Summary

In this lesson, you configured AWS Lambda destinations to manage asynchronous invocations effectively. By directing successful events to one SQS queue and routing errors to another, you can enhance the robustness of your serverless architecture and streamline the monitoring process. Whether you're processing new user registrations or capturing errors, these techniques help ensure that your system remains reliable and responsive during variable workloads.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/489f9145-96a2-4814-86e8-2d63acf7411c)**
>
> Watch video content
