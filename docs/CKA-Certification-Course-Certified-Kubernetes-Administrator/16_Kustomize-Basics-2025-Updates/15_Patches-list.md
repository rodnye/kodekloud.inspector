# Patches list - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Patches-list)

---

## Table of Contents

- Patches list
  - Replacing a Container in the List Using a JSON 6902 Patch
  - Replacing a Container Using a Strategic Merge Patch
  - Adding a Container to the List Using a JSON 6902 Patch
  - Adding a Container Using a Strategic Merge Patch
  - Deleting a Container from the List Using a JSON 6902 Patch
  - Deleting a Container Using a Strategic Merge Patch
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Kustomize Basics 2025 Updates

# Patches list

In this lesson, we demonstrate how to modify list items in a Kubernetes Deployment configuration using both JSON 6902 patches and strategic merge patches. You can update, add, or remove containers in the deployment's container list. The examples below illustrate how to work with list indices and container names effectively.

Below is the base deployment configuration defining a single container named "nginx" using the "nginx" image. Notice that the containers section is a list, indicated by the dash (-) before the container definition.

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

---

## Replacing a Container in the List Using a JSON 6902 Patch

To update both the name and image of the container, use a JSON 6902 patch in your `kustomization.yaml` file. This patch targets the deployment by its kind and name and replaces the container at index 0 with a new configuration.

**kustomization.yaml:**

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

The path `/spec/template/spec/containers/0` specifies that the first element of the containers list (index 0) will be replaced. Once applied, Kustomize updates the container, switching from "nginx" to "haproxy" for both the name and image.

> [!important]
> **Note**
>
> Remember that list indices in YAML start at zero. Always check the index to target the correct container.

---

## Replacing a Container Using a Strategic Merge Patch

If you prefer modifying just a part of the container configuration (e.g., only the image), you can use a strategic merge patch. First, reference your patch file in the `kustomization.yaml`:

**kustomization.yaml:**

```
patches:
  - label-patch.yaml
```

Then, in the `label-patch.yaml` file, specify the container by its name and provide the updated image:

**label-patch.yaml:**

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

This patch finds the container named "nginx" in the list and updates its image to "haproxy."

---

## Adding a Container to the List Using a JSON 6902 Patch

If you want to add a second container to your deployment, you can achieve this using a JSON 6902 patch. In the example below, a new container with the name and image "haproxy" is appended to the containers list. The dash (-) at the end of the path indicates that the container should be added at the end of the list.

**kustomization.yaml:**

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

If the order of containers is important, you can specify an exact index; however, appending to the end is sufficient for many cases.

After applying this patch, the deployment configuration will include both the original "nginx" container and the newly added "haproxy" container:

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
        - name: haproxy
          image: haproxy
```

---

## Adding a Container Using a Strategic Merge Patch

Alternatively, you can add a container using a strategic merge patch. Suppose the original configuration contains a container named "web" using the "nginx" image and you wish to add another container. First, reference the patch file in `kustomization.yaml`:

**kustomization.yaml:**

```
patches:
  - label-patch.yaml
```

Then, list the additional container in the `label-patch.yaml` file:

**label-patch.yaml:**

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

When merged, the resulting configuration will include both the original "web" container and the new "haproxy" container.

---

## Deleting a Container from the List Using a JSON 6902 Patch

Imagine a scenario where your Deployment originally includes two containers: one named "web" with the "nginx" image and another named "database" with the "mongo" image.

**Original Deployment:**

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
        - name: web
          image: nginx
        - name: database
          image: mongo
```

To remove the "database" container (which is at index 1), use the following JSON 6902 patch:

**kustomization.yaml:**

```
patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch: |-
      - op: remove
        path: /spec/template/spec/containers/1
```

After applying this patch, the deployment will only contain the "web" container.

> [!important]
> **Warning**
>
> Ensure that you use the correct index when attempting to remove a container. An incorrect index could lead to unexpected modifications in your deployment configuration.

---

## Deleting a Container Using a Strategic Merge Patch

You can also delete a container using a strategic merge patch with the delete directive. Given the initial configuration that includes both "web" and "database" containers, create a patch that instructs Kustomize to remove the "database" container:

**kustomization.yaml:**

```
patches:
  - label-patch.yaml
```

**label-patch.yaml:**

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

In this patch file, the "$patch: delete" directive targets the container named "database" and removes it from the list. Consequently, the final configuration will only include the "web" container.

---

This lesson detailed multiple methods for manipulating list items in Kubernetes Deployments using both JSON 6902 patches and strategic merge patches. For more information on Kubernetes patch strategies, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/031e84b8-bcbc-4f39-94d6-66d93b05bddc/lesson/5e018d72-ca12-47c0-9816-5bde98ec4ca5)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/031e84b8-bcbc-4f39-94d6-66d93b05bddc/lesson/919f7a3a-8ba1-4c84-a363-2108c51fff1d)**
>
> Practice lab
