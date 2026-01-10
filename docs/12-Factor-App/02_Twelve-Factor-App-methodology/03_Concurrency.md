# Concurrency - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/12-Factor-App/Twelve-Factor-App-methodology/Concurrency)

---

## Table of Contents

- Concurrency
  - Watch Video

---

## Content

12 Factor App

Twelve Factor App methodology

# Concurrency

In this lesson, we explore the critical concept of concurrency, which is the eighth factor in the [12 Factor App](https://learn.kodekloud.com/user/courses/12-factor-app) methodology.

Up to now, we have containerized our application and executed it as a Docker container, running a single process capable of serving multiple users concurrently. While this setup works well under moderate demand, it has limitations under increased load.

> [!important]
> **Scalability Considerations**
>
> Scaling strategies come in two flavors: vertical and horizontal. Vertical scaling adds more resources to a single server, but this approach can lead to downtime and has inherent resource limits.

Modern deployment strategies favor horizontal scaling, where additional servers are provisioned rapidly to run multiple instances of the application simultaneously. A load balancer then distributes incoming user requests across these instances, ensuring smooth performance even during peak demand.

For horizontal scaling to be effective, your application must be designed as an independent, stateless service. In line with the [12 Factor App](https://learn.kodekloud.com/user/courses/12-factor-app) principles, processes are treated as first-class citizens. Instead of scaling up a single instance with more resources, the application should scale out by running multiple instances concurrently.

> [!important]
> **Key Benefits**
>
> - Avoids the single point of failure inherent in vertical scaling.
> - Improves fault tolerance and overall system reliability.
> - Facilitates easier deployment and maintenance of application instances.

In the next lesson, we will delve deeper into how these principles impact application processes and discuss practical strategies for designing applications that can scale horizontally.

For more information, explore:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/12-factor-app/module/086a3d2d-be7f-4b05-92ae-1b2e4ab90f6a/lesson/2d791119-7253-4b9f-84f6-6e0e58185dcd)**
>
> Watch video content
