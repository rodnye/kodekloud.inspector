# Hashicorp Vault - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-AdvancedAdmin/Hashicorp-Vault)

---

## Table of Contents

- Hashicorp Vault
  - Overview
  - Example Walkthrough
  - How It Works
  - Conclusion
  - Watch Video
    - Step 1: Enable the Key-Value Secrets Engine
    - Step 2: Write a Secret to Vault
    - Step 3: Prepare the Kubernetes Secret Manifest Template
    - Step 4: Download and Install the ArgoCD Vault Plugin
    - Step 5: Configure Vault Authentication
    - Step 6: Generate the Final Kubernetes Manifest

---

## Content

GitOps with ArgoCD

ArgoCD AdvancedAdmin

# Hashicorp Vault

In this article, we demonstrate how the ArgoCD Vault Plugin fetches secrets from HashiCorp Vault and injects them into Kubernetes resources. This guide explains how the plugin retrieves secrets from secret management systems—such as HashiCorp Vault, IBM Cloud Secrets Manager, and AWS Secrets Manager—and integrates them into your Kubernetes YAML manifests.

## Overview

The ArgoCD Vault Plugin is a custom extension for ArgoCD that securely retrieves secrets from external vaults and dynamically injects them into Kubernetes configurations. In our example, HashiCorp Vault is used to store secrets securely. The plugin then retrieves these secrets and replaces placeholders in the Kubernetes manifest with the actual secret values.

HashiCorp Vault controls access to sensitive data in public or hybrid environments using secret engines. In this guide, the key-value secrets engine is enabled to store and retrieve plain text secrets. Here, the `kvput` command writes a secret—specifically the `MYSQL-PASSWORD`—to a defined path in Vault.

> [!important]
> **Note**
>
> In Vault, sensitive values stored in plain text are referenced in Kubernetes manifests using the `stringData` field rather than `data`. The `stringData` field accepts plain text without requiring Base64 encoding.

## Example Walkthrough

Below is a comprehensive example that illustrates the necessary commands and configuration details.

### Step 1: Enable the Key-Value Secrets Engine

Enable the key-value secrets engine (version 2) at a specified path:

```
# Enable the key-value secrets engine at the specified path using version 2 (kv-v2)
$ vault secrets enable -path=crds kv-v2
Success! Enabled the kv secrets engine at: crds/
```

### Step 2: Write a Secret to Vault

Write the secret `MYSQL-PASSWORD` to Vault under the path `crds/mysql`:

```
# Write the secret 'MYSQL-PASSWORD' to the Vault at the path 'crds/mysql'
$ vault kv put crds/mysql MYSQL-PASSWORD=1234567
Key            Value
---            -----
created_time   2022-08-31T11:17:38.755927206Z
deletion_time  n/a
destroyed      false
version        1
```

### Step 3: Prepare the Kubernetes Secret Manifest Template

Review the Kubernetes secret manifest template, which includes an annotation that maps the Vault secret path to the placeholder in the manifest:

```
# Review the Kubernetes secret manifest template.
$ cat mysql-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysql-secret
  annotations:
    avp.kubernetes.io/path: "crds/data/mysql"
type: Opaque
stringData:
  _password: <MYSQL-PASSWORD>
```

### Step 4: Download and Install the ArgoCD Vault Plugin

Download the ArgoCD Vault Plugin binary, set the appropriate execute permissions, and move it to the local binary directory:

```
# Download the ArgoCD Vault Plugin binary, set execute permissions, and move it to /usr/local/bin
$ curl -Lo argocd-vault-plugin https://github.com/argoproj-labs/argocd-vault-plugin/releases/download/v1.10.0/argocd-vault-plugin_v1.10.0_linux_amd64
$ chmod +x argocd-vault-plugin && mv argocd-vault-plugin /usr/local/bin
```

### Step 5: Configure Vault Authentication

Create a file named `vault.env` that contains the Vault configuration details. This file includes the Vault address, authentication token, and plugin-specific configuration:

```
# Create a file 'vault.env' containing Vault configuration details.
$ cat vault.env
VAULT_ADDR=http://vault:8200
VAULT_TOKEN=s.aokHnABJZD3JhABJ73nIozm9wosK02wQ
AVP_TYPE=crds
AVP_AUTH_TYPE=token
```

### Step 6: Generate the Final Kubernetes Manifest

Generate the final Kubernetes manifest with the Vault secret injected by running the `generate` command. The plugin connects to Vault using the provided configuration, retrieves the secret, and replaces the `<MYSQL-PASSWORD>` placeholder in the manifest:

```
# Generate the final Kubernetes manifest with the Vault secret injected.
$ argocd-vault-plugin generate -c vault.env - < mysql-secret.yaml
```

> [!important]
> **Plugin Annotation Details**
>
> The annotation `avp.kubernetes.io/path: "crds/data/mysql"` in the manifest instructs the plugin to retrieve the secret key `MYSQL-PASSWORD` from the specified Vault path. Ensure your Vault configuration and paths match this specification.

## How It Works

1.  **Vault Secret Storage:** The key-value secrets engine in HashiCorp Vault stores the credentials.
2.  **Plugin Authentication:** The ArgoCD Vault Plugin uses the configuration provided in `vault.env` to connect and authenticate with Vault.
3.  **Manifest Rendering:** The plugin reads the secret from Vault and replaces the placeholder `<MYSQL-PASSWORD>` in the Kubernetes manifest template.
4.  **Deployment Integration:** The final manifest, with secrets properly injected, is ready for deployment on Kubernetes.

## Conclusion

This article has demonstrated how to integrate HashiCorp Vault with your Kubernetes deployments using the ArgoCD Vault Plugin. By following the steps above, you can securely manage and inject secrets, ensuring your Kubernetes resources remain up-to-date with the latest configurations fetched directly from Vault.

For more detailed information on Kubernetes deployments and secret management, visit the [Kubernetes Documentation](https://kubernetes.io/docs/) and the [HashiCorp Vault Documentation](https://www.vaultproject.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/ef6b6fef-0bd5-4fab-b437-b6d613fa74b4/lesson/7c262d2f-3939-45be-9dd5-c616e91bafea)**
>
> Watch video content
