# Infrastructure Concepts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Security-Architecture/Infrastructure-Concepts)

---

## Table of Contents

- Infrastructure Concepts
  - Network Infrastructure
  - Routing Infrastructure
  - Switching Infrastructure
  - Architectural Considerations
  - Watch Video

---

## Content

CompTIA Security+ Certification

Security Architecture

# Infrastructure Concepts

This article categorizes key infrastructure concepts into three main areas:

1.  Network Infrastructure
2.  Routing Infrastructure
3.  Switching Infrastructure

A deep understanding of these areas is essential for building robust, scalable, and secure network systems.

## Network Infrastructure

Understanding the OSI model is crucial when discussing network infrastructure. The OSI model defines the layers of network communication, from high-level applications right down to physical connections. For example, Layer 1—the Physical Layer—covers wireless signals and various types of cabling used for communication.

![The image depicts a pyramid diagram of network infrastructure layers, including Application, Presentation, Session, Transport, Internet, Link, and Physical, with a note about wireless signals and cabling.](https://kodekloud.com/kk-media/image/upload/v1752872128/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Concepts/network-infrastructure-pyramid-diagram.jpg)

Network infrastructure involves three primary types of nodes:

- **Host Nodes:** End devices that send or receive data.
- **Network Nodes:** Devices such as switches or hubs that connect multiple hosts.
- **Intermediary Nodes:** Devices like gateways or routers that forward traffic through the network.

> [!important]
> **Note**
>
> For an in-depth look at the OSI model and its applications in network design, visit the [OSI Model Overview](https://en.wikipedia.org/wiki/OSI_model).

## Routing Infrastructure

Routing infrastructure is composed of both physical and virtual local area networks (LANs) along with IPv4 subnetting. This framework ensures that data packets are directed efficiently across various network segments, minimizing latency and optimizing performance. Strategic routing is a critical component to ensure seamless data flow in any network environment.

## Switching Infrastructure

Switching infrastructure is directly influenced by the choice of network topology. Common network topologies include:

- **Ring Topology:** Devices are connected in a circular configuration where data travels in one direction.
- **Linear Bus Topology:** All devices share a single communication line, known as a backbone.
- **Star Topology:** The most prevalent layout, where each node connects to a central switch, facilitating efficient data management.

Choosing the appropriate switching infrastructure requires understanding these topological differences to match your specific network needs.

## Architectural Considerations

When designing network infrastructure, several architectural factors should be taken into account:

- **Cost and Compute Performance:** Evaluate the cost-effectiveness and efficiency of compute resources.
- **Scalability and Availability:** Ensure that the infrastructure can grow with demand while maintaining high uptime.
- **Resilience and Power Constraints:** Consider the system's robustness against failures and its power consumption.
- **Patching Availability:** Assess how readily updates and fixes can be applied.
- **Risk Tolerance Level:** Define the acceptable level of risk that can be managed without compromising network performance.

![The image illustrates a person interacting with a computer, connected to servers and a cloud, under the title "Architectural Considerations." It suggests that several factors are involved in making architectural decisions.](https://kodekloud.com/kk-media/image/upload/v1752872129/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Concepts/architectural-considerations-computer-cloud.jpg)

> [!important]
> **Additional Resource**
>
> For best practices on designing scalable and resilient network architectures, refer to our [Guide to Scalable Network Design](/docs/scalable-network-design).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/f2757634-6347-4186-a981-c205389f227e/lesson/ebb6e0cd-8c27-4c35-91c4-fceb12d4763d)**
>
> Watch video content
