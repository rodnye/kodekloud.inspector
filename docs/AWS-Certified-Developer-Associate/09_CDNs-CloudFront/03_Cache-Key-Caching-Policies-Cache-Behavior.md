# Cache Key Caching Policies Cache Behavior - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/CDNs-CloudFront/Cache-Key-Caching-Policies-Cache-Behavior)

---

## Table of Contents

- Cache Key Caching Policies Cache Behavior
  - Cache Behavior
  - How CloudFront Works Under the Hood
  - Understanding Cache Keys
  - Cache Policies in Action
  - Origin Request Policy
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

CDNs CloudFront

# Cache Key Caching Policies Cache Behavior

This article provides an in-depth look at how caching works in CloudFront by examining cache behaviors, cache keys, cache policies, and origin request policies. Learn how these elements work together to optimize content delivery, minimize latency, and improve your application's overall performance.

---

## Cache Behavior

CloudFront's cache behavior determines which origin is used to retrieve various objects based on the incoming request's path. For example, you can configure requests sent to the `/images` path to be directed to one origin (such as an S3 bucket) while those sent to the `/app` path may be delivered from another origin (like an EC2 instance). This configuration allows you to customize the delivery path for different types of content within the same CloudFront distribution.

![The image illustrates cache behavior in CloudFront, showing how requests are directed to different origins, such as an S3 bucket for images and an EC2 instance for applications.](https://kodekloud.com/kk-media/image/upload/v1752858461/notes-assets/images/AWS-Certified-Developer-Associate-Cache-Key-Caching-Policies-Cache-Behavior/cloudfront-cache-behavior-diagram.jpg)

---

## How CloudFront Works Under the Hood

When a user makes a request to CloudFront, the following steps occur:

1.  The request reaches an edge location.
2.  CloudFront generates a cache key by extracting elements from the request, such as the URL, headers, cookies, and query strings based on your configuration.
3.  CloudFront checks whether an object matching the generated cache key exists in its cache:
    - If there is a cache hit, CloudFront returns the stored object immediately.
    - If there is a cache miss, CloudFront forwards the request to the origin, retrieves the object, caches it for future requests, and returns it to the user.

![The image is a flowchart illustrating the CloudFront caching process, showing the steps from a user request to edge location, cache key generation, cache check (hit or miss), and retrieval from cache or origin.](https://kodekloud.com/kk-media/image/upload/v1752858463/notes-assets/images/AWS-Certified-Developer-Associate-Cache-Key-Caching-Policies-Cache-Behavior/cloudfront-caching-flowchart.jpg)

> [!important]
> **Key Insight**
>
> Understanding the cache key generation process is critical for optimizing your caching strategy and reducing origin load.

---

## Understanding Cache Keys

A cache key is a unique identifier that CloudFront uses to locate and retrieve cached objects. When a client requests a resource from a domain associated with CloudFront (for example, `/articles/welcome.html` on `example.com`), the default cache key is composed of the hostname and the resource path.

If the object is not found in the cache, CloudFront will forward the request to the origin server to fetch it. However, the cache key can be customized to include additional request components such as query parameters, headers, and cookies.

For example, consider the HTTP request below:

```
GET /content/video.mp4?resolution=1080p
Host: d111111abcdef8.cloudfront.net
User-Agent: Mozilla/5.0 Gecko/20100101 Firefox/68.0
Accept: {Accept-Encoding: gzip}
Cookie: session_id=01234abcd
Compression: True
```

In this example, apart from the URI, CloudFront can include the query parameters (`?resolution=1080p`), headers, or cookies as part of the cache key. The cache policy (discussed in the next section) defines which components are used to construct the cache key as well as the Time To Live (TTL) for cached objects.

![The image illustrates the process of CloudFront cache keys, showing how users access a webpage, with a cache key based on the hostname and resource. If the content is not in the cache, it retrieves it from a storage bucket.](https://kodekloud.com/kk-media/image/upload/v1752858464/notes-assets/images/AWS-Certified-Developer-Associate-Cache-Key-Caching-Policies-Cache-Behavior/cloudfront-cache-keys-process.jpg)

---

## Cache Policies in Action

Cache policies fine-tune your CloudFront configuration by specifying which components of an HTTP request should be used to form the cache key and by setting the TTL for your cached objects. Consider the following scenario:

A user makes a request:

```
GET /products/parts?type=motor
Host: www.carparts.com
```

Assuming your cache policy is configured to include the hostname, resource path, and query string, CloudFront will generate a cache key from these components. When the object is retrieved from the origin, it gets stored in the cache keyed to those properties.

Now consider a slightly different request made by another user:

```
GET /products/parts?type=wheel
Host: www.carparts.com
```

Since the query parameter differs (`type=wheel` versus `type=motor`), CloudFront will generate a unique cache key for this request. Without a matching cache entry, the request is forwarded to the origin, the new object is cached, and then returned to the user.

![The image illustrates a cache policy for a web request to "www.carparts.com" using CloudFront Distribution, showing the flow from the user to a custom HTTP backend and detailing cache keys based on hostname, resource, and query type.](https://kodekloud.com/kk-media/image/upload/v1752858466/notes-assets/images/AWS-Certified-Developer-Associate-Cache-Key-Caching-Policies-Cache-Behavior/cache-policy-cloudfront-carparts.jpg)

> [!important]
> **Tip**
>
> When designing cache policies, ensure you include only the necessary request components to maximize cache hit ratios while avoiding redundant duplicates.

---

## Origin Request Policy

In the event of a cache miss, CloudFront sends an origin request which includes components defined by your cache key (such as hostname, resource path, and query string). However, your origin may require additional request data, such as a specific language header, which you might not want to include in the cache key to avoid creating separate cache entries for every variation.

The solution is to define an origin request policy. This policy specifies additional headers, cookies, or query strings to be forwarded to the origin server without impacting the cache key. AWS offers several pre-configured managed policies that cover common scenarios, or you can customize a policy to fit your requirements.

![The image illustrates an "Origin Request Policy" flow, showing a user accessing an S3 bucket through CloudFront Distribution, with details on cache policy including hostname, resource, and query type.](https://kodekloud.com/kk-media/image/upload/v1752858467/notes-assets/images/AWS-Certified-Developer-Associate-Cache-Key-Caching-Policies-Cache-Behavior/origin-request-policy-flow-cloudfront.jpg)

> [!important]
> **Pro Tip**
>
> Using origin request policies allows you to optimize your caching strategy while passing critical headers or cookies to your origin server for customized responses.

---

## Summary

Below is a table that encapsulates the key aspects of CloudFront caching:

| Component             | Description                                                                                      | Key Elements                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Cache Behavior        | Directs requests to the appropriate origin based on the request path.                            | Request path (e.g., `/images`, `/app`)                                        |
| Cache Key             | A unique identifier constructed from request details to locate cached objects.                   | Hostname, resource path, and optionally query strings, headers, cookies       |
| Cache Policy          | Configures which request components form the cache key and specifies the TTL for cached objects. | Hostname, resource path, query string (as needed)                             |
| Origin Request Policy | Specifies additional request details to forward to the origin without altering the cache key.    | Extra headers, cookies, or query strings not included in the caching criteria |

![The image is a summary slide outlining key points about CloudFront caching, including cache behavior, cache keys, cache policies, and origin request policies.](https://kodekloud.com/kk-media/image/upload/v1752858468/notes-assets/images/AWS-Certified-Developer-Associate-Cache-Key-Caching-Policies-Cache-Behavior/cloudfront-caching-summary-slide.jpg)

By carefully configuring these policies, you can improve cache hit ratios, enhance content delivery performance, and ensure your origin server receives the necessary data when required. This not only optimizes resource utilization but also enhances end-user experience by reducing latency.

For further reading, consult the following resources:

- [CloudFront Documentation](https://aws.amazon.com/cloudfront/)
- [AWS Caching Strategies](https://aws.amazon.com/blogs/networking-and-content-delivery/)

Happy caching!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/d25d5e41-6379-4261-9036-c1d8017dbdab/lesson/d0e8f9e1-270a-4cb7-8ccc-8f47e52a7ba6)**
>
> Watch video content
