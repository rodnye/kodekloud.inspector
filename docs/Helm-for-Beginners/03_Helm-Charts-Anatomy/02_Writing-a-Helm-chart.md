# Writing a Helm chart - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Helm-for-Beginners/Helm-Charts-Anatomy/Writing-a-Helm-chart)

---

## Table of Contents

- Writing a Helm chart
  - Creating a Simple "Hello World" Chart
  - Using Helm to Scaffold the Chart
  - Static vs. Templated Names
  - Exposing Configurable Values
  - Summary
  - Watch Video
    - Examining and Modifying Chart Metadata

---

## Content

Helm for Beginners

Helm Charts Anatomy

# Writing a Helm chart

In this guide, you'll learn how to build a simple Helm chart from scratch. We will demonstrate how Helm templates work to create unique and configurable Kubernetes resource names. Helm charts are extremely versatile—they not only automate the installation of Kubernetes packages but also perform additional tasks (like backing up a database before upgrades) much like installation wizards on traditional operating systems.

For example, consider an upgrade command such as:

```
$ helm upgrade wordpress-release bitnami/wordpress
```

While this may seem complex at first, we will begin with a basic example and progressively introduce more advanced concepts.

## Creating a Simple "Hello World" Chart

In this section, we will create a Helm chart for a simple "Hello World" application. The application will use an Nginx deployment with two replicas and expose the service through a NodePort.

Below are the Kubernetes manifest files for our Hello World application:

```
# Service definition for hello-world
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
# Deployment definition for hello-world
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-world
spec:
  replicas: 2
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
          image: nginx
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

Helm charts adhere to a specific directory structure that typically includes the `templates/` folder along with files such as `Chart.yaml`, `values.yaml`, `LICENSE`, and `README.md`.

## Using Helm to Scaffold the Chart

You do not need to manually create this structure. The Helm CLI can generate a skeleton chart for you:

```
$ helm create nginx-chart
$ ls nginx-chart
charts  Chart.yaml  templates  values.yaml
```

Now, you can replace or add your own Kubernetes manifest files (for example, the deployment and service files shown above) into the `templates/` directory. Initially, the generated `Chart.yaml` file contains default data based on the provided chart name.

### Examining and Modifying Chart Metadata

At this stage, you might want to update the `Chart.yaml` file to include more detailed metadata. For instance, if your company is developing this chart for internal use, you can update the file with a more descriptive summary and add maintainer contacts.

To open and edit the file:

```
$ cd nginx-chart
$ vi Chart.yaml
```

The original content may resemble this:

```
apiVersion: v2
name: nginx-chart
description: A Helm chart for Kubernetes
type: application
version: 0.1.0
appVersion: "1.16.0"
```

Modify it to add details and contact information:

```
apiVersion: v2
name: nginx-chart
description: Basic nginx website
type: application
version: 0.1.0
appVersion: "1.16.0"
maintainers:
  - name: john smith
    email: john@example.com
```

Once you have updated the metadata, remove any unnecessary sample template files from the `templates/` directory:

```
$ cd nginx-chart
$ ls templates
deployment.yaml  _helpers.tpl  hpa.yaml  ingress.yaml  NOTES.txt  serviceaccount.yaml  service.yaml  tests
```

For your simple application, add your custom deployment and service YAML files to this folder, and your chart will be ready for installation.

## Static vs. Templated Names

When you install a Helm chart, the objects in the templates are created exactly as defined. For example:

```
$ helm install hello-world-1 ./nginx-chart
$ kubectl get deployment
NAME          READY   UP-TO-DATE   AVAILABLE   AGE
hello-world   0/2     2            0           24s
```

Since the deployment name is hardcoded as `hello-world`, installing another release of the same chart leads to name conflicts:

```
$ helm install hello-world-2 ./nginx-chart
Error: rendered manifests contain a resource that
already exists. Unable to continue with install:
Deployment "hello-world" in namespace "default" exists
and cannot be imported into the current release:
invalid ownership metadata; annotation validation
error: key "meta.helm.sh/release-name" must equal "hello-world-2"; current value is "hello-world-1"
```

To avoid conflicts, leverage Helm's templating language to create dynamic names based on the release name. For instance, update your service and deployment definitions as follows:

```
# templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}-svc
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
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-nginx
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
          image: "{{ .Values.image }}"
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

Now, when you install the chart using different release names, Helm replaces the template directives (e.g., `{{ .Release.Name }}`) with your specified release name:

```
$ helm install hello-world-1 ./nginx-chart
$ helm install hello-world-2 ./nginx-chart
$ kubectl get deployment
NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
hello-world-1-nginx     1/2     2            1           8s
hello-world-2-nginx     0/2     2            0           4s
```

> [!important]
> **Tip**
>
> Basing resource names on the Helm release name ensures that multiple installations in the same namespace do not conflict.

## Exposing Configurable Values

Customization is key for production-ready charts. Often, you might want to configure deployment attributes—such as the number of replicas or the container image—to suit different environments. The `values.yaml` file serves this purpose by storing default configurations that your templates can reference.

Consider the following simple `values.yaml`:

```
# Default values for nginx-chart.
replicaCount: 2
image: nginx
```

Your deployment template then references these values:

```
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-nginx
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
          image: "{{ .Values.image }}"
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

This setup allows users to override default settings during installation, for example:

```
$ helm install hello-world-1 ./nginx-chart \
    --set replicaCount=3 \
    --set image=nginx
```

For more intricate configurations, you can structure the values file as a dictionary. For example, separate the image details:

```
# Default values for nginx-chart.
replicaCount: 2
image:
  repository: nginx
  pullPolicy: IfNotPresent
  tag: "1.16.0"
```

And update your deployment template accordingly:

```
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-nginx
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
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

This approach constructs the complete container image string dynamically and allows you to adjust the image pull policy as needed.

## Summary

When you install a Helm chart, Helm processes the templates in your `templates/` directory together with several sources of configuration:

• Release-specific details (such as release name, namespace, and revision)  
• Default values defined in `values.yaml`  
• Metadata from `Chart.yaml`  
• Information from your Kubernetes cluster

The resulting manifest files are then used by Kubernetes to deploy your resources. By designing templates with dynamic naming (using `{{ .Release.Name }}`) and configurable values (via `values.yaml`), you guarantee that each chart installation creates uniquely named objects and can be tailored easily by users.

Happy templating, and see you in the next lesson!

---

For more information on Helm, visit the [Helm Documentation](https://helm.sh/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/b90a4aa4-31b5-43d3-a7aa-383d48c50db0/lesson/2d967724-3d1e-49d6-bb1a-6e6528998cce)**
>
> Watch video content
