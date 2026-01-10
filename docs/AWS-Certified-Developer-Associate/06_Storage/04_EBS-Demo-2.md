# EBS Demo 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/EBS-Demo-2)

---

## Table of Contents

- EBS Demo 2
  - 1. Unmounting the EBS Volume
  - 2. Creating a Snapshot and Moving to a New Availability Zone
  - 3. Verifying the Cloned Volume on Server Three
  - 4. Moving the EBS Volume Across Regions
  - 5. Verifying the Volume on Server Four
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified Developer - Associate

Storage

# EBS Demo 2

Welcome to the second installment of our EBS management series. In this guide, we demonstrate how to move an Amazon Elastic Block Store (EBS) volume between EC2 instances. You'll first see how to transfer a volume while the instances reside in the same Availability Zone, then learn how to migrate the volume to a different Availability Zone, and finally, how to copy the volume across regions.

In a previous lesson, we moved an EBS volume from one instance to another within the same Availability Zone. Now, we will attach the same EBS volume to Server Three in a different Availability Zone (us-east-1b).

![The image shows an AWS EC2 management console with details of running instances, including instance IDs, types, status checks, and IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752859618/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-2/aws-ec2-management-console-instances.jpg)

---

## 1\. Unmounting the EBS Volume

Before detaching the EBS volume from its current instance, you must unmount it. Run the following command on your instance to unmount the volume (note that the correct command is "umount" rather than "unmount"):

```
sudo umount /ebsdemo
```

After unmounting, verify that no file system is actively mounted by using:

```
df -k
```

The console output below displays the block devices and confirms that the filesystem on `/dev/xvdf` (formatted with XFS) is ready for detachment:

```
ec2-user@ip-10-0-13-253 ~/ $ lsblk
NAME      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
xvda      202:0    0     8G  0 disk
├─xvda1   202:1    0     8G  0 part /
├─xvda127 259:0    0    10M  0 part
└─xvdf   202:80   0    10G  0 disk


ec2-user@ip-10-0-13-253 ~/ $ sudo file -s /dev/xvdf
/dev/xvdf: SGI XFS filesystem data (blksz 4096, inosz 512, v2 dirs)


ec2-user@ip-10-0-13-253 ~/ $ sudo mkdir /ebsdemo
ec2-user@ip-10-0-13-253 ~/ $ sudo mount /dev/xvdf /ebsdemo
ec2-user@ip-10-0-13-253 ~/ebsdemo $ ls
demo.txt


ec2-user@ip-10-0-13-253 ~/ebsdemo $ cat demo.txt
I made this on server


ec2-user@ip-10-0-13-253 ~/ebsdemo $ cd ..
ec2-user@ip-10-0-13-253 ~/ $ sudo umount /ebsdemo
ec2-user@ip-10-0-13-253 ~/ $ df -h
Filesystem      1K-blocks     Used Available Use% Mounted on
devtmpfs            4096        0      4096   0% /dev
tmpfs             486092        0    486092   0% /dev/shm
tmpfs             1915464    2844   1912620   2% /run
/dev/xvda1       256132    6749420 19% /
tmpfs             486096        0    486096   0% /tmp
tmpfs              97216        0     97216   0% /run/user/1000


ec2-user@ip-10-0-13-253 ~/ $
```

After unmounting, refresh your AWS console. Go to the EBS volumes section, select the volume, and detach it. Continue refreshing the console until the volume state changes from "in use" to "available." Now, attempt to attach the volume to Server Three. Because Server Three is in a different Availability Zone (us-east-1b), it won't appear in the available selection list.

![The image shows an AWS EC2 interface for attaching a volume to an instance, with options to select the instance and availability zone.](https://kodekloud.com/kk-media/image/upload/v1752859621/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-2/aws-ec2-attach-volume-interface.jpg)

---

## 2\. Creating a Snapshot and Moving to a New Availability Zone

To move the volume to a different Availability Zone, create a snapshot:

1.  Select the volume.
2.  Choose **Create Snapshot**.
3.  Optionally, provide a description (e.g., "my snapshot") and review the snapshot details.

![The image shows an Amazon Web Services (AWS) interface for creating a snapshot of an EBS volume. It includes fields for volume ID, description, encryption, and tags, with a "Create snapshot" button.](https://kodekloud.com/kk-media/image/upload/v1752859623/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-2/aws-ebs-snapshot-interface.jpg)

After initiating the snapshot, wait until its status shows as "available" (it may initially display as 7% complete). Navigate to the snapshots list to monitor its progress.

![The image shows an AWS EC2 console displaying a list of EBS snapshots with details such as snapshot ID, volume size, and status. The selected snapshot has a size of 10 GiB and is marked as completed.](https://kodekloud.com/kk-media/image/upload/v1752859624/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-2/aws-ec2-ebs-snapshots-list.jpg)

Next, use the snapshot to create a new volume in the desired Availability Zone (us-east-1b):

1.  Select the snapshot.
2.  Click on **Actions** and choose **Create Volume from Snapshot**.
3.  Adjust specifications (volume type or size) if necessary, ensuring the Availability Zone is set to **us-east-1b**.
4.  Optionally, add a tag such as **Name: EBS clone**.
5.  Create the new volume.

![The image shows a screenshot of AWS volume settings, including options for volume type, size, IOPS, throughput, availability zone, and encryption.](https://kodekloud.com/kk-media/image/upload/v1752859625/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-2/aws-volume-settings-screenshot.jpg)

Once the new volume (EBS clone) is available in **us-east-1b**, attach it to Server Three:

1.  Select the cloned volume.
2.  Go to **Actions** > **Attach Volume**.
3.  Attach the volume to Server Three.

![The image shows an AWS EC2 dashboard displaying a list of volumes with details such as IOPS, throughput, snapshot, creation date, availability zone, volume state, alarm status, and attached instances. The sidebar includes options for managing instances, images, and elastic block storage.](https://kodekloud.com/kk-media/image/upload/v1752859626/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-2/aws-ec2-dashboard-volumes-details.jpg)

![The image shows an AWS EC2 interface for attaching a volume to an instance, with options to select the instance and device name. There is a button labeled "Attach volume" at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752859627/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-2/aws-ec2-attach-volume-interface-2.jpg)

---

## 3\. Verifying the Cloned Volume on Server Three

Log in to Server Three and verify that the block device is attached by running:

```
lsblk
```

An entry for `/dev/xvdf` should be visible. To confirm the file system, use:

```
sudo file -s /dev/xvdf
```

The output will indicate that an XFS filesystem is present on the volume. Next, mount the volume by creating a directory and executing the mount command:

```
sudo mkdir /ebsdemo
sudo mount /dev/xvdf /ebsdemo
cd /ebsdemo/
cat demo.txt
```

The content of `demo.txt` confirms that the original data is available:

```
[ec2-user@ip-10-0-20-104 ~]$ lsblk
NAME      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
xvda      202:0    0    8G  0 disk
├─xvda1   202:1    0    8G  0 part /
├─xvda127 259:0    0    1M  0 part
└─xvda128 259:1    0   10M  0 part
xvdf      202:80   0   10G  0 disk


[ec2-user@ip-10-0-20-104 ~]$ sudo file -s /dev/xvdf
/dev/xvdf: SGI XFS filesystem data (blksz 4096, inosz 512, v2 dirs)


[ec2-user@ip-10-0-20-104 ~]$ sudo mkdir /ebsdemo
[ec2-user@ip-10-0-20-104 ~]$ sudo mount /dev/xvdf /ebsdemo
[ec2-user@ip-10-0-20-104 ~]$ cd /ebsdemo/
[ec2-user@ip-10-0-20-104 ebsdemo]$ cat demo.txt
I made this on server
[ec2-user@ip-10-0-20-104 ebsdemo]$
```

---

## 4\. Moving the EBS Volume Across Regions

If your goal is to attach the same block storage to an EC2 instance in a different region (for example, from Northern Virginia to Ohio), you cannot directly create a volume from a snapshot in another region. Instead, copy the snapshot to the target region by following these steps:

1.  In your snapshots view, locate and select the desired snapshot.
2.  Click **Copy Snapshot**.
3.  Provide a description (e.g., "copy of my snapshot") and choose the destination region (for example, US East 2 for Ohio).
4.  Complete the copy process.

![The image shows an AWS interface for copying a snapshot, with a dropdown menu listing various AWS regions. There are options for encryption and adding tags.](https://kodekloud.com/kk-media/image/upload/v1752859628/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-2/aws-snapshot-copy-interface.jpg)

Once the snapshot copy is complete, navigate to the snapshots view in the destination region (US East 2) to verify its presence.

![The image shows an AWS EC2 console displaying a list of snapshots, with details such as snapshot ID, volume size, description, storage tier, and status. A green notification at the top indicates a successful snapshot copy creation.](https://kodekloud.com/kk-media/image/upload/v1752859630/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-2/aws-ec2-snapshots-console-details.jpg)

Create a volume from the copied snapshot by:

1.  Selecting the copied snapshot.
2.  Choosing **Create Volume from Snapshot**.
3.  Setting the Availability Zone (for example, us-east-2a).
4.  Once created, attach the new volume to Server Four.

![The image shows an AWS EC2 dashboard displaying a list of volumes with details such as volume ID, type, size, IOPS, throughput, and snapshot information.](https://kodekloud.com/kk-media/image/upload/v1752859630/notes-assets/images/AWS-Certified-Developer-Associate-EBS-Demo-2/aws-ec2-dashboard-volumes-details-2.jpg)

---

## 5\. Verifying the Volume on Server Four

After attaching the volume to Server Four, verify its status and data integrity by opening a terminal on Server Four and executing the following commands:

```
lsblk
sudo file -s /dev/xvdf
sudo mkdir /ebsdemo
sudo mount /dev/xvdf /ebsdemo
cd /ebsdemo/
cat demo.txt
```

The `demo.txt` file should display:

```
I made this on server
```

A sample output for the block device may appear as:

```
[ec2-user@ip-172-31-4-213 ~]$ lsblk
NAME      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
xvda      202:0    0    8G  0 disk
├─xvda1   202:1    0    8G  0 part
├─xvda127  259:0   0    1M  0 part
└─xvda128  259:1   0   10G  0 part
xvdf      202:80   0   10G  0 disk
```

Verify the filesystem:

```
[ec2-user@ip-172-31-4-213 ~]$ sudo file -s /dev/xvdf
/dev/xvdf: SGI XFS filesystem data (blksz 4096, inosz 512, v2 dirs)
```

Finally, mount the volume and check its contents:

```
[ec2-user@ip-172-31-4-213 ~]$ sudo mkdir /ebsdemo
[ec2-user@ip-172-31-4-213 ~]$ sudo mount /dev/xvdf /ebsdemo
[ec2-user@ip-172-31-4-213 ~]$ cd /ebsdemo/
[ec2-user@ip-172-31-4-213 ebsdemo]$ cat demo.txt
I made this on server
```

Below is a recap of the validation commands on Server Four:

```
[ec2-user@ip-172-31-4-213 ~]$ lsblk
NAME      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
xvda      202:0    0    8G  0 disk
├─xvda1   202:1    0    8G  0 part
├─xvda127  259:0    0    1M  0 part
└─xvda128  259:1    0   10G  0 part
xvdf      202:80   0   10G  0 disk


[ec2-user@ip-172-31-4-213 ~]$ sudo file -s /dev/xvdf
/dev/xvdf: SGI XFS filesystem data (blksz 4096, inosz 512, v2 dirs)


[ec2-user@ip-172-31-4-213 ~]$ sudo mkdir /ebsdemo
[ec2-user@ip-172-31-4-213 ~]$ sudo mount /dev/xvdf /ebsdemo
[ec2-user@ip-172-31-4-213 ~]$ cd /ebsdemo/
[ec2-user@ip-172-31-4-213 ebsdemo]$ cat demo.txt
I made this on server
```

---

> [!important]
> **Summary**
>
> This guide demonstrates:
>
> - How to move an EBS volume between instances in the same Availability Zone.
> - How to create a snapshot and use it to transfer data to an instance in a different Availability Zone.
> - How to copy a snapshot across regions and create a volume from it.

Thank you for following along. We hope this article improves your efficiency in managing EBS volumes within AWS. For additional reading, refer to the [AWS Documentation](https://docs.aws.amazon.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/8a25c814-3ea4-472b-b1a3-6afba121a780)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/eda52b3c-5181-4d4b-8ca1-431d0c4c8aef)**
>
> Practice lab
