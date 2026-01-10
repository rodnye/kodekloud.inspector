# Demo DNS Queries - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Welcome-to-the-World-of-DNS/Demo-DNS-Queries)

---

## Table of Contents

- Demo DNS Queries
  - Using Browser Developer Tools
  - Verifying DNS Records with Dig
  - Summary
  - Watch Video
    - Querying A Records (IPv4)
    - Querying AAAA Records (IPv6)

---

## Content

Demystifying DNS

Welcome to the World of DNS

# Demo DNS Queries

In this lesson, we illustrate the DNS resolution process using two distinct methods: one through a web browser (Google Chrome) and another via the popular command-line tool, Dig. This guide helps you understand how **A records (IPv4)** and **AAAA records (IPv6)** are retrieved and interpreted.

## Using Browser Developer Tools

Start by opening a new tab in Google Chrome. Right-click on the page, choose **"Inspect"**, and navigate to the **Network** tab.

> [!important]
> **Note**
>
> Using the Network tab allows you to monitor all the details of a webpage's HTTP requests, including DNS resolution. In this example, we will perform a DNS query for **"KodeKloud.com"** to examine the underlying infrastructure responding to the request.

When you enter "KodeKloud.com" in the address bar and hit Enter, the network panel displays multiple entries. Locate the entry with a blue icon labeled "document" (the label may vary slightly), which corresponds to the site you are visiting. Click this entry to view detailed information, including the **Remote Address** field, where you should see an IPv6 address responding on port 443.

Below is an image that demonstrates a split-screen display: the KodeKloud website on the left, and the developer tools on the right showing network activity.

![The image shows a split screen with a website for KodeKloud on the left, promoting DevOps courses, and a browser's developer tools on the right, displaying network activity and headers.](https://kodekloud.com/kk-media/image/upload/v1752873260/notes-assets/images/Demystifying-DNS-Demo-DNS-Queries/kodekloud-devops-courses-browser-tools.jpg)

The IPv6 address observed in the browser corresponds to a AAAA record.

## Verifying DNS Records with Dig

Next, we verify the DNS information using the Dig command-line tool.

### Querying A Records (IPv4)

To retrieve the IPv4 addresses (A records) for "kodekloud.com", run the following command:

```
; <<>> DiG 9.10.6 <<>> kodekloud.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39726
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags: udp: 1232
;; QUESTION SECTION:
;kodekloud.com.            IN      A


;; ANSWER SECTION:
kodekloud.com.           27      IN      A       104.26.10.250
kodekloud.com.           27      IN      A       104.26.11.250
kodekloud.com.           27      IN      A       173.67.68.105


;; Query time: 31 msec
;; SERVER: 1.1.1.1#53(1.1.1.1)
;; WHEN: Mon Nov 04 00:11:57 CST 2024
;; MSG SIZE  rcvd: 90
```

The output displays three IPv4 addresses, indicating that any of these servers can serve the website.

### Querying AAAA Records (IPv6)

To obtain the IPv6 addresses (AAAA records) for "kodekloud.com", execute the following command:

```
; <<>> DiG 9.10.6 <<>> kodekloud.com AAAA
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 44083
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags: udp: 1232
;; QUESTION SECTION:
;kodekloud.com.            IN      AAAA


;; ANSWER SECTION:
kodekloud.com.           300     IN      AAAA    2606:4700:20::681a:bfa
kodekloud.com.           300     IN      AAAA    2606:4700:20:ac43:4469
kodekloud.com.           300     IN      AAAA    2606:4700:20::681a:afa


;; Query time: 31 msec
;; SERVER: 1.1.1.1#53(1.1.1.1)
;; WHEN: Mon Nov 04 00:13:02 CST 2024
;; MSG SIZE  rcvd: 126
```

> [!important]
> **Verification Notice**
>
> Notice that while the browser displayed a single IPv6 address, Dig shows multiple AAAA records. Identify the IPv6 record starting with "2606" and ending with "4469" to match the browser output.

## Summary

This article demonstrates how a domain name is resolved into both A records (IPv4) and AAAA records (IPv6). Initially, the browser provides a AAAA record, and using Dig, we are able to observe multiple corresponding IPv4 and IPv6 records. This exercise confirms that the DNS resolution process can deliver different record types based on varying network and system configurations.

As you progress in the course, you will explore additional DNS record types and gain deeper insights into the DNS resolution process. For further reading, check out the [Kubernetes Documentation](https://kubernetes.io/docs/) and other resources to enhance your understanding of network operations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/a983cc32-7f91-4feb-8946-eeb1cea67970/lesson/ccaea7b2-22db-4b31-be91-c22bfc73f553)**
>
> Watch video content
