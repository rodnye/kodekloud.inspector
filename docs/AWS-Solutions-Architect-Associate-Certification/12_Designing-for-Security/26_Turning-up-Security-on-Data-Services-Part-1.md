# Turning up Security on Data Services Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Data-Services-Part-1)

---

## Table of Contents

- Turning up Security on Data Services Part 1
  - The Power of Data Ingestion with Amazon Kinesis
  - Managed Service for Kafka (MSK)
  - Data Extraction, Transformation, and Load with AWS Glue
  - Data Transformation with Glue DataBrew
  - Designing for Security in Data Storage with Lake Formation
  - Data Presentation and Query with Amazon Athena
  - Elastic MapReduce (EMR) and Its Security Considerations
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Data Services Part 1

Welcome to this detailed lesson on designing secure data and machine learning services. In this article, we explore how security considerations evolve as services become more abstracted from the underlying infrastructure. Our focus will shift toward IAM permissions, access control, and monitoring with tools like CloudWatch. While some services, like SageMaker, still maintain many of the traditional configuration options found in EC2 or container-based systems, the primary discussion here centers on managing data inputs and outputs securely.

---

## The Power of Data Ingestion with Amazon Kinesis

Amazon Kinesis is a managed streaming service similar to Apache Kafka. It operates as a secure streaming bus where records are encrypted by default. When data is ingested, it is temporarily stored in Kinesis stream storage before being moved to an alternative storage solution. Kinesis supports both server-side encryption to protect data at rest and SSL/TLS to secure data in transit, ensuring robust data protection.

![The image is a diagram illustrating the security design for Amazon Kinesis, showing the flow of data and encryption processes involving a data producer, Kinesis Streams, and AWS KMS. It highlights steps for authorizing users, generating data keys, and encrypting data.](https://kodekloud.com/kk-media/image/upload/v1752864159/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/amazon-kinesis-security-design-diagram.jpg)

Kinesis offers three service types—data streams, video streams, and Firehose. All leverage CloudTrail and CloudWatch for monitoring while supporting various producers and consumers via SDKs. Note that the Kinesis agent is a standalone software component designed to send data to Kinesis Data Streams and Firehose (it does not support video streams).

![The image presents a question about Amazon Kinesis's encryption capabilities, offering four statements to choose from. It is designed to help a media streaming company understand encryption options for real-time data processing.](https://kodekloud.com/kk-media/image/upload/v1752864160/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/amazon-kinesis-encryption-quiz.jpg)

For instance, a global e-commerce platform might use a Java-based Kinesis agent to stream real-time clickstream data from web servers. The agent aggregates and forwards this data to either Kinesis Data Streams or Firehose. It is essential to understand that the agent is simply a software forwarder, not a piece of hardware or a standalone cloud service.

![The image presents a scenario about a global e-commerce platform considering Amazon Kinesis Agent for streaming real-time data, with four statements describing the agent's functionality.](https://kodekloud.com/kk-media/image/upload/v1752864162/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/global-ecommerce-amazon-kinesis-agent.jpg)

---

## Managed Service for Kafka (MSK)

Managed Service for Kafka (MSK) on AWS delivers a similar streaming solution focused on open-source Kafka. Unlike Kinesis with its shard-based model, MSK uses a more complex architecture involving Kafka brokers and ZooKeeper nodes for cluster management. AWS manages much of the heavy lifting—provisioning, configuration, and scaling—allowing you to focus on specifying the appropriate cluster size.

![The image is a diagram illustrating the security design for a Managed Service for Kafka (MSK) on AWS, showing the architecture with ZooKeeper and Broker nodes across different availability zones.](https://kodekloud.com/kk-media/image/upload/v1752864163/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/kafka-security-design-aws-diagram.jpg)

MSK enforces encryption at rest and in transit by default. Data at rest is secured using AWS KMS, while TLS encryption safeguards data as it moves between Kafka brokers and clients.

![The image is a diagram illustrating a secure managed service architecture for Kafka on AWS, featuring components like Amazon EC2, MSK Serverless, AWS Glue, Amazon S3, and Amazon Athena within a VPC. It highlights encryption by default for data at rest and in transit.](https://kodekloud.com/kk-media/image/upload/v1752864164/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/secure-kafka-architecture-aws-diagram.jpg)

When TLS is enabled for your MSK cluster, encrypted connections automatically extend to both brokers and ZooKeeper nodes, ensuring secure communication throughout the cluster.

![The image is a multiple-choice question about enabling TLS for Apache ZooKeeper in AWS Managed Service for Kafka (Amazon MSK), with four possible answers.](https://kodekloud.com/kk-media/image/upload/v1752864165/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/tls-apache-zookeeper-aws-msk-question.jpg)

Broker traffic logs can be exported to Amazon S3 for in-depth analysis by services such as AWS Glue, Athena, or Redshift. This capability distinguishes MSK from Kinesis, where detailed broker logging is not available.

![The image presents a scenario where a media streaming company uses Amazon MSK for Kafka, asking which feature allows access to broker logs, with four options provided.](https://kodekloud.com/kk-media/image/upload/v1752864166/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/amazon-msk-kafka-broker-logs.jpg)

---

## Data Extraction, Transformation, and Load with AWS Glue

AWS Glue is a robust service for ETL (Extract, Transform, Load) operations powered by PySpark. Glue comprises multiple components:

- A data crawler that scans various sources (like S3) to populate a data catalog.
- An ETL job engine to execute data transformation tasks.
- Glue Studio, which offers a graphical interface for creating and managing ETL jobs (with security managed by AWS).

> [!important]
> **Security Best Practice**
>
> When securing AWS Glue, it is advisable to use VPC endpoints for secure, private connectivity, restrict access with specific IAM roles and policies, and avoid storing sensitive data in plaintext within scripts.

![The image is a flowchart illustrating the data ingestion process using AWS Glue, involving an Amazon S3 source bucket, AWS Glue crawler, AWS Glue Data Catalog, AWS Glue job, and an Amazon S3 destination bucket. It highlights the components of Glue, such as the data crawler and catalog.](https://kodekloud.com/kk-media/image/upload/v1752864167/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/aws-glue-data-ingestion-flowchart.jpg)

Glue job bookmark data is encrypted using the default AWS KMS key, ensuring that job progress tracking remains confidential.

![The image presents a question about securing AWS Glue job bookmark data, followed by four options for ensuring confidentiality and integrity.](https://kodekloud.com/kk-media/image/upload/v1752864168/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/aws-glue-job-bookmark-security-options.jpg)

---

## Data Transformation with Glue DataBrew

Glue DataBrew allows users to visually transform and prepare data without the need to write code. Its intuitive drag-and-drop interface simplifies data cleaning, normalization, and preparation for analysis. DataBrew runs in a highly managed environment with security enforced by core AWS services, meaning encryption and logging rely on the settings of services such as S3 and VPC endpoints.

![The image is a flowchart illustrating the security features of Glue DataBrew, detailing the process from data sources to transformation and integration into a data lake house. It highlights components like Glue Connector, Glue Catalog, and Glue Elastic View.](https://kodekloud.com/kk-media/image/upload/v1752864169/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/glue-databrew-security-flowchart.jpg)

DataBrew integrates with both gateway endpoints for S3 and VPC interface endpoints for Glue, enhancing network isolation and security. It also supports encryption for both data in transit and at rest.

![The image is a diagram illustrating the security design for AWS Glue DataBrew, showing its integration with various AWS services like Amazon Redshift, Amazon RDS, and Amazon S3, along with encryption and logging tools.](https://kodekloud.com/kk-media/image/upload/v1752864170/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/aws-glue-databrew-security-diagram.jpg)

When addressing questions about Glue DataBrew’s encryption, the correct explanation is that it leverages AWS KMS for data at rest and adheres to standard logging protocols.

![The image presents a question about the encryption capabilities of AWS Glue DataBrew, with four multiple-choice options describing different encryption scenarios. Option 3 is highlighted, indicating it as the correct answer.](https://kodekloud.com/kk-media/image/upload/v1752864171/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/aws-glue-databrew-encryption-question.jpg)

---

## Designing for Security in Data Storage with Lake Formation

Lake Formation provides a robust security and governance layer over AWS data lakes. It integrates closely with IAM (and AWS SSO/Identity Center) to manage access control and permissions. Lake Formation supports fine-grained, cell- and row-level security while leveraging logging tools such as CloudWatch, CloudTrail, and AWS Config to track data access and compliance.

![The image presents a question about the basic authentication mechanisms in AWS Lake Formation, offering four multiple-choice options. It is designed to help a corporation understand security requirements for managing their data lake.](https://kodekloud.com/kk-media/image/upload/v1752864172/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/aws-lake-formation-authentication-question.jpg)

In addition, Lake Formation supports data classification and tag-based access control, which enforce security policies across databases and tables.

![The image discusses how AWS Lake Formation supports cell- and row-level security for a healthcare organization's data lake, presenting four points about its capabilities and requirements.](https://kodekloud.com/kk-media/image/upload/v1752864174/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/aws-lake-formation-security-healthcare.jpg)

![The image is a diagram illustrating the security design for AWS Lake Formation, showing data classification and tag-based access control using IAM conditions. It includes elements like databases, tables, and classifications such as confidential, sensitive, and non-confidential.](https://kodekloud.com/kk-media/image/upload/v1752864175/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/aws-lake-formation-security-diagram.jpg)

---

## Data Presentation and Query with Amazon Athena

Amazon Athena is a serverless SQL engine perfect for ad hoc analysis on data stored in locations such as S3, Redshift, or data cataloged by Glue and Lake Formation. Rather than storing data, Athena accesses it externally, leveraging pre-existing encryption settings (for example, server-side encryption with KMS or S3-managed keys). Athena relies on IAM for access control and integrates with CloudWatch and CloudTrail for monitoring and logging activity.

![The image is a diagram showing how Amazon Athena accesses data from various sources like Amazon S3, ElasticCache, DocumentDB, and others, with a focus on security design.](https://kodekloud.com/kk-media/image/upload/v1752864177/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/amazon-athena-data-access-diagram.jpg)

Athena supports querying data encrypted with AWS-managed keys, whether using S3’s SSE-S3 or AWS KMS. It’s important to remember that once data is loaded into memory for query execution, its security configuration is dictated by the source.

![The image is a table outlining S3 encryption options for AWS Athena, showing compatibility with reading/writing data and the requirement for a table property flag.](https://kodekloud.com/kk-media/image/upload/v1752864178/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/s3-encryption-options-aws-athena.jpg)

![The image explains options for using Amazon Athena with encrypted data in Amazon S3, highlighting support for server-side encryption with S3-managed keys and AWS KMS keys. It also notes limitations with customer-managed keys.](https://kodekloud.com/kk-media/image/upload/v1752864179/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/amazon-athena-encrypted-data-options.jpg)

---

## Elastic MapReduce (EMR) and Its Security Considerations

Amazon EMR is a powerful tool for data processing and batch analysis that runs on clusters of EC2 instances. An EMR cluster typically consists of master nodes (for coordination), core nodes (for storage and processing), and task nodes (for additional, ephemeral compute capacity). Although a serverless option is now available, most exam-relevant deployments involve traditional server-based clusters.

![The image is a diagram explaining the use of Amazon EMR Serverless for running Apache Spark and Hive jobs, highlighting the process of choosing a data processing framework, submitting jobs, and using tools like Amazon EMR Studio for development and analysis. It emphasizes Elastic MapReduce as a data processing and analysis tool.](https://kodekloud.com/kk-media/image/upload/v1752864180/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/amazon-emr-serverless-apache-spark-diagram.jpg)

For security, EMR clusters are deployed within a VPC, combining security groups with IAM permissions to enforce access control. Although EMR passively handles operating system patching by replacing old instances with new, patched ones, managing your own servers requires using tools like AWS Systems Manager for continuous patch management.

![The image explains how Amazon EMR handles server patching for security and stability, listing four methods: automatic patching, manual management, replacing instances, and using serverless technology.](https://kodekloud.com/kk-media/image/upload/v1752864181/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/amazon-emr-server-patching-methods.jpg)

EMR also integrates seamlessly with CloudWatch, CloudTrail, and custom logging solutions to provide comprehensive operational insights.

![The image is a diagram illustrating the security design for AWS Elastic MapReduce (EMR), showing components like AWS Systems Manager, IAM roles and policies, and secure access methods.](https://kodekloud.com/kk-media/image/upload/v1752864183/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/aws-emr-security-design-diagram.jpg)

In terms of data encryption, EMR offers HDFS transparent encryption (managed via KMS) and disk-level encryption for EBS volumes. These features, combined with robust logging via CloudWatch Logs and CloudTrail, ensure end-to-end security and monitoring of your data processing environment.

![The image is a diagram illustrating the security design for Elastic MapReduce (EMR) on AWS, showing the integration of Amazon EMR with CloudWatch and CloudTrail for monitoring and logging. It depicts users starting jobs on EMR, which runs on EC2 instances and integrates with Apache Spark.](https://kodekloud.com/kk-media/image/upload/v1752864184/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-1/emr-security-design-aws-diagram.jpg)

---

This comprehensive overview has covered the security designs integrated into various AWS data services. By understanding encryption, access controls, and monitoring mechanisms—from Kinesis to EMR—you are better equipped to architect secure data pipelines and processing frameworks on AWS.

For more information on best practices and service-specific guidance, be sure to explore the official documentation and related resources.

Happy architecting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/f588d58f-7e31-4b98-9717-cc9be60ed6da)**
>
> Watch video content
