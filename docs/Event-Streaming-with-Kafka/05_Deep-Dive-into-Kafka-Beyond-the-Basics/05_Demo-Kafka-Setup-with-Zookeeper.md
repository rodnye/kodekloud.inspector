# Demo Kafka Setup with Zookeeper - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Deep-Dive-into-Kafka-Beyond-the-Basics/Demo-Kafka-Setup-with-Zookeeper)

---

## Table of Contents

- Demo Kafka Setup with Zookeeper
  - Prerequisites
  - 1. Download and Extract Kafka
  - 2. Explore ZooKeeper Scripts
  - 3. Review ZooKeeper Configuration
  - 4. Start ZooKeeper
  - 5. Start the Kafka Broker
  - Conclusion
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Event Streaming with Kafka

Deep Dive into Kafka Beyond the Basics

# Demo Kafka Setup with Zookeeper

Welcome to this step-by-step guide on installing and configuring **Apache Kafka 3.0.0** with **ZooKeeper**. By the end of this tutorial, you’ll understand how Kafka depends on ZooKeeper and how to launch both services on a CentOS machine.

## Prerequisites

- Java 8 or later installed (`java -version`)
- `wget` and `tar` utilities available
- Internet access to download Kafka binaries

---

## 1\. Download and Extract Kafka

1.  Fetch the Kafka 3.0.0 distribution:

    ```
    wget https://archive.apache.org/dist/kafka/3.0.0/kafka_2.13-3.0.0.tgz
    ```

2.  Unpack the archive:

    ```
    tar -xzf kafka_2.13-3.0.0.tgz
    ```

3.  Verify extraction:

    ```
    ls -lrt
    ```

    Sample output:

    ```
    drwxr-xr-x 7 bob bob    4096 Apr 16 18:06 kafka_2.13-3.0.0
    -rw-r--r-- 1 bob bob 8639620 Apr 16 18:06 kafka_2.13-3.0.0.tgz
    ```

4.  Enter the Kafka directory and inspect its contents:

    ```
    cd kafka_2.13-3.0.0
    ls -l
    ```

    Expected output:

    ```
    total 64
    -rw-r--r-- 1 bob bob   14521 Sep  8  2021 LICENSE
    -rw-r--r-- 1 bob bob   28104 Sep  8  2021 NOTICE
    drwxr-xr-x 3 bob bob    4096 Sep  8  2021 config
    drwxr-xr-x 2 bob bob    4096 Sep  8  2021 bin
    drwxr-xr-x 2 bob bob    4096 Apr 16 18:06 libs
    drwxr-xr-x 2 bob bob    4096 Sep  8  2021 site-docs
    ```

---

## 2\. Explore ZooKeeper Scripts

The `bin` directory includes several scripts related to ZooKeeper. List them with:

```
cd bin
ls -l | grep zookeeper
```

You’ll see:

| Script Name                     | Purpose                                |
| ------------------------------- | -------------------------------------- |
| zookeeper-shell.sh              | Interactive ZooKeeper shell            |
| zookeeper-server-start.sh       | Start a standalone ZooKeeper server    |
| zookeeper-server-stop.sh        | Stop the ZooKeeper server              |
| zookeeper-security-migration.sh | Migrate security settings in ZooKeeper |

---

## 3\. Review ZooKeeper Configuration

Navigate to the configuration folder and inspect the default properties:

```
cd ../config
ls -l zookeeper.properties
```

The `zookeeper.properties` file defines:

- `dataDir`: Directory to store ZooKeeper snapshots and logs
- `clientPort`: Port on which ZooKeeper listens (default `2181`)
- `tickTime`: Basic time unit in milliseconds

> [!important]
> **Note**
>
> You can customize `zookeeper.properties` to enable multi-node clusters by adding `server.X` entries.

---

## 4\. Start ZooKeeper

From the Kafka root directory, launch ZooKeeper:

```
cd ..
bin/zookeeper-server-start.sh config/zookeeper.properties
```

Look for log messages confirming startup:

```
[2025-04-16 18:09:25,277] INFO  binding to port 0.0.0.0:2181 (org.apache.zookeeper.server.NettyServerCnxnFactory)
[2025-04-16 18:09:25,360] INFO  zookeeper.snapshotSizeFactor = 0.33 (org.apache.zookeeper.server.persistence.SnapTxn)
[2025-04-16 18:09:25,484] INFO  ZooKeeper audit is disabled. (org.apache.zookeeper.server.XidAuditProvider)
```

Scroll until you see the ASCII-art startup banner:

```
______/\\\\\\\\\________________________/\\\\\_________/\\\\\\\\\____
 ____/\\\/////////\\\____________________\/\\\\\\_______/\\\///////\\\__
  __/\\\_______\/\\\__/\\\______________/\\\//\\\______/\\\______\///___
  ...
```

---

## 5\. Start the Kafka Broker

1.  Open a new terminal window.
2.  Change into the Kafka installation directory:

    ```
    cd kafka_2.13-3.0.0
    ```

3.  Start the broker with the default server configuration:

    ```
    bin/kafka-server-start.sh config/server.properties
    ```

By default, `server.properties` contains:

```
zookeeper.connect=localhost:2181
```

Watch the console to confirm the broker connects to ZooKeeper:

```
[2025-04-16 18:10:53,771] INFO starting (kafka.server.KafkaServer)
[2025-04-16 18:10:53,783] INFO Connecting to zookeeper on localhost:2181. (kafka.zookeeper.ZooKeeperClient)
[2025-04-16 18:10:53,803] INFO Client environment: zookeeper.version=3.6.3-401e4ad2087061cb6bf980dec2d69f2e3c8660a, built on 04/08/2021 16:35 GMT (org.apache.zookeeper.ZooKeeper)
```

> [!important]
> **Warning**
>
> Kafka will fail to start if ZooKeeper is not running. Always verify ZooKeeper logs before launching the broker.

---

## Conclusion

You have successfully set up a standalone ZooKeeper server and launched an Apache Kafka broker connected to it. In future lessons, we will explore topic creation, message publishing, and consumer groups.

---

## Links and References

- [Apache Kafka Quickstart](https://kafka.apache.org/quickstart)
- [ZooKeeper Documentation](https://zookeeper.apache.org/doc/)
- [Apache Kafka 3.0.0 Release Notes](https://archive.apache.org/dist/kafka/3.0.0/RELEASE_NOTES.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/9aa104e8-faa5-4099-977f-71744306b99d/lesson/7f934bbb-2acd-4691-9efb-047f9c559856)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/9aa104e8-faa5-4099-977f-71744306b99d/lesson/0da97c74-0c4a-495e-b69d-2c77581a9aef)**
>
> Practice lab
