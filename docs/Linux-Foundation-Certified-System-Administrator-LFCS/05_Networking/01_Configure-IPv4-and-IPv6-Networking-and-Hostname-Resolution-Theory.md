# Configure IPv4 and IPv6 Networking and Hostname Resolution Theory - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Networking/Configure-IPv4-and-IPv6-Networking-and-Hostname-Resolution-Theory)

---

## Table of Contents

- Configure IPv4 and IPv6 Networking and Hostname Resolution Theory
  - Understanding IP Addresses
  - Tools for Network Configuration
  - Summary
  - Watch Video
    - IPv4 Addressing
    - IPv6 Addressing
      - CIDR Notation in IPv4
      - CIDR Notation in IPv6

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Networking

# Configure IPv4 and IPv6 Networking and Hostname Resolution Theory

In this lesson, we will explore how to configure network settings on Ubuntu with a focus on IP addressing principles that are essential for both IPv4 and IPv6 communications.

## Understanding IP Addresses

Every device connected to a network requires an IP address. There are two primary versions of the Internet Protocol:

- **IPv4 (Internet Protocol version 4)**
- **IPv6 (Internet Protocol version 6)**

### IPv4 Addressing

IPv4 addresses are composed of four decimal numbers separated by dots (e.g., 192.168.1.101). Each number, also known as an octet, ranges from 0 to 255 because it represents 8 bits (2⁸ possible values).

![The image explains the conversion of binary numbers to decimal notation, showing how 8 bits can represent numbers from 0 to 255.](https://kodekloud.com/kk-media/image/upload/v1752881298/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-IPv4-and-IPv6-Networking-and-Hostname-Resolution-Theory/binary-to-decimal-conversion-8-bits.jpg)

For example, in binary, 00000000 converts to decimal 0, whereas 11111111 converts to decimal 255. To further illustrate, consider the IP address 192.168.1.101. Although it is typically represented in decimal form, its binary representation is crucial for understanding network segmentation and configuration.

#### CIDR Notation in IPv4

Often, IP addresses are shown with CIDR (Classless Inter-Domain Routing) notation. For example, 192.168.1.101/24 means that the first 24 bits of the address (corresponding to the first three octets “192.168.1”) denote the network prefix, while the last 8 bits indicate the specific host (in this case, "101").

![The image is an instructional graphic about configuring IPv4 and IPv6 networking, showing an IP address in CIDR notation (192.168.1.101/24) and explaining that CIDR stands for Classless Inter-Domain Routing.](https://kodekloud.com/kk-media/image/upload/v1752881300/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-IPv4-and-IPv6-Networking-and-Hostname-Resolution-Theory/ipv4-ipv6-cidr-configuration-guide.jpg)

Breaking down the CIDR notation further, the binary representation of 192.168.1.101 clearly shows the first 24 bits aligned with the octets “192.168.1”.

![The image illustrates IPv4 networking, showing an IP address (192.168.1.101/24) with its binary representation and highlighting the first 24 bits as the network prefix.](https://kodekloud.com/kk-media/image/upload/v1752881301/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-IPv4-and-IPv6-Networking-and-Hostname-Resolution-Theory/ipv4-networking-ip-address-diagram.jpg)

With a /24 network, all IP addresses from 192.168.1.0 to 192.168.1.255 belong to the same network. In contrast, an IP address such as 192.168.2.101 would belong to a different network because its three initial octets differ.

![The image explains CIDR notation for IP addresses, showing that IPs from 192.168.1.0 to 192.168.1.255 are part of the same network, while 192.168.2.255 is part of a different network.](https://kodekloud.com/kk-media/image/upload/v1752881302/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-IPv4-and-IPv6-Networking-and-Hostname-Resolution-Theory/cidr-notation-ip-addresses-explained.jpg)

A different CIDR value can also be applied. For example, with 192.168.1.101/16, only the first 16 bits (the first two octets "192.168") are used to determine the network. This configuration means that every IP address from 192.168.0.0 to 192.168.255.255 is part of the same network.

```
192.168.1.101/16
"11000000.10101000.00000001.01100101"
```

> [!important]
> **Note**
>
> When dealing with CIDR notations that do not fit neatly into octet boundaries (such as a /20 prefix), consider using a CIDR or subnet calculator for precise network configuration.

### IPv6 Addressing

IPv6 represents a significant upgrade from IPv4 by using 128-bit addresses. An example of an IPv6 address is:

```
2001:0db8:0000:0000:ff00:0042:8329
```

There are several key differences between IPv4 and IPv6 addresses:

1.  **Grouping:** IPv6 addresses are divided into 8 groups instead of 4.
2.  **Numerical System:** The groups are presented in hexadecimal format, which includes digits from 0 to 9 and letters A–F.
3.  **Separator:** Groups in an IPv6 address are separated by colons.

Given the length of IPv6 addresses, they are commonly abbreviated by removing leading zeros. For example, "0DB8" may be shortened to "DB8". In addition, consecutive groups of zeros can be replaced by a double colon (::).

![The image shows an example of an IPv6 address and its shortened version, demonstrating how IPv6 addresses can be abbreviated.](https://kodekloud.com/kk-media/image/upload/v1752881303/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-IPv4-and-IPv6-Networking-and-Hostname-Resolution-Theory/ipv6-address-abbreviation-example.jpg)

#### CIDR Notation in IPv6

IPv6 also employs CIDR notation. For example:

```
2001:0db8:0000:0000:0000:ff00:0042:8329/64
```

Here, "/64" indicates that the first 64 bits of the address are used as the network prefix. When the address is abbreviated, the CIDR suffix remains unchanged.

![The image illustrates IPv6 networking, highlighting the network prefix in an IPv6 address and mentioning CIDR notation support.](https://kodekloud.com/kk-media/image/upload/v1752881304/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-IPv4-and-IPv6-Networking-and-Hostname-Resolution-Theory/ipv6-networking-prefix-cidr.jpg)

## Tools for Network Configuration

When working with CIDR notations that are not multiples of 8 bits, it can be challenging to determine the exact network and host portions. In such cases, online CIDR calculators or subnet calculators are valuable tools for ensuring accurate network planning.

![The image shows a graphic of a computer and a server with text about configuring IPv4 and IPv6 networking and hostname resolution, including a mention of a CIDR calculator.](https://kodekloud.com/kk-media/image/upload/v1752881305/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-IPv4-and-IPv6-Networking-and-Hostname-Resolution-Theory/ipv4-ipv6-networking-configuration.jpg)

> [!important]
> **Warning**
>
> Incorrectly configuring CIDR notation can lead to network issues. Always double-check your settings using trusted subnet calculation tools.

## Summary

Understanding and properly configuring IP addresses is fundamental for network communication. Here is an overview of the key components:

| IP Version | Notation Example                      | Key Characteristics                                                |
| ---------- | ------------------------------------- | ------------------------------------------------------------------ |
| IPv4       | 192.168.1.101/24                      | 32-bit address, separated by dots, with each octet ranging 0–255   |
| IPv6       | 2001:0db8:0000:0000:ff00:0042:8329/64 | 128-bit address, organized in 8 hexadecimal groups and abbreviated |

For further reading on these topics, consider exploring the following resources:

- [IPv4 Addressing Explained](https://en.wikipedia.org/wiki/IPv4)
- [IPv6 Addressing](https://en.wikipedia.org/wiki/IPv6)
- [CIDR Notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)

By mastering these concepts, you'll be well-equipped to configure and troubleshoot network settings on Ubuntu and other platforms.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/2ba92913-296b-481d-af2d-6710bf3f7cdd/lesson/3332a1fc-a116-4970-aad5-b1f0bbeeec39)**
>
> Watch video content
