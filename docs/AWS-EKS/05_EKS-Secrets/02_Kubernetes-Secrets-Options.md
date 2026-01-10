# Kubernetes Secrets Options - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/EKS-Secrets/Kubernetes-Secrets-Options)

---

## Table of Contents

- Kubernetes Secrets Options
  - External Secret Store Backends
  - Secret Store CSI Driver
  - Multi-Backend Support
  - AWS CSI Driver for Secrets & Config
  - Syncing to Native Kubernetes Secrets
  - Automatic Rotation
  - Pod Identity and IRSA
  - Key Takeaways
  - Links and References
  - Watch Video

---

## Content

AWS EKS

EKS Secrets

# Kubernetes Secrets Options

Storing API keys, database credentials, and TLS certificates securely is critical in Kubernetes. By default, native Secrets are only Base64-encoded—not encrypted—which offers minimal protection. To achieve encryption at rest, automated rotation, fine-grained access control, and audit logging, leverage an external secret management solution.

## External Secret Store Backends

For full control over sensitive data, choose a dedicated secret store. Below is a comparison of popular backends:

| Provider                            | Use Case                             | Key Features                                     |
| ----------------------------------- | ------------------------------------ | ------------------------------------------------ |
| HashiCorp Vault                     | On-premises or self-managed clusters | Encryption, dynamic credentials, access policies |
| AWS Secrets Manager                 | EKS and AWS-hosted workloads         | Automatic rotation, versioning, audit trails     |
| AWS Systems Manager Parameter Store | Configuration & secrets              | Hierarchical params, secure strings              |

![The image shows three options for storing secrets: Hashicorp Vault, Secret Storage, and AWS Secret Store, each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752862815/notes-assets/images/AWS-EKS-Kubernetes-Secrets-Options/secrets-storage-options-hashicorp-aws.jpg)

Each of these solutions encrypts data at rest, enforces policies, rotates secrets automatically, and generates audit logs for compliance.

## Secret Store CSI Driver

The Secrets Store CSI driver lets you mount external secrets into pods without embedding SDKs:

- Fetches secrets from your chosen backend.
- Exposes them as files on a read-only volume.
- Optionally syncs them into native Kubernetes Secret objects.

> [!important]
> **Note**
>
> The CSI driver follows the Kubernetes [CSI specification](https://kubernetes-csi.github.io/docs/) to integrate external stores as volumes.

```
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: aws-secrets
spec:
  provider: aws
  parameters:
    objects: |
      - objectName: "prod/db-password"
        objectType: "secretsmanager"
```

![The image illustrates the integration of a Kubernetes cluster with an AWS Secret Store using a Container Storage Interface (CSI) driver. It shows the components of the Kubernetes cluster, including the control plane and data plane.](https://kodekloud.com/kk-media/image/upload/v1752862816/notes-assets/images/AWS-EKS-Kubernetes-Secrets-Options/kubernetes-aws-secret-store-csi-integration.jpg)

## Multi-Backend Support

The Secrets Store CSI driver is provider-agnostic. Supported backends include:

- AWS Secrets Manager
- AWS Systems Manager Parameter Store
- HashiCorp Vault
- Microsoft Azure Key Vault
- Google Cloud Secret Manager

![The image illustrates the integration of a Kubernetes cluster with external components like AWS Secret Store and HashiCorp Vault using a Container Storage Interface (CSI) driver. It shows the control and data planes of the Kubernetes cluster and their interaction with these external services.](https://kodekloud.com/kk-media/image/upload/v1752862817/notes-assets/images/AWS-EKS-Kubernetes-Secrets-Options/kubernetes-cluster-integration-aws-vault.jpg)

## AWS CSI Driver for Secrets & Config

AWS offers a dedicated CSI provider that mounts both Secrets Manager and Parameter Store entries as volumes—eliminating the need for ConfigMaps or Kubernetes Secrets:

- **Secrets Manager**: Encrypted, versioned secrets with rotation
- **Parameter Store**: Hierarchical configuration values and secure strings

![The image illustrates the integration of a Kubernetes cluster with a Container Storage Interface (CSI) driver, showing connections to Kubernetes Secret, AWS Secret Store, and Parameter Store.](https://kodekloud.com/kk-media/image/upload/v1752862817/notes-assets/images/AWS-EKS-Kubernetes-Secrets-Options/kubernetes-cluster-csi-integration-diagram.jpg)

## Syncing to Native Kubernetes Secrets

If your pods rely on in-cluster Secrets (e.g., for environment variables), enable “secret syncing”:

1.  CSI driver fetches from the external store
2.  Creates a temporary Kubernetes Secret
3.  Mounts or injects it into the pod
4.  Deletes the synced Secret on pod termination

```
apiVersion: v1
kind: Pod
metadata:
  name: db-client
spec:
  containers:
    - name: app
      image: myapp:latest
      env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: synced-db-password
              key: password
  volumes:
    - name: secrets-store
      csi:
        driver: secrets-store.csi.k8s.io
        readOnly: true
        volumeAttributes:
          secretProviderClass: aws-secrets
```

> [!important]
> **Warning**
>
> Synced Secrets are stored as standard Kubernetes Secrets. Ensure RBAC policies restrict access to these temporary Secrets.

![The image illustrates a "Secret Syncing" process involving a Kubernetes Pod on a Node, using a Container Storage Interface (CSI) Driver to sync secrets from a Kubernetes Secret and an AWS Secret Store.](https://kodekloud.com/kk-media/image/upload/v1752862818/notes-assets/images/AWS-EKS-Kubernetes-Secrets-Options/secret-syncing-kubernetes-pod-csi-driver.jpg)

## Automatic Rotation

Most external secret stores support credential rotation. Configure the CSI driver’s refresh interval or restart pods to pick up new versions automatically:

- Versioned secrets ensure rollbacks if issues arise.
- Rotation schedules can trigger updates without downtime.

![The image is a diagram illustrating the rotation of Kubernetes secrets using a Container Storage Interface (CSI) driver, integrating with an AWS Secret Store.](https://kodekloud.com/kk-media/image/upload/v1752862819/notes-assets/images/AWS-EKS-Kubernetes-Secrets-Options/kubernetes-secrets-rotation-csi-aws.jpg)

## Pod Identity and IRSA

Use Pod Identity or AWS IAM Roles for Service Accounts (IRSA) so that workloads assume an IAM role and fetch secrets without embedded credentials:

- Eliminates long-lived access keys in containers.
- Leverages cloud provider identity mechanisms.

## Key Takeaways

![The image provides three notes about managing secrets in Kubernetes: they are base64-encoded but not encrypted, stronger RBAC and namespace separation can enhance security, and using external tools is a more secure method.](https://kodekloud.com/kk-media/image/upload/v1752862820/notes-assets/images/AWS-EKS-Kubernetes-Secrets-Options/kubernetes-managing-secrets-notes.jpg)

1.  Kubernetes Secrets are Base64-encoded by default, not encrypted.
2.  Strengthen cluster security with RBAC and namespace isolation.
3.  The most robust solution uses an external secret store plus the CSI driver for encryption, rotation, and auditability.

## Links and References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [HashiCorp Vault](https://www.vaultproject.io/)
- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)
- [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/)
- [Secrets Store CSI Driver](https://secrets-store-csi-driver.sigs.k8s.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/547ca1cd-3ec7-4a75-8f07-e349ded2b54a/lesson/6f8b7401-6538-4ad5-81fa-83a7f091ad47)**
>
> Watch video content
