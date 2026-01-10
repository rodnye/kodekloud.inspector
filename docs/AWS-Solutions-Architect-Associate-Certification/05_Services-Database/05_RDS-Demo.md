# RDS Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Database/RDS-Demo)

---

## Table of Contents

- RDS Demo
  - Step 1: Creating a Database
  - Step 2: Connecting to Your Database
  - Step 3: Managing Your RDS Instance
  - Conclusion
  - Additional Resources
  - Watch Video
    - Engine Selection
    - Instance Configuration
    - Connectivity and Security
    - Additional Configuration
    - Method 1: Connecting via Code
    - Method 2: Connecting with pgAdmin
    - Modifying the Instance
    - Deleting the Instance

---

## Content

AWS Solutions Architect Associate Certification

Services Database

# RDS Demo

In this tutorial, you will learn how to deploy a PostgreSQL instance using Amazon RDS. By using RDS, AWS manages the underlying database infrastructure, letting you focus on your application rather than manual database management tasks.

## Step 1: Creating a Database

Begin by accessing the AWS console and searching for RDS. In the RDS dashboard, click on the **Create database** button. Depending on your history with the service, the interface might present the options as a toolbar at the top or bottom, or as a pop-up if it's your first visit. You will be presented with two options:

1.  **Standard Create** – Offers full control over configuration.
2.  **Easy Create** – Automatically applies AWS best practices.

For this demo, choose **Standard Create** to explore all available configuration options.

### Engine Selection

Select the database engine you want to deploy. In this demonstration, we choose **PostgreSQL**, although other engines like Aurora, MySQL, MariaDB, Oracle, and Microsoft SQL Server are available. Once PostgreSQL is selected, you will have an option to choose a version; the default option is generally sufficient.

![The image shows a selection screen for database engine options on AWS, including Aurora, MySQL, MariaDB, PostgreSQL, Oracle, and Microsoft SQL Server. The PostgreSQL option is selected, and there are details about the Aurora MySQL-Compatible Edition on the right.](https://kodekloud.com/kk-media/image/upload/v1752865232/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Demo/aws-database-engine-selection-postgresql.jpg)

Next, choose a template according to your deployment needs:

- **Production:** High availability and resilience.
- **Dev/Test:** Ideal for development and testing environments.
- **Free Tier:** Qualifies for free usage under AWS guidelines.

For this walkthrough, select **Dev/Test**.

### Instance Configuration

Provide a name for your database instance (e.g., "my-first-db") and set the master username (default is "postgres"). You will then enter a password, though you can opt for AWS to generate a secure password automatically.

![The image shows a configuration screen for setting up a database instance on AWS, with options for deployment and settings for the DB instance identifier and credentials.](https://kodekloud.com/kk-media/image/upload/v1752865233/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Demo/aws-database-configuration-screen.jpg)

In the **Instance Configuration** section, select the EC2 instance type on which your database will run. For this demonstration, sticking to the default option is recommended.

Proceed to configure the storage settings where you can specify:

- The type and amount of allocated storage.
- Storage autoscaling (a good cost optimization feature, especially for free tier users).

![The image shows a configuration screen for storage settings, including options for allocated storage, provisioned IOPS, and storage autoscaling. It includes fields for inputting values and informational notes about the settings.](https://kodekloud.com/kk-media/image/upload/v1752865234/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Demo/storage-settings-configuration-screen.jpg)

### Connectivity and Security

Under the **Connectivity** section, you can skip the compute settings if you're not testing connectivity with an external EC2 instance. Select the default VPC and subnet. For production deployments, it's recommended to set "Public access" to No and restrict connectivity to your backend or API. However, for this demo, enable "Public access" so you can connect to the database from your local machine.

Select your VPC and create a new security group (for example, "my DB security group") to control traffic. The availability zone can be selected or left as default if no specific preference is required.

![The image shows a configuration screen for setting up a database instance in a cloud service, with options for IP addressing, VPC selection, and public access settings.](https://kodekloud.com/kk-media/image/upload/v1752865235/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Demo/database-configuration-cloud-service.jpg)

### Additional Configuration

In the additional configuration section, you can modify settings such as:

- The default PostgreSQL port (modifiable if necessary).
- Authentication methods (default is password authentication).
- Monitoring and backup configurations.

For the purposes of this demonstration, it is safe to leave these settings at their defaults. Once you have completed all configuration steps, click **Create database**. The creation process might take a few moments until the status displays as "available".

## Step 2: Connecting to Your Database

After your database instance is running, select it from the AWS console to view connectivity details. The key elements you need are the endpoint (IP/domain name) and the port.

![The image shows an Amazon RDS dashboard with a notification of a successfully created database named "my-first-db." The database is listed with details such as engine type (PostgreSQL), region, and status (available).](https://kodekloud.com/kk-media/image/upload/v1752865237/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Demo/amazon-rds-dashboard-my-first-db.jpg)

The connection string typically includes the following information:

- **Host:** The database endpoint.
- **Port:** Default PostgreSQL port, usually 5432.
- **User:** The master username (e.g., "postgres").
- **Password:** The password you configured.
- **Database:** The default database, typically named “postgres.”

Below are two common methods to connect to your PostgreSQL instance.

### Method 1: Connecting via Code

The following JavaScript snippet uses the Knex query builder to connect to the PostgreSQL instance:

```
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "my-first-db.cidipbxuwdgl.us-east-1.rds.amazonaws.com",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "postgres",
  },
});
```

### Method 2: Connecting with pgAdmin

pgAdmin is a widely used GUI tool for managing PostgreSQL databases. Follow these steps to connect:

1.  Open pgAdmin and create a new server.
2.  In the **Create - Server** dialog:
    - Enter a name (e.g., "AWS - RDS").
    - Provide the server connection details including the host (the endpoint copied from AWS), port, username, and password.
3.  Save the configuration.

![The image shows a pgAdmin interface with a "Create - Server" dialog open, displaying fields for server connection details such as host name, port, and username.](https://kodekloud.com/kk-media/image/upload/v1752865238/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Demo/pgadmin-create-server-dialog.jpg)

After saving, you will see the default PostgreSQL database in pgAdmin. You can create additional databases as needed for your application. For example, you might create a new database called "my_app". In case of an error, it may appear similar to the following:

```
(sqlite3.IntegrityError) UNIQUE constraint failed: database.id, database.server
[SQL: INSERT INTO "database" (id, schema_res, server) VALUES (?, ?, ?)]
[parameters: (16402, None, 1)]
(Background on this error at: http://sqlalche.me/e/13/gkpj)
```

Resolve any errors accordingly and verify that your new database is visible in the pgAdmin interface.

![The image shows a database management interface with a sidebar listing servers and databases, and a main panel displaying various database statistics and activity logs.](https://kodekloud.com/kk-media/image/upload/v1752865240/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Demo/database-management-interface-sidebar.jpg)

## Step 3: Managing Your RDS Instance

Once connected, you can manage your RDS instance through the AWS console.

### Modifying the Instance

If you need to update any configurations (such as engine version, instance type, or security settings), select the instance and click **Modify**. This option allows you to adjust various settings for your running PostgreSQL instance.

![The image shows an Amazon RDS dashboard for a database named "my-first-db," displaying its summary, connectivity, and security details. It includes information such as the database identifier, status, engine type, and endpoint details.](https://kodekloud.com/kk-media/image/upload/v1752865241/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Demo/amazon-rds-dashboard-my-first-db-2.jpg)

### Deleting the Instance

When you are ready to remove the database instance, select it and click **Delete**. AWS will prompt you to confirm the deletion and ask if you wish to retain snapshots and automated backups.

> [!important]
> **Warning**
>
> Deleting your database instance will result in data loss if snapshots or backups are not retained. Proceed with caution.

![The image shows a confirmation dialog for deleting a database instance named "my-first-db." It includes options for creating a final snapshot, retaining automated backups, and a warning about data loss.](https://kodekloud.com/kk-media/image/upload/v1752865242/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Demo/delete-database-confirmation-dialog.jpg)

After confirming, the database instance will be deleted, concluding the demonstration process.

![The image shows an Amazon RDS dashboard where a user is modifying a database instance named "my-first-db." It includes settings for the DB engine version, instance identifier, and password management options.](https://kodekloud.com/kk-media/image/upload/v1752865243/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Demo/amazon-rds-dashboard-my-first-db-3.jpg)

## Conclusion

You have now successfully deployed, connected to, and managed a PostgreSQL database using Amazon RDS. This hands-on demonstration showcased how to configure your instance and perform key operations such as connecting via code and pgAdmin, modifying settings, and safely deleting the instance.

Happy coding!

---

## Additional Resources

| Resource Type | Details                                                                            | Link                                                 |
| ------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------- |
| AWS RDS       | Amazon Relational Database Service documentation for further configuration details | [AWS RDS Documentation](https://aws.amazon.com/rds/) |
| PostgreSQL    | Official PostgreSQL documentation for advanced database features                   | [PostgreSQL Docs](https://www.postgresql.org/docs/)  |
| Knex.js       | Learn more about the Knex query builder for Node.js                                | [Knex.js Documentation](http://knexjs.org/)          |

> [!important]
> **Note**
>
> For further insights into AWS and PostgreSQL best practices, refer to the resource links provided above.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/9fb73cb5-caf2-4dc2-ad5c-fe5fe69507e3/lesson/db3e7619-10f1-41f3-8ee2-7dda8c05fcff)**
>
> Watch video content
