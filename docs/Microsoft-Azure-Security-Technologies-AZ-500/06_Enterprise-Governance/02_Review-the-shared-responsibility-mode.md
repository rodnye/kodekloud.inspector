# Review the shared responsibility mode - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Enterprise-Governance/Review-the-shared-responsibility-mode)

---

## Table of Contents

- Review the shared responsibility mode
  - Understanding Responsibility Distribution
  - The Cloud Responsibility Analogy
  - Service Models and Their Responsibilities
  - Summary
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Enterprise Governance

# Review the shared responsibility mode

In this lesson, we explore the Shared Responsibility Model—a fundamental concept in cloud computing that clearly defines the security and compliance responsibilities shared between Microsoft Azure and you, the customer.

The Shared Responsibility Model clarifies which aspects of security and compliance are managed by the cloud provider and which remain your responsibility. The term "shared" emphasizes the cooperative efforts essential for maintaining a secure environment.

## Understanding Responsibility Distribution

When you manage on-premises infrastructure, you are responsible for everything—from the data center and networking controls to accounts, devices, and applications. In contrast, with cloud computing, some responsibilities shift to your provider. We can classify these responsibilities into three distinct categories:

1.  **Always Customer-Managed:** These responsibilities always remain with the customer, regardless of whether you use Software as a Service (SaaS), Platform as a Service (PaaS), or Infrastructure as a Service (IaaS).
2.  **Service Type-Dependent:** Your obligations change based on the service type. Depending on whether you opt for SaaS, PaaS, or IaaS, certain responsibilities may vary.
3.  **Provider-Managed:** These responsibilities are transferred to the cloud provider. For on-premises deployments, every aspect is managed by you; however, in the cloud, Microsoft Azure assumes responsibility for the data center and its foundational infrastructure.

> [!important]
> **Key Concept**
>
> When transitioning to the cloud, you transfer data center management to Microsoft Azure, who ensures security across the physical infrastructure, hardware, software, and networking. Your focus shifts to protecting your data, managing user access, and securing applications.

## The Cloud Responsibility Analogy

Consider Azure as the landlord of an apartment building. Azure is responsible for maintaining the building’s structure, electrical systems, and common areas. As a tenant, you are in charge of securing your apartment—locking your doors and deciding who has access to your space.

![The image is a diagram of a Shared Responsibility Model, showing how responsibilities are divided between the customer and Microsoft across different service types (SaaS, PaaS, IaaS, On-Premises). It categorizes responsibilities into areas always owned by the customer, those that change by service type, and those handed over to the cloud provider.](https://kodekloud.com/kk-media/image/upload/v1752881838/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Review-the-shared-responsibility-mode/shared-responsibility-model-diagram.jpg)

## Service Models and Their Responsibilities

The division of responsibilities changes based on the type of cloud service model you choose:

| Service Model                          | Managed by Azure                                                 | Customer Responsibilities                                                         | Example Analogy                                                                                      |
| -------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **SaaS (Software as a Service)**       | Infrastructure, application uptime, and parts of data management | Protecting personal data and managing user access                                 | Renting a fully furnished apartment where only your belongings require security                      |
| **PaaS (Platform as a Service)**       | Underlying infrastructure and platform maintenance               | Configuring and managing your application environment                             | Leasing commercial space where the landlord handles infrastructure while you manage your store setup |
| **IaaS (Infrastructure as a Service)** | Physical infrastructure components                               | Managing operating systems, software updates, patches, network settings, and data | Renting an empty plot of land where you build and maintain your own structures                       |

## Summary

The Shared Responsibility Model represents a cooperative effort between Microsoft Azure and its customers. Azure provides a secure infrastructure foundation by managing the physical components, while you are responsible for securing your applications, user access, and data integrity.

With this understanding of the Shared Responsibility Model, you are now prepared to delve deeper into the Azure hierarchy and explore how these principles are applied across various services.

> [!important]
> **Further Exploration**
>
> For more details on cloud security, visit the [Microsoft Azure Documentation](https://docs.microsoft.com/azure/security/) and expand your knowledge on managing and securing your cloud environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/3c48a4f2-a6f3-45fd-87d7-c53f36f2fb2a/lesson/d9103165-e84f-4756-8d8b-88ab9d260f8d)**
>
> Watch video content
