# REST Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/REST-Architecture)

---

## Table of Contents

- REST Architecture
  - Watch Video

---

## Content

Advanced Golang

API Development Project

# REST Architecture

In this article, we take an in-depth look at REST (Representational State Transfer) architecture and its core principles. REST is not a protocol or standard; rather, it is a collection of architectural constraints used to design scalable and maintainable APIs.

When a client interacts with a RESTful API, it receives a representation of the requested resource's state via HTTP. Although several formats—such as JSON, HTML, XML, Python, or plain text—can be used, JSON remains the most popular. In our forthcoming lessons, we will primarily focus on JSON.

![The image is an informational slide about REST (Representational State Transfer), explaining its role as a set of architectural constraints and its use in transferring data in various formats like JSON and HTML.](https://kodekloud.com/kk-media/image/upload/v1752868687/notes-assets/images/Advanced-Golang-REST-Architecture/rest-architectural-constraints-info-slide.jpg)

> [!important]
> **Note**
>
> REST defines guidelines that ensure APIs remain robust and user-friendly. These constraints support the creation of APIs that are efficient and straightforward to maintain.

For an API to be considered RESTful, it must adhere to the following principles:

1.  **Client-Server Architecture**  
    The system is divided into clients, servers, and resources. Interactions occur via clearly defined HTTP requests between these components.
2.  **Stateless Communication**  
    Each client request must be independent. No information about the client's session is stored on the server between requests. This ensures every interaction is treated as a complete, standalone transaction.
3.  **Uniform Interface**  
    A consistent interface simplifies communication between components. Resources are easily identifiable, and clients manipulate them using the information provided in the API response.
4.  **Self-Descriptive Messages**  
    API responses include all necessary details—such as HTTP status codes and headers—enabling the client to understand and process the information without additional context.
5.  **Optional: Code-on-Demand**  
    Although not a requirement, servers can deliver executable code to clients when beneficial, thereby extending functionality on demand.

![The image describes REST, highlighting its client-server architecture, stateless communication, uniform interface, and optional code-on-demand feature.](https://kodekloud.com/kk-media/image/upload/v1752868688/notes-assets/images/Advanced-Golang-REST-Architecture/rest-client-server-architecture-diagram.jpg)

In summary, RESTful architecture might seem intricate at first glance, but its defined constraints create efficient and scalable web services. In our upcoming projects, we will apply these principles to design and manage our API endpoints for optimal performance and maintainability.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/c023c10c-8902-4c7c-8c56-552e871d5b76)**
>
> Watch video content
