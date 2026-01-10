# SQS Dead Letter Queue Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Application-Integrations/SQS-Dead-Letter-Queue-Demo)

---

## Table of Contents

- SQS Dead Letter Queue Demo
  - Creating the Dead-Letter Queue
  - Linking the DLQ to Your Source Queue
  - Testing the DLQ Configuration
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified Developer - Associate

Application Integrations

# SQS Dead Letter Queue Demo

In this article, we demonstrate how to configure a dead-letter queue (DLQ) for your Amazon SQS queue. A DLQ collects messages that fail to be processed successfully after a specified number of attempts, allowing for further analysis and troubleshooting of processing issues.

## Creating the Dead-Letter Queue

Begin by creating a new queue that will serve as the DLQ. It’s important that the DLQ type matches the type of the primary queue that sends messages to it. For example, if your primary queue is standard, the DLQ must also be standard. In our demo, we name the DLQ "new user dead letter queue."

![The image shows the Amazon SQS (Simple Queue Service) interface for creating a new queue, with options for selecting queue type, naming, and configuring settings like visibility timeout and message retention period.](https://kodekloud.com/kk-media/image/upload/v1752858414/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Dead-Letter-Queue-Demo/amazon-sqs-create-queue-interface.jpg)

When setting up your DLQ, pay attention to the following configuration options:

1.  **Message Retention:** Configure your DLQ with an extended retention period. This ensures that messages remain available for troubleshooting if errors occur.
2.  **Visibility Timeout:** This is the duration for which a message remains invisible to other consumers after being retrieved. In our example, the DLQ’s visibility timeout is set to three seconds. Each visibility timeout cycle counts as one processing attempt. With a maximum receive count of three, a message will be moved to the DLQ after approximately nine seconds (3 seconds × 3 attempts). Adjusting these values will affect the delay before a problematic message is transferred.

> [!important]
> **Tip**
>
> For production environments, consider configuring longer message retention and visibility timeout settings based on your processing needs to allow ample time for error analysis.

After adjusting these settings, proceed to create the queue.

![The image shows the Amazon SQS (Simple Queue Service) interface for creating a new queue, with configuration options for visibility timeout, message retention, delivery delay, and encryption settings.](https://kodekloud.com/kk-media/image/upload/v1752858415/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Dead-Letter-Queue-Demo/amazon-sqs-create-queue-interface-2.jpg)

## Linking the DLQ to Your Source Queue

Once the DLQ is created, return to your original source queue and edit its configuration to enable the dead-letter queue feature. Scroll down to the "Dead letter queue" section, select "Enabled," and then choose the ARN of the DLQ you have created.

The critical parameter here is the **Maximum Receives** value—the number of times a message can be retrieved and fail processing before being rerouted to the DLQ. In this example, the maximum receives is set to three.

![The image shows an Amazon SQS (Simple Queue Service) configuration screen, where options for "Redrive allow policy" and "Dead-letter queue" are being set, with fields for enabling these features and specifying queue details.](https://kodekloud.com/kk-media/image/upload/v1752858416/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Dead-Letter-Queue-Demo/amazon-sqs-redrive-dead-letter-config.jpg)

## Testing the DLQ Configuration

After saving your settings, it’s time to test the configuration. Follow these steps:

1.  Navigate to the "Send and receive messages" section for the original queue.
2.  Send a test message. This message will be moved to the DLQ after reaching the maximum receive count.
3.  Poll the queue to retrieve the message. With each poll, observe the "Receive Count":
    - After the first poll, the count will be one.
    - Following the first visibility timeout cycle, it increments to two.
    - Upon the third cycle (receive count of three), the message is removed from the primary queue and moved to the DLQ.

![The image shows an Amazon SQS (Simple Queue Service) dashboard with details of a queue named "newUser," including its type, URL, and dead-letter queue settings.](https://kodekloud.com/kk-media/image/upload/v1752858418/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Dead-Letter-Queue-Demo/amazon-sqs-newuser-dashboard.jpg)

Next, verify that the message has been successfully transferred by checking the DLQ’s "Send and receive messages" section.

![The image shows an Amazon SQS interface where a message has been sent and is ready to be received. It includes details about the message body, delivery delay, and message attributes, along with options for receiving messages.](https://kodekloud.com/kk-media/image/upload/v1752858420/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Dead-Letter-Queue-Demo/amazon-sqs-message-interface.jpg)

## Conclusion

By following these steps, you ensure that any messages that cannot be processed are redirected to your DLQ, simplifying troubleshooting and improving the resilience of your messaging system. This setup is essential for identifying and resolving issues in environments where message processing is critical.

Transcribed by [otter.ai](https://otter.ai)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/60c267ab-da8b-4408-97f4-b53aad3f4479/lesson/e9a00c87-8988-4017-a1be-e725b7d2fa13)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/60c267ab-da8b-4408-97f4-b53aad3f4479/lesson/32bec306-bdc7-4819-a62c-8c4468f090ec)**
>
> Practice lab
