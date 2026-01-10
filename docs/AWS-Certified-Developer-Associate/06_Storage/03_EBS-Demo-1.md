# EBS Demo 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/EBS-Demo-1)

---

## Table of Contents

- EBS Demo 1
  - Creating and Attaching an EBS Volume
  - Verifying and Formatting the EBS Volume on Server One
  - Mounting the Filesystem
  - Testing the EBS Volume
  - Detaching and Reattaching the EBS Volume to Another Instance
  - Conclusion
  - Watch Video
    - Configuring /etc/fstab for Persistence

---

## Content

AWS Certified Developer - Associate

Storage

# EBS Demo 1

In this lesson, we explore how to work with Amazon Elastic Block Store (EBS) by moving data between Availability Zones and regions. The exercise uses several preconfigured EC2 instances to focus solely on EBS operations. In our setup, servers one to three are deployed in the US East (Northern Virginia, us-east-1) region within different Availability Zones: server one and server two share the same zone, while server three is in another. Server four is hosted in a completely different region.

Because EBS volumes are confined to a specific Availability Zone and can attach only to EC2 instances within that zone, this guide covers moving an EBS volume both within the same zone and across zones and regions.

## Creating and Attaching an EBS Volume

Start by navigating to the US East (us-east-1) region in your AWS Management Console. In this lab, you'll create an EBS volume to attach to server one. Ensure the volume is in the same Availability Zone as server one—in this example, "us-east-1a".

1.  Go to the Volumes section and click on **Create Volume**.

    ![The image shows an AWS management console displaying a list of Elastic Block Store (EBS) volumes with details like volume ID, type, size, IOPS, and availability zone. The interface includes options for managing instances and other AWS services.](https://kodekloud.com/kk-media/image/upload/v1752859611/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-1/aws-management-console-ebs-volumes.jpg)

2.  Select the volume type (default is acceptable) and set the volume size to 10 GB. It is essential to choose the correct Availability Zone—here, "us-east-1a". You may enable encryption as needed, but for this demonstration it remains disabled.

    ![The image shows an Amazon Web Services (AWS) interface for creating an EBS volume, with options for size, IOPS, availability zone, encryption, and tags.](https://kodekloud.com/kk-media/image/upload/v1752859612/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-1/aws-ebs-volume-creation-interface.jpg)

3.  Once the volume is created, verify that it appears in the console with an "available" status:

    ![The image shows an AWS EC2 dashboard displaying a list of EBS volumes with details such as volume ID, type, size, and status. A specific volume is highlighted, showing its detailed information below.](https://kodekloud.com/kk-media/image/upload/v1752859614/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-1/aws-ec2-dashboard-ebs-volumes.jpg)

4.  Assign a suitable name (for example, "demo volume"). When the volume is available, select it, choose **Actions**, and then click on **Attach Volume**. The management console will show EC2 instances within the same Availability Zone—select server one.

    ![The image shows an AWS EC2 console screen for attaching a volume to an instance, with options to select the instance and device name.](https://kodekloud.com/kk-media/image/upload/v1752859614/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-1/aws-ec2-attach-volume-console.jpg)

Note that when you attach the volume, AWS assigns a device name (commonly starting as "/dev/sdf") which might be renamed (e.g., to "/dev/xvdf") by the Linux kernel.

## Verifying and Formatting the EBS Volume on Server One

After attaching the volume, connect to server one via your terminal and follow these steps:

1.  List the block devices using:

    Code:

    ***

    lsblk

    ***

    You should see the root device (e.g., xvda) and the new 10GB device (xvdf). An example output:

    Code:

    ***

    \[ec2-user@ip-10-0-8-197 ~\]$ lsblk NAME MAJ:MIN RM SIZE RO TYPE MOUNTPOINTS xvda 202:0 0 8G 0 disk ├─xvda1 202:1 0 8G 0 part / └─xvda127 259:0 0 1M 0 part └─xvda128 259:1 0 10M 0 part xvdf 202:80 0 10G 0 disk

    ***

2.  Confirm that the new volume does not yet have a filesystem:

    Code:

    ***

    sudo file -s /dev/xvdf

    ***

    Expected output example:

    Code:

    ***

    /dev/xvdf: data

    ***

3.  Format the volume with an XFS filesystem:

    Code:

    ***

    sudo mkfs -t xfs /dev/xvdf

    ***

4.  Re-run the file command to confirm the filesystem is now recognized:

    Code:

    ***

    sudo file -s /dev/xvdf

    ***

    Expected output:

    Code:

    ***

    /dev/xvdf: SGI XFS filesystem data (blksz 4096, inosz 512, v2 dirs)

    ***

## Mounting the Filesystem

Next, create a mount point and mount the new filesystem:

1.  Create a directory (e.g., "ebsdemo") and mount the device:

    Code:

    ***

    sudo mkdir /ebsdemo sudo mount /dev/xvdf /ebsdemo

    ***

2.  Confirm the mount by checking the disk usage:

    Code:

    ***

    df -k

    ***

    Example output:

    Code:

    ***

    Filesystem 1K-blocks Used Available Use% Mounted on devtmpfs 4096 0 4096 0% /dev tmpfs 486092 0 486092 0% /dev/shm tmpfs 191596 2844 191596 2% /run /dev/xvda1 8310764 1561336 6749428 19% / tmpfs 486096 0 486096 0% /tmp tmpfs 97216 0 97216 0% /run/user/1000 /dev/xvdf 10420224 105704 10314520 2% /ebsdemo

    ***

> [!important]
> **Temporary Mount Warning**
>
> The above mount is temporary. After a reboot, you'll need to update your `/etc/fstab` file to automate the mounting process.

### Configuring /etc/fstab for Persistence

To automatically remount the EBS volume on reboot:

1.  Retrieve the unique UUID of the volume:

    Code:

    ***

    sudo blkid

    ***

    Look for the entry corresponding to `/dev/xvdf`. An example output:

    Code:

    ***

    /dev/xvdf: UUID="04fddc8e-3441-4518-986c-a32254c0e925" BLOCK_SIZE="512" TYPE="xfs"

    ***

2.  Edit the `/etc/fstab` file to add the new entry:

    Code:

    ***

    sudo vi /etc/fstab

    ***

3.  Append a new line (do not modify existing entries) similar to the following:

    Code:

    ***

    UUID=78de5e87-1c4f-4c4a-abba-d469bbc45143 / xfs defaults,noatime 1 1 UUID=2594-F04B /boot/efi vfat defaults,noatime,uid=0,gid=0,umask=0077,shortname=winnt,x-systemd.automount 0 2 UUID=04fddc8e-3441-4518-986c-a32254c0e925 /ebsdemo xfs defaults,nofail

    ***

4.  Save, exit the editor, and then test the configuration without rebooting:

    Code:

    ***

    sudo mount -a

    ***

5.  Confirm the volume is properly mounted:

    Code:

    ***

    df -k

    ***

## Testing the EBS Volume

Validate that the volume is functioning correctly:

1.  Change to the mounted directory and create a test file:

    Code:

    ***

    cd /ebsdemo sudo bash -c 'echo "I made this file on server one" > demo.txt'

    ***

2.  List the files and display the contents of the test file:

    Code:

    ***

    ls cat demo.txt

    ***

The file should show the text: "I made this file on server one".

## Detaching and Reattaching the EBS Volume to Another Instance

This section demonstrates the portability of an EBS volume between EC2 instances.

1.  **Unmount the Volume on Server One:**
    - First, ensure you are outside the mounted directory:

      Code:

      ***

      cd ~ sudo umount /ebsdemo

      ***

    - Verify the unmount using:

      Code:

      ***

      df -k

      ***

2.  **Detach the Volume via AWS Console:**
    - Navigate to the EBS volume details in the AWS Management Console.
    - Select the "demo volume", click **Actions**, and then select **Detach Volume**.

    ![The image shows an AWS EC2 dashboard displaying a list of volumes, with details about a specific volume named "demo-volume" highlighted, including its ID, type, size, and status.](https://kodekloud.com/kk-media/image/upload/v1752859616/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-1/aws-ec2-dashboard-demo-volume.jpg)

    ![The image shows an AWS EC2 management console with a pop-up confirmation dialog asking if the user wants to detach a specific volume. The dialog provides information about potential charges for detached volumes and offers "Cancel" and "Detach" options.](https://kodekloud.com/kk-media/image/upload/v1752859617/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-1/aws-ec2-detach-volume-dialog.jpg)

3.  **Attach the Volume to Server Two:**
    - Once detached, select **Attach Volume** and choose server two. Ensure server two is in the same Availability Zone.
    - Log in to server two and verify the volume attachment by running:

      Code:

      ***

      lsblk

      ***

    - Confirm the presence of the XFS filesystem:

      Code:

      ***

      sudo file -s /dev/xvdf

      ***

4.  **Mount the Filesystem on Server Two:**
    - Create the mount point and mount the volume:

      Code:

      ***

      sudo mkdir /ebsdemo sudo mount /dev/xvdf /ebsdemo

      ***

    - Change into the directory, list the files, and display the test file content:

      Code:

      ***

      cd /ebsdemo ls cat demo.txt

      ***

The output should display "I made this file on server one", confirming that the data has traveled with the volume.

## Conclusion

This lesson has guided you through creating, attaching, formatting, and mounting an EBS volume on an EC2 instance, followed by safely detaching it and reattaching it to a different instance. This approach is beneficial for maintenance, data migration, and ensuring data recovery during infrastructure changes.

In the next part of this guide, we will discuss how to move an EBS volume to an EC2 instance in a different Availability Zone.

For further reading on AWS storage solutions, explore the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/29905cc0-1285-4deb-a4f5-67f71ebcb859)**
>
> Watch video content
