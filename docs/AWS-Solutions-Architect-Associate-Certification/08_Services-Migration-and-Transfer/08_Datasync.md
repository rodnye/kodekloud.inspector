# Datasync - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Migration-and-Transfer/Datasync)

---

## Table of Contents

- Datasync
  - Core Components of AWS DataSync
  - Task and Task Execution States
  - AWS DataSync Discovery
  - Key Features of AWS DataSync
  - Common Use Cases for AWS DataSync
  - Watch Video
    - Task States
    - Task Execution States

---

## Content

AWS Solutions Architect Associate Certification

Services Migration and Transfer

# Datasync

In this article, we explore AWS DataSync—a powerful service engineered to facilitate rapid and secure data transfers between on-premises storage and AWS storage services. DataSync simplifies, automates, and accelerates the migration of large datasets by streamlining the transfer process to and from AWS.

## Core Components of AWS DataSync

AWS DataSync comprises four essential components that work together to ensure efficient data migration:

1.  **Agent**  
    The DataSync agent is a virtual machine appliance responsible for reading from and writing to storage during transfers. It can be deployed on various platforms such as VMware, KVM, or Microsoft Hyper-V.
2.  **Location**  
    A location represents either the data source or destination. Every DataSync transfer involves two locations—for example, a source location in an on-premises environment and a destination location like an AWS S3 bucket or another AWS storage service.
3.  **Task**  
    A task defines a DataSync transfer, specifying both the source and destination locations. It also outlines detailed instructions on how data should be copied, including how metadata, deleted files, and permissions are managed.
4.  **Task Execution**  
    Task execution is the practical run of a task blueprint. Multiple executions can occur over time, each reflecting different transfer phases and statuses.

Below is a diagram that illustrates the four key steps of DataSync:

![The image is a diagram titled "DataSync" showing four steps: Agent, Location, Task, and Task Execution, with icons and descriptions for each step.](https://kodekloud.com/kk-media/image/upload/v1752865428/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Datasync/datasync-four-steps-diagram.jpg)

## Task and Task Execution States

Both tasks and their executions progress through specific states during the lifecycle of a transfer.

### Task States

- **Available:**  
  The task is ready to initiate data transfer.
- **Running:**  
  Data transfer is in progress.
- **Unavailable:**  
  The DataSync agent is currently offline.
- **Queued:**  
  Another task using the same agent is running. DataSync processes tasks sequentially, so an agent cannot execute more than one task at a time.

### Task Execution States

- **Queued:**  
  The execution is in line, waiting for the agent if another task is active.
- **Launching:**  
  The initialization phase begins when the agent becomes available and no queuing is required.
- **Preparing:**  
  DataSync identifies which files need to be transferred. The duration of this phase depends on the file count and the performance of both the source and destination systems.
- **Transferring:**  
  The selected data is actively transferred. Real-time updates for the number of bytes and files transferred are visible.
- **Verifying:**  
  If configured, DataSync performs a data integrity check. A successful verification results in a "success" status; otherwise, an "error" state is displayed.

The chart below illustrates the status icons and states for tasks and their executions:

![The image shows a "Task and Execution Status" chart with four status icons: Available, Running, Unavailable, and Queued. Each status is represented by a different colored circle with an icon inside.](https://kodekloud.com/kk-media/image/upload/v1752865429/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Datasync/task-execution-status-chart-icons.jpg)

The following flow diagram visually represents the stages of task execution:

![The image shows a task and execution status flow with five stages: Queued, Launching, Preparing, Transferring, and Verifying, each represented by a colored icon.](https://kodekloud.com/kk-media/image/upload/v1752865430/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Datasync/task-execution-status-flow-diagram.jpg)

## AWS DataSync Discovery

Similar to many AWS migration services, AWS DataSync offers a discovery process that provides critical insights before initiating data transfers.

- The DataSync agent connects to your on-premises storage and initiates a discovery job to gather system information.
- The agent sends the collected data to DataSync Discovery via a public service endpoint.
- Based on the gathered information, DataSync Discovery recommends the optimal AWS storage services for your data migration.

The flowchart below outlines the DataSync Discovery process:

![The image is a flowchart illustrating the DataSync Discovery process, showing the connection between On-Premises Storage, DataSync Agent, DataSync Discovery, and Recommendations.](https://kodekloud.com/kk-media/image/upload/v1752865431/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Datasync/datasync-discovery-flowchart.jpg)

## Key Features of AWS DataSync

DataSync is equipped with a range of features designed to ensure efficient and secure data transfers:

- **High-Speed Data Transfer:**  
  Optimized for moving large volumes of data rapidly.
- **Simplified User Interface:**  
  User-friendly management of tasks via an intuitive UI.
- **Data Integrity Checks:**  
  Ensures accurate and complete data transfers.
- **Automation and Scheduling:**  
  Enables frequent, automated data transfers without manual intervention.
- **Multi-Protocol Support:**  
  Compatible with NFS, SMB, and S3 protocols.
- **Incremental Transfers:**  
  Transfers only the updated or changed files to reduce redundancy.
- **Security and Encryption:**  
  Data is encrypted during transit and at rest for maximum security.
- **Monitoring and Logging:**  
  Provides real-time transfer progress tracking, comprehensive history logs, and detailed analysis for troubleshooting.

The diagram below highlights these robust features:

![The image lists features of DataSync, including high-speed data transfer, simple management, data integrity and verification, automation and scheduling, support for multiple protocols, incremental transfers, and security and encryption.](https://kodekloud.com/kk-media/image/upload/v1752865432/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Datasync/datasync-features-high-speed-transfer.jpg)

## Common Use Cases for AWS DataSync

AWS DataSync supports a wide variety of use cases, including:

1.  **On-Premises to AWS Storage Transfers:**  
    Migrate data from your on-premises storage systems to AWS services such as Amazon EFS, S3, or FSx.

    ![The image illustrates the process of transferring on-premises storage to AWS using DataSync, showing connections to various AWS storage services like Amazon EFS, S3, and FSx.](https://kodekloud.com/kk-media/image/upload/v1752865434/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Datasync/aws-datasync-storage-transfer-diagram.jpg)

2.  **AWS Region-to-Region Synchronization:**  
    Synchronize data between AWS regions to support data redundancy, disaster recovery, or regional migrations. This ensures optimal performance and availability while relocating data between regions.

    ![The image illustrates data synchronization between AWS regions using DataSync Discovery, showing various AWS storage services like Amazon EFS, S3, and FSx file systems. It highlights the use of TLS for secure data transfer.](https://kodekloud.com/kk-media/image/upload/v1752865435/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Datasync/aws-datasync-data-synchronization-diagram.jpg)

3.  **Third-Party Cloud Migrations:**  
    Seamlessly migrate data from other cloud providers such as Microsoft Azure or Google Cloud Platform (GCP) to AWS.

    ![The image illustrates a data transfer process from other cloud storage to AWS using DataSync, showing connections between on-premises storage and various AWS storage services like Amazon EFS, S3, and FSx.](https://kodekloud.com/kk-media/image/upload/v1752865437/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Datasync/data-transfer-aws-datasync-diagram.jpg)

> [!important]
> **Note**
>
> AWS DataSync not only transfers files and objects securely but also supports data replication to AWS storage services. This ensures enhanced data protection, backup capabilities, and the opportunity to archive less frequently accessed data to cost-effective storage like Amazon S3 Glacier.

By leveraging AWS DataSync, organizations can reduce on-premises storage costs and streamline data migrations while maintaining high levels of security and efficiency. DataSync integrates seamlessly with various AWS services, making it an ideal solution for a diverse range of data migration and synchronization projects.

For further reading on AWS services and best practices, check out the following resources:

- [AWS Documentation](https://aws.amazon.com/documentation/)
- [Amazon S3](https://aws.amazon.com/s3/)
- [AWS Storage Gateway](https://aws.amazon.com/storagegateway/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/4fd27446-288a-44dc-a3f3-99e943f92fe2/lesson/223355f0-379c-4619-9b46-77392f3e9bcf)**
>
> Watch video content
