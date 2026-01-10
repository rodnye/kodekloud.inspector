# Turning up Security on Database Services Part 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Database-Services-Part-3)

---

## Table of Contents

- Turning up Security on Database Services Part 3
  - Securing Amazon Redshift
  - Encryption in Amazon Redshift
  - Securing NoSQL with Amazon DynamoDB
  - Conclusion
  - Watch Video
    - Redshift IAM Authentication
    - Security Groups and Network Access
    - VPC Endpoints for Redshift
    - Logging, Auditing, and Compliance
    - VPC Endpoints and Access for DynamoDB
    - Monitoring and Change Tracking in DynamoDB
    - Data Protection and Encryption in DynamoDB
    - DynamoDB Accelerator (DAX)

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Database Services Part 3

In this article, we explore the security aspects of Amazon Redshift and Redshift Serverless. Redshift is a data warehousing service that can operate in two modes—provisioned and serverless. Although performance differences between these modes will be discussed later, this article focuses exclusively on security.

![The image is a diagram illustrating the architecture of Amazon Redshift, showing both serverless and provisioned modes, with components like data sharing clusters, managed storage, and integration with services like Amazon S3 and SageMaker.](https://kodekloud.com/kk-media/image/upload/v1752864238/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/amazon-redshift-architecture-diagram.jpg)

The diagram above outlines several critical components including JDBC connections, APIs, live data queries, and machine learning integrations. Data flows into a central warehouse that can be either a provisioned, cluster-based system or a serverless one. The main challenge is determining the best method to secure these architectures.

## Securing Amazon Redshift

Security in Redshift is managed uniformly regardless of the deployment mode. Consider the scenario of a data analytics company deploying Redshift for big data processing. The company needs to determine which cluster configuration best describes the primary node type in Amazon Redshift.

![The image presents a question about the primary cluster mode in Amazon Redshift, with four multiple-choice options describing different cluster configurations.](https://kodekloud.com/kk-media/image/upload/v1752864239/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/amazon-redshift-cluster-mode-question.jpg)

The correct answer is the configuration where the cluster is divided into leader nodes and compute nodes. In this setup, the leader node coordinates query execution while the compute nodes handle the heavy processing tasks. Although a single-node deployment is available for development or testing purposes, it is not considered the primary cluster mode.

### Redshift IAM Authentication

Redshift supports IAM authentication, similar to other SQL-based databases. Over time, Redshift has evolved to incorporate several security enhancements. This process maps database users and groups to IAM users and groups. With AWS Single Sign-On (now known as the Identity Center), administrators can set up these mappings to streamline access control.

![The image is a flowchart illustrating the authentication process for Redshift and Redshift Serverless using AWS Single Sign-On, showing the mapping of user identity and database access. It highlights the support for IAM authentication and Redshift users.](https://kodekloud.com/kk-media/image/upload/v1752864240/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/redshift-authentication-flowchart-aws-sso.jpg)

Using IAM authentication allows users to generate temporary database credentials to log into Amazon Redshift. Keep in mind that while IAM authentication supports secure access, it does not eliminate the need to configure individual database users and permissions—it simply maps these permissions to IAM roles for more efficient management.

Consider this question regarding IAM authentication in Redshift:

![The image presents a question about IAM authentication in Amazon Redshift, offering four statements to determine which is true. It is part of a security enhancement scenario for a financial analytics firm using AWS services.](https://kodekloud.com/kk-media/image/upload/v1752864241/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/iam-authentication-amazon-redshift-question.jpg)

The correct answer confirms that IAM authentication enables users to obtain temporary database credentials for login, leveraging role-based access rather than direct management console credentials.

### Security Groups and Network Access

Both Redshift and Redshift Serverless support the use of security groups, which function as stateful firewalls to control inbound and outbound traffic. You can configure these rules to specify which ports are accessible and from which IP addresses or VPCs, supplementing them with Network ACLs (NACLs) depending on your VPC design.

![The image illustrates a network architecture involving Amazon Redshift and Redshift Serverless, showing interactions between AWS accounts, VPCs, and security groups. It highlights the use of roles and port configurations for secure data access and transfer.](https://kodekloud.com/kk-media/image/upload/v1752864242/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/amazon-redshift-network-architecture.jpg)

A related security question asks about the functionality of security groups:

![The image presents a question about using Amazon VPC security groups with Amazon Redshift, followed by four statements describing different aspects of security group functionality.](https://kodekloud.com/kk-media/image/upload/v1752864243/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/amazon-vpc-security-groups-redshift.jpg)

The correct statement is that security groups function as a stateful firewall allowing you to specify both inbound and outbound rules. Contrary to some misconceptions, a single Redshift cluster can be associated with multiple security groups, and by default, all inbound traffic is denied unless explicitly allowed.

### VPC Endpoints for Redshift

VPC interface endpoints powered by AWS PrivateLink are the industry standard for connecting securely to Redshift. These endpoints facilitate a private connection between your VPC and Redshift, keeping all traffic within the AWS network.

![The image illustrates a network diagram showing Amazon Redshift and Redshift Serverless within an AWS Cloud environment, highlighting the support for VPC endpoints with public and private subnets.](https://kodekloud.com/kk-media/image/upload/v1752864244/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/aws-cloud-amazon-redshift-diagram.jpg)

Review the following question on VPC interface endpoints:

Do they allow you to connect your cluster without using a public IP address, ensuring all traffic remains within the AWS network?  
Yes, they do. The other options, which suggest performance enhancements or support for gateway endpoints, are incorrect; Redshift only supports interface endpoints.

### Logging, Auditing, and Compliance

Redshift offers extensive logging capabilities. Audit logs can be exported directly to an S3 bucket, later analyzed using tools like Amazon Athena or visualized via QuickSight. Moreover, integration with CloudWatch and CloudTrail facilitates monitoring of API calls and system performance.

![The image is a flowchart showing the process of transferring Amazon Redshift logs to an S3 bucket, then analyzing them with Amazon Athena, and visualizing with Amazon QuickSight.](https://kodekloud.com/kk-media/image/upload/v1752864245/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/redshift-logs-s3-athena-quicksight.jpg)

To enable audit logging, simply configure Redshift to use your desired S3 bucket. This feature is built into the Redshift configuration, negating the need for auxiliary services like AWS Lambda or Redshift Spectrum (the latter is used for querying data in S3, not for logging).

![The image presents a scenario where a retail company using Amazon Redshift wants to log activities to an Amazon S3 bucket, with four suggested steps to achieve this.](https://kodekloud.com/kk-media/image/upload/v1752864246/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/amazon-redshift-s3-logging-steps.jpg)

Another scenario involves a financial institution that must meet regulatory compliance by monitoring and retaining all cluster activity logs:

![The image presents a scenario where a financial institution uses Amazon Redshift for data warehousing and needs to monitor logs for compliance. It lists four steps to integrate Redshift with Amazon CloudWatch Logs.](https://kodekloud.com/kk-media/image/upload/v1752864247/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/redshift-cloudwatch-logs-integration.jpg)

The recommended approach is to enable Redshift audit logging and push the logs directly to CloudWatch Logs where you can convert them into actionable metrics with defined alarm thresholds.

For example, you might run a query like this to view sample audit logs:

```
SELECT * FROM "default"."redshift_audit_logs" LIMIT 10;
```

## Encryption in Amazon Redshift

Amazon Redshift supports encryption for both data at rest and data in transit. You can utilize AWS Key Management Service (KMS) or an external hardware security module such as CloudHSM. Options include using AWS’s default key or a custom key from another account. Data in transit is encrypted via TLS, and integration with third-party tokenization solutions is available—note that tokenization is managed by the third-party service, not natively within Redshift.

![The image presents a scenario where a financial institution is migrating its data warehouse to Amazon Redshift and needs to ensure data encryption at rest and in transit. It lists four measures to meet encryption requirements, including using Amazon Redshift's default encryption and AWS Key Management Service.](https://kodekloud.com/kk-media/image/upload/v1752864248/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/data-warehouse-amazon-redshift-encryption.jpg)

In summary, secure your Redshift clusters by:

- Enabling audit logging.
- Configuring encryption for data at rest using KMS.
- Employing TLS and tokenization (with a trusted third-party service) for data in transit.

## Securing NoSQL with Amazon DynamoDB

Shifting focus to NoSQL, Amazon DynamoDB is AWS's flagship managed NoSQL database known for its minimal operational overhead. DynamoDB automatically scales capacity based on demand, and it supports point-in-time backups without requiring manual patching or third-party tools for backup and restore.

For access control, DynamoDB relies exclusively on IAM for table and row access. Since it does not employ traditional native database users, access is strictly managed through policies that include specific conditions to restrict actions on designated tables.

![The image is a diagram explaining the network setup for accessing DynamoDB using AWS services, including VPC endpoints, security groups, and IAM policies. It illustrates the flow of data between public and private subnets, a bastion host, and DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752864249/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/dynamodb-network-setup-diagram.jpg)

A common security question for DynamoDB is:  
• How do you ensure that only specific IAM users or roles can access particular tables and actions?  
The answer is by using IAM policies with condition keys that restrict access to designated DynamoDB tables.

### VPC Endpoints and Access for DynamoDB

Although DynamoDB does not run within a VPC, it supports both gateway and interface endpoints to provide secure, private access without going over the public internet. Simply configure the appropriate VPC endpoint in your route table to set up secure connectivity.

### Monitoring and Change Tracking in DynamoDB

DynamoDB integrates seamlessly with CloudWatch and CloudTrail, and it also offers DynamoDB Streams—a feature enabling near real-time change data capture. This capability is particularly useful for applications such as fraud detection where immediate processing of table changes is critical.

![The image presents a question about which DynamoDB feature can help a fintech company achieve real-time transaction processing for fraud detection, with four options: using DynamoDB Accelerator (DAX), enabling DynamoDB Streams, using Global Tables, and setting up Scheduled CloudWatch Events.](https://kodekloud.com/kk-media/image/upload/v1752864250/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/dynamodb-real-time-fraud-detection.jpg)

The correct choice for real-time processing is enabling DynamoDB Streams.

### Data Protection and Encryption in DynamoDB

DynamoDB automatically encrypts data at rest using AWS KMS and secures data in transit with TLS 1.2. This built-in encryption ensures data protection without necessitating additional configuration.

![The image illustrates the encryption process for DynamoDB, showing how data is encrypted at rest using AWS KMS with customer master keys and data encryption keys. It also mentions that DynamoDB uses TLS 1.2 for client-side signing of data in transit.](https://kodekloud.com/kk-media/image/upload/v1752864251/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/dynamodb-encryption-process-aws-kms.jpg)

A related question asks which statement about DynamoDB encryption is accurate. The correct answer is that DynamoDB supports comprehensive encryption for both data at rest and data in transit.

![The image presents a question about Amazon DynamoDB's encryption capabilities, offering four statements to determine which is accurate. It discusses encryption in transit and at rest using AWS keys and SSL/TLS.](https://kodekloud.com/kk-media/image/upload/v1752864253/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/dynamodb-encryption-capabilities-question.jpg)

### DynamoDB Accelerator (DAX)

DAX is a managed, distributed in-memory cache that boosts DynamoDB read performance by reducing latency. Despite its performance benefits, DAX has unique security requirements. Because DAX requires its own set of permissions, granting full access to DAX clusters might inadvertently widen access beyond what is intended. Always ensure that assigned IAM roles and policies for DAX are as restrictive as necessary.

![The image presents a question about the fundamental architecture of Amazon DynamoDB Accelerator (DAX) with four possible statements describing its features.](https://kodekloud.com/kk-media/image/upload/v1752864254/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/dynamodb-accelerator-architecture-question.jpg)

For IAM integration with DAX, the correct approach is to use policies that appropriately grant or deny access to DAX actions and resources. Fine-grained access is managed via IAM for the cluster as a whole rather than through DAX directly.

![The image presents a scenario about integrating Amazon DynamoDB Accelerator (DAX) with IAM for access control, listing four statements to determine which accurately describes the integration.](https://kodekloud.com/kk-media/image/upload/v1752864255/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/dynamodb-accelerator-iam-integration.jpg)

Monitoring DAX is achieved through CloudWatch, which logs metrics and events in a manner similar to DynamoDB. While enabling X-Ray can provide additional request flow insights, CloudWatch remains the primary monitoring tool.

![The image shows a dashboard for DynamoDB Accelerator (DAX) metrics, displaying various performance graphs such as CPU utilization and cache hits. It also mentions that DAX logs to CloudWatch and CloudTrail without special logging.](https://kodekloud.com/kk-media/image/upload/v1752864256/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/dynamodb-accelerator-metrics-dashboard.jpg)

Finally, encryption for DAX must be enabled during cluster creation via a provided checkbox; this setting cannot be modified later. Ensure that server-side encryption is enabled at the time of configuration for secure operations.

![The image provides options for ensuring encryption for Amazon DynamoDB Accelerator (DAX) clusters, including enabling server-side encryption, using AWS Key Management Service, relying on DAX's default encryption, and manually encrypting data.](https://kodekloud.com/kk-media/image/upload/v1752864257/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-3/dynamodb-accelerator-encryption-options.jpg)

## Conclusion

This article has covered key security considerations for both Amazon Redshift (provisioned and serverless) and Amazon DynamoDB. For Redshift, best practices include using robust IAM authentication, setting up security groups and VPC endpoints, enabling comprehensive audit logging, and implementing encryption for data at rest and in transit. In the realm of DynamoDB, emphasis is placed on ease of management, the use of IAM for strict access control, configuring VPC endpoints for secure communication, leveraging DynamoDB Streams for near real-time data processing, and relying on built-in encryption capabilities. Additionally, DynamoDB Accelerator (DAX) offers a caching layer that boosts read performance while incorporating its own security measures.

> [!important]
> **Key Takeaways**
>
> - Use IAM to manage access for Redshift and DynamoDB.
> - Configure security groups and VPC endpoints to limit network exposure.
> - Enable audit logging and encryption features to ensure compliance and data protection.

By following these guidelines and best practices, you can securely deploy and manage your AWS database services while ensuring robust protection for your data.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/3367b01e-0a58-4592-b15e-e82a16ba2622)**
>
> Watch video content
