# MX Records - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Record-Types/MX-Records)

---

## Table of Contents

- MX Records
  - Anatomy of an MX Record
  - MX Record Priority and Redundancy
  - Email Security and Authentication Protocols
  - Watch Video
  - Practice Lab
    - SPF (Sender Policy Framework)
    - DKIM (DomainKeys Identified Mail)
    - DMARC (Domain-Based Message Authentication, Reporting, and Conformance)

---

## Content

Demystifying DNS

Record Types

# MX Records

This article explores MX records, detailing their structure and role in email delivery. When you reply to an email—for example, one sent from a cochla.com address using your Gmail account—several behind-the-scenes steps occur:

1.  Since your email is hosted by Gmail, Google selects a Gmail mail server for SMTP delivery.
2.  The Gmail server performs a DNS query for the MX records of the cochla.com domain to locate the appropriate mail servers.
3.  Once the MX records are returned, the server with the highest priority (lower number) is chosen, and an A record lookup is performed to fetch its IP address.
4.  The email is then delivered to that IP address.

In the Domain Name System (DNS), MX records are essential because they point to mail servers, ensuring your email messages are delivered correctly.

![The image illustrates the concept of MX Records, showing a diagram with servers and a computer, explaining that they direct email messages to the correct mail servers in the Domain Name System.](https://kodekloud.com/kk-media/image/upload/v1752873251/notes-assets/images/Demystifying-DNS-MX-Records/mx-records-email-routing-diagram.jpg)

> [!important]
> **Note**
>
> MX records must always point to valid hostnames configured with A (or AAAA) records. This ensures that incoming emails can be correctly resolved to the respective IP addresses.

## Anatomy of an MX Record

An MX record is composed of several components:

- **Domain Name:** The domain you own and manage.
- **TTL (Time to Live):** For instance, "300" seconds means DNS servers cache the record for 5 minutes before checking for updates.
- **IN:** Indicates the Internet class, a standard for modern DNS records.
- **MX:** Specifies that the record is a mail exchange record.
- **Priority:** Numerical values (e.g., 1, 5, 10) indicate the order of preference. Lower values mean higher priority.
- **Mail Server Hostname:** A valid SMTP server hostname that will receive email for the domain.

Consider this example MX record entry:

```
kodekloud.com. 300 IN MX 10 alt3.aspmx.l.google.com.
```

This record directs emails destined for kodekloud.com to the mail server at alt3.aspmx.l.google.com. It is crucial that this mail server's hostname resolves to an A (or AAAA) record, allowing it to be reached.

Most domain registrars such as Cloudflare, Route 53, or GoDaddy offer user-friendly interfaces to add MX records. Simply navigate to your DNS settings, select the MX record type, and provide the appropriate priority and mail server hostname.

## MX Record Priority and Redundancy

Email systems rely on MX record priorities to choose the optimal mail server for delivery. For example, running the query for kodekloud.com's MX records may return the following:

```
$ dig kodekloud.com MX
;; DiG 9.10.6 ;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 64585
;; flags: qr rd ra; QUERY: 1, ANSWER: 5, AUTHORITY: 0, ADDITIONAL: 2


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;kodekloud.com.             IN      MX


;; ANSWER SECTION:
kodekloud.com.      300     IN      MX      10 alt3.aspmx.l.google.com.
kodekloud.com.      300     IN      MX      10 alt4.aspmx.l.google.com.
kodekloud.com.      300     IN      MX      5 alt2.aspmx.l.google.com.
kodekloud.com.      300     IN      MX      5 alt1.aspmx.l.google.com.
kodekloud.com.      300     IN      MX      1 aspmx.l.google.com.


;; ADDITIONAL SECTION:
alt1.aspmx.l.google.com. 129 IN A 142.250.152.27


;; Query time: 187 msec
;; SERVER: 2806:10:cfff:0:e::e
;; WHEN: Sat Feb 01 22:04:02 CST 2025
;; MSG SIZE  rcvd: 173
```

Here, the mail server with priority 1 (aspmx.l.google.com) is attempted first. If it is unreachable, servers with priority 5 are used next, followed by the servers with priority 10. When multiple MX records share the same priority, email delivery is distributed in a load-balanced manner:

```
sample.com. 300 IN MX 10 ms1.aspmx.l.google.com.
sample.com. 300 IN MX 10 ms2.aspmx.l.google.com.
```

> [!important]
> **Warning**
>
> Ensure that MX records point exclusively to hostnames with A or AAAA records. Pointing to CNAME records can cause delivery issues. If no MX records are present, email will fallback to the domain’s A records, a concept known as implicit MX.

![The image outlines two MX record rules: they must point to A/AAAA records, not CNAMEs, and if no MX record exists, email uses the A record (implicit MX).](https://kodekloud.com/kk-media/image/upload/v1752873252/notes-assets/images/Demystifying-DNS-MX-Records/mx-record-rules-a-aaaa-cname.jpg)

## Email Security and Authentication Protocols

Security in email communications is critical. Without proper configurations, attackers could intercept emails or spoof sender addresses. Modern email systems utilize three key protocols to enhance security:

### SPF (Sender Policy Framework)

SPF uses TXT records to specify which mail servers are authorized to send emails on behalf of your domain. For example:

```
example.com. 300 IN TXT "v=spf1 include:_spf.google.com ip4:192.168.1.10 -all"
```

When an email is received, the recipient's mail server checks the SPF record to verify that the sending server is permitted to send emails from the domain.

### DKIM (DomainKeys Identified Mail)

DKIM adds a unique digital signature to each outgoing email. This signature is created using a private key held by your mail server, while the corresponding public key is published in a TXT record within your DNS:

```
default._domainkey.example.com. 300 IN TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgCQA4JICUYrYG/UjtGhK4PIZx0Ii8zWfgLeE1Slc14jL91Raja9m8F6D2DyqMB+xrIrHR/2xCXgNWEFw0fqQmWGRcpxdBlvAkCu9oHzqiDnXEBg98PUN9x7yFqoVuTAFM6H0Uv5ChCwbmXXn2mwQFu..."
```

Receiving servers use this public key to validate the digital signature, ensuring the email content remains unchanged during transit.

### DMARC (Domain-Based Message Authentication, Reporting, and Conformance)

DMARC policies work in conjunction with SPF and DKIM. They are also stored as TXT records and instruct receiving servers on how to handle emails that fail authentication checks. Actions can include rejecting, quarantining, or simply reporting the non-compliant emails:

```
_dmarc.example.com. 300 IN TXT "v=DMARC1; p=reject; rua=mailto:reports@example.com; pct=100"
```

Integrating SPF, DKIM, and DMARC creates a robust framework that significantly reduces the risk of email spoofing and phishing attacks.

![The image is a summary of email authentication protocols: SPF, DKIM, and DMARC, explaining their functions in verifying mail server legitimacy, adding digital signatures, and handling failed authentication.](https://kodekloud.com/kk-media/image/upload/v1752873253/notes-assets/images/Demystifying-DNS-MX-Records/email-authentication-protocols-summary.jpg)

When these protocols are properly configured, they make it considerably more difficult for attackers to spoof emails or use your domain for phishing attacks.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/57433009-69d5-4b38-8c58-dde5c3354c62/lesson/d0e03075-b82f-4739-9ed8-e72c8a1987cf)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/demystifying-dns/module/57433009-69d5-4b38-8c58-dde5c3354c62/lesson/81699ec9-8421-42bc-90a9-dd2475a32ca1)**
>
> Practice lab
