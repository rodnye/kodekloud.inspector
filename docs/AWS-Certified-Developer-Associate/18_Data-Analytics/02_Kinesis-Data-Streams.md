# Kinesis Data Streams - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Data-Analytics/Kinesis-Data-Streams)

---

## Table of Contents

- Kinesis Data Streams
  - Architecture Overview
  - Data Flow: Producers and Consumers
  - Partition Keys and Shard Distribution
  - Consuming Data: Classic vs. Enhanced Fan-Out
  - The Kinesis Client Library (KCL)
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Data Analytics

# Kinesis Data Streams

This guide explores Amazon Kinesis Data Streams—a powerful streaming data service engineered to capture, process, and store data at scale. Think of it as a continuously flowing pipeline where producers inject data and consumers extract and process it efficiently.

## Architecture Overview

At the heart of the system is the Kinesis Data Stream acting as a conduit for data. Applications using the Kinesis Client Library (KCL), IoT devices, or other SDK-enabled producers send records into the stream. Consumers—ranging from AWS Lambda functions and SDK-based applications to ECS tasks—read and process the records. Notably, records can be retained for up to 365 days.

![The image illustrates the architecture of Amazon Kinesis Data Streams, showing the flow of records from producers to consumers. It includes icons representing various producer and consumer types, connected through the Kinesis data stream.](https://kodekloud.com/kk-media/image/upload/v1752858615/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Data-Streams/amazon-kinesis-data-streams-architecture.jpg)

When setting up a Kinesis Data Stream, you can choose one of two capacity modes:

1.  **On-Demand Mode:**  
    With no requirement for capacity planning, Kinesis automatically scales to meet demand without needing manual shard management.
2.  **Provisioned Mode:**  
    Here, you explicitly set the number of shards. The stream’s overall capacity is the sum of its individual shard capacities. You may adjust the shard count based on your changing data volumes.

![The image compares two Kinesis capacity modes: "On-demand," which auto-scales without capacity planning, and "Provisioned," where the number of shards must be specified.](https://kodekloud.com/kk-media/image/upload/v1752858616/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Data-Streams/kinesis-capacity-modes-comparison.jpg)

## Data Flow: Producers and Consumers

Data flows into the Kinesis stream in the following sequence:

- **Producers** send records using the PutRecord API.
- Each record includes a partition key along with up to 1 MB of data. The partition key is hashed to determine which shard receives the record.
- A shard’s throughput is limited to 1 MB per second or 1,000 messages per second.

On the consumer side:

- Consumers retrieve records via the GetRecords API (classic pull-based model) or use the SubscribeToShard API (enhanced push-based model).
- In the shared (classic fan-out) mode, all consumers share a total throughput of 2 MB per shard.
- With enhanced fan-out, every consumer gets an individual throughput of 2 MB per shard, providing improved scalability.

![The image illustrates the architecture of Amazon Kinesis Data Streams, showing the flow of data from producers to consumers through shards, with details on partition keys, data limits, and throughput.](https://kodekloud.com/kk-media/image/upload/v1752858618/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Data-Streams/amazon-kinesis-data-streams-architecture-2.jpg)

## Partition Keys and Shard Distribution

When multiple devices (e.g., cameras) transmit telemetry or video data, each device’s identifier can serve as an effective partition key. For instance, in a data stream with three shards:

- A camera with an ID of 120 might be directed to shard one.
- A camera with an ID of 320 could end up on shard one or two, depending on the hash.
- A camera with an ID of 550 might be routed to shard three.

![The image illustrates a data flow process using Amazon Kinesis Data Streams, where data from producers is hashed and distributed across multiple shards.](https://kodekloud.com/kk-media/image/upload/v1752858618/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Data-Streams/amazon-kinesis-data-flow-process.jpg)

Selecting a partition key with sufficient entropy is vital. A limited set of keys can lead to "hot partitions"—shards overloaded beyond their throughput limits (1 MB/s or 1,000 messages/s).

> [!important]
> **Tip**
>
> Choose partition keys that evenly distribute data across shards to avoid hot partitions.

If a shard becomes overwhelmed, consider these strategies:

- Use exponential backoff for retries.
- Split an overburdened shard.
- Merge underutilized shards to optimize cost.

![The image provides three tips for managing Kinesis hot partitions: avoiding shard limits, ensuring partition key entropy, and using exponential backoff for retries.](https://kodekloud.com/kk-media/image/upload/v1752858619/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Data-Streams/kinesis-hot-partitions-tips.jpg)

![The image is a slide titled "Kinesis Hot Partition" with two points: one about shard splitting and the other about merging underused shards to save costs.](https://kodekloud.com/kk-media/image/upload/v1752858620/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Data-Streams/kinesis-hot-partition-shard-splitting.jpg)

## Consuming Data: Classic vs. Enhanced Fan-Out

Consumers of Kinesis Data Streams can operate in two distinct modes:

1.  **Classic Fan-Out (Shared Mode):**  
    In this mode, all consumers share the available throughput of 2 MB/s per shard. For example, two consumers on a shard may each get up to 1 MB/s if both are active, and the total bandwidth is divided as more consumers join.

![The image illustrates a "Classic Fan-Out Consumer" model for Amazon Kinesis Data Streams, showing data being distributed from three shards to two consumers at 1 MB/s each, with a total of 2 MB/s per shard shared across all consumers.](https://kodekloud.com/kk-media/image/upload/v1752858622/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Data-Streams/classic-fan-out-consumer-kinesis.jpg)

2.  **Enhanced Fan-Out:**  
    Each consumer receives an exclusive throughput of 2 MB/s per shard. This is enabled by the SubscribeToShard API, allowing each consumer to process data at a high rate regardless of how many consumers are attached.

![The image illustrates the Enhanced Fan-Out Consumer model for Amazon Kinesis Data Streams, showing multiple consumers subscribing to shards with a data rate of 2 MB/s per shard per consumer.](https://kodekloud.com/kk-media/image/upload/v1752858623/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Data-Streams/enhanced-fan-out-consumer-kinesis.jpg)

## The Kinesis Client Library (KCL)

The Kinesis Client Library (KCL) simplifies the development of consumers by abstracting common tasks such as:

- Automatic recovery from consumer failures.
- Checkpointing to track progress using DynamoDB.
- Supporting resharding events to ensure smooth data consumption.

![The image is a diagram illustrating the Kinesis Client Library (KCL) with three functions: handling consumer failures, handling resharding, and checkpointing processed records using DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752858624/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Data-Streams/kinesis-client-library-diagram.jpg)

KCL is flexible and can run on platforms like EC2, on-premises, or Elastic Beanstalk. However, note that only one instance of the KCL can run per shard:

- With 2 shards, you can run a maximum of 2 KCL instances.
- With 7 shards, you are limited to 7 instances.

For example, if a data stream has two shards, two KCL instances can operate concurrently—each reading from a different shard and maintaining checkpoints in DynamoDB. Scaling the number of shards requires a corresponding increase in KCL instances to maintain optimal performance.

![The image illustrates the Kinesis Client Library (KCL) architecture, showing two shards connected to KCL instances, which in turn connect to a checkpoint system.](https://kodekloud.com/kk-media/image/upload/v1752858625/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Data-Streams/kinesis-client-library-architecture.jpg)

## Summary

Amazon Kinesis Data Streams enables real-time data ingestion, processing, and analysis, making it an ideal solution for log aggregation, real-time metrics, and IoT telemetry applications. Key takeaways include:

- Producers send records using the PutRecord API, with records containing partition keys and up to 1 MB of data.
- Each shard supports a throughput of 1 MB/s or 1,000 messages/s.
- Proper selection and management of partition keys are vital to avoid hot partitions.
- Hot partitions can be mitigated through exponential backoff, shard splitting, or merging underutilized shards.
- In classic fan-out mode, consumers share a 2 MB/s throughput per shard, whereas enhanced fan-out mode allocates 2 MB/s per consumer per shard.
- The Kinesis Client Library automates consumer management, checkpointing, and resharding, with a one-instance-per-shard limitation.

![The image is a summary of key points related to Kinesis data streams, including shard management, consumer throughput, and the use of the Kinesis Client Library.](https://kodekloud.com/kk-media/image/upload/v1752858626/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Data-Streams/kinesis-data-streams-summary.jpg)

Understanding these concepts will empower you to design and optimize your Kinesis Data Streams implementations effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/ac3fe785-4e7a-4f57-ae16-99fcd3cfde7e/lesson/9b13028b-a172-43dc-b6ae-b3e45d4aa7b9)**
>
> Watch video content
