# SNS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Application-Integration/SNS)

---

## Table of Contents

- SNS
  - Key Components of SNS
  - Types of Topics
  - Additional Considerations
  - Common Use Cases for SNS
  - Watch Video
    - Topics
    - Subscribers
    - Publishers
    - Messages
    - Standard Topics
    - FIFO Topics

---

## Content

AWS Solutions Architect Associate Certification

Services Application Integration

# SNS

In this lesson, we explore AWS SNS (Amazon Simple Notification Service) and its role in enabling real-time communication for applications built with distributed architectures. When working in environments with multiple services, backend endpoints, and clients that need to interact, ensuring efficient real-time communication may be challenging. SNS simplifies this process by acting as a managed messaging service that delivers notifications from publishers to subscribers reliably and at scale.

![The image is a diagram explaining the need for Amazon Simple Notification Service (SNS) within AWS Cloud, showing its integration with Lambda, EC2, and EKS, and its ability to send notifications to millions of devices. It highlights SNS as efficient, reliable, and scalable.](https://kodekloud.com/kk-media/image/upload/v1752864744/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNS/amazon-sns-architecture-diagram.jpg)

## Key Components of SNS

Understanding the components of SNS helps in designing a solution that is scalable, resilient, and easy to maintain.

### Topics

A topic is a communication channel where publishers send messages and subscribers receive them. Topics serve as the central hub for transmitting notifications across your application. For example, you could create a "New User" topic where different services subscribe to receive user registration events. When a new user registers, details like the username and email are published to the topic, triggering processes such as sending a confirmation email, updating logs, or initiating other workflows.

### Subscribers

Subscribers receive the messages published to topics. They can be configured as:

- SQS queues
- Lambda functions
- HTTP endpoints
- Email endpoints

Once a subscriber is configured, every message published to the related topic is delivered immediately, allowing each component to process the information accordingly.

### Publishers

Publishers are the entities responsible for sending messages to a topic. They typically utilize various data formats (e.g., JSON or plain text) and can be any application using the AWS SDK, running on EC2, Lambda, or other environments. For instance, during user registration, the application handling the HTTP POST request publishes the new user's details to the "New User" topic.

### Messages

Messages are the units of data transmitted via SNS that include notifications, alerts, or updates. Their structure can be adjusted based on the subscribers' needs, ensuring each component receives information in the appropriate format.

![The image is a diagram illustrating the components of Amazon SNS (Simple Notification Service), showing the flow from publishers like Lambda Function, Amazon EC2, and Amazon EKS to subscribers via Amazon SQS, Lambda Function, and other endpoints.](https://kodekloud.com/kk-media/image/upload/v1752864746/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNS/amazon-sns-components-diagram.jpg)

## Types of Topics

SNS supports two primary types of topics: Standard and FIFO (First-In-First-Out).

### Standard Topics

Standard topics deliver messages on a best-effort basis. This means that while messages are not guaranteed to be received in the exact order sent, the throughput is nearly unlimited. Standard topics are ideal for high-volume use cases where perfect ordering is not critical and occasional duplicate messages are tolerable.

![The image illustrates the concept of an SNS (Simple Notification Service) Standard Topic, showing a sequence of messages and highlighting advantages like best-effort ordering and maximum throughput. It also depicts various application/subscriber icons.](https://kodekloud.com/kk-media/image/upload/v1752864747/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNS/sns-standard-topic-messages-diagram.jpg)

### FIFO Topics

FIFO topics ensure strict message ordering and eliminate duplicate message delivery. These topics are essential in scenarios where the sequence of operations is critical, such as transaction logging, stock monitoring, flight tracking, inventory management, or price updates. However, FIFO topics support up to 300 messages per second or 10 megabytes per second per topic, which is lower compared to standard topics.

![The image illustrates the concept of SNS FIFO (First-In-First-Out) Topic, showing a sequence of messages and its advantages, including strict ordering and a capacity of 300 messages per second or 10 MB per second. It also depicts various application/subscriber icons.](https://kodekloud.com/kk-media/image/upload/v1752864748/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNS/sns-fifo-topic-messages-diagram.jpg)

## Additional Considerations

When integrating SNS into your application, keep these best practices in mind:

1.  You can publish one or two messages per API request. If many events occur in a short time span, consider batching messages together (for example, waiting until 10 users have registered) to optimize costs.
2.  Each message supports up to 256 KB of data. For larger payloads, utilize the extended client library to store the payload in an S3 bucket and send a reference to the data via SNS.

> [!important]
> **Tip**
>
> Consider batching events when possible to reduce operational costs and improve system performance.

![The image provides tips and tricks for SNS, highlighting sending 1-10 messages per API request, batching to save costs, and handling 256 KB data or 2 GB S3 links.](https://kodekloud.com/kk-media/image/upload/v1752864749/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNS/sns-tips-tricks-api-batching.jpg)

## Common Use Cases for SNS

SNS is versatile and applies to a variety of use cases, including:

- **Secure Notifications:** Leverage AWS KMS to encrypt messages, ensuring secure communication. Use resource policies and tags in conjunction with AWS PrivateLink for fine-grained access control.
- **Event Fan-Out:** Seamlessly distribute events from over 60 AWS services to multiple endpoints, allowing coordinated automated responses across your system.
- **SMS Notifications:** Send text messages globally, reaching customers in over 240 countries for time-sensitive alerts.

> [!important]
> **Additional Resource**
>
> For more in-depth details on AWS SNS, refer to the [AWS SNS Documentation](https://aws.amazon.com/sns/).

![The image shows two use cases for SNS: securely encrypting notification message delivery and capturing and fanning out events from over 60 AWS services.](https://kodekloud.com/kk-media/image/upload/v1752864750/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SNS/sns-use-cases-encryption-events.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a5c60f6-2d46-4dfe-a2e2-66c7eae45a70/lesson/0759b727-8528-45ce-962d-5d91f08fca29)**
>
> Watch video content
