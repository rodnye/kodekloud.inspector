# Exam Tips - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/Exam-Tips)

---

## Table of Contents

- Exam Tips
  - Endpoint Types
  - Comparing REST API and HTTP API
  - Stages and Stage Variables
  - Integration Types
  - Additional Features
  - Authentication and Authorization
  - WebSockets
  - Watch Video

---

## Content

AWS Certified Developer - Associate

API Gateway

# Exam Tips

In this article, we review key aspects of API Gateway—a fully managed service that simplifies the creation, deployment, monitoring, and securing of REST, HTTP, and WebSocket APIs. With AWS managing the underlying infrastructure, you can concentrate on building your application. Key features include stages, versions, API keys, throttling, authentication and authorization (using IAM or Cognito), and caching.

## Endpoint Types

API Gateway provides three distinct endpoint types, each suited for different use cases:

1.  **Regional:** Ideal for clients located within the same region.
2.  **Edge Optimized:** Routes requests through the nearest CloudFront edge location, making it perfect for global applications.
3.  **Private:** Restricts access exclusively to resources inside your VPC.

Additionally, API Gateway supports three API types: REST, HTTP, and WebSockets—with the latter being specifically designed for real-time communication.

## Comparing REST API and HTTP API

The differences between REST API and HTTP API are significant and impact feature support, cost, and performance:

- **REST API:**
  - Offers a comprehensive set of features.
  - Comes at a higher cost.
  - Supports edge optimized, regional, and private endpoint types.
  - Provides built-in throttling, API keys, full logging, and in-depth monitoring.

- **HTTP API:**
  - Focuses on delivering essential functionality with minimal features.
  - Has a lower cost.
  - Supports only regional endpoints.
  - Delivers higher performance and lower latency.

![The image provides exam tips for API Gateway, comparing REST API and HTTP API types, highlighting features, costs, and support options.](https://kodekloud.com/kk-media/image/upload/v1752857870/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/api-gateway-exam-tips-comparison.jpg)

## Stages and Stage Variables

API Gateway supports multiple stages, with every stage representing a specific lifecycle state of the API. Each stage has its own URL, and stage variables act like environment variables. This setup allows you to templatize your API and adjust each stage based on distinct requirements.

## Integration Types

There are several integration types available in API Gateway that enable seamless communication with backend services:

- **Mock Integration:**  
  Returns a response without contacting a backend service. This is especially useful during testing, as it avoids additional costs.

![The image provides exam tips for API Gateway, highlighting features like stage support, stage variables, and integration types, including mock integration for testing.](https://kodekloud.com/kk-media/image/upload/v1752857871/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/api-gateway-exam-tips-features.jpg)

- **AWS Proxy:**  
  Directly passes incoming requests to a backend Lambda function, acting as an efficient proxy.
- **HTTP Proxy:**  
  Similar to the AWS Proxy, but it is specifically used when the backend is an HTTP endpoint.
- **AWS Service Integration:**  
  Exposes AWS services (e.g., Lambda functions) through API Gateway. This configuration uses mapping templates to handle data transfer between the gateway and the backend.
- **HTTP Integration:**  
  Allows API Gateway to expose HTTP endpoints with data mapping templates to facilitate data transmission.

![The image provides exam tips for API Gateway, detailing different proxy types and data mapping configurations in AWS.](https://kodekloud.com/kk-media/image/upload/v1752857872/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/api-gateway-exam-tips-aws.jpg)

## Additional Features

API Gateway comes equipped with several additional features that enhance its functionality:

- **Cross-Origin Resource Sharing (CORS):**  
  Customize which frontend domains can interact with your API.
- **OpenAPI Integration:**  
  You can import an OpenAPI specification for auto-generating API endpoints, or export your API configuration as an OpenAPI spec for documentation and further development.
- **Caching:**  
  Enable caching on a per-stage basis to reduce backend calls and improve latency. The cache is invalidated when a header with "cache-control: max-age=0" is provided.

![The image provides exam tips for API Gateway, including support for CORS, OpenAPI spec import/export, and caching features in Amazon API Gateway.](https://kodekloud.com/kk-media/image/upload/v1752857873/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/api-gateway-exam-tips-caching.jpg)

## Authentication and Authorization

Implementing robust authentication and authorization is straightforward with API Gateway. The supported methods include:

- **IAM:**  
  Offers fine-grained access control over API resources.
- **Resource Policies:**  
  Useful for cross-account authorization or restricting access based on IP ranges.
- **Amazon Cognito and Lambda Authorizers:**  
  Provide extended capabilities for user authentication in various scenarios.

API keys, which are alphanumeric strings, play a crucial role in controlling access to your API. They allow you to monitor API usage and enforce throttling limits. These keys are associated with usage plans that define access levels and rate limits.

![The image provides exam tips for API Gateway, covering methods for authentication/authorization, the use of API keys, and usage plans in AWS API Gateway.](https://kodekloud.com/kk-media/image/upload/v1752857875/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/api-gateway-exam-tips-authentication.jpg)

> [!important]
> **Note**
>
> When planning your API Gateway architecture, carefully select the integration and authentication methods that best meet your application’s needs. This helps ensure both performance optimization and security.

## WebSockets

API Gateway also supports WebSockets, which are essential for applications that require long-lived connections. This is ideal for live applications, gaming, chat, and collaborative tools.

By understanding these features and configurations, you can design, secure, and manage robust APIs with API Gateway that align perfectly with your application's requirements.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/20c0abc3-7cf9-4700-8c78-ad4a16c47fa4)**
>
> Watch video content
