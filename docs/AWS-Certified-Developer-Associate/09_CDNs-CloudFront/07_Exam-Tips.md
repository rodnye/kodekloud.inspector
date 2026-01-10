# Exam Tips - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/CDNs-CloudFront/Exam-Tips)

---

## Table of Contents

- Exam Tips
  - Watch Video

---

## Content

AWS Certified Developer - Associate

CDNs CloudFront

# Exam Tips

In this article, we cover essential concepts and practical tips to help you prepare for the [AWS Certified Developer - Associate](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate) exam. We dive deep into CloudFront configurations, cache mechanisms, and secure content delivery techniques that are critical for exam success.

CloudFront is a Content Delivery Network (CDN) that accelerates the distribution of both static and dynamic web content. It caches files at edge locations to ensure fast delivery by keeping content as close as possible to end users.

The origin is the source of the content that CloudFront caches. You can configure a range of origin types, including custom HTTP servers, Amazon S3 buckets, and more, to suit your application needs.

A distribution in CloudFront represents a complete configuration unit. It integrates your origin, cache behaviors, and various settings such as the Time-to-Live (TTL) value, which specifies the duration files remain cached. You can also perform cache invalidation to remove files from the cache before the TTL expires.

> [!important]
> **Note**
>
> Origin groups allow you to designate a primary and a backup origin. This setup ensures that if the primary origin becomes unreachable, CloudFront will automatically switch to the backup origin, maintaining the availability of your content.

Cache behavior settings enable you to control which origin CloudFront should fetch objects from based on request paths. For example, requests to `/API` may be routed to one origin, while requests to `/media` may be directed to another. This flexibility helps optimize performance and manage traffic efficiently.

The cache key acts as an identifier for cached files and can be customized using various parameters such as host names, headers, query strings, resource paths, and cookies. With cache policies, you can fine-tune both the cache key parameters and the TTL for cached files, ensuring optimal cache performance.

![The image provides tips for acing an exam, focusing on CloudFront configurations such as origin groups, cache behavior, and cache keys. It includes examples of how to set up primary and backup origins, and how cache keys identify cached files.](https://kodekloud.com/kk-media/image/upload/v1752858489/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/exam-tips-cloudfront-configurations.jpg)

All values included in the cache key are forwarded to the origin during an origin request. To include additional parameters in the origin request without affecting the cache key, you can use an origin request policy. This allows for a more granular control over the parameters sent to the origin.

CloudFront signed URLs enable secure access restrictions to your content by serving private content through CloudFront distributions. Additionally, geographic restrictions can be configured to prevent certain regions from accessing designated content, enhancing your security posture.

![The image provides tips for acing an exam, focusing on cache policies, origin request policies, and CloudFront signed URLs. It highlights customization, value inclusion, and secure content access.](https://kodekloud.com/kk-media/image/upload/v1752858490/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/exam-tips-cache-policies-cloudfront.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/d25d5e41-6379-4261-9036-c1d8017dbdab/lesson/263e6097-9852-4cdb-9ea4-2b1ee33a2735)**
>
> Watch video content
