# RBAC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Security-Fundamentals/RBAC)

---

## Table of Contents

- RBAC
  - 1. Defining a Role in a Namespace
  - 2. Binding a Role to a User with RoleBinding
  - 3. Inspecting Roles and RoleBindings
  - 4. Verifying Permissions with kubectl auth can-i
  - 5. Restricting Access to Specific Resource Names
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Security Fundamentals

# RBAC

In this tutorial, you’ll learn how to manage permissions in Kubernetes using RBAC. We’ll cover:

1.  Defining a Role
2.  Binding a Role to a User
3.  Inspecting Roles and RoleBindings
4.  Verifying Permissions with `kubectl auth can-i`
5.  Restricting Access to Specific Resource Names

Along the way, you’ll see code examples, handy tables, and useful callouts to help reinforce best practices.

---

## 1\. Defining a Role in a Namespace

A **Role** grants a set of permissions within a single namespace. Each Role rule comprises:

| Field             | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| apiGroups         | API group of the resource (empty string `""` for core group) |
| resources         | Kubernetes resources (e.g., `pods`, `configmaps`)            |
| verbs             | Allowed actions (e.g., `get`, `list`, `create`, `delete`)    |
| resourceNames\\\* | Restrict operations to specific resource names               |

\*Optional field to scope rules to named resources only.

Example: create a Role named **developer** that can manage Pods and create ConfigMaps.

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: developer
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["list", "get", "create", "update", "delete"]
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["create"]
```

Save as `role-developer.yaml` and apply:

```
kubectl apply -f role-developer.yaml
```

> [!important]
> **Note**
>
> Roles are namespace-scoped by default. To apply this Role in another namespace, add `namespace: your-namespace` under `metadata:`.

---

## 2\. Binding a Role to a User with RoleBinding

A **RoleBinding** associates one or more subjects (users, groups, or service accounts) with a Role.

```
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: devuser-developer-binding
subjects:
  - kind: User
    name: dev-user
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: developer
  apiGroup: rbac.authorization.k8s.io
```

Save as `rolebinding-devuser.yaml` and run:

```
kubectl apply -f rolebinding-devuser.yaml
```

> [!important]
> **Warning**
>
> Ensure your Role and RoleBinding share the same namespace unless you intend to bind across namespaces.

---

## 3\. Inspecting Roles and RoleBindings

Use `kubectl` to list or describe your RBAC resources:

- List all Roles in the current namespace

  ```
  kubectl get roles
  ```

- List all RoleBindings in the current namespace

  ```
  kubectl get rolebindings
  ```

- Describe a specific Role to view its rules

  ```
  kubectl describe role developer
  ```

  Sample output:

  ```
  Name:         developer
  PolicyRule:
    Resources      Verbs
    ---------      -------------------------------
    pods           [get list create update delete]
    configmaps     [create]
  ```

- Describe a RoleBinding to see bound subjects

  ```
  kubectl describe rolebinding devuser-developer-binding
  ```

  Sample output:

  ```
  Name:         devuser-developer-binding
  Role:
    Kind:  Role
    Name:  developer
  Subjects:
    Kind   Name
    ----   ----
    User   dev-user
  ```

---

## 4\. Verifying Permissions with kubectl auth can-i

Check whether a user can perform specific actions:

```
# As the current user
kubectl auth can-i create deployments
kubectl auth can-i delete nodes
# Impersonate dev-user
kubectl auth can-i create deployments --as dev-user
kubectl auth can-i create pods --as dev-user
# → yes
```

To test in a different namespace:

```
kubectl auth can-i create pods --as dev-user --namespace test
# → no  # dev-user has no access in 'test'
```

---

## 5\. Restricting Access to Specific Resource Names

Limit Role permissions to named resources using `resourceNames`:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-limited
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "create", "update"]
    resourceNames: ["blue", "orange"]
```

Apply:

```
kubectl apply -f role-pod-limited.yaml
```

---

## Links and References

- [Kubernetes RBAC Documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [kubectl auth can-i](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#auth)
- [Kubernetes Concepts: RBAC](https://kubernetes.io/docs/concepts/security/rbac/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/93558bc7-a21e-46e1-8ea6-2da5d8389c99)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/ba48419f-271a-47b1-b21f-8057b0790046)**
>
> Practice lab
