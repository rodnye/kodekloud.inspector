# Custom VPC Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/Custom-VPC-Demo)

---

## Table of Contents

- Custom VPC Demo
  - Step 1: Select the AWS Region
  - Step 2: Access the VPC Dashboard
  - Step 3: Create a Custom VPC
  - Step 4: Delete the VPC
  - Conclusion
  - Watch Video
    - VPC Configuration Options

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# Custom VPC Demo

In this guide, we will walk you through the process of creating and deleting a Virtual Private Cloud (VPC) in AWS. This demo covers a basic VPC setup, reviews essential configuration details, and explains how to delete your custom VPC. Additionally, we highlight advanced AWS networking options that you can explore further.

> [!important]
> **Note**
>
> Before starting, ensure that you are logged into your AWS Management Console and have selected the appropriate region for your deployment. For this demo, we are using the US East 1 (Northern Virginia) region.

## Step 1: Select the AWS Region

Open your AWS console and select the region where you want to deploy your VPC. VPCs are region specific, so be sure to choose the proper region for your application.

![The image shows an AWS Management Console with a dropdown menu displaying various AWS regions. The console includes sections for getting started, training, and cost usage information.](https://kodekloud.com/kk-media/image/upload/v1752858153/notes-assets/images/AWS-Certified-Developer-Associate-Custom-VPC-Demo/aws-management-console-regions-dropdown.jpg)

## Step 2: Access the VPC Dashboard

In the AWS console, type "VPC" in the search bar at the top and select the VPC service from the results. This action will navigate you to the VPC dashboard, where you can manage your VPCs and networking resources. On the left sidebar, click on "Your VPCs". Note that new AWS accounts typically display one default VPC, which AWS creates automatically.

![The image shows the AWS VPC Management Console, displaying a list of virtual private clouds (VPCs) with one VPC available. The left sidebar contains navigation options for various VPC-related services.](https://kodekloud.com/kk-media/image/upload/v1752858155/notes-assets/images/AWS-Certified-Developer-Associate-Custom-VPC-Demo/aws-vpc-management-console-list.jpg)

## Step 3: Create a Custom VPC

Instead of using the default VPC, we will create our own custom VPC. Click on the **Create VPC** button to begin. You will be presented with two options:

- A traditional VPC deployment.
- A new feature that deploys a VPC along with additional resources (such as subnets, route tables, Internet Gateways, and NAT Gateways) simultaneously.

For this tutorial, select the option to create a VPC only.

![The image shows the AWS Management Console interface for creating a VPC, displaying settings for resources, name tag auto-generation, CIDR blocks, and a preview of subnets and route tables.](https://kodekloud.com/kk-media/image/upload/v1752858157/notes-assets/images/AWS-Certified-Developer-Associate-Custom-VPC-Demo/aws-management-console-vpc-creation.jpg)

### VPC Configuration Options

Enter a name for your VPC (e.g., "demo VPC") and specify the IPv4 CIDR block – we will use `10.0.0.0/16` for this demo. You can also configure an IPv6 CIDR block if required. AWS gives you the option to use your own IPv6 CIDR block or let AWS provide one. For simplicity, we will opt for the AWS-provided IPv6 CIDR block and retain the default settings for all additional configurations.

![The image shows the AWS Management Console with the VPC settings page open, where a user is configuring a new VPC with options for IPv4 and IPv6 CIDR blocks and tagging.](https://kodekloud.com/kk-media/image/upload/v1752858158/notes-assets/images/AWS-Certified-Developer-Associate-Custom-VPC-Demo/aws-management-console-vpc-settings.jpg)

After reviewing your settings and tags (the name tag in this case), click on the **Create VPC** button. A green progress bar will indicate the successful creation of your VPC. Once complete, you can view the details of your new VPC.

![The image shows an AWS Management Console screen displaying details of a Virtual Private Cloud (VPC) named "demo-vpc," including its state, CIDR, and associated resources.](https://kodekloud.com/kk-media/image/upload/v1752858159/notes-assets/images/AWS-Certified-Developer-Associate-Custom-VPC-Demo/aws-management-console-demo-vpc-details.jpg)

The VPC details page includes important information such as:

- VPC ID
- Current state
- CIDR blocks
- DNS hostname and resolution settings
- Tenancy information
- Automatically generated route table for internal network routing
- Network ACLs that filter traffic for subnets

Even though the resource map may show zero subnets initially, it will update as you add additional resources. Tabs for tags and CIDR details provide further insights into your VPC configuration.

## Step 4: Delete the VPC

Once you are comfortable with your custom VPC setup, you can delete it by following these steps:

1.  Return to the **Your VPCs** page.
2.  Select the VPC you just created.
3.  Click **Actions**, then choose **Delete VPC**.
4.  Confirm the deletion by typing the word `delete` when prompted.

![The image shows an AWS VPC Management Console with a progress bar indicating that a VPC is being deleted, currently at 86%.](https://kodekloud.com/kk-media/image/upload/v1752858161/notes-assets/images/AWS-Certified-Developer-Associate-Custom-VPC-Demo/aws-vpc-management-console-deleting.jpg)

## Conclusion

This demo has illustrated the fundamental steps needed to create and delete a VPC in AWS. By selecting the correct region and specifying the required network settings like CIDR blocks, AWS VPCs remain simple and intuitive to manage. As you become more familiar with AWS networking, we encourage you to explore additional configuration options and features.

For further reading and advanced networking configurations, consider exploring the following resources:

- [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/)
- [AWS Networking Guide](https://aws.amazon.com/networking/)

Happy networking!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/dd21f1f9-12dc-4760-b341-43f3c9bddd6b)**
>
> Watch video content
