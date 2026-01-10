# Subnets Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Core-Networking-Services/Subnets-Demo)

---

## Table of Contents

- Subnets Demo
  - Prerequisites
  - 1. Create a VPC
  - 2. Add Subnets
  - 3. Launch an EC2 Instance
  - 4. Cleanup Resources
  - Further Reading
  - Watch Video
    - Create Subnet-1
    - Create Subnet-2

---

## Content

AWS Networking Fundamentals

Core Networking Services

# Subnets Demo

In this tutorial, you'll learn how to:

1.  Create a Virtual Private Cloud (VPC)
2.  Add multiple subnets across Availability Zones
3.  Launch an EC2 instance into a specific subnet
4.  Clean up all resources

By the end, you’ll understand how subnets control IP addressing and fault isolation within your VPC.

---

## Prerequisites

- An AWS account with appropriate IAM permissions
- Basic familiarity with AWS Management Console

---

## 1\. Create a VPC

1.  Sign in to the [AWS Management Console](https://aws.amazon.com/console/) and search for **VPC**.  
    ![The image shows the AWS Management Console with a search for "VPC" displaying various services and features related to Virtual Private Cloud, such as AWS Firewall Manager and Detective.](https://kodekloud.com/kk-media/image/upload/v1752863362/notes-assets/images/AWS-Networking-Fundamentals-Subnets-Demo/aws-management-console-vpc-services.jpg)
2.  In the VPC dashboard, click **VPCs** → **Create VPC**. Select **VPC only** and enter:
    - **Name tag**: `demo-vpc`
    - **IPv4 CIDR block**: `10.0.0.0/16`
    - **IPv6 CIDR block**: Enabled (Amazon provided)  
      ![The image shows the AWS Management Console interface for creating a VPC, with options for configuring IPv4 and IPv6 CIDR blocks and adding tags.](https://kodekloud.com/kk-media/image/upload/v1752863363/notes-assets/images/AWS-Networking-Fundamentals-Subnets-Demo/aws-management-console-vpc-configuration.jpg)

---

## 2\. Add Subnets

Navigate to **Subnets** in the VPC console and click **Create subnet**. Configure two subnets as shown:

| Subnet Name | Availability Zone | IPv4 CIDR   |
| ----------- | ----------------- | ----------- |
| subnet-1    | us-east-1d        | 10.0.1.0/24 |
| subnet-2    | us-east-1a        | 10.0.5.0/24 |

> [!important]
> **Note**
>
> Each subnet’s CIDR block must reside within the VPC’s `10.0.0.0/16` range. Entering an out-of-range block (e.g., `192.168.1.0/24`) will produce an error.

### Create Subnet-1

- **VPC**: `demo-vpc`
- **Name tag**: `subnet-1`
- **Availability Zone**: `us-east-1d`
- **IPv4 CIDR block**: `10.0.1.0/24`

Optionally, assign an IPv6 block or choose IPv6-only. Click **Create subnet**.  
![This image shows the AWS Management Console displaying details of subnets within a Virtual Private Cloud (VPC), including subnet IDs, states, and CIDR blocks. The interface provides options for managing and viewing subnet configurations.](https://kodekloud.com/kk-media/image/upload/v1752863365/notes-assets/images/AWS-Networking-Fundamentals-Subnets-Demo/aws-management-console-vpc-subnets-details.jpg)

![The image shows an AWS VPC Management Console with a notification indicating a subnet has been successfully created. The console displays details such as IPv4 CIDR, IPv6 CIDR, and availability zone.](https://kodekloud.com/kk-media/image/upload/v1752863366/notes-assets/images/AWS-Networking-Fundamentals-Subnets-Demo/aws-vpc-management-console-subnet-created.jpg)

### Create Subnet-2

Repeat the steps for the second subnet:

- **Name tag**: `subnet-2`
- **Availability Zone**: `us-east-1a`
- **IPv4 CIDR block**: `10.0.5.0/24`

Remove any filters to display both subnets in your VPC.  
![This image shows the AWS Management Console displaying a list of subnets within a VPC, with details such as Subnet ID, State, VPC, and IPv4 CIDR. A notification at the top indicates a subnet was successfully created.](https://kodekloud.com/kk-media/image/upload/v1752863367/notes-assets/images/AWS-Networking-Fundamentals-Subnets-Demo/aws-management-console-subnets-vpc-details.jpg)

---

## 3\. Launch an EC2 Instance

1.  Go to **EC2 → Instances** and select **Launch instance**.
2.  Configure:
    - **Name tag**: `instance-1`
    - **AMI**: Choose any Linux/Windows image
    - **Instance type**: e.g., `t2.micro`
    - **Key pair**: Select an existing key pair

3.  Expand **Network settings**:
    - **VPC**: `demo-vpc`
    - **Subnet**: `subnet-2` (us-east-1a, CIDR `10.0.5.0/24`)
    - **Auto-assign Public IP**: Enable if needed

4.  Choose a security group (default or custom) and click **Launch instance**.  
    ![The image shows an AWS EC2 instance launch configuration screen, where network settings and instance details like VPC, subnet, and security group are being selected. The summary section on the right provides information about the instance type, software image, and storage volumes.](https://kodekloud.com/kk-media/image/upload/v1752863368/notes-assets/images/AWS-Networking-Fundamentals-Subnets-Demo/aws-ec2-instance-launch-configuration.jpg)

After the instance is **running**, check its private IP under **Instance details**. You should see an IP like `10.0.5.xxx`, confirming it’s in subnet-2.  
![The image shows an AWS EC2 Management Console displaying details of a running EC2 instance with ID i-0c683936f4bf18119, of type t2.micro, in the us-east-1a availability zone.](https://kodekloud.com/kk-media/image/upload/v1752863370/notes-assets/images/AWS-Networking-Fundamentals-Subnets-Demo/aws-ec2-management-console-instance-details.jpg)

---

## 4\. Cleanup Resources

1.  **Terminate** the EC2 instance (`instance-1`).
2.  Go to **VPC → Your VPCs**, select `demo-vpc` → **Actions** → **Delete VPC**.

> [!important]
> **Warning**
>
> If you receive an error about existing resources (e.g., network interfaces), ensure the instance is fully terminated and retry deletion.

3.  Confirm by typing **delete** in the prompt. This also removes the associated subnets.  
    ![The image shows an AWS VPC management console with a "Delete VPC" dialog open, indicating that the VPC cannot be deleted due to existing instances and network interfaces.](https://kodekloud.com/kk-media/image/upload/v1752863371/notes-assets/images/AWS-Networking-Fundamentals-Subnets-Demo/aws-vpc-management-console-delete-dialog.jpg)

![The image shows an AWS console interface where a Virtual Private Cloud (VPC) named "demovpc" is being deleted, along with its associated resources. The deletion confirmation requires typing "delete" in a field.](https://kodekloud.com/kk-media/image/upload/v1752863371/notes-assets/images/AWS-Networking-Fundamentals-Subnets-Demo/aws-console-vpc-demovpc-deletion.jpg)

---

## Further Reading

- [Amazon VPC Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [Amazon EC2 User Guide](https://docs.aws.amazon.com/ec2/index.html)
- [AWS Networking Fundamentals](https://aws.amazon.com/whitepapers/aws-networking-fundamentals/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/521db962-bb33-41bb-ad4a-59bf4d994c26)**
>
> Watch video content
