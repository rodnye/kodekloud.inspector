# Lambda EventBridge Integration Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Lambda-EventBridge-Integration-Demo)

---

## Table of Contents

- Lambda EventBridge Integration Demo
  - 1. Configuring the EventBridge Trigger
  - 2. Verifying Permissions
  - 3. Updating the Lambda Code
  - 4. Observing Logs in CloudWatch
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless

# Lambda EventBridge Integration Demo

In this tutorial, you'll learn how to configure Amazon EventBridge to invoke AWS Lambda functions. Whether you want to trigger a Lambda function when a file is uploaded to S3, when a commit is made in CodeCommit, or on a scheduled basis similar to a cron job, EventBridge offers an efficient and automated solution.

Let's walk through the complete process.

## 1\. Configuring the EventBridge Trigger

In this example, we have a Lambda function named "lambda-EventBridge". Follow these steps to add an EventBridge trigger:

1.  Navigate to the Lambda function configuration and add a new trigger.
2.  Search for "EventBridge" in the trigger options.
3.  Select EventBridge and choose to create a new rule.
4.  Provide a rule name (for example, "EveryMinute") and select the "Schedule expression" option.

The image below shows the AWS Lambda interface for configuring an EventBridge trigger, including options for creating a new rule, naming the rule, and selecting a schedule expression:

![The image shows an AWS Lambda interface for configuring a trigger using EventBridge (CloudWatch Events). It includes options to create a new rule, set a rule name, and choose a schedule expression.](https://kodekloud.com/kk-media/image/upload/v1752859529/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-EventBridge-Integration-Demo/aws-lambda-eventbridge-trigger-config.jpg)

Set the rule to run every minute by specifying the following schedule expression:

```
rate(1 minute)
```

After adding the trigger, your Lambda function configuration will now include an EventBridge trigger.

The next image illustrates the Lambda console with the "lambda-eventBridge" function and the successfully added "EveryMinute" trigger:

![The image shows an AWS Lambda console interface with a function named "lambda-eventBridge." It indicates that a trigger named "EveryMinute" has been successfully added to the function.](https://kodekloud.com/kk-media/image/upload/v1752859530/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-EventBridge-Integration-Demo/aws-lambda-console-eventbridge-trigger.jpg)

## 2\. Verifying Permissions

Ensure that EventBridge has permission to invoke your Lambda function. Your function's permissions policy should include a statement similar to this:

```
{
    "Version": "2012-10-17",
    "Id": "default",
    "Statement": [
        {
            "Sid": "lambda-d5efffbf-b639-447c-b644-e85058e0ef33",
            "Effect": "Allow",
            "Principal": {
                "Service": "events.amazonaws.com"
            },
            "Action": "lambda:InvokeFunction",
            "Resource": "arn:aws:lambda:us-east-1:841869027337:function:lambda-eventBridge",
            "Condition": {
                "ArnLike": {
                    "AWS:SourceArn": "arn:aws:events:us-east-1:841869027337:rule/EveryMinute"
                }
            }
        }
    ]
}
```

> [!important]
> **Note**
>
> This permissions setting allows the "EveryMinute" EventBridge rule to trigger your Lambda function automatically every minute.

## 3\. Updating the Lambda Code

To monitor the event details that trigger your function, update your Lambda code to log the incoming event object. Use the example code below:

```
export const handler = async (event) => {
    console.log(event);
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
```

Deploy your updated code and allow the function to process several events over the next few minutes.

## 4\. Observing Logs in CloudWatch

After the Lambda function runs a few times, navigate to CloudWatch to review the logs. In the most recent log stream, you should notice entries indicating that your function is triggered every minute.

Below is an example snippet from the CloudWatch logs:

```
2024-04-04T20:37:06.080-06:00	END RequestId: a993e3e7-8577-4a1f-84f9-233896d33a39
2024-04-04T20:37:06.080-06:00	REPORT RequestId: a993e3e7-8577-4a1f-84f9-233896d33a39	Duration: 49.94 ms	Billed Duration: 50 ms	Memory Size: 128 MB	Max Memory Used: 66 MB	Init Duration: 3.12 ms
2024-04-04T20:37:16.267-06:00	START RequestId: 7a600432-53f4-4ba6-936d-35c7dc93fbfa	Version: $LATEST
2024-04-04T20:37:16.267-06:00	2024-04-04T20:37:16.267Z	7a600432-53f4-4ba6-936d-35c7dc93fbfa	INFO	{ version: '0', id: 'ads09e2a-c94b-40a2-9923-6b9469f9b6c', 'detail-type': 'Scheduled Event', source: 'aws.events', account: '341868092733', time: '2024-04-04T20:37:16Z', region: 'us-east-1', resources: [ 'arn:aws:events:us-east-1:841868092733:rule/EveryMinute' ], detail: {} }
2024-04-04T20:37:16.273-06:00	END RequestId: 7a600432-53f4-4ba6-936d-35c7dc93fbfa
2024-04-04T20:37:16.273-06:00	REPORT RequestId: 7a600432-53f4-4ba6-936d-35c7dc93fbfa	Duration: 5.19 ms	Billed Duration: 6 ms	Memory Size: 128 MB	Max Memory Used: 66 MB	Init Duration: 3.12 ms
```

The image below displays a CloudWatch Logs page with log entries, timestamps, and messages:

![The image shows an AWS CloudWatch Log Events page displaying log entries with timestamps and messages. The interface includes options for filtering and managing log data.](https://kodekloud.com/kk-media/image/upload/v1752859531/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-EventBridge-Integration-Demo/aws-cloudwatch-log-events-page.jpg)

## Conclusion

This demo illustrated how to integrate Amazon EventBridge with AWS Lambda. You learned how to:

- Create an EventBridge trigger using the Lambda console.
- Verify that the appropriate permissions are configured.
- Update your Lambda function to log and process event data.
- Monitor the function's execution using CloudWatch logs.

By following these steps, you can automate various workflows using EventBridge and Lambda, ensuring seamless execution of scheduled tasks or responses to AWS events.

For additional insights into AWS Lambda and EventBridge, check out the [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/) and [Amazon EventBridge Documentation](https://docs.aws.amazon.com/eventbridge/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/2ca8bf90-bfff-4fee-88e7-e30c9d9803b7)**
>
> Watch video content
