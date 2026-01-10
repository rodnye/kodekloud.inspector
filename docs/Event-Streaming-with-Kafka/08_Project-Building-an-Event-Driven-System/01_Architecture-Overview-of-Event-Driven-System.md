# Architecture Overview of Event Driven System - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Project-Building-an-Event-Driven-System/Architecture-Overview-of-Event-Driven-System)

---

## Table of Contents

- Architecture Overview of Event Driven System
  - User Journey
  - System Architecture
  - Components Breakdown
  - Technology Stack
  - Next Steps: Deploying Kafka on AWS EC2
  - References
  - Watch Video

---

## Content

Event Streaming with Kafka

Project Building an Event Driven System

# Architecture Overview of Event Driven System

In this guide, you’ll learn how to design and implement an end-to-end event-driven architecture for an e-commerce application using Apache Kafka. We’ll translate the user journey into a technical solution, covering the flow from order placement to warehouse processing.

## User Journey

1.  A customer launches the web UI and browses products.
2.  They add items to the cart and place an order.
3.  The application emits an `OrderPlaced` event to a Kafka topic.
4.  A warehouse dashboard consumes the event in near real time.
5.  Warehouse staff pack and ship the order.

> [!important]
> **Note**
>
> In a production environment, you might add services like fraud detection, inventory management, or analytics that subscribe to the same Kafka topic for parallel processing.

## System Architecture

![The image illustrates an event-driven system where a shopping application places an order, triggering events that are processed by a Kafka topic and then sent to a warehouse dashboard.](https://kodekloud.com/kk-media/image/upload/v1752874753/notes-assets/images/Event-Streaming-with-Kafka-Architecture-Overview-of-Event-Driven-System/event-driven-shopping-order-kafka.jpg)

## Components Breakdown

| Component                      | Role                         | Details                                                            |
| ------------------------------ | ---------------------------- | ------------------------------------------------------------------ |
| Web Application (Producer)     | Publishes events to Kafka    | Flask-based UI in Python sends `OrderPlaced` messages.             |
| Apache Kafka                   | Event backbone & message bus | Stores, replicates, and streams events across multiple topics.     |
| Warehouse Dashboard (Consumer) | Consumes and displays events | Subscribes to the Kafka topic and renders new orders in real time. |

## Technology Stack

| Layer           | Technology         |
| --------------- | ------------------ |
| Backend         | Python, Flask      |
| Messaging       | Apache Kafka       |
| Infrastructure  | AWS EC2            |
| Frontend        | HTML, CSS          |
| Development IDE | Visual Studio Code |

## Next Steps: Deploying Kafka on AWS EC2

1.  Launch an EC2 instance with Java installed.
2.  Download and extract the latest Kafka release.
3.  Configure `server.properties` (broker ID, listeners, log directories).
4.  Start Zookeeper and Kafka broker services.
5.  Test end-to-end by producing and consuming sample `OrderPlaced` events.

> [!important]
> **Warning**
>
> Ensure your EC2 security groups allow inbound traffic on Kafka’s default ports (9092 for clients, 2181 for ZooKeeper) and restrict access to trusted IPs only.

## References

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [Event-Driven Architecture Patterns](https://martinfowler.com/articles/201701-event-driven.html)
- [AWS EC2 User Guide](https://docs.aws.amazon.com/ec2/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/95f49caf-8e0b-4ed9-b7dd-9f43ff31ed9a/lesson/f6633582-0c5d-4e44-8daa-059e0d9b364c)**
>
> Watch video content
