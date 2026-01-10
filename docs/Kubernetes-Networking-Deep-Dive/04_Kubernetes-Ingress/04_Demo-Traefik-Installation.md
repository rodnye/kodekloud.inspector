# Demo Traefik Installation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Kubernetes-Ingress/Demo-Traefik-Installation)

---

## Table of Contents

- Demo Traefik Installation
  - Table of Contents
  - 1. Manual Installation (Quick Start)
  - 2. Helm Installation
  - 3. Demo App Ingress Configuration
  - 4. Viewing Traefik Logs
  - 5. Links and References
  - Watch Video
  - Practice Lab
    - 1.1 Create RBAC Resources
    - 1.2 Deploy the Traefik Controller
    - 2.1 Add the Traefik Helm Repository
    - 2.2 Install with Default Values
    - 2.3 Customizing the Service Type
    - 3.1 Deploy the whoami Application
    - 3.2 Configure an Ingress Resource
      - Expose Traefik with LoadBalancer Services

---

## Content

Kubernetes Networking Deep Dive

Kubernetes Ingress

# Demo Traefik Installation

In this guide, you’ll learn how to deploy Traefik as an Ingress controller on your Kubernetes cluster. We cover:

1.  Manual installation using Kubernetes manifests (Quick Start)
2.  Installation with Helm and customizing the service type
3.  Deploying a demo application behind Traefik
4.  Enabling and viewing Traefik access logs

---

## Table of Contents

1.  [Manual Installation (Quick Start)](#1-manual-installation-quick-start)
2.  [Helm Installation](#2-helm-installation)
3.  [Demo App Ingress Configuration](#3-demo-app-ingress-configuration)
4.  [Viewing Traefik Logs](#4-viewing-traefik-logs)
5.  [Links and References](#5-links-and-references)

---

## 1\. Manual Installation (Quick Start)

This section walks you through deploying Traefik using static YAML manifests. We’ll configure RBAC, deploy Traefik, and expose it via LoadBalancer services.

### 1.1 Create RBAC Resources

Traefik needs permission to watch and update Kubernetes resources. First, define a `ClusterRole`:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: traefik-role
rules:
  - apiGroups: ["*"]
    resources:
      - services
      - secrets
      - endpoints
      - ingresses
      - configmaps
    verbs: ["get", "list", "watch"]
  - apiGroups: ["networking.k8s.io", "discovery.k8s.io"]
    resources: ["ingresses", "ingressclasses"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["networking.k8s.io"]
    resources: ["ingresses/status"]
    verbs: ["update"]
```

Bind this role to a ServiceAccount in the `kube-system` namespace:

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: traefik-account
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: traefik-binding
subjects:
  - kind: ServiceAccount
    name: traefik-account
    namespace: kube-system
roleRef:
  kind: ClusterRole
  name: traefik-role
  apiGroup: rbac.authorization.k8s.io
```

> [!important]
> **Note**
>
> Ensure your cluster’s RBAC is enabled. If you run into `Forbidden` errors, verify that the ServiceAccount and ClusterRoleBinding are created correctly.

### 1.2 Deploy the Traefik Controller

Create a Deployment for Traefik, specifying the ServiceAccount:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: traefik
  namespace: kube-system
  labels:
    app: traefik
spec:
  replicas: 1
  selector:
    matchLabels:
      app: traefik
  template:
    metadata:
      labels:
        app: traefik
    spec:
      serviceAccountName: traefik-account
      containers:
        - name: traefik
          image: traefik:v3.1
          args:
            - --api.insecure=true
            - --providers.kubernetesingress=true
            - --entryPoints.web.address=:80
            - --entryPoints.websecure.address=:443
          ports:
            - name: web
              containerPort: 80
            - name: websecure
              containerPort: 443
            - name: dashboard
              containerPort: 8080
```

> [!important]
> **Warning**
>
> The `--api.insecure` flag enables an unsecured dashboard. Do **not** use this in production environments. For secure dashboards, configure TLS and authentication.

#### Expose Traefik with LoadBalancer Services

Create a Service manifest (`traefik-svc.yaml`):

```
apiVersion: v1
kind: Service
metadata:
  name: traefik-web
  namespace: kube-system
spec:
  type: LoadBalancer
  ports:
    - name: http
      port: 80
      targetPort: 80
    - name: https
      port: 443
      targetPort: 443
  selector:
    app: traefik
---
apiVersion: v1
kind: Service
metadata:
  name: traefik-dashboard
  namespace: kube-system
spec:
  type: LoadBalancer
  ports:
    - name: dashboard
      port: 8080
      targetPort: 8080
  selector:
    app: traefik
```

Apply all resources:

```
kubectl apply -f traefik-role.yaml \
  -f traefik-account.yaml \
  -f traefik-binding.yaml \
  -f traefik-deployment.yaml \
  -f traefik-svc.yaml
```

Check the LoadBalancer IPs:

```
kubectl get svc -n kube-system
```

---

## 2\. Helm Installation

Installing Traefik via Helm simplifies upgrades and customization.

### 2.1 Add the Traefik Helm Repository

```
helm repo add traefik https://traefik.github.io/charts
helm repo update
kubectl create namespace traefik
```

### 2.2 Install with Default Values

```
helm install traefik traefik/traefik \
  --namespace=traefik
```

Verify resources:

```
kubectl get all -n traefik
```

### 2.3 Customizing the Service Type

On clusters without a LoadBalancer (e.g., bare-metal), switch to `NodePort`. Create `values.yaml`:

```
service:
  type: NodePort
  ports:
    web:
      nodePort: 32080
    websecure:
      nodePort: 32443


logs:
  access:
    enabled: true
```

Upgrade the release:

```
helm upgrade traefik traefik/traefik \
  --namespace=traefik \
  --values=values.yaml
```

Confirm the NodePort assignment:

```
kubectl get svc -n traefik
# NAME      TYPE       CLUSTER-IP      PORT(S)
# traefik   NodePort   10.xx.xx.xx     80:32080/TCP,443:32443/TCP
```

> [!important]
> **Note**
>
> If you change ports in `values.yaml`, ensure your firewall or cloud provider permits traffic on the new NodePorts.

---

## 3\. Demo App Ingress Configuration

Deploy a simple “whoami” service and expose it via Traefik.

### 3.1 Deploy the `whoami` Application

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: whoami
  labels:
    app: whoami
spec:
  replicas: 1
  selector:
    matchLabels:
      app: whoami
  template:
    metadata:
      labels:
        app: whoami
    spec:
      containers:
        - name: whoami
          image: traefik/whoami
          ports:
            - name: http
              containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: whoami
spec:
  type: ClusterIP
  selector:
    app: whoami
  ports:
    - name: http
      port: 80
      targetPort: 80
```

Apply:

```
kubectl apply -f whoami-app.yaml
```

### 3.2 Configure an Ingress Resource

Create `whoami-ingress.yaml`:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: whoami-ingress
spec:
  ingressClassName: traefik
  rules:
    - http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: whoami
                port:
                  number: 80
```

Apply and verify:

```
kubectl apply -f whoami-ingress.yaml
kubectl describe ingress whoami-ingress
```

Access the demo app:

```
http://<LoadBalancer-IP>/
# or, on NodePort:
http://<NodeIP>:32080/
```

---

## 4\. Viewing Traefik Logs

Tail the Traefik pod’s logs to inspect both general and access logs:

```
kubectl logs -f deployment/traefik -n traefik
```

With `logs.access.enabled: true`, each HTTP request is recorded in the logs.

---

## 5\. Links and References

- [Traefik Official Documentation](https://doc.traefik.io/traefik/)
- [Kubernetes Ingress Concepts](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [Helm Chart for Traefik](https://artifacthub.io/packages/helm/traefik/traefik)
- [Traefik “whoami” Docker Image](https://hub.docker.com/r/traefik/whoami)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/19677663-2b7d-4c3d-92ee-06df9f5530eb/lesson/7318bf47-e385-467b-9f22-4ada897c41b8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/19677663-2b7d-4c3d-92ee-06df9f5530eb/lesson/143c0736-4ff1-4980-9c39-04c1d9977d78)**
>
> Practice lab
