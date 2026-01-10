# Top Level Domain - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Welcome-to-the-World-of-DNS/Top-Level-Domain)

---

## Table of Contents

- Top Level Domain
  - Generic Top-Level Domains (gTLDs)
  - Country-Code Top-Level Domains (ccTLDs)
  - DNS Zone Management
  - Other Special Categories of Top-Level Domains
  - Watch Video

---

## Content

Demystifying DNS

Welcome to the World of DNS

# Top Level Domain

In this lesson, we dive deeper into one of the foundational components of the Domain Name System (DNS): Top-Level Domains (TLDs). After exploring the Root Zone in our previous lesson, we now focus on TLDs, which play a vital role in structuring domain names. TLDs are like vast territories on the internet, with classifications that include generic top-level domains (gTLDs) and country-code top-level domains (ccTLDs).

---

## Generic Top-Level Domains (gTLDs)

Generic TLDs include well-known labels such as .com, .io, .net, .org, and .ai. They operate as globally accessible zones similar to international territories, available to users from any country.

![The image is a diagram showing the categorization of top-level domains (TLDs) into generic TLDs (gTLDs) and country code TLDs (ccTLDs).](https://kodekloud.com/kk-media/image/upload/v1752873291/notes-assets/images/Demystifying-DNS-Top-Level-Domain/tld-categorization-generic-country-code-diagram.jpg)

Think of generic TLDs as zones open to everyone globally:

![The image is a diagram illustrating the hierarchy of generic top-level domains (gTLDs) with a root zone branching into .com, .net, .org, and .ai zones. It explains sponsored generic TLDs as specialized domains with a sponsor representing a community of interest.](https://kodekloud.com/kk-media/image/upload/v1752873292/notes-assets/images/Demystifying-DNS-Top-Level-Domain/gtld-hierarchy-diagram-sponsorship.jpg)

Historically, each gTLD had a specific intended purpose—for example, .com for commercial entities, .org for non-profit organizations, and .net for network providers. However, these guidelines are no longer strictly enforced. Services such as youtube.com, google.com, netflix.com, and KodeKloud.com (using the .com domain) illustrate that these domains serve a worldwide audience.

![The image explains the original purposes of three generic top-level domains (gTLDs): .com for commercial organizations, .org for non-profit organizations, and .net for network providers, suggesting they are suitable for anyone seeking a wide online reach.](https://kodekloud.com/kk-media/image/upload/v1752873294/notes-assets/images/Demystifying-DNS-Top-Level-Domain/gtld-purposes-com-org-net.jpg)

An interesting observation is that many United States-based services primarily use .com domains. For example, Amazon uses amazon.com for its US operations rather than a country-code domain, while it uses variants like amazon.com.mx for international markets. Additionally, the United States reserves .gov exclusively for governmental functions, unlike other countries that use their ccTLDs for similar purposes.

As of 2024, there are over 1,500 generic TLDs available.

![The image states that as of 2024, there are over 1,500 generic top-level domains, accompanied by a surprised emoji.](https://kodekloud.com/kk-media/image/upload/v1752873295/notes-assets/images/Demystifying-DNS-Top-Level-Domain/generic-top-level-domains-2024.jpg)

When you register a domain name like KodeKloud.com, you are essentially subdividing a part of the .com territory. A registrar checks the desired domain's availability and requests the .com registry to delegate authority to the registrant. This step is a critical part of the overall domain registration process.

![The image illustrates the domain registration process, showing how a registrar checks the availability of "kodekloud.com" and transfers authority through the root and TLD zones.](https://kodekloud.com/kk-media/image/upload/v1752873296/notes-assets/images/Demystifying-DNS-Top-Level-Domain/domain-registration-process-kodekloud.jpg)

Furthermore, the Root Zone—the topmost level of the DNS hierarchy—contains all TLD information, which is essential for resolving domain names.

![The image illustrates the hierarchical structure of domain name resolution, showing the root zone, top-level domain (TLD) zone, and second-level domain zone, with an example of "facebook.com."](https://kodekloud.com/kk-media/image/upload/v1752873298/notes-assets/images/Demystifying-DNS-Top-Level-Domain/domain-name-resolution-hierarchy-facebook-com.jpg)

It is important to note that while gTLDs are domains, you cannot directly create a subdomain at the root zone. Registering a new gTLD involves a rigorous process that includes a substantial application fee (approximately $185,000) and oversight by IANA. These applications are processed in rounds, with the most recent large-scale round having taken place in 2012.

![The image explains the process of applying for a new generic top-level domain (gTLD), highlighting a $185k application fee and referencing the IANA and ICANN's new gTLD program.](https://kodekloud.com/kk-media/image/upload/v1752873299/notes-assets/images/Demystifying-DNS-Top-Level-Domain/gtld-application-process-fee.jpg)

In addition, TLDs support Internationalized Domain Names (IDNs). Originally, the DNS was designed to support only ASCII characters (A–Z, 0–9, and hyphens—though hyphens cannot begin or end a label), with each label limited to 63 characters and the entire domain up to 253 characters in length. To embrace global linguistic diversity, many TLDs (such as .com, .org, and .info) now allow registrations in various writing systems (like Arabic, Chinese, or Japanese). These names are converted to ASCII using an encoding known as Punycode.

![The image lists the default rules for domain names, including allowed characters, numbers, hyphen usage, and character limits for labels and the entire domain name.](https://kodekloud.com/kk-media/image/upload/v1752873300/notes-assets/images/Demystifying-DNS-Top-Level-Domain/domain-name-rules-allowed-characters.jpg)

![The image illustrates the process of allowing domain registration using different writing systems (Arabic, Chinese, Japanese) and converting them into ASCII using Punycode.](https://kodekloud.com/kk-media/image/upload/v1752873301/notes-assets/images/Demystifying-DNS-Top-Level-Domain/domain-registration-punycode-process.jpg)

---

## Country-Code Top-Level Domains (ccTLDs)

Country-code top-level domains are two-letter domains representing specific countries. They enable localized services and sites; for example, amazon.com.mx caters specifically to the Mexican market. Government agencies and regional organizations frequently use ccTLDs to emphasize their local presence.

![The image illustrates the structure of country code top-level domains (ccTLDs) with a root zone connected to various country zones like "us," "br," "ie," "mx," "uk," "jp," and "in."](https://kodekloud.com/kk-media/image/upload/v1752873302/notes-assets/images/Demystifying-DNS-Top-Level-Domain/cc-structure-root-zones.jpg)

Understanding ccTLDs is crucial because they highlight the concept of zone authority. While a domain such as kodekloud.com under the .com zone operates under a single set of guidelines, ccTLDs are governed by their respective countries, each establishing its own registration rules.

For instance, the public suffix list available at [publicsuffix.org](https://publicsuffix.org) outlines where public registration is permitted. In Hong Kong (HK), the ccTLD is HK, and domains like com.hk, edu.hk, and gov.hk all reside in the same zone, even though they feature different subdomains. This setup demonstrates how a country organizes its namespace. Some countries allow direct registration under their ccTLD, while others require it to fall under a specific category.

![The image is a diagram explaining the concept of Country Code Top-Level Domains (ccTLDs) and how they complicate authority transfer, with references to the root zone and TLD.](https://kodekloud.com/kk-media/image/upload/v1752873303/notes-assets/images/Demystifying-DNS-Top-Level-Domain/cctlds-authority-transfer-diagram.jpg)

A sample output for a direct query of a domain in the HK zone is as follows:

```
$ dig domain.hk
;; <<>> DiG 9.10.6 <<>> domain.hk
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 8605
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;domain.hk.            IN  A


;; ANSWER SECTION:
domain.hk.        86400   IN  A   113.59.241.11


;; Query time: 1020 msec
;; SERVER: 10.255.255.254#53(10.255.255.254) (UDP)
;; WHEN: Tue Nov 12 00:26:29 CST 2024
;; MSG SIZE  rcvd: 54
```

Similarly, querying amazon.com.hk demonstrates how a subdomain is part of the same HK zone:

```
$ dig amazon.com.hk
;; <<>> DiG 9.10.6 <<>> amazon.com.hk
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 26586
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;amazon.com.hk.           IN      A


;; ANSWER SECTION:
amazon.com.hk.       900     IN      A       3.33.147.88
amazon.com.hk.       900     IN      A       15.197.140.28


;; Query time: 150 msec
;; SERVER: 10.255.255.254#53(10.255.255.254) (UDP)
;; WHEN: Tue Nov 12 00:33:25 CST 2024
;; MSG SIZE  rcvd: 74
```

The public suffix list clarifies where a registrant's control ends and public registration begins. For example, in the United Kingdom, direct registration under .uk isn’t permitted; instead, companies must register under domains like co.uk, ac.uk, or org.uk.

Another example is Japan's ccTLD (.jp):

```
$ dig jp
; <<>> DiG 9.10.6 <<>> jp
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 20081
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;jp.                         IN      A


;; AUTHORITY SECTION:
jp.                         900     IN      SOA     z.dns.jp. root.dns.jp. 1731461403 3600 900 1814400 900


;; Query time: 183 msec
;; SERVER: 1.1.1.1#53(1.1.1.1)
;; WHEN: Tue Nov 12 19:42:14 CST 2024
;; MSG SIZE  rcvd: 78
```

> [!important]
> **Note**
>
> In certain ccTLDs such as Mexico (MX) or India (IN), you may need to append a trailing dot during queries. Without the trailing dot, tools like dig might misinterpret the query—for example, confusing MX with mail exchange records.

![The image explains country code top-level domains (ccTLDs) for Mexico and India, showing how adding a dot changes their context in DNS records.](https://kodekloud.com/kk-media/image/upload/v1752873305/notes-assets/images/Demystifying-DNS-Top-Level-Domain/ccs-mexico-india-dns-explanation.jpg)

Throughout this lesson, we've also encountered the NS record type when examining the Root Zone using tools like dig, DoH, and nslookup. These record types are fundamental as we further explore MX records and other DNS record types in upcoming sections.

---

## DNS Zone Management

Every top-level domain is managed by a designated entity. IANA manages the Root Zone, whereas individual TLDs are governed by their respective organizations. For instance, Verisign is responsible for the .com domain, and each country typically has its own organization overseeing its ccTLD. These entities establish registration rules and pricing—for example, .com domains usually cost around $10 to $15 per year, while other TLDs might be considerably more expensive.

---

## Other Special Categories of Top-Level Domains

There are additional special categories of TLDs that serve niche purposes beyond generic and country-code domains:

1.  **Infrastructure TLDs:**  
    The most notable example is .ARPA, which is dedicated to managing internet infrastructure. Domains under .ARPA, such as 1.0.0.127.in-addr.arpa, are used for reverse DNS lookups. To initiate a reverse lookup for an IP address, you can use the dig command with the -x flag. This converts an IP address (e.g., 127.0.0.1) into a query for 1.0.0.127.in-addr.arpa.

    ![The image is a diagram explaining the use of the ".arpa" top-level domain (TLD) for managing internet infrastructure, with an example of a reverse DNS lookup address.](https://kodekloud.com/kk-media/image/upload/v1752873306/notes-assets/images/Demystifying-DNS-Top-Level-Domain/arpa-tld-internet-infrastructure-diagram.jpg)

    Example command for reverse DNS lookup:

    ```
    $ dig -x 127.0.0.1
    ; <<>> DiG 9.10.6 <<>> -x 127.0.0.1
    ;; global options: +cmd
    ;; Got answer:
    ;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 47609
    ;; flags: qr aa rd ad; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1
    ;; WARNING: recursion requested but not available


    ;; OPT PSEUDOSECTION:
    ; EDNS: version: 0, flags:; udp: 1232
    ;; QUESTION SECTION:
    ;1.0.0.127.in-addr.arpa.      IN      PTR


    ;; ANSWER SECTION:
    1.0.0.127.in-addr.arpa.  479580  IN      PTR     kubernetes.docker.internal.


    ;; Query time: 10 msec
    ;; SERVER: 10.255.255.254#53(10.255.255.254) (UDP)
    ;; WHEN: Tue Nov 12 12:04:26 CST 2024
    ;; MSG SIZE  rcvd: 113
    ```

2.  **Restricted (Generic Restricted) TLDs (grTLDs):**  
    These domains function similarly to gTLDs but enforce strict registration criteria. For example, .edu was exclusively for US educational institutions and .mil is reserved for the United States military.

    ![The image is a diagram explaining generic-restricted TLDs (grTLDs), highlighting that they are regular generic TLDs with strict rules, specifically for US educational institutions (.edu) and the US military (.mil).](https://kodekloud.com/kk-media/image/upload/v1752873307/notes-assets/images/Demystifying-DNS-Top-Level-Domain/generic-restricted-tlds-diagram.jpg)

3.  **Sponsored TLDs:**  
    These specialized domains are associated with particular communities, such as .museum for museums or .post for postal services.
4.  **Test TLDs:**  
    TLDs like .test are reserved exclusively for testing purposes. They are not active in the live DNS system, providing developers with a safe space to test DNS-related software without conflicting with real domains.

    ![The image is a diagram explaining specialized TLDs (sTLDs) associated with specific communities, such as the air transport industry (.aero), museums (.museum), post services (.post), and testing purposes (.test), along with rules on registration and usage.](https://kodekloud.com/kk-media/image/upload/v1752873309/notes-assets/images/Demystifying-DNS-Top-Level-Domain/specialized-tlds-diagram.jpg)

---

This lesson has provided an in-depth overview of how different top-level domains operate—from generic domains that serve global audiences to country-specific domains with localized rules, as well as specialized TLDs intended for infrastructure, restricted communities, and testing. Understanding these structures is crucial for navigating the complexities of the Domain Name System and effectively managing DNS zones.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/a983cc32-7f91-4feb-8946-eeb1cea67970/lesson/7d831c5f-8089-445d-b8c1-ba84229a8c0d)**
>
> Watch video content
