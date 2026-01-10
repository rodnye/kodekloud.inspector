# Event Driven Architecture Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Foundations-of-Event-Streaming/Event-Driven-Architecture-Basics)

---

## Table of Contents

- Event Driven Architecture Basics
  - Revisiting Event-Driven Architecture
  - Common Pitfalls of Traditional EDA
  - Introducing Kafka as the Message Broker
  - Why Kafka Excels: Key Features
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Event Streaming with Kafka

Foundations of Event Streaming

# Event Driven Architecture Basics

Hello and welcome back. In our previous lesson, we introduced Apache Kafka. Now, we’ll revisit the fundamentals of Event-Driven Architecture (EDA) to understand the challenges it solves and how Kafka addresses them.

## Revisiting Event-Driven Architecture

System A (a microservice, IoT device, or any event source) emits an event. System B consumes this event, transforms or enriches the data, and then produces a “processed event.” Downstream consumers—System X, System Y, etc.—leverage these processed events for storage, analytics, or triggering additional workflows.

At high volume—hundreds or thousands of events per second—System B must process every message without dropping any and then reliably publish processed events. Optionally, acknowledgments or responses may flow back to System A or other services, completing a request–response cycle.

Managing this complexity at scale can lead to overload, failures, or data loss. Let’s examine the pitfalls of a naïve event-driven setup before diving into how Kafka mitigates them.

![The image illustrates the basics of event-driven architecture, showing how events from System A are processed by System B and System X, resulting in processed events.](https://kodekloud.com/kk-media/image/upload/v1752874714/notes-assets/images/Event-Streaming-with-Kafka-Event-Driven-Architecture-Basics/event-driven-architecture-basics.jpg)

> [!important]
> **Warning**
>
> Without a central event broker, direct service-to-service communication can lead to cascading failures under load.

## Common Pitfalls of Traditional EDA

| Pitfall                 | Impact                                                                                  | Real-World Example                                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Tight Coupling          | Services share internal contracts, causing breaking changes when one service updates.   | An e-commerce order service change breaks the payment service during a Black Friday surge.                     |
| Reduced Scalability     | Dependencies prevent horizontal scaling, leading to performance bottlenecks under load. | Twitter faced massive latency when handling millions of tweets during the Super Bowl without decoupling.       |
| Single Point of Failure | One component outage collapses the entire workflow.                                     | If Netflix’s recommendation engine fails, users lose personalized suggestions—or streaming may be interrupted. |
| No Message Persistence  | Events aren’t durably stored, risking data loss and inconsistency.                      | A trading platform that fails to persist trade events could incur regulatory penalties.                        |
| Limited Functionality   | Lack of real-time analytics, exactly-once processing, or retry mechanisms.              | FedEx’s tracking system without real-time updates or error recovery results in missed package alerts.          |

![The image outlines the pitfalls of event-driven architecture, including tight coupling, reduced scalability, single point of failure, no message persistence, and limited functionality.](https://kodekloud.com/kk-media/image/upload/v1752874715/notes-assets/images/Event-Streaming-with-Kafka-Event-Driven-Architecture-Basics/event-driven-architecture-pitfalls.jpg)

## Introducing Kafka as the Message Broker

Instead of sending events directly between services, System A publishes to Apache Kafka—the central event hub. Once the event is in Kafka:

- Producers are decoupled from consumers.
- Any number of consumers (System B, System X, or new services) can subscribe independently.
- Services don’t need to know about each other or the original source.
- Events can be replayed, audited, and retained for as long as needed.

![The image illustrates the role of Kafka as a message broker, showing data flow from System A to Systems X and B through Kafka.](https://kodekloud.com/kk-media/image/upload/v1752874716/notes-assets/images/Event-Streaming-with-Kafka-Event-Driven-Architecture-Basics/kafka-message-broker-data-flow.jpg)

> [!important]
> **Note**
>
> Using Kafka topics as the primary communication channel simplifies scaling, error handling, and system evolution.

## Why Kafka Excels: Key Features

- High Throughput  
  Handles millions of messages per second with low latency, making it ideal for real-time data pipelines.
- Fault Tolerance  
  Distributed architecture with replicated partitions ensures no single point of failure.
- Scalability  
  Add brokers or partitions on the fly to meet increasing demand without downtime.
- Real-Time Processing  
  Low-latency streaming enables immediate analytics, monitoring, and event-driven workflows.

![The image is an infographic titled "Kafka – The Backbone of Event-Driven Architectures," highlighting four key features: high throughput, fault tolerance, scalability, and real-time processing. Each feature is briefly described with accompanying icons.](https://kodekloud.com/kk-media/image/upload/v1752874718/notes-assets/images/Event-Streaming-with-Kafka-Event-Driven-Architecture-Basics/kafka-event-driven-architecture-infographic.jpg)

## Next Steps

In the next lesson, we’ll cover how to install, configure, and optimize Kafka for your event-driven applications.

## Links and References

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [Event-Driven Architecture Overview](https://martinfowler.com/articles/201701-event-driven.html)
- [Kafka vs. Traditional Message Brokers](https://www.confluent.io/blog/kafka-fastest-messaging-system/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/2359e80d-66f6-4080-8e9c-d81a6a1600fe/lesson/a869b71d-86de-4c60-be03-c1b48200e87c)**
>
> Watch video content
