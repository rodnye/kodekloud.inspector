# Patches Dictionary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/Kustomize-Basics/Patches-Dictionary)

---

## Table of Contents

- Patches Dictionary
  - Overview
  - Base Deployment Configuration
  - 1. Replacing a Label
  - 2. Adding a Label
  - 3. Removing a Label
  - Links and References
  - Watch Video
    - 1.1 JSON 6902 Patch
    - 1.2 Strategic Merge Patch
    - 2.1 JSON 6902 Patch
    - 2.2 Strategic Merge Patch
    - 3.1 JSON 6902 Patch
    - 3.2 Strategic Merge Patch

---

## Content

Kustomize

Kustomize Basics

# Patches Dictionary

Learn how to update, add, and remove keys (e.g., labels) in a Kubernetes Deployment using Kustomize. We’ll demonstrate both JSON 6902 patches and Strategic Merge Patches with clear examples and best practices.

## Overview

Kustomize supports two main patch mechanisms:

| Patch Type            | Syntax       | Use Case                               | Reference                                                                                                         |
| --------------------- | ------------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| JSON 6902 Patch       | JSON Pointer | Precise `add`, `replace`, `remove` ops | [JSON Patch (RFC6902)](https://tools.ietf.org/html/rfc6902)                                                       |
| Strategic Merge Patch | YAML merge   | Declarative updates, merges by key     | [Strategic Merge Patch](https://kubernetes.io/docs/concepts/overview/working-with-objects/strategic-merge-patch/) |

> [!important]
> **Note**
>
> Use JSON 6902 when you need fine-grained control. Choose Strategic Merge for simpler, declarative label or annotation updates.

---

## Base Deployment Configuration

Save this as `base/api-deployment.yaml`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: api
  template:
    metadata:
      labels:
        component: api
    spec:
      containers:
        - name: nginx
          image: nginx
```

In the same directory, your `kustomization.yaml` should include:

```
resources:
  - api-deployment.yaml
```

---

## 1\. Replacing a Label

### 1.1 JSON 6902 Patch

Add this section under `patches` in `kustomization.yaml`:

```
patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch: |-
      - op: replace
        path: /spec/template/metadata/labels/component
        value: web
```

- **op: replace** – updates the existing `component` label.
- **path** – JSON Pointer to `/spec/template/metadata/labels/component`.
- **value: web** – new label value.

### 1.2 Strategic Merge Patch

Reference an external YAML file in `kustomization.yaml`:

```
patches:
  - label-replace.yaml
```

Create `label-replace.yaml`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  template:
    metadata:
      labels:
        component: web
```

Kustomize merges only the provided fields, updating `component` to `web`.

---

## 2\. Adding a Label

### 2.1 JSON 6902 Patch

In `kustomization.yaml`:

```
patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch: |-
      - op: add
        path: /spec/template/metadata/labels/org
        value: kodekloud
```

- **op: add** – inserts a new key `org`.
- **value: kodekloud** – label value added under `.spec.template.metadata.labels`.

### 2.2 Strategic Merge Patch

Reference a file in `kustomization.yaml`:

```
patches:
  - label-add.yaml
```

Create `label-add.yaml`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  template:
    metadata:
      labels:
        org: kodekloud
```

After applying, labels will include both `component: api` and `org: kodekloud`.

---

## 3\. Removing a Label

Assume the Deployment now has:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: api
  template:
    metadata:
      labels:
        component: api
        org: kodekloud
    spec:
      containers:
      - name: nginx
        image: nginx
```

### 3.1 JSON 6902 Patch

In `kustomization.yaml`:

```
patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch: |-
      - op: remove
        path: /spec/template/metadata/labels/org
```

- **op: remove** – deletes the `org` key.

### 3.2 Strategic Merge Patch

Reference in `kustomization.yaml`:

```
patches:
  - label-remove.yaml
```

Create `label-remove.yaml`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  template:
    metadata:
      labels:
        org: null
```

> [!important]
> **Note**
>
> Setting `org: null` instructs Kustomize to remove that label key.

---

## Links and References

- [Kustomize Patches Reference](https://kubectl.docs.kubernetes.io/references/kustomize/patches/)
- [JSON Patch (RFC6902)](https://tools.ietf.org/html/rfc6902)
- [Strategic Merge Patch](https://kubernetes.io/docs/concepts/overview/working-with-objects/strategic-merge-patch/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/8b591384-c5e2-4411-afc1-443d3f2ba735/lesson/581f5ca5-823d-4415-9f90-3853ccf009ab)**
>
> Watch video content
