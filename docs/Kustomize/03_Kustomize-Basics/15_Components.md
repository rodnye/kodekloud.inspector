# Components - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/Kustomize-Basics/Components)

---

## Table of Contents

- Components
  - When to Use Components
  - Visual Example
  - Component Features Table
  - Project Structure
  - Database Component
  - Overlay Configuration
  - Links and References
  - Watch Video
  - Practice Lab
    - postgres-depl.yaml
    - kustomization.yaml (Component)
    - deployment-patch.yaml
    - Example: Dev Overlay

---

## Content

Kustomize

Kustomize Basics

# Components

In this guide, you’ll learn how to define and consume **components** in Kustomize. Components let you package optional features—such as additional resources, patches, ConfigMaps, or Secrets—into self-contained units. You can then import them in selected overlays without duplicating code, ensuring consistency and reducing configuration drift.

## When to Use Components

Use components when an application offers optional features that only apply to some overlays. If a feature is required in **all** overlays, include it in your base. For features needed by only a **subset**, bundle them as components to avoid repetition.

## Visual Example

Consider three deployment environments:

- **dev** (development)
- **premium** (for premium customers)
- **standalone** (self-hosted)

Our shared **base/** folder holds common resources. We also have two optional features:

- **Caching** (backed by Redis) — enabled in **premium** and **standalone**
- **External DB** (Postgres) — enabled in **dev** and **premium**

Where should we place the Redis and Postgres manifests so only the right overlays include them?

![The image is a flowchart showing components with connections between "base," "caching," "dev," "Premium," and "Self hosted." It also lists "Caching" and "External DB" with related items.](https://kodekloud.com/kk-media/image/upload/v1752880923/notes-assets/images/Kustomize-Components/flowchart-base-caching-dev-premium-selfhosted.jpg)

Instead of duplicating manifests in overlays—or adding unwanted features to **base**—we create two components (`caching` and `db`) and import them selectively.

![The image is a flowchart titled "Components" showing a hierarchy with nodes labeled "base," "dev," "Premium," "Self hosted," "Components," "caching," and "db." It illustrates the relationships between these components.](https://kodekloud.com/kk-media/image/upload/v1752880924/notes-assets/images/Kustomize-Components/components-flowchart-hierarchy-nodes.jpg)

## Component Features Table

| Component     | Purpose                          | Overlays            |
| ------------- | -------------------------------- | ------------------- |
| caching       | Redis Deployment & service       | premium, standalone |
| db (External) | Postgres Deployment & DB secrets | dev, premium        |

## Project Structure

```
k8s/
├── base/
│   ├── api-depl.yaml
│   └── kustomization.yaml
├── components/
│   ├── caching/
│   │   ├── kustomization.yaml
│   │   ├── deployment-patch.yaml
│   │   └── redis-depl.yaml
│   └── db/
│       ├── kustomization.yaml
│       ├── deployment-patch.yaml
│       └── postgres-depl.yaml
└── overlays/
    ├── dev/
    │   └── kustomization.yaml
    ├── premium/
    │   └── kustomization.yaml
    └── standalone/
        └── kustomization.yaml
```

- **base/**: Common resources (e.g., API Deployment)
- **components/**: Feature directories (`caching/`, `db/`)
- **overlays/**: Environment-specific kustomizations

---

## Database Component

The **db** component adds a Postgres deployment, a Secret for credentials, and patches your API Deployment.

### `postgres-depl.yaml`

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: postgres
  template:
    metadata:
      labels:
        component: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:latest
```

> [!important]
> **Component API Version**
>
> Components require `kind: Component` with the `v1alpha1` API. Ensure you’re running Kustomize v4.x or later.

### `kustomization.yaml` (Component)

```
apiVersion: kustomize.config.k8s.io/v1alpha1
kind: Component
resources:
  - postgres-depl.yaml
secretGenerator:
  - name: postgres-cred
    literals:
      - password=postgres123
patches:
  - deployment-patch.yaml
```

### `deployment-patch.yaml`

This strategic merge patch injects the `DB_PASSWORD` from the Secret into your API Deployment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  template:
    spec:
      containers:
        - name: api
          env:
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgres-cred
                  key: password
```

---

## Overlay Configuration

Each overlay’s `kustomization.yaml` pulls in `base` plus the desired components.

### Example: Dev Overlay

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - ../../base
components:
  - ../../components/db
```

- **premium** overlay adds both `../../components/db` and `../../components/caching`.
- **standalone** overlay adds only `../../components/caching`.

With Kustomize components, you can define optional feature logic once and enable it in any overlay by adding a single entry.

## Links and References

- [Kustomize Documentation](https://kubectl.docs.kubernetes.io/references/kustomize/)
- [Kubernetes Concepts: Overlays](https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/#kustomize-overlays)
- [Redis Official Image](https://hub.docker.com/_/redis)
- [Postgres Official Image](https://hub.docker.com/_/postgres)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/8b591384-c5e2-4411-afc1-443d3f2ba735/lesson/baa7cfb7-7316-4be4-88c5-acfe45f59d8e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kustomize/module/8b591384-c5e2-4411-afc1-443d3f2ba735/lesson/bb1ad6fa-3980-4462-bdf4-4fe87d267fe7)**
>
> Practice lab
