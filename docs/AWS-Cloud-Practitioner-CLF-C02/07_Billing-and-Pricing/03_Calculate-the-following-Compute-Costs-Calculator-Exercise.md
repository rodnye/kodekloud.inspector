# Calculate the following Compute Costs Calculator Exercise - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Billing-and-Pricing/Calculate-the-following-Compute-Costs-Calculator-Exercise)

---

## Table of Contents

- Calculate the following Compute Costs Calculator Exercise
  - Getting Started with the AWS Pricing Calculator
  - Configuring an EC2 Instance
  - Exploring Different Instance Sizes
  - Back to the AWS Pricing Calculator: Configuring a T2 Nano Instance
  - Comparing Regional Prices and Licensing Options
  - Watch Video
    - Step 1: Search and Configure
    - Step 2: Naming and Task Details
    - Finding a Small EC2 Instance
    - Exploring High-Performance Instances

---

## Content

AWS Cloud Practitioner CLF-C02

Billing and Pricing

# Calculate the following Compute Costs Calculator Exercise

Welcome, Cloud Practitioners!

In this exercise, we will guide you through your first billing practice session using the AWS Pricing Calculator. I'm Michael Forrester, and in this lesson, you will learn how to navigate billing dimensions and explore the various cost factors in AWS. This exercise is not about memorizing pricing structures but rather about understanding how different configurations impact your costs.

> [!important]
> **Key Exercise Objectives**
>
> - Familiarize yourself with billing practices using the AWS Pricing Calculator.
> - Experiment with different services and configurations.
> - Understand how parameters such as processor count, memory, licensing types, and regional differences affect cost.

Before we begin, here are some important points to consider:

1.  The primary goal is to get acquainted with AWS pricing and billing practices.
2.  While suggestions are provided, you are encouraged to explore other services and configurations to enhance your understanding.
3.  For compute services, starting with EC2 is recommended, though alternatives like Lambda, ECS, or EKS are worth exploring.
4.  Experiment by comparing configurations—for instance, compare an EC2 instance with 2 processors and 8 GB of RAM to one with 4 processors and 16 GB of RAM.
5.  Use the online AWS Pricing Calculator at [calculator.aws](https://calculator.aws). Logging in is optional unless you wish to save your estimates.

---

Below is an overview of the exercise details:

![The image outlines student exercises for billing, emphasizing familiarity, suggestions, relevant services, billing changes, and using Calculator.aws.](https://kodekloud.com/kk-media/image/upload/v1752861431/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Calculate-the-following-Compute-Costs-Calculator-Exercise/frame_90.jpg)

## Getting Started with the AWS Pricing Calculator

1.  Open your browser and navigate to [calculator.aws](https://calculator.aws).
2.  Click on "Create an estimate." (Logging in is not necessary unless you want to save your work.)

![The image shows the AWS Pricing Calculator interface, explaining how to estimate costs for AWS services, with steps and additional resources provided.](https://kodekloud.com/kk-media/image/upload/v1752861432/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Calculate-the-following-Compute-Costs-Calculator-Exercise/frame_120.jpg)

## Configuring an EC2 Instance

### Step 1: Search and Configure

- Begin by typing "EC2" in the search field. When the service appears, click on "Configure" to proceed with creating your cost estimate.

![The image shows the AWS Pricing Calculator interface, allowing users to select and configure AWS services, with options to search by location or service type.](https://kodekloud.com/kk-media/image/upload/v1752861433/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Calculate-the-following-Compute-Costs-Calculator-Exercise/frame_130.jpg)

![The image shows the AWS Pricing Calculator interface for configuring Amazon EC2, including options for region, tenancy, and operating system.](https://kodekloud.com/kk-media/image/upload/v1752861434/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Calculate-the-following-Compute-Costs-Calculator-Exercise/frame_140.jpg)

### Step 2: Naming and Task Details

For instance, you might name your estimate "Cloud Practitioner Demo for EC2" and follow these instructions:

- Create one T3 Xlarge instance (specifically T3 Xlarge, not T3 A) across multiple regions such as Ohio, Virginia, California, Tokyo, and Melbourne, then compare the costs.
- Create three T3 Xlarge instances in the same region, each configured with different licensing types: On-Demand, Reserved, Dedicated Hosts, and a one-year Savings Plan.
- Identify both the smallest and the largest EC2 instances in terms of processor and memory. Tools like [ec2instances.info](https://www.ec2instances.info) can help you research and compare instance specifications.

![The image outlines tasks for calculating AWS EC2 compute costs, comparing T3.xlarge instances across regions, and exploring different licensing types and instance sizes.](https://kodekloud.com/kk-media/image/upload/v1752861435/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Calculate-the-following-Compute-Costs-Calculator-Exercise/frame_180.jpg)

## Exploring Different Instance Sizes

### Finding a Small EC2 Instance

To illustrate, let’s find a small instance configuration. When searching for minimal resources, you might start by looking for an instance with 0.5 CPUs. While a direct match may not be available, you might identify options like the t2.micro (which offers one virtual CPU) or even the smaller t2.nano variant that provides one virtual CPU and 0.5 GB of RAM. The t2.nano is a low-cost, minimal resource option ideal for basic setups.

![The image shows a comparison table of Amazon EC2 instances, detailing instance types, memory, vCPUs, storage, network performance, and hourly costs.](https://kodekloud.com/kk-media/image/upload/v1752861436/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Calculate-the-following-Compute-Costs-Calculator-Exercise/frame_240.jpg)

### Exploring High-Performance Instances

For high-performance needs, inspect instances offering larger configurations—for example, those providing 400 or even 448 CPUs. You might also come across options with 128 CPUs. The objective here is not to determine a "correct" answer but to understand how costs scale with different performance levels.

![The image shows a comparison table of Amazon EC2 instances, detailing specifications like memory, vCPUs, and costs, with a focus on high-performance options.](https://kodekloud.com/kk-media/image/upload/v1752861437/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Calculate-the-following-Compute-Costs-Calculator-Exercise/frame_260.jpg)

## Back to the AWS Pricing Calculator: Configuring a T2 Nano Instance

Now, let’s switch back to the AWS Pricing Calculator to work on a practical example with a T2 nano instance. This example uses a shared instance running Linux:

![The image shows an AWS pricing calculator interface for configuring an Amazon EC2 instance, specifically a t2.nano, with options for instance type, vCPUs, and memory.](https://kodekloud.com/kk-media/image/upload/v1752861437/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Calculate-the-following-Compute-Costs-Calculator-Exercise/frame_300.jpg)

The T2 nano is an economical option, offering one virtual CPU and 0.5 GB of RAM.

![The image shows an AWS pricing calculator for configuring an Amazon EC2 instance, detailing specifications and costs for a t2.nano instance.](https://kodekloud.com/kk-media/image/upload/v1752861439/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Calculate-the-following-Compute-Costs-Calculator-Exercise/frame_310.jpg)

At less than half a penny per hour, the T2 nano is an excellent example of cost efficiency. Adjust the available payment options if needed, then click "Save and add service" to see the service added to your estimate.

When you review your estimate, the added Amazon EC2 service (identified as T2 nano) should be visible. It is advisable to give this service a clear, descriptive name (e.g., "t2.nano") for easy identification.

![The image shows an AWS pricing calculator estimate for Amazon EC2, with an upfront cost of $49.93 and no monthly cost.](https://kodekloud.com/kk-media/image/upload/v1752861440/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Calculate-the-following-Compute-Costs-Calculator-Exercise/frame_340.jpg)

## Comparing Regional Prices and Licensing Options

To expand your exploration, add another EC2 service configured for a different region—try Northern California—with the same settings (shared instance, Linux, T2 nano). Save the configuration and compare the price differences between the two estimates. Regional variations can have a significant impact on your overall cost.

When instructed to create a T3 Xlarge instance, the exercise will have you:

- Create three EC2 instances.
- Compare their pricing.
- Apply different licensing types.
- Evaluate cost implications based on various compute configurations.

![The image shows an AWS Pricing Calculator estimate with a total upfront cost of $144.54 for Amazon EC2 services, with no monthly costs.](https://kodekloud.com/kk-media/image/upload/v1752861441/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Calculate-the-following-Compute-Costs-Calculator-Exercise/frame_380.jpg)

![The image outlines tasks for calculating AWS EC2 compute costs, comparing T3.xlarge instances across regions, and exploring different licensing types and instance sizes.](https://kodekloud.com/kk-media/image/upload/v1752861442/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Calculate-the-following-Compute-Costs-Calculator-Exercise/frame_390.jpg)

---

Thank you for following along with this Compute Costs Calculator exercise. Experiment with different settings to gain a thorough understanding of AWS billing practices, and be sure to try additional configurations to reinforce your learning.

Michael Forrester

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/2bdfc163-f478-4c56-b843-e20f38ee028f/lesson/351f1fc4-7374-4a9c-9db9-9a78cc93eb1f)**
>
> Watch video content
