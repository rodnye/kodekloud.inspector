# Kustomize Problem Statement idealogy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/Kustomize-Problem-Statement-idealogy)

---

## Table of Contents

- Kustomize Problem Statement idealogy
  - Kustomize: Base and Overlays
  - Advantages of Using Kustomize
  - Additional Resources
  - Watch Video
    - Project Directory Structure

---

## Content

Certified Kubernetes Application Developer - CKAD

2025 Updates Kustomize Basics

# Kustomize Problem Statement idealogy

Before diving into what Kustomize is and how to use it, it's essential to understand the problem it addresses and why it was created.

Imagine you start with a simple NGINX deployment YAML file that deploys a single NGINX pod:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: nginx
  template:
    metadata:
      labels:
        component: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
```

Now, consider multiple environments such as development, staging, and production. Each environment might require different replica counts based on resource availability and varying traffic:

- Development: 1 replica
- Staging: 2 or 3 replicas
- Production: 5 to 10 replicas

A basic solution might be to create three separate directories (one for each environment) and duplicate the same configuration file with only the replica count changed. For example:

```
# dev/nginx.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: nginx
  template:
    metadata:
      labels:
        component: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
```

```
# stg/nginx.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      component: nginx
  template:
    metadata:
      labels:
        component: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
```

```
# prod/nginx.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 5
  selector:
    matchLabels:
      component: nginx
  template:
    metadata:
      labels:
        component: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
```

You would then apply each configuration per environment. For instance, in the development folder, run:

```
$ kubectl apply -f dev/
deployment.apps/nginx-deployment created
```

And for staging:

```
$ kubectl apply -f stg/
deployment.apps/nginx-deployment created
```

> [!important]
> **Note**
>
> While this method works, it quickly becomes unmanageable. When new resources (like a `service.yaml`) are added, you need to duplicate and update the file in every environment directory.

![The image shows a directory structure for Kubernetes configurations with folders for dev, stg, and prod environments, each containing "nginx-depl.yml" and "service.yml" files.](https://kodekloud.com/kk-media/image/upload/v1752871123/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Kustomize-Problem-Statement-idealogy/frame_170.jpg)

This duplication increases the chance of human errors and inconsistencies across environments, especially as your Kubernetes infrastructure scales.

## Kustomize: Base and Overlays

Kustomize was created to address these challenges by eliminating code duplication while allowing environment-specific customizations. It introduces two key concepts:

- **Base Configuration:** Contains common settings and resources applicable across all environments. This is your single source of truth for shared configurations.
- **Overlays:** Customize the Base configuration for specific environments by modifying only the parameters that vary.

Consider this Base configuration for the NGINX deployment:

```
# base/nginx-depl.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: nginx
  template:
    metadata:
      labels:
        component: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
```

Since staging and production require different replica counts, you create overlays that override the default replica settings:

```
# overlays/kustomization.yaml (Conceptual Representation)
base:
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: nginx-deployment
  spec:
    replicas: 1
    selector:
      matchLabels:
        component: nginx
    template:
      metadata:
        labels:
          component: nginx
      spec:
        containers:
        - name: nginx
          image: nginx

overlays:
  dev:
    spec:
      replicas: 1
  stg:
    spec:
      replicas: 2
  prod:
    spec:
      replicas: 5
```

In this setup, the development overlay retains the same settings as the Base, while staging and production override the `replicas` count.

### Project Directory Structure

A typical Kustomize project structure might look like this:

```
k8s/
├── base/
│   ├── kustomization.yaml
│   ├── nginx-depl.yaml
│   ├── service.yaml
│   └── redis-depl.yaml
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

Here, the Base folder holds the shared configurations, while each environment-specific overlay directory contains its own `kustomization.yaml` and any additional configuration files.

After combining the Base and the appropriate Overlay, Kustomize generates the final Kubernetes manifest ready to be applied to your cluster.

![The image illustrates the Kustomize process, combining "Base" and "Overlay" to produce "Final Manifests."](https://kodekloud.com/kk-media/image/upload/v1752871124/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Kustomize-Problem-Statement-idealogy/frame_410.jpg)

## Advantages of Using Kustomize

Kustomize is integrated into kubectl, so there's no need for additional installations. Although the built-in version works well, you might consider installing the latest version of Kustomize for access to new features.

Unlike Helm, Kustomize avoids templating and works entirely with plain YAML files, which offers several benefits:

- No need to learn or manage a templating language.
- Improved readability and maintainability of configuration files.
- Seamless validation and processing with existing YAML tools.

![The image describes Kustomize's integration with kubectl, its simplicity over templating systems, and its use of plain YAML for validation and processing.](https://kodekloud.com/kk-media/image/upload/v1752871126/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Kustomize-Problem-Statement-idealogy/frame_470.jpg)

> [!important]
> **Benefit Overview**
>
> Kustomize enables you to maintain a single base configuration while selectively overriding parameters for each environment. This approach reduces duplication, minimizes errors, and scales efficiently as your Kubernetes environment grows.

By leveraging Base and Overlays, Kustomize treats configuration files like regular application code, enhancing consistency and manageability across all deployment environments.

## Additional Resources

For further information on Kubernetes and Kustomize, consider exploring these resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Understanding Kustomize](https://kubectl.docs.kubernetes.io/pages/app_management/kustomize.html)

This approach makes your infrastructure setup more modular, maintainable, and ready for scaling as your organization grows.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/6d9867b7-aba8-4f8c-b499-b5efccfc5a71)**
>
> Watch video content
