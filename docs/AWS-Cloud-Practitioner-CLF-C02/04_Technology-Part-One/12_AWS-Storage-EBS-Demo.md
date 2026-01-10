# AWS Storage EBS Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/AWS-Storage-EBS-Demo)

---

## Table of Contents

- AWS Storage EBS Demo
  - Overview of EC2 Instances and Availability Zones
  - Creating an EBS Volume
  - Attaching the Volume to an EC2 Instance
  - Configuring the EBS Volume on Instance 1
  - Persisting the Mount Across Reboots
  - Verifying the Setup
  - Detaching the Volume and Attaching to Another Instance
  - Cleaning Up
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# AWS Storage EBS Demo

In this lesson, you will learn how to work with AWS Elastic Block Store (EBS) by creating an EBS volume, attaching it to an EC2 instance, configuring the file system, and then detaching and reattaching the volume to a different instance. This demonstration highlights that an EBS volume is independent of any specific EC2 instance.

## Overview of EC2 Instances and Availability Zones

Two EC2 instances (instance 1 and instance 2) are provisioned in the same Availability Zone. This alignment is crucial because an EBS volume must be created in the same Availability Zone as the instance when attaching it.

![The image shows an AWS EC2 dashboard with two running instances, both of type t2.micro, with status checks passed and no alarms.](https://kodekloud.com/kk-media/image/upload/v1752861823/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EBS-Demo/frame_50.jpg)

Both instances are located in US East-1C, so any EBS volume created for these instances must also be in US East-1C.

## Creating an EBS Volume

1.  Navigate to the EC2 dashboard.
2.  Scroll down to the **Elastic Block Store** section and select **Volumes**.
3.  Click the **Create Volume** button to start a new volume configuration.

When creating the volume, ensure you:

- Select **General Purpose SSD** as the volume type (default).
- Specify a size (for example, 20 GiB).
- Set the Availability Zone to **US East-1C** to match the EC2 instances.
- Optionally, assign a tag (e.g., Name tag: "EBS demo").

![The image shows an AWS console screen for creating an EBS volume, with options for size, IOPS, availability zone, and tags.](https://kodekloud.com/kk-media/image/upload/v1752861824/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EBS-Demo/frame_130.jpg)

After you create the volume, its initial status will be "creating." After a brief wait, the status will update to "available."

## Attaching the Volume to an EC2 Instance

With the volume available, follow these steps to attach it to instance 1:

1.  Select the newly created volume.
2.  Click on the **Actions** dropdown and choose **Attach Volume**.
3.  Choose instance 1 from the available instances.
4.  Note the device name shown on the instance (commonly /dev/sdf, which may appear as /dev/xvdf on newer Linux kernels).

A successful attachment is indicated by a green confirmation bar.

![The image shows an AWS EC2 dashboard displaying details of an EBS volume, including its ID, size, type, status, and availability zone.](https://kodekloud.com/kk-media/image/upload/v1752861825/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EBS-Demo/frame_150.jpg)

![The image shows an AWS EC2 dashboard displaying details of three EBS volumes, including volume IDs, types, sizes, and availability zones.](https://kodekloud.com/kk-media/image/upload/v1752861826/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EBS-Demo/frame_200.jpg)

## Configuring the EBS Volume on Instance 1

Log in to instance 1 and follow these steps to prepare and mount the volume:

1.  **List Block Devices**

    Run the following command to view all block devices on the instance:

    ```
    sudo lsblk
    ```

    You should see the root device (about 8 GiB) and the new 20 GiB volume as "xvdf" (or a similar name).

2.  **Verify the EBS Volume**

    Check if a file system already exists on the volume:

    ```
    sudo file -s /dev/xvdf
    ```

    If the output returns "data," no file system is present on the volume.

3.  **Create an EXT4 File System**

    To create a new file system on the volume, run:

    ```
    sudo mkfs.ext4 /dev/xvdf
    ```

    After formatting, verify again to ensure that an EXT4 filesystem is now present:

    ```
    sudo file -s /dev/xvdf
    ```

4.  **Mount the File System**

    Create a directory serving as the mount point and mount the volume:
    - Create a directory (e.g., `/ebsdemo`):

      ```
      sudo mkdir /ebsdemo
      ```

    - Mount the volume to the new directory:

      ```
      sudo mount /dev/xvdf /ebsdemo
      ```

    Validate the mount by listing the block devices:

    ```
    sudo lsblk
    ```

    To further confirm, use:

    ```
    df -h
    ```

    This command verifies that `/dev/xvdf` is mounted on `/ebsdemo`.

> [!important]
> **Note**
>
> Remember to use the correct device name (`/dev/xvdf`) which may vary depending on your Linux kernel.

## Persisting the Mount Across Reboots

To automatically remount the EBS volume after a system reboot, update the `/etc/fstab` file:

1.  **Retrieve the UUID**

    Run the command below to find the UUID of the volume:

    ```
    sudo blkid
    ```

    Identify the UUID corresponding to `/dev/xvdf`.

2.  **Edit the fstab File**

    Open `/etc/fstab` with your favorite text editor:

    ```
    sudo vi /etc/fstab
    ```

3.  **Add the New Entry**

    Insert a new line similar to the following. Replace the UUID with the one you found:

    ```
    UUID=d00f00f3-51b6-4669-acb0-363989486b91 /ebsdemo ext4 defaults 0 0
    ```

    Double-check for typographical errors to avoid boot issues.

After saving, the EBS volume will be remounted automatically after each reboot.

## Verifying the Setup

To validate your configuration, change to the mount point and create a test file:

1.  Change the directory:

    ```
    cd /ebsdemo
    ```

2.  Create and edit a new file:

    ```
    sudo vi example_file.txt
    ```

    Enter some text (e.g., "I created this file on instance 1") and save the file.

3.  List the contents of the directory:

    ```
    ls -l
    ```

The new file should be visible, confirming that the volume is correctly mounted and writable.

## Detaching the Volume and Attaching to Another Instance

To illustrate that an EBS volume is not tied to a single EC2 instance, detach it from instance 1 and attach it to instance 2 by following these steps:

1.  Go to the EC2 console and select instance 1. Stop instance 1 to ensure safe volume detachment.
2.  Navigate to the **Volumes** section, select the volume, and click **Detach Volume**.
3.  After detachment, attach the volume to instance 2 using the same device name:
    - Select the volume.
    - Click on **Actions** and choose **Attach Volume**.
    - Select instance 2 from the dropdown list.

![The image shows an AWS EC2 dashboard with details of an EBS volume, including its ID, size, type, and status, along with available actions.](https://kodekloud.com/kk-media/image/upload/v1752861828/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EBS-Demo/frame_540.jpg)

![The image shows an AWS EC2 dashboard with two running instances, both t2.micro type, in the us-east-1c availability zone.](https://kodekloud.com/kk-media/image/upload/v1752861829/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EBS-Demo/frame_550.jpg)

Log in to instance 2 and mount the volume:

1.  Display block devices:

    ```
    sudo lsblk
    ```

2.  Create a mount directory and mount the volume:

    ```
    sudo mkdir /instance2ebs
    sudo mount /dev/xvdf /instance2ebs
    ```

3.  Verify that the file created on instance 1 is present:

    ```
    cd /instance2ebs
    cat example_file.txt
    ```

The output should display the content "I created this file on instance 1," confirming that the data persists across instances.

![The image shows an AWS EC2 dashboard with details of an EBS volume, including its ID, size, type, and status.](https://kodekloud.com/kk-media/image/upload/v1752861830/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EBS-Demo/frame_590.jpg)

## Cleaning Up

After the demonstration is complete, make sure to clean up your AWS resources:

1.  Shut down and terminate both EC2 instances.
2.  Remember that EBS volumes persist beyond instance termination, so navigate to the **Volumes** section.
3.  Select and click **Delete Volume** to remove the volume.

![The image shows an AWS EC2 management console with details of two EBS volumes, including their IDs, types, sizes, and status, with a menu for volume actions.](https://kodekloud.com/kk-media/image/upload/v1752861832/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Storage-EBS-Demo/frame_710.jpg)

This concludes the AWS EBS demo lesson. For further details on managing AWS resources, check out the [AWS Documentation](https://docs.aws.amazon.com/) and our related guides.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/e275a7c2-123a-420c-bd68-48fd978f54d2)**
>
> Watch video content
