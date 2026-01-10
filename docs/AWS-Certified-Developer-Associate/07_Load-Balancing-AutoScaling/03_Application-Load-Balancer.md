# Application Load Balancer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Load-Balancing-AutoScaling/Application-Load-Balancer)

---

## Table of Contents

- Application Load Balancer
  - Advanced Routing Capabilities
  - Preserving Client IP Information
  - SSL Termination
  - Summary
  - Watch Video
    - Hostname-Based Routing
    - Query String-Based Routing
    - Path-Based Routing

---

## Content

AWS Certified Developer - Associate

Load Balancing AutoScaling

# Application Load Balancer

In this article, we explore the Application Load Balancer (ALB), a Layer 7 load balancer designed for web traffic management. The ALB is HTTP and HTTPS aware, supports WebSockets, and offers advanced routing capabilities, making it an ideal solution for modern microservices-based architectures.

## Advanced Routing Capabilities

Since the ALB understands HTTP protocols, it routes requests based on numerous HTTP packet attributes. The common routing methods include:

### Hostname-Based Routing

The ALB can direct traffic based on the hostname in the HTTP header. For instance, if a request contains the hostname `api.example.com`, you can configure a rule to forward this traffic to a designated target group. Other hostnames can be routed to different target groups, allowing you to host multiple applications under unique domain names.

![The image illustrates an application load balancer using hostname-based routing, directing traffic to different target groups based on the hostname.](https://kodekloud.com/kk-media/image/upload/v1752858989/notes-assets/images/AWS-Certified-Developer-Associate-Application-Load-Balancer/application-load-balancer-hostname-routing.jpg)

### Query String-Based Routing

The ALB is also capable of routing based on query string parameters. For example, a request to `example.com` with the query parameter `user=mark` might be forwarded to Target Group A, while a query string containing `action=edit` could be routed to another target group.

![The image illustrates a query string-based routing process using an application load balancer, directing traffic to a specific target group based on a URL query parameter.](https://kodekloud.com/kk-media/image/upload/v1752858991/notes-assets/images/AWS-Certified-Developer-Associate-Application-Load-Balancer/query-string-routing-load-balancer.jpg)

### Path-Based Routing

Path-based routing allows traffic to be distributed according to the URL path. For example, requests to `example.com/orders` can be directed to one target group, while requests to `example.com/accounts` can be sent to a different target group.

![The image illustrates an Application Load Balancer using path-based routing to direct traffic to different target groups based on URL paths. It shows a user accessing a website, with requests routed to either Target Group A or B depending on the path (/orders or /accounts).](https://kodekloud.com/kk-media/image/upload/v1752858992/notes-assets/images/AWS-Certified-Developer-Associate-Application-Load-Balancer/application-load-balancer-path-routing.jpg)

## Preserving Client IP Information

When client requests pass through an ALB, the original client IP address is preserved in the `X-Forwarded-For` header. This header ensures that your application can access the true client IP address.

![The image illustrates the flow of a client request through an application load balancer, highlighting the use of the "X-Forwarded-For" header to pass the client IP to the servers.](https://kodekloud.com/kk-media/image/upload/v1752858993/notes-assets/images/AWS-Certified-Developer-Associate-Application-Load-Balancer/client-request-load-balancer-flow.jpg)

> [!important]
> **Note**
>
> Utilizing the `X-Forwarded-For` header is essential for accurate client tracking and logging, ensuring that your application has access to the original client IP.

## SSL Termination

One of the key benefits of using an ALB is its ability to terminate SSL/TLS connections. A typical SSL termination flow is as follows:

1.  The client sends HTTPS traffic to the ALB.
2.  The ALB terminates the SSL connection and converts the request to HTTP before forwarding it to your web server.
3.  The web server processes the request over HTTP, and the ALB can re-encrypt the response when sending it back to the client.

This process offloads SSL management from your application while still ensuring secure communication between the client and the load balancer. If needed, secure communication between the ALB and your backend server can be maintained.

> [!important]
> **Note**
>
> SSL termination reduces the processing burden on your web servers, allowing them to focus on delivering content rather than handling encryption tasks.

## Summary

The Application Load Balancer functions at the application layer (Layer 7) and supports HTTP, HTTPS, and WebSocket protocols. Its capabilities include hostname-based, query string-based, and path-based routing, as well as SSL termination. These features enable you to efficiently distribute traffic and design scalable, robust architectures.

![The image is a summary slide highlighting three points: it functions at the application layer (Layer 7), can forward traffic based on various criteria, and supports HTTP/HTTPS/WebSockets.](https://kodekloud.com/kk-media/image/upload/v1752858994/notes-assets/images/AWS-Certified-Developer-Associate-Application-Load-Balancer/application-layer-traffic-forwarding-summary.jpg)

By leveraging these features, you can create flexible architectures that intelligently distribute user requests to the appropriate backend services, enhancing performance and scalability.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c5fbed4d-288a-4e90-9f57-04fbe853f8a5/lesson/9dc3377c-74d5-48cf-a65a-16eb59678eea)**
>
> Watch video content
