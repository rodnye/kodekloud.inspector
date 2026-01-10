# EFS Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/EFS-Demo)

---

## Table of Contents

- EFS Demo
  - Environment Overview
  - Creating the EFS File System
  - Mounting the EFS File System on EC2 Instances
  - Demonstrating EFS Functionality
  - Persistent Mount Configuration
  - Summary
  - Watch Video
  - Practice Lab
    - File System Settings
    - Network Configuration
    - Mounting the EFS

---

## Content

AWS Certified Developer - Associate

Storage

# EFS Demo

In this lesson, we demonstrate how to leverage Amazon's Elastic File System (EFS) to enable shared storage across multiple EC2 instances deployed in different Availability Zones. This step-by-step guide will show you how to deploy an EFS file system, mount it on servers residing in multiple zones, and verify that they can concurrently read and write to a common file system.

## Environment Overview

Our environment consists of a VPC with two subnets deployed in distinct Availability Zones (US East 1A and US East 1B). Each zone hosts an EC2 instance, ensuring high availability and redundancy.

![The image shows an AWS EC2 dashboard with two running instances, both of type t2.micro, with their status checks passed.](https://kodekloud.com/kk-media/image/upload/v1752859644/notes-assets/images/AWS-Certified-Developer-Associate-EFS-Demo/aws-ec2-dashboard-t2micro-instances.jpg)

## Creating the EFS File System

Begin by navigating to the EFS section in the AWS Console. You can choose either the quick create option or select "Customize" to access full configuration options.

![The image shows a webpage for Amazon Elastic File System (EFS), highlighting its scalable and cloud-native features, with options to create a file system and view pricing details.](https://kodekloud.com/kk-media/image/upload/v1752859646/notes-assets/images/AWS-Certified-Developer-Associate-EFS-Demo/amazon-efs-webpage-scalable-features.jpg)

### File System Settings

Follow these steps to configure your EFS file system:

1.  Provide a name for your file system (for this demo, we use "EFS demo").
2.  Select the appropriate storage class. Options include:
    - Redundant storage across multiple Availability Zones.
    - Single Availability Zone storage, which offers redundancy only within that zone.> [!important]
      > **Warning**
      >
      > Storing data in a single Availability Zone can risk data loss if the entire zone goes down.
3.  Enable automatic backups if needed.
4.  Configure lifecycle management policies to move infrequently accessed data to a cheaper storage class after a specified period (e.g., 30 days).
5.  Choose your encryption and throughput modes (elastic vs. provisioned, and general purpose vs. max). For this demo, the default settings are sufficient.
6.  Click **Next** to proceed with the configuration.

![The image shows the "File system settings" page for creating an Amazon EFS file system, with options for naming, storage class, automatic backups, lifecycle management, and encryption settings.](https://kodekloud.com/kk-media/image/upload/v1752859647/notes-assets/images/AWS-Certified-Developer-Associate-EFS-Demo/amazon-efs-file-system-settings.jpg)

### Network Configuration

Next, assign the file system to the VPC where your EC2 instances are located (in our demo, this is "demo VPC"). AWS automatically creates mount targets in each Availability Zone within your VPC.

![The image shows a configuration screen for setting up network access in Amazon EFS, where users can select a Virtual Private Cloud (VPC), availability zones, subnets, and security groups.](https://kodekloud.com/kk-media/image/upload/v1752859649/notes-assets/images/AWS-Certified-Developer-Associate-EFS-Demo/amazon-efs-network-configuration-screen.jpg)

Ensure that:

- You select the subnet for the mount target.
- The security group is configured to allow traffic only from your EC2 instances. In this demo, a common security group is used by all EC2 instances, permitting SSH and inter-instance traffic.

After reviewing your settings, click **Next**, confirm the details, and then click **Create**. Allow a few minutes for the file system to be provisioned.

![The image shows an Amazon Web Services (AWS) Elastic File System (EFS) dashboard with a file system named "efs-demo" that is available and unencrypted, with a total size of 6.00 KiB.](https://kodekloud.com/kk-media/image/upload/v1752859651/notes-assets/images/AWS-Certified-Developer-Associate-EFS-Demo/aws-efs-dashboard-efs-demo.jpg)

## Mounting the EFS File System on EC2 Instances

After the file system is active, access both servers via SSH and perform the following on each instance:

1.  Create a directory to act as the mount point:

    ```
    sudo mkdir /efsdemo
    ```

2.  Install the Amazon EFS Utils, which simplifies mounting the EFS file system:

    ```
    sudo dnf -y install amazon-efs-utils
    ```

### Mounting the EFS

Once the Amazon EFS Utils package is installed, mount the file system using its unique file system ID. Locate this ID on your AWS Console under the EFS details. For instance, if your file system ID is `fs-08de7b8e04f984697`, run:

```
sudo mount.efs fs-08de7b8e04f984697:/efsdemo
```

To confirm a successful mount, execute:

```
df -k
```

A typical successful output will contain an entry similar to:

```
Filesystem                                                       1K-blocks      Used Available Use% Mounted on
...
fs-08de7b8e04f984697.efs.us-east-1.amazonaws.com:/               9007199254739968      0 9007199254739968   0% /efsdemo
```

![The image shows an Amazon Web Services (AWS) Elastic File System (EFS) dashboard, displaying details such as performance mode, throughput mode, lifecycle management, and metered size. The file system is available, with automatic backups enabled and no encryption.](https://kodekloud.com/kk-media/image/upload/v1752859652/notes-assets/images/AWS-Certified-Developer-Associate-EFS-Demo/aws-efs-dashboard-performance-details.jpg)

## Demonstrating EFS Functionality

With the EFS mounted on both servers, you can now verify that the file system supports concurrent access.

1.  On server one, navigate to the mount directory and create a file named `file1`:

    ```
    cd /efsdemo/
    echo "I made this on server1" | sudo tee file1
    ls
    ```

    Expected output:

    ```
    file1
    ```

2.  On server two, navigate to the same directory, list the files, and display the contents of `file1`:

    ```
    cd /efsdemo/
    ls
    cat file1
    ```

    You should see that `file1` exists and its content matches what was created on server one.

3.  Similarly, create a file (e.g., `file2`) on server two and then verify its presence and content on server one.

For example, an interactive session on server one might look like this:

```
sudo mount.efs fs-08de7b8e04f984697.efs.us-east-1.amazonaws.com:/efsdemo
df -k
cd /efsdemo/
sudo vi file1
ls
```

These steps confirm that both servers can read from and write to the shared EFS.

## Persistent Mount Configuration

> [!important]
> **Note**
>
> Manually mounting an EFS file system using the above commands is not persistent across reboots. To automatically remount the EFS after a restart, update your `/etc/fstab` file with the appropriate configuration. For further details, please refer to the [official AWS EFS documentation](https://docs.aws.amazon.com/efs/latest/ug/mount-fs.html).

## Summary

In this lesson, we covered how to:

- Create and configure an AWS EFS file system using the AWS Console.
- Configure file system settings including storage class, backups, and lifecycle management.
- Set up network options tailored for multiple Availability Zones.
- Install Amazon EFS Utils on EC2 instances and successfully mount the EFS file system.
- Verify concurrent access by reading and writing files from different servers.
- Set up persistent mounting configurations to survive reboots.

This guide should help streamline your EFS implementation, ensuring a robust, shared file storage solution across multiple servers.

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/76388808-3fce-434b-a814-da50dcf774d4)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/d57e9100-0161-4eb9-b69c-97d51164631c)**
>
> Practice lab
