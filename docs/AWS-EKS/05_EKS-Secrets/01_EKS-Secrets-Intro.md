# EKS Secrets Intro - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/EKS-Secrets/EKS-Secrets-Intro)

---

## Table of Contents

- EKS Secrets Intro
  - What Are ConfigMaps and Secrets?
  - Secret vs. ConfigMap: Feature Comparison
  - How Pods Consume Secrets
  - Why a Secret Is Not Truly Encrypted
  - Restricting Access with Namespaces and RBAC
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

AWS EKS

EKS Secrets

# EKS Secrets Intro

In this guide, we’ll dive into Kubernetes Secrets—how they relate to ConfigMaps, why they’re only base64-encoded by default, and what challenges that introduces when protecting truly sensitive data.

## What Are ConfigMaps and Secrets?

A **ConfigMap** lets you inject non-sensitive configuration (files, environment variables, command-line arguments) into your pods. This decouples application images from their runtime settings, enabling updates without rebuilding containers.

A **Secret** follows nearly the same API as a ConfigMap but is designed for sensitive information such as passwords, tokens, and keys.

Here’s a quick visual comparison:

![The image shows icons representing a Kubernetes Secret and a Config Map, with labels and a checkmark on the left icon.](https://kodekloud.com/kk-media/image/upload/v1752862812/notes-assets/images/AWS-EKS-EKS-Secrets-Intro/kubernetes-secret-config-map-icons.jpg)

## Secret vs. ConfigMap: Feature Comparison

| Feature                 | ConfigMap                           | Secret                            |
| ----------------------- | ----------------------------------- | --------------------------------- |
| Data Type               | Plain text                          | Base64-encoded (by default)       |
| Use Case                | Application settings, feature flags | Credentials, tokens, certificates |
| Access Methods          | Env vars, volume mounts, API        | Env vars, volume mounts, API      |
| Default Data Protection | None                                | Obscured (not encrypted)          |
| Size Limit              | 1 MB per object                     | 1 MB per object                   |

> [!important]
> **Note**
>
> Storing configuration separately lets you update settings dynamically without rebuilding or redeploying your app.

## How Pods Consume Secrets

You can mount Secrets into your workloads via:

- **Environment variables**
- **Volume mounts**
- **Direct API calls**

This flexibility ensures your applications always read the latest values.

## Why a Secret Is Not Truly Encrypted

By default, Kubernetes stores Secret data in etcd after applying only base64 encoding. Base64 is an encoding mechanism, **not** encryption. Anyone with API read access can decode it back to plain text.

![The image is a diagram titled "Kubernetes Secret" showing a circle labeled "base 64" with the text "Base 64 Encoded Data" below it.](https://kodekloud.com/kk-media/image/upload/v1752862813/notes-assets/images/AWS-EKS-EKS-Secrets-Intro/kubernetes-secret-base64-encoded-diagram.jpg)

Key considerations:

- No encryption keys are used
- Data is merely obscured
- Read access to the API server lets users decode values

> [!important]
> **Warning**
>
> Relying solely on base64 encoding leaves your secrets exposed. Always implement encryption-at-rest and secure access controls.

> **Tip:** Base64 encoding also increases payload size, and Kubernetes enforces a 1 MB limit per Secret object.

## Restricting Access with Namespaces and RBAC

Even though base64 encoding isn’t encryption, you can limit who reads Secrets by leveraging namespaces and RBAC:

1.  **Dedicated Namespaces**  
    Organize applications and their Secrets into separate namespaces.
2.  **RBAC Policies**  
    Grant minimal permissions so service accounts or users in one namespace cannot access Secrets in another.

![The image illustrates a Kubernetes Secret setup with namespaces and RBAC (Role-Based Access Control), showing a user accessing secrets in two different namespaces.](https://kodekloud.com/kk-media/image/upload/v1752862814/notes-assets/images/AWS-EKS-EKS-Secrets-Intro/kubernetes-secret-setup-rbac-namespaces.jpg)

> [!important]
> **Note**
>
> Namespaces and RBAC scoping help restrict access, but they do **not** encrypt data at rest or in transit.

## Next Steps

In upcoming sections, we’ll explore advanced strategies to secure your Secret data:

- **Envelope Encryption** with Kubernetes [EncryptionConfiguration](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/)
- **Cloud KMS Integration** (AWS KMS, Google Cloud KMS)
- **External Secrets Operators** for automatic secret synchronization

## Links and References

- [Kubernetes Secrets Documentation](https://kubernetes.io/docs/concepts/configuration/secret/)
- [Kubernetes ConfigMap Documentation](https://kubernetes.io/docs/concepts/configuration/configmap/)
- [AWS EKS Best Practices](https://docs.aws.amazon.com/eks/latest/userguide/best-practices.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/547ca1cd-3ec7-4a75-8f07-e349ded2b54a/lesson/8ff80a52-7bc8-48b3-a84c-2a0783da0e1a)**
>
> Watch video content
