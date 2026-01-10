# Introduction to Apache Kafka - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Foundations-of-Event-Streaming/Introduction-to-Apache-Kafka)

---

## Table of Contents

- Introduction to Apache Kafka
  - 1. What Is Apache Kafka?
  - 2. Kafka in the Data Ecosystem
  - 3. Kafka as a Central Hub
  - Next Steps
  - Watch Video

---

## Content

Event Streaming with Kafka

Foundations of Event Streaming

# Introduction to Apache Kafka

Welcome to this lesson on Apache Kafka. In this guide, you’ll learn what Kafka is, how it fits into modern data architectures, and why it’s become the de facto standard for real-time event streaming.

## 1\. What Is Apache Kafka?

Apache Kafka is a distributed event streaming platform built for high-throughput, low-latency data pipelines and real-time streaming applications. It functions as a persistent, fault-tolerant store of ordered event logs, enabling you to:

- Ingest data from **websites**, **IoT sensors**, **microservices**, and **mobile apps**
- Process and transform streams of events in real time
- Distribute data to various downstream systems for analytics, storage, or further processing

Kafka’s publish-subscribe model and partitioned log architecture provide horizontal scalability, strong durability guarantees, and seamless failover.

> [!important]
> **Note**
>
> Kafka’s distributed commit log ensures ordered event storage. You can replay messages anytime, making it ideal for auditing, reprocessing, and stateful stream processing.

## 2\. Kafka in the Data Ecosystem

Kafka sits at the heart of your data ecosystem, decoupling producers (data sources) from consumers (data sinks). This separation allows each component to scale independently and reduces system coupling.

![The image is an introduction to Apache Kafka, showing its role in connecting various sources like webpages, microservices, IoT devices, and Android mobiles to destinations such as microservices, analytical platforms, and databases.](https://kodekloud.com/kk-media/image/upload/v1752874719/notes-assets/images/Event-Streaming-with-Kafka-Introduction-to-Apache-Kafka/apache-kafka-introduction-architecture.jpg)

Producers write events into Kafka topics, and consumers read from these topics at their own pace. This model supports multiple use cases:

| Component | Examples                                  |
| --------- | ----------------------------------------- |
| Producers | Web servers, IoT sensors, mobile apps     |
| Topics    | `user-signups`, `sensor-readings`, `logs` |
| Consumers | Real-time dashboards, data warehouses, ML |

## 3\. Kafka as a Central Hub

By centralizing event storage and distribution, Kafka acts like a “data superhighway” for your organization. All incoming event traffic is:

- Published to **topics**, partitioned for parallelism
- Replicated across brokers to guarantee durability
- Consumed by services, analytics engines, or databases

![The image is a diagram introducing Apache Kafka, showing it as a central hub connecting various sources like webpages, microservices, IoT devices, and Android mobiles to destinations such as microservices, analytical platforms, and databases.](https://kodekloud.com/kk-media/image/upload/v1752874720/notes-assets/images/Event-Streaming-with-Kafka-Introduction-to-Apache-Kafka/apache-kafka-diagram-hub-connections.jpg)

Kafka’s strengths at a glance:

| Feature            | Benefit                                 |
| ------------------ | --------------------------------------- |
| Horizontal Scaling | Add brokers without downtime            |
| Durability         | Data replicated across multiple nodes   |
| Fault Tolerance    | Automatic leader election and failover  |
| Replayability      | Consumers can reprocess from any offset |

> [!important]
> **Warning**
>
> Kafka is optimized for high-throughput workloads. For very small-scale messaging, consider lightweight alternatives like [RabbitMQ](https://www.rabbitmq.com/) or cloud-native pub/sub services.

## Next Steps

- Dive into [Kafka Core Concepts](https://kafka.apache.org/documentation/) for brokers, topics, and partitions
- Explore real-time processing with [Apache Kafka Streams](https://kafka.apache.org/documentation/streams/)
- Learn about deploying Kafka on Kubernetes with [Strimzi](https://strimzi.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/2359e80d-66f6-4080-8e9c-d81a6a1600fe/lesson/43a2ea6f-42d6-427a-895c-4826b8d557c2)**
>
> Watch video content
