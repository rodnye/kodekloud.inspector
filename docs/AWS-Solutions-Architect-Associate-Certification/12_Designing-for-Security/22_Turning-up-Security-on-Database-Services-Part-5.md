# Turning up Security on Database Services Part 5 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Database-Services-Part-5)

---

## Table of Contents

- Turning up Security on Database Services Part 5
  - MemoryDB for Redis
  - DocumentDB
  - Keyspaces for Apache Cassandra
  - Neptune
  - Watch Video
    - Security Features
    - Client-Side Field Encryption
    - Monitoring and Detection
    - Security and Encryption
    - Monitoring and Logging

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Database Services Part 5

In this article, we explore the security designs implemented in various AWS database services. We cover MemoryDB for Redis, DocumentDB, Keyspaces for Apache Cassandra, and Neptune. Each service leverages unique AWS-managed features—such as VPC isolation, IAM-based authentication, encryption, and detailed monitoring—allowing you to architect secure solutions tailored to your needs.

---

## MemoryDB for Redis

MemoryDB for Redis is a fully managed, persistent in-memory database service that runs a Redis-compatible engine. It employs a primary-replica architecture where a primary node handles write operations while replica nodes serve read requests through a configuration endpoint.

![The image is a diagram illustrating the architecture of MemoryDB for Redis, showing components like AWS Secrets Manager, Amazon ECS, and Amazon CloudWatch within a VPC and availability zones. It highlights security groups, load balancers, and nodes, emphasizing IAM, firewall, and isolation practices.](https://kodekloud.com/kk-media/image/upload/v1752864280/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/memorydb-redis-architecture-diagram.jpg)

The design follows recognized AWS patterns:

- Replication across multiple availability zones.
- Microsecond read latencies comparable to ElastiCache.
- Support for Redis Access Control Lists (ACLs) to enforce command- and key-level permissions. Note that while IAM policies control resource-level access (e.g., console/API operations), Redis ACLs strictly manage access within the database.

![The image presents a question about the architecture of Amazon MemoryDB for Redis, with four possible statements describing its features.](https://kodekloud.com/kk-media/image/upload/v1752864282/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/amazon-memorydb-redis-architecture-question.jpg)

IAM policies provide resource-level access control, while Redis ACLs define granular command and key permissions independently of encryption.

![The image shows a user interface for creating a user in Amazon MemoryDB for Redis, including fields for user settings, passwords, and access strings. It also mentions that MemoryDB for Redis supports Redis Access Control Lists.](https://kodekloud.com/kk-media/image/upload/v1752864283/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/amazon-memorydb-user-interface-redis.jpg)

For network security, MemoryDB for Redis relies on VPC interface endpoints (as opposed to gateway endpoints) for private connectivity via PrivateLink. These endpoints, positioned behind a network load balancer, enable integration with services such as Lambda and SNS.

![The image is a diagram illustrating the architecture of MemoryDB for Redis, showing the flow between RDS users, AWS services like PrivateLink, Lambda, and Route 53, across two VPCs.](https://kodekloud.com/kk-media/image/upload/v1752864283/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/memorydb-redis-architecture-diagram-2.jpg)

Key aspects regarding VPC endpoint integration include:

- Support for VPC interface endpoints for private connectivity.
- Non-support of gateway endpoints.
- Utilization of standard AWS data transfer paths without bypass or acceleration.

![The image presents a question about integrating VPC Interface Endpoints with Amazon MemoryDB for Redis, followed by four possible statements describing the integration.](https://kodekloud.com/kk-media/image/upload/v1752864285/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/vpc-endpoints-amazon-memorydb-question.jpg)

### Security Features

MemoryDB for Redis offers robust encryption and security:

- Encryption at rest using AWS Key Management Service (KMS).
- Encryption in transit via TLS.
- Use of Redis ACLs for detailed command and key-level control.

![The image shows a MemoryDB for Redis interface highlighting advanced security settings, including security groups, encryption at rest, encryption in transit, and access control lists. It emphasizes that MemoryDB for Redis supports various forms of encryption.](https://kodekloud.com/kk-media/image/upload/v1752864286/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/memorydb-redis-security-settings.jpg)

For event monitoring, MemoryDB for Redis emits cluster events that can be captured with CloudWatch, CloudTrail, and delivered via SNS notifications.

![The image presents a question about MemoryDB for Redis events, with four options regarding how event notifications are delivered.](https://kodekloud.com/kk-media/image/upload/v1752864287/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/memorydb-redis-event-monitoring.jpg)

---

## DocumentDB

Amazon DocumentDB is a MongoDB-compatible document database service that provides native username/password authentication for client connections. For administrative operations, access is governed by IAM roles.

![The image presents a question about the basic authentication method in Amazon DocumentDB, with four possible statements describing different authentication mechanisms.](https://kodekloud.com/kk-media/image/upload/v1752864288/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/amazon-documentdb-authentication-question.jpg)

DocumentDB operates in a primary-replica configuration within a VPC, leveraging security groups, Network ACLs, and VPC isolation. Note that the default port for MongoDB (and DocumentDB) is 27017.

![The image is a diagram of AWS DocumentDB architecture, showing instances across three availability zones with a primary instance and replicas, highlighting read and write operations. It also mentions security features and the default MongoDB port.](https://kodekloud.com/kk-media/image/upload/v1752864289/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/aws-documentdb-architecture-diagram.jpg)

### Client-Side Field Encryption

DocumentDB supports client-side field encryption processed by the MongoDB driver. When querying an encrypted field, the process involves:

1.  Detecting the encrypted field.
2.  Requesting the required encryption key from an external key manager (typically AWS KMS).
3.  Encrypting the field before query submission.
4.  Decrypting the response on the client side using the decryption key.

![The image is a diagram explaining the process of client-side field encryption in DocumentDB, detailing steps from query submission to decryption. It includes six steps involving the MongoDB driver, key manager, and server interactions.](https://kodekloud.com/kk-media/image/upload/v1752864290/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/client-side-field-encryption-diagram.jpg)

To implement this encryption:

- Create an encryption key using AWS KMS.
- Associate the key with an appropriate IAM role.
- Configure your application to interact with AWS KMS during CRUD operations.

DocumentDB provides encryption both at rest and in transit via TLS.

![The image presents a scenario about a multinational corporation using Amazon DocumentDB for data protection, listing five encryption options and asking which two are provided by DocumentDB.](https://kodekloud.com/kk-media/image/upload/v1752864293/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/amazon-documentdb-encryption-options.jpg)

### Monitoring and Detection

DocumentDB leverages CloudWatch for performance monitoring. CPU utilization is typically the first metric that indicates cluster activity. Additionally, a built-in profiler logs slow operations to diagnose performance issues. Audit logs further support detailed tracking of database events.

![The image presents a question about which CloudWatch metric is the first indicator of activity for a DocumentDB cluster, with four options: CPUUtilization, NetworkPacketsOut, FreeableMemory, and VolumeBytesUsed.](https://kodekloud.com/kk-media/image/upload/v1752864294/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/cloudwatch-documentdb-metric-question.jpg)

![The image shows a DocumentDB interface displaying cluster parameters, including settings for a profiler, with options for enabling and modifying values.](https://kodekloud.com/kk-media/image/upload/v1752864295/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/documentdb-cluster-parameters-interface.jpg)

---

## Keyspaces for Apache Cassandra

Amazon Keyspaces is an AWS-managed service that is compatible with Apache Cassandra. It exclusively uses IAM for both authentication and authorization, in contrast to DocumentDB’s native username/password approach.

For example, the following snippet shows how Secrets Manager is used to manage credentials in the setup script:

```
--entrypoint aws-sm-cqlsh.sh
```

Keyspaces relies on IAM roles for secure, granular access rather than long-term static credentials.

![The image presents a question about authentication methods supported by Amazon Keyspaces for Apache Cassandra, with four options listed: password-based, IAM-based, LDAP-based, and token-based authentication.](https://kodekloud.com/kk-media/image/upload/v1752864296/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/amazon-keyspaces-authentication-methods.jpg)

AWS manages infrastructure components such as guest OS patching, freeing customers to focus on data and application management.

![The image is a diagram illustrating the integration of Keyspaces for Apache Cassandra with an ECS cluster, showing roles for writing and reading data using Node.js tasks and services. It highlights the use of IAM roles and REST API interactions with a keyspace and table.](https://kodekloud.com/kk-media/image/upload/v1752864297/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/keyspaces-apache-cassandra-ecs-diagram.jpg)

### Security and Encryption

Key security features for Keyspaces include:

- Encryption at rest using AWS KMS (with AWS-managed or customer-managed keys).
- Encryption in transit by default via TLS.

![The image illustrates the encryption process for Amazon Keyspaces (for Apache Cassandra) using AWS Key Management Service (KMS), showing how AWS KMS keys encrypt table keys, which in turn encrypt data encryption keys and data.](https://kodekloud.com/kk-media/image/upload/v1752864298/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/amazon-keyspaces-encryption-process.jpg)

![The image is a diagram illustrating the encryption process for Amazon Keyspaces (for Apache Cassandra), showing data flow from Cassandra drivers, CQL requests, and the Amazon Keyspaces console through TLS encryption to encrypted storage.](https://kodekloud.com/kk-media/image/upload/v1752864299/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/amazon-keyspaces-encryption-diagram.jpg)

Monitoring is handled by AWS CloudWatch and CloudTrail for capturing logs and metrics. AWS X-Ray and additional custom solutions are typically unnecessary for routine monitoring.

![The image shows a graph of write/successful request latency per second for Apache Cassandra keyspaces, with various operations like INSERT, UPDATE, and DELETE tracked over time. It mentions the use of CloudWatch and CloudTrail for security-related metrics and logs.](https://kodekloud.com/kk-media/image/upload/v1752864300/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/cassandra-latency-graph-cloudwatch.jpg)

![The image presents a scenario where a fintech startup using Amazon Keyspaces for Apache Cassandra needs to monitor database performance, offering four solutions: using Amazon CloudWatch, implementing custom logging, using AWS X-Ray, and enabling AWS Shield.](https://kodekloud.com/kk-media/image/upload/v1752864301/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/fintech-amazon-keyspaces-monitoring-solutions.jpg)

---

## Neptune

Amazon Neptune is a managed graph database service similar to Neo4j. It supports both IAM database authentication and local user authentication for application-level management.

![The image is a diagram illustrating the architecture of AWS Neptune, a graph database, showing its integration with IAM, network load balancer, and other AWS services like Lambda and CloudWatch. It includes components such as a client, DNS server, and multiple subnets within a VPC.](https://kodekloud.com/kk-media/image/upload/v1752864302/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/aws-neptune-architecture-diagram.jpg)

For access control, it is recommended to use IAM for fine-grained, role-based authentication rather than a custom solution. The cluster endpoint of Neptune is located in a private subnet and secured by security groups.

![The image presents a question about controlling access to an Amazon Neptune database, with four suggested methods for a bioinformatics company to consider.](https://kodekloud.com/kk-media/image/upload/v1752864304/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/amazon-neptune-access-control-methods.jpg)

Neptune follows a maintenance paradigm similar to RDS and DocumentDB. Patching occurs during configured maintenance windows. The encryption capabilities in Neptune include:

- Encryption at rest via AWS KMS.
- In-transit encryption using TLS.

![The image outlines encryption options available in Amazon Neptune, including encryption at rest with AWS KMS, in-transit encryption using TLS, client-side encryption with AWS SDK, and transparent data encryption (TDE).](https://kodekloud.com/kk-media/image/upload/v1752864305/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/amazon-neptune-encryption-options.jpg)

### Monitoring and Logging

Neptune leverages CloudWatch for monitoring and CloudTrail for auditing API calls. Although native slow query logs are not available, error logs and cluster status events play an essential role in troubleshooting.

> [!important]
> **Note**
>
> Audit logs are available in Neptune, which assist in tracking database events for compliance and performance troubleshooting.

![The image presents a question about logging options in Amazon Neptune for a financial institution's compliance needs, listing four types of logs: Audit Logs, Slow Query Logs, Error Logs, and Transaction Logs.](https://kodekloud.com/kk-media/image/upload/v1752864306/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/amazon-neptune-logging-options.jpg)

For event notifications, Neptune supports various delivery channels (including SNS) without the need for Lambda integration.

![The image presents a question about Amazon Neptune's event notification capabilities, listing four options describing the features.](https://kodekloud.com/kk-media/image/upload/v1752864308/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/amazon-neptune-event-notifications.jpg)

Patching for Neptune databases is conducted during scheduled maintenance windows, ensuring controlled updates and minimizing manual intervention.

![The image presents a scenario where a financial institution needs to manage patching for its Amazon Neptune database, offering four options: manual download, scheduling maintenance windows, using AWS Lambda, and relying on EC2 Systems Manager.](https://kodekloud.com/kk-media/image/upload/v1752864309/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-5/amazon-neptune-patching-options.jpg)

---

This comprehensive overview has covered the security design and operational details for MemoryDB for Redis, DocumentDB, Keyspaces for Apache Cassandra, and Neptune. By leveraging AWS-managed features such as VPC isolation, IAM, encryption, and monitoring, you can design robust and secure database architectures on AWS.

For more detailed information, consider exploring:

- [AWS Database Services Overview](https://aws.amazon.com/products/databases/)
- [Amazon MemoryDB for Redis Documentation](https://aws.amazon.com/memorydb/)
- [Amazon DocumentDB Documentation](https://aws.amazon.com/documentdb/)
- [Amazon Keyspaces Documentation](https://aws.amazon.com/keyspaces/)
- [Amazon Neptune Documentation](https://aws.amazon.com/neptune/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/44f0e62f-ae7c-41a9-9aab-981ce528501a)**
>
> Watch video content
