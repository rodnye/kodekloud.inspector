# Demo Setting up AWS RDS Multi AZ Cluster Deployment with Read Replicas - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas)

---

## Table of Contents

- Demo Setting up AWS RDS Multi AZ Cluster Deployment with Read Replicas
  - Creating the Database Cluster
  - Database Creation, Failover, and Monitoring
  - Creating a Read Replica
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Demo Setting up AWS RDS Multi AZ Cluster Deployment with Read Replicas

Welcome to this comprehensive guide on deploying an AWS RDS multi-AZ PostgreSQL cluster with read replicas. In this walkthrough, you will learn how to create a high-availability PostgreSQL database using Amazon RDS, configure it across multiple availability zones, and set up additional read replicas to boost read performance.

---

We start on the Amazon RDS dashboard, where no databases have been configured yet.

![The image shows the Amazon RDS dashboard with no databases listed. It includes options for creating a database and a suggestion for using Blue/Green Deployment to minimize downtime during upgrades.](https://kodekloud.com/kk-media/image/upload/v1752860069/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/amazon-rds-dashboard-no-databases.jpg)

---

## Creating the Database Cluster

In this demonstration, you will deploy a clustered PostgreSQL instance. Unlike single-instance deployments, a multi-AZ cluster features a primary instance accompanied by two read-only standby instances distributed across different availability zones.

Scroll down to select the PostgreSQL engine. This guide exclusively uses PostgreSQL, and at the time of this writing, the available version is 16.3 R2.

![The image shows a selection screen for database engine options on AWS, including Aurora, MySQL, MariaDB, PostgreSQL, Oracle, Microsoft SQL Server, and IBM Db2. The PostgreSQL option is highlighted, with a description of its features on the right.](https://kodekloud.com/kk-media/image/upload/v1752860071/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/aws-database-engine-selection-postgresql.jpg)

Review the engine version options provided:

![The image shows an AWS RDS console interface for selecting a database engine, with options for Microsoft SQL Server and IBM Db2, and details about PostgreSQL. It includes engine version selection, RDS Extended Support, and template options for production, development, and free tier use cases.](https://kodekloud.com/kk-media/image/upload/v1752860072/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/aws-rds-database-engine-selection.jpg)

Select the production template to ensure a high-availability configuration. In a single-instance deployment, no standby exists; however, in a multi-AZ cluster deployment, you get one primary along with two read replicas across separate availability zones. Remember, a standard multi-AZ deployment’s standby instance is not available for read requests, making a cluster deployment the ideal choice for both high availability and enhanced read capacity.

Provide a name for the database cluster (e.g., "RDS PGTAZ") and set the access credentials. The master username is set as "Postgres" with the password also set as "Postgres" for demonstration purposes.

> [!important]
> **Security Reminder**
>
> For production environments, ensure you use strong, unique passwords and proper credential management practices.

![The image shows an AWS RDS settings page for configuring a PostgreSQL database cluster, including fields for DB cluster identifier, master username, and credentials management options.](https://kodekloud.com/kk-media/image/upload/v1752860074/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/aws-rds-postgresql-settings-page.jpg)

When configuring credentials, the option to manage passwords using AWS Secrets Manager is intentionally left as self-managed to facilitate easier modifications during the demonstration.

Proceed to the instance configuration section. For this demonstration, we select the standard M5D large instance class. Although other classes like M6GD or M6ID are available, using a large instance simplifies the setup. Our storage is configured with provisioned IOPS and an allocation of 100 GB. (Note that provisioned IOPS requires a minimum ratio of 1000 IOPS per storage size.)

![The image shows an AWS RDS configuration screen for setting up a PostgreSQL database, including options for password strength, instance configuration, and storage type.](https://kodekloud.com/kk-media/image/upload/v1752860075/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/aws-rds-postgresql-configuration.jpg)

Select provisioned IOPS to meet performance requirements. This example demonstrates a temporary selection of provisioned IOPS to get the setup up and running quickly.

![The image shows an AWS console interface for configuring a PostgreSQL database instance, including options for DB instance class and storage type selection.](https://kodekloud.com/kk-media/image/upload/v1752860076/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/aws-console-postgresql-database-config.jpg)

Review the storage settings to ensure they meet your application requirements:

![The image shows an AWS console interface for configuring storage settings for a PostgreSQL database, including options for storage type, allocated storage, and provisioned IOPS.](https://kodekloud.com/kk-media/image/upload/v1752860077/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/aws-console-postgresql-storage-settings.jpg)

Next, navigate to the network and security configuration. Choose the default VPC and subnet group, and leave public access disabled unless external exposure is necessary. For security groups, the default configuration is used, though this can be customized or integrated with RDS Proxy if needed.

![The image shows an AWS management console interface for setting up a PostgreSQL database, including options for compute resources, VPC, DB subnet group, public access, and VPC security group.](https://kodekloud.com/kk-media/image/upload/v1752860078/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/aws-postgresql-database-setup.jpg)

In subsequent configuration screens, you can also integrate RDS Proxy, which helps improve failover handling and connection pooling. For this demonstration, proxy configuration is skipped, and the remaining settings such as certificate authority, tags, IAM authentication, Kerberos, and performance insights are maintained at their default values (with performance insights enabled on the free tier for seven days).

![The image shows an AWS RDS configuration screen for setting up a PostgreSQL database, including options for VPC security groups, RDS Proxy, and certificate authority.](https://kodekloud.com/kk-media/image/upload/v1752860079/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/aws-rds-postgresql-configuration-2.jpg)

Additional options for backups, maintenance, and parameter groups are available. In this demonstration, automated backups are set for a seven-day retention period, and the default KMS key is applied.

![The image shows a configuration screen for setting up a PostgreSQL database on Amazon RDS, including options for database parameters and backup settings.](https://kodekloud.com/kk-media/image/upload/v1752860081/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/postgresql-rds-configuration-screen.jpg)

---

## Database Creation, Failover, and Monitoring

After verifying all configuration options, click "Create Database." AWS will begin provisioning the cluster by launching three virtual machines across different availability zones. During this process, you might be presented with additional options such as creating an ElastiCache cluster or integrating with RDS Proxy. For simplicity, these extra options are skipped in this demonstration.

While the cluster is initializing, the primary instance is set up as the writer, and the remaining instances function as readers. The dashboard will display statuses like "active creating" until provisioning completes.

![The image shows an Amazon RDS dashboard displaying a list of PostgreSQL databases with their identifiers, statuses, roles, and regions.](https://kodekloud.com/kk-media/image/upload/v1752860082/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/amazon-rds-postgresql-database-dashboard.jpg)

After the cluster is established and a backup is initiated on the primary instance, you have the option to force a failover. To initiate a failover, select the appropriate option from the "Actions" menu. During a forced failover, connectivity may be interrupted for 3 to 30 seconds. With RDS Proxy integrated, this interruption can be significantly reduced.

During the failover process, note the following:

• The dashboard first continues to display a writer instance.  
• In the cluster details, you'll see separate endpoints for write (writer) and read (reader) operations.

![The image shows an Amazon RDS dashboard displaying a list of PostgreSQL database instances with their statuses, roles, and other details. It also includes sections for managing endpoints and IAM roles.](https://kodekloud.com/kk-media/image/upload/v1752860083/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/amazon-rds-postgresql-dashboard.jpg)

The endpoint configuration is crucial as it enables you to direct application traffic correctly; one endpoint always handles writes, while another serves read-only requests regardless of underlying instance changes. Although IAM authentication is not available in multi-AZ clusters, alternative integrations such as EC2, Lambda, or additional proxy endpoints are still supported.

Monitor performance and logs via the dashboard. During a backup, the failover event might not appear immediately in the logs. However, once the backup completes, the dashboard will reflect the new writer instance.

![The image shows an Amazon RDS dashboard displaying details of a PostgreSQL database cluster named "rds-pg-taz," including its instances, status, and configuration settings.](https://kodekloud.com/kk-media/image/upload/v1752860084/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/amazon-rds-postgresql-dashboard-2.jpg)

Additional details displayed on the dashboard include:

• Performance Insights status and retention details  
• Automated backup configuration  
• Maintenance schedules and other pertinent metadata

![The image shows an Amazon RDS dashboard with details about backups and snapshots, including a snapshot in the process of being created.](https://kodekloud.com/kk-media/image/upload/v1752860085/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/amazon-rds-backups-snapshots-dashboard.jpg)

After the failover, confirm that the writer instance has switched (for example, from instance one to another instance).

![The image shows an Amazon RDS dashboard displaying a PostgreSQL Multi-AZ DB cluster with instances and recent events, including a completed failover.](https://kodekloud.com/kk-media/image/upload/v1752860086/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/amazon-rds-postgresql-multi-az-dashboard.jpg)

---

## Creating a Read Replica

Once the cluster is fully operational and the initial backup process is complete, you can enhance read capacity by creating a read replica. From the "Actions" menu, select "Create read replica" and configure it with similar parameters to the primary instance, including instance size, storage type, and authentication settings. This replication process mirrors credentials and key configurations from the source instance.

Assign a name to your read replica (for example, "RDSPG-reader1"). Since this replication is asynchronous, there may be a brief delay before data written to the writer instance fully propagates to the read replica. You can monitor the replication lag using the dashboard metrics.

![The image shows an Amazon RDS dashboard displaying a list of databases with their identifiers, statuses, roles, engines, regions, and sizes. It includes options for managing databases and a notification about creating a Blue/Green Deployment.](https://kodekloud.com/kk-media/image/upload/v1752860087/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-AWS-RDS-Multi-AZ-Cluster-Deployment-with-Read-Replicas/amazon-rds-dashboard-databases.jpg)

After the read replica is operational, your database configuration will include:

• A distinct writer endpoint for write operations  
• A designated reader endpoint for read operations

This dual-endpoint setup allows your application to seamlessly route read and write traffic while the cluster handles instance failover and load distribution.

Upon completing these steps, you will have a fully functional multi-AZ PostgreSQL cluster with enhanced read performance and improved fault tolerance.

Thank you for following along with our guide on setting up an AWS RDS multi-AZ cluster deployment with read replicas. Explore the robust capabilities of your new database cluster and consider experimenting with advanced features like RDS Proxy and custom endpoint configurations for even greater performance and resilience.

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/5ddcb813-3c90-4575-9cdb-0535d661dcd3)**
>
> Watch video content
