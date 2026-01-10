# Demo Promoting your own Read Replica to a Primary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Demo-Promoting-your-own-Read-Replica-to-a-Primary)

---

## Table of Contents

- Demo Promoting your own Read Replica to a Primary
  - Step 1: Selecting the Read Replica
  - Step 2: Initiating the Promotion Process
  - Step 3: Monitoring the Promotion Process
  - Step 4: Verifying the Promoted Instance
  - Step 5: Reviewing Logs and Events
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Demo Promoting your own Read Replica to a Primary

Welcome students,

In this lesson, we'll guide you through promoting a read replica into a standalone, independent primary instance. This procedure applies to any read replica, whether it's part of a single-AZ or multi-AZ deployment.

## Step 1: Selecting the Read Replica

Begin by accessing the Amazon RDS console and selecting the specific read replica—not the entire cluster or a singular instance. Ensure the replica is available before proceeding. Within the Actions menu, you'll find several options including the ability to temporarily stop the instance. For this demonstration, we will focus on the promotion action.

![The image shows an Amazon RDS dashboard with a list of databases and a dropdown menu displaying various actions like creating a Blue/Green Deployment.](https://kodekloud.com/kk-media/image/upload/v1752860065/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Promoting-your-own-Read-Replica-to-a-Primary/amazon-rds-dashboard-databases-actions.jpg)

## Step 2: Initiating the Promotion Process

Promoting the read replica temporarily disables automated backups and snapshots as part of the conversion process. Although you can re-enable automated backups after the promotion, they remain turned off during this demonstration to facilitate the transformation of the read replica into a primary instance.

![The image shows an AWS interface for promoting a read replica database, with an option to enable automated backups and a warning about backups being turned off.](https://kodekloud.com/kk-media/image/upload/v1752860066/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Promoting-your-own-Read-Replica-to-a-Primary/aws-read-replica-promote-backups.jpg)

> [!important]
> **Note**
>
> Remember that promoting a read replica disables automated backups momentarily. Be sure to re-enable backups post-promotion to maintain your data protection strategy.

## Step 3: Monitoring the Promotion Process

Once the promotion begins, the read replica is modified and detached from its current cluster context. During this phase, the instance status will change to indicate that a modification is underway. At this time, the logs and events might not provide extensive details, as the system processes the promotion internally.

## Step 4: Verifying the Promoted Instance

After the promotion process completes, the instance status will clearly show that it is no longer part of a cluster. The replica undergoes a reboot during which any existing connections from its previous configuration are terminated. Once rebooted, the database is available as an independent primary instance.

At this stage, you may choose to rename the instance to better reflect its new primary role, even though other configuration details, such as instance size, remain unchanged.

![The image shows an Amazon RDS dashboard displaying details of a PostgreSQL database instance named "rds-pg-taz-reader1," including its status, CPU usage, and connectivity information.](https://kodekloud.com/kk-media/image/upload/v1752860067/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Promoting-your-own-Read-Replica-to-a-Primary/amazon-rds-postgresql-dashboard.jpg)

## Step 5: Reviewing Logs and Events

Finally, validate the process by reviewing the logs and events. This confirmation ensures that the instance has been successfully promoted and rebooted as a standalone primary. This demonstration illustrates how promoting read replicas can effectively create live copies of your running databases.

![The image shows an Amazon RDS dashboard displaying recent events and logs related to database activities, such as replication status and instance shutdowns and restarts.](https://kodekloud.com/kk-media/image/upload/v1752860068/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Promoting-your-own-Read-Replica-to-a-Primary/amazon-rds-dashboard-events-logs.jpg)

> [!important]
> **Note**
>
> Keep a close eye on system logs during the promotion process for any unexpected behavior. Monitoring is key to assuring a smooth transition.

That concludes this lesson. We hope you found the demonstration clear and informative. See you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/0892f231-6872-403f-ae5e-54d86095b0d3)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/54de2b24-bd23-4cf1-8e65-1accc0f06335)**
>
> Practice lab
