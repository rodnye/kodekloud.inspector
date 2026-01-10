# GeoDNS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/DNS-as-a-System/GeoDNS)

---

## Table of Contents

- GeoDNS
  - Geographical Distribution
  - Server Health and Operational Status
  - DNS Requests, EDNS, and the Client Subnet
  - A Practical Example: Streaming with Netflix
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Demystifying DNS

DNS as a System

# GeoDNS

In today’s global internet landscape, traditional DNS resolution must evolve to serve billions of users with fast and reliable connections. GeoDNS is a pivotal enhancement that routes DNS requests based on the user's geographical location and server health, ensuring optimal performance and availability.

GeoDNS extends the standard DNS infrastructure by analyzing the origin IP address of a request to determine its location. Major providers such as Cloudflare and Amazon Route 53 utilize GeoDNS to consider factors like geographical proximity and the operational status of target servers before routing requests. The sections below dive deeper into these factors.

![The image is a diagram illustrating a sophisticated load-balancing strategy using GeoDNS, considering geographical proximity and the status of the service.](https://kodekloud.com/kk-media/image/upload/v1752873171/notes-assets/images/Demystifying-DNS-GeoDNS/geodns-load-balancing-strategy-diagram.jpg)

## Geographical Distribution

In globally distributed systems, Content Delivery Networks (CDNs) play a critical role. Think of a CDN like a worldwide chain of McDonald’s restaurants: rather than serving the entire world from one location, thousands of outlets are positioned to meet local demand. Companies like Akamai leverage globally dispersed servers to cache frequently accessed content, significantly reducing content delivery delays.

![The image illustrates a Content Delivery Network (CDN) process, showing the flow from a source to a global network and then to a user, highlighting the reduction in content delivery time.](https://kodekloud.com/kk-media/image/upload/v1752873172/notes-assets/images/Demystifying-DNS-GeoDNS/cdn-content-delivery-process-illustration.jpg)

![The image is a diagram explaining a Content Delivery Network (CDN), highlighting Akamai as an example, which maintains servers worldwide to store cached copies of frequently accessed content.](https://kodekloud.com/kk-media/image/upload/v1752873173/notes-assets/images/Demystifying-DNS-GeoDNS/cdn-diagram-akamai-servers.jpg)

## Server Health and Operational Status

GeoDNS is not solely about geography; it also factors in the health and capacity of servers. When a user visits a website, such as KodeKloud.com, GeoDNS checks all available servers. If the nearest server is experiencing issues or is overloaded, the system seamlessly routes the request to the next best available option.

> **How It Works**
>
> This process is analogous to choosing an alternative McDonald’s restaurant when your nearest outlet is closed for maintenance. GeoDNS ensures that users are always connected to a reliable server.

![The image illustrates a user connecting to servers around the globe, with a focus on ensuring reliability by connecting to capable servers.](https://kodekloud.com/kk-media/image/upload/v1752873174/notes-assets/images/Demystifying-DNS-GeoDNS/user-connecting-global-servers-reliability.jpg)

## DNS Requests, EDNS, and the Client Subnet

DNS functions as both a protocol and a distributed system. Recognizing future needs, the original DNS protocol designers included unused bits in the request-response structure. These gaps later paved the way for Extensions for DNS (EDNS), which introduced the client subnet field. This field provides critical location data to nameservers, enabling GeoDNS to direct traffic more accurately.

Without EDNS client subnet information, a request from a user in Thailand might be served by a distant resolver in the United States, leading to suboptimal performance.

![The image explains the development of EDNS (Extensions for DNS) and its role in telling nameservers where requests originate, highlighting unused protocol bits from the 1980s.](https://kodekloud.com/kk-media/image/upload/v1752873177/notes-assets/images/Demystifying-DNS-GeoDNS/edns-development-nameserver-role.jpg)

![The image illustrates the process of DNS queries with and without EDNS client subnet, showing how it informs nameservers of the request's origin. It includes a flow from a client to a resolver and nameserver, with responses from the US and Thailand.](https://kodekloud.com/kk-media/image/upload/v1752873179/notes-assets/images/Demystifying-DNS-GeoDNS/dns-queries-edns-client-subnet.jpg)

## A Practical Example: Streaming with Netflix

Consider a user in Sweden who wants to watch Netflix. When the user types “netflix.com”, the DNS request first reaches a resolver provided by their ISP or a public service like Google’s 8.8.8.8. Utilizing the client subnet information, Netflix’s nameservers can immediately determine the request’s origin.

Netflix operates multiple servers across Europe, including locations in Stockholm, Amsterdam, and Frankfurt. GeoDNS evaluates various factors:

- Current server capacity
- Network conditions (such as congestion in a particular data center)
- Cache status of country-specific content

This sophisticated load-balancing strategy ensures that users receive the best possible streaming quality based on real-time data.

![The image is a flowchart illustrating the process of a DNS request for Netflix, showing the interaction between a client, DNS resolver, and Netflix's nameservers, with a focus on a request from a Swedish network.](https://kodekloud.com/kk-media/image/upload/v1752873180/notes-assets/images/Demystifying-DNS-GeoDNS/dns-request-netflix-flowchart.jpg)

![The image illustrates a load balancing system for streaming services, showing how GeoDNS and load balancers decide the best region and server for optimal streaming, ensuring smooth service worldwide.](https://kodekloud.com/kk-media/image/upload/v1752873181/notes-assets/images/Demystifying-DNS-GeoDNS/load-balancing-streaming-services-diagram.jpg)

## Conclusion

GeoDNS brings a transformative approach to traditional DNS by dynamically selecting servers based on geographical proximity and performance metrics. By leveraging EDNS and real-time server health checks, GeoDNS ensures that users receive fast, reliable, and geographically optimized service every time they connect.

For more insights into DNS, GeoDNS, and related technologies, explore additional resources and guides to further enhance your understanding of modern internet infrastructure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/2471fe18-5c6b-44e1-b0a5-0a1c6a3ac282/lesson/afe4e209-fe82-41f0-a43f-5fc911f9d6c1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/demystifying-dns/module/2471fe18-5c6b-44e1-b0a5-0a1c6a3ac282/lesson/3f208afc-f203-4573-bd5e-8e355dfd4baa)**
>
> Practice lab
