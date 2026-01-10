# Bitnami Sealed Secrets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Secret-Management-Sign-Verification/Bitnami-Sealed-Secrets)

---

## Table of Contents

- Bitnami Sealed Secrets
  - 1. Declarative Secret Storage
  - 2. Secret Management Solutions
  - 3. What Are Bitnami Sealed Secrets?
  - 4. Installing the Sealed Secrets Controller with Flux
  - 5. Encrypting a Secret with kubeseal
  - 6. Example Manifests
  - 7. Applying the SealedSecret with Flux
  - 8. Summary
  - Links and References
  - Watch Video
    - Creating a Standard Secret
    - 6.1 Original Kubernetes Secret
    - 6.2 Resulting SealedSecret

---

## Content

GitOps with FluxCD

Secret Management Sign Verification

# Bitnami Sealed Secrets

In this guide, you’ll learn how to manage Kubernetes secrets securely using **Bitnami Sealed Secrets** in a GitOps workflow powered by [Flux](https://fluxcd.io/). By the end, you’ll have encrypted Secret manifests stored safely in Git and automatically decrypted in your cluster.

## 1\. Declarative Secret Storage

According to [GitOps](https://www.gitops.tech/) principles, _all_ Kubernetes resources—including secrets—should live as code in your Git repository.

### Creating a Standard Secret

```
kubectl create secret generic mysql-password \
  --from-literal=password=s1Dhd@rt# \
  --dry-run=client -o yaml > mysql_k8s-secret.yaml
```

```
apiVersion: v1
kind: Secret
metadata:
  name: mysql-password
data:
  password: czFEZhAcnQj
```

> [!important]
> **Warning**
>
> Base64 encoding is _not_ secure encryption. Never commit raw or Base64‐encoded secrets to Git.

## 2\. Secret Management Solutions

Compare popular tools for encrypting Kubernetes secrets in GitOps repositories:

| Tool                                | Description                                   | Repository                                             |
| ----------------------------------- | --------------------------------------------- | ------------------------------------------------------ |
| Bitnami Sealed Secrets              | Seal/unseal secrets with a controller and CLI | https://github.com/bitnami-labs/sealed-secrets         |
| HashiCorp Vault                     | Centralized secrets vault with dynamic creds  | https://www.vaultproject.io/                           |
| Mozilla SOPS                        | Encrypt YAML/JSON files                       | https://github.com/mozilla/sops                        |
| GoDaddy Kubernetes External Secrets | Fetch secrets from external providers         | https://github.com/godaddy/kubernetes-external-secrets |

In this article, we’ll focus on **Bitnami Sealed Secrets**.

## 3\. What Are Bitnami Sealed Secrets?

Bitnami Sealed Secrets provides:

- A **Kubernetes controller** that decrypts sealed secrets inside the cluster.
- A **kubeseal CLI** to encrypt Kubernetes Secret manifests to SealedSecret manifests.
- A safe-to-commit SealedSecret format (even on public repos) that only your controller can decrypt.

## 4\. Installing the Sealed Secrets Controller with Flux

Deploy the controller as a HelmRelease in Flux:

```
# 1. Add the Bitnami Sealed-Secrets Helm repository
flux create source helm sealed-secrets \
  --interval 1h \
  --url https://bitnami-labs.github.io/sealed-secrets


# 2. Create a HelmRelease for the controller
flux create helmrelease sealed-secrets-controller \
  --interval 1h \
  --release-name sealed-secrets-controller \
  --target-namespace kube-system \
  --source HelmRepository/sealed-secrets \
  --chart sealed-secrets \
  --chart-version ">=1.15.0-0" \
  --crds CreateReplace
```

Flux will pull the chart and install the Sealed Secrets controller into the `kube-system` namespace.

## 5\. Encrypting a Secret with kubeseal

Follow these steps to seal your plain Secret:

1.  **Generate the plain Secret manifest** (if not already done):

    ```
    kubectl create secret generic mysql-password \
      --from-literal=password=s1Ddh@rt* \
      --dry-run=client -o yaml > mysql_k8s-secret.yaml
    ```

2.  **Install the `kubeseal` client**:

    ```
    wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.18.0/kubeseal-0.18.0-linux-amd64.tar.gz
    tar -zxvf kubeseal-0.18.0-linux-amd64.tar.gz
    mv kubeseal /usr/local/bin/
    ```

3.  **Fetch the public certificate** from the controller:

    ```
    kubeseal \
      --fetch-cert \
      --controller-name sealed-secrets-controller \
      --controller-namespace kube-system \
      > sealed-secrets.crt
    ```

4.  **Seal the Secret**:

    ```
    kubeseal \
      --cert sealed-secrets.crt \
      --scope cluster-wide \
      -o yaml < mysql_k8s-secret.yaml \
      > mysql-password_sealedsecret.yaml
    ```

> [!important]
> **Note**
>
> The `--scope cluster-wide` flag allows decryption in any namespace. Omit or change the scope for namespace-restricted secrets.

## 6\. Example Manifests

### 6.1 Original Kubernetes Secret

```
apiVersion: v1
kind: Secret
metadata:
  name: mysql-password
type: Opaque
data:
  password: czFEZhAcnQj
```

### 6.2 Resulting SealedSecret

```
apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: mysql-password
  annotations:
    sealedsecrets.bitnami.com/cluster-wide: "true"
spec:
  encryptedData:
    password: AgBgdDPGdf3ngr7k3tA/Cg0B2UQd1wT390cVDs=
  template:
    metadata:
      name: mysql-password
      annotations:
        sealedsecrets.bitnami.com/cluster-wide: "true"
    data: {}
```

## 7\. Applying the SealedSecret with Flux

1.  Commit `mysql-password_sealedsecret.yaml` to your Git repo.
2.  Flux syncs and applies the SealedSecret resource.
3.  The Sealed Secrets controller in the cluster decrypts it and creates a standard Kubernetes Secret.
4.  Your workloads can reference the decrypted Secret just like any other.

## 8\. Summary

By integrating Bitnami Sealed Secrets with Flux, you get:

- **Encrypted Secret manifests** stored safely in Git.
- **Automated HelmRelease** deployment of the Sealed Secrets controller.
- **CLI-driven** encryption (`kubeseal`) and in-cluster decryption.
- A fully **GitOps-friendly** secret management workflow for Kubernetes.

---

## Links and References

- [Bitnami Sealed Secrets GitHub](https://github.com/bitnami-labs/sealed-secrets)
- [Flux CD Documentation](https://fluxcd.io/docs/)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
- [GitOps Principles](https://www.gitops.tech/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/c8ad2608-2804-4413-9041-5e8dc9126d53/lesson/2a2558ff-c80f-4e96-978e-c899854f1f55)**
>
> Watch video content
