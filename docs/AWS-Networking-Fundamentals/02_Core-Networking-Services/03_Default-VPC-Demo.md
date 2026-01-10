# Default VPC Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Core-Networking-Services/Default-VPC-Demo)

---

## Table of Contents

- Default VPC Demo
  - Table of Contents
  - Inspecting the Default VPC
  - Default VPC Across Regions
  - Subnets by Availability Zone
  - Resource Map Visualization
  - Internet Gateway & Default Route
  - Launching a Test EC2 Instance
  - Connecting via SSH & Testing Connectivity
  - Links and References
  - Watch Video

---

## Content

AWS Networking Fundamentals

Core Networking Services

# Default VPC Demo

In this guide, we explore **AWS Default VPCs**, the network environment AWS provisions by default in each region. You’ll learn how to inspect the default VPC, examine its subnets and resources, and launch a test EC2 instance with internet connectivity—all without manual network configuration.

---

## Table of Contents

1.  [Inspecting the Default VPC](#inspecting-the-default-vpc)
2.  [Default VPC Across Regions](#default-vpc-across-regions)
3.  [Subnets by Availability Zone](#subnets-by-availability-zone)
4.  [Resource Map Visualization](#resource-map-visualization)
5.  [Internet Gateway & Default Route](#internet-gateway--default-route)
6.  [Launching a Test EC2 Instance](#launching-a-test-ec2-instance)
7.  [Connecting via SSH & Testing Connectivity](#connecting-via-ssh--testing-connectivity)
8.  [Links and References](#links-and-references)

---

## Inspecting the Default VPC

1.  Sign in to the AWS Management Console.
2.  Navigate to **VPC** (search “VPC” or select from recently visited services).
3.  Click **VPCs** in the sidebar and locate the one marked **Default VPC**.

![The image shows the AWS Management Console, specifically the VPC dashboard, displaying various resources by region and options for managing virtual private clouds. It includes sections for creating VPCs, launching EC2 instances, and accessing network management tools.](https://kodekloud.com/kk-media/image/upload/v1752863203/notes-assets/images/AWS-Networking-Fundamentals-Default-VPC-Demo/aws-vpc-dashboard-management-console.jpg)

You should see:

- **State**: available
- **CIDR block**: `172.31.0.0/16`
- **Default VPC**: Yes

![The image shows an AWS VPC management console displaying details of a specific VPC, including its ID, state, and configuration settings.](https://kodekloud.com/kk-media/image/upload/v1752863204/notes-assets/images/AWS-Networking-Fundamentals-Default-VPC-Demo/aws-vpc-management-console-details.jpg)

> [!important]
> **Note**
>
> Every AWS region automatically gets one default VPC with the same `172.31.0.0/16` CIDR block.

---

## Default VPC Across Regions

AWS creates an identical default VPC in each region. To verify:

1.  Switch your region (e.g., from **US East (N. Virginia)** to **US East (Ohio)**).
2.  Open **VPCs**—you’ll again see one default VPC with the same settings and CIDR block.

---

## Subnets by Availability Zone

Within a default VPC, AWS provisions one subnet per Availability Zone (AZ). In **us-east-1** there are six AZs, so you get six subnets.

| Availability Zone | Subnet CIDR    |
| ----------------- | -------------- |
| us-east-1a        | 172.31.0.0/20  |
| us-east-1b        | 172.31.16.0/20 |
| us-east-1c        | 172.31.32.0/20 |
| us-east-1d        | 172.31.48.0/20 |
| us-east-1e        | 172.31.64.0/20 |
| us-east-1f        | 172.31.80.0/20 |

![The image shows the AWS Management Console displaying a list of subnets within a Virtual Private Cloud (VPC), including details like subnet ID, state, VPC, IPv4 CIDR, and availability zone.](https://kodekloud.com/kk-media/image/upload/v1752863205/notes-assets/images/AWS-Networking-Fundamentals-Default-VPC-Demo/aws-management-console-vpc-subnets-list.jpg)

---

## Resource Map Visualization

Use the **Resource Map** view to see the relationships between subnets, route tables, and the Internet Gateway.

![The image shows an AWS VPC management console with details of a virtual private cloud, including subnets, route tables, and network connections. It displays a resource map illustrating the relationships between these components.](https://kodekloud.com/kk-media/image/upload/v1752863207/notes-assets/images/AWS-Networking-Fundamentals-Default-VPC-Demo/aws-vpc-management-console-resource-map.jpg)

---

## Internet Gateway & Default Route

- A **Default Internet Gateway** is attached to your default VPC.
- The **main route table** includes an `0.0.0.0/0` route targeting the Internet Gateway.
- Each default subnet has **Auto-assign Public IPv4** enabled.

As a result, any EC2 instance launched into a default subnet receives a public IP and immediate internet access.

---

## Launching a Test EC2 Instance

Let’s launch a Linux instance into the default VPC to validate internet connectivity.

1.  Go to the **EC2** console and click **Launch Instance**.
2.  Select **Amazon Linux 2 AMI** and **t2.micro**.
3.  Click **Next** until **Key Pair**—create a new key named `aws-demo` and download the `.pem` file.

![The image shows an AWS EC2 console screen with a "Create key pair" dialog box open. It includes options for naming the key pair, selecting the key pair type (RSA or ED25519), and choosing the private key file format (.pem or .ppk).](https://kodekloud.com/kk-media/image/upload/v1752863208/notes-assets/images/AWS-Networking-Fundamentals-Default-VPC-Demo/aws-ec2-create-key-pair-dialog.jpg)

4.  In **Configure Security Group**, allow SSH (port 22) from your IP.
5.  Under **Configure Instance**, ensure:
    - **Network**: Default VPC (`172.31.0.0/16`)
    - **Subnet**: e.g., us-east-1b
    - **Auto-assign Public IP**: Enabled
6.  Review and **Launch**.

![The image shows an AWS EC2 instance launch configuration screen, detailing security group settings, storage options, and a summary of the instance specifications.](https://kodekloud.com/kk-media/image/upload/v1752863209/notes-assets/images/AWS-Networking-Fundamentals-Default-VPC-Demo/aws-ec2-instance-launch-configuration.jpg)

> [!important]
> **Warning**
>
> Terminate your test instance when finished to avoid unexpected charges.

---

## Connecting via SSH & Testing Connectivity

Once the instance state is **running**, copy its public IP and connect:

```
ssh -i aws-demo.pem ec2-user@<PUBLIC_IP_ADDRESS>
```

Test internet connectivity:

```
ping -c 4 8.8.8.8
```

Example output:

```
64 bytes from 8.8.8.8: icmp_seq=1 ttl=110 time=0.965 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=110 time=1.01 ms
--- 8.8.8.8 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss
```

This confirms that instances in the default VPC automatically receive a public IP and internet access.

---

## Links and References

- [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/)
- [Launching an Instance (EC2)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html)
- [AWS Regions and AZs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/a856e288-a64c-4c9b-a245-3b10e4e31f5d)**
>
> Watch video content
