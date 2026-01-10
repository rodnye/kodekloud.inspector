# Subnets Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Networking-Fundamentals/Subnets-Demo)

---

## Table of Contents

- Subnets Demo
  - Step 1: Creating the VPC
  - Step 2: Creating the First Subnet
  - Step 3: Creating the Second Subnet
  - Step 4: Deploying an EC2 Instance into a Specific Subnet
  - Step 5: Cleaning Up Resources
  - Watch Video
    - Launching Your Instance

---

## Content

AWS Certified Developer - Associate

Networking Fundamentals

# Subnets Demo

In this tutorial, you'll learn how to create subnets within an AWS VPC. We'll begin by creating a new VPC to host our subnets. If you're already familiar with VPC creation, feel free to jump directly to the subnet demonstration.

---

## Step 1: Creating the VPC

First, navigate to your AWS Management Console and search for "VPC". From the search results, select the VPC service.

![The image shows the AWS Management Console with a search for "VPC" displaying related services like VPC, AWS Firewall Manager, and Detective. The console also includes navigation options and a welcome panel on the right.](https://kodekloud.com/kk-media/image/upload/v1752859233/notes-assets/images/AWS-Certified-Developer-Associate-Subnets-Demo/aws-management-console-vpc-search.jpg)

Next, click on **VPCs** and choose to create a new VPC. Select the "VPC only" option, assign a name (for this demonstration, use "demo VPC"), and specify your CIDR block as `10.0.0.0/16`. If necessary, enable the Amazon provided IPv6 CIDR block. Once these details are confirmed, create the VPC.

![The image shows the AWS Management Console interface for creating a VPC, with options for configuring IPv4 and IPv6 CIDR blocks and adding tags.](https://kodekloud.com/kk-media/image/upload/v1752859234/notes-assets/images/AWS-Certified-Developer-Associate-Subnets-Demo/aws-management-console-vpc-creation.jpg)

---

## Step 2: Creating the First Subnet

Proceed to the subnet section. Click on **Create Subnet** and select the VPC you just created. Name the first subnet "subnet one" and choose an availability zone—such as "US East 1D" in the Northern Virginia region.

![The image shows the AWS Management Console interface for creating a subnet, with options for selecting a VPC ID and availability zones in the US East (N. Virginia) region.](https://kodekloud.com/kk-media/image/upload/v1752859236/notes-assets/images/AWS-Certified-Developer-Associate-Subnets-Demo/aws-management-console-subnet-creation.jpg)

> [!important]
> **Important**
>
> Ensure you select a valid CIDR block that fits within your VPC's CIDR block. For example, using `192.168.1.0/24` is invalid when your VPC is `10.0.0.0/16`. Use a valid CIDR block such as `10.0.1.0/24`.

You can also provide an IPv6 CIDR block by entering two hexadecimal digits (for example, `00`). After setting the values, click **Create Subnet**. The created subnet will appear in the "US East 1D" availability zone.

![The image shows the AWS Management Console displaying a successfully created subnet within the VPC dashboard. The subnet details, including IPv4 and IPv6 CIDR, are visible.](https://kodekloud.com/kk-media/image/upload/v1752859239/notes-assets/images/AWS-Certified-Developer-Associate-Subnets-Demo/aws-management-console-subnet-vpc.jpg)

---

## Step 3: Creating the Second Subnet

Repeat the process to create another subnet. Click on **Create Subnet**, select your VPC, and name this subnet "subnet 2". Choose a different availability zone, such as "US East 1A", and assign a CIDR block like `10.0.5.0/24`.

![The image shows the AWS VPC Management Console, specifically the "Create Subnet" page, where subnet settings such as name, availability zone, and CIDR blocks are being configured.](https://kodekloud.com/kk-media/image/upload/v1752859240/notes-assets/images/AWS-Certified-Developer-Associate-Subnets-Demo/aws-vpc-create-subnet-console.jpg)

After creating the second subnet, remove any filters to view all subnets within your VPC. This helps confirm that both "subnet one" and "subnet 2" are correctly associated with your VPC.

![The image shows the AWS VPC Management Console displaying a list of subnets, with details such as Subnet ID, State, VPC, and IP ranges. A notification at the top indicates a subnet was successfully created.](https://kodekloud.com/kk-media/image/upload/v1752859243/notes-assets/images/AWS-Certified-Developer-Associate-Subnets-Demo/aws-vpc-management-console-subnets.jpg)

---

## Step 4: Deploying an EC2 Instance into a Specific Subnet

To deploy a server into a specific availability zone, you must choose the relevant subnet during the EC2 instance launch. For instance, deploying an instance in "subnet one" will place it in "US East 1D" and assign an IP from the `10.0.1.0/24` range.

![The image shows the AWS VPC Management Console with a list of subnets, indicating their IDs, states, and CIDR blocks. A green notification at the top confirms the successful creation of a subnet.](https://kodekloud.com/kk-media/image/upload/v1752859245/notes-assets/images/AWS-Certified-Developer-Associate-Subnets-Demo/aws-vpc-management-console-subnets-2.jpg)

### Launching Your Instance

1.  Navigate to **Instances** in the AWS Management Console.
2.  Click **Launch Instance**.
3.  Name the instance (e.g., "instance one") and select your preferred image.
4.  Choose a key pair if necessary.
5.  Under the networking settings, select your previously created VPC. Both subnets will be visible; choose "subnet two" if you wish to deploy the instance in "US East 1A" with the CIDR block `10.0.5.0/24`.
6.  If the subnet is public, you may opt to assign a public IP automatically.
7.  Use the default security group settings and complete the launch process.

![The image shows an AWS EC2 instance launch configuration screen, where network settings and instance details like VPC, subnet, and security group are being selected.](https://kodekloud.com/kk-media/image/upload/v1752859252/notes-assets/images/AWS-Certified-Developer-Associate-Subnets-Demo/aws-ec2-instance-launch-configuration.jpg)

After configuring the settings, review the instance details in the summary view:

![The image shows an AWS EC2 instance launch configuration screen, detailing settings for VPC, subnet, security group, and instance summary.](https://kodekloud.com/kk-media/image/upload/v1752859254/notes-assets/images/AWS-Certified-Developer-Associate-Subnets-Demo/aws-ec2-instance-launch-configuration-2.jpg)

When your instance is launched, navigate back to the **Instances** section. Even before the instance is fully booted, an IP address will be assigned. For example, deploying into "subnet two" might result in an IP like `10.0.5.113`, taken from the available range.

![The image shows an AWS EC2 Management Console with details of a running instance named "instance1," including its instance ID, type, and private IP address.](https://kodekloud.com/kk-media/image/upload/v1752859256/notes-assets/images/AWS-Certified-Developer-Associate-Subnets-Demo/aws-ec2-management-console-instance1.jpg)

---

## Step 5: Cleaning Up Resources

Once your demonstration is complete, it's important to clean up to avoid unnecessary resource usage. Follow these steps:

1.  Delete the launched EC2 instance.
2.  Navigate to your demo VPC, click on **Actions**, and select **Delete VPC**.

> [!important]
> **Warning**
>
> Deleting the VPC will also remove all associated subnets. If the instance is still shutting down, you might receive an error. Wait a few seconds and try again.

A confirmation dialog will appear, indicating that deleting the VPC will also delete its subnets (and any associated security groups). Type "delete" to confirm the removal.

![The image shows an AWS VPC Management Console with a "Delete VPC" confirmation dialog. It lists resources that will be deleted, including subnets and a security group, and requires typing "delete" to confirm.](https://kodekloud.com/kk-media/image/upload/v1752859257/notes-assets/images/AWS-Certified-Developer-Associate-Subnets-Demo/aws-vpc-delete-confirmation-dialog.jpg)

Confirm the deletion, and your VPC along with all subnets will be removed from your account.

---

This concludes the subnet demonstration. Following these steps will help you effectively manage your network architecture within AWS.

Happy networking!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/bbd6b3cc-6e7f-45b9-a3b3-b84459b081c3)**
>
> Watch video content
