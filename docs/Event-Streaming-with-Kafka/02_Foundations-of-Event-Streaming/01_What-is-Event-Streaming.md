# What is Event Streaming - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Foundations-of-Event-Streaming/What-is-Event-Streaming)

---

## Table of Contents

- What is Event Streaming
  - Key Concepts
  - How It Works: Live News Example
  - Real-World Use Case: Taxi Booking App
  - Benefits of Event Streaming
  - Getting Started with Kafka
  - Links and References
  - Watch Video

---

## Content

Event Streaming with Kafka

Foundations of Event Streaming

# What is Event Streaming

Event streaming is the real-time processing and distribution of event data—discrete records that represent state changes or actions. Modern systems like Apache Kafka leverage durable, high-throughput logs to store and forward these events, enabling reactive architectures, analytics, and collaboration across distributed services.

## Key Concepts

- **Event**: A record of an occurrence (often a key-value pair) such as a user action, sensor reading, or system update.
- **Stream**: An ordered, append-only sequence of events.
- **Stream Processing**: The continuous transformation, enrichment, or routing of events as they arrive.

> [!important]
> **Note**
>
> Event streaming differs from batch processing by handling data instantly rather than in periodic chunks. This low-latency approach powers use cases like fraud detection, monitoring, and live dashboards.

## How It Works: Live News Example

Imagine you’re watching live news on your TV. Behind the scenes:

1.  A news server generates packets of data—each packet is an event (e.g., breaking news, weather alert).
2.  These events are published continuously to a streaming platform (like Kafka).
3.  Your TV client subscribes to the news topic and renders each packet in real time.

![The image illustrates the concept of event streaming, showing data packets moving from a server to a television where a person is watching breaking news.](https://kodekloud.com/kk-media/image/upload/v1752874722/notes-assets/images/Event-Streaming-with-Kafka-What-is-Event-Streaming/event-streaming-data-television.jpg)

In this scenario, each video frame or text bulletin is an event flowing through a durable log, ensuring you never miss a moment.

## Real-World Use Case: Taxi Booking App

A taxi-hailing app uses event streaming to coordinate riders, drivers, and billing services:

| Step                       | Event Type             | Description                                                                                  |
| -------------------------- | ---------------------- | -------------------------------------------------------------------------------------------- |
| 1\\. Request Ride          | ride\\\_requested      | Customer selects pickup/drop-off and sends a `ride_requested` event.                         |
| 2\\. Broadcast to Drivers  | ride\\\_offered        | The platform emits `ride_offered` to nearby drivers.                                         |
| 3\\. Driver Accepts        | ride\\\_accepted       | A driver returns `ride_accepted`, updating the customer’s UI with ETA and driver info.       |
| 4\\. Arrival & Start       | arrival, trip\\\_start | Driver arrives (`arrival`), passenger boards, then `trip_start` triggers billing.            |
| 5\\. Telemetry During Trip | telemetry              | Continuous events like GPS coordinates, speed, and traffic data are streamed for analytics.  |
| 6\\. Trip Completion       | trip\\\_end            | On drop-off, `trip_end` fires. The system calculates fare, charges the wallet, and pays out. |

![The image illustrates the fundamentals of event streaming through a sequence of events in a taxi booking process, from booking to the trip's completion. It includes six events: booking a taxi, driver acceptance, arrival at pickup, journey through the city, and reaching the destination.](https://kodekloud.com/kk-media/image/upload/v1752874724/notes-assets/images/Event-Streaming-with-Kafka-What-is-Event-Streaming/event-streaming-taxi-booking.jpg)

## Benefits of Event Streaming

| Benefit            | Impact                                                              |
| ------------------ | ------------------------------------------------------------------- |
| Scalability        | Partitioned logs enable horizontal scale for high-throughput loads. |
| Durability         | Events persist on disk, surviving failures and time-window replays. |
| Decoupling         | Producers and consumers operate independently, improving agility.   |
| Real-Time Insights | Instant analytics on live data for monitoring and alerting.         |

## Getting Started with Kafka

1.  **Install Kafka**  
    Follow the [Apache Kafka quickstart](https://kafka.apache.org/quickstart) to set up a single-node cluster.
2.  **Create a Topic**

    ```
    kafka-topics.sh --create --topic events --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
    ```

3.  **Produce Events**

    ```
    kafka-console-producer.sh --topic events --broker-list localhost:9092
    > {"eventType":"ride_requested","userId":"1234","pickup":"A","dropoff":"B"}
    ```

4.  **Consume Events**

    ```
    kafka-console-consumer.sh --topic events --from-beginning --bootstrap-server localhost:9092
    ```

## Links and References

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [Event-Driven Architecture](https://martinfowler.com/articles/201701-event-driven.html)
- [Stream Processing with Kafka Streams](https://kafka.apache.org/documentation/streams/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/2359e80d-66f6-4080-8e9c-d81a6a1600fe/lesson/66a8c0b0-26d3-445d-88b5-052f51cc82bf)**
>
> Watch video content
