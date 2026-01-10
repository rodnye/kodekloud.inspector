# GKE shared responsibility model - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Managing-Security-Aspects/GKE-shared-responsibility-model)

---

## Table of Contents

- GKE shared responsibility model
  - Shared Responsibility Model Overview
  - Google Cloud Responsibilities
  - Customer Responsibilities
  - References
  - Watch Video
    - Control Plane Components Managed by Google
    - Cluster Lifecycle Management
    - Monitoring and Incident Response

---

## Content

GKE - Google Kubernetes Engine

Managing Security Aspects

# GKE shared responsibility model

Securing workloads on Google Kubernetes Engine (GKE) involves a multi-layered strategy that spans container images, runtimes, cluster networking, and API server access. Applying the principle of least privilege ensures users and applications receive only the permissions they need.

## Shared Responsibility Model Overview

![The image illustrates a shared responsibility model between Google and the user, detailing responsibilities such as Kubernetes distribution, node OS, and control plane for Google, and nodes and workloads for the user.](https://kodekloud.com/kk-media/image/upload/v1752875654/notes-assets/images/GKE-Google-Kubernetes-Engine-GKE-shared-responsibility-model/shared-responsibility-model-google-user.jpg)

This diagram highlights how Google secures the underlying infrastructure and control plane, while customers handle cluster configuration and workload security.

## Google Cloud Responsibilities

Google manages and hardens the infrastructure that underpins GKE clusters, including physical hardware, firmware, operating systems, storage, and networking. Core responsibilities include:

- Encrypting data at rest and in transit
- Designing custom hardware and enforcing physical security
- Preventing unauthorized modifications with Shielded Nodes
- Following a secure software development lifecycle

Google also hardens and patches:

- Node OS images (Container-Optimized OS and Ubuntu)
- Kubernetes node components and the GKE control plane
- Control plane VMs (single-tenant Compute Engine instances)

### Control Plane Components Managed by Google

| Component                     | Function                                        |
| ----------------------------- | ----------------------------------------------- |
| API Server                    | Validates and configures Kubernetes API objects |
| Scheduler                     | Assigns pods to nodes based on resource needs   |
| Controller Manager            | Enforces desired cluster state                  |
| Cluster Certificate Authority | Issues and rotates TLS certificates             |
| Secrets Encryption            | Encrypts Kubernetes Secrets at rest             |
| Audit Logging                 | Captures cluster activity for compliance        |

> [!important]
> **Note**
>
> Container Threat Detection is available through Security Command Center for real-time monitoring of container vulnerabilities.

![The image outlines Google's responsibilities, including protecting infrastructure, hardening and patching, threat detection, control plane management, Google Cloud integrations, and restricted administrative access.](https://kodekloud.com/kk-media/image/upload/v1752875655/notes-assets/images/GKE-Google-Kubernetes-Engine-GKE-shared-responsibility-model/google-responsibilities-infrastructure-security-outline.jpg)

## Customer Responsibilities

Customers must secure and manage everything they deploy in GKE:

- Application source code, build pipelines, and container images
- RBAC/IAM policies to control cluster access
- Container workloads (Pods, Deployments) and associated data
- Ensuring application availability, performance, and security

### Cluster Lifecycle Management

| Task             | Recommendation                                             |
| ---------------- | ---------------------------------------------------------- |
| Version upgrades | Enable auto-upgrade (default) or apply manual upgrades     |
| Patch management | Stay current with GKE release notes and security bulletins |
| Feature adoption | Test new features in non-production clusters               |

> [!important]
> **Warning**
>
> Running unsupported cluster versions exposes you to known vulnerabilities. Always upgrade to a supported GKE version.

### Monitoring and Incident Response

- Use the Security Posture Dashboard and [Cloud Operations suite](https://cloud.google.com/products/operations)
- Configure alerts for suspicious activity and resource anomalies
- Provide environmental details to Google Support when troubleshooting

![The image outlines customer responsibilities, including workload management, cluster management, monitoring and incident response, and providing environmental details.](https://kodekloud.com/kk-media/image/upload/v1752875657/notes-assets/images/GKE-Google-Kubernetes-Engine-GKE-shared-responsibility-model/customer-responsibilities-workload-management-diagram.jpg)

## References

- [GKE Security Best Practices](https://cloud.google.com/kubernetes-engine/docs/how-to/hardening-your-cluster)
- [Kubernetes Concepts Overview](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Google Cloud Operations](https://cloud.google.com/products/operations)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/225743c4-eb6e-4393-a51e-4ed7d41dbe51/lesson/8223bed0-537b-4f31-8b5f-1d84ed29f25f)**
>
> Watch video content
