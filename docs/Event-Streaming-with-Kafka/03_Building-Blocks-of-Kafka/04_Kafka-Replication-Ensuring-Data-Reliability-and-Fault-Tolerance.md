# Kafka Replication Ensuring Data Reliability and Fault Tolerance - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Building-Blocks-of-Kafka/Kafka-Replication-Ensuring-Data-Reliability-and-Fault-Tolerance)

---

## Table of Contents

- Kafka Replication Ensuring Data Reliability and Fault Tolerance
  - Example: EV Charging Network
  - Why Replication Matters
  - Replication in Action
  - Conclusion
  - References
  - Watch Video
    - Topic Creation Example

---

## Content

Event Streaming with Kafka

Building Blocks of Kafka

# Kafka Replication Ensuring Data Reliability and Fault Tolerance

Welcome back! In the previous lesson, we explored how partitions enable high availability in Apache Kafka. Now, we’ll dive into replication, Kafka’s key mechanism for data durability and fault tolerance.

## Example: EV Charging Network

Consider an EV charging network where each charging station publishes events—status updates, metrics, and more—to two topics:

- `charging-station-topic`
- `station-metrics-topic`

Your monitoring dashboards consume from `station-metrics-topic` to display live station status.

> [!important]
> **Note**
>
> In this example, we assume three brokers (`broker1`, `broker2`, `broker3`) and three partitions per topic.

### Topic Creation Example

```
bin/kafka-topics.sh --create \
  --topic charging-station-topic \
  --partitions 3 \
  --replication-factor 1 \
  --bootstrap-server broker1:9092
```

Initially, if the replication factor is `1`, each partition only exists on a single broker.

Imagine broker2 fails. The partition it hosts becomes unavailable, and dashboards go dark.

![The image illustrates Kafka replication for ensuring data reliability and fault tolerance, showing how data from multiple stations is partitioned across different brokers and consumed for live status updates of charging stations.](https://kodekloud.com/kk-media/image/upload/v1752874645/notes-assets/images/Event-Streaming-with-Kafka-Kafka-Replication-Ensuring-Data-Reliability-and-Fault-Tolerance/kafka-replication-data-reliability-diagram.jpg)

> [!important]
> **Warning**
>
> Without replication, any single broker failure leads to data unavailability for the partitions it hosts.

## Why Replication Matters

Replication copies each partition across multiple brokers. This ensures:

| Benefit              | Description                                                                            |
| -------------------- | -------------------------------------------------------------------------------------- |
| High Availability    | On broker failure, an in-sync replica is promoted to leader automatically.             |
| Fault Tolerance      | Multiple copies prevent data loss if a broker crashes or hardware fails.               |
| Scalability          | Consumers can read from replicas, distributing the load and improving read throughput. |
| Data Durability      | Messages are only acknowledged to producers once written to all in-sync replicas.      |
| Increased Throughput | Parallel reads and writes across replicas boost overall system throughput.             |

![The image explains Kafka's high availability using replication and partitions, highlighting benefits such as high availability, fault tolerance, scalability, and data durability.](https://kodekloud.com/kk-media/image/upload/v1752874646/notes-assets/images/Event-Streaming-with-Kafka-Kafka-Replication-Ensuring-Data-Reliability-and-Fault-Tolerance/kafka-high-availability-replication-partitions.jpg)

## Replication in Action

Let’s update our topic to use a replication factor of 3:

```
bin/kafka-topics.sh --alter \
  --topic charging-station-topic \
  --replication-factor 3 \
  --bootstrap-server broker1:9092
```

For **partition 1**, Kafka will assign:

- Leader on `broker1`
- Followers on `broker2` and `broker3`

1.  **Broker Failure (Non-Leader):**  
    If `broker3` goes offline, the partition continues serving reads/writes from the leader and the remaining in-sync follower. Kafka will automatically replicate to restore the desired replication factor.
2.  **Leader Failure:**  
    If `broker1` (leader) fails, one of the in-sync followers (e.g., `broker2`) is elected leader. Producers and consumers transparently reconnect, minimizing downtime.

## Conclusion

By combining partitioning with replication, Apache Kafka delivers a robust, fault-tolerant streaming platform that guarantees data reliability and high availability. Stay tuned for more Kafka deep dives!

## References

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [Kafka Topic Configuration](https://kafka.apache.org/documentation/#topicconfigs)
- [Replication in Apache Kafka](https://kafka.apache.org/documentation/#basic_ops_replication)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/ee6ed9ab-202a-4dfc-bcd5-8a6941e1440b/lesson/5047c311-c819-4910-9c6d-a6e404b0795a)**
>
> Watch video content
