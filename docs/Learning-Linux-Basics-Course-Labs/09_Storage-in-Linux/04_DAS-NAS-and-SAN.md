# DAS NAS and SAN - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Storage-in-Linux/DAS-NAS-and-SAN)

---

## Table of Contents

- DAS NAS and SAN
  - 1. Direct-Attached Storage (DAS)
  - 2. Network-Attached Storage (NAS)
  - 3. Storage Area Network (SAN)
  - Watch Video

---

## Content

Learning Linux Basics Course & Labs

Storage in Linux

# DAS NAS and SAN

In this article, we provide a comprehensive overview of three commonly used external storage technologies: Direct-Attached Storage (DAS), Network-Attached Storage (NAS), and Storage Area Network (SAN). Understanding these storage options is essential for transitioning from desktop-oriented setups to robust, enterprise-grade environments.

Mumshad Mannambeth explains that while onboard storage or an attached external drive may work well for desktops and laptops, these solutions are insufficient for enterprise-grade servers such as those running production databases or high-demand web applications. In such cases, high-capacity external storage with high availability and exceptional performance is critical.

> [!important]
> **Key Consideration**
>
> When planning for enterprise storage deployments, always evaluate the specific requirements of your infrastructure, including scalability, performance, and availability.

---

## 1\. Direct-Attached Storage (DAS)

Direct-Attached Storage (DAS) connects storage devices directly to a host system. The operating system recognizes these devices as block devices, allowing for excellent performance with minimal latency because there is no network or firewall overhead.

![The image explains Direct Attached Storage (DAS), highlighting its features: block storage, fast, reliable, affordable, dedicated to a single host, ideal for small businesses.](https://kodekloud.com/kk-media/image/upload/v1752881144/notes-assets/images/Learning-Linux-Basics-Course-Labs-DAS-NAS-and-SAN/frame_90.jpg)

DAS is particularly well-suited for small businesses and environments where storage does not need to be shared among multiple servers. However, its direct attachment means scalability is limited, making it less ideal for larger, enterprise environments that demand shared and flexible storage solutions.

---

## 2\. Network-Attached Storage (NAS)

Network-Attached Storage (NAS) is ideal for mid-to-large businesses that require shared file storage accessible over a network. NAS devices are physically separate from the computing hosts, and data is transferred via a network connection. Even if the physical distance is minimal—such as devices within the same rack in a data center—the data still travels through network infrastructure.

NAS typically functions as an NFS server, exporting storage as directories or shares that can be accessed simultaneously by multiple hosts. Its design supports centralized shared storage with high availability and good performance, particularly with high-speed Ethernet connectivity. NAS is well-suited for web servers, application servers, and non-production database environments. It is important to note that installing an operating system directly on a NAS device is generally not recommended.

![The image illustrates a Network Attached Storage (NAS) setup, showing an NFS server connected to hosts via a network, highlighting features like shared file-based storage.](https://kodekloud.com/kk-media/image/upload/v1752881144/notes-assets/images/Learning-Linux-Basics-Course-Labs-DAS-NAS-and-SAN/frame_160.jpg)

---

## 3\. Storage Area Network (SAN)

Storage Area Network (SAN) provides block storage designed for enterprises running mission-critical applications that demand high throughput and low latency. In a SAN system, storage is allocated to hosts as Logical Unit Numbers (LUNs), which represent sections of a shared storage pool presented as logical disks to the server.

![The image illustrates a Storage Area Network (SAN) setup, showing SAN devices connected to hosts A and B via Fibre Channel switches.](https://kodekloud.com/kk-media/image/upload/v1752881145/notes-assets/images/Learning-Linux-Basics-Course-Labs-DAS-NAS-and-SAN/frame_240.jpg)

When a host system detects a SAN device, it appears as a raw disk where partitions and file systems can be created, much like any other block device. SAN systems typically use Fibre Channel Protocol (FCP) for high-speed data transfer, though Ethernet-based solutions do exist. A Host Bus Adapter (HBA) installed in the server (usually via a PCI slot) connects to Fibre Channel switches, ensuring that SAN environments can deliver superior performance and reliability.

> [!important]
> **Ideal Use Cases**
>
> SAN is best for handling mission-critical applications and databases—such as Oracle, Microsoft SQL Server, and virtualized environments using platforms like VMware, KVM, or Microsoft Hyper-V—due to its high performance and reliability.

---

By understanding the differences among DAS, NAS, and SAN, IT professionals can better choose the appropriate storage solution tailored to their performance requirements, scalability needs, and overall infrastructure design. For further reading on storage technologies and enterprise IT solutions, explore the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/e0021af2-9983-4bde-97a2-29255d3ea1da/lesson/34a1aac0-c5b9-4952-a675-ec552f5858d8)**
>
> Watch video content
