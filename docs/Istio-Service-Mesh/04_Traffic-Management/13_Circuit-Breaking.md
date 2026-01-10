# Circuit Breaking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Traffic-Management/Circuit-Breaking)

---

## Table of Contents

- Circuit Breaking
  - How Circuit Breaking Works
  - Implementing Circuit Breaking with Istio
  - Demo Overview
  - Additional Resources
  - Watch Video

---

## Content

Istio Service Mesh

Traffic Management

# Circuit Breaking

Circuit breaking plays a vital role in preventing cascading failures within a microservices ecosystem. When a service—like the product service—relies on other services such as reviews or details, any degradation in performance or failures in these dependencies can lead to a buildup of requests. For example, if the details service becomes unresponsive or slow, it causes requests from the product service to accumulate, leading to increased delays and possible system strain.

> [!important]
> **Note**
>
> Circuit breaking proactively fails requests that depend on an unresponsive service, avoiding long wait times and improving overall system resilience.

## How Circuit Breaking Works

In a microservices architecture, when one service fails or becomes slow, the subsequent requests are not allowed to pile up. Instead, the circuit breaker immediately interrupts the request flow, marking them as failed. This approach not only protects the application from being overwhelmed but also serves to limit the number of concurrent requests that can be sent to a particular service endpoint.

## Implementing Circuit Breaking with Istio

In Istio, circuit breaking is configured through Destination Rules. The following example demonstrates the configuration for the Product Page Destination Rule, which restricts the number of concurrent TCP connections to three:

```
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: productpage
spec:
  host: productpage
  subsets:
    - name: v1
      labels:
        version: v1
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 3
```

## Demo Overview

Let's head over to a demo to see this configuration in action. You will observe how the circuit breaker helps manage high traffic volumes and mitigates the impact of slow or failed service responses.

> [!important]
> **Warning**
>
> Before deploying circuit breaking in your production environment, ensure that you thoroughly test the configuration. Incorrect settings might lead to excessive request blocking or other unintended consequences.

## Additional Resources

- [Istio Circuit Breaking Documentation](https://istio.io/latest/docs/tasks/traffic-management/circuit-breaking/)
- [Istio Documentation](https://istio.io/latest/docs/)
- [Microservices Best Practices](https://microservices.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/fe135c6a-440a-4e97-b1b5-6a2b032689bd/lesson/2b8e9509-230d-489a-9dca-b92de6215940)**
>
> Watch video content
