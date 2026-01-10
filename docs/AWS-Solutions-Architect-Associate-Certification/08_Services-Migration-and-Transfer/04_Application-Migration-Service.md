# Application Migration Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Migration-and-Transfer/Application-Migration-Service)

---

## Table of Contents

- Application Migration Service
  - Key Features of the Application Migration Service
  - Migration Flow Overview
  - Integration with Other AWS Services
  - Use Cases
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Migration and Transfer

# Application Migration Service

In this lesson, we dive into AWS Application Migration Service, a powerful tool designed to streamline your migration to AWS. Building on the foundation provided by Migration Hub and the Application Discovery Service—which together help you plan, track, and analyze your applications and on-premises infrastructure—this service takes your migration process to the next level.

Once the Application Discovery Service gathers initial data and insights for migration planning, AWS Application Migration Service performs the actual lift-and-shift operations. It automates converting your physical servers, virtual machines (VMs), and databases to run natively on AWS, thereby simplifying the migration process, reducing overall costs, and accelerating timelines. Notably, you can take advantage of 90 days free of charge.

> [!important]
> **Key Benefits for Solutions Architects**
>
> AWS Application Migration Service minimizes time-intensive, error-prone manual processes by:
>
> - Automating the conversion of source servers to operate natively on AWS.
> - Simplifying application modernization with both built-in and custom optimization options.
> - Supporting a wide range of platforms including physical servers, VMware, Microsoft Hyper-V, and even other cloud providers.
> - Enabling migrations for commonly used applications such as SAP, Oracle, and Microsoft SQL Server.

## Key Features of the Application Migration Service

1.  **Assessment and Planning**  
    AWS Application Migration Service performs a comprehensive analysis of your on-premises environment, mapping dependencies and creating tailored migration plans for your applications.
2.  **Replication and Continuous Data Sync**  
    With continuous replication and synchronization, the service ensures that your AWS environment always holds the most up-to-date data from your on-premises sources.
3.  **Automated Cutover and Testing**  
    The service automates the cutover process to minimize downtime during migration. Built-in testing functionality verifies that your applications perform as expected in AWS before executing a full cutover.

## Migration Flow Overview

The following scenario illustrates how AWS Application Migration Service orchestrates migration:

Imagine your on-premises data center hosts two servers: the top server with two attached disks and the bottom server with three attached disks. On the right, your AWS environment is set up with specific subnets configured for migration:

- **Staging Area:** Hosts EC2 instances responsible for managing data replication from your on-premises environment to AWS.
- **Migrated Resources Subnet:** Serves as the deployment area for your servers after data replication is completed.

The migration process begins by installing a replication agent on your on-premises servers. Once active, these agents communicate with the Migration (MGM) API endpoint to register with the service. Based on the received data, the Application Migration Service creates corresponding resources in the staging area. For example, if a server has a 10-gigabyte disk on-premises, the service creates a 10-gigabyte EBS volume in the staging area. This setup allows continuous replication of data from on-premises disks to the respective EBS volumes, ensuring an up-to-date copy of your data is always available.

When executing a failover, cutover, or migration test, the service deploys the required servers within the migrated resources subnet as EC2 instances, sized appropriately and equipped with the latest snapshots from the replicated EBS volumes. Even after cutover, continuous replication persists from on-premises to the staging area. This approach enables you to remigrate with the latest data in case of issues or for additional testing.

![The image is a diagram illustrating the automated cutover and testing features of AWS MGN, showing the data flow between a corporate data center and AWS Cloud, including components like AWS Replication Agent, EC2, and S3.](https://kodekloud.com/kk-media/image/upload/v1752865414/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Application-Migration-Service/aws-mgn-automated-cutover-diagram.jpg)

## Integration with Other AWS Services

AWS Application Migration Service seamlessly integrates with several AWS services, enhancing its capabilities:

- **[AWS Systems Manager](https://aws.amazon.com/systems-manager/):** Facilitates automated run commands.
- **[Amazon S3](https://aws.amazon.com/s3/):** Serves as a repository for fetching the latest configurations.
- **Elastic Disaster Recovery:** Enables automated disaster recovery mechanisms to protect your environment.

## Use Cases

AWS Application Migration Service caters to a variety of migration scenarios, including:

| Use Case                           | Description                                                                            |
| ---------------------------------- | -------------------------------------------------------------------------------------- |
| Migrating On-Premises Applications | Supports applications such as SAP, Oracle, SQL Server, VMware vSphere, and Hyper-V.    |
| Cloud-to-AWS Migrations            | Assists in migrating cloud-based applications from providers like Azure or GCP to AWS. |
| Inter-Region Migrations            | Enables migration of applications between different AWS regions.                       |

By embracing a step-by-step, incremental approach, AWS Application Migration Service ensures that you continually have access to up-to-date data, significantly reducing risks associated with data loss or downtime during the migration process.

> [!important]
> **Further Reading**
>
> For additional information on AWS Application Migration Service and best practices for moving to AWS, visit the [AWS Documentation](https://aws.amazon.com/documentation/) and [Migration Hub](https://aws.amazon.com/migration-hub/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/4fd27446-288a-44dc-a3f3-99e943f92fe2/lesson/cd6dba86-b477-446b-99eb-1acbb2f14b8c)**
>
> Watch video content
