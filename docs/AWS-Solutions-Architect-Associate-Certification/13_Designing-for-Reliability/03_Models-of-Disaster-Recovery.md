# Models of Disaster Recovery - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Reliability/Models-of-Disaster-Recovery)

---

## Table of Contents

- Models of Disaster Recovery
  - Understanding RPO and RTO
  - Disaster Recovery Models
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Designing for Reliability

# Models of Disaster Recovery

Welcome back, students.

This article, presented by Michael Forrester from KodeKloud, delves into designing for reliability within disaster recovery—a critical topic for both the AWS Solutions Architect exam and real-world implementations.

Disaster recovery, often referred to as business continuity, is essential because the ability to recover from service disruptions is at the heart of system reliability. Think of reliability and disaster recovery as peanut butter and chocolate—each enhances the other. Without a strong resiliency and recovery strategy, your workloads become vulnerable when disasters strike.

![The image illustrates the concept of "Reliability and Disaster Recovery," depicting a cityscape with a large cloud overhead, symbolizing potential disruptions like weather or war.](https://kodekloud.com/kk-media/image/upload/v1752863569/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Models-of-Disaster-Recovery/reliability-disaster-recovery-cityscape.jpg)

To design robust systems, always ensure you have a clear resiliency/recovery plan detailing how your workloads respond during outages—whether due to natural disasters, technical failures, or other unexpected events. It is important to plan for scenarios where an entire geographic region might be lost.

Key concepts of disaster recovery planning include:

- **Recovery Point Objective (RPO):** The amount of data you are willing to lose, defined by your backup frequency. Essentially, it answers the question, “At what point in time was your last backup?”
- **Recovery Time Objective (RTO):** The maximum acceptable time to restore service, incorporating the time needed to restore data and reactivate systems.

Together, these metrics are integral to your Business Continuity Planning (BCP). Keep in mind AWS’s Shared Responsibility Model: while AWS offers services that help enable resiliency (such as replication features), you are responsible for configuring and managing these services. AWS does not directly manage your disaster recovery strategy at the availability zone level, though some highly managed services come with built-in resiliency.

![The image illustrates the AWS Shared Responsibility Model, highlighting the division of responsibilities between the customer and AWS for resilience in and of the cloud. It outlines specific areas such as workload architecture, hardware, services, and global infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752863570/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Models-of-Disaster-Recovery/aws-shared-responsibility-model.jpg)

## Understanding RPO and RTO

- **RPO:** Answers the question, "How much data can you afford to lose?" For instance, if backups run hourly and it takes four hours to restore a database, even a one-hour data loss can result in extended downtime due to recovery processes.
- **RTO:** Answers, "How long does it take to fully restore the service?" If it takes several hours to bring a database back online, that period determines your RTO.

> [!important]
> **Note**
>
> RTO focuses on service availability, while RPO is primarily concerned with data loss.

![The image illustrates the concepts of Recovery Point Objective (RPO) and Recovery Time Objective (RTO) in the context of a disaster, highlighting data loss and downtime. It visually represents the timeline and questions related to data recreation and recovery speed.](https://kodekloud.com/kk-media/image/upload/v1752863571/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Models-of-Disaster-Recovery/rpo-rto-disaster-recovery-diagram.jpg)

For example, if restoring a database takes four hours with hourly backups, your RPO is one hour (representing the most recent backup), but your overall RTO is four hours plus any additional time needed for service startup.

AWS outlines four primary disaster recovery (DR) strategies that span from basic backup and restore to fully active-active architectures. Each model differs in RPOs, RTOs, and cost implications.

![The image is a diagram illustrating different models of disaster recovery, ranging from "Backup & Restore" to "Multi-site Active/Active," with varying recovery point objectives (RPO) and recovery time objectives (RTO) and associated costs.](https://kodekloud.com/kk-media/image/upload/v1752863572/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Models-of-Disaster-Recovery/disaster-recovery-models-diagram.jpg)

## Disaster Recovery Models

Below is an overview of the disaster recovery models arranged from the simplest to the most sophisticated:

1.  **Backup and Restore**  
    Your on-premises data is backed up and, during a disaster, restored in the cloud. While straightforward and cost-effective, this method can lead to longer downtimes.

    ![The image is a diagram illustrating AWS disaster recovery models, specifically focusing on backup and restore processes across different regions and availability zones. It includes components like EBS volumes, RDS instances, and Amazon S3 for storage and backup.](https://kodekloud.com/kk-media/image/upload/v1752863573/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Models-of-Disaster-Recovery/aws-disaster-recovery-backup-diagram.jpg)

2.  **Pilot Light**  
    This model maintains a minimal version of your environment (typically just the database) in the cloud. In the event of a disaster, you quickly scale up the remaining components (e.g., application and frontend servers). Although recovery is faster than backup and restore, the process might take tens of minutes to fully restore service.

    ![The image is a diagram illustrating the "Pilot Light" model of disaster recovery in AWS, showing components like Elastic Load Balancing, Auto Scaling groups, and Aurora databases across different regions and availability zones.](https://kodekloud.com/kk-media/image/upload/v1752863575/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Models-of-Disaster-Recovery/pilot-light-disaster-recovery-aws-diagram.jpg)

3.  **Warm Standby**  
    In this model, a scaled-down but fully functional version of your production environment runs in the cloud, handling a small portion of production traffic. In a disaster, this standby system scales up quickly to manage full production load.

    ![The image illustrates a "Warm Standby" model for disaster recovery in AWS, showing two regions with active and standby components, including load balancing, auto-scaling groups, and Aurora databases. It highlights asynchronous cross-region replication and minimal instances running in the standby region.](https://kodekloud.com/kk-media/image/upload/v1752863576/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Models-of-Disaster-Recovery/warm-standby-disaster-recovery-aws.jpg)

4.  **Active-Active (Multi-site)**  
    In this strategy, traffic is distributed across two or more active sites (such as multiple regions or a hybrid of on-premises and cloud environments). If one site fails, another takes over instantly with virtually no downtime. This approach offers near-zero RPO (aside from replication delays) and minimal RTO, but it comes with increased complexity and higher costs.

    ![The image illustrates different models of disaster recovery, ranging from Backup & Restore to Multi-site Active/Active, with varying recovery point objectives (RPO) and recovery time objectives (RTO) and associated costs. It highlights the trade-offs between downtime, data loss, and cost for each model.](https://kodekloud.com/kk-media/image/upload/v1752863577/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Models-of-Disaster-Recovery/disaster-recovery-models-rpo-rto.jpg)

    Additionally, leveraging services like DynamoDB with global tables enables near real-time replication across regions, with failover handled automatically by Route 53. Regular testing of this setup is essential.

    ![The image illustrates a multi-site active/active disaster recovery model using AWS cloud services, featuring components like Elastic Load Balancing, Auto Scaling groups, and DynamoDB with continuous backup and automatic replication across regions.](https://kodekloud.com/kk-media/image/upload/v1752863578/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Models-of-Disaster-Recovery/aws-multi-site-disaster-recovery.jpg)

When comparing these models, consider the trade-offs between cost, complexity, recovery duration, and potential data loss. For instance, backup and restore is economical but slower, whereas active-active offers minimal downtime at a premium.

![The image is a diagram showing different models of disaster recovery, including Backup & Restore, Pilot Light, Warm Standby, and Multi-site, with details on RPO/RTO, solutions, and costs for each model.](https://kodekloud.com/kk-media/image/upload/v1752863579/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Models-of-Disaster-Recovery/disaster-recovery-models-diagram-2.jpg)

Cost and complexity are critical factors in selecting a DR strategy. Active-active may provide the fastest restoration but is the most expensive option, while backup and restore offers lower ongoing costs but increased downtime and potential data loss based on your backup frequency.

![The image is a graph illustrating the relationship between cost and complexity versus the length of service interruption, with different recovery models like Multi-Site Active/Active, Warm Standby, Pilot Light, and Backup & Restore. It shows how recovery cost and business impact vary with recovery time objectives.](https://kodekloud.com/kk-media/image/upload/v1752863580/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Models-of-Disaster-Recovery/cost-complexity-recovery-models-graph.jpg)

## Summary

Disaster recovery planning is an essential component of your overall business continuity strategy. Balancing acceptable downtime (RTO) with acceptable data loss (RPO) while remaining within budget constraints is key. The models discussed—from backup and restore to active-active—define not only the technical approach to disaster recovery but also the associated costs and business impacts.

![The image is a summary slide discussing disaster recovery, including concepts like RTO, RPO, and design patterns such as Pilot Light and Warm Standby. It highlights the relationship between complexity, cost, and recovery metrics.](https://kodekloud.com/kk-media/image/upload/v1752863581/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Models-of-Disaster-Recovery/disaster-recovery-summary-rto-rpo.jpg)

> [!important]
> **Key Takeaways**
>
> - RTO determines the allowable downtime.
> - RPO determines the maximum acceptable data loss.
> - As you progress from backup and restore to active-active, recovery times improve while data loss minimizes—albeit at a higher cost and increased system complexity.

Your role as an architect is to balance these considerations based on acceptable risks and cost constraints. Understanding these disaster recovery models is vital not only for achieving certification but also for designing robust and resilient systems.

I'm Michael Forrester. Thank you for reading, and I look forward to seeing you in the next article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a99d085-acf0-4910-924f-737bfc1652da/lesson/b5bd6e11-52cc-4ed9-b43a-5db4d83560de)**
>
> Watch video content
