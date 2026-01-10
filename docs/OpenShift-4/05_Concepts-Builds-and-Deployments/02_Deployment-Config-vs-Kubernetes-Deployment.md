# Deployment Config vs Kubernetes Deployment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Concepts-Builds-and-Deployments/Deployment-Config-vs-Kubernetes-Deployment)

---

## Table of Contents

- Deployment Config vs Kubernetes Deployment
  - Overview
  - YAML Manifest Examples
  - Key Differences
  - Conclusion
  - Watch Video
    - Replication Process
    - Updating Container Images

---

## Content

OpenShift 4

Concepts Builds and Deployments

# Deployment Config vs Kubernetes Deployment

In this article, we explore the differences between Kubernetes Deployments and OpenShift DeploymentConfigs. Although both mechanisms manage pod replication and deployment, they serve different roles and exhibit distinct behaviors. This guide will help you understand the differences, so you can decide which method best suits your operational requirements.

## Overview

In Kubernetes, a Deployment is a controller that creates and manages Pods. You specify the desired state—such as the number of replicas and container specifics—and the Deployment ensures that the actual state matches your specification.

In contrast, OpenShift supports both standard Kubernetes Deployments and a native DeploymentConfig. The diagram below illustrates the differences: the top left depicts a standard Kubernetes Deployment, while the bottom right represents an OpenShift-specific DeploymentConfig using a Custom Resource Definition (CRD) operator.

![The image compares "Deployment" and "Deployment Config" in Kubernetes, highlighting their roles in managing pods, specifying container specs, and handling replicas or configuration changes.](https://kodekloud.com/kk-media/image/upload/v1752882592/notes-assets/images/OpenShift-4-Deployment-Config-vs-Kubernetes-Deployment/kubernetes-deployment-vs-config-comparison.jpg)

## YAML Manifest Examples

Below you will find example YAML manifests for both a Kubernetes Deployment and an OpenShift DeploymentConfig. Notice that both configurations define the desired state for the application, including pod replicas and container specifications.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
  namespace: mike11992-dev
spec:
  replicas: 3
  selector:
    matchLabels:
      app: httpd
  template:
    metadata:
      labels:
        app: httpd
    spec:
      containers:
      - name: httpd
        image: image-registry.openshift-image-registry.svc:5000/openshift/httpd
        ports:
        - containerPort: 8080
---
apiVersion: apps.openshift.io/v1
kind: DeploymentConfig
metadata:
  name: example
  namespace: mike11992-dev
spec:
  replicas: 3
  selector:
    app: httpd
  template:
    metadata:
      labels:
        app: httpd
    spec:
      containers:
      - name: httpd
        image: image-registry.openshift-image-registry.svc:5000/openshift/httpd
        ports:
        - containerPort: 8080
```

> [!important]
> **Key Insight**
>
> Both objects act as controllers for Pods. By specifying a replica count (such as 1, 3, or 10), the respective controllers ensure that the desired number of Pods is always running.

## Key Differences

While both the Kubernetes Deployment and OpenShift DeploymentConfig manage replicas and container specifications, their core differences lie in the underlying mechanisms and update flexibility:

| Feature                    | Kubernetes Deployment                            | OpenShift DeploymentConfig                                                   |
| -------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| Underlying Mechanism       | Uses a ReplicaSet to maintain pod replicas       | Uses a ReplicaController which supports only equality-based selectors        |
| Update Process             | Rolling update strategy for seamless transitions | Direct image swap capability in the manifest for rapid configuration changes |
| Selector Flexibility       | Supports set-based selector requirements         | Supports only equality-based selectors                                       |
| Primary Use Recommendation | Recommended for standard use                     | Use only when specific OpenShift features are needed                         |

### Replication Process

- A standard Kubernetes Deployment leverages a ReplicaSet—a native Kubernetes object that ensures the specified number of pod replicas are active. If a pod fails, the ReplicaSet automatically creates a new instance to maintain the required pod count.
- OpenShift’s DeploymentConfig, on the other hand, uses a ReplicaController. Though it functions similarly by managing pod count, its selection criteria are limited to equality-based selectors.

### Updating Container Images

- In DeploymentConfigs, container images can be updated directly within the manifest. This allows for rapid upgrades or configuration adjustments.
- In contrast, Kubernetes Deployments use a rolling update strategy. This method provides a safer transition between different image versions by gradually updating the pods.

> [!important]
> **Best Practice**
>
> Red Hat OpenShift documentation advises using standard Kubernetes Deployments unless you require the additional features provided by DeploymentConfigs.

## Conclusion

Understanding these distinctions allows you to choose the appropriate deployment mechanism for your environment. Whether you are working with Kubernetes or OpenShift, both methods provide robust tools for managing your application deployments reliably.

For further reading, consider exploring:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [OpenShift Documentation](https://docs.openshift.com/)

By tailoring the deployment strategy to your specific needs, you can enhance the performance and maintainability of your applications in any container orchestration environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/3200131b-dec7-4422-9e05-68c751bc4213/lesson/d519ce74-ac32-4807-9f0d-b26bba7519b1)**
>
> Watch video content
