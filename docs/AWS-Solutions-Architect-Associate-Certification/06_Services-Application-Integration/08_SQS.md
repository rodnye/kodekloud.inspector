# SQS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Application-Integration/SQS)

---

## Table of Contents

- SQS
  - Why Use SQS?
  - Advantages of Using SQS
  - SQS Components
  - Types of Queues
  - SQS Features and Benefits
  - Integrations and Use Cases
  - Watch Video
    - Standard Queues
    - FIFO Queues

---

## Content

AWS Solutions Architect Associate Certification

Services Application Integration

# SQS

In this article, we explore how AWS Simple Queue Service (SQS) helps build resilient and scalable applications by decoupling components in distributed systems.

## Why Use SQS?

Imagine an e-commerce application consisting of multiple services such as cart management, payment processing, invoicing, inventory management, labeling, dispatch, and tracking. In a tightly coupled, sequential processing model, the placement of an order requires each service to wait for the previous one to finish, leading to slow performance, backlogs, and increased operational costs.

![The image is a flowchart illustrating an e-commerce application's process from cart to labeling, highlighting issues like sequential processing, degraded performance, and high cost.](https://kodekloud.com/kk-media/image/upload/v1752864778/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SQS/ecommerce-flowchart-cart-labeling-issues.jpg)

To address these challenges, services can be decoupled using queues. Instead of directly invoking the payment service, the cart service sends a message to an SQS queue. The payment service later retrieves and processes the message at its own pace. This decoupling enhances responsiveness and prevents delays in one service from impacting the entire system.

## Advantages of Using SQS

SQS offers several key benefits:

- **Message Decoupling:** Producers send messages to a queue without needing to know the details of the consumers.
- **Load Leveling:** SQS buffers messages during traffic bursts, preventing service overload during peak demand.
- **Asynchronous Processing:** Consumers process messages as they become available, ensuring overall system responsiveness.
- **Scalable Serverless Architecture:** SQS integrates seamlessly with serverless platforms, enabling efficient event-driven workflows.

![The image illustrates four SQS solutions: Message Decoupling, Load Leveling, Asynchronous Processing, and Scalable Architecture, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752864779/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SQS/sqs-solutions-message-decoupling-icons.jpg)

## SQS Components

Understanding the core components of SQS is essential for leveraging its full potential:

1.  **Queue:** A buffer where producers send messages and from which consumers retrieve them.
2.  **Message:** The unit of communication in SQS, with a size limit of up to 256 kilobytes.
3.  **Producers:** Applications or AWS services that send messages to the SQS queue, such as an S3 event triggering a message upon a file upload.
4.  **Consumers:** Services that retrieve and process messages from the queue.
5.  **Message Attributes:** Metadata provided as name-value pairs that add context to each message.
6.  **Dead Letter Queue:** An optional queue where messages are sent after a specified number of processing failures, enabling isolation and further analysis of problematic messages.
7.  **Visibility Timeout:** The period during which a retrieved message remains hidden from other consumers to ensure it is processed by only one consumer at a time.
8.  **Message Locking:** Prevents multiple consumers from processing the same message simultaneously; should processing fail, the lock expires and the message becomes available again.

![The image illustrates the components of Amazon Simple Queue Service (SQS), showing the flow from producers to consumers, with message attributes and a dead letter queue (DLQ) highlighted.](https://kodekloud.com/kk-media/image/upload/v1752864780/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SQS/amazon-sqs-components-flow-diagram.jpg)

## Types of Queues

SQS supports two types of queues: Standard and FIFO (First-In-First-Out). Each type is designed for different application requirements.

### Standard Queues

- **Best-Effort Ordering:** Ensures that messages are delivered in a best-effort order, though the exact sequence may not be preserved.
- **At-Least-Once Delivery:** Guarantees that every message is delivered at least once, with occasional duplicates.
- **High Throughput:** Supports nearly unlimited transactions per second, ideal for applications with high throughput needs.

![The image illustrates the concept of SQS Standard Queues, showing unordered message delivery and highlighting advantages like best-effort ordering, at-least-once delivery, and maximum throughput. It also depicts various application/subscriber icons.](https://kodekloud.com/kk-media/image/upload/v1752864781/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SQS/sqs-standard-queues-concept-diagram.jpg)

### FIFO Queues

- **Exactly-Once Processing:** Each message is processed only once and remains in the queue until successfully processed and explicitly removed.
- **Preserved Order:** Delivers messages in the exact order they were sent.
- **Throughput Limits:** Supports up to 3,000 messages per second with batching (300 messages per second without batching) by default; high throughput mode can raise these limits.

![The image compares two types of SQS queues: Standard Queues and FIFO Queues, each represented by a colored card with an icon.](https://kodekloud.com/kk-media/image/upload/v1752864782/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SQS/sqs-queues-standard-fifo-comparison.jpg)

## SQS Features and Benefits

SQS comes packed with advanced features:

- **Message Retention and Re-delivery:** Configurable retention periods ensure that messages not processed successfully can be re-delivered according to a retry policy.
- **Message Prioritization:** Use message attributes or multiple queues to prioritize critical messages.
- **Dead Letter Queue:** Automatically routes messages that fail processing to a separate queue for additional evaluation.

![The image illustrates three features of SQS: Message Retention, Message Prioritization, and Dead Letter Queue (DLQ), each represented with an icon and a colored background.](https://kodekloud.com/kk-media/image/upload/v1752864783/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SQS/sqs-features-message-retention-prioritization-dlq.jpg)

> [!important]
> **Integration Highlights**
>
> AWS SQS seamlessly integrates with several AWS services including Lambda, EC2, S3, and AWS Step Functions, enabling powerful event-driven architectures.

## Integrations and Use Cases

SQS integrates with a wide range of AWS services. For example, a Lambda function can send and process messages, while S3 events can trigger message creation for further processing.

By incorporating SQS, organizations can:

- Improve application reliability by decoupling frontend interactions from lengthy backend processes.
- Decouple microservices in distributed architectures, ensuring immediate user acknowledgment while background processes handle the heavy lifting.
- Scale processing capacity dynamically with Auto Scaling groups, adjusting the number of consumers based on real-time workload.
- Ensure message order and deduplication in systems where transaction order is critical.

![The image illustrates four use cases for SQS: increasing reliability and scale, decoupling microservices and processing event-driven applications, being cost-effective and on-time, and maintaining message ordering with deduplication.](https://kodekloud.com/kk-media/image/upload/v1752864784/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-SQS/sqs-use-cases-reliability-scale.jpg)

> [!important]
> **Conclusion**
>
> AWS Simple Queue Service (SQS) is a vital tool for enhancing the resilience, scalability, and decoupling of modern applications. Its robust integration with AWS services makes it indispensable for designing distributed and microservices-based architectures.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a5c60f6-2d46-4dfe-a2e2-66c7eae45a70/lesson/bbec5f8d-f7b6-4ffd-9723-869226f40b90)**
>
> Watch video content
