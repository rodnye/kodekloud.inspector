# Helm Concept - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Helm-Fundamentals/Helm-Concept)

---

## Table of Contents

- Helm Concept
  - YAML Files for WordPress Components
  - Converting YAML to Helm Chart Templates
  - Helm Charts and the Artifact Hub
  - Installing Helm Charts
  - Additional Helm Commands
  - Conclusion
  - Watch Video
  - Practice Lab
    - Standard Deployment Configuration
    - Persistent Volume and Claim Configurations
    - Service and Secret Configurations
    - Searching from the Command Line

---

## Content

Certified Kubernetes Application Developer - CKAD

Helm Fundamentals

# Helm Concept

In this lesson, we explore Helm concepts by examining how Helm charts simplify the deployment of applications like WordPress on Kubernetes. First, we addressed the deployment challenges of a WordPress application. Now, we will demonstrate how Helm charts resolve these challenges by converting static YAML configuration files into parameterized templates.

## YAML Files for WordPress Components

Below are the YAML files that define the individual components of a WordPress application on Kubernetes:

- deployment.yaml
- secret.yaml
- svc.yaml
- pvc.yaml
- service.yaml

These files provide the necessary configurations for deploying WordPress. Note that some values—such as the WordPress version, disk size, or admin password—might need to be adjusted between different environments. For example, you might deploy a different WordPress version or customize the disk size depending on your requirements.

### Standard Deployment Configuration

The following code snippet is part of the standard deployment configuration (deployment.yaml):

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: frontend
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: wordpress
        tier: frontend
    spec:
      containers:
      - image: wordpress:4.8-apache
        name: wordpress
```

### Persistent Volume and Claim Configurations

A persistent volume configuration is provided in pv.yaml:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: wordpress-pv
spec:
  capacity:
    storage: 20Gi
  accessModes:
    - ReadWriteOnce
  gcePersistentDisk:
    pdName: wordpress-2
    fsType: ext4
```

The corresponding persistent volume claim (pvc.yaml) is defined as follows:

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

### Service and Secret Configurations

The service used to expose WordPress is configured in service.yaml:

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

The admin password for WordPress is managed by a secret (secret.yaml):

```
apiVersion: v1
kind: Secret
metadata:
  name: wordpress-admin-password
data:
  key: CahjWVUxSdzIZQzg0SERXhBQTVrQ1FzN2JE9PQ==
```

> [!important]
> **Customization with Templates**
>
> Because variables such as the admin password, image version, and disk size often vary by environment, the next step is to convert these static YAML files into reusable templates. Template variables, denoted by double curly braces (e.g., {{ .Values.image }}), fetch their corresponding values from a separate values.yaml file. This setup allows users to manage different deployment parameters by modifying only one file.

## Converting YAML to Helm Chart Templates

Below is an example of a Helm chart template where key values are injected from values.yaml:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: frontend
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: wordpress
        tier: frontend
    spec:
      containers:
      - image: {{ .Values.image }}
        name: wordpress
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: wordpress-pv
spec:
  capacity:
    storage: 20Gi
  accessModes:
    - ReadWriteOnce
  gcePersistentDisk:
    pdName: wordpress-2
    fsType: ext4
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
      storage: {{ .Values.storage }}
---
apiVersion: v1
kind: Secret
metadata:
  name: wordpress-admin-password
data:
  key: CjhWVUxSdZIzQg0SERXhBQTVQ1FZnJE2P9Q==
```

A Helm chart aggregates these templates along with the values.yaml file. In addition, it includes a Chart.yaml file that contains metadata about the chart, such as its name, version, description, keywords, and maintainer information. Below is an example of a Chart.yaml file:

```
apiVersion: v2
name: Wordpress
version: 9.0.3
description: Web publishing platform for building blogs and websites.
keywords:
  - wordpress
  - cms
  - blog
  - http
  - web
  - application
  - php
home: http://www.wordpress.com/
sources:
  - https://github.com/bitnami/bitnami-docker-wordpress
maintainers:
  - email: containers@bitnami.com
    name: Bitnami
```

## Helm Charts and the Artifact Hub

Helm charts simplify deploying applications like WordPress with a single package. You can also explore a wide range of existing charts available on the Artifact Hub at [artifacthub.io](https://artifacthub.io). The Artifact Hub is a central repository of Helm charts, hosting over 5700 charts at the time of this writing.

![The image shows the Artifact Hub website interface for finding, installing, and publishing Kubernetes packages, featuring a search bar and package statistics.](https://kodekloud.com/kk-media/image/upload/v1752871216/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Helm-Concept/frame_170.jpg)

You can search for a chart using either the Artifact Hub website or from the command line.

### Searching from the Command Line

To search the community-driven Artifact Hub via the command line, use the following command:

```
helm search hub wordpress
```

Example output:

```
https://hub.helm.sh/charts/kube-wordpress/wordpress...
https://hub.helm.sh/charts/groundhog2k/wordpress   0.1.0
https://hub.helm.sh/charts/bitnami-aks/wordpress    1.2.3
```

To search for charts in a specific repository, such as Bitnami, first add the repository:

```
helm repo add bitnami https://charts.bitnami.com/bitnami
```

Then, use this command to search:

```
helm search repo wordpress
```

Example output:

| NAME              | CHART VERSION | APP VERSION | DESCRIPTION                                        |
| ----------------- | ------------- | ----------- | -------------------------------------------------- |
| bitnami/wordpress | 12.1.14       | 5.8.1       | Web publishing platform for building blogs and ... |

## Installing Helm Charts

After identifying the desired chart, install it on your Kubernetes cluster using:

```
helm install [release-name] [chart-name]
```

For example, installing multiple independent releases of WordPress:

```
helm install release-1 bitnami/wordpress
helm install release-2 bitnami/wordpress
helm install release-3 bitnami/wordpress
```

Each installation (release) is independent, ensuring that you can manage multiple deployments of the same application.

## Additional Helm Commands

To manage your Helm releases, use the following commands:

- List installed releases:

  ```
  helm list
  NAME        NAMESPACE  REVISION  UPDATED                                   STATUS     CHART                   APP VERSION
  my-release  default    1         2021-05-30 09:52:38.33818569 -0400 EDT  deployed   wordpress-11.0.12       5.7.2
  ```

- Uninstall a release:

  ```
  helm uninstall my-release
  ```

- Pull (download) a chart without installing it: Use `helm pull` with the `--untar` option. This command downloads the chart as a tar archive and extracts its contents. You can then navigate into the chart directory to review or modify files (including values.yaml) before installation.

> [!important]
> **Pro Tip**
>
> Customize your chart configuration by editing the values.yaml file to fine-tune your deployments according to your environment's requirements.

## Conclusion

This lesson provided an in-depth overview of Helm concepts, demonstrating how to transform static YAML files into parameterized templates using a values.yaml file and Chart.yaml metadata. Helm charts package these files together, simplifying the deployment and management of applications on a Kubernetes cluster.

Experiment with Helm commands in your Kubernetes environment to further enhance your understanding. Stay tuned for more detailed insights into Helm and its advanced features.

For additional resources, check out:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/bc61a673-47c3-4bef-b7f5-12f85c65cbbb/lesson/a5451bdd-8dc1-4b42-964e-e32a998ee5a9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/bc61a673-47c3-4bef-b7f5-12f85c65cbbb/lesson/428149c4-b60c-4be7-aaa2-0b7b6636415d)**
>
> Practice lab
