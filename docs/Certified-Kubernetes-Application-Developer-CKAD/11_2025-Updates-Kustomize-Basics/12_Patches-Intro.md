# Patches Intro - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/Patches-Intro)

---

## Table of Contents

- Patches Intro
  - Example: Updating the Replica Count
  - Two Methods for Defining Patches
  - Summary
  - Watch Video
    - 1. JSON 6902 Patch
    - 2. Strategic Merge Patch

---

## Content

Certified Kubernetes Application Developer - CKAD

2025 Updates Kustomize Basics

# Patches Intro

In this article, we explore how customized patches provide a surgical approach to modifying Kubernetes configurations. Unlike common transformers that apply changes broadly (e.g., assigning a label or namespace to all objects), patches enable you to target specific objects—or even individual fields within an object. For example, if you need to update the replica count in a deployment, a patch lets you modify only that value.

To create a patch, you must provide three components:

1.  **Operation Type**  
    This specifies the action you want to perform. The three most common operations are:
    - **add**: Introduces a new element. For instance, adding a container to an existing list.
    - **remove**: Eliminates an existing element, such as taking away a container or label.
    - **replace**: Substitutes an existing value with a new one. For example, changing the replica count from 5 to 10.

2.  **Target**  
    The target defines the match criteria for determining which Kubernetes object(s) the patch should apply to. This may include properties such as kind, version, name, namespace, label selectors, or annotation selectors. You can combine multiple criteria to precisely identify the desired resource(s).
3.  **Value**  
    This represents the new data to add or use for replacement. Note that if the operation is `remove`, no value is required.

Below is an example that demonstrates these concepts using a Kustomize patch.

---

Consider the following sample deployment configuration in `deployment.yaml`, where the deployment's name is currently set to "api-deployment". The goal is to update it to "web-deployment".

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

The corresponding patch defined in `kustomization.yaml` is shown below:

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

In this inline patch:

- The `|-` introduces the patch details.
- `op` specifies the operation (in this case, replace).
- `path` points to the YAML property you want to change – here, `/metadata/name`.
- `value` provides the new value ("web-deployment").

After applying this patch, the deployment configuration is updated as follows:

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

---

> [!important]
> **Note**
>
> Patches are especially useful when you need to make precise, minimal modifications without affecting the entire configuration. This helps in managing changes in large-scale deployments.

## Example: Updating the Replica Count

Let's explore another scenario. Suppose you want to update the replica count from 1 to 5 in your deployment. The original `deployment.yaml` looks like this:

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

You can define the patch in `kustomization.yaml` as follows:

```
patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch: |
      - op: replace
        path: /spec/replicas
        value: 5
```

In this example, the path `/spec/replicas` pinpoints the replica count field under the spec, which is then updated with the new value.

---

## Two Methods for Defining Patches

Kustomize supports two primary methods for defining patches:

### 1\. JSON 6902 Patch

This method explicitly specifies both the target and patch details using JSON patch semantics. For example:

```
# JSON 6902 Patch:
kustomization:
  patches:
    - target:
        kind: Deployment
        name: api-deployment
      patch: |
        - op: replace
          path: /spec/replicas
          value: 5
```

### 2\. Strategic Merge Patch

This approach resembles a standard Kubernetes configuration file. You provide a snippet that mirrors the original resource configuration and includes only the fields to be updated:

```
# Strategic Merge Patch:
kustomization:
  patches:
    - patch: |
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: api-deployment
        spec:
          replicas: 5
```

With the strategic merge patch, Kustomize merges the provided snippet with the original configuration, ensuring that only the specified fields are updated.

> [!important]
> **Choosing a Patch Method**
>
> Both JSON 6902 and strategic merge patches are valid options. Choose JSON 6902 for detailed control when you need explicit patch operations, or opt for strategic merge patches for a more readable and Kubernetes-native configuration style.

## Summary

Patches in Kustomize allow for precise modifications to Kubernetes objects by specifying:

- **Operation Type**: Determines whether to add, remove, or replace a value.
- **Target**: Defines the resource(s) the patch applies to using specific matching criteria.
- **Value**: Contains the updated data or new configuration value.

This article detailed examples for renaming a deployment and updating replica counts and compared the JSON 6902 and strategic merge patch methods. Both approaches offer unique advantages, empowering you to choose the best fit for your Kubernetes configuration management needs.

For more information on Kubernetes configurations and patching strategies, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/3c149071-8b87-45e0-9fd5-850f0440ff4b)**
>
> Watch video content
