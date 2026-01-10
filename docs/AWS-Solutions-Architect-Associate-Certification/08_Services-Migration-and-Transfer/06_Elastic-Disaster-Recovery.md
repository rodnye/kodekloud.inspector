# Elastic Disaster Recovery - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Migration-and-Transfer/Elastic-Disaster-Recovery)

---

## Table of Contents

- Elastic Disaster Recovery
  - Introduction
  - Components and Architecture
  - End-to-End Process
  - Key Features
  - Integration with AWS Services
  - Use Cases
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Migration and Transfer

# Elastic Disaster Recovery

In this lesson, we explore AWS Elastic Disaster Recovery, a service designed to simplify and streamline disaster recovery by leveraging cloud technology. This guide explains why the service was developed, its key components, and the benefits it offers.

## Introduction

Traditional disaster recovery infrastructure requires maintaining both a primary site and a backup site. This backup environment remains idle until failure occurs and demands constant maintenance to ensure it is up-to-date. Such an approach is not only expensive but also complex, often requiring dedicated resources and additional data center space.

![The image explains the need for AWS Disaster Recovery Service (DRS) with icons representing a primary site, a disaster recovery site, and challenges like expense, maintenance, and the need for a special skilled team.](https://kodekloud.com/kk-media/image/upload/v1752865453/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Disaster-Recovery/aws-disaster-recovery-service-explained.jpg)

Cloud solutions like AWS help overcome these challenges by allowing businesses to use the cloud as their disaster recovery site. AWS Elastic Disaster Recovery significantly reduces downtime and data loss by enabling fast, reliable recovery of both on-premises and cloud-based applications. It utilizes cost-efficient storage, minimal compute resources, and point-in-time recovery to ensure that your applications stay operational even during a crisis.

![The image is an infographic about AWS Elastic Disaster Recovery (AWS DRS), highlighting its features of minimizing downtime and data loss, and providing reliable recovery.](https://kodekloud.com/kk-media/image/upload/v1752865454/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Disaster-Recovery/aws-elastic-disaster-recovery-infographic.jpg)

By leveraging AWS services such as S3, EC2, and EBS, organizations can quickly establish a disaster recovery site with minimal maintenance overhead.

## Components and Architecture

To understand how AWS Elastic Disaster Recovery functions, consider the following key components in your on-premises and AWS environments:

1.  **On-Premises (Source Servers):**
    - Install the AWS replication agent (downloadable from an S3 bucket) on every source server.
    - Configure each replication agent to back up the selected disks on the servers.

2.  **AWS Cloud Infrastructure:**
    - **Staging Subnet:**  
      This is an AWS-managed subnet where an EC2 instance—acting as the replication server—handles data transfer from the replication agents to EBS volumes.
    - **Recovery Subnet:**  
      During a failover event, new servers are launched in this subnet. These servers boot from point-in-time snapshots of the EBS volumes, ensuring they have access to the latest data.

![The image illustrates AWS DRS components, showing a corporate data center with an AWS Replication Agent and source server, and an AWS Cloud with staging and recovery subnets, including Amazon EC2.](https://kodekloud.com/kk-media/image/upload/v1752865456/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Disaster-Recovery/aws-drs-components-data-center-diagram.jpg)

In summary, the disaster recovery workflow involves:

- Installing the replication agent on source servers at the primary site.
- Continuously replicating data to AWS EBS volumes through a staging subnet.
- Launching recovery instances from snapshots in a dedicated recovery subnet during an outage.

## End-to-End Process

The disaster recovery process using AWS Elastic Disaster Recovery follows these steps:

- **On-Premises Setup:**  
  Install the replication agent on each of your servers (for example, two servers) and configure them to back up specific disks (e.g., two disks on server one and three on server two). These agents communicate with the DRS endpoint, informing the service of available source servers.
- **Staging Area in AWS:**  
  Set up a staging area that includes:
  - A replication server (an EC2 instance) responsible for managing data transfers.
  - A corresponding set of EBS volumes for each disk being backed up. For instance, if you have five disks across your servers, there will be five associated EBS volumes.

  > [!important]
  > **Note**
  >
  > The replication server continuously transfers backup data from the replication agents to the configured EBS volumes.

- **Failover Process:**  
  Upon a disaster or during a planned test:
  - AWS launches the recovery subnet.
  - Appropriate instances are started using snapshots taken from the EBS volumes.
  - The recovery instances ensure your application runs in AWS with the latest replicated data.
  - After the primary site is restored, data may be re-synced back from AWS if a failback is needed.

![The image illustrates the architecture of AWS DRS (Disaster Recovery Service) in action, showing the flow of data from a local network to the AWS cloud, including components like replication agents, staging area subnets, and recovery subnets.](https://kodekloud.com/kk-media/image/upload/v1752865457/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Disaster-Recovery/aws-drs-architecture-diagram.jpg)

## Key Features

AWS Elastic Disaster Recovery offers several notable features that help minimize downtime and ensure smooth recovery:

- **Real-Time Data Sync and Point-in-Time Recovery:**  
  Data is continuously replicated so that the most recent snapshot is always available during failover.
- **Automated Disaster Recovery Drills:**  
  Regular drills automatically validate that the replicated environment is ready and operational.
- **Rapid Recovery:**  
  AWS can launch recovery instances within minutes, thereby reducing potential downtime.

![The image lists three AWS DRS features: Real-Time Sync and Point-in-Time Recovery, Automated DR Drills, and Faster Recovery, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752865458/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Disaster-Recovery/aws-drs-features-icons.jpg)

## Integration with AWS Services

AWS Elastic Disaster Recovery works seamlessly with key AWS services:

- **EC2:**  
  Both the replication server (in the staging subnet) and the recovery instances are launched on EC2.
- **S3:**  
  Snapshot storage and additional replication data are managed by S3.
- **EBS:**  
  Acts as the replicating storage medium for the backed-up data.

![The image illustrates AWS DRS integration, showing connections between Amazon EC2, Amazon S3, and Amazon EBS with AWS Elastic Disaster Recovery.](https://kodekloud.com/kk-media/image/upload/v1752865460/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Disaster-Recovery/aws-drs-integration-ec2-s3-ebs.jpg)

When recovery instances are initiated, they automatically attach the EBS volumes containing the latest copies of your data, thus ensuring continuity of operations.

## Use Cases

AWS Elastic Disaster Recovery is best suited for several scenarios, including:

| Use Case                      | Description                                                                                              | Example                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Rapid Operational Recovery    | Quickly recovering your operations after unexpected events such as software issues or hardware failures. | Launching recovery instances in minutes during a disaster event.   |
| Cross-Cloud Disaster Recovery | Executing disaster recovery from non-AWS environments to AWS for enhanced resiliency.                    | Migrating recovery operations from Azure or on-premises resources. |
| Intra-Cloud Regional Failover | Failing over between AWS regions to mitigate regional outages and improve service reliability.           | Switching operations from one AWS region to another seamlessly.    |

This high-level overview demonstrates how AWS Elastic Disaster Recovery can reduce costs, minimize maintenance complexity, and provide a robust disaster recovery solution to quickly restore operations during critical events.

> [!important]
> **Warning**
>
> Ensure that your replication agents are consistently updated and correctly configured to avoid data loss during an unexpected failover.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/4fd27446-288a-44dc-a3f3-99e943f92fe2/lesson/6286c700-1865-4b24-86b3-e9eccbfb51d4)**
>
> Watch video content
