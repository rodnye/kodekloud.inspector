# Amazon EventBridge - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Application-Integrations/Amazon-EventBridge)

---

## Table of Contents

- Amazon EventBridge
  - How EventBridge Works
  - Event Processing and Routing
  - Key Benefits
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Application Integrations

# Amazon EventBridge

In this article, we explore AWS EventBridge—a fully serverless event bus that empowers you to capture, route, and deliver events to a wide range of targets. Whether an event originates from an S3 file upload, an EC2 operation, a Lambda invocation, or even from SaaS and custom applications, EventBridge ensures that events are efficiently managed and forwarded based on the rules you define.

## How EventBridge Works

When an event occurs within your AWS infrastructure, EventBridge captures it and processes it through a series of steps:

1.  **Event Capture:** As soon as an event is generated (for example, a new file upload in an S3 bucket), EventBridge intercepts the event.
2.  **Schema Registry:** Once the event is received, EventBridge's schema registry automatically detects and stores its schema. This ensures that any service processing the event understands its data structure, and it even enables automatic generation of code bindings for smoother integration.
3.  **Event Routing:**
    - The event bus, acting as the central router, forwards the event to one or more designated targets based on your defined rules.
    - AWS provides a default event bus for general events, and you can also create custom event buses to isolate and manage events with specific processing requirements.

![The image is a diagram illustrating AWS EventBridge, showing various AWS resources like Lambda and S3, along with options for SAAS and custom applications as event sources.](https://kodekloud.com/kk-media/image/upload/v1752858390/notes-assets/images/AWS-Certified-Developer-Associate-Amazon-EventBridge/aws-eventbridge-diagram-resources.jpg)

> [!important]
> **Note**
>
> AWS EventBridge supports multiple event sources, meaning you can trigger events from a variety of AWS services such as S3, EC2, and Lambda, as well as from external applications.

## Event Processing and Routing

After capturing an event, the EventBridge event bus directs it to various targets. Some common target use cases include:

- **Lambda Functions:** For performing tasks like log analysis.
- **SNS Topics:** To send notifications to users.
- **Kinesis Data Streams:** For subsequent data analysis.

In addition to reactive event processing, EventBridge supports scheduled tasks. Similar to cron jobs, you can schedule events that trigger actions such as running a Lambda function every hour or weekly.

![The image is a diagram illustrating the flow of events in an EventBridge Event Bus, showing event sources feeding into default and custom event buses, which then direct events to targets.](https://kodekloud.com/kk-media/image/upload/v1752858392/notes-assets/images/AWS-Certified-Developer-Associate-Amazon-EventBridge/eventbridge-event-bus-flow-diagram.jpg)

## Key Benefits

AWS EventBridge simplifies architecture design by decoupling application components and enabling scalable and efficient event processing. Below are some key benefits:

| Feature            | Description                                                            | Example Use Case                                    |
| ------------------ | ---------------------------------------------------------------------- | --------------------------------------------------- |
| Serverless         | No server management required, scales automatically.                   | Dynamic microservices architecture.                 |
| Schema Registry    | Automatically detects and stores event schemas for easy integration.   | Auto-generating code bindings for Lambda functions. |
| Flexible Routing   | Routes events to multiple targets based on user-defined rules.         | Integrating with SNS, Lambda, and third-party apps. |
| Scheduled Triggers | Supports cron-like scheduling to trigger events at specific intervals. | Running periodic data backup operations.            |

> [!important]
> **Note**
>
> EventBridge makes it easy to build loosely coupled and scalable architectures by abstracting the event routing logic. This separation of concerns allows your application components to evolve independently.

## Summary

AWS EventBridge is a powerful service for connecting and orchestrating your application’s components through events. By capturing events from multiple sources, storing their schemas, and routing them based on predefined rules, EventBridge helps you create scalable and resilient serverless architectures. It not only simplifies event management but also enables scheduled operations, making it an indispensable tool in modern cloud integrations.

![The image is a summary of EventBridge, describing it as a service that connects application components using events, routes events based on rules, acts as an event bus, and performs tasks at scheduled intervals.](https://kodekloud.com/kk-media/image/upload/v1752858393/notes-assets/images/AWS-Certified-Developer-Associate-Amazon-EventBridge/eventbridge-summary-event-bus.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/60c267ab-da8b-4408-97f4-b53aad3f4479/lesson/fc6d0310-94b7-4852-af2c-287b00901868)**
>
> Watch video content
