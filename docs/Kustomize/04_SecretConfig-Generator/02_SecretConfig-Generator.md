# SecretConfig Generator - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/SecretConfig-Generator/SecretConfig-Generator)

---

## Table of Contents

- SecretConfig Generator
  - How Kustomize Generators Work
  - Automatic Rollouts on Configuration Change
  - Defining a ConfigMap Generator
  - Defining a Secret Generator
  - Generator Types Overview
  - References
  - Watch Video
  - Practice Lab
    - Using File Inputs for ConfigMaps

---

## Content

Kustomize

SecretConfig Generator

# SecretConfig Generator

In this tutorial, you’ll learn how to use Kustomize generators—both ConfigMap and Secret generators—to automatically trigger rollouts in Kubernetes when configuration changes. Kustomize appends a randomized suffix to generated resource names and updates all workload references at build time, ensuring seamless updates without manual `kubectl rollout` commands.

## How Kustomize Generators Work

When you define a generator in **Kustomize**, it outputs a standard Kubernetes resource—either a `ConfigMap` or a `Secret`—with a unique suffix added to the name. This suffix guarantees that any change in generator inputs produces a new resource, prompting Kubernetes to detect updates and redeploy your workloads.

Example: Generating a `ConfigMap` named `db-cred` with a literal key-value pair:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: db-cred-jj26gh
data:
  password: "password1"
```

Kustomize ensures uniqueness by appending `-jj26gh` to the base name.

Your Deployment or Pod spec references the generator by its base name (`db-cred`), and Kustomize will rewrite it to include the full suffix:

```
env:
- name: DB_PASSWORD
  valueFrom:
    configMapKeyRef:
      name: db-cred
      key: password
```

At build time, this becomes:

```
env:
- name: DB_PASSWORD
  valueFrom:
    configMapKeyRef:
      name: db-cred-jj26gh
      key: password
```

## Automatic Rollouts on Configuration Change

When you update the generator inputs—for instance, changing `password1` to `password2`—Kustomize generates a new `ConfigMap` (e.g., `db-cred-a477b`) and updates your Deployment spec accordingly:

```
# Old ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: db-cred-jj26gh
data:
  password: "password1"


# New ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: db-cred-a477b
data:
  password: "password2"
```

```
# Before build
env:
- name: DB_PASSWORD
  valueFrom:
    configMapKeyRef:
      name: db-cred-jj26gh
      key: password


# After build
env:
- name: DB_PASSWORD
  valueFrom:
    configMapKeyRef:
      name: db-cred-a477b
      key: password
```

Since the ConfigMap name changes, Kubernetes treats the Deployment as updated and automatically initiates a rollout—no extra CLI steps required.

## Defining a ConfigMap Generator

Add a `configMapGenerator` section to your `kustomization.yaml`. Specify the generator `name` and key-value pairs under `literals`:

```
configMapGenerator:
- name: db-cred
  literals:
    - password=password1
```

Running `kustomize build` produces:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: db-cred-jj26gh
data:
  password: "password1"
```

### Using File Inputs for ConfigMaps

You can load entire files instead of literals. Kustomize uses the filename as the data key:

```
configMapGenerator:
- name: nginx-config
  files:
    - nginx.conf
```

Contents of `nginx.conf`:

```
server {
    listen 80;
    server_name example.com;
    location / {
    }
}
```

Generated resource:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config-jj26gh
data:
  nginx.conf: |
    server {
        listen 80;
        server_name example.com;
        location / {
        }
    }
```

> [!important]
> **Note**
>
> Using files allows you to keep complex configurations version-controlled and modular.

## Defining a Secret Generator

Secrets follow the same pattern as ConfigMaps. Replace `configMapGenerator` with `secretGenerator`:

```
secretGenerator:
- name: db-cred
  literals:
    - password=password1
```

Generated Secret:

```
apiVersion: v1
kind: Secret
metadata:
  name: db-cred-dd6525th4g
type: Opaque
data:
  password: cGFzc3dvcmlQ
```

File-based secrets are also supported:

```
secretGenerator:
- name: nginx-secret
  files:
    - nginx-conf
```

> [!important]
> **Warning**
>
> Avoid committing sensitive information in plaintext to source control. Use sealed secrets or external secret management services for production workloads.

## Generator Types Overview

| Generator Type | Use Case                        | Kustomization Key  |
| -------------- | ------------------------------- | ------------------ |
| ConfigMap      | Non-sensitive configuration     | configMapGenerator |
| Secret         | Sensitive data (base64-encoded) | secretGenerator    |

## References

- [Kubernetes ConfigMap Documentation](https://kubernetes.io/docs/concepts/configuration/configmap/)
- [Kubernetes Secret Documentation](https://kubernetes.io/docs/concepts/configuration/secret/)
- [Kustomize Generators](https://kubectl.docs.kubernetes.io/references/kustomize/generators/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/51823d3e-7be4-4792-836a-2c4690c0c547/lesson/4d922c66-e6da-4764-ba66-f5461ef566a3)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kustomize/module/51823d3e-7be4-4792-836a-2c4690c0c547/lesson/49973abe-d000-44cc-90ad-5802d6dedf73)**
>
> Practice lab
