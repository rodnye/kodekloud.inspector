# Demo Creating and Managing AMIs with EC2 Image Builder - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-3-Deployment-Provisioning-and-Automation/Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder)

---

## Table of Contents

- Demo Creating and Managing AMIs with EC2 Image Builder
  - Getting Started: Pipeline Creation
  - Creating a New Recipe
  - Configuring Components
  - Build and Infrastructure Configuration
  - Distribution Settings
  - Pipeline Execution and Troubleshooting
  - Launching an EC2 Instance from the New AMI
  - Conclusion
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 3 Deployment Provisioning and Automation

# Demo Creating and Managing AMIs with EC2 Image Builder

Welcome to this lesson on building an EC2 Image Builder pipeline. In this guide, we explore how to create a robust AWS AMI using EC2 Image Builder. If you’re already familiar with tools like [HashiCorp Packer](https://learn.kodekloud.com/user/courses/hashicorp-packer) or other third-party image builders, you’ll appreciate the streamlined process that EC2 Image Builder offers for AWS environments.

## Getting Started: Pipeline Creation

We begin by setting up a basic image pipeline called “KK, my first pipeline.” One of the initial steps is to provide a descriptive name for your pipeline. Although the description is optional, it greatly aids in managing multiple pipelines by clarifying their purposes.

![The image shows an AWS EC2 Image Builder interface where a user is specifying pipeline details, including the pipeline name and description. Options for enhanced metadata collection and security scanning settings are also visible.](https://kodekloud.com/kk-media/image/upload/v1752860302/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-ec2-image-builder-pipeline.jpg)

By default, EC2 Image Builder collects metadata from your images. You have the option to enable security scanning—this launches Amazon Inspector to perform security checks. For the purpose of this demo, we will keep security scanning disabled.

![The image shows the "Security scanning settings" page in AWS EC2 Image Builder, indicating that both EC2 and ECR security scanning are not enabled. There are instructions for activating Amazon Inspector for security scanning.](https://kodekloud.com/kk-media/image/upload/v1752860304/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-ec2-image-builder-security-scanning.jpg)

You may either schedule the pipeline with a cron expression or trigger it manually. For our example, we opt for manual execution to ensure ample configuration space as we add further settings.

## Creating a New Recipe

When building your pipeline, you can choose to either use an existing recipe or create a new one. In this demo, we create a new recipe named “KodeKloudMyFirstRecipe” with an assigned version number. Remember, every update to the recipe should increment the version to maintain version control.

![The image shows an AWS console screen where a user is configuring an EC2 Image Builder recipe, including fields for name, version, and description.](https://kodekloud.com/kk-media/image/upload/v1752860305/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-ec2-image-builder-recipe.jpg)

For the base image, select "Managed Images" and choose Ubuntu. Although options exist to pull images from the marketplace, use a custom AMI, or import from a virtual machine, we will continue with the default managed image. In this example, select “Ubuntu Server 24 LTS x86” (and not ARM) with the latest operating system version. In a production environment, consider pinning versions for consistency, unless you have extensive testing protocols in place.

![The image shows an AWS console interface for configuring an image, with options for selecting the image origin, image name, and auto-versioning options. The selected image is "Ubuntu Server 24 LTS x86."](https://kodekloud.com/kk-media/image/upload/v1752860305/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-console-configure-image-ubuntu.jpg)

Optionally, you can provide additional instructions such as installing extra packages during the image creation. For our demo, we will skip modifying the instance configuration, leaving the working directory at its default setting (“temp”).

## Configuring Components

Scroll down to the components section where you can add various elements like the CloudWatch agent or Java. The order of components is significant as it defines the sequence of installations and tests during the build process. In this example, we include only the component for automatic updates.

![The image shows an AWS console interface for selecting build components to produce an output AMI, specifically for Ubuntu. It lists components like "amazon-cloudwatch-agent-linux" and "amazon-corretto-11-apt-generic" with descriptions and options to select them.](https://kodekloud.com/kk-media/image/upload/v1752860306/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-console-ami-build-ubuntu.jpg)

Additionally, you can modify the EBS storage settings. In this demo, we adjust the storage size to 10 GB.

![The image shows an AWS console interface for configuring storage volumes, specifically an EBS volume with options for device name, size, snapshot, volume type, and encryption settings.](https://kodekloud.com/kk-media/image/upload/v1752860307/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-console-ebs-volume-configuration.jpg)

## Build and Infrastructure Configuration

Proceed to configure the build and test workflows. While custom workflows with specific IAM roles can be set up, we will stick to the service-provided defaults for simplicity. Click “Next” to move on to the infrastructure configuration.

At this stage, you can create a new infrastructure configuration or reuse an existing one. This configuration covers settings such as the IAM instance profile, instance types, VPC, security groups, key pairs, and metadata options. In our example, we create a new configuration named “KK InfraConfig” and assign it the Systems Manager role.

![The image shows an AWS EC2 Image Builder configuration screen where a user is entering a name and selecting an IAM role for the instance profile. The interface includes options for adding a description and choosing SNS topics.](https://kodekloud.com/kk-media/image/upload/v1752860308/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-ec2-image-builder-configuration.jpg)

Choose the default VPC and a default subnet (for example, US East 1B) along with the default security group. You may also modify instance metadata to force version 2, select a key pair, and determine the instance type. Initially, a T4 series instance was selected; however, an error later indicates that T4a series instances are ARM-based while our Ubuntu image is x86.

> [!important]
> **Important**
>
> Ensure that the instance type matches the operating system architecture. In this demo, we correct the configuration by switching from a T4 to a T3 series instance.

![The image shows an AWS console interface for configuring VPC, subnet, and security groups for an EC2 instance. It includes options to select a Virtual Private Cloud (VPC), Subnet ID, and choose security groups.](https://kodekloud.com/kk-media/image/upload/v1752860310/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-console-vpc-subnet-security-groups.jpg)

## Distribution Settings

Define the distribution settings that determine in which regions the AMI will be available. For simplicity, we will use the default settings, placing the image in US East 1. You can, however, expand distribution to multiple regions by adding target accounts and custom AMI names.

![The image shows an AWS console interface for defining distribution settings, with options to create, use existing, or create new distribution settings, and a table for region settings.](https://kodekloud.com/kk-media/image/upload/v1752860311/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-console-distribution-settings.jpg)

After reviewing all settings, click “Next” to create the pipeline. The process involves launching a parent instance, downloading build components, executing a build phase followed by a testing phase, and finally generating an AMI if all tests pass. If testing fails, the image is not marked as available.

![The image shows an AWS EC2 Image Builder interface, specifically the review page for creating an image pipeline, detailing steps like pipeline details, image recipe, and image creation process.](https://kodekloud.com/kk-media/image/upload/v1752860312/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-ec2-image-builder-review.jpg)

## Pipeline Execution and Troubleshooting

After starting the pipeline, you can monitor its progress, including details on the image recipe, infrastructure configuration, and distribution settings. At one point, the pipeline might fail due to an architecture mismatch—this error occurs if an ARM image is referenced while the operating system is x86.

![The image shows an AWS EC2 Image Builder interface with a failed image status due to an architecture mismatch error. A pop-up explains the error, indicating a discrepancy between the instance type architecture and the AMI architecture.](https://kodekloud.com/kk-media/image/upload/v1752860313/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-ec2-image-builder-error.jpg)

Since infrastructure configurations cannot be modified after creation, you must create a new pipeline with the corrected settings. Reuse the same x86 image recipe, build components, and storage configuration (10 GB). Additionally, select a compatible T3 series instance (for example, T3 extra large) instead of the T4 series instance, while keeping the VPC, subnet, and distribution settings unchanged.

![The image shows an AWS console screen for defining distribution settings, with options for creating or using existing distribution settings and a table for region settings.](https://kodekloud.com/kk-media/image/upload/v1752860314/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-console-distribution-settings-2.jpg)

Once the new pipeline is established, run it and delete the previous incompatible pipeline. With a successful build and test phase, the pipeline status will eventually show as “available.”

![The image shows an AWS EC2 Image Builder interface displaying details of an image recipe, including the recipe name, version, and base image information.](https://kodekloud.com/kk-media/image/upload/v1752860315/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-ec2-image-builder-recipe-2.jpg)

## Launching an EC2 Instance from the New AMI

When the pipeline status changes from “building” to “testing” and finally to “available,” your new AMI is ready in your account. To launch an instance using this AMI, navigate to the EC2 console and select the newly created AMI from the list. Although the AMI might default to a T2 micro instance, you can choose a more robust instance type, such as T3 XLarge, based on your requirements.

![The image shows an AWS EC2 console screen where a user is preparing to launch an instance using a specific Amazon Machine Image (AMI) with details like instance type, security group, and storage volume.](https://kodekloud.com/kk-media/image/upload/v1752860316/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-ec2-launch-instance-ami.jpg)

Finalize the launch by configuring key pairs, network settings, and any additional options. Once launched, the instance will run Ubuntu 24 LTS with all specified components, including a 10 GB drive, Java, and the Systems Manager Agent.

![The image shows an AWS EC2 instance launch configuration screen, detailing network settings and a summary of the instance specifications, including the software image, server type, and security group options.](https://kodekloud.com/kk-media/image/upload/v1752860318/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-ec2-instance-launch-configuration.jpg)

## Conclusion

EC2 Image Builder offers a comprehensive process to create, test, and distribute AMIs by orchestrating an image recipe, infrastructure configuration, and detailed workflows. This lesson demonstrated the creation of a pipeline using a default workflow, while also addressing common pitfalls such as architecture mismatches.

![The image shows an AWS EC2 Image Builder interface with details about an image pipeline, including output images and their status. The pipeline is enabled, and an AMI version is available.](https://kodekloud.com/kk-media/image/upload/v1752860320/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Managing-AMIs-with-EC2-Image-Builder/aws-ec2-image-builder-pipeline-2.jpg)

We hope you found this guide helpful in understanding how to build and manage AMIs with EC2 Image Builder. Happy building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/ecf54f06-735d-43ee-b254-f6ff814e676f/lesson/e3a2367b-5867-45c3-89f9-1bcc4dd7ebe9)**
>
> Watch video content
