# Demo Implementing Fault Tolerant Storage using EFS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Demo-Implementing-Fault-Tolerant-Storage-using-EFS)

---

## Table of Contents

- Demo Implementing Fault Tolerant Storage using EFS
  - EFS Configuration Overview
  - File System Policy and Mount Configuration
  - Mounting the File System
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Demo Implementing Fault Tolerant Storage using EFS

Hello, students! I'm Michael Forrester, and in this article, we'll walk through the implementation of fault-tolerant storage using Amazon Elastic File System (EFS) on AWS. This guide covers the EFS configuration, policy settings, and mounting procedures, ensuring you achieve a robust AWS storage setup.

Amazon EFS is a cloud-native, NFS-based network file system that has long served Unix and Linux environments as a reliable file-sharing solution.

![The image shows the Amazon Elastic File System (EFS) webpage, highlighting its features as a scalable, elastic, cloud-native NFS file system. It includes options to create a file system and provides information about pricing and documentation.](https://kodekloud.com/kk-media/image/upload/v1752860042/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Implementing-Fault-Tolerant-Storage-using-EFS/amazon-efs-webpage-features.jpg)

In this demo, we will create an NFS file system within your default VPC, configure it with customized settings, and then mount it for use.

![The image shows a dialog box for creating an Amazon Elastic File System (EFS) on AWS, where a user is entering a name and selecting a Virtual Private Cloud (VPC).](https://kodekloud.com/kk-media/image/upload/v1752860043/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Implementing-Fault-Tolerant-Storage-using-EFS/amazon-efs-dialog-box-vpc.jpg)

## EFS Configuration Overview

Amazon EFS is designed for multi-AZ deployments, meaning it mounts directly within Linux systems and performs like a traditional file system rather than an object storage. Its intuitive setup supports features such as automated backups and lifecycle management. These options allow you to transition to Infrequent Access or archival modes, offering cost savings without compromising performance. Moreover, EFS provides encryption at rest with configurable options to suit your security needs.

There are two primary performance modes to consider:

- **Bursting:** Begins with a lower baseline performance but is capable of bursting to higher throughput levels as file system capacity increases.
- **Enhanced/Elastic/Provisioned:** Delivers a broader array of performance configurations tailored for workloads that demand steady throughput or low latency. For production environments that require predictability, enhanced modes are typically preferred over bursting.

![The image shows a section of the Amazon EFS console, specifically the "Performance settings" for configuring throughput mode options such as Enhanced, Bursting, Elastic, and Provisioned.](https://kodekloud.com/kk-media/image/upload/v1752860044/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Implementing-Fault-Tolerant-Storage-using-EFS/amazon-efs-performance-settings-throughput.jpg)

Clicking "Learn More" in the console provides detailed diagrams that illustrate the differences between these throughput modes. For example, bursting throughput scales with storage size; when limits are reached, switching to Elastic or Provisioned modes may be necessary for enhanced performance.

![The image shows a webpage from the AWS documentation about Amazon Elastic File System (EFS) throughput modes, detailing options like Elastic, Provisioned, and Bursting throughput. The highlighted section discusses using Bursting throughput for scaling with storage amount.](https://kodekloud.com/kk-media/image/upload/v1752860046/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Implementing-Fault-Tolerant-Storage-using-EFS/aws-efs-throughput-modes-diagram.jpg)

In production systems with a need for predictable performance, configuring an enhanced throughput mode is common. You can set parameters such as a maximum burst limit (e.g., 1000 or 2000) that controls temporary throughput spikes.

![The image shows a screenshot of the AWS console, specifically the performance settings for Amazon EFS (Elastic File System). It displays options for selecting throughput modes, including Enhanced, Elastic, and Provisioned, with specific configurations for Provisioned Throughput.](https://kodekloud.com/kk-media/image/upload/v1752860047/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Implementing-Fault-Tolerant-Storage-using-EFS/aws-console-efs-performance-settings.jpg)

> [!important]
> **Note**
>
> For highly parallel workloads requiring strict latency control, consider using the "max I/O" option instead of the general-purpose mode. However, for most cases, the general-purpose mode suffices.

## File System Policy and Mount Configuration

During the configuration process, you are prompted to specify where the NFS mount will be available. For instance, in the Virginia (us-east-1) region, you have the flexibility to customize the Availability Zones to be used.

The AWS console automatically applies security groups to each mount target. At this stage, you can choose to enforce a file system policy that restricts actions such as read-only access, encryption, or root-level access. Below is an example of a policy that enforces secure transport and restricts client root access:

```
{
  "Version": "2012-10-17",
  "Id": "efs-policy-wizard-17be2660-d1c4-4852-8d5f-9351d3b3a686",
  "Statement": [
    {
      "Sid": "efs-statement-e1f8a005-41c3-43a3-bda2-8af2917abd05",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "elasticfilesystem:ClientRootAccess",
        "elasticfilesystem:ClientWrite",
        "elasticfilesystem:ClientMount"
      ],
      "Condition": {
        "Bool": {
          "elasticfilesystem:AccessedViaMountTarget": "true"
        }
      }
    },
    {
      "Sid": "efs-statement-75a20489-76aa-40e4-866d-1bcf3a57ebf",
      "Effect": "Deny",
      "Principal": "*",
      "Action": [
        "elasticfilesystem:ClientRootAccess"
      ],
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}
```

This policy ensures that secure transport is required and prevents unauthorized root access.

If you prefer to allow root-level access or adjust the permissions further, you might modify the policy. For example, here’s an alternative policy that removes the explicit prevention of root access:

```
{
  "Version": "2012-10-17",
  "Id": "efs-policy-wizard-c5EdFace-f6cb-4ca5-b60c-8eee4a4dcd584",
  "Statement": [
    {
      "Sid": "efs-statement-68fac70e-6dc6-4eef-a905-b6c65c652aed",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "elasticfilesystem:ClientWrite",
        "elasticfilesystem:ClientMount"
      ],
      "Condition": {
        "Bool": {
          "elasticfilesystem:AccessedViaMountTarget": "true"
        }
      }
    },
    {
      "Sid": "efs-statement-408e4f0e-4310-48f4-8cefdbf281a",
      "Effect": "Deny",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "elasticfilesystem:ClientWrite",
        "elasticfilesystem:ClientMount"
      ],
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}
```

Another variation might include additional permissions or specify principals differently:

```
{
  "Version": "2012-10-17",
  "Id": "efs-policy-wizard-310ff967-b8fc-4b11-afb8-d54bd573735c",
  "Statement": [
    {
      "Sid": "efs-statement-93f15522-ba22-4a5b-ba57-5b26ee2fe2f1",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "elasticfilesystem:ClientWrite",
        "elasticfilesystem:ClientMount"
      ],
      "Condition": {
        "Bool": {
          "elasticfilesystem:AccessedViaMountTarget": "true"
        }
      }
    },
    {
      "Sid": "efs-statement-01bde648-ab2c-48dc-908e-5a47dfcc4cdc",
      "Effect": "Deny",
      "Principal": {
        "AWS": "*"
      },
      "Action": "*",
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}
```

After finalizing your file system policies, review all configurations—including mount targets, security groups, and policies—before clicking the Create button.

![The image shows an AWS console screen displaying the configuration details of a file system, including fields like name, performance mode, throughput mode, encryption, and lifecycle management.](https://kodekloud.com/kk-media/image/upload/v1752860048/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Implementing-Fault-Tolerant-Storage-using-EFS/aws-console-file-system-configuration.jpg)

Once created, the file system ID along with additional details will be visible. By clicking into the file system, you can view these settings and access the specific commands to mount the EFS on your Linux systems.

![The image shows an AWS Elastic File System (EFS) management console with details about a file system, including performance mode, throughput mode, encryption status, and replication settings. The file system is available, with automatic backups disabled and replication overwrite protection enabled.](https://kodekloud.com/kk-media/image/upload/v1752860049/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Implementing-Fault-Tolerant-Storage-using-EFS/aws-efs-management-console-details.jpg)

## Mounting the File System

AWS offers command examples for mounting your EFS either through the EFS mount helper or directly with an NFS client. Here are two common approaches:

- **Using the EFS Mount Helper:**

  ```
  sudo mount -t efs -o tls fs-0f1d270e9ee019e93:/ efs
  ```

- **Using NFS Directly:**

  ```
  sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport fs-0f1d270e9ee019e93.efs.us-east-1.amazonaws.com:/ efs
  ```

The fully qualified domain name (FQDN) provided is internal to AWS, ensuring that the file system mounts correctly.

Once mounted, there may be a brief delay as the mount targets (represented as network interfaces or ENIs) across each Availability Zone (e.g., US East 1A, B, C) stabilize.

![The image shows an Amazon Web Services (AWS) Elastic File System (EFS) dashboard, displaying general settings and network information for a file system. It includes details like performance mode, throughput mode, encryption, and availability zone.](https://kodekloud.com/kk-media/image/upload/v1752860051/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Implementing-Fault-Tolerant-Storage-using-EFS/aws-efs-dashboard-settings-info.jpg)

Even if automatic backups are disabled during setup, the dashboard monitoring graphs will eventually display key metrics such as file system utilization, throughput, storage class breakdown, and more.

![The image shows an AWS Elastic File System dashboard displaying metered size information, with a total size of 6.00 KiB in the standard storage class. Replication overwrite protection is enabled.](https://kodekloud.com/kk-media/image/upload/v1752860052/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Implementing-Fault-Tolerant-Storage-using-EFS/aws-elastic-file-system-dashboard.jpg)

Checking your network settings should reveal that the mount targets are active in the selected Availability Zones. This confirms that your EFS is ready to be mounted and used by your Linux servers for hosting web content, storing database logs, backups, etc.

To get detailed network settings—including availability zones, mount target IDs, subnet IDs, IP addresses, and associated security groups—review the following console dashboard:

![The image shows an AWS Elastic File System (EFS) management console, displaying network details such as availability zones, mount target IDs, subnet IDs, IP addresses, and security groups.](https://kodekloud.com/kk-media/image/upload/v1752860053/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Implementing-Fault-Tolerant-Storage-using-EFS/aws-efs-management-console-network-details.jpg)

This concludes our guide on setting up a fault-tolerant Amazon EFS. You now have a comprehensive understanding of how to configure EFS, implement file system policies, and mount the storage on your Linux instances for various production workloads.

See you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/3e3860b4-ccc6-4ec3-8498-974871c826a4)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/9a0c4783-abd8-4f82-b62b-b57c26713796)**
>
> Practice lab
