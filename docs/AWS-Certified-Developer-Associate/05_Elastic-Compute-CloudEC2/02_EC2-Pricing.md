# EC2 Pricing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Elastic-Compute-CloudEC2/EC2-Pricing)

---

## Table of Contents

- EC2 Pricing
  - On-Demand Pricing
  - Spot Pricing
  - Reserved Instances
  - Dedicated Hosts
  - Dedicated Instances
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Elastic Compute CloudEC2

# EC2 Pricing

In this article, we explore the various Amazon EC2 pricing models to help you choose the best option for your application's workload and budget. Amazon EC2 offers several instance purchasing models, including on-demand, spot, reserved instances, dedicated hosts, and dedicated instances. Each option is designed to cater to different performance, cost, and flexibility requirements.

> [!important]
> **Quick Overview**
>
> Understanding the differences between these pricing models can significantly optimize your cloud expenditure and ensure your application scales effectively.

## On-Demand Pricing

On-demand pricing allows you to pay for compute capacity by the hour. With this model, you can quickly launch an EC2 instance when needed and terminate it when the work is complete. Billing is only active when the instance runs; however, attached storage costs continue even when the instance is stopped. This model requires no upfront payment or long-term commitment, making it ideal for short-term, irregular, or unpredictable workloads. Note that on-demand instances run on shared physical servers.

![The image explains AWS On-Demand Pricing, highlighting features like hourly compute capacity billing, no upfront payment, and suitability for short-term or unpredictable workloads. It includes icons representing AWS cloud instances and billing concepts.](https://kodekloud.com/kk-media/image/upload/v1752858885/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Pricing/aws-on-demand-pricing-explained.jpg)

## Spot Pricing

Spot pricing takes advantage of spare EC2 capacity on physical servers. When Amazon has extra capacity, these resources are offered at a significantly discounted rate. This pricing model is best for applications with flexible start and end times and workloads that can tolerate interruptions. Applications leveraging spot pricing should be designed to handle brief outages and resume processing once the instance is redeployed at the lower rate.

## Reserved Instances

Reserved instances provide cost savings by allowing you to commit to a one- or three-year term. When you reserve an instance, you secure the capacity of an on-demand instance based on specific parameters such as instance type, region, and operating system. For instance, reserving an m3.large instance in the US East 1 region running Linux means any matching on-demand instance is billed at the reserved rate. If you launch an instance that does not match this reservation (for example, an m4.large), the full on-demand rate applies.

![The image explains AWS EC2 reserve pricing, highlighting the benefits of reserving instances for discounted rates over 1 or 3-year contracts, and includes a diagram comparing reserved and full pricing.](https://kodekloud.com/kk-media/image/upload/v1752858886/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Pricing/aws-ec2-reserve-pricing-diagram.jpg)

## Dedicated Hosts

Dedicated hosts offer you an entire physical server solely for your use. With this option, you can run one or more EC2 instances on a server that is not shared with other customers. Dedicated hosts are particularly beneficial if you need to use existing server-bound software licenses, since these licenses might be tied to a specific physical device. Pricing is based on the host rather than individual instances, meaning you're charged for the dedicated server regardless of how many instances you deploy on it.

![The image explains the concept of dedicated hosts, highlighting features like cost reduction, purchase options, and payment structure, alongside a diagram of a dedicated server setup.](https://kodekloud.com/kk-media/image/upload/v1752858887/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Pricing/dedicated-hosts-cost-reduction-diagram.jpg)

## Dedicated Instances

Dedicated instances also deliver a dedicated physical server for your applications; however, there is an important distinction. While your instance runs on a sole server, the underlying server can change after stopping and restarting the instance. In contrast, a dedicated host guarantees that the same physical server is utilized every time. This differentiation is crucial if your application or licensing requirements depend on remaining on the same physical server.

> [!important]
> **Final Tip**
>
> By carefully assessing your application’s workload and licensing requirements, you can select the EC2 pricing model that maximizes cost efficiency while meeting your performance objectives.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/538040df-b323-4fd1-ad80-f5c22725c345/lesson/4e6489a4-6276-4788-8b92-2e8afc8fff47)**
>
> Watch video content
