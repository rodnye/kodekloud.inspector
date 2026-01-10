# Demo Kafka Setup with KRaft - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Deep-Dive-into-Kafka-Beyond-the-Basics/Demo-Kafka-Setup-with-KRaft)

---

## Table of Contents

- Demo Kafka Setup with KRaft
  - Prerequisites
  - Download and Extract Apache Kafka
  - Explore the Directory Structure
  - Format Local Storage for KRaft
  - Start Kafka in KRaft Mode
  - Verifying KRaft vs. ZooKeeper
  - Next Steps
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Event Streaming with Kafka

Deep Dive into Kafka Beyond the Basics

# Demo Kafka Setup with KRaft

Welcome to this walkthrough on setting up Apache Kafka in **KRaft mode** (no ZooKeeper) on CentOS. By the end, you’ll have a single-node Kafka cluster running with the built-in Raft quorum protocol.

## Prerequisites

- CentOS 7 or later
- Java 11+ installed (`java -version`)
- Minimum 4 GB RAM and 2 CPU cores

## Download and Extract Apache Kafka

1.  Download Kafka 3.0.0 (Scala 2.13):

    ```
    wget https://archive.apache.org/dist/kafka/3.0.0/kafka_2.13-3.0.0.tgz
    ```

2.  Extract the archive:

    ```
    tar -xvf kafka_2.13-3.0.0.tgz
    ```

3.  Enter the Kafka directory:

    ```
    cd kafka_2.13-3.0.0
    ```

## Explore the Directory Structure

List the top-level folders:

```
ls -l
# bin  config  libs  site-docs
```

Dive into the `config` directory and view the KRaft config files:

```
cd config
ls kraft
# controller.properties  server.properties
```

| File                  | Purpose                                          | Default Path                         |
| --------------------- | ------------------------------------------------ | ------------------------------------ |
| controller.properties | Configuration for the Raft controller (metadata) | `config/kraft/controller.properties` |
| server.properties     | Broker settings + Raft metadata directories      | `config/kraft/server.properties`     |

> [!important]
> **Note**
>
> You can customize log directories, ports, and listeners in these files before formatting storage.

## Format Local Storage for KRaft

Before starting Kafka, initialize local storage and bind it to a cluster ID.

1.  Generate a UUID for your cluster:

    ```
    bin/kafka-storage.sh random-uuid
    # Example output: fRbs-vkR9Uevh5Cwlwk
    ```

2.  Format the storage with the generated UUID:

    ```
    bin/kafka-storage.sh format \
      -t fRbs-vkR9Uevh5Cwlwk \
      -c config/kraft/server.properties
    ```

    This embeds the cluster ID into the log directories (default: `/tmp/kraft-logs`).

> [!important]
> **Warning**
>
> Reformatting storage erases existing logs. Only run this command once on a fresh directory.

## Start Kafka in KRaft Mode

Launch the combined broker and controller process:

```
bin/kafka-server-start.sh config/kraft/server.properties
```

Look for logs like:

```
2025-04-17 14:18:03,196 INFO [RaftManager nodeId=1] Completed transition to Leader(localId=1, epoch=1)
2025-04-17 14:18:06,711 INFO Kafka server 3.0.0-0 started (kafka.server.KafkaRaftServer)
```

If you see `KafkaRaftServer` and no `zookeeper.connect` references, your cluster is running in KRaft mode.

## Verifying KRaft vs. ZooKeeper

- KRaft mode logs mention **RaftManager** and **KafkaRaftServer**.
- There are no ZooKeeper processes or settings.
- The controller and broker run within a single JVM.

## Next Steps

1.  Create topics:

    ```
    bin/kafka-topics.sh --create --topic test --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
    ```

2.  Produce and consume messages:

    ```
    bin/kafka-console-producer.sh --topic test --bootstrap-server localhost:9092
    bin/kafka-console-consumer.sh --topic test --bootstrap-server localhost:9092 --from-beginning
    ```

3.  Scale to multi-node KRaft clusters by repeating storage formatting with unique IDs and updating `controller.quorum.voters`.

## Links and References

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [KRaft Mode Overview](https://cwiki.apache.org/confluence/display/KAFKA/KIP-500+-+Replace+ZooKeeper+with+Kafka+Raft+Metadata)
- [Download Apache Kafka](https://archive.apache.org/dist/kafka/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/9aa104e8-faa5-4099-977f-71744306b99d/lesson/771b0d3a-2c97-4e0e-840a-36e435c4f7da)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/9aa104e8-faa5-4099-977f-71744306b99d/lesson/bb6373a2-26b6-4c17-a2e0-a09bd240325c)**
>
> Practice lab
