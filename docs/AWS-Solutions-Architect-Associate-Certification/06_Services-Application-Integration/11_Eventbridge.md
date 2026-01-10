# Eventbridge - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Application-Integration/Eventbridge)

---

## Table of Contents

- Eventbridge
  - Understanding Tightly Coupled vs. Distributed Applications
  - Key Benefits of AWS EventBridge
  - Components of AWS EventBridge
  - Advanced Features of AWS EventBridge
  - Integrations with AWS Services
  - Watch Video
    - 1. Event Bus
    - 2. Pipes
    - 3. Scheduler
    - API Integrations
    - Event Replay
    - Schema Registry
    - Reliable Event Delivery

---

## Content

AWS Solutions Architect Associate Certification

Services Application Integration

# Eventbridge

In this lesson, we explore AWS EventBridge, a fully managed, serverless event bus that simplifies building distributed, event-driven architectures. We begin by discussing the limitations of tightly coupled applications and then demonstrate how distributed systems and EventBridge can solve these challenges.

## Understanding Tightly Coupled vs. Distributed Applications

Tightly coupled applications require extensive coordination between teams. When one service changes, every interdependent component might also need to be updated. This interconnectedness significantly increases operational complexity as the application scales.

In contrast, distributed applications consist of independent components that scale separately. Each team manages only their specific service, thereby reducing cross-dependencies. An event-driven architecture further decouples these components, allowing them to interact solely through events. However, managing an event system brings its own challenges such as ensuring event delivery during server crashes, handling high event volumes, and maintaining overall resilience.

This is where AWS EventBridge becomes an essential service. By providing a scalable and fully managed event bus, EventBridge makes it easier to integrate AWS services, third-party applications, and your custom applications—all without building an on-premises event infrastructure.

> [!important]
> **Key Insight**
>
> AWS EventBridge enables loosely coupled communication between services. This reduces complexity, improves scalability, and allows your teams to work more efficiently.

## Key Benefits of AWS EventBridge

AWS EventBridge supports loosely coupled, event-driven architectures, offering benefits such as:

- **Decoupling of Components:** Services communicate through events, reducing direct dependencies.
- **Scalability:** Components scale based purely on event loads.
- **Real-Time Processing:** Efficient handling of high volumes of events.
- **Advanced Routing & Filtering:** Define rules to trigger specific actions based on event properties.

For example, you can configure a rule that instructs EventBridge to trigger two Lambda functions and one ECS task when an event with designated properties is received—while ignoring irrelevant events.

!\[The image illustrates the need for AWS EventBridge, highlighting features like decoupling and scalability, event processing at scale, and event routing and filtering, with colorful cubes and event icons.\](/images/AWS-Solutions- Architect-Associate-Certification-Eventbridge/aws-eventbridge-features-illustration.jpg)

## Components of AWS EventBridge

AWS EventBridge is composed of three primary components: Event Bus, Pipes, and Scheduler. Below is an overview of each component.

### 1\. Event Bus

An Event Bus serves as a centralized hub where events from various sources—such as AWS services, custom applications, or SaaS applications—are collected and routed to the appropriate targets based on defined rules.

!\[The image shows the components of AWS EventBridge: Event Bus, Pipes, and Scheduler, each represented with an icon.\](/images/AWS-Solutions- Architect-Associate-Certification-Eventbridge/aws-eventbridge-components-icons.jpg)

Every AWS account includes a default event bus, allowing you to start sending events immediately. Additionally, you can create custom event buses to organize events by application or functionality. Once events are on the bus, rules determine which services (e.g., Lambda functions, SNS topics, API destinations) are triggered.

!\[The image is a diagram illustrating AWS EventBridge Buses, showing the flow from event sources like AWS services and custom apps to event buses, schema registry, and targets such as AWS Lambda and Amazon SNS. It includes components like schema discovery, rules, and API destinations.\](/images/AWS-Solutions- Architect-Associate-Certification-Eventbridge/aws-eventbridge-buses-diagram.jpg)

### 2\. Pipes

EventBridge Pipes offer a streamlined integration mechanism by directly routing events from a source to a target. Pipes provide additional functionalities such as:

- **Filtering:** Forward only the events that meet defined criteria.
- **Transformation:** Convert event data into the required format before reaching the target.
- **Enrichment:** Enhance event data by adding supplementary information (e.g., using a Lambda function to retrieve additional details based on a transaction ID).

This targeted approach reduces overhead by processing only essential events.

!\[The image is a diagram illustrating AWS EventBridge Pipes, showing how events are pulled from various AWS services, filtered, enriched, and then sent to target services.\](/images/AWS-Solutions- Architect-Associate-Certification-Eventbridge/aws-eventbridge-pipes-diagram.jpg)

### 3\. Scheduler

The EventBridge Scheduler is a serverless service that allows you to effectively schedule tasks and events. With configurable scheduling patterns, delivery windows, and retry policies, the Scheduler ensures that critical tasks are executed exactly when needed.

!\[The image is a diagram explaining the AWS EventBridge Scheduler process, including steps to create a schedule, set a schedule pattern, select a target, and set a payload.\](/images/AWS-Solutions- Architect-Associate-Certification-Eventbridge/aws-eventbridge-scheduler-diagram.jpg)

## Advanced Features of AWS EventBridge

AWS EventBridge offers several advanced features designed to further enhance your event-driven architecture:

### API Integrations

EventBridge easily connects to various API endpoints, whether hosted on-premises or provided by third-party SaaS providers. This low-code integration option helps manage throughput and authentication, ensuring secure communication.

### Event Replay

Event replay allows you to reprocess historical events by sending them back onto an event bus or a specific rule. This feature is invaluable for debugging, as it lets you analyze past events in real time to pinpoint issues in your architecture.

### Schema Registry

To maintain consistency in event structures across teams, EventBridge provides a schema registry. This registry stores event schema definitions so that developers can easily search, understand, and adhere to agreed-upon event formats, ensuring smooth interoperability.

!\[The image lists features of AWS EventBridge, including Low Code Integrations, Event Replay, and Schema Registry, each represented with an icon.\](/images/AWS-Solutions- Architect-Associate-Certification-Eventbridge/aws-eventbridge-features-icons.jpg)

### Reliable Event Delivery

EventBridge ensures at-least-once event delivery with automatic retries incorporating exponential backoff for up to 24 hours. Events are replicated across multiple availability zones, guaranteeing high availability (with a 99.99% SLA) and continuous application operation.

> [!important]
> **Reliability Assurance**
>
> AWS EventBridge's robust event delivery mechanism minimizes data loss and ensures that your applications remain responsive and resilient, even under heavy load.

## Integrations with AWS Services

AWS EventBridge integrates seamlessly with over 200 built-in event sources and targets. This extensive integration includes popular AWS services such as Lambda functions, SQS, SNS, Step Functions, Kinesis Data Streams, and Kinesis Data Firehose.

| AWS Service            | Use Case                                      | Example Command/Reference                                    |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| AWS Lambda             | Serverless compute for event handling         | [AWS Lambda Documentation](https://aws.amazon.com/lambda/)   |
| Amazon SQS             | Message queuing between services              | [Amazon SQS Documentation](https://aws.amazon.com/sqs/)      |
| Amazon SNS             | Pub/sub messaging between distributed systems | [Amazon SNS Documentation](https://aws.amazon.com/sns/)      |
| AWS Step Functions     | Orchestrating workflows                       | [AWS Step Functions](https://aws.amazon.com/step-functions/) |
| Amazon Kinesis Streams | Real-time data streaming                      | [Amazon Kinesis](https://aws.amazon.com/kinesis/)            |

For a complete list of supported integrations and detailed usage scenarios, refer to the [AWS EventBridge documentation](https://aws.amazon.com/eventbridge/).

!\[The image shows a diagram of AWS EventBridge integration with various AWS services, including AWS Lambda, Amazon SQS, Amazon SNS, AWS Step Functions, Amazon Kinesis Data Streams, and Amazon Kinesis Data Firehose.\](/images/AWS-Solutions- Architect-Associate-Certification-Eventbridge/aws-eventbridge-integration-diagram.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a5c60f6-2d46-4dfe-a2e2-66c7eae45a70/lesson/7e52511c-10e0-4b43-b1e7-a866aafd4442)**
>
> Watch video content
