# DNS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Networking/DNS)

---

## Table of Contents

- DNS
  - Hostname Resolution with the Local Hosts File
  - Transitioning to Centralized DNS
  - Public DNS Resolution and Domain Hierarchy
  - Internal Domain Resolution and Search Domains
  - DNS Record Types and Diagnostic Tools
  - Watch Video
  - Practice Lab

---

## Content

Learning Linux Basics Course & Labs

Networking

# DNS

In this article, we explore the Domain Name System (DNS)—a critical component in modern networking infrastructure. We will begin with a hands-on lab example, discuss basic networking concepts (including switching, routing, and gateways), and then apply troubleshooting techniques to determine why a software repository URL might be inaccessible.

---

## Hostname Resolution with the Local Hosts File

Imagine two computers on the same network, Computer A and Computer B, with IP addresses 192.168.1.10 and 192.168.1.11 respectively. To test connectivity, you can run a ping command using the IP address:

```
[~]$ ping 192.168.1.11
Reply from 192.168.1.11: bytes=32 time=4ms TTL=117
Reply from 192.168.1.11: bytes=32 time=4ms TTL=117
```

Suppose system B provides database services. Instead of remembering its IP address, you decide to assign it an alias (e.g., db). Initially, if you ping “db”, Computer A will not recognize the name. To resolve this, append an entry in system A’s `/etc/hosts` file mapping the IP address to the alias:

```
[~]$ cat >> /etc/hosts
192.168.1.11    db
```

After adding the entry, the ping command uses the mapping from the hosts file:

```
[~]$ ping db
PING db (192.168.1.11) 56(84) bytes of data.
64 bytes from db (192.168.1.11): icmp_seq=1 ttl=64 time=0.052 ms
64 bytes from db (192.168.1.11): icmp_seq=2 ttl=64 time=0.079 ms
```

Remember, the local `/etc/hosts` file is the definitive source of hostname-to-IP mappings for that system. The system does not verify whether system B’s actual hostname matches the alias you defined. In fact, you can misdirect traffic by associating an unrelated name with the same IP address:

```
[~]$ cat >> /etc/hosts
192.168.1.11    db
192.168.1.11    www.google.com
```

When you ping either alias, the traffic is directed to the same IP address:

```
[~]$ ping db
PING db (192.168.1.11) 56(84) bytes of data.
64 bytes from db (192.168.1.11): icmp_seq=1 ttl=64 time=0.052 ms
64 bytes from db (192.168.1.11): icmp_seq=2 ttl=64 time=0.079 ms

[~]$ ping www.google.com
PING www.google.com (192.168.1.11) 56(84) bytes of data.
64 bytes from www.google.com (192.168.1.11): icmp_seq=1 ttl=64 time=0.052 ms
64 bytes from www.google.com (192.168.1.11): icmp_seq=2 ttl=64 time=0.079 ms
```

Every command—whether `ping`, `ssh`, or `curl`—first checks the local `/etc/hosts` file for IP address mappings. This process of translating a hostname to an IP address is known as name resolution.

---

## Transitioning to Centralized DNS

In smaller networks, managing host entries with individual `/etc/hosts` files might be sufficient:

```
[~]$ cat >> /etc/hosts
192.168.1.10 web
192.168.1.11 db
192.168.1.12 nfs
```

However, as the environment expands, updating every system becomes impractical—especially when IP addresses change frequently. Here, centralized DNS offers an efficient alternative. With a DNS server in place, all hosts are configured to query a single point for hostname resolution rather than relying solely on local files.

For instance, you might have a centralized list of hosts:

```
192.168.1.10  web
192.168.1.11  db
192.168.1.12  nfs
192.168.1.20  web
192.168.1.21  db-1
192.168.1.22  nfs-1
192.168.1.30  web-2
192.168.1.31  db-2
192.168.1.32  nfs-2
192.168.1.40  web-2
192.168.1.41  sql
192.168.1.42  web-5
192.168.1.50  web-test
192.168.1.51  db-prod
192.168.1.52  nfs-4
192.168.1.60  web-3
192.168.1.61  db-test
192.168.1.62  nfs-prod
```

To have all systems use the centralized DNS server (assumed to be at 192.168.1.100), update each system’s `/etc/resolv.conf` file:

```
[~]$ cat /etc/resolv.conf
nameserver 192.168.1.100
```

Once set, if a hostname cannot be resolved locally, the system forwards the request to the DNS server. This centralization dramatically simplifies managing IP address changes since updates need to be made only on the DNS server.

> [!important]
> **Local vs. Centralized Resolution**
>
> Local `/etc/hosts` entries remain effective for names that do not need to be shared network-wide. They take precedence over DNS records as configured in `/etc/nsswitch.conf`:
>
> ```
> [~]$ cat /etc/nsswitch.conf
> ...
> hosts:          files dns
> ...
> ```

For example, to set up a test server that is locally resolved only:

```
[~]$ cat >> /etc/hosts
192.168.1.115 test
```

And test its resolution:

```
[~]$ ping test
PING test (192.168.1.115) 56(84) bytes of data.
64 bytes from test (192.168.1.115): icmp_seq=1 ttl=64 time=0.052 ms
64 bytes from test (192.168.1.115): icmp_seq=2 ttl=64 time=0.079 ms
```

If a hostname is not defined locally or on the DNS server, resolution will fail:

```
[~]$ ping www.facebook.com
ping: www.facebook.com: Temporary failure in name resolution
```

To resolve external domains, you can set your internal DNS server to forward queries to a public nameserver such as Google’s 8.8.8.8, or adjust your system configuration accordingly.

---

## Public DNS Resolution and Domain Hierarchy

When pinging external sites like www.facebook.com, you'll notice the inclusion of top-level domains (TLDs), such as .com. Public DNS relies on fully qualified domain names (FQDNs) structured hierarchically.

For example, consider Google. Its domain hierarchy is organized as follows:

- The root (denoted by a dot)
- Top-Level Domain (.com, .net, .org, etc.)
- Subdomains (e.g., maps.google.com, mail.google.com)

![The image illustrates the hierarchy of domain names, showing root, top-level domain (.com), and subdomains (mail, drive, www, maps, apps) under "google".](https://kodekloud.com/kk-media/image/upload/v1752881123/notes-assets/images/Learning-Linux-Basics-Course-Labs-DNS/frame_650.jpg)

When a request such as apps.google.com is made, your organization's DNS server will forward the query if it does not have a record for it:

1.  A root DNS server directs the request to a DNS server responsible for the .com domain.
2.  The .com DNS server forwards the request to Google’s DNS server.
3.  Google’s DNS server returns the IP address for the service.

Internal caching is commonly used to optimize performance, with results stored from a few seconds to several minutes.

![The image illustrates the DNS resolution process for "apps.google.com," showing the hierarchy from organizational DNS to IP address 216.58.221.78.](https://kodekloud.com/kk-media/image/upload/v1752881125/notes-assets/images/Learning-Linux-Basics-Course-Labs-DNS/frame_740.jpg)

---

## Internal Domain Resolution and Search Domains

Organizations often implement an internal hierarchical structure similar to public DNS. For instance, a company might use the domain mycompany.com with various subdomains for different services:

- External website: www.mycompany.com
- Email server: mail.mycompany.com
- Storage: drive.mycompany.com
- Payroll: pay.mycompany.com
- Human Resources: hr.mycompany.com

These records are centrally managed on your internal DNS server.

![The image illustrates a domain structure with "mycompany.com" and subdomains like nfs, web, mail, drive, www, pay, hr, and sql, under "Org DNS."](https://kodekloud.com/kk-media/image/upload/v1752881126/notes-assets/images/Learning-Linux-Basics-Course-Labs-DNS/frame_800.jpg)

You can simplify local hostname resolution by configuring search domains in your `/etc/resolv.conf` file. This allows short names (e.g., "web") to automatically be expanded to their fully qualified domain names (e.g., "web.mycompany.com"). For example:

```
[~]$ cat >> /etc/resolv.conf
nameserver 192.168.1.100
search mycompany.com
```

Now, when you run:

```
[~]$ ping web
```

The system interprets “web” as “web.mycompany.com”:

```
[~]$ ping web
PING web.mycompany.com (192.168.1.10) 56(84) bytes of data.
64 bytes from web.mycompany.com (192.168.1.10): icmp_seq=1 ttl=64 time=0.052 ms
64 bytes from web.mycompany.com (192.168.1.10): icmp_seq=2 ttl=64 time=0.079 ms
```

Multiple search domains can also be specified:

```
[~]$ cat >> /etc/resolv.conf
nameserver 192.168.1.100
search mycompany.com prod.mycompany.com
```

When you use a short hostname, the system will sequentially append each search domain until a valid match is found.

---

## DNS Record Types and Diagnostic Tools

DNS servers store various types of records. The most common include:

- **A records**: Map hostnames to IPv4 addresses.
- **AAAA records**: Map hostnames to IPv6 addresses.
- **CNAME records**: Create an alias that maps one hostname to another. This is useful when a service is accessible by multiple names.

For example, a food delivery service might be accessible via aliases such as “eat” or “hungry” by using a CNAME record.

![The image shows DNS record types: A, AAAA, and CNAME, with examples of corresponding domain names and IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752881127/notes-assets/images/Learning-Linux-Basics-Course-Labs-DNS/frame_970.jpg)

To troubleshoot DNS resolution without interference from local `/etc/hosts` entries, you can use diagnostic tools such as `nslookup` and `dig`. For example, the `nslookup` command directly queries your DNS server:

```
[~]$ nslookup www.google.com
Server:
Address:

Non-authoritative answer:
Name:    www.google.com
Address: 172.217.0.132
```

Similarly, `dig` provides detailed output of the DNS records:

```
[~]$ dig www.google.com
;; <<>> DiG 9.10.3-P4-Ubuntu <<>> www.google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 28065
;; flags: qr rd ra; QUERY: 1, ANSWER: 6, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;www.google.com.            IN      A

;; ANSWER SECTION:
www.google.com.       245     IN      A       64.233.177.103
www.google.com.       245     IN      A       64.233.177.105
www.google.com.       245     IN      A       64.233.177.147
www.google.com.       245     IN      A       64.233.177.106
www.google.com.       245     IN      A       64.233.177.104
www.google.com.       245     IN      A       64.233.177.99

;; Query time: 5 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Sun Mar 24 04:34:33 UTC 2019
;; MSG SIZE  rcvd: 139
```

In the upcoming practice exercises, you will work through hands-on labs focused on viewing, configuring, and troubleshooting DNS in a lab environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/beae84be-64d2-41b6-b807-575f4107dfc9/lesson/8e0ed154-45ec-4b40-92e2-80167da32dc8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/beae84be-64d2-41b6-b807-575f4107dfc9/lesson/6d17b286-b673-4733-aede-7e9827973306)**
>
> Practice lab
