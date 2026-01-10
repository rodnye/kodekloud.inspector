# Demo Topics Partitions and Brokers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Building-Blocks-of-Kafka/Demo-Topics-Partitions-and-Brokers)

---

## Table of Contents

- Demo Topics Partitions and Brokers
  - 1. Exploring the Kafka Installation
  - 2. Creating a Simple Topic
  - 3. Creating a Partitioned and Replicated Topic
  - 4. Describing a Topic via CLI
  - 5. Altering Topic Configuration
  - 6. Listing Brokers in the Cluster
  - Links and References
  - Watch Video

---

## Content

Event Streaming with Kafka

Building Blocks of Kafka

# Demo Topics Partitions and Brokers

Welcome to this hands-on tutorial where you'll learn how to manage **topics**, **partitions**, and **brokers** in Apache Kafka. By the end of this lesson, you’ll know how to create topics with custom partitions and replication, inspect topic metadata, and update topic configurations.

## 1\. Exploring the Kafka Installation

Begin by navigating to your Kafka home directory and listing its contents:

```
cd /root/kafka/
ls -l
```

You should see:

```
NOTICE  LICENSE  Licenses/  config/  bin/  site-docs/  libs/  logs/  kafka.log
```

All command-line utilities are located in `bin/`:

```
cd bin/
ls -l
```

| Script                       | Purpose                               |
| ---------------------------- | ------------------------------------- |
| kafka-topics.sh              | Create, list, and delete topics       |
| kafka-console-producer.sh    | Publish messages to a topic           |
| kafka-console-consumer.sh    | Consume messages from a topic         |
| kafka-configs.sh             | Alter configuration of brokers/topics |
| kafka-broker-api-versions.sh | List broker API versions              |

## 2\. Creating a Simple Topic

To create a topic named `demo_topic`, run:

```
./kafka-topics.sh \
  --create \
  --topic demo_topic \
  --bootstrap-server localhost:9092
```

You may see a metrics warning, but the topic will be created successfully:

```
Created topic demo_topic.
```

> [!important]
> **Note**
>
> You can verify the new topic in the [Kafdrop UI](https://github.com/obsidiandynamics/kafdrop) under **Topics**. By default, a new topic has 1 partition and a replication factor of 1.

## 3\. Creating a Partitioned and Replicated Topic

Partitions enable parallel message processing, while replication provides fault tolerance. In production, set partitions to match your consumer groups and replication factor to at least 2 or 3.

> [!important]
> **Warning**
>
> A low replication factor (e.g., 1) has no redundancy. If the single broker fails, data becomes unavailable.

Create a topic named `partitioned_topic` with 3 partitions and a replication factor of 1:

```
./kafka-topics.sh \
  --create \
  --topic partitioned_topic \
  --partitions 3 \
  --replication-factor 1 \
  --bootstrap-server localhost:9092
```

Verify the topic settings in the Kafdrop UI:

![The image shows a Kafdrop interface displaying a Kafka Cluster Overview, including details about brokers, topics, and partitions. It lists two brokers and two topics with their respective partition information.](https://kodekloud.com/kk-media/image/upload/v1752874639/notes-assets/images/Event-Streaming-with-Kafka-Demo-Topics-Partitions-and-Brokers/kafdrop-kafka-cluster-overview.jpg)

Click on **partitioned_topic** to view leader assignments and replica distribution.

## 4\. Describing a Topic via CLI

To inspect partition details, use:

```
./kafka-topics.sh \
  --describe \
  --topic partitioned_topic \
  --bootstrap-server localhost:9092
```

Sample output:

```
Topic: partitioned_topic  PartitionCount: 3  ReplicationFactor: 1  Configs: segment.bytes=1073741824
  Partition: 0  Leader: 1  Replicas: 1  Isr: 1
  Partition: 1  Leader: 0  Replicas: 1  Isr: 0
  Partition: 2  Leader: 1  Replicas: 1  Isr: 1
```

## 5\. Altering Topic Configuration

Adjust the retention period for `partitioned_topic` to 48 hours (172,800,000 ms):

```
./kafka-configs.sh \
  --bootstrap-server localhost:9092 \
  --entity-type topics \
  --entity-name partitioned_topic \
  --alter \
  --add-config retention.ms=172800000
```

You’ll see:

```
Completed updating config for topic partitioned_topic.
```

Confirm the update in the Kafdrop UI:

![The image shows a Kafdrop interface displaying details of a Kafka topic named "partitioned_topic," including an overview of partitions, configuration settings, and partition details.](https://kodekloud.com/kk-media/image/upload/v1752874640/notes-assets/images/Event-Streaming-with-Kafka-Demo-Topics-Partitions-and-Brokers/kafdrop-partitioned-topic-overview.jpg)

Or re-run the describe command and verify `Configs: retention.ms=172800000`.

## 6\. Listing Brokers in the Cluster

To view the broker API versions and ensure your brokers are reachable:

```
./kafka-broker-api-versions.sh \
  --bootstrap-server localhost:9092
```

This command lists supported Kafka API versions for each broker.

---

Next up: configuring **producers** and **consumers** for message publishing and consumption.

## Links and References

- [Apache Kafka Official Documentation](https://kafka.apache.org/documentation/)
- [Kafdrop GitHub Repository](https://github.com/obsidiandynamics/kafdrop)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/ee6ed9ab-202a-4dfc-bcd5-8a6941e1440b/lesson/8c70b1fb-467f-4b96-8bc5-c05ee4c2e5af)**
>
> Watch video content
