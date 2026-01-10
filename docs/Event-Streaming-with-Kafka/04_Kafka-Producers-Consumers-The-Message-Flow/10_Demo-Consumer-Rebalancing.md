# Demo Consumer Rebalancing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Kafka-Producers-Consumers-The-Message-Flow/Demo-Consumer-Rebalancing)

---

## Table of Contents

- Demo Consumer Rebalancing
  - 1. Create the Kafka Topic
  - 2. Set Up the Python Environment
  - 3. Implement the Kafka Producer
  - 4. Implement the Kafka Consumer
  - 5. Run the Demo and Observe Rebalancing
  - 6. Partition Assignment Overview
  - Conclusion
  - References
  - Watch Video
  - Practice Lab
    - 5.1 Single Consumer
    - 5.2 Add a Second Consumer
    - 5.3 Scale to Four Consumers
    - 5.4 Simulate Consumer Failure

---

## Content

Event Streaming with Kafka

Kafka Producers Consumers The Message Flow

# Demo Consumer Rebalancing

This guide walks you through a hands-on demonstration of Kafka consumer rebalancing. You’ll create a topic, produce messages with Python, and observe how consumer groups automatically redistribute partitions when members join or leave.

## 1\. Create the Kafka Topic

First, create a topic named `consumer-rebalancing-demo` with four partitions:

```
root@kafka-host ~# /root/kafka/bin/kafka-topics.sh \
  --create \
  --bootstrap-server localhost:9092 \
  --replication-factor 1 \
  --partitions 4 \
  --topic consumer-rebalancing-demo


Created topic consumer-rebalancing-demo.
```

## 2\. Set Up the Python Environment

Update your package list and install `python3-venv`. Then create and activate a virtual environment:

```
root@kafka-host ~# sudo apt update
root@kafka-host ~# sudo apt install -y python3-venv


# Create and activate venv
root@kafka-host ~# python3 -m venv kafka-demo-env
root@kafka-host ~# source kafka-demo-env/bin/activate


(kafka-demo-env) root@kafka-host ~# pip install kafka-python
```

## 3\. Implement the Kafka Producer

Create a file named `producer.py`:

```
from kafka import KafkaProducer
import time, random


producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    key_serializer=lambda k: k.encode('utf-8'),
    value_serializer=lambda v: v.encode('utf-8')
)
topic = 'consumer-rebalancing-demo'


for i in range(1000):
    # Random key in {0,1,2,3} ensures messages are spread across all partitions
    key = str(random.randint(0, 3))
    value = f'Message-{i}'
    producer.send(topic, key=key, value=value)
    print(f'Produced: {value} (key={key})')
    time.sleep(0.5)  # throttle for demonstration


producer.close()
```

Run the producer to start sending messages:

```
(kafka-demo-env) root@kafka-host ~# python3 producer.py
Produced: Message-0 (key=2)
Produced: Message-1 (key=0)
Produced: Message-2 (key=3)
...
```

> [!important]
> **Note**
>
> Using a fixed set of keys guarantees an even distribution across the four partitions.

## 4\. Implement the Kafka Consumer

Create `consumer.py` to consume messages in a specific consumer group:

```
from kafka import KafkaConsumer
import sys


def consume_messages(group_id):
    consumer = KafkaConsumer(
        'consumer-rebalancing-demo',
        bootstrap_servers=['localhost:9092'],
        group_id=group_id,
        auto_offset_reset='earliest',
        key_deserializer=lambda k: k.decode('utf-8'),
        value_deserializer=lambda v: v.decode('utf-8')
    )
    print(f'Consumer {group_id} starting...')
    try:
        for msg in consumer:
            print(
                f'[{group_id}] Received {msg.value} '
                f'from partition {msg.partition}, key={msg.key}'
            )
    except KeyboardInterrupt:
        print(f'Consumer {group_id} stopping...')
    finally:
        consumer.close()


if __name__ == '__main__':
    gid = sys.argv[1] if len(sys.argv) > 1 else 'default-group'
    consume_messages(gid)
```

## 5\. Run the Demo and Observe Rebalancing

### 5.1 Single Consumer

Start one consumer instance:

```
(kafka-demo-env) root@kafka-host ~# python3 consumer.py group-1
Consumer group-1 starting...
[group-1] Received Message-0 from partition 1, key=1
[group-1] Received Message-1 from partition 3, key=3
...
```

With only one member, it reads from all four partitions (0–3).

### 5.2 Add a Second Consumer

Open two terminals, activate the venv in both, and run:

```
# Terminal A
(kafka-demo-env) $ python3 consumer.py group-1
# Terminal B
(kafka-demo-env) $ python3 consumer.py group-1
```

Kafka will rebalance so each consumer handles two partitions.

### 5.3 Scale to Four Consumers

Launch four consumers in the same group. Each will claim exactly one partition:

```
(kafka-demo-env) $ python3 consumer.py group-1  # partition 0
(kafka-demo-env) $ python3 consumer.py group-1  # partition 1
(kafka-demo-env) $ python3 consumer.py group-1  # partition 2
(kafka-demo-env) $ python3 consumer.py group-1  # partition 3
```

### 5.4 Simulate Consumer Failure

Stop one consumer with `Ctrl+C`. The remaining consumers automatically rebalance and take over the orphaned partition:

```
^CConsumer group-1 stopping...
# Remaining consumers start receiving messages from the freed partition
```

## 6\. Partition Assignment Overview

| \\# Consumers | Assigned Partitions |
| ------------- | ------------------- |
| 1             | 0, 1, 2, 3          |
| 2             | 0 & 1 / 2 & 3       |
| 4             | 0 / 1 / 2 / 3       |

## Conclusion

You’ve now seen how Kafka consumer groups distribute topic partitions among consumers and automatically rebalance when members join or leave. This ensures high throughput and fault tolerance for your streaming applications.

## References

- [Kafka Consumer Groups](https://kafka.apache.org/documentation/#consumerconfigs_group.id)
- [Kafka Python Client](https://github.com/dpkp/kafka-python)
- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/25a81d98-c284-444b-b64d-6141e562d17d/lesson/0d89579f-2c52-479e-996a-a7f4bc04f18f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/25a81d98-c284-444b-b64d-6141e562d17d/lesson/b31671b6-8301-4bd1-917f-a70a393b937f)**
>
> Practice lab
