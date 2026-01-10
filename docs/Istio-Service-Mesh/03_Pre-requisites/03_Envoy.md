# Envoy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Pre-requisites/Envoy)

---

## Table of Contents

- Envoy
  - What Is a Proxy?
  - Introduction to Envoy
  - Watch Video

---

## Content

Istio Service Mesh

Pre requisites

# Envoy

Envoy is one of the most popular proxies in modern service mesh architectures. In this article, we delve into what Envoy is and explain its critical role in today’s distributed systems.

## What Is a Proxy?

A proxy acts as an intermediary between a user and an application. Instead of embedding additional functionalities—such as TLS encryption, authentication, and request retries—directly into your application, these tasks can be offloaded to a proxy. This approach enables developers to concentrate on the core business logic while the proxy handles supplementary operations.

In this setup, a user sends a request to the proxy, which then forwards it to the application for processing.

![The image is a diagram showing a user connecting to an application through a proxy, which handles TLS, authentication, and retry mechanisms. The application contains business logic.](https://kodekloud.com/kk-media/image/upload/v1752879370/notes-assets/images/Istio-Service-Mesh-Envoy/user-application-proxy-tls-diagram.jpg)

## Introduction to Envoy

Envoy is an open-source proxy designed specifically for modern, service-oriented architectures. Originally developed at Lyft in 2015 to address microservices challenges, Envoy quickly proved its worth in distributed systems. It joined the Cloud Native Computing Foundation (CNCF) in 2017 and reached graduate status in 2018, signifying its robustness, production readiness, and strong community support.

Envoy operates both as a proxy and as a communication bus with advanced routing capabilities. Typically, Envoy is deployed as a sidecar container alongside your primary application containers. This design ensures that all inbound and outbound pod traffic is managed by Envoy, which enhances communication handling and offloads additional features from your application.

> [!important]
> **Note**
>
> Deploying Envoy as a sidecar container is a best practice in service mesh environments, as it ensures consistent traffic management across all microservices.

![The image shows the Envoy logo and a diagram of a pod containing a main container and an Envoy sidecar, illustrating the flow of data through the Envoy proxy.](https://kodekloud.com/kk-media/image/upload/v1752879371/notes-assets/images/Istio-Service-Mesh-Envoy/envoy-logo-pod-diagram.jpg)

Envoy is a fundamental component in many service mesh solutions. For example, its integration is central to the architecture of the [Istio Service Mesh](https://learn.kodekloud.com/user/courses/istio-service-mesh), which leverages Envoy's capabilities to manage and secure communications within distributed applications.

For additional resources on Envoy and service mesh architectures, explore more in-depth articles and the official documentation available online.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/1095f3e0-a80d-4c31-941b-6423a5b6d74c/lesson/e471e61c-5c93-49e6-ab08-23201d33f9f0)**
>
> Watch video content
