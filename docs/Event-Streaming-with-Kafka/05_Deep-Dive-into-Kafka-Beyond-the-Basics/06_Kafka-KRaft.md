# Kafka KRaft - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Deep-Dive-into-Kafka-Beyond-the-Basics/Kafka-KRaft)

---

## Table of Contents

- Kafka KRaft
  - Introduction
  - Challenges with ZooKeeper
  - Introducing Kafka Raft (KRaft)
  - Architecture Transformation
  - Next Steps
  - Links and References
  - Watch Video
    - Benefits of KRaft

---

## Content

Event Streaming with Kafka

Deep Dive into Kafka Beyond the Basics

# Kafka KRaft

## Introduction

Welcome to this lesson on Kafka Raft (KRaft), the next evolution of Apache Kafka’s architecture. By integrating a native Raft-based consensus protocol, KRaft streamlines cluster operations and removes the need for an external coordination layer.

## Challenges with ZooKeeper

Apache Kafka has long relied on [ZooKeeper](https://zookeeper.apache.org/) to manage metadata, broker states, and leader elections. While reliable, this approach introduces several pain points:

![The image highlights the issue of complexity with Zookeeper, showing a computer screen with various technical elements. It mentions that Zookeeper adds operational overhead and increases the complexity of managing a Kafka cluster.](https://kodekloud.com/kk-media/image/upload/v1752874671/notes-assets/images/Event-Streaming-with-Kafka-Kafka-KRaft/zookeeper-complexity-kafka-cluster.jpg)

Maintaining a separate ZooKeeper ensemble demands extra configuration, monitoring, and troubleshooting—making cluster operations more cumbersome.

![The image discusses the issue of operational overhead with Zookeeper, highlighting the additional effort required for deployment, monitoring, and scaling. It features an illustration of a person holding a document labeled "Deployment & monitoring" next to a smartphone with gear icons.](https://kodekloud.com/kk-media/image/upload/v1752874672/notes-assets/images/Event-Streaming-with-Kafka-Kafka-KRaft/zookeeper-operational-overhead-illustration.jpg)

Running ZooKeeper as its own service raises infrastructure costs, slows deployments, and increases the chance of human error.

![The image discusses the issue of scaling limitations with Zookeeper, highlighting that it can become a bottleneck for large Kafka clusters, impacting performance.](https://kodekloud.com/kk-media/image/upload/v1752874673/notes-assets/images/Event-Streaming-with-Kafka-Kafka-KRaft/zookeeper-scaling-limitations-kafka.jpg)

At scale, ZooKeeper can become a throughput and latency bottleneck. Plus, Kafka and ZooKeeper version misalignments can complicate upgrades and feature rollouts.

> [!important]
> **Note**
>
> ZooKeeper coordination requires careful tuning of session timeouts, leader election parameters, and quorum sizes to maintain cluster health.

## Introducing Kafka Raft (KRaft)

Kafka Raft, or **KRaft**, embeds the Raft consensus algorithm directly into Kafka brokers. This eliminates the external ZooKeeper dependency and brings metadata management in-house:

- Simplified architecture: no separate ensemble to provision.
- Lower operational overhead: fewer components to monitor.
- Improved scalability: built-in governance for partition metadata.

### Benefits of KRaft

![The image lists three features of Kafka KRaft: right-sized clusters, enhanced stability and simplified management, and a unified security model.](https://kodekloud.com/kk-media/image/upload/v1752874674/notes-assets/images/Event-Streaming-with-Kafka-Kafka-KRaft/kafka-kraft-features-list.jpg)

- **Right-sized clusters**: Only the Kafka brokers you need—no extra ZooKeeper nodes.
- **Enhanced stability**: A single control plane reduces failure points and downtime.
- **Unified security**: Consistent authentication, authorization, and encryption across brokers.

![The image lists features of Kafka KRaft, including simplified startup and deployment, instant controller failover, and elimination of Zookeeper dependency.](https://kodekloud.com/kk-media/image/upload/v1752874675/notes-assets/images/Event-Streaming-with-Kafka-Kafka-KRaft/kafka-kraft-features-list-2.jpg)

- **Simplified deployment**: Start brokers in KRaft mode without bootstrapping an external service.
- **Instant controller failover**: Automatic Raft leader election ensures high availability.
- **No ZooKeeper**: One less moving part in your data streaming pipeline.

## Architecture Transformation

Below is a side-by-side view of the old and new Kafka architectures:

```
Before (ZooKeeper-based):
  ZooKeeper ensemble
  └── Multiple ZooKeeper nodes
Kafka brokers → ZooKeeper for metadata and leader elections


After (KRaft mode):
  Kafka brokers (Raft cluster)
  ├─ Controller broker (Raft leader)
  └─ Replica brokers
Internal __metadata__ topic replaces ZooKeeper coordination
```

| Aspect               | ZooKeeper-based Kafka       | KRaft-based Kafka               |
| -------------------- | --------------------------- | ------------------------------- |
| Coordination Service | External ZooKeeper ensemble | Internal Raft consensus         |
| Deployment Units     | Kafka brokers + ZK nodes    | Kafka brokers only              |
| Failover             | Separate ZooKeeper election | Instant Raft leader election    |
| Scalability          | ZK bottlenecks at scale     | Distributed metadata management |
| Security Model       | Two config domains          | Unified broker configuration    |

> [!important]
> **Warning**
>
> Do not mix ZooKeeper-based brokers with KRaft brokers in the same cluster. Plan your migration carefully to avoid compatibility issues.

## Next Steps

In the following lesson, we will walk through:

1.  Initializing a Kafka cluster in KRaft mode
2.  Configuring controller and broker roles
3.  Adding and removing brokers dynamically
4.  Best practices for monitoring and scaling

See you in the next lesson!

## Links and References

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [ZooKeeper Official Site](https://zookeeper.apache.org/)
- [Kafka KRaft KIP-500 Proposal](https://cwiki.apache.org/confluence/display/KAFKA/KIP-500%3A+Replace+ZooKeeper+with+Kafka+Raft)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/9aa104e8-faa5-4099-977f-71744306b99d/lesson/08fadb98-c4e6-46e0-9aff-40623fbda81d)**
>
> Watch video content
