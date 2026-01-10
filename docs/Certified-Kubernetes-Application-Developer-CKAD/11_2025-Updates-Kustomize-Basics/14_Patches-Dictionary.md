# Patches Dictionary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/Patches-Dictionary)

---

## Table of Contents

- Patches Dictionary
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

2025 Updates Kustomize Basics

# Patches Dictionary

This article explains how to update, add, and remove keys in a Kubernetes Deployment configuration using patches. It covers examples with both JSON 6902 patches and Strategic Merge patches. In each example, we start with a deployment configuration that contains the label "component: api" and then modify it as required.

────────────────────────────── Updating a Label Using a JSON 6902 Patch ──────────────────────────────

Suppose you have a deployment configuration and want to change the label from "component: api" to "component: web". Consider the following original deployment configuration stored in _api-deployment.yaml_:

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

To update the label, use the JSON 6902 patch defined in your _kustomization.yaml_ file:

```
kustomization:
  patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch: |-
      - op: replace
        path: /spec/template/metadata/labels/component
        value: web
```

In this patch, the `replace` operation updates the specified label from "api" to "web".

────────────────────────────── Updating a Label Using a Strategic Merge Patch ──────────────────────────────

Alternatively, you can update the label using a Strategic Merge Patch stored in a separate file (e.g., _label-patch.yaml_). In your _kustomization.yaml_, reference the patch file as shown below:

```
patches:
  - label-patch.yaml
```

Inside _label-patch.yaml_, include only the fields that need to be changed:

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

Kustomize merges this patch with the original configuration and updates the "component" label accordingly.

────────────────────────────── Adding a New Label Using a JSON 6902 Patch ──────────────────────────────

If you wish to add a new label, such as "org: KodeKloud", while retaining the original "component: api" label, apply the following JSON 6902 patch in _kustomization.yaml_:

```
patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch: |-
      - op: add
        path: /spec/template/metadata/labels/org
        value: KodeKloud
```

This patch uses the `add` operation to insert a new key "org" under the labels dictionary. After applying the patch, the labels section will appear as:

```
labels:
  component: api
  org: KodeKloud
```

────────────────────────────── Adding a New Label Using a Strategic Merge Patch ──────────────────────────────

Another approach to add a label is to use a Strategic Merge Patch. Reference the separate patch file in _kustomization.yaml_:

```
patches:
  - label-patch.yaml
```

Inside _label-patch.yaml_, specify the new label as follows:

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

When merged, the configuration retains the original "component: api" label while adding the new "org: kodekloud" label.

────────────────────────────── Removing a Label Using a JSON 6902 Patch ──────────────────────────────

To remove a specific label, such as the "org" label, begin with a deployment configuration that includes both labels:

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
        org: KodeKloud
        component: api
    spec:
      containers:
      - name: nginx
        image: nginx
```

Then, apply the following JSON 6902 patch in _kustomization.yaml_ to remove the "org" key:

```
patches:
  - target:
      kind: Deployment
      name: api-deployment
    patch: |-
      - op: remove
        path: /spec/template/metadata/labels/org
```

This patch eliminates the "org" key from the labels, leaving only the "component" label intact.

────────────────────────────── Removing a Label Using a Strategic Merge Patch ──────────────────────────────

For a Strategic Merge Patch, you can remove a label by setting its value to null. First, reference the patch file (e.g., _label-patch.yaml_) in your _kustomization.yaml_:

```
patches:
  - label-patch.yaml
```

Then, inside _label-patch.yaml_, set the "org" label to null:

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

When Kustomize merges this patch with your deployment configuration, the "org" label is removed.

────────────────────────────── Summary ──────────────────────────────

In this article, we demonstrated multiple techniques for managing Kubernetes Deployment configurations using patches. Whether you use JSON 6902 or Strategic Merge patches, the essential step is to identify the correct configuration path and select the appropriate operation (either "replace", "add", or "remove"/null assignment). This method enables you to maintain concise patch files while effectively managing configuration updates.

> [!important]
> **Note**
>
> For more detailed information on Kubernetes configuration management, visit the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/045b04b8-d4bc-42a1-8c50-dfb934e67cce)**
>
> Watch video content
