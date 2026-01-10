# EC2 Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/EC2-Basics)

---

## Table of Contents

- EC2 Basics
  - Client-Server Architecture
  - What is an EC2 Instance?
  - Amazon Machine Images (AMIs)
  - Secure Access with SSH Keys
  - EC2 Instance Lifecycle
  - Bootstrapping with User Data
  - Security Groups
  - Elastic Block Store (EBS)
  - Integration with Elastic Load Balancing and Auto Scaling
  - Elastic IP Addresses
  - Launch Templates
  - EC2 Instance Placement
  - EC2 Pricing Options
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# EC2 Basics

In this article, we explore AWS EC2, a service that enables you to deploy and run applications on virtual servers in the cloud. With EC2, you can bypass the traditional challenges of managing physical hardware, including purchasing, setup, maintenance, and hardware failures. Instead, you focus on deploying your application onto a virtual server, letting AWS manage the underlying infrastructure.

## Client-Server Architecture

In a client-server architecture, a server supplies resources to one or more clients. For example, a web server provides HTML files to your browser. Whether your application runs on physical or virtual servers, end users access it via web browsers or mobile applications by sending requests and receiving responses.

Traditionally, setting up a physical server required:

- Renting space in a data center
- Purchasing a physical server (e.g., Dell or HP)
- Installing and securing an operating system (e.g., Ubuntu)
- Installing required dependencies and deploying your application
- Managing hardware issues like disk failures

With AWS EC2, you rent a virtual server in the cloud, deploy your application, and let AWS handle the heavy lifting.

![The image illustrates a process where a developer deploys an application to a server, which then handles requests and responses with end users.](https://kodekloud.com/kk-media/image/upload/v1752858189/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics/developer-deploys-application-server.jpg)

## What is an EC2 Instance?

An EC2 instance is a virtual server that provides the computing power of a physical host. You can select an instance type that matches your application's needs in terms of CPU, memory, storage, and networking. AWS offers various instance types, including:

- **General Purpose:** Balanced compute, memory, and networking for diverse applications.
- **Compute-Optimized:** High-performance processors for compute-bound applications.
- **Memory-Optimized:** Ideal for workloads that require processing large datasets in memory.
- **Storage-Optimized:** Designed for applications that need high I/O operations.
- **GPU Instances:** Perfect for machine learning, deep learning, and other GPU-intensive tasks.

## Amazon Machine Images (AMIs)

When you deploy an EC2 instance, you begin by selecting an AMI (Amazon Machine Image). An AMI is essentially a blueprint that includes the operating system and any pre-installed software. This eliminates the need to manually install and configure the operating system and software requirements.

![The image illustrates the process of deploying an application by a developer to a server and to Amazon EC2 on AWS Cloud, showing the interaction between the server and end users through requests and responses.](https://kodekloud.com/kk-media/image/upload/v1752858190/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics/application-deployment-aws-ec2-diagram.jpg)

Think of an AMI as a recipe that can be used to create multiple identical EC2 instances, ensuring consistent deployments. You can create public AMIs shared with the AWS community, private AMIs for your organization, or shared AMIs for specific AWS accounts.

![The image illustrates the components of an Amazon Machine Image (AMI) used to create an AWS EC2 instance, showing elements like the operating system and software.](https://kodekloud.com/kk-media/image/upload/v1752858191/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics/ami-aws-ec2-components-diagram.jpg)

Modifications made to an instance—such as adding users or configuring firewall settings—can be preserved by creating a new custom AMI, which then serves as an updated blueprint for future deployments.

![The image illustrates the concept of Amazon EC2, showing an Amazon Machine Image (AMI) being used to create three separate instances.](https://kodekloud.com/kk-media/image/upload/v1752858192/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics/amazon-ec2-ami-instances-diagram.jpg)

## Secure Access with SSH Keys

To ensure secure access to an EC2 instance, AWS uses SSH along with a key pair (public and private keys). At launch, you specify a key pair. The public key is embedded in the instance while you keep the private key safe, enabling secure authentication for remote logins.

![The image illustrates a concept related to Amazon EC2, showing a private key associated with a user and a public key associated with an EC2 instance.](https://kodekloud.com/kk-media/image/upload/v1752858194/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics/amazon-ec2-private-public-keys.jpg)

## EC2 Instance Lifecycle

An EC2 instance passes through several states during its lifecycle:

- **Pending:** The instance is launching.
- **Running:** The instance is operational.
- **Stopping:** The instance is preparing to shut down.
- **Stopped:** The instance is shut down but can be restarted.
- **Shutting-down:** The instance is about to be terminated.
- **Terminated:** The instance is permanently deleted and can no longer be used.

![The image illustrates the EC2 Instance Lifecycle, showing the transitions between states: Pending, Running, Stopping, and Stopped.](https://kodekloud.com/kk-media/image/upload/v1752858195/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics/ec2-instance-lifecycle-diagram.jpg)

## Bootstrapping with User Data

When launching an EC2 instance, you can provide user data (such as shell scripts or cloud-init directives) that executes at startup. This bootstrap script can automatically install software, configure settings, or run initial setup tasks. Note that the user data size is limited to 16 kilobytes.

## Security Groups

Security groups in AWS EC2 act as virtual firewalls that control inbound and outbound traffic to your instance. For example, if you deploy a web server, you may allow inbound traffic on ports 80 (HTTP) and 443 (HTTPS).

![The image illustrates the concept of an Amazon EC2 instance within a VPC, protected by a security group, showing inbound and outbound traffic.](https://kodekloud.com/kk-media/image/upload/v1752858197/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics/amazon-ec2-vpc-security-group-diagram.jpg)

## Elastic Block Store (EBS)

While EC2 handles compute tasks, persistent data storage is managed by Amazon Elastic Block Store (EBS). EBS volumes attach to your EC2 instances, storing critical data such as operating systems, applications, and databases. Additionally, you can take incremental snapshots of these volumes, which are stored in Amazon S3, to facilitate efficient backups and cost savings.

![The image is a diagram illustrating the structure of EC2 with EBS in a cloud environment, showing instances and EBS volumes within two availability zones (AZ) inside a VPC and region.](https://kodekloud.com/kk-media/image/upload/v1752858198/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics/ec2-ebs-structure-diagram.jpg)

![The image illustrates an AWS architecture diagram showing EC2 instances with EBS volumes within a VPC, across two availability zones, and EBS snapshots stored separately.](https://kodekloud.com/kk-media/image/upload/v1752858200/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics/aws-architecture-ec2-ebs-vpc-diagram.jpg)

## Integration with Elastic Load Balancing and Auto Scaling

EC2 seamlessly integrates with other AWS services to enhance performance and reliability:

- **Elastic Load Balancer (ELB):** Automates the distribution of incoming application traffic across multiple EC2 instances.
- **Auto Scaling Groups:** Dynamically adjusts the number of running instances to accommodate changes in traffic, ensuring consistent performance during peaks.

![The image is a diagram illustrating an AWS architecture with EC2 instances, Elastic Load Balancer (ELB), and Auto Scaling (AS) within a Virtual Private Cloud (VPC). It shows HTTP requests being distributed across two subnets.](https://kodekloud.com/kk-media/image/upload/v1752858201/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics/aws-architecture-ec2-elb-as-diagram.jpg)

## Elastic IP Addresses

EC2 instances often receive public IP addresses that might change if the instance is stopped and restarted. To maintain a consistent public IP, you can use Elastic IP addresses. These are static and can be remapped between instances as needed, ensuring consistent access to your application.

![The image illustrates a diagram showing a user making a request to an Amazon EC2 instance using an Elastic IP, with a response returning to the user.](https://kodekloud.com/kk-media/image/upload/v1752858202/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics/amazon-ec2-elastic-ip-diagram.jpg)

## Launch Templates

Launch templates allow you to define a standard configuration for your EC2 instances. These templates capture parameters like AMIs, security groups, subnets, and instance sizes. They are particularly useful when combined with auto scaling groups to ensure that new instances automatically meet your configuration requirements.

![The image illustrates the process of using an EC2 launch template by cloud professionals to create multiple EC2 instances. It shows a flow from a cloud professional to a launch template, which then leads to three EC2 instances.](https://kodekloud.com/kk-media/image/upload/v1752858204/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics/ec2-launch-template-instance-creation.jpg)

## EC2 Instance Placement

AWS provides multiple placement options to influence the physical location of your EC2 instances within a data center, optimizing performance and fault tolerance:

- **Cluster Placement Group:** Places instances close together to reduce latency and increase throughput, ideal for high-performance computing.
- **Partition Placement Group:** Distributes instances across logical partitions to minimize the risk of simultaneous hardware failures, perfect for distributed workloads like Hadoop.
- **Spread Placement Group:** Ensures instances are distributed across distinct hardware to limit the impact of hardware failures.

![The image illustrates three types of EC2 instance placements: Cluster Placement Group, Partition Placement Group, and Spread Placement Group, each with different configurations for distributing instances.](https://kodekloud.com/kk-media/image/upload/v1752858205/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics/ec2-instance-placement-groups-diagram.jpg)

## EC2 Pricing Options

AWS EC2 offers a range of pricing models to suit diverse application needs:

- **On-Demand:** Pay for compute capacity by the hour or second with no long-term commitments.
- **Spot Instances:** Bid on unused capacity at discounts of up to 90%; however, these instances can be interrupted if capacity is required.
- **Savings Plans:** Commit to a consistent hourly spend over a one- or three-year term for lower rates.
- **Reserved Instances:** Commit to a specific amount of compute power for a one- to three-year term for additional savings.
- **Dedicated Hosts:** Rent an entire physical server for compliant, exclusive use and license reusability.
- **Dedicated Instances:** Receive dedicated hardware exclusively for your use, ensuring isolation from other tenants.

![The image shows a chart of EC2 instance purchasing options, including On Demand, Spot, Saving Plans, Reserved Instances, Dedicated Hosts, and Dedicated Instances. Each option is represented by a colored box with an icon.](https://kodekloud.com/kk-media/image/upload/v1752858206/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics/ec2-instance-purchasing-options-chart.jpg)

Using these flexible pricing options, you can fine-tune your spending to best match your application's usage patterns and budget requirements.

## Summary

AWS EC2 provides a flexible, scalable, and cost-effective solution for running applications on virtual servers. By leveraging AMIs, security groups, EBS, launch templates, and a variety of placement and pricing options, you can tailor your cloud infrastructure to meet your specific needs while reducing operational overhead.

> [!important]
> **Note**
>
> With these fundamental concepts in mind, you are now equipped to deploy robust and scalable applications on AWS EC2. For further reading, visit the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/9ffe6c81-3acc-463c-8b80-37769a2b018f)**
>
> Watch video content
