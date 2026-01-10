# Exam TIps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Application-Integrations/Exam-TIps)

---

## Table of Contents

- Exam TIps
  - Amazon Simple Queue Service (SQS)
  - Amazon Simple Notification Service (SNS)
  - Amazon EventBridge
  - AWS Step Functions
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Application Integrations

# Exam TIps

In this guide, we cover crucial AWS services and best practices that are essential for the AWS Developer Associate exam. We start with Amazon Simple Queue Service (SQS), then move through Amazon Simple Notification Service (SNS), Amazon EventBridge, and finally AWS Step Functions.

---

## Amazon Simple Queue Service (SQS)

Amazon SQS is a fully managed message queuing service designed for decoupling microservices, distributed systems, and serverless applications. It enables producers to send messages to a queue and consumers to process them asynchronously. Key parameters of SQS include:

- **Message Size:** Maximum message size is 256 kilobytes.
- **Retention Period:** Messages can be retained for up to 14 days.

SQS offers two types of queues:

- **Standard Queues:**
  - Provide unlimited throughput and low latency.
  - Messages may be delivered out of order and duplicates can occur.

- **FIFO Queues:**
  - Guarantee that messages are processed in the exact order they are sent (first-in, first-out).
  - Ensure exactly-once processing with message deduplication, though with a limited throughput compared to Standard queues.

> [!important]
> **Note**
>
> The SQS Extended Client Library allows sending messages larger than 256 kilobytes by storing the payload in Amazon S3.

![The image provides exam tips for SQS, highlighting its features such as message size, retention period, and queue types (Standard and FIFO) with their characteristics.](/images/AWS-Certified-Developer-Associate-Exam-TIps/sqs-exam-tips-message-features.jpg)

SQS also supports the following features:

- **Encryption and Access Policies:**  
  SQS can be configured to use AWS Key Management Service (KMS) for encrypting messages, and access policies enable controlled publishing and consumption of messages.

![The image provides exam tips for SQS, mentioning the use of the SQS Extended Client Library for larger messages via S3 and configuring SQS with KMS for message encryption.](/images/AWS-Certified-Developer-Associate-Exam-TIps/sqs-exam-tips-extended-client.jpg)

- **Visibility Timeout:**  
  When a consumer retrieves a message, it becomes invisible to other consumers until the visibility timeout expires (default is 30 seconds). Adjust the timeout based on the processing time required. If needed, the consumer can use the Change Message Visibility API to extend the timeout.
- **Delay Queues:**  
  Delay queues postpone message delivery to consumers, with a configurable delay of up to 15 minutes set either at the queue level or per message by specifying a delay seconds parameter.
- **Long Polling:**  
  This feature reduces empty responses by waiting for a specified period (receive message wait timeout) before returning messages, which also helps lower polling costs.
- **Dead Letter Queues (DLQ):**  
  Configure a DLQ to handle messages that repeatedly fail processing. The DLQ should be of the same type as the main queue (e.g., FIFO for FIFO queues) and is provisioned like any other SQS queue. You can set a maximum receive threshold before a message is moved to the DLQ and control its retention period. Once issues are resolved, messages can be redriven back to the source queue.

![The image provides exam tips for SQS, focusing on visibility timeout and message processing. It includes details about default timeout settings and the ChangeMessageVisibility API.](/images/AWS-Certified-Developer-Associate-Exam-TIps/sqs-exam-tips-visibility-timeout.jpg)

![The image provides exam tips for SQS, highlighting long polling benefits and message retry configurations.](/images/AWS-Certified-Developer-Associate-Exam-TIps/sqs-exam-tips-long-polling-retry.jpg)

![The image provides exam tips for SQS, focusing on the requirements for dead letter queues (DLQ) to match the type of the main queue and the need for DLQs to be provisioned like any other queue.](/images/AWS-Certified-Developer-Associate-Exam-TIps/sqs-exam-tips-dead-letter-queues.jpg)

---

## Amazon Simple Notification Service (SNS)

Amazon SNS is a fully managed messaging service for both application-to-application (A2A) and application-to-person (A2P) communication. It enables the decoupling and scaling of microservices by allowing a single message published to an SNS topic to be delivered to multiple subscribers.

- **SNS Topics:**  
  An SNS topic acts as a communication channel. Any message published to the topic is automatically forwarded to all registered subscribers.

![The image provides exam tips about SNS, describing it as a message delivery service for publishers and subscribers, emphasizing its use for forwarding information to multiple parties, and explaining SNS topics as communication channels.](/images/AWS-Certified-Developer-Associate-Exam-TIps/sns-exam-tips-message-delivery.jpg)

---

## Amazon EventBridge

Amazon EventBridge is a serverless event bus that facilitates communication between different parts of your application architecture. It dynamically routes events to various AWS services and targets based on predefined rules.

Key features include:

- **Event Routing:**  
  EventBridge routes events to one or more targets, including AWS Lambda, SNS, SQS, and more.
- **Scheduled Events:**  
  Like cron jobs, EventBridge can trigger tasks at scheduled intervals.
- **Event Bus:**  
  The core of EventBridge is the event bus, which can be the default bus or a custom bus specified when sending events.
- **Event Schemas:**  
  EventBridge provides detailed event schemas for AWS-generated events, along with code bindings to simplify application integration.

![The image provides exam tips about AWS EventBridge, explaining its functions such as connecting application components, routing events, performing scheduled tasks, and using an event bus.](/images/AWS-Certified-Developer-Associate-Exam-TIps/aws-eventbridge-exam-tips.jpg)

---

## AWS Step Functions

AWS Step Functions allow you to design workflows to coordinate AWS services into serverless applications. This visual workflow service lets you build complex applications by orchestrating multiple functions and services. It supports several state types:

- **Pass:** Forwards input to output without processing.
- **Choice:** Implements conditional logic within the workflow.
- **Fail:** Ends execution immediately, marking the process as a failure.
- **Succeed:** Completes the execution successfully.
- **Parallel:** Executes multiple branches concurrently.
- **Map:** Iterates over a set of elements, executing defined steps for each.

Step Functions offer robust error handling through automatic retries and catch clauses. They also support callback tasks, which pause a workflow until an external process sends back a task token, making them ideal for tasks such as human approval or third-party integrations.

![The image provides exam tips for AWS Step Functions, describing various states such as Pass, Choice, Fail, Succeed, Parallel, and Map, with brief explanations of each.](/images/AWS-Certified-Developer-Associate-Exam-TIps/aws-step-functions-exam-tips.jpg)

![The image provides exam tips for step functions, explaining how to handle task failures and use callback tasks to pause workflows.](/images/AWS-Certified-Developer-Associate-Exam-TIps/exam-tips-step-functions-workflows.jpg)

---

For more detailed information and further reading, consider exploring these resources:

- [AWS Developer Tools Documentation](https://aws.amazon.com/developer/)
- [AWS SQS Documentation](https://docs.aws.amazon.com/sqs/)
- [AWS SNS Documentation](https://docs.aws.amazon.com/sns/)
- [AWS EventBridge Documentation](https://docs.aws.amazon.com/eventbridge/)
- [AWS Step Functions Documentation](https://docs.aws.amazon.com/step-functions/)

This guide is designed to help you grasp the core functionalities and best practices for each service as you prepare for the AWS Developer Associate exam. Happy studying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/60c267ab-da8b-4408-97f4-b53aad3f4479/lesson/b3b86b23-d3fa-4975-9e98-7b44ce328a49)**
>
> Watch video content
