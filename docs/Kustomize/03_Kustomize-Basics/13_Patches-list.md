# Patches list - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/Kustomize-Basics/Patches-list)

---

## Table of Contents

- Patches list
  - Base Deployment Example
  - 1. Replacing a Container
  - 2. Adding a Container
  - 3. Removing a Container
  - Links and References
  - Watch Video
  - Practice Lab
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

# Patches list

When customizing Kubernetes resources, you often need to modify lists—such as the `containers` array in a Deployment. Kustomize supports two patch strategies:

- **JSON 6902 patches**: precise, index-based operations (`add`, `replace`, `remove`).
- **Strategic Merge Patches (SMP)**: declarative, merge-key based edits.

Below is a quick comparison:

| Operation    | JSON 6902 Patch                     | Strategic Merge Patch                  |
| ------------ | ----------------------------------- | -------------------------------------- |
| Replace item | Targets an explicit index           | Matches on `name` merge key            |
| Add item     | Uses `add` with `/-` or an index    | Appends new entries by default         |
| Remove item  | Uses `remove` with a specific index | Uses `$patch: delete` on the merge key |

## Base Deployment Example

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

> [!important]
> **Note**
>
> Every entry in `spec.template.spec.containers` is a YAML list item, so it begins with `-`.

---

## 1\. Replacing a Container

### 1.1 JSON 6902 Patch

Add to your `kustomization.yaml`:

```
patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch: |-
      - op: replace
        path: /spec/template/spec/containers/0
        value:
          name: haproxy
          image: haproxy
```

Resulting section:

```
spec:
  template:
    spec:
      containers:
        - name: haproxy
          image: haproxy
```

### 1.2 Strategic Merge Patch

Create a file `replace-container.yaml`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  template:
    spec:
      containers:
        - name: nginx
          image: haproxy
```

Reference it in `kustomization.yaml`:

```
patches:
  - replace-container.yaml
```

Kustomize finds the item with `name: nginx` and updates its image.

---

## 2\. Adding a Container

### 2.1 JSON 6902 Patch

To append at the end:

```
patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch: |-
      - op: add
        path: /spec/template/spec/containers/-
        value:
          name: haproxy
          image: haproxy
```

Result:

```
spec:
  template:
    spec:
      containers:
        - name: nginx
          image: nginx
        - name: haproxy
          image: haproxy
```

You can also insert at a specific index by replacing `-` with `1`, `2`, etc.

> [!important]
> **Warning**
>
> Using `path: /containers/-` always appends. For precise position, specify the index.

### 2.2 Strategic Merge Patch

File `add-container.yaml`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  template:
    spec:
      containers:
        - name: haproxy
          image: haproxy
```

In your `kustomization.yaml`:

```
patches:
  - add-container.yaml
```

The new `haproxy` container is appended automatically.

---

## 3\. Removing a Container

Assume this deployment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 1
  template:
    spec:
      containers:
        - name: web
          image: nginx
        - name: database
          image: mongo
```

### 3.1 JSON 6902 Patch

To remove the second container (index 1):

```
patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch:
      - op: remove
        path: /spec/template/spec/containers/1
```

After applying, only `web` remains.

### 3.2 Strategic Merge Patch

Create `remove-database.yaml`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  template:
    spec:
      containers:
        - $patch: delete
          name: database
```

Include it in `kustomization.yaml`:

```
patches:
  - remove-database.yaml
```

Kustomize deletes the container with `name: database`.

---

## Links and References

- [Kustomize Documentation](https://kubectl.docs.kubernetes.io/references/kustomize/)
- [JSON Patch (RFC 6902)](https://tools.ietf.org/html/rfc6902)
- [Strategic Merge Patch](https://kubectl.docs.kubernetes.io/guides/strategic-merge-patch/)
- [Kubernetes Pods and Containers](https://kubernetes.io/docs/concepts/workloads/pods/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/8b591384-c5e2-4411-afc1-443d3f2ba735/lesson/231125ad-02ba-4a6d-8047-969291b61c1d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kustomize/module/8b591384-c5e2-4411-afc1-443d3f2ba735/lesson/c6a1e116-9972-4680-9e14-4397fcd4b10d)**
>
> Practice lab
