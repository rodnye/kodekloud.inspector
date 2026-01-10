# Architecture of Loki - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Grafana-Loki/Grafana-Loki-Essentials-Part-1/Architecture-of-Loki)

---

## Table of Contents

- Architecture of Loki
  - Log Collection and Ingestion
  - Log Processing and Labeling
  - Scalable and Cost-Efficient Storage
  - Querying Logs with LogQL
  - Example Architecture Scenario
  - Conclusion
  - Watch Video

---

## Content

Grafana Loki

Grafana Loki Essentials Part 1

# Architecture of Loki

In this article, we explore the architecture of Loki, detailing how its components work together to collect, store, and deliver log data. This guide covers everything from log ingestion using various agents to efficient querying with LogQL, emphasizing the scalability and cost-effectiveness of Loki's design.

## Log Collection and Ingestion

Loki is known for its flexibility in log collection. Although Loki provides its own log collection client, Promtail, you are not limited to it. Other popular log shippers such as [Fluentd](https://www.fluentd.org/) and [Logstash](https://www.elastic.co/logstash) can also be used in your environment. After installing the chosen agent on your servers, these agents continuously collect logs and stream the data to the Loki server.

> [!important]
> **Log Agents**
>
> Loki supports multiple log shippers, giving you the freedom to choose the best tool that fits your infrastructure and use case.

## Log Processing and Labeling

Once logs are received by the Loki server, the system parses the logs to extract the fundamental log content and its associated metadata, known as labels. These labels are configured by you and are essential for Loki's performance, as only these labels are indexed rather than the entire log message. This design choice reduces indexing overhead and streamlines log queries.

For example, consider the following log entry:

```
labels {job='syslog', env='production'}
{"level":40,"time":1689639590833,"pid":23220,"hostname":"DESKTOP80RTSJL","method":"GET","route":"/products","code":"200"}
```

In this instance, Loki focuses on indexing the labels (`job` and `env`), while storing the complete log data separately.

## Scalable and Cost-Efficient Storage

Loki supports multiple storage backends for the log data. You can choose from traditional local file systems or leverage modern object storage solutions such as [Amazon S3](https://aws.amazon.com/s3/). Object storage is particularly beneficial as it often reduces operational costs while providing high scalability and ease of management.

## Querying Logs with LogQL

For retrieving and analyzing logs, Loki uses its powerful query language called LogQL. With LogQL, you can filter logs, narrow down searches by timeframe, and perform various analytical queries. Due to Loki’s integration within the [Grafana](https://grafana.com) ecosystem, many users prefer querying logs via Grafana’s intuitive graphical interface, although a command-line interface (CLI) is also available for direct queries.

> [!important]
> **Grafana Integration**
>
> Integrating Loki with Grafana enhances your log analysis experience by leveraging Grafana's rich visualization and dashboard capabilities.

## Example Architecture Scenario

For demonstration purposes, imagine your environment comprises three servers:

- **Loki Server:** The central instance running Loki.
- **Node One:** A server acting as a log source.
- **Node Two:** Another server providing log data.

Each server's hostname reflects its role, ensuring clarity and avoiding confusion during system operations. Logs collected from Node One and Node Two are forwarded to the Loki server, where they undergo label extraction, storage, and indexing.

## Conclusion

By understanding the detailed architecture—from log collection via agents like Promtail (or alternatives like Fluentd and Logstash) to efficient log querying using LogQL—users can appreciate how Loki facilitates effective log management. Its scalable design, coupled with versatile storage options and robust querying capabilities, makes Loki an excellent choice for modern log analysis and troubleshooting.

For more insights into log management and best practices, consider exploring additional resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Amazon S3 Overview](https://aws.amazon.com/s3/)
- [Grafana Documentation](https://grafana.com/docs/)

Embrace Loki's architecture to streamline your logging infrastructure and boost your operational efficiency.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/grafana-loki/module/99ea0065-ea43-4058-9fef-46fbe62292ee/lesson/97f44e50-9805-48af-8508-c585f90e7ee8)**
>
> Watch video content
