# Demo Create AMI from AWS Console - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/Basics-of-EC2/Demo-Create-AMI-from-AWS-Console)

---

## Table of Contents

- Demo Create AMI from AWS Console
  - Step 1: Select Your EC2 Instance
  - Step 2: Configure AMI Settings
  - Step 3: Tag Your AMI
  - Step 4: Monitor Snapshot Creation
  - Step 5: Monitor AMI Registration
  - Step 6: View Snapshot Details
  - Step 7: Launch a New Instance from Your AMI
  - Step 8: Deregister (Delete) the AMI
  - Cleanup Recommendations
  - References
  - Watch Video
  - Practice Lab

---

## Content

Amazon Elastic Compute Cloud (EC2)

Basics of EC2

# Demo Create AMI from AWS Console

Learn how to create a reusable Amazon Machine Image (AMI) from an existing EC2 instance. An AMI captures a point-in-time snapshot of an instance—including its attached EBS volumes—for future launches or backups.

---

## Step 1: Select Your EC2 Instance

1.  Open the EC2 console at [https://console.aws.amazon.com/ec2](https://console.aws.amazon.com/ec2).
2.  In the **Instances** pane, choose the target instance.
3.  Click **Actions** → **Image and templates** → **Create image**.

![The image shows an AWS EC2 management console with a running instance named "demo," displaying details like instance ID, type, and IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752868959/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-AMI-from-AWS-Console/aws-ec2-management-console-demo-instance.jpg)

---

## Step 2: Configure AMI Settings

On the **Create Image** dialog:

- **Image name**: Enter a unique, descriptive name (e.g., `prod-webserver-ami-2024-05-01`).
- **No reboot**: Check this to avoid instance reboot during image creation.
- **Volumes**: Confirm which EBS volumes to include. Exclude transient volumes (e.g., log volumes) if you don’t need them.

> [!important]
> **Note**
>
> Skipping the reboot option may lead to file system inconsistencies. Use it only when uptime is critical.

![The image shows an AWS EC2 console screen for creating an image, with options for instance volumes, storage type, and tagging.](https://kodekloud.com/kk-media/image/upload/v1752868960/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-AMI-from-AWS-Console/aws-ec2-create-image-console.jpg)

---

## Step 3: Tag Your AMI

Adding tags simplifies automation and cleanup. Include at least these:

| Tag Key        | Example Value | Purpose                            |
| -------------- | ------------- | ---------------------------------- |
| `Name`         | `Demo`        | Human-readable identifier          |
| `InstanceName` | `demo-web-01` | Link back to original EC2 instance |

Once tags are set, click **Create image**. AWS will snapshot each volume, then register the new AMI.

---

## Step 4: Monitor Snapshot Creation

1.  In the left menu, select **Snapshots**.
2.  Locate the snapshot(s) with **Status: pending**.

![The image shows an AWS EC2 console displaying a list of snapshots, with one snapshot having a status of "Pending." The interface includes options for managing snapshots and other AWS services.](https://kodekloud.com/kk-media/image/upload/v1752868961/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-AMI-from-AWS-Console/aws-ec2-snapshots-pending-status.jpg)

---

## Step 5: Monitor AMI Registration

1.  Go to **Images** → **AMIs** in the EC2 console.
2.  Find your AMI (Status: pending).

After a few minutes, both the snapshot and AMI statuses will switch to **available**.

![The image shows an Amazon Web Services (AWS) EC2 console displaying details of an Amazon Machine Image (AMI) with ID ami-00c089143fc0b12f1, including its status, platform details, and creation date.](https://kodekloud.com/kk-media/image/upload/v1752868962/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-AMI-from-AWS-Console/aws-ec2-console-ami-details.jpg)

---

## Step 6: View Snapshot Details

Once complete, click on the snapshot ID to review its metadata, size, and status.

![The image shows an AWS EC2 console displaying details of a snapshot, including its ID, volume size, and status. The snapshot is completed and available, with additional metadata shown below.](https://kodekloud.com/kk-media/image/upload/v1752868963/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-AMI-from-AWS-Console/aws-ec2-snapshot-details-console.jpg)

---

## Step 7: Launch a New Instance from Your AMI

1.  In the AMIs list, select your custom AMI.
2.  Click **Launch instance**.
3.  Under **Application and OS Images (Amazon Machine Image)**, switch to **My AMIs** and pick yours.
4.  Continue with the standard launch workflow (instance type, networking, storage, etc.).

![The image shows an AWS EC2 console interface for launching an instance, displaying details about an Amazon Machine Image (AMI) and instance configuration options.](https://kodekloud.com/kk-media/image/upload/v1752868964/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-AMI-from-AWS-Console/aws-ec2-console-launch-instance-ami.jpg)

---

## Step 8: Deregister (Delete) the AMI

To remove an AMI:

1.  Go to **Images** → **AMIs**, select the AMI.
2.  Choose **Actions** → **Deregister AMI**.
3.  Confirm the deregistration.

> [!important]
> **Warning**
>
> Deregistering an AMI does _not_ delete its associated snapshots. Manually delete any orphaned snapshots to prevent unexpected storage charges.

![The image shows an AWS EC2 console with a pop-up window for deregistering an AMI. It includes a warning about snapshots not being automatically deleted when deregistering the AMI.](https://kodekloud.com/kk-media/image/upload/v1752868966/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-AMI-from-AWS-Console/aws-ec2-deregister-ami-warning.jpg)

---

## Cleanup Recommendations

- Implement consistent tagging conventions for automated cleanup via [AWS CLI scripts](https://docs.aws.amazon.com/cli/latest/reference/ec2/index.html#ec2).
- Schedule periodic audits to deregister unused AMIs and delete leftover snapshots.

---

## References

- [Creating an Amazon EBS-backed Linux AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/creating-an-ami-ebs.html)
- [Amazon EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [AWS CLI EC2 Commands](https://docs.aws.amazon.com/cli/latest/reference/ec2/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/6b1df5fc-e1d3-4e1d-9dd1-035d0c2737d4/lesson/ca8768eb-5201-42fc-94e0-0b16c9472775)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/6b1df5fc-e1d3-4e1d-9dd1-035d0c2737d4/lesson/2b781509-1921-4d89-a320-c04a68e85fd3)**
>
> Practice lab
