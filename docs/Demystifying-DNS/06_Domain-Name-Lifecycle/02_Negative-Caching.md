# Negative Caching - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Domain-Name-Lifecycle/Negative-Caching)

---

## Table of Contents

- Negative Caching
  - Watch Video

---

## Content

Demystifying DNS

Domain Name Lifecycle

# Negative Caching

Negative caching is a critical mechanism in the Domain Name System (DNS) that prevents resolvers from repeatedly querying the central registry for domains that do not exist. In this article, we'll explore negative caching using a familiar scenario. Imagine our friend—the registrant—who is frustrated with being limited to platforms like WordPress.com or Medium.com and finally decides to register his own domain. Negative caching plays an essential role in such scenarios, especially when checking the availability of a domain like bestcode.io.

When a DNS resolver encounters a request for an unregistered domain, it must quickly determine that the domain does not exist. This behavior is typically demonstrated using the dig command. Consider the following example output:

```
$ dig thebestcode.io
; <<>> DiG 9.10.6 <<>> thebestcode.io
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 4618
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;thebestcode.io.             IN      A


;; AUTHORITY SECTION:
io.                     3600    IN      SOA     a0.nic.io.
hostmaster.donuts.email. 1731888351 7200 900 1209600 3600


;; Query time: 69 msec
;; SERVER: 1.1.1.1#53(1.1.1.1)
;; WHEN: Sun Nov 17 18:15:50 CST 2024
;; MSG SIZE  rcvd: 109
```

In the output above, the resolver receives an NXDOMAIN status because the domain does not exist. Notice the SOA (Start of Authority) record in the authority section from the parent zone (.io). The final number, 3600 seconds, acts as a suggestion from the zone operator indicating the duration for which resolvers should cache the negative response.

> [!important]
> **Note**
>
> While resolvers are suggested to cache the NXDOMAIN response for 3600 seconds, they are not obligated to follow this exact duration. Some resolvers may honor the full duration, while others may cache the information for a shorter period or adjust based on their own policies.

This caching mechanism becomes particularly significant when a domain is eventually registered. Even if the top-level domain operator updates its records, some resolvers may still hold onto the negative caching information. Consequently, a newly registered domain might be accessible immediately for some users, while others could receive errors indicating that the domain does not exist due to outdated cache entries.

A similar scenario occurs when a domain expires. During the redemption period, resolvers begin caching the NXDOMAIN response once again. For instance, when querying an expired domain, you might observe an output like the following:

```
$ dig sample-expired-domain.com
; <<>> DiG 9.10.6 <<>> sample-expired-domain.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 33962
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;sample-expired-domain.com.     IN      A


;; AUTHORITY SECTION:
com.            900     IN      SOA     a.gtld-servers.net. nsTLD.verisign-grs.com. 1731889117 1800 900 604800 900


;; Query time: 87 msec
;; SERVER: 1.1.1.1#53(1.1.1.1)
;; WHEN: Sun Nov 17 18:18:56 CST 2024
;; MSG SIZE  rcvd: 127
```

In this dig output, the SOA record from the .com zone indicates a negative caching time of 900 seconds (15 minutes). This shorter duration is intentional since expired domains might be quickly reinstated during the grace period, and resolvers should not continue to cache stale NXDOMAIN information for too long.

> [!important]
> **Key Takeaway**
>
> Negative caching plays an important role in reducing unnecessary DNS queries and helps defend against potential DNS overload attacks by preventing resolvers from repeatedly querying for non-existent domains.

To summarize, negative caching enhances DNS performance by ensuring that resolvers cache non-existent domain responses, alleviating the load on central registries and improving overall network efficiency.

![The image explains the benefits of negative caching, highlighting its role in avoiding overwhelming registries and preventing DNS overload attacks.](https://kodekloud.com/kk-media/image/upload/v1752873236/notes-assets/images/Demystifying-DNS-Negative-Caching/negative-caching-benefits-diagram.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/fada8728-c242-452d-a6e1-7dc8aa2511f3/lesson/985844d5-a108-4b62-84fe-532168488366)**
>
> Watch video content
