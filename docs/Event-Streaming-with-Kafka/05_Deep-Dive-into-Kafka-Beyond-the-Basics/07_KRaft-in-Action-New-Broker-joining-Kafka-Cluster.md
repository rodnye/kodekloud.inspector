# KRaft in Action New Broker joining Kafka Cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Deep-Dive-into-Kafka-Beyond-the-Basics/KRaft-in-Action-New-Broker-joining-Kafka-Cluster)

---

## Table of Contents

- KRaft in Action New Broker joining Kafka Cluster
  - Cluster Join Workflow
  - 1. Broker Startup and Leader Election
  - 2. Sending the BrokerRegistration Request
  - 3. Achieving Quorum Consensus
  - 4. Metadata Topic Update and Acknowledgment
  - 5. Cluster-wide Notification
  - 6. Partition Rebalancing
  - 7. Finalizing the Integration
  - Links and References
  - Watch Video

---

## Content

Event Streaming with Kafka

Deep Dive into Kafka Beyond the Basics

# KRaft in Action New Broker joining Kafka Cluster

In this guide, we’ll walk through how KRaft manages a new broker joining an existing Kafka cluster using its native controller quorum and metadata topics—no ZooKeeper required.

![The image is a flowchart illustrating the process of a new broker joining a Kafka cluster, detailing steps like leader election, join requests, and partition rebalancing.](https://kodekloud.com/kk-media/image/upload/v1752874670/notes-assets/images/Event-Streaming-with-Kafka-KRaft-in-Action-New-Broker-joining-Kafka-Cluster/kafka-cluster-broker-join-flowchart.jpg)

## Cluster Join Workflow

Below is a high-level overview of each step in the broker-join process:

| Step | Description                                    | Component                |
| ---- | ---------------------------------------------- | ------------------------ |
| 1    | Broker startup and leader check                | New Broker & Controllers |
| 2    | Submit `BrokerRegistration` request            | Broker → Controller      |
| 3    | Quorum consensus on registration               | Controller Quorum        |
| 4    | Update `_cluster_metadata` and acknowledge     | Controller               |
| 5    | Notify all brokers of the new member           | Controller → Brokers     |
| 6    | Rebalance partitions across the cluster        | Partition Reassigner     |
| 7    | Commit final partition assignments to metadata | Metadata Topic           |

## 1\. Broker Startup and Leader Election

1.  The new broker process launches and attempts to join the cluster.
2.  It checks if a controller (leader) exists:
    - **No controller**: KRaft controllers trigger a leader election.
    - **Controller present**: Broker proceeds to send its join request.

## 2\. Sending the `BrokerRegistration` Request

The broker sends a `BrokerRegistration` RPC to the elected controller to initiate the join.

> [!important]
> **Configuration Check**
>
> Before accepting the request, the controller validates broker settings—unique `broker.id`, version compatibility, listener configurations, and any security protocols.

## 3\. Achieving Quorum Consensus

1.  The controller broadcasts the registration to the controller quorum.
2.  A majority of controllers must acknowledge to confirm the new broker can join.

## 4\. Metadata Topic Update and Acknowledgment

Once consensus is reached:

- The controller appends the new broker’s entry to the `_cluster_metadata` topic.
- An acknowledgment is sent back to the joining broker, marking it as active.

## 5\. Cluster-wide Notification

- All existing brokers receive a notification about the new member.
- This event is also recorded in the metadata topic to ensure durability.

## 6\. Partition Rebalancing

After onboarding:

- The cluster evaluates current partition assignments.
- Partitions are redistributed to include the new broker, balancing load.

> [!important]
> **Rebalancing Impact**
>
> Partition rebalancing can temporarily increase network and disk I/O. Schedule rebalances during off-peak hours or monitor metrics closely.

## 7\. Finalizing the Integration

- Updated partition assignments are committed to the `_cluster_metadata` topic.
- The cluster is now fully operational with the new broker integrated.

---

By leveraging KRaft’s built-in controller quorum and metadata topics, Kafka ensures high availability, strong consistency, and seamless scaling—eliminating the need for an external ZooKeeper service.

## Links and References

- [Kafka KRaft Architecture](https://kafka.apache.org/documentation/#kraft)
- [Metadata Topics in Kafka](https://kafka.apache.org/documentation/#metadata)
- [Partition Reassignment Tool](https://kafka.apache.org/documentation/#partition_reassignment)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/9aa104e8-faa5-4099-977f-71744306b99d/lesson/f928821c-14b1-49d0-83cb-414074d06e1a)**
>
> Watch video content
