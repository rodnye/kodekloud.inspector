# Different Types of Patches - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/Different-Types-of-Patches)

---

## Table of Contents

- Different Types of Patches
  - JSON 6902 Patches
  - Strategic Merge Patches
  - Summary Table
  - Watch Video
    - Inline Definition in kustomization.yaml
    - Referencing an External Patch File
    - Inline Strategic Merge Patch in kustomization.yaml
    - Using an External YAML File for Strategic Merge Patch

---

## Content

Certified Kubernetes Application Developer - CKAD

2025 Updates Kustomize Basics

# Different Types of Patches

This article explains two methods for defining patches in Kubernetes: JSON 6902 patches and strategic merge patches. You have the flexibility to define patches either inline within the kustomization.yaml file or by referencing external patch files. Inline patches consolidate everything in one file, while external files keep your kustomization.yaml concise, especially when managing numerous patches.

## JSON 6902 Patches

### Inline Definition in kustomization.yaml

Below is an example of an inline patch applied to the "api-deployment":

```
# Inline patch for api-deployment
patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch: |-
      - op: replace
        path: /spec/replicas
        value: 5
```

### Referencing an External Patch File

Alternatively, you can reference a separate file. In this example, the external file (`replica-patch.yaml`) is used for the "nginx-deployment":

```
# Reference to an external file for nginx-deployment
patches:
  - path: replica-patch.yaml
    target:
      kind: Deployment
      name: nginx-deployment
```

In the external file (`replica-patch.yaml`), the patch is defined as follows:

```
- op: replace
  path: /spec/replicas
  value: 5
```

## Strategic Merge Patches

For strategic merge patches, you can similarly choose between inline definitions or referencing an external file.

### Inline Strategic Merge Patch in kustomization.yaml

The following example shows an inline strategic merge patch for the "api-deployment":

```
patches:
  - patch: |-
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: api-deployment
      spec:
        replicas: 5
```

### Using an External YAML File for Strategic Merge Patch

To reference a file for a strategic merge patch, simply include the file path in your kustomization.yaml:

```
patches:
  - path: replica-patch.yaml
```

> [!important]
> **Note**
>
> Both inline definitions and separate patch files are valid options. Choose the approach that best suits your project structure and maintenance preferences.

## Summary Table

| Patch Type            | Inline Example                                         | External File Example                          |
| --------------------- | ------------------------------------------------------ | ---------------------------------------------- |
| JSON 6902 Patch       | Inline definition in kustomization.yaml as shown above | Reference external file (`replica-patch.yaml`) |
| Strategic Merge Patch | Inline definition in kustomization.yaml as shown above | Reference external file (`replica-patch.yaml`) |

Using external patch files is particularly beneficial if you have a high number of patches or if you want to keep your kustomization.yaml lean and easy to manage.

For more in-depth information and best practices on patching in Kubernetes, explore the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/1b0aa541-7251-472c-89f3-8763fee58898)**
>
> Watch video content
