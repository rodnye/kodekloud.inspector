# Sprint 06 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-06/Sprint-06)

---

## Table of Contents

- Sprint 06
  - Prerequisites
  - Why You Need a Service
  - Comparing Service Types
  - Updating gke-deployment.yaml
  - Links and References
  - Watch Video

---

## Content

GCP DevOps Project

Sprint 06

# Sprint 06

In this lesson, you’ll learn how to expose your containerized application on Google Kubernetes Engine (GKE) by extending your existing Deployment manifest with a Service resource. By the end of this sprint, you’ll be able to access your app through a stable, load-balanced endpoint.

## Prerequisites

- A running GKE cluster
- `kubectl` configured to point at your GKE cluster
- An existing `gke-deployment.yaml` that successfully deploys your container

Previously, we deployed our container to GKE, but the application wasn’t reachable from outside the cluster.

![The image shows a YAML file icon with an arrow pointing to a diagram of a person, symbolizing the extension of a gke.yaml file to include code for exposing an application via an endpoint.](https://kodekloud.com/kk-media/image/upload/v1752875511/notes-assets/images/GCP-DevOps-Project-Sprint-06/gke-yaml-file-extension-diagram.jpg)

## Why You Need a Service

A Kubernetes **Service**

- Provides a stable IP or DNS name for your Pods
- Handles load balancing across Pod replicas
- Supports multiple types of exposure (ClusterIP, NodePort, LoadBalancer)

> [!important]
> **Note**
>
> A Service decouples the network policy from your Pods. Even if your Pods get rescheduled or replaced, the Service IP/DNS remains constant.

## Comparing Service Types

| Service Type | Description                                        | Use Case                                                   |
| ------------ | -------------------------------------------------- | ---------------------------------------------------------- |
| ClusterIP    | Internal access within the cluster                 | Microservices communication                                |
| NodePort     | Opens a port on each node’s IP                     | Quick testing, on-prem clusters                            |
| LoadBalancer | Provisions a cloud load balancer (GCP, AWS, Azure) | Exposing applications to the public internet automatically |

For GKE, **LoadBalancer** is the most straightforward way to get an external IP.

## Updating `gke-deployment.yaml`

Add the following Service manifest **below** your existing Deployment spec in `gke-deployment.yaml`:

```
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
  labels:
    app: my-app
spec:
  type: LoadBalancer             # Exposes the Service via a cloud load balancer
  ports:
    - port: 80                   # External port
      targetPort: 8080           # Container port
      protocol: TCP
  selector:
    app: my-app                  # Matches Deployment pods
```

Then apply the changes:

```
kubectl apply -f gke-deployment.yaml
```

Run `kubectl get svc my-app-service` to retrieve the external IP:

```
NAME             TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)        AGE
my-app-service   LoadBalancer   10.96.5.123    34.68.12.34     80:31234/TCP   2m
```

Your application is now accessible at `http://34.68.12.34`.

> [!important]
> **Warning**
>
> Provisioning a LoadBalancer can incur additional GCP costs. Be sure to [delete unused Services](https://cloud.google.com/kubernetes-engine/docs/how-to/service-parameters#deleting_resources) when you’re done.

## Links and References

- [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)
- [GKE LoadBalancer Service Guide](https://cloud.google.com/kubernetes-engine/docs/how-to/service-parameters#loadbalancer)
- [kubectl apply Documentation](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#apply)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/001eaf30-3cc6-4d71-8b48-c59ac4e5e0f8/lesson/0e2c7a41-3d34-40b1-9898-55bbd9801cc4)**
>
> Watch video content
