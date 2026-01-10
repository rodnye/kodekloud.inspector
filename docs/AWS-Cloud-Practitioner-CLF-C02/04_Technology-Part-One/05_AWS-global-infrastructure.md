# AWS global infrastructure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/AWS-global-infrastructure)

---

## Table of Contents

- AWS global infrastructure
  - Regions
  - Availability Zones
  - Edge Locations
  - Local Zones
  - Comparing Edge Locations and Local Zones
  - Recap
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# AWS global infrastructure

In this lesson, you'll explore the AWS global infrastructure and its essential components—Regions, Availability Zones, Edge Locations, and Local Zones. These elements work in unison to enable you to design scalable, highly available, and resilient architectures.

## Regions

An AWS region is a geographic area where you deploy your resources. AWS's extensive network spans multiple regions around the globe, allowing you to choose the optimal location for hosting your application. For example, if your target audience is in Australia, you can select one of the Australian regions.

Each region is isolated to ensure that an outage in one does not affect the others. When selecting a region, consider:

- Service availability (not every AWS service is offered in all regions).
- Regulatory and compliance requirements (such as AWS GovCloud for sensitive applications).
- Cost structures.
- Data residency and legal considerations (for instance, GDPR for EU data).

For the latest and detailed list of AWS regions—including both deployed and planned regions—visit the AWS global infrastructure page.

![The image shows a world map with various regions marked by blue and orange dots, indicating specific locations or data points.](https://kodekloud.com/kk-media/image/upload/v1752861867/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-global-infrastructure/frame_130.jpg)

Additionally, AWS’s website offers updated views in both map and list formats to help you select the region that best aligns with your application’s requirements.

![The image shows an AWS Global Infrastructure Map highlighting availability zones and planned regions worldwide, with a focus on expansion in Canada, Israel, Malaysia, New Zealand, and Thailand.](https://kodekloud.com/kk-media/image/upload/v1752861868/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-global-infrastructure/frame_160.jpg)

## Availability Zones

Within each region, AWS provides Availability Zones (AZs)—one or more isolated data centers with redundant power, networking, and connectivity. Distributing your applications across multiple AZs within the same region significantly reduces the risk of downtime.

For example, if you deploy all your resources in a single AZ and that zone experiences an outage, your entire application may become unavailable. Spreading resources across multiple AZs increases fault tolerance and ensures continuous service availability.

![The image explains AWS Availability Zones (AZ) in the US, showing three zones (AZ-01, AZ-02, AZ-03) with data centers, emphasizing redundancy and connectivity.](https://kodekloud.com/kk-media/image/upload/v1752861869/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-global-infrastructure/frame_350.jpg)

![The image explains that deploying an application in a single availability zone (AZ) risks regional failure if that AZ fails, using a diagram of Australia's zones.](https://kodekloud.com/kk-media/image/upload/v1752861872/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-global-infrastructure/frame_400.jpg)

> [!important]
> **Note**
>
> When designing your AWS infrastructure, always consider leveraging multiple Availability Zones to enhance overall resilience.

## Edge Locations

Edge locations are strategically located sites that significantly reduce latency through content caching. They form the backbone of the AWS Content Delivery Network (CDN), powered by AWS CloudFront, and serve static content (such as videos, images, and web pages) directly to end users.

Keep in mind that edge locations are designed solely for content delivery and do not support compute services like EC2.

## Local Zones

Local Zones extend AWS regions by bringing select services—such as compute and storage—closer to major urban centers. These zones offer a high-bandwidth and secure connection back to the parent region, making them ideal for real-time, low-latency applications like gaming, live streaming, or interactive virtual workstations.

![The image explains AWS Local Zones, which extend AWS Regions, offering services like compute and storage closer to end-users with secure, high-bandwidth connections.](https://kodekloud.com/kk-media/image/upload/v1752861872/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-global-infrastructure/frame_540.jpg)

## Comparing Edge Locations and Local Zones

Both edge locations and local zones are designed to bring services closer to end users and reduce latency, but their roles differ:

- Local zones are extensions of an AWS region and provide a subset of services (for example, EC2 and EBS). They are typically situated in major metropolitan areas and maintain a close, high-bandwidth connection to the parent region.
- Edge locations, on the other hand, are independent points of presence primarily used for content delivery via AWS CloudFront, and they do not support general compute services.

![The image compares AWS Edge Locations and Local Zones, highlighting their roles in improving user experience by minimizing latency and detailing their service capabilities and geographical distribution.](https://kodekloud.com/kk-media/image/upload/v1752861874/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-global-infrastructure/frame_640.jpg)

## Recap

Below is a summary of the key components of the AWS global infrastructure:

| Component          | Description                                                                                                             | Typical Use Case                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Regions            | Global geographic locations where AWS resources are deployed. Isolation helps mitigate risks and meet compliance needs. | Hosting resources based on geographic demand.                |
| Availability Zones | Discrete, redundant data centers within a region that provide fault tolerance and high availability.                    | Distributing applications to avoid single points of failure. |
| Edge Locations     | Content delivery nodes designed for fast delivery of static content through AWS CloudFront.                             | Reducing latency for static content delivery.                |
| Local Zones        | Extensions of AWS regions offering select services with low latency in major metropolitan areas.                        | Supporting low-latency, interactive applications.            |

![The image summarizes global infrastructure concepts, including regions, availability zones, edge locations, and local zones, highlighting their roles in service deployment and proximity to users.](https://kodekloud.com/kk-media/image/upload/v1752861875/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-global-infrastructure/frame_720.jpg)

> [!important]
> **Warning**
>
> Before finalizing your infrastructure design, ensure that the targeted region and its local zones support all the AWS services required for your application. This helps avoid potential limitations during deployment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/155e968d-75df-4789-b588-2a0342660d83)**
>
> Watch video content
