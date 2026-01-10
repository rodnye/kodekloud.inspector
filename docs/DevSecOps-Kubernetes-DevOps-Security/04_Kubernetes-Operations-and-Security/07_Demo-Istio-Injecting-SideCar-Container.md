# Demo Istio Injecting SideCar Container - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Kubernetes-Operations-and-Security/Demo-Istio-Injecting-SideCar-Container)

---

## Table of Contents

- Demo Istio Injecting SideCar Container
  - Introduction
  - Sidecar Injection Methods
  - Istio Demo Architecture
  - Prerequisites
  - 1. Create and Label the prod Namespace
  - 2. Deploy the Node.js Service
  - 3. Enable Automatic Sidecar Injection
  - 4. Restart the Deployment
  - 5. Verify the Sidecar Injection
  - Next Steps
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

DevSecOps - Kubernetes DevOps & Security

Kubernetes Operations and Security

# Demo Istio Injecting SideCar Container

## Introduction

Istio sidecar injection embeds an Envoy proxy alongside your application container to enable advanced traffic management, mutual TLS, and telemetry within Kubernetes. In this guide, you’ll learn how to:

- Inject an Envoy sidecar into a pod automatically
- Deploy a Node.js microservice in a dedicated namespace
- Verify the injected sidecar and inspect traffic flows

Sidecar proxy is also known as a sidecar container, proxy sidecar, or Envoy sidecar—these terms are used interchangeably.

## Sidecar Injection Methods

Istio offers two approaches to inject the Envoy proxy into your workloads:

| Method              | Description                                                                         | Commands                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Automatic Injection | Labels a namespace so that any new pod includes the sidecar via a mutating webhook. | `bash<br>kubectl label namespace <name> istio-injection=enabled<br>kubectl apply -f movies.yaml` |
| Manual Injection    | Injects proxy settings directly into your YAML before applying with `istioctl`.     | `bash<br>kubectl apply -f <(istioctl kube-inject -f movies.yaml)`                                |

> [!important]
> **Note**
>
> We’ll use **Automatic Injection** for this demo, since it requires no modifications to your application manifests.

## Istio Demo Architecture

![The image is a diagram of an Istio demo architecture on the Azure platform, showing the interaction between Kubernetes, microservices, Envoy, Apigee, and monitoring tools. It illustrates HTTP calls, API management, and traffic management within the system.](https://kodekloud.com/kk-media/image/upload/v1752873750/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Istio-Injecting-SideCar-Container/istio-demo-architecture-azure-diagram.jpg)

| Component                   | Role                                                                  |
| --------------------------- | --------------------------------------------------------------------- |
| Azure VM Kubernetes Cluster | Hosts Istio control plane (Pilot, Citadel, Galley) and workloads      |
| Istio Sidecar (Envoy)       | Intercepts pod traffic for routing, mTLS, and telemetry               |
| Telemetry & Visualization   | Grafana, Prometheus, Kiali, Jaeger capture metrics and traces         |
| API Management (Optional)   | Apigee integration for API security, developer portals, and analytics |

## Prerequisites

- A Kubernetes cluster with Istio installed
- `kubectl` and `istioctl` CLI tools available
- Docker image `siddharth67/node-service:v1` pushed to a registry

## 1\. Create and Label the `prod` Namespace

First, set a shorthand for `kubectl`:

```
alias k=kubectl
```

List your namespaces:

```
k get ns
```

Create `prod` and confirm:

```
k create namespace prod
k get ns
```

## 2\. Deploy the Node.js Service

Deploy the Node.js microservice with a single container initially:

```
k -n prod create deployment node-app \
  --image=siddharth67/node-service:v1
```

Expose it as a ClusterIP service on port 5000:

```
k -n prod expose deployment node-app \
  --name=node-service \
  --port=5000 \
  --target-port=5000 \
  --type=ClusterIP
```

Verify the resources:

```
k get all -n prod
```

## 3\. Enable Automatic Sidecar Injection

Inspect existing namespace labels:

```
kubectl get ns --show-labels
```

Label `prod` for Istio:

```
kubectl label namespace prod istio-injection=enabled
kubectl get ns --show-labels
```

> [!important]
> **Note**
>
> The `istio-system` namespace is generally labeled `istio-injection=disabled` to prevent sidecar injection into control plane components.

## 4\. Restart the Deployment

Trigger pod recreation so the Envoy sidecar is injected:

```
kubectl -n prod rollout restart deployment node-app
kubectl -n prod rollout status deployment/node-app
```

Confirm new pods show `2/2` READY:

```
kubectl get pods -n prod
```

## 5\. Verify the Sidecar Injection

Inspect one of the pods in detail:

```
kubectl -n prod describe pod <pod-name>
```

Under **Containers:** you should see:

- `node-service` (your application)
- `istio-proxy` (Envoy sidecar, e.g., `docker.io/istio/proxyv2:1.9.0`)

List pods again:

```
kubectl -n prod get pods
NAME                            READY   STATUS    RESTARTS   AGE
node-app-597c464649-lgs82       2/2     Running   0          100s
```

## Next Steps

You can extend this workflow by deploying additional services—such as a Spring Boot app via Jenkins Pipeline—or by customizing traffic routing with Istio VirtualServices and DestinationRules.

## Links and References

- [Istio Documentation](https://istio.io/latest/docs/)
- [Kubernetes Concepts](https://kubernetes.io/docs/concepts/)
- [Grafana](https://grafana.com/) & [Prometheus](https://prometheus.io/) & [Kiali](https://kiali.io/) & [Jaeger](https://www.jaegertracing.io/)
- [Apigee on Google Cloud](https://cloud.google.com/apigee)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/c955f7a9-f289-4e8b-89b4-f6d7964ec75b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/8ebe9001-3358-4027-b9c9-5b359cdfcdb9)**
>
> Practice lab
