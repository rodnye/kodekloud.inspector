# Destination Rules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Traffic-Management/Destination-Rules)

---

## Table of Contents

- Destination Rules
  - Defining Subsets in Destination Rules
  - Customizing Load Balancing Policies
  - Enabling TLS for Enhanced Security
  - Summary
  - Watch Video

---

## Content

Istio Service Mesh

Traffic Management

# Destination Rules

In this article, we explore Destination Rules, their function in managing routing policies, and how they integrate with Istio's traffic management strategy. Destination Rules enable you to define policies that are applied after traffic is routed to a specific service, ensuring controlled distribution and effective load balancing.

Previously, we demonstrated how Virtual Services can be configured to manage traffic distribution across different service versions. For instance, consider the following Virtual Service configuration for the reviews service:

```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews
spec:
  hosts:
    - reviews
  http:
    - route:
        - destination:
            host: reviews
            subset: v1
          weight: 99
        - destination:
            host: reviews
            subset: v2
          weight: 1
```

In this example, 99% of the traffic is directed to the subset "v1" and 1% to the subset "v2".

> [!important]
> **Note**
>
> Subsets used in Virtual Services are defined in Destination Rules. These rules allow you to apply specific configurations to traffic after it has been routed to a service.

## Defining Subsets in Destination Rules

Subsets represent groups of service instances identified by labels on the respective pods. The following Destination Rule illustrates how subsets for the reviews service are declared:

```
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: reviews-destination
spec:
  host: reviews
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
```

For instance, the deployment for the v1 version of the reviews service might look like this:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: reviews-v1
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: reviews
        version: v1
```

## Customizing Load Balancing Policies

By default, Envoy uses a round-robin load-balancing strategy. However, you can modify this behavior by specifying a traffic policy within a Destination Rule. The following example demonstrates a simple pass-through load-balancing policy:

```
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: reviews-destination
spec:
  host: reviews
  trafficPolicy:
    loadBalancer:
      simple: PASSTHROUGH
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
```

If you require a different policy for a specific subset (for example, a random algorithm for subset "v2"), the global traffic policy can be overridden at the subset level. This flexibility enables you to apply a default policy across all subsets while tailoring specific configurations as necessary.

## Enabling TLS for Enhanced Security

Destination Rules also support various security configurations such as enabling TLS at the client level. The following configuration sets up mutual TLS, ensuring secure communication between services:

```
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: reviews-destination
spec:
  host: reviews
  trafficPolicy:
    tls:
      mode: MUTUAL
      clientCertificate: /myclientcert.pem
      privateKey: /client_private_key.pem
      caCertificates: /rootcacerts.pem
```

> [!important]
> **Important**
>
> Remember, the host field plays a crucial role in the Destination Rule. When using a short name (e.g., "reviews"), Istio interprets it relative to the rule’s namespace. To ensure that the rule correctly references the intended service, especially if it resides in a different namespace, always use the fully qualified domain name (FQDN).

The following configuration shows how to use FQDN to avoid potential misconfigurations:

```
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: reviews-destination
spec:
  host: reviews.default.svc.cluster.local
  trafficPolicy:
    tls:
      mode: MUTUAL
      clientCertificate: /myclientcert.pem
      privateKey: /client_private_key.pem
      caCertificates: /rootcacerts.pem
```

Using the FQDN ensures that the Destination Rule accurately references the intended service, regardless of its namespace.

## Summary

Destination Rules provide a powerful way to control post-routing traffic behavior by defining subsets and applying specific load-balancing and security policies. They are an essential component in Istio's traffic management architecture and are particularly useful in advanced routing scenarios.

For further reading, consider these resources:

- [Istio Documentation](https://istio.io/latest/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/fe135c6a-440a-4e97-b1b5-6a2b032689bd/lesson/f67a55ef-7f54-4c20-b899-3fa08bfcdd4f)**
>
> Watch video content
