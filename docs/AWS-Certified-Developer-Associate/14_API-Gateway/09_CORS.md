# CORS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/CORS)

---

## Table of Contents

- CORS
  - Watch Video

---

## Content

AWS Certified Developer - Associate

API Gateway

# CORS

Cross-Origin Resource Sharing (CORS) is a crucial web security feature that enables controlled interactions between resources hosted on different domains. This lesson explores how CORS works, why it is important, and how to configure it effectively for your applications.

Imagine a scenario where both the web browser (client) and the backend server are hosted on the same domain, for example, example.com. In this case, when the client sends a request to the server, the transaction proceeds smoothly because the request is confined to the same origin.

However, if the backend is hosted on a different domain, such as api.example.com, the browser will block the request by default due to cross-origin restrictions imposed for security reasons. This built-in security measure prevents unauthorized access across different domains.

To facilitate communication between a client on example.com and a backend on api.example.com, you must enable CORS on the backend. This configuration informs the browser that requests from the specified domain are permitted, effectively bypassing the default cross-origin limitations.

> [!important]
> **Note**
>
> When using an API Gateway as your backend, enabling CORS can be as simple as toggling a single configuration option. This approach allows you to explicitly permit requests from authorized domains while maintaining robust security.

By configuring CORS on the API Gateway, you ensure that your application can securely handle requests across different domains without compromising on security or performance.

![The image illustrates Cross-Origin Resource Sharing (CORS) with a client from "example.com" making a request to a server at "api.example.com," which allows the origin.](https://kodekloud.com/kk-media/image/upload/v1752857859/notes-assets/images/AWS-Certified-Developer-Associate-CORS/cors-client-server-illustration.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/58bc5ad7-0c1a-428f-a735-ec8cfd6cfaad)**
>
> Watch video content
