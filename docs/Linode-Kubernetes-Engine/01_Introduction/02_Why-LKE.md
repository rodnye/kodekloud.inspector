# Why LKE - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linode-Kubernetes-Engine/Introduction/Why-LKE)

---

## Table of Contents

- Why LKE
  - What Is Kubernetes and Why Use It?
  - Why Choose Linode Kubernetes Engine (LKE)?
  - Next Steps
  - References
  - Watch Video
    - Example: Scaling with a Deployment
    - Key Benefits of LKE

---

## Content

Linode : Kubernetes Engine

Introduction

# Why LKE

In this article, we’ll answer two key questions to help you build and scale containerized applications:

1.  What problems does Kubernetes solve?
2.  How does Linode Kubernetes Engine (LKE) make Kubernetes even easier?

---

## What Is Kubernetes and Why Use It?

Kubernetes is an open-source container orchestration platform designed to automate deployment, scaling, and management of containerized workloads. If you’re running a multi-VM web application and need high availability, Kubernetes lets you:

- Define your application as containers grouped into Pods
- Distribute Pods across a cluster of nodes
- Automatically scale based on desired replica count
- Self-heal by replacing or restarting unhealthy Pods

### Example: Scaling with a Deployment

Below is a simple Deployment manifest that runs five replicas of a web application. Kubernetes handles scheduling, health checks, and rescheduling automatically:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 5
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: my-web-app:latest
        ports:
        - containerPort: 80
```

You can also scale on the fly:

```
kubectl scale deployment/web-app --replicas=10
```

> [!important]
> **Note**
>
> Kubernetes is platform-agnostic. You can run it on bare metal, on-premises VMs, or any cloud provider.

---

## Why Choose Linode Kubernetes Engine (LKE)?

Deploying “upstream” Kubernetes means you’re responsible for every control-plane component:

- API server, Controller Manager, Scheduler
- etcd datastore
- Networking (kube-proxy, CNI plugins)
- Certificate management and RBAC
- Upgrades, backups, and security patches

Maintaining these at scale demands time and expertise. Linode Kubernetes Engine abstracts away the operational overhead so you can focus on your applications:

| Responsibility              | Self-Managed Kubernetes | Linode Kubernetes Engine  |
| --------------------------- | ----------------------- | ------------------------- |
| Control Plane               | You                     | Fully managed             |
| etcd Storage                | You                     | Highly available, managed |
| Cluster Upgrades & Patching | Manual                  | Automated                 |
| Networking Setup            | You                     | Preconfigured CNI         |
| Logging & Monitoring        | Third-party setup       | Integrated options        |

### Key Benefits of LKE

- **Managed Control Plane**: API server, etcd, Controller Manager, and Scheduler—all maintained by Linode.
- **Automated Upgrades**: One-click cluster upgrades keep you on the latest stable release.
- **Integrated Add-Ons**: Built-in logging, monitoring, and autoscaling.
- **Simplified Networking & Storage**: Linode’s CNI and Block Storage integrates seamlessly.

> [!important]
> **Warning**
>
> Be sure to review [Linode’s resource quotas and limits](https://www.linode.com/docs/kubernetes/) before provisioning production clusters to avoid unexpected interruptions.

---

## Next Steps

In the following lesson, we’ll walk through:

1.  Creating your first LKE cluster
2.  Configuring `kubectl` access
3.  Deploying a sample application

Stay tuned for a hands-on tutorial that takes you from zero to running workloads on Linode Kubernetes Engine!

---

## References

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Linode Kubernetes Engine Overview](https://www.linode.com/docs/kubernetes/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linode-kubernetes-engine/module/c530412c-19ac-4b5a-a852-d025b095a75c/lesson/1ee5579f-c086-4390-8785-ec1271387f8f)**
>
> Watch video content
