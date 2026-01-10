# What is GCP Global Infrastructure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/Introduction-to-Digital-Transformation-with-Google-Cloud/What-is-GCP-Global-Infrastructure)

---

## Table of Contents

- What is GCP Global Infrastructure
  - Current Deployment Challenges
  - Enhancing Availability with GCP Infrastructure
  - Regions and Zones Explained
  - Summary
  - Watch Video
    - Deploying Across Regions

---

## Content

GCP Cloud Digital Leader Certification

Introduction to Digital Transformation with Google Cloud

# What is GCP Global Infrastructure

Welcome to this article on Google Cloud Platform (GCP) global infrastructure. In this guide, we will explore how GCP supports global application delivery, addressing issues such as latency and downtime, and reveal strategies to improve availability by harnessing multiple regions and zones.

## Current Deployment Challenges

Our application is currently hosted in the USA. For instance, while a pharmacist in the USA uses our web application seamlessly to place new orders, customers in Sri Lanka face significant latency due to the long distance from our US-based server. Moreover, if our US data center encounters issues, our entire application risks global downtime. This single-region deployment impacts the overall user experience and safety.

> [!important]
> **Warning**
>
> Relying solely on one region can lead to 100% downtime if that region becomes unavailable. Consider deploying across multiple regions to mitigate this risk.

## Enhancing Availability with GCP Infrastructure

To improve application availability, we can deploy across multiple zones within a region. Multiple zones help distribute incoming requests and provide better fault tolerance. However, note that if an entire region experiences issues, even multiple zones within the region may not be sufficient.

### Deploying Across Regions

Deploying the application in a region closer to the customer base can reduce latency and improve user experience. For instance, while our current deployment is in the USA, we can utilize another region, such as Mumbai, to serve customers in South Asia more efficiently. Combining this approach with the addition of zones within each region further enhances reliability.

GCP's global infrastructure spans across North America, South America, Europe, Asia, and Australia. With 34 regions and 200+ country availability, GCP continuously maintains and upgrades its network with 24/7/365 support.

![The image shows a world map highlighting Google Cloud Platform (GCP) regions, with 34 current regions and plans for expansion. It also notes GCP's availability in over 200 countries and its 24/7/365 global support.](https://kodekloud.com/kk-media/image/upload/v1752875352/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-What-is-GCP-Global-Infrastructure/gcp-regions-world-map-expansion.jpg)

As illustrated, GCP operates with a widespread network of regions interconnected through advanced networking, ensuring fault tolerance and reliability. This robust design enables businesses to locate resources close to their customers, reducing latency and boosting overall performance.

For our pharmaceutical company, a strategic design would involve two primary regions: one in the USA and another in Mumbai. This configuration decreases latency by locating application instances nearer to end users, and it enhances availability through regional diversity and redundancy. Furthermore, our centralized engineering team can deploy updates regionally based on real-time demand, paving the way for seamless expansion as the customer base grows.

Additionally, since GCP manages these global data centers, our focus can simply be on enabling the necessary services in the chosen regions instead of building our own infrastructure.

![The image shows a world map with regions labeled "USA" and "MUMBAI," connected to an "Engineering Team." It suggests options for deploying applications closer to customers and adding zones for high availability.](https://kodekloud.com/kk-media/image/upload/v1752875353/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-What-is-GCP-Global-Infrastructure/world-map-usa-mumbai-engineering-team.jpg)

## Regions and Zones Explained

In GCP, a region refers to a specific geographical area, such as the USA, where multiple zones exist. Zones are individual data centers within a region that are interconnected with low-latency links. Typically, a region comprises three or more zones, each playing a vital role in ensuring high availability and resilience.

![The image illustrates the concept of regions and zones in Google Cloud Platform (GCP), showing a world map with marked zones and a brief explanation of regions as geographical locations hosting multiple zones, and zones as discrete data centers connected with low latency.](https://kodekloud.com/kk-media/image/upload/v1752875354/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-What-is-GCP-Global-Infrastructure/gcp-regions-zones-world-map.jpg)

The diagram above outlines a typical multi-region setup, with our application deployed in two distinct regions — for example, US West 1 and Asia South 1. In each region, several zones host the compute instances, collectively enhancing application reliability and performance.

## Summary

In this article, we covered:

- An overview of GCP global infrastructure and how it supports global application delivery.
- The current challenges of single-region deployment, including latency issues and potential downtime.
- The benefits of deploying applications across multiple regions and zones.
- Detailed explanations of regions and zones, emphasizing their roles in ensuring high availability.

By leveraging GCP's robust global infrastructure, we can ensure that our application remains responsive and available to users worldwide. This strategic flexibility not only addresses immediate performance issues but also paves the way for future growth and global expansion.

We look forward to sharing further insights in upcoming articles.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/75af64a7-064f-4e1e-af5c-8bc1920368f4/lesson/579969bc-0766-4cf6-a528-f8f1abf5ea0a)**
>
> Watch video content
