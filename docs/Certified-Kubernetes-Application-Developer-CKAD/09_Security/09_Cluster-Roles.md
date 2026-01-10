# Cluster Roles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Security/Cluster-Roles)

---

## Table of Contents

- Cluster Roles
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Application Developer - CKAD

Security

# Cluster Roles

In earlier sections, we discussed namespaced resources and how roles and role bindings work within a specific namespace. By default, if you don't explicitly specify a namespace, these resources are created in the default namespace. Namespaced resources include pods, replica sets, deployments, services, secrets, and more. In contrast, some Kubernetes objects such as nodes, persistent volumes, certificate signing requests, and namespaces are classified as cluster-scoped resources, meaning they exist across the entire cluster rather than within a single namespace.

![The image illustrates Kubernetes resources categorized into "Namespaced" and "Cluster Scoped" groups, showing different components like pods, nodes, and roles.](https://kodekloud.com/kk-media/image/upload/v1752871285/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Cluster-Roles/frame_100.jpg)

To inspect the full list of available resources, you can run the following commands in your terminal:

```
kubectl api-resources --namespaced=true
```

```
kubectl api-resources --namespaced=false
```

When managing access for namespaced resources, roles and role bindings are typically sufficient. However, for cluster-scoped resources such as nodes or persistent volumes, you need to configure cluster roles and cluster role bindings. For example, a cluster role can be created for a cluster administrator to view, create, or delete nodes, while a storage administrator might require a cluster role to manage persistent volumes and persistent volume claims.

![The image outlines cluster roles: "Cluster Admin" can view, create, and delete nodes; "Storage Admin" can view, create PVs, and delete PVCs.](https://kodekloud.com/kk-media/image/upload/v1752871286/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Cluster-Roles/frame_170.jpg)

To define a cluster role, create a ClusterRole definition file that specifies the rules for the resources you wish to manage. Consider the following example, which grants permissions for managing nodes:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cluster-administrator
rules:
- apiGroups: [""]
  resources: ["nodes"]
  verbs: ["list", "get", "create", "delete"]
---
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

This YAML file first defines the cluster role "cluster-administrator" with specific permissions for nodes. It then creates a ClusterRoleBinding that ties this role to the "cluster-admin" user. To apply these configurations to your cluster, run:

```
kubectl create -f <filename>.yaml
```

> [!important]
> **Important Note**
>
> While cluster roles and bindings are mainly intended for cluster-scoped resources, they can also be used for namespaced resources. When a cluster role is applied to namespaced resources, the permissions are effective across all namespaces, unlike a namespaced role which restricts access to a specific namespace.

![The image illustrates Kubernetes cluster roles, differentiating between namespaced resources (e.g., pods, services) and cluster-scoped resources (e.g., nodes, clusterroles).](https://kodekloud.com/kk-media/image/upload/v1752871287/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Cluster-Roles/frame_240.jpg)

Kubernetes automatically generates several cluster roles during the cluster setup. In subsequent sections, we will dive deeper into these default roles and how you can leverage them.

Good luck with your lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/b907b5b2-e989-4936-8901-ba90b32e7bb0)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/0bc4b170-de06-4a3e-9dd2-4ffc4b58d069)**
>
> Practice lab
