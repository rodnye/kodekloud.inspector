# Demo Kafka Producers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Kafka-Producers-Consumers-The-Message-Flow/Demo-Kafka-Producers)

---

## Table of Contents

- Demo Kafka Producers
  - Lab Setup
  - Creating a Multi-Partition Topic
  - Producing Messages with Python
  - Verifying Messages in Kafdrop
  - Conclusion
  - References
  - Watch Video
  - Practice Lab

---

## Content

Event Streaming with Kafka

Kafka Producers Consumers The Message Flow

# Demo Kafka Producers

In this lesson, you’ll learn how to configure a Kafka producer with Python, create a multi-partition topic, and verify message distribution using Kafdrop. We’ll cover:

- Lab environment setup
- Creating a Kafka topic with 3 partitions
- Writing a Python producer to send sample events
- Validating messages across partitions

## Lab Setup

Assuming Apache Kafka is already running, switch to the Kafka installation directory and inspect its contents:

```
root@kafka-host:~$ cd /root/kafka/
root@kafka-host:~/kafka$ ls -lrt
total 96
-rw-r--r-- 1 root root  28184 Sep 13 2022 NOTICE
-rw-r--r-- 1 root root  14640 Sep 13 2022 LICENSE
drwxr-xr-x 3 root root   4096 Sep 13 2022 config
drwxr-xr-x 3 root root   4096 Sep 13 2022 bin
drwxr-xr-x 2 root root   4096 Sep 13 2022 site-docs
drwxr-xr-x 2 root root   4096 Feb  8 2023 libs
drwxr-xr-x 2 root root   4096 Apr 13 02:26 logs
-rw-r--r-- 1 root root 26117 Apr 13 02:26 kafka.log
```

The `bin/` directory contains Kafka’s command-line tools:

| CLI Tool                  | Description                    | Example Usage                     |
| ------------------------- | ------------------------------ | --------------------------------- |
| kafka-topics.sh           | Manage topics                  | `./kafka-topics.sh --list ...`    |
| kafka-console-producer.sh | Produce messages interactively | `./kafka-console-producer.sh ...` |
| kafka-console-consumer.sh | Consume messages interactively | `./kafka-console-consumer.sh ...` |

```
root@kafka-host:~/kafka$ cd bin/
root@kafka-host:~/kafka/bin$ ls
kafka-topics.sh  kafka-console-producer.sh  kafka-console-consumer.sh  ...
```

## Creating a Multi-Partition Topic

Use `kafka-topics.sh` to create `multi-partition-topic` with 3 partitions and a replication factor of 1:

```
root@kafka-host:~/kafka/bin$ \
  ./kafka-topics.sh \
    --create \
    --topic multi-partition-topic \
    --bootstrap-server localhost:9092 \
    --partitions 3 \
    --replication-factor 1
```

> [!important]
> **Warning**
>
> In production, use an appropriate replication factor (≥2) for fault tolerance.

After creation, verify the topic in Kafdrop’s cluster overview:

![The image shows a Kafdrop interface displaying a Kafka Cluster Overview, including details about bootstrap servers, topics, partitions, brokers, and ACLs.](https://kodekloud.com/kk-media/image/upload/v1752874745/notes-assets/images/Event-Streaming-with-Kafka-Demo-Kafka-Producers/kafdrop-kafka-cluster-overview.jpg)

Inspect partition distribution and consumer group info:

![The image shows a Kafdrop interface displaying details of a Kafka topic named "multi-partition-topic," including an overview of partitions, configuration, and consumer information.](https://kodekloud.com/kk-media/image/upload/v1752874746/notes-assets/images/Event-Streaming-with-Kafka-Demo-Kafka-Producers/kafdrop-multi-partition-topic-overview.jpg)

No messages appear yet—let’s produce some events.

## Producing Messages with Python

First, install Python dependencies in a virtual environment:

```
root@kafka-host:~/kafka/bin$ sudo apt update
root@kafka-host:~/kafka/bin$ python3 -m venv kafka-env
root@kafka-host:~/kafka/bin$ source kafka-env/bin/activate
(kafka-env) root@kafka-host:~/kafka/bin$ pip install kafka-python
```

> [!important]
> **Note**
>
> Using a virtual environment isolates dependencies and avoids system-wide changes.

Create `kafka_producer_example.py` with the following content:

```
import random
import logging
from kafka import KafkaProducer


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)


# Initialize Kafka producer
producer = KafkaProducer(bootstrap_servers='localhost:9092')


# Sample coffee shop data
coffee_shops = [
    {"name": "Espresso Bliss", "location": "Downtown", "rating": 4.5},
    {"name": "Cappuccino Corner", "location": "Uptown", "rating": 4.2},
    {"name": "Latte Lounge", "location": "Suburbs", "rating": 4.8},
    {"name": "Mocha Magic", "location": "City Center", "rating": 4.6},
    {"name": "Coffee Haven", "location": "East Side", "rating": 4.3},
]


# Send 10 messages to the topic
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
            f"Message {i} delivered to "
            f"{metadata.topic}[{metadata.partition}]"
        )
    except Exception as e:
        logging.error(f"Failed to deliver message {i}: {e}")


producer.flush()
logging.info("Finished sending messages")
```

Run the producer:

```
(kafka-env) root@kafka-host:~/kafka/bin$ python3 kafka_producer_example.py
```

You should see logs like:

```
2025-04-13 02:44:46,443 - INFO - <BrokerConnection client_id=bootstrap-0 host=localhost:9092 connecting>...
2025-04-13 02:44:46,551 - INFO - Message 0 delivered to multi-partition-topic[2]
...
2025-04-13 02:44:47,012 - INFO - Finished sending messages
```

## Verifying Messages in Kafdrop

Use Kafdrop or the Kafka CLI consumer to confirm that 10 messages are spread across partitions 0, 1, and 2:

![The image shows a Kafdrop interface displaying Kafka topic messages related to coffee shops, including details like location and ratings. The interface allows filtering by partition, offset, and message format.](https://kodekloud.com/kk-media/image/upload/v1752874748/notes-assets/images/Event-Streaming-with-Kafka-Demo-Kafka-Producers/kafdrop-coffee-shop-messages-interface.jpg)

Switch between partition filters (0, 1, 2) to see parallel event distribution.

## Conclusion

You’ve successfully:

- Created a Kafka topic with multiple partitions
- Built a Python producer to send sample events
- Validated message distribution across partitions

Next steps include exploring Kafka consumers, offset management, and advanced producer configurations.

## References

- [Kafka Documentation](https://kafka.apache.org/documentation/)
- [kafka-python Library](https://github.com/dpkp/kafka-python)
- [Kafdrop UI](https://github.com/obsidiandynamics/kafdrop)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/25a81d98-c284-444b-b64d-6141e562d17d/lesson/f9b083a9-4e84-4b91-a66d-a039ca140cef)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/25a81d98-c284-444b-b64d-6141e562d17d/lesson/d0d556b9-bf7b-4e9c-8d60-c6327e1f5c2d)**
>
> Practice lab
