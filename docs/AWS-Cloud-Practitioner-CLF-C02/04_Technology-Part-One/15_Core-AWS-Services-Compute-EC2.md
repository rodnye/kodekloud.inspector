# Core AWS Services Compute EC2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/Core-AWS-Services-Compute-EC2)

---

## Table of Contents

- Core AWS Services Compute EC2
  - Virtualization and Isolation with VPC
  - Amazon Machine Images (AMIs)
  - EC2 Instance Types
  - Pricing Options for EC2 Instances
  - Conclusion
  - Watch Video
    - On-Demand Pricing
    - Spot Pricing
    - Reserved Pricing

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# Core AWS Services Compute EC2

In this detailed guide, we explore one of AWS's most fundamental compute services: Amazon EC2 (Elastic Compute Cloud). Whether you are a novice or a seasoned cloud engineer, this article explains how EC2 transforms server deployment—from traditional, hardware-intensive processes to a dynamic, scalable cloud environment.

For decades, provisioning a server meant physically setting up hardware. You had to find or build a data center, order and receive rack servers, install an operating system via disks or USB drives, and continuously manage hardware maintenance. This manual process could take days or even weeks, delaying your application's time-to-market.

![The image outlines the traditional application deployment process, including purchasing, racking servers, installing operating systems, and handling hardware failures, which can take days or weeks.](https://kodekloud.com/kk-media/image/upload/v1752861886/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-EC2/frame_80.jpg)

In contrast, AWS EC2 streamlines server provisioning. With just a few clicks in the AWS Management Console, you can select the desired server specifications—CPU, memory, storage—and launch an instance in minutes. This rapid deployment allows you to scale resources on demand while only paying for what you use.

![The image illustrates provisioning an AWS EC2 server with specific specifications like CPUs, memory, and storage for application deployment.](https://kodekloud.com/kk-media/image/upload/v1752861887/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-EC2/frame_120.jpg)

## Virtualization and Isolation with VPC

AWS EC2 harnesses the power of virtualization, enabling multiple EC2 instances to run on a single physical server. This technology maximizes resource efficiency while the Virtual Private Cloud (VPC) feature logically isolates each customer’s resources. Even when diverse customers share the same physical hardware, VPC ensures that each environment remains secure and independent.

![The image illustrates AWS EC2 instances using virtual machines within Virtual Private Clouds (VPCs) to isolate customer infrastructures on a single server.](https://kodekloud.com/kk-media/image/upload/v1752861889/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-EC2/frame_230.jpg)

> [!important]
> **Note**
>
> EC2’s virtualization allows hundreds or thousands of virtual servers to run securely on shared physical hardware.

## Amazon Machine Images (AMIs)

In traditional setups, installing an operating system involved physical media like disks or USB drives. In the cloud, AWS uses Amazon Machine Images (AMIs) as blueprints for launching EC2 instances. Each AMI contains all the elements needed to configure a server—including the operating system, software packages, and configuration settings.

Selecting an AMI is much like choosing an installation disk. You can deploy multiple identical instances from a single AMI and even customize it to include your application code, dependencies, or firewall rules. This approach dramatically speeds up deployment and ensures consistency across your infrastructure.

![The image explains Amazon Machine Image (AMI) as a blueprint for launching EC2 instances, detailing operating systems and software packages.](https://kodekloud.com/kk-media/image/upload/v1752861890/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-EC2/frame_300.jpg)

![The image explains Amazon Machine Image (AMI) as an installer disk for servers, customizable with application code, dependencies, and OS firewall settings.](https://kodekloud.com/kk-media/image/upload/v1752861892/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-EC2/frame_360.jpg)

## EC2 Instance Types

AWS offers a wide range of EC2 instance types, each optimized for distinct application needs. Below is an overview of the primary instance categories:

- **General Purpose:** Offers a balanced mix of CPU, memory, and networking resources for a variety of workloads.
- **Compute Optimized:** Ideal for compute-intensive tasks, such as data crunching, media transcoding, and machine learning.
- **Memory Optimized:** Tailored for memory-demanding applications, such as high-performance databases.
- **Storage Optimized:** Best for workloads that require high-speed, sequential read/write operations on large datasets.
- **Accelerated Computing:** Uses specialized hardware, like GPUs, to accelerate complex computations and graphics processing.

> [!important]
> **Tip**
>
> Choose an instance type that aligns with your workload's core resource needs—whether it's processing power, memory capacity, storage throughput, or hardware acceleration.

![The image explains EC2 instance types, highlighting their varying CPU, memory, storage, and networking capacities, with examples of Model A and Model B specifications.](https://kodekloud.com/kk-media/image/upload/v1752861893/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-EC2/frame_420.jpg)

![The image describes two instance types: General Purpose, which balances resources for diverse workloads, and Compute Optimized, designed for compute-heavy applications with high-performance CPUs.](https://kodekloud.com/kk-media/image/upload/v1752861895/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-EC2/frame_470.jpg)

![The image compares "Memory Optimized" and "Storage Optimized" instance types, highlighting their suitability for memory-intensive workloads and large data set access, respectively.](https://kodekloud.com/kk-media/image/upload/v1752861896/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-EC2/frame_500.jpg)

## Pricing Options for EC2 Instances

AWS offers multiple pricing models for EC2 to help you optimize costs based on your usage requirements.

### On-Demand Pricing

On-demand pricing charges you by the hour for the compute capacity used. This flexible model requires no upfront payment or long-term commitment, making it ideal for short-term, unpredictable workloads. However, note that while compute costs stop when you shut down instances, attached storage continues to incur charges.

![The image explains AWS On-Demand Pricing, highlighting hourly compute capacity billing, no upfront payment, and suitability for short-term, irregular workloads with shared EC2 instances.](https://kodekloud.com/kk-media/image/upload/v1752861897/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-EC2/frame_620.jpg)

### Spot Pricing

Spot Pricing lets you take advantage of AWS's spare compute capacity at a reduced cost. Although spot instances are subject to interruptions if AWS reclaims the capacity, they are an excellent option for flexible, fault-tolerant, or batch processing workloads.

![The image explains Amazon's Spot Pricing, offering discounted spare compute capacity for flexible applications, unsuitable for workloads needing uninterrupted service.](https://kodekloud.com/kk-media/image/upload/v1752861899/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-EC2/frame_740.jpg)

### Reserved Pricing

Reserved Pricing allows you to commit to using EC2 over a one- or three-year term, resulting in discounts compared to on-demand pricing. Instead of purchasing individual instances, you reserve capacity that applies to instances matching the specified attributes (such as instance type, region, and operating system). For example, reserving an M3 large instance in US East 1 (Linux) will apply the discounted rate to any on-demand instance of that type launched within the same parameters.

![The image explains AWS Reserve Pricing, highlighting discounted rates for long-term EC2 instance reservations, without purchasing, by committing to specific attributes.](https://kodekloud.com/kk-media/image/upload/v1752861901/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-EC2/frame_820.jpg)

> [!important]
> **Reminder**
>
> When choosing a pricing model, consider your workload patterns. For consistent, predictable usage, Reserved Pricing can provide significant savings, whereas On-Demand and Spot Pricing are better for sporadic or flexible workloads.

## Conclusion

AWS EC2 offers versatile and scalable compute capacity that is rapidly provisioned and tailored to your application needs. With a wide selection of instance types and flexible pricing options, EC2 is designed to optimize both performance and cost efficiency.

For further learning and resources, check out:

- [AWS Documentation](https://aws.amazon.com/documentation/)
- [Amazon EC2 Pricing](https://aws.amazon.com/ec2/pricing/)
- [AWS Compute Services](https://aws.amazon.com/compute/)

Embrace the power of cloud computing with AWS EC2 and transform your infrastructure management from slow, labor-intensive processes to a dynamic, cost-effective solution.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/1306e0de-47fc-4dbd-9b0a-2915d55cba97)**
>
> Watch video content
