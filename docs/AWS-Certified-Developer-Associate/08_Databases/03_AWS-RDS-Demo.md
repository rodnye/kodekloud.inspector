# AWS RDS Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/AWS-RDS-Demo)

---

## Table of Contents

- AWS RDS Demo
  - Step 1: Launching the AWS RDS Console
  - Step 2: Choosing the Creation Method
  - Step 3: Configuring the Database Engine
  - Step 4: Database Instance Configuration
  - Step 5: Establishing Connectivity
  - Step 6: Additional Configuration Settings
  - Step 7: Creating the Database
  - Step 8: Retrieving Connection Details
  - Step 9: Managing the PostgreSQL Database
  - Step 10: Modifying and Deleting the Database Instance
  - Conclusion
  - Additional Resources
  - Watch Video
  - Practice Lab
    - Instance and Storage Settings
    - Connection Information

---

## Content

AWS Certified Developer - Associate

Databases

# AWS RDS Demo

In this guide, you'll learn how to set up and manage a PostgreSQL database instance using Amazon RDS. AWS RDS takes care of routine database tasks, so you can focus on your application. Follow the steps below to create, configure, connect to, and eventually delete your RDS instance.

## Step 1: Launching the AWS RDS Console

1.  Log in to the AWS Console.
2.  Search for "RDS" and navigate to the Amazon RDS dashboard.
3.  Click **Create database**. This button might appear at the top of the page or in another prominent location.

![The image shows the Amazon RDS dashboard, displaying options to create a database and manage resources like DB instances and clusters. It also includes recommendations and additional information links on the right side.](https://kodekloud.com/kk-media/image/upload/v1752858647/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Demo/amazon-rds-dashboard-database-management.jpg)

## Step 2: Choosing the Creation Method

If you're new to the RDS creation page:

- Click **Create database**.
- You will see two options: **Standard Create** and **Easy Create**.
  - **Easy Create** applies best practices automatically.
  - For this demo, select **Standard Create** to access all configuration settings.

![The image shows an AWS RDS interface for creating a database, offering options for standard or easy creation methods and various engine types like Aurora, MySQL, and Oracle.](https://kodekloud.com/kk-media/image/upload/v1752858649/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Demo/aws-rds-database-creation-interface.jpg)

## Step 3: Configuring the Database Engine

Under **Engine Options**, perform the following:

- Select **PostgreSQL** or your preferred database engine.
- Choose the specific PostgreSQL version (the default version works fine for this demonstration).

Next, choose a template that matches your environment:

- **Production** for high availability.
- **Dev/Test** for development or testing scenarios.
- **Free Tier** if eligible.

For this demo, we will use the **Dev/Test** template.

## Step 4: Database Instance Configuration

Configure your database instance with these details:

- **DB Instance Identifier:** Provide a name (e.g., "my-first-db").
- **Master Username:** The default for PostgreSQL is "postgres."
- **Password:** Enter a secure password or let AWS generate one.

![The image shows a configuration screen for setting up a database instance on AWS, with options for deployment and settings like the DB instance identifier and master username.](https://kodekloud.com/kk-media/image/upload/v1752858651/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Demo/aws-database-instance-configuration.jpg)

### Instance and Storage Settings

Under **Instance Configuration**:

- Select the EC2 instance type. The default suffices for a demo.
- Adjust storage settings:
  - Specify the storage type.
  - Allocate an appropriate amount (e.g., free tier typically requires at least 100 GB).
  - Enable storage autoscaling if desired.

![The image shows a configuration screen for storage settings, including options for storage type, allocated storage, provisioned IOPS, and storage autoscaling. It includes fields for inputting values and informational notes about the settings.](https://kodekloud.com/kk-media/image/upload/v1752858652/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Demo/storage-settings-configuration-screen.jpg)

## Step 5: Establishing Connectivity

Move to the **Connectivity** section and configure the following:

- Select a VPC. If unsure, choose the default VPC.
- Use the default subnet group if applicable.
- For demonstration purposes, enable public access to connect directly from your local machine.
- Create or select a security group; for this demo, create a new security group named "my DB security group."
- Choose the preferred availability zone.

![The image shows a configuration screen for setting up an Amazon RDS database, including options for DB subnet group, public access, and VPC security group selection.](https://kodekloud.com/kk-media/image/upload/v1752858653/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Demo/amazon-rds-database-configuration.jpg)

## Step 6: Additional Configuration Settings

In the **Additional Configuration** section:

- Confirm that the database will use the default PostgreSQL port.
- You can modify authentication methods if needed, but for this demonstration, we'll use the default password authentication.
- Other options such as monitoring, backup configurations, encryption, and RDS Proxy remain at their default values.

![The image shows a configuration screen for setting up an Amazon RDS database, including options for RDS Proxy, certificate authority, database port, and authentication methods.](https://kodekloud.com/kk-media/image/upload/v1752858654/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Demo/amazon-rds-database-configuration-2.jpg)

## Step 7: Creating the Database

Review all settings carefully and click **Create database**. The creation process might take several minutes. When completed, the database status will update and display connectivity information.

![The image shows the Amazon RDS dashboard with a successfully created PostgreSQL database named "my-first-db" that is currently available.](https://kodekloud.com/kk-media/image/upload/v1752858655/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Demo/amazon-rds-postgresql-dashboard-my-first-db.jpg)

## Step 8: Retrieving Connection Details

Select your new database to access its details. You will see the endpoint (acting as a domain name or IP address) and the port number (default PostgreSQL port). These details are vital for connecting your applications to the RDS instance.

![The image shows an Amazon RDS dashboard displaying details of a PostgreSQL database instance, including its endpoint, port, CPU usage, and security settings.](https://kodekloud.com/kk-media/image/upload/v1752858656/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Demo/amazon-rds-postgresql-dashboard.jpg)

### Connection Information

For example, when configuring your application, use the following credentials:

- **Host:** \[Endpoint from RDS\]
- **Port:** \[Port number from RDS\]
- **Username:** postgres
- **Password:** \[Your password\]
- **Database:** postgres (default database)

Here is a sample code snippet using Knex to establish a connection:

```
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "my-first-db.cidipbxuwdg1.us-east-1.rds.amazonaws.com",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "postgres",
  },
});
```

> [!important]
> **Alternative Connection Method**
>
> You can also manage your PostgreSQL database using pgAdmin, a graphical user interface. Simply create a new server connection in pgAdmin using the RDS endpoint and your credentials.

![The image shows the pgAdmin interface, a management tool for PostgreSQL, with options to create a server group or server and links to documentation and support.](https://kodekloud.com/kk-media/image/upload/v1752858657/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Demo/pgadmin-interface-server-group-options.jpg)

After entering the connection details in pgAdmin, save the configuration. Your AWS RDS PostgreSQL instance should now be visible within the pgAdmin interface.

![The image shows a pgAdmin interface with a "Create - Server" dialog open, where connection details for a PostgreSQL database are being configured.](https://kodekloud.com/kk-media/image/upload/v1752858658/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Demo/pgadmin-create-server-dialog.jpg)

## Step 9: Managing the PostgreSQL Database

Once connected, you can manage your PostgreSQL database as if it were locally hosted. For instance, you might create a new database for your application:

- **Database Name:** my-app

If you encounter an SQL integrity error, such as:

```
(sqlite3.IntegrityError) UNIQUE constraint failed: database.id, database.server
[SQL: INSERT INTO "database" (id, schema_res, server) VALUES (?, ?)]
[parameters: (16402, '')]
(Background on this error at: http://sqlalche.me/e/13/gkpj)
```

Adjust your SQL statements or schema definitions accordingly, and then retry the operation.

![The image shows a pgAdmin 4 dashboard displaying server activity and statistics for a PostgreSQL database, including server sessions, transactions per second, and block I/O metrics.](https://kodekloud.com/kk-media/image/upload/v1752858659/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Demo/pgadmin4-postgresql-server-activity.jpg)

> [!important]
> **Tip**
>
> Always verify your SQL schema definitions to avoid UNIQUE constraint errors during data insertion.

## Step 10: Modifying and Deleting the Database Instance

If you need to update configurations later:

- Click **Modify** in the AWS Console to change settings such as the DB engine version, instance identifier, or password management options.

![The image shows an Amazon RDS interface for modifying a database instance named "my-first-db," with settings for DB engine version, instance identifier, and password management options.](https://kodekloud.com/kk-media/image/upload/v1752858660/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Demo/amazon-rds-modify-my-first-db.jpg)

When the database is no longer required:

1.  Click **Delete**.
2.  Choose whether to retain snapshots and backups.
3.  Acknowledge the deletion confirmation to permanently remove the instance.

![The image shows a confirmation dialog for deleting a database instance named "my-first-db," with options to create a final snapshot and retain automated backups. A warning advises taking a final snapshot before deletion.](https://kodekloud.com/kk-media/image/upload/v1752858661/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Demo/delete-database-confirmation-dialog.jpg)

> [!important]
> **Warning**
>
> Deleting your database is irreversible. Ensure you have backups or snapshots if you need to restore your data later.

## Conclusion

You have now successfully set up an AWS RDS PostgreSQL instance, configured connectivity, and connected using tools such as Knex and pgAdmin. Use the connection details to integrate the database with your applications. For continuous updates or modifications, return to the AWS Console and select **Modify**.

Happy coding!

## Additional Resources

- [AWS RDS Documentation](https://aws.amazon.com/rds/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Knex.js Documentation](https://knexjs.org/)

Feel free to explore these resources for more detailed information and best practices when working with AWS RDS and PostgreSQL.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/dbb798b2-1272-4fd7-9384-41e371499a97)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/c10c0f10-c2d5-4117-aa57-6f70ff667ea7)**
>
> Practice lab
