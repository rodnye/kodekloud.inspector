# Admission Controllers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Platform-Security/Admission-Controllers)

---

## Table of Contents

- Admission Controllers
  - Kubernetes API Request Flow
  - Authentication & Authorization Examples
  - Why Admission Controllers?
  - Built-in Admission Controllers
  - Namespace Admission Controllers
  - NamespaceLifecycle Admission Controller
  - Links and References
  - Watch Video
  - Practice Lab
    - kubeconfig Snippet
    - RBAC Role for Pod Operations
    - NamespaceExists
    - NamespaceAutoProvision
      - Viewing Enabled Admission Controllers
      - Enabling an Admission Controller

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Platform Security

# Admission Controllers

Admission Controllers are plugins that intercept requests to the Kubernetes API server **after** authentication and authorization but **before** they’re persisted in etcd. They enable cluster operators to enforce policies, mutate objects, or perform background actions automatically.

## Kubernetes API Request Flow

When you run a `kubectl` command (e.g., creating a Pod), the request follows these steps:

1.  **Authentication** (AuthN): Verify user identity (usually via certificates in your kubeconfig).
2.  **Authorization** (AuthZ): Check if the requester has permission (via RBAC, ABAC, Node, Webhook).
3.  **Admission Control** (Admission Controllers): Validate or mutate objects.
4.  **Persistence**: Store the final object in etcd.

![The image is a flowchart illustrating the process of creating a pod in Kubernetes, involving steps like authentication, authorization, and admission controllers.](https://kodekloud.com/kk-media/image/upload/v1752880875/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Admission-Controllers/kubernetes-pod-creation-flowchart.jpg)

## Authentication & Authorization Examples

### kubeconfig Snippet

```
cat ~/.kube/config
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0t...
    server: https://your-api-server
contexts:
- context:
    cluster: your-cluster
    user: your-user
  name: your-context
current-context: your-context
users:
- name: your-user
  user:
    client-certificate-data: LS0t...
    client-key-data: LS0t...
```

### RBAC Role for Pod Operations

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: developer
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["list", "get", "create", "update", "delete"]
```

You can further restrict to specific Pod names:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: limited-developer
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["create"]
  resourceNames: ["blue", "orange"]
```

## Why Admission Controllers?

RBAC governs **who** can perform **what** at the API surface. It cannot inspect or change the contents of an object. For example, you may want to enforce:

- Only use images from an internal registry
- Disallow `:latest` tags
- Prevent containers from running as root
- Inject security capabilities or sidecars
- Require specific labels or annotations

```
apiVersion: v1
kind: Pod
metadata:
  name: web-pod
spec:
  containers:
  - name: ubuntu
    image: ubuntu:latest
    command: ["sleep", "3600"]
    securityContext:
      runAsUser: 0
      capabilities:
        add: ["MAC_ADMIN"]
```

> [!important]
> **Note**
>
> Admission Controllers can **validate** (reject bad requests) or **mutate** (inject defaults, sidecars) before persistence.

## Built-in Admission Controllers

Kubernetes includes many Admission Controllers out of the box. Below is a summary of some common ones:

| Admission Controller | Behavior                                     |
| -------------------- | -------------------------------------------- |
| AlwaysPullImages     | Forces image pull for every Pod creation     |
| DefaultStorageClass  | Labels PVCs with a default StorageClass      |
| EventRateLimit       | Throttles API events to prevent overload     |
| NamespaceExists      | Rejects requests for non-existent namespaces |

## Namespace Admission Controllers

### NamespaceExists

By default, creating resources in a namespace that doesn’t exist yields:

```
kubectl run nginx --image=nginx --namespace=blue
# Error from server (NotFound): namespaces "blue" not found
```

### NamespaceAutoProvision

`NamespaceAutoProvision` (disabled by default) automatically creates a namespace if it doesn’t exist when you submit a request.

#### Viewing Enabled Admission Controllers

```
kube-apiserver -h | grep enable-admission-plugins
```

On kubeadm-based clusters:

```
kubectl exec kube-apiserver-control-plane -n kube-system -- kube-apiserver -h | grep enable-admission-plugins
```

#### Enabling an Admission Controller

Update the API server’s startup arguments:

```
--enable-admission-plugins=NodeRestriction,NamespaceAutoProvision
```

> [!important]
> **Warning**
>
> Editing the `kube-apiserver` flags requires careful coordination. After changes, restart the API server or apply the updated control-plane manifest.

**Example (systemd service):**

```
ExecStart=/usr/local/bin/kube-apiserver \
  --authorization-mode=Node,RBAC \
  --enable-admission-plugins=NodeRestriction,NamespaceAutoProvision \
  …other flags…
```

**Example (kubeadm Pod manifest):**

```
apiVersion: v1
kind: Pod
metadata:
  name: kube-apiserver
  namespace: kube-system
spec:
  containers:
  - name: kube-apiserver
    image: k8s.gcr.io/kube-apiserver:v1.11.3
    command:
    - kube-apiserver
    - --authorization-mode=Node,RBAC
    - --enable-admission-plugins=NodeRestriction,NamespaceAutoProvision
    …other flags…
```

Now, creating a Pod in a new namespace will auto-create it:

```
kubectl run nginx --image=nginx --namespace=blue
kubectl get namespaces
# NAME          STATUS   AGE
# blue          Active   3m
# default       Active   23m
# kube-public   Active   24m
# kube-system   Active   24m
```

## NamespaceLifecycle Admission Controller

The **NamespaceLifecycle** plugin supersedes both `NamespaceExists` and `NamespaceAutoProvision`. It:

- Rejects requests to unknown namespaces
- Prevents deletion of critical system namespaces (`default`, `kube-system`, `kube-public`)

## Links and References

- [Kubernetes Admission Controllers](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/)
- [Kubernetes RBAC Overview](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [kube-apiserver Command-Line Flags](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/fce29d1e-7bd6-43b5-b11e-863367854881)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/2df29ee2-5c77-4ab1-a3e3-8ce28aa498a4)**
>
> Practice lab
