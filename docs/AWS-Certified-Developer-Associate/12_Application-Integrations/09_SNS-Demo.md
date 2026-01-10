# SNS Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Application-Integrations/SNS-Demo)

---

## Table of Contents

- SNS Demo
  - Creating an SNS Topic
  - Configuring Subscriptions
  - Publishing a Message
  - Verifying in SQS
  - Examining the SQS Message Structure
  - Conclusion
  - Watch Video
  - Practice Lab
    - Creating a Subscription
    - Updating SQS Access Policy

---

## Content

AWS Certified Developer - Associate

Application Integrations

# SNS Demo

In this guide, we demonstrate how to use Amazon Simple Notification Service (SNS) to publish messages and integrate with other AWS services, such as Amazon SQS. This tutorial is ideal for developers looking to build scalable, loosely coupled architectures where multiple backend services communicate through pub/sub messaging.

## Creating an SNS Topic

Navigate to the SNS page and click "Create Topic" to start. For this demonstration, name your topic **createJob**. Imagine a backend system where every new job results in a message published to an SNS topic. Other backend services can subscribe to this topic to pick up messages and process them as needed.

![The image shows the Amazon Simple Notification Service (SNS) page on AWS, highlighting its features for pub/sub messaging in microservices and serverless applications, with options to create a topic and view pricing.](https://kodekloud.com/kk-media/image/upload/v1752858394/notes-assets/images/AWS-Certified-Developer-Associate-SNS-Demo/amazon-sns-pub-sub-messaging.jpg)

After entering the topic name, click **Next** to choose between a Standard or FIFO topic. This decision depends on your specific use case. You also have the option to enable encryption and configure various access policies. While additional settings such as data protection and delivery policy exist, we focus only on the essentials here. Finally, click **Create** to finalize the topic creation.

## Configuring Subscriptions

With your topic created, it's time to set up the endpoints that will subscribe to it. Each time a message is published, all subscribed endpoints will receive a notification.

![The image shows an Amazon SNS (Simple Notification Service) console screen with a topic named "createJob" successfully created, displaying its details and options for managing subscriptions and policies.](https://kodekloud.com/kk-media/image/upload/v1752858395/notes-assets/images/AWS-Certified-Developer-Associate-SNS-Demo/amazon-sns-createjob-console-screen.jpg)

### Creating a Subscription

1.  Select the **createJob** topic.
2.  Choose one of the available protocols (email, SMS, SQS, Lambda, or Kinesis Data Firehose) for your subscription.

    For this demo, we'll subscribe an SQS queue named **processJob**.

![The image shows an Amazon SNS (Simple Notification Service) subscription details page, indicating a confirmed subscription with specific ARN and endpoint information.](https://kodekloud.com/kk-media/image/upload/v1752858397/notes-assets/images/AWS-Certified-Developer-Associate-SNS-Demo/amazon-sns-subscription-details.jpg)

## Publishing a Message

Once the subscription is set up, return to the topic and click on **Publish a message**. In the message body, you might write a simple message such as:

```
# Example message content
new job
```

This message indicates a new job submission. After entering your message (and optionally adding extra attributes), click **Publish**.

## Verifying in SQS

To confirm that messages flow correctly, check the **processJob** SQS queue by navigating to the "Send and receive messages" section and polling for messages.

![The image shows an Amazon SQS interface for sending and receiving messages from a queue, with options to enter a message body, set a delivery delay, and poll for messages.](https://kodekloud.com/kk-media/image/upload/v1752858398/notes-assets/images/AWS-Certified-Developer-Associate-SNS-Demo/amazon-sqs-message-interface.jpg)

> [!important]
> **Tip**
>
> If no messages are visible in your SQS queue, it may be due to insufficient permissions allowing SNS to send messages to SQS.

### Updating SQS Access Policy

SNS might be publishing messages correctly, but the SQS queue requires the proper permissions to accept these messages. To resolve this, update your SQS access policy. Below is an example of an SQS policy that grants SNS permission to send messages. **Make sure to adjust the ARNs for both the SQS queue and SNS topic to suit your environment.**

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "sqs:SendMessage",
        "sqs:ReceiveMessage",
        "sqs:DeleteMessage"
      ],
      "Resource": "arn:aws:sqs:us-east-1:841869297337:processJob",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "arn:aws:sns:us-east-1:841869297337:createJob"
        }
      }
    }
  ]
}
```

After updating the policy, publish another message to your SNS topic using more detailed content (for example, "job details: ..."). Then, return to the SQS console and use the **Send and receive messages** function to poll for messages. You should now see the message delivered to the queue.

![The image shows an Amazon SNS interface where a message has been successfully published to a topic. It includes fields for message details like subject and message structure options.](https://kodekloud.com/kk-media/image/upload/v1752858399/notes-assets/images/AWS-Certified-Developer-Associate-SNS-Demo/amazon-sns-message-published-interface.jpg)

![The image shows an AWS SQS (Simple Queue Service) interface where users can send and receive messages from a queue. It includes fields for entering a message, setting a delivery delay, and options for receiving messages.](https://kodekloud.com/kk-media/image/upload/v1752858400/notes-assets/images/AWS-Certified-Developer-Associate-SNS-Demo/aws-sqs-interface-message-queue.jpg)

## Examining the SQS Message Structure

When a message is delivered to SQS, it is structured in a JSON format. A portion of the message may look like the following:

```
{
  "Type": "Notification",
  "MessageId": "43d4b488-c180-834a-ea1f078528e6",
  "TopicArn": "arn:aws:sns:us-east-1:848186092733:createjob"
}
```

Additional details, such as the subject, content, timestamp, and signature, might be included:

```
{
  "Message": "job details: ...",
  "Timestamp": "2024-04-16T00:21:44.791Z",
  "SignatureVersion": "1"
}
```

## Conclusion

This demonstration shows how to set up Amazon SNS and integrate it with SQS to achieve efficient message-based communication between services. By configuring the correct permissions and subscriptions, you enable scalable and robust architectures where multiple endpoints—whether email, Lambda functions, SQS queues, or others—can consume messages published to an SNS topic.

For more information, visit the [AWS SNS Documentation](https://aws.amazon.com/sns/) and explore further integrations to match your application needs.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/60c267ab-da8b-4408-97f4-b53aad3f4479/lesson/d356452a-bf4d-467f-8aab-fa594559c358)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/60c267ab-da8b-4408-97f4-b53aad3f4479/lesson/fefdfa9f-ba9a-4b5f-bf1d-9f0e4a32ec7c)**
>
> Practice lab
