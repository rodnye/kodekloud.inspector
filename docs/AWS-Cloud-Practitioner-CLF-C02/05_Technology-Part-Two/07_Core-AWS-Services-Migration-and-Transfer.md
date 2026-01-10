# Core AWS Services Migration and Transfer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-Two/Core-AWS-Services-Migration-and-Transfer)

---

## Table of Contents

- Core AWS Services Migration and Transfer
  - Cloud Adoption Framework and Migration Hub
  - Migration Strategies
  - Detailed Migration Strategies
  - Offline Data Transfer with the Snow Family
  - Online Data Transfer with the Transfer Family and DataSync
  - Application, Database, and Data Center Migration Services
  - Migration Services Summary
  - Watch Video
    - Rehosting
    - Replatforming
    - Refactoring/Re-architecting
    - Repurchasing
    - Retaining and Retiring

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part Two

# Core AWS Services Migration and Transfer

In this article, we explore the migration and transfer strategies for core AWS services. This comprehensive guide covers key concepts and services offered by AWS to help you efficiently migrate your infrastructure to the cloud.

We begin by discussing the AWS Cloud Adoption Framework and the Migration Hub. The Cloud Adoption Framework is a valuable resource for understanding business, people, governance, platform, security, and operations concerns during cloud adoption. Meanwhile, the Migration Hub provides a central location to track all ongoing migrations across various AWS services, making it an indispensable tool for your cloud journey. Although the Cloud Adoption Framework was first introduced in version 0.1 of the exam, its principles remain relevant to the AWS Cloud Practitioner exam.

Next, we review common migration strategies for moving on-premises workloads to the AWS cloud. Organizations typically consider six primary methods (with some sources mentioning a seventh) when planning a migration. We also examine the Snow Family of devices, which are ideal for offline data transfers, and the Transfer Family, which supports secure online transfers using protocols such as SFTP and AS2. Finally, we introduce the various migration and discovery services available on AWS.

![The image outlines an overview of AWS migration and transfer services, including cloud adoption, migration strategies, Snow and Transfer Families, and various migration services.](https://kodekloud.com/kk-media/image/upload/v1752862317/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_90.jpg)

---

## Cloud Adoption Framework and Migration Hub

The AWS Cloud Adoption Framework helps organizations evaluate questions concerning business goals, personnel, governance models, platform solutions, security measures, and operational processes. It serves as a blueprint for aligning your cloud strategy with organizational priorities.

![The image outlines the AWS Cloud Adoption Framework, highlighting six areas: Business, People, Governance, Platform, Security, and Operations.](https://kodekloud.com/kk-media/image/upload/v1752862319/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_110.jpg)

> [!important]
> **Note**
>
> When planning your migration, consider using the AWS Migration Hub. It centralizes migration status across applications, databases, and entire data centers, providing a unified view even when using services like the Application Migration Service or the Database Migration Service.

![The image illustrates AWS Migration Hub, highlighting its role in centralizing and visualizing migrations of applications, databases, and servers via AWS services.](https://kodekloud.com/kk-media/image/upload/v1752862320/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_180.jpg)

---

## Migration Strategies

AWS and industry experts recognize six (sometimes seven) migration strategies. Selecting the right strategy depends on factors such as time, cost, effort, and existing licensing. Below is an overview of each method:

1.  **Rehosting (Lift and Shift):**  
    Move your existing server, database, and application to AWS without significant modifications. This is the fastest approach but may offer limited long-term benefits.
2.  **Replatforming (Lift, Tinker, and Shift):**  
    Execute minor improvements—such as updating to a modern operating system or migrating to a managed service—while preserving the core structure of your application.
3.  **Refactoring (Re-architecting):**  
    Redesign your application architecture to take full advantage of AWS services. Although it requires more time and investment, this approach optimizes performance and scalability in the cloud.
4.  **Repurchasing:**  
    Replace your current solution with a cloud-based equivalent. An example is transitioning from an on-premises version of Microsoft SQL Server to its AWS-certified counterpart.
5.  **Retaining:**  
    Maintain the existing on-premises infrastructure until a future decommissioning plan is in place. This strategy is used when immediate migration is not feasible.
6.  **Retiring:**  
    Decommission systems or applications that are no longer required, effectively phasing out legacy resources.

![The image discusses AWS migration strategies, highlighting six methods influenced by business needs, time, money, and effort, with icons representing these factors.](https://kodekloud.com/kk-media/image/upload/v1752862320/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_220.jpg)

---

## Detailed Migration Strategies

### Rehosting

Rehosting, commonly known as "lift and shift," transfers an existing server to AWS without modifying the application, database, or operating system. This straightforward method is quick but may not fully leverage cloud benefits.

### Replatforming

Replatforming involves minor improvements, such as updating the operating system or migrating to managed services, all while keeping the underlying application largely unchanged. This strategy is often described as "lift, tinker and shift."

![The image illustrates a migration strategy called "Replatforming" involving a transition from a traditional server to AWS, labeled as "Lift, Tinker, and Shift."](https://kodekloud.com/kk-media/image/upload/v1752862321/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_280.jpg)

### Refactoring/Re-architecting

Refactoring is the most transformative approach, entailing a complete redesign of the application architecture to integrate seamlessly with AWS services. Although it demands more effort and time, it results in an optimized, scalable, and resilient cloud-native application.

![The image illustrates migration strategies, specifically refactoring or rearchitecting, showing a transition from a traditional server to AWS.](https://kodekloud.com/kk-media/image/upload/v1752862323/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_320.jpg)

### Repurchasing

Repurchasing involves obtaining a cloud-based version of your current solution. For example, moving from an on-premises Microsoft SQL Server to an AWS-licensed version can simplify management and licensing while migrating to the cloud.

![The image illustrates a migration strategy focused on repurchasing, comparing traditional servers with AWS cloud services.](https://kodekloud.com/kk-media/image/upload/v1752862324/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_360.jpg)

### Retaining and Retiring

The retaining strategy involves deferring the migration by keeping your current on-premises infrastructure until it reaches the end of its lifecycle. Conversely, retiring focuses on decommissioning systems that are obsolete, thereby streamlining your environment.

---

## Offline Data Transfer with the Snow Family

When network constraints hinder large-scale data migrations, AWS offers a range of physical data transfer devices known as the Snow Family. These devices come in various sizes to meet different data transfer needs:

- **Snowcone:**  
  A compact, shoebox-sized device ideal for Internet of Things (IoT) deployments.
- **Snowball Edge (Storage Optimized and Compute Optimized):**  
  Suitcase-sized devices capable of handling between 73 terabytes and 80 terabytes of usable data. One version is optimized for storage while the other is designed for compute-intensive tasks.
- **Snowmobile:**  
  A truck-sized solution engineered for petabyte-scale (up to 100 petabytes) data transfers, suitable for extremely large data migrations.

All Snow Family devices offer onboard computing, end-to-end tracking (including GPS), robust management and monitoring capabilities, encryption, secure data erasure, network connectivity, and tamper-evident security.

![The image illustrates AWS offline data migration services, showing different device sizes (small, medium, large) for transferring data to AWS.](https://kodekloud.com/kk-media/image/upload/v1752862325/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_450.jpg)

![The image describes AWS data transfer services: Snowcone, Snowball Edge Storage Optimized, Snowball Edge Compute Optimized, and Snowmobile, highlighting their compute and data transfer capabilities.](https://kodekloud.com/kk-media/image/upload/v1752862326/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_520.jpg)

---

## Online Data Transfer with the Transfer Family and DataSync

For scenarios where online data transfer is required, AWS provides the Transfer Family, which supports multiple protocols including FTP, FTPS, SFTP, and AS2 for secure transfers directly into Amazon S3 or Amazon EFS. AS2, in particular, facilitates the secure sending and receiving of messages, with CloudWatch integration for monitoring.

![Diagram of AWS Transfer Family supporting FTP, SFTP, FTPS, and AS2 for secure transfers to S3 or EFS, with connected devices.](https://kodekloud.com/kk-media/image/upload/v1752862328/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_650.jpg)

![The image illustrates AWS Transfer Family for AS2, showing message transfer using AWS S3 and CloudWatch as backend services.](https://kodekloud.com/kk-media/image/upload/v1752862330/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_680.jpg)

Another effective online data transfer option is AWS DataSync, designed to securely automate and accelerate data transfers between on-premises storage and AWS services such as S3, EFS, or FSx. DataSync is compatible with various file system protocols, including NFS, Samba, and SMB.

![The image illustrates AWS DataSync, a service for automating and accelerating data transfer between on-premises data centers and AWS storage services.](https://kodekloud.com/kk-media/image/upload/v1752862331/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_700.jpg)

---

## Application, Database, and Data Center Migration Services

AWS offers a suite of specialized services to address migration needs for applications, databases, and entire data centers. These tools help streamline the migration process:

1.  **Application Discovery Service:**  
    Gathers comprehensive data about your applications, providing critical insights for planning your migration strategy.

    ![The image illustrates AWS Services for Migration, focusing on the Application Discovery Service, with icons representing traditional datacenters and AWS.](https://kodekloud.com/kk-media/image/upload/v1752862333/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_770.jpg)

2.  **Application Migration Service:**  
    Facilitates the actual migration of applications from traditional data centers to AWS, often incorporating modernization strategies.

    ![Diagram illustrating AWS Application Migration Service, showing migration from a traditional datacenter to AWS, labeled "Move and Improve."](https://kodekloud.com/kk-media/image/upload/v1752862334/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_790.jpg)

3.  **Database Migration Service:**  
    Supports both one-time migrations and continuous database replication from on-premises databases to AWS, adaptable to various migration scenarios including warm standby and cutover migrations.
4.  **Elastic Disaster Recovery (formerly CloudEndure):**  
    Provides automated, block-by-block replication of entire workloads, enabling a smooth cutover to live EC2 instances during disaster recovery or full data center migrations.
5.  **Mainframe Modernization:**  
    Assists organizations in transforming legacy mainframe environments and migrating mainframe components into modern AWS architectures.

---

## Migration Services Summary

Effective migration is underpinned by careful planning and the strategic use of AWS services. Here are the key points to remember:

- Utilize the AWS Cloud Adoption Framework to inform your cloud strategy.
- Leverage the AWS Migration Hub for a centralized view of all migration projects.
- For offline data transfers, consider using Snow Family devices, such as Snowcone, Snowball Edge, and Snowmobile.
- Take advantage of the Transfer Family for secure online transfers using protocols like FTP, FTPS, SFTP, and AS2.
- Automate large-scale file transfers with AWS DataSync.
- Employ dedicated services for application, database, and data center migrations.
- Transition legacy mainframe systems with AWS Mainframe Modernization.

![The image summarizes AWS migration services, highlighting planning, centralized tools, data transfer options, supported protocols, application discovery, and mainframe modernization.](https://kodekloud.com/kk-media/image/upload/v1752862335/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Migration-and-Transfer/frame_980.jpg)

That concludes our discussion on core AWS migration and transfer services. We hope this guide helps streamline your migration strategy and provides valuable insights into optimizing your cloud journey. Stay tuned for more lessons on AWS technologies!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/f47a1e6e-5593-4fac-bc8b-f24ef6e6f418/lesson/e0176d6a-3dd5-4a22-b70e-2bc8250dfe9c)**
>
> Watch video content
