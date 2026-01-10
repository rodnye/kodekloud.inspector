# Direct Connect - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Direct-Connect)

---

## Table of Contents

- Direct Connect
  - What is Direct Connect?
  - How Direct Connect Works
  - Direct Connect Pricing
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Direct Connect

In this lesson, we explore Direct Connect—a service that provides a dedicated physical connection to AWS. By bypassing the public internet, Direct Connect delivers a high-speed, stable, and reliable connection, eliminating the latency and potential instability of VPN and IPSec tunnels.

## What is Direct Connect?

Direct Connect enables a direct connection between your on-premise network and AWS through a dedicated link. This connection is available in various speeds, such as 1 Gbps, 10 Gbps, or even 100 Gbps, making it ideal for organizations that require high throughput, low latency, and enhanced reliability.

## How Direct Connect Works

Direct Connect's architecture involves three primary components:

1.  **Your On-Premise Network:**  
    This can be a data center, corporate office, or any facility with a dedicated edge router or firewall. The router used here may serve both your internet connection and Direct Connect, or it can be exclusively dedicated to Direct Connect.
2.  **Direct Connect Location:**  
    Typically a regional data center where AWS installs its routers. This is not a full AWS data center but rather a location where the physical connection is established.
3.  **AWS's Direct Connect Router:**  
    This router is located on the AWS side of the connection. When you purchase Direct Connect, you lease a port on the AWS router. Your on-premise router then forms a "cross connect" with AWS’s router at the Direct Connect location.

Below is a diagram illustrating the overall Direct Connect architecture:

![The image illustrates a Direct Connect Architecture, showing the connection between an on-premise network, a Direct Connect location, and an AWS Cloud with a Virtual Private Cloud (VPC). It includes components like customer and AWS routers, a customer gateway, and private and public services within the VPC.](https://kodekloud.com/kk-media/image/upload/v1752865539/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Direct-Connect/direct-connect-architecture-vpc-diagram.jpg)

The connection flow is as follows:

- Your on-premise network connects to your customer gateway.
- The customer gateway interfaces with the customer router at the Direct Connect location.
- A cross connect at the Direct Connect location links the customer router to the AWS Direct Connect router.
- From the AWS router, traffic is routed directly to AWS, allowing access to private resources (via a VPN Gateway) or public services such as Amazon S3.

> [!important]
> **Note**
>
> If you need to connect to private VPC resources, configure a VPN Gateway and establish a connection between the cross connect and the VPN Gateway. For public services, traffic is routed directly through the AWS router, leveraging the AWS backbone network for improved performance.

The following diagram offers additional insight into the connection from your on-premise network to AWS:

![The image illustrates a Direct Connect Architecture, showing the connection between an on-premise network and AWS Cloud through a Direct Connect location, including customer and AWS routers, a VPN gateway, and a Virtual Private Cloud (VPC) with private and public services.](https://kodekloud.com/kk-media/image/upload/v1752865540/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Direct-Connect/direct-connect-architecture-aws-vpc.jpg)

## Direct Connect Pricing

Direct Connect pricing is determined by two main factors:

1.  **Port Hours:**  
    You are charged based on the number of hours the port is active.
2.  **Outbound Data Transfer:**  
    Charges apply for the data transferred out of AWS.

This pricing model ensures that you only pay for the actual resources you use while enjoying a dedicated, high-speed, secure connection to AWS.

The diagram below summarizes the pricing structure for Direct Connect:

![The image is a diagram titled "Direct Connect Pricing," showing two components: "Port Hours" and "Outbound Data Transfer," each with an icon.](https://kodekloud.com/kk-media/image/upload/v1752865542/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Direct-Connect/direct-connect-pricing-diagram.jpg)

## Summary

Direct Connect provides a robust and reliable alternative to traditional VPN solutions by offering a dedicated physical connection from your on-premise network to AWS. This results in:

- Greater throughput and improved performance
- Enhanced security by bypassing the public internet
- Reduced latency and increased reliability

With a straightforward pricing model based on port hours and outbound data transfer, Direct Connect is an excellent choice for organizations that demand a high-performance, secure network connection to AWS.

![The image is a summary slide highlighting three points about a service that directly links on-premises with AWS, offers greater throughput and security than VPNs, and charges based on port hours and outbound data transfer.](https://kodekloud.com/kk-media/image/upload/v1752865543/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Direct-Connect/aws-on-premises-service-summary.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/d8c5d1bb-fcf0-402b-8e59-e1855dcb3bbb)**
>
> Watch video content
