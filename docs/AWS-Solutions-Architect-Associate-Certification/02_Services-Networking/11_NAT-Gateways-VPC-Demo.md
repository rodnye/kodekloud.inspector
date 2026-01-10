# NAT Gateways VPC Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/NAT-Gateways-VPC-Demo)

---

## Table of Contents

- NAT Gateways VPC Demo
  - Step 1: Create the Private Subnet
  - Step 2: Launch an EC2 Instance
  - Step 3: Configure the Internet Gateway and Public Subnet
  - Step 4: Deploy the NAT Gateway
  - Considerations for High Availability
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# NAT Gateways VPC Demo

In this article, we demonstrate how to configure NAT gateways in AWS to allow an EC2 instance to access the internet securely. This setup ensures that only outbound connections initiated from within AWS are allowed. The EC2 instance makes internet requests via the NAT gateway, while external sources cannot initiate a connection to it. We create a dummy Virtual Private Cloud (VPC) using the CIDR block 10.0.0.0/16.

![The image shows the AWS Management Console interface for creating a Virtual Private Cloud (VPC), with options for setting VPC resources, name tags, and CIDR blocks.](https://kodekloud.com/kk-media/image/upload/v1752865637/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NAT-Gateways-VPC-Demo/aws-management-console-vpc-creation.jpg)

## Step 1: Create the Private Subnet

Next, create a private subnet where your EC2 instance will reside. For this demo, configure the subnet with the CIDR block 10.0.1.0/24.

![The image shows the AWS Management Console interface for creating a subnet within a VPC. It includes fields for VPC ID, subnet name, availability zone, and IPv4 CIDR block.](https://kodekloud.com/kk-media/image/upload/v1752865639/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NAT-Gateways-VPC-Demo/aws-management-console-create-subnet.jpg)

## Step 2: Launch an EC2 Instance

After setting up the VPC and private subnet, navigate to the EC2 console to launch an instance in the private subnet. Name the instance "private-server" and use the default Amazon Linux image.

![The image shows an AWS EC2 instance launch configuration page, where Amazon Linux is selected as the Amazon Machine Image (AMI) and t2.micro is chosen as the instance type.](https://kodekloud.com/kk-media/image/upload/v1752865640/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NAT-Gateways-VPC-Demo/aws-ec2-instance-launch-configuration.jpg)

During the network configuration step while launching the instance, select the VPC ("VPC demo") and choose the private subnet. Do not assign a public IP address since internet access will be provided via the NAT gateway.

![The image shows an AWS EC2 instance launch configuration screen, detailing network settings and a summary of the instance specifications, including VPC, subnet, security group, and instance type.](https://kodekloud.com/kk-media/image/upload/v1752865641/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NAT-Gateways-VPC-Demo/aws-ec2-instance-launch-configuration-2.jpg)

After the instance is launched, you will notice that no public IP address is assigned. This means the EC2 instance is not directly accessible from the internet. To manage or reach the instance, you should use a VPN connection or another secure method to access your private network.

![The image shows an AWS EC2 management console with details of a running instance named "private-server." It displays information such as instance ID, state, type, and IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752865642/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NAT-Gateways-VPC-Demo/aws-ec2-management-private-server.jpg)

## Step 3: Configure the Internet Gateway and Public Subnet

To enable internet access for the private instance via a NAT gateway, start by attaching an internet gateway to your VPC. Follow these steps:

1.  Create an internet gateway.
2.  Attach the internet gateway to your VPC.

![The image shows an AWS Management Console screen displaying the "Internet gateways" section, with details of a specific internet gateway that is attached to a VPC.](https://kodekloud.com/kk-media/image/upload/v1752865643/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NAT-Gateways-VPC-Demo/aws-management-console-internet-gateway.jpg)

Next, create a public subnet by specifying the CIDR block 10.0.2.0/24. The availability zone selection is arbitrary for this demo.

With both subnets in place, create two route tables:

- **Public Route Table:**
  - Associate this route table with the VPC.
  - Add a default route (0.0.0.0/0) pointing to the internet gateway.
  - Associate the public route table with the public subnet.

- **Private Route Table:**
  - This route table will later include a default route that points to the NAT gateway.
  - Associate this route table with the private subnet.

![The image shows an AWS VPC Management Console displaying details of a route table, including route entries and their statuses.](https://kodekloud.com/kk-media/image/upload/v1752865644/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NAT-Gateways-VPC-Demo/aws-vpc-route-table-console.jpg)

## Step 4: Deploy the NAT Gateway

Deploy a NAT gateway in the public subnet by following these steps:

1.  Create a NAT gateway in the public subnet.
2.  Assign a name to the NAT gateway.
3.  Allocate an Elastic IP to ensure the gateway has a fixed public IP address.

![The image shows the AWS Management Console interface for creating a NAT gateway, with options to set the name, subnet, connectivity type, and Elastic IP allocation.](https://kodekloud.com/kk-media/image/upload/v1752865645/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NAT-Gateways-VPC-Demo/aws-management-console-nat-gateway.jpg)

After deploying the NAT gateway, update the private route table by adding a default route that points to the NAT gateway. Save these changes to complete the routing configuration for the private subnet.

> [!important]
> **Note**
>
> It is normal for the NAT gateway to show a pending status during initial setup—this indicates that the gateway is initializing.

## Considerations for High Availability

NAT gateways are deployed within a specific subnet and are only resilient within their respective availability zones. For example, if a NAT gateway is deployed in us-east-1b and that availability zone experiences an outage, instances relying on that gateway will lose internet connectivity. In production environments, deploy multiple NAT gateways across different availability zones (e.g., us-east-1a, us-east-1b) and update your route tables accordingly to ensure redundancy and high availability.

For this demo, only a single NAT gateway is used, so high availability configuration is not implemented.

![The image shows an AWS management console screen displaying details of a NAT gateway, including its ID, connectivity type, and state. The interface includes options for managing virtual private clouds and related resources.](https://kodekloud.com/kk-media/image/upload/v1752865646/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NAT-Gateways-VPC-Demo/aws-nat-gateway-console-details.jpg)

## Conclusion

This demo has shown how to set up a secure environment in AWS using a NAT gateway. By following these steps, you can enable internet access for private EC2 instances while maintaining a secure network architecture. For more detailed information on AWS networking and NAT gateways, refer to the [AWS Documentation](https://aws.amazon.com/documentation/).

Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/61ccfe15-8471-49d2-b4bf-04fd36c8ee77)**
>
> Watch video content
