# EFS Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/EFS-Demo)

---

## Table of Contents

- EFS Demo
  - EC2 Setup Overview
  - Creating the EFS File System
  - Configuring EC2 Instances for EFS
  - Summary
  - Watch Video
    - Customizing Your EFS Settings
    - Configuring Network Settings
    - Step 1: Create a Mount Directory
    - Step 2: Install Amazon EFS Utils
    - Step 3: Mount the EFS File System
    - Step 4: Test the Shared File System

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# EFS Demo

In this lesson, we explore Amazon's Elastic File System (EFS) and demonstrate how to set up and share it between multiple EC2 instances. This guide covers the creation of an EFS file system, configuring it for your network, and mounting it on EC2 servers to enable simultaneous read/write access.

## EC2 Setup Overview

Our current setup consists of a simple VPC with two subnets across two availability zones (US East 1A and US East 1B). Each zone runs one t2.micro instance, ensuring redundancy and high availability.

![The image shows an AWS EC2 dashboard with two running instances, both of type t2.micro, displaying their status checks and other details.](https://kodekloud.com/kk-media/image/upload/v1752865977/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EFS-Demo/aws-ec2-dashboard-t2micro-instances.jpg)

The goal is to mount a single EFS file system on both servers so that they can share data seamlessly.

## Creating the EFS File System

Begin by navigating to the EFS page in the AWS console and selecting **Create File System**.

![The image shows a webpage for Amazon Elastic File System (EFS), highlighting its scalable and elastic cloud-native NFS file system features, with options to create a file system and view pricing details.](https://kodekloud.com/kk-media/image/upload/v1752865979/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EFS-Demo/amazon-efs-cloud-native-nfs-file-system.jpg)

### Customizing Your EFS Settings

Click **Customize** to adjust your EFS configuration:

- Enter a descriptive name (e.g., "EFS demo").
- Select a storage class. Choose a multi-zone configuration for enhanced durability, or a single zone option if your workload allows data redundancy limited to one availability zone.

![The image shows the "File system settings" page for creating an Amazon EFS file system, with options for naming, storage class, automatic backups, lifecycle management, and encryption settings.](https://kodekloud.com/kk-media/image/upload/v1752865980/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EFS-Demo/amazon-efs-file-system-settings.jpg)

For instance, a single availability zone configuration keeps data redundant within that zone, which protects against individual instance failures but may risk data loss if the entire zone fails. Options for automatic backups and lifecycle management (such as moving files older than 30 days to cheaper storage tiers like S3 Standard-IA) are also available.

### Configuring Network Settings

Next, set up the network access:

1.  Choose the VPC used by your EC2 instances (in our demo, “demo VPC”).
2.  AWS automatically creates mount targets in each availability zone within the selected VPC. Ensure every zone has a mount target to maintain availability.

![The image shows a configuration screen for setting up network access in Amazon EFS, where users can select a Virtual Private Cloud (VPC) and configure mount targets with specific availability zones, subnets, and security groups.](https://kodekloud.com/kk-media/image/upload/v1752865981/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EFS-Demo/amazon-efs-network-configuration-screen.jpg)

When specifying security groups, you can either create a custom group tailored for EFS traffic or use the security group attached to your EC2 instances if it already permits all necessary communication.

![The image shows an AWS Management Console screen displaying a list of security groups, with details of inbound rules for a selected security group.](https://kodekloud.com/kk-media/image/upload/v1752865982/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EFS-Demo/aws-management-console-security-groups.jpg)

After reviewing the configurations, click **Next**, review your selections, and then **Create**. Wait a few minutes for AWS to provision the file system.

## Configuring EC2 Instances for EFS

Once the file system is active, log into your EC2 instances to complete the setup. The following steps must be performed on each server.

![The image shows an AWS Elastic File System (EFS) dashboard with a file system named "efs-demo" that is available and unencrypted, with a total size of 6.00 KiB.](https://kodekloud.com/kk-media/image/upload/v1752865983/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EFS-Demo/aws-efs-dashboard-efs-demo.jpg)

### Step 1: Create a Mount Directory

Create a directory that will serve as the mount point for the EFS file system. In this demo, we use `/efsdemo`:

```
[ec2-user@ip-10-0-11-189 ~]$ sudo mkdir /efsdemo
```

### Step 2: Install Amazon EFS Utils

Install the Amazon EFS Utils package to simplify mounting the file system:

```
[ec2-user@ip-10-0-11-189 ~]$ sudo dnf -y install amazon-efs-utils
```

Repeat this installation on every EC2 instance you plan to mount the EFS.

### Step 3: Mount the EFS File System

Mount the file system using the provided file system ID from the AWS console. Replace `fs-08de7b8e04f984697` with your file system ID:

```
[ec2-user@server ~]$ sudo mount.efs fs-08de7b8e04f984697 /efsdemo
```

Verify the mount status with:

```
[ec2-user@server ~]$ df -k
Filesystem                                                      1K-blocks       Used  Available Use% Mounted on
...
fs-08de7b8e04f984697.efs.us-east-1.amazonaws.com:/ 9007199254739968    0 9007199254739968   0% /efsdemo
```

> [!important]
> **Persistence Notice**
>
> This manual mount is not persistent across reboots. To ensure the EFS mounts automatically after a reboot, add the appropriate entry to your `/etc/fstab` file following the AWS documentation.

### Step 4: Test the Shared File System

To verify the shared access, perform the following tests:

1.  On the first server, navigate to the mount directory and create a file:

    ```
    [ec2-user@ip-10-0-11-189 ~]$ cd /efsdemo
    [ec2-user@ip-10-0-11-189 efsdemo]$ sudo vi file1
    ```

    Insert the text:

    I made this on server1

2.  On the second server, check the shared directory:

    ```
    [ec2-user@ip-10-0-22-199 ~]$ cd /efsdemo/
    [ec2-user@ip-10-0-22-199 efsdemo]$ ls
    file1
    [ec2-user@ip-10-0-22-199 efsdemo]$ cat file1
    I made this on server1
    ```

The appearance of the file on both servers confirms that the EFS file system is shared effectively. You can also create another file from the second server (e.g., "file2" with the content "I made this on server2") and verify its presence on the first server.

Below is a consolidated view of the commands executed on one server:

```
[ec2-user@ip-10-0-11-189 ~]$ sudo mkdir /efsdemo
[ec2-user@ip-10-0-11-189 ~]$ sudo mount.efs fs-08de7b8e04f984697 /efsdemo
[ec2-user@ip-10-0-11-189 ~]$ df -k
Filesystem                                                      1K-blocks       Used  Available Use% Mounted on
...
fs-08de7b8e04f984697.efs.us-east-1.amazonaws.com:/ 9007199254739968    0 9007199254739968   0% /efsdemo
[ec2-user@ip-10-0-11-189 ~]$ cd /efsdemo
[ec2-user@ip-10-0-11-189 efsdemo]$ sudo vi file1
[ec2-user@ip-10-0-11-189 efsdemo]$ ls
file1  file2
```

## Summary

In this lesson, you learned how to:

- Create an EFS file system with customized settings in the AWS console.
- Configure network settings and security groups to support mount targets in each availability zone.
- Install Amazon EFS Utils on EC2 instances.
- Mount the EFS file system and verify shared file access between multiple servers.

> [!important]
> **Additional Resources**
>
> For further details on persistent mounting and additional configuration options, please refer to the [Amazon EFS documentation](https://docs.aws.amazon.com/efs/latest/ug/).

Thank you for following this guide on setting up Amazon EFS. Stay tuned for more tutorials on AWS services in our upcoming lessons.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/17fffd82-afc2-4bba-a5b3-54ac4eb1b9e8)**
>
> Watch video content
