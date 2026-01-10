# DNS Resolvers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/DNS-as-a-System/DNS-Resolvers)

---

## Table of Contents

- DNS Resolvers
  - Public and Private Resolvers
  - The Critical Role of Caching
  - Conclusion
  - Watch Video

---

## Content

Demystifying DNS

DNS as a System

# DNS Resolvers

DNS resolvers are the unsung heroes of the internet, acting as detectives that translate human-friendly domain names into machine-readable IP addresses. In this article, we explore how DNS resolvers work, their role in ensuring efficient internet communication, and practical scenarios that demonstrate their functionality.

DNS resolvers work by "walking the DNS tree." When a query is made, the resolver starts at the root zone nameserver and follows the chain through subsequent top-level domain (TLD) nameservers until reaching the authoritative nameserver for the queried domain. This hierarchical approach ensures that each query is resolved step by step.

![The image illustrates the process of "Walking the DNS Tree," showing the hierarchical structure of domain name resolution from the root zone to third-level domains, involving nameservers and a resolver.](https://kodekloud.com/kk-media/image/upload/v1752873162/notes-assets/images/Demystifying-DNS-DNS-Resolvers/walking-dns-tree-domain-resolution.jpg)

Consider a scenario where you have developed a Python application that you want to deploy publicly. You could use a service like DigitalOcean to set up a Linux virtual machine (droplet) hosting your application. DigitalOcean assigns a public IP address to your droplet, and to make your application accessible via a friendly domain name (for example, myawesomeapp.xyz), you would configure an A record on the nameservers associated with your domain.

![The image is a flowchart illustrating the deployment of a Python application using DigitalOcean and a Linux VM (Droplet), showing interactions between users, a domain, and DNS records.](https://kodekloud.com/kk-media/image/upload/v1752873165/notes-assets/images/Demystifying-DNS-DNS-Resolvers/python-deployment-flowchart-digital-ocean.jpg)

Entities such as IANA manage the root zone nameservers, while organizations like VeriSign are responsible for TLD zones such as .COM. However, the nameservers for your domain are determined by the provider you choose.

## Public and Private Resolvers

Who operates these essential DNS resolvers? Major organizations including Google, Cloudflare, and Quad9 provide public resolvers that are available globally. Additionally, many Internet Service Providers (ISPs) run their own resolvers. For example, in Mexico, ISPs like Telmex assign private resolvers to users automatically upon connecting to the internet.

![The image categorizes types of DNS resolvers into public and private, listing Google, Cloudflare, and Quad9 as public resolvers, and Telmex as a private resolver.](https://kodekloud.com/kk-media/image/upload/v1752873166/notes-assets/images/Demystifying-DNS-DNS-Resolvers/dns-resolvers-public-private-categories.jpg)

Different resolvers can exhibit varying performance, which may be benchmarked with tools such as dnsperf.com. Although most devices default to the resolver provided by the ISP, users have the flexibility to change the settings. On Linux systems, resolver configurations are stored in the `/etc/resolv.conf` file, where alternative nameservers can be specified.

![The image illustrates a resolver configuration process on a Linux system, showing the interaction between the system, a resolver, and a nameserver via the `/etc/resolv.conf` file.](https://kodekloud.com/kk-media/image/upload/v1752873167/notes-assets/images/Demystifying-DNS-DNS-Resolvers/resolver-configuration-linux-system.jpg)

> [!important]
> **Using Alternate Resolvers**
>
> If you want to test a different resolver temporarily without changing your system settings, you can use the `dig` command. This command helps troubleshoot DNS issues and compare performance between different resolvers.

For example, to query Google's public DNS resolver (8.8.8.8) for the domain "kodekloud.com," type:

```
$ dig @8.8.8.8 kodekloud.com
```

This query directs the request to an alternative resolver, offering a quick way to validate DNS behavior and performance.

## The Critical Role of Caching

One of the primary roles of DNS resolvers is to improve query speeds through caching. Without resolvers caching responses, every DNS request would directly hit the authoritative nameservers, potentially overwhelming them with millions of simultaneous queries.

Resolvers cache DNS records—much like a detective referencing a notebook of previous cases. If a resolver has recently acquired a record (for example, for google.com), it uses the cached entry to quickly provide the answer, significantly reducing lookup times.

![The image is a diagram illustrating the role of a DNS resolver in speeding up DNS queries by interacting with multiple nameservers.](https://kodekloud.com/kk-media/image/upload/v1752873168/notes-assets/images/Demystifying-DNS-DNS-Resolvers/dns-resolver-speeding-queries-diagram.jpg)

![The image illustrates a DNS cache mechanism process, showing how a resolver uses cached DNS records to respond to queries without contacting nameservers again.](https://kodekloud.com/kk-media/image/upload/v1752873169/notes-assets/images/Demystifying-DNS-DNS-Resolvers/dns-cache-mechanism-process.jpg)

> [!important]
> **Benefits of DNS Caching**
>
> DNS caching not only speeds up query responses but also reduces the load on authoritative nameservers, leading to a more resilient and efficient internet infrastructure.

## Conclusion

DNS resolvers play a pivotal role in the functioning of the internet by converting domain names into IP addresses using hierarchical queries and efficient caching. Their capability to distribute queries and reduce the load on authoritative nameservers ensures that the internet remains fast and reliable.

For further learning, consider exploring more about DNS and its related technologies via resources like [Kubernetes Documentation](https://kubernetes.io/docs/) or [Docker Hub](https://hub.docker.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/2471fe18-5c6b-44e1-b0a5-0a1c6a3ac282/lesson/c7292425-c3c3-4384-9f77-a90d1b44b750)**
>
> Watch video content
