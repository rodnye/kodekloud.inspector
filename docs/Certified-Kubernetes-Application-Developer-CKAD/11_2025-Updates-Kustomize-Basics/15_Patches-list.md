# Patches list - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/Patches-list)

---

## Table of Contents

- Patches list
  - Replacing a Container Using a JSON 6902 Patch
  - Replacing a Container Using a Strategic Merge Patch
  - Adding a Container to the List Using a JSON 6902 Patch
  - Deleting a Container from the List Using a JSON 6902 Patch
  - Deleting a Container Using a Strategic Merge Patch
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Application Developer - CKAD

2025 Updates Kustomize Basics

# Patches list

In this article, we explore several methods for managing list operations in Kubernetes configurations. Specifically, you'll learn how to remove, replace, and add items using patches. We begin with a deployment configuration that includes a single container named "nginx" running the "nginx" image. Since the containers are defined as a list (indicated by the dash before each item), you can easily extend the configuration to include multiple containers if needed.

Below is the initial deployment configuration:

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

## Replacing a Container Using a JSON 6902 Patch

To update the container by changing its name and image, you can use a JSON 6902 patch. In your `kustomization.yaml` file, the patch targets the specific Deployment object and applies a replace operation on the container at index 0. Remember that list indexes start at 0; hence, the first (and only) container is at index 0.

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

After applying this patch, the "nginx" container is updated to have the name "haproxy" and image "haproxy".

## Replacing a Container Using a Strategic Merge Patch

Alternatively, a strategic merge patch can update a container. With this method, you create a separate patch file (for example, `label-patch.yaml`) that specifies the container properties to be merged with the original configuration. The patch file identifies the container by name (in this case, "nginx") and details the new image.

Assuming your original deployment configuration is as shown above, your `label-patch.yaml` might look like this:

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

In your `kustomization.yaml` file, reference the patch as follows:

```
patches:
  - label-patch.yaml
```

This approach instructs Kustomize to locate the container named "nginx" and update its image to "haproxy".

## Adding a Container to the List Using a JSON 6902 Patch

To add a second container to your Deployment, you can use a JSON 6902 patch with an "add" operation. The dash (`-`) at the end of the path indicates that the new container should be appended to the existing list.

Given the initial one-container configuration, the following patch adds a second container:

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

In this patch, the dash after `containers/` signals Kustomize to append the new container. After applying the patch, the Deployment will include two containers: the original "nginx" container and the added "haproxy" container.

Below is a representation of the final configuration after adding the new container:

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

## Deleting a Container from the List Using a JSON 6902 Patch

Next, we demonstrate how to remove an item from the list. Consider a Deployment configuration with two containers—one named "web" running nginx and another named "database" running mongo:

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

To remove the second container (i.e., the "database" container), apply the following patch. Since list indexes are zero-based, the "database" container is at index 1:

```
patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch:
      - op: remove
        path: /spec/template/spec/containers/1
```

After applying this patch, only the "web" container remains in the configuration.

> [!important]
> **Note**
>
> If you are working with multiple containers, always verify the correct index of the container you want to modify. Misidentifying the index can lead to unexpected configuration errors.

## Deleting a Container Using a Strategic Merge Patch

Another method to remove a container is by using a strategic merge patch. In this approach, you create a patch file (for example, `label-patch.yaml`) and leverage the `$patch: delete` directive, which explicitly marks the container for removal. Using the previous configuration that contains both "web" and "database" containers, the patch to delete the "database" container is as follows:

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

Then, reference the patch file in your `kustomization.yaml` like so:

```
patches:
  - label-patch.yaml
```

This configuration instructs Kustomize to remove the container with the name "database", leaving only the "web" container in your Deployment.

---

Each patch example in this guide illustrates how to manipulate list items in a Kubernetes configuration—whether replacing, adding, or deleting containers—using both JSON 6902 patches and strategic merge patches. For more information on Kubernetes patching techniques, please refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

Happy patching!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/5e018d72-ca12-47c0-9816-5bde98ec4ca5)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/919f7a3a-8ba1-4c84-a363-2108c51fff1d)**
>
> Practice lab
