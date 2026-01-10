# Services NodePort - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Services-NodePort)

---

## Table of Contents

- Services NodePort
  - Why Use Kubernetes Services?
  - External Access Use Case
  - NodePort Service Ports Explained
  - Defining a NodePort Service
  - Scaling with Multiple Pods and Nodes
  - Summary
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Services NodePort

Welcome to this tutorial on Kubernetes Services. In this guide, we'll focus on the NodePort type, which enables external traffic to reach Pods through a port on each Node. Kubernetes Services provide stable network endpoints for Pods, enabling reliable communication both within the cluster and from outside clients.

## Why Use Kubernetes Services?

Kubernetes Services decouple the front-end, back-end, and data-layer Pods, offering:

- **Stable endpoints**: Consistent IPs or DNS names for Pods that may be recreated.
- **Load balancing**: Distributes traffic evenly across multiple Pods.
- **Discoverability**: Native service discovery within the cluster network.

Applications typically consist of:

- Front-end Pods serving user interfaces
- Back-end Pods processing business logic
- Pods connecting to external data sources

With Services, these components can communicate without hardcoding Pod IPs.

## External Access Use Case

By default, Pod IPs (e.g., 10.244.0.2) are only reachable inside the cluster network. To access a web server Pod from your laptop (192.168.1.10) without SSH’ing into the Node (192.168.1.2), you need a NodePort Service which maps a port on the Node to the Pod’s port.

```
curl http://192.168.1.2:30008
Hello World!
```

| Service Type | Use Case                                                        | Example Configuration                  |
| ------------ | --------------------------------------------------------------- | -------------------------------------- |
| ClusterIP    | Internal-only service for Pod-to-Pod communication              | `type: ClusterIP`                      |
| NodePort     | Exposes Pod on a port across all Nodes for external access      | `type: NodePort`<br/>`nodePort: 30008` |
| LoadBalancer | Provisions a cloud load balancer to distribute external traffic | `type: LoadBalancer`                   |

> [!important]
> **Note**
>
> `NodePort` ranges from 30000 to 32767 by default. You can customize this in the API server flags.

![The image illustrates a Kubernetes NodePort service setup, showing a service routing traffic from port 30008 to a pod at IP 10.244.0.2 on port 80.](https://kodekloud.com/kk-media/image/upload/v1752874034/notes-assets/images/Docker-Certified-Associate-Exam-Course-Services-NodePort/kubernetes-nodeport-service-setup.jpg)

## NodePort Service Ports Explained

A NodePort Service uses three port definitions:

- **targetPort**: Port on the Pod (e.g., 80)
- **port**: Virtual Service port inside the cluster (e.g., 80)
- **nodePort**: Port on each Node, accessible externally (e.g., 30008)

Traffic to `<NodeIP>:<nodePort>` → Service → `port` → Pod at `targetPort`.

## Defining a NodePort Service

1.  **Create a Pod** with labels:

```
# pod-definition.yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    component: frontend
spec:
  containers:
    - name: nginx
      image: nginx:latest
      ports:
        - containerPort: 80
```

2.  **Define the NodePort Service**, matching the Pod labels:

```
# service-definition.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: NodePort
  selector:
    app: myapp
    component: frontend
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30008
```

3.  **Deploy and Verify**:

```
kubectl apply -f pod-definition.yaml
kubectl apply -f service-definition.yaml
kubectl get svc
```

Expected output:

```
NAME             TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
kubernetes       ClusterIP   10.96.0.1        <none>        443/TCP          16d
myapp-service    NodePort    10.106.127.123   <none>        80:30008/TCP     5m
```

Access the application:

```
curl http://192.168.1.2:30008
<html>
  <head><title>Welcome to nginx!</title></head>
  <body><h1>Welcome to nginx!</h1></body>
</html>
```

> [!important]
> **Warning**
>
> Exposing high ports on Nodes can pose security risks. Ensure proper firewall rules and network policies are in place.

## Scaling with Multiple Pods and Nodes

In production, you’ll run multiple Pod replicas for high availability. A NodePort Service automatically load-balances incoming traffic across all Pods that match its selector, even when spread across multiple Nodes.

![The image illustrates a Kubernetes NodePort service setup, showing how a user connects to a service that routes traffic to different pods across multiple nodes.](https://kodekloud.com/kk-media/image/upload/v1752874035/notes-assets/images/Docker-Certified-Associate-Exam-Course-Services-NodePort/kubernetes-nodeport-service-setup-2.jpg)

Simply scale your Deployment or Pod replicas:

```
kubectl scale deployment myapp-deployment --replicas=3
```

Now, requests to any Node at `NodeIP:30008` are distributed across all 3 Pods.

## Summary

- **NodePort Services** expose Pod ports on each Node for external access.
- Key fields: `type: NodePort`, `port`, `targetPort`, and `nodePort`.
- Match Services to Pods via label `selector`.
- Kubernetes handles load balancing across Pods and Nodes automatically.

Next, explore the demo to see NodePort Services in action!

## Links and References

- [Kubernetes Services Documentation](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Exposing Services in Kubernetes](https://kubernetes.io/docs/tasks/access-application-cluster/service-access-application-cluster/)
- [Kubernetes API Reference: Service](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.24/#service-v1-core)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/9132fc61-317f-41b7-854e-1c33494a9112)**
>
> Watch video content
