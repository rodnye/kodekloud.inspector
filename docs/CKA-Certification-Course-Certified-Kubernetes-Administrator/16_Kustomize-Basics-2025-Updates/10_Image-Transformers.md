# Image Transformers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Image-Transformers)

---

## Table of Contents

- Image Transformers
  - Example Deployment
  - Transforming the Image
  - Updating Only the Image Tag
  - Combining Image Name and Tag Changes
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Kustomize Basics 2025 Updates

# Image Transformers

In this article, you will learn how to use Kustomize's image transformer to update the images used by your Kubernetes deployments without modifying your deployment manifests directly. This technique allows you to change either the entire image or just update its tag.

## Example Deployment

Consider the following deployment that uses an Nginx container. This configuration is defined in a file named `deployment.yaml`:

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

## Transforming the Image

To transform the image used by the deployment, create a `kustomization.yaml` file that specifies the desired image transformation. For example, if you want to replace the Nginx image with HAProxy, your `kustomization.yaml` should include the following configuration:

```
images:
  - name: nginx
    newName: haproxy
```

Kustomize will scan all Kubernetes configuration files for containers that use the image named "nginx" and replace them with "haproxy".

> [!important]
> **Important**
>
> The "name" property in the kustomization file is related to the image reference and is separate from the container name (which is "web" in the deployment manifest). This is a common point of confusion.

After applying this transformation, the updated deployment configuration will look like:

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

## Updating Only the Image Tag

If your goal is to update only the image tag, you can do so by using the `newTag` property. For instance, to change the tag of the nginx image to "2.4", your `kustomization.yaml` should be written as follows:

```
images:
  - name: nginx
    newTag: 2.4
```

After the transformation, the image reference in your deployment will update to include the new tag:

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

## Combining Image Name and Tag Changes

You can also combine both the `newName` and `newTag` properties if you wish to replace the image entirely and update its tag in one step. For example, to change the nginx image to HAProxy with the tag "2.4", your `kustomization.yaml` would include both properties:

```
images:
  - name: nginx
    newName: haproxy
    newTag: 2.4
```

This configuration will ensure that your deployment now references the image `haproxy:2.4`.

By leveraging Kustomize's image transformer, you can manage image updates efficiently without directly altering your Kubernetes manifests. This process simplifies deployment updates and ensures consistency across your environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/031e84b8-bcbc-4f39-94d6-66d93b05bddc/lesson/632a781d-9494-4120-80d3-e7e86b4e88cf)**
>
> Watch video content
