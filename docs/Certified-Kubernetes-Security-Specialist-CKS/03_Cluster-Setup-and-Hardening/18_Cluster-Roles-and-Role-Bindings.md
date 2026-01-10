# Cluster Roles and Role Bindings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/Cluster-Roles-and-Role-Bindings)

---

## Table of Contents

- Cluster Roles and Role Bindings
  - Kubernetes Resource Classification
  - Use Case: Granting Cluster-Wide Permissions
  - Defining a Cluster Role
  - Binding the Cluster Role to a User
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# Cluster Roles and Role Bindings

In previous lessons, we explored namespaced roles and role bindings. In this section, we focus on cluster roles and cluster role bindings. Unlike namespaced roles—which grant permissions within a specific namespace (or the default namespace when none is specified)—cluster roles are used to control access to cluster-scoped resources.

## Kubernetes Resource Classification

Kubernetes resources fall into two distinct groups:

1.  **Namespaced resources** (e.g., pods, replica sets, jobs, deployments, services, secrets)
2.  **Cluster-scoped resources** (e.g., nodes, persistent volumes, certificate signing requests, namespaces)

![The image illustrates Kubernetes resources categorized into "Namespaced" and "Cluster Scoped" groups, showing different components like pods, nodes, and roles.](https://kodekloud.com/kk-media/image/upload/v1752871348/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Cluster-Roles-and-Role-Bindings/frame_100.jpg)

To view a complete list of namespaced and non-namespaced resources, run the following commands:

```
kubectl api-resources --namespaced=true
kubectl api-resources --namespaced=false
```

> [!important]
> **Note**
>
> For namespaced resources, roles and role bindings are used. However, when you need to grant permissions for cluster-wide resources such as nodes or persistent volumes, you should use cluster roles and cluster role bindings.

## Use Case: Granting Cluster-Wide Permissions

Imagine you need to create a cluster role that allows a user to view, create, or delete nodes across the entire cluster. Similarly, you might need a storage administrator role to manage persistent volumes and persistent volume claims. The diagram below outlines a conceptual overview of these roles:

![The image outlines cluster roles: "Cluster Admin" can view, create, and delete nodes; "Storage Admin" can view, create PVs, and delete PVCs.](https://kodekloud.com/kk-media/image/upload/v1752871349/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Cluster-Roles-and-Role-Bindings/frame_170.jpg)

## Defining a Cluster Role

Below is an example YAML file that defines a cluster role. Save the file as `cluster-admin-role.yaml`:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cluster-administrator
rules:
- apiGroups: [""]
  resources: ["nodes"]
  verbs: ["list", "get", "create", "delete"]
```

## Binding the Cluster Role to a User

After creating the cluster role, you must create a cluster role binding to associate the user with this role. This binding grants the specified permissions across the cluster. Save the following configuration as `cluster-admin-role-binding.yaml`:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cluster-admin-role-binding
subjects:
- kind: User
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: cluster-administrator
  apiGroup: rbac.authorization.k8s.io
```

Apply these configurations using the following commands:

```
kubectl create -f cluster-admin-role.yaml
kubectl create -f cluster-admin-role-binding.yaml
```

> [!important]
> **Important Information**
>
> While cluster roles are primarily intended for cluster-scoped resources, they can also be used to grant permissions for namespaced resources. When applied in this context, the permissions extend across all namespaces, unlike a namespaced role that restricts access to a specific namespace.

Kubernetes automatically creates several default cluster roles during cluster setup. In practice tests, you may encounter these default roles in various configurations.

Happy studying and good luck with your Kubernetes journey!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/fb2c7589-78d5-4acc-bc16-6c54ef2e85d4)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/1fe8dad2-d540-4669-a0fc-4cb22f1b8abc)**
>
> Practice lab
