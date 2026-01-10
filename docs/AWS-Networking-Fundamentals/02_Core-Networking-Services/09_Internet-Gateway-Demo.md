# Internet Gateway Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Core-Networking-Services/Internet-Gateway-Demo)

---

## Table of Contents

- Internet Gateway Demo
  - Overview
  - Prerequisites
  - 1. Create a VPC and Public Subnet
  - 2. Launch an EC2 Instance in the Public Subnet
  - 3. Verify Default Connectivity (Should Fail)
  - 4. Create and Attach an Internet Gateway
  - 5. Configure the Route Table for Internet Access
  - 6. Test Internet Connectivity (Should Succeed)
  - Additional Resources
  - Watch Video

---

## Content

AWS Networking Fundamentals

Core Networking Services

# Internet Gateway Demo

In this tutorial, you’ll convert a private subnet into a public subnet by attaching an Internet Gateway and updating the route table. After completing these steps, any EC2 instance launched in your public subnet will have Internet access.

## Overview

| Step | Description                                   |
| ---- | --------------------------------------------- |
| 1    | Create a VPC & Subnet                         |
| 2    | Launch an EC2 instance in the public subnet   |
| 3    | Verify default connectivity (should fail)     |
| 4    | Create & attach an Internet Gateway           |
| 5    | Configure the route table for Internet access |
| 6    | Test Internet connectivity (should succeed)   |

## Prerequisites

- An AWS account with permissions to manage VPCs and EC2.
- A generated SSH key pair (for example, `aws-demo.pem`).

> [!important]
> **Note**
>
> You can refer to the [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/) for more details on VPC components.

---

## 1\. Create a VPC and Public Subnet

1.  In the AWS Console, go to **VPC > Your VPCs** and click **Create VPC**.
2.  Set the IPv4 CIDR block to `10.0.0.0/16`. Optionally add an IPv6 block.
3.  Click **Create VPC**.

![The image shows an AWS Management Console screen displaying details of a Virtual Private Cloud (VPC) named "vpcdemo," including its ID, state, and network configurations. The left sidebar lists various VPC-related options like subnets and route tables.](https://kodekloud.com/kk-media/image/upload/v1752863224/notes-assets/images/AWS-Networking-Fundamentals-Internet-Gateway-Demo/aws-management-console-vpcdemo-details.jpg)

4.  Navigate to **Subnets > Create subnet**:
    - **Name tag**: `public-subnet`
    - **VPC**: your newly created VPC
    - **IPv4 CIDR block**: `10.0.1.0/24`
5.  Click **Create subnet**.

---

## 2\. Launch an EC2 Instance in the Public Subnet

1.  Open **EC2 Console** > **Instances > Launch instances**.
2.  For **Name**, enter `my-public-server`.
3.  Choose **Amazon Linux 2023** under **Application and OS Images (AMI)**.

![The image shows an AWS EC2 instance setup page, where a user is configuring a new instance with Amazon Linux 2023 AMI and a t2.micro instance type.](https://kodekloud.com/kk-media/image/upload/v1752863225/notes-assets/images/AWS-Networking-Fundamentals-Internet-Gateway-Demo/aws-ec2-instance-setup-amazon-linux.jpg)

4.  Select the **t2.micro** instance type (free tier).
5.  Under **Key pair**, choose `aws-demo.pem`.
6.  Expand **Network settings > Edit** and configure:
    - **VPC**: your new VPC
    - **Subnet**: `public-subnet`
    - **Auto-assign public IP**: **Enable**

![The image shows an AWS EC2 instance launch configuration screen, detailing instance type, key pair, network settings, and a summary of the selected options.](https://kodekloud.com/kk-media/image/upload/v1752863226/notes-assets/images/AWS-Networking-Fundamentals-Internet-Gateway-Demo/aws-ec2-instance-launch-configuration.jpg)

7.  Under **Security group**, allow SSH (port 22) from `0.0.0.0/0`. Optionally add ICMP for ping.

![The image shows an AWS EC2 instance launch configuration screen, detailing security group settings and a summary of the instance specifications, including the instance type and storage volume.](https://kodekloud.com/kk-media/image/upload/v1752863228/notes-assets/images/AWS-Networking-Fundamentals-Internet-Gateway-Demo/aws-ec2-instance-launch-configuration-2.jpg)

8.  Click **Launch instance** and wait for it to switch to **running**.

---

## 3\. Verify Default Connectivity (Should Fail)

After your instance is running, copy its public IP (example: `54.159.89.36`) and test connectivity:

![The image shows an AWS EC2 Management Console with details of two instances, one terminated and one running, including instance IDs, states, and public IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752863229/notes-assets/images/AWS-Networking-Fundamentals-Internet-Gateway-Demo/aws-ec2-management-console-instances.jpg)

```
ping 54.159.89.36
ssh -i aws-demo.pem ec2-user@54.159.89.36
# Connection hangs.
```

By default, there’s no Internet route, so the instance remains unreachable despite having a public IP.

---

## 4\. Create and Attach an Internet Gateway

1.  In the **VPC Console**, select **Internet Gateways** and click **Create internet gateway**.
    - **Name tag**: `my-internet-gateway`
2.  Click **Create internet gateway**.
3.  Select the newly created gateway, choose **Actions > Attach to VPC**, and select your VPC.

![The image shows an AWS Management Console screen displaying details of a newly created subnet within a Virtual Private Cloud (VPC). The subnet is listed as available with its associated VPC and IPv4 CIDR block.](https://kodekloud.com/kk-media/image/upload/v1752863231/notes-assets/images/AWS-Networking-Fundamentals-Internet-Gateway-Demo/aws-management-console-subnet-details-vpc.jpg)

![The image shows an AWS Management Console screen displaying details of an internet gateway that is successfully attached to a VPC. It includes information such as the gateway ID, state, VPC ID, and tags.](https://kodekloud.com/kk-media/image/upload/v1752863232/notes-assets/images/AWS-Networking-Fundamentals-Internet-Gateway-Demo/aws-management-console-internet-gateway-vpc.jpg)

> Pinging still fails because the route table isn’t updated yet.

---

## 5\. Configure the Route Table for Internet Access

1.  Go to **VPC > Route Tables** and click **Create route table**.
    - **Name tag**: `public-route-table`
    - **VPC**: your demo VPC
2.  Click **Create route table**.
3.  Select the new route table, open **Subnet associations**, click **Edit subnet associations**, check `public-subnet`, and save.

![The image shows an AWS VPC management console displaying a list of subnets and details of a selected subnet's route table. The interface includes subnet names, IDs, states, and associated VPCs.](https://kodekloud.com/kk-media/image/upload/v1752863233/notes-assets/images/AWS-Networking-Fundamentals-Internet-Gateway-Demo/aws-vpc-management-console-subnets.jpg)

4.  In the **Routes** tab, click **Edit routes** > **Add route**:
    - **Destination**: `0.0.0.0/0`
    - **Target**: `my-internet-gateway`
5.  Save the route.

![The image shows an AWS Management Console screen displaying details of a route table within a Virtual Private Cloud (VPC). It includes route information and subnet associations.](https://kodekloud.com/kk-media/image/upload/v1752863235/notes-assets/images/AWS-Networking-Fundamentals-Internet-Gateway-Demo/aws-management-console-route-table-vpc.jpg)

---

## 6\. Test Internet Connectivity (Should Succeed)

Now retry ping and SSH using the public IP:

```
ping 54.159.89.36
ssh -i aws-demo.pem ec2-user@54.159.89.36
# Welcome to your public EC2 instance!
```

Congratulations! Your `public-subnet` is now internet-enabled, and any EC2 instances launched into it can be accessed from the Internet.

## Additional Resources

- [AWS VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/)
- [AWS EC2 User Guide](https://docs.aws.amazon.com/ec2/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/aa5296bc-3fc2-4eac-99ab-dc8ccafc5e5b)**
>
> Watch video content
