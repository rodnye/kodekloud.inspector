# Consumer Rebalancing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Kafka-Producers-Consumers-The-Message-Flow/Consumer-Rebalancing)

---

## Table of Contents

- Consumer Rebalancing
  - How Consumer Rebalancing Works
  - Eager vs. Cooperative Rebalancing Protocols
  - Rebalance Triggers and Group Membership
  - Best Practices
  - References
  - Watch Video

---

## Content

Event Streaming with Kafka

Kafka Producers Consumers The Message Flow

# Consumer Rebalancing

In this article, we explore **Kafka consumer rebalancing**, a core feature that ensures continuous, balanced message processing in distributed systems.

Imagine a Kafka cluster with four brokers (1, 2, 3, 4) running a topic named **topic A**, which has four partitions. A consumer group with four consumers processes one partition per instance. If `consumer-4` fails, partition 4 stops receiving messages, potentially blocking critical data streams, such as payment transactions.

> [!important]
> **Warning**
>
> A stalled partition in a payment system can cause transaction delays or data inconsistencies. Ensure you configure rebalancing parameters appropriately.

## How Consumer Rebalancing Works

When a consumer joins or leaves the group, Kafka triggers a rebalance:

1.  **Consumption Pause**  
    All active consumers halt message processing.
2.  **Partition Reassignment**  
    Kafka redistributes partitions to achieve an even workload.
3.  **Resuming Consumption**  
    Consumers resume processing with their new assignments.

![The image illustrates Kafka consumer rebalancing, showing how partitions from different brokers are distributed among consumers in a consumer group.](https://kodekloud.com/kk-media/image/upload/v1752874742/notes-assets/images/Event-Streaming-with-Kafka-Consumer-Rebalancing/kafka-consumer-rebalancing-partitions.jpg)

## Eager vs. Cooperative Rebalancing Protocols

Kafka offers two protocols for partition reallocation:

| Protocol    | Behavior                                                       | Use Case                                   |
| ----------- | -------------------------------------------------------------- | ------------------------------------------ |
| Eager       | Revokes and reassigns all partitions at once.                  | Simple logic, but longer processing pause. |
| Cooperative | Incrementally revokes/assigns partitions for minimal downtime. | Low-latency environments.                  |

## Rebalance Triggers and Group Membership

Rebalancing occurs upon:

- **Consumer Failure**: Unexpected crashes or network partitions.
- **Consumer Join**: Scaling out with new instances.
- **Consumer Shutdown**: Graceful or forced termination.

> [!important]
> **Note**
>
> Kafka’s consumer rebalancing guarantees **at-least-once delivery**, preventing data loss or duplication during assignments.

![The image explains "Consumer Rebalancing" in Kafka, highlighting three aspects: Partition Reassignment, Group Membership Change, and Consumption Pause.](https://kodekloud.com/kk-media/image/upload/v1752874743/notes-assets/images/Event-Streaming-with-Kafka-Consumer-Rebalancing/consumer-rebalancing-kafka-diagram.jpg)

## Best Practices

- Adjust `session.timeout.ms` and `heartbeat.interval.ms` for faster failure detection.
- Prefer the **cooperative** protocol for latency-sensitive applications.
- Monitor consumer lag with tools like [Kafka Monitor](https://github.com/linkedin/kafka-monitor) or Confluent Control Center.

## References

- [Kafka Consumer Group Management](https://kafka.apache.org/documentation/#consumerconfigs)
- [Understanding Kafka Partition Assignment](https://www.confluent.io/blog/kafka-fastest-messaging-system/)
- [Kafka Official Documentation](https://kafka.apache.org/documentation)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/25a81d98-c284-444b-b64d-6141e562d17d/lesson/0c31d3f3-91dd-4aed-93e8-328dc02f2226)**
>
> Watch video content
