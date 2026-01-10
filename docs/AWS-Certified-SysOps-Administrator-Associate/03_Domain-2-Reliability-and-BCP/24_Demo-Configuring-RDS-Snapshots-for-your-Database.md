# Demo Configuring RDS Snapshots for your Database - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Demo-Configuring-RDS-Snapshots-for-your-Database)

---

## Table of Contents

- Demo Configuring RDS Snapshots for your Database
  - Accessing Backup Settings
  - Monitoring the Backup Process
  - Important Considerations
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Demo Configuring RDS Snapshots for your Database

Welcome back, students!

In this lesson, we will walk through configuring automated backups and snapshots for an Amazon RDS PostgreSQL database instance. Although the instance is later promoted to a standalone database, it originally comes from a multi-AZ DB cluster with two read replicas. Remember, this is a multi-AZ DB cluster configuration—not a simple multi-AZ DB instance with a single replica and writer.

![The image shows an Amazon RDS dashboard displaying a list of PostgreSQL databases with their status, role, engine, region, and size. There is also a notification about Blue/Green Deployment to minimize downtime during upgrades.](https://kodekloud.com/kk-media/image/upload/v1752860036/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Configuring-RDS-Snapshots-for-your-Database/amazon-rds-postgresql-dashboard.jpg)

The critical distinction here is that the database cluster supports reading backups, whereas an instance cluster does not. For this lesson, our focus is on enabling and configuring the backups and snapshots for the instance.

## Accessing Backup Settings

Next, navigate to the backup settings in the AWS RDS console. At first glance, you might notice that the backup sub-tab is not configured. Follow these steps to modify the settings:

1.  Scroll down to the backup section.
2.  (Optional) Integrate with Secrets Manager if needed. However, our current focus is on backup configurations.
3.  Enable automated backups by setting a retention period of seven days.
4.  Choose an appropriate maintenance window for the backups.
5.  Optionally, enable cross-region replication if you require it.

![The image shows an AWS management console screen with settings for backup retention, backup window, and log exports for a database. Options for enabling replication and selecting log types are also visible.](https://kodekloud.com/kk-media/image/upload/v1752860037/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Configuring-RDS-Snapshots-for-your-Database/aws-management-console-backup-settings.jpg)

Other features, such as tagging snapshots and exporting logs, are available but not needed for this configuration. Our primary goal is to enable automated backups. In this case, the retention period was initially set to zero days. Once you update the setting, click "Continue" to proceed with the modifications. The changes will be applied immediately.

![The image shows an AWS interface for modifying a database instance, specifically changing the backup retention period from 0 to 7 days, with an option to apply the changes immediately.](https://kodekloud.com/kk-media/image/upload/v1752860037/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Configuring-RDS-Snapshots-for-your-Database/aws-database-backup-retention-modification.jpg)

## Monitoring the Backup Process

After making these changes, the AWS backplane processes the modification request. You might see a temporary "modifying" status in the console, which you can track under the logs and events tabs. Initially, there may be no events, but shortly, an entry will be added indicating that the database instance is being backed up.

![The image shows an Amazon RDS dashboard displaying a list of PostgreSQL databases with their status, role, engine, region, and size. A notification at the top indicates a successful modification of a database instance.](https://kodekloud.com/kk-media/image/upload/v1752860040/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Configuring-RDS-Snapshots-for-your-Database/amazon-rds-postgresql-dashboard-2.jpg)

If you check the logs and events, you should see an update stating that the system is backing up the database instance. Although the instance may restart to enable replication and the new backup settings, the AWS console might take a moment to update. Under the maintenance and backups section, you should eventually see that the seven-day backup retention is active. Even if there is no latest restore time and regional replication is inactive at the moment, a current snapshot is being created.

> [!important]
> **Note**
>
> Once the snapshot process is complete, the backup details will be fully displayed in the console. You can also initiate a manual snapshot later, if needed.

## Important Considerations

- While the instance is being modified, further configuration changes are temporarily blocked. This safeguard prevents conflicts until the current modification process is finalized.
- Configuring automated backups and snapshots in RDS is straightforward. It mainly involves setting the appropriate backup retention period and maintenance window.

That concludes our lesson on configuring automated snapshots and backups for an Amazon RDS PostgreSQL instance. Happy learning, and see you in the next article!

For more information on managing AWS RDS, please refer to the [AWS Documentation](https://aws.amazon.com/documentation/rds/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/e589f938-6c88-4e07-9aea-7cf65eca54c8)**
>
> Watch video content
