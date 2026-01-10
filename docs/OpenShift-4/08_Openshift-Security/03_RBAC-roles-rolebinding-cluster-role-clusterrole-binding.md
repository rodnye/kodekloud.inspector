# RBAC roles rolebinding cluster role clusterrole binding - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Openshift-Security/RBAC-roles-rolebinding-cluster-role-clusterrole-binding)

---

## Table of Contents

- RBAC roles rolebinding cluster role clusterrole binding
  - What is RBAC?
  - Namespace vs. Cluster Scope
  - Components of RBAC
  - Conclusion
  - Watch Video
    - 1. Roles
    - 2. Cluster Roles
    - 3. Role Bindings
    - 4. Cluster Role Bindings

---

## Content

OpenShift 4

Openshift Security

# RBAC roles rolebinding cluster role clusterrole binding

RBAC (Role-Based Access Control) is a core component of Kubernetes security. Properly configuring RBAC helps protect your service accounts, users, and Kubernetes resources (such as Deployments, Services, Ingresses, ConfigMaps, and Secrets) from unauthorized access.

Below, we break down the RBAC concepts and explain how they function to secure a Kubernetes cluster.

## What is RBAC?

RBAC provides a structured way to authorize access to resources. By assigning specific permissions to users, ServiceAccounts, or groups, RBAC ensures that only authorized entities can perform defined actions on resources. For example, you can allow a ServiceAccount to create Pods within a particular namespace (like the Sock Shop namespace) or let specific users fetch and create resources based on their roles.

RBAC can be defined at two levels:

- **Namespace Level:** Controls access within a single namespace.
- **Cluster Level:** Grants permissions across all namespaces.

![The image explains RBAC (Role-Based Access Control) as authorization to resources, featuring icons related to Kubernetes and options to create pods and deployments.](https://kodekloud.com/kk-media/image/upload/v1752882738/notes-assets/images/OpenShift-4-RBAC-roles-rolebinding-cluster-role-clusterrole-binding/rbac-kubernetes-access-control-diagram.jpg)

## Namespace vs. Cluster Scope

You can define RBAC roles to limit access either to specific namespaces or the entire cluster. A role created within a namespace confines its permissions to that namespace, whereas a cluster role provides access control across all namespaces.

![The image explains RBAC (Role-Based Access Control) with a focus on authorization, highlighting "Namespace Scope" and "Cluster Scope" as resources.](https://kodekloud.com/kk-media/image/upload/v1752882739/notes-assets/images/OpenShift-4-RBAC-roles-rolebinding-cluster-role-clusterrole-binding/rbac-authorization-namespace-cluster.jpg)

> [!important]
> **Security Warning**
>
> If RBAC is not configured correctly, your Kubernetes cluster and all its resources might be exposed to potential security breaches. Always implement RBAC with careful planning.

## Components of RBAC

RBAC in Kubernetes is built around four key components:

### 1\. Roles

Roles define the permitted actions for users, ServiceAccounts, or groups within a specific namespace. For example, one role may allow a user to create Pods in the Sock Shop namespace, while another role might restrict access to read-only permissions.

![The image explains roles, showing a user icon labeled "Role" with access options for "Create Pods" and "View Only."](https://kodekloud.com/kk-media/image/upload/v1752882740/notes-assets/images/OpenShift-4-RBAC-roles-rolebinding-cluster-role-clusterrole-binding/user-role-access-options-diagram.jpg)

It is important to distinguish between roles and cluster roles. A role limits permissions to a specific namespace, whereas a cluster role does not.

![The image explains the concept of "Roles" with a focus on access permissions, showing a user icon and options for viewing "All Pods" or "Pods in a Namespace."](https://kodekloud.com/kk-media/image/upload/v1752882742/notes-assets/images/OpenShift-4-RBAC-roles-rolebinding-cluster-role-clusterrole-binding/roles-access-permissions-diagram.jpg)

### 2\. Cluster Roles

A cluster role provides permissions that span the entire cluster. When you see the prefix "cluster" (as in "cluster role" or "cluster role binding"), it indicates that the permissions apply globally across all namespaces.

![The image explains "Cluster Role" within a "Cluster Scope," featuring icons of people and hexagons.](https://kodekloud.com/kk-media/image/upload/v1752882743/notes-assets/images/OpenShift-4-RBAC-roles-rolebinding-cluster-role-clusterrole-binding/cluster-role-cluster-scope-icons.jpg)

### 3\. Role Bindings

Role bindings attach a role to a user, ServiceAccount, or group within a specific namespace. This ensures that the defined permissions apply only to that namespace.

### 4\. Cluster Role Bindings

Cluster role bindings attach a cluster role to a user, ServiceAccount, or group at the cluster level, thereby extending the permissions across all namespaces.

In essence, role bindings narrow permissions to a namespace, while cluster role bindings grant the same permissions cluster-wide.

## Conclusion

By correctly configuring these RBAC components, you ensure that users and services have access only to the resources and operations they require. In the upcoming demonstration, we will walk through practical code examples to illustrate how to set up these RBAC policies effectively.

For more details on configuring Kubernetes security, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/413252bb-7455-41fa-86eb-e3e9370c8f08/lesson/28b0e6e3-c64d-4971-902a-8844d5b0e96b)**
>
> Watch video content
