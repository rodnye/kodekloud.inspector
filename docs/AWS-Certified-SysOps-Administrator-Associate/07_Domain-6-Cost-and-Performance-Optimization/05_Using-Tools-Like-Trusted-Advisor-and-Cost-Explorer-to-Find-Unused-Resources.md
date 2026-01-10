# Using Tools Like Trusted Advisor and Cost Explorer to Find Unused Resources - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-6-Cost-and-Performance-Optimization/Using-Tools-Like-Trusted-Advisor-and-Cost-Explorer-to-Find-Unused-Resources)

---

## Table of Contents

- Using Tools Like Trusted Advisor and Cost Explorer to Find Unused Resources
  - AWS Trusted Advisor: Your Personal Cloud Assistant
  - AWS Cost Explorer: Visualizing Your Cloud Spending
  - Summary of AWS Cost Optimization Tools
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 6 Cost and Performance Optimization

# Using Tools Like Trusted Advisor and Cost Explorer to Find Unused Resources

Welcome to this in-depth guide on AWS cost optimization using tools such as AWS Trusted Advisor and AWS Cost Explorer. Just as you would turn off lights or adjust air conditioning in an unused part of a building to save energy, you can save on cloud costs by identifying and powering down underutilized AWS resources.

![The image is an introduction to AWS Optimization Tools, featuring icons for AWS Trusted Advisor and AWS Cost Explorer alongside a building and database graphic.](https://kodekloud.com/kk-media/image/upload/v1752861171/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Tools-Like-Trusted-Advisor-and-Cost-Explorer-to-Find-Unused-Resources/aws-optimization-tools-introduction.jpg)

Both AWS Trusted Advisor and AWS Cost Explorer provide valuable insights into your AWS environment. Additionally, services like CloudWatch and Compute Optimizer can offer detailed metrics on resource performance—helping you pinpoint where cost reductions are possible.

> [!important]
> **Quick Tip**
>
> If you notice resources consistently running at low capacity, consider right-sizing or terminating them to further enhance your cost optimization strategy.

## AWS Trusted Advisor: Your Personal Cloud Assistant

Imagine having a personal assistant who monitors every detail of your cloud environment. Trusted Advisor does exactly that—it analyzes your resources across key areas including performance, security, fault tolerance, cost, and service limits. For instance, if an EC2 instance is running at only 10% capacity, Trusted Advisor might recommend either resizing or shutting down the instance to save costs, much like turning off lights in an empty room.

![The image is an introduction to AWS Optimization Tools, showing icons for AWS Trusted Advisor and AWS Cost Explorer, with a focus on removing idle EC2 instances.](https://kodekloud.com/kk-media/image/upload/v1752861173/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Tools-Like-Trusted-Advisor-and-Cost-Explorer-to-Find-Unused-Resources/aws-optimization-tools-introduction-2.jpg)

Trusted Advisor is especially beneficial for users with a Business Support plan or higher. It can provide actionable recommendations, such as reducing the size of underutilized RDS database instances, ensuring your cloud operation remains both efficient and cost-effective.

![The image is a diagram titled "Trusted Advisor" featuring a "Personal Assistant" icon and listing four categories: Performance, Security, Fault Tolerance, and Cost.](https://kodekloud.com/kk-media/image/upload/v1752861174/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Tools-Like-Trusted-Advisor-and-Cost-Explorer-to-Find-Unused-Resources/trusted-advisor-personal-assistant-diagram.jpg)

For example, Trusted Advisor might alert you that an EC2 instance or certain RDS instances are underutilized. Acting on these insights can help you eliminate wasteful spending by adjusting resource sizes or deactivating idle resources.

![The image shows AWS Trusted Advisor recommendations to remove idle EC2 instances and underutilized Amazon RDS DB instances, with corresponding icons for each service.](https://kodekloud.com/kk-media/image/upload/v1752861176/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Tools-Like-Trusted-Advisor-and-Cost-Explorer-to-Find-Unused-Resources/aws-trusted-advisor-ec2-rds-recommendations.jpg)

## AWS Cost Explorer: Visualizing Your Cloud Spending

AWS Cost Explorer works much like reviewing a bank statement—it provides a clear, visual breakdown of your AWS spending. Through intuitive, color-coded charts, you can quickly identify trends and spot unusual spikes in cost. For example, you might observe an unexpected increase in EC2 or EKS usage from one month to the next, prompting further investigation.

![The image shows an AWS Cost Explorer chart displaying monthly costs for various services from April to September 2024, with a legend indicating different services like EC2, Elastic Container Service, and others. There's also an AWS Cost Explorer logo on the left.](https://kodekloud.com/kk-media/image/upload/v1752861178/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Tools-Like-Trusted-Advisor-and-Cost-Explorer-to-Find-Unused-Resources/aws-cost-explorer-monthly-chart.jpg)

The filtering options in Cost Explorer add further flexibility. You can refine your spending analysis by region, instance type, cost tags, and more. This granular approach enables you to directly target the areas where costs may be optimized.

![The image shows a "Resource Filtering" interface with various dropdown menus for selecting filters like service, region, instance type, and more. It includes options to clear selections and apply filters for resource management.](https://kodekloud.com/kk-media/image/upload/v1752861179/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Tools-Like-Trusted-Advisor-and-Cost-Explorer-to-Find-Unused-Resources/resource-filtering-interface-dropdowns.jpg)

## Summary of AWS Cost Optimization Tools

| AWS Tool        | Primary Function                                                                               | Example Use Case                                                        |
| --------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Trusted Advisor | Provides recommendations for performance, security, fault tolerance, cost, and service limits. | Suggests shutting down or resizing underutilized EC2 and RDS instances. |
| Cost Explorer   | Visualizes spending trends and provides detailed cost breakdowns.                              | Filters and analyzes monthly spending to quickly identify cost spikes.  |

Combining the insights from Trusted Advisor and Cost Explorer empowers you to make well-informed decisions. By pinpointing costly, underutilized resources, you can adjust your AWS infrastructure to reduce waste and maximize efficiency.

Thank you for reading this guide on AWS cost optimization. Stay tuned for more practical insights and best practices in future lessons.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/c363221d-1b2d-4c1c-876a-cb6108f473e3/lesson/c8c0cda6-aca0-4cc0-8d0e-e60690f7f649)**
>
> Watch video content
