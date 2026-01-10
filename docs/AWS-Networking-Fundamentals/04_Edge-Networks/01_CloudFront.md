# CloudFront - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Edge-Networks/CloudFront)

---

## Table of Contents

- CloudFront
  - The Latency Challenge
  - What Is CloudFront?
  - Core Components
  - Origin Interaction Examples
  - Cache Expiration (TTL)
  - Cache Invalidation
  - Origin Groups for High Availability
  - Logging and Monitoring
  - Summary of CloudFront Features
  - Links and References
  - Watch Video
    - Distribution Workflow
    - S3 Bucket as Origin
    - Custom HTTP Backend

---

## Content

AWS Networking Fundamentals

Edge Networks

# CloudFront

In this lesson, we dive into Amazon CloudFront—a powerful Content Delivery Network (CDN) that reduces latency and accelerates both static and dynamic content. Learn how edge caching, TTL management, and origin failover work together to deliver fast, reliable experiences for users worldwide.

## The Latency Challenge

When your web application resides in a single AWS Region (for example, us-east-1 in New York), users nearby see quick responses, but those thousands of miles away suffer high round-trip times. Slow page loads, video buffering, and large downloads frustrate end users.

![The image shows a world map illustrating global content delivery and edge locations, with a central web server connected to various points around the globe.](https://kodekloud.com/kk-media/image/upload/v1752863400/notes-assets/images/AWS-Networking-Fundamentals-CloudFront/global-content-delivery-map-illustration.jpg)

By deploying dozens of **edge locations** around the globe, CloudFront brings content closer to your users, slashing latency and improving performance.

## What Is CloudFront?

Amazon CloudFront is AWS’s global CDN service. It delivers your web assets—HTML, CSS, JavaScript, images, videos, APIs, and dynamic content—via a worldwide network of edge caches. Instead of every user request going back to your origin server, CloudFront routes traffic to the nearest edge location.

![The image is a diagram showing Amazon CloudFront distributing content from an S3 Bucket for static content and Amazon Lightsail or an Application Load Balancer for dynamic content.](https://kodekloud.com/kk-media/image/upload/v1752863400/notes-assets/images/AWS-Networking-Fundamentals-CloudFront/cloudfront-s3-bucket-lightsail-diagram.jpg)

> [!important]
> **Note**
>
> Using CloudFront for both static and dynamic assets improves load times, reduces origin load, and can lower data transfer costs.

## Core Components

| Component         | Description                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------- |
| **Origin**        | The source of your content: S3 bucket, EC2/On-Prem HTTP server, Elastic Load Balancer, etc. |
| **Distribution**  | Configuration that links one or more origins to CloudFront; provides a unique domain name.  |
| **Edge Location** | A global cache point where CloudFront stores and serves your objects.                       |

### Distribution Workflow

![The image illustrates the architecture of CloudFront, showing the flow of data from users to a distribution configuration, which is connected to an origin server and multiple edge locations.](https://kodekloud.com/kk-media/image/upload/v1752863402/notes-assets/images/AWS-Networking-Fundamentals-CloudFront/cloudfront-architecture-data-flow-diagram.jpg)

1.  User requests content from your `*.cloudfront.net` domain.
2.  CloudFront routes to the nearest edge location.
3.  **Cache Hit**: Edge returns the object immediately.
4.  **Cache Miss**: Edge fetches from the origin, caches the response, then serves the user.

## Origin Interaction Examples

### S3 Bucket as Origin

![The image illustrates the process of CloudFront interacting with an S3 bucket, showing how requests are handled through edge locations, checking for cache, and fetching from the origin if needed.](https://kodekloud.com/kk-media/image/upload/v1752863403/notes-assets/images/AWS-Networking-Fundamentals-CloudFront/cloudfront-s3-bucket-interaction-diagram.jpg)

- **User → CloudFront edge**
- **Edge: cache hit** → serve directly
- **Edge: cache miss** → fetch from S3 → cache → serve

### Custom HTTP Backend

![The image is a diagram illustrating the process of a request being sent to CloudFront, which then fetches a response from a custom HTTP backend.](https://kodekloud.com/kk-media/image/upload/v1752863404/notes-assets/images/AWS-Networking-Fundamentals-CloudFront/cloudfront-request-response-diagram.jpg)

- **User → CloudFront edge**
- **Edge: cache hit** → serve content
- **Edge: cache miss** → fetch from your HTTP server → cache → serve

## Cache Expiration (TTL)

Each cached object at an edge location lives for its **Time To Live (TTL)**. Once TTL expires, the object is evicted and a new request triggers an origin fetch.

![The image is an informational slide about CloudFront Time to Live (TTL), explaining that cached content remains for a set time, with a default TTL of 24 hours, and can be set to expire at specific times.](https://kodekloud.com/kk-media/image/upload/v1752863405/notes-assets/images/AWS-Networking-Fundamentals-CloudFront/cloudfront-ttl-cached-content-info.jpg)

- Default TTL: 24 hours
- Customize per object or set absolute expiration timestamps

> [!important]
> **Warning**
>
> Serving stale content is possible if TTL is too long. Tune your Cache-Control headers carefully to balance freshness and performance.

## Cache Invalidation

Updating assets before their TTL expires requires explicit **cache invalidation**. Otherwise, edge locations will continue to serve the old version.

![The image illustrates the concept of cache invalidation, showing how content cached at edge locations can be invalidated, with a TTL of 24 hours, and the potential issue of receiving outdated content.](https://kodekloud.com/kk-media/image/upload/v1752863406/notes-assets/images/AWS-Networking-Fundamentals-CloudFront/cache-invalidation-edge-locations-ttl.jpg)

**Invalidation process**

1.  Submit invalidation for the object path (e.g., `/images/logo.png`).
2.  Edge caches remove the object.
3.  Next request → origin fetch → cache updated → user gets the new version.

## Origin Groups for High Availability

CloudFront **origin groups** let you specify a primary and secondary origin. If the primary fails (for example, 5xx errors or timeouts), CloudFront automatically retries against the secondary, ensuring uninterrupted service.

## Logging and Monitoring

CloudFront can publish detailed logs to Amazon S3, Amazon CloudWatch Logs, or third-party analytics tools. Logs include:

- Request timestamp
- Client IP address
- Requested object and HTTP method
- Response status code

![The image illustrates the flow of CloudFront logs, showing interactions between users, CloudFront, and the origin, with logs being sent to CloudWatch. It also lists details captured in the logs, such as request time, IP address, and response status.](https://kodekloud.com/kk-media/image/upload/v1752863407/notes-assets/images/AWS-Networking-Fundamentals-CloudFront/cloudfront-logs-flow-diagram.jpg)

## Summary of CloudFront Features

- **Global CDN**: Edge caching for low-latency delivery
- **Flexible Origins**: S3, HTTP servers, load balancers
- **Distributions**: Custom configuration with domain name
- **TTL & Invalidation**: Fine-grained cache control
- **Origin Groups**: Automatic failover for high availability
- **Logging**: Insights into traffic patterns and errors

## Links and References

- [Amazon CloudFront Developer Guide](https://docs.aws.amazon.com/cloudfront/latest/DeveloperGuide/Introduction.html)
- [AWS CDN Solutions](https://aws.amazon.com/cloudfront/)
- [AWS CLI: create-distribution](https://docs.aws.amazon.com/cli/latest/reference/cloudfront/create-distribution.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/d31cb856-303b-4a11-b280-b8729906670b/lesson/aeadb426-fcb0-433f-b1fa-75f0962e82b9)**
>
> Watch video content
