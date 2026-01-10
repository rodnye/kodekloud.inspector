# Demo Cilium Network Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Network-Security/Demo-Cilium-Network-Policies)

---

## Table of Contents

- Demo Cilium Network Policies
  - Demo App Overview
  - 1. Default Kubernetes NetworkPolicy
  - 2. Cilium Layer 3 Policy
  - 3. Cilium Layer 4 Policy
  - 4. Cilium Layer 7 HTTP Policy
  - 5. Adding an API Key Header
  - Policy Progression
  - Further Reading
  - Watch Video
  - Practice Lab
    - Verifying the Default Policy

---

## Content

Kubernetes Networking Deep Dive

Network Security

# Demo Cilium Network Policies

In this tutorial, we’ll secure a sample application using Cilium Network Policies. We’ll progress from a default Kubernetes NetworkPolicy (Layer 3) to a full L7 HTTP policy with header-based access control.

Table of Contents

1.  [Demo App Overview](#demo-app-overview)
2.  [Default Kubernetes NetworkPolicy](#1-default-kubernetes-networkpolicy)
3.  [Cilium Layer 3 Policy](#2-cilium-layer-3-policy)
4.  [Cilium Layer 4 Policy](#3-cilium-layer-4-policy)
5.  [Cilium Layer 7 HTTP Policy](#4-cilium-layer-7-http-policy)
6.  [Adding an API Key Header](#5-adding-an-api-key-header)
7.  [Further Reading](#further-reading)

---

## Demo App Overview

Our demo application runs as a single Pod with two containers listening on ports **5000** and **80**. It exposes two corresponding ClusterIP Services.

```
kubectl get all
```

```
NAME                                  READY   STATUS    RESTARTS   AGE
pod/demo-deployment-7ccd685fcc-7z9wf  2/2     Running   0          5m


NAME                   TYPE        CLUSTER-IP       PORT(S)    AGE
service/app-svc-5000   ClusterIP   10.111.51.97     5000/TCP   5m
service/app-svc-80     ClusterIP   10.102.122.72     80/TCP    5m
service/kubernetes     ClusterIP   10.96.0.1         443/TCP  10m
```

Both containers serve the same Flask app. We'll lock down access so only Pods labeled `app=admin` can communicate.

---

## 1\. Default Kubernetes NetworkPolicy

We begin with a basic Kubernetes NetworkPolicy named `demo-netpol`. It selects Pods labeled `app=demo` and allows ingress from Pods labeled `app=admin` on **all ports**.

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: demo-netpol
spec:
  podSelector:
    matchLabels:
      app: demo
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: admin
```

### Verifying the Default Policy

1.  **Allowed**: Pod with `app=admin` can reach both ports.

    ```
    kubectl run --rm -i --tty admin --image=curlimages/curl \
      --labels app=admin --restart=Never -- \
      curl --connect-timeout 2 app-svc-80
    # → Have a great day!


    kubectl run --rm -i --tty admin --image=curlimages/curl \
      --labels app=admin --restart=Never -- \
      curl --connect-timeout 2 app-svc-5000
    # → Have a great day!
    ```

2.  **Denied**: Pod _without_ the label is blocked.

    ```
    kubectl run --rm -i --tty client --image=curlimages/curl \
      --restart=Never -- \
      curl --connect-timeout 2 app-svc-80
    # → curl: (28) Failed to connect...
    ```

> [!important]
> **Next Step**
>
> Before applying Cilium policies, delete the existing Kubernetes NetworkPolicy so that Cilium’s default behavior (allow all) is restored.

```
kubectl delete networkpolicy demo-netpol
```

---

## 2\. Cilium Layer 3 Policy

Create `cilium-l3.yaml` to reimplement the same L3 selector using Cilium’s CRD:

```
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: demo-cilium-l3
spec:
  endpointSelector:
    matchLabels:
      app: demo
  ingress:
    - fromEndpoints:
        - matchLabels:
            app: admin
```

Apply and test:

```
kubectl apply -f cilium-l3.yaml


# Unlabeled Pod → denied:
kubectl run --rm -i --tty client --image=curlimages/curl \
  --restart=Never -- \
  curl --connect-timeout 2 app-svc-80
# Labeled Pod → allowed:
kubectl run --rm -i --tty admin --image=curlimages/curl \
  --labels app=admin --restart=Never -- \
  curl --connect-timeout 2 app-svc-5000
# → Have a great day!
```

---

## 3\. Cilium Layer 4 Policy

Tighten access to only TCP port 80. Update to `cilium-l4.yaml`:

```
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: demo-cilium-l4
spec:
  endpointSelector:
    matchLabels:
      app: demo
  ingress:
    - fromEndpoints:
        - matchLabels:
            app: admin
      toPorts:
        - ports:
            - port: "80"
              protocol: TCP
```

```
kubectl apply -f cilium-l4.yaml


# Port 80 → allowed:
kubectl run --rm -i --tty admin --image=curlimages/curl \
  --labels app=admin --restart=Never -- \
  curl --connect-timeout 2 app-svc-80
# Port 5000 → denied:
kubectl run --rm -i --tty admin --image=curlimages/curl \
  --labels app=admin --restart=Never -- \
  curl --connect-timeout 2 app-svc-5000
# → curl: (28) Failed to connect...
```

---

## 4\. Cilium Layer 7 HTTP Policy

Leverage Cilium’s L7 HTTP inspection to allow only `GET /healthz` and `GET /api`. Define `cilium-l7.yaml`:

```
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: demo-cilium-l7
spec:
  endpointSelector:
    matchLabels:
      app: demo
  ingress:
    - fromEndpoints:
        - matchLabels:
            app: admin
      toPorts:
        - ports:
            - port: "80"
              protocol: TCP
          rules:
            http:
              - method: GET
                path: /healthz
              - method: GET
                path: /api
```

```
kubectl apply -f cilium-l7.yaml


# Default path → denied:
kubectl run --rm -i --tty admin --image=curlimages/curl \
  --labels app=admin --restart=Never -- \
  curl --connect-timeout 2 app-svc-80
# /api → allowed:
kubectl run --rm -i --tty admin --image=curlimages/curl \
  --labels app=admin --restart=Never -- \
  curl --connect-timeout 2 app-svc-80/api
# /healthz → allowed:
kubectl run --rm -i --tty admin --image=curlimages/curl \
  --labels app=admin --restart=Never -- \
  curl --connect-timeout 2 app-svc-80/healthz
# → {"status":"OK"}
```

---

## 5\. Adding an API Key Header

Finally, require an `X-API-KEY` header for the `/api` endpoint. Update to `cilium-l7-header.yaml`:

```
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: demo-cilium-l7-header
spec:
  endpointSelector:
    matchLabels:
      app: demo
  ingress:
    - fromEndpoints:
        - matchLabels:
            app: admin
      toPorts:
        - ports:
            - port: "80"
              protocol: TCP
          rules:
            http:
              - method: GET
                path: /healthz
              - method: GET
                path: /api
                headers:
                  - name: X-API-KEY
                    value: ABC123
```

```
kubectl apply -f cilium-l7-header.yaml


# Missing header → denied:
kubectl run --rm -i --tty admin --image=curlimages/curl \
  --labels app=admin --restart=Never -- \
  curl --connect-timeout 2 app-svc-80/api
# With header → allowed:
kubectl run --rm -i --tty admin --image=curlimages/curl \
  --labels app=admin --restart=Never -- \
  curl -H "X-API-KEY: ABC123" --connect-timeout 2 app-svc-80/api
# → Have a great day!
```

---

## Policy Progression

| Stage      | Layer | File                    | Description                             |
| ---------- | ----- | ----------------------- | --------------------------------------- |
| Kubernetes | L3    | `demo-netpol`           | Pod selector + ingress from `app=admin` |
| Cilium     | L3    | `cilium-l3.yaml`        | Same selector using Cilium CRD          |
| Cilium     | L4    | `cilium-l4.yaml`        | Restrict to TCP port 80                 |
| Cilium     | L7    | `cilium-l7.yaml`        | Allow only GET `/healthz` & `/api`      |
| Cilium     | L7+H  | `cilium-l7-header.yaml` | Adds `X-API-KEY` header check           |

---

## Further Reading

- [Cilium Documentation](https://docs.cilium.io/)
- [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Envoy L7 Proxy](https://www.envoyproxy.io/)

With Cilium Network Policies, you have full L3–L7 control to secure your workloads. Experiment with custom rules to fit your security requirements!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/5a70ab6c-2094-4bf2-9f49-e441919fc8c2/lesson/ceb679c9-31ba-47e1-9480-c417727d3f02)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/5a70ab6c-2094-4bf2-9f49-e441919fc8c2/lesson/1c730398-0410-4b97-b560-df89fc2c5a76)**
>
> Practice lab
