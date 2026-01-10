# Different types of Multi Tenancy in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Different-types-of-Multi-Tenancy-in-Kubernetes)

---

## Table of Contents

- Different types of Multi Tenancy in Kubernetes
  - Multi-Team Tenancy
  - Multi-Customer Tenancy
  - Key Differences
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Different types of Multi Tenancy in Kubernetes

In this article, we explore the two primary types of multi-tenancy models in Kubernetes: multi-team tenancy and multi-customer tenancy. Understanding these approaches is crucial for designing clusters that meet diverse organizational needs while ensuring secure and efficient resource management.

## Multi-Team Tenancy

Multi-team tenancy refers to managing and isolating resources for various teams or projects within a single Kubernetes cluster. This model enables different internal groups to share a common infrastructure while maintaining logical separation. Think of it like a multi-story office building where each floor (or namespace) is allocated to a different team.

![The image illustrates a Kubernetes cluster with multi-team tenancy, showing nodes A, B, and C, each hosting different teams, supported by compute, storage, and network resources.](https://kodekloud.com/kk-media/image/upload/v1752871638/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Different-types-of-Multi-Tenancy-in-Kubernetes/frame_20.jpg)

> [!important]
> **Note**
>
> In multi-team tenancy, role-based access control (RBAC) and namespace quotas are critical to ensure fair resource allocation and security among internal teams.

## Multi-Customer Tenancy

Multi-customer tenancy involves hosting and segregating applications for multiple external customers or clients from a single Kubernetes cluster. This approach is common among SaaS providers who must isolate data and applications to meet strict security standards. In this model, each customer’s workload is securely separated even though they share the same underlying infrastructure.

![The image illustrates a Kubernetes cluster with multi-customer tenancy, showing nodes A, B, and C, each hosting different customers, supported by compute, storage, and network resources.](https://kodekloud.com/kk-media/image/upload/v1752871640/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Different-types-of-Multi-Tenancy-in-Kubernetes/frame_50.jpg)

> [!important]
> **Warning**
>
> For multi-customer environments, enforcing stringent security protocols (such as compliance with GDPR, HIPAA, or other regulatory standards) is essential, as customers do not have direct access to the cluster.

## Key Differences

When comparing multi-team and multi-customer tenancy, consider the following differences:

- **Focus:**
  - **Multi-Team:** Primarily designed for managing internal organizational teams.
  - **Multi-Customer:** Tailored for managing applications and data for external clients.

- **Isolation and Security:**
  - Both models rely on Kubernetes namespaces for resource isolation. However, multi-customer tenancy typically demands higher security measures and separation due to stricter regulatory requirements.

- **Access Control:**
  - **Multi-Team:** Internal teams usually have direct access to the cluster through tools like kubectl or GitOps controllers.
  - **Multi-Customer:** External customers do not have direct access; instead, cluster operations remain behind the scenes.

![The image compares multi-team and multi-customer tenancy, highlighting differences in focus, isolation, resource management, governance, compliance, and access restrictions using Kubernetes.](https://kodekloud.com/kk-media/image/upload/v1752871641/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Different-types-of-Multi-Tenancy-in-Kubernetes/frame_150.jpg)

In multi-customer setups, Kubernetes operates largely behind the scenes, ensuring that end-users experience a secure and seamlessly managed service environment.

For additional details on Kubernetes design patterns and security practices, consider exploring the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/7a505db4-e9ba-4e77-8ec8-623a95ab8d81)**
>
> Watch video content
