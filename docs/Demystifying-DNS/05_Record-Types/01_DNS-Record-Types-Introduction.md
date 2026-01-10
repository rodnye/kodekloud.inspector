# DNS Record Types Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Record-Types/DNS-Record-Types-Introduction)

---

## Table of Contents

- DNS Record Types Introduction
  - Installing BIND9
  - Checking and Starting the BIND9 Service
  - Watch Video

---

## Content

Demystifying DNS

Record Types

# DNS Record Types Introduction

This article offers a practical, learn-by-doing session on implementing common DNS records using a BIND9 DNS server. In this demo, we will utilize a two-machine setup:

- **Node-01:** Configured as the BIND9 DNS server.
- **Node-02:** Hosts a web server (e.g., Nginx) to demonstrate real-world DNS resolution.

This environment simulates how a DNS server and a web server interact, allowing you to experiment locally without impacting production systems.

![The image illustrates DNS record types, showing a BIND9 server (DNS server) labeled as node01 and an Nginx server (web server) labeled as node02, with corresponding logos.](https://kodekloud.com/kk-media/image/upload/v1752873250/notes-assets/images/Demystifying-DNS-DNS-Record-Types-Introduction/dns-record-types-bind9-nginx.jpg)

> [!important]
> **Note**
>
> In this guide, the DNS server is configured for local experimentation only, ensuring that any configuration errors do not affect live internet services.

## Installing BIND9

Begin by installing BIND9 along with its utilities and documentation. Run the following command:

```
sudo apt update && sudo apt install bind9 bind9utils bind9-doc -y
```

After installation, proceed to verify that the BIND9 service is operational.

## Checking and Starting the BIND9 Service

To check the current status of the BIND9 service, execute:

```
systemctl status named
```

A typical output might look like this:

```
● named.service - BIND Domain Name Server
  Loaded: loaded (/lib/systemd/system/named.service; enabled; vendor preset: enabled)
  Active: inactive (dead)
  Docs: man:named(8)
```

> [!important]
> **Warning**
>
> If the service status shows it as inactive (dead), make sure to start the service using the command provided below.

To start the BIND9 service, run:

```
sudo systemctl start named
```

After starting the service, check its status again to confirm that BIND9 is now active and running.

With BIND9 installed, configured, and running, you can now proceed with further configurations and tests to explore how DNS resolution operates in our dual-machine setup.

For more insights on DNS best practices and configurations, refer to our detailed documentation and additional resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/57433009-69d5-4b38-8c58-dde5c3354c62/lesson/ca462dd8-5d6b-4a4c-951f-e8392d44a13a)**
>
> Watch video content
