# Demo Setting up Secrets Manager with RDS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Demo-Setting-up-Secrets-Manager-with-RDS)

---

## Table of Contents

- Demo Setting up Secrets Manager with RDS
  - Modifying an RDS Cluster
  - Updating a Single Database Instance
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Demo Setting up Secrets Manager with RDS

Welcome to this lesson on integrating AWS Secrets Manager with your RDS instances or clusters. AWS provides streamlined integration between these services, making it simple to securely manage your database credentials.

## Modifying an RDS Cluster

Begin by navigating to the AWS RDS console. Select an RDS cluster from your list and click on it. Then, click the **Modify** button to start the configuration process.

![The image shows an Amazon RDS dashboard displaying a list of databases, their statuses, roles, engines, and regions. The databases are part of a PostgreSQL Multi-AZ DB cluster, with instances marked as available.](https://kodekloud.com/kk-media/image/upload/v1752860458/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Secrets-Manager-with-RDS/amazon-rds-postgresql-dashboard.jpg)

On the modification screen, locate the "Credentials Manager" (or similar) option. By default, the setting is "self-manage." Change it to "Manage in Secrets Manager." You can leave the default encryption key and instance size unchanged. Once your selections are complete, scroll down and click **Continue**. The console will display a summary of upcoming changes and prompt you to decide whether these changes should be applied during the maintenance window or immediately. For this demo, the changes are applied immediately.

![The image shows an AWS management console screen for configuring a PostgreSQL database cluster, including options for credentials management and encryption key selection.](https://kodekloud.com/kk-media/image/upload/v1752860459/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Secrets-Manager-with-RDS/aws-postgresql-database-configuration.jpg)

Review the summary carefully, then click **Modify Cluster**. The system will process the changes, providing a confirmation message once the modifications are successfully applied.

![The image shows an AWS interface for modifying a database cluster, with options to manage master credentials and apply changes immediately.](https://kodekloud.com/kk-media/image/upload/v1752860461/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Secrets-Manager-with-RDS/aws-database-cluster-modification.jpg)

Next, verify that the integration with Secrets Manager is active. Go to the **Configuration** tab within your RDS cluster details page, and look for an entry indicating that Secrets Manager is now being used for credential management.

> [!important]
> **Tip**
>
> For further confirmation, navigate directly to Secrets Manager. You should see a secret associated with your RDS cluster, clearly identifiable by the cluster name.

![The image shows the AWS Secrets Manager interface with a list of secrets, including a secret associated with an RDS DB cluster. The secret's name, description, and other details are displayed.](https://kodekloud.com/kk-media/image/upload/v1752860462/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Secrets-Manager-with-RDS/aws-secrets-manager-rds-secret.jpg)

Return to the RDS console and review the database details to ensure that the master credentials are being reset as part of the integration process.

## Updating a Single Database Instance

The process for integrating Secrets Manager with a single database instance is similar. Select the individual database instance in the RDS console and click **Modify**. In the options presented, switch the credentials management setting to Secrets Manager without altering other settings. Scroll down and click **Continue** to apply the changes immediately.

![The image shows an AWS RDS interface for modifying a database instance named "rds-pg-taz-reader1," with options to manage master credentials and schedule modifications. The user is selecting to apply changes immediately.](https://kodekloud.com/kk-media/image/upload/v1752860463/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Secrets-Manager-with-RDS/aws-rds-modify-database-instance.jpg)

After the modification is complete, verify that Secrets Manager integration is enabled by checking the **Configuration** tab. You can also follow the link to Secrets Manager from the instance details view.

![The image shows an Amazon RDS dashboard displaying details of a database instance, including its configuration, storage, and availability settings.](https://kodekloud.com/kk-media/image/upload/v1752860465/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Secrets-Manager-with-RDS/amazon-rds-dashboard-database-instance.jpg)

Keep in mind that because the secret was generated by RDS, its value can only be updated indirectly through RDS. Nevertheless, you can manage additional features such as secret rotation, version management, and cross-region replication from within Secrets Manager.

![The image shows an AWS Secrets Manager interface displaying details of a secret related to an Amazon RDS database cluster, including the encryption key, secret name, and secret ARN.](https://kodekloud.com/kk-media/image/upload/v1752860466/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Secrets-Manager-with-RDS/aws-secrets-manager-rds-secret-details.jpg)

> [!important]
> **Key Information**
>
> By reviewing the **Configuration** section in the RDS console, you can confirm that your instance or cluster is actively using Secrets Manager. Options for immediate rotation and further secret management should now be readily available.

## Conclusion

Enabling Secrets Manager integration with your RDS instance or cluster is straightforward. Simply modify your instance or cluster settings, change the credentials management option to Secrets Manager, and apply the changes. AWS seamlessly handles the credential resetting and secret linkage, ensuring your database credentials remain secure without extra manual intervention.

Thank you for reading this article. For more detailed information, consider exploring the following resources:

- [AWS RDS Documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)
- [AWS Secrets Manager Documentation](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/3052e1e1-0925-42cb-ab9b-1c18c0c1f292)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/4268f6e9-65ec-4280-91ca-c7396f283e3d)**
>
> Practice lab
