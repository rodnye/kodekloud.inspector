# Architectural Models - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Security-Architecture/Architectural-Models)

---

## Table of Contents

- Architectural Models
  - Watch Video

---

## Content

CompTIA Security+ Certification

Security Architecture

# Architectural Models

Welcome back to our in-depth exploration of architectural models and their significance in cybersecurity. In this lesson, we delve into the core principles of network architecture, infrastructure models, and essential design considerations that help safeguard your digital assets. Understanding these models is crucial for both IT professionals and cybersecurity enthusiasts.

Network architecture defines how you select and organize devices, protocols, and other assets—both physical and digital—to align with your business objectives. Because different business units have unique workflows and processes, architectural designs are often customized to meet these specific needs. Typically, security zones and physical isolation strategies form integral parts of these designs.

> [!important]
> **Note**
>
> Remember, a well-planned network architecture not only improves operational efficiency but also strengthens your overall security posture.

Security zones extend the concept of network segmentation by grouping multiple IP subnets and services together. Think of a security zone as a mini-network or a cluster of networks within a larger enterprise environment. This strategy effectively divides the infrastructure into segments with similar security requirements.

![The image illustrates a concept of "Security Zones," showing a globe connected to various people, symbolizing the division of architecture into areas with similar security needs.](https://kodekloud.com/kk-media/image/upload/v1752872084/notes-assets/images/CompTIA-Security-Certification-Architectural-Models/security-zones-architecture-globe.jpg)

A common approach in many organizations is to segment the network into distinct zones:

- The "outside zone" typically encompasses the internet and other public-facing connections.
- The "inside zone" contains private networks and internal resources.

Often, a Demilitarized Zone (DMZ) is introduced as a controlled intermediary that facilitates secure communication between these two zones. For example, when a customer places an online order, the request originates from the outside zone. The web server handling the transaction, usually located in the DMZ, acts as a bridge. If the transaction requires access to sensitive data housed in the inside zone, the DMZ serves as a secure intermediary.

![The image illustrates a network security concept with a Demilitarized Zone (DMZ) enabling restricted communication between inside and outside zones. It includes icons representing internal and external networks connected through the DMZ.](https://kodekloud.com/kk-media/image/upload/v1752872085/notes-assets/images/CompTIA-Security-Certification-Architectural-Models/network-security-dmz-illustration.jpg)

In addition to implementing security zones, a robust architectural design emphasizes the physical isolation of resources. This isolation minimizes the attack surface by restricting the propagation of potential threats across different parts of the infrastructure.

By understanding and implementing these architectural strategies, organizations can build resilient networks that not only operate efficiently but also defend against cyber threats effectively.

For further insights into building secure networks, explore more about [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) and other cybersecurity topics in our extensive [documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/f2757634-6347-4186-a981-c205389f227e/lesson/991bce36-6639-4f1f-a1c6-fc9f5a985fb6)**
>
> Watch video content
