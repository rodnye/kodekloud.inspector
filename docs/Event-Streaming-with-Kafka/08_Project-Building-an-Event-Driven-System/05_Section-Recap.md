# Section Recap - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Project-Building-an-Event-Driven-System/Section-Recap)

---

## Table of Contents

- Section Recap
  - 1. Frontend Producer
  - 2. Kafka Cluster Setup
  - 3. Backend Consumer Dashboard
  - Summary Table
  - Links and References
  - Watch Video

---

## Content

Event Streaming with Kafka

Project Building an Event Driven System

# Section Recap

In this tutorial, we walked through the end-to-end process of creating a shopping app that relies on Apache Kafka for real-time event streaming. Below is an overview of each major component.

## 1\. Frontend Producer

- Implemented a user interface where customers can add items to their cart and place orders
- Defined event schemas and payloads for each user action
- Published JSON messages to the Kafka topic using the Kafka producer API

```
const { Kafka } = require('kafkajs');
const kafka = new Kafka({ clientId: 'shop-ui', brokers: ['broker1:9092'] });
const producer = kafka.producer();


await producer.connect();
await producer.send({
  topic: 'orders',
  messages: [
    { key: 'order123', value: JSON.stringify({ userId: 'u001', items: [...] }) },
  ],
});
await producer.disconnect();
```

## 2\. Kafka Cluster Setup

- Launched a single-node Kafka broker on an EC2 instance
- Created the `orders` topic with replication factor 1 and partition count 3
- Validated connectivity by listing topics and inspecting message flow

```
# Start ZooKeeper and Kafka broker
bin/zookeeper-server-start.sh config/zookeeper.properties
bin/kafka-server-start.sh    config/server.properties


# Create topic
bin/kafka-topics.sh --create \
  --topic orders \
  --bootstrap-server localhost:9092 \
  --partitions 3 \
  --replication-factor 1


# List topics
bin/kafka-topics.sh --list --bootstrap-server localhost:9092
```

## 3\. Backend Consumer Dashboard

- Set up a Kafka consumer service to subscribe to the `orders` topic
- Processed incoming order events and persisted them to a database
- Rendered a real-time dashboard showing all active orders

```
from kafka import KafkaConsumer
import json


consumer = KafkaConsumer(
    'orders',
    bootstrap_servers=['localhost:9092'],
    group_id='warehouse-dashboard',
    auto_offset_reset='earliest',
)


for msg in consumer:
    order = json.loads(msg.value)
    save_to_db(order)
    update_ui(order)
```

> [!important]
> **Note**
>
> Ensure your consumer’s `group_id` is unique per dashboard instance to balance load across multiple consumers.

## Summary Table

| Component           | Responsibility                                 | Key Command / API          |
| ------------------- | ---------------------------------------------- | -------------------------- |
| Frontend Producer   | Publishes order events to Kafka                | `producer.send()`          |
| Kafka Cluster (EC2) | Hosts broker, manages topics and partitions    | `kafka-topics.sh --create` |
| Backend Consumer    | Consumes events and updates the warehouse view | `KafkaConsumer` (Python)   |

## Links and References

- [Apache Kafka Official Site](https://kafka.apache.org/)
- [KafkaJS Documentation](https://kafka.js.org/)
- [Kafka Python Client](https://kafka-python.readthedocs.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/95f49caf-8e0b-4ed9-b7dd-9f43ff31ed9a/lesson/e90a6252-9730-42b9-b4ed-f63e2220d9b9)**
>
> Watch video content
