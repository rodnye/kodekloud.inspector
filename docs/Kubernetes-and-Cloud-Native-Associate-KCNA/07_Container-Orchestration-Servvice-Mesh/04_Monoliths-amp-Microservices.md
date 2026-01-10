# Monoliths amp Microservices - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Container-Orchestration-Servvice-Mesh/Monoliths-amp-Microservices)

---

## Table of Contents

- Monoliths amp Microservices
  - Transitioning to Microservices
  - Challenges of Microservices
  - Additional Resources
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Container Orchestration Service Mesh

# Monoliths amp Microservices

When building one large application, a single failure can cause the entire system to break. In contrast, modifying smaller portions of your app helps isolate issues, thereby reducing risks during experimentation. This approach enables faster and more frequent deployments, fueling innovation and agility. Modern architectures favor smaller, independent components rather than relying on giant, interdependent systems.

In traditional monolithic systems, all functionality is deployed together within a single code base, with no clear boundaries between features. These tightly coupled components typically run as a single process and share one database for persistence—a setup that can quickly become a performance bottleneck.

![The image illustrates a monolithic book info app architecture with components: Details, Reviews, Product Page, and Ratings, all connected to a database (DB).](https://kodekloud.com/kk-media/image/upload/v1752880618/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Monoliths-amp-Microservices/frame_70.jpg)

Consider a book information application as an example. This monolithic app comprises four modules: Details, Reviews, Ratings, and Product Page. Although the design appears modular, each service relies on a specific version of the others. This interdependency necessitates a full redeployment even when updating a single module. For instance, the product page aggregates data from the details and reviews modules, while the reviews module fetches rating data from the ratings module. All are implemented in Java and share common responsibilities such as networking, authentication, authorization, logging, monitoring, and data transfer. As a result, if the ratings module experiences issues due to heavy data loads, the entire system is affected. Adding new features—like a campaign module built in a different language or testing an updated version of the reviews module—requires redeploying the entire application because of the tightly intertwined architecture.

Over time, as applications accumulate decades of legacy code and involve numerous developers, the monolithic structure can degrade into what is commonly known as a "big ball of mud." This metaphor describes a tangled, loosely managed system with no clearly defined architectural boundaries.

![The image illustrates a complex software architecture labeled "A Big Ball of Mud," featuring interconnected components like Details, Reviews, Product Page, and a database, with warning symbols.](https://kodekloud.com/kk-media/image/upload/v1752880620/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Monoliths-amp-Microservices/frame_200.jpg)

> [!important]
> **Note**
>
> Transitioning from a monolithic model to a microservices architecture requires significant cultural, technical, and organizational changes. It is not an overnight process.

## Transitioning to Microservices

In a microservices architecture, each module is transformed into an independent application. For example:

- The product page is implemented as a Python application.
- The book details module is refactored into a Ruby application.
- The reviews module continues to run in Java.
- The ratings module is redesigned using Node.js.

Additionally, the reviews service is iterated with multiple versions (v1, v2, and v3) to test variations such as a no-star version (v1), a black star version (v2), and a red star version (v3).

In the refactored system, users continue to access the product page, which now independently calls the details and reviews services. This decoupling allows each service to be individually scaled, upgraded, or fixed without impacting the others. The result is smaller, safer, and faster releases.

![Diagram of a microservices-based Book Info App, showing interconnected services: Product Page, Details, Reviews (v1, v2, v3), and Ratings, using Python, Ruby, Java, and Node.js.](https://kodekloud.com/kk-media/image/upload/v1752880621/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Monoliths-amp-Microservices/frame_260.jpg)

A significant advantage of this approach is that the ratings service can now scale dynamically based on customer load. Moreover, each service can be developed using a different programming language, granting teams greater autonomy and reducing the risk of a single point of failure. The independent nature of microservices enhances overall resilience by enabling isolated monitoring, updates, and rollbacks. In this transformed architecture, what was once a single monolithic application becomes a collection of six smaller, more manageable services.

In an ideal setup, each microservice maintains a single responsibility—a design principle that minimizes interdependencies and streamlines development.

![The image lists the pros of microservices: scalability, faster releases, technology agnosticism, system resiliency, and independent services, with icons for Python, Ruby, Java, and Node.js.](https://kodekloud.com/kk-media/image/upload/v1752880622/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Monoliths-amp-Microservices/frame_310.jpg)

## Challenges of Microservices

Transitioning to microservices also introduces new challenges. In a monolithic architecture, aspects such as networking, authentication, authorization, data transfer, logging, and monitoring were managed within a single code base. However, in a microservices environment, these concerns are often re-implemented in every service. This repetitive coding effort—known as cross-cutting concerns—can lead to code duplication and inconsistencies. For example, updating a certificate or a monitoring agent requires modifying each service individually.

This complexity is sometimes referred to as "fat microservices." Adding cross-cutting functionalities to each service can dilute the benefits of microservices by reintroducing interdependencies and making services heavier than intended.

![The image illustrates "Fat Microservices" with four stacks, each containing common functionalities like authentication and logging, using different technologies for various services.](https://kodekloud.com/kk-media/image/upload/v1752880623/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Monoliths-amp-Microservices/frame_390.jpg)

Another challenge in microservices is managing inter-service communication. Determining which version of a service to call, handling traffic rules, and managing timeouts can be complex tasks. The increased number of services and abstraction layers often makes it more difficult to pinpoint issues, thereby necessitating a robust observability strategy.

Moreover, operating a microservices-based system—especially one spread across multiple programming languages and frameworks—can strain traditional operational practices. To tackle these issues, many organizations adopt DevOps practices, which promote closer collaboration between development and operations teams. This shared responsibility enables faster and more efficient deployment, monitoring, and maintenance of microservices.

> [!important]
> **Warning**
>
> Keep in mind that while microservices can improve scalability and resilience, they also introduce complexity in inter-service communication and require investment in developing robust monitoring and deployment practices.

In the upcoming lesson, we will explore how service meshes can simplify inter-service communication and enhance security within microservices architectures.

## Additional Resources

- [Microservices Architecture](https://microservices.io/)
- [DevOps Practices](https://www.atlassian.com/devops)
- [Service Mesh Explained](https://www.nginx.com/blog/what-is-a-service-mesh/)

Tables can be used to compare different architectural elements:

| Architecture Type | Characteristics                              | Example Issue                                   |
| ----------------- | -------------------------------------------- | ----------------------------------------------- |
| Monolithic        | Single code base, tightly coupled components | Redeploying the full system for a minor update  |
| Microservices     | Independent services, isolated deployment    | Managing cross-cutting concerns across services |

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/aeecda11-7f2e-48c5-9c54-5409f2d9d8d8/lesson/41f31cdd-1ea6-4e7b-87e2-540d4012625e)**
>
> Watch video content
