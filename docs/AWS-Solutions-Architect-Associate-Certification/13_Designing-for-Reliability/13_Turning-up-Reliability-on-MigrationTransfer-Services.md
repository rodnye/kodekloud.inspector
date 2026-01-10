# Turning up Reliability on MigrationTransfer Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Reliability/Turning-up-Reliability-on-MigrationTransfer-Services)

---

## Table of Contents

- Turning up Reliability on MigrationTransfer Services
  - Overview of Migration and Transfer Services
  - AWS Application Discovery Service
  - AWS Application Migration Service
  - AWS Database Migration Service (DMS)
  - Elastic Disaster Recovery Service (EDR)
  - Mainframe Modernization
  - AWS Data Transfer and DataSync
  - AWS Snow Family Storage Devices
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Designing for Reliability

# Turning up Reliability on MigrationTransfer Services

Welcome, future solutions architects! In this article, presented by Michael Forrester, we explore how to enhance reliability across various AWS migration and transfer services. This guide outlines service features, reliability considerations, and best practices to ensure smooth transitions to the cloud.

## Overview of Migration and Transfer Services

AWS offers a host of services that facilitate data and workload migration. We begin by examining the role of the Application Discovery Service and the Migration Hub. The Migration Hub provides a centralized dashboard for tracking migration data. However, it offers limited options for adjusting reliability directly.

![The image shows a dashboard from AWS Migration Hub, displaying data on server and application migration status, with graphs and summaries. It includes a note about the hub gathering data from other tools without reliability levers.](https://kodekloud.com/kk-media/image/upload/v1752863832/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-MigrationTransfer-Services/aws-migration-hub-dashboard-summary.jpg)

Moving forward, the focus shifts to the Application Discovery Service, which is crucial for detailed system analysis and planning.

## AWS Application Discovery Service

Unlike the Migration Hub, the AWS Application Discovery Service actively detects and collects configuration and performance data from your on-premises applications. It supports multiple discovery methods, including agents, agentless collectors, and manual entries.

![The image is a diagram explaining the AWS Application Discovery Service, showing the process from on-premises data collection to integration with AWS services. It highlights components like Discovery Agent, Agentless Collector, and encrypted data transfer.](https://kodekloud.com/kk-media/image/upload/v1752863833/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-MigrationTransfer-Services/aws-application-discovery-diagram.jpg)

To maintain service reliability, AWS recommends using tools like CloudWatch for metrics, CloudTrail for auditing, and X-Ray for tracing. Note that while the service is robust, it offers limited custom reliability knobs.

![The image presents a scenario where a company uses Application Discovery Service for server tracking and AWS migration, with four suggested approaches for monitoring the service: enabling CloudWatch metrics, reviewing logs with CloudWatch Logs Insights, using X-Ray tracing, and polling data with Lambda.](https://kodekloud.com/kk-media/image/upload/v1752863835/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-MigrationTransfer-Services/application-discovery-service-aws-migration.jpg)

## AWS Application Migration Service

The AWS Application Migration Service is built to simplify and automate the migration process. It facilitates the lift-and-shift of servers from your data center to Amazon EC2, ensuring a controlled and repeatable workflow. Being highly managed, this service minimizes manual intervention while emphasizing redundancy and reliability.

![The image is a diagram illustrating the AWS Application Migration Service, showing a structured process for migrating servers, databases, and web apps to AWS services like EC2, RDS, and containers. It emphasizes reliability and redundancy in the migration process.](https://kodekloud.com/kk-media/image/upload/v1752863836/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-MigrationTransfer-Services/aws-application-migration-diagram.jpg)

> [!important]
> **Note**
>
> Because the process is nearly automated, there are few custom adjustments for reliability. Instead, AWS ensures a predefined, repeatable workflow.

## AWS Database Migration Service (DMS)

The AWS Database Migration Service (DMS) transfers data between databases using a replication instance and change data capture. While efficient, the replication instance introduces a single point of failure. Multi-AZ support is available; however, it does not include automatic failover during failures in full load scenarios. Instead, manual intervention to restart the replication job is required.

![The image provides a scenario about migrating a MySQL database to Amazon RDS using AWS DMS, with four configuration options to minimize disruption: using multi-AZ replication, enabling multi-AZ on the source server, creating a multi-AZ RDS target, and using multiple single-AZ instances.](https://kodekloud.com/kk-media/image/upload/v1752863837/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-MigrationTransfer-Services/mysql-migration-amazon-rds-dms.jpg)

> [!important]
> **Warning**
>
> Ensure you have procedures in place to manually restart replication jobs in case of a failure, despite using Multi-AZ configurations.

## Elastic Disaster Recovery Service (EDR)

Formerly known as CloudEndure, the Elastic Disaster Recovery Service delivers near-real-time, block-by-block replication from on-premises systems to AWS. EDR utilizes a staging VPC and scalable replication servers, making it an excellent solution for meeting strict Recovery Point Objectives (RPO) and Recovery Time Objectives (RTO).

![The image is a diagram explaining the AWS Elastic Disaster Recovery Service, outlining steps for setup, testing, operation, failover, and failback for server replication and recovery.](https://kodekloud.com/kk-media/image/upload/v1752863838/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-MigrationTransfer-Services/aws-elastic-disaster-recovery-diagram.jpg)

Replication occurs at the block level with on-the-fly transformations during transit. The service’s auto-scaling and auto-replacement features further enhance its reliability.

![The image is a diagram illustrating the Elastic Disaster Recovery Service, showing the architecture of source and target regions with VPC peering, replication servers, and recovery servers. It explains how EDR uses replication servers that auto-scale and auto-replace to support block-by-block replication.](https://kodekloud.com/kk-media/image/upload/v1752863840/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-MigrationTransfer-Services/elastic-disaster-recovery-diagram.jpg)

EDR is particularly beneficial for organizations with rigorous business continuity requirements.

![The image presents a scenario where a company is implementing disaster recovery for on-premises Windows servers using AWS Elastic Disaster Recovery (EDR). It lists four EDR replication methods to meet the requirements of reliable server state replication.](https://kodekloud.com/kk-media/image/upload/v1752863841/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-MigrationTransfer-Services/aws-elastic-disaster-recovery-servers.jpg)

## Mainframe Modernization

Mainframe modernization involves migrating legacy mainframe workloads to modern AWS services such as EC2, Lambda, or other managed services. In this context, the reliability of your solution is determined more by the target AWS service than by the modernization process itself.

![The image presents a scenario where a bank needs to modernize its mainframe workloads to the cloud, listing four AWS services that can assist in this process: AWS Mainframe Modernization, AWS Snowball, AWS Database Migration Service, and AWS Server Migration Service.](https://kodekloud.com/kk-media/image/upload/v1752863842/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-MigrationTransfer-Services/bank-mainframe-modernization-aws-services.jpg)

> [!important]
> **Note**
>
> Think of mainframe modernization as the orchestration layer. The inherent reliability is primarily provided by the target AWS services.

## AWS Data Transfer and DataSync

AWS DataSync is designed for secure and efficient data transfers between on-premises storage and AWS storage services. By using a dedicated DataSync agent, it ensures file-level logging and monitoring via S3, CloudWatch, and CloudTrail. For protocol-based transfers (FTP, FTPS, SFTP, or SCP), the service offers built-in reliability features and visibility.

![The image is a diagram illustrating the AWS DataSync service, showing data transfer from on-premises storage to various AWS storage services like Amazon EFS, S3, and FSx file systems. It highlights the role of the DataSync agent in managing data synchronization securely.](https://kodekloud.com/kk-media/image/upload/v1752863843/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-MigrationTransfer-Services/awss-datasync-data-transfer-diagram.jpg)

Monitoring options such as CloudWatch logs, DataSync task logs, and additional trace tools help in ensuring smooth operations during data transfers.

![The image presents a scenario where a company uses AWS DataSync to transfer data to Amazon S3 and needs visibility into transfer status and errors. It lists four options for achieving this visibility, including enabling DataSync file transfer logs to CloudWatch and checking task logs in the DataSync console.](https://kodekloud.com/kk-media/image/upload/v1752863846/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-MigrationTransfer-Services/aw-data-transfer-visibility-options.jpg)

Detailed logging and visualization of data flow allow teams to quickly troubleshoot issues.

![The image is a diagram illustrating the data flow for AWS DataSync, showing how data moves from a data center to AWS services like CloudWatch Logs, S3, Lambda, and SQS.](https://kodekloud.com/kk-media/image/upload/v1752863848/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-MigrationTransfer-Services/awss-datasync-data-flow-diagram.jpg)

## AWS Snow Family Storage Devices

For physical data migration, the AWS Snow Family—comprising devices like Snowcone and Snowball Edge—is engineered for reliable and secure data transfer in challenging environments. These rugged devices are pre-hardened for transit and are ideal for moving large volumes of data from remote or harsh locations.

![The image is a diagram illustrating the design for reliability of the Snow Family storage system, showing connections between an on-premises source, LAN, Snowball Edge, and a staging workstation with S3 compatibility.](https://kodekloud.com/kk-media/image/upload/v1752863849/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-MigrationTransfer-Services/snow-family-storage-reliability-diagram.jpg)

For example, the Snowball Edge offers up to 210 terabytes of NVMe storage and is built to withstand the demands of mobile deployment, ensuring durability without the need for adjustable reliability settings.

## Conclusion

In summary, AWS migration and transfer services are designed as highly managed solutions with intrinsic reliability, though they offer few manual configuration options. Services like Application Migration, Application Discovery, and DataSync leverage AWS monitoring tools—such as CloudWatch, CloudTrail, and X-Ray—to maintain operational excellence. At the same time, services like EDR and DMS require careful planning to accommodate their unique recovery processes.

Effective monitoring and proactive management are key to ensuring reliable migrations and transfers. For further information on AWS services and best practices, consider exploring the [AWS Documentation](https://aws.amazon.com/documentation/) or [AWS Migration Hub](https://aws.amazon.com/migration-hub/).

Thank you for reading this guide on enhancing reliability in migration and transfer services. We look forward to sharing more insights in our next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a99d085-acf0-4910-924f-737bfc1652da/lesson/ecf7a769-1f5f-4f0c-a7d1-b5c8771f90ac)**
>
> Watch video content
