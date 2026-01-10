# Sealed Secrets and its Components - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Introduction-to-Sealed-Secrets-in-Kubernetes/Sealed-Secrets-Fundamentals/Sealed-Secrets-and-its-Components)

---

## Table of Contents

- Sealed Secrets and its Components
  - Key Components
  - GitOps Workflow for Encrypted Secrets
  - Links and References
  - Watch Video

---

## Content

Introduction to Sealed Secrets in Kubernetes

Sealed Secrets Fundamentals

# Sealed Secrets and its Components

Sealed Secrets provides a secure, GitOps-friendly method for managing Kubernetes Secrets by encrypting them for safe storage in public repositories. With Sealed Secrets, you can commit encrypted manifests to GitHub without exposing sensitive data. Only your Kubernetes cluster—where the Sealed Secrets Operator is running—can decrypt these manifests back into native `Secret` objects.

## Key Components

| Component                    | Role                                 | Typical Usage                                                                 |
| ---------------------------- | ------------------------------------ | ----------------------------------------------------------------------------- |
| Sealed Secrets Operator      | Cluster-side controller              | Watches for `SealedSecret` CRs and converts them into standard `Secret`s      |
| kubeseal CLI                 | Local or CI command-line utility     | Encrypts plain `Secret` manifests into `SealedSecret` manifests               |
| SealedSecret Custom Resource | CRD defining encrypted secret schema | Lets the Operator recognize and decrypt your encrypted payloads automatically |

> [!important]
> **Prerequisites**
>
> - A running Kubernetes cluster (v1.13+).
> - The Sealed Secrets Operator installed:
>   `kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.23.0/controller.yaml`
> - Public key accessible for `kubeseal`:
>   `kubeseal --fetch-cert > public-cert.pem`> [!important]
>   **Secure Your Keys**
>
> Always back up the private key used by the Sealed Secrets controller. Losing it means you won’t be able to decrypt existing `SealedSecret` resources.

## GitOps Workflow for Encrypted Secrets

1.  **Define a Kubernetes Secret**  
    Create a plain `Secret` manifest (e.g., `db-credentials.yaml`).
2.  **Encrypt with kubeseal**

    ```
    kubeseal \
      --format=yaml \
      --cert=public-cert.pem \
      < db-credentials.yaml \
      > sealed-db-credentials.yaml
    ```

3.  **Commit to Git**  
    Push the `SealedSecret` manifest (`sealed-db-credentials.yaml`) to your repository.
4.  **Automatic Decryption**  
    The Sealed Secrets Operator detects the new `SealedSecret`, decrypts it, and generates a standard `Secret` for your pods to consume.

## Links and References

- [Sealed Secrets GitHub Repository](https://github.com/bitnami-labs/sealed-secrets)
- [Kubernetes Secrets Documentation](https://kubernetes.io/docs/concepts/configuration/secret/)
- [kubeseal CLI Usage](https://github.com/bitnami-labs/sealed-secrets#kubeseal)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/introduction-to-sealed-secrets-in-kubernetes/module/0f3ed562-f151-48f9-bb8c-8d3a4dbb4fc3/lesson/1c5a084a-038e-426c-9d6c-3fb04f1de2b5)**
>
> Watch video content
