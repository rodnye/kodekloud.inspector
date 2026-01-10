# Streaming data from Kafka to other systems - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Kafka-Connect-Effortless-Data-Pipelines/Streaming-data-from-Kafka-to-other-systems)

---

## Table of Contents

- Streaming data from Kafka to other systems
  - Why Kafka Alone Isn't Enough
  - Offloading Event Data for Long-Term Analysis
  - Introducing Kafka Connect
  - Key Benefits of Kafka Connect
  - Getting Started with an S3 Sink Connector
  - Links and References
  - Watch Video

---

## Content

Event Streaming with Kafka

Kafka Connect Effortless Data Pipelines

# Streaming data from Kafka to other systems

In this guide, we'll explore how Kafka Connect simplifies building robust data pipelines between Kafka and external systems. You’ll learn why Connect is essential for achieving scalable, fault-tolerant, real-time streaming and how to configure an S3 sink connector to offload event data for long-term analysis.

## Why Kafka Alone Isn't Enough

Apache Kafka excels at streaming high-throughput, low-latency data. Think of it as a conveyor belt for events—but it’s not designed for indefinite storage or complex querying. Kafka enforces retention policies (by time or size) to purge old records, and it lacks built-in indexing and archiving.

> [!important]
> **Warning**
>
> If you rely on Kafka for long-term storage without offloading data, retention policies will delete older events, leading to irreversible data loss.

Consider a shopping app that publishes click and checkout events to a Kafka topic named `events`. You might monitor real-time cart activity on a dashboard, but what happens when you need weeks or months of historical data?

![The image illustrates a data flow from a shopping application to a Kafka events topic, which then streams data to monitor cart checkout events. It highlights Kafka's role in real-time streaming and mentions retention policies for auto-deleting old data.](https://kodekloud.com/kk-media/image/upload/v1752874733/notes-assets/images/Event-Streaming-with-Kafka-Streaming-data-from-Kafka-to-other-systems/shopping-app-kafka-data-flow.jpg)

## Offloading Event Data for Long-Term Analysis

To retain complete event history and perform trend analysis, archive or index records in a system built for long-term storage. Common targets include relational databases or object stores like [Amazon S3](https://aws.amazon.com/s3), which integrate with analytics engines such as [Athena](https://aws.amazon.com/athena/) or [BigQuery](https://cloud.google.com/bigquery/).

![The image illustrates the process of streaming data from Kafka to other systems, highlighting Kafka's limitations in real-time processing and the advantages of databases for long-term analysis.](https://kodekloud.com/kk-media/image/upload/v1752874734/notes-assets/images/Event-Streaming-with-Kafka-Streaming-data-from-Kafka-to-other-systems/kafka-data-streaming-process-diagram.jpg)

## Introducing Kafka Connect

Kafka Connect is a dedicated service for streaming data between Kafka and external systems using reusable connector plugins. It can run on-premises, in VMs, containers, or Kubernetes. You scale Connect workers independently from your Kafka brokers, ensuring separation of concerns.

![The image is a flowchart illustrating the process of streaming data from a Kafka topic to other systems, including a shopping application, a cart checkout event monitor, and an S3 bucket for long-term storage.](https://kodekloud.com/kk-media/image/upload/v1752874736/notes-assets/images/Event-Streaming-with-Kafka-Streaming-data-from-Kafka-to-other-systems/kafka-data-streaming-flowchart.jpg)

> [!important]
> **Note**
>
> Kafka Connect supports both source connectors (ingesting data into Kafka) and sink connectors (exporting data from Kafka). Choose from a rich ecosystem of prebuilt plugins or build your own.

## Key Benefits of Kafka Connect

| Benefit             | Description                                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Scalability         | Run connectors in a distributed cluster that you can scale horizontally.                                                                      |
| Fault Tolerance     | Tasks automatically handle failures and resume from the last committed offset.                                                                |
| Extensibility       | Extendable via a large ecosystem of prebuilt connectors for databases, cloud storage, and more.                                               |
| Real-Time Streaming | Delivers data in near-real time to analytics tools such as [QuickSight](https://aws.amazon.com/quicksight/) and [Looker](https://looker.com). |

![The image outlines the benefits of streaming data from Kafka to other systems, highlighting scalability, fault tolerance, extensibility, and real-time streaming. Each benefit is accompanied by a brief description and an icon.](https://kodekloud.com/kk-media/image/upload/v1752874737/notes-assets/images/Event-Streaming-with-Kafka-Streaming-data-from-Kafka-to-other-systems/kafka-streaming-data-benefits-diagram.jpg)

## Getting Started with an S3 Sink Connector

1.  **Deploy Kafka Connect Cluster**  
    Launch Connect workers in your environment (bare metal, container, or Kubernetes).
2.  **Install the S3 Sink Plugin**

    ```
    confluent-hub install confluentinc/kafka-connect-s3:latest
    ```

3.  **Configure the Connector**  
    Create a JSON file (`s3-sink-config.json`):

    ```
    {
      "name": "s3-sink",
      "connector.class": "io.confluent.connect.s3.S3SinkConnector",
      "topics": "events",
      "s3.bucket.name": "my-kafka-events",
      "s3.region": "us-east-1",
      "format.class": "io.confluent.connect.s3.format.json.JsonFormat",
      "storage.class": "io.confluent.connect.s3.storage.S3Storage",
      "flush.size": 1000
    }
    ```

4.  **Start the Connector**

    ```
    curl -X POST -H "Content-Type: application/json" \
      --data '@s3-sink-config.json' \
      http://localhost:8083/connectors
    ```

Once deployed, the S3 sink will continuously batch `events` topic data to your S3 bucket, creating a reliable data lake for analytics.

## Links and References

- [Apache Kafka](https://kafka.apache.org/)
- [Kafka Connect Documentation](https://kafka.apache.org/documentation/#connect)
- [Amazon S3](https://aws.amazon.com/s3)
- [AWS Athena](https://aws.amazon.com/athena/)
- [Google BigQuery](https://cloud.google.com/bigquery)
- [Confluent Hub](https://www.confluent.io/hub/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/68c7ef21-4d7c-405e-8fae-5500f90b82a2/lesson/d8beead0-6a5a-4ca3-976b-bb84f6bf0cb4)**
>
> Watch video content
