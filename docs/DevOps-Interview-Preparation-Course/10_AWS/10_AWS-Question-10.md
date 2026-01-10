# AWS Question 10 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/AWS/AWS-Question-10)

---

## Table of Contents

- AWS Question 10
  - Types of AWS Load Balancers
  - Practical Recommendations for Interviews
  - Watch Video
    - Classic Load Balancer
    - Application Load Balancer (ALB)
    - Network Load Balancer (NLB)
    - Gateway Load Balancer (GLB)

---

## Content

DevOps Interview Preparation Course

AWS

# AWS Question 10

What are the load balancers in AWS? Briefly explain which one you have used, along with the use cases for the others.

Any organization using AWS typically implements load balancers as an integral part of their infrastructure. As a DevOps engineer, you are expected to have in-depth knowledge of these services. Although this guide focuses on AWS, the principles apply to other cloud providers as well.

In this article, we'll examine the different AWS load balancers and discuss their use cases—perfect for prepping for technical interviews.

> [!important]
> **Interview Tip**
>
> Pause the lesson anytime to clearly map out your interview answer. Focus on the load balancer you have direct experience with and provide concise explanations for the others.

---

## Types of AWS Load Balancers

AWS offers four main types of load balancers:

1.  Classic Load Balancer (CLB)
2.  Application Load Balancer (ALB)
3.  Network Load Balancer (NLB)
4.  Gateway Load Balancer (GLB)

### Classic Load Balancer

The Classic Load Balancer (CLB) originally used a round-robin traffic-routing method to distribute incoming traffic across multiple EC2 instances. However, it is scheduled for deprecation by August 2022. If you are still using CLB, it is highly recommended that you migrate to a more modern load balancer.

![The image lists four types of load balancers: Classic, Application, Network, and Gateway, with brief descriptions of their features and functionalities. The Classic Load Balancer is noted to be deprecated from August 2022.](https://kodekloud.com/kk-media/image/upload/v1752873317/notes-assets/images/DevOps-Interview-Preparation-Course-AWS-Question-10/load-balancers-classic-application-network-gateway.jpg)

Given the deprecation of CLB, this guide will focus on the remaining load balancers.

---

### Application Load Balancer (ALB)

The Application Load Balancer (ALB) uses path-based routing to distribute incoming traffic based on URL paths. For example, if your application has distinct paths for home pages (e.g., `/home`) and mobile pages (e.g., `/mobile`), ALB can efficiently route traffic to the appropriate Auto Scaling Group (ASG) handling that specific section of your application.

ALB is optimal for applications that require advanced routing capabilities and granular traffic control—making it a popular choice for modern web applications.

---

### Network Load Balancer (NLB)

Optimized for high-performance TCP traffic, the Network Load Balancer (NLB) operates at the transport layer (Layer 4). This level of operation allows NLB to handle millions of requests per second efficiently. It is particularly well-suited for scenarios like streaming services, interactive applications with video content, or any use case requiring low latency and high throughput.

![The image is a comparison of four types of load balancers: Classic, Application, Network, and Gateway, highlighting their features and differences. Handwritten notes emphasize aspects like network layers and packet handling.](https://kodekloud.com/kk-media/image/upload/v1752873318/notes-assets/images/DevOps-Interview-Preparation-Course-AWS-Question-10/load-balancer-types-comparison.jpg)

---

### Gateway Load Balancer (GLB)

The Gateway Load Balancer (GLB) is a newer AWS service that leverages the Geneve protocol on port 6081. It is designed to integrate seamlessly with gateway appliances and operates within a specific availability zone. GLB is ideal for scenarios where dedicated gateway services are necessary, such as combining firewall, routing, or advanced network analytics with load distribution.

---

## Practical Recommendations for Interviews

When discussing AWS load balancers in an interview, consider the following guidelines:

- **Emphasize Your Experience:** Focus on the load balancer you actively use. For example, many organizations leverage the Application Load Balancer due to its advanced path-based routing.
- **Briefly Touch on Other Options:**
  - **Classic Load Balancer (CLB):** Soon to be deprecated; migrating away is recommended.
  - **Network Load Balancer (NLB):** Ideal for high-speed, packet-based communication scenarios.
  - **Gateway Load Balancer (GLB):** Suited for specialized use cases involving gateway appliances.

This balanced overview demonstrates your familiarity with AWS load balancing options and allows you to pivot based on the specifics of your experience.

> [!important]
> **Interview Preparation**
>
> When preparing for your interview, craft your answer around the load balancer that best meets your project needs. Be ready to detail why you chose it and mention other available options to showcase a deep and nuanced understanding.

---

This concludes our discussion on AWS load balancers. By understanding each type's functionalities and use cases, you are better prepared to answer interview questions confidently and accurately.

Speak to you in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/f1169a2e-23de-4377-bc4f-a07c136a11d6/lesson/412b17c4-8182-4224-a018-460bb4296c58)**
>
> Watch video content
