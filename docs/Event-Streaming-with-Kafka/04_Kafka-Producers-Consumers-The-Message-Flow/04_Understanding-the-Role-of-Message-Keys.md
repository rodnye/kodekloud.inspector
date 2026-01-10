# Understanding the Role of Message Keys - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Kafka-Producers-Consumers-The-Message-Flow/Understanding-the-Role-of-Message-Keys)

---

## Table of Contents

- Understanding the Role of Message Keys
  - How Kafka Assigns Partitions
  - The Murmur2 Hash Algorithm
  - Key Benefits
  - References
  - Watch Video
    - Partition Assignment Workflow

---

## Content

Event Streaming with Kafka

Kafka Producers Consumers The Message Flow

# Understanding the Role of Message Keys

In Apache Kafka, message keys play a critical role in determining which partition a record lands in. By hashing the key, Kafka ensures balanced load distribution and ordered processing for messages with the same key.

## How Kafka Assigns Partitions

When a producer sends a record, it provides both a **key** and a **value**. The Kafka client then:

1.  **Fetches Cluster Metadata**  
    The producer connects to a _bootstrap server_ to retrieve metadata (brokers, topics, partitions).
2.  **Applies the Partitioner**  
    Using the metadata, the client-side partitioner computes a hash of the key and selects a partition.
3.  **Sends to the Leader**  
    The record is routed directly to the leader broker for the chosen partition, avoiding inter-broker forwarding.

### Partition Assignment Workflow

| Step | Action                                                                             |
| ---- | ---------------------------------------------------------------------------------- |
| 1    | Connect to bootstrap server and fetch metadata                                     |
| 2    | Call the partitioner with the record key                                           |
| 3    | Compute `partition_index = hash(key) % num_partitions`                             |
| 4    | Send the record to the leader of `partition_index`                                 |
| 5    | Leader appends the record to its log and replicates it according to topic settings |

> [!important]
> **Note**
>
> If the record key is `null`, the default partitioner falls back to round-robin distribution across available partitions.

## The Murmur2 Hash Algorithm

Kafka’s default partitioner uses the non-cryptographic **MurmurHash2** (Murmur2) function to hash message keys. This choice provides:

- **Even Distribution**: Prevents hotspots by spreading keys across partitions.
- **Ordering Guarantees**: Ensures messages with the same key always go to the same partition.
- **Low Overhead**: Fast hashing suitable for high-throughput streaming.

Below is a simplified example of how Murmur2 drives partition selection:

```
// Pseudocode for Kafka's partitioner logic
int hash = murmur2(keyBytes);
int partition = Math.abs(hash) % numPartitions;
return partition;
```

For instance, given three partitions (0, 1, 2) and a key `"StationA"`:

1.  `hash = murmur2("StationA") // e.g., 10`
2.  `partition = 10 % 3 = 1`
3.  The record always goes to **partition 1**.

![The image illustrates how message keys are used in Kafka to determine partition assignment using the Murmur2 hash function. It shows different stations with their hashed keys and how they map to specific partitions across brokers.](https://kodekloud.com/kk-media/image/upload/v1752874752/notes-assets/images/Event-Streaming-with-Kafka-Understanding-the-Role-of-Message-Keys/kafka-message-keys-partition-assignment.jpg)

## Key Benefits

- **Load Balancing**: Evenly distributes data to prevent overloaded partitions.
- **Parallel Processing**: Different partitions can be consumed concurrently.
- **Ordering**: Guarantees per-key ordering within a partition.
- **Client-Side Routing**: Reduces broker overhead by computing routes on the producer.

## References

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [MurmurHash2 Algorithm](https://en.wikipedia.org/wiki/MurmurHash)
- [Kafka Producer API](https://kafka.apache.org/28/javadoc/index.html?org/apache/kafka/clients/producer/KafkaProducer.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/25a81d98-c284-444b-b64d-6141e562d17d/lesson/37e04f2f-21d6-490c-8ff3-bcfb9ed542db)**
>
> Watch video content
