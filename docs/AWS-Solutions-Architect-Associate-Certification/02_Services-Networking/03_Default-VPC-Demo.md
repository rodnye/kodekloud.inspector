# Default VPC Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Default-VPC-Demo)

---

## Table of Contents

- Default VPC Demo
  - Accessing the Default VPC
  - Inspecting the Default VPC Details
  - Exploring Different Regions
  - Examining the Default Subnets
  - Route Tables, Network ACLs, and Internet Gateway
  - Deploying an EC2 Instance to Validate Internet Connectivity
  - Connecting to the EC2 Instance
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Default VPC Demo

In this article, we explore the default Virtual Private Cloud (VPC) settings that AWS automatically configures when you create a new account. We will guide you through the VPC dashboard, inspect default configurations, and demonstrate how these settings enable internet connectivity for your AWS resources.

---

## Accessing the Default VPC

Begin by navigating to the VPC section in the AWS Management Console. You can access this by selecting "VPC" from the list of services or by searching for "VPC." Although the console may display a specific region (e.g., Northern Virginia), note that the default VPC configuration remains consistent across all AWS regions.

For new AWS accounts, you will observe that there is only one default VPC created, even though additional security groups might be visible that are not part of the default configuration.

![The image shows the AWS Management Console, specifically the VPC (Virtual Private Cloud) dashboard, displaying resources by region and various network management options.](https://kodekloud.com/kk-media/image/upload/v1752865515/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Default-VPC-Demo/aws-vpc-dashboard-resources-management.jpg)

---

## Inspecting the Default VPC Details

Click on the default VPC to view its detailed configuration. Here are the key elements you will notice:

- The VPC state is "available."
- The CIDR block is set to 172.31.0.0/16.
- It is explicitly marked as the default VPC.

Additional details such as route tables and network ACLs are also available, but these primary indicators confirm that this is your default VPC.

![The image shows an AWS VPC (Virtual Private Cloud) management console, displaying details of a specific VPC, including its ID, state, and configuration settings.](https://kodekloud.com/kk-media/image/upload/v1752865517/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Default-VPC-Demo/aws-vpc-management-console-details.jpg)

---

## Exploring Different Regions

To verify consistency across regions, switch to another region, such as Ohio, and confirm that the default VPC setup is identical. In any region, you will find one VPC with the same CIDR block (172.31.0.0/16) and the default designation.

Returning to the Northern Virginia region, you can now dive deeper into the VPC resources.

---

## Examining the Default Subnets

Under the default VPC, navigate to the "Subnets" section. Here are some important observations:

- The VPC ID is displayed in a truncated format (for example, ending in ACB5).
- There are six subnets, each associated with the default VPC.

Each subnet corresponds to a different availability zone (e.g., 1A, 1B, 1C, 1D, 1E, 1F), ensuring comprehensive coverage across the region.

![The image shows the AWS Management Console displaying a list of subnets within a Virtual Private Cloud (VPC), with details such as subnet ID, state, VPC, IPv4 CIDR, and availability zone.](https://kodekloud.com/kk-media/image/upload/v1752865518/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Default-VPC-Demo/aws-management-console-vpc-subnets.jpg)

For a clearer view of the network topology, return to the VPC resource map page to see all six subnets mapped to their respective availability zones.

---

## Route Tables, Network ACLs, and Internet Gateway

The default VPC includes a route table that manages the traffic between the subnets. By clicking on the route table, you can review its configuration, which appropriately directs subnet traffic. While we are not covering the route table in detail here, it plays a crucial role in routing network traffic.

> [!important]
> **Note**
>
> An Internet Gateway is automatically created and attached to the default VPC. This gateway allows resources within the VPC to access the internet. With the correct routing settings, any instance launched within a default subnet will have an auto-assigned public IPv4 address.

![The image shows an AWS VPC management console displaying details of a virtual private cloud, including subnets, route tables, and network connections. The interface highlights the relationships between these components.](https://kodekloud.com/kk-media/image/upload/v1752865521/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Default-VPC-Demo/aws-vpc-management-console-details-2.jpg)

---

## Deploying an EC2 Instance to Validate Internet Connectivity

To demonstrate the functionality of the default VPC, follow these steps to deploy an EC2 instance:

1.  Open the EC2 section in the AWS Management Console.
2.  Launch a new instance using the default settings (for example, choose Amazon Linux and a T2 micro instance).
3.  During network configuration, confirm that the instance is launched in the default VPC with the CIDR block 172.31.0.0/16 and select one of the default subnets.
4.  Ensure the instance is set to auto-assign a public IPv4 address for immediate internet access.

![The image shows an AWS Management Console interface with a search for "EC2" and a list of related services and features. The right side displays subnet details, including IPv4 CIDR and network ACL information.](https://kodekloud.com/kk-media/image/upload/v1752865523/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Default-VPC-Demo/aws-management-console-ec2-subnet-details.jpg)

When configuring the instance, double-check that the selected VPC is indeed the default VPC. You may also choose a specific subnet corresponding to an availability zone (e.g., US East 1B) if needed.

![The image shows an AWS EC2 instance launch configuration screen, detailing network settings and a summary of the instance specifications.](https://kodekloud.com/kk-media/image/upload/v1752865525/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Default-VPC-Demo/aws-ec2-instance-launch-configuration.jpg)

Once launched, navigate to the "Instances" section to verify the instance's status. The key details to verify are:

- The instance is in a running state.
- It has a private IP address from the subnet.
- It has automatically been assigned a public IP address.

![The image shows an AWS EC2 Management Console displaying details of a running instance with ID i-000872d9df41ab19c, including its public and private IP addresses and instance type (t2.micro).](https://kodekloud.com/kk-media/image/upload/v1752865526/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Default-VPC-Demo/aws-ec2-management-console-instance-details.jpg)

---

## Connecting to the EC2 Instance

To confirm internet connectivity, establish an SSH connection to the EC2 instance. If you have your PEM file ready, use the following command:

```
C:\Users\sanje\Documents\scratch\aws-demo>ssh -i aws-demo.pem ec2-user@34.201.6.109
The authenticity of host '34.201.6.109 (34.201.6.109)' can't be established.
ECDSA key fingerprint is SHA256:fa0CPuuMP2Fvn9aHeAw56Eei94znaTnFefIDRg1mE.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '34.201.6.109' (ECDSA) to the list of known hosts.
```

After connecting, test the connectivity by pinging an external address (for example, the Google DNS server) to ensure that the instance has proper internet access.

---

## Conclusion

This article demonstrated how AWS pre-configures a default VPC to simplify resource deployment with built-in internet connectivity. By creating a default VPC, setting up subnets across all availability zones, and integrating route tables and an Internet Gateway, AWS enables you to quickly launch and manage EC2 instances with minimal networking configuration.

Happy cloud computing!

For further reading, check out these resources:

- [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/index.html)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/7700d22f-be48-4c95-8dbd-57a75da78b13)**
>
> Watch video content
