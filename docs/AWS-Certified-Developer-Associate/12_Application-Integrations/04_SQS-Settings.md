# SQS Settings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Application-Integrations/SQS-Settings)

---

## Table of Contents

- SQS Settings
  - SQS Visibility Timeout
  - Delay Queue
  - Short Polling vs. Long Polling
  - Key AWS SQS APIs
  - Summary
  - Watch Video
    - Short Polling
    - Long Polling

---

## Content

AWS Certified Developer - Associate

Application Integrations

# SQS Settings

In this article, we explore key AWS SQS settings and parameters that enable you to fine-tune your queue behavior for optimal message processing and cost efficiency.

## SQS Visibility Timeout

When a consumer (for example, a Lambda function) polls an SQS queue, the queue returns an available message and initiates the visibility timeout. During this timeout period, the message remains hidden from other consumers, ensuring that it is processed without interference.

By default, the visibility timeout is set to 30 seconds. If your message processing routinely takes longer—say, about two minutes—it's best to configure the timeout to accommodate that extra time. If additional time is required during processing, the consumer can call the Change Message Visibility API to extend the timeout and keep the message hidden.

![The image illustrates the concept of SQS Visibility Timeout, showing a timeline with multiple "ReceiveMessage Request" events and indicating when messages are returned or not returned during the visibility timeout period.](https://kodekloud.com/kk-media/image/upload/v1752858433/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Settings/sqs-visibility-timeout-timeline-diagram.jpg)

This diagram emphasizes that once a consumer pulls a message from the SQS queue, the message remains hidden from other consumers for the duration of the configured timeout.

![The image explains the concept of SQS Visibility Timeout, detailing how it prevents other consumers from seeing a message for a set duration, with a default of 30 seconds, and the need to adjust it based on processing time.](https://kodekloud.com/kk-media/image/upload/v1752858435/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Settings/sqs-visibility-timeout-explanation.jpg)

> [!important]
> **Tip**
>
> Consider aligning the visibility timeout with the average processing time of your messages to reduce the risk of duplicate processing.

## Delay Queue

A delay queue allows you to postpone the delivery of messages. When a producer sends a message, you can specify a delay during which the message remains invisible to consumers. Although the default delay is zero seconds, it can be increased up to 15 minutes. The delay can be set at the queue level, and producers have the option to override this setting using the DelaySeconds parameter.

![The image illustrates an SQS delay queue process, showing a message flow from a producer to a queue, where it is delayed for a specified time, before reaching the consumer.](https://kodekloud.com/kk-media/image/upload/v1752858437/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Settings/sqs-delay-queue-message-flow.jpg)

![The image is a slide about SQS Delay Queue, explaining that the delay message defaults to 0 seconds but can be increased to 15 minutes, can be configured at the queue level, and publishers can override the default delay using the DelaySeconds parameter.](https://kodekloud.com/kk-media/image/upload/v1752858438/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Settings/sqs-delay-queue-message-settings.jpg)

> [!important]
> **Remember**
>
> Adjust the delay queue settings to ensure that messages are delivered only when your system is ready to process them.

## Short Polling vs. Long Polling

SQS uses a pull-based model for retrieving messages, with two primary methods: short polling and long polling.

### Short Polling

In short polling, the consumer sends a request to the SQS queue and immediately receives any available messages. If there are no messages, the response is empty, and the consumer must continually poll until a message becomes available. This method often results in many empty responses, leading to increased costs and inefficiencies.

![The image illustrates a short polling process involving AWS Lambda functions and a central service, showing multiple empty responses before a message is published.](https://kodekloud.com/kk-media/image/upload/v1752858440/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Settings/aws-lambda-short-polling-process.jpg)

### Long Polling

Long polling addresses the inefficiencies of short polling by keeping the connection open for up to 20 seconds. If a new message arrives during this window, it is immediately delivered over the open connection. This reduces the number of empty responses, lowers polling costs, decreases network traffic, and improves overall throughput. Long polling can be enabled at the queue level using the ReceiveMessageWaitTimeSeconds parameter.

![The image illustrates a long polling process involving two Lambda functions and a central service, with connections labeled "Keep connection open" and "Publish."](https://kodekloud.com/kk-media/image/upload/v1752858441/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Settings/long-polling-lambda-functions-diagram.jpg)

![The image is a slide about SQS long polling, stating it can be configured up to 20 seconds and enabled at the queue level or via the `ReceiveMessageWaitTimeSeconds` API.](https://kodekloud.com/kk-media/image/upload/v1752858442/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Settings/sqs-long-polling-configuration-slide.jpg)

The benefits of long polling over short polling include:

- Reduced empty responses
- Lower polling costs
- Efficient message retrieval
- Decreased network traffic
- Improved scalability and throughput
- Simplified code logic

![The image lists six advantages of long polling over short polling, including reduced empty responses, reduced polling costs, efficient message retrieval, decreased network traffic, scalability and improved throughput, and simplified code logic.](https://kodekloud.com/kk-media/image/upload/v1752858443/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Settings/long-polling-advantages-list.jpg)

> [!important]
> **Optimization Advice**
>
> When designing your SQS-based system, enable long polling to improve performance and reduce operational costs.

## Key AWS SQS APIs

For AWS certification and effective queue management, it is essential to understand the following SQS APIs:

| API Name       | Description                                                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CreateQueue    | Creates a new SQS queue.                                                                                                                                                                     |
| SendMessage    | Sends a message to the queue.                                                                                                                                                                |
| ReceiveMessage | Retrieves one or more messages from the queue. It supports parameters like ReceiveMessageWaitTimeSeconds to enable long polling and limits the maximum number of messages retrieved at once. |
| DeleteMessage  | Deletes a specific message from the queue once it has been processed.                                                                                                                        |
| PurgeQueue     | Clears all messages from the queue when required.                                                                                                                                            |

> [!important]
> **Ensure Correct Usage**
>
> Always verify that your API usage conforms to AWS best practices to avoid issues such as duplicate message processing or unnecessary costs.

## Summary

Effective management and configuration of AWS SQS settings are vital to achieving efficient message processing and cost optimization. Remember:

- The visibility timeout ensures that a message remains hidden during processing.
- The delay queue allows you to postpone the delivery of messages based on your system’s readiness.
- Long polling minimizes empty responses and reduces the number of API calls, which enhances efficiency and lowers costs.

![The image is a summary slide with four key points about message processing, visibility timeout, delay queues, and long polling in a queue system.](https://kodekloud.com/kk-media/image/upload/v1752858444/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Settings/message-processing-queue-summary.jpg)

By understanding and properly configuring these SQS settings, you can optimize system performance and manage costs effectively. For more in-depth information on AWS queues, consider exploring the [AWS Documentation](https://aws.amazon.com/documentation/sqs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/60c267ab-da8b-4408-97f4-b53aad3f4479/lesson/acf540c1-cc80-46ab-a438-4b70e283d884)**
>
> Watch video content
