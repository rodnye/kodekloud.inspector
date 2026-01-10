# Sidecars - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Pre-requisites/Sidecars)

---

## Table of Contents

- Sidecars
  - What Is a Sidecar?
  - Sample Pod Definition with a Sidecar
  - Additional Insights
  - Watch Video

---

## Content

Istio Service Mesh

Pre requisites

# Sidecars

In this article, we explore the concept of sidecars—a crucial pattern in Kubernetes architecture. Understanding sidecars is essential when constructing multi-container Pods, as they enable auxiliary functionalities that support the main application container.

## What Is a Sidecar?

Much like a sidecar on a motorcycle, which is a small passenger compartment attached for additional capacity, a sidecar container is an extra component within a Kubernetes Pod. While the primary container runs the core business logic of your application, the sidecar container is dedicated to handling tasks such as:

- Log shipping
- Monitoring
- File loading
- Proxying

Both containers share the same network namespace and storage volumes, yet they operate in isolated environments to ensure modularity and maintainability.

> [!important]
> **Note**
>
> Sidecar containers extend the capabilities of the main container without interfering with its direct operations. This separation of concerns enhances performance and simplifies troubleshooting.

## Sample Pod Definition with a Sidecar

Below is an example illustrating how to define a Pod with a sidecar container. In this configuration, the main container (`nginx-container`) serves content using the Nginx image, while the sidecar (`sidecar-container`) utilizes the Fluentd image to ship logs to a central logging system.

```
containers:
  - name: nginx-container
    image: nginx
    volumeMounts:
      - name: shared-data
        mountPath: /usr/share/nginx/html
  - name: sidecar-container
    image: fluent/fluentd
    volumeMounts:
      - name: shared-data
        mountPath: /pod-data
```

## Additional Insights

For further exploration of related technologies, consider the following resource:

- [Envoy](https://www.envoyproxy.io/) – a modern, high-performance proxy used to manage microservices communication.

Understanding and effectively utilizing sidecars in your Kubernetes deployments can lead to more resilient and maintainable applications by offloading supportive tasks from the main application container. Enjoy building your robust microservices architecture with this pattern!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/1095f3e0-a80d-4c31-941b-6423a5b6d74c/lesson/28598205-cde6-4fb3-bf01-b5dee727746d)**
>
> Watch video content
