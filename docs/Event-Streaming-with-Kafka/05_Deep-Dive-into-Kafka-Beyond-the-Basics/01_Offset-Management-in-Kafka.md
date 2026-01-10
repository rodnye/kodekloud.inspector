# Offset Management in Kafka - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Deep-Dive-into-Kafka-Beyond-the-Basics/Offset-Management-in-Kafka)

---

## Table of Contents

- Offset Management in Kafka
  - Kafka Offsets and the Book Analogy
  - High-Level Architecture
  - Handling Consumer Failures
  - Detailed Offset Tracking
  - Offset Persistence Strategies
  - Consumer Group Rebalancing
  - Conclusion
  - References
  - Watch Video
    - Code Example: Manual Offset Commit

---

## Content

Event Streaming with Kafka

Deep Dive into Kafka Beyond the Basics

# Offset Management in Kafka

Efficient offset management is critical for building fault-tolerant, exactly-once or at-least-once message-processing applications with Apache Kafka. This guide covers the core concepts, architecture, and best practices to help you track and commit offsets reliably.

## Kafka Offsets and the Book Analogy

Imagine reading a book and placing a bookmark on the last page you read. In Kafka, each message within a partition is assigned a unique, sequential **offset**. Consumers use these offsets to know which messages they've processed and where to resume if they restart.

- Messages in a topic partition → Pages in a book
- Offset → Page number
- Consumer group → Multiple readers sharing a book

## High-Level Architecture

Below is a simple Kafka setup illustrating offset management for a single-partition topic:

- **Kafka Broker**: Hosts the topic partition and stores incoming messages.
- **Topic A**: Contains sequentially-offset messages starting from 0.
- **Consumer Group**: One or more consumers that share the load.
- **Consumer**: Reads messages, processes them (e.g., writes to a commission database), and commits offsets.

![The image illustrates Kafka offset management, showing a broker with a topic partition and a consumer group with a consumer and a commission database. It highlights the current and committed offsets in the data flow.](https://kodekloud.com/kk-media/image/upload/v1752874679/notes-assets/images/Event-Streaming-with-Kafka-Offset-Management-in-Kafka/kafka-offset-management-diagram.jpg)

## Handling Consumer Failures

If a consumer crashes after processing offset 3, a new consumer (consumer-2) must resume at offset 4 to avoid duplicate entries or data loss. On startup, consumer-2 fetches the last committed offset (3) and continues seamlessly.

![The image illustrates Kafka offset management, showing a broker with a topic partition and a consumer group with a consumer reading from a specific offset, storing data in a commission database.](https://kodekloud.com/kk-media/image/upload/v1752874680/notes-assets/images/Event-Streaming-with-Kafka-Offset-Management-in-Kafka/kafka-offset-management-broker-consumer.jpg)

## Detailed Offset Tracking

Kafka itself doesn’t track offsets for users; consumers do. As records are processed, the consumer updates its highest processed offset. At configurable intervals or trigger points, the consumer commits that offset to a special internal topic (`__consumer_offsets`).

![The image illustrates Kafka offset management and tracking, showing how consumer offsets track the position of each consumer within a partition. It includes a diagram with committed offsets, reads, and a consumer from a consumer group.](https://kodekloud.com/kk-media/image/upload/v1752874681/notes-assets/images/Event-Streaming-with-Kafka-Offset-Management-in-Kafka/kafka-offset-management-diagram-2.jpg)

> [!important]
> **Note**
>
> Offset commits occur to the `__consumer_offsets` topic by default. You can customize the commit interval with the `auto.commit.interval.ms` consumer setting.

## Offset Persistence Strategies

You can choose between automatic and manual offset commits depending on your fault-tolerance and performance needs.

![The image illustrates Kafka offset management and persistence, showing a consumer committing an offset to Kafka to ensure fault tolerance and prevent message loss or duplication.](https://kodekloud.com/kk-media/image/upload/v1752874682/notes-assets/images/Event-Streaming-with-Kafka-Offset-Management-in-Kafka/kafka-offset-management-persistence-diagram.jpg)

![The image compares Kafka offset management between automatic and manual commits, highlighting pros and cons such as management simplicity and control over processing.](https://kodekloud.com/kk-media/image/upload/v1752874683/notes-assets/images/Event-Streaming-with-Kafka-Offset-Management-in-Kafka/kafka-offset-management-comparison.jpg)

| Commit Type       | Pros                  | Cons                                          |
| ----------------- | --------------------- | --------------------------------------------- |
| Automatic Commits | Less boilerplate code | Potential data loss or duplication on failure |
| Manual Commits    | Precise control       | Requires additional error handling logic      |

### Code Example: Manual Offset Commit

```
// Process records...
consumer.commitSync();  // Blocks until the broker acknowledges the offset
```

> [!important]
> **Warning**
>
> With **automatic commits**, if a consumer fails between fetching records and committing offsets, you may reprocess or skip messages. Use manual commits when you need exact control.

## Consumer Group Rebalancing

When consumers join or leave a group, Kafka reassigns partitions among the active members. During rebalancing, each consumer retrieves the last committed offsets for its new partitions to avoid reprocessing or data loss.

Consider a topic with four partitions and two consumers:

| State          | Consumer 1                          | Consumer 2       |
| -------------- | ----------------------------------- | ---------------- |
| Before Failure | Partitions 0 & 3                    | Partitions 1 & 2 |
| After Failure  | Partitions 0, 1, 2 & 3 (reassigned) | —                |

![The image illustrates Kafka offset management and rebalancing, showing how partitions are distributed between two consumers in a consumer group. It highlights the dynamic adjustment process when consumers join or leave the group.](https://kodekloud.com/kk-media/image/upload/v1752874685/notes-assets/images/Event-Streaming-with-Kafka-Offset-Management-in-Kafka/kafka-offset-management-rebalancing.jpg)

## Conclusion

Robust offset management is the backbone of reliable Kafka applications. By tracking and committing offsets—either automatically or manually—you ensure that your consumers can recover gracefully and process each message exactly once or at least once, based on your requirements.

## References

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [Kafka Consumer Configs](https://kafka.apache.org/documentation/#consumerconfigs)
- [Understanding Consumer Offsets](https://www.confluent.io/blog/kafka-consumer-offsets-explained/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/9aa104e8-faa5-4099-977f-71744306b99d/lesson/b1ca29ee-c83a-4f6e-8dc2-ef8d5fa17003)**
>
> Watch video content
