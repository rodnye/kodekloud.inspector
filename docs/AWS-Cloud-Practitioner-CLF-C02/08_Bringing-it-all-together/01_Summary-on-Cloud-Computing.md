# Summary on Cloud Computing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Bringing-it-all-together/Summary-on-Cloud-Computing)

---

## Table of Contents

- Summary on Cloud Computing
  - Introduction to Cloud Computing
  - What is AWS?
  - Benefits of Cloud Computing
  - Cloud Economics
  - Cloud-Native Design Principles
  - Watch Video
    - AWS Pricing Models at a Glance

---

## Content

AWS Cloud Practitioner CLF-C02

Bringing it all together

# Summary on Cloud Computing

This article provides a concise overview of core cloud computing concepts, highlighting essential points for anyone looking to understand and leverage cloud technology effectively. Topics include an introduction to cloud computing, details about AWS, key benefits, cloud economics, and cloud-native design principles.

## Introduction to Cloud Computing

Cloud computing delivers IT resources—including compute power, application hosting, databases, and networking—on demand. Instead of investing in physical data centers and hardware, you can provision necessary resources within minutes with just a click.

There are three primary deployment models in cloud computing:

- **Cloud:** Applications are hosted entirely in the cloud.
- **On-Premises:** Applications run from a traditional, physical data center.
- **Hybrid:** Combines cloud and on-premises deployments to leverage both environments.

Cloud computing typically follows a client-server model. For example, when an HTTP request is sent for a managed database, the cloud infrastructure provisions the resource and returns the connection details. This pay-as-you-go approach ensures you only pay for the duration that you use the resource—once it is shut down, billing stops.

![The image summarizes cloud computing, highlighting on-demand IT resources, deployment models (Cloud, On-Premises, Hybrid), client-server model, and pay-as-you-go access.](https://kodekloud.com/kk-media/image/upload/v1752861530/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Cloud-Computing/frame_90.jpg)

## What is AWS?

Amazon Web Services (AWS), launched in 2006 with Amazon S3 as its first offering, is the pioneering large-scale cloud provider. AWS now offers over 300 services, with a free sign-up process and a pay-as-you-go pricing model for most services. Its popularity emerges from an extensive community, strong market presence, and continuous service expansion.

![The image summarizes AWS, highlighting its launch in 2006, growth to 300+ services, free sign-up, and its large community and market presence.](https://kodekloud.com/kk-media/image/upload/v1752861531/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Cloud-Computing/frame_120.jpg)

## Benefits of Cloud Computing

Cloud computing transforms upfront capital expenses into variable costs, meaning you pay only for what you actually use. This eliminates the need for significant investments in data centers or purchasing servers in advance. For instance, if you require four servers, you incur costs only when they are active and can shut them down when they’re no longer needed.

Key benefits include:

- **Elimination of Data Center Management:** Skip the build and maintenance of physical data centers.
- **Capacity Flexibility:** Easily adjust resource scaling with just a few clicks, eliminating the risks of over- or under-provisioning.
- **Economies of Scale:** Benefit from AWS's large-scale operations that reduce per-unit costs through shared infrastructure.
- **Increased Speed and Agility:** Accelerate deployment and operational agility by bypassing physical hardware constraints.
- **Global Reach:** AWS's extensive network of data centers across various regions enables rapid global application deployment.

![The image lists cloud computing benefits: variable expenses, reduced data center focus, capacity management, economies of scale, increased agility, and global reach.](https://kodekloud.com/kk-media/image/upload/v1752861532/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Cloud-Computing/frame_240.jpg)

> [!important]
> **Note**
>
> Cloud computing benefits not only reduce upfront financial investments but also allow organizations to adapt quickly to market changes.

## Cloud Economics

AWS provides an attractive pricing structure starting with a comprehensive free tier. This free tier includes services that are perpetually free as well as those that remain free for 12 months after account creation. Beyond the free tier, AWS pricing offers multiple models:

- **On-Demand:** Pay for the resources only when you use them, with no long-term obligation.
- **Reservations:** Reserve instances for one to three years at a discounted rate if long-term usage is predictable.
- **Volume Discounts:** Enjoy cost reductions as your resource usage increases, with periodic price reductions across several services.

![The image summarizes cloud economics, detailing Free Tier, On-Demand, and Reservations options for Amazon services, highlighting flexibility and contract durations.](https://kodekloud.com/kk-media/image/upload/v1752861533/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Cloud-Computing/frame_310.jpg)

### AWS Pricing Models at a Glance

| Pricing Model    | Description                                                                      | Use Case                                       |
| ---------------- | -------------------------------------------------------------------------------- | ---------------------------------------------- |
| On-Demand        | Pay for resources only when they are used, without any long-term commitment.     | Short-term or unpredictable workloads          |
| Reservations     | Commit to a one to three-year term for reduced pricing on predictable workloads. | Long-term, steady use of specific services     |
| Volume Discounts | Reduced per-unit costs as overall resource usage increases.                      | Large-scale deployments with high usage volume |

> [!important]
> **Note**
>
> Review AWS pricing models carefully; understanding these options can lead to significant cost savings over time.

## Cloud-Native Design Principles

Designing applications for the cloud requires adherence to several core principles that enhance scalability and resilience. Consider the following guidelines:

- **Design for Failure:** Assume components may fail and architect redundancies accordingly.
- **Decouple Components:** Minimize interdependencies to improve fault tolerance.
- **Implement Elasticity:** Ensure applications can swiftly scale resources based on demand.
- **Embrace Parallelism:** Enable concurrent operations to boost efficiency and performance.

This summary encapsulates key concepts in cloud computing, AWS services, cloud economics, and cloud-native design. Whether you are preparing for an exam or seeking to optimize your cloud strategy, these fundamentals serve as an essential reference for modern IT infrastructures.

> [!important]
> **Final Thoughts**
>
> Adopting a cloud-first approach can drive innovation, operational efficiency, and cost savings across your organization. Consider these principles as you transition to and optimize within the cloud.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/e578bb11-e866-4f03-94b8-1a3e89c9afb3/lesson/accfe4cc-e7e6-4b18-82f4-4534b66f4e0e)**
>
> Watch video content
