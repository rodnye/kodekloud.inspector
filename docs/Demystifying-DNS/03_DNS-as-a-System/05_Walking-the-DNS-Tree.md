# Walking the DNS Tree - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/DNS-as-a-System/Walking-the-DNS-Tree)

---

## Table of Contents

- Walking the DNS Tree
  - How DNS Resolution Works
  - DNS Tree Walk Examples
  - Using DIG to Walk the DNS Tree
  - Delegation of Authority and Glue Records
  - Tracking DNS Query Flow Using strace
  - Zone Synchronization and Final Thoughts
  - Watch Video
    - Example 1: engineer.kodekloud.com
    - Example 2: museum.co.uk
    - Example 3: staging.jcroyowaun.io

---

## Content

Demystifying DNS

DNS as a System

# Walking the DNS Tree

In this lesson, we dive into the fundamentals of DNS, exploring how domain names are translated into IP addresses. Grab a coffee and settle in as we revisit key concepts like walking the DNS tree, delegation of authority, the chicken-and-egg problem, and glue records. Each of these elements plays a crucial role in ensuring that the DNS resolution process works seamlessly.

Below is an overview of the topics covered:

![The image lists four topics related to DNS: "Walking the DNS Tree," "Delegation of Authority," "The Chicken-and-Egg Problem," and "Glue Records," with a colorful sidebar labeled "Topics."](https://kodekloud.com/kk-media/image/upload/v1752873194/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/dns-topics-walking-delegation-glue.jpg)

We start by explaining how a domain name is converted into an IP address, a process commonly known as "walking the DNS tree." Next, we discuss the delegation of control for subdomains to different name servers. We then address the intriguing dilemma of how a resolver can locate nameservers that are specified by domain names when DNS itself isn’t fully operational. The concept of glue records is introduced as the solution for resolving such circular dependencies.

![The image illustrates the DNS delegation of authority process, showing how a domain name query (kodekloud.com) is resolved through root, top-level domain (TLD), and authoritative name servers.](https://kodekloud.com/kk-media/image/upload/v1752873196/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/dns-delegation-authority-process.jpg)

![The image illustrates a DNS resolution process, showing the relationship between root zones, name servers, and domain zones, with a focus on a "chicken-and-egg" problem related to IP address resolution.](https://kodekloud.com/kk-media/image/upload/v1752873198/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/dns-resolution-process-chicken-egg.jpg)

![The image illustrates the concept of "Glue Records" with two server icons connected by a dotted line and a glue bottle in the center, symbolizing the resolution of circular dependencies in the DNS system.](https://kodekloud.com/kk-media/image/upload/v1752873198/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/glue-records-dns-dependencies-diagram.jpg)

---

## How DNS Resolution Works

DNS resolution is like a detective game with strict rules. Domain names consist of labels separated by dots, and the recursive resolver begins its journey by querying the root name servers. For example, in the domain “example.com,” the resolver starts at the root, then identifies “com” as a subdomain, and finally searches for “example.” If a queried name server does not manage the requested subdomain, it provides the server details for the next zone along the chain.

![The image shows a DNS Zone Visualizer interface illustrating the DNS hierarchy for "example.com," with a tree structure and nameserver details. It includes a search bar and a list of root servers.](https://kodekloud.com/kk-media/image/upload/v1752873199/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/dns-zone-visualizer-example-com.jpg)

The process continues by querying each label from right to left. When the current name server owns the queried subdomain, it returns the IP address directly. If not, the server ensures the resolution process moves to the correct zone by providing the nameservers responsible for the next segment. This methodical traversal through zone boundaries highlights the importance of both delegation and glue records.

![The image shows a DNS Zone Visualizer interface illustrating the DNS hierarchy for "example.com," with annotations explaining domain ownership, authority, delegation, and glue records.](https://kodekloud.com/kk-media/image/upload/v1752873201/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/dns-zone-visualizer-example-com-2.jpg)

---

## DNS Tree Walk Examples

### Example 1: engineer.kodekloud.com

Consider the resolution process for engineer.kodekloud.com. The journey begins at the root zone with a query for "com." Since the root servers do not have direct ownership of "com," they return the appropriate nameservers for that domain, nudging the process into a different zone.

![The image shows a DNS Zone Visualizer interface displaying the DNS hierarchy for the domain "engineer.kodekloud.com," along with a list of nameservers.](https://kodekloud.com/kk-media/image/upload/v1752873202/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/dns-zone-visualizer-engineer-kodekloud.jpg)

Within the "com" zone, the next query targets "KodeKloud." The nameservers then direct the resolver to the kodekloud.com zone. Finally, querying for "engineer" within this zone yields a direct IP address because the authoritative server for kodekloud.com manages that subdomain.

![The image shows a DNS Zone Visualizer interface displaying the DNS hierarchy for "engineer.kodekloud.com," including zone details and nameservers.](https://kodekloud.com/kk-media/image/upload/v1752873204/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/dns-zone-visualizer-engineer-kodekloud-2.jpg)

### Example 2: museum.co.uk

Let’s examine the resolution process for museum.co.uk. Starting at the root zone, the resolver queries for "uk." The root servers return nameservers for the "uk" domain, moving the query into a new zone.

![The image shows a DNS Zone Visualizer for the domain "museum.co.uk," illustrating its DNS zone hierarchy and delegation structure, along with a list of nameservers.](https://kodekloud.com/kk-media/image/upload/v1752873205/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/dns-zone-visualizer-museum-co-uk.jpg)

Within the "uk" zone, the query for "co" is answered by the same servers since co.uk is managed within that zone. However, when the resolver requests "museum," the current servers delegate the query to the nameservers dedicated to museum.co.uk. The final authoritative server then returns the IP address.

![The image shows a DNS Zone Visualizer for the domain "museum.co.uk," displaying its DNS hierarchy and delegation structure, along with zone details and nameservers. It includes a confirmation of domain ownership and an IP address.](https://kodekloud.com/kk-media/image/upload/v1752873206/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/dns-zone-visualizer-museum-co-uk-2.jpg)

### Example 3: staging.jcroyowaun.io

For the domain staging.jcroyowaun.io, the resolution begins at the root zone with a query for "io." As the root servers do not manage "io," they return the appropriate nameservers. Within the "io" zone, querying for "jcroyowaun" directs the resolver to the jcroyowaun.io zone. Finally, the query for "staging" is delegated to a separate set of nameservers, and the authoritative server for staging.jcroyowaun.io returns the IP address.

![The image shows a DNS Zone Visualizer interface displaying the DNS hierarchy for the domain "staging.jcroyoaun.io" with its nameservers listed. It includes a confirmation note stating ownership of the domain.](https://kodekloud.com/kk-media/image/upload/v1752873207/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/dns-zone-visualizer-staging-jcroyoaun.jpg)

---

## Using DIG to Walk the DNS Tree

Online tools like dnszones.dev help visualize DNS tree traversals, but the command-line tool DIG provides a deeper look into the process. The following command performs a complete DNS trace starting from the root:

```
$ dig +trace kodekloud.com
;; global options: +cmd
;; Received 811 bytes from 2806:10c:ffff:e::53 in 23 ms
kodekloud.com.      172800  IN  NS  a.gtld-servers.net.
kodekloud.com.      172800  IN  NS  b.gtld-servers.net.
kodekloud.com.      172800  IN  NS  c.gtld-servers.net.
kodekloud.com.      172800  IN  NS  d.gtld-servers.net.
kodekloud.com.      172800  IN  NS  e.gtld-servers.net.
kodekloud.com.      172800  IN  NS  f.gtld-servers.net.
kodekloud.com.      172800  IN  NS  g.gtld-servers.net.
kodekloud.com.      172800  IN  NS  h.gtld-servers.net.
kodekloud.com.      172800  IN  NS  i.gtld-servers.net.
kodekloud.com.      172800  IN  NS  j.gtld-servers.net.
kodekloud.com.      172800  IN  NS  k.gtld-servers.net.
kodekloud.com.      172800  IN  NS  l.gtld-servers.net.
kodekloud.com.      172800  IN  NS  m.gtld-servers.net.
;; Query time: 29 msec
;; SERVER: 10.255.255.254#53(10.255.255.254) (UDP)
;; WHEN: Thu Jan 16 23:33:22 CST 2025
;; MSG SIZE  rcvd: 176
```

For a reverse DNS lookup, you might use:

```
$ dig -x 2806:10c:ffff:e
;; global options: +cmd
;; Get answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 62731
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1
;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;je.o.0.0.0.0.0.0.0.0.0.0.f.f.f.f.0.c.0.1.6.0.8.2.ip6.arpa. IN PTR


;; ANSWER SECTION:
je.o.0.0.0.0.0.0.0.0.0.0.f.f.f.f.0.c.0.1.6.0.8.2.ip6.arpa. 29869 IN PTR 2806-10c-ffff-0000-0000-0000-000e.ipv6.infinitum.net.mx.
;; Query time: 29 msec
;; SERVER: 10.255.255.254#53(10.255.255.254) (UDP)
;; WHEN: Thu Jan 16 23:33:22 CST 2025
;; MSG SIZE  rcvd: 176
```

After the initial response from a root server, the TLD name server takes over. For instance, a TLD nameserver (e.g., jtld-servers.net) might provide Cloudflare's nameservers along with the IP addresses for kodekloud.com:

```
kodekloud.com. 172800 IN NS cheryl.ns.cloudflare.com.
kodekloud.com. 172800 IN NS wesley.ns.cloudflare.com.
...
kodekloud.com. 300 IN A 104.26.10.250
kodekloud.com. 300 IN A 124.26.11.250
kodekloud.com. 300 IN A 172.67.68.105
```

Cheryl's Cloudflare nameserver then returns the final IP addresses, with each response clearly indicating the server responsible. You may notice that running the DIG +trace command multiple times yields responses from different nameservers. This is a result of DNS load balancing and redundancy.

```
$ dig +trace kodekLOUD.com
$ dig +trace kodekLOUD.com
$ dig +trace kodekLOUD.com
```

---

## Delegation of Authority and Glue Records

DNS zones are used to define ownership. When a subdomain has its own NS records separate from its parent, this indicates a delegation of authority—a formal transfer of control for that subdomain. The parent zone retains a copy of the subdomain's NS records to maintain consistency.

![The image illustrates a DNS tree structure, showing the delegation of authority from the root to a subdomain, with different nameservers listed for each level.](https://kodekloud.com/kk-media/image/upload/v1752873208/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/dns-tree-structure-delegation.jpg)

A common challenge arises when the NS records are domain names themselves. Without a proper mechanism, resolving their IP addresses could create a circular dependency—the infamous chicken-and-egg problem. DNS addresses this by:

1.  Using pre-configured root hints in every recursive resolver. These hints contain IP addresses for all the root name servers, ensuring that the initial query can always be reached.
2.  Including glue records in the parent zone for delegated subdomains. Glue records are A (IPv4) or AAAA (IPv6) records that provide the IP addresses for the delegated name servers, thereby breaking the circular dependency.

For example, the NS and glue records for kodekloud.com in the com zone might appear as follows:

```
; NS records for the delegation
kodekloud.com.   172800  IN  NS  cheryl1.ns.cloudflare.com.
kodekloud.com.   172800  IN  NS  wesley.ns.cloudflare.com.


; Glue records
cheryl1.ns.cloudflare.com.  172800  IN  A     108.162.192.83
                           172800  IN  AAAA  2606:4700:50::adf5:3a53
wesley.ns.cloudflare.com.   172800  IN  A     108.162.193.246
                           172800  IN  AAAA  2606:4700:58::adf5:3bf6
```

> [!important]
> **Note**
>
> To verify glue records using DIG, you can execute the following command, which directly queries an authoritative nameserver with the +additional flag:

```
$ dig @a.gtld-servers.net. kodekloud.com +additional
;; DiG 9.10.6 ;;
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 14538
;; flags: qr rd; QUERY: 1, ANSWER: 0, AUTHORITY: 2, ADDITIONAL: 13


;; QUESTION SECTION:
;kodekloud.com.         IN  A


;; AUTHORITY SECTION:
kodekloud.com.        172800  IN  NS  cheryl.ns.cloudflare.com.
kodekloud.com.        172800  IN  NS  wesley.ns.cloudflare.com.


;; ADDITIONAL SECTION:
cheryl.ns.cloudflare.com. 172800 IN A 108.162.192.83
cheryl.ns.cloudflare.com. 172800 IN A 172.64.32.83
cheryl.ns.cloudflare.com. 173845 IN A 173.245.58.85
cheryl.ns.cloudflare.com. 172800 IN AAAA 2606:4700:50::adf5:3a53
cheryl.ns.cloudflare.com. 172800 IN AAAA 2606:4700:50::c40:2053
wesley.ns.cloudflare.com. 172800 IN A 108.162.194.83
wesley.ns.cloudflare.com. 172800 IN A 172.64.33.246
wesley.ns.cloudflare.com. 172800 IN A 173.245.58.85
wesley.ns.cloudflare.com. 172800 IN AAAA 2606:4700:50::adf5:3bf6
wesley.ns.cloudflare.com. 172800 IN AAAA 2606:4700:50::c2a:21f6
```

When querying an authoritative server directly, you might see a warning indicating that recursion is disabled:

```
$ dig @a.gtld-servers.net. kodekloud.com +additional
;; <<>> DiG 9.10.6 <<>> @a.gtld-servers.net. kodekloud.com +additional
;; global options: +cmd
Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 14538
;; flags: qr rd; QUERY: 1, ANSWER: 0, AUTHORITY: 2, ADDITIONAL: 13
;; WARNING: recursion requested but not available


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;kodekloud.com.           IN  A


;; AUTHORITY SECTION:
kodekloud.com.           172800  IN  NS  cheryl.ns.cloudflare.com.
kodekloud.com.           172800  IN  NS  wesley.ns.cloudflare.com.


;; ADDITIONAL SECTION:
cheryl.ns.cloudflare.com. 172800  IN  A    108.162.220.53
cheryl.ns.cloudflare.com. 172800  IN  A    172.64.33.20
cheryl.ns.cloudflare.com. 172800  IN  AAAA 2606:4700:3035::ac43:c053
cheryl.ns.cloudflare.com. 172800  IN  AAAA 2606:4700:3037::681c:95f5
wesley.ns.cloudflare.com.  172800  IN  A    104.22.6.205
wesley.ns.cloudflare.com.  172800  IN  A    172.64.33.20
wesley.ns.cloudflare.com.  172800  IN  AAAA 2606:4700:30::681c:6b40
wesley.ns.cloudflare.com.  172800  IN  AAAA 2606:4700:3037::ac43:c6c2
```

This combination of delegation, glue records, and caching ensures that the DNS system functions efficiently without needing to perform an entire tree walk for every query.

---

## Tracking DNS Query Flow Using strace

Advanced users can leverage tools like strace to inspect the low-level system calls made during DNS resolution. The following command provides insight into each step of the process:

```
$ strace -f -e trace=network dig +trace +additional @jcroyoan.io NS
```

The output might include:

1.  **Connecting to a root or io nameserver:**

    ```
    connect(18, {sa_family=AF_INET, sin_port=htons(53),
    sin_addr=inet_addr("199.7.91.13")}, 16) = 0
    recvmsg(18, {msg_name={sa_family=AF_INET, sin_port=htons(53),
    sin_addr=inet_addr("199.7.91.13")}, ... )
    ```

2.  **Connecting to c0.nic.io:**

    ```
    connect(18, {sa_family=AF_INET, sin_port=htons(53),
    sin_addr=inet_addr("65.22.162.17")}, 16) = 0
    recvmsg(18, {msg_name={sa_family=AF_INET, sin_port=htons(53),
    sin_addr=inet_addr("65.22.162.17")}, ... )
    ```

3.  **Interacting with AWS nameserver IPs:**

    ```
    sendto(19, "[\37\1\0\1\0\0\0\0\6ns-107.tawsdns3.com\38", MSG_NOSIGNAL,
    {sin_addr=inet_addr("8.8.8.8")}, ... )
    recvmsg(19, {msg_name={sa_family=AF_INET, sin_port=htons(53),
    sin_addr=inet_addr("8.8.8.8")}, ... )
    ```

This demonstrates that although the DNS tree walk consistently begins at the root, cached answers and direct queries to recursive resolvers (such as 8.8.8.8) can enhance performance.

For even more detailed tracking, try:

```
$ strace -f -e trace=network dig +trace +additional +all jcroyoaun.io NS
```

This command provides an in-depth view of all `connect`, `sendto`, and `recvmsg` calls made as the query traverses different parts of the DNS hierarchy.

---

## Zone Synchronization and Final Thoughts

DNS ensures consistency across its distributed system through robust replication mechanisms. Zone transfers keep nameservers synchronized, enabling all copies of DNS records to remain up-to-date.

![The image illustrates a "Zone Transfer" process, showing a central server connected to multiple DNS servers, emphasizing that nameservers must maintain exact copies of DNS records.](https://kodekloud.com/kk-media/image/upload/v1752873209/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/zone-transfer-dns-servers-diagram.jpg)

The glue records—both A and AAAA types—provide the reliable IP addresses that are essential for maintaining the integrity of the DNS resolution process. By breaking circular dependencies, they support a distributed system where independent management of zones is possible while ensuring global consistency.

![The image illustrates the process of resolving an IP address from a domain name, showing "kodekloud.com" being resolved to the IP address "195.254.26.48".](https://kodekloud.com/kk-media/image/upload/v1752873210/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/ip-address-resolution-kodekloud.jpg)

![The image illustrates the "Delegation of Authority" in DNS, showing a parent zone's nameserver delegating authority to a child zone's nameserver, along with the child zone's NS records.](https://kodekloud.com/kk-media/image/upload/v1752873211/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/delegation-of-authority-dns-diagram.jpg)

![The image illustrates a DNS distributed system, highlighting concepts like delegation of authority and glue records, with a note on independent zone management by organizations.](https://kodekloud.com/kk-media/image/upload/v1752873212/notes-assets/images/Demystifying-DNS-Walking-the-DNS-Tree/dns-distributed-system-delegation-glue.jpg)

In summary, understanding the process of walking the DNS tree, the delegation of authority, and the use of glue records offers valuable insight into the resilient, scalable, and distributed nature of the DNS system.

Happy exploring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/2471fe18-5c6b-44e1-b0a5-0a1c6a3ac282/lesson/f38dccb9-375d-49af-94c8-51ecfcd0e5f5)**
>
> Watch video content
