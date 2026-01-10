# Creating and Managing Services With CloudFormation Templates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-3-Deployment-Provisioning-and-Automation/Creating-and-Managing-Services-With-CloudFormation-Templates)

---

## Table of Contents

- Creating and Managing Services With CloudFormation Templates
  - Overview of CloudFormation Templates
  - Structure of a CloudFormation Template
  - Deployment Process
  - Updating and Deleting Stacks
  - CloudFormation Designer
  - Conclusion
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 3 Deployment Provisioning and Automation

# Creating and Managing Services With CloudFormation Templates

In this lesson, we dive deep into creating and managing AWS services using CloudFormation templates—an essential part of the Infrastructure as Code (IaC) approach. CloudFormation templates can be written in YAML or JSON, and while tools like the AWS Cloud Development Kit (CDK) can generate these templates, our focus here is solely on CloudFormation and the AWS CDK.

## Overview of CloudFormation Templates

CloudFormation templates, when executed, create stacks—a collection of AWS resources defined in the template. By uploading your template file to an S3 bucket or integrating it into your CI/CD pipeline, you can automate the deployment of various AWS services. Note that a standard template deploys a single stack to one region by default. To deploy stacks across multiple accounts or regions, you must use the StackSets feature.

Below is an illustrative diagram summarizing the components and structure of a CloudFormation template. It highlights key features such as the collection of resources, more than 500 resource types, configuration via properties, dependency management, and the ability to author templates in YAML or JSON.

![The image describes CloudFormation Template Components, highlighting features such as a collection of resources, over 500 resource types, configuration by properties, dependency management, and support for YAML or JSON.](https://kodekloud.com/kk-media/image/upload/v1752860285/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Creating-and-Managing-Services-With-CloudFormation-Templates/cloudformation-template-components-overview.jpg)

## Structure of a CloudFormation Template

A typical CloudFormation template includes several sections:

1.  **AWS Template Format Version & Resources** (Required)  
    These are essential to define the template version and the AWS resources to be deployed.
2.  **Description**  
    Provides an overview of what the template accomplishes.
3.  **Metadata**  
    Stores supplementary information about your template.
4.  **Parameters**  
    Allows dynamic input at runtime (e.g., environment type like production or development, or instance size).
5.  **Mappings**  
    Facilitates key-value lookups, such as mapping region-specific AMI IDs.
6.  **Conditions**  
    Introduces logic to decide when certain resources should be created. For example, you might launch larger instances only in production.
7.  **Outputs**  
    Exposes key values such as DNS names or IP addresses for subsequent use or for other stacks.

> [!important]
> **Note**
>
> For example, a template might ask whether the environment is production or development and configure resources based on that input. Parameters and conditions play a vital role in making these decision-based adjustments.

## Deployment Process

When a CloudFormation template is deployed, the service performs the following steps:

1.  **Defining Resources**  
    Specify which AWS services (e.g., EC2, RDS, networking components) you wish to provision.
2.  **Deploying the Template**  
    CloudFormation processes the template to create a corresponding stack.
3.  **Monitoring Stack Events and Outputs**  
    Track the deployment progress, and review outputs such as resource IDs or URLs.

The diagram below visually describes these steps:

![The image illustrates three steps for creating services with CloudFormation templates: defining resources, deploying the template, and monitoring stack events.](https://kodekloud.com/kk-media/image/upload/v1752860286/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Creating-and-Managing-Services-With-CloudFormation-Templates/cloudformation-services-steps-diagram.jpg)

## Updating and Deleting Stacks

After deployment, you can update or delete resources as needed:

- **Change Sets**:  
  CloudFormation offers change sets to preview the impact of any modifications to your template. This ensures that unintended changes, such as accidental deletion of critical resources (e.g., databases), are avoided.

  The following diagram outlines the process of updating a stack using change sets:

  ![The image is a flowchart illustrating the process of updating a stack using change sets in AWS CloudFormation, showing steps from creating a change set to executing it.](https://kodekloud.com/kk-media/image/upload/v1752860287/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Creating-and-Managing-Services-With-CloudFormation-Templates/aws-cloudformation-update-stack-flowchart.jpg)

- **Deleting a Stack**:  
  Deleting a stack removes all associated resources. However, be cautious as certain configurations (like S3 bucket retention or delete protection) might block the deletion of some resources. It is advisable to review dependencies and protections before initiating a delete operation.

  ![The image shows a CloudFormation interface with a "Delete" action highlighted, indicating a stack deletion process with the status "DELETE_IN_PROGRESS."](https://kodekloud.com/kk-media/image/upload/v1752860288/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Creating-and-Managing-Services-With-CloudFormation-Templates/cloudformation-delete-stack-status.jpg)

> [!important]
> **Warning**
>
> Before deleting a stack, ensure that you have accounted for any data retention requirements or dependencies that might prevent resource deletion.

## CloudFormation Designer

In addition to using the AWS CLI or console for managing stacks, AWS CloudFormation Designer offers a graphical interface for visualizing your stack's architecture. Although it can sometimes be clunky, this integrated tool supports both JSON and YAML formats, aiding in the creation and modification of CloudFormation templates.

![The image shows a screenshot of the CloudFormation Designer interface, featuring a graphical tool for creating and modifying CloudFormation templates with a drag-and-drop interface and integrated JSON and YAML editor.](https://kodekloud.com/kk-media/image/upload/v1752860289/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Creating-and-Managing-Services-With-CloudFormation-Templates/cloudformation-designer-screenshot.jpg)

## Conclusion

A CloudFormation template is composed of multiple sections—from required format version and resources to optional parameters, mappings, conditions, and outputs. By writing your template in YAML or JSON, CloudFormation orchestrates the creation, updating, and deletion of stacks to manage your AWS resources efficiently.

Stay tuned for the next article, where we'll explore more advanced CloudFormation concepts and best practices.

Happy Building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/ecf54f06-735d-43ee-b254-f6ff814e676f/lesson/2cae054b-b5ba-4068-ab34-1afb2389a182)**
>
> Watch video content
