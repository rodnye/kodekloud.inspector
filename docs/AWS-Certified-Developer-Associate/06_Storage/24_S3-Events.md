# S3 Events - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/S3-Events)

---

## Table of Contents

- S3 Events
  - Configuring S3 Events with a Lambda Function
  - Testing Your Configuration
  - Watch Video
    - Step-by-Step Setup:
    - Lambda Function Setup

---

## Content

AWS Certified Developer - Associate

Storage

# S3 Events

In this lesson, you'll learn how S3 events automatically trigger actions when specific events occur within an Amazon S3 bucket. For example, when a user uploads or deletes an object, S3 can generate an event that integrates with other AWS services such as Lambda, SNS, SQS, or EventBridge.

![The image illustrates the flow of S3 events from an S3 bucket to various AWS services, including Amazon SNS, AWS Lambda, Amazon SQS, and Amazon EventBridge.](https://kodekloud.com/kk-media/image/upload/v1752859758/notes-assets/images/AWS-Certified-Developer-Associate-S3-Events/s3-events-flow-aws-services.jpg)

When a user uploads an object, S3 can trigger an event that either publishes a message to an SNS topic, starts a Lambda function, sends a message to an SQS queue, or integrates with EventBridge. For instance, if a user uploads a video, you can have S3 automatically invoke a Lambda function that processes and converts the video—removing the need for continuous polling.

> [!important]
> **Key Capabilities**
>
> S3 events offer significant flexibility. You can configure automated triggers for a variety of actions, including:
>
> - Object creation (covering POST, COPY, and multi-part upload events)
> - Object deletion
> - Object restoration
> - Object transitions (such as those triggered by lifecycle policies or changes in storage classes)

Below is an image showcasing the ten different types of Amazon S3 events that can generate notifications, including events for new object creation, removal, and lifecycle expiration:

![The image lists ten types of Amazon S3 events for which notifications can be published, including new object creation, object removal, and lifecycle expiration events. Each event type is color-coded and numbered.](https://kodekloud.com/kk-media/image/upload/v1752859760/notes-assets/images/AWS-Certified-Developer-Associate-S3-Events/amazon-s3-event-notifications-list.jpg)

## Configuring S3 Events with a Lambda Function

In this demo, you'll set up S3 event notifications to trigger a simple Lambda function when an object is uploaded to an S3 bucket.

### Step-by-Step Setup:

1.  **Create an S3 Bucket:**
    - Create your S3 bucket and navigate to its **Properties** section.
    - Scroll down to the **Event Notifications** area.
    - You have two notification options: use built-in event notifications or Amazon EventBridge. In this demo, choose to create an event notification.

2.  **Create Event Notification:**
    - Click on **Create event notifications**.
    - Provide a name for the event (e.g., "new object uploaded").
    - By default, the event applies to the entire bucket. Optionally, specify a prefix (to target specific directories) or suffix (to filter by file type, such as `.JPEG` or `.PNG`).

3.  **Select Event Type:**
    - Choose the type of operation to trigger the event (e.g., object creation events). For this demo, select an event that applies to any object creation.

4.  **Choose the Destination:**
    - Select the destination for the event. Options include:
      - Triggering a Lambda function
      - Sending a message to an SNS topic
      - Pushing a message to an SQS queue

    For this example, select **Lambda function**.

![The image shows a configuration screen for setting up an event notification in Amazon S3, with fields for event name, prefix, and suffix, and options for selecting event types.](https://kodekloud.com/kk-media/image/upload/v1752859761/notes-assets/images/AWS-Certified-Developer-Associate-S3-Events/amazon-s3-event-notification-setup.jpg)

### Lambda Function Setup

Even if you're new to Lambda, don’t worry. Lambda functions are simply pieces of code that execute in response to events. In this demo, you'll use a Lambda function with the simple code snippet below to log details of the S3 event:

```
export const handler = async (event) => {
    console.log(event);
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda'),
    };
    return response;
};
```

After configuring the Lambda function:

- Select this function in the Lambda configuration.
- Set the event type to "new objects created" (or an appropriate equivalent).
- Click **Save changes**. S3 will update the Lambda function’s permissions to allow it to be triggered by S3 events.

![The image shows an AWS interface for configuring event notifications, with options to select a destination such as a Lambda function, SNS topic, or SQS queue. The "Lambda function" option is selected, and there is a dropdown to choose a specific function.](https://kodekloud.com/kk-media/image/upload/v1752859762/notes-assets/images/AWS-Certified-Developer-Associate-S3-Events/aws-event-notifications-lambda-config.jpg)

## Testing Your Configuration

Verify that your configuration is working by following these steps:

1.  **Upload an Object:**
    - In the S3 console, navigate to the **Objects** section.
    - Upload a file (for example, an image of dogs) to your bucket.

2.  **Monitor the Event:**
    - After the upload, switch to the **Monitoring** tab and access CloudWatch logs.
    - Open the latest log stream to review the output.
    - Look for logged event details that include the event name, the S3 operation (such as a PUT event), and metadata related to the uploaded object.

![The image shows an AWS CloudWatch interface displaying log group details for "/aws/lambda/new-object-created," including information like ARN, creation time, and metric filters.](https://kodekloud.com/kk-media/image/upload/v1752859764/notes-assets/images/AWS-Certified-Developer-Associate-S3-Events/aws-cloudwatch-log-group-details.jpg)

![The image shows an AWS CloudWatch interface displaying log entries for a Lambda function, including details like timestamps, request IDs, and event information.](https://kodekloud.com/kk-media/image/upload/v1752859765/notes-assets/images/AWS-Certified-Developer-Associate-S3-Events/aws-cloudwatch-lambda-logs.jpg)

The CloudWatch logs confirm that the Lambda function was successfully triggered by the S3 event, validating your configuration.

> [!important]
> **Summary**
>
> This demonstration illustrates how S3 events can seamlessly integrate with AWS Lambda to automate workflows based on bucket activities. With proper configuration, you can streamline processes such as file processing, data validation, and more, leveraging the power of AWS cloud services.

That concludes this lesson on S3 events. For further reading on S3 and related AWS services, refer to the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/400ebcbb-1775-4d73-8d4b-a1179e24ff6b)**
>
> Watch video content
