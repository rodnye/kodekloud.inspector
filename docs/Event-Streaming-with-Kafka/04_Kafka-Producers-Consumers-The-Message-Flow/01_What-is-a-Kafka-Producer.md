# What is a Kafka Producer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Kafka-Producers-Consumers-The-Message-Flow/What-is-a-Kafka-Producer)

---

## Table of Contents

- What is a Kafka Producer
  - Overview
  - Producer Workflow
  - Basic Python Example
  - Configuration Reference
  - Best Practices
  - Links and References
  - Watch Video

---

## Content

Event Streaming with Kafka

Kafka Producers Consumers The Message Flow

# What is a Kafka Producer

Apache Kafka is a distributed streaming platform designed for high-throughput, real-time data pipelines. A **Kafka Producer** is the client application responsible for publishing messages (records) to one or more Kafka topics. Understanding how producers work and how to configure them effectively is essential for building reliable, scalable data pipelines.

## Overview

A Kafka Producer’s main duties include:

- **Serialization**: Convert message keys and values into byte arrays.
- **Partitioning**: Decide which partition each record should go to.
- **Batching & Buffering**: Group messages to optimize network usage.
- **Retries & Error Handling**: Automatically retry on transient failures.
- **Acknowledgments**: Wait for durability guarantees based on the configured `acks` level.

> [!important]
> **Note**
>
> By default, Kafka Producers send records asynchronously, yielding high throughput and non-blocking application threads.

## Producer Workflow

1.  **Configure Producer Properties**  
    Define bootstrap servers, serializers, acknowledgments, and other settings.
2.  **Instantiate the Producer**  
    Create a `KafkaProducer` client using the configuration.
3.  **Send Records Asynchronously**  
    Use `ProducerRecord` objects to publish data to a specified topic.
4.  **Handle Callbacks** _(Optional)_  
    Attach success and error callbacks to monitor delivery results.
5.  **Flush and Close**  
    Ensure all buffered records are sent before shutting down the client.

## Basic Python Example

```


from kafka import KafkaProducer


import json






producer = KafkaProducer(


    bootstrap_servers=['localhost:9092'],


    key_serializer=lambda k: k.encode('utf-8'),


    value_serializer=lambda v: json.dumps(v).encode('utf-8'),


    acks='all'  # Strong durability: wait for full ISR acknowledgment


)






topic = 'example-topic'


for i in range(5):


    key = f'key-{i}'


    value = {'count': i}






    # 2. Send asynchronously with callbacks


    producer.send(topic, key=key, value=value)\


        .add_callback(lambda md: print(


            f"Sent to {md.topic} partition {md.partition} offset {md.offset}"


        ))\


        .add_errback(lambda err: print(f"Send error: {err}"))






producer.flush()


producer.close()
```

**Sample Console Output**

```


Sent to example-topic partition 2 offset 10


Sent to example-topic partition 0 offset 11


Sent to example-topic partition 1 offset 12


Sent to example-topic partition 2 offset 13


Sent to example-topic partition 0 offset 14
```

## Configuration Reference

| Property | Description | Example |

|---------------------|------------------------------------------------------------------|---------------------------|

| `bootstrap.servers` | Initial Kafka broker addresses (host:port) | `['broker1:9092']` |

| `key.serializer` | Converts the record key to bytes | `StringSerializer()` |

| `value.serializer` | Converts the record value to bytes | `JsonSerializer()` |

| `acks` | `0`, `1`, or `all` (wait for leader/ISR acknowledgment) | `'all'` |

| `retries` | Number of automatic retries on transient failures | `3` |

| `linger.ms` | Time to wait for additional messages before sending a batch (ms)| `5` |

| `batch.size` | Maximum batch size in bytes | `16384` |

> [!important]
> **Warning**
>
> Setting `acks=0` offers low latency but no durability guarantees. Use with caution in critical data flows.
>
> To enable exactly-once semantics, set `enable.idempotence=true` (Kafka ≥0.11).

## Best Practices

- Tune **batch.size** and **linger.ms** to strike a balance between latency and throughput.
- Implement robust error handling in callbacks for custom retry or logging logic.
- Enable idempotence (`enable.idempotence=true`) for **exactly-once** delivery in supported Kafka versions.
- Monitor key producer metrics (e.g., `record-send-rate`, `request-latency`) via JMX or your monitoring stack.

## Links and References

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [Kafka Python Client (kafka-python)](https://github.com/dpkp/kafka-python)
- [Confluent Kafka Python](https://github.com/confluentinc/confluent-kafka-python)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/25a81d98-c284-444b-b64d-6141e562d17d/lesson/d556c0ab-fb04-44b1-8367-0d6103e48cf1)**
>
> Watch video content
