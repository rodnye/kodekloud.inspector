# Services ClusterIP - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Services-ClusterIP)

---

## Table of Contents

- Services ClusterIP
  - Why Use a ClusterIP Service?
  - Defining a ClusterIP Service
  - Pod Definition with Matching Labels
  - Deploying and Verifying
  - Links and References
  - Watch Video
    - Key Fields

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Services ClusterIP

In this lesson, we’ll deep-dive into the Kubernetes Service of type **ClusterIP**—the default Service type for in-cluster communication. In a typical multi-tier application (front-end, back-end, in-memory cache like [Redis](https://redis.io/), and a database such as [MySQL](https://www.mysql.com/)), each component lives in its own set of Pods. Since Pod IPs are ephemeral, you need a stable endpoint for reliable, load-balanced communication between tiers.

A **ClusterIP Service** assigns a virtual IP and DNS name inside the cluster. Pods can address the Service by name (e.g., `back-end`), and Kubernetes will distribute traffic across the matching Pods.

![The image is a diagram of a Kubernetes ClusterIP setup, showing a network of pods organized into front-end, back-end, and Redis layers, each with specific IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752874032/notes-assets/images/Docker-Certified-Associate-Exam-Course-Services-ClusterIP/kubernetes-clusterip-diagram-pods.jpg)

## Why Use a ClusterIP Service?

| Benefit                   | Description                                                                 |
| ------------------------- | --------------------------------------------------------------------------- |
| Stable in-cluster address | Pods reference a single virtual IP and DNS name instead of changing Pod IPs |
| Built-in load balancing   | Distributes traffic evenly across all healthy Pods                          |
| Decoupling components     | Front-end, back-end, cache, and DB tiers communicate via service names      |

## Defining a ClusterIP Service

Create `service-definition.yml` to expose your back-end Pods:

```
# service-definition.yml
apiVersion: v1
kind: Service
metadata:
  name: back-end
spec:
  selector:
    app: myapp
    tier: back-end
  ports:
    - port: 80        # Service port exposed inside the cluster
      targetPort: 80  # Port on the container
      protocol: TCP
```

> [!important]
> **Note**
>
> By default, `spec.type` is `ClusterIP`. If you omit it, Kubernetes will still create a ClusterIP Service unless you specify another type.

### Key Fields

| Field           | Description                                     |
| --------------- | ----------------------------------------------- |
| `metadata.name` | Name of the Service (DNS name within cluster)   |
| `spec.selector` | Labels used to identify the target Pods         |
| `spec.ports`    | List of ports the Service exposes and routes to |

## Pod Definition with Matching Labels

Ensure your Pods carry labels that match the Service’s selector:

```
# pod-definition.yml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-backend-pod
  labels:
    app: myapp
    tier: back-end
spec:
  containers:
    - name: nginx-container
      image: nginx
      ports:
        - containerPort: 80
```

## Deploying and Verifying

Apply the Service and check its status:

```
kubectl apply -f service-definition.yml
kubectl get services
```

Example output:

```
NAME       TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
back-end   ClusterIP   10.96.123.45   <none>        80/TCP    30s
```

Now, any Pod in the cluster can reach the back-end tier by calling:

```
http://back-end:80
```

Kubernetes will automatically load-balance requests across all matching Pods.

## Links and References

- [Kubernetes Services Overview](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Redis Official Site](https://redis.io/)
- [MySQL Official Site](https://www.mysql.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **Warning**
>
> Avoid mapping Service ports directly to host ports in production; use `ClusterIP` for secure, in-cluster traffic and consider `Ingress` or `LoadBalancer` types for external access.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/ec963a0c-97e2-4614-be8f-5f141fc2d0a6)**
>
> Watch video content
