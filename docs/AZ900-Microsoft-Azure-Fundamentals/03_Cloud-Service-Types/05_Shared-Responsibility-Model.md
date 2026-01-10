# Shared Responsibility Model - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Cloud-Service-Types/Shared-Responsibility-Model)

---

## Table of Contents

- Shared Responsibility Model
  - Responsibilities Overview
  - Service Model Breakdown
  - Practical Implications
  - Comparing Cloud Models: IaaS, PaaS, and SaaS
  - Conclusion
  - Watch Video
    - Infrastructure as a Service (IaaS)
    - Platform as a Service (PaaS)
    - Software as a Service (SaaS)

---

## Content

AZ900: Microsoft Azure Fundamentals

Cloud Service Types

# Shared Responsibility Model

Understanding the Shared Responsibility Model is essential for navigating cloud computing choices while ensuring robust security and compliance. This guide explains how responsibilities are divided between Bella Innovation and the cloud provider, based on the chosen service model.

## Responsibilities Overview

Regardless of the cloud service model in use, Bella Innovation maintains responsibility for protecting and governing its data, managing end-user devices, and handling user accounts and identities. These core responsibilities are crucial for maintaining operational security.

In on-premises environments, Bella Innovation controls everything because the data center is entirely under its management. However, responsibility shifts when moving to the cloud.

## Service Model Breakdown

### Infrastructure as a Service (IaaS)

In an IaaS environment, Bella Innovation manages aspects such as identity, application configurations, network controls, and the operating system. Although Bella Innovation selects and configures the underlying hardware provided by the cloud provider, the client must also handle system-level tasks like patch management.

> [!important]
> **Key Point**
>
> Remember: When deploying a vulnerable Linux version on a virtual machine, it is Bella Innovation’s responsibility to apply the necessary patches, not the cloud provider's.

### Platform as a Service (PaaS)

With PaaS, the responsibilities are reallocated slightly. The cloud provider (e.g., Microsoft) manages the operating system, including updates and maintenance. Meanwhile, Bella Innovation continues to oversee application development, identity management, network controls, and directory infrastructure. For example, while Microsoft may install and update the Python runtime, Bella Innovation is responsible for developing and running custom Python code.

### Software as a Service (SaaS)

In the SaaS model, the cloud provider assumes nearly all responsibilities such as platform management, application updates, and hardware maintenance. Bella Innovation primarily manages user identities and directory infrastructure.

The chart below summarizes how responsibilities are distributed across these different service models:

![The image is a chart illustrating a shared responsibility model, showing how responsibilities are divided between Bella Innovation and a cloud provider across different service types (SaaS, PaaS, IaaS, On-Premises). It categorizes responsibilities into those always owned by Bella Innovation, those that vary by type, and those transferred to the cloud provider.](https://kodekloud.com/kk-media/image/upload/v1752868246/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Shared-Responsibility-Model/shared-responsibility-model-chart.jpg)

In on-premises deployments, Bella Innovation controls the physical data center, networking, and servers. In contrast, these elements become managed by the cloud provider when adopting cloud services.

## Practical Implications

For example, when using IaaS, it is critical to enforce a rigorous patch management policy. If a vulnerability is discovered in the operating system of a virtual machine, Bella Innovation must patch the system immediately. Failure to do so may expose the infrastructure to security breaches, emphasizing that such responsibilities cannot be offloaded to the cloud provider.

## Comparing Cloud Models: IaaS, PaaS, and SaaS

A clear comparison between these models highlights the trade-offs involved:

- **IaaS:**  
  Provides maximum flexibility. Bella Innovation can choose the operating system, install software, and manage configurations while the cloud provider hosts the underlying hardware.  
  _Example: Azure Virtual Machines, Virtual Machine Scale Sets._
- **PaaS:**  
  Focuses on application development by removing the burden of managing the operating system and runtime maintenance. This allows developers to concentrate on building and deploying applications.  
  _Example: Azure App Services, Azure Container Services._
- **SaaS:**  
  Offers a convenience model where software is accessed via subscriptions, taking care of most underlying management aspects. The user only manages identities and access control.  
  _Example: Microsoft 365, Hotmail, Netflix, Amazon Prime._

The comparison chart below illustrates the core features and examples for IaaS, PaaS, and SaaS:

![The image is a comparison chart of IaaS, PaaS, and SaaS, highlighting their core features and examples. It describes the flexibility, management, and payment models associated with each service type.](https://kodekloud.com/kk-media/image/upload/v1752868248/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Shared-Responsibility-Model/iaas-paas-saas-comparison-chart.jpg)

## Conclusion

Understanding the Shared Responsibility Model is critical for any organization leveraging cloud services. By clearly delineating responsibilities—whether they pertain to data governance, patch management, or application development—Bella Innovation can partner effectively with cloud providers to maintain a secure and compliant infrastructure.

This module concludes our overview. In the next module, we will explore various cloud services and delve into the processes for setting up web servers and applications. See you in the next module!

> [!important]
> **Further Reading**
>
> For additional details on cloud service models and best practices, check out the [Microsoft Azure Fundamentals documentation](https://learn.microsoft.com/en-us/certifications/exams/az-900) and [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/76318062-6532-4f08-91af-8251402c2cd1/lesson/04d5be68-456c-48b8-872a-c63f33168ac7)**
>
> Watch video content
