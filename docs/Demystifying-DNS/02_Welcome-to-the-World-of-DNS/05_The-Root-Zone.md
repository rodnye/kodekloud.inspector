# The Root Zone - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Welcome-to-the-World-of-DNS/The-Root-Zone)

---

## Table of Contents

- The Root Zone
  - What is the Root Zone and Why Does It Matter?
  - The Hierarchical Nature of DNS
  - Summary
  - Watch Video

---

## Content

Demystifying DNS

Welcome to the World of DNS

# The Root Zone

In this article, we explore the Domain Name System (DNS) using an inverted tree diagram that begins at the Root Zone. Represented by a dot, the Root Zone is a fundamental component of DNS: every domain name ends with a dot—even if it isn’t visibly noted.

You can test this behavior yourself. For example, type a domain name with a dot at the end (e.g., "youtube.com." or "wikipedia.org.") into your browser to see that it resolves successfully. This confirms that the trailing dot, which denotes the Root Zone, is implicitly part of all domain names.

You can also verify this with the dig command. Whether you include the trailing dot or not, you will get the same result. For instance:

```
$ dig youtube.com
;; <<>> DiG 9.10.6 <<>> youtube.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 32667
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;youtube.com.           IN      A


;; ANSWER SECTION:
youtube.com.          287     IN      A       192.178.52.174


;; Query time: 29 msec
;; SERVER: 10.255.255.254#53(10.255.255.254) (UDP)
;; WHEN: Sun Nov 10 17:53:35 CST 2024
;; MSG SIZE  rcvd: 56
```

```
$ dig wikipedia.org
;; <<>> DiG 9.10.6 <<>> wikipedia.org
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 50788
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;wikipedia.org.        IN      A


;; ANSWER SECTION:
wikipedia.org.       217     IN      A       208.80.153.224


;; Query time: 29 msec
;; SERVER: 10.255.255.254#53(10.255.255.254) (UDP)
;; WHEN: Sun Nov 10 17:58:41 CST 2024
;; MSG SIZE  rcvd: 58
```

```
$ dig youtube.com
;; <<>> DiG 9.10.6 <<>> youtube.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 61224
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;youtube.com.           IN      A


;; ANSWER SECTION:
youtube.com.          285     IN      A       192.178.52.174


;; Query time: 29 msec
;; SERVER: 10.255.255.254#53(10.255.255.254) (UDP)
;; WHEN: Sun Nov 10 17:53:37 CST 2024
;; MSG SIZE  rcvd: 56
```

You can even query the Root Zone directly by executing:

```
$ dig .
;; <<>> DiG 9.10.6 <<>> .
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 56728
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;.                             IN      A


;; Query time: 1050 msec
;; SERVER: 10.255.255.254#53(10.255.255.254) (UDP)
;; WHEN: Sun Nov 10 18:04:28 CST 2024
;; MSG SIZE  rcvd: 28
```

> [!important]
> **Understanding the Root Zone**
>
> The Root Zone is the starting point for all DNS queries. Knowing its role is essential when troubleshooting and understanding DNS resolution.

## What is the Root Zone and Why Does It Matter?

Domain names are read from right to left, where the rightmost segment represents the most general level (the TLD) and the leftmost segment represents the most specific level. DNS queries follow this same logic. When a lookup is performed, the DNS resolver begins at the Root Zone, then moves to the Top-Level Domain (TLD), and finally reaches the specific subdomain or host.

Consider this analogy: if "KodeKloud.com" represents a property within the larger territory of ".com," then "linuxfoundation.org" is a property within ".org." Here, the Root Zone functions like Earth—every domain, regardless of its specificity, is ultimately a subdivision of the Root Zone.

![The image illustrates a conceptual diagram comparing the structure of a domain name system (DNS) to pieces of land on Earth, with labels indicating "Root zone" and "kodekloud.com" from most specific to most general.](https://kodekloud.com/kk-media/image/upload/v1752873283/notes-assets/images/Demystifying-DNS-The-Root-Zone/dns-structure-comparison-diagram.jpg)

For example, when you look up "facebook.com," the query starts at the Root Zone, proceeds to the TLD "com," and then reaches the specific subdomain "facebook." Technically, the Root Zone maintains a list of all TLDs. As discussed in prior lessons, DNS zones delegate authority and responsibility for groups of domain names to specific organizations. VeriSign, for example, manages the ".com" TLD. Meanwhile, the Root Zone itself is managed by IANA (the Internet Assigned Numbers Authority) under the auspices of ICANN (the Internet Corporation for Assigned Names and Numbers). Think of ICANN as the global regulatory body ensuring smooth operation of the internet's naming infrastructure.

IANA’s duty is to maintain accurate and secure data about every top-level domain. This crucial central role is similar to managing a global address book.

![The image is a diagram explaining the management and operation of the internet's root zone, highlighting the roles of the Internet Assigned Numbers Authority (IANA) and the Internet Corporation for Assigned Names and Numbers (ICANN).](https://kodekloud.com/kk-media/image/upload/v1752873284/notes-assets/images/Demystifying-DNS-The-Root-Zone/internet-root-zone-management-diagram.jpg)

## The Hierarchical Nature of DNS

Consider DNS as a tree-like structure. Each zone is managed by servers known as name servers, which act like databases storing key-value pairs (for example, "a.gtld-servers.net" mapping to "192.5.6.30"). These data sets are replicated across a network of Root Zone name servers to ensure consistency and reliability.

Imagine the name servers as information offices for various pieces of land. When you ask a Root Name Server about "facebook.com," it doesn't contain detailed information about "facebook.com" itself. Instead, it directs you to the name servers responsible for the ".com" zone.

![The image illustrates the hierarchical structure of domain names, showing the root zone, top-level domains (TLD), and second-level domains, along with nameservers that contain information about domain names in their respective zones.](https://kodekloud.com/kk-media/image/upload/v1752873288/notes-assets/images/Demystifying-DNS-The-Root-Zone/domain-name-hierarchy-structure.jpg)

The Root Name Servers maintain key-value pairs that resolve top-level domains by providing the IP addresses of the name servers responsible for the next level in the resolution chain. An IP address is critical for locating the exact server.

To view the name servers for the Root Zone, run the following command, which requests the NS (Name Server) records for the Root Zone:

```
$ dig . NS
;; <<>> DiG 9.10.6 <<>> . NS
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 61326
;; flags: qr rd ra; QUERY: 1, ANSWER: 13, AUTHORITY: 0, ADDITIONAL: 27


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags: udp: 512
;; QUESTION SECTION:
;.                          IN      NS


;; ANSWER SECTION:
.                        42223   IN      NS      d.root-servers.net.
.                        42223   IN      NS      l.root-servers.net.
.                        42223   IN      NS      f.root-servers.net.
.                        42223   IN      NS      j.root-servers.net.
.                        42223   IN      NS      g.root-servers.net.
.                        42223   IN      NS      i.root-servers.net.
.                        42223   IN      NS      h.root-servers.net.
.                        42223   IN      NS      b.root-servers.net.
.                        42223   IN      NS      a.root-servers.net.
.                        42223   IN      NS      e.root-servers.net.
.                        42223   IN      NS      k.root-servers.net.
.                        42223   IN      NS      m.root-servers.net.


;; ADDITIONAL SECTION:
d.root-servers.net.     11024   IN      A       192.58.128.30
l.root-servers.net.     11622   IN      AAAA    2001:500:3f::c30
k.root-servers.net.     16516   IN      A       199.7.83.42
f.root-servers.net.     19132   IN      A       192.5.5.241
j.root-servers.net.     10833   IN      AAAA    2001:503:ba3e::2:30
g.root-servers.net.     16631   IN      AAAA    2001:4860:4802:34::1:10
a.root-servers.net.     19820   IN      A       198.41.0.4
b.root-servers.net.     12328   IN      AAAA    2001:500:200::b
e.root-servers.net.     12283   IN      A       192.203.230.10
h.root-servers.net.     13693   IN      A       198.97.190.53
i.root-servers.net.     24684   IN      AAAA    2001:500:1::803f:bc14
m.root-servers.net.     20359   IN      AAAA    2001:730:100:1::ba1
c.root-servers.net.     16385   IN      AAAA    2001:500:0::c
f.root-servers.net.     18589   IN      A       192.5.5.241
h.root-servers.net.     13899   IN      A       192.54.112.100
j.root-servers.net.     20704   IN      AAAA    2001:503:c27::2:30
k.root-servers.net.     14600   IN      AAAA    2001:7fd::1
a.root-servers.net.     19820   IN      AAAA    2001:0:9b0:f8dc:0:0:0:9
m.root-servers.net.     20934   IN      AAAA    2001:730:100:1::ba1d


;; Query time: 104 ms
;; SERVER: 10.255.255.463#53(10.255.255.250) (UDP)
;; WHEN: Sun Nov 10 21:14:25 CST 2024
;; MSG SIZE  rcvd: 811
```

The response confirms that there are 13 Root Name Servers, labeled alphabetically from A through M. This specific count is due to historical constraints—the maximum number of servers that could fit within a 512-byte UDP packet. (More details on this subject will be covered in a later section.)

DNS resolution involves querying a zone by consulting the name servers of its parent zone. This is why every DNS query begins at the Root Zone: you must always start at the top of the hierarchy and work your way down. The Root Name Servers do not have granular details about domains like "facebook.com." Instead, they simply provide the IP addresses of the servers responsible for the corresponding TLD—such as ".com."

![The image illustrates the DNS resolution process for the domain "facebook.com," showing the hierarchy from the root zone to the top-level domain (TLD) and second-level domain. It includes visual representations of server zones and the flow of information.](https://kodekloud.com/kk-media/image/upload/v1752873289/notes-assets/images/Demystifying-DNS-The-Root-Zone/dns-resolution-facebook-com-diagram.jpg)

## Summary

The Root Zone is a critical element in the DNS infrastructure. It serves as the starting point for all DNS queries and ensures that every domain can be resolved by directing queries to the appropriate TLD. In subsequent sections of this course, we will delve deeper into the operation and maintenance of name servers, as well as the broader DNS infrastructure that supports global Internet connectivity.

![The image illustrates the hierarchical structure of domain name resolution, showing the root zone directing requests to top-level domains (TLDs) and second-level domains. It includes labeled zones for root, TLD, and second-level domains with server icons.](https://kodekloud.com/kk-media/image/upload/v1752873290/notes-assets/images/Demystifying-DNS-The-Root-Zone/domain-name-resolution-hierarchy-diagram.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/a983cc32-7f91-4feb-8946-eeb1cea67970/lesson/8c4ff9ab-019e-41bc-86cd-237a0ec087a8)**
>
> Watch video content
