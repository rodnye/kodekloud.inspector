# Aurora Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/Aurora-Demo)

---

## Table of Contents

- Aurora Demo
  - Step 1: Launching the Database Creation Process
  - Step 2: Choosing Your Database Engine
  - Step 3: Setting Up Database Credentials
  - Step 4: Configuring Cluster Storage Options
  - Step 5: Instance Configuration
  - Step 6: Availability and High Availability Setup
  - Step 7: Network and Security Settings
  - Step 8: Enabling Monitoring and Performance Options
  - Step 9: Additional Configuration Settings
  - Step 10: Accessing and Navigating the Cluster
  - Step 11: Managing Cluster Operations
  - Step 12: Deleting the Aurora Cluster
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Databases

# Aurora Demo

In this lesson, we demonstrate how to create an Aurora cluster using the AWS RDS console. Follow this step-by-step guide to learn how to deploy an Aurora database, configure its settings, and manage cluster operations.

## Step 1: Launching the Database Creation Process

Begin by navigating to the RDS page and clicking on **Databases**. Next, click **Create Database**. Under engine options, choose Aurora by selecting one of the compatible database engines.

![The image shows an AWS RDS console screen where a user can choose a database creation method and select an engine type, such as Aurora, MySQL, MariaDB, PostgreSQL, or Oracle.](https://kodekloud.com/kk-media/image/upload/v1752858674/notes-assets/images/AWS-Certified-Developer-Associate-Aurora-Demo/aws-rds-database-creation-console.jpg)

## Step 2: Choosing Your Database Engine

Aurora supports both MySQL and PostgreSQL compatibility. Select your preferred engine and choose the specific version you require. For instance, you can choose from PostgreSQL versions such as 15.4, 15.3, 15.2, etc.

![The image shows an AWS RDS console screen where Aurora PostgreSQL versions are being selected, with options for production or development/test templates.](https://kodekloud.com/kk-media/image/upload/v1752858675/notes-assets/images/AWS-Certified-Developer-Associate-Aurora-Demo/aws-rds-aurora-postgresql-selection.jpg)

For this demonstration, the default version is selected. Then, choose a template for database deployment. Options include a production template or a dev/test environment. In this example, we select the production deployment template.

## Step 3: Setting Up Database Credentials

Enter a name for your database (for example, "Database Aurora Example") and set your credentials. You can use the provided master username and decide between letting Secrets Manager generate a password or manually inputting one. In the demonstration, we manually input the password.

![The image shows an AWS RDS configuration page where a user is setting up a database cluster identifier and managing credentials using AWS Secrets Manager.](https://kodekloud.com/kk-media/image/upload/v1752858677/notes-assets/images/AWS-Certified-Developer-Associate-Aurora-Demo/aws-rds-configuration-database-cluster.jpg)

## Step 4: Configuring Cluster Storage Options

Choose from the following storage options based on your application needs:

- **Aurora Standard:** An economical choice.
- **Aurora Optimized:** Best for I/O-intensive applications.

For this demo, select **Aurora Standard**.

![The image shows an AWS RDS configuration page where a user is setting up cluster storage options, including Aurora Standard and Aurora I/O-Optimized, along with instance configuration settings.](https://kodekloud.com/kk-media/image/upload/v1752858678/notes-assets/images/AWS-Certified-Developer-Associate-Aurora-Demo/aws-rds-cluster-storage-setup.jpg)

## Step 5: Instance Configuration

Determine the type of EC2 instance that will back your database. Your options include:

- **Serverless:** For Aurora Serverless v2 (set minimum and maximum Aurora Capacity Units).
- **Non-serverless options:** Memory-optimized, burstable, or read-optimized classes.

In this example, select burstable classes and choose "db.t3.medium" as a cost-effective option. Previous generation classes may also be visible.

![The image shows an AWS RDS console screen where a user is selecting a DB instance class, with options like "db.t3.medium" and "db.t3.large" visible. The screen also includes sections for instance configuration and availability settings.](https://kodekloud.com/kk-media/image/upload/v1752858679/notes-assets/images/AWS-Certified-Developer-Associate-Aurora-Demo/aws-rds-console-db-instance-class.jpg)

## Step 6: Availability and High Availability Setup

Select whether to establish an Aurora replica or a separate reader node in a different Availability Zone. For high availability, enable the multi-AZ deployment option.

## Step 7: Network and Security Settings

Configure your network settings as follows:

- **Network Type:** Choose IPv4 or dual stack (IPv4 and IPv6).
- **VPC:** Use the default VPC for this example.
- **Subnet Group:** Select the appropriate subnet group across Availability Zones.
- **Public Accessibility:** Enable only if necessary for demonstration (avoid in production environments).

Select or create a security group as needed, and consider adding an RDS proxy if required. In the Additional Configurations section, specify the listening port (default for PostgreSQL is typically used) and choose the authentication method (e.g., IAM or Kerberos).

## Step 8: Enabling Monitoring and Performance Options

Within the Monitoring section, you can enable Performance Insights. Note that enabling additional features such as DevOps Guru may incur extra costs.

![The image shows an AWS RDS console screen with options for database authentication and monitoring settings, including Performance Insights and DevOps Guru.](https://kodekloud.com/kk-media/image/upload/v1752858680/notes-assets/images/AWS-Certified-Developer-Associate-Aurora-Demo/aws-rds-console-authentication-monitoring.jpg)

## Step 9: Additional Configuration Settings

In this section, you can further configure:

- **Extra Database Name:** Defaults to the engine name (e.g., PostgreSQL).
- **Parameter Group:** Select the appropriate group.
- **Backup Retention Period:** Defaults to seven days.
- **Encryption and Maintenance Options:** Set based on your requirements.
- **Deletion Protection:** Enable to prevent accidental deletion.

The console provides an estimated monthly cost, which in this example is approximately $59.96.

![The image shows an AWS RDS console screen with options for maintenance, deletion protection, and estimated monthly costs for a database instance. The total estimated cost is $59.96 USD.](https://kodekloud.com/kk-media/image/upload/v1752858682/notes-assets/images/AWS-Certified-Developer-Associate-Aurora-Demo/aws-rds-console-maintenance-costs.jpg)

Once all configurations are complete, click **Create Database** to start the Aurora cluster creation process.

## Step 10: Accessing and Navigating the Cluster

After creation, your database "Database Aurora Example" appears with two instances:

- **Writer Instance:** For forwarding write requests.
- **Reader Instance:** For forwarding read requests.

![The image shows an Amazon RDS dashboard displaying a list of databases with their status, role, engine, region, and size. There are options to create a database and restore from S3.](https://kodekloud.com/kk-media/image/upload/v1752858683/notes-assets/images/AWS-Certified-Developer-Associate-Aurora-Demo/amazon-rds-dashboard-databases.jpg)

Selecting the "Database Aurora Example" cluster reveals two endpoints: the writer endpoint for write operations and the reader endpoint for read operations. Additionally, clicking on an individual instance shows a direct endpoint along with detailed EC2 and networking information.

![The image shows an Amazon RDS console displaying details of a database instance, including connectivity, security, networking, and endpoint information.](https://kodekloud.com/kk-media/image/upload/v1752858684/notes-assets/images/AWS-Certified-Developer-Associate-Aurora-Demo/amazon-rds-database-instance-console.jpg)

## Step 11: Managing Cluster Operations

From the main cluster view, you can perform a range of actions, including:

- Adding another reader.
- Creating a blue-green deployment.
- Taking and restoring snapshots.
- Exporting data to S3.
- Adding a replica for autoscaling.

## Step 12: Deleting the Aurora Cluster

For demonstration purposes, follow these steps to delete the Aurora cluster:

1.  Navigate to **Actions**. You might notice that deletion is disabled because instances must be deleted individually first.
2.  Delete each instance. If prompted, disable deletion protection for the final instance by following these steps:

    > [!important]
    > **Note**
    >
    > 1.  Go to the main cluster and select **Configuration**.
    > 2.  Under Protection settings, disable deletion protection.
    > 3.  Click **Continue** and then **Modify Cluster** to apply the changes immediately.

![The image shows an Amazon RDS console screen displaying the configuration details of a database cluster, including information on authentication, encryption, and availability.](https://kodekloud.com/kk-media/image/upload/v1752858686/notes-assets/images/AWS-Certified-Developer-Associate-Aurora-Demo/amazon-rds-database-cluster-config.jpg)

![The image shows an AWS console screen for modifying a database cluster named "database-aurora-example," with options to change delete protection settings and schedule modifications.](https://kodekloud.com/kk-media/image/upload/v1752858687/notes-assets/images/AWS-Certified-Developer-Associate-Aurora-Demo/aws-console-modify-database-cluster.jpg)

3.  After modification, delete the instance and then proceed to delete the entire database cluster.
4.  When prompted, choose not to create a final snapshot if not needed, and confirm by selecting **Delete Database Cluster**.

![The image shows a confirmation dialog box for deleting a database cluster in Amazon RDS, with options to create a final snapshot and retain automated backups.](https://kodekloud.com/kk-media/image/upload/v1752858688/notes-assets/images/AWS-Certified-Developer-Associate-Aurora-Demo/amazon-rds-delete-cluster-dialog.jpg)

Once the deletion process is complete, notifications will appear on the Amazon RDS dashboard confirming the changes.

![The image shows an Amazon RDS dashboard with notifications about database modifications and deletions. It lists three databases with their statuses, roles, and other details.](https://kodekloud.com/kk-media/image/upload/v1752858689/notes-assets/images/AWS-Certified-Developer-Associate-Aurora-Demo/amazon-rds-dashboard-notifications.jpg)

## Conclusion

This lesson provided a comprehensive guide to setting up and managing an Aurora cluster on AWS RDS. By following these steps, you can deploy, configure, and manage your Aurora database with ease.

For more detailed information on AWS RDS and Aurora, explore the official [AWS Documentation](https://aws.amazon.com/documentation/rds/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/851f8f01-0dc4-4d68-894b-b7a9719a9b93)**
>
> Watch video content
