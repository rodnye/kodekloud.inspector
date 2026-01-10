# Elastic Disaster Recovery - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/Elastic-Disaster-Recovery)

---

## Table of Contents

- Elastic Disaster Recovery
  - How Elastic Disaster Recovery Works
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# Elastic Disaster Recovery

Elastic Disaster Recovery (DRS) is a fully managed solution that ensures fast, reliable recovery for both on-premise and cloud-based applications. This service leverages affordable storage options, minimal compute resources, and point-in-time recovery to simplify complex disaster recovery processes.

> [!important]
> **Key Benefit**
>
> Elastic Disaster Recovery minimizes capital expenditure by eliminating the need for an extra on-premise backup environment. Instead of maintaining redundant infrastructure and paying for idle servers, costs are incurred only when resources are actively used.

Elastic Disaster Recovery manages disaster recovery for physical, virtual, and cloud servers. Traditionally, disaster recovery setups require an additional backup environment—which means provisioning extra servers, renting extra data center space, and shouldering continuous maintenance. With Elastic Disaster Recovery, AWS handles these complexities, letting you use its robust infrastructure as a recovery site.

The service continuously replicates your operating system, applications, and databases with 24/7 monitoring. This constant replication ensures that during a disaster, a simple click deploys an up-to-date recovery infrastructure on AWS.

![The image is an infographic about Elastic Disaster Recovery (DRS), highlighting features such as being a fully managed service, using AWS as a recovery site, maintaining continual replication, and easy access to disaster recovery infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752865987/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Disaster-Recovery/elastic-disaster-recovery-infographic.jpg)

When a disaster strikes, notify AWS and witness your recovery resources come online within minutes. Elastic Disaster Recovery supports various failover scenarios including:

- On-premises to AWS
- One cloud platform to AWS
- One AWS region to another

## How Elastic Disaster Recovery Works

1.  **Identifying Source Servers**  
    Determine the source servers whose data needs protection. Install the AWS replication agent on these servers to enable continuous monitoring and replication.
2.  **Configuring Replication Settings**  
    Set up the replication process by defining a staging area—a dedicated subnet in AWS where EC2 instances capture and archive your replicated data. This process involves three key components:

    | Component          | Description                                                           |
    | ------------------ | --------------------------------------------------------------------- |
    | On-premises System | The environment where the replication agent collects server data.     |
    | Staging Area       | The AWS subnet that receives and archives the replicated data.        |
    | Production Subnet  | The AWS subnet where recovery servers are launched during a failover. |

3.  **Defining Launch Settings**  
    Configure the recovery environment by defining launch settings. These settings include EC2 instance specifications such as instance types, sizes, regions, subnets, and security groups. When a disaster occurs, these parameters guide the quick deployment of recovery servers on AWS.

In summary, Elastic Disaster Recovery enables organizations to leverage AWS infrastructure for disaster recovery, eliminating the need for costly, redundant on-premise systems. Its pay-as-you-go model allows rapid scaling during emergencies, ensuring business continuity with a minimal cost footprint.

The essential components of Elastic Disaster Recovery include:

- **Source Servers:** On-premises servers and data slated for replication.
- **Staging Area:** AWS subnet designated for receiving and archiving replicated data.
- **Launch Template:** Predefined configurations (instance type, subnet, security groups) for recovery server deployment.

![The image is a summary of a disaster recovery service using AWS, highlighting key points such as managed recovery for various server types, using AWS as a recovery site, and configuring recovery server specifications.](https://kodekloud.com/kk-media/image/upload/v1752865989/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Disaster-Recovery/aws-disaster-recovery-summary.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/3f5eed14-ec51-4be0-82b7-8172e21c1c3f)**
>
> Watch video content
