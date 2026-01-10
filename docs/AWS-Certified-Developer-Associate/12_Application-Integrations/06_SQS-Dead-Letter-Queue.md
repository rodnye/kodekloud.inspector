# SQS Dead Letter Queue - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Application-Integrations/SQS-Dead-Letter-Queue)

---

## Table of Contents

- SQS Dead Letter Queue
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Application Integrations

# SQS Dead Letter Queue

In this lesson, we explore the concept of the SQS dead letter queue and its role in message processing workflows. Understanding how messages are retried and eventually moved to a dead letter queue can help streamline troubleshooting and improve system reliability.

Imagine you have an SQS queue paired with a consumer—such as a Lambda function or any other processing application. The consumer retrieves messages from the queue and attempts to process them. When the processing fails, the message is returned to the queue, where it may be retried by the same consumer or a different one.

Each failed attempt increases the receive count of the message. The maximum number of retries is determined by the receive threshold you configure. For example, if you set the threshold to three, the message can be processed (and potentially fail) three times. Once this threshold is reached, Amazon SQS automatically moves the message to a dead letter queue, allowing developers to inspect and troubleshoot the issue without affecting the primary message flow.

![The image is a flowchart illustrating a dead letter queue process, showing a message retry mechanism with a maximum receive threshold and eventual sending to a dead queue if retries fail.](https://kodekloud.com/kk-media/image/upload/v1752858422/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Dead-Letter-Queue/dead-letter-queue-flowchart.jpg)

> [!important]
> **Processing and Troubleshooting**
>
> Administrators or developers can later examine the messages in the dead letter queue to diagnose and resolve issues. Once the problem is fixed, the original message can be reintroduced into the main queue for reprocessing, leading to a higher likelihood of successful execution.

It is crucial to note that the dead letter queue must be of the same type as the main SQS queue:

- If the main queue is FIFO (First-In-First-Out), the dead letter queue must also be FIFO.
- If the main queue is a standard queue, then the dead letter queue should also be a standard queue.

The dead letter queue is essentially another SQS queue that you provision with the necessary settings. When configuring your main queue, simply specify that messages failing to process should be redirected to the designated dead letter queue. Additionally, configure an appropriate message retention period—typically up to a maximum of 14 days—to allow ample time for troubleshooting.

![The image provides information about SQS Dead Letter Queues, explaining that they must be the same type as the main queue, need provisioning like any other queue, and have a retention period of up to 14 days.](https://kodekloud.com/kk-media/image/upload/v1752858423/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Dead-Letter-Queue/sqs-dead-letter-queues-info.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/60c267ab-da8b-4408-97f4-b53aad3f4479/lesson/8855d622-1cdf-4a41-a10d-5a18da29795a)**
>
> Watch video content
