# Global Accelerator - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Edge-Networks/Global-Accelerator)

---

## Table of Contents

- Global Accelerator
  - The Challenge: Internet Latency and Unpredictability
  - Introducing AWS Global Accelerator
  - Traffic Flow Example
  - Links and References
  - Watch Video
    - How It Works
    - Key Benefits
    - Global Accelerator vs. CloudFront

---

## Content

AWS Networking Fundamentals

Edge Networks

# Global Accelerator

In this lesson, we’ll dive into AWS Global Accelerator—its purpose, architecture, and how it contrasts with Amazon CloudFront. By the end, you’ll understand how Global Accelerator leverages AWS’s private backbone to reduce latency, improve throughput, and deliver a more consistent application experience.

## The Challenge: Internet Latency and Unpredictability

When your application is hosted in a North America region, a user request from anywhere in the world must:

1.  Travel from the user’s device through their ISP
2.  Traverse a variable, often congested path across the public internet
3.  Reach your application’s endpoint

Because the public internet is inherently unpredictable, you may encounter high latency, packet loss, and inconsistent performance.

## Introducing AWS Global Accelerator

AWS Global Accelerator solves these issues by assigning your application two static anycast IP addresses (or you can bring your own IP addresses). These IPs are announced from AWS edge locations in major metro areas worldwide, ensuring user traffic enters the AWS global network as close to the user as possible.

### How It Works

1.  AWS provisions two static anycast IP addresses for your accelerator.
2.  Each IP is announced from multiple AWS edge locations.
3.  A user’s request is routed to the nearest edge location using the anycast IP.
4.  From that edge, traffic travels over the AWS private global network backbone to your endpoint (Application Load Balancer, Network Load Balancer, EC2 instance, or Elastic IP).

![The image illustrates a map showing the AWS Backbone Network with various global locations marked by icons, connected by lines. It is labeled "Global Accelerator" and is copyrighted by KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752863417/notes-assets/images/AWS-Networking-Fundamentals-Global-Accelerator/aws-backbone-network-global-accelerator-map.jpg)

### Key Benefits

| Benefit                            | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| Lower, Consistent Latency          | Traffic stays on AWS’s optimized backbone, avoiding public internet hops     |
| Improved Throughput & Packet Loss  | Private network reduces congestion and retransmissions                       |
| Automatic Health Checks & Failover | Intelligent routing directs users away from unhealthy or degraded endpoints  |
| Static Anycast IPs                 | Simplify DNS management and eliminate the need for regional endpoint records |

> [!important]
> **Note**
>
> You can bring your own IP addresses (BYOIP) to Global Accelerator for seamless migration and IP ownership continuity.

## Traffic Flow Example

A client in Europe sends a request to one of your accelerator’s anycast IPs.

1.  The request is picked up by the nearest AWS edge location (e.g., Frankfurt).
2.  It rides the AWS private backbone across regions (e.g., via AWS Points of Presence).
3.  It terminates at your origin—whether that’s an Application Load Balancer in us-east-1 or a Network Load Balancer in ap-southeast-2.

### Global Accelerator vs. CloudFront

Although both services leverage AWS edge locations, their primary goals differ:

| Feature              | AWS Global Accelerator                                         | Amazon CloudFront                              |
| -------------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| Primary Use Case     | Optimize application traffic (TCP/UDP) over AWS global network | Cache and deliver static & dynamic web content |
| IP Management        | Static anycast IP addresses (or BYOIP)                         | Domain name (CNAME) & edge caches              |
| Traffic Optimization | Global anycast routing, health checks, failover                | Edge caching, origin shielding                 |
| Protocol Support     | TCP & UDP                                                      | HTTP, HTTPS, RTMP                              |
| Typical Workloads    | Gaming, VoIP, financial applications, IoT                      | Websites, video streaming, API acceleration    |

![The image is a summary slide discussing CloudFront for caching data at the edge and a global accelerator for routing users to AWS edge locations for optimized network efficiency.](https://kodekloud.com/kk-media/image/upload/v1752863418/notes-assets/images/AWS-Networking-Fundamentals-Global-Accelerator/cloudfront-caching-data-optimization-summary.jpg)

## Links and References

- [AWS Global Accelerator Documentation](https://docs.aws.amazon.com/global-accelerator/latest/api/Welcome.html)
- [Amazon CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS Networking Fundamentals](https://aws.amazon.com/architecture/networking/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/d31cb856-303b-4a11-b280-b8729906670b/lesson/c6f28481-21ea-4628-8440-93f2c28f1cf2)**
>
> Watch video content
