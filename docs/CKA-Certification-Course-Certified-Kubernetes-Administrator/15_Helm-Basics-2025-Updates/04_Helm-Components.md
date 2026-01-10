# Helm Components - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Helm-Basics-2025-Updates/Helm-Components)

---

## Table of Contents

- Helm Components
  - Charts and Templating
  - Releases and Multiple Installations
  - Helm Repositories and Artifact Hub
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Helm Basics 2025 Updates

# Helm Components

In this article, we dive into the components of Helm, providing an in-depth look at its structure, concepts, and key elements essential for managing Kubernetes applications effectively.

Helm is primarily composed of a command-line tool installed locally, which you can use to install, upgrade, or roll back releases. Charts—collections of files containing instructions for creating Kubernetes objects—are used by Helm to deploy applications. When you deploy a chart to your Kubernetes cluster, Helm creates a release, representing a specific installation of the application. Each release may have multiple revisions, capturing changes like image upgrades, replica adjustments, or configuration updates.

Similar to how [Docker Hub](https://hub.docker.com) hosts container images or [Vagrant Cloud](https://www.vagrantup.com) provides boxes, public repositories host Helm charts. These repositories allow you to quickly download and deploy applications on your cluster.

> [!important]
> **Note**
>
> Helm stores metadata—including information about installed releases, used charts, and revision history—directly into your Kubernetes cluster as secrets. This ensures that metadata is persistent and accessible to all team members, facilitating seamless upgrades and maintenance operations.

![The image illustrates Helm components, showing the flow from an online chart repository to Helm CLI, and the management of releases and revisions with Kubernetes integration.](https://kodekloud.com/kk-media/image/upload/v1752869780/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Helm-Components/helm-components-chart-repository-diagram.jpg)

Helm maintains a comprehensive record of every action performed within the cluster, enabling precise tracking and management.

## Charts and Templating

Charts are collections of files that contain the instructions for creating Kubernetes objects, making them the backbone of Helm deployments. This article uses two application examples to illustrate various concepts:

1.  **HelloWorld Application**: A simple Nginx-based web server with a service for exposure.
2.  **WordPress Site**: A more complex application deployment.

The HelloWorld example demonstrates fundamental concepts effectively. In this example, two Kubernetes objects are deployed: a Deployment and a Service. Although similar to standard Kubernetes definitions, you'll notice that parameters like the image name and replica count are templated. These templated values are defined in a separate `values.yaml` file, which allows you to customize your deployment with minimal changes.

Below is an example of a simple HelloWorld chart:

```
# service.yaml
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
# deployment.yaml
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
        - name: nginx
          image: {{ .Values.image.repository }}
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

```
# values.yaml
replicaCount: 1
image:
  repository: nginx
```

Rather than building charts from scratch, you can download pre-built charts from public repositories. Customizing a deployment typically involves modifying the `values.yaml` file, which serves as the configuration for the Helm chart.

For more complex applications like WordPress, charts can include multiple files and advanced templating features. More detailed explorations of templating and chart structures will be discussed in future lessons. For now, grasping these simple examples will provide you with a solid foundation.

A more advanced templating snippet within a Deployment might look like this:

```
apiVersion: {{ include "common.capabilities.deployment.apiVersion" . }}
kind: Deployment
metadata:
  name: {{ include "common.names.fullname" . }}
  namespace: {{ .Release.Namespace | quote }}
  labels:
    {{- include "common.labels.standard" . | nindent 4 }}
  {{- if .Values.commonLabels }}
    {{- include "common.tplvalues.render" (dict "value" .Values.commonLabels "context" $) | nindent 4 }}
  {{- end }}
  {{- if .Values.commonAnnotations }}
  annotations:
    {{- include "common.tplvalues.render" (dict "value" .Values.commonAnnotations "context" $) | nindent 4 }}
  {{- end }}
spec:
  selector:
    matchLabels: {{- include "common.labels.matchLabels" . | nindent 6 }}
  {{- if .Values.updateStrategy }}
  strategy: {{- toYaml .Values.updateStrategy | nindent 4 }}
  {{- end }}
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
```

## Releases and Multiple Installations

When applying a chart to your cluster, Helm creates a release—a distinct instance of the application. This approach allows you to deploy multiple separate instances of the same chart with unique release names. For example, you can deploy two different WordPress sites using separate releases:

```
# helm install [release-name] [chart]
$ helm install my-site bitnami/wordpress


$ helm install my-SECOND-site bitnami/wordpress
```

Each release is tracked independently, even if they are based on the same chart. This functionality is particularly useful when maintaining different environments, such as having one release for a public-facing website and another for development purposes. Experimentation in the development release can then inform upgrades or changes to the production version.

## Helm Repositories and Artifact Hub

Beyond our basic examples, Helm charts are available for a wide range of applications—from Redis to Prometheus—across numerous public repositories. Providers such as Appscode, Community Operators, TrueCharts, and Bitnami host charts in their repositories, making it easy to deploy various applications.

Instead of visiting multiple repositories separately, you can use the centralized [Artifact Hub](https://artifacthub.io) to search for and manage charts. Artifact Hub currently features over 6,300 packages and highlights charts published by official developers with verified publisher badges for added trustworthiness.

![The image is a diagram showing Helm repositories connected to ArtifactHub.io, with nodes labeled Appscode, Community Operators, TrueCharts, and Bitnami.](https://kodekloud.com/kk-media/image/upload/v1752869781/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Helm-Components/helm-repositories-artifacthub-diagram.jpg)

Artifact Hub also provides a searchable interface to help you quickly find the charts you need:

![The image shows a webpage from ArtifactHUB displaying search results for Helm repositories, including "kube-prometheus-stack" and "ingress-nginx," with filters and options on the left.](https://kodekloud.com/kk-media/image/upload/v1752869782/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Helm-Components/artifacthub-helm-repositories-search.jpg)

> [!important]
> **Further Learning**
>
> In upcoming lessons, we will explore chart installation and customization in greater detail. Continue following our guide to deepen your knowledge of the practical applications of Helm in Kubernetes.

Happy Helm-ing, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/10d7440b-907c-46da-ac5c-d833e7022375/lesson/4017fa2b-b35c-49e3-9b73-eed0b452c8e3)**
>
> Watch video content
