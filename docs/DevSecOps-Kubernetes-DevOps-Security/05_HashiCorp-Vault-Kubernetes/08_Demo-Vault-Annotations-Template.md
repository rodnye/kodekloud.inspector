# Demo Vault Annotations Template - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/HashiCorp-Vault-Kubernetes/Demo-Vault-Annotations-Template)

---

## Table of Contents

- Demo Vault Annotations Template
  - Table of Contents
  - Prerequisites
  - Vault Annotation Overview
  - 1. Injecting the Full Secret Map
  - 2. Rendering a Single Field with Templates
  - 3. Injecting Multiple Secrets with Templates
  - Pod Initialization and Containers
  - Conclusion
  - References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

HashiCorp Vault Kubernetes

# Demo Vault Annotations Template

In this tutorial, we’ll explore how to use HashiCorp Vault annotations and templates to inject secrets into Kubernetes Pods via the [Vault Agent Injector](https://www.vaultproject.io/docs/platform/k8s/injector). Annotations control both the injection process and how the Vault Agent interacts with Vault.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Vault Annotation Overview](#vault-annotation-overview)
3.  [1\. Injecting the Full Secret Map](#1-injecting-the-full-secret-map)
4.  [2\. Rendering a Single Field with Templates](#2-rendering-a-single-field-with-templates)
5.  [3\. Injecting Multiple Secrets with Templates](#3-injecting-multiple-secrets-with-templates)
6.  [Pod Initialization and Containers](#pod-initialization-and-containers)
7.  [Conclusion](#conclusion)
8.  [References](#references)

---

## Prerequisites

- A running Kubernetes cluster (v1.16+).
- A Vault server with KV v2 secrets stored at `crds/data/mysql`.
- An existing `php` Deployment applied in your cluster.

> [!important]
> **KV v2 Path Notice**
>
> When using KV v2, remember that paths include `/data/` (e.g., `crds/data/mysql`).

---

## Vault Annotation Overview

Vault annotations fall into two main categories:

| Annotation Group      | Controls                                        |
| --------------------- | ----------------------------------------------- |
| **Agent annotations** | Secret retrieval, templating, injection toggles |
| **Vault annotations** | Connection settings (address, TLS, auth role)   |

Below is a quick reference for the five annotations used in this demo:

| Annotation                                         | Purpose                                                                       | Default / Values               |
| -------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------ |
| `vault.hashicorp.com/agent-inject`                 | Enable or disable injection                                                   | `"true"` / `"false"` (default) |
| `vault.hashicorp.com/agent-inject-status`          | Update existing secrets instead of fresh injection                            | `"update"`                     |
| `vault.hashicorp.com/agent-inject-secret-<name>`   | Define a secret path under a unique `<name>` (e.g., `username`)               | —                              |
| `vault.hashicorp.com/agent-inject-template-<name>` | Provide a template for rendering the `<name>` secret; must match the `<name>` | —                              |
| `vault.hashicorp.com/role`                         | Vault role used for agent authentication                                      | —                              |

---

## 1\. Injecting the Full Secret Map

By default, the Vault Agent Injector writes both the data and metadata of a KV secret into a single file.

1.  Create `patch-annotations.yaml`:

    ```
    spec:
      template:
        metadata:
          annotations:
            vault.hashicorp.com/agent-inject: "true"
            vault.hashicorp.com/agent-inject-secret-username: "crds/data/mysql"
            vault.hashicorp.com/role: "phpapp"
    ```

2.  Apply the patch:

    ```
    kubectl patch deploy php -p "$(cat patch-annotations.yaml)"
    ```

3.  Verify the injected content:

    ```
    POD=$(kubectl get po -l app=php -o jsonpath='{.items[0].metadata.name}')
    kubectl exec -it $POD -- cat /vault/secrets/username
    ```

    Output:

    ```
    data: map[password:12345 username:root]
    metadata: map[created_time:... deletion_time: destroyed:false version:1]
    ```

---

## 2\. Rendering a Single Field with Templates

To extract only a specific field (e.g., `username`), use a templating annotation.

1.  Create `patch-annotations-template.yaml`:

    ```
    spec:
      template:
        metadata:
          annotations:
            vault.hashicorp.com/agent-inject: "true"
            vault.hashicorp.com/agent-inject-status: "update"
            vault.hashicorp.com/agent-inject-secret-username: "crds/data/mysql"
            vault.hashicorp.com/agent-inject-template-username: |
              {{- with secret "crds/data/mysql" -}}
              {{ .Data.data.username }}
              {{- end }}
            vault.hashicorp.com/role: "phpapp"
    ```

2.  Apply the patch and wait for the new Pod:

    ```
    kubectl patch deploy php -p "$(cat patch-annotations-template.yaml)"
    ```

3.  Confirm the output:

    ```
    POD=$(kubectl get po -l app=php -o jsonpath='{.items[0].metadata.name}')
    kubectl exec -it $POD -- cat /vault/secrets/username
    ```

    Expected:

    ```
    root
    ```

---

## 3\. Injecting Multiple Secrets with Templates

You can inject several secrets into separate files by defining multiple `<name>` annotations.

1.  Create `patch-annotations-multi.yaml`:

    ```
    spec:
      template:
        metadata:
          annotations:
            vault.hashicorp.com/agent-inject: "true"
            vault.hashicorp.com/agent-inject-status: "update"
            vault.hashicorp.com/agent-inject-secret-username: "crds/data/mysql"
            vault.hashicorp.com/agent-inject-template-username: |
              {{- with secret "crds/data/mysql" -}}
                {{ .Data.data.username }}
              {{- end }}
            vault.hashicorp.com/agent-inject-secret-password: "crds/data/mysql"
            vault.hashicorp.com/agent-inject-template-password: |
              {{- with secret "crds/data/mysql" -}}
                {{ .Data.data.password }}
              {{- end }}
            vault.hashicorp.com/agent-inject-secret-apikey: "crds/data/mysql"
            vault.hashicorp.com/agent-inject-template-apikey: |
              {{- with secret "crds/data/mysql" -}}
                {{ .Data.data.apikey }}
              {{- end }}
            vault.hashicorp.com/role: "phpapp"
    ```

2.  Apply the patch:

    ```
    kubectl patch deploy php -p "$(cat patch-annotations-multi.yaml)"
    ```

3.  List the injected files:

    ```
    POD=$(kubectl get po -l app=php -o jsonpath='{.items[0].metadata.name}')
    kubectl exec -it $POD -- ls /vault/secrets
    ```

    Expected:

    ```
    username  password  apikey
    ```

4.  Verify each secret:

    ```
    kubectl exec -it $POD -- cat /vault/secrets/username  # root
    kubectl exec -it $POD -- cat /vault/secrets/password  # 12345
    kubectl exec -it $POD -- cat /vault/secrets/apikey    # Vbdj794HNUH8945tojr3
    ```

---

## Pod Initialization and Containers

After applying annotations, inspect the Pod:

```
kubectl describe pod <pod-name>
```

You’ll see three containers:

1.  **vault-agent-init** (initContainer)
2.  **vault-agent** (sidecar)
3.  **php** (your application)

These handle authentication, periodic secret renewal, and your app’s access to `/vault/secrets`.

---

## Conclusion

In this demo, you learned how to:

- Enable full secret map injection
- Render specific secret fields with templates
- Inject multiple secrets into separate files

Using Vault annotations and templates helps keep your Kubernetes workloads secure and your secrets management automated.

---

## References

- [Vault Agent Injector Documentation](https://www.vaultproject.io/docs/platform/k8s/injector)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
- [KV Secrets Engine Version 2](https://www.vaultproject.io/docs/secrets/kv/kv-v2)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/baf5859d-32c2-4e7c-9808-f3486d6b9827/lesson/a4ae16d5-e9a9-40ee-9a6b-c646c4b413dc)**
>
> Watch video content
