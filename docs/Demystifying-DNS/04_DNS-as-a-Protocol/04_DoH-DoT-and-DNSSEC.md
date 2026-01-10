# DoH DoT and DNSSEC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/DNS-as-a-Protocol/DoH-DoT-and-DNSSEC)

---

## Table of Contents

- DoH DoT and DNSSEC
  - Secure DNS: DoH and DoT
  - Understanding DNSSEC
  - Summary
  - Watch Video
  - Practice Lab
    - Key Differences: DNS Encryption vs. DNS Data Validation
    - How DNSSEC Works
    - AWS Route 53 and DNSSEC Automation
      - Using DIG with DNSSEC

---

## Content

Demystifying DNS

DNS as a Protocol

# DoH DoT and DNSSEC

DNS queries traditionally traverse networks using UDP or TCP on port 53, where data is sent unencrypted. To bolster both security and privacy, two modern protocols—DoH and DoT—have emerged.

## Secure DNS: DoH and DoT

- **DoH (DNS over HTTPS):** Encapsulates DNS queries within HTTPS, encrypting the data in transit.
- **DoT (DNS over TLS):** Utilizes TLS encryption to secure DNS queries.

With both protocols, a DNS query is sent to a resolver that supports encryption. The resolver decrypts the request, performs the DNS lookup using standard, unencrypted DNS servers, and then re-encrypts the response for secure transmission back to the client.

![The image illustrates the process of DNS queries being sent via protocols from a device through a home network to various DNS servers on the internet, highlighting the use of encrypted messages with DoT and DoH protocols.](https://kodekloud.com/kk-media/image/upload/v1752873137/notes-assets/images/Demystifying-DNS-DoH-DoT-and-DNSSEC/dns-queries-encryption-process-diagram.jpg)

For example, Cloudflare provides a DoH endpoint that can be used with command-line tools. The DNSzones.dev web application leverages Cloudflare's DoH endpoint. To send a DNS query over DoH via the command line, you can use cURL as follows:

```
$ curl -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=wikipedia.org&type=A"
{"Status":0,"TC":false,"RD":true,"RA":true,"AD":false,"CD":false,"Question":[{"name":"wikipedia.org","type":1}],"Answer":[{"name":"wikipedia.org","type":1,"TTL":252,"data":"208.80.153.224"}]}
```

This approach works similarly to DIG, but instead of using traditional UDP or TCP, it leverages HTTPS for secure DNS queries.

---

## Understanding DNSSEC

In addition to these secure transport protocols, DNSSEC (Domain Name System Security Extensions) enhances DNS security by digitally signing DNS records. Unlike DoH and DoT, which focus solely on encrypting data during transit, DNSSEC ensures the authenticity and integrity of the DNS data itself.

![The image explains Domain Name System Security Extensions (DNSSEC) and highlights its role in providing cryptographic security, noting that it is different from DoT or DoH.](https://kodekloud.com/kk-media/image/upload/v1752873138/notes-assets/images/Demystifying-DNS-DoH-DoT-and-DNSSEC/dnssec-security-extensions-explained.jpg)

### Key Differences: DNS Encryption vs. DNS Data Validation

When using DoH, HTTPS encryption (SSL/TLS) secures the data in transit, including the required HTTP headers. In contrast, DNSSEC embeds cryptographic signatures (e.g., RRSIG records) within DNS responses, enabling client resolvers to validate that the data originates from a trusted authoritative server.

![The image is a comparison table highlighting the differences between DoH (DNS over HTTPS) and DNSSEC. It notes that DoH requires HTTP headers and uses HTTPS encryption, while DNSSEC adds extra security records and allows only valid DNS components to sign cryptographically.](https://kodekloud.com/kk-media/image/upload/v1752873139/notes-assets/images/Demystifying-DNS-DoH-DoT-and-DNSSEC/doh-vs-dnssec-comparison-table.jpg)

### How DNSSEC Works

The validation process with DNSSEC begins when a client sends a DNS query. Often, the query includes an OPT record with the DNSSEC OK (DO) flag set, indicating the client's request for DNSSEC data. When a domain is DNSSEC-enabled, the resolver uses the appropriate public keys to verify digital signatures included in the response.

![The image illustrates the process of DNS queries and resolutions, highlighting the roles of stub resolvers, recursive resolvers, and authoritative DNS servers, with a focus on DoH, DoT, and DNSSEC protocols. It shows the flow from a device through a home network to the internet, emphasizing security aspects like public keys and DNSSEC validation.](https://kodekloud.com/kk-media/image/upload/v1752873140/notes-assets/images/Demystifying-DNS-DoH-DoT-and-DNSSEC/dns-queries-resolutions-diagram.jpg)

Trusted key-signing ceremonies at the root and top-level domains (TLD) create a chain of trust throughout the DNS infrastructure. These ceremonies involve experts who rigorously generate and securely store cryptographic keys, ensuring that DNS responses are only accepted if properly signed by legitimate servers.

![The image illustrates a DNS spoofing attack process and highlights that DNSSEC prevents DNS spoofing and cache poisoning attacks.](https://kodekloud.com/kk-media/image/upload/v1752873141/notes-assets/images/Demystifying-DNS-DoH-DoT-and-DNSSEC/dns-spoofing-attack-dnssec-illustration.jpg)

#### Using DIG with DNSSEC

You can verify DNSSEC-enabled domains using the DIG command by adding the "+dnssec" flag. For example:

```
$ dig +dnssec kodekloud.com
; <<>> DiG 9.18.28 <<>> +dnssec kodekloud.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 56008
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags: do; udp: 512
;; QUESTION SECTION:
;kodekloud.com.              IN      A


;; ANSWER SECTION:
kodekloud.com.               300     IN      A       172.67.68.105
kodekloud.com.               300     IN      A       104.26.11.250
kodekloud.com.               300     IN      A       104.26.10.250


;; Query time: 49 msec
;; SERVER: 10.255.255.254#53(10.255.255.254) (UDP)
;; WHEN: Thu Jan 23 22:35:27 CST 2025
;; MSG SIZE  rcvd: 90
```

In this example, while DNSSEC records are negotiated via the OPT record, they are not explicitly requested beyond that.

> [!important]
> **Note**
>
> AWS Route 53 offers integration with DNSSEC, allowing you to create hosted zones with automated DNSSEC key management. This automation simplifies processes like key generation, publication (via DNSKEY records), and resource record signing (with RRSIG records).

### AWS Route 53 and DNSSEC Automation

When DNSSEC is enabled with AWS Route 53, the process is largely automated:

1.  **Key Generation:** New DNSSEC keys are generated for your domain.
2.  **Key Publication:** The public key is published as a DNSKEY record, enabling other servers to verify signatures.
3.  **Data Signing:** DNS resource records are signed digitally using a zone signing key; the digital signatures are stored in RRSIG records.
4.  **Parent Zone Interaction:** The parent zone or TLD is informed about the DNSSEC keys, establishing a trust chain from the root domain.

![The image illustrates that AWS Route 53 can automatically enable DNSSEC and manage keys when creating a hosted zone, highlighting the automation of this process.](https://kodekloud.com/kk-media/image/upload/v1752873142/notes-assets/images/Demystifying-DNS-DoH-DoT-and-DNSSEC/aws-route53-dnssec-automation.jpg)

Once enabled, DNS responses will include RRSIG records, and supporting resolvers will verify these signatures. If validation fails, the response is deemed untrusted.

![The image is a diagram explaining the steps for adding DNSSEC to a domain, focusing on key publication and DNSKEY record verification. It shows the relationship between the key-signing key and its public part.](https://kodekloud.com/kk-media/image/upload/v1752873143/notes-assets/images/Demystifying-DNS-DoH-DoT-and-DNSSEC/dnssec-steps-key-publication-diagram.jpg)

![The image is a flowchart illustrating the effects of enabling DNSSEC for a domain, showing the process from DNS responses to validation outcomes. It highlights the inclusion of RRSIG records, validation of signatures, and the success or failure of data trust.](https://kodekloud.com/kk-media/image/upload/v1752873145/notes-assets/images/Demystifying-DNS-DoH-DoT-and-DNSSEC/dnssec-flowchart-validation-outcomes.jpg)

---

## Summary

In summary, this article explains that:

- **DoT and DoH** secure DNS communication by encrypting the data using TLS/HTTPS protocols.
- **DNSSEC** enhances DNS security by digitally signing DNS records, ensuring the authenticity and integrity of data, thereby defending against spoofing and cache poisoning attacks.

![The image is a summary slide describing two points: DoT and DoH securely transport DNS messages, and DNSSEC uses cryptographic signatures to ensure authenticity and integrity, protecting against DNS spoofing attacks.](https://kodekloud.com/kk-media/image/upload/v1752873146/notes-assets/images/Demystifying-DNS-DoH-DoT-and-DNSSEC/dot-doh-dnssec-security-summary.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/5859af30-1c2e-443c-b5ef-af6f366b649f/lesson/bbc373f1-6708-4e0e-b921-92517d50cd4f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/demystifying-dns/module/5859af30-1c2e-443c-b5ef-af6f366b649f/lesson/fd752afe-696c-401f-93cd-b3dea94f992b)**
>
> Practice lab
