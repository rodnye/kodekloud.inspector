# Demo Kafka Connect in Action - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Kafka-Connect-Effortless-Data-Pipelines/Demo-Kafka-Connect-in-Action)

---

## Table of Contents

- Demo Kafka Connect in Action
  - Prerequisites
  - 1. Start the Kafka Console Producer
  - 2. Publish Sample Car Events
  - 3. Verify JSON Files in Amazon S3
  - 4. How It Works
  - Supported Kafka Connectors
  - Watch Video
  - Practice Lab

---

## Content

Event Streaming with Kafka

Kafka Connect Effortless Data Pipelines

# Demo Kafka Connect in Action

In this tutorial, you’ll send JSON events to an Apache Kafka topic and watch Kafka Connect’s S3 sink connector automatically persist them to Amazon S3. This workflow highlights how event streaming architectures offload storage concerns and streamline analytics.

## Prerequisites

- A running Kafka broker and Connect cluster on your EC2 instance
- AWS credentials configured for the S3 sink connector
- An S3 bucket created for storing topic data (e.g., `my-kafka-bucket`)

## 1\. Start the Kafka Console Producer

1.  SSH into the EC2 instance and elevate to root:

    ```
    sudo su
    ```

2.  Navigate to your Kafka installation:

    ```
    cd ~/kafka_2.13-3.0.0
    ```

3.  Launch the console producer for the `cartevent` topic:

    ```
    bin/kafka-console-producer.sh \
      --bootstrap-server 98.81.233.254:9092 \
      --topic cartevent
    ```

## 2\. Publish Sample Car Events

Copy and paste each line below into the producer terminal. Each JSON message represents a single car event:

```
{"eventId":1,"carId":"CAR001","eventType":"SPEED_CHANGE","fuelLevel":65,"timestamp":"2025-02-11T10:00:52Z"}
{"eventId":2,"carId":"CAR002","eventType":"ENGINE_START","timestamp":"2025-02-11T10:01:02Z"}
{"eventId":3,"carId":"CAR006","eventType":"LOW_FUEL","fuelLevel":10,"timestamp":"2025-02-11T10:05:30Z"}
{"eventId":4,"carId":"CAR002","eventType":"LOW_FUEL","fuelLevel":15,"timestamp":"2025-02-11T10:01:30Z"}
{"eventId":5,"carId":"CAR006","eventType":"LOW_FUEL","fuelLevel":10,"timestamp":"2025-02-11T10:05:30Z"}
{"eventId":6,"carId":"CAR008","eventType":"LOW_FUEL","fuelLevel":1,"timestamp":"2025-02-11T10:01:30Z"}
{"eventId":7,"carId":"CAR008","eventType":"LOW_FUEL","fuelLevel":1,"timestamp":"2025-02-11T10:02:30Z"}
{"eventId":8,"carId":"CAR009","eventType":"LOW_FUEL","fuelLevel":2,"timestamp":"2025-02-11T10:03:30Z"}
```

> [!important]
> **Note**
>
> By default, the S3 sink connector flushes records every 5 messages or after a time interval. After sending at least five events, you can immediately verify data landing in S3.

## 3\. Verify JSON Files in Amazon S3

Navigate to the S3 console and open the prefix `topics/cartevent/partition=0/` in your bucket. You should see JSON files named using the convention `topic+partition+startOffset.json`.

![The image shows an Amazon S3 bucket interface with two JSON files listed under the "partition=0" directory. The files are named "cartevent+0+0000000000.json" and "cartevent+0+0000000002.json".](https://kodekloud.com/kk-media/image/upload/v1752874727/notes-assets/images/Event-Streaming-with-Kafka-Demo-Kafka-Connect-in-Action/amazon-s3-bucket-json-files.jpg)

Refreshing after more events produces additional files:

![The image shows an Amazon S3 console with two JSON files listed in a bucket directory named "partition=0/". The files are named "cartevent+0+0000000000.json" and "cartevent+0+0000000002.json".](https://kodekloud.com/kk-media/image/upload/v1752874728/notes-assets/images/Event-Streaming-with-Kafka-Demo-Kafka-Connect-in-Action/amazon-s3-json-files-partition-0.jpg)

## 4\. How It Works

- The **Kafka Connect S3 sink connector** continuously polls the `cartevent` topic.
- Upon reaching the configured batch size or interval, it writes a bulk JSON file to S3.
- Connector handles **offset management**, **retries**, and **error handling** automatically.
- You can query these files directly with [Amazon Athena](https://aws.amazon.com/athena/) or integrate with downstream analytics tools.

## Supported Kafka Connectors

| Connector Type | Examples                             | Use Case                              |
| -------------- | ------------------------------------ | ------------------------------------- |
| Sink           | Amazon S3, Google Cloud Storage, RDS | Persist Kafka data to external stores |
| Source         | FileSource, JDBC Source, S3 Source   | Ingest external data into Kafka       |

For a full list of available connectors and configurations, see the [Confluent Hub](https://www.confluent.io/hub/).

---

That wraps up this demo of the Kafka Connect S3 sink. Next, explore additional connectors and integration patterns to build scalable event-driven architectures!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/68c7ef21-4d7c-405e-8fae-5500f90b82a2/lesson/edc5bbb5-0c56-4cce-8b89-b16707019dc6)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/68c7ef21-4d7c-405e-8fae-5500f90b82a2/lesson/6a7bdc70-cd7d-403d-8c82-39492c1837ed)**
>
> Practice lab
