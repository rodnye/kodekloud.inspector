# Sidecars - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Container-Orchestration-Servvice-Mesh/Sidecars)

---

## Table of Contents

- Sidecars
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Container Orchestration Service Mesh

# Sidecars

In this article, we explore the role of sidecars in service meshes with a special emphasis on the [Istio Service Mesh](https://learn.kodekloud.com/user/courses/istio-service-mesh). Before diving into Istio, it's essential to understand the concept of sidecars and their significance in Kubernetes deployments.

> [!important]
> **Prerequisite Information**
>
> Before proceeding, ensure you are familiar with the basics of Kubernetes, including Pods, containers, and networking.

Sidecars are additional containers that run alongside the main application container within a Kubernetes Pod. They are analogous to the small passenger cabins attached to motorcycles—complementary, yet distinct in purpose. In Kubernetes, while the primary container executes the core business logic of the application, sidecar containers handle auxiliary tasks such as log shipping, monitoring, file loading, or proxying. Importantly, sidecars share the same volumes and network namespace as the main container, ensuring seamless communication and resource sharing.

![The image illustrates a Kubernetes pod with a main container and a sidecar container, highlighting functions like file loading, log shipping, and monitoring.](https://kodekloud.com/kk-media/image/upload/v1752880626/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Sidecars/frame_70.jpg)

This approach of separating non-business functions from the primary application logic promotes improved modularity, maintainability, and scalability of your application architecture.

Below is a simple example of a Kubernetes Pod definition that demonstrates the use of a sidecar container. In this configuration, the main container runs an NGINX image, while an additional container based on the Fluentd image acts as the sidecar, responsible for shipping logs from the main application to a centralized logging system.

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

Next, we will delve into [Envoy](https://www.envoyproxy.io) and examine its role within service meshes, highlighting how it interacts with sidecar patterns to enhance traffic management and security in distributed systems.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/aeecda11-7f2e-48c5-9c54-5409f2d9d8d8/lesson/106d7fcd-7678-46d8-832d-13b101581d2b)**
>
> Watch video content
