# LambdaEdge - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/LambdaEdge)

---

## Table of Contents

- LambdaEdge
  - When Do These Functions Run?
  - Use Cases and Choosing the Right Service
  - Summary
  - Watch Video
    - CloudFront Functions
    - Lambda@Edge Functions

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# LambdaEdge

In this lesson, we explore two powerful services offered by AWS—CloudFront functions and Lambda@Edge—that enable you to run code at Amazon CloudFront edge locations. These services allow you to process requests and modify responses right at the edge, reducing the delay caused by routing traffic back to your origin servers.

![The image illustrates the flow of data through Amazon CloudFront, showing connections between various AWS services and edge locations, ultimately reaching the end user.](https://kodekloud.com/kk-media/image/upload/v1752865573/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-LambdaEdge/amazon-cloudfront-data-flow-diagram.jpg)

With these functions, developers can manipulate incoming requests and outgoing responses. For example, you could implement basic authentication, perform authorization checks, or even generate an entire response directly at the edge. This capability brings complex backend logic closer to users, thereby reducing latency and improving performance.

## When Do These Functions Run?

It is crucial to understand that CloudFront functions and Lambda@Edge functions are designed for different scenarios. Here’s when each type executes:

- **CloudFront Functions** run:
  - Immediately when a viewer sends a request to an edge location.
  - Just before CloudFront returns a response to the viewer.

- **Lambda@Edge Functions** run:
  - When CloudFront receives a request from a viewer.
  - When CloudFront forwards a request to the origin, especially for content not cached at the edge.
  - When a response is received from the origin, before delivering it back to the viewer.

![The image is a comparison chart showing when functions run in CloudFront and Lambda@Edge, detailing specific request and response events.](https://kodekloud.com/kk-media/image/upload/v1752865574/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-LambdaEdge/cloudfront-lambdaedge-comparison-chart.jpg)

## Use Cases and Choosing the Right Service

### CloudFront Functions

CloudFront functions are perfect for lightweight, short-running tasks. Common use cases include:

- **Cache Key Normalization:** Transform HTTP request attributes to create an optimal cache key, which improves the cache hit ratio.
- **Header Manipulation:** Insert, modify, or delete HTTP headers in requests or responses. For instance, you might add a header with the true client IP.
- **URL Redirects or Rewrites:** Redirect viewers based on request details or rewrite URLs. This allows for dynamic request management.
- **Request Authorization:** Inspect authorization headers or metadata to validate tokens like JSON Web Tokens (JWT).

![The image lists four CloudFront Functions use cases: cache key normalization, header manipulation, URL redirects or rewrites, and request authorization. Each use case is represented with an icon and a brief description.](https://kodekloud.com/kk-media/image/upload/v1752865576/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-LambdaEdge/cloudfront-functions-use-cases.jpg)

> [!important]
> **Pro Tip**
>
> For extremely short execution times (sub-millisecond), choose CloudFront functions to take full advantage of their speed and efficiency.

### Lambda@Edge Functions

Lambda@Edge functions are ideal for scenarios that require extended execution times or additional capabilities, such as:

- Running operations that take several milliseconds or more.
- Handling tasks with adjustable CPU and memory configurations.
- Integrating with other AWS services using third-party libraries like the AWS SDK.
- Performing functions that depend on network access to external services.
- Accessing the request body or file system when needed.

A detailed comparison chart below outlines the differences between CloudFront functions and Lambda@Edge. This chart covers programming languages, event triggers, scaling, function duration, and capabilities like network and file system access.

![The image is a comparison table between CloudFront Functions and Lambda@Edge, detailing aspects like programming languages, event sources, scale, function duration, and more. It highlights differences in capabilities such as network access, file system access, and pricing.](https://kodekloud.com/kk-media/image/upload/v1752865577/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-LambdaEdge/cloudfront-functions-vs-lambda-edge.jpg)

> [!important]
> **Choosing the Right Tool**
>
> For logic that requires network access, integration with external systems, or longer running times, Lambda@Edge is the recommended service.

## Summary

Both Lambda@Edge and CloudFront functions allow you to run code as close to your users as possible at the edge. They provide flexible options for manipulating requests and responses in Amazon CloudFront:

- **CloudFront Functions:** Best for lightweight tasks such as header manipulation, URL redirects/rewrites, and authorization on sub-millisecond executions.
- **Lambda@Edge Functions:** Suitable for operations requiring extended execution times, network or file system access, and deeper integrations with other AWS services.

![The image is a summary slide highlighting key points about running code at edge locations, manipulating requests/responses through CloudFront, and the use of CloudFront functions and Lambda@Edge.](https://kodekloud.com/kk-media/image/upload/v1752865579/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-LambdaEdge/edge-code-cloudfront-summary-slide.jpg)

Understanding the differences between these two services is essential for selecting the right approach for your specific use case. For more detailed information, explore the [AWS Documentation](https://aws.amazon.com/documentation/).

Happy building at the edge!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/bb4ccc2b-59f8-44c2-bfef-46235dc54806)**
>
> Watch video content
