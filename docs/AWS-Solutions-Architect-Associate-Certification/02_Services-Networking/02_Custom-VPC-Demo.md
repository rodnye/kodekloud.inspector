# Custom VPC Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Custom-VPC-Demo)

---

## Table of Contents

- Custom VPC Demo
  - Step 1: Select Your AWS Region
  - Step 2: Navigate to the VPC Dashboard
  - Step 3: Create a Custom VPC
  - Step 4: Review the VPC Details
  - Step 5: Delete the Custom VPC
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Custom VPC Demo

In this lesson, you will learn how to create and delete a Virtual Private Cloud (VPC) in AWS. This step-by-step demonstration covers creating a new VPC, reviewing its configuration, and then deleting it. Future lessons will explore additional features and capabilities of VPCs in more depth.

> [!important]
> **Note**
>
> Remember that VPCs are region-specific. Ensure you select the appropriate AWS region before proceeding.

## Step 1: Select Your AWS Region

First, log in to your AWS Management Console and choose the region where you want to deploy your VPC. For example, if you select the US East (N. Virginia) region, your VPC will be created there. If your deployment requires a different region, simply select the one that fits your needs.

![The image shows an AWS Management Console with a dropdown menu displaying various AWS regions, including US East, US West, Asia Pacific, Canada, and Europe. The console also features sections for AWS Billing Conductor, getting started guides, and cost usage information.](https://kodekloud.com/kk-media/image/upload/v1752865501/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Custom-VPC-Demo/aws-management-console-regions-dropdown.jpg)

## Step 2: Navigate to the VPC Dashboard

Use the search bar at the top of the AWS console to search for "VPC." This action will direct you to the VPC page where you can view all VPC-related networking resources. To see an overview of your VPCs, click on "Your VPCs" in the left-hand navigation panel.

![The image shows the AWS Management Console, specifically the VPC (Virtual Private Cloud) dashboard, displaying various resources and settings related to network management.](https://kodekloud.com/kk-media/image/upload/v1752865502/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Custom-VPC-Demo/aws-vpc-dashboard-network-management.jpg)

If your AWS account is new, you might see one default VPC. You can identify it by scrolling horizontally until you find the "default VPC" label. AWS provides a default VPC to help you get started quickly; however, for this demonstration, we will create a custom VPC to explore the process without using the default configuration.

## Step 3: Create a Custom VPC

1.  Click the **Create VPC** button.
2.  AWS now provides two options:
    - Create a standalone VPC
    - Deploy a VPC along with a full set of networking resources (subnets, route tables, Internet Gateways, and NAT Gateways)

For this demo, we will select the **VPC-only** option for simplicity.

In the configuration panel:

- **Name Tag:** Enter a descriptive name for your VPC (e.g., "demo VPC").
- **IPv4 CIDR Block:** Set the CIDR block to `10.0.0.0/16` for this demonstration.
- **IPv6 CIDR Block:** Optionally, add an IPv6 CIDR block. You can either use one that you own or let AWS auto-provide one. For this lesson, the default settings for IPv6 will be used.
- **Tenancy:** Keep the tenancy option at its default value unless you have specific requirements.

![The image shows the AWS Management Console interface for creating a VPC, with options for VPC settings, subnets, and route tables. It includes configurations for IPv4 CIDR block, availability zones, and auto-generation of name tags.](https://kodekloud.com/kk-media/image/upload/v1752865503/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Custom-VPC-Demo/aws-management-console-vpc-creation.jpg)

![The image shows the AWS Management Console interface for creating a Virtual Private Cloud (VPC), with options for configuring IPv4 and IPv6 CIDR blocks, network border group, and tenancy. There is also a section for adding tags before creating the VPC.](https://kodekloud.com/kk-media/image/upload/v1752865504/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Custom-VPC-Demo/aws-management-console-vpc-creation-2.jpg)

After reviewing your settings and tags, which should now include your "demo VPC" name tag, click **Create VPC**. The deployment process is typically quick, and a green status bar will indicate when it is complete.

## Step 4: Review the VPC Details

Once the custom VPC is created, inspect its details on the VPC information page. Here you'll find valuable information such as:

- **VPC ID**
- **Current State:** Usually marked as "available"
- **DNS Settings**
- **IPv4 and IPv6 CIDR Blocks**
- **Tenancy Status**

AWS also creates a default route table for the VPC to manage traffic routing. Additionally, explore sections for network ACLs (which control access by permitting or blocking traffic) and the resource map that lists all resources associated with the VPC.

![The image shows a screenshot of an AWS VPC (Virtual Private Cloud) dashboard, displaying details such as VPC ID, state, DNS settings, and resource map information.](https://kodekloud.com/kk-media/image/upload/v1752865505/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Custom-VPC-Demo/aws-vpc-dashboard-screenshot.jpg)

This demonstration highlights the simplicity of managing a custom VPC: select your region, define your CIDR block, and modify other settings as required.

## Step 5: Delete the Custom VPC

When you are ready to clean up, you can delete your custom VPC by following these steps:

1.  Select your custom VPC from the "Your VPCs" list.
2.  Click the **Actions** button.
3.  Choose **Delete VPC**.
4.  Confirm the deletion by typing the word "delete." This action will permanently remove the custom VPC from your account.

![The image shows an AWS VPC management console with details of a newly created VPC named "demo-vpc," including its VPC ID, state, and CIDR information.](https://kodekloud.com/kk-media/image/upload/v1752865506/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Custom-VPC-Demo/aws-vpc-management-console-demo-vpc.jpg)

> [!important]
> **Reminder**
>
> Deleting a VPC is permanent. Ensure that you have backed up any necessary configurations or data before proceeding.

## Conclusion

This quick demo has shown you how easy it is to create and delete a custom VPC in AWS. By carefully selecting your region, configuring your CIDR block, and reviewing key settings, you can establish a custom network environment that suits your needs. For additional insights on networking and AWS best practices, explore more tutorials and official documentation.

For more details, check out these resources:

- [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [AWS Management Console Help](https://aws.amazon.com/console/)

Happy networking!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/29d291df-c0f9-455f-aba4-755d0bf71e51)**
>
> Watch video content
