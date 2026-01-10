# Demo Istio Ingress Gateway and Virtual Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Kubernetes-Operations-and-Security/Demo-Istio-Ingress-Gateway-and-Virtual-Service)

---

## Table of Contents

- Demo Istio Ingress Gateway and Virtual Service
  - Istio Ingress Gateway
  - Istio VirtualService
  - Exposing the DevSecOps Application
  - Access via Istio Ingress Gateway
  - Restricting Paths with VirtualService
  - Viewing Configuration in Kiali
  - Summary
  - Links and References
  - Watch Video
  - Practice Lab
    - Create Gateway + VirtualService for prod

---

## Content

DevSecOps - Kubernetes DevOps & Security

Kubernetes Operations and Security

# Demo Istio Ingress Gateway and Virtual Service

In this guide, you’ll learn how to use Istio’s **Ingress Gateway** and **VirtualService** to expose and control traffic for a Kubernetes-based DevSecOps application. We’ll define the necessary custom resources, apply them, and verify external access. Finally, you’ll see how Kiali can help you visualize and troubleshoot your service mesh configuration.

## Istio Ingress Gateway

An **Ingress Gateway** acts as an edge load balancer for your service mesh, handling incoming HTTP/TCP traffic. It exposes ports and protocols, but unlike Kubernetes Ingress, it does **not** include routing rules—that’s delegated to a VirtualService.

> [!important]
> **Note**
>
> A Gateway only configures the listener. Use a VirtualService to define how traffic is routed.

Here’s a minimal Gateway CRD:

```
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: httpbin-gateway
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "httpbin.example.com"
```

Apply the Gateway:

```
kubectl apply -f gateway.yaml
```

## Istio VirtualService

A **VirtualService** lets you define routing rules that map incoming requests (from a Gateway or internal service) to destinations in the mesh.

![The image shows a webpage from the Istio documentation, specifically discussing "Virtual services" and their role in traffic management. It includes sections on why virtual services are used, with a navigation sidebar on the right.](https://kodekloud.com/kk-media/image/upload/v1752873745/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Istio-Ingress-Gateway-and-Virtual-Service/istio-virtual-services-traffic-management.jpg)

Example: route all HTTP traffic for `httpbin.example.com` to the `httpbin` service on port 8000.

```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: httpbin
spec:
  hosts:
  - "httpbin.example.com"
  http:
  - route:
    - destination:
        host: httpbin
        port:
          number: 8000
```

Apply it:

```
kubectl apply -f virtualservice.yaml
```

## Exposing the DevSecOps Application

Our application `devsecops-svc` is currently a ClusterIP service on port 8080 in the `prod` namespace:

```
kubectl -n prod get svc
# NAME             TYPE        CLUSTER-IP       PORT(S)     AGE
# devsecops-svc    ClusterIP   10.101.121.127   8080/TCP    4d3h
# node-service     ClusterIP   10.101.46.231    5000/TCP    4d5h
```

Internally it responds as expected:

```
while true; do
  curl -s 10.101.121.127:8080/increment/99
  sleep 1
done
```

### Create Gateway + VirtualService for `prod`

Create both resources in a single manifest (`istio-gateway-vs.yaml`):

```
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: devsecops-gateway
  namespace: prod
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      name: http
      number: 80
      protocol: HTTP
    hosts:
    - "*"
---
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: devsecops-numeric
  namespace: prod
spec:
  gateways:
  - devsecops-gateway
  hosts:
  - "*"
  http:
  - match:
    - uri:
        prefix: /increment
    - uri:
        exact: /
    route:
    - destination:
        host: devsecops-svc
        port:
          number: 8080
```

Apply and verify:

```
kubectl apply -f istio-gateway-vs.yaml
kubectl get gateway,virtualservice -n prod
```

## Access via Istio Ingress Gateway

Istio’s `istio-ingressgateway` Service is typically a LoadBalancer or NodePort. In this environment it’s exposed on NodePort **32564**:

```
kubectl -n istio-system get svc istio-ingressgateway
# NAME                   TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
# istio-ingressgateway   NodePort   10.96.123.45    <none>        80:32564/TCP     2h
```

Test external access:

```
curl localhost:32564/
curl localhost:32564/increment/11
# 12
```

Both `/` and `/increment` are reachable through the Gateway.

## Restricting Paths with VirtualService

To disable the root path (`/`) externally, remove or comment out the exact-match rule:

```
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: devsecops-numeric
  namespace: prod
spec:
  gateways:
  - devsecops-gateway
  hosts:
  - "*"
  http:
  - match:
    - uri:
        prefix: /increment
    # - uri:
    #     exact: /
    route:
    - destination:
        host: devsecops-svc
        port:
          number: 8080
```

Apply and test again:

```
kubectl apply -f istio-gateway-vs.yaml
curl localhost:32564/                # no response
curl localhost:32564/increment/11    # returns 12
```

## Viewing Configuration in Kiali

Kiali provides a UI for inspecting Istio resources.

![The image shows a Kiali dashboard displaying Istio configuration for a namespace "prod," listing a Gateway and a VirtualService with their configurations.](https://kodekloud.com/kk-media/image/upload/v1752873746/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Istio-Ingress-Gateway-and-Virtual-Service/kiali-dashboard-istio-configuration-prod.jpg)

You can also view your service mesh topology:

![The image shows a Kiali dashboard displaying a service mesh graph with nodes representing services and their interactions within a Kubernetes environment. The graph includes services like "devsecops-svc" and "node-service" with connections indicating data flow.](https://kodekloud.com/kk-media/image/upload/v1752873748/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Istio-Ingress-Gateway-and-Virtual-Service/kiali-dashboard-service-mesh-graph.jpg)

And inspect metrics & traffic:

![The image shows a Kiali dashboard displaying a service mesh graph with nodes representing services and their interactions, including "devsecops-svc" and "node-service." The graph is set to show response time and other metrics within a specified namespace.](https://kodekloud.com/kk-media/image/upload/v1752873749/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Istio-Ingress-Gateway-and-Virtual-Service/kiali-dashboard-service-mesh-graph-2.jpg)

## Summary

| Resource       | Purpose                                | Example Snippet                            |
| -------------- | -------------------------------------- | ------------------------------------------ |
| Gateway        | Configure edge load balancer listeners | `selector: istio: ingressgateway`          |
| VirtualService | Define routing rules for HTTP/TCP      | `hosts: ["*"]`, `match: prefix /increment` |
| Kiali          | Visualize and troubleshoot mesh        | UI for Gateways, VirtualServices, metrics  |

## Links and References

- [Istio Gateway API](https://istio.io/latest/docs/reference/config/networking/gateway/)
- [Istio VirtualService API](https://istio.io/latest/docs/reference/config/networking/virtual-service/)
- [Kiali Documentation](https://www.kiali.io/documentation/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/5989174f-a567-4767-af9c-4d614153c883)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/ee9e210b-61c4-4b60-9049-7bc4d0012108)**
>
> Practice lab
