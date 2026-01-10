# Demo Creating First Topic in Kafka - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Foundations-of-Event-Streaming/Demo-Creating-First-Topic-in-Kafka)

---

## Table of Contents

- Demo Creating First Topic in Kafka
  - 1. Creating a Topic via the Kafka UI
  - 2. Verifying Your Topic
  - 3. (Optional) Creating a Topic via CLI
  - Next Steps
  - Watch Video
    - Why These Settings Matter

---

## Content

Event Streaming with Kafka

Foundations of Event Streaming

# Demo Creating First Topic in Kafka

In this tutorial, you’ll learn how to create an Apache Kafka topic using the Kafka UI. A **topic** in Kafka is a named stream where related events are stored—a logical channel for appending and reading records. By the end of this lesson, you’ll have a topic named `kafka-lab` ready for producers and consumers.

> [!important]
> **Prerequisites**
>
> - A running Kafka cluster (e.g., via Docker).
> - Kafka UI configured and accessible.
> - [Apache Kafka Documentation](https://kafka.apache.org/documentation/) for deeper reference.

## 1\. Creating a Topic via the Kafka UI

1.  In the Kafka UI sidebar, select **Topics**.
2.  Click **Add a topic**.
3.  Enter **Topic name**: `kafka-lab`> [!important]
    > **Warning**
    >
    > Topic names **cannot** contain spaces or special characters. Use hyphens (`-`) or underscores (`_`) to separate words.
4.  Configure the following options:
    - **Number of partitions**: `1`
    - **Message retention**: `7 days`
5.  Leave the remaining settings at their defaults and click **Create topic**.

![The image shows a user interface for creating a new topic in Apache Kafka, with fields for topic name, number of partitions, cleanup policy, and other configuration options.](https://kodekloud.com/kk-media/image/upload/v1752874708/notes-assets/images/Event-Streaming-with-Kafka-Demo-Creating-First-Topic-in-Kafka/apache-kafka-new-topic-ui.jpg)

### Why These Settings Matter

| Configuration        | Purpose                                         | Example Impact                      |
| -------------------- | ----------------------------------------------- | ----------------------------------- |
| Number of partitions | Parallelism & distribution across brokers       | More partitions = higher throughput |
| Message retention    | Duration Kafka retains messages before deletion | 7 days = temporary event storage    |

## 2\. Verifying Your Topic

After creation, you can confirm the topic details in the UI:

![The image shows a user interface for Apache Kafka, displaying details of a topic named "kafka-lab" with information on partitions, replication factor, and message count.](https://kodekloud.com/kk-media/image/upload/v1752874709/notes-assets/images/Event-Streaming-with-Kafka-Demo-Creating-First-Topic-in-Kafka/apache-kafka-user-interface-kafka-lab.jpg)

This overview displays:

- **Partitions**: How many shards the topic is split into.
- **Replication factor**: Number of copies for fault tolerance.
- **Message count**: Total events stored so far.

## 3\. (Optional) Creating a Topic via CLI

For automation or scripting, use the `kafka-topics.sh` tool:

```
bin/kafka-topics.sh \
  --create \
  --topic kafka-lab \
  --bootstrap-server localhost:9092 \
  --partitions 1 \
  --replication-factor 1 \
  --config retention.ms=$((7*24*60*60*1000))
```

This command mirrors the UI settings: one partition, one replica, and a seven-day retention period.

## Next Steps

- Produce and consume messages with [`kafka-console-producer.sh`](https://kafka.apache.org/documentation/#producerapi) and [`kafka-console-consumer.sh`](https://kafka.apache.org/documentation/#consumerapi).
- Monitor topic metrics in the Kafka UI or [Prometheus](https://prometheus.io/).
- Explore advanced topic configurations in the [Kafka topic configuration reference](https://kafka.apache.org/documentation/#topicconfigs).

That’s it for setting up your first Kafka topic! Proceed to the next lesson to start streaming data.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/2359e80d-66f6-4080-8e9c-d81a6a1600fe/lesson/487502d1-6cf4-427f-b73e-b5a37f8e4ba8)**
>
> Watch video content
