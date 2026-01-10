# Turning up Security on Database Services Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Database-Services-Part-1)

---

## Table of Contents

- Turning up Security on Database Services Part 1
  - Amazon RDS and IAM Authentication
  - Authentication Methods Across Database Engines
  - Secrets Management and Credential Rotation
  - RDS and VPC Considerations
  - Choosing the Right RDS Instance Type for Performance and Security
  - Monitoring and Performance Insights
  - Accessing and Analyzing RDS Logs
  - RDS Event Notifications
  - RDS Recommendations and Trusted Advisor
  - Encryption: Data at Rest and in Transit
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Database Services Part 1

Welcome, future solutions architects. In this lesson, we explore design attributes for enhancing security in database services within AWS. We begin by examining the strengths of SQL and then move into securing AWS services like Amazon RDS by leveraging built-in security controls.

Remember the shared responsibility model: platform services like RDS reduce your operational overhead and share security responsibilities compared to managing your own servers on EC2. This difference is even more pronounced with highly managed services such as DynamoDB, where much of the security is handled for you.

![The image is a diagram showing the shared responsibility model between customers and AWS for different services like Amazon EC2, Amazon RDS, AWS S3, AWS KMS, and DynamoDB. It illustrates the division of responsibilities and customization levels across infrastructure, container, and managed services.](https://kodekloud.com/kk-media/image/upload/v1752864205/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-1/aws-shared-responsibility-model-diagram.jpg)

The standard conversation for securing managed services typically centers on controlling IAM access and monitoring logs with CloudWatch (particularly CloudWatch Logs), CloudTrail for API calls, and Config for tracking configuration changes. As services become increasingly managed, many security tasks are abstracted away.

We have already covered networking, storage, and compute—each a component of infrastructure-based or infrastructure-managed services. Now, our focus shifts to database services, which primarily fall into the platform services category or even the highly managed group when advanced use cases like machine learning are involved.

---

## Amazon RDS and IAM Authentication

Amazon RDS supports multiple authentication methods. A notable option is IAM authentication, which allows you to use your IAM user credentials to log in to an RDS database (supported for engines such as MariaDB, MSSQL, or Oracle). This avoids the need to manage separate database-specific credentials, especially when every database instance maintains its own user store.

![The image is a diagram illustrating Amazon RDS with its authentication mechanisms, showing users accessing an Amazon EC2 instance with a MariaDB client from a public subnet and connecting to Amazon RDS for MariaDB in a private subnet via IAM authentication.](https://kodekloud.com/kk-media/image/upload/v1752864207/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-1/amazon-rds-authentication-diagram.jpg)

To use IAM authentication, enable the option during the database launch or modification process, then create an IAM policy that grants RDS DB connect permissions linked to the corresponding database user. Even though you might consider modifying the RDS instance or creating an IAM role directly, the technically correct approach is to craft an IAM policy with the necessary connection permissions.

Consider this real-world case study question:

_MariaDB on RDS wants to leverage AWS IAM for database authentication. What steps are needed?_

- Options include modifying the instance to enable IAM authentication, creating an IAM role with permissions, or generating IAM access keys for a MariaDB user password.
- The correct approach is to create an IAM policy that grants RDS DB connect permissions and associate it with the database user.

> [!important]
> **Note**
>
> Even though IAM authentication can be enabled at launch, remember that establishing proper permissions is crucial.

---

## Authentication Methods Across Database Engines

Different RDS engines offer different authentication methods. For example, MySQL and MariaDB support native authentication but do not offer Kerberos. On the other hand, MSSQL, PostgreSQL, and Oracle support both native and Kerberos authentication. In multinational scenarios requiring both authentication types, PostgreSQL (or MSSQL/Oracle if available) stands out as a strong candidate.

![The image is a multiple-choice question about which Amazon RDS database engine supports both native and Kerberos authentication, with options including MySQL, PostgreSQL, MariaDB, and Aurora.](https://kodekloud.com/kk-media/image/upload/v1752864208/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-1/amazon-rds-authentication-question.jpg)

---

## Secrets Management and Credential Rotation

Amazon RDS is integrated with AWS Secrets Manager, which automates the rotation of database credentials. This presents a significant advantage over storing credentials as secure strings in Systems Manager, which does not support the auto-rotation feature. When you require automatic password rotation without modifying your application, Secrets Manager is the clear choice.

---

## RDS and VPC Considerations

While RDS is fully managed, it operates on virtualized infrastructure much like EC2. Therefore, you must consider standard EC2 security practices such as firewalls, VPC isolation, and the impact of deploying your database across public versus private subnets. Key considerations include:

- Which DB security groups to use
- Whether to attach an SSL/TLS certificate
- Whether the instance is publicly accessible (assigned a public IP) or remains in a private subnet

![The image shows configuration settings for an Amazon RDS instance, including options for VPC, subnet group, and public accessibility. It highlights the choice between making the database publicly accessible or not, with a note on EC2 firewall and security groups.](https://kodekloud.com/kk-media/image/upload/v1752864210/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-1/amazon-rds-configuration-settings.jpg)

For example, if a database is deployed in a public subnet without a public IP address, the associated Internet Gateway cannot reach it. This detail is crucial: even in a public subnet, absence of a public IP maintains isolation from direct internet access—a vital aspect of securing your database.

Consider this scenario question:

_Global financial firms use Amazon RDS to host transactional databases accessed worldwide. To ensure that only legitimate traffic reaches their RDS instance, which security measure should be implemented?_

A web application firewall (WAF) is unsuitable for typical database traffic (e.g., ports 1433 or 3306), and AWS SHIELD is designed for DDoS protection rather than access control. The best approach is to configure RDS security groups to allow only specific IP addresses or CIDR blocks.

---

## Choosing the Right RDS Instance Type for Performance and Security

For rapidly growing e-commerce businesses migrating to RDS, instance type selection has implications for both performance and security. Burstable instances may not sustain prolonged high loads effectively, whereas memory-optimized instances are engineered for workloads that demand large in-memory data sets. In such contexts, a memory-optimized instance is typically the recommended option.

![The image presents a scenario where an e-commerce company is migrating to Amazon RDS and needs to choose an optimal DB instance type for performance and security. It lists four options: burstable performance, memory-optimized, standard, and micro instances.](https://kodekloud.com/kk-media/image/upload/v1752864211/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-1/ecommerce-amazon-rds-db-instances.jpg)

Additionally, when integrating with IAM, it is best practice to assign roles to EC2 instances rather than embedding sensitive database credentials directly in application code. Using IAM roles ensures secure access to RDS without the risks associated with hardcoding credentials.

![The image is a diagram showing an AWS architecture setup, including a corporate data center connected to an AWS account via Direct Connect, with components like an Internet Gateway, Amazon EC2 in a public subnet, and Amazon RDS in a private subnet. It also notes that RDS can be integrated with IAM for applications to use IAM roles instead of database usernames.](https://kodekloud.com/kk-media/image/upload/v1752864212/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-1/aws-architecture-diagram-direct-connect.jpg)

Consider this scenario:

_Fintech companies deploying web applications on EC2 need to access an RDS database securely without hardcoding credentials. Which approach meets this requirement?_

The best practice is to store RDS credentials in AWS Secrets Manager and assign an appropriate role to retrieve them. This setup supports automatic password rotation while eliminating hardcoded credentials.

![The image presents a scenario where a fintech company needs EC2 instances to securely access an RDS database without hardcoding credentials. It lists four approaches to achieve this, including using AWS Secrets Manager and enabling public access.](https://kodekloud.com/kk-media/image/upload/v1752864213/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-1/fintech-ec2-rds-access-approaches.jpg)

---

## Monitoring and Performance Insights

Monitoring is essential for managing any transactional database. Amazon RDS integrates with CloudWatch to track metrics such as:

- Number of active database connections
- IO operations (which can reveal disk throughput bottlenecks)
- Freeable memory (a key performance indicator)

Enhanced monitoring provides real-time OS-level metrics—covering CPU usage, memory consumption, and load averages—and includes a process list. For deeper analysis of slow queries or SQL performance, leverage RDS Performance Insights to visualize load distribution by SQL statements, hosts, or users.

![The image shows a dashboard with various OS-level metrics for RDS, including graphs for memory, CPU usage, and load averages. It highlights enhanced monitoring capabilities.](https://kodekloud.com/kk-media/image/upload/v1752864215/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-1/rds-os-level-metrics-dashboard.jpg)

Consider this question:

_Fintech is using RDS for its primary database and is experiencing performance issues. They are considering enhanced monitoring to gain detailed OS-level insights. What does enhanced monitoring provide over standard CloudWatch metrics?_

Enhanced monitoring delivers real-time access to operating system-level metrics for the RDS instance, offering granularity that standard CloudWatch metrics lack.

Below is an example SQL code snippet relevant to performance tuning and troubleshooting. Note that similar blocks have been consolidated for clarity:

```
WITH cte AS (
  SELECT id FROM authors LIMIT ?
)
UPDATE authors s
SET email = ?
FROM cte
WHERE s.id = cte.id;

SELECT count(*)
FROM authors
WHERE id < (SELECT max(id) - ? FROM authors)
  AND id > (SELECT max(id) - ? FROM authors);

DELETE FROM authors
WHERE id < (SELECT max(id) - ? FROM authors)
  AND id > (SELECT max(id) - ? FROM authors);

-- Optional union example for aggregated queries
SELECT count(*)
FROM authors
WHERE id < (SELECT max(id) - ? FROM authors)
  AND id > (SELECT max(id) - ? FROM authors)
UNION
SELECT ...;

DELETE FROM authors
WHERE id < (SELECT max(id) - ? FROM authors)
  AND id > (SELECT max(id) - ? FROM authors)
UNION
SELECT ...;
```

---

## Accessing and Analyzing RDS Logs

Amazon RDS provides convenient access to various database logs directly through the AWS Management Console. You can view and download logs for immediate analysis or export them to an S3 bucket for long-term storage and analysis. For most use cases, accessing logs via the RDS console is the fastest approach.

![The image presents a scenario about an online retail company using Amazon RDS and asks for the recommended approach to access and analyze RDS database logs directly from the AWS Management Console. It lists four options for consideration.](https://kodekloud.com/kk-media/image/upload/v1752864216/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-1/amazon-rds-logs-analysis-options.jpg)

---

## RDS Event Notifications

Event notifications play a vital role in security detection and operational awareness. RDS can send real-time notifications for critical events (for example, when a DB instance stops) by using event subscriptions that deliver messages to an SNS topic. This method is more efficient than polling APIs or solely relying on CloudWatch alarms.

Below is an example of an RDS event notification payload:

```
{
  "metaData": {
    "version": "2014-07-01",
    "sent": "2021-08-10T05:12:52.000+0000",
    "source": {
      "accountId": "",
      "region": "us-east-1",
      "source": "aws.rds",
      "sourceIdentifier": "dbtest1",
      "sourceArn": "arn:aws:rds:us-east:dbtest1",
      "sourceType": "DB_INSTANCE",
      "eventID": "RDS-EVENT-0087",
      "time": "2021-08-10T05:12:52Z"
    },
    "tags": {
      "name": "dbtest1"
    }
  },
  "keyData": {
    "programName": "RDS",
    "eventName": "RDS Event Notification - [notification]"
  },
  "baseData": {
    "occurred": "2021-08-10T05:12:00.000+0000",
    "State": "Alarm",
    "summary": "RDS DB Instance Event - DB identifier: dbtest1 EventID: RDS-EVENT-0087",
    "message": "Message: DB instance stopped"
  }
}
```

For example, if a core banking application requires real-time notifications for significant RDS events, the ideal solution is to configure RDS event subscriptions that forward these events to an SNS topic.

---

## RDS Recommendations and Trusted Advisor

AWS Trusted Advisor and RDS Recommendations offer valuable insights into optimization in performance, security, and cost. While Trusted Advisor may highlight underutilized instances or configurations that need attention, it does not directly change instance configurations.

![The image shows an Amazon RDS dashboard with active recommendations, including issues like outdated engine versions, disabled encryption, and pending maintenance.](https://kodekloud.com/kk-media/image/upload/v1752864217/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-1/amazon-rds-dashboard-recommendations.jpg)

For example, a healthcare company using RDS for storing patient records may receive cost-optimization recommendations from Trusted Advisor, although no direct modifications to the database instances are made.

---

## Encryption: Data at Rest and in Transit

Each Amazon RDS database engine supports encryption of data at rest. You can enable disk encryption with AWS Key Management Service (KMS) during instance creation. Certain engines, such as Oracle and MSSQL, also offer Transparent Data Encryption (TDE).

In addition to encryption at rest, it is essential to secure data in transit. Enabling SSL/TLS encryption ensures that all communications between your client and the RDS instance are secure. Each database engine manages transit encryption through specific SSL parameters and certificates.

![The image presents a scenario where a health-tech company is using Amazon RDS to store patient records and needs to ensure data encryption in transit. It lists four measures to achieve this, including enabling SSL/TLS encryption and using AWS Key Management Service.](https://kodekloud.com/kk-media/image/upload/v1752864219/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-1/health-tech-amazon-rds-encryption.jpg)

For a fintech startup with stringent security requirements for sensitive financial data, the recommended strategy is to enable encryption at rest (using KMS or TDE where applicable) and enforce SSL/TLS for all client connections to secure data in transit.

---

This lesson has covered several key aspects of securing database services on AWS—from authentication and IAM integration to monitoring, event notifications, and encryption. By understanding and applying these best practices, you can ensure that your database services are both high-performing and secure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/3e50c82a-46e5-498e-9894-9d23e71a0b3d)**
>
> Watch video content
