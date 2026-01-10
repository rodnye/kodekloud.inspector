# Encryption in Transit Options for AWS Services Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Encryption-in-Transit-Options-for-AWS-Services-Overview)

---

## Table of Contents

- Encryption in Transit Options for AWS Services Overview
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Encryption in Transit Options for AWS Services Overview

In this article, we explore the concept of encryption in transit and explain its critical role in securing data as it moves between clients and servers. Encryption in transit protects data against interception and tampering, guarding against common threats like man-in-the-middle (MITM) attacks.

![The image illustrates a client-server communication scenario with a potential Man-in-the-Middle (MITM) attack, highlighting the concept of "Encryption in Transit."](https://kodekloud.com/kk-media/image/upload/v1752860482/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Encryption-in-Transit-Options-for-AWS-Services-Overview/client-server-communication-mitm-encryption.jpg)

When data is transmitted across a network, encrypting that data ensures it remains confidential and unaltered. Most AWS services have built-in support for encryption in transit. For example, AWS automatically encrypts data when you interact with its services via the command line or the Software Development Kit (SDK). Additionally, many database services support encryption using protocols such as SSL or TLS.

> [!important]
> **Key Insight**
>
> AWS Certificate Manager (ACM) is generally preferred over AWS Key Management Service (KMS) when managing SSL/TLS certificates. While KMS is excellent for encrypting data at rest, ACM is optimized for secure transit encryption and helps meet regulatory compliance requirements with minimal performance impact.

![The image outlines four considerations for choosing encryption in transit for AWS services: Service Integration, Key Management, Regulatory Compliance, and Performance Overhead. Each consideration is represented by a numbered icon with a corresponding label.](https://kodekloud.com/kk-media/image/upload/v1752860483/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Encryption-in-Transit-Options-for-AWS-Services-Overview/aws-encryption-considerations-diagram.jpg)

Encryption in transit mainly relies on Transport Layer Security (TLS), the advanced and more secure evolution of SSL. To ensure robust security, it is recommended to use TLS 1.2 or higher when establishing connections between clients and endpoints. AWS Certificate Manager is instrumental in obtaining and managing the third-party certificates needed for these secure communications.

![The image illustrates the concept of Transport Layer Security (TLS) involving a client, server, and AWS Certificate Manager (ACM) for secure data exchange. It shows the flow of data and the use of a key for encryption.](https://kodekloud.com/kk-media/image/upload/v1752860484/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Encryption-in-Transit-Options-for-AWS-Services-Overview/tls-client-server-acm-diagram.jpg)

Below is a summary table highlighting some AWS services and their encryption in transit mechanisms:

| AWS Service           | Encryption Method                             | Additional Notes                                             |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| Amazon S3             | Encrypted endpoints using SSL/TLS             | Automatically secures data during transit.                   |
| Amazon RDS            | Encrypted connections via SSL/TLS             | Enhances database connection security.                       |
| Amazon DynamoDB       | Encrypted endpoints using SSL/TLS             | Provides native encryption in transit.                       |
| Amazon EC2            | SSH for secure communications                 | SSH ensures secure command-line access.                      |
| Elastic Load Balancer | Integration with ACM for SSL/TLS certificates | Simplifies certificate management for secure load balancing. |

Many AWS services, including Amazon S3, Amazon RDS, Amazon DynamoDB, EC2 (via SSH), and Elastic Load Balancers (through tight integration with ACM), support encryption in transit natively. While KMS plays a vital role in encrypting data at rest, AWS Certificate Manager is the recommended service for managing the certificates used to secure data as it travels through the network.

That concludes our overview of encryption in transit on AWS. In this article, we discussed the importance of encrypting data in transit, reviewed native AWS service support for this functionality, and highlighted how AWS Certificate Manager ensures secure communications.

We look forward to seeing you in the next article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/52716fe0-4816-476b-a1fd-d410015945ec)**
>
> Watch video content
