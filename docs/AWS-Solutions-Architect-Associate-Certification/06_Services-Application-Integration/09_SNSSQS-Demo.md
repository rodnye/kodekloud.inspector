# SNSSQS Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Application-Integration/SNSSQS-Demo)

---

## Table of Contents

- SNSSQS Demo
  - Architecture Overview
  - Step 1: Configuring the SNS Topic
  - Step 2: Creating SQS Queues
  - Step 3: Testing SNS and SQS Integration
  - Step 4: Configuring Lambda Functions
  - Step 5: Configuring S3 Event Notifications
  - Step 6: Testing and Verification
  - Cleanup
  - Watch Video
    - Video Processing Queue
    - Thumbnail Processing Queue
    - Video Processing Lambda Function
    - Thumbnail Processing Lambda Function

---

## Content

AWS Solutions Architect Associate Certification

Services Application Integration

# SNSSQS Demo

In this lesson, you will learn how to integrate Amazon SNS and Amazon SQS to build a video processing application. The goal is to trigger workflows when a user uploads a video file (e.g., MP4) to an S3 bucket. This upload starts an SNS notification that fans out to two SQS queues. One queue invokes a Lambda function for video conversion (e.g., converting the video into HLS format), while the other triggers a Lambda function to generate video thumbnails.

Below is an overview of the architecture along with detailed configuration steps.

---

## Architecture Overview

1.  **S3 Bucket for Raw Videos:**  
    When a user uploads a video, the file is stored in an S3 bucket in its original format.
2.  **SNS Topic Notification:**  
    The S3 bucket invokes an SNS notification (e.g., topic name _video-uploaded_) each time a video is uploaded.
3.  **Fan-out to SQS Queues:**  
    The SNS topic sends out notifications to two SQS queues:
    - **Video Processing Queue:**  
      A subscribed Lambda function retrieves the file name from the message, downloads the video from S3, processes it (e.g., converts the video), and then uploads the converted video to a designated S3 bucket.
    - **Thumbnail Processing Queue:**  
      A second Lambda function automatically creates video thumbnails and stores them in a specified thumbnails S3 bucket.

Below is the architecture diagram illustrating the entire flow:

![The image shows an AWS console interface for creating a topic, with options for selecting FIFO or Standard topic types, and fields for entering the topic name and display name.](https://kodekloud.com/kk-media/image/upload/v1752864751/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-console-create-topic-fifo-standard.jpg)

---

## Step 1: Configuring the SNS Topic

1.  Open the SNS service console and navigate to "Topics." Click on "Create topic".
2.  Enter the topic name (for example, _video-uploaded_) and select the Standard type (message ordering is not required for this application).

![The image shows an Amazon SNS (Simple Notification Service) console screen with a topic named "video-uploaded" successfully created. It includes details like the ARN and options to edit, delete, or publish messages.](https://kodekloud.com/kk-media/image/upload/v1752864752/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/amazon-sns-video-uploaded-topic.jpg)

3.  Optionally, set a display name and retain default settings for encryption and access policies. Click "Create topic" to finalize the configuration.

---

## Step 2: Creating SQS Queues

### Video Processing Queue

1.  Go to the SQS console and click "Create queue."
2.  Select the Standard queue type and name the queue _video-processing_.
3.  Accept the default settings for visibility timeout, delivery delay, and message retention.
4.  Under the access policy, leave it at its default setting (only the queue owner can send/receive messages).

![The image shows the Amazon SQS (Simple Queue Service) interface for creating a new queue. It includes options for selecting the queue type (Standard or FIFO) and configuring settings like visibility timeout and message retention period.](https://kodekloud.com/kk-media/image/upload/v1752864753/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/amazon-sqs-create-queue-interface.jpg)

![The image shows an Amazon Web Services (AWS) console screen for creating a Simple Queue Service (SQS) queue named "video-processing," with configuration options for visibility timeout, message retention period, delivery delay, and maximum message size.](https://kodekloud.com/kk-media/image/upload/v1752864754/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-sqs-queue-creation-video-processing.jpg)

5.  After queue creation, subscribe the queue to the SNS topic. Click "Subscribe to Amazon SNS topic," select the _video-uploaded_ topic, and hit "Save."

![The image shows an Amazon Web Services (AWS) console page for an SQS queue named "video-processing," displaying details such as the queue type, ARN, and encryption settings. It also includes options for SNS subscriptions and other configurations.](https://kodekloud.com/kk-media/image/upload/v1752864755/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-sqs-video-processing-console.jpg)

### Thumbnail Processing Queue

1.  Create another Standard queue and name it _thumbnail-processing_.
2.  Use the default settings and subscribe this queue to the _video-uploaded_ SNS topic.

![The image shows an Amazon Web Services (AWS) console screen where a user is subscribing to an Amazon SNS topic, with an ARN specified and options to save or cancel.](https://kodekloud.com/kk-media/image/upload/v1752864756/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-console-sns-topic-subscription.jpg)

At this point, any message published to the SNS topic is delivered to both queues. Each queue holds the incoming messages until the respective Lambda functions process them.

---

## Step 3: Testing SNS and SQS Integration

1.  Navigate to the SNS console and select the _video-uploaded_ topic.
2.  Click "Publish message" and enter the message body. The message can be structured in plain text or JSON. For example, a JSON message might look like this:

```
{
  "bucket": "raw-videos-kodekloud",
  "key": "b415c94e-de85-4f6a-949c-2eb2e293bf30"
}
```

![The image shows an AWS console interface where a user is configuring a message body for a delivery protocol, with options for identical or custom payloads. The message body section is open, displaying a JSON structure.](https://kodekloud.com/kk-media/image/upload/v1752864757/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-console-message-body-json.jpg)

3.  After publishing the message, refresh the SQS console to verify that the message appears in both queues. If no consumer (Lambda or EC2) is configured, the messages remain in the queues.
4.  Publish another message with different details to see the message count increment.

![The image shows an Amazon SNS (Simple Notification Service) console screen with a message successfully published to the "video-uploaded" topic. It includes details like the topic's ARN and subscription information.](https://kodekloud.com/kk-media/image/upload/v1752864758/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/amazon-sns-console-video-uploaded.jpg)

---

## Step 4: Configuring Lambda Functions

### Video Processing Lambda Function

1.  Sign in to the Lambda console and click "Create function." Select "Author from scratch."
2.  Set the function name as _video-processing_, choose the appropriate runtime (e.g., Node.js 18.x), and assign a role with SQS and S3 permissions. You may create a new role (e.g., _Lambda_SQS_S3_) and attach additional policies (such as S3 Full Access) via the IAM console.

![The image shows the AWS Lambda console where a user is creating a new function. It includes options for authoring from scratch, using a blueprint, or a container image, and fields for entering the function name, runtime, architecture, and permissions.](https://kodekloud.com/kk-media/image/upload/v1752864759/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-lambda-console-new-function.jpg)

3.  Once the Lambda function is created, add an SQS trigger by selecting the _video-processing_ queue. Configure the batch size (for example, 1 for individual processing or a higher number for batching) and set the appropriate batch window.

![The image shows an AWS Lambda configuration screen for setting up an SQS queue trigger. It includes options for batch size, batch window, maximum concurrency, and filter criteria.](https://kodekloud.com/kk-media/image/upload/v1752864761/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-lambda-sqs-trigger-configuration.jpg)

4.  Update the function code to process the event. The sample code below logs the event and extracts the message from the first record:

```
export const handler = async (event) => {
    console.log("Received event:", event);
    // Extract and parse the message from the SQS event
    const body = JSON.parse(event.Records[0].body);
    const message = JSON.parse(body.Message);
    console.log("Message details:", message);


    // Processing logic (e.g., retrieving the video from S3, converting it, and uploading) goes here.
    const response = {
        statusCode: 200,
        body: JSON.stringify("Hello from Lambda!"),
    };
    return response;
};
```

![The image shows the AWS Lambda console with a function named "video-processing." It includes options to add triggers and destinations and a code editor with a basic JavaScript function.](https://kodekloud.com/kk-media/image/upload/v1752864762/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-lambda-video-processing-console.jpg)

After deploying the function, check the SQS queue’s message count. A reduction indicates that the Lambda function is processing messages. You can also review CloudWatch logs for detailed execution information.

### Thumbnail Processing Lambda Function

1.  Create another Lambda function named _thumbnail-processing_ using the same steps as above. Use the same role (e.g., _Lambda_SQS_S3_) because this function also requires SQS and S3 access.
2.  Add an SQS trigger for the _thumbnail-processing_ queue and configure the batch settings.
3.  Implement the code to handle thumbnail generation, then deploy the function.

![The image shows the AWS Lambda console where a function named "thumbnail-processing" is being created. The runtime is set to Node.js 18.x, and the architecture is selected as x86_64.](https://kodekloud.com/kk-media/image/upload/v1752864762/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-lambda-thumbnail-processing-nodejs.jpg)

![The image shows an AWS Lambda interface where a user is adding a trigger, specifically selecting "SQS" as the source for batch/bulk data processing.](https://kodekloud.com/kk-media/image/upload/v1752864763/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-lambda-sqs-trigger-interface.jpg)

![The image shows an AWS Lambda configuration screen with options for setting batch size, batch window, maximum concurrency, and filter criteria for processing events.](https://kodekloud.com/kk-media/image/upload/v1752864764/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-lambda-configuration-screen.jpg)

---

## Step 5: Configuring S3 Event Notifications

Automate the workflow by configuring your S3 bucket (storing raw videos) to trigger an event notification to the SNS topic each time a video is uploaded:

1.  Open the S3 console and select the raw videos bucket (e.g., _raw-videos-kodekloud_).
2.  Under the "Properties" tab, scroll down to "Event notifications" and create a new notification.
3.  Set an event name (e.g., _video-uploaded_). Optionally, specify a prefix (files are assumed to be uploaded to the root for this demonstration).
4.  Under "Event types," select the object creation events (PUT, POST, COPY, etc.).
5.  For the destination, select SNS and choose the _video-uploaded_ topic.

![The image shows an Amazon S3 Management Console with a list of buckets, their regions, access settings, and creation dates. A green notification bar indicates a bucket was successfully created.](https://kodekloud.com/kk-media/image/upload/v1752864766/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-s3-management-console-buckets.jpg)

![The image shows an Amazon S3 interface for creating an event notification, with fields for event name, prefix, and suffix, and options for selecting event types related to object creation.](https://kodekloud.com/kk-media/image/upload/v1752864767/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/amazon-s3-event-notification-interface.jpg)

> **Important:**  
> Before S3 can publish notifications to SNS, update the SNS topic's access policy to allow the Amazon S3 service to publish messages. For example, add the following policy statement to your SNS topic (replace placeholders with actual values):
>
> ```
> {
>   "Sid": "ExampleSNSPublishPolicy",
>   "Effect": "Allow",
>   "Principal": {
>     "Service": "s3.amazonaws.com"
>   },
>   "Action": "sns:Publish",
>   "Resource": "arn:aws:sns:us-east-1:841860927337:video-uploaded",
>   "Condition": {
>     "ArnLike": {
>       "aws:SourceArn": "arn:aws:s3:::raw-videos-kodekloud"
>     },
>     "StringEquals": {
>       "aws:SourceAccount": "841860927337"
>     }
>   }
> }
> ```
>
> To update the SNS topic policy:
>
> 1.  Open the SNS topic configuration page.
> 2.  Click "Edit" next to Access Policy.
> 3.  Add the above JSON statement to the existing policy and save your changes.

![The image shows an AWS SNS (Simple Notification Service) console page where a topic named "video-uploaded" is being configured. It includes options for encryption, access policy, data protection policy, and delivery policy.](https://kodekloud.com/kk-media/image/upload/v1752864768/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-sns-video-uploaded-config.jpg)

Finally, save the event notification within the S3 console.

![The image shows an Amazon S3 console screen for creating an event notification, with fields for event name, prefix, suffix, and event types related to object creation.](https://kodekloud.com/kk-media/image/upload/v1752864769/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/amazon-s3-event-notification-console.jpg)

---

## Step 6: Testing and Verification

1.  **Send Test Messages:**  
    Publish a test message via the SNS console and verify that both SQS queues receive it.
2.  **Upload a Video File:**  
    Upload a short video file to the raw videos bucket. This triggers an SNS notification which, in turn, invokes the linked Lambda functions.
3.  **Verify Outputs:**
    - Check the processed videos bucket for the converted video files (e.g., an .m3u8 file along with corresponding .ts chunk files).
    - Review the thumbnails bucket to ensure the thumbnail images have been generated appropriately.

![The image shows an Amazon S3 bucket interface with three files listed: "output.m3u8," "output0.ts," and "output1.ts," along with their details like type, last modified date, size, and storage class.](https://kodekloud.com/kk-media/image/upload/v1752864770/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/amazon-s3-bucket-files-interface.jpg)

![The image shows an Amazon S3 bucket interface with three files listed: "output.m3u8," "output0.ts," and "output1.ts," along with their details such as type, last modified date, size, and storage class.](https://kodekloud.com/kk-media/image/upload/v1752864772/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/amazon-s3-bucket-interface-files.jpg)

![The image shows an AWS CloudWatch console displaying log entries related to a Lambda function execution, including details about a notification message and event source.](https://kodekloud.com/kk-media/image/upload/v1752864773/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-cloudwatch-lambda-logs-console.jpg)

---

## Cleanup

After verifying the configuration, it is important to clean up resources to avoid incurring unnecessary charges:

1.  **Delete SQS Queues:**  
    In the SQS console, delete both the _video-processing_ and _thumbnail-processing_ queues.

![The image shows an AWS SQS console with two queues named "thumbnail-processing" and "video-processing," both of which are of the standard type and have no messages available or in flight.](https://kodekloud.com/kk-media/image/upload/v1752864774/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-sqs-console-thumbnail-video-queues-2.jpg)

2.  **Delete the SNS Topic:**  
    Open the SNS console and delete the _video-uploaded_ topic.

![The image shows an Amazon SNS (Simple Notification Service) dashboard with details of a topic named "video-uploaded," including its ARN and type. There are options to edit, delete, or publish a message related to this topic.](https://kodekloud.com/kk-media/image/upload/v1752864775/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/amazon-sns-video-uploaded-dashboard.jpg)

3.  **Remove Lambda Functions:**  
    Delete both Lambda functions (_video-processing_ and _thumbnail-processing_).
4.  **Delete S3 Buckets:**  
    Empty the raw videos, processed videos, and thumbnails buckets and then delete them.

![The image shows an AWS S3 Management Console with a list of five buckets, displaying their names, regions, access permissions, and creation dates.](https://kodekloud.com/kk-media/image/upload/v1752864777/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNSSQS-Demo/aws-s3-management-console-buckets-2.jpg)

---

This demonstration has shown how to integrate SNS with SQS and Lambda for automated video processing and thumbnail generation. Leveraging AWS services enables efficient and scalable event-driven processing for video applications.

Happy Learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a5c60f6-2d46-4dfe-a2e2-66c7eae45a70/lesson/13f0d7fa-a75c-4d47-bca9-253ebc3c4139)**
>
> Watch video content
