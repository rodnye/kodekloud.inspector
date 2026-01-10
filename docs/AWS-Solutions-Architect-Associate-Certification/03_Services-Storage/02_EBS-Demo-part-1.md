# EBS Demo part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/EBS-Demo-part-1)

---

## Table of Contents

- EBS Demo part 1
  - Creating and Attaching an EBS Volume
  - Verifying and Formatting the Volume on Server One
  - Mounting the Filesystem
  - Updating /etc/fstab for Persistent Mounting
  - Testing the Mount with File Operations
  - Detaching and Re-Attaching the EBS Volume
  - Verifying the Volume on Server Two
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# EBS Demo part 1

In this lesson, you will learn how to work with Elastic Block Store (EBS) volumes in AWS. We will cover the process of creating an EBS volume in a specific Availability Zone, attaching it to an EC2 instance, verifying and formatting the volume, mounting it, and eventually detaching it so it can be reattached to another instance—all while ensuring that the volume remains in the same Availability Zone as the target instance.

Before starting, note that several EC2 instances have already been pre-configured. Servers one through three are deployed in the US East (N. Virginia) region, though they span different Availability Zones. Servers one and two reside in the same zone, while server three is located in a different zone. Server four is in an entirely separate region. This setup demonstrates that for an EBS volume to be movable between instances, both the volume and the target instance must reside within the same Availability Zone.

---

## Creating and Attaching an EBS Volume

Switch your AWS console to the US East 1 region and follow these steps to create an EBS volume for server one:

1.  Identify the Availability Zone of server one (for example, US East 1a).
2.  Navigate to the Volumes page on the AWS console and create a new volume:
    - Choose the desired volume type (default is GP2).
    - Set the volume size (we will use 10 GB for this demo).
    - Ensure the volume is created in the same Availability Zone as server one.
    - Leave encryption disabled for this demonstration.

Once created, the volume's status will be "available."

![The image shows an AWS EC2 dashboard displaying a list of Elastic Block Store (EBS) volumes, with details about a specific volume highlighted, including its ID, size, type, and status.](https://kodekloud.com/kk-media/image/upload/v1752865948/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS-Demo-part-1/aws-ec2-dashboard-ebs-volumes.jpg)

You may assign a descriptive name to the volume—such as "demo volume." After naming it, select **Actions** and choose **Attach Volume**. The console will display EC2 instances in the same Availability Zone (server one and server two). Select server one and note that the device is designated as `/dev/sdf`. On newer Linux kernels, this device might be automatically renamed (for example, to `/dev/xvdf`).

![The image shows an AWS EC2 interface for attaching a volume to an instance, with options to select the instance and device name.](https://kodekloud.com/kk-media/image/upload/v1752865950/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS-Demo-part-1/aws-ec2-attach-volume-interface.jpg)

After confirming the attachment, the volume becomes connected to the selected instance.

---

## Verifying and Formatting the Volume on Server One

1.  Open a terminal connected to server one.
2.  List the block devices using:

    ```
    lsblk
    ```

    You should see the root device (commonly listed as `xvda`) and the new 10 GB device (likely listed as `xvdf`).

3.  Verify if a filesystem exists on the new device with:

    ```
    sudo file -s /dev/xvdf
    ```

    If the output shows `data`, no filesystem exists yet, which is expected.

4.  Create an XFS filesystem on the device:

    ```
    sudo mkfs -t xfs /dev/xvdf
    ```

5.  Verify that the filesystem has been created successfully by running:

    ```
    sudo file -s /dev/xvdf
    ```

    The expected output should mention "SGI XFS filesystem data (blksz 4096, inosz 512, v2 dirs)."

Below is a sample terminal session demonstrating these steps:

```
$ lsblk
NAME     MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
xvda     202:0    0     8G  0 disk
├─xvda1  202:1    0     8G  0 part /
├─xvda127 259:0   0     1M  0 part
├─xvda128 259:1   0    10M  0 part
xvdf     202:80   0    10G  0 disk


$ sudo file -s /dev/xvdf
/dev/xvdf: data


$ sudo mkfs -t xfs /dev/xvdf
meta-data=/dev/xvdf              isize=512  agcount=4, agsize=655360 blks
         =                     sectsz=512  attr=2, projid32bit=1
         =                      finobt=1, sparse=1, rmapbt=0
data     =                       bsize=4096  blocks=2621440, imaxpct=25
         =                      sunid=0 blks
naming   =                    version 2
log      =              internal log     bsize=4096  blocks=16384, version=2
realtime =                      none    extsz=4096  blocks=0, rtexts=0


$ sudo file -s /dev/xvdf
/dev/xvdf: SGI XFS filesystem data (blksz 4096, inosz 512, v2 dirs)
```

---

## Mounting the Filesystem

> [!important]
> **Temporary Mount**
>
> The mount operation demonstrated below is temporary. If the instance is rebooted, the mount will be lost unless it is added to `/etc/fstab` for persistence.

1.  Create a directory to serve as the mount point (for this demo, we will use `/ebsdemo`):

    ```
    sudo mkdir /ebsdemo
    sudo mount /dev/xvdf /ebsdemo
    ```

2.  Confirm the mount with the command:

    ```
    df -k
    ```

This output confirms that `/dev/xvdf` is mounted at `/ebsdemo`.

---

## Updating /etc/fstab for Persistent Mounting

To ensure the volume stays mounted across reboots, follow these steps:

1.  Retrieve the UUID of the EBS volume:

    ```
    sudo blkid
    ```

    Look for the entry corresponding to `/dev/xvdf`. For example, you might see:

    ```
    /dev/xvdf: UUID="04fdc8e-3441-4518-986c-a32254c0e925" TYPE="xfs"
    ```

2.  Edit the `/etc/fstab` file:

    ```
    sudo vi /etc/fstab
    ```

3.  Add the following line to the file, making sure to replace the UUID with your own:

    ```
    UUID=04fdc8e-3441-4518-986c-a32254c0e925  /ebsdemo  xfs  defaults,nofail  0  0
    ```

4.  To apply the changes without rebooting, run:

    ```
    sudo mount -a
    ```

5.  Verify the mount and the volume’s UUID:

    ```
    df -k
    sudo blkid
    ```

---

## Testing the Mount with File Operations

To confirm that the EBS volume is working correctly:

1.  Change to the mount directory and create a test file:

    ```
    cd /ebsdemo/
    echo "I made this file on server1" | sudo tee demo.txt
    sudo vi demo.txt  # (Edit the file as needed)
    ls -l demo.txt
    ```

2.  This confirms write access to the volume, ensuring that the data is stored on the EBS volume rather than on the instance’s root storage.

---

## Detaching and Re-Attaching the EBS Volume

To demonstrate the detachable nature of an EBS volume, perform these steps:

1.  Unmount the EBS volume from server one:

    ```
    cd ~
    sudo umount /ebsdemo
    ```

    Verify the unmount by running:

    ```
    df -k
    ```

    The `/ebsdemo` mount point should no longer be listed.

2.  In the AWS console, navigate to the list of EBS volumes. Select the volume, then choose **Actions** > **Detach Volume**.

    ![The image shows an AWS EC2 dashboard displaying a list of Elastic Block Store (EBS) volumes, with details of a selected volume named "demo-volume" highlighted.](https://kodekloud.com/kk-media/image/upload/v1752865952/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS-Demo-part-1/aws-ec2-ebs-volumes-dashboard.jpg)

    Confirm the detachment using the dialog provided:

    ![The image shows an AWS EC2 management console with a pop-up confirmation dialog asking if the user wants to detach a specific volume. The interface includes options for managing instances, images, and network security.](https://kodekloud.com/kk-media/image/upload/v1752865954/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS-Demo-part-1/aws-ec2-detach-volume-dialog.jpg)

3.  Reattach the volume to server two by selecting **Attach Volume** from the **Actions** menu and specifying server two as the target.

---

## Verifying the Volume on Server Two

On server two, perform the following steps to ensure that the reattached volume is functioning as expected:

1.  Check the list of block devices:

    ```
    lsblk
    sudo file -s /dev/xvdf
    ```

    The device `/dev/xvdf` should still show the SGI XFS filesystem.

2.  Create the mount point and mount the volume:

    ```
    sudo mkdir /ebsdemo
    sudo mount /dev/xvdf /ebsdemo
    ```

3.  Navigate to the mount directory, list its contents, and check the test file:

    ```
    cd /ebsdemo/
    ls
    cat demo.txt
    ```

If the file `demo.txt` exists and displays the expected content ("I made this file on server1"), the persistent data has been successfully preserved on the EBS volume independently of a particular EC2 instance.

---

## Conclusion

This demonstration has shown you how to create, attach, verify, format, and mount an EBS volume in AWS. It also illustrated how to detach an EBS volume from one instance and reattach it to another, all while ensuring that the volume remains in the correct Availability Zone. These techniques are essential for maintenance and migration tasks without risking data loss.

In the next lesson, we will explore how to move an EBS volume to an EC2 instance located in another Availability Zone.

---

For more information on AWS and EBS, you can refer to the [official AWS documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/c2f9f64f-5d00-4580-b39c-acb334e81446)**
>
> Watch video content
