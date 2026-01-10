# kustomization - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/Kustomize-Basics/kustomization)

---

## Table of Contents

- kustomization
  - Directory Structure
  - kustomization.yaml Fields
  - Configuring Resources and Labels
  - Generating Customized Manifests
  - Sample Output
  - Watch Video

---

## Content

Kustomize

Kustomize Basics

# kustomization

In this guide, you’ll learn how to structure and configure the `kustomization.yaml` file for managing Kubernetes manifests with [Kustomize](https://kubectl.docs.kubernetes.io/references/kustomize/). We’ll cover directory setup, key fields, building overlays, and deploying your customized resources.

> [!important]
> **Prerequisites**
>
> Ensure you have Kustomize installed and available in your `PATH`. You can verify with:
>
> ```
> kustomize version
> ```

## Directory Structure

Place your manifests and `kustomization.yaml` in a folder (e.g., `k8s/`). Only the `kustomization.yaml` file is processed directly—other YAMLs are referenced as resources.

![The image shows a directory named "k8s" containing three YAML files: "nginx-depl.yml," "nginx-service.yml," and "kustomization.yaml."](https://kodekloud.com/kk-media/image/upload/v1752880927/notes-assets/images/Kustomize-kustomization/k8s-yaml-files-directory.jpg)

## kustomization.yaml Fields

Here are the core sections you’ll use most often:

| Field        | Purpose                                          | Example                   |
| ------------ | ------------------------------------------------ | ------------------------- |
| resources    | Lists input Kubernetes YAML manifests            | `- nginx-deployment.yaml` |
| commonLabels | Adds identical labels to every resource in build | `company: KodeKloud`      |

## Configuring Resources and Labels

Create or update `kustomization.yaml` with your manifests and desired transformations:

```
# kustomization.yaml
resources:
  - nginx-deployment.yaml
  - nginx-service.yaml


commonLabels:
  company: KodeKloud
```

- **resources**: Relative paths to each manifest file.
- **commonLabels**: A map of labels automatically injected into all output resources.

> [!important]
> **File Naming Best Practice**
>
> Keep your file names consistent (e.g., `nginx-service.yaml` vs. `nginx-service.yml`) to avoid missing resources during `kustomize build`.

## Generating Customized Manifests

Run the following command from the parent directory:

```
kustomize build k8s/
```

This command:

1.  Reads `k8s/kustomization.yaml`.
2.  Imports listed resources.
3.  Applies `commonLabels` and other transformations.
4.  Emits the merged YAML to stdout.

## Sample Output

```
apiVersion: v1
kind: Service
metadata:
  name: nginx-loadbalancer-service
  labels:
    company: KodeKloud
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP
  selector:
    company: KodeKloud
    component: nginx
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    company: KodeKloud
spec:
  replicas: 1
  selector:
    matchLabels:
      company: KodeKloud
      component: nginx
  template:
    metadata:
      labels:
        company: KodeKloud
        component: nginx
    spec:
      containers:
        - name: nginx
          image: nginx
```

Notice each resource now carries `company: KodeKloud`. You can apply this directly to your cluster:

```
kustomize build k8s/ | kubectl apply -f -
```

![The image is a slide explaining the use of Kustomize in Kubernetes, detailing how it manages manifests and customizations, and the function of the `kustomize build` command.](https://kodekloud.com/kk-media/image/upload/v1752880929/notes-assets/images/Kustomize-kustomization/kustomize-kubernetes-manifests-explained.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/8b591384-c5e2-4411-afc1-443d3f2ba735/lesson/744d0dcb-ea0d-45ea-a4e5-746af8a05d19)**
>
> Watch video content
