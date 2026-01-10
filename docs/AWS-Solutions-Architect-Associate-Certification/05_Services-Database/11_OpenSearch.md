# OpenSearch - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Database/OpenSearch)

---

## Table of Contents

- OpenSearch
  - Components of the OpenSearch Solution
  - Integrations for OpenSearch
  - Common Use Cases
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Database

# OpenSearch

In this lesson, we explore AWS OpenSearch, a powerful search and analytics suite designed to handle a wide range of data types. You'll learn about its purpose, key components, and common use cases, as well as how it compares to traditional relational databases.

Modern applications often generate diverse data—including textual content, login events, geospatial information, time series data, JSON, and other semi-structured formats. While traditional relational databases excel at handling structured data with predefined schemas, they may struggle with the flexibility and scalability required for these varied data types. OpenSearch, built on the robust capabilities of Elasticsearch, efficiently manages this data in real time, making it an ideal solution for search engines, log management, and analytics.

![The image illustrates the need for OpenSearch by showing how various data types (textual, log and events, geospatial, time-series, and JSON) from EC2 and Lambda functions are processed using Elastic Search and Amazon OpenSearch Service.](https://kodekloud.com/kk-media/image/upload/v1752865200/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-OpenSearch/opensearch-ec2-lambda-data-types.jpg)

Before diving deeper, it is important to understand the relationship between Elasticsearch and OpenSearch. Originally, both Elasticsearch and Kibana were free and open source. However, when the managing company transitioned Elasticsearch to a proprietary license, Amazon forked the latest available open source version to maintain a truly open environment. While Elasticsearch now operates under a proprietary model, OpenSearch continues to be offered as a free and open source alternative under proper licensing.

## Components of the OpenSearch Solution

OpenSearch can be deployed as a managed cluster on Amazon or used via a serverless configuration. OpenSearch Serverless is an on-demand, auto-scaling offering that removes the operational burden of provisioning, configuring, and tuning an OpenSearch cluster—Amazon manages these tasks for you.

Additionally, OpenSearch Ingestion serves as a fully managed, serverless data collector that delivers real-time logs, metrics, and trace data to both OpenSearch Service domains and OpenSearch Serverless collections. For each OpenSearch cluster, this service creates a dedicated domain to simplify data delivery and management.

![The image is a diagram illustrating the components of AWS OpenSearch, including Amazon OpenSearch Service, OpenSearch Serverless, and the ingestion process involving Fluent Bit Client, OTEL Exporter, and Amazon S3. It shows data flow through OpenSearch Ingestion Pipelines to Amazon OpenSearch Service Domains.](https://kodekloud.com/kk-media/image/upload/v1752865201/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-OpenSearch/aws-opensearch-components-diagram.jpg)

With OpenSearch Ingestion, there is no longer a need for third-party tools like Logstash or Jaeger. You can configure your data producers to send information directly into OpenSearch Ingestion, which can also handle data transformation and cleaning before the data is delivered to your clusters.

One notable feature of OpenSearch is its ability to aggregate logs, traces, and metrics into a unified view, enabling comprehensive application analytics. Its machine learning integration further supports anomaly detection and alerting. OpenSearch also allows replicating indexes, mappings, and metadata between clusters, ensuring cross-cluster redundancy or offloading reporting queries. The service offers a variety of CPU, memory, and storage configurations—supporting up to three petabytes of attached storage. Moreover, OpenSearch provides a familiar SQL query syntax, enabling users to perform aggregations with WHERE clauses and to read data as JSON documents or CSV tables. For those with a background in SQL, this makes transitioning to OpenSearch straightforward. The platform also supports trace analytics, allowing the ingestion and visualization of open telemetry data.

![The image lists six features of AWS OpenSearch: Application Analytics, Anomaly Detection, Cross-Cluster Replication, 3 PB Storage, SQL Query Syntax, and Trace Analytics.](https://kodekloud.com/kk-media/image/upload/v1752865202/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-OpenSearch/aws-opensearch-features-list.jpg)

> [!important]
> **Note**
>
> For users transitioning from Elasticsearch, OpenSearch provides a familiar environment with additional serverless and ingestion features, allowing for streamlined operations and enhanced scalability.

## Integrations for OpenSearch

OpenSearch service domains automatically send operational metrics to CloudWatch, which helps monitor domain health and performance. AWS CloudShell maintains a history of OpenSearch configuration API calls and related events for auditing purposes. Other integrations include:

- **Amazon Kinesis:** Load and stream data into OpenSearch.
- **Amazon S3:** Use S3 for index storage.
- **IAM:** Securely manage cluster access.
- **Lambda:** Preprocess data before ingestion.
- **DynamoDB:** Automatically transfer table data to an OpenSearch cluster.
- **Amazon QuickSight:** Create interactive dashboards for visualizing OpenSearch data.

## Common Use Cases

OpenSearch is ideally suited for several real-world applications:

- **Observability:** Storing logs, metrics, and traces from applications and infrastructure in a centralized platform.
- **Security:** Managing security and event data in real time for threat detection and incident management.
- **Search Functionality:** Powering search capabilities within applications and websites to enhance user experiences.

![The image shows three use cases: "Monitor and Debug," "SIEM," and "Personalized Search," each represented by an icon and number.](https://kodekloud.com/kk-media/image/upload/v1752865203/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-OpenSearch/use-cases-monitor-debug-siem-personalized-search.jpg)

## Summary

OpenSearch is a community-driven search and analytics suite that originated as a fork of Elasticsearch to preserve its open source nature. With both traditional and serverless deployment options, OpenSearch simplifies the management and scaling of search clusters while integrating diverse data sources for comprehensive analytics.

![The image is a summary of OpenSearch, highlighting it as a community-driven search and analytics suite derived from Elasticsearch, and noting that serverless configuration simplifies the management of OpenSearch clusters.](https://kodekloud.com/kk-media/image/upload/v1752865205/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-OpenSearch/opensearch-summary-community-driven.jpg)

For more detailed information and best practices, consider visiting the following links:

- [AWS OpenSearch Documentation](https://docs.aws.amazon.com/opensearch-service/index.html)
- [Elasticsearch Overview](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [AWS CloudWatch Monitoring](https://aws.amazon.com/cloudwatch/)

> [!important]
> **Warning**
>
> Ensure that you understand the licensing differences between OpenSearch and Elasticsearch to avoid unexpected limitations or costs when deploying in production environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/9fb73cb5-caf2-4dc2-ad5c-fe5fe69507e3/lesson/e4e3b7b3-e1f5-4b99-a622-a52459b25fce)**
>
> Watch video content
