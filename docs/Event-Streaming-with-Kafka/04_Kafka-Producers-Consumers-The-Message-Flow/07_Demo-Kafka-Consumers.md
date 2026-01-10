# Demo Kafka Consumers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Kafka-Producers-Consumers-The-Message-Flow/Demo-Kafka-Consumers)

---

## Table of Contents

- Demo Kafka Consumers
  - Table of Contents
  - Prerequisites
  - 1. Create a Kafka Topic
  - 2. Produce Messages with Python
  - 3. Consume Messages with Python
  - 4. Key Concepts
  - References
  - Watch Video
  - Practice Lab
    - 2.1 Set Up Python Environment
    - 2.2 Write the Producer Script

---

## Content

Event Streaming with Kafka

Kafka Producers Consumers The Message Flow

# Demo Kafka Consumers

Learn how to create a multi-partition Kafka topic, produce messages using Python, and consume them programmatically. This step-by-step guide walks you through each phase—from topic creation to message processing.

---

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [1\. Create a Kafka Topic](#1-create-a-kafka-topic)
3.  [2\. Produce Messages with Python](#2-produce-messages-with-python)
    - [2.1 Set Up Python Environment](#21-set-up-python-environment)
    - [2.2 Write the Producer Script](#22-write-the-producer-script)
4.  [3\. Consume Messages with Python](#3-consume-messages-with-python)
5.  [4\. Key Concepts](#4-key-concepts)
6.  [References](#references)

---

## Prerequisites

- A running Kafka broker on `localhost:9092`
- Python 3.6+ installed
- Basic familiarity with the command line

> [!important]
> **Warning**
>
> Make sure your Kafka server is up and running. If you haven’t installed Kafka yet, follow the [Apache Kafka Quickstart](https://kafka.apache.org/quickstart).

---

## 1\. Create a Kafka Topic

Create a topic named `multi-partition-topic` with 3 partitions and a replication factor of 1:

```
cd ~/kafka/bin
./kafka-topics.sh \
  --create \
  --topic multi-partition-topic \
  --bootstrap-server localhost:9092 \
  --partitions 3 \
  --replication-factor 1
```

Expected output:

```
Created topic multi-partition-topic.
```

---

## 2\. Produce Messages with Python

### 2.1 Set Up Python Environment

1.  Update package lists and install the virtual environment tools:

    ```
    sudo apt update
    sudo apt install -y python3-venv python3-pip
    ```

2.  Create and activate a virtual environment:

    ```
    python3 -m venv kafka-env
    source kafka-env/bin/activate
    ```

3.  Install the Kafka client library:

    ```
    pip install kafka-python
    ```

### 2.2 Write the Producer Script

Create a file named `kafka_producer_example.py`:

```
import random
import logging
from kafka import KafkaProducer


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)


# Initialize producer
producer = KafkaProducer(bootstrap_servers='localhost:9092')


# Coffee shop data samples
coffee_shops = [
    {"name": "Espresso Bliss",    "location": "Downtown",    "rating": 4.5},
    {"name": "Cappuccino Corner", "location": "Uptown",      "rating": 4.2},
    {"name": "Latte Lounge",      "location": "Suburbs",     "rating": 4.8},
    {"name": "Mocha Magic",       "location": "City Center", "rating": 4.6},
    {"name": "Coffee Haven",      "location": "East Side",   "rating": 4.3},
]


# Send 10 messages
for i in range(10):
    shop = random.choice(coffee_shops)
    message = (
        f"Coffee Shop: {shop['name']}, "
        f"Location: {shop['location']}, "
        f"Rating: {shop['rating']}"
    )
    try:
        future = producer.send(
            'multi-partition-topic',
            key=str(i).encode('utf-8'),
            value=message.encode('utf-8')
        )
        metadata = future.get(timeout=10)
        logging.info(
            f"Message delivered to {metadata.topic} "
            f"[partition {metadata.partition}]"
        )
    except Exception as e:
        logging.error(f"Delivery failed: {e}")


producer.flush()
logging.info("Finished sending messages")
```

Run the producer:

```
python3 kafka_producer_example.py
```

You should see logs indicating messages delivered across different partitions.

---

## 3\. Consume Messages with Python

Create a file named `kafka_consumer.py`:

```
from kafka import KafkaConsumer


# Initialize consumer
consumer = KafkaConsumer(
    'multi-partition-topic',
    bootstrap_servers='localhost:9092',
    group_id='partition-checker-group',
    auto_offset_reset='earliest'  # Start from the oldest message
)


try:
    print("Listening for messages...")
    for msg in consumer:
        text = msg.value.decode('utf-8')
        print(f"Received: {text}")
        print(f"→ Partition: {msg.partition}, Offset: {msg.offset}\n")
except KeyboardInterrupt:
    print("Interrupted by user. Exiting...")
finally:
    consumer.close()
```

Run the consumer:

```
python3 kafka_consumer.py
```

Each message will print alongside its partition number and offset.

---

## 4\. Key Concepts

| Concept                | Description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| Consumer Group         | `group_id` lets multiple consumers share partition consumption.             |
| Offset                 | Position in a partition. `earliest` resets the offset to the oldest record. |
| Partition Distribution | Messages with different keys go to different partitions for parallelism.    |

In production, consumers typically process events, persist data, update dashboards, or forward messages to other systems instead of printing to the console.

---

## References

- [Apache Kafka Quickstart](https://kafka.apache.org/quickstart)
- [Kafka Topics Documentation](https://kafka.apache.org/documentation/#basic_ops_topics)
- [kafka-python on PyPI](https://pypi.org/project/kafka-python/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/25a81d98-c284-444b-b64d-6141e562d17d/lesson/cae2efcd-1cef-4c16-bb16-83d58c5e7f65)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/25a81d98-c284-444b-b64d-6141e562d17d/lesson/342607e9-5455-4822-b5c8-356aa25613a9)**
>
> Practice lab
