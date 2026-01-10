# Subnets Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Subnets-Demo)

---

## Table of Contents

- Subnets Demo
  - Step 1: Create a VPC
  - Step 2: Create Subnets in the VPC
  - Step 3: Deploy an EC2 Instance in a Specific Subnet
  - Step 4: Clean Up Resources
  - Summary of Steps
  - Watch Video
    - Create the First Subnet
    - Create the Second Subnet

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Subnets Demo

In this lesson, you will learn how to create subnets within a Virtual Private Cloud (VPC) and deploy an EC2 instance into a specific subnet. We'll start by creating a VPC and then proceed to set up two subnets within it.

## Step 1: Create a VPC

Begin by navigating to the VPC section in the AWS Management Console. Select the "VPC only" option and configure your VPC with the following details:

- **Name:** demo VPC
- **CIDR block:** 10.0.0.0/16
- _(Optional)_ Enable the Amazon provided IPv6 CIDR block.

This configuration is all you need to create your VPC.

![The image shows the AWS Management Console with a search for "VPC," displaying related services like VPC, AWS Firewall Manager, and Detective. The console also includes navigation options and a welcome section with links to AWS resources.](https://kodekloud.com/kk-media/image/upload/v1752865691/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Subnets-Demo/aws-management-console-vpc-search.jpg)

Once the VPC is created, you will be taken to the VPC creation interface.

![The image shows the AWS Management Console interface for creating a VPC (Virtual Private Cloud). It includes options for naming, selecting IPv4 and IPv6 CIDR blocks, and adding tags.](https://kodekloud.com/kk-media/image/upload/v1752865692/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Subnets-Demo/aws-management-console-vpc-creation.jpg)

## Step 2: Create Subnets in the VPC

### Create the First Subnet

1.  Navigate to the subnets section and click on **Create Subnet**.
2.  Select the custom VPC you just created.
3.  **Name:** subnet one
4.  **Availability Zone:** Choose one among the available zones from the Northern Virginia (US East) region. For this example, select US East 1D.
5.  **CIDR Block:** It is crucial that the subnet's CIDR block falls within the VPC's CIDR block. Therefore, set the CIDR block for "subnet one" to 10.0.1.0/24.> [!important]
    > **Warning**
    >
    > Using a CIDR block outside of the range 10.0.0.0/16 (like 192.168.1.0/24) will result in an error.

After configuring the details, click **Create Subnet**.

![The image shows the AWS Management Console interface for creating a subnet, with options to select a VPC and specify CIDR blocks. A dropdown menu is open, displaying various availability zones in the US East (N. Virginia) region.](https://kodekloud.com/kk-media/image/upload/v1752865693/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Subnets-Demo/aws-management-console-subnet-creation.jpg)

### Create the Second Subnet

To create another subnet within the same VPC:

1.  Click **Create Subnet** again.
2.  Select the custom VPC.
3.  **Name:** subnet two
4.  **Availability Zone:** Choose a different zone; for example, select US East 1A.
5.  **CIDR Block:** Set the CIDR block to a range within 10.0.0.0/16, such as 10.0.5.0/24.

Once you have configured "subnet two," click **Create Subnet**.

After creating both subnets, clear any applied filters on your VPC dashboard. You can also filter by your specific VPC to display only the subnets you created.

![The image shows the AWS Management Console displaying the VPC dashboard with a list of subnets. A notification at the top indicates that a subnet was successfully created.](https://kodekloud.com/kk-media/image/upload/v1752865693/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Subnets-Demo/aws-management-console-vpc-dashboard.jpg)

## Step 3: Deploy an EC2 Instance in a Specific Subnet

To demonstrate subnet usage, you can launch an EC2 instance in one of your subnets:

1.  Go to the EC2 launch interface and select the VPC you created.
2.  Under the networking section, you will see both subnets available. For this example, choose **subnet two** (US East 1A) so that the instance will be deployed with an IP address within the 10.0.5.0/24 range.
3.  Select your desired Amazon Machine Image (AMI), choose an existing key pair, and keep the default security group settings.
4.  Launch the instance. AWS will automatically assign a private IP address from **subnet two**.

![The image shows an AWS EC2 instance launch configuration screen, detailing settings for VPC, subnet, security groups, and instance type. The summary section on the right provides an overview of the selected options, including the software image and storage details.](https://kodekloud.com/kk-media/image/upload/v1752865695/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Subnets-Demo/aws-ec2-instance-launch-configuration.jpg)

After launching the instance, navigate to the **Instances** section in the console to verify the deployment. Even if the instance is still booting, you should see it has been assigned a private IP address (e.g., 10.0.5.113), confirming its placement in **subnet two**.

![The image shows an AWS EC2 Management Console displaying details of a running instance named "instance1" with instance ID "i-0c683936f4bf18119" and type "t2.micro".](https://kodekloud.com/kk-media/image/upload/v1752865696/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Subnets-Demo/aws-ec2-management-console-instance1.jpg)

## Step 4: Clean Up Resources

When you no longer need the instance or the VPC, it is important to terminate and delete them properly:

1.  Delete the EC2 instance from the **Instances** section. Confirm that it has been terminated.
2.  Return to your demo VPC and delete it. Note that deleting the VPC will also remove all associated subnets.

> [!important]
> **Note**
>
> If an error occurs during deletion because the instance is still shutting down, wait a few seconds and try again. Ensure that all instances and network interfaces have been terminated before deleting the VPC.

![The image shows an AWS console screen where a user is attempting to delete a VPC but is unable to do so because it contains active instances and network interfaces. The interface provides details on the resources that need to be terminated or deleted first.](https://kodekloud.com/kk-media/image/upload/v1752865697/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Subnets-Demo/aws-console-delete-vpc-error.jpg)

## Summary of Steps

| Step Number | Action                 | Details                                                                    |
| ----------- | ---------------------- | -------------------------------------------------------------------------- |
| 1           | Create a VPC           | Name: demo VPC, CIDR: 10.0.0.0/16                                          |
| 2           | Create Subnets         | Subnet one: 10.0.1.0/24 (US East 1D); Subnet two: 10.0.5.0/24 (US East 1A) |
| 3           | Launch an EC2 Instance | Deploy in subnet two; assigned IP in 10.0.5.0/24                           |
| 4           | Clean Up               | Terminate the instance and delete the VPC                                  |

This lesson provided a step-by-step guide to setting up a VPC, configuring subnets, launching an EC2 instance in a specific subnet, and finally cleaning up the resources. For additional guidance and resources on AWS networking, consider exploring the [AWS Documentation](https://aws.amazon.com/documentation/) and [AWS VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/57c43489-d10a-44eb-98e9-344bb9abde1b)**
>
> Watch video content
