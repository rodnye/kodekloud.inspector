# Overlays - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Overlays)

---

## Table of Contents

- Overlays
  - Base Configuration Example
  - Creating Overlays
  - Summary
  - Watch Video
  - Practice Lab
    - Development Overlay
    - Production Overlay
    - Adding New Resources in Overlays

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Kustomize Basics 2025 Updates

# Overlays

Overlays in Kustomize allow you to customize a base Kubernetes configuration on a per-environment basis. This method is particularly useful for environments such as development, staging, and production, where you need to apply environment-specific adjustments to shared configurations.

Kustomize projects are typically organized into two main sections:

1.  **Base Configuration:** Contains all shared and default Kubernetes resource definitions.
2.  **Overlay Directories:** Each environment (e.g., dev, stg, prod) has its own overlay folder with patches to modify the base configuration as needed.

Below is a diagram illustrating a common directory structure for managing these configurations:

![The image illustrates a directory structure for Kubernetes configurations, showing a base directory for shared configs and overlay directories for environment-specific configurations (dev, stg, prod). It highlights the use of Kustomize for managing these configurations.](https://kodekloud.com/kk-media/image/upload/v1752869807/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Overlays/kubernetes-config-directory-structure.jpg)

> [!important]
> **Understanding the Structure**
>
> In this setup, the base folder holds the shared resource files, while each overlay folder contains a `kustomization.yaml` that references the shared resources in the base along with overlays (patches or additional resources) specific to that environment.

## Base Configuration Example

Imagine that you have an `nginx-deployment.yaml` file within your base folder with a replica count set to 1. The corresponding `kustomization.yaml` in the base folder might look like this:

```
# base/kustomization.yaml
resources:
  - nginx-depl.yaml
  - service.yaml
  - redis-depl.yaml
```

And the `nginx-depl.yaml` file is defined as follows:

```
# base/nginx-depl.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
```

## Creating Overlays

### Development Overlay

To create an overlay for the development environment, you would set up a `kustomization.yaml` file in the `dev` overlay folder. This file references the base configuration and includes a patch to update the replica count:

```
# overlays/dev/kustomization.yaml
bases:
  - ../../base
patch: |-
  - op: replace
    path: /spec/replicas
    value: 2
```

In this overlay, the `bases` property points to the shared base resources using the relative path `../../base`. The patch then modifies the replica count from 1 to 2 for the development environment.

### Production Overlay

Similarly, to tailor the configuration for production, the overlay can reference the same base while applying a different patch:

```
# overlays/prod/kustomization.yaml
bases:
  - ../../base
patch: |-
  - op: replace
    path: /spec/replicas
    value: 3
```

This overlay increases the replica count to 3 for production.

### Adding New Resources in Overlays

Overlays can also introduce new resources that don’t exist in the base configuration. For instance, if you want to add a production-specific Grafana deployment, you can include its YAML file in the production overlay:

```
# overlays/prod/kustomization.yaml
bases:
  - ../../base
resources:
  - grafana-depl.yaml
patch: |-
  - op: replace
    path: /spec/replicas
    value: 2
```

In this configuration, the overlay imports the base resources, applies a patch to change the replica count for the existing deployment, and adds a new Grafana deployment.

> [!important]
> **Flexibility in Structure**
>
> Kustomize is flexible in the way you structure your configurations. While the base can be organized into subdirectories based on features, the overlay directories do not need to mirror that structure. The critical factor is correctly referencing the shared resources in the appropriate `kustomization.yaml` file.

Below is another diagram that provides a more detailed look at the directory structure using Kustomize, showing both the base and overlay directories across different environments:

![The image shows a directory structure for Kubernetes (K8s) configurations, including base and overlay folders for different environments like dev, stg, and prod, each containing YAML files. The "prod" overlay is highlighted with a dashed red line.](https://kodekloud.com/kk-media/image/upload/v1752869808/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Overlays/kubernetes-kustomize-directory-structure.jpg)

## Summary

Overlays in Kustomize enable you to:

- Import and reuse a base configuration containing shared resources.
- Apply environment-specific patches to adjust base resources such as replica counts.
- Introduce new resources within an overlay without affecting the base configuration.

This approach helps maintain a clean separation between shared configurations and environment-specific customizations while taking full advantage of Kustomize's powerful features for managing Kubernetes deployments.

For further information on Kubernetes configuration management, consider exploring additional resources in the [Kubernetes Documentation](https://kubernetes.io/docs/) and [Kustomize GitHub repository](https://github.com/kubernetes-sigs/kustomize).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/031e84b8-bcbc-4f39-94d6-66d93b05bddc/lesson/d02f6c7a-d704-4c64-b08b-d3ef01ee9a4d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/031e84b8-bcbc-4f39-94d6-66d93b05bddc/lesson/a2d3ef06-b264-41a2-8e13-2ec409afabfe)**
>
> Practice lab
