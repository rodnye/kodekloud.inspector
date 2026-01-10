# Websockets vs REST API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/Websockets-vs-REST-API)

---

## Table of Contents

- Websockets vs REST API
  - Understanding REST APIs
  - Introducing WebSockets
  - Comparing Communication Models
  - Making the Right Choice
  - Watch Video
    - Diagram: REST API vs WebSocket

---

## Content

AWS Certified Developer - Associate

API Gateway

# Websockets vs REST API

In this article, we explore the fundamental differences between WebSockets and REST APIs. We outline how each communication model functions and discuss appropriate scenarios for choosing one over the other.

## Understanding REST APIs

REST APIs operate on a request-response model, where the client initiates communication by sending a request, and the server responds accordingly. This model is well-suited for standard data retrieval and CRUD (Create, Read, Update, Delete) operations. However, REST APIs are inherently stateless, which means that the client must continuously poll the server to check for updates. For instance, in a chat application utilizing a REST API, the client repeatedly asks, "Are there any new messages?" until a new message is received.

> [!important]
> **SEO Tip**
>
> When optimizing content related to REST APIs, consider including keywords such as "HTTP methods," "stateless communication," and "CRUD operations" to improve search engine visibility.

## Introducing WebSockets

WebSockets establish a persistent, bidirectional connection between the client and the server. Following an initial handshake initiated by the client, the server accepts the connection, allowing both parties to continuously exchange information without the need to repeatedly reconnect. This real-time, low-latency communication model is ideal for applications that require immediate data exchange, such as online gaming, financial trading platforms, collaborative editing tools, and chat applications.

> [!important]
> **SEO Tip**
>
> Incorporate related terms like "real-time communication," "persistent connection," and "bidirectional messaging" to boost your content’s SEO performance.

## Comparing Communication Models

Below is a summary table that highlights the key differences between REST APIs and WebSockets:

| Feature             | REST APIs                              | WebSockets                             |
| ------------------- | -------------------------------------- | -------------------------------------- |
| Communication Model | Client-initiated request-response      | Bidirectional data exchange            |
| State Management    | Stateless                              | Persistent connection                  |
| Use Cases           | CRUD operations, standard interactions | Real-time applications, streaming data |

### Diagram: REST API vs WebSocket

Below is a diagram that visually compares REST APIs and WebSockets across several dimensions:

![The image is a comparison chart between Rest API and WebSocket, highlighting differences in communication model, state, use case, and typical applications.](https://kodekloud.com/kk-media/image/upload/v1752857911/notes-assets/images/AWS-Certified-Developer-Associate-Websockets-vs-REST-API/rest-api-vs-websocket-chart.jpg)

## Making the Right Choice

Choosing between REST APIs and WebSockets depends largely on your application’s requirements. Use REST APIs for predictable, stateless operations and simple CRUD interactions. Opt for WebSockets when you need a continuous, low-latency connection with real-time data exchange.

> [!important]
> **Important**
>
> Before deciding on a technology, consider both current requirements and potential future needs. Evaluating scalability, network efficiency, and maintenance overhead is critical to ensuring a robust application architecture.

By understanding these distinctions and considering your specific use case, you can make an informed decision about the most suitable communication model for your application.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/b172783f-a49e-439d-826c-fa3af5358a4d)**
>
> Watch video content
