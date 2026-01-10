# Authentication and authorization in GKE - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Managing-Security-Aspects/Authentication-and-authorization-in-GKE)

---

## Table of Contents

- Authentication and authorization in GKE
  - IAM vs. Kubernetes RBAC
  - Service Accounts in GKE
  - References
  - Watch Video
    - Google Cloud IAM
    - Kubernetes RBAC
    - 1. Kubernetes Service Accounts
    - 2. GCP IAM Service Accounts
    - 3. GKE Service Agents
    - Service Account Scope Comparison

---

## Content

GKE - Google Kubernetes Engine

Managing Security Aspects

# Authentication and authorization in GKE

Access control in Google Kubernetes Engine (GKE) is essential for securing clusters and managing who can perform which operations. In this guide, we’ll dive into the two primary access-control methods—Google Cloud IAM and Kubernetes RBAC—and explore the three types of service accounts used in GKE.

## IAM vs. Kubernetes RBAC

Choosing between GCP IAM and Kubernetes RBAC depends on your security requirements:

| Feature                | GCP IAM                                       | Kubernetes RBAC                              |
| ---------------------- | --------------------------------------------- | -------------------------------------------- |
| Scope                  | Project-level (all GKE clusters in a project) | Namespace or cluster-level                   |
| Permission Granularity | Broad, across multiple Google Cloud services  | Fine-grained, Kubernetes API objects & verbs |
| Principal Types        | Users, groups, service accounts               | Kubernetes users, groups, service accounts   |
| Best Use Case          | Cross-service roles (e.g., billing, logging)  | Cluster-specific permissions                 |

> [!important]
> **Note**
>
> Use GCP IAM for overarching control across Google Cloud, and Kubernetes RBAC when you need detailed, in-cluster permissions.

![The image is a comparison overview of Kubernetes RBAC and GCP IAM, detailing their features, scope, permissions, and principals. It highlights the differences in managing permissions for Kubernetes clusters and Google Cloud projects.](https://kodekloud.com/kk-media/image/upload/v1752875642/notes-assets/images/GKE-Google-Kubernetes-Engine-Authentication-and-authorization-in-GKE/kubernetes-rbac-gcp-iam-comparison.jpg)

### Google Cloud IAM

Google Cloud’s Identity and Access Management (IAM) lets you assign roles to users, groups, or service accounts at the project level. Each role is a collection of permissions that define what actions can be taken on GKE clusters and other GCP resources.

- **Scope**: Project-wide (all clusters in a project)
- **Example Role**: `roles/container.developer` (Kubernetes Engine Developer)
- **gcloud example**:

  ```
  gcloud projects add-iam-policy-binding my-project \
    --member="user:alice@example.com" \
    --role="roles/container.developer"
  ```

- **Best for**: Broad, cross-service management without per-object granularity

### Kubernetes RBAC

Kubernetes Role-Based Access Control (RBAC) is native to the Kubernetes API. It grants permissions on specific Kubernetes resources (pods, deployments, secrets, etc.) at the namespace or cluster level.

- **ClusterRole**: Permissions across the entire cluster
- **Role**: Permissions within a single namespace
- **RoleBinding / ClusterRoleBinding**: Attach Roles or ClusterRoles to subjects (users, groups, service accounts)

Example ClusterRoleBinding for read-only access:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: read-only-binding
subjects:
- kind: Group
  name: dev-team
roleRef:
  kind: ClusterRole
  name: view
  apiGroup: rbac.authorization.k8s.io
```

![The image provides an overview of Kubernetes RBAC and GCP IAM, with links to relevant documentation for each.](https://kodekloud.com/kk-media/image/upload/v1752875642/notes-assets/images/GKE-Google-Kubernetes-Engine-Authentication-and-authorization-in-GKE/kubernetes-rbac-gcp-iam-overview.jpg)

## Service Accounts in GKE

GKE supports three types of service accounts for workload authentication:

1.  Kubernetes Service Accounts
2.  GCP IAM Service Accounts
3.  GKE Service Agents

![The image illustrates three types of service accounts: Kubernetes Service Accounts, GCP IAM Service Accounts, and GKE Service Agents, with their respective icons.](https://kodekloud.com/kk-media/image/upload/v1752875644/notes-assets/images/GKE-Google-Kubernetes-Engine-Authentication-and-authorization-in-GKE/service-accounts-kubernetes-gcp-gke-icons.jpg)

### 1\. Kubernetes Service Accounts

Kubernetes Service Accounts are native to Kubernetes. They authenticate Pods to the Kubernetes API server or external services, enabling in-cluster workloads to manage Kubernetes objects.

- **Scope**: Single cluster
- **Use case**: Pod to API-server communication
- **Create example**:

  ```
  kubectl create serviceaccount my-app-sa --namespace=default
  ```

> [!important]
> **Note**
>
> Always assign the minimal set of permissions to a ServiceAccount via Role or ClusterRole.

![The image explains Kubernetes Service Accounts, highlighting their use in managing Kubernetes resources, in-cluster entities, API manipulation, and cluster scoping.](https://kodekloud.com/kk-media/image/upload/v1752875645/notes-assets/images/GKE-Google-Kubernetes-Engine-Authentication-and-authorization-in-GKE/kubernetes-service-accounts-management-diagram.jpg)

### 2\. GCP IAM Service Accounts

GCP IAM Service Accounts are global to a GCP project. They represent non-human identities for applications to call Google APIs and interact with Google Cloud services.

- **Scope**: Project-level
- **Use case**: Granting workloads access to GCP services (e.g., Cloud Storage, Pub/Sub)
- **Create example**:

  ```
  gcloud iam service-accounts create my-gcp-sa \
    --display-name="My GCP Service Account"
  ```

> [!important]
> **Note**
>
> Bind minimal roles (e.g., `roles/storage.objectViewer`) to limit service-account permissions.

![The image explains GCP IAM Service Accounts, highlighting their role in Google Cloud's IAM system, usage by applications on GCP, project scoping, and access control to GCP resources and services.](https://kodekloud.com/kk-media/image/upload/v1752875646/notes-assets/images/GKE-Google-Kubernetes-Engine-Authentication-and-authorization-in-GKE/gcp-iam-service-accounts-explained.jpg)

### 3\. GKE Service Agents

GKE Service Agents are managed by Google to perform cluster lifecycle operations—such as provisioning nodes, disks, and load balancers—on your behalf. When you enable the GKE API, Google automatically creates a service agent with the `roles/container.serviceAgent` role.

- **Managed by**: Google
- **Role**: `roles/container.serviceAgent`
- **Use case**: Cluster provisioning and infrastructure management

> [!important]
> **Warning**
>
> Do not delete the GKE Service Agent, as it’s required for cluster operations.

![The image explains Kubernetes and GKE Service Accounts, highlighting that they are managed by Google, used for managing cluster resources, have a specific domain, and perform cluster management actions.](https://kodekloud.com/kk-media/image/upload/v1752875648/notes-assets/images/GKE-Google-Kubernetes-Engine-Authentication-and-authorization-in-GKE/kubernetes-gke-service-accounts-explained.jpg)

### Service Account Scope Comparison

| Service Account Type       | Scope          | Primary Use                             |
| -------------------------- | -------------- | --------------------------------------- |
| Kubernetes Service Account | Cluster        | In-cluster workloads calling API server |
| GCP IAM Service Account    | Project        | Workloads using GCP APIs                |
| GKE Service Agent          | Managed by GKE | Cluster lifecycle management            |

![The image compares Kubernetes Service Accounts, scoped within a cluster, with GCP IAM Service Accounts, scoped within a project.](https://kodekloud.com/kk-media/image/upload/v1752875649/notes-assets/images/GKE-Google-Kubernetes-Engine-Authentication-and-authorization-in-GKE/kubernetes-service-accounts-gcp-iam-comparison.jpg)

## References

- [GKE RBAC Documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control)
- [GCP IAM Documentation](https://cloud.google.com/iam/docs)
- [Kubernetes RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [GKE Service Accounts](https://cloud.google.com/kubernetes-engine/docs/concepts/service-accounts)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/225743c4-eb6e-4393-a51e-4ed7d41dbe51/lesson/7d225a92-6c51-4ce2-8818-096dcab2e35d)**
>
> Watch video content
