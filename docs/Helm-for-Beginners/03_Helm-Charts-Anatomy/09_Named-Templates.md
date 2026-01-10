# Named Templates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Helm-for-Beginners/Helm-Charts-Anatomy/Named-Templates)

---

## Table of Contents

- Named Templates
  - Moving Common Labels to a Helper File
  - Applying Named Templates in Deployment Manifests
  - Final Example
  - Watch Video
    - Using the include Function for Proper Indentation

---

## Content

Helm for Beginners

Helm Charts Anatomy

# Named Templates

In this lesson, you'll learn how to use named templates to eliminate repetitive code in your Helm charts. When creating Kubernetes manifests, you might notice that labels or other blocks often repeat across multiple objects. For instance, consider the following YAML snippets for a Service and a Deployment where identical label definitions appear in several sections:

```
apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}-nginx
  labels:
    app.kubernetes.io/name: nginx
    app.kubernetes.io/instance: nginx
spec:
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
  name: {{ .Release.Name }}-nginx
  labels:
    app.kubernetes.io/name: nginx
    app.kubernetes.io/instance: nginx
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: nginx
      app.kubernetes.io/instance: nginx
  template:
    metadata:
      labels:
        app.kubernetes.io/name: nginx
        app.kubernetes.io/instance: nginx
    spec:
      containers:
        - name: nginx
          image: "nginx:1.16.0"
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

As your codebase expands, duplicating these definitions increases the risk of errors and inconsistencies during updates.

---

> [!important]
> **Tip**
>
> Keep your Helm charts DRY (Don't Repeat Yourself) by consolidating common code blocks in a helper file.

## Moving Common Labels to a Helper File

To address this redundancy, you can transfer the shared lines to a helper file (commonly named `_helpers.tpl`). The underscore in the filename tells Helm to ignore this file when generating Kubernetes manifests. For example, if you start with a Service template like this:

```
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}-nginx
  labels:
    # common labels will be included here
spec:
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http
  selector:
    app: hello-world
```

You can move the repeated labels into a named template using the `define` directive. In your `_helpers.tpl`, add:

```
{{- define "labels" }}
  app.kubernetes.io/name: {{ .Release.Name }}
  app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
```

Next, update your Service manifest to include the named template:

```
apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}-nginx
  labels:
    {{- template "labels" . }}
spec:
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http
  selector:
    app: hello-world
```

Notice that appending a dot (`.`) to the template call passes the current context into the helper file. Without it, the helper template wouldn’t have access to critical values like `.Release.Name`.

---

## Applying Named Templates in Deployment Manifests

The same approach works for Deployment manifests where the labels are used in multiple locations. Initially, you might attempt to reuse the helper template like this:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-nginx
  labels:
    {{- template "labels" . }}
spec:
  selector:
    matchLabels:
      {{- template "labels" . }}
  template:
    metadata:
      labels:
        {{- template "labels" . }}
    spec:
      containers:
      - name: nginx
        image: "nginx:1.16.0"
        imagePullPolicy: IfNotPresent
        ports:
        - name: http
          containerPort: 80
          protocol: TCP
```

However, this method may result in unexpected indentation issues. When the helper template is inserted, it must respect the surrounding indentation. Although the first instance might work correctly if the helper template is properly formatted, additional instances may not be aligned as expected.

### Using the include Function for Proper Indentation

To resolve the indentation problem, use the `include` function instead of `template`. The `include` function allows the output to be piped to other functions like `indent`. Ensure your helper template in `_helpers.tpl` is defined as follows:

```
{{- define "labels" }}
  app.kubernetes.io/name: {{ .Release.Name }}
  app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
```

Then, update the Deployment manifest to properly indent the inserted template output:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-nginx
  labels:
    {{- template "labels" . }}
spec:
  selector:
    matchLabels:
      {{- include "labels" . | indent 2 }}
  template:
    metadata:
      labels:
        {{- include "labels" . | indent 4 }}
    spec:
      containers:
        - name: nginx
          image: "nginx:1.16.0"
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

This practice ensures that the output from the named template “labels” remains correctly indented, preserving readability and consistency in your generated manifest.

---

## Final Example

Below is an example of the final output with actual values replacing the template directives:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: RELEASE-NAME-nginx
  labels:
    app.kubernetes.io/name: nginx-chart
    app.kubernetes.io/instance: nginx-release
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: nginx-chart
  template:
    metadata:
      labels:
        app.kubernetes.io/name: nginx-chart
        app.kubernetes.io/instance: nginx-release
    spec:
      containers:
        - name: nginx
          image: "nginx:1.16.0"
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

This approach of moving repetitive code into named templates and using functions like `include` with proper indentation not only enhances code maintainability but also minimizes the risk of errors and inconsistencies in your Helm charts.

---

For more details on managing Helm charts and Kubernetes manifests, visit the [Helm Documentation](https://helm.sh/docs/) and [Kubernetes Concepts](https://kubernetes.io/docs/concepts/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/b90a4aa4-31b5-43d3-a7aa-383d48c50db0/lesson/b447e6d2-1383-44da-b0fd-4f7bcdf2ed3a)**
>
> Watch video content
