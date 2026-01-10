# Demo Domains and Zones - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Welcome-to-the-World-of-DNS/Demo-Domains-and-Zones)

---

## Table of Contents

- Demo Domains and Zones
  - Route 53 Example: Domain Delegation
  - Delegating a Subdomain
  - Watch Video
  - Practice Lab

---

## Content

Demystifying DNS

Welcome to the World of DNS

# Demo Domains and Zones

Before progressing further, it's essential to understand how to determine if two or more domains belong to the same DNS zone or exist in separate zones. Previously, we compared domains to pieces of land—registering a new domain like "KodeKloud.com" is similar to acquiring a plot of land within a larger territory (in this case, ".com"). Your domain always includes the parent territory's name, which is why we refer to it in its full form, such as kodekloud.com.

Once you own a domain, you can develop various services within that space. Think of it like purchasing a piece of land and then dividing it into different buildings (offices, classrooms, apartments, etc.). In this analogy, buying the land (i.e., acquiring the domain under the .com zone) is akin to creating a new zone—a space where you have full authority over what is built inside.

> [!important]
> **Note**
>
> Zones represent the authority or ownership an organization, company, or individual has over a domain name.

![The image illustrates the hierarchy of domain zones, showing the root zone, top-level domain (TLD), and second-level domain, with zones representing authority or ownership over domain names.](https://kodekloud.com/kk-media/image/upload/v1752873261/notes-assets/images/Demystifying-DNS-Demo-Domains-and-Zones/domain-zones-hierarchy-diagram.jpg)

For example, when encountering a domain name like mail.google.com, one might assume that each label corresponds to a distinct zone. Under that assumption, the domain involves the Root Zone, the com zone, and the google zone—with the mail label being part of the google.com zone. In this case, the reasoning holds true; however, this methodology depends on knowing that google.com is a primary domain. This assumption might not hold for less familiar structures.

![The image illustrates the hierarchical structure of domain names, showing the relationship between the root zone, top-level domain (TLD), second-level domain, and a subdomain (mail.google.com). It highlights the path from the root zone to the subdomain with an emphasis on the second-level domain.](https://kodekloud.com/kk-media/image/upload/v1752873262/notes-assets/images/Demystifying-DNS-Demo-Domains-and-Zones/domain-name-hierarchy-illustration.jpg)

The situation becomes more complex with country code top-level domains (ccTLDs). For instance, in Hong Kong, the HK ccTLD can have public suffixes such as com.hk or edu.hk.

![The image illustrates a domain name system (DNS) structure, showing the relationship between the root zone and top-level domains (TLDs) like "com.hk" and "edu.hk" under the ".hk" domain.](https://kodekloud.com/kk-media/image/upload/v1752873263/notes-assets/images/Demystifying-DNS-Demo-Domains-and-Zones/dns-structure-root-tlds-hk.jpg)

Consider the domain "yahoo.com.hk". At first glance, you might think its zone structure is built by reading from right to left: Root Zone → HK zone → com.hk zone → yahoo.com.hk zone. However, this interpretation is incorrect because "com.hk" forms a single zone.

To clarify the terminology, the parts of a domain are described as top-level domain, second-level domain, third- and fourth-level domains, and subdomains. Understanding these terms from an absolute perspective (counting from right to left, starting at the Root Zone) and a relative perspective (based on the domain level being referenced) makes the concept of zones easier to grasp.

When viewed absolutely, moving from right to left in a domain name reveals the Top-Level Domain, the second-level domain, the third-level domain, and so on. From a relative perspective, starting with "example.com", then "test.example.com" is considered a subdomain of "example.com". In this view, the registered domain (often called the domain apex or naked domain) marks the start of a zone.

![The image illustrates a hierarchical structure of domain names, showing the relationship from the root zone to subdomains, with a focus on the concept of a "Domain apex" or "Naked domain."](https://kodekloud.com/kk-media/image/upload/v1752873264/notes-assets/images/Demystifying-DNS-Demo-Domains-and-Zones/domain-hierarchy-root-subdomains.jpg)

Imagine the domain apex as the main domain from which everything else within the zone branches off. For "yahoo.com.hk", many might mistakenly assume a hierarchy starting with the Root Zone, then the HK zone, followed by a com zone, and finally the domain apex "yahoo.com.hk". The correct interpretation treats "com.hk" as a single, global top-level domain with "yahoo.com.hk" as the domain apex.

![The image compares incorrect and correct domain name resolution paths for "yahoo.com.hk," illustrating the hierarchical structure of domain components.](https://kodekloud.com/kk-media/image/upload/v1752873266/notes-assets/images/Demystifying-DNS-Demo-Domains-and-Zones/domain-name-resolution-yahoo-com-hk.jpg)

This difference demonstrates why simply counting labels from right to left is not enough to determine the zone structure. You can verify this concept by using the dig command with the +trace option against a domain like "yahoo.com.hk":

```
$ dig +trace yahoo.com.hk
```

Running dig with +trace simulates the DNS resolution process. The output begins with queries to the Root Zone name servers, followed by the Top-Level Domain name servers. For example, after querying the Root Zone, you might see an entry like:

```
;; Received 525 bytes from 1.1.1.1#53(1.1.1.1) in 33 ms
hk.              172800   IN      NS      c.hkirc.net.hk.
hk.              172800   IN      NS      d.hkirc.net.hk.
...
```

Later, the query returns the NS records for the "yahoo.com.hk" zone:

```
yahoo.com.hk.      28800   IN      NS      ns1.yahoo.com.
yahoo.com.hk.      28800   IN      NS      ns5.yahoo.com.
```

Further along, records for the "yahoo.com.hk" zone along with its A records (provided by ns1.yahoo.com) are displayed. This confirms that "com.hk" is essentially a subdomain of the HK top-level domain.

The use of dig +trace simulates DNS resolution, and further exploration of the DNS infrastructure will follow later in this article.

## Route 53 Example: Domain Delegation

Next, we'll explore a real-world example using Route 53. In this demonstration, I registered a subdomain and hosted it in a separate zone to show how delegation is represented in both the cloud console and the dig output.

I manage a primary AWS account hosting my domain "jcroyolaun.io". In Route 53, a hosted zone for "jcroyolaun.io" appears with NS records at the apex and a Start of Authority (SOA) record indicating the zone's beginning. I also created a subdomain, which shows different name servers, indicating separate management. In another AWS account, I host the zone for the subdomain, complete with its own name servers and SOA record.

![The image shows an AWS Route 53 dashboard displaying DNS records for the domain "staging.jcroyoaun.io," including NS, SOA, and CNAME records.](https://kodekloud.com/kk-media/image/upload/v1752873267/notes-assets/images/Demystifying-DNS-Demo-Domains-and-Zones/aws-route53-dns-records-dashboard.jpg)

Back in the terminal, if you run:

```
$ dig +trace jcroyolaun.io
```

The output will reveal a hierarchy similar to the following:

1.  The Root Zone
2.  The .io Top-Level Domain zone (with NS records provided by the NIC)
3.  The "jcroyolaun.io" zone managed by AWS with its own NS records

A snippet of the output might look like:

```
;; Received 525 bytes from 1.1.1.1#53(1.1.1.1) in 37 ms
io.                  172800    IN      NS      a0.nic.io.
io.                  172800    IN      NS      a1.nic.io.
io.                  172800    IN      NS      b0.nic.io.
io.                  172800    IN      NS      c0.nic.io.
io.                  86400     IN      DS      57355 8 2 95A57C3BAB7849DBCDDF7C72ADA71A88146B14111
...
jcroyolan.io.       3600     IN      NS      ns-427.awsdns-53.com.
jcroyolan.io.       3600     IN      NS      ns-1067.awsdns-05.org.
jcroyolan.io.       3600     IN      NS      ns-780.awsdns-33.net.
jcroyolan.io.       3600     IN      NS      ns-1719.awsdns-22.co.uk.
```

These records confirm that AWS manages the domain's authoritative name servers. When an update is made, the primary nameserver receives it, and the change is propagated to the rest of the nameservers shortly after.

To demonstrate how the delegation works for the staging subdomain, consider the following dig trace for that zone:

```
;; Received 674 bytes from 65.22.162.17#53(c0.nic.io) in 54 ms
staging.jcroyolan.io. 1800 IN NS ns-1046.awsdns-02.org.
staging.jcroyolan.io. 1800 IN NS ns-107.awsdns-13.com.
staging.jcroyolan.io. 1800 IN NS ns-1884.awsdns-43.co.uk.
staging.jcroyolan.io. 1800 IN NS ns-776.awsdns-33.net.
;; Received 189 bytes from 205.251.195.12#53(ns-780.awsdns-33.net) in 66 ms
staging.jcroyolan.io. 900 IN SOA ns-107.awsdns-13.com. awsdns-hostmaster.amazon.com. 7200 900 1209600 86400
```

This output confirms distinct steps in the DNS resolution process:

1.  From the Root Zone to the .io Top-Level Domain
2.  From the .io Top-Level Domain to the "jcroyolaun.io" zone
3.  Finally, from the "jcroyolaun.io" zone to the "staging.jcroyolan.io" zone

A repeated dig output (displayed partially) further clarifies the relationships:

```
;; Received 525 bytes from 1.1.1.1#53(1.1.1.1) in 36 ms
io.            172800  IN      NS      a0.nic.io.
io.            172800  IN      NS      a1.nic.io.
io.            172800  IN      NS      b0.nic.io.
io.            172800  IN      NS      c0.nic.io.
...
jcroyolaun.io. 3600    IN      NS      ns-1067.awsdns-05.org.
jcroyolaun.io. 3600    IN      NS      ns-780.awsdns-33.net.
jcroyolaun.io. 3600    IN      NS      ns-1719.awsdns-22.co.uk.
jcroyolaun.io. 3600    IN      NS      ns-427.awsdns-53.com.
...
```

For further visualization, you can use the online tool [dnszones.dev](https://dnszones.dev). By entering "yahoo.com.hk", the tool displays the DNS hierarchy including:

- The Root Zone
- The HK zone
- The delegation where "com.hk" is treated as a single unit under the HK top-level domain
- Finally, the "yahoo.com.hk" zone

![The image shows a DNS Zone Visualizer interface displaying the DNS hierarchy for "yahoo.com.hk," with zone details and nameservers listed on the right.](https://kodekloud.com/kk-media/image/upload/v1752873268/notes-assets/images/Demystifying-DNS-Demo-Domains-and-Zones/dns-zone-visualizer-yahoo-hk.jpg)

Similarly, entering "jcroyolaun.io" displays the progression from the Root Zone to the .io Top-Level Domain zone and finally to the AWS-managed "jcroyolaun.io" zone. Viewing the staging subdomain shows its distinct zone following the delegation.

![The image shows a DNS Zone Visualizer interface displaying the DNS hierarchy for the domain "staging.jcroyoaun.io" with zone details and nameservers listed on the right.](https://kodekloud.com/kk-media/image/upload/v1752873269/notes-assets/images/Demystifying-DNS-Demo-Domains-and-Zones/dns-zone-visualizer-staging-jcroyoaun.jpg)

## Delegating a Subdomain

This setup is comparable to a scenario where, for example, KodeKloud.com decides to migrate its engineering service to another company. Although they would retain the parent domain name, the "engineer.kodekcloud.com" subdomain would be delegated to a different zone. Initially an A record within the parent's zone, delegation requires creating a new zone for the subdomain, copying the NS records from that zone, and then updating the parent zone accordingly. This delegation is confirmed with a dig query:

```
$ dig engineer.kodekcloud.com
```

A typical output might look like:

```
;; DiG 9.10.6 <<>> engineer.kodekcloud.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 1518
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;engineer.kodekcloud.com.       IN      A


;; ANSWER SECTION:
engineer.kodekcloud.com. 300 IN A 104.26.10.250
engineer.kodekcloud.com. 300 IN A 104.26.11.250


;; Query time: 39 msec
;; SERVER: 1.1.1.1#53(1.1.1.1)
;; WHEN: Sun Nov 17 23:05:13 CST 2024
;; MSG SIZE  rcvd: 99
```

This delegation of authority—indicated by matching NS records in both the parent and subdomain zones—is crucial for efficient DNS management.

This concludes our explanation of domain hierarchies and zone delegation. Although these concepts can be intricate, mastering them is key to effective DNS management. More details on DNS infrastructure and resolution processes will be covered later in this article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/a983cc32-7f91-4feb-8946-eeb1cea67970/lesson/677f1897-59cf-46e8-930d-2f4c2e1552ad)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/demystifying-dns/module/a983cc32-7f91-4feb-8946-eeb1cea67970/lesson/85d0a73a-b8a5-41dd-8bc7-14bad8838e19)**
>
> Practice lab
