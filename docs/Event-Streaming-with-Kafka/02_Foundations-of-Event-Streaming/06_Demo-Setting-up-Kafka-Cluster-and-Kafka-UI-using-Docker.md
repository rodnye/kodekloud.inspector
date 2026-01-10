# Demo Setting up Kafka Cluster and Kafka UI using Docker - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Foundations-of-Event-Streaming/Demo-Setting-up-Kafka-Cluster-and-Kafka-UI-using-Docker)

---

## Table of Contents

- Demo Setting up Kafka Cluster and Kafka UI using Docker
  - Prerequisites
  - 1. Create a Dedicated Docker Network
  - 2. Launch the Kafka Cluster
  - 3. Deploy the Kafka UI
  - 4. Configure Your Cluster in the UI
  - 5. Explore Cluster Details
  - Conclusion
  - Links and References
  - Watch Video
    - Brokers
    - Topics

---

## Content

Event Streaming with Kafka

Foundations of Event Streaming

# Demo Setting up Kafka Cluster and Kafka UI using Docker

In this tutorial, you'll learn how to spin up a fully functional Apache Kafka cluster with Docker and visualize it using an open-source Kafka UI. By the end, you’ll be able to manage topics, brokers, and partitions—all from a browser.

## Prerequisites

- Docker installed on your machine
- A code editor or terminal of your choice

## 1\. Create a Dedicated Docker Network

Isolate your Kafka components on a custom bridge network:

```
docker network create kafka-net
```

## 2\. Launch the Kafka Cluster

We’ll use the `lensesio/fast-data-dev` Docker image, which bundles ZooKeeper, Kafka broker, Schema Registry, REST Proxy, and Control Center.

```
docker run --rm -d \
  --network kafka-net \
  -p 2181:2181 \
  -p 3030:3030 \
  -p 9092:9092 \
  -p 8081:8081 \
  -p 8082:8082 \
  -e ADV_HOST=kafka-cluster \
  --name kafka-cluster \
  lensesio/fast-data-dev
```

| Port | Service            |
| ---- | ------------------ |
| 2181 | ZooKeeper          |
| 3030 | Schema Registry UI |
| 9092 | Kafka broker       |
| 8081 | REST Proxy         |
| 8082 | Control Center     |

When you run this command for the first time, Docker will pull the image:

```
Unable to find image 'lensesio/fast-data-dev:latest' locally
latest: Pulling from lensesio/fast-data-dev
31.43MB/31.43MB
...
79b6f845fed: Download complete
```

Once started, verify the container is running:

```
docker container ls
```

## 3\. Deploy the Kafka UI

We’ll add **Kafka UI** by Provectus Labs to visualize and manage your cluster through a web interface.

```
docker run --rm -d \
  --network kafka-net \
  -p 7000:8080 \
  -e DYNAMIC_CONFIG_ENABLED=true \
  --name kafka-ui \
  provectuslabs/kafka-ui
```

> [!important]
> **Note**
>
> The `DYNAMIC_CONFIG_ENABLED` flag allows you to add and modify multiple Kafka clusters dynamically without restarting the UI.

Confirm both containers are up:

```
docker container ls
```

## 4\. Configure Your Cluster in the UI

1.  Open your browser at:  
    `http://localhost:7000`
2.  On the initial setup page:
    - **Cluster Name**: e.g., `Kafka Local Cluster`
    - **Broker**: `kafka-cluster:9092`
3.  Click **Validate** to test connectivity.
4.  Once validated, click **Submit**.

![The image shows a user interface for configuring an Apache Kafka cluster, with options for setting the cluster name, bootstrap servers, and additional configurations like truststore and authentication. There are buttons for validating and submitting the configuration, and a success message indicates the configuration is valid.](https://kodekloud.com/kk-media/image/upload/v1752874710/notes-assets/images/Event-Streaming-with-Kafka-Demo-Setting-up-Kafka-Cluster-and-Kafka-UI-using-Docker/apache-kafka-cluster-configuration.jpg)

After submission, refresh the page. You should see your cluster listed:

![The image shows a dashboard interface for Apache Kafka, displaying details of a local cluster with one broker, 79 partitions, and 14 topics. The cluster is online with no production or consumption activity.](https://kodekloud.com/kk-media/image/upload/v1752874711/notes-assets/images/Event-Streaming-with-Kafka-Demo-Setting-up-Kafka-Cluster-and-Kafka-UI-using-Docker/apache-kafka-dashboard-cluster-details.jpg)

## 5\. Explore Cluster Details

### Brokers

Select **Brokers** from the sidebar to view:

- Broker count and IDs
- Controller status
- Kafka version
- Partition and replica status

![The image shows a user interface for Apache Kafka, displaying broker information with details such as broker count, active controller, version, and partition status. It indicates one broker with 79 online partitions and no out-of-sync replicas.](https://kodekloud.com/kk-media/image/upload/v1752874713/notes-assets/images/Event-Streaming-with-Kafka-Demo-Setting-up-Kafka-Cluster-and-Kafka-UI-using-Docker/apache-kafka-ui-broker-info.jpg)

### Topics

Click **Topics** to browse all existing topics, including demo and system topics created by `fast-data-dev`.

## Conclusion

With just two Docker commands, you now have a local Kafka cluster and a powerful UI to manage it. This setup eliminates heavy CLI usage and accelerates your development workflow.

## Links and References

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [Docker Documentation](https://docs.docker.com/)
- [Provectus Kafka UI GitHub](https://github.com/provectus/kafka-ui)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/2359e80d-66f6-4080-8e9c-d81a6a1600fe/lesson/745d2f7b-c59f-441c-9203-554e09cb90b4)**
>
> Watch video content
