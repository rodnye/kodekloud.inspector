# Control encryption of sensitive data on GKE - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Managing-Security-Aspects/Control-encryption-of-sensitive-data-on-GKE)

---

## Table of Contents

- Control encryption of sensitive data on GKE
  - Data States Overview
  - Encryption at Rest
  - Encryption in Transit
  - Encryption in Use
  - References
  - Watch Video
    - Enabling Confidential Nodes

---

## Content

GKE - Google Kubernetes Engine

Managing Security Aspects

# Control encryption of sensitive data on GKE

In this article, we explore the three states of application data—at rest, in transit, and in use—and detail how Google Kubernetes Engine (GKE) implements encryption mechanisms to protect customer data throughout its lifecycle.

![The image outlines the three states of data: Data at Rest, Data in Transit, and Data in Use, along with their descriptions and security considerations.](https://kodekloud.com/kk-media/image/upload/v1752875650/notes-assets/images/GKE-Google-Kubernetes-Engine-Control-encryption-of-sensitive-data-on-GKE/data-states-rest-transit-use-diagram.jpg)

## Data States Overview

| Data State      | Definition                                                            | Examples                               |
| --------------- | --------------------------------------------------------------------- | -------------------------------------- |
| Data at rest    | Stored on disks, SSDs, databases, or cloud storage, typically dormant | Persistent volumes, database backups   |
| Data in transit | Transmitted across networks using protocols like HTTP(S) or gRPC      | API calls, file transfers              |
| Data in use     | Actively processed in memory or cache by applications or OS processes | In-memory computations, data analytics |

GKE applies encryption by default across all three states to ensure confidentiality, integrity, and compliance.

## Encryption at Rest

Google Cloud automatically encrypts all customer data at rest using the Advanced Encryption Standard (AES-256). To meet compliance or key ownership requirements, you can use [Cloud Key Management Service (Cloud KMS)](https://cloud.google.com/kms):

- Create, rotate, and manage your own cryptographic keys.
- Implement envelope encryption for layered security.
- Audit and control key usage with IAM policies.

![The image illustrates Google Cloud's encryption process, highlighting encryption at rest and in transit using Cloud Key Management Service and Advanced Encryption Standard.](https://kodekloud.com/kk-media/image/upload/v1752875650/notes-assets/images/GKE-Google-Kubernetes-Engine-Control-encryption-of-sensitive-data-on-GKE/google-cloud-encryption-process-diagram.jpg)

> [!important]
> **Note**
>
> Customer-managed encryption keys (CMEK) let you maintain full control over key rotation, access policies, and audit logs.

## Encryption in Transit

All data exchanged between clients and Google Cloud services is protected by HTTPS (TLS). Key features include:

- TLS handshake powered by [BoringSSL](https://boringssl.googlesource.com/boringssl/).
- Default support for strong cipher suites and forward secrecy.
- Encryption for both user-facing traffic and internal API calls.

This ensures authenticity, integrity, and privacy for every request and response.

> [!important]
> **Warning**
>
> Ensure your clients and services support TLS 1.2 or higher to comply with Google’s security requirements.

## Encryption in Use

GKE’s **Confidential Nodes** leverage [Compute Engine Confidential VMs](https://cloud.google.com/compute/confidential-vm) to encrypt VM memory, protecting data during processing.

![The image illustrates the concept of GKE Confidential Nodes, highlighting encryption in use and data protection within Compute Engine Confidential VMs.](https://kodekloud.com/kk-media/image/upload/v1752875651/notes-assets/images/GKE-Google-Kubernetes-Engine-Control-encryption-of-sensitive-data-on-GKE/gke-confidential-nodes-encryption-illustration.jpg)

### Enabling Confidential Nodes

Confidential Nodes can be activated at:

1.  **Cluster level**
    - Enable during cluster creation to apply encryption-in-use across all node pools.
    - This setting is irreversible for existing and new pools.

2.  **Node pool level**
    - In clusters with Confidential Nodes enabled, toggle per node pool when creating or updating.
    - Only selected pools will enforce memory encryption.

![The image is a diagram titled "GKE Confidential Nodes," illustrating the concept of encryption in use at the cluster and node-pool levels. It features labeled sections with icons and plus signs, indicating different levels of configuration.](https://kodekloud.com/kk-media/image/upload/v1752875652/notes-assets/images/GKE-Google-Kubernetes-Engine-Control-encryption-of-sensitive-data-on-GKE/gke-confidential-nodes-encryption-diagram.jpg)

Confidential GKE nodes incur no additional fees beyond standard [Confidential VM pricing](https://cloud.google.com/compute/confidential-vm/pricing) and produce slightly more detailed startup logs. They are available in regions and zones supporting N2D or C2D machine types.

## References

- [Google Kubernetes Engine Documentation](https://cloud.google.com/kubernetes-engine/docs)
- [Cloud Key Management Service](https://cloud.google.com/kms/docs)
- [Compute Engine Confidential VMs](https://cloud.google.com/compute/docs/confidential-vm)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/225743c4-eb6e-4393-a51e-4ed7d41dbe51/lesson/e547cddc-e83d-46b1-bbaa-06d13306154d)**
>
> Watch video content
