# Turning up Security on MigrationTransfer Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-MigrationTransfer-Services)

---

## Table of Contents

- Turning up Security on MigrationTransfer Services
  - Migration Hub and Application Discovery
  - Application Migration and Database Migration Service (DMS)
  - Elastic Disaster Recovery Service
  - Mainframe Modernization
  - Data Transfer Services
  - Snow Family (Storage Perspective)
  - Summary
  - Watch Video
    - Application Discovery Service
    - Application Migration Service (AMS)
    - Database Migration Service (DMS)
    - AWS DataSync
    - AWS Transfer Family

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on MigrationTransfer Services

Welcome Solutions Architects! In this article, we dive into the security measures for AWS migration and transfer services. Although these managed services require less extensive configuration compared to DIY solutions, proper security practices remain essential. This article provides an overview of key services including Migration Hub, Application Discovery, Application Migration Service, Database Migration Service (DMS), Elastic Disaster Recovery, Mainframe Modernization, Data Transfer Services, and the Snow Family, with a particular focus on ensuring robust security controls.

---

## Migration Hub and Application Discovery

Migration Hub centralizes migration data from various tools and displays workflows from services such as application migration, Systems Manager, and database migration service. Its main concern is Identity and Access Management (IAM), so ensuring proper access controls is crucial due to the sensitive nature of migration data.

> [!important]
> **Security Best Practice**
>
> Only grant Migration Hub access to users who truly need it. While Migration Hub aggregates workflows, the underlying services are already highly secure.

![The image outlines security considerations for a corporation migrating data centers to AWS, including data encryption, IAM control, dedicated connections, and multi-factor authentication.](https://kodekloud.com/kk-media/image/upload/v1752864394/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-data-center-security-considerations.jpg)

Although Migration Hub displays workflows from different services, it provides minimal added security beyond what the source services already implement. For logging and monitoring, AWS CloudTrail tracks API calls, while CloudWatch is used sparingly for output display.

![The image outlines options for logging and monitoring activities in AWS Migration Hub, including using AWS CloudTrail, custom logging, Migration Hub's dashboard, and Amazon CloudWatch.](https://kodekloud.com/kk-media/image/upload/v1752864395/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-migration-hub-logging-monitoring.jpg)

### Application Discovery Service

The Application Discovery Service (ADS) collects metadata from your on-premises servers via agents, agentless methods, or vCenter outputs, and transfers the data securely to AWS. This service is focused on discovery rather than migration. Agents installed on your servers gather details about running applications and send them securely for analysis.

![The image is a diagram illustrating the process of collecting and transferring data from on-premises servers to AWS services using the AWS Application Discovery Service. It includes components like Discovery Agent, Agentless Collector, and Migration Evaluator Collector, with data being encrypted during transfer.](https://kodekloud.com/kk-media/image/upload/v1752864396/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-data-transfer-diagram.jpg)

For large enterprises, understanding the functionality of these agents is essential. ADS manages access through IAM roles and policies, and logging via CloudTrail ensures that all API calls are recorded.

![The image explains the role of agents in AWS Application Discovery Service, highlighting their functions in migrating data, mapping network topologies, collecting configuration data, and scanning servers.](https://kodekloud.com/kk-media/image/upload/v1752864397/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-application-discovery-agents.jpg)

IAM integration within ADS enforces strict roles and policies. Enhanced logging using CloudTrail (and optionally CloudWatch) provides a comprehensive audit trail.

![The image explains how AWS Identity and Access Management (IAM) integrates with AWS Application Discovery Service to manage permissions and access control, listing four key points about its usage and roles.](https://kodekloud.com/kk-media/image/upload/v1752864398/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-iam-application-discovery-diagram.jpg)

---

## Application Migration and Database Migration Service (DMS)

### Application Migration Service (AMS)

The Application Migration Service (AMS) replicates and transitions your entire environment to AWS. Replace the retired Server Migration Service with Elastic Disaster Recovery. AMS installs an agent on your source environment, replicates the setup to AWS, and then conducts a cutover. It utilizes IAM for permission management and integrates with CloudWatch and CloudTrail for real-time logging.

![The image is a flowchart illustrating the AWS Application Migration Service process, including steps like mapping the environment, installing an agent, replicating to AWS, performing tests, and executing cutover.](https://kodekloud.com/kk-media/image/upload/v1752864398/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-application-migration-flowchart.jpg)

AMS supports both lift-and-shift and replatforming scenarios (for databases or containers) while logging all actions through CloudWatch logs in real time.

![The image is a diagram illustrating the process of migrating data and applications from a data center to AWS services, including steps like "Lift and Shift," "Replatform Databases," and "Replatform to Containers." It shows the use of AWS tools such as AWS Application Migration Service, AWS Database Migration Service, and App2Container.](https://kodekloud.com/kk-media/image/upload/v1752864399/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/data-migration-to-aws-diagram.jpg)

### Database Migration Service (DMS)

DMS is designed for migrating large, sensitive database workloads. The security profile of the migration depends largely on the target destination. For example, using an encrypted Aurora cluster or an S3 bucket with server-side encryption ensures that the data remains secure.

Key DMS features include:

• Support for full copy loads and continuous data replication via change data capture (CDC)  
• Comprehensive logging, capturing all DML commands and operations, with time travel logs to review historical changes

Consider the SQL command below, which reveals the structure of a migrated table:

```
MySQL [dmstarget]> SHOW CREATE TABLE product;
+---------+-------------------------------------------------+
| Table   | Create Table                                    |
+---------+-------------------------------------------------+
| product | CREATE TABLE `product` (                        |
|         |   `product_id` bigint NOT NULL,                 |
|         |   `product_code` varchar(20) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL, |
|         |   `product_name` varchar(50) CHARACTER SET utf16 COLLATE utf16_general_ci DEFAULT NULL, |
|         |   `product_price` decimal(28,6) DEFAULT NULL,   |
|         |   PRIMARY KEY (`product_id`, `product_code`)    |
|         | ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |
+---------+-------------------------------------------------+
1 row in set (0.00 sec)
```

> [!important]
> **Troubleshooting Tip**
>
> Enabling CDC is vital for synchronization between source and target databases. Detailed logs assist in resolving replication issues.

![The image presents a scenario where a retail company plans to migrate their SQL database to Amazon Aurora using AWS DMS, with options for achieving continuous data replication during the migration process.](https://kodekloud.com/kk-media/image/upload/v1752864401/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752864401/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/sql-database-migration-amazon-aurora.jpg)

DMS supports encryption at rest, SSL/TLS for in-transit security, and full encryption of replication streams. Multiple log types (task logs and time travel logs) provide robust oversight during migration.

![The image illustrates the process of migrating Oracle and MySQL databases using AWS Database Migration Service to Amazon RDS and Amazon Aurora. It also notes that DMS moves larger databases and DMA can stage data in S3 or Redshift.](https://kodekloud.com/kk-media/image/upload/v1752864402/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/oracle-mysql-migration-aws-dms.jpg)

![The image is an informational graphic about AWS Database Migration Service (DMS), highlighting its features and limitations in migrating databases, including support for relational and non-relational databases, and limitations on real-time replication and on-premises to cloud migrations.](https://kodekloud.com/kk-media/image/upload/v1752864405/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-database-migration-service-info.jpg)

![The image is a diagram showing the AWS Database Migration Service (AWS DMS) interacting with PostgreSQL and MySQL instances, with logs being sent to Amazon CloudWatch and Amazon S3.](https://kodekloud.com/kk-media/image/upload/v1752864418/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-dms-postgresql-mysql-diagram.jpg)

![The image presents a scenario about a company migrating its database to AWS using the Database Migration Service, with a question on how to access and manage task logs. It provides four options for accessing these logs, including using external tools, AWS Management Console, email, and AWS CLI.](https://kodekloud.com/kk-media/image/upload/v1752864420/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-database-migration-task-logs.jpg)

![The image explains the features and benefits of time travel logs in AWS Database Migration Service (DMS), highlighting their use for reverting databases, enhancing security, storing logs, and aiding in predictive analysis.](https://kodekloud.com/kk-media/image/upload/v1752864421/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-dms-time-travel-logs-benefits.jpg)

Furthermore, DMS ensures continuous replication of incremental data changes while maintaining robust encryption and detailed change logs.

![The image is a question about how AWS Database Migration Service (DMS) supports encryption for data security during migration, with four possible answers detailing different encryption methods and support levels.](https://kodekloud.com/kk-media/image/upload/v1752864422/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-dms-encryption-support-question.jpg)

![The image presents a scenario where a retail company plans to migrate their SQL database to Amazon Aurora using AWS DMS, with options for achieving continuous data replication during the migration process.](https://kodekloud.com/kk-media/image/upload/v1752864401/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752864401/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/sql-database-migration-amazon-aurora.jpg)

---

## Elastic Disaster Recovery Service

The Elastic Disaster Recovery Service replicates entire suites of virtual machines using block-level replication. It transfers data securely from a source to a target, inheriting encryption settings from the source instance. Network security is maintained by applying security groups during the transfer.

![The image is a flowchart illustrating the AWS Elastic Disaster Recovery process, including steps like setup, testing, operation, failover, and fallback for data replication and recovery.](https://kodekloud.com/kk-media/image/upload/v1752864423/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-elastic-disaster-recovery-flowchart.jpg)

Replication agents extract data from disks, stage it on replication servers, and transfer it at a low level to recovery instances, preserving the configuration and security settings.

![The image is a diagram illustrating AWS data replication and recovery processes, showing components like AWS Replication Agent, staging area subnets, and recovery subnets within a VPC. It highlights continuous block-level replication and the use of EBS volumes.](https://kodekloud.com/kk-media/image/upload/v1752864425/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-data-replication-recovery-diagram.jpg)

Encryption settings on the source are automatically applied to target EBS volumes. Network access continues to be enforced with security groups during the replication process.

![The image provides guidance on ensuring encryption of AWS Elastic Block Store (EBS) volumes used by AWS Disaster Recovery Service (DRS) for EC2 instances, listing four options including enabling AWS KMS and using AWS CloudHSM.](https://kodekloud.com/kk-media/image/upload/v1752864426/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-ebs-encryption-guidance-drs.jpg)

---

## Mainframe Modernization

Mainframe Modernization involves analyzing, refactoring, and replatforming legacy mainframe processes into an automated DevOps pipeline. Security best practices include implementing strong access policies, ensuring encryption at rest and in transit, and following best practices from the underlying services used during modernization.

![The image is a diagram illustrating AWS Mainframe Modernization, showing components like Analyzer, Converter, Developer, and others within the AWS Cloud, along with services such as Object Store, Source Control, and Managed Database. It highlights the process of modernizing mainframe applications using AWS services.](https://kodekloud.com/kk-media/image/upload/v1752864426/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-mainframe-modernization-diagram.jpg)

Additional measures, such as enforcing perfect forward secrecy through TLS protocols with appropriate cipher suites, may be required in certain environments.

---

## Data Transfer Services

### AWS DataSync

AWS DataSync uses an on-premises agent to transfer storage data into AWS storage services such as S3, EFS, or FSx. As a serverless and managed service, DataSync leverages TLS to secure data in transit. However, when transferring data to an unencrypted S3 bucket, enable server-side encryption to maintain data security.

![The image is a diagram showing the AWS DataSync service transferring data from on-premises storage to various AWS storage services like Amazon EFS, S3, and FSx. It illustrates the secure data transmission process using TLS.](https://kodekloud.com/kk-media/image/upload/v1752864427/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/awss-datasync-data-transfer-diagram.jpg)

When transferring files from on-premises to EFS, DataSync can directly copy the data and logs can be monitored via CloudWatch.

![The image provides guidance on using AWS DataSync to transfer file storage from on-premises to Amazon EFS, listing four considerations or methods for the process.](https://kodekloud.com/kk-media/image/upload/v1752864428/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-datasync-transfer-efs-guide.jpg)

### AWS Transfer Family

The AWS Transfer Family provides secure file transfers using protocols such as SFTP and FTPS, while excluding FTP due to its inherent security weaknesses. Custom security policies can be configured to meet specific organizational requirements. Exercise caution when setting cryptographic algorithm options; an overly strict policy might conflict with other security requirements.

![The image is a decision-making guide for a corporation considering AWS Transfer Family for FTP and SFTP needs, highlighting that AWS Transfer Family supports SFTP and FTPS but not FTP, and suggesting alternatives like setting up a custom FTP server or using AWS Storage Gateway.](https://kodekloud.com/kk-media/image/upload/v1752864429/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-transfer-family-decision-guide.jpg)

![The image shows a dropdown menu for selecting cryptographic algorithm options, highlighting a specific security policy labeled "TransferSecurityPolicy-PQ-SSH-Experimental-2023-04." It mentions that Transfer Family supports security policies for different types of security.](https://kodekloud.com/kk-media/image/upload/v1752864430/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/dropdown-menu-security-policy-transfer.jpg)

For legacy protocols like AS2, the AWS Transfer Family accepts the inbound HTTP payload, stores it in an S3 bucket, and creates an audit trail via CloudWatch.

![The image is a flowchart illustrating the process of file transfer using AS2 protocol with AWS Transfer Family, showing interactions between a partner admin, AS2 server, S3 bucket, and CloudWatch logs. It highlights steps from file sending to availability for the Transfer Family customer.](https://kodekloud.com/kk-media/image/upload/v1752864431/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/as2-file-transfer-flowchart.jpg)

---

## Snow Family (Storage Perspective)

The Snow Family consists of rugged hardware devices designed for secure, local data transportation in harsh environments. The Snowball Edge, a key device in this family, utilizes AWS IAM for user access management. Data stored on these devices is automatically encrypted; in-transit encryption is also enforced.

![The image is a diagram illustrating the Snow Family (Storage) setup, showing connections between an on-premises source, a local area network (LAN), a Snowball Edge device, and a staging workstation using AWS CLI/SDK. It highlights the security hardening of the Snow Family as a movable appliance.](https://kodekloud.com/kk-media/image/upload/v1752864432/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/snow-family-storage-setup-diagram.jpg)

For large-scale data transfers (for example, transferring 60 terabytes), the Snowball Edge is a suitable solution. With support for up to 72 terabytes of usable transfer data, it emphasizes encryption and network controls alongside varying capacity and processing capabilities.

![The image discusses whether AWS Snowball is suitable for transferring 60TB of data for a film production company, presenting four considerations: using AWS Direct Connect, AWS Snowball Edge, multiple Snowball devices, or compressing data.](https://kodekloud.com/kk-media/image/upload/v1752864433/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/aws-snowball-data-transfer-considerations.jpg)

---

## Summary

This article highlighted the key security considerations across AWS migration and transfer services. Below is a summary of the essential security themes:

| Security Theme                    | Description                                                                      |
| --------------------------------- | -------------------------------------------------------------------------------- |
| IAM Controls & Access Policies    | Strictly manage who can access these services with granular IAM roles.           |
| Encryption (At Rest & In Transit) | Ensure continuous encryption for data stored or transmitted.                     |
| Comprehensive Logging             | Use AWS CloudTrail and CloudWatch for complete audit trails and issue diagnosis. |
| Managed Services                  | Leverage AWS managed services that simplify security configurations.             |

In summary, migration and transfer services in AWS—from Migration Hub and Application Discovery to AMS, DMS, Elastic Disaster Recovery, Mainframe Modernization, DataSync, Transfer Family, and the Snow Family—are designed with strong security features. Nevertheless, maintaining high awareness regarding configuration, encryption, logging, and access control is paramount to safeguard your data during migration.

![The image is a summary slide with four key points about migration and transfer, focusing on security, encryption, and serverless services. It features a gradient background and numbered bullet points.](https://kodekloud.com/kk-media/image/upload/v1752864434/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-MigrationTransfer-Services/migration-transfer-security-summary.jpg)

Thank you for reading, and we look forward to seeing you in the next study session.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/f7e90853-40fe-4813-be29-cdbdc3152db2)**
>
> Watch video content
