# Turning up Reliability on Database Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Reliability/Turning-up-Reliability-on-Database-Services)

---

## Table of Contents

- Turning up Reliability on Database Services
  - Shared Responsibility in Managed Services
  - Amazon RDS and Relational Databases
  - Amazon Aurora
  - Amazon Redshift and Redshift Serverless
  - Monitoring and Logging for RDS
  - NoSQL Options
  - OpenSearch and OpenSearch Serverless
  - Open Source Database Alternatives
  - Graph Databases
  - Immutable and Time Series Databases
  - Summary
  - Watch Video
  - Practice Lab
    - Read Replicas and High Availability
    - Upgrading Using Read Replicas
    - Multi-AZ Deployments
    - RDS Proxy
    - Amazon DynamoDB
    - DynamoDB Accelerator (DAX)
    - Amazon ElastiCache (Redis/Memcached)
    - Amazon MemoryDB for Redis
    - Amazon DocumentDB
    - Amazon Keyspaces (for Apache Cassandra)
    - Amazon Neptune
    - Amazon QLDB
    - Amazon Timestream

---

## Content

AWS Solutions Architect Associate Certification

Designing for Reliability

# Turning up Reliability on Database Services

Welcome, Future Solutions Architects!

Presented by Michael Forrester, this article explores designing for reliability with database services on AWS. We cover relational and NoSQL databases along with open source alternatives, focusing on how to achieve high availability, failover, replication, and optimal performance. Key AWS services discussed include Amazon RDS, Aurora, DynamoDB, DocumentDB, Redshift, OpenSearch, ElastiCache, and more.

---

## Shared Responsibility in Managed Services

As you transition from managing infrastructure to using managed services, your role in ensuring reliability evolves. With traditional compute services like EC2, you assume a larger share of the reliability burden, whereas serverless options handle many resiliency aspects automatically.

![The image is a diagram illustrating the shared responsibility model for various AWS services, showing the division of responsibilities between the customer and AWS across infrastructure, container, and managed services. It highlights how customer responsibility and customization decrease from infrastructure to managed services.](https://kodekloud.com/kk-media/image/upload/v1752863745/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/aws-shared-responsibility-model-diagram.jpg)

---

## Amazon RDS and Relational Databases

Amazon RDS simplifies managing relational databases by handling tasks like patching, backup, and replication. When designing for high availability and performance, take advantage of features such as read replicas and Multi-AZ deployments.

### Read Replicas and High Availability

Utilize read replicas to offload read traffic from the primary (writer) instance. For example, you can configure DNS endpoints as follows:  
• read.myapplication.companyname.com (reader endpoint)  
• rewrite.myapplication.companyname.com (writer endpoint)

Keep in mind that replication for read replicas is asynchronous. In one production scenario, offloading 80% of the traffic from the primary server improved overall performance.

In situations like IBM DB2 on RDS, a production setup might require both high availability (HA) and resiliency. The recommended approach is a Multi-AZ configuration with synchronous replication. Using a cluster instance with two backup copies further boosts resiliency.

![The image presents a scenario where a Solutions Architect needs to choose a deployment strategy for an IBM DB2 database on Amazon RDS, focusing on high availability and resiliency. Four options are provided, including Multi-AZ deployment, single Availability Zone deployment with snapshots, cross-region read replicas, and using Amazon RDS on VMware.](https://kodekloud.com/kk-media/image/upload/v1752863746/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/ibm-db2-amazon-rds-deployment-options.jpg)

### Upgrading Using Read Replicas

A best practice for database upgrades is to first upgrade the read replica and then promote it to primary. This minimizes downtime and helps ensure consistency during the upgrade process.

![The image is a flowchart illustrating the process of upgrading a database using read replicas in RDS. It shows steps from creating a read replica to promoting it to a standalone instance and reconnecting applications.](https://kodekloud.com/kk-media/image/upload/v1752863747/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/database-upgrade-read-replicas-flowchart.jpg)

If heavy read traffic—such as in e-commerce applications—impacts performance, consider deploying read replicas across multiple Availability Zones to distribute the load.

![The image presents a scenario where an e-commerce company faces significant read traffic on their Amazon RDS database, impacting performance. It suggests four solutions for a Solutions Architect to improve performance and resiliency using RDS read replicas.](https://kodekloud.com/kk-media/image/upload/v1752863748/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/ecommerce-rds-read-traffic-solutions.jpg)

### Multi-AZ Deployments

A Multi-AZ configuration keeps a synchronous secondary (or multiple readable standbys) alongside the primary instance. In case of a failure, a standby instance is automatically promoted to primary, minimizing downtime without manual DNS updates.

![The image is a diagram illustrating Amazon RDS Multi-AZ with two readable standbys, showing the flow of data between reader and writer endpoints, standby reader instances, and Amazon EBS for durability.](https://kodekloud.com/kk-media/image/upload/v1752863749/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-rds-multi-az-diagram.jpg)

For SQL Server deployments, RDS supports synchronous replication to a standby instance without manual intervention—DNS updates occur automatically during failover.

![The image presents a question about the key advantage of using Amazon RDS Multi-AZ deployments with SQL Server for high database write availability and minimal downtime, followed by four possible answers.](https://kodekloud.com/kk-media/image/upload/v1752863750/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-rds-multi-az-advantage-question.jpg)

### RDS Proxy

RDS Proxy serves as a connection pool between your application and RDS instances. It maintains persistent connections and routes read-only and read-write requests, improving failover times and decoupling your application from direct database dependencies.

![The image explains how RDS Proxy can enhance the resiliency of a database layer by acting as a connection pool, automatically scaling RDS instances, handling database workloads, and ensuring availability across multiple zones.](https://kodekloud.com/kk-media/image/upload/v1752863751/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/rds-proxy-database-resiliency-diagram.jpg)

In architectures where API Gateway or Lambda functions are used, deploying RDS Proxy can improve connection management and provide rapid failover in case of node failures.

![The image presents a scenario where a healthcare application using Amazon RDS faces variable workloads and potential connection limits. It suggests four solutions: increasing connection limits, implementing connection pooling, using Amazon RDS Proxy, and migrating to a serverless database.](https://kodekloud.com/kk-media/image/upload/v1752863752/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/healthcare-app-amazon-rds-solutions.jpg)

![The image shows a diagram illustrating an AWS architecture setup for RDS Proxy, showing components like Amazon EC2, AWS Lambda, Amazon API Gateway, and Amazon Aurora within different VPCs. It includes connections to AWS services such as AWS X-Ray, AWS Secrets Manager, and Amazon CloudWatch.](https://kodekloud.com/kk-media/image/upload/v1752863753/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/aws-architecture-rds-proxy-diagram.jpg)

Monitoring key metrics such as active connection count and connection duration in CloudWatch can inform performance tuning when using RDS Proxy.

![The image lists metrics a Solutions Architect can monitor using Amazon RDS Proxy to assess database connection performance and resiliency, including active connections, disk IOPS, replication lag, and CPU utilization.](https://kodekloud.com/kk-media/image/upload/v1752863753/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/rds-proxy-metrics-database-performance.jpg)

---

## Amazon Aurora

Aurora is an enhanced, cloud-native relational database offering compatibility with PostgreSQL and MySQL. It replicates data across multiple Availability Zones (with up to six copies) and supports automatic failover. For disaster recovery, Aurora Global Database replication is available.

![The image illustrates an Amazon Aurora DB Cluster architecture, showing a primary instance and Aurora replicas across three availability zones, with data copies in each zone.](https://kodekloud.com/kk-media/image/upload/v1752863754/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-aurora-db-cluster-architecture.jpg)

Aurora clusters can be designed with blue/green deployments to minimize downtime during version upgrades or configuration changes.

![The image presents strategies for using AWS Aurora in a blue/green deployment to ensure minimal downtime and high resiliency during application updates. It lists four methods, including running parallel clusters, using Multi-AZ deployments, implementing read replicas, and configuring automatic backups.](https://kodekloud.com/kk-media/image/upload/v1752863756/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/aws-aurora-blue-green-deployment-strategies.jpg)

Aurora Serverless automatically adjusts compute capacity using Aurora Capacity Units (ACUs), providing efficient performance for unpredictable workloads. Although the minimum ACU is not zero, it offers a cost-effective solution for scaling.

![The image provides strategies for configuring an Aurora Serverless DB cluster to handle fluctuating workloads and maintain resiliency, including setting capacity units, deploying multiple clusters, and using read replicas.](https://kodekloud.com/kk-media/image/upload/v1752863757/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/aurora-serverless-db-strategies.jpg)

![The image is a guide on utilizing Aurora Capacity Units (ACUs) for designing cost-effective and resilient applications with Aurora Serverless, featuring four strategies for managing workload demands.](https://kodekloud.com/kk-media/image/upload/v1752863758/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/aurora-capacity-units-guide.jpg)

To reduce cold starts, consider sending periodic dummy queries as “health checks” to keep the cluster active.

![The image provides strategies for mitigating cold starts in an Aurora Serverless architecture, including pre-warming the database, using a provisioned cluster, configuring a Lambda function, and enabling RDS Proxy.](https://kodekloud.com/kk-media/image/upload/v1752863760/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/aurora-serverless-cold-starts-strategies.jpg)

---

## Amazon Redshift and Redshift Serverless

Amazon Redshift is AWS’s data warehousing solution, enabling multi-node clusters with a dedicated leader node for high availability and durability. The new Redshift Serverless automatically adjusts capacity based on query workload.

![The image provides steps for a Solutions Architect to ensure high availability and durability when designing a data warehousing solution using Amazon Redshift. It includes configuring clusters, implementing multi-node clusters, using Redshift Spectrum, and creating Redshift Read Replicas.](https://kodekloud.com/kk-media/image/upload/v1752863761/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/high-availability-data-warehousing-redshift.jpg)

For effective cross-region disaster recovery, use automated snapshots combined with cross-region replication.

![The image is a diagram illustrating the process of creating a target cluster from a snapshot in AWS Redshift, showing the flow from a source region to a target region using cross-region snapshots.](https://kodekloud.com/kk-media/image/upload/v1752863762/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/aws-redshift-target-cluster-diagram.jpg)

Integrating Redshift with services such as Lambda, SNS, or SQS can drive loose coupling and enhance overall resiliency.

![The image explains how Amazon Redshift Serverless ensures resilient data warehousing for variable query volumes, highlighting features like automatic compute adjustment, unlimited storage, data replication, and fixed-performance mode.](https://kodekloud.com/kk-media/image/upload/v1752863763/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-redshift-serverless-data-warehousing.jpg)

Redshift also offers fault tolerance by replicating data within clusters and continuously backing up data to S3.

![The image outlines features of Amazon Redshift that ensure fault tolerance for data warehousing, including data replication, multiple clusters, Redshift Read Replicas, and a serverless option for scaling.](https://kodekloud.com/kk-media/image/upload/v1752863764/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-redshift-fault-tolerance-features.jpg)

For global replication strategies, design with cross-region snapshots or configure cluster-to-cluster replication.

![The image presents strategies for a Solutions Architect to establish global replication for an Amazon Redshift data warehouse, including cross-region snapshots, streaming replication, read replicas, and AWS DataSync tasks.](https://kodekloud.com/kk-media/image/upload/v1752863766/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/solutions-architect-amazon-redshift-replication.jpg)

---

## Monitoring and Logging for RDS

Amazon RDS integrates with CloudWatch for performance metrics and CloudTrail for audit logs. Enhanced monitoring provides OS-level metrics (CPU, memory, filesystem stats), while RDS Performance Insights focuses on SQL query performance.

Consider these SQL queries used for troubleshooting and optimization:

```
WITH cte AS (
  SELECT id FROM authors LIMIT ?
)
UPDATE authors s
SET email = ?
FROM cte
WHERE sid = cte.id;


SELECT count(*)
FROM authors
WHERE id < (SELECT max(id) - ? FROM authors)
  AND id > (SELECT max(id) - ? FROM authors);


DELETE FROM authors
WHERE id < (SELECT max(id) - ? FROM authors)
  AND id > (SELECT max(id) - ? FROM authors);
```

Enhanced monitoring together with RDS event notifications (via SNS and/or EventBridge) helps you proactively diagnose database events such as failovers, parameter changes, and patching events.

![The image presents a question about which AWS service a Solutions Architect should use to monitor an Amazon RDS instance, with four options: Amazon CloudWatch Alarms, AWS Config, AWS CloudTrail, and AWS X-Ray.](https://kodekloud.com/kk-media/image/upload/v1752863767/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/aws-service-monitor-rds-instance.jpg)

![The image shows a dashboard for RDS enhanced monitoring, displaying OS-level metrics such as free memory, active memory, CPU usage, filesystem usage, and load averages.](https://kodekloud.com/kk-media/image/upload/v1752863768/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/rds-enhanced-monitoring-dashboard.jpg)

For efficient log management, review logs through the RDS console or export them to CloudWatch Logs for deeper analysis.

---

## NoSQL Options

### Amazon DynamoDB

DynamoDB is AWS’s flagship NoSQL database, offering fully managed services with built-in replication (six copies) across multiple Availability Zones. It supports both on-demand and provisioned capacity modes. For multi-region resiliency, leverage Global Tables, which provide a multi-master solution using asynchronous replication.

![The image is a diagram illustrating the architecture of an AWS-based system using DynamoDB, showing components like Elastic Load Balancing, EC2 instances, Memcached, and SQS within an availability zone. It highlights how game requests from players are processed through this setup.](https://kodekloud.com/kk-media/image/upload/v1752863769/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/aws-architecture-dynamodb-diagram.jpg)

Features such as DynamoDB Streams allow you to trigger responses to data changes, and DynamoDB Accelerator (DAX) offers in-memory caching to reduce read latency. DAX maintains strong consistency by updating cached data in real time.

![The image lists features a Solutions Architect can use to enhance application resiliency with Amazon DynamoDB, including DAX, Global Tables, Streams, and Read Replicas.](https://kodekloud.com/kk-media/image/upload/v1752863770/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/dynamodb-resiliency-features-solutions-architect.jpg)

When using provisioned capacity, enable auto scaling to match throughput with workload demands.

![The image presents a question about configuring Amazon DynamoDB to handle unpredictable workloads, followed by four suggested solutions involving capacity modes, DynamoDB Accelerator, and scaling policies.](https://kodekloud.com/kk-media/image/upload/v1752863772/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/dynamodb-configuring-unpredictable-workloads.jpg)

![The image presents a question about adjusting throughput in Amazon DynamoDB's provisioned capacity mode, followed by four suggested solutions involving auto scaling, AWS Lambda, CloudWatch alarms, and DynamoDB Streams.](https://kodekloud.com/kk-media/image/upload/v1752863773/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/dynamodb-throughput-adjustment-solutions.jpg)

DynamoDB Streams capture item-level modifications that can be processed by AWS Lambda for real-time analytics and enhanced resiliency.

![The image explains how Amazon DynamoDB Streams enhance the resiliency of an application's data layer, highlighting four key benefits: data recovery, real-time synchronization, triggering AWS Lambda functions, and acting as a backup system.](https://kodekloud.com/kk-media/image/upload/v1752863774/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/dynamodb-streams-resiliency-benefits.jpg)

### DynamoDB Accelerator (DAX)

DAX serves as an in-memory cache extension for DynamoDB. In the event of a node failure, DAX reroutes read requests quickly and replicates cached data across nodes, ensuring availability and consistency.

![The image explains how Amazon DynamoDB Accelerator (DAX) handles read requests during a primary node failure to ensure high availability, listing four different strategies.](https://kodekloud.com/kk-media/image/upload/v1752863775/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/dynamodb-accelerator-read-strategies.jpg)

![The image explains how Amazon DynamoDB Accelerator (DAX) maintains consistency between the cache and the DynamoDB table, listing four methods: eventual consistency, strong consistency, periodic snapshots, and manual cache invalidation.](https://kodekloud.com/kk-media/image/upload/v1752863776/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/dynamodb-accelerator-consistency-methods.jpg)

![The image explains how replication within an Amazon DynamoDB Accelerator (DAX) cluster enhances caching layer resiliency, highlighting geographic redundancy, fault tolerance, horizontal scaling, and synchronization with multiple tables.](https://kodekloud.com/kk-media/image/upload/v1752863777/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/dynamodb-accelerator-replication-diagram.jpg)

---

## OpenSearch and OpenSearch Serverless

OpenSearch, derived from Elasticsearch, is optimized for search and analytics with built-in resiliency features. If a primary node for a shard fails, requests are automatically redistributed to replica shards—with a replica potentially being promoted if necessary.

![The image explains how Amazon OpenSearch Service handles read requests when a primary node for a shard becomes unavailable, listing four possible actions: promoting a replica shard, halting requests, rerouting requests, and distributing requests to replica nodes.](https://kodekloud.com/kk-media/image/upload/v1752863778/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-opensearch-read-requests-diagram.jpg)

Data consistency in OpenSearch is typically eventual, though stronger consistency configurations are available. OpenSearch Serverless automatically scales compute capacity based on workload, reducing operational overhead.

![The image is a diagram illustrating the architecture of OpenSearch Serverless, showing the flow from indexing to search compute units, with data stored in Amazon S3.](https://kodekloud.com/kk-media/image/upload/v1752863779/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/opensearch-serverless-architecture-diagram.jpg)

![The image explains how Amazon OpenSearch Service ensures resiliency in search and analytics workloads by redistributing workloads, using dedicated master nodes, leveraging AWS Auto Scaling, and utilizing Amazon S3 for data replication.](https://kodekloud.com/kk-media/image/upload/v1752863780/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-opensearch-resiliency-workloads.jpg)

---

## Open Source Database Alternatives

### Amazon ElastiCache (Redis/Memcached)

ElastiCache supports both Redis and Memcached. Redis offers replication and persistence, while Memcached does not support node-to-node replication. Implementing a caching layer with ElastiCache can offload database traffic, reduce latency, and add resiliency through auto-recovery and scaling.

![The image is a diagram explaining Amazon ElastiCache, highlighting its benefits like microsecond speed and high availability, and its integration with other AWS services. It mentions that ElastiCache supports both Redis and Memcached.](https://kodekloud.com/kk-media/image/upload/v1752863781/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-elasticache-diagram-benefits.jpg)

Caching strategies such as lazy loading, write-through caching, or sharding can further optimize performance. Redis additionally provides Pub/Sub and complex data types beneficial for resiliency.

![The image is a diagram illustrating the use of ElastiCache (Redis or Memcached) in a distributed caching system, showing web and app servers, cache nodes, and RDS databases. It highlights database caching and query result distribution across availability zones.](https://kodekloud.com/kk-media/image/upload/v1752863782/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/elasticache-distributed-caching-diagram.jpg)

A comparison of Redis versus Memcached emphasizes differences in persistence, scaling, multi-AZ support, and other key capabilities.

![The image is a comparison table between Redis and Memcached, highlighting features such as persistence, object type, scaling, multi-AZ support, backup and restore capabilities, pub/sub capabilities, and size limits.](https://kodekloud.com/kk-media/image/upload/v1752863783/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/redis-vs-memcached-comparison-table.jpg)

Monitor caching performance with CloudWatch metrics, engine logs, and slow logs to track long-running commands.

![The image shows a screenshot of ElastiCache settings for Redis or Memcached, focusing on slow logs and engine logs, both enabled and using JSON format. It mentions that ElastiCache also has engine logs.](https://kodekloud.com/kk-media/image/upload/v1752863784/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/elasticache-redis-memcached-logs.jpg)

Service updates and notifications (via SNS) help maintain the cache’s security and performance by ensuring that engines are up to date.

![The image is a slide about ElastiCache (Redis or Memcached) service updates for Redis reliability patches, noting that certain regions do not support CloudWatch events and AWS Health Dashboard.](https://kodekloud.com/kk-media/image/upload/v1752863785/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/elasticache-redis-reliability-updates.jpg)

### Amazon MemoryDB for Redis

MemoryDB for Redis is engineered as an in-memory persistent data store, ideal for microservices architectures. It employs a multi-AZ deployment with synchronous replication, ensuring that if a primary node fails, a replica in another AZ is immediately promoted without data loss.

![The image is a diagram illustrating the architecture of MemoryDB for Redis within an AWS environment, showing components like AWS Secrets Manager, Amazon ECS, and Amazon CloudWatch, along with security groups and nodes.](https://kodekloud.com/kk-media/image/upload/v1752863787/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/memorydb-redis-architecture-diagram.jpg)

![The image is a diagram illustrating the architecture of MemoryDB for Redis, showing a client interacting with a primary node, which asynchronously writes to two replica nodes.](https://kodekloud.com/kk-media/image/upload/v1752863788/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/memorydb-redis-architecture-diagram-2.jpg)

MemoryDB supports inter-region replication and can decouple microservices by deploying separate clusters for different application components.

![The image explains how Amazon MemoryDB for Redis facilitates the development of loosely coupled application architectures, highlighting four key points: shared in-memory data store, subscription to data change events, integration with AWS Step Functions, and leveraging Redis Streams for asynchronous communication.](https://kodekloud.com/kk-media/image/upload/v1752863789/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-memorydb-redis-architecture.jpg)

### Amazon DocumentDB

Amazon DocumentDB (with MongoDB compatibility) uses a distributed storage layer that replicates data six times across three AZs while continuously backing up to Amazon S3. It separates read and write endpoints (reader endpoint vs. cluster endpoint) to balance performance with resiliency.

![The image is a diagram of an AWS DocumentDB architecture, showing a primary instance and replica instances across three availability zones, with data copies in a cluster volume. It illustrates the flow of reads and writes between the instances and data copies.](https://kodekloud.com/kk-media/image/upload/v1752863789/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/aws-documentdb-architecture-diagram.jpg)

For global disaster recovery, DocumentDB Global Clusters use asynchronous replication between regions, ensuring high availability without the latency of synchronous replication.

![The image is a diagram of an Amazon DocumentDB architecture, showing users accessing a global cluster through Amazon Route 53, with Elastic Load Balancers and application servers in two regions (US-EAST-1 and US-WEST-2), and primary and secondary DocumentDB clusters.](https://kodekloud.com/kk-media/image/upload/v1752863790/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-documentdb-architecture-diagram.jpg)

![The image explains how Amazon DocumentDB Global Clusters enhance data availability and disaster recovery through synchronous and asynchronous data replication across AWS regions, using a global database engine and mirroring data for independent access.](https://kodekloud.com/kk-media/image/upload/v1752863792/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-documentdb-global-clusters-explained.jpg)

### Amazon Keyspaces (for Apache Cassandra)

Amazon Keyspaces offers a serverless, Cassandra-compatible service. Data is automatically partitioned and replicated across multiple Availability Zones, and the replication factor (typically three) ensures that your queries remain reliable even if one node fails.

![The image compares the current state of a traditional Apache Cassandra application using EC2 instances with a target state using Amazon ECS and Amazon Keyspaces, highlighting differences in scaling and resource isolation.](https://kodekloud.com/kk-media/image/upload/v1752863793/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/cassandra-application-ec2-ecs-comparison.jpg)

![The image presents a question about how Amazon Keyspaces utilizes distributed storage for large-scale databases, followed by four options describing different storage architectures.](https://kodekloud.com/kk-media/image/upload/v1752863794/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-keyspaces-distributed-storage-question.jpg)

![The image outlines redundancy features in Amazon Keyspaces, highlighting data replication across AWS regions and availability zones, and the use of backups for data protection.](https://kodekloud.com/kk-media/image/upload/v1752863795/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-keyspaces-redundancy-features.jpg)

![The image is a network architecture diagram for Apache Cassandra Keyspaces, showing components like internet gateways, NAT gateways, application load balancer, and subnets within availability zones. It also includes a cluster labeled "demo-staging" and roles for ECS write and read operations.](https://kodekloud.com/kk-media/image/upload/v1752863796/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/apache-cassandra-keyspaces-diagram.jpg)

Keyspaces uses quorum reads and writes to ensure that data is synchronously written to multiple replicas before acknowledging operations.

---

## Graph Databases

### Amazon Neptune

Amazon Neptune is a managed graph database supporting both property graph and RDF models. It replicates data synchronously across multiple Availability Zones so that if one node fails, others seamlessly take over without manual intervention.

![The image is a slide discussing how Amazon Neptune provides high availability, listing options such as data replication across availability zones, backing up to Amazon S3, caching with ElastiCache, and provisioning read replicas in a second region.](https://kodekloud.com/kk-media/image/upload/v1752863796/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-neptune-high-availability-options.jpg)

![The image presents a question about maintaining availability in an Amazon Neptune database if a node fails, with four possible solutions: migrating the node, replicating data synchronously, redirecting requests, and restoring from a backup.](https://kodekloud.com/kk-media/image/upload/v1752863798/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-neptune-availability-solutions.jpg)

---

## Immutable and Time Series Databases

### Amazon QLDB

Amazon Quantum Ledger Database (QLDB) is an immutable, append-only ledger database ideal for tracking transactions transparently. It replicates data across three Availability Zones and continuously backs up to Amazon S3, ensuring that once data is written, it remains unaltered.

![The image is a diagram explaining the Amazon Quantum Ledger Database (QLDB), showing how it processes application data, maintains a journal of changes, and provides a cryptographically verifiable history.](https://kodekloud.com/kk-media/image/upload/v1752863799/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-qldb-diagram-data-processing.jpg)

For financial transaction tracking or other scenarios where immutability is crucial, QLDB provides an indelible record of all changes.

![The image presents a question about ensuring no data loss when streaming data into Amazon QLDB, with four suggested solutions: data replication to DynamoDB, streaming to S3 first, using Kinesis Data Streams, and processing data synchronously.](https://kodekloud.com/kk-media/image/upload/v1752863800/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/data-loss-amazon-qldb-solutions.jpg)

QLDB integrates with CloudWatch, CloudTrail, and AWS Config to ensure robust monitoring and auditing.

![The image presents a question about ensuring data availability in Amazon QLDB during an Availability Zone outage, with four options for providing resiliency.](https://kodekloud.com/kk-media/image/upload/v1752863801/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-qldb-data-availability-question.jpg)

![The image is a flowchart illustrating the integration of Amazon QLDB with various AWS services like Kinesis Data Streams, Lambda, S3, Redshift, DynamoDB, and others for data processing and storage. It highlights the flow of application data through these services for analytics, indexing, and more.](https://kodekloud.com/kk-media/image/upload/v1752863802/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-qldb-aws-services-flowchart.jpg)

### Amazon Timestream

Amazon Timestream is a purpose-built time series database optimized for high ingest rates and fast query performance over time-series data. It automatically replicates data across multiple Availability Zones. To ensure fault tolerance, it is essential to incorporate retry logic with exponential backoff in your applications.

![The image presents a question about how Amazon Timestream provides reliability for time series data, with four possible answers related to data replication, caching, backups, and deployment.](https://kodekloud.com/kk-media/image/upload/v1752863803/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-timestream-reliability-quiz.jpg)

Timestream is commonly used in IoT scenarios where sensor data is ingested via IoT Core, Kinesis, or other services. Visualization tools like Grafana can overlay real-time dashboards on top of Timestream data.

![The image is a flowchart illustrating a data processing system using AWS services, including sensors, IoT Core, Timestream Database, AWS Lambda, and AWS SNS, with a focus on threshold analysis and notifications.](https://kodekloud.com/kk-media/image/upload/v1752863804/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/aws-data-processing-flowchart.jpg)

![The image is a diagram illustrating the integration of Amazon Timestream with various AWS services like CloudTrail, CloudWatch, and others for data collection, analytics, and visualization. It shows the flow of data from a corporate data center through AWS services for reporting and machine learning.](https://kodekloud.com/kk-media/image/upload/v1752863805/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Database-Services/amazon-timestream-aws-integration-diagram.jpg)

---

## Summary

This article has surveyed a broad range of AWS database services and open-source alternatives, outlining practical strategies for enhancing availability, resiliency, and overall reliability. Traditional, node-based systems such as RDS, Aurora, and Redshift require careful configuration (e.g., using Multi-AZ deployments and read replicas), whereas serverless and fully managed solutions like DynamoDB, QLDB, and Timestream inherently incorporate many reliability features.

By leveraging automatic replication, failover, scaling, and robust monitoring through services like CloudWatch and CloudTrail, you can build architectures that meet your resiliency requirements while also supporting security best practices. If you have any questions or need further guidance, please join the forums for discussion.

Thank you for joining me on this deep dive into database reliability. I look forward to our next exploration into application integration.

—  
Michael Forrester, KodeKloud.com

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a99d085-acf0-4910-924f-737bfc1652da/lesson/139e6b10-c6ff-4f20-9abc-a13bc1b711e8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a99d085-acf0-4910-924f-737bfc1652da/lesson/779a6713-6114-4a32-a846-d733aed25988)**
>
> Practice lab
