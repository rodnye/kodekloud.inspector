# Readiness Probes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Readiness-Probes)

---

## Table of Contents

- Readiness Probes
  - Pod Lifecycle Recap
  - Understanding Pod Conditions
  - Why Readiness Probes Matter
  - Probe Types
  - Configuring Readiness Probes
  - Customizing Probe Timing
  - Readiness in a Scaled Deployment
  - Links and References
  - Watch Video
    - 1. HTTP GET Probe
    - 2. TCP Socket Probe
    - 3. Exec Command Probe

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Readiness Probes

In this guide, you’ll learn how Kubernetes readiness probes contribute to observability and reliability by controlling when your Pods receive traffic. We’ll cover Pod lifecycle phases, conditions, probe types, configuration options, and best practices for multi-Pod deployments.

---

## Pod Lifecycle Recap

A Pod transitions through several high-level phases:

- **Pending**: Scheduler is selecting a node.
- **ContainerCreating**: Image pull and container startup.
- **Running**: All containers have started successfully.

Check the current phase:

```
kubectl get pods
```

![The image shows a "POD Status" screen with labels "Pending" and "ContainerCreating," along with three colored bars and a circular loading icon.](https://kodekloud.com/kk-media/image/upload/v1752874023/notes-assets/images/Docker-Certified-Associate-Exam-Course-Readiness-Probes/pod-status-pending-containercreating.jpg)

For more detail on each Pod, use:

```
kubectl describe pod <pod-name>
```

---

## Understanding Pod Conditions

Pod conditions are booleans that provide deeper insights:

- **PodScheduled**: Has the scheduler assigned a node?
- **Initialized**: Have init containers completed?
- **ContainersReady**: Are all containers in `Running` state?
- **Ready**: Is the Pod prepared to serve requests?

![The image shows a diagram titled "POD Conditions" with four conditions: PodScheduled, Initialized, ContainersReady, and Ready, each having "TRUE" and "FALSE" options. There is also a circular diagram with three smaller circles inside.](https://kodekloud.com/kk-media/image/upload/v1752874024/notes-assets/images/Docker-Certified-Associate-Exam-Course-Readiness-Probes/pod-conditions-diagram-true-false.jpg)

Inspect conditions directly:

```
kubectl describe pod <pod-name>
```

> [!important]
> **Note**
>
> By default, Kubernetes marks the `Ready` condition as `True` once containers start, even if the application isn’t fully initialized.

---

## Why Readiness Probes Matter

Without readiness probes, a Service may route traffic to a Pod before its application is ready, resulting in errors for end users. Readiness probes let you tie the `Ready` condition to an actual in-container health check.

![The image illustrates "Readiness Probes" with icons and labels for HTTP Test, TCP Test, and Exec Command.](https://kodekloud.com/kk-media/image/upload/v1752874025/notes-assets/images/Docker-Certified-Associate-Exam-Course-Readiness-Probes/readiness-probes-http-tcp-exec.jpg)

---

## Probe Types

| Type       | Description                                 | Example Snippet               |
| ---------- | ------------------------------------------- | ----------------------------- |
| HTTP GET   | Performs an HTTP GET request against a path | `httpGet: { path: "/ready" }` |
| TCP Socket | Attempts a TCP connection on a port         | `tcpSocket: { port: 3306 }`   |
| Exec       | Runs a command inside the container         | `exec: { command: ["cat"] }`  |

---

## Configuring Readiness Probes

Add a `readinessProbe` block under your container spec:

### 1\. HTTP GET Probe

```
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp
spec:
  containers:
    - name: simple-webapp
      image: simple-webapp:latest
      ports:
        - containerPort: 8080
      readinessProbe:
        httpGet:
          path: /api/ready
          port: 8080
```

### 2\. TCP Socket Probe

```
readinessProbe:
  tcpSocket:
    port: 3306
```

### 3\. Exec Command Probe

```
readinessProbe:
  exec:
    command:
      - cat
      - /app/is_ready
```

---

## Customizing Probe Timing

Fine-tune how and when probes run:

```
readinessProbe:
  httpGet:
    path: /api/ready
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 5
  failureThreshold: 3
```

| Parameter           | Description                                   | Default |
| ------------------- | --------------------------------------------- | ------- |
| initialDelaySeconds | Seconds to wait before first probe            | 0       |
| periodSeconds       | Interval between each probe                   | 10      |
| failureThreshold    | Number of failures before marking as **fail** | 3       |

> [!important]
> **Note**
>
> Consider also configuring **liveness probes** to restart unhealthy containers.

---

## Readiness in a Scaled Deployment

When you scale a Deployment, only Pods that pass their readiness probe will start receiving traffic. This prevents service disruptions caused by uninitialized instances.

![The image shows a diagram labeled "POD Conditions" with a green triangle connected to three blue circles, each marked as "Ready" with checkmarks. There are also two browser windows above the triangle, one showing "SUCCESS."](https://kodekloud.com/kk-media/image/upload/v1752874026/notes-assets/images/Docker-Certified-Associate-Exam-Course-Readiness-Probes/pod-conditions-diagram-success.jpg)

> [!important]
> **Warning**
>
> Ensure your readiness probe endpoint is lightweight and fast to avoid delaying traffic routing.

---

## Links and References

- [Kubernetes Readiness and Liveness Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
- [Kubernetes Concepts: Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

---

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/c0015a7f-8876-477a-baac-e4020c67fa87)**
>
> Watch video content
