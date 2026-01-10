# Route Table Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Route-Table-Demo)

---

## Table of Contents

- Route Table Demo
  - Creating a Demo VPC and Subnets
  - Inspecting the Default Route Table
  - Creating and Associating a Custom Route Table
  - Modifying Routes in a Route Table
  - Cleaning Up Resources
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Route Table Demo

In this guide, we explore how AWS route tables work within a Virtual Private Cloud (VPC). You will learn how packets are routed inside a VPC by inspecting the default route table, associating subnets, and modifying routing rules. Although AWS route tables support advanced customizations, this tutorial focuses on fundamental operations to help you get started.

## Creating a Demo VPC and Subnets

Begin by creating a demo VPC using your preferred CIDR block. Ensure that IPv6 support is enabled. Then, create two subnets within this VPC with the following configurations:

- **Subnet One:**
  - IPv4 CIDR: 10.0.1.0/24
  - Provide an appropriate IPv6 CIDR block.

- **Subnet Two:**
  - IPv4 CIDR: 10.0.2.0/24
  - Provide an appropriate IPv6 CIDR block.
  - (You can let AWS automatically select the availability zone.)

After provisioning the VPC and subnets, AWS automatically associates them with the main (default) route table created for your VPC.

## Inspecting the Default Route Table

To review the AWS-generated main route table, navigate to the VPC console and click on your newly created VPC. Then, open the route table in a new tab to inspect its configuration. The default route table typically includes the following routes:

- **Local IPv4 Route:**  
  Any packet destined for an IP address within the VPC CIDR block is routed locally.
- **Local IPv6 Route:**  
  Similarly, traffic destined for any IP within the VPC's IPv6 range is handled locally.

Even though the "Subnet Associations" section may not list explicit subnet assignments, both subnets automatically inherit the routes defined in the main route table. In practice, when an EC2 instance in any associated subnet sends traffic, the route table evaluates the destination IP against its rules to determine the correct forwarding path.

## Creating and Associating a Custom Route Table

For greater control over your network, you can define custom route tables. Follow these steps to create and associate a custom route table:

1.  Navigate to the "Route Tables" section in the VPC console.
2.  Click "Create Route Table", provide a name such as "Route Table One", and select your demo VPC.

    ![The image shows an AWS VPC management console displaying route tables with active routes for specific IP destinations.](https://kodekloud.com/kk-media/image/upload/v1752865659/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Route-Table-Demo/aws-vpc-route-tables-console.jpg)

3.  After creation, view the "Subnet Associations" tab. By default, no subnets are explicitly linked.
4.  Click "Edit" and associate the route table with Subnet One. With this association in place, traffic from Subnet One follows the rules defined in "Route Table One".

If needed, you can create an additional custom route table and assign it to Subnet Two to segregate routing rules. This setup is particularly useful when configuring different network behaviors for public and private subnets.

![The image shows an AWS Management Console screen for creating a route table, with fields for naming the route table and selecting a VPC, along with options to add tags.](https://kodekloud.com/kk-media/image/upload/v1752865661/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Route-Table-Demo/aws-management-console-route-table-creation.jpg)

![The image shows an AWS VPC Management Console screen displaying details of a route table, including subnet associations and CIDR information.](https://kodekloud.com/kk-media/image/upload/v1752865662/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Route-Table-Demo/aws-vpc-route-table-details.jpg)

> [!important]
> **Tip**
>
> For more details on AWS VPCs and route tables, refer to the [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html).

## Modifying Routes in a Route Table

Customizing routes is essential for directing network traffic efficiently. To add or modify routes, follow these steps:

1.  Open the desired route table from the VPC console.
2.  In the "Routes" section, click "Edit Routes".
3.  To add a new route, input the destination CIDR. For example, configuring a destination CIDR of 0.0.0.0/0 establishes a default route that captures all unmatched traffic.
4.  Select an appropriate target for this route, such as an Internet Gateway, NAT Gateway, or another designated target.
5.  Click "Save Changes" to apply your modifications.

    ![The image shows an AWS VPC Management Console screen displaying details of a route table, including subnet associations and CIDR information.](https://kodekloud.com/kk-media/image/upload/v1752865664/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Route-Table-Demo/aws-vpc-route-table-details-2.jpg)

This process demonstrates the manner in which AWS routes incoming packets: by inspecting the destination IP, matching it against the configured rules, and subsequently forwarding the traffic along the approved path.

## Cleaning Up Resources

After completing your demo, it is important to clean up your resources to avoid incurring unwanted charges. To do this:

- Delete the VPC you created. AWS will automatically remove all associated subnets, route tables, and other related resources.

  ![The image shows an AWS management console screen where a user is in the process of deleting a VPC named "vpcdemo," along with associated resources like route tables and subnets. The user is required to type "delete" to confirm the action.](https://kodekloud.com/kk-media/image/upload/v1752865665/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Route-Table-Demo/aws-console-delete-vpc-demo.jpg)

> [!important]
> **Resource Cleanup Reminder**
>
> Always verify that you have terminated or deleted all temporary resources to prevent unexpected service charges.

This demo has provided an overview of AWS route tables, including how to inspect default settings, configure custom route tables, associate subnets appropriately, and modify routing rules. For further reading and advanced configurations, consider exploring additional AWS networking resources and documentation.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/eb8af0aa-5d5b-4c60-8d8e-4dbbbf420d39)**
>
> Watch video content
