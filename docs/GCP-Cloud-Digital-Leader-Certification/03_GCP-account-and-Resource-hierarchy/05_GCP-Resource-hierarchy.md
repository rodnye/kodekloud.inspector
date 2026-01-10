# GCP Resource hierarchy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/GCP-account-and-Resource-hierarchy/GCP-Resource-hierarchy)

---

## Table of Contents

- GCP Resource hierarchy
  - Hierarchical Structure Overview
  - Real-World Example: Pharmaceutical Company
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

GCP account and Resource hierarchy

# GCP Resource hierarchy

Hello and welcome back!

In this lesson, we will explore the concept of the Google Cloud Platform (GCP) resource hierarchy and understand how it efficiently organizes your cloud resources into a structured, hierarchical model. This approach ensures better management, security, and scalability for all your cloud workloads.

## Hierarchical Structure Overview

GCP organizes resources into a tiered hierarchy consisting of three primary levels: organizations, folders, and projects.

- **Organization:**  
  The organization resource is at the top of the hierarchy and represents an entire company or legal entity. It serves as the root node for all subsequent resources.
- **Folders:**  
  Folders provide an optional layer of grouping below the organization level. They can be used to separate different legal entities, departments, or teams, thus establishing clear isolation boundaries.
- **Projects:**  
  Projects are the foundational level where you deploy your resources, including Kubernetes clusters, virtual machines (VMs), SQL databases, and more. Each project represents a unique workspace for your cloud workloads.

> [!important]
> **Key Concept**
>
> Each level of the hierarchy serves a specific purpose, helping organizations manage permissions, resource usage, and billing effectively.

## Real-World Example: Pharmaceutical Company

Let's apply the resource hierarchy model to a pharmaceutical company use case. This example illustrates how an organization can be structured to support diverse departments while maintaining accountability and ease of management.

On the left side of the diagram below, you see a visual representation of an organization's structure using the resource hierarchy model. On the right side, the same hierarchy starts with the organization as the root node.

This pharmaceutical company serves as the central node in our GCP setup.

![The image is a diagram illustrating the organizational structure of a company, showing the hierarchy of folders, projects, and resources within two different organizations.](https://kodekloud.com/kk-media/image/upload/v1752875316/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-GCP-Resource-hierarchy/company-structure-hierarchy-diagram.jpg)

Within this organization, various key departments are represented as folders. For example, departments such as Production & R&D, Logistics, and future departments act as individual folders. The Production & R&D folder is further subdivided into development and production projects, each containing specific resources like VMs, firewalls, Kubernetes clusters, SQL databases, etc.

This structured approach allows the company to scale operations effectively, providing every team with a dedicated GCP environment. Moreover, it supports a microservices architecture by ensuring a clear separation of concerns, which not only fosters innovation but also simplifies cost tracking for deployed resources.

The diagram below further illustrates the organizational setup within our pharmaceutical company, emphasizing the hierarchy of folders, projects, and resources.

![The image is a diagram illustrating the organizational structure of a company and a pharma company, showing the hierarchy of folders, projects, and resources within each. It includes elements like departments, teams, products, and various cloud services.](https://kodekloud.com/kk-media/image/upload/v1752875317/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-GCP-Resource-hierarchy/company-organization-diagram-pharma.jpg)

> [!important]
> **Organizational Benefits**
>
> Utilizing GCP’s resource hierarchy model not only streamlines resource management but also enhances security and billing transparency.

That concludes this lesson. We hope you now have a clear understanding of the GCP resource hierarchy and how it can be applied effectively using a real-world example from the pharmaceutical industry.

Thank you for reading, and see you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/b66b4a7d-3fda-4a71-880a-e91e7a6f4afa/lesson/19c635b9-4814-4179-a1a7-648096050e97)**
>
> Watch video content
