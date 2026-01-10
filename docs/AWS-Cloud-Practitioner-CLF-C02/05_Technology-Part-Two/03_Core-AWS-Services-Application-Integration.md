# Core AWS Services Application Integration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-Two/Core-AWS-Services-Application-Integration)

---

## Table of Contents

- Core AWS Services Application Integration
  - Simple Notification Service (SNS)
  - Simple Queue Service (SQS)
  - Elastic Load Balancing (ELB)
  - Auto Scaling
  - Additional Application Integration Services
  - Summary
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part Two

# Core AWS Services Application Integration

Welcome back, AWS Cloud Practitioner students! In this lesson, we continue our exploration of core AWS services by diving into application integration. This area encompasses AWS services that facilitate communication between applications or their components, ensuring efficient, reliable data flow.

When discussing application integration, we focus on managing and optimizing the communication between applications. For instance, the Simple Queue Service (SQS) acts as a buffer: one application can send a high volume of requests while another processes them sequentially. This type of interaction, known as app-to-app communication, is fundamental to many modern architectures. Furthermore, services like Simple Notification Service (SNS), Elastic Load Balancing (ELB), and Auto Scaling also play critical roles in managing traffic between applications or from an application to an end user.

Consider the diagram below which illustrates how an application sends traffic to SNS. SNS duplicates the traffic and forwards it to both applications and customers:

![The image illustrates application integration using Amazon SNS, SQS, Elastic Load Balancing, and AWS Application Auto Scaling, showing traffic flow from an app to customers.](https://kodekloud.com/kk-media/image/upload/v1752862273/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Application-Integration/frame_120.jpg)

In essence, application integration is about managing flow, quality, buffering capacity, and the rate of communications. This ensures that messages or requests are delivered in a controlled fashion—much like managing a queue in a busy line.

## Simple Notification Service (SNS)

We begin with SNS, the duplicator service. When a message is sent to SNS, it replicates the message across all endpoints subscribed to a specific topic. For example, publishing a message on SNS ensures that every device or service subscribed to that topic receives a copy, similar to an email subscription system.

![The image explains Amazon Simple Notification Service (SNS) for sending messages via text, email, or mobile push, and copying messages to multiple applications.](https://kodekloud.com/kk-media/image/upload/v1752862274/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Application-Integration/frame_200.jpg)

## Simple Queue Service (SQS)

SNS pairs naturally with SQS, a service built around the concept of a queue. SQS manages a large influx of messages by storing them until the receiving application is ready to process them. This buffering mechanism prevents backend systems from getting overwhelmed during peak loads. Unlike SNS, which duplicates messages, SQS ensures that messages are held and then processed one-by-one, maintaining system stability.

![The image explains Amazon Simple Queue Service (SQS) for managing message traffic between applications, highlighting its use in handling sudden user traffic increases.](https://kodekloud.com/kk-media/image/upload/v1752862275/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Application-Integration/frame_290.jpg)

## Elastic Load Balancing (ELB)

Next, we examine Elastic Load Balancing. ELB distributes incoming traffic evenly across multiple backend servers. Imagine a busy restaurant where guests are efficiently routed to different service stations—ensuring no single station becomes overloaded.

ELB directs traffic to the first available server and automatically reroutes requests if a server fails. This functionality applies to diverse compute environments, including virtual machines, containers, and Lambda functions. The diagram below demonstrates how ELB distributes incoming traffic across multiple availability zones:

![The image explains AWS Elastic Load Balancing, highlighting its use in directing traffic, distributing workloads, and integrating with services like EC2, ECS, EKS, and Lambda.](https://kodekloud.com/kk-media/image/upload/v1752862277/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Application-Integration/frame_370.jpg)

## Auto Scaling

Working hand in hand with load balancing is Auto Scaling. This service monitors incoming traffic and other performance metrics, adjusting the capacity of backend servers automatically. For example, if your load balancer detects higher traffic, Auto Scaling adds servers to maintain optimal performance. Conversely, it scales down capacity when demand decreases, optimizing cost efficiency.

Below is a diagram showing how increased traffic results in an expanded Auto Scaling group, with the load balancer redistributing requests among all instances:

![The image explains Amazon Autoscaling, highlighting its ability to scale applications like DynamoDB and EC2, with a focus on elastic load balancing and instance limits.](https://kodekloud.com/kk-media/image/upload/v1752862278/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Application-Integration/frame_490.jpg)

## Additional Application Integration Services

Beyond SNS, SQS, ELB, and Auto Scaling, AWS offers several other services tailored for application integration:

- **AppFlow**: Orchestrates data replication from third-party sources, such as Salesforce, into AWS automatically. Think of it as a tool similar to IFTTT, Make, or Zapier for AWS environments.
- **EventBridge**: Functions like a post office, capturing events from your applications and triggering necessary responses. For example, an application can post an event to EventBridge to schedule a task.
- **Amazon MQ**: Provides a managed queue service using popular open-source software (such as ActiveMQ or RabbitMQ). While SQS offers a simplified, scalable solution, Amazon MQ is ideal for those already invested in open-source queue systems.
- **Step Functions**: Orchestrates and chains multiple Lambda functions to execute more complex tasks that exceed individual function limitations (like the 15-minute runtime limit).

> [!important]
> **SEO Tip**
>
> Integrating multiple AWS services for application integration not only enhances performance but also improves the scalability and reliability of your cloud architecture.

## Summary

- **Simple Notification Service (SNS)**: Duplicates and disseminates messages to multiple endpoints, making it perfect for notifications across applications, text, email, or mobile devices.
- **Simple Queue Service (SQS)**: Buffers incoming messages and processes them sequentially to prevent backend overload.
- **Elastic Load Balancing (ELB)**: Distributes incoming traffic evenly across multiple servers and handles automatic traffic rerouting.
- **Auto Scaling**: Dynamically adjusts compute capacity based on real-time traffic, ensuring both performance and cost efficiency.
- Additional services like AppFlow, EventBridge, Amazon MQ, and Step Functions cater to specific needs in data integration and orchestration.

These integrated services together form the backbone of robust, scalable cloud architectures, ensuring smooth and efficient communication between applications and with end users.

For more details on AWS services and application integration, visit the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/f47a1e6e-5593-4fac-bc8b-f24ef6e6f418/lesson/7e2f1def-fa5e-4db7-bc5e-47b1dd652b90)**
>
> Watch video content
