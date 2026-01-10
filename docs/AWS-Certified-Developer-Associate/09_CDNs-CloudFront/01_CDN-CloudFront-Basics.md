# CDN CloudFront Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/CDNs-CloudFront/CDN-CloudFront-Basics)

---

## Table of Contents

- CDN CloudFront Basics
  - The Problem: High Latency for Distant Users
  - What Is CloudFront?
  - CloudFront Architecture
  - Time to Live (TTL) in CloudFront
  - Cache Invalidation
  - Origin Groups for Redundancy
  - Logging and Analysis
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

CDNs CloudFront

# CDN CloudFront Basics

In this lesson, we explore the fundamentals of Amazon CloudFront and the role of Content Delivery Networks (CDNs) in mitigating latency issues for global web applications.

## The Problem: High Latency for Distant Users

Imagine hosting your web application on a server situated in a data center in New York. Users located in the United States enjoy fast response times due to geographic proximity. However, if a user from India sends a request, the data must traverse multiple international hops, resulting in higher latency and a degraded user experience. This slowdown is particularly noticeable during video streaming or when downloading large files.

To address these challenges, Amazon provides a network of small edge locations—sites with limited resources compared to full-blown data centers. By caching your content at these edge locations, CloudFront brings your application content closer to your users, thereby reducing latency and boosting overall performance.

![The image shows a world map illustrating global content delivery and edge locations, with a central web server connected to various points around the globe.](https://kodekloud.com/kk-media/image/upload/v1752858446/notes-assets/images/AWS-Certified-Developer-Associate-CDN-CloudFront-Basics/global-content-delivery-map.jpg)

## What Is CloudFront?

Amazon CloudFront is a content delivery service designed to accelerate the distribution of both static and dynamic web content. It achieves this by caching your content on a worldwide network of edge locations. When a user sends a request, CloudFront directs it to the nearest edge location, providing a rapid response without repeatedly accessing the origin server.

In essence, CloudFront acts as a cache for your web application’s assets—whether they are static files like images or dynamic content. This caching not only improves application speed but also reduces the load on your primary server.

## CloudFront Architecture

CloudFront's architecture is designed to be both intuitive and efficient. At its core, you define an "origin" for your content, which can be an [S3 bucket](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3), an [EC2 instance](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2), or even a custom HTTP server. Once the origin is designated, CloudFront caches the content at various edge locations around the globe. When a user request is made, the following process occurs:

- If the file is cached at the edge location, CloudFront returns it immediately.
- If the file is not cached (a cache miss), CloudFront retrieves it from the origin server, caches it at the edge, and then responds to the user.

![The image illustrates the architecture of Amazon CloudFront, showing the flow from origin servers to edge locations and then to the end user. It highlights how content is cached and delivered through CloudFront.](https://kodekloud.com/kk-media/image/upload/v1752858448/notes-assets/images/AWS-Certified-Developer-Associate-CDN-CloudFront-Basics/amazon-cloudfront-architecture-diagram.jpg)

Consider a scenario where you use an S3 bucket as your origin. When you create a CloudFront distribution—a unit that configures how CloudFront interacts with your origin—it provides a unique URL. End users send their requests to this URL. On the first request, if the content (like an image) is not cached at an edge location, CloudFront retrieves it from the S3 bucket. Any subsequent requests for the same content benefit from the cache, resulting in faster responses.

![The image illustrates the architecture of Amazon CloudFront, showing the flow of data from a user to an S3 bucket, through a distribution configuration, and then to multiple users via CloudFront's network.](https://kodekloud.com/kk-media/image/upload/v1752858448/notes-assets/images/AWS-Certified-Developer-Associate-CDN-CloudFront-Basics/amazon-cloudfront-architecture-diagram-2.jpg)

This caching behavior remains consistent whether your origin is an [S3 bucket](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3), a custom HTTP backend, or any other supported source.

![The image illustrates the interaction between CloudFront and an S3 bucket, showing how requests are processed, cached, and fetched if missed. It includes elements like edge locations and the flow of requests and responses.](https://kodekloud.com/kk-media/image/upload/v1752858449/notes-assets/images/AWS-Certified-Developer-Associate-CDN-CloudFront-Basics/cloudfront-s3-interaction-diagram.jpg)

For other origins, such as a custom HTTP backend, the process is identical: The user sends a request to CloudFront, which checks the cache at the nearest edge location. In the event of a cache miss, CloudFront requests the content from the origin, caches the new data, and then serves it to the user.

![The image illustrates the process of a request being sent to CloudFront, which then fetches a response from a custom HTTP backend. It shows the flow from users to CloudFront's edge location and then to the origin server.](https://kodekloud.com/kk-media/image/upload/v1752858450/notes-assets/images/AWS-Certified-Developer-Associate-CDN-CloudFront-Basics/cloudfront-request-response-flow.jpg)

## Time to Live (TTL) in CloudFront

When CloudFront caches your content at an edge location, it retains that content for a specified duration known as the Time to Live (TTL). By default, the TTL is set to 24 hours, meaning the cached content becomes stale after one day. You have the flexibility to customize the TTL based on your specific needs or set precise expiration times for individual objects.

> [!important]
> **Note**
>
> If you create a CloudFront distribution with an S3 bucket as your origin and leave the TTL at the default value, your content remains cached for 24 hours. Any changes made to a file during this period will not be visible to users until the TTL expires.

![The image explains CloudFront's Time to Live (TTL), detailing how cached content remains at an edge location for a set time, with a default TTL of 24 hours, and can be set to expire at specific times.](https://kodekloud.com/kk-media/image/upload/v1752858451/notes-assets/images/AWS-Certified-Developer-Associate-CDN-CloudFront-Basics/cloudfront-ttl-cached-content-explained.jpg)

## Cache Invalidation

There are scenarios when you need to update content before the TTL expires—for example, when replacing an old file with a new version. CloudFront supports cache invalidation for such cases. When you invalidate cached content, CloudFront removes it from all edge locations. On the next user request for that content, CloudFront fetches the latest version from the origin.

![The image explains cache invalidation, showing how content cached at edge locations can be invalidated, with a TTL of 24 hours, and illustrates a user receiving the wrong version due to cache expiration timing.](https://kodekloud.com/kk-media/image/upload/v1752858452/notes-assets/images/AWS-Certified-Developer-Associate-CDN-CloudFront-Basics/cache-invalidation-ttl-user-error.jpg)

## Origin Groups for Redundancy

To enhance the availability and reliability of your web application, CloudFront offers the Origin Groups feature. This allows you to configure both a primary and a secondary (fallback) origin. In case the primary origin is unreachable due to an outage or any other issues, CloudFront automatically switches to the secondary origin, ensuring minimal disruption for your users.

## Logging and Analysis

CloudFront’s robust logging capabilities provide deep insights into your application's performance. The logs capture various details—including request time, IP address, and request method—which are critical for analyzing traffic patterns, troubleshooting issues, and gaining a comprehensive understanding of your application's behavior.

![The image illustrates the flow of CloudFront logs, showing interactions between users, CloudFront, and the origin, with details logged in CloudWatch. It lists various data points captured in the logs, such as request time, IP address, request method, and more.](https://kodekloud.com/kk-media/image/upload/v1752858454/notes-assets/images/AWS-Certified-Developer-Associate-CDN-CloudFront-Basics/cloudfront-logs-flow-diagram.jpg)

## Summary

Amazon CloudFront is a powerful CDN solution that accelerates the delivery of web content by caching your files at strategically distributed edge locations. In this lesson, we covered the following key points:

- The origin serves as the source of your content (e.g., [an S3 bucket](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3), [an EC2 instance](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2), or a custom HTTP backend).
- A CloudFront distribution defines how and where the content is cached.
- The Time to Live (TTL) determines how long the content remains in the cache.
- Cache invalidation enables you to update outdated content before the TTL expires.
- Origin groups provide redundancy by designating both a primary and backup origin.
- Comprehensive logging aids in monitoring, debugging, and understanding the behavior of your CDN.

By mastering these concepts, you can optimize your web application’s performance and deliver a superior user experience to a global audience.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/d25d5e41-6379-4261-9036-c1d8017dbdab/lesson/4fd10daa-9878-4cfc-a88d-be2652c58c1f)**
>
> Watch video content
