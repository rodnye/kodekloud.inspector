# Helm charts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Helm-Basics-2025-Updates/Helm-charts)

---

## Table of Contents

- Helm charts
  - Chart Metadata
  - Example: WordPress Chart
  - Helm Chart Directory Structure
  - Deploying a Chart from a Repository
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Helm Basics 2025 Updates

# Helm charts

In this lesson, we explore Helm Charts—a powerful tool for managing Kubernetes applications. Helm simplifies tasks such as installing, upgrading, rolling back, and uninstalling applications by automating the complex steps required to achieve the desired state.

Helm Charts act as comprehensive instruction manuals for your deployments. Each chart is a structured collection of files that define an application's configuration and behavior on Kubernetes. For example, the parameters in the values.yaml file enable operators to customize configurations without modifying the underlying templates.

> [!important]
> **Tip**
>
> Use Helm’s templating syntax (e.g., `{{ .Values.replicaCount }}`) in your manifests to keep configuration flexible and reusable. All dynamic values are defined in the values.yaml file.

Below is a simple example of Helm template files that create two Kubernetes objects—a Deployment and a Service. The Deployment manages a set of Pods based on a specified image, and the Service exposes these Pods as a NodePort service:

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
---
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

To install this chart, run the following command:

```
$ helm install hello-world
```

Notice that values like the image repository and replica count are not hardcoded. Instead, they utilize Helm’s templating syntax, which references configurations defined in the values.yaml file. This approach allows you to easily adjust parameters without directly editing the template files.

## Chart Metadata

Every Helm chart includes a Chart.yaml file that contains essential metadata, such as:

- **API Version:** For Helm 3, set to `v2` (Helm 2 charts use `v1` or omit this field).
- **App Version:** Indicates the version of the application deployed.
- **Chart Version:** Tracks the version of the chart itself, independent of the application version.
- **Name and Description:** Provide identification and a brief summary of the chart.
- **Type:** Specifies whether the chart is for an application (default) or is a library chart.
- **Dependencies:** Declare any external charts that the chart relies on.
- **Additional Fields:** Optional fields like keywords, maintainers, home, and icon help with discovery and branding.

Below is an example that combines Kubernetes manifest templates with chart metadata:

```
# Service and Deployment templates
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
---
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
---
# values.yaml snippet
replicaCount: 1
image:
  repository: nginx
---
# Chart.yaml snippet
apiVersion: v2
appVersion: "1.16.0"
name: hello-world
description: A web application
type: application
```

Again, the chart can be installed with:

```
$ helm install hello-world
```

## Example: WordPress Chart

For a more complex use case, consider a WordPress chart that depends on additional services like MariaDB. Below is an example of a Chart.yaml file for a WordPress deployment:

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

## Helm Chart Directory Structure

A typical Helm chart directory includes the following components:

- **templates/**: Contains all the manifest templates (e.g., Deployment, Service).
- **values.yaml**: Defines default configuration values.
- **Chart.yaml**: Holds metadata about the chart.
- **charts/**: Optionally includes dependent charts (e.g., the MariaDB chart for WordPress).
- Other optional files such as **LICENSE** or **README** for additional information.

## Deploying a Chart from a Repository

To deploy the WordPress chart from the Bitnami repository, execute the following commands:

```
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm install my-release bitnami/wordpress
```

You can verify your installation using similar commands:

```
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm install my-release bitnami/wordpress
```

This concludes our overview of Helm Charts. In the next lesson, we will delve deeper into chart templating techniques and explore advanced methods to customize your Kubernetes deployments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/10d7440b-907c-46da-ac5c-d833e7022375/lesson/d1dc40b6-5b6b-497f-950b-165ec4b803aa)**
>
> Watch video content
