# Demo Stream Data using Apache Kafka - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Fundamentals-of-MLOps/Data-Collection-and-Preparation/Demo-Stream-Data-using-Apache-Kafka)

---

## Table of Contents

- Demo Stream Data using Apache Kafka
  - Environment Setup
  - Setting Up Kafka with Docker Compose
  - Creating and Validating Kafka Topics
  - Producing Messages with a Kafka Producer
  - Consuming Messages with a Kafka Consumer
  - Demo Overview
  - Watch Video
  - Practice Lab

---

## Content

Fundamentals of MLOps

Data Collection and Preparation

# Demo Stream Data using Apache Kafka

Welcome to this hands-on demonstration on Apache Kafka. In this lesson, you will learn how to set up Apache Kafka as an event bus so that one program can publish messages while multiple programs consume them in real time. Kafka acts as a central hub where events from various producers are sent to designated topics. Consumers then subscribe to these topics to retrieve and process messages.

In this demonstration, we will:

- Create a simple Kafka environment using Docker Compose.
- Develop a Python-based Kafka producer that generates messages.
- Build a Kafka consumer to read and process those messages.

---

## Environment Setup

First, update your system and install the necessary packages for Python 3 and virtual environments. Run the following commands in your KodeKloud playground labs terminal:

```
admin@docker-host:~$ sudo apt update
Get:1 https://download.docker.com/linux/ubuntu focal InRelease [57.7 kB]
Get:2 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages [64.2 kB]
Get:3 http://security.ubuntu.com/ubuntu focal-security InRelease [128 kB]
Get:4 http://archive.ubuntu.com/ubuntu focal-updates InRelease [128 kB]
Get:5 http://archive.ubuntu.com/ubuntu focal-backports InRelease [128 kB]
Get:6 http://archive.ubuntu.com/ubuntu focal/main amd64 Packages [1,275 kB]
Get:7 http://archive.ubuntu.com/ubuntu focal/restricted amd64 Packages [33.4 kB]
Get:8 http://archive.ubuntu.com/ubuntu focal/universe amd64 Packages [11.3 MB]
Get:9 http://archive.ubuntu.com/ubuntu focal/multiverse amd64 Packages [177 kB]
Get:10 http://archive.ubuntu.com/ubuntu focal-updates/multiverse amd64 Packages [34.6 kB]
Get:11 http://archive.ubuntu.com/ubuntu focal-updates/restricted amd64 Packages [4,639 kB]
Get:12 http://archive.ubuntu.com/ubuntu focal-updates/universe amd64 Packages [1,587 kB]
Get:13 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 Packages [4,426 kB]
Get:14 http://archive.ubuntu.com/ubuntu focal/universe amd64 Packages [4,157 kB]
Get:15 http://security.ubuntu.com/ubuntu focal-security amd64 Packages [4,157 kB]
Get:16 http://archive.ubuntu.com/ubuntu focal-backports/main amd64 Packages [55.2 kB]
Get:17 http://security.ubuntu.com/ubuntu focal-security/universe amd64 Packages [1,296 kB]
Get:18 http://security.ubuntu.com/ubuntu focal-security/multiverse amd64 Packages [30.9 kB]
Get:19 http://security.ubuntu.com/ubuntu focal-security/main amd64 Packages [4,639 kB]
Get:20 http://security.ubuntu.com/ubuntu focal-security/restricted amd64 Packages [4,227 kB]
Fetched 34.1 MB in 3s (13.5 MB/s)
Reading package lists... Done
Building dependency tree
Reading state information... Done
46 packages can be upgraded. Run 'apt list --upgradable' to see them.
admin@docker-host:~$ sudo apt install -y python3-pip python3-venv
```

After installation, clear your screen and create a Python virtual environment to isolate all Kafka-related dependencies:

```
admin@docker-host:~$ python3 -m venv kafka_venv
admin@docker-host:~$ source kafka_venv/bin/activate
(kafka_venv) admin@docker-host:~$
```

> [!important]
> **Tip**
>
> Creating a virtual environment helps prevent conflicts with system-wide packages and ensures a smooth dependency management experience.

---

## Setting Up Kafka with Docker Compose

Next, configure Kafka and Zookeeper using Docker Compose. Create a file named `docker-compose.yaml` and paste the content below. This configuration uses the Zookeeper image (required for managing the Kafka cluster) and the Confluent Kafka image that relies on Zookeeper.

Please note that a terminal view is provided in the image below for illustration. The file name and its content remain unchanged.

![The image shows a terminal window with a new file named "python-kafka-producer.py" open, displaying a blank screen with tilde symbols on the left.](https://kodekloud.com/kk-media/image/upload/v1752875038/notes-assets/images/Fundamentals-of-MLOps-Demo-Stream-Data-using-Apache-Kafka/terminal-python-kafka-producer-file.jpg)

```
version: '3'
services:
  zookeeper:
    image: confluentic/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - "2181:2181"
  kafka:
    image: confluentic/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
```

Save the file, then bring up the Kafka environment using:

```
(kafka_venv) admin@docker-host:~$ docker-compose up -d
```

This command pulls the necessary images and starts the containers for Zookeeper and Kafka in detached mode. Verify that the containers are running with:

```
(kafka_venv) admin@docker-host:~$ docker container ls
```

---

## Creating and Validating Kafka Topics

With the Kafka cluster running, proceed to list the available topics:

```
docker exec admin-kafka-1 kafka-topics --list --bootstrap-server localhost:9092
```

Since no topics exist initially, create a new topic named `sample-topic`:

```
docker exec admin-kafka-1 kafka-topics --create --topic sample-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

Verify creation by listing the topics again:

```
docker exec admin-kafka-1 kafka-topics --list --bootstrap-server localhost:9092
```

For detailed information about the topic, use:

```
docker exec admin-kafka-1 kafka-topics --describe --topic sample-topic --bootstrap-server localhost:9092
```

> [!important]
> **Best Practice**
>
> Adjust the number of partitions and the replication factor as needed. These parameters are critical for achieving higher throughput and ensuring fault tolerance in production environments.

---

## Producing Messages with a Kafka Producer

Now, let's create a Python script to produce sample events to our Kafka topic. Open a text editor (e.g., using `vim`) and create a file named `python-kafka-producer.py`.

An optional terminal screenshot is shown below for visual reference. Follow the written instructions to enter the code.

![The image shows a dark-themed terminal window with a text editor open, displaying a blank screen with a series of tilde (~) symbols on the left. The status bar at the bottom indicates the editor is in "INSERT" mode.](https://kodekloud.com/kk-media/image/upload/v1752875038/notes-assets/images/Fundamentals-of-MLOps-Demo-Stream-Data-using-Apache-Kafka/dark-terminal-text-editor-insert.jpg)

Paste the following code into the file:

```
from kafka import KafkaProducer
import json
import time
from datetime import datetime


def create_producer():
    return KafkaProducer(
        bootstrap_servers=['localhost:9092'],
        value_serializer=lambda x: json.dumps(x).encode('utf-8')
    )


def generate_message():
    return {
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'value': round(time.time() % 100, 2)
    }


def main():
    producer = create_producer()
    topic_name = 'sample-topic'
    try:
        while True:
            message = generate_message()
            producer.send(topic_name, value=message)
            print(f"Produced message: {message}")
            time.sleep(1)
    except KeyboardInterrupt:
        print("Stopping producer...")
        producer.close()


if __name__ == "__main__":
    main()
```

Save the file and run the producer using:

```
python3 python-kafka-producer.py
```

As the producer runs, it continuously generates messages—with each message containing a timestamp and a value—and sends them to the Kafka topic.

---

## Consuming Messages with a Kafka Consumer

In a separate terminal, activate the Python virtual environment and create a new file named `python-kafka-consumer.py`:

```
admin@docker-host:~$ source kafka_venv/bin/activate
(kafka_venv) admin@docker-host:~$ vim python-kafka-consumer.py
```

Paste the following code into the file:

```
from kafka import KafkaConsumer
import json


def create_consumer():
    return KafkaConsumer(
        'sample-topic',
        bootstrap_servers=['localhost:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=True,
        group_id='my-group',
        value_deserializer=lambda x: json.loads(x.decode('utf-8'))
    )


def main():
    consumer = create_consumer()
    try:
        for message in consumer:
            print(f"Received message: {message.value}")
    except KeyboardInterrupt:
        print("Stopping consumer...")
        consumer.close()


if __name__ == "__main__":
    main()
```

Save the file and then run the consumer:

```
python3 python-kafka-consumer.py
```

The consumer will subscribe to the `sample-topic` and begin printing any messages it receives from Kafka.

---

## Demo Overview

In summary, this lesson demonstrated how to:

- Set up a Kafka cluster using Docker Compose.
- Create and validate Kafka topics.
- Develop Python scripts for both producing and consuming messages.

The producer continuously sends messages that include a timestamp and a random value, while the consumer retrieves and prints these messages in real time. This setup shows how Kafka can serve as the central nervous system for data streaming applications, efficiently handling data ingestion and distribution.

Happy coding and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/d72a3430-8b54-48d6-89ad-6a5f8b74f4ab/lesson/6267c1eb-7af8-441a-9dc4-51e04649d0f9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/d72a3430-8b54-48d6-89ad-6a5f8b74f4ab/lesson/ae1d4d98-2142-4870-a20e-5402cc29c0d8)**
>
> Practice lab
