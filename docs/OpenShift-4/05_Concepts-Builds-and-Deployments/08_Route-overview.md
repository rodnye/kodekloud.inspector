# Route overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Concepts-Builds-and-Deployments/Route-overview)

---

## Table of Contents

- Route overview
  - Watch Video

---

## Content

OpenShift 4

Concepts Builds and Deployments

# Route overview

In this lesson, we explore how users access applications by leveraging OpenShift Routes. OpenShift Routes serve as a gateway, exposing internal Services to external users via a specified hostname.

Imagine a user who needs to access an application. The user opens a device—be it a computer, tablet, or mobile—and navigates to a URL. This URL either directs the user to an error page or to the live application, depending on whether the required Service is correctly exposed.

> [!important]
> **Insight**
>
> A Route in OpenShift is analogous to a load balancer in Kubernetes. It manages and directs incoming traffic, allowing users to access the application using an IP address, hostname, or any DNS name of your choice.

Within OpenShift, a Route exposes a Service running on the platform to a specific hostname. For instance, you can configure a Route to expose a Service at "www.example.com" or "www.google.com". In a hypothetical scenario where Google is hosted on OpenShift, its underlying Pods (or containers) would be managed by a Service that the Route externally exposes.

![The image is a diagram showing a flow of data or processes involving Google, Kubernetes, a server, and web elements, connected by arrows.](https://kodekloud.com/kk-media/image/upload/v1752882609/notes-assets/images/OpenShift-4-Route-overview/google-kubernetes-data-flow-diagram.jpg)

From a Kubernetes perspective, setting up a Route mirrors configuring a load balancer. Both systems ensure that external requests are properly routed to the internal Service, making applications accessible using various DNS names or IP addresses.

For more information, explore the [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) and further documentation on [OpenShift Routes](https://docs.openshift.com/container-platform/latest/networking/routes/route-configuration.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/3200131b-dec7-4422-9e05-68c751bc4213/lesson/463cd727-279d-4f5f-a932-98cef13cbc83)**
>
> Watch video content
