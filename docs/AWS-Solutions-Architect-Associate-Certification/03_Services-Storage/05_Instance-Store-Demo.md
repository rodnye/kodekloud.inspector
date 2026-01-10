# Instance Store Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/Instance-Store-Demo)

---

## Table of Contents

- Instance Store Demo
  - Launching an Instance with an Instance Store
  - Connecting and Configuring the Instance Store
  - Demonstrating the Ephemeral Nature of Instance Store Data
  - Conclusion
  - Quick Reference Table
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# Instance Store Demo

In this article, we demonstrate how to work with instance store volumes on AWS EC2. Remember that instance store data is temporary—if your EC2 instance moves from one physical host to another, the instance store is replaced with a new, empty volume. Therefore, use instance stores only for temporary or scratch data that does not need to persist.

## Launching an Instance with an Instance Store

To begin, navigate to the EC2 console and launch a new instance. For this demonstration, name your instance "instance store demo" and select the Amazon Linux 64-bit AMI. Note that not all EC2 instance types support instance stores; for example, t2.micro and other free tier instances lack instance store volumes. Select an instance type that includes instance store support—even if it comes at a small cost for this short demo.

After choosing an appropriate instance type, select any key pair of your preference.

![The image shows an AWS EC2 instance launch configuration screen, where a user is selecting a key pair and reviewing instance details like type, security group, and storage.](https://example.com/images/AWS-Solutions-Architect-Associate-Certification-Instance-Store-Demo/aws-ec2-instance-launch-configuration.jpg)

Review the configuration details. You will notice that the default root volume is 8 GB, and further down, you will see an instance store volume (approximately 75 GB, reported as 69.8 GB). The device name for the instance store is typically something like `/dev/nvme0n1` or `/dev/nvme1n1`. Also, ensure that "Auto-assign Public IP" is enabled so you can easily connect to your instance.

Once your instance is deployed, return to the EC2 console's instance tab. You should now see the instance with its assigned public IP.

![The image shows an AWS EC2 dashboard indicating the successful launch of an instance, with options for next steps like creating billing alerts, connecting to the instance, and managing monitoring.](https://example.com/images/AWS-Solutions-Architect-Associate-Certification-Instance-Store-Demo/aws-ec2-dashboard-instance-launch.jpg)

## Connecting and Configuring the Instance Store

After noting the public IP, SSH into your instance. Once connected, run the following command to verify the block devices:

```
lsblk
```

You'll see output similar to:

```
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
nvme1n1    259:0    0  69.8G  0 disk
nvme0n1    259:1    0    8G  0 disk
├─nvme0n1p1 259:2    0    8G  0 part /
└─nvme0n1p128 259:4    0   10M  0 part
```

Here, `nvme0n1` is your root volume (with partition `nvme0n1p1` mounted as `/`), and `nvme1n1` is the instance store volume.

Verify if a file system exists on the instance store volume by running:

```
sudo file -s /dev/nvme1n1
```

If the output shows "data," no file system exists. Create an XFS file system on the volume as follows:

```
sudo mkfs -t xfs /dev/nvme1n1
```

Then, validate the file system creation by running:

```
sudo file -s /dev/nvme1n1
```

You should now see that an SGI XFS filesystem is present on the device.

Next, create a directory to serve as the mount point and mount the instance store with these commands:

```
sudo mkdir /instance-demo
sudo mount /dev/nvme1n1 /instance-demo/
```

Confirm that the volume is mounted by executing:

```
df -k
```

Now, navigate into the mount directory and create a test file to verify that data is being written to the instance store:

```
cd /instance-demo
echo "test" | sudo tee test
```

The file "test" is now stored on your instance store volume.

> [!important]
> **Tip**
>
> Keep in mind that the instance store is optimized for fast, temporary storage. It is ideal for cache, buffers, or temporary files, but not for data that requires persistence.

## Demonstrating the Ephemeral Nature of Instance Store Data

Data on an instance store is ephemeral. A simple reboot will not change the physical host, so your instance store volume and its data remain intact. You can verify this by rebooting the instance from the EC2 console (right-click the instance and select "Reboot"). After the reboot, the public IP address will remain the same.

![The image shows an AWS EC2 management console with two running instances, displaying details such as instance ID, type, state, and IP addresses.](https://example.com/images/AWS-Solutions-Architect-Associate-Certification-Instance-Store-Demo/aws-ec2-management-console-instances.jpg)

However, when you stop and then start your instance, it is relocated to a different physical host. This process replaces the instance store with a new, empty volume. To observe this behavior:

1.  Record the current public IP address.
2.  Stop the instance using the EC2 console.
3.  Wait a few minutes, then start the instance again.

![The image shows an AWS EC2 management console with a pop-up window asking for confirmation to stop an instance. The user is prompted to click "Stop" to proceed.](https://example.com/images/AWS-Solutions-Architect-Associate-Certification-Instance-Store-Demo/aws-ec2-stop-instance-confirmation.jpg)

After the instance restarts, note the change in the public IP address, which confirms it now runs on a different physical host. SSH into the instance again and run:

```
lsblk
```

You will notice the instance store volume (`nvme1n1`) is still present. However, if you check the file system with:

```
sudo file -s /dev/nvme1n1
```

and list the contents of `/instance-demo`, you will find that the test file created earlier is missing. This confirms that data from the previous instance store has been lost due to the instance migration.

> [!important]
> **Warning**
>
> Do not use instance stores for storing critical data. Always rely on persistent storage solutions like Amazon EBS for data that must be retained.

## Conclusion

This article illustrates that instance store volumes on AWS EC2 are temporary. While a simple reboot preserves the data, stopping and starting the instance moves it to a different physical host and clears the instance store. For AWS environments, it’s crucial to use instance stores only for temporary data needs.

Happy learning, and see you in the next article!

## Quick Reference Table

| Command/Action                            | Description                                          |
| ----------------------------------------- | ---------------------------------------------------- |
| `lsblk`                                   | List block devices                                   |
| `sudo file -s /dev/nvme1n1`               | Check for a file system on the instance store volume |
| `sudo mkfs -t xfs /dev/nvme1n1`           | Create an XFS file system on the instance store      |
| `sudo mkdir /instance-demo`               | Create a mount directory                             |
| `sudo mount /dev/nvme1n1 /instance-demo/` | Mount the instance store                             |
| `df -k`                                   | Confirm the mount status                             |
| \\`echo "test"                            | sudo tee test\\`                                     |

For more information on AWS EC2, please refer to the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/e93d502e-fd32-4b40-b0ad-e6e52ef335b2)**
>
> Watch video content
