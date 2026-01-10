# Caching - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/Caching)

---

## Table of Contents

- Caching
  - Cache Invalidation
  - How Caching Works with API Gateway
  - Watch Video

---

## Content

AWS Certified Developer - Associate

API Gateway

# Caching

In this lesson, we explore how caching works in API Gateway and learn how to enable and manage it effectively for improved performance and reduced backend load.

API Gateway provides built-in caching functionality that can be enabled on a per-stage basis. This means you can, for example, enable caching in production environments while disabling it in development, helping you avoid unnecessary costs. Additionally, caching settings can be customized at the individual method level, granting granular control over each endpoint's caching behavior.

> [!important]
> **Key Benefits of API Gateway Caching**
>
> - Reduced latency and improved response times by serving frequently requested data.
> - Decreased load on backend services, such as Lambda functions and databases.
> - Flexible caching rules tailored to specific environments and resource types.

## Cache Invalidation

Periodically, cached data can become outdated, which makes cache invalidation necessary. To successfully invalidate the cache, a client must possess the appropriate IAM permission. The following IAM policy snippet details the required permission:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "execute-api:InvalidateCache"
      ],
      "Resource": [
        "arn:aws:execute-api:region:account-id:api-id/stage-name/GET/resource-path-specifier"
      ]
    }
  ]
}
```

After obtaining the necessary permissions, the client can trigger cache invalidation by sending a request that includes the header "Cache-Control: max-age=0". This header tells API Gateway to clear the cache for a specific resource.

## How Caching Works with API Gateway

Consider a scenario where a user requests information about a product, such as Product X. The caching process in API Gateway follows these steps:

1.  The user sends an API request to API Gateway for Product X.
2.  API Gateway forwards the request to the backend service, which in this instance is a Lambda function.
3.  The Lambda function retrieves data from a DynamoDB table.
4.  Once the data is returned, API Gateway caches the result.
5.  The response is then sent back to the user.

For subsequent requests regarding Product X—regardless of which user makes the request—API Gateway first checks its cache. If the data is still current, the cached response is returned without the need to invoke the Lambda function or query the DynamoDB table again.

![The image illustrates how an API Gateway works with caching, showing the flow from a user to an app, then through an API Gateway to Lambda and DynamoDB, with a cache storing details of "Product X."](https://kodekloud.com/kk-media/image/upload/v1752857863/notes-assets/images/AWS-Certified-Developer-Associate-Caching/api-gateway-caching-diagram.jpg)

This caching mechanism not only enhances performance by serving data quickly but also minimizes backend resource consumption, making your API more efficient and cost-effective.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/7f0f20c8-b9f4-46ed-a6ac-4ff2d14594c6)**
>
> Watch video content
