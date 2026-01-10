# Service Catalog - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Management-and-Governance/Service-Catalog)

---

## Table of Contents

- Service Catalog
  - How AWS Service Catalog Works
  - Integration and Deployment
  - Key Components and Features
  - Watch Video
    - User Roles in AWS Service Catalog

---

## Content

AWS Solutions Architect Associate Certification

Services Management and Governance

# Service Catalog

In this lesson, we explore the AWS Service Catalog and its core components. Think of it as a carefully curated library of IT services. Just as a traditional library offers a well-maintained collection of books—with details such as title, author, publication date, and location—an AWS Service Catalog organizes and delivers IT services such as virtual machines, servers, software, and databases, including complete multi-tier application architectures.

Just like a librarian manages the selection of available resources, a cloud or IT administrator configures the AWS Service Catalog. They decide which services to include and control user access to ensure consistency and compliance.

![The image shows a comparison between a traditional library catalog and an AWS Service Catalog, with icons representing books and digital services, and user icons indicating different roles.](https://kodekloud.com/kk-media/image/upload/v1752865379/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Service-Catalog/library-catalog-vs-aws-service.jpg)

In a library, strict rules determine who can borrow resources, what items can be borrowed, and for how long. Similarly, the AWS Service Catalog enforces role-based access control, granting users permission only to a specific subset of services. This prevents unauthorized access and ensures that each user interacts only with the resources that match their responsibilities.

You might ask, why is a service catalog indispensable? Without a standardized process or consistent templates, different departments might configure resources differently, which can lead to inconsistent tagging, misconfiguration, and increased complexity in troubleshooting. Moreover, the absence of centralized governance could lead to non-compliant deployments, heightened security risks, and uncontrolled cloud spending. For enterprises handling multiple AWS accounts, manually managing these resources amplifies operational challenges and delays resource provisioning—prolonging time-to-market for new products and services.

![The image illustrates the challenges faced without using an AWS Service Catalog, including inconsistent deployments, lack of governance, uncontrolled spending, complexity in managing multi-account environments, and slow resource deployment.](https://kodekloud.com/kk-media/image/upload/v1752865380/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Service-Catalog/aws-service-catalog-challenges-illustration.jpg)

> [!important]
> **Key Benefit**
>
> By using AWS Service Catalog, organizations streamline resource deployment, enforce governance, and ensure consistent configuration across cloud environments.

## How AWS Service Catalog Works

The AWS Service Catalog helps organizations create and manage approved IT services on AWS. It functions as a repository of templates that define how to deploy these services. Each product in the catalog is an IT service defined by a CloudFormation template that specifies the necessary AWS resources, their relationships, and configurable parameters (such as security groups or key pairs). Deploying a product from the catalog ensures that it is provisioned exactly as specified, eliminating misconfiguration risks.

Portfolios in the service catalog group related products and include configuration settings and access controls. Administrators can tailor portfolios to different user groups, selectively granting access. Once a new version of a product is added to a portfolio, authorized users gain immediate access to the updated version—and portfolios can even be shared across multiple AWS accounts.

![The image shows a service catalog with products X, Y, and Z, where Product X includes VPC, EC2, RDS, and S3. It also displays portfolios A and B, each containing Products X and Y.](https://kodekloud.com/kk-media/image/upload/v1752865381/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Service-Catalog/service-catalog-products-x-y-z.jpg)

### User Roles in AWS Service Catalog

There are two primary user roles:

- **Catalog Administrator:** Configures the catalog by creating products using CloudFormation templates, organizing them into portfolios, and setting up user access permissions.
- **End User:** Utilizes the AWS Management Console to search for, select, and launch products based on their granted permissions.

A typical workflow involves the catalog administrator creating a product, organizing it into an appropriate portfolio, and distributing it. End users then discover the product in the catalog, launch it when needed, and manage its lifecycle as required.

![The image illustrates a workflow for catalog administrators and end users, detailing steps from creating and distributing a product portfolio to discovering and managing a product lifecycle.](https://kodekloud.com/kk-media/image/upload/v1752865382/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Service-Catalog/catalog-workflow-product-lifecycle.jpg)

## Integration and Deployment

AWS Service Catalog leverages AWS CloudFormation to deploy all underlying resources. Each product corresponds to a CloudFormation stack, ensuring that deployments remain consistent with the defined templates. Access to both products and portfolios is managed using AWS Identity and Access Management (IAM) policies, which ensure that only authorized users can perform deployment or modification tasks. For enterprises with multiple AWS accounts managed through AWS Organizations, the service catalog can be shared, enabling consistent and centrally managed service deployments.

![The image is a diagram illustrating the AWS Service Catalog workflow, showing interactions with AWS CloudFormation, IAM, and various AWS services and portfolios. It highlights the integration and management of products within AWS.](https://kodekloud.com/kk-media/image/upload/v1752865383/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Service-Catalog/aws-service-catalog-workflow-diagram.jpg)

## Key Components and Features

Below is an overview of the essential AWS Service Catalog components:

- **Products:** Collections of AWS resources defined by a CloudFormation template. A product can be as simple as a single Amazon Linux compute instance or as complex as a full multi-tier web application.
- **Portfolios:** Groups of products managed together with IAM policies, ensuring that access is granted only to the appropriate users.
- **CloudFormation Integration:** Each product is deployed via an AWS CloudFormation stack, which maintains consistency in resource provisioning.
- **Granular Access Control:** Using IAM policies, administrators control who can view, launch, and modify products and portfolios.
- **Service Actions:** These enable end users to perform operational tasks such as troubleshooting or executing approved commands on provisioned products without requiring full AWS access.

![The image lists five features: Products, Stack or Resource Group, Portfolios, Granular Access Control, and Service Actions, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752865384/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Service-Catalog/features-products-stack-portfolios-icons.jpg)

> [!important]
> **Summary**
>
> This lesson has provided an in-depth overview of the AWS Service Catalog, outlining its components and how it enables organizations to deploy IT services efficiently, securely, and in a consistent manner.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/3c1ec40a-853a-4bf0-a4de-d53993e309f0/lesson/8f7f7557-8f7b-4362-8b75-0c710ff9b345)**
>
> Watch video content
