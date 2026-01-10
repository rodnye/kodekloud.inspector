# User Management RBAC ArgoCD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-AdvancedAdmin/User-Management-RBAC-ArgoCD)

---

## Table of Contents

- User Management RBAC ArgoCD
  - How RBAC Works in ArgoCD
  - Example: Creating a Custom "Create Cluster" Role
  - Example: Assigning a Project-Level Role
  - Conclusion
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD AdvancedAdmin

# User Management RBAC ArgoCD

In this lesson, we explore how ArgoCD implements Role-Based Access Control (RBAC) to manage access to its resources effectively. ArgoCD uses policies defined in CSV notation, which are applied either to individual users or to SSO groups. Keep in mind that RBAC permissions for applications may differ from those applied to other resource types.

## How RBAC Works in ArgoCD

At its core, an RBAC policy in ArgoCD consists of four components:

- **Role:** A set of permissions.
- **Resource:** The target resource such as clusters, certificates, applications, repositories, or logs.
- **Action:** The operation allowed (e.g., get, create, update, delete, synchronize, or override).
- **Project/Object:** For application objects, the resource path is expressed as the project name followed by a slash and the application name.

> [!important]
> **Note**
>
> Custom RBAC policies allow for granular control over who can perform specific actions, ensuring that only authorized users have access to sensitive resources.

## Example: Creating a Custom "Create Cluster" Role

The following example demonstrates how to configure a custom role named `createCluster` that allows a user to create clusters in ArgoCD. In this scenario, the role is granted to a user named `jai` by patching the ArgoCD RBAC config map with the appropriate policy.

```
$ kubectl -n argocd patch configmap argocd-rbac-cm \
--patch='{"data":{"policy.csv":"p, role:create-cluster, clusters, create, *, jai, role:create-cluster"}}'
configmap/argocd-rbac-cm patched
```

In this configuration, the `createCluster` role is assigned to the user `jai`, granting them the ability to create clusters. You can verify the permissions using the `argocd account can-i` command:

- Checking if `jai` can create clusters returns "yes".
- Attempting to delete a cluster returns "no" because the `createCluster` role does not include delete permissions.

## Example: Assigning a Project-Level Role

Roles can also be assigned at the project level. Consider a custom role named `kia-admins`, which grants unrestricted modification rights for any application within the `kia-project`. This role is granted to a user named `ali`. When `ali` attempts to synchronize applications within the `kia-project`, the system confirms the permissions with a "yes" response.

```
$ kubectl -n argocd patch configmap argocd-rbac-cm \
--patch='{"data":{"policy.csv":"p, role:create-cluster, clusters, create, *, jai, role:create-cluster"}}'
configmap/argocd-rbac-cm patched

$ argocd account can-i create clusters '*'
yes # Logged in as - jai

$ kubectl -n argocd patch configmap argocd-rbac-cm \
--patch='{"data":{"policy.csv":"p, role:kia-admins, applications, *, kia-project/*, allow, ali, role:kia-admins"}}'
configmap/argocd-rbac-cm patched

$ argocd account can-i delete clusters '*'
no # Logged in as - jai

$ argocd account can-i sync applications kia-project/*
yes # Logged in as - ali
```

> [!important]
> **Warning**
>
> Although user `ali` has been granted permissions within the `kia-project`, they are not authorized to synchronize applications in any other projects.

## Conclusion

This lesson provided an overview of how to configure RBAC in ArgoCD to ensure that only properly authorized users can perform specific actions on various resources. By carefully defining policies using CSV notation, you can efficiently manage access to clusters, applications, and other critical components in ArgoCD.

For more detailed information on RBAC in ArgoCD, please refer to the [ArgoCD Documentation](https://argo-cd.readthedocs.io/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/ef6b6fef-0bd5-4fab-b437-b6d613fa74b4/lesson/8addb490-9137-4be0-841d-727aeeae25e9)**
>
> Watch video content
