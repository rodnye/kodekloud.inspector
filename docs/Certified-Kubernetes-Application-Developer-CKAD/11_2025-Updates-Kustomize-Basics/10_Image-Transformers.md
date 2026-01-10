# Image Transformers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/Image-Transformers)

---

## Table of Contents

- Image Transformers
  - Changing the Image Tag
  - Combining Image and Tag Transformations
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

2025 Updates Kustomize Basics

# Image Transformers

In this article, we explore how to modify container images in Kubernetes manifests using Kustomize image transformers. This powerful technique enables you to update image references—and even image tags—in your deployment files without editing them manually.

Below is an example deployment manifest (deployment.yaml) for an Nginx server:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: web
  template:
    metadata:
      labels:
        component: web
    spec:
      containers:
      - name: web
        image: nginx
```

To modify the image used by this deployment, create a Kustomize image transformer in a file named `kustomization.yaml`. In the transformer, the `name` property specifies the image to search for (in this case, "nginx"), and the `newName` property defines the replacement image. For example, to replace Nginx with HAProxy, use the following configuration:

```
images:
- name: nginx
  newName: haproxy
```

The image transformer scans all Kubernetes configuration files for containers using an image named "nginx" and replaces it with "haproxy."

> [!important]
> **Note**
>
> The `name` field in the `kustomization.yaml` file strictly refers to the image name and is not related to the container name specified in the deployment manifest.

After applying this transformation, the deployment manifest is updated so that the container image changes from "nginx" to "haproxy." The modified deployment appears as follows:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: web
  template:
    metadata:
      labels:
        component: web
    spec:
      containers:
      - name: web
        image: haproxy
```

---

## Changing the Image Tag

If you want to update only the image tag without switching the image itself, the image transformer can modify the tag value. Begin with the original deployment manifest:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: web
  template:
    metadata:
      labels:
        component: web
    spec:
      containers:
      - name: web
        image: nginx
```

Next, update your `kustomization.yaml` to specify the new tag:

```
images:
- name: nginx
  newTag: 2.4
```

Once applied, the container image in the deployment is updated to include the new tag, yielding the following transformed manifest:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: web
  template:
    metadata:
      labels:
        component: web
    spec:
      containers:
      - name: web
        image: nginx:2.4
```

---

## Combining Image and Tag Transformations

You can perform both image name and tag transformations simultaneously in a single `kustomization.yaml` file. For instance, if you want to change the Nginx image to HAProxy and update its tag to "2.4," use the following configuration:

```
images:
- name: nginx
  newName: haproxy
  newTag: 2.4
```

After applying this configuration, the final deployment manifest will feature the container image updated to "haproxy:2.4."

---

This guide demonstrates how to leverage Kustomize's image transformer for efficient container image and tag modifications, ensuring a consistent deployment process while minimizing manual edits.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/632a781d-9494-4120-80d3-e7e86b4e88cf)**
>
> Watch video content
