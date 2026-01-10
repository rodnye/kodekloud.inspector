# Liveness Probes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Liveness-Probes)

---

## Table of Contents

- Liveness Probes
  - Basic Docker Behavior
  - Kubernetes Automatic Restarts
  - Introducing Liveness Probes
  - Additional Probe Examples
  - Links and References
  - Watch Video
    - HTTP Liveness Probe Example

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Liveness Probes

In Kubernetes, **liveness probes** periodically check whether a container is still running correctly. If a probe fails, Kubernetes kills and restarts the container, restoring application availability without manual intervention.

## Basic Docker Behavior

When you run an application in Docker, any crash stops the container until you restart it manually:

```
docker run nginx
```

If the `nginx` process crashes:

```
docker ps -a
```

```
CONTAINER ID        IMAGE    CREATED         STATUS                     PORTS
45aacca36850        nginx    43 seconds ago  Exited (1) 41 seconds ago
```

## Kubernetes Automatic Restarts

Kubernetes continuously monitors container exit codes and restarts crashed containers automatically:

```
kubectl run nginx --image=nginx
kubectl get pods
```

```
NAME        READY   STATUS      RESTARTS   AGE
nginx-pod   0/1     Completed   1          1d
```

Each time the container exits unexpectedly, the **RESTARTS** count increments. However, if an application stays running but becomes unresponsive (for example, trapped in an infinite loop), Kubernetes still considers it healthy—until you explicitly tell it how to check deeper.

> [!important]
> **Warning**
>
> Without a liveness probe, Kubernetes **cannot** detect hung or unresponsive applications that have not exited.

## Introducing Liveness Probes

A **liveness probe** defines how Kubernetes determines container health. You choose one of three probe types:

| Probe Type | Use Case               | Configuration Snippet            |
| ---------- | ---------------------- | -------------------------------- |
| HTTP GET   | Web services           | `httpGet` with `path` and `port` |
| TCP Socket | TCP-based protocols    | `tcpSocket` with `port`          |
| Exec       | Custom commands/checks | `exec` with a `command` array    |

When a container fails its liveness probe, Kubernetes restarts it automatically.

### HTTP Liveness Probe Example

```
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp
spec:
  containers:
    - name: simple-webapp
      image: simple-webapp
      ports:
        - containerPort: 8080
      livenessProbe:
        httpGet:
          path: /api/healthy
          port: 8080
        initialDelaySeconds: 15
        periodSeconds: 10
        failureThreshold: 3
```

Explanation:

1.  `initialDelaySeconds: 15`  
    Waits 15 seconds before the first health check.
2.  `periodSeconds: 10`  
    Probes every 10 seconds.
3.  `failureThreshold: 3`  
    Restarts the container after three consecutive failures.

## Additional Probe Examples

Below are more probe configurations—applicable to both **liveness** and **readiness** probes:

```
readinessProbe:
  httpGet:
    path: /api/ready
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 5
  failureThreshold: 8
---
readinessProbe:
  tcpSocket:
    port: 3306
---
readinessProbe:
  exec:
    command:
      - cat
      - /app/is_ready
```

By leveraging these probe types, you ensure Kubernetes can detect both crashed and unresponsive containers, automatically restoring service availability.

## Links and References

- [Kubernetes Probes Documentation](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
- [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/cli/)
- [Pods in Kubernetes Basics](https://kubernetes.io/docs/concepts/workloads/pods/pod/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/df5f3cd3-fd5d-4240-aea3-86e5ca1914de)**
>
> Watch video content
