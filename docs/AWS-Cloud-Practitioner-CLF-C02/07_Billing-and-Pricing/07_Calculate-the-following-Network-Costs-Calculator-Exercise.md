# Calculate the following Network Costs Calculator Exercise - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Billing-and-Pricing/Calculate-the-following-Network-Costs-Calculator-Exercise)

---

## Table of Contents

- Calculate the following Network Costs Calculator Exercise
  - Exercise Steps
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Billing and Pricing

# Calculate the following Network Costs Calculator Exercise

Welcome back, [AWS Cloud Practitioner (CLF-C02)](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02)! In this lesson, you'll work through a hands-on exercise to estimate costs for various AWS networking services using the [AWS Pricing Calculator](https://aws.amazon.com/calculator). Follow the step-by-step instructions below to complete the exercise.

## Exercise Steps

1.  **VPC with Data Transfer and NAT Gateway**
    - Create a Virtual Private Cloud (VPC) that incorporates data transfer. (Note that in the AWS Pricing Calculator, this is referred to as "data transfer" rather than "Internet Gateway.")
    - Add a NAT Gateway to the VPC.
    - Estimate the cost for transferring 1,000 terabytes (1 petabyte) of data along with one NAT Gateway. Both components can be included in a single estimate.

2.  **VPN Configurations**
    - Disable the previous estimates for data transfer and the NAT Gateway.
    - Enable the VPN service.
    - Configure two site-to-site VPN connections that operate continuously over a 30-day month.
    - Set up 25 client VPN connections running Monday through Friday for 16 hours each day.
    - Carefully review the calculated monthly costs based on these configurations.

3.  **Elastic Load Balancing**
    - Within the Elastic Load Balancing section, create an estimate for an Application Load Balancer (ALB).
    - Next, generate a similar estimate for a Network Load Balancer (NLB) configured with equivalent capacity.
    - Compare the pricing differences between the ALB and NLB setups to assess which option suits your requirements best.

The exercise covers key networking tasks including creating a VPC with a NAT gateway for data transfer, establishing both site-to-site and client VPN connections, and configuring Application and Network Load Balancers to compare cost differences.

> [!important]
> **Tip**
>
> Feel free to pause the lesson at any point and experiment with the settings in the AWS Pricing Calculator. This hands-on approach will help reinforce your understanding of AWS networking costs.

![The image lists network setup tasks: creating a VPC with gateways, setting up VPN connections, and configuring load balancers, alongside a network-related icon.](https://kodekloud.com/kk-media/image/upload/v1752861444/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Calculate-the-following-Network-Costs-Calculator-Exercise/frame_70.jpg)

That concludes the AWS networking cost estimation exercise. Use this opportunity to explore cost estimations further and better understand how different configurations impact your AWS billing.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/2bdfc163-f478-4c56-b843-e20f38ee028f/lesson/9355913f-0ac4-431f-9430-3d6834897998)**
>
> Watch video content
