# Demo The Anatomy of a CloudFormation Template - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-3-Deployment-Provisioning-and-Automation/Demo-The-Anatomy-of-a-CloudFormation-Template)

---

## Table of Contents

- Demo The Anatomy of a CloudFormation Template
  - Template Metadata and Description
  - Parameters
  - Mappings and Conditions
  - Transform Section
  - Resources
  - Outputs
  - Recap
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 3 Deployment Provisioning and Automation

# Demo The Anatomy of a CloudFormation Template

Welcome to this in-depth tutorial on CloudFormation templates. In this guide, we explore the structure of a CloudFormation template—an essential AWS service for provisioning resources. Although many industries opt for Terraform for its multi-cloud capabilities, CloudFormation remains vital for AWS-native environments and is a critical topic for AWS certification exams.

Below, you’ll find a comprehensive sample CloudFormation template that covers almost every section available. Use this guide to better understand how to design and customize your own templates.

## Template Metadata and Description

Every CloudFormation template begins with the template format version. In this example, we use "2010-09-09", a long-established standard. The Description field provides a brief summary of the template's purpose, while the Metadata section supports additional information used by processes and applications—such as organizing parameter groups and labels.

```
AWSTemplateFormatVersion: '2010-09-09'
Description: >
  Sample CloudFormation Template demonstrating all sections.


Metadata:
  Version: '1.0'
  AWS::CloudFormation::Interface:
    ParameterGroups:
      - Label:
          default: "Network Configuration"
        Parameters:
          - VpcId
          - SubnetId
    ParameterLabels:
      VpcId:
        default: "VPC ID"
      SubnetId:
        default: "Subnet ID"


Parameters:
  EnvType:
    Description: Environment type.
    Type: String
```

> [!important]
> **Note**
>
> The Metadata section is particularly useful for customizing the presentation of parameters when users launch the stack.

## Parameters

The Parameters section defines the user inputs needed during stack creation. This section allows you to prompt users for essential information such as the environment type (e.g., "dev" or "prod") or network identifiers such as VPC and Subnet IDs.

```
Parameters:
  EnvType:
    Description: Environment type.
    Type: String
    Default: dev
    AllowedValues:
      - dev
      - prod
  VpcId:
    Type: AWS::EC2::VPC::Id
    Description: Enter the VPC ID
  SubnetId:
    Type: AWS::EC2::Subnet::Id
    Description: Enter the Subnet ID
```

## Mappings and Conditions

Mappings allow you to create key-value associations, such as linking AWS regions to their respective AMI IDs. This is useful because AMIs are region-specific. In the template, the `Fn::FindInMap` function dynamically retrieves the correct AMI based on the region where the stack is deployed.

```
Mappings:
  RegionMap:
    us-east-1:
      AMI: ami-0ff8a91507f77f867
    us-west-2:
      AMI: ami-0bd828fd58c52235
```

Conditions provide control over resource creation. For instance, you might want to deploy extra production-specific resources only when the `EnvType` parameter is set to "prod".

```
Conditions:
  CreateProdResources: !Equals [ !Ref EnvType, 'prod' ]
```

> [!important]
> **Tip**
>
> Utilize Mappings and Conditions together to create flexible templates that adapt to different deployment environments.

## Transform Section

The Transform section is optional and is primarily used with the AWS Serverless Application Model (SAM). By declaring a transform, you can simplify the definitions for serverless applications, such as Lambda functions. In this example, we include the SAM transform as shown below.

```
Transform:
  - AWS::Serverless-2016-10-31
```

## Resources

The Resources section is a mandatory part of any CloudFormation template. It declares all AWS resources to be created by the template. In this example, we define both an EC2 instance and an S3 bucket. Note that the creation of the S3 bucket is conditional, based on whether the environment is set to production as defined by the Conditions section.

```
Resources:
  MyEC2Instance:
    Type: 'AWS::EC2::Instance'
    Properties:
      ImageId: !FindInMap [ RegionMap, !Ref 'AWS::Region', AMI ]
      InstanceType: t2.micro
      SubnetId: !Ref SubnetId
      Tags:
        - Key: Name
          Value: MyEC2Instance


  MyS3Bucket:
    Type: AWS::S3::Bucket
    Condition: CreateProdResources
    Properties:
      BucketName: !Sub my_sample_bucket_${AWS::AccountId}-${AWS::Region}
      AccessControl: Private
```

> [!important]
> **Warning**
>
> Ensure that resources conditioned on specific environments are thoroughly tested to prevent unexpected deployment issues.

## Outputs

The Outputs section is optional but highly valuable. It allows you to retrieve important information from the created resources—such as the EC2 instance ID or S3 bucket name—after the stack is deployed. Conditions can also be applied here to display outputs only when specific criteria are met.

```
Outputs:
  InstanceId:
    Description: The Instance ID of the EC2 instance
    Value: !Ref MyEC2Instance


  BucketName:
    Description: The name of the S3 bucket
    Value: !Ref MyS3Bucket
    Condition: CreateProdResources
```

## Recap

In this tutorial, we dissected the anatomy of a CloudFormation template and highlighted its key components:

- **Template Version and Description:** Establish the foundational metadata.
- **Metadata:** Supports custom organization and labeling of parameters.
- **Parameters:** Prompts users for essential inputs during deployment.
- **Mappings:** Provides key-value lookups, particularly for region-specific configurations.
- **Conditions:** Controls resource creation based on deployment criteria.
- **Transform:** Supports serverless application definitions with AWS SAM integration.
- **Resources:** Declares all AWS components to be provisioned.
- **Outputs:** Facilitates retrieval of resource information post-deployment.

Understanding these sections will empower you to design flexible, efficient, and AWS-native infrastructure with CloudFormation. For further details on AWS CloudFormation, consider visiting the [AWS CloudFormation Documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html).

Thank you for reading this lesson, and happy templating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/ecf54f06-735d-43ee-b254-f6ff814e676f/lesson/5fe59871-7ff5-4bf8-ab34-5e24d8ee3750)**
>
> Watch video content
