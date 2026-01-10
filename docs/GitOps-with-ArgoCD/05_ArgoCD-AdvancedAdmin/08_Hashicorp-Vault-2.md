# Hashicorp Vault 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-AdvancedAdmin/Hashicorp-Vault-2)

---

## Table of Contents

- Hashicorp Vault 2
  - Overview
  - Plugin Integration Approaches
  - Modifying the ArgoCD Repo Server
  - Registering the Plugin with ArgoCD
  - Configuring Vault Connectivity
  - Example: Verified Secret Data in Vault
  - Conclusion
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD AdvancedAdmin

# Hashicorp Vault 2

In this article, we detail how to integrate the ArgoCD Vault plugin with ArgoCD. This integration enables automatic retrieval of secrets directly from Vault, simplifying and securing the management of your Kubernetes secrets.

## Overview

This setup comprises a Git repository containing Kubernetes manifests, an ArgoCD instance, a Vault server, and a Kubernetes cluster. ArgoCD periodically pulls manifests from the Git repository. One such manifest is a secret template that includes an annotation for the Vault plugin along with a placeholder for the actual secret value. For example:

```
apiVersion: v1
kind: Secret
metadata:
  name: mysql-secret
  annotations:
    avp.kubernetes.io/path: "crds/data/mysql"
type: Opaque
stringData:
  password: <MYSQL-PASSWORD>
```

ArgoCD uses the annotation to trigger the Vault plugin. The plugin connects to Vault and automatically fetches the required secret, transforming the manifest with the live secret data for deployment.

## Plugin Integration Approaches

ArgoCD supports custom tooling via configuration management plugins. The Vault plugin can be integrated using two approaches:

1.  Direct Integration via ConfigMap  
    If the plugin is lightweight (requiring only a few lines), you can add its configuration directly to the ArgoCD ConfigMap. The repo server pod runs the plugin commands accordingly.
2.  Sidecar Integration  
    For more complex plugins that may clutter the ArgoCD ConfigMap, consider deploying the plugin as a sidecar container alongside the repo server.

In this guide, we demonstrate the ConfigMap-based approach.

## Modifying the ArgoCD Repo Server

To integrate the Vault plugin, start by modifying the ArgoCD repo server deployment:

1.  Define an empty directory volume to hold custom binaries.
2.  Use an init container to download the ArgoCD Vault plugin binary and move it to the custom tools directory. This binary is made available to the main container during runtime.

Below is a snippet that demonstrates these changes:

```
volumes:
  - name: custom-tools
    emptyDir: {}


initContainers:
  - name: download-tools
    image: alpine:3.8
    command: ["sh", "-c"]
    args:
      - wget -O argocd-vault-plugin https://github.com/.../argocd-vault-plugin/v1.10.1 && chmod +x argocd-vault-plugin && mv argocd-vault-plugin /custom-tools/
    volumeMounts:
      - mountPath: /custom-tools
        name: custom-tools
```

After downloading the plugin, mount it in the repo server container so it is accessible in the system PATH:

```
containers:
  - name: argocd-repo-server
    volumeMounts:
      - name: custom-tools
        mountPath: /usr/local/bin/argocd-vault-plugin
```

> [!important]
> **Tip**
>
> Ensure that the URL provided for the plugin binary is correct and that the binary version is compatible with your ArgoCD installation.

## Registering the Plugin with ArgoCD

Once the plugin binary is in place, register it with ArgoCD by updating the ConfigMap under the configuration management plugins section. After updating the ConfigMap, restart the ArgoCD repo server deployment. For instance:

```
data:
  configManagementPlugins: |
    - name: argocd-vault-plugin
      generate:
        command: ["argocd-vault-plugin"]
        args: ["generate", ".", "./"]
```

## Configuring Vault Connectivity

After registering the plugin, configure it to authenticate with your Vault server. You can choose between two common approaches:

1.  Create a dedicated Kubernetes secret containing Vault configurations and reference it from the repo server container.
2.  Embed the Vault configuration directly within each ArgoCD application’s manifest.

Both methods can be configured using the ArgoCD UI or CLI. Once the configuration is set, ArgoCD executes the plugin's generate command (with the specified arguments) to retrieve secrets from Vault and generate the final Kubernetes manifest for application deployment.

> [!important]
> **Security Note**
>
> Always ensure that Vault credentials and configurations are secured appropriately. It is recommended to use Kubernetes Secrets to store sensitive Vault information.

## Example: Verified Secret Data in Vault

After integrating and configuring the plugin, Vault stores the actual secret data. For example, a secret stored at the specified path may be retrieved as follows:

```
Read - crds/data/mysql
data: {
  "data": {
    "MYSQL-PASSWORD": "1234567"
  }
}
```

This example confirms that the Vault plugin is correctly fetching the MySQL password and making it available for Kubernetes deployments.

## Conclusion

Integrating the ArgoCD Vault plugin enhances the security and manageability of your Kubernetes secrets by dynamically fetching sensitive data from Vault. Following the steps above helps maintain consistency between Git repositories and live deployments, ensuring that secrets are always up-to-date and secure.

For further reading, consider exploring the following resources:

- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)
- [Hashicorp Vault Documentation](https://www.vaultproject.io/docs)
- [Kubernetes Official Documentation](https://kubernetes.io/docs/home/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/ef6b6fef-0bd5-4fab-b437-b6d613fa74b4/lesson/d5f4147d-f8f7-4069-84be-1decfa55525b)**
>
> Watch video content
