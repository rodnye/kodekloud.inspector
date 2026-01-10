# Consumer Groups and How They Work - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Kafka-Producers-Consumers-The-Message-Flow/Consumer-Groups-and-How-They-Work)

---

## Table of Contents

- Consumer Groups and How They Work
  - Introduction
  - Producers vs. Consumers
  - What Is a Consumer Group?
  - Partition Assignment in Action
  - Scaling with More Consumers
  - Core Features of Consumer Groups
  - Coordination, Scaling, and Rebalancing
  - Links and References
  - Watch Video

---

## Content

Event Streaming with Kafka

Kafka Producers Consumers The Message Flow

# Consumer Groups and How They Work

## Introduction

Apache Kafka scales message processing by distributing partitions across multiple consumers. In this article, we’ll explain what **consumer groups** are, how they balance work, and why they’re key to parallel processing, ordered delivery, and fault tolerance in real-time data pipelines.

## Producers vs. Consumers

Before diving into consumer groups, let’s recap the core roles in Kafka:

| Role     | Responsibility                                    | Example                                 |
| -------- | ------------------------------------------------- | --------------------------------------- |
| Producer | Sends event records to Kafka topics               | `producer.send("Topic A", record)`      |
| Consumer | Reads and processes records from Kafka partitions | `consumer.poll(Duration.ofMillis(100))` |

Imagine **Topic A** with four partitions (1, 2, 3, 4) and a single consumer reading sequentially:

1.  Fetch event from Partition 1
2.  Process the event
3.  Continue with the next event in Partition 1 (or switch to Partition 2 after finishing Partition 1)

If your stream is IoT device data—say, packaging machines—you’d scan each record for error codes. With only one machine and light traffic, one consumer can keep pace. But when dozens of devices send concurrently, a lone consumer becomes a bottleneck.

## What Is a Consumer Group?

A **consumer group** is a set of consumers sharing the same `group.id`. Kafka divides topic partitions among group members so each event is consumed exactly once by the group. This lets you scale horizontally without duplicate processing.

> [!important]
> **Note**
>
> Assign the same `group.id` to all consumers in your application to enable coordinated partition assignment.

## Partition Assignment in Action

When two consumers join a group for **Topic A** (4 partitions), Kafka automatically balances the load:

- **Consumer 1**: Partitions 1 & 2
- **Consumer 2**: Partitions 3 & 4

![The image illustrates how Kafka consumer groups work, showing brokers with topic partitions connected to consumers within a consumer group.](https://kodekloud.com/kk-media/image/upload/v1752874738/notes-assets/images/Event-Streaming-with-Kafka-Consumer-Groups-and-How-They-Work/kafka-consumer-groups-diagram.jpg)

Each partition feeds into exactly one consumer, guaranteeing ordered processing without overlap.

## Scaling with More Consumers

You can add up to as many consumers as there are partitions. Kafka dynamically rebalances so each active consumer handles one or more partitions:

![The image illustrates how Kafka consumer groups work, showing brokers with topic partitions connected to consumers in a consumer group.](https://kodekloud.com/kk-media/image/upload/v1752874739/notes-assets/images/Event-Streaming-with-Kafka-Consumer-Groups-and-How-They-Work/kafka-consumer-groups-diagram-2.jpg)

> [!important]
> **Warning**
>
> Adding more consumers than partitions will leave some consumers idle until new partitions become available.

## Core Features of Consumer Groups

![The image explains how consumer groups work, highlighting parallel processing, message guarantee, and fault tolerance. Each section includes an icon and a brief description of the concept.](https://kodekloud.com/kk-media/image/upload/v1752874740/notes-assets/images/Event-Streaming-with-Kafka-Consumer-Groups-and-How-They-Work/consumer-groups-parallel-processing-diagram.jpg)

- **Parallel Processing**  
  Multiple consumers read from different partitions simultaneously, boosting throughput.
- **Message Guarantee**  
  Exactly one consumer per partition ensures ordered delivery and no duplicates.
- **Fault Tolerance**  
  If a consumer fails, Kafka rebalances partitions among the remaining members, minimizing disruption.

## Coordination, Scaling, and Rebalancing

Kafka brokers (via KRaft or ZooKeeper) handle group membership, partition assignments, and rebalances:

![The image explains how consumer groups work, highlighting group coordination, group scaling, and rebalancing overhead.](https://kodekloud.com/kk-media/image/upload/v1752874742/notes-assets/images/Event-Streaming-with-Kafka-Consumer-Groups-and-How-They-Work/consumer-groups-coordination-scaling-rebalancing.jpg)

- **Group Coordination**  
  Brokers detect active consumers, assign partitions, and monitor heartbeats.
- **Dynamic Scaling**  
  Add or remove consumers at runtime to match workload without downtime.
- **Rebalancing Overhead**  
  On membership changes, brokers briefly pause consumption to redistribute partitions.

## Links and References

- [Apache Kafka Consumer Groups](https://kafka.apache.org/documentation/#consumerconfigs)
- [Kafka Rebalancing Protocol](https://kafka.apache.org/documentation/#impl_messaging_rebalance)
- [KRaft Mode Overview](https://kafka.apache.org/documentation/#kraft)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/25a81d98-c284-444b-b64d-6141e562d17d/lesson/54e3f4cb-93be-42c7-aa5e-3003bff81f54)**
>
> Watch video content
