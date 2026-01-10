# LambdaEdge Cloudfront Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/LambdaEdge-Cloudfront-Functions)

---

## Table of Contents

- LambdaEdge Cloudfront Functions
  - Execution Points for CloudFront and Lambda@Edge Functions
  - How It Works in Practice
  - Use Cases and Differences
  - Summary
  - Watch Video
    - CloudFront Functions
    - Lambda@Edge

---

## Content

AWS Certified Developer - Associate

Serverless

# LambdaEdge Cloudfront Functions

In this article, we explore two powerful AWS tools—Lambda@Edge and CloudFront Functions—that allow you to execute your code at edge locations instead of central regions. By leveraging edge computing, you can significantly reduce latency and improve the responsiveness of your applications.

CloudFront uses edge locations to cache and serve static assets, ensuring users receive content from the nearest geographical location. With CloudFront Functions and Lambda@Edge, you can extend this functionality to execute custom logic directly at these edge nodes for tasks such as request or response transformations.

![The image is a diagram illustrating the flow of data through Amazon CloudFront, showing connections from various AWS services to edge locations and then to a user.](https://kodekloud.com/kk-media/image/upload/v1752859569/notes-assets/images/AWS-Certified-Developer-Associate-LambdaEdge-Cloudfront-Functions/amazon-cloudfront-data-flow-diagram.jpg)

## Execution Points for CloudFront and Lambda@Edge Functions

Both CloudFront Functions and Lambda@Edge functions allow code execution at different points in the request/response lifecycle, though they offer a varying number of triggers:

- **CloudFront Functions** run:
  - When an edge location receives a viewer request (viewer request trigger)
  - When CloudFront sends the response back to the viewer (viewer response trigger)

- **Lambda@Edge** functions provide additional triggers:
  - On viewer request reception
  - Just before CloudFront forwards a request to the origin (origin request trigger, useful during cache miss scenarios)
  - When CloudFront receives a response from the origin (origin response trigger)
  - On sending the response back to the viewer

A comparison of these event triggers is illustrated below:

![The image is a comparison chart showing when functions run for CloudFront and Lambda@Edge, detailing specific request and response events.](https://kodekloud.com/kk-media/image/upload/v1752859571/notes-assets/images/AWS-Certified-Developer-Associate-LambdaEdge-Cloudfront-Functions/cloudfront-lambda-edge-comparison-chart.jpg)

## How It Works in Practice

When a user makes a request, both CloudFront Functions and Lambda@Edge can intercept it. In cases of a cache hit, CloudFront can immediately serve the cached response, simultaneously executing additional logic if necessary. For cache misses, Lambda@Edge can intercept the request before it is sent to the origin (for example, an S3 bucket) and modify the request or process the response before it is delivered back to the viewer.

This flow is illustrated in the diagram below:

![The image is a diagram illustrating a CloudFront distribution with Lambda functions triggering on viewer requests and responses, highlighting a cache hit process. It shows the flow of data between users, CloudFront, and Lambda functions.](https://kodekloud.com/kk-media/image/upload/v1752859572/notes-assets/images/AWS-Certified-Developer-Associate-LambdaEdge-Cloudfront-Functions/cloudfront-lambda-cache-hit-diagram.jpg)

Another diagram below shows the complete lifecycle when using an S3 origin:

![The image is a diagram illustrating the flow of a CloudFront distribution with Lambda triggers and an S3 bucket as the origin, showing viewer request and response triggers, origin request and response triggers, and CloudFront cache.](https://kodekloud.com/kk-media/image/upload/v1752859573/notes-assets/images/AWS-Certified-Developer-Associate-LambdaEdge-Cloudfront-Functions/cloudfront-distribution-lambda-s3-diagram.jpg)

## Use Cases and Differences

### CloudFront Functions

CloudFront Functions are designed for lightweight and short-running tasks. Their primary use cases include:

- **Cache Key Normalization:** Adjust HTTP request attributes to optimize cache key creation.
- **Header Manipulation:** Insert, modify, or remove HTTP headers within requests or responses.
- **URL Redirects and Rewrites:** Handle URL redirection or rewriting seamlessly.
- **Request Authorization:** Validate tokens (e.g., JWT) by checking authorization headers or related metadata.

![The image lists four use cases for CloudFront Functions: cache key normalization, header manipulation, URL redirects or rewrites, and request authorization.](https://kodekloud.com/kk-media/image/upload/v1752859574/notes-assets/images/AWS-Certified-Developer-Associate-LambdaEdge-Cloudfront-Functions/cloudfront-functions-use-cases.jpg)

> [!important]
> **Note**
>
> CloudFront Functions are ideal when performance is critical and the tasks are simple enough to execute in under a millisecond.

### Lambda@Edge

Lambda@Edge is better suited for more complex logic that might require additional processing time and resources. Use cases include:

- **Longer Running Functions:** For operations requiring extended execution time.
- **Resource-Intensive Tasks:** When adjustable CPU or memory configurations are necessary.
- **Third-Party Library Integration:** When your logic depends on external libraries.
- **Network and File System Operations:** For scenarios that involve accessing external services or processing the body of an HTTP request.

![The image outlines four use cases for Lambda@Edge: long-running functions, configurable CPU and memory functions, dependencies on third-party libraries, and network-dependent functions.](https://kodekloud.com/kk-media/image/upload/v1752859575/notes-assets/images/AWS-Certified-Developer-Associate-LambdaEdge-Cloudfront-Functions/lambda-at-edge-use-cases.jpg)

A side-by-side comparison of CloudFront Functions and Lambda@Edge is shown below:

![The image is a comparison table between CloudFront Functions and Lambda@Edge, detailing aspects like programming languages, event sources, scale, function duration, and other features.](https://kodekloud.com/kk-media/image/upload/v1752859576/notes-assets/images/AWS-Certified-Developer-Associate-LambdaEdge-Cloudfront-Functions/cloudfront-functions-vs-lambda-edge.jpg)

## Summary

In summary, both CloudFront Functions and Lambda@Edge empower you to deploy your code closer to your users, each with distinct advantages:

- **CloudFront Functions:** Best for lightweight, high-performance tasks such as authentication, header manipulation, URL rewrites, and cache key normalization.
- **Lambda@Edge:** Suitable for more complex operations that require longer execution times, external service calls, or enhanced resource configurations. It supports additional triggers for origin request and response events.

![The image is a summary slide detailing the functions and use cases of CloudFront and Lambda@Edge, highlighting their roles in running code at edge locations and handling requests and responses.](https://kodekloud.com/kk-media/image/upload/v1752859578/notes-assets/images/AWS-Certified-Developer-Associate-LambdaEdge-Cloudfront-Functions/cloudfront-lambda-edge-summary.jpg)

This overview provides the knowledge needed to choose the right tool based on your application's requirements, ensuring that you can deliver dynamic content with minimal latency and optimal performance.

For more details on AWS edge computing, visit the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/f6d6d136-27f5-4a32-87bb-ac21b047ddd3)**
>
> Watch video content
