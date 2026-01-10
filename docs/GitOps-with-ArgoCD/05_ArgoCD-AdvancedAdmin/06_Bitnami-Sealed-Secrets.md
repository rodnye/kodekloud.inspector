# Bitnami Sealed Secrets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-AdvancedAdmin/Bitnami-Sealed-Secrets)

---

## Table of Contents

- Bitnami Sealed Secrets
  - Creating a Kubernetes Secret
  - Overview of Available Solutions
  - How Bitnami Sealed Secrets Work
  - Deploying the Sealed Secrets Controller with ArgoCD
  - Encrypting the Secret with KubeSeal
  - Summary
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD AdvancedAdmin

# Bitnami Sealed Secrets

In this guide, we explore how Bitnami Sealed Secrets integrates with ArgoCD to securely manage Kubernetes secrets. Bitnami Sealed Secrets allows you to encrypt plain Kubernetes secrets so they can be safely stored in Git repositories—public or private—without exposing sensitive data. Only the Sealed Secrets controller running in your cluster can decrypt these secrets at runtime.

## Creating a Kubernetes Secret

Typically, you create a Kubernetes secret using the kubectl CLI command or by applying a YAML manifest. However, in line with GitOps best practices, all resources—including secrets—should be stored declaratively in Git. The challenge arises when storing Base64-encoded secrets in a repository.

For instance, you can create a Kubernetes secret from a literal value by running:

```
kubectl create secret generic mysql-password --from-literal=password=S1Ddh@rt# --dry-run=client -o yaml > mysql-password_k8s-secret.yaml
```

The command produces an output similar to this YAML manifest:

```
apiVersion: v1
kind: Secret
metadata:
  name: mysql-password
data:
  password: czFEZGhAcnQj
```

## Overview of Available Solutions

There are several tools for managing Kubernetes secrets securely:

- Bitnami Sealed Secrets
- HashiCorp Vault
- Kubernetes External Secrets

In this article, our focus remains on Bitnami Sealed Secrets.

## How Bitnami Sealed Secrets Work

The Sealed Secrets controller is deployed inside your Kubernetes cluster. It converts a plain Kubernetes secret into a sealed secret that is safe to store in any Git repository—even a public one. Only the controller can decrypt the sealed secret, ensuring that sensitive information stays protected.

The controller can be installed in various ways, including Kustomize, Helm Charts, or directly from source. In our example, we deploy and manage the Sealed Secrets controller using ArgoCD via a Helm Chart.

> [!important]
> **Note**
>
> Deploying the Sealed Secrets controller via ArgoCD is optional; you can also opt to use Helm directly.

Once the controller is running, the client-side tool KubeSeal encrypts your secret using asymmetric cryptography. KubeSeal automatically retrieves the public key from the running controller. If it cannot fetch the certificate automatically, you can manually specify it using the `-cert` flag. The certificate is typically stored in the Kubernetes secret created during the controller's installation.

## Deploying the Sealed Secrets Controller with ArgoCD

To deploy the Sealed Secrets controller with ArgoCD using a Helm Chart, run the following command:

```
argocd app create sealed-secrets \
  --repo https://bitnami-labs.github.io/sealed-secrets \
  --helm-chart sealed-secrets \
  --revision 2.2.0 \
  --dest-server https://1.2.3.4 \
  --dest-namespace kube-system
```

The output will confirm the creation of the application:

```
application 'sealed-secrets' created
```

## Encrypting the Secret with KubeSeal

After deploying the controller, install the KubeSeal CLI tool. The installation command downloads and installs KubeSeal into the `/usr/local/bin` directory:

```
wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.18.0/kubeseal-0.18.0-linux-amd64.tar.gz -O kubeseal && sudo install -m 755 kubeseal /usr/local/bin/kubeseal
```

With KubeSeal installed, you can encrypt your Kubernetes secret by executing:

```
kubeseal -o yaml --scope cluster-wide --cert sealedSecret.crt < mysql-password_k8s-secret.yaml > mysql-password_sealed-secret.yaml
```

After encryption, you will have two manifest files:

1.  The original Secret manifest (for reference):

    ```
    apiVersion: v1
    kind: Secret
    metadata:
      name: mysql-password
    data:
      password: czFEZGhAcnQj
    ```

2.  The SealedSecret manifest that can be stored safely in Git:

    ```
    apiVersion: bitnami.com/v1alpha1
    kind: SealedSecret
    metadata:
      name: mysql-password
    spec:
      encryptedData:
        password: AgBgdDGPdfg3nr7k3tA/Cg0bU2Q1dwT39ocVDs=
      annotations:
        sealedsecrets.bitnami.com/cluster-wide: "true"
    ```

When you apply the SealedSecret manifest to your cluster, the Sealed Secrets controller decrypts it and creates a regular Kubernetes Secret. Your pods then reference this secret as they would with any standard Kubernetes secret, with all encryption and decryption handled transparently.

## Summary

By leveraging Bitnami Sealed Secrets in combination with ArgoCD and KubeSeal, you ensure that your secrets remain encrypted and secure in Git repositories while maintaining adherence to GitOps principles. This approach protects your Kubernetes clusters by providing a robust and transparent method for managing secrets.

For further information and best practices, consider visiting these resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Bitnami Sealed Secrets GitHub Repository](https://github.com/bitnami-labs/sealed-secrets)

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/ef6b6fef-0bd5-4fab-b437-b6d613fa74b4/lesson/782c3648-a892-4de6-ad13-c40b96503fe3)**
>
> Watch video content
