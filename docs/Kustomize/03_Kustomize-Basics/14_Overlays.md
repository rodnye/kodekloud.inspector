# Overlays - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/Kustomize-Basics/Overlays)

---

## Table of Contents

- Overlays
  - 1. Base kustomization
  - 2. Dev Overlay
  - 3. Production Overlay
  - 4. Flexible Directory Structures
  - References
  - Watch Video
  - Practice Lab

---

## Content

Kustomize

Kustomize Basics

# Overlays

In this guide, you’ll learn how to maintain a shared **base** configuration and apply environment-specific changes using **Overlays** in Kustomize. Overlays let you centralize common resources in a `base/` directory and then customize or extend them for `dev`, `stg`, `prod`, or any other environment.

![The image is a diagram labeled "Overlays" showing a hierarchy with "Env" at the top, branching into "dev," "stg," and "prod" environments.](https://kodekloud.com/kk-media/image/upload/v1752880924/notes-assets/images/Kustomize-Overlays/overlays-hierarchy-env-dev-stg-prod.jpg)

Below is a typical Kustomize directory layout:

```
k8s/
├── base/
│   ├── kustomization.yaml
│   ├── nginx-depl.yaml
│   ├── service.yaml
│   └── redis-depl.yaml
└── overlays/
    ├── dev/
    │   ├── kustomization.yaml
    │   └── config-map.yaml
    ├── stg/
    │   ├── kustomization.yaml
    │   └── config-map.yaml
    └── prod/
        ├── kustomization.yaml
        └── config-map.yaml
```

| Directory     | Contents                                             | Purpose                                    |
| ------------- | ---------------------------------------------------- | ------------------------------------------ |
| base/         | `nginx-depl.yaml`, `service.yaml`, `redis-depl.yaml` | Shared deployments and services            |
| overlays/dev  | `config-map.yaml` + kustomization file               | Dev-specific patches (e.g., replica count) |
| overlays/stg  | `config-map.yaml` + kustomization file               | Staging tweaks                             |
| overlays/prod | `config-map.yaml` + kustomization file               | Production patches and extra resources     |

---

## 1\. Base kustomization

The **base** holds all common Kubernetes manifests.

```
# base/kustomization.yaml
resources:
  - nginx-depl.yaml
  - service.yaml
  - redis-depl.yaml
```

Example of a base Deployment:

```
# base/nginx-depl.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:latest
```

> [!important]
> **Note**
>
> Make sure each file listed under `resources:` has a valid manifest. You can [validate your YAML](https://kubectl.docs.kubernetes.io/guides/validation/) with `kubectl apply --dry-run=client -f`.

---

## 2\. Dev Overlay

The Dev overlay references the base and patches the replica count using JSON 6902.

```
# overlays/dev/kustomization.yaml
resources:
  - ../../base


patchesJson6902:
  - target:
      group: apps
      version: v1
      kind: Deployment
      name: nginx-deployment
    patch: |-
      - op: replace
        path: /spec/replicas
        value: 2
```

```
# Generate dev manifests
kustomize build overlays/dev
```

| Field             | Description                                       |
| ----------------- | ------------------------------------------------- |
| `resources:`      | Relative path to the shared base directory        |
| `patchesJson6902` | JSON 6902 patch to modify `/spec/replicas` to `2` |

---

## 3\. Production Overlay

For production, you can both patch existing resources and add new ones (e.g., a Grafana deployment).

```
k8s/
└── overlays/
    └── prod/
        ├── kustomization.yaml
        ├── config-map.yaml
        └── grafana-depl.yaml
```

```
# overlays/prod/kustomization.yaml
resources:
  - ../../base
  - grafana-depl.yaml


patchesJson6902:
  - target:
      group: apps
      version: v1
      kind: Deployment
      name: nginx-deployment
    patch: |-
      - op: replace
        path: /spec/replicas
        value: 3
```

```
# overlays/prod/grafana-depl.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      labels:
        app: grafana
    spec:
      containers:
        - name: grafana
          image: grafana/grafana:latest
```

> [!important]
> **Warning**
>
> Ensure new resources like `grafana-depl.yaml` are listed under `resources:` in the overlay’s `kustomization.yaml`. Otherwise, they won’t be rendered.

---

## 4\. Flexible Directory Structures

Kustomize supports organizing both **base** and **overlays** in nested feature folders. For example:

```
k8s/
├── base/
│   ├── kustomization.yaml
│   ├── db/
│   │   ├── db-depl.yaml
│   │   ├── db-svc.yaml
│   │   └── kustomization.yaml
│   └── api/
│       ├── api-depl.yaml
│       ├── api-svc.yaml
│       └── kustomization.yaml
└── overlays/
    ├── dev/
    │   ├── kustomization.yaml
    │   ├── db/
    │   │   ├── db-patch.yaml
    │   │   └── kustomization.yaml
    │   └── api/
    │       ├── api-patch.yaml
    │       └── kustomization.yaml
    └── prod/
        ├── kustomization.yaml
        └── api/
            ├── api-patch.yaml
            └── kustomization.yaml
```

- **Feature-based grouping**: Split `base/` into `db/` and `api/` with individual `kustomization.yaml`.
- **Overlay mirroring**: Maintain a similar hierarchy under each overlay for targeted patches.
- **Cross-references**: Each overlay’s kustomization file imports the correct child resources and patches.

---

## References

- [Kustomize Official Documentation](https://kubectl.docs.kubernetes.io/guides/introduction/)
- [JSON 6902 Patch](https://tools.ietf.org/html/rfc6902)
- [Kubernetes Concepts](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/8b591384-c5e2-4411-afc1-443d3f2ba735/lesson/5feb97e6-536b-4eb9-adf9-f14ce520c327)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kustomize/module/8b591384-c5e2-4411-afc1-443d3f2ba735/lesson/20de59f0-9654-405a-af9e-6ebb063c29e1)**
>
> Practice lab
