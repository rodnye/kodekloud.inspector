# DNS as a Protocol - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/DNS-as-a-Protocol/DNS-as-a-Protocol)

---

## Table of Contents

- DNS as a Protocol
  - Understanding TCP
  - Understanding UDP
  - DNS and Packet Size Constraints
  - Protocol Stacking and the HTTP Example
  - Secure DNS
  - Handling Large DNS Responses
  - Wrapping Up: DNS in the Network Stack
  - Watch Video

---

## Content

Demystifying DNS

DNS as a Protocol

# DNS as a Protocol

DNS as a protocol involves understanding the structure of requests, responses, and the nuances governing its behavior. At its core, DNS is a network protocol—a set of agreed-upon rules that define how devices communicate. Just like protocols such as TCP or UDP in computer networking, DNS establishes standards for data exchange and interpretation between devices.

![The image illustrates DNS as a protocol within computer networking, highlighting the roles of TCP and UDP in establishing standards for device-to-device communication.](https://kodekloud.com/kk-media/image/upload/v1752873119/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-protocol-tcp-udp-roles.jpg)

DNS operations run over either TCP or UDP, making it essential to consider these transport protocols when analyzing DNS behavior. Protocols also have hierarchical relationships where higher-level protocols build upon lower-level ones to add specialized functionality. For example, basic transport mechanisms offer the groundwork on which services are layered.

![The image is a diagram illustrating the structure of DNS as a network protocol, showing the relationship between protocols and rules. A caption explains that higher-level protocols build on basic transport mechanisms for specialized services.](https://kodekloud.com/kk-media/image/upload/v1752873120/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-structure-network-protocol-diagram.jpg)

At the base of network communication is IP, which routes data across the Internet using IP addresses. TCP and UDP work with IP to ensure data reaches its destination.

![The image illustrates the DNS as a network protocol, showing a flow from IP addresses to a computer setup, with a router in between.](https://kodekloud.com/kk-media/image/upload/v1752873121/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-network-protocol-flow-diagram.jpg)

Think of TCP and UDP as two different delivery methods:

- **TCP** acts like a delivery service that requires a signature for each package, ensuring every packet is received and assembled in the correct order.
- **UDP** is akin to dropping off all packages at once without confirmation, making it faster but less reliable.

![The image illustrates DNS as a network protocol, showing TCP with packages and a hand holding a document, and UDP with a simple blue gradient bar.](https://kodekloud.com/kk-media/image/upload/v1752873122/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-network-protocol-tcp-udp.jpg)

## Understanding TCP

TCP ensures reliable delivery through packet identification and acknowledgments:

- Large data is split into smaller chunks, each with unique IDs for proper reassembly.
- Although TCP can support packets up to 65,535 bytes, practical packet sizes are usually around 1,500 bytes due to Ethernet’s Maximum Transmission Unit (MTU).
- Even single-packet data transfers involve sending an acknowledgment (ACK) to confirm receipt.

![The image illustrates the concept of DNS as a network protocol, showing a TCP acknowledgment system with a package and a Wi-Fi symbol, indicating reliable data transmission.](https://kodekloud.com/kk-media/image/upload/v1752873123/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-network-protocol-tcp-acknowledgment.jpg)

This acknowledgment system is crucial for data-intensive activities such as file downloads, where correctly assembled packets are necessary for retrieving usable files.

![The image illustrates "DNS as Network Protocol" with a focus on TCP, showing that it enables file downloads from the internet, accompanied by icons representing a wireless signal and file transfer.](https://kodekloud.com/kk-media/image/upload/v1752873124/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-network-protocol-tcp-file-transfer.jpg)

## Understanding UDP

UDP transmits data packets without waiting for confirmations, processing packets in the order they are received. Because of its speed, UDP is best suited for applications where timely data delivery is more important than perfect reliability, such as live streaming or gaming.

![The image explains DNS as a network protocol using UDP, highlighting that it sends data packets without waiting for confirmation, with icons representing a server, Wi-Fi, and data packets.](https://kodekloud.com/kk-media/image/upload/v1752873125/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-network-protocol-udp-diagram.jpg)

## DNS and Packet Size Constraints

Originally, DNS was designed to use UDP with a strict 512-byte limit per packet. This size was chosen based on IPv4 standards, which require every host to handle packets up to 576 bytes. The breakdown is as follows:

- Up to 60 bytes for IP headers.
- 8 bytes for UDP headers.
- Leaving 512 bytes for DNS data.

This 512-byte design decision even influences infrastructure, such as why there are exactly 13 root name servers—the number of server names that fit within this constraint.

With the advent of [Extended DNS (EDNS)](https://tools.ietf.org/html/rfc6891), larger UDP packets are now supported. EDNS addresses the growing needs of protocols like [DNSSEC](https://dnssec-information.org/), which include extra security data in DNS responses. However, the increase in packet size also makes DNS servers vulnerable to amplification attacks.

![The image is a diagram explaining DNS as a network protocol, highlighting "Extended DNS" for handling larger UDP packets and "DNSSEC" for DNS protocol security. It notes that computers can handle bigger packets, but bad actors may exploit DNS to create high traffic.](https://kodekloud.com/kk-media/image/upload/v1752873127/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-protocol-diagram-extended-dns.jpg)

## Protocol Stacking and the HTTP Example

Protocols are often layered to meet new communication demands. For instance, HTTP is built atop TCP:

- A TCP packet carries essential details like source and destination ports, sequence numbers, and checksums.
- HTTP builds on this by adding headers that specify information about the requested resource, content type, and browser details.
- Standard HTTP response codes (such as 404 for "Not Found" or 504 for "Gateway Timeout") ensure consistent behavior across applications.

Similarly, DNS standardizes its requests and responses, typically using UDP for speed. By design, DNS responses on UDP are transmitted on port 53, with port 853 reserved for DNS over TLS (DoT).

![The image illustrates DNS as a network protocol, showing its standards for requests and responses, and its use of UDP. It notes that DNS was designed for quick and simple lookups.](https://kodekloud.com/kk-media/image/upload/v1752873128/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-network-protocol-udp-standards.jpg)

## Secure DNS

Ensuring security for DNS transmissions is achieved through encryption methods such as DNS over TLS (DoT) and DNS over HTTPS (DoH). Both encrypt DNS traffic, though they have operational differences. When using DoT or DoH, DNS communications shift to TCP instead of UDP. In other cases, DNS typically defaults to UDP but falls back to TCP when:

- A response exceeds the 512-byte limit and extended DNS is not supported.
- Zone transfers occur during the replication of data from a primary nameserver to secondary servers.

![The image illustrates DNS as Network Protocol with a focus on Port 853, showing DNS with a check mark and TLS with a cross mark.](https://kodekloud.com/kk-media/image/upload/v1752873129/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-network-protocol-port-853.jpg)

![The image illustrates the concept of DNS as a network protocol, showing a secure tunnel with a shield and a checkmark, symbolizing the protection and privacy of DNS queries similar to HTTPS.](https://kodekloud.com/kk-media/image/upload/v1752873130/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-security-tunnel-illustration.jpg)

![The image illustrates DNS as a network protocol, showing how DNS can be encrypted using either TLS (DoT) or HTTPS (DoH), with a note that both methods encrypt DNS traffic but function differently.](https://kodekloud.com/kk-media/image/upload/v1752873131/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-encryption-tls-doh-diagram.jpg)

## Handling Large DNS Responses

When a DNS response exceeds the 512-byte limit—and extended DNS is not indicated—a truncated UDP response is sent. The client then retries the request over TCP. Additionally, TCP is used for zone transfers, ensuring that updates are accurately replicated from primary to secondary nameservers.

![The image is a flowchart illustrating DNS as a network protocol, showing that DNS uses TCP for DoT or DoH and UDP for most other cases.](https://kodekloud.com/kk-media/image/upload/v1752873132/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-network-protocol-flowchart.jpg)

![The image is a flowchart illustrating the process of handling DNS queries via UDP, including decisions based on response size and extended DNS settings.](https://kodekloud.com/kk-media/image/upload/v1752873133/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-query-handling-flowchart.jpg)

![The image is a slide titled "DNS as Network Protocol," explaining that DNS uses TCP for zone transfers to replicate updates from primary to secondary servers.](https://kodekloud.com/kk-media/image/upload/v1752873134/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/dns-network-protocol-tcp-zone-transfers.jpg)

## Wrapping Up: DNS in the Network Stack

DNS is a sophisticated protocol that powers a globally distributed system, incorporating principles from computer networking, system design, high-performance databases, and global internet routing. It shares similarities with database sharding by distributing load across multiple nameservers.

A quick note on its placement in the OSI model: DNS typically operates at the application layer (layer 7), while TCP and UDP function at the transport layer (layer 4).

![The image illustrates the OSI model layers with DNS and TCP/UDP protocols highlighted, showing their association with the Application and Transport layers, respectively.](https://kodekloud.com/kk-media/image/upload/v1752873136/notes-assets/images/Demystifying-DNS-DNS-as-a-Protocol/osi-model-dns-tcp-udp-diagram.jpg)

> [!important]
> **Note**
>
> Later, we will delve deeper into how DNS requests and responses are formed, further enhancing your understanding of tools like [dig](<https://en.wikipedia.org/wiki/Dig_(command)>).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/5859af30-1c2e-443c-b5ef-af6f366b649f/lesson/b067ee43-3c47-49ae-abcc-eeaf182c5cac)**
>
> Watch video content
