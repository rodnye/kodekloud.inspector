# Cloud Economics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Cloud-Computing/Cloud-Economics)

---

## Table of Contents

- Cloud Economics
  - Free Tier Overview
  - On-Demand Pricing Model
  - Reserved Instances
  - Volume Discounts
  - Summary
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Cloud Computing

# Cloud Economics

Welcome to this detailed lesson on cloud computing economics. In this article, we explore the main economic models used in AWS, offering insights into AWS billing, cost management, and service pricing strategies. You'll learn about the Free Tier, On-Demand Pricing, Reserved Instances, and Volume Discounts.

## Free Tier Overview

AWS provides a Free Tier that offers access to various services under specific conditions. The Free Tier includes:

- Services that remain free forever.
- Services that are free for the first 12 months.
- Select services offering a limited-period free trial (for example, SageMaker provides a two-month free trial).

When you launch an AWS account, you might receive an Amazon EC2 virtual machine available 24/7 for the first 12 months. Other key services, such as Amazon S3 and RDS, are available under defined usage limits within the Free Tier.

![The image shows Amazon's Free Tier offerings: 750 hours of EC2 and RDS usage, and 5 GB of S3 storage, available for 12 months.](https://kodekloud.com/kk-media/image/upload/v1752861589/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Cloud-Economics/frame_60.jpg)

For a comprehensive list of Free Tier services, see the diagram below:

![The image lists Amazon Web Services (AWS) Free Tier offerings, including EC2, S3, RDS, DynamoDB, SageMaker, and Lambda, with specific usage limits and durations.](https://kodekloud.com/kk-media/image/upload/v1752861590/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Cloud-Economics/frame_90.jpg)

> [!important]
> **Note**
>
> While some services like DynamoDB and Lambda are free indefinitely, others convert to paid usage after the free period expires.

## On-Demand Pricing Model

The On-Demand Pricing Model is AWS's most popular choice for many users. In this pay-as-you-go framework, you are charged only for the resources you actually use, whether it’s compute power, storage, or networking capacity.

For instance, running a virtual machine with two processors and 16 GB of RAM for 10 hours will result in charges for just those 10 hours of operation:

![The image shows specifications for an on-demand service: 2 processors, 16 gigabytes, and 10 hours, with a money icon.](https://kodekloud.com/kk-media/image/upload/v1752861591/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Cloud-Economics/frame_180.jpg)

This model is particularly advantageous for experimentation, testing new configurations, or short-term projects.

## Reserved Instances

For long-term projects, AWS offers Reserved Instances. With this model, you commit to a specific resource (such as a two-processor, 16 GB virtual machine) for a duration of one or three years. Even if you reduce your usage during the commitment period, you are billed for the entire term. In return for this commitment, AWS provides significant discounts—often up to 66% or 72%—compared to on-demand pricing.

![The image shows a timeline labeled "Reservations" with two points: "1 Year" and "3 Years," connected by a line.](https://kodekloud.com/kk-media/image/upload/v1752861592/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Cloud-Economics/frame_200.jpg)

> [!important]
> **Note**
>
> Reserved Instances are cost-effective when you have predictable resource needs and can commit to long-term usage.

## Volume Discounts

AWS also offers volume discounts that reduce the per-unit cost as your consumption increases. For example, Amazon S3 might apply the following pricing structure:

- The first 50 terabytes are charged at a certain rate per GB.
- The next 450 terabytes are billed at a lower rate per GB.
- Usage beyond 500 terabytes sees an even further reduction per GB.

These figures are illustrative; actual pricing may differ. Volume discounts can provide substantial savings as your resource consumption grows.

Since its launch, AWS has continuously reduced prices by enhancing service performance and adding new features. For example, S3 storage prices in US East 1 have dropped from approximately 15 cents per GB in 2006 to between 0.023 and 0.026 USD per GB today.

![The image shows AWS storage price drops from 0.15 USD per GB in 2006 to 0.023-0.026 USD per GB in 2023.](https://kodekloud.com/kk-media/image/upload/v1752861593/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Cloud-Economics/frame_360.jpg)

## Summary

Below is a summary of AWS economic models for quick reference:

| Economic Model     | Description                                                                                                 | Key Benefit                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Free Tier          | Some services free indefinitely, free for 12 months on select services, and limited free trials for others. | Initial cost-free access to explore AWS services        |
| On-Demand Pricing  | Pay for exactly what you use without long-term commitments.                                                 | Flexibility for short-term projects and experimentation |
| Reserved Instances | Long-term commitment (1 or 3 years) that offers significant discounts.                                      | Cost efficiency for predictable, long-term usage        |
| Volume Discounts   | Reduced per-unit cost as consumption increases.                                                             | Savings through economies of scale                      |

![The image summarizes cloud computing economics, detailing free tiers, on-demand pricing, reservations, volume discounts, and AWS price drops.](https://kodekloud.com/kk-media/image/upload/v1752861595/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Cloud-Economics/frame_490.jpg)

Thank you for reading this guide on cloud economics. We look forward to exploring more related topics with you in the next lesson.

For further reading:

- [AWS Pricing Overview](https://aws.amazon.com/pricing/)
- [Understanding Cloud Economics](https://aws.amazon.com/economics/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/d77f9b54-67f6-4c49-9f9c-9a7734db0d91/lesson/b935eb03-403f-42ef-9326-bc47e6be0aa5)**
>
> Watch video content
