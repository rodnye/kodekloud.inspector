# Demo Vault Authentication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/HashiCorp-Vault-Kubernetes/Demo-Vault-Authentication)

---

## Table of Contents

- Demo Vault Authentication
  - 1. (Optional) Create and Log In with a Vault Token
  - 2. Enable the Kubernetes Auth Method
  - 3. Configure Vault to Talk to Kubernetes
  - 4. Create a Kubernetes Auth Role Mapping to Vault Policies
  - 5. Verify TokenReview Permissions
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

HashiCorp Vault Kubernetes

# Demo Vault Authentication

Learn how to secure Kubernetes workloads by enabling Vault’s Kubernetes authentication method. This guide walks through configuring Vault to validate Kubernetes ServiceAccount JWTs via the Token Review API and issue short-lived Vault tokens.

| Requirement                          | Description                                                            |
| ------------------------------------ | ---------------------------------------------------------------------- |
| Vault CLI                            | Installed and pointed to your Vault server                             |
| Management Vault token (e.g., root)  | Has privileges to enable auth methods and manage roles                 |
| Kubernetes Service Account           | Bound to the `system:auth-delegator` ClusterRole for TokenReview calls |
| Kubernetes API server address and CA | Required for Vault to communicate with the cluster                     |

> [!important]
> **Note**
>
> You can use any non-root token with sufficient privileges instead of the root token. Follow [Vault best practices](https://www.vaultproject.io/docs/concepts/policies) for production environments.

---

## 1\. (Optional) Create and Log In with a Vault Token

If you need a token to configure auth methods and roles, create one:

```
vault token create
# Example output:
# Key                Value
# ---                -----
# token              s.t3Z3Qzflc14FRideymCDYn
# token_accessor     3gZeW9G8OcK80Wyewuzigth
# token_policies     ["root"]
```

Log in using the new token:

```
vault login s.t3Z3Qzflc14FRideymCDYn
# Success! You are now authenticated.
```

---

## 2\. Enable the Kubernetes Auth Method

Turn on the Kubernetes auth backend in Vault:

```
vault auth enable kubernetes
# Success! Enabled kubernetes auth method at: kubernetes/
```

---

## 3\. Configure Vault to Talk to Kubernetes

Provide Vault with the ServiceAccount reviewer JWT, the cluster’s API endpoint, and the CA certificate:

```
vault write auth/kubernetes/config \
  token_reviewer_jwt="$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
  kubernetes_host="https://${KUBERNETES_PORT_443_TCP_ADDR}:443" \
  kubernetes_ca_cert="@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
# Success! Data written to: auth/kubernetes/config
```

> [!important]
> **Warning**
>
> Ensure your environment variable `KUBERNETES_PORT_443_TCP_ADDR` points to the correct API server IP or DNS name before running this command.

---

## 4\. Create a Kubernetes Auth Role Mapping to Vault Policies

Define a role (`phpapp`) that binds a specific ServiceAccount in a namespace to a Vault policy:

```
vault write auth/kubernetes/role/phpapp \
  bound_service_account_names=app \
  bound_service_account_namespaces=demo \
  policies=app \
  ttl=1h
# Success! Data written to: auth/kubernetes/role/phpapp
```

This role ensures that only pods using the `app` ServiceAccount in the `demo` namespace receive Vault tokens scoped to the `app` policy, valid for one hour.

---

## 5\. Verify TokenReview Permissions

Check that the Vault ServiceAccount (for example, `vault` in `demo` namespace) has the `system:auth-delegator` ClusterRole to call the TokenReview API:

```
kubectl describe clusterrolebinding vault-server-binding
```

Example output:

```
Name:         vault-server-binding
Role:
  Kind:       ClusterRole
  Name:       system:auth-delegator
Subjects:
  Kind:             ServiceAccount
  Name:             vault
  Namespace:        demo
```

---

## Next Steps

With Kubernetes auth enabled and roles configured, you can deploy application pods that request Vault tokens via their ServiceAccount JWTs and fetch secrets at runtime.

## Links and References

- [Vault Kubernetes Auth Method](https://www.vaultproject.io/docs/auth/kubernetes)
- [Kubernetes TokenReview API](https://kubernetes.io/docs/reference/access-authn-authz/authentication/)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/baf5859d-32c2-4e7c-9808-f3486d6b9827/lesson/2f1b7046-4f0b-40bd-9dfc-c2c53311f905)**
>
> Watch video content
