# Cloudfront and LambdaEdge - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Edge-Networks/Cloudfront-and-LambdaEdge)

---

## Table of Contents

- Cloudfront and LambdaEdge
  - Supported Lifecycle Events
  - Detailed Request Flow
  - Common Use Cases
  - Feature Comparison
  - Choosing the Right Option
  - Summary
  - References
  - Watch Video
    - CloudFront Functions
    - Lambda@Edge

---

## Content

AWS Networking Fundamentals

Edge Networks

# Cloudfront and LambdaEdge

Amazon CloudFront delivers content from the nearest AWS edge location, reducing latency and improving performance. By integrating CloudFront Functions and Lambda@Edge, you can inject custom logic into the request/response pipeline—right at the edge.

![The image illustrates the flow of data through Amazon CloudFront, showing how CloudFront Functions and Lambda@Edge interact with various AWS services and edge locations to deliver content to a user.](https://kodekloud.com/kk-media/image/upload/v1752863408/notes-assets/images/AWS-Networking-Fundamentals-Cloudfront-and-LambdaEdge/amazon-cloudfront-data-flow-diagram.jpg)

## Supported Lifecycle Events

Edge functions trigger at specific points in CloudFront’s request/response cycle. Below is a quick reference:

| Function Type        | Triggers                                                                 |
| -------------------- | ------------------------------------------------------------------------ |
| CloudFront Functions | `viewer-request`, `viewer-response`                                      |
| Lambda@Edge          | `viewer-request`, `origin-request`, `origin-response`, `viewer-response` |

![The image is a comparison chart showing when functions run for CloudFront and Lambda@Edge, detailing specific request and response events.](https://kodekloud.com/kk-media/image/upload/v1752863410/notes-assets/images/AWS-Networking-Fundamentals-Cloudfront-and-LambdaEdge/cloudfront-lambdaedge-functions-comparison-chart.jpg)

## Detailed Request Flow

1.  **Viewer Request**  
    At the viewer edge, both CloudFront Functions and Lambda@Edge can inspect or modify incoming HTTP requests.
2.  **Cache Hit**  
    If the requested object is in cache, CloudFront returns it immediately. Use the `viewer-response` trigger to adjust headers or body content before it reaches the user.
3.  **Cache Miss**  
    When an object isn't cached, CloudFront makes an origin request:
    - Lambda@Edge can run custom code during this origin request.
    - After processing, the request is forwarded to your origin (e.g., Amazon S3, HTTP server).

4.  **Origin Response**  
    On receiving data from the origin, use the `origin-response` Lambda@Edge trigger to transform or filter the response before caching.
5.  **Viewer Response**  
    Finally, before dispatching to the viewer, both function types can adjust the response payload or headers.

![The image is a diagram illustrating a CloudFront distribution with Lambda functions triggering on viewer requests and responses, showing the interaction with CloudFront cache.](https://kodekloud.com/kk-media/image/upload/v1752863411/notes-assets/images/AWS-Networking-Fundamentals-Cloudfront-and-LambdaEdge/cloudfront-distribution-lambda-diagram.jpg)

![The image is a diagram illustrating the flow of a cache miss in a CloudFront distribution, showing interactions between viewers, CloudFront cache, Lambda triggers, and an S3 bucket. It includes viewer request and response triggers, as well as origin request and response triggers.](https://kodekloud.com/kk-media/image/upload/v1752863412/notes-assets/images/AWS-Networking-Fundamentals-Cloudfront-and-LambdaEdge/cloudfront-cache-miss-diagram.jpg)

## Common Use Cases

### CloudFront Functions

- **Cache Key Normalization**  
  Transform request attributes (like query strings or headers) to optimize cache keys.
- **Header Manipulation**  
  Add, modify, or strip HTTP headers in requests or responses.
- **URL Redirects / Rewrites**  
  Implement redirects or rewrite URLs at the edge without touching your origin.
- **Request Authorization**  
  Perform lightweight token validation (e.g., JWT) by inspecting authorization headers.

![The image lists four use cases for CloudFront Functions: cache key normalization, header manipulation, URL redirects or rewrites, and request authorization.](https://kodekloud.com/kk-media/image/upload/v1752863413/notes-assets/images/AWS-Networking-Fundamentals-Cloudfront-and-LambdaEdge/cloudfront-functions-use-cases-list.jpg)

### Lambda@Edge

- **Complex or Long-Running Logic**  
  Execute heavier workloads requiring more CPU, memory, or execution time.
- **Third-Party Libraries**  
  Package external dependencies with your function for richer functionality.
- **External Network Access**  
  Connect to APIs, databases, or other services outside the AWS network.
- **File System Operations**  
  Read/write temporary files in `/tmp` or process request bodies with custom logic.

## Feature Comparison

> [!important]
> **Note**
>
> Use CloudFront Functions when you need sub-millisecond execution with minimal dependencies. Choose Lambda@Edge for advanced workloads or when you require external network and file system access.

![The image is a comparison table between CloudFront Functions and Lambda@Edge, detailing aspects like programming languages, event sources, scale, function duration, and pricing.](https://kodekloud.com/kk-media/image/upload/v1752863415/notes-assets/images/AWS-Networking-Fundamentals-Cloudfront-and-LambdaEdge/cloudfront-functions-lambda-edge-comparison.jpg)

## Choosing the Right Option

| Criteria                 | CloudFront Functions                     | Lambda@Edge                            |
| ------------------------ | ---------------------------------------- | -------------------------------------- |
| Execution time           | < 1 ms                                   | Up to 5 minutes                        |
| Supported languages      | JavaScript (ECMAScript 6)                | Node.js, Python, etc.                  |
| Package size & libraries | Must be very small, no external packages | Supports larger bundles & dependencies |
| Network & filesystem     | No                                       | Yes                                    |

> [!important]
> **Warning**
>
> Deployments with Lambda@Edge are replicated across all edge locations. Updates can take several minutes to propagate globally.

## Summary

Both CloudFront Functions and Lambda@Edge extend your CDN with programmable logic at AWS edge locations.

- Choose **CloudFront Functions** for lightweight, high-scale tasks such as header manipulation, redirects, or cache key normalization.
- Opt for **Lambda@Edge** when you need longer execution, external network access, or advanced libraries.

![The image is a summary of CloudFront and Lambda@Edge functions, highlighting their use cases, operational details, and suitability for different tasks. It includes six key points about running code at edge locations, use cases, and function capabilities.](https://kodekloud.com/kk-media/image/upload/v1752863416/notes-assets/images/AWS-Networking-Fundamentals-Cloudfront-and-LambdaEdge/cloudfront-lambda-edge-summary-use-cases.jpg)

## References

- [AWS CloudFront Functions Documentation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html)
- [AWS Lambda@Edge Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html)
- [Amazon CloudFront Overview](https://aws.amazon.com/cloudfront/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/d31cb856-303b-4a11-b280-b8729906670b/lesson/e32afddc-1031-4f94-9b6b-c4e31066e3fd)**
>
> Watch video content
