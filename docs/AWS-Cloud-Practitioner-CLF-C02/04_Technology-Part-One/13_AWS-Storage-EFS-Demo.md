# AWS Storage EFS Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/AWS-Storage-EFS-Demo)

---

## Table of Contents

- AWS Storage EFS Demo
  - Overview
  - Creating the EFS File System
  - Configuring Mount Targets
  - Setting File System Policies
  - Preparing the EC2 Instances
  - Mounting the EFS File System
  - Sharing Files Between Instances
  - Cleaning Up
  - Watch Video
    - Step 1: Create the Mount Directory
    - Step 2: Mount the EFS File System
    - Step 3: Make the Mount Persistent

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# AWS Storage EFS Demo

In this lesson, we demonstrate how to deploy and use AWS Elastic File System (EFS), highlighting its benefits such as mounting the same file system on multiple EC2 instances. This guide complements our previous Elastic Block Store demo by focusing on a shared file system accessible by multiple machines.

## Overview

This demo uses two EC2 instances running in the US East 1C Availability Zone. Our objective is to create an EFS file system and mount it on both instances. One of the key advantages of EFS is its ability to allow concurrent access by multiple instances.

First, verify that your EC2 instances (instance one and instance two) are up and running in US East 1C. Once confirmed, proceed with creating the Elastic File System.

![The image shows an AWS EC2 dashboard with two running instances, both of type t2.micro, in the us-east-1c availability zone.](https://kodekloud.com/kk-media/image/upload/v1752861834/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EFS-Demo/frame_40.jpg)

## Creating the EFS File System

1.  In the AWS Management Console, search for the Elastic File System service.
2.  Click **Create File System**. You can choose the default quick creation option or select **Customize** to adjust detailed settings:
    - Provide a name (e.g., "EFS Demo").
    - Choose the storage class:
      - **Standard:** Ensures redundancy across multiple Availability Zones.
      - **One Zone:** Stores the file system in a single Availability Zone.

    ![The image shows the AWS EFS file system settings page, where users can configure general settings, storage class, automatic backups, lifecycle management, and encryption options.](https://kodekloud.com/kk-media/image/upload/v1752861836/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EFS-Demo/frame_70.jpg)

3.  For this demonstration, disable automatic backups, choose lifecycle settings as needed, and leave encryption disabled. Use the default throughput mode.
4.  Click **Next**.

![The image shows an AWS management console screen for configuring EFS settings, including lifecycle management, encryption, and performance settings with options for throughput modes.](https://kodekloud.com/kk-media/image/upload/v1752861838/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EFS-Demo/frame_90.jpg)

## Configuring Mount Targets

Mount targets expose your EFS file system to the instances within your VPC. They are required in every Availability Zone that houses servers needing access.

1.  Since both instances are in US East 1C, remove any other availability zones if present.
2.  Select the subnet corresponding to US East 1C.
3.  Specify a security group (e.g., one named “EFS”) that permits access from your EC2 instances.
4.  Confirm the correct VPC is selected.
5.  Click **Next**.

![The image shows an AWS console screen for configuring network access, including VPC selection and mount targets for Amazon EFS across different availability zones.](https://kodekloud.com/kk-media/image/upload/v1752861839/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EFS-Demo/frame_110.jpg)

## Setting File System Policies

Set file system policies to control access—options include preventing root access or enforcing read-only mode. For this demo, leave the defaults.

![The image shows an AWS EFS file system policy configuration screen with options for access control and encryption settings.](https://kodekloud.com/kk-media/image/upload/v1752861840/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EFS-Demo/frame_210.jpg)

Review your settings and click **Create**. The file system will initially appear in a "creating" state. Refresh the page until it becomes available.

![The image shows an AWS Elastic File System dashboard with one available file system named "efsdemo," unencrypted, and a total size of 6.00 KiB.](https://kodekloud.com/kk-media/image/upload/v1752861841/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EFS-Demo/frame_230.jpg)

## Preparing the EC2 Instances

For both instances, install the Amazon EFS Utils package to simplify mounting EFS on Amazon Linux images.

On instance 1 (apply the same on instance 2), run:

```
sudo yum install -y amazon-efs-utils
```

The output will display information similar to the following:

```
Last metadata expiration check: 0:10:13 ago on Wed May  3 04:05:58 2023.
Dependencies resolved.
.
Package                       Architecture     Version                  Repository               Size
====================================================================================================================
Installing:
amazon-efs-utils              noarch           1.35.0-1.amzn2023        amazonlinux              56 k
Installing dependencies:
stunnel                       x86_64           5.58-1.amzn2023.0.2      amazonlinux             156 k


Transaction Summary
====================================================================================================================
Install  2 Packages


Total download size: 212 k
Installed size: 556 k
Downloading Packages:
(1/2): amazon-efs-utils-1.35.0-1.amzn2023.noarch.rpm
(2/2): stunnel-5.58-1.amzn2023.0.2.x86_64.rpm
--------------------------------------------------------------------------------------------------------------------
Total
Downloading Packages:
(1/2): amazon-efs-utils-1.35.0-1.amzn2023.noarch.rpm               689 kB/s |  56 kB | 00:00
(2/2): stunnel-5.58-1.amzn2023.0.2.x86_64.rpm                      1.5 MB/s    | 156 kB | 00:00
--------------------------------------------------------------------------------------------------------------------


Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing   : stunnel-5.58-1.amzn2023.0.2.x86_64                    1/1
  Installing  : stunnel-5.58-1.amzn2023.0.2.x86_64                    1/2
  Running scriptlet: stunnel-5.58-1.amzn2023.0.2.x86_64
  Installing  : amazon-efs-utils-1.35.0-1.amzn2023.noarch             2/2
  Running scriptlet: amazon-efs-utils-1.35.0-1.amzn2023.noarch
  Verifying   : stunnel-5.58-1.amzn2023.0.2.x86_64                    1/2
  Verifying   : amazon-efs-utils-1.35.0-1.amzn2023.noarch             2/2


Installed:
  amazon-efs-utils-1.35.0-1.amzn2023.noarch


Complete!
```

## Mounting the EFS File System

### Step 1: Create the Mount Directory

On instance 1, create a directory where the EFS file system will be mounted:

```
sudo mkdir /efsdemo
```

### Step 2: Mount the EFS File System

To mount the EFS file system, use the `mount.efs` command with two arguments:

- The EFS file system ID (copy it from your AWS console under EFS details).
- The target directory (e.g., `/efsdemo`).

For example, on instance 1, execute:

```
[ec2-user@ip-172-31-88-238 ~]$ sudo mount.efs fs-02f4d38ba0c836aa /efsdemo
```

Verify the mount by running:

```
df -h
```

Expected output:

```
Filesystem                                          Size  Used Avail Use% Mounted on
fs-02f4d38ba0c8c36aa.efs.us-east-1.amazonaws.com:/  8.0E     0  8.0E   0% /efsdemo
```

> [!important]
> **Note**
>
> Ensure you create the mount directory only once before executing the mount command with the correct file system ID.

### Step 3: Make the Mount Persistent

To automatically mount the file system after a reboot, update the `/etc/fstab` file. Add a new line with your file system ID and mount point:

```
fs-02f4d38ba0c8c36aa:/efsdemo efs _netdev,noresvport,tls,iam 0 0
```

An example `/etc/fstab` file:

```
UUID=d0c265c4-6ea1-4060-b815-520e1c2aae05 /                       xfs     defaults,noatime        1 1
UUID=600C-CF35      /boot/efi               vfat    defaults,noatime,uid=0,gid=0,umask=0077,shortname=winnt,x-systemd.automount 0 2
fs-02f4d38ba0c8c36aa:/efsdemo efs _netdev,noresvport,tls,iam 0 0
```

After modifying `/etc/fstab`, mount all file systems with:

```
sudo mount -a
```

Then, verify the mount using:

```
df -h
```

## Sharing Files Between Instances

To test the shared file system, create a file on instance 1 in the `/efsdemo` directory:

```
sudo vi /efsdemo/file1.txt
```

For instance, add the content:

```
I made this file on instance1
```

Next, perform the following on instance 2:

1.  Create the mount directory (if it doesn’t exist yet):

    ```
    sudo mkdir /efsdemo
    ```

2.  Mount the EFS file system using the same command as on instance 1:

    ```
    sudo mount -t efs fs-02f4d38ba0c8c36aa:/ /efsdemo
    ```

3.  Verify the mount:

    ```
    df -h
    ```

4.  Navigate to `/efsdemo` and verify that `file1.txt` exists:

    ```
    cd /efsdemo
    ls
    cat file1.txt
    ```

5.  Optionally, create another file on instance 2:

    ```
    sudo vi /efsdemo/file2.txt
    ```

    Add the content:

    ```
    I made this file on instance2
    ```

6.  Return to instance 1 to ensure both files are visible:

    ```
    ls /efsdemo
    cat /efsdemo/file2.txt
    ```

This verifies that changes on one instance are visible on the other, showcasing the sharing capability of AWS EFS.

## Cleaning Up

To conclude the demo, delete the EFS file system through the AWS console:

1.  Select your EFS file system and click **Delete**.
2.  When prompted, copy the file system name, paste it into the confirmation box, and confirm deletion.

![The image shows an AWS console screen with a prompt to confirm the deletion of a file system, warning that this action is irreversible.](https://kodekloud.com/kk-media/image/upload/v1752861842/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EFS-Demo/frame_620.jpg)

After a few minutes, the file system will be successfully deleted.

> [!important]
> **Demo Complete**
>
> This demonstration covers creating, mounting, and using AWS EFS across multiple EC2 instances. For more information on AWS EFS configuration and best practices, refer to the [AWS Documentation](https://docs.aws.amazon.com/efs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/d4e6e294-5887-4c3a-a445-7fe2dd7c2101)**
>
> Watch video content
