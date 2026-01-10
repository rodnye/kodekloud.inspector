# API Gateway Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/API-Gateway-Basics)

---

## Table of Contents

- API Gateway Basics
  - Key Features of API Gateway
  - Integration Types
  - Endpoint Types
  - REST API vs HTTP API vs WebSocket
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

API Gateway

# API Gateway Basics

In this lesson, we will explore AWS API Gateway, its key features, and its integration options. AWS API Gateway provides a central access point for your backend services by handling authentication, throttling, caching, and more. This centralized architecture allows your individual services—such as Lambda, EC2, or DynamoDB—to focus on core functionality without being burdened by common cross-cutting concerns.

Imagine a shopping mall where multiple stores offer different products and services. Instead of every customer entering each store separately, the mall features a central lobby with a security checkpoint. Customers pass through this lobby—where their bags are checked and IDs verified—before gaining access to individual stores. In this analogy, the stores represent your other AWS services, while the central lobby stands for the API Gateway, which manages authentication, authorization, and other security measures on your behalf.

![The image is a diagram illustrating an API Gateway concept, comparing it to a shopping mall with a security guard, showing how customers (or internet users) access various services (shops or AWS services like Lambda, EC2, and DynamoDB) through a gateway.](https://kodekloud.com/kk-media/image/upload/v1752857804/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Basics/api-gateway-shopping-mall-diagram.jpg)

By offloading these responsibilities to the API Gateway, you can simplify backend development and maintenance. Whether you're using Lambda functions, EC2 instances, or any other AWS service, API Gateway streamlines centralized management and improves security integration.

## Key Features of API Gateway

AWS API Gateway is a fully managed service, meaning AWS takes care of the underlying infrastructure, scaling, and routine updates. This allows you to concentrate on designing powerful APIs. Some of its core features include:

- **Built-in Version Management:** Easily create and maintain multiple API versions (e.g., v1, v2) without disrupting existing users.
- **Support for RESTful APIs and WebSockets:** Choose REST APIs for CRUD operations or WebSockets for real-time interactions.
- **Throttling and Caching:** Configure policies via the AWS Management Console to control request rates and cache responses for faster performance.
- **Security Integration:** Integrates seamlessly with AWS IAM and Amazon Cognito to simplify authentication and authorization.

![The image lists five features: Fully Managed, Version Management, RESTful API and WebSocket Support, Throttling and Caching, and Security, each with an icon.](https://kodekloud.com/kk-media/image/upload/v1752857805/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Basics/features-fully-managed-api-security.jpg)

API Gateway works with various AWS services. Whether your backend components consist of Lambda functions, EC2 instances, DynamoDB, Kinesis, or even public endpoints, API Gateway offers a flexible interface to add security, throttling, and caching layers to your deployment.

![The image illustrates an API Gateway integration flow, showing connections from the internet to an API Gateway, which then connects to services like Lambda, EC2, DynamoDB, Kinesis, and publicly accessible endpoints.](https://kodekloud.com/kk-media/image/upload/v1752857806/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Basics/api-gateway-integration-flow.jpg)

## Integration Types

API Gateway supports various integration types, allowing you to connect your API to the appropriate backend with ease:

- **Lambda Integration:** Directly invoke Lambda functions to execute custom backend logic.
- **HTTP Integration:** Route requests to any existing HTTP endpoint.
- **Direct AWS Service Integration:** Connect with other AWS services such as SQS, DynamoDB, and S3.
- **VPC Link Integration:** Securely route requests to resources hosted within your VPC—like EC2 instances or ECS tasks—without exposing them publicly.
- **Mock Integration:** Return predefined responses to facilitate testing and reduce backend costs during development.

![The image is a diagram showing integration types, illustrating the flow from a user to a device, then to an API gateway, which connects to various services like Lambda, HTTP Endpoint, SQS, VPC Link, and Mock.](https://kodekloud.com/kk-media/image/upload/v1752857807/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Basics/integration-types-diagram-user-device-api.jpg)

When designing your API, you can define routing rules based on HTTP headers, paths, or methods (such as POST or GET). For example, a POST request to `/items` could trigger a Lambda function that interacts with a DynamoDB table.

## Endpoint Types

API Gateway offers three different endpoint types to match your deployment needs:

- **Edge-Optimized:**  
  Best for a global user base, these endpoints leverage Amazon CloudFront's global edge locations to minimize latency.

  ![The image is a diagram showing an API Gateway setup with a client interacting through various HTTP methods (GET, POST, PUT, DELETE) with AWS Lambda functions, which then connect to DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752857808/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Basics/api-gateway-aws-lambda-dynamodb.jpg)

- **Regional:**  
  Ideal for clients located in the same geographic area. Although globally accessible, users outside the designated region might experience increased latency.

  ![The image is a diagram illustrating an API Gateway with regional endpoints, showing the flow from a user to an app, then through an API Gateway to ECS and RDS services in the us-east-1 region.](https://kodekloud.com/kk-media/image/upload/v1752857809/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Basics/api-gateway-regional-endpoints-diagram.jpg)

- **Private:**  
  These endpoints are accessible only from within your VPC and are intended for private, internal-use cases.

> [!important]
> **Note**
>
> For edge-optimized endpoints, CloudFront routing directs requests to the nearest edge location, ensuring fast response times for users worldwide.

![The image is a flow diagram illustrating an API Gateway with edge-optimized endpoints, showing the interaction between a user, app, CloudFront, API Gateway, Lambda, and DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752857810/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Basics/api-gateway-flow-diagram.jpg)

## REST API vs HTTP API vs WebSocket

When setting up your API using the API Gateway console, you can choose from three options based on your application's needs:

- **REST API:**  
  Provides an extensive feature set, including API keys, request validation, transformation capabilities, and comprehensive monitoring/logging. REST APIs support all endpoint types, though they are priced higher due to their robust functionalities.

  ![The image lists features of an API Gateway for REST APIs, including support for API keys, request validation, request and response transformations, support for all endpoint types, a full suite of monitoring and logging, and higher cost.](https://kodekloud.com/kk-media/image/upload/v1752857811/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Basics/api-gateway-features-rest-apis.jpg)

- **HTTP API:**  
  Optimized for low-latency, high-performance scenarios with a streamlined feature set. Although HTTP APIs do not offer all advanced features, they provide a cost-effective solution for many common use cases.

  ![The image is an infographic about an API Gateway for HTTP API, highlighting four features: high-performance, low-latency execution; streamlined core functionality; faster, cost-effective API management; and built-in CORS support.](https://kodekloud.com/kk-media/image/upload/v1752857812/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Basics/api-gateway-infographic-features.jpg)

- **WebSocket:**  
  Designed for applications that need real-time, bi-directional communication.

A summary comparison of REST APIs and HTTP APIs highlights:

- **Performance:** HTTP APIs are optimized for lower latency and faster performance.
- **Cost:** HTTP APIs are generally more cost-effective due to their streamlined functionality.
- **Endpoint Types:** While REST APIs support all endpoint types, HTTP APIs primarily support regional endpoints.
- **API Management and Monitoring:** REST APIs offer extensive features for throttling, API keys, and detailed logging, whereas HTTP APIs provide essential monitoring and basic management capabilities.

![The image is a comparison table between REST API and HTTP API, highlighting differences in performance, cost, endpoint types, payload formats, API management, usage, and monitoring.](https://kodekloud.com/kk-media/image/upload/v1752857813/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Basics/rest-api-vs-http-api-comparison.jpg)

> [!important]
> **Warning**
>
> Before selecting the API type, consider your application's specific requirements. Choosing a REST API might provide extensive features but at a higher cost, while an HTTP API offers better performance and lower cost for simpler use cases.

## Conclusion

AWS API Gateway is a versatile tool for creating, publishing, maintaining, monitoring, and securing APIs at any scale—supporting REST, HTTP, and WebSocket paradigms. With centralized features like authentication, throttling, version management, and diverse integration options, API Gateway simplifies the process of connecting users to your backend services. Whether you choose a feature-rich REST API or a high-performance HTTP API, AWS API Gateway offers a reliable solution tailored to your application's needs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/a4b23179-5d96-475a-9ea4-851679b99057)**
>
> Watch video content
