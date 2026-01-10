# Redshift Serverless - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Database/Redshift-Serverless)

---

## Table of Contents

- Redshift Serverless
  - Overview
  - How Redshift Serverless Works
  - Configuring RPUs
  - Features and Benefits
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Database

# Redshift Serverless

In this article, we explore AWS Redshift Serverless, a modern and scalable data warehousing solution that addresses many of the challenges posed by traditional Redshift deployments.

## Overview

Traditional Redshift setups involve provisioning a fixed combination of CPU, RAM, and storage resources. This model means you incur continuous charges—even when query activity is low—leading to overprovisioning and underutilization. As usage patterns fluctuate, you might end up paying for idle capacity.

![The image illustrates the usage of a Redshift Data Warehouse over time, highlighting overprovisioned capacity and underutilization. It includes a graph showing peaks of usage below the provisioned capacity line.](https://kodekloud.com/kk-media/image/upload/v1752865254/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Redshift-Serverless/redshift-data-warehouse-usage-graph.jpg)

Redshift Serverless eliminates this inefficiency by automatically scaling the data warehouse capacity in response to real-time demand. With the ability to start for as low as $3 per hour, you only pay for the compute capacity during active query workloads—making cost management more efficient.

## How Redshift Serverless Works

Redshift Serverless measures its data warehouse capacity in Redshift Processing Units (RPUs). Billing is executed on a per-second basis for RPU hours, covering all query workloads, including those accessing data in open file formats stored in Amazon S3.

![The image explains the benefits of Redshift Serverless, highlighting automatic scaling of data warehouse capacity, measurement in RPUs, and cost based on RPU-hours. It includes a graph showing serverless capacity usage over time.](https://kodekloud.com/kk-media/image/upload/v1752865255/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Redshift-Serverless/redshift-serverless-benefits-graph.jpg)

There are two key configurable options:

1.  **Base RPU:**  
    Defines the minimum data warehouse capacity deployed to serve queries. This value is expressed in RPUs.
2.  **Max Capacity:**  
    Sets usage limits to control costs and defines automatic actions when limits are reached. The maximum capacity is also measured in RPU hours and can be configured for daily, weekly, or monthly durations.

> [!important]
> **Understanding RPUs**
>
> Each RPU provides 16 gigabytes of memory. Adjusting the base capacity directly influences query performance, particularly for resource-intensive data processing tasks.

## Configuring RPUs

The default base capacity for Amazon Redshift Serverless is 128 RPUs. You have the flexibility to adjust this setting between 8 and 512 RPUs in increments of 8 (for example, 8, 16, 24, etc.). These changes can be made using the AWS Management Console, the update workgroup API operation, or via the AWS CLI.

For workloads operating with 8 to 24 RPUs, you can efficiently handle up to 128 terabytes of data. However, if your data storage requirements exceed this limit, a minimum capacity of 32 RPUs is recommended.

![The image is an infographic about Redshift Serverless RPUs, detailing base capacity, RAM per RPU, adjustable RPU range, and data support capabilities.](https://kodekloud.com/kk-media/image/upload/v1752865256/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Redshift-Serverless/redshift-serverless-rpus-infographic.jpg)

For high concurrency workloads or tables with a larger number of columns, it is advisable to operate with 32 or more RPUs to ensure optimal performance.

## Features and Benefits

Redshift Serverless offers several key advantages:

- **Cost Savings:**  
  You pay only for the compute resources used, rather than incurring charges for pre-provisioned capacity that may remain idle.
- **Scalability:**  
  The service automatically scales resources up or down based on workload demands, ensuring efficiency during peak usage and cost reduction during off-peak periods.
- **Simplified Management:**  
  With automated scaling and resource allocation, you no longer need to manually balance the risks of overprovisioning and underprovisioning.

| Feature           | Benefit                                                                | Pricing Detail                        |
| ----------------- | ---------------------------------------------------------------------- | ------------------------------------- |
| Auto-Scaling      | Dynamically adjusts capacity in real time based on usage               | Cost calculated per second of RPU use |
| Configurable Base | Flexible configuration allows tuning for optimal performance           | Customizable RPU settings             |
| Cost Efficiency   | Only pay for what you use, reducing unnecessary cost on idle resources | As low as $3 per hour                 |

## Summary

In summary, AWS Redshift Serverless is an on-demand data warehousing solution designed to automatically manage scaling and resource provisioning. RPUs serve as the measurement for both computational capacity and cost, with each RPU delivering 16 gigabytes of memory. You have the flexibility to adjust the capacity between 8 and 512 RPUs (in increments of 8) to meet your specific workload requirements. This dynamic adjustment ensures efficient query processing and predictable cost management while supporting modern data processing needs.

![The image is a summary of Redshift Serverless, detailing adjustable base capacity settings, storage configurations, and cost forecasting using RPUs. It includes points numbered 05 to 07 with a gradient background.](https://kodekloud.com/kk-media/image/upload/v1752865257/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Redshift-Serverless/redshift-serverless-summary-capacity-settings.jpg)

> [!important]
> **Learn More**
>
> For further details on AWS Redshift Serverless and how it can revolutionize your data warehousing strategy, refer to the [AWS Documentation](https://aws.amazon.com/redshift/serverless/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/9fb73cb5-caf2-4dc2-ad5c-fe5fe69507e3/lesson/996403b1-488b-4003-a7a9-569a0d2f380e)**
>
> Watch video content
