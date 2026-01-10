# Other Records txt srv ptr - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Record-Types/Other-Records-txt-srv-ptr)

---

## Table of Contents

- Other Records txt srv ptr
  - TXT Records
  - SRV Records
  - PTR Records
  - Watch Video

---

## Content

Demystifying DNS

Record Types

# Other Records txt srv ptr

DNS offers a variety of record types for different purposes. In this lesson, we explore three additional DNS record types: TXT, SRV, and PTR records, each serving unique roles in domain management and service discovery.

## TXT Records

TXT records were initially created to hold human-readable notes but have since evolved into versatile machine-readable data carriers. They are often used to verify domain ownership and authorize various services, such as 1Password, Google Site Verification, and email services secured by SPF (Sender Policy Framework).

To request a TXT record for a domain, you can use the dig command with the TXT option. Think of TXT records as digital sticky notes indicating that "the owner of this domain approves this service." Below is an example of how TXT records for kubernetes.io might appear:

```
$ dig kubernetes.io TXT
; <<>> DiG 9.10.6 <<>> kubernetes.io TXT
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 54797
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 0


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;kubernetes.io.       IN TXT


;; ANSWER SECTION:
kubernetes.io. 3600 IN TXT "1password-site-verification=SOZCTQ66DFFXVGPOWOHMVDIBVI"
kubernetes.io. 3600 IN TXT "google-site-verification=qmfdQyHjWJBL78F9saApyW0VFRyymuSMpqMn8gtGmd0"
kubernetes.io. 3600 IN TXT "google-site-verification=oPORCoq9XU6CmaR7G_bV00CLmEz-wLGOL7XpeEuTt8"
kubernetes.io. 3600 IN TXT "v=spf1 include:_spf.google.com mail.kubernetes.io ~all"


;; Query time: 192 msec
;; SERVER: 2806:10c0:ffff:e::53(2806:10c0:ffff::e)
;; WHEN: Mon Jan 20 00:24:23 CST 2025
;; MSG SIZE  rcvd: 338
```

In this example, the TXT records not only verify domain ownership for services like 1Password and Google, but the SPF record also restricts email sending to authorized servers, thereby reducing spoofing risks.

## SRV Records

SRV records are essential for service discovery as they map specific services to a domain. These records act like digital pins on a map, indicating where a given service is running and how to connect to it. For example, in Kubernetes clusters, SRV records help pods locate and communicate with other services. Whenever services are created, modified, or removed via the Kubernetes API, CoreDNS automatically updates its SRV records, ensuring accurate service resolution.

Below is an example SRV record that helps locate a web server service:

```
_service_._protocol.name    TTL  class  SRV  priority weight port target
_http._tcp.webserver.default.svc.cluster.local. 30 IN SRV 0 100 8080 webserver.default.svc.cluster.local.
```

The diagram below visually represents how SRV records facilitate service discovery:

![The image explains different DNS record types, highlighting SRV records as facilitating service discovery, with a visual of a map and location pin.](https://kodekloud.com/kk-media/image/upload/v1752873254/notes-assets/images/Demystifying-DNS-Other-Records-txt-srv-ptr/dns-record-types-srv-service-discovery.jpg)

Additionally, observe how CoreDNS interacts with the Kubernetes API and cluster components:

![The image is a diagram showing the interaction between CoreDNS, an API, and Kubernetes components like pods and services. It illustrates the flow of information from CoreDNS to Kubernetes services through the API.](https://kodekloud.com/kk-media/image/upload/v1752873255/notes-assets/images/Demystifying-DNS-Other-Records-txt-srv-ptr/coredns-kubernetes-interaction-diagram.jpg)

> [!important]
> **Further Exploration**
>
> If you’re interested in a deeper exploration of Kubernetes service discovery with SRV records, let us know for a future lesson.

## PTR Records

PTR records, also known as pointer records, are used for reverse DNS lookups. Unlike a standard DNS query that maps a domain name to its IP address, a reverse DNS lookup finds the domain name associated with a given IP address. The dig command with the -x flag is used for this purpose.

Consider the following example where a reverse DNS lookup is performed for the IP address 8.8.8.8:

```
$ dig -x 8.8.8.8
; <<>> DiG 9.10.6 <<>> -x 8.8.8.8
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 50989
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;8.8.8.8.in-addr.arpa.    IN PTR


;; ANSWER SECTION:
8.8.8.8.in-addr.arpa. 12215 IN PTR dns.google.


;; Query time: 22 msec
;; SERVER: 2806:10c0::ffff:e#53(2806:10c0:ffff:e)
;; WHEN: Mon Jan 20 00:55:29 CST 2025
;; MSG SIZE  rcvd: 73
```

In a reverse DNS lookup, the IP address is reversed and appended to the .arpa top-level domain. For clarity, the following diagram explains this process, highlighting that while domain names are read left to right, IP addresses are processed from right to left for reverse mapping:

![The image explains how IP addresses are read from right to left, while domain names are read from left to right, and provides a step for performing a reverse DNS lookup by reversing the IP address.](https://kodekloud.com/kk-media/image/upload/v1752873256/notes-assets/images/Demystifying-DNS-Other-Records-txt-srv-ptr/ip-address-reverse-dns-lookup.jpg)

The reverse mapping continues with queries to subdomains until an authoritative answer is returned. In our example, the PTR record confirms that 8.8.8.8 maps to dns.google. You can validate this result by querying the A records of dns.google.com.

It is important to note that PTR records are created like any other DNS records within your hosted zone (using services such as Route 53, Cloudflare, or another registrar). However, you must own the IP address to create a PTR record. PTR records are most effective for static IP addresses since web applications relying on dynamic IP addresses might face limitations.

![The image provides information about PTR records, including their creation, ownership requirements, use with static IPs, and limitations for web apps with dynamic IPs.](https://kodekloud.com/kk-media/image/upload/v1752873258/notes-assets/images/Demystifying-DNS-Other-Records-txt-srv-ptr/ptr-records-information-static-dynamic.jpg)

> [!important]
> **Important Note**
>
> Ensure that you have control over the IP addresses when setting up PTR records, as this is crucial for proper reverse DNS lookups and service authorization.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/57433009-69d5-4b38-8c58-dde5c3354c62/lesson/3912db61-e91c-4e3f-91fd-bf79c748c05d)**
>
> Watch video content
