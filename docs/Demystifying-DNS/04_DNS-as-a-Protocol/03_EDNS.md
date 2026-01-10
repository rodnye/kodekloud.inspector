# EDNS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/DNS-as-a-Protocol/EDNS)

---

## Table of Contents

- EDNS
  - Watch Video

---

## Content

Demystifying DNS

DNS as a Protocol

# EDNS

EDNS was first introduced in the 1980s when hardware limitations of that era influenced the original DNS specifications. Initially, these limitations included:

- UDP message size restricted to 512 bytes
- Response codes limited to 4 bits (values 0 to 15)
- No mechanism for DNS clients and servers to signal compatibility with newer capabilities

![The image provides information about the original DNS specifications from 1980, highlighting limitations such as UDP message size, 4-bit response codes, and lack of capability signaling.](https://kodekloud.com/kk-media/image/upload/v1752873146/notes-assets/images/Demystifying-DNS-EDNS/dns-specifications-1980-limitations.jpg)

As networks and computers evolved, it became essential for DNS to adapt while maintaining backward compatibility. The challenge of modifying a fundamental Internet protocol was met by repurposing the additional section in the DNS message resource record structure, creating space for enhanced functionalities.

The additional section in a DNS message now supports various resource record types:

![The image illustrates the structure of a DNS message with sections labeled Header, Question, Answer, Authority, and Additional, highlighting the repurposing of the "Additional Section" for new functionality. It is titled "EDNS" and includes a copyright notice from KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752873147/notes-assets/images/Demystifying-DNS-EDNS/dns-message-structure-edns-diagram.jpg)

To enable extension mechanisms while preserving compatibility with existing resource records, a new concept called pseudo-resource records was introduced. This approach allows the same fields to be reinterpreted under the EDNS system.

Below is an in-depth explanation of how each resource record field in the additional section of a DNS response is repurposed:

1.  **Name Field:**  
    In EDNS, the Name field is set to the empty root domain. This contrasts with the answer section, where it contains the queried domain name.

    ![The image is a diagram explaining the structure of an EDNS (Extension Mechanisms for DNS) record, detailing fields like Domain Name, Record Type, Record Class, and others. It includes a note about the domain name having an empty root domain.](https://kodekloud.com/kk-media/image/upload/v1752873148/notes-assets/images/Demystifying-DNS-EDNS/edns-record-structure-diagram.jpg)

2.  **Type Field:**  
    The Type field is now used for the OPT record. A value of 41 in this field indicates that extended capabilities are being requested in a DNS query.
3.  **Class Field:**  
    This field is redefined to indicate the UDP payload size. EDNS allows for an increased UDP packet size, which is important for modern network demands.

    ![The image is a diagram explaining the structure of an EDNS (Extension Mechanisms for DNS) record, detailing fields like Domain Name, Record Type, and Record Class, with a note on UDP payload size.](https://kodekloud.com/kk-media/image/upload/v1752873150/notes-assets/images/Demystifying-DNS-EDNS/edns-record-structure-diagram-2.jpg)

4.  **TTL Field:**  
    In the EDNS context, the TTL field represents the EDNS version. Currently, version 0 is stable and widely adopted, while higher version numbers are reserved for future enhancements.

    ![The image is a diagram explaining the structure of an EDNS (Extension Mechanisms for DNS) record, detailing fields like domain name, record type, and EDNS version. It includes a note that EDNS version extends DNS functionality, with version 0 as the stable, widely adopted version.](https://kodekloud.com/kk-media/image/upload/v1752873152/notes-assets/images/Demystifying-DNS-EDNS/edns-record-structure-diagram-3.jpg)

5.  **Extended RCODEs:**  
    With EDNS, response codes can now extend beyond the original limits. Additional response code values start from 16 and upward.
6.  **DNSSEC Flag:**  
    A flag for DNSSEC is also incorporated into the EDNS structure. Details on this feature will be discussed later.

    ![The image is a diagram explaining the structure of an EDNS (Extension Mechanisms for DNS) packet, detailing fields such as Domain Name, Record Type, Record Class, Time to Live, and others. It includes a note about Extended RCODE starting at 16, with standard RCODEs ranging from 0 to 5.](https://kodekloud.com/kk-media/image/upload/v1752873153/notes-assets/images/Demystifying-DNS-EDNS/edns-packet-structure-diagram.jpg)

7.  **RDATA Field:**  
    The RDATA field now contains EDNS options and, where applicable, key-value data from records in the additional section.

    ![The image is a diagram explaining the structure of an EDNS (Extension Mechanisms for DNS) record, detailing fields like Domain Name, Record Type, and Record Data. It includes a note about the RDATA field containing EDNS options and key-value pair data.](https://kodekloud.com/kk-media/image/upload/v1752873154/notes-assets/images/Demystifying-DNS-EDNS/edns-record-structure-diagram-4.jpg)

8.  **RDLength Field:**  
    Finally, the RDLength field indicates the length of the EDNS options present within the additional section.

By utilizing OPT records, DNS signals its support for EDNS capabilities. This innovative approach allows the protocol to evolve and support new features without the need for an entirely new DNS version.

![The image is a diagram explaining EDNS (Extension Mechanisms for DNS), detailing the structure of an OPT record and its role in signaling EDNS capabilities for DNS evolution while maintaining backward compatibility.](https://kodekloud.com/kk-media/image/upload/v1752873156/notes-assets/images/Demystifying-DNS-EDNS/edns-opt-record-diagram.jpg)

Since 2013, DNS infrastructure—including resolvers and nameservers—has been required to support EDNS. When an OPT record is detected in a request, compliant responders must include an OPT record in their responses.

![The image is a timeline illustrating the implementation of EDNS in DNS infrastructure starting in 2013, highlighting the mandatory nature of resolvers and nameservers, and showing the flow of DNS queries and responses with OPT.](https://kodekloud.com/kk-media/image/upload/v1752873156/notes-assets/images/Demystifying-DNS-EDNS/edns-implementation-timeline-dns.jpg)

One practical method to observe the OPT pseudo-section is by using the dig command. When you see "ADDITIONAL: 1" in the header, it indicates the presence of the OPT record, confirming EDNS support. For example:

```
$ dig kubernetes.io
; <<>> DiG 9.10.6 <<>> kubernetes.io
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 17646
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
;; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;kubernetes.io.       IN      A


;; ANSWER SECTION:
kubernetes.io.       3600    IN      A       147.75.40.148


;; Query time: 184 msec
;; SERVER: 2806:10c0:ffff::e#53(2806:10c0:ffff:e)
;; WHEN: Sun Jan 19 01:34:20 CST 2025
;; MSG SIZE  rcvd: 58
```

EDNS introduces several important features:

- Extended response codes (starting from 16)
- DNS security extensions (DNSSEC)
- Client subnet information for CDN optimization

![The image outlines three features of EDNS (Extension Mechanisms for DNS): extended response codes starting from 16, DNS Security Extensions (DNSSEC), and client subnet information for CDN optimization.](https://kodekloud.com/kk-media/image/upload/v1752873158/notes-assets/images/Demystifying-DNS-EDNS/edns-features-extended-response-dnssec.jpg)

Content delivery networks (CDNs), such as those used by Netflix, utilize multiple edge locations to optimize performance by serving cached data from servers that are geographically closer to the client.

EDNS also enables larger UDP messages—up to a negotiated limit of 4096 bytes. With EDNS, clients can specify support for these larger packet sizes, reducing the need to fall back to TCP. In contrast, traditional DNS required responses larger than 512 bytes to be truncated (indicated by the TC flag) and then resent over TCP.

![The image is a comparison table showing the differences between original DNS implementation and updated DNS implementation with EDNS, focusing on UDP size limits and TCP handling when limits are exceeded.](https://kodekloud.com/kk-media/image/upload/v1752873158/notes-assets/images/Demystifying-DNS-EDNS/dns-implementation-comparison-table.jpg)

> [!important]
> **Note**
>
> If a client indicates support for 4096-byte UDP packets, the server will send larger UDP responses. TCP will only be used as a fallback when the response exceeds this limit.

It is important to note that [RFC 6891](https://datatracker.ietf.org/doc/html/rfc6891) specifies that for performance reasons, UDP payload sizes above 512 bytes should still consider a 512-byte baseline.

![The image contains a text box referencing RFC 6891, explaining that for performance reasons, UDP payloads smaller than 512 bytes are considered as 512 bytes. It also includes the logo "EDNS" and a copyright notice for KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752873159/notes-assets/images/Demystifying-DNS-EDNS/rfc-6891-edns-udp-payloads.jpg)

The widely recommended 4096-byte limit strikes a balance between accommodating larger responses and mitigating security risks, as higher values might expose vulnerabilities.

![The image features a graphic with the text "4096 LIMIT" and a description about balancing size and reliability to prevent potential malicious attacks. It includes a scale icon and the logo "EDNS."](https://kodekloud.com/kk-media/image/upload/v1752873160/notes-assets/images/Demystifying-DNS-EDNS/4096-limit-size-reliability-edns.jpg)

> [!important]
> **Warning**
>
> Using UDP payload sizes significantly higher than 4096 bytes may introduce security risks, including potential exposure to malicious attacks. Always adhere to recommended standards.

This evolution in DNS through EDNS provides extended functionality while ensuring backward compatibility—a crucial improvement given the continuously growing demands of the modern Internet.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/5859af30-1c2e-443c-b5ef-af6f366b649f/lesson/85215257-15a6-4c68-a171-4fafcbacbe62)**
>
> Watch video content
