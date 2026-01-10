# Helm charts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Helm-for-Beginners/Introduction-to-Helm/Helm-charts)

---

## Table of Contents

- Helm charts
  - Chart.yaml and Helm Chart Structure
  - Watch Video

---

## Content

Helm for Beginners

Introduction to Helm

# Helm charts

In this guide, we explore how Helm Charts simplify application deployment on Kubernetes. Helm is a powerful command-line tool that automates complex operations, such as installation, uninstallation, upgrades, and rollbacks. Rather than executing multiple manual steps, you instruct Helm to perform the desired action, and it takes care of all the necessary behind-the-scenes processes.

Helm achieves this automation using Charts. Charts are collections of files that define all the Kubernetes resources needed for an application. They include templated files (with a defined structure) that dynamically replace placeholders with values from a configuration file (typically `values.yaml`). For example, placeholders for image names or replica counts in Kubernetes manifests can be populated with user-defined values during deployment.

Below are examples of two templated Kubernetes objects—a Service and a Deployment—for a simple application:

```
apiVersion: v1
kind: Service
metadata:
  name: hello-world
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http
  selector:
    app: hello-world
```

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-world
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: hello-world
  template:
    metadata:
      labels:
        app: hello-world
    spec:
      containers:
        - name: hello-world
          image: "{{ .Values.image.repository }}"
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

When you run the command below, Helm processes the templates with your specified values and deploys the application:

```
$ helm install hello-world
```

## Chart.yaml and Helm Chart Structure

Every Helm Chart includes a `Chart.yaml` file that holds metadata about the chart. This metadata covers the chart API version, application version, chart version, name, description, and additional descriptive fields. For example, Helm 3 charts set the API version to `v2`, while Helm 2 charts use `v1`. This versioning ensures that Helm correctly interprets available features like `dependency` and `type`.

Below is an example of a `Chart.yaml` file for a WordPress Chart:

```
apiVersion: v2
appVersion: 5.8.1
version: 12.1.27
name: wordpress
description: Web publishing platform for building blogs and websites.
type: application
dependencies:
  - condition: mariadb.enabled
    name: mariadb
    repository: https://charts.bitnami.com/bitnami
    version: 9.x.x
keywords:
  - application
  - blog
  - wordpress
maintainers:
  - email: containers@bitnami.com
    name: Bitnami
home: https://github.com/bitnami/charts/tree/master/bitnami/wordpress
icon: https://bitnami.com/assets/stacks/wordpress/img/wordpress-stack-220x234.png
```

Key elements in the `Chart.yaml` include:

- **apiVersion:** Indicates the chart API version. Helm 3 charts use `v2` and Helm 2 charts use `v1`.
- **appVersion:** Specifies the version of the packaged application (e.g., WordPress version 5.8.1).
- **version:** Represents the chart version and helps track changes independently of the application version.
- **name, description, and type:** Define the chart's name (WordPress), provide a brief description, and indicate that it is an "application" type chart.
- **dependencies:** Lists any dependent charts. In this example, the WordPress chart depends on a MariaDB chart, managing its deployment separately.
- **keywords, maintainers, home, and icon:** Provide additional metadata useful for chart discovery and reference.

A typical Helm chart directory structure includes:

- A **templates** directory containing all templated resource manifests.
- A **values.yaml** file that defines configuration parameters.
- A **Chart.yaml** file holding chart metadata.
- Optionally, a **charts** directory for dependencies and files such as a README or license.

To install the WordPress chart from the Bitnami repository, run the following commands:

```
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm install my-release bitnami/wordpress
```

> [!important]
> **Note**
>
> Helm charts integrate templated manifests with customizable configurations, streamlining application deployment on Kubernetes. This eliminates many manual steps and ensures consistency across environments.

This setup demonstrates how Helm charts efficiently manage configurations and deployments on Kubernetes through a blend of templated resources and user-defined configurations. In subsequent lessons, we will delve deeper into chart templating, dependency management, and advanced customization options.

That’s all for now. See you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/15e220ca-1229-4779-81f0-3bc9f804aa6b/lesson/393844b9-2284-4ce9-8023-c6792a2a0efa)**
>
> Watch video content
