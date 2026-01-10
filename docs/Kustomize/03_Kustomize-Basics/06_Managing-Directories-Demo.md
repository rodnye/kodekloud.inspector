# Managing Directories Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/Kustomize-Basics/Managing-Directories-Demo)

---

## Table of Contents

- Managing Directories Demo
  - Directory Layout
  - Sample Manifests
  - Manual Deployment
  - Introducing Kustomize
  - Per-Directory Kustomization
  - Links and References
  - Watch Video
  - Practice Lab
    - Database Deployment (db/db-depl.yaml)
    - Redis Service (cache/redis-service.yaml)
    - Redis Credentials (cache/redis-config.yaml)
    - Cleaning Up
    - api/kustomization.yaml
    - cache/kustomization.yaml
    - db/kustomization.yaml

---

## Content

Kustomize

Kustomize Basics

# Managing Directories Demo

Organizing and scaling your Kubernetes manifests becomes much simpler when you adopt a consistent directory structure and leverage [Kustomize](https://kubectl.docs.kubernetes.io/references/kustomize/kustomization/). In this guide, we’ll walk through:

- Defining a clear directory layout
- Deploying resources manually with `kubectl`
- Introducing Kustomize for centralized and per-directory customization

---

## Directory Layout

Under the `k8s/` folder, structure your manifests by component:

```
k8s/
├── api/
├── cache/
└── db/
```

| Directory | Components                                |
| --------- | ----------------------------------------- |
| k8s/api   | API Deployment & Service                  |
| k8s/cache | Redis Deployment, Service & Credentials   |
| k8s/db    | MongoDB Deployment, Service & Credentials |

Each subfolder contains the YAML files for its service.

---

## Sample Manifests

### Database Deployment (`db/db-depl.yaml`)

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: db-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: db
  template:
    metadata:
      labels:
        component: db
    spec:
      containers:
      - name: mongo
        image: mongo
        env:
        - name: MONGO_INITDB_ROOT_USERNAME
          valueFrom:
            configMapKeyRef:
              name: db-credentials
              key: username
        - name: MONGO_INITDB_ROOT_PASSWORD
          valueFrom:
            configMapKeyRef:
              name: db-credentials
              key: password
```

### Redis Service (`cache/redis-service.yaml`)

```
apiVersion: v1
kind: Service
metadata:
  name: redis-cluster-ip-service
spec:
  type: ClusterIP
  selector:
    component: redis
  ports:
  - port: 6379
    targetPort: 6379
```

### Redis Credentials (`cache/redis-config.yaml`)

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: redis-credentials
data:
  username: "redis"
  password: "password123"
```

---

## Manual Deployment

Apply each directory in sequence:

```
kubectl apply -f k8s/api
kubectl apply -f k8s/cache
kubectl apply -f k8s/db
```

Or chain them:

```
kubectl apply -f k8s/api -f k8s/cache -f k8s/db
```

> [!important]
> **Warning**
>
> Make sure your `kubectl` context is pointed to the correct cluster and you have permission to create resources.

### Cleaning Up

```
kubectl delete -f k8s/api -f k8s/cache -f k8s/db
```

---

## Introducing Kustomize

Kustomize lets you define and compose resources without template syntax. Start by creating a root `kustomization.yaml` under `k8s/`:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api/api-depl.yaml
  - api/api-service.yaml
  - cache/redis-config.yaml
  - cache/redis-depl.yaml
  - cache/redis-service.yaml
  - db/db-config.yaml
  - db/db-depl.yaml
  - db/db-service.yaml
```

Generate the merged manifest:

```
kustomize build k8s/
```

Apply directly to the cluster:

```
kustomize build k8s/ | kubectl apply -f -
```

Or use `kubectl`’s built-in Kustomize support:

> [!important]
> **Note**
>
> You can apply overlays without installing the standalone Kustomize binary by running:
>
> ```
> kubectl apply -k k8s/
> ```
>
> See \[Kubectl apply documentation\].

Verify your pods:

```
kubectl get pods
```

---

## Per-Directory Kustomization

For better modularity, place a `kustomization.yaml` in each subfolder.

### `api/kustomization.yaml`

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api-depl.yaml
  - api-service.yaml
```

### `cache/kustomization.yaml`

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - redis-config.yaml
  - redis-depl.yaml
  - redis-service.yaml
```

### `db/kustomization.yaml`

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - db-config.yaml
  - db-depl.yaml
  - db-service.yaml
```

Finally, update the root `kustomization.yaml` to reference directories:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api/
  - cache/
  - db/
```

Apply all components in one command:

```
kubectl apply -k k8s/
```

Confirm everything is running:

```
kubectl get pods
```

This scalable structure keeps your manifests organized and ready for production-grade overlays.

---

## Links and References

- [Kubernetes Manifests](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/)
- [Kubectl apply documentation](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#apply)
- [Kustomize Official Documentation](https://kubectl.docs.kubernetes.io/references/kustomize/kustomization/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/8b591384-c5e2-4411-afc1-443d3f2ba735/lesson/11c7ef2f-8db7-42f0-bce1-b5afb0798b7a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kustomize/module/8b591384-c5e2-4411-afc1-443d3f2ba735/lesson/2b93a77f-e445-4130-82a4-b12a20bc481f)**
>
> Practice lab
