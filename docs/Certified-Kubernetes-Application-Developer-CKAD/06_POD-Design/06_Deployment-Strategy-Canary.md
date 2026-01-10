# Deployment Strategy Canary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/POD-Design/Deployment-Strategy-Canary)

---

## Table of Contents

- Deployment Strategy Canary
  - Overview of the Canary Deployment Process
  - Implementation Details
  - Code Example
  - Conclusion
  - Additional Resources
  - Watch Video
  - Practice Lab
    - Primary Deployment and Service
    - Canary Deployment
    - Limitation

---

## Content

Certified Kubernetes Application Developer - CKAD

POD Design

# Deployment Strategy Canary

In this guide, we explore how to implement canary deployments in Kubernetes to safely introduce new changes. A canary deployment enables you to deploy a new version of your application alongside the current version while routing only a small percentage of traffic to the latest version. This approach minimizes risk while testing new features in production.

Below you will find a detailed explanation of how to achieve this strategy using Kubernetes Deployments and Services.

## Overview of the Canary Deployment Process

Begin by deploying the primary version of your application. In this configuration, the primary deployment runs five pods, and a Kubernetes Service routes traffic to these pods. A label, for example, `version: v1`, is assigned to the pods to facilitate proper routing.

Next, deploy a secondary deployment for the canary version. Initially, all traffic is directed to version v1. The canary deployment tests the new version (version v2) by ensuring that only a small portion of traffic is routed to it. If the new version meets expectations, you can later update the primary deployment and retire the canary.

The key steps include:

1.  Using a single Service to route traffic to both deployments by leveraging a common label (e.g., `app: front-end`).
2.  Setting a lower replica count for the canary deployment (e.g., `replicas: 1`) so that a limited percentage of traffic reaches version v2.
3.  Once testing is successful, upgrading the primary deployment to the new version and removing the canary deployment.

Consider the following diagram that illustrates the traffic distribution, with roughly 83% of traffic directed to version v1 and 17% to version v2:

![The image illustrates a canary deployment strategy, routing 83% of traffic to version v1 and 17% to version v2 of a front-end app.](https://kodekloud.com/kk-media/image/upload/v1752871252/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Deployment-Strategy-Canary/frame_170.jpg)

## Implementation Details

### Primary Deployment and Service

The primary version of the application is deployed using a Kubernetes Deployment. A corresponding Service directs traffic to the pods, which are marked with the label `app: front-end` to ensure correct routing.

### Canary Deployment

A separate deployment is created for the canary version, which uses a new image (e.g., version 2.0) and labels the pods with `version: v2`. Although both deployments share the common label `app: front-end`, setting the canary deployment’s replica count to 1 ensures that only a minor portion of traffic is routed to the new version.

> [!important]
> **Note**
>
> Keep in mind that the percentage of traffic routed to each version is directly influenced by the number of pod replicas. The inherent traffic distribution mechanism in Kubernetes spreads traffic evenly across all pods.

### Limitation

One limitation of this Kubernetes-only setup is that traffic distribution is solely determined by the number of pods in each deployment. For example, if you want an exact percentage split (e.g., precisely 1% to the canary), Kubernetes alone may not suffice unless you have a very high number of pods. For more granular control, consider using a service mesh like [Istio Service Mesh](https://learn.kodekloud.com/user/courses/istio-service-mesh), which allows for precise, percentage-based traffic routing regardless of pod count.

## Code Example

Below are examples of Kubernetes configuration files to define your primary and canary deployments alongside a Service.

```
# myapp-primary.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-primary
  labels:
    app: myapp
    type: front-end
spec:
  replicas: 5
  selector:
    matchLabels:
      app: front-end
  template:
    metadata:
      labels:
        version: v1
        app: front-end
    spec:
      containers:
        - name: app-container
          image: myapp-image:1.0
---
# service-definition.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: front-end
---
# myapp-canary.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-canary
  labels:
    app: myapp
    type: front-end
spec:
  replicas: 1
  selector:
    matchLabels:
      app: front-end
  template:
    metadata:
      labels:
        version: v2
        app: front-end
    spec:
      containers:
        - name: app-container
          image: myapp-image:2.0
```

In this setup:

- The primary deployment (`myapp-primary.yml`) operates with five replicas of version v1.
- The Service (`service-definition.yaml`) targets pods with the common label `app: front-end`.
- The canary deployment (`myapp-canary.yml`) runs a single replica of version v2, allowing only a fraction of traffic to test the new version.

## Conclusion

By employing this canary deployment strategy, approximately 83% of traffic is directed to the stable primary deployment (v1), while about 17% is routed to the new canary deployment (v2). Once thorough testing shows that the new version is stable, you can update the primary deployment accordingly and remove the canary configuration.

For more practical experience, try implementing this deployment strategy in your Kubernetes environment and observe how it helps in safely rolling out new application versions.

## Additional Resources

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Istio Service Mesh](https://learn.kodekloud.com/user/courses/istio-service-mesh)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/c44b5e7c-5854-4c65-87bf-7e07cb026e71/lesson/ca488bb6-312b-4702-b7ce-333228be66ba)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/c44b5e7c-5854-4c65-87bf-7e07cb026e71/lesson/e9a78464-7ab6-4682-92bb-1b9ce746bd9e)**
>
> Practice lab
