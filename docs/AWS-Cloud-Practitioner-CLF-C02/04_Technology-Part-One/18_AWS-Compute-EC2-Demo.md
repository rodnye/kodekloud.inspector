# AWS Compute EC2 Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/AWS-Compute-EC2-Demo)

---

## Table of Contents

- AWS Compute EC2 Demo
  - Accessing the EC2 Dashboard
  - Step 1: Configure Instance Details
  - Step 2: Choose an Instance Type
  - Step 3: Configure Key Pair for SSH Access
  - Step 4: Configure Network and Security Settings
  - Step 5: Configure Storage
  - Step 6: Instance Details and Security
  - Step 7: Review Networking and Monitoring Information
  - Step 8: Connecting to the EC2 Instance
  - Step 9: Terminating the Instance
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# AWS Compute EC2 Demo

In this guide, we will walk through a step-by-step demo of deploying an EC2 instance on AWS. This tutorial is designed to help you quickly launch and connect to your instance, whether you're using the free tier or a larger configuration.

Before you begin, ensure you are in the intended AWS region. In this demo, we are using the US East 1 region, but the process remains consistent across all regions.

## Accessing the EC2 Dashboard

Start by entering "EC2" in the AWS search bar. This will take you to the EC2 service page.

> [!important]
> **Region Reminder**
>
> Make sure you verify the AWS region before launching any resources. Deploying your instance in the correct region is crucial.

Click on **Launch EC2 Instance**:

![The image shows an Amazon Web Services (AWS) EC2 dashboard, displaying resources, account attributes, service health, and options to launch or migrate instances.](https://kodekloud.com/kk-media/image/upload/v1752861761/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-EC2-Demo/frame_30.jpg)

Alternatively, navigate to "Instances" and select "Launch Instances" to start the wizard for creating a new EC2 instance.

## Step 1: Configure Instance Details

Start by assigning a name to your instance (for example, "Web Server"). Then, choose the Amazon Machine Image (AMI) for your preferred operating system. Options include various Linux distributions, Ubuntu, macOS, and more. If you need a custom environment—for instance, one with pre-installed Nginx—browse the AWS Marketplace.

![The image shows an AWS EC2 instance setup page, selecting an Amazon Linux AMI, with options for instance type, security group, and storage details.](https://kodekloud.com/kk-media/image/upload/v1752861762/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-EC2-Demo/frame_50.jpg)

Searching the AWS Marketplace for Nginx yields a range of images.

![The image shows the AWS Marketplace interface displaying AMI listings for WordPress and NGINX, with options to select and filter by categories and pricing models.](https://kodekloud.com/kk-media/image/upload/v1752861763/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-EC2-Demo/frame_70.jpg)

For this demo, we select a commonly used AMI by searching for "Ubuntu" and choosing the **Ubuntu 22.04 64-bit x86** image. Note that the AMI ID may vary by region.

![The image shows an AWS console screen listing Ubuntu AMIs, with options to select different versions and architectures for launching instances.](https://kodekloud.com/kk-media/image/upload/v1752861764/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-EC2-Demo/frame_100.jpg)

## Step 2: Choose an Instance Type

After selecting your AMI, choose the instance type. The instance type defines the hardware configuration and performance attributes of your server. The default T2 micro, which provides one vCPU and 1 GB of memory, qualifies for the free tier. However, you can select from a variety of options using the drop-down menu.

## Step 3: Configure Key Pair for SSH Access

For secure SSH access, it is highly recommended to use a key pair rather than a username and password. If you already have a key pair, select it; otherwise, create a new one. To do this, click **Create new key pair**, enter a name (for example, "EC2 demo"), and choose the PEM file format. Your key pair file will be automatically downloaded after creation.

![The image shows an AWS EC2 instance setup page, detailing instance type, key pair, network settings, and a summary for launching a t2.micro instance.](https://kodekloud.com/kk-media/image/upload/v1752861765/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-EC2-Demo/frame_150.jpg)

## Step 4: Configure Network and Security Settings

Under network settings, select the appropriate Virtual Private Cloud (VPC) and subnet for deploying your instance. In many regions, the default VPC is the primary option.

![The image shows an AWS EC2 instance setup page, detailing key pair, network settings, security group, and instance summary, with a "Launch instance" button.](https://kodekloud.com/kk-media/image/upload/v1752861766/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-EC2-Demo/frame_190.jpg)

Next, assign a security group. You have two options:

- Use an existing security group.
- Create a new security group.

For this demo, create a new security group that at least permits SSH traffic (port 22) from any IP address. This configuration is essential for connecting via SSH. You may later include additional rules for HTTPS or other traffic as needed.

## Step 5: Configure Storage

Configure the storage options for your EC2 instance. A typical setup might include an 8 GB volume for the root device. Advanced storage settings are available, but the default configuration is adequate for basic deployments.

Once you have finalized the settings, click on **Launch Instance**. Then, navigate back to the "Instances" page to see your web server instance. Initially, the instance will display a "pending" status while it boots up. Once it transitions to "running," your instance is ready for connection.

![The image shows an AWS EC2 dashboard with a pending instance named "web-server" of type t2.micro in the us-east-1c availability zone.](https://kodekloud.com/kk-media/image/upload/v1752861768/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-EC2-Demo/frame_270.jpg)

## Step 6: Instance Details and Security

After the instance is running, click on the instance ID to view detailed information, including:

- Public and private IP addresses (if deployed in a public subnet)
- Instance ID and public DNS name
- Associated VPC and subnet
- AMI, key pair, and security group details

![The image shows an AWS EC2 instance summary page, detailing instance ID, IP addresses, instance type, and platform information.](https://kodekloud.com/kk-media/image/upload/v1752861769/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-EC2-Demo/frame_290.jpg)

The security group details will display an inbound rule permitting SSH (port 22) from any IP, along with outbound rules that allow all traffic. AWS security groups are stateful; therefore, responses to allowed inbound traffic are automatically permitted. Further modifications can be made by selecting the respective security group.

![The image shows an AWS EC2 instance details page, displaying security settings, IP addresses, instance type, and inbound/outbound rules.](https://kodekloud.com/kk-media/image/upload/v1752861770/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-EC2-Demo/frame_370.jpg)

You can also inspect and edit the inbound rules directly:

![The image shows an AWS EC2 security group configuration screen, displaying inbound rules for SSH access on port 22 from any IP address.](https://kodekloud.com/kk-media/image/upload/v1752861771/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-EC2-Demo/frame_380.jpg)

## Step 7: Review Networking and Monitoring Information

Explore the **Networking** tab to view detailed network interface information, such as additional IP addresses or attached Elastic IPs. The **Storage** tab provides details on attached volumes.

![The image shows an AWS EC2 instance management dashboard, displaying instance details, storage information, and block device settings.](https://kodekloud.com/kk-media/image/upload/v1752861774/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-EC2-Demo/frame_410.jpg)

The **Monitoring** tab offers performance metrics including CPU utilization, network traffic, disk reads, and status checks. Historical data review is also supported, aiding in performance tracking and diagnostics.

![The image shows an AWS EC2 monitoring dashboard displaying various metrics like CPU utilization, network activity, and status checks, with no data available for the selected time range.](https://kodekloud.com/kk-media/image/upload/v1752861777/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-EC2-Demo/frame_430.jpg)

Other actions available from the "Instances" page include modifying network interfaces, changing security groups, or managing instance states (stop, reboot, terminate).

## Step 8: Connecting to the EC2 Instance

Before proceeding with termination, verify that your instance is functioning as expected by connecting to it. You will need the public IP address or DNS name of the instance along with your PEM key file.

Open your terminal and run the following SSH command. Replace "ec2-demo.pem" with the path to your PEM file, and adjust the username ("ubuntu" for Ubuntu AMIs) as required:

```
ssh -i ec2-demo.pem ubuntu@<your_instance_public_ip_or_dns>
```

If the connection is successful, you will be logged into your EC2 instance, enabling you to execute commands as needed.

## Step 9: Terminating the Instance

After verifying the connection, it is important to terminate the instance if it is no longer required to avoid unnecessary charges. To terminate, navigate to the EC2 console, select the instance, choose **Instance State**, and then click **Terminate**. The instance status will update as it shuts down and will eventually be removed.

This concludes the step-by-step demo on deploying an EC2 instance on AWS. For further information, explore additional [AWS Documentation](https://aws.amazon.com/documentation/) or related guides on [EC2 Instances](https://aws.amazon.com/ec2/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/81adfa5c-e9dd-4c10-9d15-324acf21e575)**
>
> Watch video content
