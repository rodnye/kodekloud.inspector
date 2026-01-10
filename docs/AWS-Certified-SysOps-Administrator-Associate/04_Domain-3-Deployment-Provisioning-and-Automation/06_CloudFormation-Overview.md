# CloudFormation Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-3-Deployment-Provisioning-and-Automation/CloudFormation-Overview)

---

## Table of Contents

- CloudFormation Overview
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 3 Deployment Provisioning and Automation

# CloudFormation Overview

Welcome back, students. In this lesson, we explore CloudFormation—an essential AWS service for managing your infrastructure as code. CloudFormation plays a critical role in the SysOps Administrator Associate exam by providing a consistent, automated approach to deploying and managing AWS resources.

Traditionally, provisioning infrastructure has often involved manual scripts and procedures, using runbooks or version control systems to track changes. This ad hoc process can lead to inconsistencies and scalability challenges. AWS recommends embracing an Infrastructure-as-Code (IaC) model where you define your resources in templates for automated, repeatable deployments.

Think of it like constructing a building: rather than designing and constructing each component from scratch, builders rely on standardized blueprints and toolkits. Similarly, CloudFormation allows DevOps engineers to deploy infrastructure consistently by defining the architecture in templates. This ensures adherence to organizational standards and minimizes the risk of human error.

While tools like Terraform are popular in many organizations, note that the SysOps Administrator Associate exam exclusively emphasizes CloudFormation. Therefore, it is crucial to understand CloudFormation even if your organization uses other tools.

> [!important]
> **Key Concept**
>
> CloudFormation templates are written in JSON or YAML. When you submit a template, CloudFormation creates a stack—a collection of AWS resources defined by the template. Although CloudFormation itself is free, you are charged for the AWS resources it provisions.

Below is an example of a CloudFormation template that provisions an [EC2 instance](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2):

```
AWSTemplateFormatVersion: 2010-09-09
Description: A sample template
Resources:
  MyEC2Instance:
    Type: 'AWS::EC2::Instance'
    Properties:
      ImageId: ami-0ff8a91507f77f867
      InstanceType: t2.micro
      KeyName: testkey
      BlockDeviceMappings:
        - DeviceName: /dev/sdm
          Ebs:
            VolumeType: io1
```

In this template:

- The resource labeled "MyEC2Instance" defines an EC2 instance.
- The "ImageId" property specifies the Amazon Machine Image (AMI) used to launch the instance.
- The "InstanceType" sets the size and performance characteristics—in this case, a t2.micro.
- The "KeyName" property determines the key pair used for SSH access.
- The "BlockDeviceMappings" property configures the attached storage, mapping an EBS volume (of type "io1") to the instance at `/dev/sdm`.

Understanding AWS storage options is crucial, as different volume types such as GP2, GP3, and IO1 provide varying performance characteristics for diverse workloads.

CloudFormation further enhances reliability by enabling version control for your infrastructure definitions. Each update to a CloudFormation stack is versioned, and you can perform drift detection to ensure the actual deployed resources match the template. This feature not only promotes cost and time efficiency but also simplifies infrastructure management.

In summary, CloudFormation simplifies infrastructure management through repeatable, version-controlled templates that define resources in JSON or YAML. By submitting these templates to CloudFormation, you create stacks that encapsulate your entire infrastructure, ensuring consistency and scalability.

In upcoming sections, we will delve into advanced features such as drift detection, StackSets, and nested stacks. Continue exploring how CloudFormation brings industry best practices in infrastructure as code to your projects.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/ecf54f06-735d-43ee-b254-f6ff814e676f/lesson/b90165d4-89be-4668-98f3-526185a06546)**
>
> Watch video content
