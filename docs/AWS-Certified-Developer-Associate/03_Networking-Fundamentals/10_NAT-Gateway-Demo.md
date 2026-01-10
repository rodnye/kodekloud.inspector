# NAT Gateway Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Networking-Fundamentals/NAT-Gateway-Demo)

---

## Table of Contents

- NAT Gateway Demo
  - Step 1: Create a Dummy VPC
  - Step 2: Create a Private Subnet
  - Step 3: Launch an EC2 Instance
  - Step 4: Attach an Internet Gateway and Create a Public Subnet
  - Step 5: Configure Route Tables
  - Step 6: Deploy the NAT Gateway
  - Final Verification
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Networking Fundamentals

# NAT Gateway Demo

In this tutorial, we will walk through the steps to configure a NAT gateway so that an EC2 instance within your Virtual Private Cloud (VPC) can access the internet for outbound communications while restricting direct inbound access. This ensures that your EC2 instance can make outbound connections without exposing it to unsolicited inbound traffic.

## Step 1: Create a Dummy VPC

Begin by creating a dummy VPC with the CIDR block 10.0.0.0/16. For this demonstration, IPv6 is not required.

![The image shows the AWS Management Console interface for creating a Virtual Private Cloud (VPC), with options to configure settings like IPv4 CIDR block and tenancy.](https://kodekloud.com/kk-media/image/upload/v1752859181/notes-assets/images/AWS-Certified-Developer-Associate-NAT-Gateway-Demo/aws-management-console-vpc-creation.jpg)

## Step 2: Create a Private Subnet

Next, create a subnet that will serve as your private subnet where the EC2 instance will be deployed. Name the subnet "private subnet" and assign it the CIDR block 10.0.1.0/24.

![The image shows the AWS Management Console interface for creating a subnet within a VPC, with fields for VPC ID, subnet name, and CIDR block settings.](https://kodekloud.com/kk-media/image/upload/v1752859182/notes-assets/images/AWS-Certified-Developer-Associate-NAT-Gateway-Demo/aws-management-console-subnet-vpc.jpg)

## Step 3: Launch an EC2 Instance

Open the EC2 console and deploy an instance within the private subnet. Follow these guidelines:

- Name the instance "private server".
- Use the default Amazon Linux image.
- Under network settings, select your VPC (e.g., "demo") and choose the private subnet.
- Do not assign a public IP address since the instance will access the internet via the NAT gateway.
- Use the default security group, then launch the instance.

![The image shows an AWS EC2 instance launch configuration screen, detailing network settings and a summary of the instance specifications, including VPC, subnet, security group, and instance type.](https://kodekloud.com/kk-media/image/upload/v1752859183/notes-assets/images/AWS-Certified-Developer-Associate-NAT-Gateway-Demo/aws-ec2-instance-launch-configuration.jpg)

After launching the instance, verify that it does not have a public IP address. This confirmation ensures that the instance remains private and is accessible only within the VPC (for example, via VPN).

## Step 4: Attach an Internet Gateway and Create a Public Subnet

Before deploying the NAT gateway, attach an Internet Gateway (IGW) to your VPC because NAT gateways must reside in a public subnet.

1.  **Create and Attach an Internet Gateway**  
    Create an Internet Gateway and attach it to your VPC.

    ![The image shows an AWS management console screen displaying the "Internet gateways" section, with one internet gateway listed as attached to a VPC.](https://kodekloud.com/kk-media/image/upload/v1752859184/notes-assets/images/AWS-Certified-Developer-Associate-NAT-Gateway-Demo/aws-management-console-internet-gateways.jpg)

2.  **Confirm the Attachment**  
    Confirm that the Internet Gateway is attached to your VPC.

    ![The image shows an AWS Management Console screen, specifically the VPC dashboard, with a notification indicating that an internet gateway has been successfully attached to a VPC.](https://kodekloud.com/kk-media/image/upload/v1752859185/notes-assets/images/AWS-Certified-Developer-Associate-NAT-Gateway-Demo/aws-vpc-dashboard-internet-gateway.jpg)

3.  **Create a Public Subnet**  
    Create a public subnet named "public-subnet" and assign it the CIDR block 10.0.2.0/24.

## Step 5: Configure Route Tables

Now, you'll set up route tables to direct traffic appropriately.

1.  **Create Route Tables**
    - Create a route table named "public route table" associated with your VPC (e.g., "demo").
    - Then, create another route table named "private route table" for the private subnet.

    ![The image shows the AWS Management Console interface for creating a route table, with fields for naming the route table and selecting a VPC.](https://kodekloud.com/kk-media/image/upload/v1752859186/notes-assets/images/AWS-Certified-Developer-Associate-NAT-Gateway-Demo/aws-management-console-route-table.jpg)

2.  **Define Routes and Associations**
    - For the public route table, add a default route that directs traffic to the Internet Gateway. Associate the public subnet with this route table.
    - Associate the private route table with your private subnet. This table will later be updated to route outbound traffic through the NAT gateway.

    ![The image shows an AWS Management Console screen displaying details of a VPC route table, including route destinations and their statuses.](https://kodekloud.com/kk-media/image/upload/v1752859188/notes-assets/images/AWS-Certified-Developer-Associate-NAT-Gateway-Demo/aws-management-console-vpc-route-table.jpg)

## Step 6: Deploy the NAT Gateway

With the subnets and route tables configured, deploy your NAT gateway as follows:

1.  **Create a NAT Gateway**  
    Navigate to the NAT gateways section and create a new NAT gateway. Provide a name, select the public subnet ("public-subnet"), and allocate an Elastic IP address to ensure the gateway maintains a fixed IP address.
2.  **Update the Private Route Table**  
    Once the NAT gateway is created, go back to the private route table and add a default route that points to the newly created NAT gateway. Save the changes.

    ![The image shows an AWS Management Console screen displaying details of a NAT gateway, including its ID, connectivity type, state, and associated VPC and subnet information.](https://kodekloud.com/kk-media/image/upload/v1752859189/notes-assets/images/AWS-Certified-Developer-Associate-NAT-Gateway-Demo/aws-nat-gateway-console-details.jpg)

> [!important]
> **Note**
>
> NAT gateways may initially appear in a “pending” state as they initialize. In production environments, it is recommended to deploy multiple NAT gateways across different availability zones to ensure high availability. If one availability zone fails, instances in that zone will have uninterrupted access to the internet through a NAT gateway in another zone.

## Final Verification

At this point, your configuration allows the EC2 instance in the private subnet to access the internet through the NAT gateway while remaining inaccessible from external networks. To review the network details and confirm the setup, check the VPC subnet information.

![The image shows an AWS Management Console screen displaying details of a subnet within a Virtual Private Cloud (VPC). It includes information such as the subnet ID, state, IPv4 CIDR, and availability zone.](https://kodekloud.com/kk-media/image/upload/v1752859190/notes-assets/images/AWS-Certified-Developer-Associate-NAT-Gateway-Demo/aws-management-console-vpc-subnet-details.jpg)

By following these steps, you have successfully set up a secure architecture that enables outbound internet connectivity for your EC2 instance via a NAT gateway, while maintaining strict inbound access controls.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/403d5477-f48c-4af1-9a91-79004ca3070e)**
>
> Watch video content
