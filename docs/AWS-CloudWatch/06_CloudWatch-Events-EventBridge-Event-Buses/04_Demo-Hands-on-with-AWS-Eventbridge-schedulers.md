# Demo Hands on with AWS Eventbridge schedulers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/CloudWatch-Events-EventBridge-Event-Buses/Demo-Hands-on-with-AWS-Eventbridge-schedulers)

---

## Table of Contents

- Demo Hands on with AWS Eventbridge schedulers
  - Prerequisites
  - Step 1: Create a Lambda Function
  - Step 2: Add the Function Code
  - Step 3: Create an EventBridge Schedule
  - Step 4: Configure the Schedule Target
  - Step 5: Monitor Invocations
  - Common Use Cases
  - Cleanup
  - Links and References
  - Watch Video

---

## Content

AWS CloudWatch

CloudWatch Events EventBridge Event Buses

# Demo Hands on with AWS Eventbridge schedulers

In this guide, you’ll learn how to use **AWS EventBridge** to schedule **AWS Lambda** function invocations. We’ll walk through creating a simple “Hello World” Lambda, setting up a recurring schedule in EventBridge, monitoring invocations, and exploring real-world scenarios.

> [!important]
> **Note**
>
> Scheduling functions with EventBridge may incur additional charges. Check the [EventBridge pricing](https://aws.amazon.com/eventbridge/pricing/) before you begin.

## Prerequisites

- An AWS account with permissions for Lambda and EventBridge
- Basic familiarity with the AWS Management Console

---

## Step 1: Create a Lambda Function

1.  Sign in to the **AWS Management Console**.
2.  Navigate to **AWS Lambda** > **Functions** > **Create function**.
3.  Choose **Blueprint**, search for “Hello World,” and select it.
4.  Enter a name, e.g., `my_lambda`.
5.  Select **Node.js 18.x** (or **Python 3.x** if you prefer).
6.  Keep all other settings as default and click **Create function**.

![The image shows the AWS Lambda console where a user is creating a new function using a blueprint. The function is named "my_lambda" with Node.js 18.x as the runtime.](https://kodekloud.com/kk-media/image/upload/v1752862423/notes-assets/images/AWS-CloudWatch-Demo-Hands-on-with-AWS-Eventbridge-schedulers/aws-lambda-console-create-function-blueprint.jpg)

---

## Step 2: Add the Function Code

1.  In the inline editor, replace the default handler with the following Python code:

```
import json

def lambda_handler(event, context):
    print("loading function")
    return json.dumps(event, indent=2)
```

2.  Click **Deploy**.

By default, there is no trigger attached. Next, we’ll configure EventBridge.

---

## Step 3: Create an EventBridge Schedule

1.  Open the **Amazon EventBridge** console.
2.  In the left pane, choose **Schedules** > **Create schedule**.
3.  Enter a name (e.g., `every-2-minutes`) and select **Recurring schedule**.
4.  Under **Schedule type**, pick **Rate-based** and set it to **Every 2 minutes**.
    - You can also use a cron expression under **Cron-based** if needed.
5.  Click **Next**, disable **Enabled**, and click **Next** again.

![The image shows a screenshot of the Amazon EventBridge Scheduler interface, where a recurring rate-based schedule is being set to run every 2 minutes. The interface includes options for time zone and daylight saving adjustments.](https://kodekloud.com/kk-media/image/upload/v1752862424/notes-assets/images/AWS-CloudWatch-Demo-Hands-on-with-AWS-Eventbridge-schedulers/amazon-eventbridge-scheduler-recurrence-screenshot.jpg)

---

## Step 4: Configure the Schedule Target

1.  For **Target**, choose **AWS service** > **Lambda function**.
2.  Select your `my_lambda` function from the dropdown (hit the refresh icon if it doesn’t appear).
3.  (Optional) Add a custom JSON payload in the **Input** section.
4.  Click **Next**, then **Create schedule**.
5.  Finally, enable the schedule to start invoking your function every 2 minutes.

![The image shows an Amazon Web Services (AWS) EventBridge Scheduler interface where a user is selecting a target API for a schedule. Various AWS services like CodeBuild, Lambda, and SNS are listed as options.](https://kodekloud.com/kk-media/image/upload/v1752862426/notes-assets/images/AWS-CloudWatch-Demo-Hands-on-with-AWS-Eventbridge-schedulers/aws-eventbridge-scheduler-target-api.jpg)

![The image shows an AWS EventBridge Scheduler interface where a Lambda function named "my_lambda" is being configured with options to create a new Lambda function and input a JSON payload.](https://kodekloud.com/kk-media/image/upload/v1752862427/notes-assets/images/AWS-CloudWatch-Demo-Hands-on-with-AWS-Eventbridge-schedulers/aws-eventbridge-scheduler-lambda-config.jpg)

---

## Step 5: Monitor Invocations

1.  Go back to the **Lambda** console and open your `my_lambda` function.
2.  Select the **Monitor** tab.
3.  Adjust the time range to **Last 30 minutes** (or **15 minutes**).
4.  You should see invocations every 2 minutes along with logs and metrics.

![The image shows an AWS Lambda monitoring dashboard with CloudWatch metrics, including graphs for invocations, duration, error count, success rate, throttles, total concurrent executions, and recursive invocations dropped.](https://kodekloud.com/kk-media/image/upload/v1752862429/notes-assets/images/AWS-CloudWatch-Demo-Hands-on-with-AWS-Eventbridge-schedulers/aws-lambda-monitoring-dashboard-cloudwatch-metrics.jpg)

Scroll down to view individual invocation timestamps and durations.

---

## Common Use Cases

| Use Case                | Description                                     | Example                                                    |
| ----------------------- | ----------------------------------------------- | ---------------------------------------------------------- |
| Periodic Health Checks  | Run database or API checks at regular intervals | Lambda polls an RDS instance, logs health status           |
| Scheduled Notifications | Send reminders or alerts via SNS                | Lambda composes a message and publishes to an SNS topic    |
| Automated Reports       | Generate and distribute reports to stakeholders | Lambda fetches data from S3, formats a PDF, emails via SNS |

For instance, you could have EventBridge trigger a Lambda that loads a PDF of DevOps headlines from S3 and pushes it to an SNS topic for subscriber email delivery.

![The image shows the AWS Lambda console with details of a function named "my_lambda," including options for monitoring, configuration, and CloudWatch metrics.](https://kodekloud.com/kk-media/image/upload/v1752862430/notes-assets/images/AWS-CloudWatch-Demo-Hands-on-with-AWS-Eventbridge-schedulers/aws-lambda-console-my-lambda-function.jpg)

---

## Cleanup

To avoid ongoing charges:

1.  Delete the `my_lambda` function in **AWS Lambda**.
2.  Remove your schedule under **EventBridge** > **Schedules**.

> [!important]
> **Warning**
>
> Be sure to clean up both Lambda functions and EventBridge schedules to prevent unexpected costs.

![The image shows the Amazon EventBridge Scheduler interface, highlighting features like templated targets, universal targets, flexible time windows, and retries. It includes options to create and manage schedules within the AWS console.](https://kodekloud.com/kk-media/image/upload/v1752862431/notes-assets/images/AWS-CloudWatch-Demo-Hands-on-with-AWS-Eventbridge-schedulers/amazon-eventbridge-scheduler-interface.jpg)

---

## Links and References

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [Amazon EventBridge Scheduler](https://docs.aws.amazon.com/eventbridge/latest/userguide/scheduler.html)
- [AWS Pricing Calculator](https://calculator.aws/#/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/943dddff-037a-4401-a679-e39be4809f10/lesson/b7c98f61-b683-4306-afef-fcdda9e85ade)**
>
> Watch video content
