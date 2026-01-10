# Solution RBAC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Security-Fundamentals/Solution-RBAC)

---

## Table of Contents

- Solution RBAC
  - 1. Inspect API Server Authorization Modes
  - 2. Count Existing Roles
  - 3. Examine the kube-proxy Role
  - 4. Identify the Subject of the kube-proxy RoleBinding
  - 5. Verify dev-user Permissions
  - 6. Grant Pod Permissions to dev-user
  - 7. Fix Permissions for a Pod in the blue Namespace
  - 8. Grant Deployment Permissions in the blue Namespace
  - Links and References
  - Watch Video
    - 6.1 Create the developer Role
    - 6.2 Bind dev-user to the Role

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Security Fundamentals

# Solution RBAC

In this lesson, we’ll dive into Kubernetes Role-Based Access Control (RBAC) to manage permissions for users and services. We’ll cover:

1.  Inspecting API server authorization modes
2.  Counting existing Roles
3.  Examining the built-in `kube-proxy` Role
4.  Reviewing RoleBindings for `kube-proxy`
5.  Verifying `dev-user` permissions
6.  Granting Pod permissions to `dev-user`
7.  Fixing Pod permissions in the `blue` namespace
8.  Granting Deployment permissions in the `blue` namespace

---

## 1\. Inspect API Server Authorization Modes

To confirm that RBAC is enabled, inspect the API server manifest:

```
kubectl -n kube-system get pod kube-apiserver -o yaml
```

Look for the `--authorization-mode` flag:

```
- --authorization-mode=Node,RBAC
```

Alternatively, on the control-plane node:

```
ps aux | grep kube-apiserver
```

```
... --authorization-mode=Node,RBAC ...
```

![The image shows a terminal interface with a task to inspect the environment and identify authorization modes configured on a Kubernetes cluster, specifically checking the `kube-apiserver` settings. There are options for selecting different authorization modes like Node, RBAC, ABAC, and Node,RBAC.](https://kodekloud.com/kk-media/image/upload/v1752880799/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Solution-RBAC/kubernetes-authorization-modes-inspect.jpg)

> [!important]
> **Note**
>
> RBAC must be enabled on your API server for Roles and RoleBindings to function correctly.

---

## 2\. Count Existing Roles

List Roles in the `default` namespace:

```
kubectl get roles -n default
```

```
No resources found in default namespace.
```

Count all Roles across namespaces:

```
kubectl get roles --all-namespaces --no-headers | wc -l
```

```
12
```

| Namespace | Role Count |
| --------- | ---------- |
| default   | 0          |
| all       | 12         |

---

## 3\. Examine the kube-proxy Role

View the `kube-proxy` Role in `kube-system`:

```
kubectl describe role kube-proxy -n kube-system
```

| Resource   | Non-Resource URLs | Resource Names   | Verbs     |
| ---------- | ----------------- | ---------------- | --------- |
| configmaps | \\[\\]            | \\[kube-proxy\\] | \\[get\\] |

True/False:

- **True**: It can **get** the ConfigMap named `kube-proxy`.
- **False**: It cannot delete or update the ConfigMap.
- **False**: It cannot list or watch ConfigMaps.

---

## 4\. Identify the Subject of the kube-proxy RoleBinding

List RoleBindings in `kube-system`:

```
kubectl get rolebindings -n kube-system
```

```
NAME          ROLE
kube-proxy    Role/kube-proxy
```

Describe the `kube-proxy` RoleBinding:

```
kubectl describe rolebinding kube-proxy -n kube-system
```

| Kind  | Name                                                 |
| ----- | ---------------------------------------------------- |
| Group | system bootstrappers kube command default node token |

---

## 5\. Verify dev-user Permissions

After adding `dev-user` to your kubeconfig:

```
kubectl config view
```

Attempt to list Pods in `default`:

```
kubectl get pods --as dev-user
```

```
Error from server (Forbidden): pods is forbidden: User "dev-user" cannot list resource "pods" in API group "" in the namespace "default"
```

> [!important]
> **Warning**
>
> `dev-user` currently has no permissions in `default`. You must create Roles and RoleBindings to grant access.

---

## 6\. Grant Pod Permissions to dev-user

### 6.1 Create the `developer` Role

```
kubectl create role developer \
  --verb=list,create,delete \
  --resource=pods \
  -n default
```

Verify:

```
kubectl describe role developer -n default
```

### 6.2 Bind `dev-user` to the Role

```
kubectl create rolebinding dev-user-binding \
  --role=developer \
  --user=dev-user \
  -n default
```

Confirm:

```
kubectl describe rolebinding dev-user-binding -n default
```

Now `dev-user` can list Pods:

```
kubectl get pods --as dev-user -n default
```

---

## 7\. Fix Permissions for a Pod in the blue Namespace

1.  Inspect existing Roles and RoleBindings:

    ```
    kubectl get roles,rolebindings -n blue
    ```

2.  Describe the `developer` Role:

    ```
    kubectl describe role developer -n blue
    ```

3.  Edit the Role to match the actual Pod name:

    ```
    kubectl edit role developer -n blue
    ```

    Update to:

    ```
    rules:
    - apiGroups: ['']
      resources:
      - pods
      resourceNames:
      - dark-blue-app
      verbs:
      - get
      - watch
      - create
      - delete
    ```

4.  Verify access:

    ```
    kubectl get pod dark-blue-app -n blue --as dev-user
    ```

---

## 8\. Grant Deployment Permissions in the blue Namespace

1.  Edit the `developer` Role again:

    ```
    kubectl edit role developer -n blue
    ```

2.  Add a rule for `deployments` in the `apps` API group:

    ```
    rules:
    - apiGroups: ['']
      resources:
      - pods
      resourceNames:
      - dark-blue-app
      verbs:
      - get
      - watch
      - create
      - delete
    - apiGroups: ['apps']
      resources:
      - deployments
      verbs:
      - get
      - watch
      - create
      - delete
    ```

3.  Verify:

    ```
    kubectl describe role developer -n blue
    ```

4.  Create a Deployment as `dev-user`:

    ```
    kubectl create deployment nginx \
      --image=nginx \
      -n blue \
      --as dev-user
    ```

---

## Links and References

- [Kubernetes RBAC Documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Configuring Service Accounts](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/b2056479-98ff-4f8f-a942-186d2a1f1dee)**
>
> Watch video content
