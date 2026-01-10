# Exam Tips - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Data-Analytics/Exam-Tips)

---

## Table of Contents

- Exam Tips
  - Kinesis Data Streams
  - Kinesis Firehose
  - Kinesis Data Analytics
  - Amazon Athena
  - OpenSearch
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Data Analytics

# Exam Tips

In this guide, we highlight crucial points and best practices for the [AWS Certified Developer - Associate](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate) exam. We cover services such as Kinesis Data Streams, Kinesis Firehose, Kinesis Data Analytics, Amazon Athena, and OpenSearch. Each section includes diagrams to reinforce the concepts visually.

---

## Kinesis Data Streams

Kinesis Data Streams simplifies the real-time collection, processing, and analysis of video and data streams. It is well-suited for use cases like log processing, real-time analytics, and IoT telemetry.

- **Data Producers:**  
  Producers send data records to a stream using the PutRecords API. These producers can be applications that leverage the AWS SDK, the Kinesis Producer Library (KPL), IoT devices, mobile devices, or even DynamoDB Streams.

![The image provides tips for using Kinesis Data Stream, highlighting its real-time data processing capabilities and the use of producers like AWS SDK/KPL and IoT devices.](https://kodekloud.com/kk-media/image/upload/v1752858607/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/kinesis-data-stream-tips-real-time.jpg)

- **Record Limitations and Throughput:**  
  Each record in the stream must be smaller than 1 MB. Producers can write up to 1 MB per second or 1,000 messages per shard.
- **Partition Keys and Sharding:**  
  When inserting a record, a partition key is mandatory. This key is hashed to determine the shard where the record will be stored. Using the same partition key always results in the same shard assignment, ensuring consistent data distribution.
- **Managing Hot Partitions:**  
  A hot partition occurs when a shard nears its throughput capacity, triggering a "provisioned throughput exceeded" error. To prevent and manage hot partitions:
  - Choose partition keys with high entropy to promote an even distribution of data.
  - Implement retries with exponential backoff.
  - Perform shard splitting to boost throughput.
  - Merge underused shards to optimize costs.

> [!important]
> **Warning**
>
> Hot partitions can significantly impact your application's performance. Ensure you design your partition keys carefully and monitor shard performance to mitigate throughput issues.

![The image provides tips for managing Kinesis Data Streams, including handling partition keys, addressing hot partitions, and implementing shard splitting.](https://kodekloud.com/kk-media/image/upload/v1752858608/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/kinesis-data-streams-management-tips.jpg)

- **Data Consumption Modes:**  
  There are two primary ways to read data from a Kinesis stream:
  1.  **Fan-Out Consumer:**
      - Uses the GetRecords API (pull model).
      - Shares a throughput limit of 2 MB per second per shard across all consumers.

  2.  **Enhanced Fan-Out Consumer:**
      - Uses the SubscribeToShard API (push model).
      - Allocates an exclusive 2 MB per second per shard for each consumer, allowing higher throughput with multiple consumers.

![The image provides tips for acing an exam on Kinesis Data Stream, including merging underused shards to reduce costs and explaining data reading modes for consumers.](https://kodekloud.com/kk-media/image/upload/v1752858610/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/kinesis-data-stream-exam-tips.jpg)

- **Kinesis Client Library (KCL):**  
  The KCL facilitates the setup of consumers across multiple nodes (EC2 instances, on-premises servers, or Elastic Beanstalk) to process data from Kinesis streams efficiently. Note that only one KCL instance can run per shard. For instance, with five shards, you can have a maximum of five KCL instances. The library also provides important features like checkpointing and workload distribution for improved reliability.

---

## Kinesis Firehose

Kinesis Firehose is a fully managed service that reliably delivers streaming data to destinations such as S3, Redshift, and OpenSearch.

- **Key Differences and Features:**
  - Firehose is designed for direct data delivery, unlike Kinesis Data Streams which is primarily for data ingestion.
  - Allows data transformation via AWS Lambda, enabling modifications to your data before storing it in destinations like S3.
  - Provides near real-time delivery with automated backup of failed data transfers to an S3 bucket.

![The image provides tips for acing an exam on Kinesis Firehose, highlighting its ability to deliver real-time streaming data to destinations like S3, Redshift, and OpenSearch, and its support for data transformation using AWS Lambda.](https://kodekloud.com/kk-media/image/upload/v1752858611/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/kinesis-firehose-exam-tips.jpg)

---

## Kinesis Data Analytics

Amazon Kinesis Data Analytics empowers you to process and analyze streaming data using standard SQL queries.

- **Integration:**
  - Streaming data sources and sinks must be either Kinesis Data Streams or Kinesis Firehose, ensuring a seamless integration between data ingestion and analytics.

![The image is a slide titled "Tips to Ace Your Exam – Kinesis Data Analytics," mentioning that Amazon Kinesis Data Analytics allows processing and analyzing streaming data using standard SQL.](https://kodekloud.com/kk-media/image/upload/v1752858612/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/tips-to-ace-exam-kinesis-data-analytics.jpg)

---

## Amazon Athena

Amazon Athena enables interactive querying of data stored in S3 using SQL.

- **Supported Formats:**  
  Athena supports multiple data formats including Parquet, JSON, CSV, ORC, and Avro. Once the data is queried, you can leverage Amazon QuickSight to create compelling visualizations.

![The image provides tips for using Athena, highlighting its ability to query data in S3 using SQL and listing supported formats: Parquet, JSON, CSV, ORC, and Avro.](https://kodekloud.com/kk-media/image/upload/v1752858613/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/athena-s3-query-tips-formats.jpg)

---

## OpenSearch

OpenSearch is a fully managed service that simplifies the deployment, scaling, and operational management of OpenSearch clusters.

- **Modes and Use Cases:**
  - Supports both managed and serverless cluster modes.
  - Ideal for scenarios requiring log analysis or robust search capabilities since queries can be executed across all fields and attributes.

![The image provides tips for acing an exam on OpenSearch, highlighting its fully managed service, support for managed and serverless clusters, and suitability for logs and search implementation.](https://kodekloud.com/kk-media/image/upload/v1752858614/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/opensearch-exam-tips-managed-service.jpg)

---

By understanding these services and best practices, you will be well-prepared to tackle the AWS Certified Developer - Associate exam. Each component—whether it is managing data streams, ensuring efficient data delivery, processing streaming data with SQL, or performing ad-hoc queries—plays a key role in building robust AWS applications.

> [!important]
> **Note**
>
> Review each service's unique features and experiment in a lab environment to gain practical experience. This hands-on approach will help solidify your understanding and improve your exam performance.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/ac3fe785-4e7a-4f57-ae16-99fcd3cfde7e/lesson/4b8fdf22-b568-46d9-b506-9ddcdfa1a071)**
>
> Watch video content
