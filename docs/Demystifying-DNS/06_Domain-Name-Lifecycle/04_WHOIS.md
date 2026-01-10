# WHOIS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Domain-Name-Lifecycle/WHOIS)

---

## Table of Contents

- WHOIS
  - Understanding the Basics
  - Example of a WHOIS Query
  - Introducing RDAP
  - WHOIS vs. RDAP: A Quick Comparison
  - Conclusion
  - Watch Video

---

## Content

Demystifying DNS

Domain Name Lifecycle

# WHOIS

In this article, we explore the WHOIS protocol, its role in domain management, and how it complements DNS by providing registration details that DNS does not. We also discuss RDAP (Registration Data Access Protocol), the modern alternative to WHOIS for automated domain management.

## Understanding the Basics

DNS translates domain names into IP addresses, and nameservers act as the authoritative source for this mapping. While DNS SOA records offer administrative information—like the primary nameserver and the zone administrator's email—they do not provide comprehensive domain ownership details.

For instance, running the following command displays the SOA record for a domain:

```
$ dig kodekloud.com SOA
;; <<>> DiG 9.18.28-0ubuntu0.24.04.1-Ubuntu <<>> kodekloud.com SOA
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 16747
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags: 0, udp: 512
;; QUESTION SECTION:
;kodekloud.com.            IN      SOA


;; ANSWER SECTION:
kodekloud.com.        1636    IN      SOA     cheryl.ns.cloudflare.com. dns.cloudflare.com. 2355324992 10000 2400 604800 1800


;; Query time: 20 msec
;; SERVER: 10.255.255.254#53(10.255.255.254) (UDP)
;; WHEN: Mon Oct 28 00:01:20 CST 2024
;; MSG SIZE  rcvd: 103
```

In contrast, WHOIS is a standardized protocol that delivers detailed registration information about domains, including details such as the registrar’s contact information, registration dates, expiration dates, and more.

## Example of a WHOIS Query

Executing a WHOIS query for a well-known domain typically produces output similar to this:

```
$ whois
Domain Name: GOOGLE.COM
Registry Domain ID: 21381514_DOMAIN_COM-VRSN
Registrar WHOIS Server: whois.markmonitor.com
Registrar URL: http://www.markmonitor.com
Updated Date: 2019-09-09T15:39:04Z
Creation Date: 1997-09-15T04:00:00Z
Registry Expiry Date: 2028-09-14T04:00:00Z
Registrar: MarkMonitor Inc.
Registrar IANA ID: 292
Registrar Abuse Contact Email: abusecomplaints@markmonitor.com
Registrar Abuse Contact Phone: +1.2086851750
Domain Status: clientDeleteProhibited https://icann.org/epp#clientDeleteProhibited
Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited
Domain Status: clientUpdateProhibited https://icann.org/epp#clientUpdateProhibited
Domain Status: serverDeleteProhibited https://icann.org/epp#serverDeleteProhibited
Domain Status: serverTransferProhibited https://icann.org/epp#serverTransferProhibited
Domain Status: serverUpdateProhibited https://icann.org/epp#serverUpdateProhibited
Name Server: NS1.GOOGLE.COM
Name Server: NS2.GOOGLE.COM
Name Server: NS3.GOOGLE.COM
Name Server: NS4.GOOGLE.COM
DNSSEC: unsigned
URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/
```

> [!important]
> **Note**
>
> Many registrars now offer privacy services that replace personal contact information in WHOIS records with proxy details.

A privacy-protected WHOIS response might resemble this:

```
$ whois private-domain.com
Domain Name: PRIVATE-DOMAIN.COM
Registry Domain ID: 94893559_DOMAIN_COM-VRSN
Registrar WHOIS Server: whois.pairdomains.com
Registrar URL: http://www.pairdomains.com
Updated Date: 2023-12-13T20:46:48Z
Creation Date: 2003-02-12T16:24:01Z
Registry Expiry Date: 2025-02-12T16:24:01Z
Registrar: pair Networks, Inc. d/b/a pair Domains
Registrar IANA ID: 99
Registrar Abuse Contact Email:
Registrar Abuse Contact Phone:
Domain Status: ok https://icann.org/epp#ok
Name Server: NS11.SECONDARY.AR.COM
Name Server: NS12.SECONDARY.AR.COM
DNSSEC: unsigned
URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/
```

## Introducing RDAP

Modern domain management is increasingly moving toward RDAP, which addresses several limitations of WHOIS. RDAP returns information in a structured JSON format, supports internationalized domain names, and provides standardized status codes. Being built on HTTP, RDAP simplifies integration with web services and APIs.

Below is an example of an RDAP query using curl:

```
$ curl https://rdap.verisign.com/com/v1/domain/google.com
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 2429  100 2429    0     0  19356      0 --:--:-- --:--:-- --:--:-- 19432
{
  "objectClassName": "domain",
  "handle": "2138514_DOMAIN_COM-VRSN",
  "ldhName": "GOOGLE.COM",
  "links": [
    {
      "value": "https://rdap.verisign.com/com/v1/domain/GOOGLE.COM",
      "rel": "self",
      "href": "https://rdap.verisign.com/com/v1/domain/GOOGLE.COM",
      "type": "application/rdap+json"
    },
    {
      "value": "https://rdap.markmonitor.com/rdap/domain/GOOGLE.COM",
      "rel": "related",
      "href": "https://rdap.markmonitor.com/rdap/domain/GOOGLE.COM",
      "type": "application/rdap+json"
    }
  ],
  "status": [
    "client delete prohibited",
    "client transfer prohibited",
    "client update prohibited",
    "server delete prohibited",
    "server transfer prohibited",
    "server update prohibited"
  ],
  "entities": []
}
```

## WHOIS vs. RDAP: A Quick Comparison

| Protocol | Output Format | Integration       | Typical Use Case                                      |
| -------- | ------------- | ----------------- | ----------------------------------------------------- |
| WHOIS    | Plain text    | Manual queries    | Basic domain lookups and verification of registration |
| RDAP     | JSON          | Automated systems | Modern domain management and API integration          |

## Conclusion

Both WHOIS and RDAP are essential tools for accessing detailed domain registration and ownership data. WHOIS remains widely used for straightforward lookups, while RDAP is set to become the standard for automated domain management due to its structured output and ease of integration with modern web services.

Choosing the appropriate tool—whether a simple WHOIS lookup or an RDAP query—can significantly aid in troubleshooting, debugging DNS issues, or obtaining a deeper understanding of domain details.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/fada8728-c242-452d-a6e1-7dc8aa2511f3/lesson/b362575b-9c8f-43dd-844c-300469c832ff)**
>
> Watch video content
