# AWS EventBridge Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-1-Monitoring-Logging-and-Remediation/AWS-EventBridge-Introduction)

---

## Table of Contents

- AWS EventBridge Introduction
  - Key Concepts
  - Components of EventBridge
  - Use Cases
  - Best Practices
  - Conclusion
  - Watch Video
    - Event Bus
    - Components and Their Roles
    - Pipes
    - Scheduler
    - Schema Registry

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 1 Monitoring Logging and Remediation

# AWS EventBridge Introduction

Welcome students! In this article, we explore how AWS EventBridge works, its key components, and its various use cases. AWS EventBridge—originally part of CloudWatch Events—has evolved into a fully managed event bus that receives events from multiple sources and routes them to specific targets based on predefined rules.

Event-driven architectures often need to handle external third-party calls as well as internal events within your AWS environment. EventBridge acts as a central hub that ingests these events and intelligently distributes them to targets such as AWS Lambda, Amazon SNS, or custom applications.

## Key Concepts

Events can originate from various sources, including AWS services, custom applications (whether running on AWS or on-premises), and partner applications. All these events are directed to an event bus, which may be the default bus, a custom event bus, or a partner event bus. Rules associated with the bus then determine how events are processed and where they are routed.

![The image is a diagram introducing Amazon EventBridge, showing how event sources like AWS services, custom apps, and microservices connect to event buses, which then use rules to route events to various targets such as AWS Lambda and Amazon SNS.](https://kodekloud.com/kk-media/image/upload/v1752859831/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-EventBridge-Introduction/amazon-eventbridge-diagram-routing-events.jpg)

In the diagram above, observe that:

- The event source generates the event.
- The event is pushed to an event bus.
- Rules evaluate the event and route it to the appropriate target, which could be a Lambda function, an SNS topic, or another AWS service.

## Components of EventBridge

### Event Bus

The event bus serves as the entry point for data. It functions as a serverless data router that decouples event producers from event consumers. By ingesting data from various services and evaluating it against defined rules, the event bus routes events appropriately. This decoupling fosters improved reliability and scalability by allowing event sources and targets to operate independently.

![The image is a diagram illustrating the components and workflow of AWS EventBridge Buses, including event sources, event buses, schema registry, rules, and targets like AWS Lambda and Amazon SNS.](https://kodekloud.com/kk-media/image/upload/v1752859832/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-EventBridge-Introduction/aws-eventbridge-bus-diagram.jpg)

### Components and Their Roles

AWS EventBridge comprises several key components:

1.  **Event Sources:** Generate events that are sent to the bus.
2.  **Rules:** Contain the logic for routing events. Rules manage retries, error handling, and enable building loosely coupled applications.
3.  **Targets:** Serve as the final destination for events where the data is processed or archived.

The diagram below illustrates the interaction between different AWS EventBridge components:

![The image shows components of AWS EventBridge, including Event Bus, Pipes, Scheduler, and Schema, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752859833/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-EventBridge-Introduction/aws-eventbridge-components-diagram.jpg)

### Pipes

EventBridge Pipes create point-to-point integrations between event producers and consumers. Acting as an ETL (Extract, Transform, Load) tool, Pipes can filter, transform, enrich, or modify events before sending them to their targets. This minimizes the need for extensive custom code when developing event-driven applications.

![The image illustrates the AWS EventBridge Pipes workflow, showing how events are pulled from various AWS services, filtered, and then sent to different AWS destinations for processing.](https://kodekloud.com/kk-media/image/upload/v1752859834/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-EventBridge-Introduction/aws-eventbridge-pipes-workflow.jpg)

### Scheduler

The scheduler in EventBridge allows you to set up scheduled tasks and events. This feature is useful for automating tasks such as Auto Scaling, sending periodic notifications, or triggering other AWS services. Schedules can be defined using cron expressions, fixed-rate intervals, or specific dates and times.

![The image is an illustration of the AWS EventBridge Scheduler, showing steps to create a schedule and set a schedule pattern using cron expressions, fixed rates, or specific dates and times.](https://kodekloud.com/kk-media/image/upload/v1752859835/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-EventBridge-Introduction/aws-eventbridge-scheduler-illustration.jpg)

When configuring a schedule, you define the following:

- The schedule pattern (using cron expressions or fixed intervals).
- The target AWS service to receive the event.
- The payload data sent to the target.
- Retry policies, queues, and any encryption details required.

### Schema Registry

The schema registry stores event schemas that act as templates detailing how data is structured and routed within your EventBridge setup. This facilitates data handling—especially in cases involving complex routing, enrichment, or retry logic. The registry is particularly valuable when working with over 200 built-in AWS services and can be extended by writing custom handlers for services beyond native integrations.

## Use Cases

AWS EventBridge is versatile and supports numerous application architectures. Common use cases include:

- **Third-Party Integration:** Use EventBridge to build event-driven workflows that integrate with external services like Salesforce or Zendesk, such as triggering provisioning processes when a purchase occurs.
- **Monitoring and Security:** Automatically respond to changes detected by CloudTrail, such as unexpected modifications to firewall configurations.
- **Automation and Administration:** Route events to Lambda functions to automate administrative tasks, enabling real-time processing and operational efficiency.

![The image outlines three common use cases for Amazon EventBridge: application integration, monitoring and security, and automation and workflow.](https://kodekloud.com/kk-media/image/upload/v1752859836/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-EventBridge-Introduction/amazon-eventbridge-use-cases.jpg)

> [!important]
> **Key Insight**
>
> Using EventBridge allows you to build scalable, loosely coupled architectures that can adapt to various patterns and integrations seamlessly.

## Best Practices

When designing solutions with EventBridge, keep the following best practices in mind:

- **Use Event Patterns:** Filter events to process only the relevant data, thereby reducing unnecessary workload.
- **Segment Event Buses:** Maintain distinct event buses for different sources (e.g., one for Salesforce events and another for AWS application events) to ensure clarity and enhance security.
- **Monitor Your Setup:** Leverage CloudWatch to track issues, performance bottlenecks, and failures in event processing.
- **Implement Dead Letter Queues (DLQs):** DLQs capture events that encounter processing errors. This mechanism prevents data loss and enables further review and reprocessing of failed events.

![The image outlines best practices for Amazon EventBridge, including using event patterns, creating custom event buses, monitoring with CloudWatch, and using dead-letter queues for failed events.](https://kodekloud.com/kk-media/image/upload/v1752859837/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-EventBridge-Introduction/amazon-eventbridge-best-practices.jpg)

> [!important]
> **Important**
>
> Dead letter queues (DLQs) are critical for ensuring that events unable to be processed due to errors are not lost, allowing for subsequent remediation or human intervention.

## Conclusion

In this lesson, we covered the fundamentals of AWS EventBridge, including its architecture and components—event bus, pipes, scheduler, and schema registry—as well as practical use cases and best practices. By integrating EventBridge into your applications, you can develop robust, scalable, and loosely coupled event-driven systems within AWS.

Thank you for reading, and we look forward to exploring more AWS services with you in future lessons.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/e7f728df-5d8d-4dbb-80f6-33c15cde3034/lesson/ccc7d8a3-90d4-45ab-879f-5014c7282286)**
>
> Watch video content
