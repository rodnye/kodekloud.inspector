# What is Helm - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Helm-for-Beginners/Introduction-to-Helm/What-is-Helm)

---

## Table of Contents

- What is Helm
  - Watch Video

---

## Content

Helm for Beginners

Introduction to Helm

# What is Helm

Let's begin with an understanding of Helm and its role in managing Kubernetes applications.

Kubernetes is a powerful platform for managing complex infrastructures. However, when deploying applications, human error can creep in due to the sheer number of interconnected objects. For example, a simple WordPress site might require several Kubernetes objects such as:

- A Deployment for Pods running services like MySQL or web servers.
- A Persistent Volume (PV) along with a Persistent Volume Claim (PVC) for storing the database.
- A Service to expose your web server to the internet.
- A Secret to store sensitive credentials, such as admin passwords.
- Additional objects for Jobs, backups, and other configurations.

Managing these components typically means creating and maintaining multiple YAML files and then running `kubectl apply` on each file. Consider the following example:

```
apiVersion: v1
kind: Secret
metadata:
  name: wordpress-admin-password
data:
  key: CalksdlkeBgmxcv23kjsdlkjr==
---
apiVersion: v1
kind: Service
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  ports:
    - port: 80
  selector:
    app: wordpress
    tier: frontend
  type: LoadBalancer
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: wp-pv-claim
  labels:
    app: wordpress
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
    tier: mysql
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: mysql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: wordpress
        tier: mysql
    spec:
      containers:
        - image: mysql:5.6
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv003
spec:
  capacity:
    storage: 20Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
```

Changing configuration values across multiple YAML files can be tedious. For instance, if you need to update your Secret, you would modify the file:

```
apiVersion: v1
kind: Secret
metadata:
  name: wordpress-admin-password
data:
  key: CalksdIkeBgmxcv23kjsdljkr==
```

And then apply the change using:

```
$ kubectl apply -f wp-secret.yaml
```

Similarly, you would update and apply changes for each component:

- **Service:**

  ```
  apiVersion: v1
  kind: Service
  metadata:
    name: wordpress
    labels:
      app: wordpress
  spec:
    ports:
      - port: 80
    selector:
      app: wordpress
      tier: frontend
    type: LoadBalancer
  ```

  ```
  $ kubectl apply -f wp-svc.yaml
  ```

- **Deployment:**

  ```
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: wordpress-mysql
    labels:
      app: wordpress
      tier: mysql
  spec:
    strategy:
      type: Recreate
    template:
      metadata:
        labels:
          app: wordpress
          tier: mysql
      spec:
        containers:
        - image: mysql:5.6
  ```

  ```
  $ kubectl apply -f wp-deploy.yaml
  ```

- **Persistent Volume Claim:**

  ```
  apiVersion: v1
  kind: PersistentVolumeClaim
  metadata:
    name: wp-pv-claim
    labels:
      app: wordpress
  spec:
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 20Gi
  ```

  ```
  $ kubectl apply -f wp-pvc.yaml
  ```

- **Persistent Volume:**

  ```
  apiVersion: v1
  kind: PersistentVolume
  metadata:
    name: pv003
  spec:
    capacity:
      storage: 20Gi
    volumeMode: Filesystem
    accessModes:
      - ReadWriteOnce
  ```

Imagine needing to update the storage configuration from 20 GB to 2200 GB across every declaration. As your application evolves and components are upgraded, manually modifying each YAML file becomes error-prone and time-consuming. Moreover, uninstalling such an application requires tracking down and deleting each object individually.

Some users might consider consolidating all object definitions in a single YAML file. While this approach can simplify deletion, it may complicate troubleshooting, especially with larger and more complex configurations.

---

Enter Helm—a tool designed specifically to address these challenges. Helm is often referred to as the package manager for Kubernetes because it treats a collection of interrelated objects (like PV, Deployment, Secret, and Service) as one cohesive package.

![The image is a diagram illustrating a Helm deployment setup, featuring components like Service, Deployment, Secret, PVC, and PV, with a WordPress logo.](https://kodekloud.com/kk-media/image/upload/v1752878965/notes-assets/images/Helm-for-Beginners-What-is-Helm/helm-deployment-setup-diagram.jpg)

With Helm, you only need to specify the package (for example, your WordPress app package) and Helm will automatically identify and modify the necessary objects—no matter how many there are.

> [!important]
> **How Helm Works**
>
> Helm functions similarly to an installer for computer games. Just as an installer automatically places executables, graphics, audio, and configuration files in the correct locations, Helm streamlines the deployment of Kubernetes manifests with a single command.

For example, deploying your WordPress application becomes as simple as running:

```
$ helm install wordpress
```

One of Helm's key benefits is its support for easy customization. Instead of editing multiple YAML files, you use a single values file (commonly named values.yaml) to set configuration parameters such as persistent volume sizes, website names, and admin credentials:

```
wordpressUsername: user
# Application password
# Defaults to a random 10-character alphanumeric string if not set
# wordpressPassword:
# Admin email
wordpressEmail: user@example.com
# First name
# wordpressFirstName: FirstName
# Last name
# wordpressLastName: LastName
# Blog name
# wordpressBlogName: User's Blog!
```

Helm also simplifies application upgrades, rollbacks, and uninstallation. With just one command, Helm determines the necessary adjustments for an upgrade or rollback:

```
$ helm upgrade wordpress
$ helm rollback wordpress
```

Similarly, to uninstall your application and remove all associated objects, you use:

```
$ helm uninstall wordpress
```

---

In summary, Helm acts as both a package manager and a release manager for Kubernetes applications. It abstracts the management of individual objects, allowing you to deploy, upgrade, and uninstall your application as a single unit. This abstraction significantly reduces deployment complexity and minimizes human error when managing Kubernetes clusters.

For additional information, visit the [Helm Documentation](https://helm.sh/docs/) and the [Kubernetes Documentation](https://kubernetes.io/docs/).

This concludes our brief introduction to Helm. In the upcoming sections, we will dive deeper into Helm commands and explore advanced usage techniques. Happy Helming!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/15e220ca-1229-4779-81f0-3bc9f804aa6b/lesson/b13ab55d-4db6-4ea0-99fa-de8e6c600a88)**
>
> Watch video content
