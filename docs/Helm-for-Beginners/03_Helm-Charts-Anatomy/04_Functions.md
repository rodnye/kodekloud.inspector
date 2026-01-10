# Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Helm-for-Beginners/Helm-Charts-Anatomy/Functions)

---

## Table of Contents

- Functions
  - Helm Functions Overview
  - Using the Default Function
  - Watch Video

---

## Content

Helm for Beginners

Helm Charts Anatomy

# Functions

In this lesson, we explore how functions work in Helm and how they can enhance your templating process. When you combine a template with values defined in a values.yaml file, Helm generates a valid manifest file. However, if a field in values.yaml is not set, the corresponding section in the manifest may be omitted. For example, consider the following template:

```
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
          image: {{ .Values.image.repository }}
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

And the corresponding values.yaml file:

```
replicaCount: 2
image:
  repository:
  pullPolicy: IfNotPresent
  tag: "1.16.0"
```

With these definitions, the generated manifest file will be:

```
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

> [!important]
> **Warning**
>
> If the repository name is not set in values.yaml, the rendered manifest will lack an image value, leading to pod startup failures.

To resolve this issue, the chart can define default values. If the user does not provide a value in values.yaml (or via the command line), Helm can fall back to a default specified using a function. In our example, we want the default image to be "nginx".

## Helm Functions Overview

Helm functions behave similarly to those in conventional programming languages: they process an input and return a transformed output. For instance, the `upper` function converts a string to uppercase, and the `trim` function removes surrounding whitespace. Consider these examples:

```
upper("helm")  ➞  "HELM"
trim(" helm ")  ➞  "helm"
```

Applied within Helm templates, the value of a parameter can be transformed on the fly. For example, the snippet:

```
{{ .Values.image.repository }}
```

renders as:

```
image: nginx
```

However, if you wrap the same value with the `upper` function:

```
{{ upper .Values.image.repository }}
```

the output becomes:

```
image: NGINX
```

Helm also provides other useful functions like `quote` (which surrounds a string with quotes) and `replace` (which substitutes characters within a string). Here are a few examples:

```
{{ upper .Values.image.repository }}
{{ quote .Values.image.repository }}
{{ replace "x" "y" .Values.image.repository }}
{{ shuffle .Values.image.repository }}
```

These string manipulation functions are just a subset of what Helm offers. Additional functions cover areas such as cryptography, date handling, dictionary operations, Kubernetes object management, networking, type conversion, regular expressions, and URL handling. For a complete list of supported functions, refer to the [official Helm documentation](https://helm.sh/docs/).

![The image shows a grid of colored boxes labeled with different programming and technology-related categories, such as "Cryptographic and Security," "Kubernetes," and "Type Conversion." It appears to be a function list from a coding or software development context.](https://kodekloud.com/kk-media/image/upload/v1752878955/notes-assets/images/Helm-for-Beginners-Functions/programming-categories-function-list.jpg)

## Using the Default Function

Revisiting the earlier issue of a missing image repository value: if the value is not supplied in values.yaml or via the command line, the rendered manifest will omit an image, potentially causing a pod to fail. To ensure that your deployment always includes a valid image, use the `default` function. By specifying a default value (enclosed in quotes to treat it as a string), Helm will use "nginx" if no repository value is provided.

Consider the updated template snippet:

```
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
        image: {{ default "nginx" .Values.image.repository }}
        ports:
        - name: http
          containerPort: 80
          protocol: TCP
```

The values.yaml file remains:

```
replicaCount: 2
image:
  repository: ""
  pullPolicy: IfNotPresent
  tag: "1.16.0"
```

With this configuration, if the image repository is not specified, Helm substitutes the default "nginx", resulting in the following manifest:

```
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

> [!important]
> **Note**
>
> Using the `default` function ensures that your deployments always have a valid image configuration, preventing potential pod failures due to missing settings.

That concludes our discussion on functions in Helm. In the next lesson, we will dive deeper into additional Helm templating features.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/b90a4aa4-31b5-43d3-a7aa-383d48c50db0/lesson/bc5b9ecd-38d7-4099-9f7b-13849b39d9f3)**
>
> Watch video content
