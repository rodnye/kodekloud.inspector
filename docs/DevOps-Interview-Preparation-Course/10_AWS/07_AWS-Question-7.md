# AWS Question 7 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/AWS/AWS-Question-7)

---

## Table of Contents

- AWS Question 7
  - Watch Video

---

## Content

DevOps Interview Preparation Course

AWS

# AWS Question 7

In this lesson, we explore a common AWS interview question: "What are ingress and egress?" This topic is essential for AWS practitioners and DevOps engineers.

Before diving into the specifics, it's important to define the key terms:

> [!important]
> **Understanding Ingress and Egress**
>
> - **Ingress**: Refers to incoming traffic to your AWS resources.
> - **Egress**: Denotes outgoing traffic from your AWS resources.

![The image explains the concepts of ingress and egress traffic in relation to security groups, using an EC2 instance as an example. It shows arrows indicating incoming (ingress) and outgoing (egress) traffic.](https://kodekloud.com/kk-media/image/upload/v1752873332/notes-assets/images/DevOps-Interview-Preparation-Course-AWS-Question-7/ingress-egress-traffic-ec2-diagram.jpg)

Ingress is all about incoming traffic, and this concept is central when configuring security groups to allow specific access. For example, a security group might include a rule allowing inbound SSH traffic on port 22. While a rule could be set to allow connections from all IP addresses (0.0.0.0/0) for testing purposes, it's important to note:

> [!important]
> **Security Best Practice**
>
> For production environments, avoid using overly permissive rules. Instead, restrict access to a trusted range, such as your VPC's IP range, to minimize security risks.

Egress, on the other hand, manages the rules for outgoing traffic and is equally critical. The configuration of egress rules ensures that your AWS resources can communicate externally in a controlled manner.

In an interview setting, you might explain these concepts as follows:

- Egress pertains to outbound traffic rules.
- Ingress refers to inbound traffic rules.
- Both terms are integral to the configuration of security groups.
- They also relate to how VPCs and subnets manage and route both incoming internet traffic and inter-subnet communication.

This clear and concise explanation will help you effectively address questions about ingress and egress during your AWS interviews.

Let's move on to explore additional topics.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/f1169a2e-23de-4377-bc4f-a07c136a11d6/lesson/5c26ddc7-ec96-4df1-8a74-2e2364db3753)**
>
> Watch video content
