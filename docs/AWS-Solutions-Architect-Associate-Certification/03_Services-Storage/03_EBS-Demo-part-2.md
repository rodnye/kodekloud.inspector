# EBS Demo part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/EBS-Demo-part-2)

---

## Table of Contents

- EBS Demo part 2
  - Unmounting the Volume
  - Detaching and Moving the Volume
  - Creating a New Volume in a Different Availability Zone
  - Verifying on Server Three
  - Moving Volumes Across Regions
  - Watch Video
  - Practice Lab
    - Creating a Snapshot to Overcome Availability Zone Limitations

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# EBS Demo part 2

Welcome back to the second part of our EBS demo. In this lesson, you'll learn how to transfer an EBS volume between servers—first within the same availability zone and then across different availability zones.

Previously, we moved our EBS volume from Server One to Server Two seamlessly because both resided in the same availability zone. Since an EBS volume is zonal, it can be attached to any EC2 instance within its current zone. Now, we'll move the EBS volume to Server Three, which is located in a different availability zone (us-east-1b).

> [!important]
> **Pro Tip**
>
> Before moving volumes, always ensure that any active file systems are unmounted to avoid data corruption.

## Unmounting the Volume

On the current server where the volume is in use, unmount it by executing:

```
sudo umount /ebsdemo
```

After unmounting, verify that no file systems are mounted by listing block devices:

```
lsblk
```

Expected output:

| NAME      | MAJ:MIN | RM  | SIZE | RO  | TYPE | MOUNTPOINTS |
| --------- | ------- | --- | ---- | --- | ---- | ----------- |
| xvda      | 202:0   | 0   | 8G   | 0   | disk |             |
| ├─xvda1   | 202:1   | 0   | 8G   | 0   | part | /           |
| ├─xvda2   | 259:0   | 0   | 0    | 0   | part |             |
| └─xvda128 | 259:1   | 0   | 10M  | 0   | part |             |
| xvdf      | 202:80  | 0   | 10G  | 0   | disk |             |

Verify the file system type on the volume:

```
sudo file -s /dev/xvdf
```

You should see output similar to:

/dev/xvdf: SGI XFS filesystem data (blksz 4096, inosz 512, v2 dirs)

Next, create a mount point and mount the volume to verify the data inside:

```
sudo mkdir /ebsdemo
sudo mount /dev/xvdf /ebsdemo
cd /ebsdemo
ls
cat demo.txt
```

The file "demo.txt" should display:

I made this on server

Finally, unmount the volume again:

```
cd ..
sudo umount /ebsdemo
```

Confirm that the volume is not mounted by checking:

```
df -k
```

## Detaching and Moving the Volume

With the volume unmounted, log into your AWS console and navigate to the EBS Volumes section. Select the volume, and ensure it is detached or in the process of detaching. Wait until its status changes to "available." Refresh the page if necessary.

![The image shows an AWS EC2 dashboard displaying a list of Elastic Block Store (EBS) volumes, with details about a selected volume named "demo-volume." Options for managing the volume are visible in a dropdown menu.](https://kodekloud.com/kk-media/image/upload/v1752865955/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS-Demo-part-2/aws-ec2-ebs-volumes-dashboard.jpg)

Next, click the "Attach volume" button to try attaching the volume to Server Three. Note that only servers in the same availability zone (Server One and Server Two) will appear in the instance selection dropdown.

![The image shows an AWS EC2 interface for attaching a volume to an instance, with options to select an instance from a dropdown menu.](https://kodekloud.com/kk-media/image/upload/v1752865957/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS-Demo-part-2/aws-ec2-attach-volume-interface.jpg)

### Creating a Snapshot to Overcome Availability Zone Limitations

Because you cannot directly attach an EBS volume to an instance in a different availability zone, the solution is to create a snapshot of your volume. Follow these steps:

1.  Select the volume.
2.  Choose "Actions" > "Create snapshot."
3.  (Optional) Add a description (e.g., “my snapshot”) and confirm.

Creating a snapshot produces an exact copy of your volume's data.

![The image shows an AWS interface for creating a snapshot of an Amazon EBS volume, with fields for volume ID, description, encryption, and tags. A button labeled "Create snapshot" is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752865958/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS-Demo-part-2/aws-ebs-snapshot-interface.jpg)

Monitor the snapshot’s progress in the Snapshots section. It may initially show a status like "pending" or a progress percentage until it turns "available."

![The image shows an AWS EC2 console displaying a list of EBS snapshots with details such as snapshot ID, volume size, description, storage tier, and status. One snapshot is pending, while others are completed.](https://kodekloud.com/kk-media/image/upload/v1752865959/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS-Demo-part-2/aws-ec2-ebs-snapshots-list.jpg)

## Creating a New Volume in a Different Availability Zone

Once the snapshot is available, follow these steps to create a new volume in the target availability zone:

1.  Select the snapshot.
2.  From the "Actions" dropdown, choose "Create volume from snapshot."
3.  Change the availability zone to the target zone (e.g., US East 1B for Server Three). You can adjust volume type, size, and other settings as needed.
4.  (Optional) Add tags (for example, name the volume "EBS clone").

![The image shows a screenshot of AWS volume settings, including options for volume type, size, IOPS, throughput, availability zone, and encryption.](https://kodekloud.com/kk-media/image/upload/v1752865960/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS-Demo-part-2/aws-volume-settings-screenshot.jpg)

After creating the new volume, confirm in the Volumes section that the clone appears in the correct availability zone.

![The image shows an AWS EC2 dashboard displaying a list of volumes with details such as throughput, snapshot, creation date, availability zone, volume state, alarm status, and attached instances. The sidebar includes navigation options for various EC2 and Elastic Block Store features.](https://kodekloud.com/kk-media/image/upload/v1752865961/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS-Demo-part-2/aws-ec2-dashboard-volumes-details.jpg)

Now, attach the new volume to Server Three:

![The image shows an AWS EC2 interface for attaching a volume to an instance, with options to select the instance and device name. There is a button to "Attach volume" at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752865963/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS-Demo-part-2/aws-ec2-attach-volume-interface-2.jpg)

## Verifying on Server Three

Log into Server Three via your terminal and run the following commands to verify that the block device is attached and to confirm the file system:

```
lsblk
```

Expected output should look similar to this:

| NAME      | MAJ:MIN | RM  | SIZE | RO  | TYPE | MOUNTPOINTS |
| --------- | ------- | --- | ---- | --- | ---- | ----------- |
| xvda      | 202:0   | 0   | 8G   | 0   | disk |             |
| ├─xvda1   | 202:1   | 0   | 8G   | 0   | part | /           |
| ├─xvda127 | 259:0   | 0   | 1M   | 0   | part |             |
| └─xvda128 | 259:1   | 0   | 10M  | 0   | part |             |
| xvdf      | 202:80  | 0   | 10G  | 0   | disk |             |

Check the filesystem on the new volume:

```
sudo file -s /dev/xvdf
```

Expected output:

/dev/xvdf: SGI XFS filesystem data (blksz 4096, inosz 512, v2 dirs)

Then, create the mount point and mount the volume:

```
sudo mkdir /ebsdemo
sudo mount /dev/xvdf /ebsdemo
```

Change directory to the mount point and verify the transferred data:

```
cd /ebsdemo/
ls
cat demo.txt
```

The file "demo.txt" should display:

I made this on server

This confirms that the original volume's data has been successfully cloned and attached to Server Three in a different availability zone.

## Moving Volumes Across Regions

If you need to migrate the volume to a completely different AWS region (for example, from Northern Virginia to Ohio), you cannot directly create a volume from a snapshot in another region. Instead, you must:

1.  Copy the snapshot from the original region to the desired region.
2.  Create a volume from the copied snapshot in the target region.

To copy the snapshot:

1.  Select the snapshot.
2.  Click "Actions" and select "Copy snapshot."
3.  Provide a description such as “copy of my snapshot.”
4.  Specify the destination region (e.g., US East 2 for Ohio).

![The image shows an AWS interface for copying a snapshot, with fields for snapshot ID, description, destination region, and encryption options.](https://kodekloud.com/kk-media/image/upload/v1752865964/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS-Demo-part-2/aws-snapshot-copy-interface.jpg)

Once the snapshot copy is complete, switch to the target region (e.g., us-east-2), locate the snapshot in the Snapshots section, and then click "Create volume from snapshot." Choose the correct availability zone (e.g., us-east-2a) for your EC2 instance. After creation, the new volume will be available.

![The image shows an AWS EC2 dashboard displaying a list of two EBS volumes with details such as volume ID, type, size, IOPS, and availability zone.](https://kodekloud.com/kk-media/image/upload/v1752865965/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS-Demo-part-2/aws-ec2-dashboard-ebs-volumes.jpg)

Finally, attach the newly created volume to your target EC2 instance:

![The image shows an AWS EC2 interface for attaching a volume to an instance, with options to select the instance and availability zone.](https://kodekloud.com/kk-media/image/upload/v1752865966/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS-Demo-part-2/aws-ec2-attach-volume-interface-3.jpg)

This completes the process of migrating an EBS volume across different availability zones and regions.

Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/27ad7d18-5654-4cc3-af96-7f5256b21d6e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/ba93c990-3c45-4c75-9c29-e304c26adac9)**
>
> Practice lab
