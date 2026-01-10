# Service Discovery and DNS Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Kubernetes-Services/Service-Discovery-and-DNS-Overview)

---

## Table of Contents

- Service Discovery and DNS Overview
  - How Service Discovery Works
  - Service Discovery Mechanisms
  - Environment Variables
  - DNS-Based Service Discovery
  - References
  - Watch Video
    - DNS Records
    - Shortened DNS Names

---

## Content

Kubernetes Networking Deep Dive

Kubernetes Services

# Service Discovery and DNS Overview

Service discovery ensures that microservices within a Kubernetes cluster can locate and communicate with each other without hard-coding IP addresses or hostnames. Kubernetes automates this process using environment variables and DNS, backed by EndpointSlices that track pod membership.

![The image illustrates service discovery in a Kubernetes cluster, showing communication between Service A and Service B without hardcoding IP addresses or hostnames.](https://kodekloud.com/kk-media/image/upload/v1752880350/notes-assets/images/Kubernetes-Networking-Deep-Dive-Service-Discovery-and-DNS-Overview/kubernetes-service-discovery-communication.jpg)

## How Service Discovery Works

When pods are created, scaled, or terminated, Kubernetes updates EndpointSlices to record which pods back each Service. Although you can query these slices via the API server, Kubernetes provides higher-level abstractions to hide this complexity.

![The image explains how service discovery works in Kubernetes, highlighting the use of EndpointSlices for automation, updates with pod changes, and the complexity of querying the Kubernetes API.](https://kodekloud.com/kk-media/image/upload/v1752880352/notes-assets/images/Kubernetes-Networking-Deep-Dive-Service-Discovery-and-DNS-Overview/kubernetes-service-discovery-endpointslices.jpg)

## Service Discovery Mechanisms

| Mechanism             | Description                                        | Pros                                     | Cons                                             |
| --------------------- | -------------------------------------------------- | ---------------------------------------- | ------------------------------------------------ |
| Environment Variables | Kubelet injects service host/port as env vars      | Immediate access<br>Zero additional deps | Static at pod start<br>Namespace-scoped          |
| DNS                   | CoreDNS (or kube-dns) auto-creates service records | Dynamic updates<br>Cross-namespace       | Requires DNS service<br>Potential lookup latency |

## Environment Variables

When a pod is launched, the Kubelet generates environment variables for each Service in the same namespace. These include the service’s ClusterIP, ports, and protocol:

```
MY_APP_SERVICE_HOST=10.0.0.11
MY_APP_SERVICE_PORT=80
MY_APP_PORT=tcp://10.0.0.11:80
MY_APP_PORT_80_TCP=tcp://10.0.0.11:80
MY_APP_PORT_80_TCP_PROTO=tcp
MY_APP_PORT_80_TCP_PORT=80
MY_APP_PORT_80_TCP_ADDR=10.0.0.11
```

Example Service manifest that produces these variables:

```
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      name: my-app
      port: 80
      targetPort: 80
  type: ClusterIP
```

> [!important]
> **Note**
>
> Service names are uppercased and dashes become underscores when generating environment variables. The Service must exist before the pod starts, since variables are injected at launch time.

## DNS-Based Service Discovery

Deploy a DNS add-on (e.g., [CoreDNS](https://coredns.io/)) to enable DNS lookups for Services. CoreDNS watches the Kubernetes API and automatically creates DNS records whenever Services change.

![The image features the CoreDNS logo and mentions "New services" and "Creates a DNS record" alongside an API icon.](https://kodekloud.com/kk-media/image/upload/v1752880352/notes-assets/images/Kubernetes-Networking-Deep-Dive-Service-Discovery-and-DNS-Overview/coredns-logo-new-services-dns-record.jpg)

![The image illustrates concepts related to DNS in Kubernetes, showing a network diagram with the Kubernetes logo and a symbol representing service discovery. It includes text about accessing services across namespaces and service discovery.](https://kodekloud.com/kk-media/image/upload/v1752880354/notes-assets/images/Kubernetes-Networking-Deep-Dive-Service-Discovery-and-DNS-Overview/kubernetes-dns-service-discovery-diagram.jpg)

### DNS Records

By default, Kubernetes creates both A and SRV records for each Service:

```
A record:
my-app.default.svc.cluster.local


SRV record:
_my-app._tcp.my-app.default.svc.cluster.local
```

Both records resolve to the service’s ClusterIP.

### Shortened DNS Names

Depending on the client’s namespace and search path, you can drop portions of the full DNS name:

- Outside the namespace: `my-app.default`
- Inside the namespace: `my-app`

The pod’s `/etc/resolv.conf` (configured by the kubelet) controls this:

```
search backup-system.svc.cluster.local svc.cluster.local cluster.local
nameserver 10.96.0.10
options ndots:5
```

DNS resolution first tries the pod’s namespace domain, then `svc.cluster.local`, and finally `cluster.local`.

> [!important]
> **Warning**
>
> If `ndots` is set too low, lookups may skip qualified names. Ensure `options ndots:5` (or higher) to allow short names in-cluster.

---

Let’s launch a Service on our cluster to see service discovery in action.

## References

- [Kubernetes Service Discovery](https://kubernetes.io/docs/concepts/services-networking/service/)
- [CoreDNS Documentation](https://coredns.io/)
- [Kubernetes EndpointSlices](https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/00c6db37-72b0-44e1-8c3a-81e22c8d8af6/lesson/3d420ac3-eedc-496a-9ba2-209a42c416ab)**
>
> Watch video content
