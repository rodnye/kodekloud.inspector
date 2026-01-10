# API Keys Usage Plans - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/API-Keys-Usage-Plans)

---

## Table of Contents

- API Keys Usage Plans
  - What Is an API Key?
  - Introduction to Usage Plans
  - API Keys and Usage Plans Together
  - Handling Request Throttling
  - Example of Multiple Usage Plans
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

API Gateway

# API Keys Usage Plans

In this article, we explore API keys and usage plans, their roles in controlling API access, and how they relate to throttling and rate limiting. By understanding these concepts, you can better manage and protect your API from misuse.

## What Is an API Key?

An API key is an alphanumeric string provided to application developers or users to authenticate, control, and monitor access to your API. By including the API key in API requests, you can track the source of each request and enforce security measures. The typical method is to include the key in the header, such as:

```
GET /resource
Host: api.example.com
X-API-Key: 1a2b3c4d5e6f7g8h9i0j11k12l13m14n15o16p17q18r19s20t21u22v
```

The header `X-API-Key` is commonly used and is expected by API Gateway to authenticate requests.

## Introduction to Usage Plans

A usage plan in AWS API Gateway establishes rules for who can access one or more deployed APIs. It defines parameters like:

- The maximum number of requests allowed.
- The rate at which users can call the API.
- The burst capacity to handle short-term spikes in traffic.

For example, a typical usage plan may allow:

- Up to 100 requests per second with occasional bursts to 20 requests over short periods.
- A total monthly quota of 10 requests.

If these limits are exceeded, the API Gateway throttles the user until the next period or until they upgrade their plan.

![The image shows a screenshot of an API Gateway usage plan titled "MyUsagePlan," detailing usage limits such as rate, burst, and quota. It includes options for actions and exporting usage data.](https://kodekloud.com/kk-media/image/upload/v1752857844/notes-assets/images/AWS-Certified-Developer-Associate-API-Keys-Usage-Plans/api-gateway-myusageplan-details.jpg)

This setup not only ensures fair usage but also prevents backend services from being overwhelmed by excessive traffic.

## API Keys and Usage Plans Together

When you create an API key, you associate it with a specific usage plan. This linkage means that every request made with that API key will adhere to the defined throttling and rate limits. API Gateways use these limits to regulate traffic to the backend services.

For instance, if a usage plan allows 100 requests per minute, any client remaining within that limit will experience normal operation. However, if requests exceed 100 per minute, the API Gateway issues an HTTP 429 error—indicating too many requests—and throttles the client.

![The image is a diagram illustrating an API Gateway with components like Usage Plan, API Key, and Your API, showing access control and throttling for APIs exposed for usage.](https://kodekloud.com/kk-media/image/upload/v1752857845/notes-assets/images/AWS-Certified-Developer-Associate-API-Keys-Usage-Plans/api-gateway-usage-plan-diagram.jpg)

> [!important]
> **Tip**
>
> Remember that coupling API keys with usage plans not only secures your API but also allows you to monitor and manage traffic effectively.

## Handling Request Throttling

When a user exceeds the allowed rate limit, the API Gateway responds with a 429 error. An example of such a response is:

```
HTTP/1.1 429 Too Many Requests
Content-Type: application/json


{
  "message": "Too many requests, please try again later."
}
```

This mechanism ensures that excessive requests are curbed, preventing overloading of your API endpoints.

![The image illustrates an API Gateway rate limiting process, showing a flow from a client to an app, then through an API Gateway, Lambda, and DynamoDB, with a rate limit condition and a 429 error for too many requests.](https://kodekloud.com/kk-media/image/upload/v1752857846/notes-assets/images/AWS-Certified-Developer-Associate-API-Keys-Usage-Plans/api-gateway-rate-limiting-flow.jpg)

## Example of Multiple Usage Plans

Organizations often implement different usage plans for varied levels of user access. Consider the following tiers:

| Tier      | Allowed Requests per Second | Description                                        |
| --------- | --------------------------- | -------------------------------------------------- |
| Free Tier | 100                         | Suitable for basic access with limited throughput. |
| Gold Tier | 500                         | Increased capacity for high-demand applications.   |

For a free-tier user, an API key is generated and associated with the free-tier usage plan. If this user sends 200 requests per second, they will eventually be throttled. In contrast, a gold-tier user is allowed up to 500 requests per second. Should they exceed this limit, the same throttling mechanism applies.

![The image illustrates an API Gateway usage plan with two tiers (Free and Gold) and a flowchart showing a user accessing an API Gateway, which connects to Lambda and DynamoDB services.](https://kodekloud.com/kk-media/image/upload/v1752857847/notes-assets/images/AWS-Certified-Developer-Associate-API-Keys-Usage-Plans/api-gateway-usage-plan-flowchart.jpg)

> [!important]
> **Important**
>
> Different plans offer tailored access levels. Ensure that your users understand their plan limits to avoid unexpected throttling.

## Summary

API keys are essential for identifying and authenticating users of your API. Combined with usage plans, they allow you to define and enforce request limits to protect your backend services. By implementing these strategies, AWS API Gateway helps maintain stable API performance even under high traffic volumes.

This comprehensive overview provided insights into API keys, usage plans, and rate-limiting mechanisms—all crucial components for managing secure and efficient API access.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/9e128cfe-4b06-411e-b381-cfe2e1bdb473)**
>
> Watch video content
