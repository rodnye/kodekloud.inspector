# Design for Azure SQL Backup and Recovery - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-business-continuity-solution/Design-for-Azure-SQL-Backup-and-Recovery)

---

## Table of Contents

- Design for Azure SQL Backup and Recovery
  - Backup Types in Azure SQL Database
  - Use Cases for SQL Database Backup
  - Configuring Backup for Your SQL Database
  - Additional Resources
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a business continuity solution

# Design for Azure SQL Backup and Recovery

Azure SQL Database, our Platform as a Service (PaaS) offering, leverages robust backup solutions to safeguard your data. This guide explains the various backup types available for Azure SQL Database, outlines recovery scenarios, and demonstrates how to configure backup settings in the Azure portal.

## Backup Types in Azure SQL Database

Azure SQL Database categorizes backups into three main types:

1.  **Full Backup**  
    Performed weekly, this backup includes both data and transaction log files. It serves as the primary data restore point.
2.  **Differential Backup**  
    Conducted every 12 to 24 hours, this backup captures the changes (delta) since the last full backup, including both data and transaction log files.
3.  **Transaction Log Backup**  
    Executed every 5 to 10 minutes, this backup includes only transaction log files, enabling administrators to revert to a previous log position if necessary.

![The image is an infographic explaining Azure SQL backup and recovery, detailing the frequency and types of backups: full, differential, and transaction log backups, with visual representations of data and log file processes.](https://kodekloud.com/kk-media/image/upload/v1752866815/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Backup-and-Recovery/azure-sql-backup-recovery-infographic.jpg)

## Use Cases for SQL Database Backup

Azure SQL Database backups support a variety of critical use cases:

- **Point-in-Time Restore (PITR):**  
  Restore your database to any specific point within the configured retention period. During this process, a new database is created on the same server with a different name, ensuring that the original database remains intact.

  > [!important]
  > **Note**
  >
  > The restored database can be deleted later if it's no longer necessary.

- **Restoring a Deleted Database:**  
  Recover a accidentally deleted database to its state at the time of deletion within the configured retention period. The restoration must occur on the same server or managed instance where the database was originally housed.
- **Geo-Restore:**  
  If the primary region becomes unavailable, use the geo-restore option to create a new database on an existing server or managed instance in any Azure region.
- **Long-Term Backup Restoration:**  
  For retention needs beyond the default 35 days, configure Long-Term Retention (LTR) backups to store data for up to 10 years. This capability enables restoration to older versions of your database.

![The image is an infographic from KodeKloud about Azure SQL backup use cases, detailing four scenarios: restoring an existing database to a past point-in-time, restoring a deleted database, restoring to another Azure region, and restoring from a long-term backup.](https://kodekloud.com/kk-media/image/upload/v1752866817/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Backup-and-Recovery/azure-sql-backup-use-cases.jpg)

## Configuring Backup for Your SQL Database

Follow these steps in the Azure portal to configure your SQL Database backups:

1.  **Navigate to SQL Databases:**  
    Open the database that you used earlier for migration.
2.  **Access the Server:**  
    Click on the server that hosts your database.
3.  **View Backups:**  
    In the server settings, select "Backups." Here you will see entries for backups, including the most recent backup (e.g., taken at 09:00 UTC).
4.  **Manage Deleted Backups:**  
    The portal allows you to view deleted backup entries and initiate restore operations as necessary.
5.  **Adjust Retention Policies:**  
    Click on the current default retention policy to modify the following settings:
    - Point-in-time restore (PITR) retention period (e.g., 7 days)
    - Differential backup duration
    - Weekly, monthly, and yearly long-term retention settings

![The image shows a Microsoft Azure portal interface for configuring SQL server backup policies, including options for point-in-time restore, differential backup frequency, and long-term retention settings.](https://kodekloud.com/kk-media/image/upload/v1752866819/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Backup-and-Recovery/azure-sql-server-backup-policies.jpg)

> [!important]
> **Automated Backup**
>
> Once configured, backups will be executed automatically based on your specified settings. If needed, you can remove or adjust the LTR settings by revisiting the configuration.

These configurations also apply to SQL Managed Instance, ensuring a consistent backup strategy across all your Azure SQL deployments.

---

Up next, we will explore disaster recovery strategies, focusing on Azure Site Recovery, which complements the backup mechanisms described here.

## Additional Resources

- [Azure SQL Database Documentation](https://docs.microsoft.com/en-us/azure/azure-sql/)
- [Azure Site Recovery Overview](https://docs.microsoft.com/en-us/azure/site-recovery/)
- [Understanding Backups and Recovery for SQL Database](https://docs.microsoft.com/en-us/azure/azure-sql/database/maintain-automated-backups)

Stay informed and secure your data with these comprehensive backup and recovery strategies for Azure SQL Database.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/d9cff719-f4ed-4b69-a9a5-5994a66e8e15/lesson/04714181-2372-4e9c-ad4d-0bfd8636ab4c)**
>
> Watch video content
