# Helm Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Helm-Fundamentals/Helm-Introduction)

---

## Table of Contents

- Helm Introduction
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Helm Fundamentals

# Helm Introduction

In this article, we will explore Helm and its role in simplifying the management of complex Kubernetes applications. While Kubernetes excels at orchestrating infrastructure, handling multiple interconnected objects in a single application can become challenging. For example, deploying a WordPress site might require several components, including:

- A Deployment to run the pods for components such as MySQL database servers or web servers.
- A Persistent Volume for database storage.
- A Persistent Volume Claim to request storage.
- A Service to expose the web server.
- A Secret to securely store the admin password.

Traditionally, each of these objects would be defined in separate YAML files and applied individually using the `kubectl apply` command. Managing configurations across multiple files becomes tedious and error-prone—if, for instance, you need to increase the persistent volume size from 20 GB to a higher capacity, every related YAML file must be manually updated. Additionally, upgrading or removing the application involves tracking down and managing all individual objects.

Consider the following YAML snippet:

```
apiVersion: v1
kind: Secret
metadata:
  name: wordpress-admin-password
data:
  key: CajnHWVUxSdzIZQzg0SERXhBQTvQ1FzN2JE9PQ==
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: wordpress-pv
spec:
  capacity:
    storage: 20Gi
  accessModes:
    - ReadWriteOne
  gcePersistentDisk:
    pdName: wordpress-2
    fsType: ext4
```

While organizing related objects into separate files (for example, placing deployment configurations in `mysql-deployment.yaml`) can offer some clarity, it still requires searching across multiple files to update settings.

![The image illustrates Helm, a Kubernetes package manager, with components like Service, Deployment, Secret, PVC, and PV.](https://kodekloud.com/kk-media/image/upload/v1752871217/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Helm-Introduction/frame_170.jpg)

Enter Helm. Unlike Kubernetes, which considers each object independently, Helm recognizes that these objects are part of a cohesive package—such as a WordPress application. With Helm, you manage the application as a single unit instead of juggling multiple YAML files.

Consider this analogy: a computer game is composed of hundreds or thousands of files (executables, audio, graphics, configuration data). Instead of downloading and organizing each file manually, you run an installer that efficiently places everything in the correct locations. Helm provides a similar level of abstraction for your Kubernetes manifests. It allows you to install, upgrade, roll back, and uninstall an application, regardless of how many individual objects it encompasses.

For example, to install a WordPress package using Helm, you would execute:

```
helm install wordpress ...
```

Helm leverages a central configuration file—typically named `values.yaml`—to manage custom settings. This file might look like:

```
wordpressUsername: user
wordpressEmail: user@example.com
wordpressFirstName: FirstName
wordpressLastName: LastName
```

This centralized configuration lets you adjust critical settings—such as persistent volume sizes, website names, admin passwords, and database configurations—in one place, eliminating the need to modify multiple YAML files.

> [!important]
> **Tip**
>
> By centralizing configuration management, Helm significantly streamlines application lifecycle management in Kubernetes.

Managing the application lifecycle becomes even simpler with Helm. With a single command, you can upgrade your application, and Helm calculates the necessary changes to each object. Rolling back to a previous version or uninstalling the application is equally straightforward. For example, a typical workflow might involve:

```
helm install wordpress ...
helm upgrade wordpress ...
helm rollback wordpress ...
helm uninstall wordpress ...
```

By treating Kubernetes applications as cohesive packages rather than isolated objects, Helm reduces administrative overhead and simplifies application management. This package and release management approach allows you to focus on application development rather than micromanaging individual Kubernetes objects.

For further reading, consider visiting the [Kubernetes Documentation](https://kubernetes.io/docs/) and learning more about [Helm](https://helm.sh/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/bc61a673-47c3-4bef-b7f5-12f85c65cbbb/lesson/980d80bf-92fb-48ef-abfc-56835f0732e5)**
>
> Watch video content
