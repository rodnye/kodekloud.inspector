# Access to Sensitive Data - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Threat-Model/Access-to-Sensitive-Data)

---

## Table of Contents

- Access to Sensitive Data
  - Common Attack Vectors
  - Example: Over-Permissive RBAC in a Node.js Backend
  - Securing Application Logs
  - Encrypting Network Traffic
  - Summary & Best Practices
  - Links and References
  - Watch Video
    - Secret Definition
    - Misconfigured RBAC
    - Hardened RBAC
    - Risky Logging Example
    - Redacted Logging Example
    - Unencrypted HTTP Example
    - Encrypted HTTPS Example

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Threat Model

# Access to Sensitive Data

In this lesson, we explore how attackers might gain unauthorized access to sensitive information in a Kubernetes cluster and provide best practices to mitigate these risks. By following the principles of least privilege, secure logging, and network encryption, you can significantly reduce the attack surface.

## Common Attack Vectors

| Attack Vector           | Description                                                                               | Mitigation                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| etcd Access             | Direct reads or writes to etcd can expose Secrets, ConfigMaps, and cluster state.         | Enable TLS for etcd, use RBAC for etcd API, rotate encryption keys.        |
| Kubelet API             | Exposed kubelet endpoints may reveal logs, exec shells, and pod details.                  | Restrict kubelet API with TLS client certs and network policies.           |
| Application Logs        | Logs containing passwords, tokens, or PII become high-value targets if compromised.       | Redact sensitive fields and centralize logs in an access-controlled store. |
| Persistent Volumes      | Mounting volumes in another pod or network-exposed volumes can leak data.                 | Use volume accessModes, encryption at rest, and Pod Security Policies.     |
| Network Shares (NFS)    | Unprotected NFS/SMB shares may be read by unauthorized clients.                           | Enforce mount restrictions, network segmentation, and authentication.      |
| Cluster Encryption Keys | If master encryption keys are compromised, all encrypted data at rest becomes accessible. | Rotate keys regularly and store them in Hardware Security Modules.         |

## Example: Over-Permissive RBAC in a Node.js Backend

Imagine a Node.js service running in the `backend` namespace. Its ServiceAccount (`backend-sa`) has read access to Secrets and ConfigMaps. An attacker who compromises the pod could enumerate sensitive data.

### Secret Definition

```
apiVersion: v1
kind: Secret
metadata:
  name: database-credentials
  namespace: backend
type: Opaque
data:
  DB_USERNAME: dXNlcm5hbWU=      # base64 "username"
  DB_PASSWORD: cGFzc3dvcmQ=      # base64 "password"
  DB_HOST: ZGItc2VydmVyLmV4YW1wbGUuY29tOjU0MzI=  # base64 "db-server.example.com:5432"
  DB_PORT: NTQzMg==              # base64 "5432"
```

### Misconfigured RBAC

This Role grants broad read access to Secrets and pods:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: backend-read-only
  namespace: backend
rules:
- apiGroups: [""]
  resources: ["configmaps", "secrets"]
  verbs: ["get", "list"]
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: backend-rolebinding
  namespace: backend
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: backend-read-only
subjects:
- kind: ServiceAccount
  name: backend-sa
  namespace: backend
```

> [!important]
> **Warning**
>
> Granting `get`/`list` on Secrets lets any pod with that ServiceAccount access database credentials, API keys, or other secrets.

### Hardened RBAC

Limit the ServiceAccount to only the resources it truly needs:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: backend-limited
  namespace: backend
rules:
- apiGroups: [""]
  resources: ["configmaps"]
  verbs: ["get", "list"]
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: backend-limited-binding
  namespace: backend
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: backend-limited
subjects:
- kind: ServiceAccount
  name: backend-sa
  namespace: backend
```

> [!important]
> **Note**
>
> Always follow the [principle of least privilege](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#principle-of-least-privilege) when defining RBAC rules.

## Securing Application Logs

Logging sensitive data can expose credentials, tokens, and PII if logs are compromised.

### Risky Logging Example

```
[INFO] Connected to database at db-server.example.com:5432
[INFO] Executing query: SELECT * FROM users WHERE email='user@example.com' AND password='superSecretPassword123'
[ERROR] Connection timed out with username db_user and password dbPass123!
[DEBUG] Payload: {"creditCardNumber":"4111111111111111","expiration":"12/25","cvv":"123"}
```

### Redacted Logging Example

```
[INFO] Connected to database at db-server.example.com:5432
[INFO] Executing query: SELECT * FROM users WHERE email='**********' AND password='**********'
[ERROR] Connection timed out with username db_user and password='**********'
[DEBUG] Payload: {"creditCardNumber":"************","expiration":"**/**","cvv":"***"}
```

Best practices for log security:

- Avoid logging credentials, tokens, or other secrets.
- Mask or redact sensitive fields before writing logs.
- Centralize logs in a secure, access-controlled system (e.g., Elasticsearch with RBAC).
- Continuously monitor log access and anomalies.

## Encrypting Network Traffic

All inter-service communication should use TLS to prevent packet sniffing and man-in-the-middle attacks.

### Unencrypted HTTP Example

```
GET /api/user/login HTTP/1.1
Host: backend.example.com
Content-Type: application/json


{
  "username": "john_doe",
  "password": "superSecret123"
}
```

### Encrypted HTTPS Example

```
GET /api/user/login HTTP/1.1
Host: backend.example.com
Authorization: Bearer <token>
Content-Type: application/json
TLS: true


{
  "username": "john_doe",
  "password": "superSecret123"
}
```

Enable mTLS between pods and enforce HTTPS for all east-west and north-south traffic.

## Summary & Best Practices

- Apply **least-privilege RBAC** so pods only have the permissions they require.
- **Never log sensitive information**; mask or omit secrets in application logs.
- **Enforce TLS/mTLS** for all inter-service and external communications.
- Rotate encryption keys and Secrets regularly.

Implementing these controls will help safeguard your Kubernetes cluster against unauthorized data access.

## Links and References

- [Kubernetes RBAC Documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [etcd Security](https://etcd.io/docs/v3.5/op-guide/security/)
- [Logging Best Practices](https://12factor.net/logs)
- [mTLS in Kubernetes](https://istio.io/latest/docs/concepts/security/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/6da25ade-b162-485c-b9b9-f351990e99c2/lesson/30d5aa37-14c8-43db-9832-3f0b55ca52b8)**
>
> Watch video content
