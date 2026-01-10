# Backup App Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-PaaS-Compute-Options/Backup-App-Service)

---

## Table of Contents

- Backup App Service
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer PaaS Compute Options

# Backup App Service

The Backup App Service feature in Azure provides a reliable solution to safeguard your web applications against catastrophic failures. With this functionality, you can perform both manual and scheduled backups, ensuring that your app’s configuration settings, file contents, and connected databases are securely saved.

> [!important]
> **Backup Availability**
>
> Backup App Service supports up to 10 GB of data per backup, which includes both your app and its associated database. Note that this feature is available exclusively on Standard and Premium plans.

You can configure both full and partial backups based on your specific requirements. Once a backup is created, you have the flexibility to restore the app to a previous state or even create a new web app from the backup file, enabling rapid recovery with minimal downtime.

When you access the backup option in the Azure portal, you will first need to select a storage account where your backups will be securely stored. Additionally, you have the option to configure custom backup settings to tailor the retention policy and backup schedule to your needs.

![The image shows a Microsoft Azure portal interface for managing backups of a web app named "kodekloudemoapp." It displays backup details, including the schedule, status, and options to configure or restore backups.](https://kodekloud.com/kk-media/image/upload/v1752884752/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Backup-App-Service/azure-portal-kodekloudemoapp-backups.jpg)

Custom backups let you define your own retention policies and schedules for backup collection, whereas the automatic backup configuration provided by Azure runs every hour. This automated approach allows you to quickly restore your app from a previous restore point whenever needed.

Next, we will explore how to set up CI/CD pipelines and deployment slots for your web app, enhancing your development workflow and streamlining the deployment process.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/c1871647-c1ec-478a-beab-b21781cec58f/lesson/5c4c62e2-6aea-4d3d-a156-c21e0526ffb6)**
>
> Watch video content
