# Environment Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Environment-Variables)

---

## Table of Contents

- Environment Variables
  - Why Use Environment Variables?
  - Prerequisites
  - 1. Direct Assignment with value
  - 2. Decoupling Config with valueFrom
  - 3. Comparison at a Glance
  - 4. References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Environment Variables

Kubernetes lets you inject configuration data into Pods via environment variables. This declarative approach mirrors Docker’s `-e` flag but offers tighter integration with Kubernetes primitives like ConfigMaps and Secrets.

## Why Use Environment Variables?

- Decouple configuration from container images
- Simplify application customization across environments
- Secure sensitive data using Secrets

## Prerequisites

- A running Kubernetes cluster
- `kubectl` configured against your cluster
- Basic knowledge of Pods and YAML manifests

---

## 1\. Direct Assignment with `value`

To set an environment variable directly in your Pod spec, use the `env` array under the container definition:

```
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp-color
spec:
  containers:
    - name: simple-webapp-color
      image: simple-webapp-color
      ports:
        - containerPort: 8080
      env:
        - name: APP_COLOR
          value: pink
```

This makes `APP_COLOR=pink` available inside the container.

> [!important]
> **Note**
>
> Direct assignment is ideal for non-sensitive, static configuration values.

You can replicate this behavior in Docker with:

```
docker run -e APP_COLOR=pink simple-webapp-color
```

---

## 2\. Decoupling Config with `valueFrom`

Rather than embedding values in your Pod spec, you can reference external sources:

```
env:
  # From a ConfigMap
  - name: APP_COLOR
    valueFrom:
      configMapKeyRef:
        name: my-configmap
        key: color.value


  # From a Secret
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: my-secret
        key: db.password
```

> [!important]
> **Warning**
>
> Secrets are only base64-encoded by default and not encrypted at rest. Use encryption providers or external secret stores for stronger security.

---

## 3\. Comparison at a Glance

| Configuration Source | Field                       | When to Use                                      |
| -------------------- | --------------------------- | ------------------------------------------------ |
| Direct               | `value`                     | Static, non-sensitive values                     |
| ConfigMap            | `valueFrom.configMapKeyRef` | Application settings shared across Pods          |
| Secret               | `valueFrom.secretKeyRef`    | Sensitive data (passwords, tokens, certificates) |

---

## 4\. References

- [Kubernetes: Assign Environment Variables to Containers](https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/)
- [Docker Environment Variables](https://docs.docker.com/engine/reference/run/#env-environment-variables)
- [ConfigMap Documentation](https://kubernetes.io/docs/concepts/configuration/configmap/)
- [Secrets Documentation](https://kubernetes.io/docs/concepts/configuration/secret/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/af5b907c-f817-4e5e-92a7-76f3644ffd57)**
>
> Watch video content
