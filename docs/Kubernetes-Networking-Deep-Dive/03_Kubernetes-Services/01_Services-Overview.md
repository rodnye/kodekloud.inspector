# Services Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Kubernetes-Services/Services-Overview)

---

## Table of Contents

- Services Overview
  - Service Discovery
  - Service Types
  - Links and References
  - Watch Video
    - 1. ClusterIP
    - 2. NodePort
    - 3. LoadBalancer
    - 4. ExternalName

---

## Content

Kubernetes Networking Deep Dive

Kubernetes Services

# Services Overview

Kubernetes Services provide a stable network endpoint for pods, abstracting their dynamic IPs and ensuring consistent communication across the cluster.

![The image illustrates a Kubernetes service (SVC) connecting to multiple pods, with a title asking "What Is a Service?"](https://kodekloud.com/kk-media/image/upload/v1752880363/notes-assets/images/Kubernetes-Networking-Deep-Dive-Services-Overview/kubernetes-service-connecting-multiple-pods.jpg)

A Service definition looks like any other Kubernetes object. You give it a name, set a selector for matching pods, declare ports, and choose a Service type:

```
apiVersion: v1
kind: Service
metadata:
  name: my-service
  namespace: my-namespace
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80         # Service port
      targetPort: 8080 # Pod port
  type: ClusterIP
```

- selector: `app: my-app` matches pods labeled accordingly.
- ports: exposes port 80 and forwards traffic to pod port 8080.
- type: `ClusterIP` (default) makes the Service reachable only within the cluster.

> [!important]
> **Note**
>
> Kubernetes uses EndpointSlices to track pod endpoints automatically. Clients always connect to the Service IP, unaware of pod restarts or IP changes.

---

## Service Discovery

Kubernetes exposes Service endpoints to pods in two ways:

1.  **Environment variables**  
    The kubelet injects:
    - `MY_SERVICE_SERVICE_HOST`
    - `MY_SERVICE_SERVICE_PORT`  
      into each container at startup.

2.  **DNS**  
    With [CoreDNS](https://coredns.io/) (or another DNS add-on), every Service gets an A record and SRV records:

![The image illustrates DNS records related to Kubernetes, showing "Pod" with an "A record" and "Service" with "A record, SRV record," along with a network diagram.](https://kodekloud.com/kk-media/image/upload/v1752880364/notes-assets/images/Kubernetes-Networking-Deep-Dive-Services-Overview/dns-records-kubernetes-pod-service-diagram.jpg)

- **A record**: `service-name.namespace.svc.cluster.local`
- **SRV records**: one per named port, for example:

  ```
  _http._tcp.my-service.my-namespace.svc.cluster.local
  ```

![The image illustrates DNS concepts with a cloud labeled "DNS" surrounded by various icons, and a section explaining "A Records" for service names and namespaces.](https://kodekloud.com/kk-media/image/upload/v1752880365/notes-assets/images/Kubernetes-Networking-Deep-Dive-Services-Overview/dns-concepts-cloud-a-records-icons.jpg)

---

## Service Types

Kubernetes supports four Service types, each controlling how traffic reaches your application.

| Service Type | Exposure Scope        | Port Mapping                       |
| ------------ | --------------------- | ---------------------------------- |
| ClusterIP    | Internal cluster only | Virtual cluster IP                 |
| NodePort     | Host nodes            | NodeIP:`NodePort`                  |
| LoadBalancer | External via LB       | Provisioned cloud load balancer IP |
| ExternalName | DNS redirection       | CNAME record to external hostname  |

### 1\. ClusterIP

Exposes the Service on a cluster-internal IP address. Use it for internal microservice communications or when fronted by an Ingress.

![The image is a diagram titled "Service Types" highlighting "ClusterIP" as the first type, which exposes services internally within a cluster. It is part of a sequence with three other unspecified types.](https://kodekloud.com/kk-media/image/upload/v1752880366/notes-assets/images/Kubernetes-Networking-Deep-Dive-Services-Overview/service-types-clusterip-diagram.jpg)

### 2\. NodePort

Allocates a port on each node’s IP. External clients use `NodeIP:NodePort` to reach the Service.

![The image illustrates a "NodePort" service type, highlighting its function of exposing connections on each node via a user-defined port number and routing access to the exposed application.](https://kodekloud.com/kk-media/image/upload/v1752880367/notes-assets/images/Kubernetes-Networking-Deep-Dive-Services-Overview/nodeport-service-type-illustration.jpg)

### 3\. LoadBalancer

Integrates with cloud-provider load balancers. Kubernetes provisions an external load balancer and maps it to your Service.

![The image is a diagram showing service types, highlighting "LoadBalancer" in green, with a note stating it "Exposes to an External Load Balancer."](https://kodekloud.com/kk-media/image/upload/v1752880368/notes-assets/images/Kubernetes-Networking-Deep-Dive-Services-Overview/service-types-loadbalancer-diagram.jpg)

### 4\. ExternalName

Creates a DNS CNAME record that maps the Service to an external DNS name. No proxies or IPs are provisioned in the cluster.

![The image is a flowchart showing service types, with steps labeled 1, 2, 3, and "ExternalName," and a note indicating "Maps to a CNAME record."](https://kodekloud.com/kk-media/image/upload/v1752880369/notes-assets/images/Kubernetes-Networking-Deep-Dive-Services-Overview/service-types-flowchart-cname-record.jpg)

> [!important]
> **Warning**
>
> `ExternalName` Services do not support port mapping or protocols. They simply return a DNS CNAME.

---

## Links and References

- [Kubernetes Services Concept](https://kubernetes.io/docs/concepts/services-networking/service/)
- [CoreDNS Documentation](https://coredns.io/)
- [DNS SRV Records (Wikipedia)](https://en.wikipedia.org/wiki/SRV_record)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/00c6db37-72b0-44e1-8c3a-81e22c8d8af6/lesson/d61813c6-5c95-4a69-b044-1a6656a6b3e1)**
>
> Watch video content
