# Patches Intro - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Patches-Intro)

---

## Table of Contents

- Patches Intro
  - Understanding Patch Components
  - Example 1: Changing the Deployment Name
  - Example 2: Updating the Replica Count
  - Patch Methods in Kustomize
  - Conclusion
  - Watch Video
    - 1. JSON 6902 Patch
    - 2. Strategic Merge Patch

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Kustomize Basics 2025 Updates

# Patches Intro

In this lesson, we explain how patches offer a surgical approach for modifying Kubernetes configurations. Unlike common transformers that are efficient for applying global configuration changes—such as adding labels or setting namespaces—patches allow you to target one or a few specific objects. For example, if you need to update the replica count in a particular deployment, a customized patch permits you to precisely match and change the targeted object.

## Understanding Patch Components

To create a patch, you need to provide three essential parameters:

1.  **Operation Type:** Determines the action performed on a resource. The most commonly used operations are:
    - **add:** Inserts a new element. For instance, when adding a container to a list in a deployment.
    - **remove:** Deletes an element, such as removing a container or a label.
    - **replace:** Swaps an existing value with a new one. For example, changing the replica count from 5 to 10.

2.  **Target:** Specifies the criteria to identify the exact Kubernetes object(s) to patch. You can filter objects based on properties like:
    - kind
    - version
    - name
    - namespace
    - label selector
    - annotation selector

    These criteria can be combined to narrow down your selection.

3.  **Value:** Represents the new value to be applied or used for replacement. Note that for removal operations, no value is provided since the intention is to delete the target property.

> [!important]
> **Note**
>
> When updating configurations, ensure that your patch accurately targets the intended resource to prevent unintended changes.

## Example 1: Changing the Deployment Name

Consider the following `deployment.yaml` file with an initial configuration:

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

If you want to update `metadata.name` from `api-deployment` to `web-deployment`, you can use an inline JSON 6902 patch in your `kustomization.yaml` file:

```
patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch: |-
      - op: replace
        path: /metadata/name
        value: web-deployment
```

After applying this patch, the updated deployment configuration becomes:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-deployment
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

## Example 2: Updating the Replica Count

Let's review another scenario. Suppose the original deployment has one replica, and you want to increase it to five. The initial configuration remains:

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

Using an inline patch in your `kustomization.yaml`, update the replica count as follows:

```
patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch: |-
      - op: replace
        path: /spec/replicas
        value: 5
```

After patching, the final `deployment.yaml` is updated to:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 5
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

## Patch Methods in Kustomize

Kustomize supports two primary methods for defining patches:

### 1\. JSON 6902 Patch

This method specifies the target and lists the patch operations. An example using JSON 6902 patch is:

```
# JSON 6902 Patch
kustomization:
  patches:
    - target:
        kind: Deployment
        name: api-deployment
      patch:
        - op: replace
          path: /spec/replicas
          value: 5
```

### 2\. Strategic Merge Patch

This approach resembles standard Kubernetes configuration files. You provide only the parts of the configuration you intend to modify, and Kustomize merges these changes with the existing configuration. For example:

```
# Strategic Merge Patch
kustomization:
  patches:
    - patch: |-
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: api-deployment
        spec:
          replicas: 5
```

> [!important]
> **Note**
>
> Both methods effectively update Kubernetes resources. The choice between JSON 6902 and strategic merge patches is based on personal preference, with many opting for the readability of strategic merge patches.

## Conclusion

This lesson provided an overview of using patches with Kustomize to perform precise modifications on your Kubernetes configurations. By selecting the appropriate patch type, you can update labels, names, replica counts, and other fields with confidence and ease.

For additional details about patching and Kustomize, check out the [Kustomize documentation](https://kubectl.docs.kubernetes.io/references/kustomize/) and explore more in the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/031e84b8-bcbc-4f39-94d6-66d93b05bddc/lesson/3c149071-8b87-45e0-9fd5-850f0440ff4b)**
>
> Watch video content
