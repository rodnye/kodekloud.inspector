# Virtual Machines vs Containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Container-Security/Virtual-Machines-vs-Containers)

---

## Table of Contents

- Virtual Machines vs Containers
  - Virtual Machines
  - Containers
  - Analogy: Apartment Building vs Shared Housing
  - Advantages of Containers
  - Conclusion
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Container Security

# Virtual Machines vs Containers

In this article, we explore the fundamental differences between virtual machines (VMs) and containers—two critical technologies that have transformed modern software development and deployment. Understanding these differences is essential for selecting the right approach for your projects.

## Virtual Machines

Virtual machines start with a physical server that hosts a dedicated operating system. This host operating system interacts directly with the server's hardware. A hypervisor is then installed on the host OS, enabling multiple VMs to run concurrently on a single physical server.

Each virtual machine includes its own guest operating system, completely isolated from others. For example, one VM might run a guest Windows OS (like Windows 10, Windows 11, or Windows Server variants), while another VM might run a Linux distribution such as CentOS, Ubuntu, or Debian. Within each guest OS, the necessary libraries and binaries support specific applications—for instance, App A in a Windows VM and App B in a Linux VM.

## Containers

Containers begin with the same physical server and host operating system foundation. Instead of using a hypervisor, containers rely on a container runtime like Docker. This runtime is lightweight and allows multiple isolated containers to run directly on the host OS.

It is also possible to deploy a container runtime within a virtual machine. In such cases, the container runtime operates inside a VM on a physical server. Regardless of the configuration, each container bundles an application and its dependencies—including the required libraries and binaries. Unlike virtual machines, containers share the host operating system, making them lightweight and enabling quick startup times.

## Analogy: Apartment Building vs Shared Housing

To illustrate the differences, consider the following analogy:

1.  **Apartment Building (Virtual Machines):**
    - The physical server is the building’s foundation.
    - The host operating system serves as the main infrastructure (lobbies, elevators, hallways).
    - Each apartment unit represents a VM with its own lock and complete isolation from others.
    - Furniture and appliances within each apartment correspond to libraries and binaries, while the tenants represent running applications.
    - This configuration provides strong isolation and security at the cost of higher resource usage and expense.

2.  **Shared Housing (Containers):**
    - The physical server is the house itself.
    - Common areas like the kitchen, living room, and bathrooms represent the host operating system.
    - Dividers or partitions that create individual rooms work like a container runtime, offering lightweight isolation.
    - Each private room, housing personal belongings (libraries and binaries) and a resident (application), represents a container.
    - This setup optimizes resource usage and provides greater flexibility, though it offers slightly less isolation compared to VMs.

## Advantages of Containers

> [!important]
> **Key Benefits**
>
> - **Isolation and Efficiency:** Containers package an application with all its dependencies, running in user mode using the host kernel. This reduces overhead and ensures rapid startup.
> - **Consistent Deployments:** Containers encapsulate both the application and its dependencies, ensuring that deployments behave the same way across development, testing, and production environments. Tools like Docker and Kubernetes streamline this process.
> - **Optimized Storage:** With features like image layering, containers update only the modified layers, conserving storage space. Multiple containers can share the same base image, leading to improved efficiency.
> - **Enhanced Fault Tolerance:** Container orchestration systems such as Kubernetes manage container lifecycles. They automatically replace failed containers, ensuring continuous availability and enabling seamless scaling.

## Conclusion

In summary, virtual machines provide complete isolation with dedicated guest operating systems, making them ideal for scenarios that demand high security and full resource separation. Containers offer a lightweight solution by packaging an application with its essential components while sharing the underlying host operating system, resulting in faster startup times and improved resource efficiency.

Now that you have a clear understanding of the differences between VMs and containers, you are well-equipped to explore and implement container technologies in your projects. For further reading, consider these resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/146650b0-63f9-4c4b-b452-716a780e5fc7/lesson/877bd6b6-bfb4-4222-92e8-0d7b2d95e24e)**
>
> Watch video content
