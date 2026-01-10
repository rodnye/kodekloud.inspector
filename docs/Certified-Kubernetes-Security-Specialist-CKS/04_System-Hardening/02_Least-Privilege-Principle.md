# Least Privilege Principle - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/System-Hardening/Least-Privilege-Principle)

---

## Table of Contents

- Least Privilege Principle
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

System Hardening

# Least Privilege Principle

In this article, we explore the Least Privilege Principle—a critical security concept that minimizes risk and enhances operational efficiency by granting roles only the access necessary for their tasks.

![The image features the text "Least Privilege Principle" on a blue background with a geometric network design on the right.](https://kodekloud.com/kk-media/image/upload/v1752871731/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Least-Privilege-Principle/frame_0.jpg)

Imagine a busy international airport with flights departing every hour. The procedures a traveler follows before boarding illustrate the principle of least privilege perfectly.

1.  **Baggage Drop-off:**  
    At the check-in counter, you can only check in if your flight departs within a few hours. Luggage is dropped off at the specific airline’s counter, where an attendant verifies your valid ticket before you proceed further.
2.  **Immigration Check:**  
    An immigration officer checks your travel documents, and any lapse in valid documentation results in denied access.
3.  **Security Screening:**  
    During security, any prohibited or hazardous items in your carry-on must be discarded.
4.  **Navigating the Departure Hall:**  
    You then move through the departure hall to your boarding gate. Public areas and duty-free shops are accessible, but boarding is allowed only at the designated gate. Sensitive areas such as cargo bays and runways remain strictly off-limits.

This analogy not only highlights the traveler’s journey but also underscores the need for different access levels among the airport’s various personnel. Consider the following roles and their specific privileges:

- **Traveler:** Accesses public spaces after check-in and boards only at the designated gate.
- **Baggage Counter Employees:** Handle traveler and airline-specific information for check-in processes.
- **Security Officers:** Inspect belongings in the security area while also accessing some public spaces.
- **Store Employees:** Operate within public areas and may have extended access to backroom operations.
- **Boarding Gate Staff:** Assist travelers in boarding, similar to baggage counter staff.
- **Cleaning Staff:** Access designated areas, with some having permission for restricted zones such as terminals or cargo drop-off areas.
- **Cargo Loaders and Maintenance Workers:** Have access similar to cleaning staff and also unrestricted areas like the loading bay.
- **Pilots, Stewards, and Flight Attendants:** Possess specialized access to restricted zones, such as cockpits and specific aircraft-related areas, limited to their airline’s operations.

> [!important]
> **Note**
>
> Applying the principle of least privilege means granting every role only the access they need, reducing potential risks and improving overall security.

![The image illustrates various airport roles, including baggage counter staff, security check personnel, store employees, travelers, pilots, stewards, cargo loaders, maintenance workers, and cleaners.](https://kodekloud.com/kk-media/image/upload/v1752871732/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Least-Privilege-Principle/frame_250.jpg)

The same principle applies to computer systems, such as Linux operating systems and Kubernetes clusters. When securing Kubernetes infrastructure, it is paramount to restrict access by implementing measures such as:

| Security Measure                 | Description                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| Limit Node Access                | Ensure nodes have restricted user permissions to prevent unauthorized modifications. |
| Role-Based Access Control (RBAC) | Define precise access rights for users and services within the cluster.              |
| Remove Obsolete Packages         | Keep systems updated by removing software that is no longer required.                |
| Restrict Network Access          | Limit network communication between components to reduce attack surfaces.            |
| Restrict Kernel Modules          | Load only essential kernel modules and block unnecessary ones.                       |
| Fix Open Ports                   | Identify and secure any open ports to prevent unauthorized entry points.             |

![The image lists security measures: limit node access, RBAC access, remove obsolete packages, restrict network access, restrict kernel modules, and fix open ports, alongside a phone icon.](https://kodekloud.com/kk-media/image/upload/v1752871733/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Least-Privilege-Principle/frame_280.jpg)

Beyond user permissions, this principle extends to system components. Ensure that:

- Only the required software is installed on the host.
- Unnecessary services do not expose the nodes.
- Unused kernel modules are not loaded after boot.
- Any open ports are identified and promptly secured.

> [!important]
> **Further Reading**
>
> In upcoming articles, we will delve deeper into securing Kubernetes environments, exploring how to fortify nodes, enforce RBAC, and apply additional security best practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/26fe1d7b-c7c9-49df-9a25-a919ff3f084e)**
>
> Watch video content
