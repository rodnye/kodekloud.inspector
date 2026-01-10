# AWS Networking Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/AWS-Networking-Demo)

---

## Table of Contents

- AWS Networking Demo
  - Navigating to the VPC Dashboard
  - Default VPC Overview
  - Viewing VPC Details
  - Route Tables and Internet Gateways
  - Creating a New VPC
  - Creating a Subnet
  - Configuring an Internet Gateway and Route Table
  - Managing Security Settings
  - Summary
  - Watch Video
    - Security Groups
    - Network ACLs

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# AWS Networking Demo

In this lesson, you'll learn how to configure and manage Virtual Private Clouds (VPCs) within the AWS Management Console. This guide covers everything from navigating the console to creating VPCs, configuring subnets, setting up route tables, and managing security groups and network ACLs.

## Navigating to the VPC Dashboard

To get started, type "VPC" in the AWS console search bar. This will display a list of related services, including AWS Firewall Manager and VPC Reachability Analyzer.

![The image shows an AWS console interface with a search for "VPC," displaying related services and features like AWS Firewall Manager and VPC Reachability Analyzer.](https://kodekloud.com/kk-media/image/upload/v1752861802/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_10.jpg)

The VPC dashboard enables you to manage all networking aspects on AWS, such as creating VPCs, subnets, route tables, and internet gateways.

---

## Default VPC Overview

By default, AWS is set to the US East 1 region. In the dashboard, under "resources by region," you can see one VPC exists in this region—typically the default VPC automatically created for new AWS accounts in every region.

![The image shows an AWS VPC dashboard displaying resources by region, settings, and options for creating VPCs and launching EC2 instances.](https://kodekloud.com/kk-media/image/upload/v1752861803/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_40.jpg)

You can also switch to the view for all regions to confirm that each region has one default VPC.

---

## Viewing VPC Details

To inspect the default VPC in the US East 1 region, click on **Your VPCs** in the left sidebar. In the default VPC list, scroll to the right to view the "default VPC" column marked "Yes." Key details include:

- **VPC ID:** An associated identification number.
- **CIDR Block:** For example, 172.31.0.0/16, which defines the available IP address range.
- **Resources:** References to the DHCP option set, default route table, and default network ACL.

Selecting the VPC will display additional properties and a resource map showing how subnets and other components interconnect.

![The image shows an AWS VPC dashboard displaying details of a specific VPC, including subnets, route tables, and network connections.](https://kodekloud.com/kk-media/image/upload/v1752861804/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_160.jpg)

The resource map shows that AWS has created six default subnets (one per availability zone in US East 1: 1A, 1B, 1C, 1D, 1E, and 1F). These subnets use a single route table that directs internet traffic via an associated internet gateway, making them public subnets with internet connectivity.

To view more details, click on the subnets section to see properties like subnet IDs, state, VPC association, CIDR blocks, available IPv4 addresses, and route table associations.

![The image shows an AWS VPC dashboard displaying a list of subnets, their IDs, states, VPCs, and CIDR blocks, with subnet details highlighted.](https://kodekloud.com/kk-media/image/upload/v1752861804/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_260.jpg)

Notice that the default subnets do not have names. Additional details include network ACLs and the option to auto-assign public IPv4 addresses.

Selecting a subnet displays further details such as its ARN and associated route table information.

![The image shows an AWS VPC dashboard displaying details of a specific subnet, including its ID, state, CIDR, and availability zone.](https://kodekloud.com/kk-media/image/upload/v1752861805/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_330.jpg)

> [!important]
> **Important**
>
> In the route table section, notice that local traffic within the CIDR block is kept internal, while external traffic is routed through the internet gateway. This design ensures secure and efficient traffic management.

---

## Route Tables and Internet Gateways

Next, navigate to the **Route Tables** section in the left sidebar. In the default VPC, you will see one route table shared by all subnets. This table contains a default route that sends traffic destined for outside the VPC to the internet gateway.

![The image shows an AWS VPC dashboard displaying a route table with two active routes, including a default route to an internet gateway.](https://kodekloud.com/kk-media/image/upload/v1752861806/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_410.jpg)

To inspect the internet gateway, click on its details from either the route table view or the dedicated internet gateway section.

![The image shows an AWS console screen displaying details of an internet gateway, including its ID, state, VPC ID, and owner information.](https://kodekloud.com/kk-media/image/upload/v1752861807/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_430.jpg)

This confirms the gateway is attached to the default VPC. AWS manages the default configuration once the gateway is linked, although network ACLs and security groups offer additional security management.

Scrolling further down reveals network security configurations.

- **Network ACLs:** Display default inbound and outbound rules that allow all traffic.

  ![The image shows an AWS Network ACL configuration page, displaying inbound rules allowing and denying all traffic from any source.](https://kodekloud.com/kk-media/image/upload/v1752861808/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_470.jpg)

  ![The image shows an AWS Network ACL configuration page, displaying outbound rules for a specific ACL, including rules for allowing and denying all traffic.](https://kodekloud.com/kk-media/image/upload/v1752861809/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_490.jpg)

- **Security Groups:** The default security group permits inbound traffic from within the group and allows all outbound traffic. You can review and modify its settings as needed.

---

## Creating a New VPC

After familiarizing yourself with the default networking setup, the next step is to create your custom VPC.

1.  Go to **Your VPCs** and click **Create VPC**.
2.  AWS offers two options:
    - Create a VPC only.
    - Create a VPC along with subnets and associated resources using the "VPC and more" option.

For this demonstration, select the VPC-only option. Then, provide:

- An optional name (e.g., "prod").
- A CIDR block (for example, 192.168.0.0/16, which spans from 192.168.0.0 to 192.168.255.255).
- IPv6 configuration as "No."
- Any desired tags.

Finally, click **Create VPC**.

Once created, you can review details such as the assigned VPC ID, state (which should be "available"), CIDR block, and the associated main route table.

![The image shows an AWS VPC dashboard displaying details of a specific VPC, including its ID, state, DNS settings, and associated resources.](https://kodekloud.com/kk-media/image/upload/v1752861810/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_660.jpg)

> [!important]
> **Note**
>
> At this stage, only the VPC is created. To host resources like servers, you must also create subnets within your VPC.

---

## Creating a Subnet

To add a subnet to your "prod" VPC:

1.  Navigate to the **Subnets** section and click **Create Subnet**.
2.  In the creation form:
    - Select the VPC "prod".
    - Provide a subnet name (e.g., "subnet one").
    - Choose an availability zone (e.g., US East 1A).
    - Specify a CIDR block that falls within your VPC’s range. For example, use 192.168.1.0/24 if your VPC CIDR is 192.168.0.0/16 (using an out-of-range block like 10.0.0.0/24 would trigger an error).

After submitting, your subnet is created and its details (such as subnet ID, ARN, availability zone, current route table, and network ACLs) become visible.

![The image shows an AWS VPC dashboard displaying a list of subnets, their IDs, states, VPCs, and CIDR details.](https://kodekloud.com/kk-media/image/upload/v1752861812/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_700.jpg)

By default, this subnet is private, meaning that instances launched within it won’t have internet access unless you update the route table to include internet connectivity.

---

## Configuring an Internet Gateway and Route Table

To enable internet connectivity for your custom VPC:

1.  **Create an Internet Gateway:**
    - Navigate to **Internet Gateways** and click **Create Internet Gateway**.
    - Assign a name (e.g., "prod-gateway") and create the gateway.
    - Initially, it will be detached. To attach it to the "prod" VPC, click **Actions** and choose **Attach to VPC**, then select the appropriate VPC.

    ![The image shows an AWS VPC dashboard with details of a detached internet gateway, including its ID and tags.](https://kodekloud.com/kk-media/image/upload/v1752861812/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_890.jpg)

    Once attached, verify the connection:

    ![The image shows an AWS VPC dashboard with an internet gateway successfully attached, displaying details like ID, state, VPC ID, and tags.](https://kodekloud.com/kk-media/image/upload/v1752861813/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_910.jpg)

2.  **Update the Route Table:** To ensure full internet connectivity, add a default route in the route table with:
    - **Destination:** 0.0.0.0/0
    - **Target:** Your "prod-gateway"

    This configuration routes all non-local traffic to the internet gateway, converting the subnet into a public subnet.

    ![The image shows an AWS VPC route table editing interface, displaying destination, target options, and buttons for adding routes and saving changes.](https://kodekloud.com/kk-media/image/upload/v1752861814/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_950.jpg)

> [!important]
> **Tip**
>
> Ensure that the subnet’s route table is updated correctly so external traffic can effectively reach the internet. Failure to do so will leave your instances isolated.

---

## Managing Security Settings

Security is a critical aspect of your network configuration. Here are two primary security components:

### Security Groups

Security groups control inbound and outbound traffic at the instance level. To create a security group for a web server (e.g., one listening on port 443):

1.  Navigate to **Security Groups** and click **Create Security Group**.
2.  Name the group (e.g., "demo security group") and assign it to the "prod" VPC.
3.  Add inbound rules:
    - Either use the HTTPS preset or manually create a TCP rule on port 443.
    - Set the source to "Anywhere" (0.0.0.0/0) or restrict access based on your requirements.
4.  Outbound traffic is automatically allowed for established connections because security groups are stateful.
5.  Click **Create Security Group** to save your configuration.

### Network ACLs

Network ACLs act as an additional layer of security at the subnet level. To create a network ACL:

1.  Go to **Network ACLs** and click **Create Network ACL**.
2.  Name it (e.g., "demo-acl") and assign it to the "prod" VPC.
3.  Add intranet and outbound rules. For example, to allow SSH:
    - Add an inbound rule with a specific rule number.
    - Specify the protocol, port range (22 for SSH), and source IP range.
    - Save your changes.

    ![The image shows an AWS interface for editing inbound rules in a VPC, allowing or denying traffic based on specified protocols and sources.](https://kodekloud.com/kk-media/image/upload/v1752861815/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_1130.jpg)

4.  Modify subnet associations by clicking **Edit subnet associations** and selecting the appropriate subnets.

---

## Summary

To build and secure your AWS network environment effectively, follow these steps:

- Create your VPC.
- Set up subnets within the VPC.
- Configure route tables with proper routes for internet access via an internet gateway.
- Manage security through well-defined security groups and network ACL rules.

![The image shows an AWS console interface for editing subnet associations, displaying available and selected subnets with options to save changes or cancel.](https://kodekloud.com/kk-media/image/upload/v1752861818/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Networking-Demo/frame_1170.jpg)

By following this comprehensive guide, you'll gain hands-on experience in designing a secure and functional AWS networking architecture. Enjoy building your network environment on AWS!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/55026cd0-1ae4-4d95-a997-c5b4ff1801f1)**
>
> Watch video content
