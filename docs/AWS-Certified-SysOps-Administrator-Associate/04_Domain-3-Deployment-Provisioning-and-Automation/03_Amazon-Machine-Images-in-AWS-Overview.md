# Amazon Machine Images in AWS Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-3-Deployment-Provisioning-and-Automation/Amazon-Machine-Images-in-AWS-Overview)

---

## Table of Contents

- Amazon Machine Images in AWS Overview
  - What Is an AMI?
  - Characteristics of an AMI
  - Benefits of Using AMIs
  - Launching an AMI
  - Storage and Lifecycle of AMIs
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 3 Deployment Provisioning and Automation

# Amazon Machine Images in AWS Overview

In this article, we explore Amazon Machine Images (AMIs) in AWS. AMIs are essentially golden bootable images that serve as the starting point for your EC2 virtual machines, enabling immutable infrastructure across your deployments. Read on to understand how AWS manages AMIs and how you can leverage them to scale and secure your applications.

## What Is an AMI?

An AMI is a pre-configured image that includes the operating system, configuration data, file system data, and optional template settings such as instance sizing. Much like a container image packages everything needed to run an application, an AMI bundles all the data required to boot an EC2 instance. AWS supports a variety of operating systems, including Ubuntu (and other Linux distributions), Windows, and macOS. You can also import virtual machines from other infrastructures like VMware. Although AWS has experimented with older systems such as SunOS or classic Unix variants, its primary support focuses on modern Linux, Windows, and macOS.

AMIs can launch multiple virtual machine copies across public and private subnets in your VPCs. They can be copied between regions, and due to the operating system often defining the processor architecture (e.g., Intel or ARM), the image includes important details such as the root device type and sometimes the virtualization type (such as HVM or PV).

![The image is a diagram illustrating the components of an Amazon Machine Image (AMI), showing a VPC with public and private subnets, and listing attributes like region, operating system, processor architecture, root device type, and virtualization type.](https://kodekloud.com/kk-media/image/upload/v1752860252/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Amazon-Machine-Images-in-AWS-Overview/ami-components-vpc-diagram.jpg)

## Characteristics of an AMI

AMIs typically come in two primary types based on their storage:

- **Elastic Block Store (EBS)-Backed AMIs:** These are the most common. They leverage EBS volumes that can be snapshotted or backed up.
- **Instance Store-Backed AMIs:** Though available, these rely on the underlying instance storage and are less frequently used.

Different permissions can be set when launching an AMI. While there may be multiple virtualization types (HVM and PV), modern AWS instances predominantly run on HVM, which leverages hardware virtualization extensions.

![The image outlines the characteristics of an AMI, including root device type, launch permission, and virtualization type. It lists options such as EBS-backed and instance store-backed AMI, public, explicit, and implicit permissions, and HVM and PV virtualization types.](https://kodekloud.com/kk-media/image/upload/v1752860253/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Amazon-Machine-Images-in-AWS-Overview/ami-characteristics-root-device-virtualization.jpg)

## Benefits of Using AMIs

Using AMIs in your AWS environment provides multiple benefits:

1.  **Scalability:** Launch thousands of virtual machine instances from a single AMI.
2.  **Customization:** Create and upload fully customized AMIs that meet your organization’s standards. Version control is enhanced by tagging, dating, and setting permissions (private or public) on your AMIs.
3.  **Flexibility:** Public AMIs are available for well-known operating systems like Ubuntu, Red Hat, or Windows. Companies often build private AMIs based on controlled sources to satisfy specific compliance or security requirements.

> [!important]
> **Note**
>
> When exploring a public AMI, you will typically find details such as the architecture (e.g., x86, ARM), the default username for logins, verified provider tags signifying a certified image, and long-term support metrics (for example, Amazon Linux may offer a five-year support cycle).

Amazon Linux, for instance, is AWS’s proprietary Linux distribution based on Red Hat Enterprise Linux (RHEL).

![The image shows a user interface for finding an Amazon Machine Image (AMI) on AWS, with options for different operating systems like Amazon Linux, macOS, Ubuntu, and Windows. It includes details about the selected AMI, such as architecture and description.](https://kodekloud.com/kk-media/image/upload/v1752860254/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Amazon-Machine-Images-in-AWS-Overview/aws-ami-user-interface-options.jpg)

## Launching an AMI

Launching an EC2 instance from an AMI involves a series of steps:

1.  **Image Creation:** Launch a virtual machine from an existing AMI, customize your system, and then use the AWS Management Console, CLI, or tools like Terraform to create a snapshot of the modified instance.
2.  **Snapshot Creation:** Create an EBS snapshot to capture the disk state without disrupting the running instance. This snapshot becomes the basis for your custom AMI, which can be replicated or used to launch new instances.

You can also employ tools such as Packer to build images. However, AWS’s official solution for this purpose is the EC2 Image Builder, which streamlines the creation of custom AMIs.

![The image illustrates the AMI lifecycle and creation process, detailing steps to create an image using an EC2 instance, an EBS snapshot, and EC2 Image Builder.](https://kodekloud.com/kk-media/image/upload/v1752860255/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Amazon-Machine-Images-in-AWS-Overview/ami-lifecycle-creation-process.jpg)

## Storage and Lifecycle of AMIs

AMIs reside in a concealed section of Amazon S3. Their storage footprint is generally small, but costs may add up if you maintain a large number of substantial AMIs.

The typical AMI lifecycle involves the following stages:

- **Registration:** Create and register a new AMI from an instance or an EBS snapshot.
- **Usage:** Utilize the AMI to launch new EC2 instances.
- **Deregistration and Deletion:** Once an AMI is no longer needed, deregister it and remove the associated EBS snapshots and other resources to avoid ongoing storage charges.

![The image illustrates the AMI lifecycle and storage process, showing the interaction between Amazon EC2, AMI, and Amazon S3 within a VPC in a region. It depicts the storing and restoring of AMI to and from Amazon S3.](https://kodekloud.com/kk-media/image/upload/v1752860256/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Amazon-Machine-Images-in-AWS-Overview/ami-lifecycle-storage-ec2-s3.jpg)

![The image illustrates the AMI lifecycle process, showing steps to deregister and delete an AMI, including EBS snapshots and EC2 instances.](https://kodekloud.com/kk-media/image/upload/v1752860257/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Amazon-Machine-Images-in-AWS-Overview/ami-lifecycle-deregister-delete-diagram.jpg)

> [!important]
> **Warning**
>
> Ensure that you deregister outdated AMIs and delete unused snapshots on time to prevent accumulating unnecessary storage costs.

This comprehensive overview covers the essential concepts behind AMIs in AWS, including how they are created, stored, and managed. In subsequent sections and demonstrations, we will delve deeper into working with AMIs, providing step-by-step walkthroughs for creation and lifecycle management processes.

For more information on AWS EC2 and related topics, consider reviewing the [AWS Documentation](https://docs.aws.amazon.com/ec2/) and other linked resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/ecf54f06-735d-43ee-b254-f6ff814e676f/lesson/a5934be7-7e57-4de3-955d-98fb4699d426)**
>
> Watch video content
