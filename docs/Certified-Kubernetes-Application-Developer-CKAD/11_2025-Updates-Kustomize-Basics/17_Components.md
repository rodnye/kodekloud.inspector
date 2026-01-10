# Components - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/Components)

---

## Table of Contents

- Components
  - Implementing a Component
  - Watch Video
  - Practice Lab
    - Postgres Deployment Configuration
    - Component kustomization.yaml
    - Updating the Base Deployment
    - Importing Components in Overlays

---

## Content

Certified Kubernetes Application Developer - CKAD

2025 Updates Kustomize Basics

# Components

In this lesson, we'll dive into a Kustomize feature called components. Components let you define reusable configuration logic that can be imported into multiple overlays. This approach is ideal when your application supports several optional features that should only be enabled in specific overlays.

Consider a scenario where you have feature-specific configurations. If the feature is required in every overlay, you might include the configuration in your base. However, when a feature should only be active in a subset of overlays, duplicating the configuration across these environments can lead to drift and maintenance headaches. Components address this challenge by allowing you to keep your configuration logic in one location and import it into the overlays that need it.

For example, imagine an application deployed in three variations: development, premium, and self-hosted. The shared base configuration applies to all overlays. Now, suppose the application supports two optional features:

1.  Caching – enabled only for the premium and self-hosted versions. This requires a Redis database and its associated configurations.
2.  An external database service (e.g., Postgres) – enabled only for the development and premium versions.

![The image describes components as reusable configuration logic pieces, useful for enabling optional features in specific application overlays.](https://kodekloud.com/kk-media/image/upload/v1752871121/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Components/frame_20.jpg)

Without components, you might consider placing the caching configuration in the base. However, this would enable caching for all overlays, including development, which is not desired. Alternatively, you could copy the caching configuration into the premium and self-hosted overlays, but this risks configuration drift and complicates scaling when more overlays are added. Components allow you to define the caching logic just once and import it wherever it's required.

Let's visualize how the project structure might look. Imagine a directory structure with overlays for development, premium, and self-hosted deployments, a base folder for shared configurations, and a separate directory for components:

```
k8s/
├── base/
│   ├── kustomization.yaml
│   └── api-depl.yaml
├── components/
│   ├── caching/
│   │   ├── kustomization.yaml
│   │   ├── deployment-patch.yaml
│   │   └── redis-depl.yaml
│   └── db/
│       ├── kustomization.yaml
│       ├── deployment-patch.yaml
│       └── postgres-depl.yaml
└── overlays/
    ├── dev/
    │   └── kustomization.yaml
    ├── premium/
    │   └── kustomization.yaml
    └── standalone/
        └── kustomization.yaml
```

The three overlays each contain a minimal `kustomization.yaml` file that imports shared configurations from the base folder. The new "components" directory houses two distinct components: one for caching and one for the external database. For instance, the caching component includes all Kubernetes configurations necessary for setting up Redis (deployments, secrets, patches, etc.), while the database component manages all configurations needed for an external Postgres database.

![The image is a flowchart showing components like base, dev, Premium, Self-hosted, caching, and db, connected by arrows, under the title "Components."](https://kodekloud.com/kk-media/image/upload/v1752871122/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Components/frame_250.jpg)

> [!important]
> **Note**
>
> By isolating the configuration logic into components, overlays that require specific features—such as caching or an external database—can simply import the corresponding component. This method minimizes duplicate code and reduces the chance of error.

---

## Implementing a Component

Consider the project structure described above. The `base` directory contains common configurations, including a `kustomization.yaml` file and an API deployment file. The `components` directory holds feature-specific folders for caching and the database, while the `overlays` directory contains environment-specific configurations for dev, premium, and standalone deployments.

Let's focus on the database component. Within the database component folder, you will find the following files:

- **postgres-depl.yaml:** Defines the Kubernetes Deployment required for a Postgres instance.
- **deployment-patch.yaml:** A strategic merge patch that modifies the base API deployment by adding an environment variable for the new database connection.
- **kustomization.yaml:** Specifies the component metadata, resources, secret generator, and patch references.

### Postgres Deployment Configuration

Below is an example of the Postgres Deployment configuration defined in `postgres-depl.yaml`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: postgres
  template:
    metadata:
      labels:
        component: postgres
    spec:
      containers:
        - name: postgres
          image: postgres
```

### Component kustomization.yaml

In the component's `kustomization.yaml` file, notice that the ApiVersion and Kind differ from a typical configuration file. Because this is defined as a component, the ApiVersion is `kustomize.config.k8s.io/v1alpha1` and the Kind is `Component`. This file references the resources for the component, defines a secret for the database password, and applies any necessary patches:

```
apiVersion: kustomize.config.k8s.io/v1alpha1
kind: Component
resources:
  - postgres-depl.yaml
secretGenerator:
  - name: postgres-cred
    literals:
      - password=postgres123
patches:
  - deployment-patch.yaml
```

The secret generator ensures that the database password is managed and injected securely. Meanwhile, the patch described in `deployment-patch.yaml` adjusts the base API deployment to use the newly created secret.

### Updating the Base Deployment

The `deployment-patch.yaml` file adds an environment variable to the API deployment so that the application can connect to the new Postgres database. An example patch looks like this:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  template:
    spec:
      containers:
      - name: api
        env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-cred
              key: password
```

### Importing Components in Overlays

To incorporate the external database settings, overlays that require this feature (for example, the dev overlay) import the database component. The overlay's `kustomization.yaml` file includes the base configuration and then adds the component:

```
bases:
  - ../../base
components:
  - ../../components/db
```

This setup ensures that the base API deployment is patched with the database settings from the imported component.

> [!important]
> **Benefits of Components**
>
> Using components in your Kubernetes configuration allows you to manage optional features efficiently. It simplifies maintenance, reduces duplicate code, and minimizes the risk of configuration drift across multiple environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/19fbbe24-267f-48ea-9a01-56cf06d6c842)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/66fefe64-87fd-4d25-a46f-c66dce62def7)**
>
> Practice lab
