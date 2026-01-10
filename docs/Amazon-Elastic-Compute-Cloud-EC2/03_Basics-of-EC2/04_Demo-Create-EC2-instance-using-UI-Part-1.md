# Demo Create EC2 instance using UI Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/Basics-of-EC2/Demo-Create-EC2-instance-using-UI-Part-1)

---

## Table of Contents

- Demo Create EC2 instance using UI Part 1
  - Table of Contents
  - Select AWS Region & EC2 Service
  - Configure EC2 Instance
  - Generate Key Pair
  - Networking & Storage Configuration
  - Advanced Instance Details
  - Launch & Verify Your Instance
  - View Instance Status
  - References
  - Watch Video
    - Instance Overview

---

## Content

Amazon Elastic Compute Cloud (EC2)

Basics of EC2

# Demo Create EC2 instance using UI Part 1

Launch your first Amazon EC2 virtual server in just a few minutes. This step-by-step guide walks you through region selection, instance configuration, key pair generation, networking, storage, advanced settings, and verification. By the end, you’ll have a **t2.micro** instance running on the AWS free tier.

## Table of Contents

1.  [Select AWS Region & EC2 Service](#select-aws-region--ec2-service)
2.  [Configure EC2 Instance](#configure-ec2-instance)
3.  [Generate Key Pair](#generate-key-pair)
4.  [Networking & Storage Configuration](#networking--storage-configuration)
5.  [Advanced Instance Details](#advanced-instance-details)
6.  [Launch & Verify Your Instance](#launch--verify-your-instance)
7.  [View Instance Status](#view-instance-status)
8.  [References](#references)

---

## Select AWS Region & EC2 Service

1.  In the AWS Management Console, choose your desired Region (for example, **US East (N. Virginia)**) from the top-right corner.
2.  Search for **EC2** in the Services menu and select **EC2** to open the EC2 Dashboard.
3.  Click **Launch instance** to begin.

![The image shows the AWS EC2 dashboard, displaying options for managing instances, resources, and account settings in the US East (N. Virginia) region. It includes sections for launching instances, service health, and exploring AWS features.](https://kodekloud.com/kk-media/image/upload/v1752868967/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-EC2-instance-using-UI-Part-1/aws-ec2-dashboard-managing-instances.jpg)

---

## Configure EC2 Instance

1.  **Name your instance** – e.g., `demo`.
2.  **Select an Amazon Machine Image (AMI)** – choose the OS you prefer. Ensure the CPU architecture (e.g., x86_64) is correct.
3.  **Choose Instance Type** – for free tier, pick **t2.micro**.

![The image shows an AWS console interface for launching an EC2 instance, with options for selecting an Amazon Machine Image (AMI) and instance type. The selected AMI is Amazon Linux 2023, and the instance type is t2.micro.](https://kodekloud.com/kk-media/image/upload/v1752868968/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-EC2-instance-using-UI-Part-1/aws-console-ec2-instance-launch-ami.jpg)

---

## Generate Key Pair

You must create or select an SSH key pair to connect to your instance.

> [!important]
> **Note**
>
> Choose **Create a new key pair**, enter a name (e.g., `demo`), and **download** the private key (`.pem`) file immediately. You cannot retrieve it later.
> Save it securely—losing this file means you cannot SSH into your instance without recovery steps.

![The image shows a dialog box in AWS for creating a key pair, where you can enter a key pair name, select the key pair type (RSA or ED25519), and choose the private key file format (.pem or .ppk).](https://kodekloud.com/kk-media/image/upload/v1752868969/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-EC2-instance-using-UI-Part-1/aws-key-pair-creation-dialog-box.jpg)

---

## Networking & Storage Configuration

1.  **Network settings**
    - VPC: Default VPC
    - Subnet: Default subnet
    - **Auto-assign Public IP**: Enabled

2.  **Storage**
    - Root volume: 8 GB EBS (gp2 / gp3)

![The image shows an AWS EC2 instance configuration screen, where a user is setting up security groups and storage options before launching an instance.](https://kodekloud.com/kk-media/image/upload/v1752868971/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-EC2-instance-using-UI-Part-1/aws-ec2-instance-configuration-screen.jpg)

---

## Advanced Instance Details

Review and adjust advanced settings as needed:

- **Shutdown behavior**: Stop (prevents accidental termination)
- **Termination protection**: Enabled (requires confirmation to delete)
- **Metadata accessibility**: IMDSv1 & IMDSv2 enabled
- **User data**: Add initialization scripts (optional)

These defaults follow AWS best practices. Features like placement groups, capacity reservations, tenancy, and CloudWatch alarms are covered elsewhere.

![The image shows an AWS EC2 instance configuration page, with options for instance settings and a summary section on the right. The "Launch instance" button is visible at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752868972/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-EC2-instance-using-UI-Part-1/aws-ec2-instance-configuration-page.jpg)

---

## Launch & Verify Your Instance

Click **Launch instance**. AWS will provision your VM in seconds.

![The image shows an AWS EC2 console with a success message indicating the successful launch of an instance. Below, there are options for next steps, such as creating billing alerts and connecting to the instance.](https://kodekloud.com/kk-media/image/upload/v1752868973/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-EC2-instance-using-UI-Part-1/aws-ec2-console-instance-launch-success.jpg)

---

### Instance Overview

After launch, go to **View instances** or return to the EC2 Dashboard. You’ll see your **demo** instance with status **pending**.

| Property        | Description                                     |
| --------------- | ----------------------------------------------- |
| Instance ID     | Unique identifier (e.g., `i-003bab8877f796526`) |
| Public IP       | IPv4 address assigned for SSH access            |
| Private IP      | Internal IPv4 address within your VPC           |
| AMI ID          | Amazon Machine Image identifier                 |
| Key pair name   | SSH key pair used for login                     |
| Security groups | Firewall rules allowing SSH (port 22)           |
| Root volume     | 8 GB EBS (gp2 / gp3)                            |

![The image shows an AWS EC2 management console displaying details of an instance with ID i-003bab8877f796526, which is in a pending state and of type t2.micro.](https://kodekloud.com/kk-media/image/upload/v1752868975/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-EC2-instance-using-UI-Part-1/aws-ec2-console-instance-i-003bab8877-pending.jpg)

---

## View Instance Status

Refresh the console to update the state. Once the instance displays **running** and both status checks pass, your server is ready for SSH access and application deployment.

## References

- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [AWS Free Tier](https://aws.amazon.com/free/)
- [Getting Started with Amazon Linux 2023](https://aws.amazon.com/amazon-linux-2/)

Your EC2 instance is now live. Proceed to configure security groups, install software, or deploy your applications. Happy computing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/6b1df5fc-e1d3-4e1d-9dd1-035d0c2737d4/lesson/0b26e927-f9d5-4fc9-8047-10e9032e37e6)**
>
> Watch video content
