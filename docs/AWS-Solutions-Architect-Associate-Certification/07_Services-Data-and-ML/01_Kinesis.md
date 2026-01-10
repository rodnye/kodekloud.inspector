# Kinesis - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Data-and-ML/Kinesis)

---

## Table of Contents

- Kinesis
  - Amazon Kinesis Product Overview
  - Data Streams
  - Data Firehose
  - Video Streams
  - Integration with AWS Services
  - Additional Resources
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Data and ML

# Kinesis

Welcome, Future Solutions Architects! I'm Michael Forrester, and in this article we'll explore the power of data ingestion using Amazon Kinesis, with a special focus on its machine learning applications. Amazon Kinesis is a real-time streaming service—think of it as a flowing river of data ready to be consumed downstream. It provides multiple products under its umbrella, each designed for specific data ingestion and processing needs.

## Amazon Kinesis Product Overview

The core products of Amazon Kinesis include:

| Product       | Use Case                                                                                      | Latency                     | Target Services                                      |
| ------------- | --------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------- |
| Data Streams  | Custom streaming data ingestion for applications like website behavior tracking.              | Milliseconds                | EC2, containerized apps, Lambda, EMR, Data Analytics |
| Data Firehose | Automatically ingesting data and performing ETL before streaming to data lakes or warehouses. | ~60 seconds (batching)      | S3, Redshift, OpenSearch Service, Splunk             |
| Video Streams | Streaming and processing video plus time-encoded data from devices like cameras and sensors.  | Varies (designed for video) | Lambda, SageMaker, third-party applications          |

## Data Streams

Data Streams is tailored for high-throughput streaming data. It enables the building of custom data inputs using the Kinesis library, capturing terabytes of data per hour with millisecond-level latency. Common use cases include website behavior metrics and video footage analysis. Once ingested, the data can be distributed to various AWS services such as EC2, containerized applications, Lambda, Data Analytics, or even EMR for further batch processing.

![The image is a diagram illustrating Amazon Kinesis Data Streams, showing data flow from various input sources to output services like Amazon EC2, Lambda, EMR, and Kinesis Data Analytics.](https://kodekloud.com/kk-media/image/upload/v1752865067/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Kinesis/amazon-kinesis-data-streams-diagram.jpg)

## Data Firehose

Unlike Data Streams, Data Firehose automatically ingests data and performs ETL (Extract, Transform, and Load) operations before sending it to target destinations. It is ideal for streaming data directly into data lakes, warehouses, and analytical services. The service supports near real-time processing with a minimum latency of around 60 seconds, allowing it to batch, compress, and encrypt data prior to loading into destinations such as Amazon S3, Redshift, OpenSearch Service, and Splunk.

![The image is a diagram illustrating Amazon Kinesis Data Firehose, showing data flow from various input sources to output destinations like Amazon S3, Amazon Redshift, Amazon OpenSearch Service, and Splunk.](https://kodekloud.com/kk-media/image/upload/v1752865068/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Kinesis/amazon-kinesis-data-firehose-diagram.jpg)

## Video Streams

Video Streams is designed specifically for streaming video along with time-encoded data from diverse devices, including surveillance cameras, mobile devices, and other sensors. This service is well-suited for applications that process fragmented time-encoded data—whether it's video, audio, or sensor outputs. Consumers, such as AWS Lambda, SageMaker, or third-party applications, can process this data to perform tasks like sentiment analysis and machine learning predictions.

![The image is a diagram illustrating the flow of data in Amazon Kinesis Video Streams, showing producers like cameras and smartphones sending data to Kinesis, which then connects to consumers/destinations such as Amazon Rekognition, SageMaker, S3, and AWS Lambda.](https://kodekloud.com/kk-media/image/upload/v1752865069/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Kinesis/kinesis-video-streams-data-flow-diagram.jpg)

> [!important]
> **Note**
>
> For both Data Streams and Video Streams, a producer library is used to stream data into Kinesis while consumer libraries allow you to pull data for further processing. These libraries contribute to the scalability and reliability of your applications by partitioning data into shards. Each shard acts as a virtual container handling a defined volume of data, and you can adjust your stream’s capacity by adding or combining shards.

Data records across these services are replicated across multiple Availability Zones, ensuring high durability. Data Streams and Video Streams offer a high availability rate (four nines), whereas Data Firehose provides three nines.

## Integration with AWS Services

Amazon Kinesis seamlessly integrates with AWS, making it easier to build custom applications using battle-tested libraries refined over the past decade. Its real-time and near real-time processing capabilities make it an excellent fit for a range of applications, from processing social media streams and financial transactions to managing online gaming activities.

![The image lists five features: Real-Time Data Processing, Scalability, Data Durability and Availability, Integration with AWS Services, and Custom Application Building. Each feature is represented with an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752865070/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Kinesis/data-processing-scalability-features.jpg)

> [!important]
> **Summary**
>
> In summary, Amazon Kinesis is a powerful solution for real-time data streaming and processing. Whether you are using Data Streams, Data Firehose, or Video Streams, Kinesis provides flexible, scalable, and resilient ingestion that is integral to modern data architectures.

If you have any questions or need further clarification, please feel free to reach out. Thank you for reading!

## Additional Resources

- [Amazon Kinesis Documentation](https://docs.aws.amazon.com/kinesis/)
- [AWS Machine Learning Services](https://aws.amazon.com/machine-learning/)
- [AWS Solutions Architect Certification](https://aws.amazon.com/certification/certified-solutions-architect-associate/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6d26fc1b-226e-4b42-be1f-f8168af74bb3/lesson/c1383b6c-afff-4871-8ce0-54530272e8e5)**
>
> Watch video content
