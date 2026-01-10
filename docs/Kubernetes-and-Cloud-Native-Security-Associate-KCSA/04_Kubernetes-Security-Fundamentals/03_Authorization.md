# Authorization - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Security-Fundamentals/Authorization)

---

## Table of Contents

- Authorization
  - Why Authorization Matters
  - Kubernetes Authorization Mechanisms
  - Fallback Modes: AlwaysAllow and AlwaysDeny
  - Configuring Authorization Modes
  - Links and References
  - Watch Video
    - 1. Node Authorizer
    - 2. Attribute-Based Access Control (ABAC)
    - 3. Role-Based Access Control (RBAC)
    - 4. Webhook (External Authorization)

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Security Fundamentals

# Authorization

Kubernetes authentication verifies who you are, while **authorization** decides what actions authenticated users or services can perform within a cluster. Fine-grained authorization ensures that each role—developer, tester, CI/CD pipeline, or monitoring agent—only has the permissions necessary for its tasks.

## Why Authorization Matters

Cluster administrators have full control by default:

```
# As cluster-admin (full privileges)
kubectl get pods
NAME      STATUS   ROLES   AGE     VERSION
worker-1  Ready    <none>  5d21h   v1.13.0
worker-2  Ready    <none>  5d21h   v1.13.0


kubectl get nodes
NAME      STATUS   ROLES   AGE     VERSION
worker-1  Ready    <none>  5d21h   v1.13.0
worker-2  Ready    <none>  5d21h   v1.13.0


kubectl delete node worker-2
Node "worker-2" deleted!
```

However, when granting access to other users or services, you’ll want to restrict actions they can perform:

```
# As developer (restricted privileges)
kubectl delete node worker-2
Error from server (Forbidden): nodes "worker-2" is forbidden: User "developer" cannot delete resource "nodes"
```

Authorization is critical in multi-tenant clusters to isolate workloads and protect cluster configuration.

## Kubernetes Authorization Mechanisms

Kubernetes supports several authorization modes, evaluated in order:

![The image lists different authorization mechanisms: Node, ABAC, RBAC, and Webhook.](https://kodekloud.com/kk-media/image/upload/v1752880778/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Authorization/authorization-mechanisms-node-abac-rbac-webhook.jpg)

| Mode    | Description                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------- |
| Node    | Grants kubelets exactly the permissions they need, based on their `system:node:<nodeName>` certificate. |
| ABAC    | Uses attribute-based JSON policies passed at API server startup.                                        |
| RBAC    | Defines Roles (collections of permissions) and RoleBindings to assign them to users/groups.             |
| Webhook | Delegates each request to an external HTTP service (e.g., OPA) for custom policy decisions.             |

### 1\. Node Authorizer

Kubelets use TLS client certificates (user `system:node:<nodeName>`, group `system:nodes`) to communicate with the API server. The Node Authorizer automatically grants permissions to read Pods/Services and report node status—nothing more.

![The image illustrates a "Node Authorizer" process involving a user, Kube API, and kubelet, with a certificate for authentication. It shows read and write permissions for services, endpoints, nodes, pods, and status updates.](https://kodekloud.com/kk-media/image/upload/v1752880779/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Authorization/node-authorizer-process-kube-api.jpg)

### 2\. Attribute-Based Access Control (ABAC)

ABAC policies are static JSON files supplied at API server startup. Each entry matches `user`, `group`, `namespace`, `resource`, and `apiGroup`.

```
{
  "kind": "Policy",
  "spec": {
    "user":      "dev-user",
    "namespace": "*",
    "resource":  "pods",
    "apiGroup":  "*"
  }
}
```

Multiple entries require manual edits and an API server restart.

> [!important]
> **Warning**
>
> ABAC can become unwieldy in large environments since every permission change needs a file update and server restart.

### 3\. Role-Based Access Control (RBAC)

RBAC organizes permissions into **Roles** (namespace-scoped) or **ClusterRoles** (cluster-scoped), then binds them to users, groups, or service accounts. Changes to a Role take effect immediately for all subjects.

![The image illustrates a Role-Based Access Control (RBAC) system, showing different users and groups with their assigned roles and permissions, such as "Developer" and "Security," with specific capabilities like viewing and creating PODs or approving CSRs.](https://kodekloud.com/kk-media/image/upload/v1752880780/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Authorization/rbac-system-users-roles-permissions.jpg)

> RBAC is the recommended authorization mechanism for most production clusters.

### 4\. Webhook (External Authorization)

With a webhook authorizer, the API server forwards each request to an external HTTP endpoint (for example, [Open Policy Agent](https://www.openpolicyagent.org/)). The external service evaluates policies and returns an allow or deny response.

## Fallback Modes: AlwaysAllow and AlwaysDeny

If no authorization mode is specified, Kubernetes defaults to **AlwaysAllow**, permitting all requests. You can also use **AlwaysDeny** to block every request.

| Mode        | Behavior                            |
| ----------- | ----------------------------------- |
| AlwaysAllow | All requests are granted (default). |
| AlwaysDeny  | All requests are rejected.          |

## Configuring Authorization Modes

Set the modes via the `--authorization-mode` flag on the `kube-apiserver`. The order matters—the API server stops at the first allow or deny decision.

```
ExecStart=/usr/local/bin/kube-apiserver \
  --authorization-mode=AlwaysAllow \
  # (other flags omitted)
```

> [!important]
> **Note**
>
> If `--authorization-mode` is omitted, Kubernetes uses `AlwaysAllow` by default.

To combine multiple modes:

```
ExecStart=/usr/local/bin/kube-apiserver \
  --authorization-mode=Node,RBAC,Webhook \
  # (other flags omitted)
```

1.  **Node** handles kubelet requests.
2.  **RBAC** authorizes based on Roles and Bindings.
3.  **Webhook** consults an external service if previous modules neither allowed nor denied.

As soon as one module makes a decision, the API server stops further checks.

---

Role-Based Access Control in Kubernetes will be covered in more depth later in this course.

## Links and References

- [Kubernetes Authorization Concepts](https://kubernetes.io/docs/reference/access-authn-authz/authorization/)
- [RBAC in Kubernetes](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [Open Policy Agent (OPA)](https://www.openpolicyagent.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/35283238-b8fb-4849-b620-fc3c7d1a8941)**
>
> Watch video content
