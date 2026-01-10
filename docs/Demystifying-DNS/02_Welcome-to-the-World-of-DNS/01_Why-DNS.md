# Why DNS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Welcome-to-the-World-of-DNS/Why-DNS)

---

## Table of Contents

- Why DNS
  - Watch Video

---

## Content

Demystifying DNS

Welcome to the World of DNS

# Why DNS

Imagine having to remember a long string of numbers every time you want to visit a website. Without DNS, instead of simply typing a memorable domain name like kodekloud.com or google.com, you’d need to input the exact IPv4 address of the hosting server. DNS (Domain Name System) translates these IP addresses into human-friendly names, making Internet navigation far more convenient.

DNS is pivotal not only for web browsing but also for supporting email services and virtually every other networked service, whether public or private. This functionality is illustrated in the diagram below:

![The image illustrates DNS use cases, including web browsing, email services, and networking services, with corresponding icons.](https://kodekloud.com/kk-media/image/upload/v1752873310/notes-assets/images/Demystifying-DNS-Why-DNS/dns-use-cases-web-email-networking.jpg)

Historically, before widespread DNS adoption, configurations like the /etc/hosts file were used to map names to IP addresses. This older method is depicted in the image below:

![The image is about DNS use cases, specifically highlighting exceptions with the "/etc/hosts" file, accompanied by an icon of documents.](https://kodekloud.com/kk-media/image/upload/v1752873311/notes-assets/images/Demystifying-DNS-Why-DNS/dns-use-cases-etc-hosts-docs.jpg)

In essence, DNS enables communication with computer services using simple names rather than complex numeric IP addresses.

> [!important]
> **Why Not Just Use IP Addresses?**
>
> While it might seem logical to use IP addresses directly, there are several important reasons for using domain names:
>
> - **Memorability:** Domain names are easier to remember than numbers.
> - **Flexibility:** IP addresses for a service can change over time due to infrastructure migrations or updates.

Consider a scenario where the IP address for a popular website like kodekloud.com changes during a migration. If you had to remember the IP address instead of the domain name, accessing the site would become a challenge. The following diagram shows how a domain like kodekloud.com can be linked to different IP addresses over time:

![The image explains the importance of DNS by showing how domain names like "kodekloud.com" can be associated with multiple IP addresses, which may change over time.](https://kodekloud.com/kk-media/image/upload/v1752873312/notes-assets/images/Demystifying-DNS-Why-DNS/dns-importance-domain-names-ip-addresses.jpg)

Imagine coming home and wanting to watch Netflix. Instead of simply entering netflix.com, you would need to remember its specific IP address. And if Netflix updated its infrastructure, you'd be forced to learn a new IP address, creating a significant inconvenience.

Another important aspect of DNS is its ability to handle the complex structure of the Internet. Modern services like Netflix often operate on multiple servers, each with different IP addresses. The diagram below emphasizes this complexity:

![The image explains the role of DNS in translating a domain name, like Netflix.com, into multiple IP addresses, highlighting the complexity of the internet.](https://kodekloud.com/kk-media/image/upload/v1752873313/notes-assets/images/Demystifying-DNS-Why-DNS/dns-domain-name-ip-addresses.jpg)

Content delivery networks and dynamic DNS systems distribute service loads across numerous IP addresses, including complicated IPv6 addresses. This distributed approach not only improves performance but also ensures that dynamic changes occur seamlessly behind the scenes. The next diagram illustrates why relying solely on static IP addresses would be impractical:

![The image illustrates the complexity of using IP and IPv6 addresses, suggesting the need for DNS. It shows an IP address, an IPv6 address, and a confused person icon.](https://kodekloud.com/kk-media/image/upload/v1752873314/notes-assets/images/Demystifying-DNS-Why-DNS/ip-ipv6-dns-illustration.jpg)

DNS simplifies the process by allowing us to use simple domain names while it handles these dynamic changes automatically.

Let’s consider the domain name kodekloud.com. In DNS terminology, the segments separated by dots are called labels. In this domain, "kodekloud" and "com" are individual labels, each indicating a different level of hierarchy. This dot-separated format shows both hierarchical and organizational distinctions: one entity might manage "kodekloud" while another is responsible for "com". This structure underpins the seamless management of complex Internet infrastructure.

By understanding DNS, we see how a simple domain name can mask the complexity of behind-the-scenes changes, ensuring that users easily access their favorite sites without needing to deal with cumbersome numeric IP addresses.

For further reading on DNS and its technical importance, consider exploring the following resources:

- [Introduction to DNS](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [How DNS Works](https://www.geeksforgeeks.org/dns-domain-name-system/)

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/a983cc32-7f91-4feb-8946-eeb1cea67970/lesson/a3ac64ad-6c8a-4746-b895-ad05fce363ea)**
>
> Watch video content
