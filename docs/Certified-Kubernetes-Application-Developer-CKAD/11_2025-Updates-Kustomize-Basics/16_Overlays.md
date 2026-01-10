# Overlays - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/Overlays)

---

## Table of Contents

- Overlays
  - Folder Structure
  - Base Configuration
  - Overlays Using Patches
  - Adding New Resources in Overlays
  - Flexibility in Directory Structure
  - Watch Video
  - Practice Lab
    - Example: Development Environment
    - Example: Production Environment

---

## Content

Certified Kubernetes Application Developer - CKAD

2025 Updates Kustomize Basics

# Overlays

This guide explores how to leverage Kustomize overlays to customize a base Kubernetes configuration for different environments. Using overlays allows you to maintain a single, consistent base configuration while easily applying environment-specific changes for development, staging, and production.

## Folder Structure

A typical Kustomize project is organized into two main sections:

1.  **Base Configuration:** Contains the shared Kubernetes configurations.
2.  **Overlay Directories:** Contains environment-specific folders where you can adjust or extend the base configuration using patches or by adding new resources.

Below is an example directory structure:

```
k8s/
└── base/
    ├── kustomization.yaml
    ├── nginx-depl.yaml
    ├── service.yaml
    └── redis-depl.yaml
└── overlays/
    ├── dev/
    │   ├── kustomization.yaml
    │   └── config-map.yaml
    ├── stg/
    │   ├── kustomization.yaml
    │   └── config-map.yaml
    └── prod/
        ├── kustomization.yaml
        └── config-map.yaml
```

## Base Configuration

The base configuration contains all the shared resources used across environments. For example, a base `kustomization.yaml` could reference your primary Kubernetes resources:

```
resources:
  - nginx-depl.yaml
  - service.yaml
  - redis-depl.yaml
```

An example deployment file, `nginx-depl.yaml`, might look like this:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
```

## Overlays Using Patches

One of the key benefits of Kustomize is its ability to use overlays to modify the base configuration specific to each environment. Overlays allow you to apply patches that adjust parameters such as replica counts without duplicating the entire base configuration.

### Example: Development Environment

In the development overlay, you may want to increase the replica count from 1 to 2. The `kustomization.yaml` file in the `dev` directory could be structured as follows:

```
bases:
  - ../../base
patch: |-
  - op: replace
    path: /spec/replicas
    value: 2
```

Here, the `bases` field points to the common base configuration, and the patch adjusts the `/spec/replicas` property specifically for the development environment.

### Example: Production Environment

For the production environment, if you want to set the replica count to 3, the overlay's `kustomization.yaml` would look similar with a slight change:

```
bases:
  - ../../base
patch: |-
  - op: replace
    path: /spec/replicas
    value: 3
```

This mechanism allows each overlay to tailor the configuration to meet specific operational requirements.

## Adding New Resources in Overlays

Overlays are not limited to patching existing resources; they can also introduce new resources that are unique to an environment. For example, in a production overlay, you might add a Grafana deployment. The directory structure can be updated as follows:

```
k8s/
└── base/
    ├── kustomization.yaml
    ├── nginx-depl.yaml
    ├── service.yaml
    └── redis-depl.yaml
└── overlays/
    ├── dev/
    │   ├── kustomization.yaml
    │   ├── config-map.yaml
    │   └── volume.yaml
    ├── stg/
    │   ├── kustomization.yaml
    │   └── config-map.yaml
    └── prod/
        ├── kustomization.yaml
        ├── config-map.yaml
        └── grafana-depl.yaml
```

In the production overlay’s `kustomization.yaml`, you can include the additional Grafana resource:

```
bases:
  - ../../base
resources:
  - grafana-depl.yaml
patch: |-
  - op: replace
    path: /spec/replicas
    value: 2
```

This configuration continues to import the common resources from the base while adding the unique Grafana deployment specific to production.

## Flexibility in Directory Structure

Kustomize's flexible design helps manage complexity by separating common configurations from environment-specific customizations. This approach lets you centralize shared settings in one place and maintain clear, organized overlays for each environment.

> [!important]
> **Key Benefit**
>
> Using overlays reduces configuration duplication and streamlines the management of different deployment environments. This approach ensures consistency across environments while allowing specific modifications as needed.

By understanding and utilizing Kustomize overlays, you can efficiently manage Kubernetes configurations across multiple environments, making your deployment workflows more robust and easier to maintain.

For more detailed information on how to implement and optimize Kustomize for your projects, consider exploring additional resources on [Kubernetes Documentation](https://kubernetes.io/docs/) and related tools.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/d02f6c7a-d704-4c64-b08b-d3ef01ee9a4d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/a2d3ef06-b264-41a2-8e13-2ec409afabfe)**
>
> Practice lab
