# Cluster Roles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Container-Orchestration-Security/Cluster-Roles)

---

## Table of Contents

- Cluster Roles
  - Namespaced vs Cluster-Scoped Resources
  - Managing Cluster Roles
  - Default Cluster Roles
  - Watch Video
    - Example: Cluster Administrator Role
    - Example: Cluster Role Binding

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Container Orchestration Security

# Cluster Roles

Kubernetes roles and their bindings are typically namespaced. If you create them without specifying a namespace, they default to the "default" namespace—limiting access to resources only within that namespace. In contrast, certain resources, such as nodes and persistent volumes, are cluster-scoped and cannot be confined to any specific namespace.

![The image illustrates Kubernetes resources categorized as "Namespaced" and "Cluster Scoped," showing different components under each category.](https://kodekloud.com/kk-media/image/upload/v1752880592/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Cluster-Roles/frame_100.jpg)

## Namespaced vs Cluster-Scoped Resources

For cluster-scoped resources, you do not specify a namespace when creating them. Common examples include:

- Nodes
- Persistent Volumes
- Certificate Signing Requests
- Namespace objects

To determine which resources are namespaced and which are cluster-scoped, execute the following commands:

```
kubectl api-resources --namespaced=true
kubectl api-resources --namespaced=false
```

> [!important]
> **Note**
>
> While roles and role bindings were originally used to manage namespaced resources, Kubernetes provides cluster roles and cluster role bindings to control access to cluster-scoped resources.

## Managing Cluster Roles

Cluster roles operate similarly to regular roles but are intended for cluster-scoped resources. For example, you might define a cluster administrator role that grants permissions to view, create, or delete nodes, or a storage administrator role that oversees persistent volumes and claims.

### Example: Cluster Administrator Role

Below is an example YAML definition for a cluster administrator role:

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

After creating the cluster role, you can link a user or group to it using a ClusterRoleBinding. This binding associates the defined permissions with the specified user or group.

### Example: Cluster Role Binding

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

In this binding example, the `subjects` section specifies the user (in this case, `cluster-admin`), while the `roleRef` section links to the previously defined `cluster-administrator` role. To create the role binding, you would typically use a `kubectl create` command.

> [!important]
> **Important**
>
> While cluster roles and bindings are mainly used to manage cluster-scoped resources, they can also be applied to namespace-scoped resources. When used in this way, the assigned user gains access to those resources across all namespaces, unlike namespaced roles, which limit access to a specific namespace.

![The image illustrates Kubernetes cluster roles, distinguishing between namespaced and cluster-scoped resources, including pods, nodes, roles, and clusterroles.](https://kodekloud.com/kk-media/image/upload/v1752880594/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Cluster-Roles/frame_240.jpg)

## Default Cluster Roles

By default, Kubernetes creates several cluster roles when the cluster is first set up. These default roles are ready to use and cover various administrative tasks.

For additional insights on Kubernetes roles, bindings, and RBAC, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/9cdabd48-a7e9-400d-b6b7-e8f2c2f7ee5f/lesson/eb973ef1-2772-448f-8373-b35c0c8874b7)**
>
> Watch video content
