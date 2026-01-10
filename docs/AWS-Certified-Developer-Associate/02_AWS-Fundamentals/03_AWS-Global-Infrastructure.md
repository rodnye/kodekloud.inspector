# AWS Global Infrastructure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/AWS-Global-Infrastructure)

---

## Table of Contents

- AWS Global Infrastructure
  - Regions
  - Availability Zones
  - Edge Locations
  - Local Zones
  - Summary
  - Watch Video
    - Edge Locations vs. Local Zones

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# AWS Global Infrastructure

In this article, we explore the AWS Global Infrastructure and explain how it differs from traditional on-premises data centers. Understanding the roles of regions, availability zones, edge locations, and local zones is essential for designing a scalable, highly available, and resilient AWS architecture.

## Regions

A region is a geographic area where you deploy your AWS resources. With AWS data centers located around the world, you can select a region that best meets your business requirements. For example, if your customers are in Australia, you might choose an Australian region to reduce latency.

Each AWS region is designed to be isolated from the others. This isolation means that an outage in one region does not affect operations in another, thereby enhancing fault tolerance and resilience.

![The image shows a world map with markers indicating AWS regions, accompanied by text explaining that an AWS Region is a geographic location for deploying resources, designed for isolation and fault tolerance.](https://kodekloud.com/kk-media/image/upload/v1752858130/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Global-Infrastructure/aws-regions-world-map-diagram.jpg)

AWS has many regions deployed worldwide. The following diagram provides an overview of the current regions that are either launched or in the process of deployment.

![The image is a world map with various locations marked by blue and orange dots, labeled "Regions."](https://kodekloud.com/kk-media/image/upload/v1752858131/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Global-Infrastructure/world-map-regions-dots.jpg)

For the most up-to-date list of AWS regions, including those planned for future deployment, visit the AWS Global Infrastructure webpage. This resource offers both a map view and a list view of active and upcoming regions.

![The image is a screenshot of the AWS Global Infrastructure webpage, highlighting 31 launched regions, 99 availability zones, and 450+ points of presence.](https://kodekloud.com/kk-media/image/upload/v1752858133/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Global-Infrastructure/aws-global-infrastructure-screenshot.jpg)

When selecting a region, consider the following factors:

- Not all AWS services are available in every region. Ensure your chosen region supports all the services required for your application.
- Regulatory and compliance requirements might affect your region selection (e.g., GovCloud regions for government and defense).
- Proximity to your customers can significantly reduce latency and improve user experience.
- Pricing structures vary between regions, so consider regional cost differences.
- Legal requirements may dictate that data remain within a specific geographical area (e.g., storing EU customer data within an EU region).

> [!important]
> **Note**
>
> Choosing the right AWS region is crucial for achieving optimal performance and compliance with regulatory standards.

## Availability Zones

Within each region, AWS offers multiple availability zones (AZs). An availability zone comprises one or more discrete data centers, each with redundant power, networking, and connectivity. Deploying applications across AZs enhances redundancy and minimizes downtime.

For example, if you deploy your application in only one availability zone within a region, an outage in that zone could disrupt the entire application. By spreading resources across multiple AZs, you can maintain application availability even if one zone becomes unavailable.

![The image illustrates AWS Availability Zones (AZ) within a region in the US, showing three zones (AZ-01, AZ-02, AZ-03) connected to a central point. It explains that an AZ consists of discrete data centers with redundant power, networking, and connectivity.](https://kodekloud.com/kk-media/image/upload/v1752858134/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Global-Infrastructure/aws-availability-zones-diagram.jpg)

The diagram below reinforces the need for deploying across multiple availability zones to prevent downtime resulting from a single AZ failure.

![The image illustrates the concept of Availability Zones (AZ) within a region, showing two zones with server and database icons, and explains the impact of deploying an application in only one AZ.](https://kodekloud.com/kk-media/image/upload/v1752858135/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Global-Infrastructure/availability-zones-diagram.jpg)

## Edge Locations

Edge locations are strategically located sites used primarily to cache and deliver content via services like CloudFront. This helps reduce latency and improves the quality of service for end users. If your web server is deployed in one region but serves users globally, edge locations allow user requests to be served from a nearby location for a faster experience.

![The image shows a world map with icons indicating regions and a message about selecting a region close to customers to optimize service costs.](https://kodekloud.com/kk-media/image/upload/v1752858136/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Global-Infrastructure/world-map-region-selection-icons.jpg)

> [!important]
> **Note**
>
> Edge locations are ideal for static content delivery and can significantly enhance performance by reducing the physical distance between the users and the served content.

## Local Zones

Local zones extend an AWS region by providing select services—such as compute, storage, and databases—closer to end users in major metropolitan areas. They offer a high-bandwidth, secure connection back to the primary region, making them well-suited for low-latency applications like real-time gaming, live streaming, or interactive virtual workstations.

The diagram below illustrates AWS Local Zones, their connection to the parent region, and their benefits of low latency and proximity to users.

![The image is a diagram explaining AWS Local Zones, showing their connection to a main AWS region and highlighting their benefits like low latency and proximity to end-users.](https://kodekloud.com/kk-media/image/upload/v1752858138/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Global-Infrastructure/aws-local-zones-diagram.jpg)

### Edge Locations vs. Local Zones

Although both edge locations and local zones enhance performance by bringing resources closer to users, they serve different purposes:

- Local zones are extensions of a parent AWS region and offer a subset of AWS services (e.g., EC2 and EBS). They are typically located in major cities near the parent region.
- Edge locations are mostly used for content delivery via CloudFront and are not designed to host services like EC2 or EBS.

![The image compares AWS Edge Locations and Local Zones, highlighting their roles in improving user experience and minimizing latency. It explains the differences in infrastructure, services, and geographical distribution between the two.](https://kodekloud.com/kk-media/image/upload/v1752858140/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Global-Infrastructure/aws-edge-locations-local-zones-comparison.jpg)

## Summary

To summarize the key aspects of AWS Global Infrastructure:

- **Regions:** Geographic areas that isolate your resources for enhanced fault tolerance.
- **Availability Zones:** Multiple discrete data centers within a region that offer redundancy; deploying across them minimizes downtime.
- **Edge Locations:** Distributed sites that cache and deliver content, reducing latency for end users.
- **Local Zones:** Extensions of AWS regions providing low-latency access to essential compute and storage services.

![The image is a summary of global infrastructure, highlighting key points about regions, availability zones, edge locations, and local zones in a cloud service context. Each point is accompanied by a checkmark icon.](https://kodekloud.com/kk-media/image/upload/v1752858141/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Global-Infrastructure/global-infrastructure-summary-cloud-service.jpg)

By understanding how these components interact, you can design an AWS architecture that is both scalable and resilient while optimizing performance and cost.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/f3ce8b2d-3ecf-4975-bc22-015f5500484a)**
>
> Watch video content
