# What is a Kafka Consumer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Kafka-Producers-Consumers-The-Message-Flow/What-is-a-Kafka-Consumer)

---

## Table of Contents

- What is a Kafka Consumer
  - Role of an Apache Kafka Consumer
  - Connecting Your Consumer to Kafka
  - Key Features of Kafka Consumers
  - Pull Architecture & Speed Management
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Event Streaming with Kafka

Kafka Producers Consumers The Message Flow

# What is a Kafka Consumer

In Apache Kafka, **consumers** are the applications or services that subscribe to Kafka topics and process the incoming event streams. While **producers** push data into Kafka, consumers retrieve and act on those records—updating displays, triggering workflows, or writing results to other systems.

## Role of an Apache Kafka Consumer

A Kafka consumer’s primary responsibilities include:

- Subscribing to one or more topics.
- Continuously polling brokers for new records.
- Processing the payload (e.g., updating a database or UI).
- Triggering downstream actions or alerts.

Consider an EV charging station scenario:  
When a vehicle arrives, the station’s sensor sends an “occupied” event to Kafka. A consumer listening on that topic picks up the message and updates the mobile app in real time, reducing the available charger count.

> [!important]
> **Warning**
>
> Apache Kafka is optimized for event streaming with configurable retention policies. It is **not** intended as a long-term or archival database.

## Connecting Your Consumer to Kafka

To start consuming events, configure these core settings:

| Configuration       | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `bootstrap.servers` | Broker addresses for establishing connections        |
| `group.id`          | Consumer group identifier for load-balanced fetching |
| `topics`            | One or more Kafka topics to subscribe and poll       |

Once configured, your consumer will:

1.  Join the specified consumer group.
2.  Fetch assigned partitions.
3.  Poll each partition in offset order—never deleting data, only reading it.

> [!important]
> **Note**
>
> You can reset consumer offsets to replay historical data if it’s still within Kafka’s retention window.

## Key Features of Kafka Consumers

| Feature                | Description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| Sequential Access      | Reads records in offset order within a partition—guaranteeing strict order. |
| Partition Independence | Processes partitions in parallel; ordering only applies per partition.      |
| Historical Control     | Supports offset resets to replay events, subject to retention policies.     |

![The image describes three features of a Kafka Consumer: Sequential Access, Partition Independence, and Historical Control, each with a brief explanation.](/images/Event-Streaming-with-Kafka-Consumer-What-is-a-Kafka-Consumer/kafka-consumer-features-diagram.jpg)

## Pull Architecture & Speed Management

Kafka’s consumer model is **pull-based**: consumers request batches of messages from brokers, giving fine-grained control over:

- **Throughput**: adjust `max.poll.records` or batch size.
- **Latency**: tune polling intervals and timeouts.
- **Back-pressure**: throttle fetch requests to match processing speed.

![The image is an infographic about Kafka Consumer, highlighting "Pull Architecture" and "Speed Management" with brief descriptions of each concept.](/images/Event-Streaming-with-Kafka-Consumer-pull-architecture-infographic.jpg)

By pulling data on demand, consumers avoid overload and align ingestion with processing capacity.

---

## Next Steps

In the next section, we’ll walk through setting up a Kafka consumer client in code and demonstrate consuming messages from your topic.

## Links and References

- [Apache Kafka](https://kafka.apache.org/)
- [Kafka Consumer API](https://kafka.apache.org/23/javadoc/index.html?org/apache/kafka/clients/consumer/KafkaConsumer.html)
- [Kafka Documentation](https://kafka.apache.org/documentation/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/25a81d98-c284-444b-b64d-6141e562d17d/lesson/6a37c911-e3fd-48eb-a45a-4f2cb15556c1)**
>
> Watch video content
