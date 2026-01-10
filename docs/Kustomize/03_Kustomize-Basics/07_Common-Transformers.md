# Common Transformers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/Kustomize-Basics/Common-Transformers)

---

## Table of Contents

- Common Transformers
  - The Challenge
  - Common Transformers Overview
  - Links and References
  - Watch Video
    - 1. Apply Common Labels
    - 2. Set a Namespace
    - 3. Add Name Prefix & Suffix
    - 4. Inject Common Annotations

---

## Content

Kustomize

Kustomize Basics

# Common Transformers

In this lesson, we’ll explore Kustomize’s built-in Common Transformers. They let you apply shared modifications—such as labels, prefixes/suffixes, namespaces, and annotations—to all of your Kubernetes manifests without touching each file manually.

## The Challenge

Imagine you have these two resource definitions:

```
# db-depl.yaml
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

```
# db-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: db-service
spec:
  selector:
    component: db-depl
  ports:
    - protocol: TCP
      port: 27017
      targetPort: 27017
  type: LoadBalancer
```

Your goal is to:

- Add a shared label: `org: KodeKloud`
- Append `-dev` to every resource name

Manually editing each file is tedious and error-prone. Kustomize simplifies this with common transformers.

## Common Transformers Overview

![The image lists common transformations for Kubernetes resources, including adding labels, prefixes/suffixes, namespaces, and annotations.](https://kodekloud.com/kk-media/image/upload/v1752880922/notes-assets/images/Kustomize-Common-Transformers/kubernetes-resource-transformations-list.jpg)

| Transformer        | Field Name                   | Purpose                                      |
| ------------------ | ---------------------------- | -------------------------------------------- |
| Common Labels      | `commonLabels`               | Add one or more labels to all resources      |
| Name Prefix/Suffix | `namePrefix`<br>`nameSuffix` | Prepend or append text to resource names     |
| Namespace          | `namespace`                  | Assign a namespace to every resource         |
| Common Annotations | `commonAnnotations`          | Add one or more annotations to all resources |

### 1\. Apply Common Labels

Add the `commonLabels` block to your `kustomization.yaml`:

```
resources:
  - db-depl.yaml
  - db-service.yaml


commonLabels:
  org: KodeKloud
```

> [!important]
> **Note**
>
> When you run `kustomize build`, these labels will be merged into every resource’s `metadata.labels`.

**Generated output (Service example):**

```
apiVersion: v1
kind: Service
metadata:
  name: db-service
  labels:
    org: KodeKloud
spec:
  selector:
    component: db-depl
  ports:
    - protocol: TCP
      port: 27017
      targetPort: 27017
  type: LoadBalancer
```

### 2\. Set a Namespace

To place all resources into a specific namespace:

```
namespace: lab
```

**Resulting snippet:**

```
apiVersion: v1
kind: Service
metadata:
  name: db-service
  namespace: lab
  labels:
    org: KodeKloud
# …
```

### 3\. Add Name Prefix & Suffix

Prepend and append text to every resource name:

```
namePrefix: kodekloud-
nameSuffix: -dev
```

**Rendered output:**

```
apiVersion: v1
kind: Service
metadata:
  name: kodekloud-db-service-dev
  labels:
    org: KodeKloud
  namespace: lab
# …
```

> [!important]
> **Warning**
>
> Choosing very long prefixes or suffixes can push resource names over Kubernetes’ max-length limit (63 characters). Always verify final name lengths.

### 4\. Inject Common Annotations

Include the following to add annotations across all manifests:

```
commonAnnotations:
  branch: master
```

**Sample annotation merge:**

```
metadata:
  annotations:
    branch: master
# …
```

---

By combining these four settings in a single `kustomization.yaml`, you can transform your base manifests consistently and safely—no manual edits required.

## Links and References

- [Kustomize Official Documentation](https://kubectl.docs.kubernetes.io/references/kustomize/)
- [Kubernetes Resource Configuration](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/)
- [Managing Kubernetes with Kustomize](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/8b591384-c5e2-4411-afc1-443d3f2ba735/lesson/d3956634-6fe0-4c41-b8bf-bfed87fc99dd)**
>
> Watch video content
