# DNS A Distributed System - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/DNS-as-a-System/DNS-A-Distributed-System)

---

## Table of Contents

- DNS A Distributed System
  - Watch Video

---

## Content

Demystifying DNS

DNS as a System

# DNS A Distributed System

A system is a collection of interconnected elements working together to achieve a common goal. Much like an ecosystem—where living and non-living components interact to maintain balance—the Domain Name System (DNS) comprises a network of servers and infrastructure components that collaboratively translate domain names into IP addresses.

In this article, we explore the design of the DNS. Remarkably, a system designed in the 1980s continues to support the exponential growth of the internet. The architects who designed the DNS anticipated future expansion by implementing a distributed system from the start. This distributed architecture allocates responsibilities across various server types and global locations, ensuring that no single computer is overwhelmed with all domain name and IP address mappings.

A distributed design makes the DNS fast, reliable, and scalable. Speed is crucial as a slow DNS would create a bottleneck in internet communication. Reliability is achieved through fault tolerance—ensuring the system continues to operate even if some components fail. Imagine having to manually enter IP addresses for services like Netflix or YouTube if the DNS were periodically unavailable! Scalability guarantees that, as the internet and its user base grow, the DNS maintains its fast and dependable performance.

![The image illustrates a DNS design concept with a globe showing multiple server locations and highlights features like being fast, reliable, and scalable.](/images/Demystifying-DNS-DNS-A-Distributed-System/dns-design-globe-servers-features.jpg)

Let’s examine how the DNS design supports its performance, reliability, and scalability. The DNS can be simplified into two primary components:

1.  **Recursive Resolver**: This server is responsible for querying other servers to retrieve the necessary information.
2.  **Name Server**: This server stores the mappings between domain names and their corresponding IP addresses.

To better understand these roles, consider the following analogy:

> [!important]
> **Note**
>
> Think of the recursive resolver as a seasoned detective who skillfully navigates the intricate world of DNS. By consulting cached notes from previous cases, this detective accelerates the investigation. In contrast, the name server functions like a specialized agent with direct access to the authoritative source of domain name data. These agents are strategically distributed worldwide, ensuring the integrity and accessibility of critical DNS records.

When a DNS query is received, the recursive resolver checks its cache for any relevant information from earlier lookups. If found, it quickly identifies the appropriate name server to contact for the most current data.

![The image illustrates a "Detective Analogy" for DNS resolution, showing a "Recursive Resolver" as a "Seasoned Detective" and "Nameservers" as a "Specialized Agent."](/images/Demystifying-DNS-DNS-A-Distributed-System/detective-analogy-dns-resolution.jpg)

The reliability of the DNS is enhanced by its extensive network of resolvers and name servers. If one resolver or name server is unavailable, others seamlessly take over the request, ensuring continuous DNS operation. This built-in redundancy is vital for uninterrupted internet service.

Scalability is built into the DNS design by enabling the expansion of its directory as needed. As more domains and users emerge, additional records and name servers are integrated into the network without sacrificing speed or accuracy.

The importance of a distributed system design is underscored in the next graphic:

![The image illustrates the concept of a distributed system with figures holding magnifying glasses spread across a globe.](/images/Demystifying-DNS-DNS-A-Distributed-System/distributed-system-globe-illustration.jpg)

There are two key reasons to emphasize this design:

- The inherent distributed nature of the DNS—one of the internet's foundational systems—is crucial for its exceptional efficiency and robustness.
- A deep understanding of distributed system design is invaluable for engineers. Recognizing these patterns can help troubleshoot and design innovative systems in the future.

In summary, the DNS remains a cornerstone of modern internet infrastructure because of its distributed architecture, which guarantees speed, reliability, and scalability. This design not only meets the demands of today's internet but also paves the way for future growth and technological advancements.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/2471fe18-5c6b-44e1-b0a5-0a1c6a3ac282/lesson/4a6e877a-98b8-4159-bf52-0ae47ae92bfd)**
>
> Watch video content
