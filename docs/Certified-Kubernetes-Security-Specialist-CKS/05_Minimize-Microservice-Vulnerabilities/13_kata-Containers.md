# kata Containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/kata-Containers)

---

## Table of Contents

- kata Containers
  - Hardware Virtualization Requirements
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# kata Containers

In this article, we introduce Kata Containers and explore its innovative approach to container sandboxing, designed to enhance security and isolation.

Kata Containers distinguishes itself from alternatives like [gVisor](https://gvisor.dev) by using a lightweight virtual machine (VM) for each container. Unlike traditional containerization, where multiple applications share the same operating system kernel, Kata Containers assigns a dedicated kernel to every container. This isolation strategy prevents system-wide failures since any malfunction within a container only affects that individual container.

> [!important]
> **Key Benefit**
>
> Each container in Kata Containers runs inside its own lightweight VM, ensuring that issues in one container do not compromise the stability of other containers or the host system.

While the idea of deploying a separate VM for every container might suggest a significant performance overhead, Kata Containers is optimized to minimize this impact. Although there is a slight performance trade-off—mainly due to the additional memory and compute resources required—this compromise is balanced by the enhanced security and isolation benefits provided.

## Hardware Virtualization Requirements

One important factor to consider is that Kata Containers depends on hardware virtualization support. This means that running Kata Containers in common cloud environments can be challenging. Typically, cloud compute instances already operate as virtual machines, so deploying Kata Containers would involve nested virtualization, where a VM runs inside another VM.

> [!important]
> **Nested Virtualization Concerns**
>
> Many cloud providers do not support nested virtualization. However, some exceptions exist. For instance, [Google Cloud](https://cloud.google.com/compute/docs/instances/nested-virtualization) allows nested virtualization, though it often requires manual configuration and may not yield optimal performance.

If you have access to dedicated physical or bare metal servers—especially in a cloud setting—you can leverage Kata Containers without the performance limitations associated with nested virtualization.

For more detailed insights into container security and virtualization technologies, consider exploring additional resources and documentation from [Kubernetes Documentation](https://kubernetes.io/docs/) and [Docker Hub](https://hub.docker.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/0edfec7a-c84e-498e-a1f7-03ea99038d3b)**
>
> Watch video content
