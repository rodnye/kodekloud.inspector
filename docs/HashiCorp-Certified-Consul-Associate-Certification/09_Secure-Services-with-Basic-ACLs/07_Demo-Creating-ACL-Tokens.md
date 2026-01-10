# Demo Creating ACL Tokens - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Secure-Services-with-Basic-ACLs/Demo-Creating-ACL-Tokens)

---

## Table of Contents

- Demo Creating ACL Tokens
  - 1. Review Existing Policies
  - 2. Create a New Token
  - 3. Automating Token Generation
  - Policy Overview
  - Links and References
  - Watch Video
  - Practice Lab
    - Sample Output
    - Expected Response

---

## Content

HashiCorp Certified: Consul Associate Certification

Secure Services with Basic ACLs

# Demo Creating ACL Tokens

In this tutorial, you’ll learn how to generate a new ACL token for the Consul agent on **web-server-01**, leveraging the existing `eCommerce` policy. We’ll cover:

1.  Reviewing existing ACL policies
2.  Creating a new token
3.  Automating token generation

---

## 1\. Review Existing Policies

Before assigning a token, confirm which ACL policies exist in your Consul cluster.

> [!important]
> **Warning**
>
> Attempting to list policies without a valid token will result in a permission error.

```
$ consul acl policy list
Failed to retrieve the policy list: Unexpected response code: 403 (Permission denied)
```

Supply the **bootstrap token** to view the policy definitions:

```
$ consul acl policy list \
    -token c7142d5a-9ab1-78ba-f521-189971e29c24
```

### Sample Output

```
eCommerce:
  ID:          f333e9a4-dff7-05ac-75a3-98ee4087e868
  Namespace:   default
  Description: eCommerce App
  Datacenters:
global-management:
  ID:          00000000-0000-0000-0000-000000000001
  Namespace:   default
  Description: Builtin Policy that grants unlimited access
  Datacenters:
```

## 2\. Create a New Token

Now generate a scoped ACL token bound to your `eCommerce` policy. Replace the `-policy-id` value with the actual **Policy ID** obtained above.

```
$ consul acl token create \
    -description "Token for web-server-01" \
    -policy-id f333e9a4-dff7-05ac-75a3-98ee4087e868 \
    -token c7142d5a-9ab1-78ba-f521-189971e29c24
```

### Expected Response

```
AccessorID: 574957bd-ba25-43b6-a16b-7a7494ee7fea
SecretID:   d46811f8-21ff-f41c-9c3a-6acbe8c04905
Namespace:  default
Description: Token for web-server-01
Create Time: 2021-02-12 20:32:29.966523914 +0000 UTC
Policies:
- f333e9a4-dff7-05ac-75a3-98ee4087e868  eCommerce
```

The `SecretID` value is the **actual token** you will configure on **web-server-01** for secure Consul access.

## 3\. Automating Token Generation

For large-scale or production environments, manual token creation can become error-prone. Consider using [HashiCorp Vault’s Consul secrets engine](https://www.vaultproject.io/docs/secrets/consul) to dynamically issue ACL tokens:

- Define **roles** in Vault that map to Consul policies.
- Vault will automatically provision short-lived tokens.
- Centralize token lifecycle management and auditing.

> [!important]
> **Note**
>
> Dynamic token issuance reduces manual errors, enforces least privilege, and simplifies rotation.

---

## Policy Overview

| Policy Name       | Policy ID                            | Description                                |
| ----------------- | ------------------------------------ | ------------------------------------------ |
| eCommerce         | f333e9a4-dff7-05ac-75a3-98ee4087e868 | Grants permissions needed by web-server-01 |
| global-management | 00000000-0000-0000-0000-000000000001 | Built-in policy with unrestricted access   |

---

## Links and References

- [Consul ACL Documentation](https://www.consul.io/docs/security/acl)
- [Vault Consul Secrets Engine](https://www.vaultproject.io/docs/secrets/consul)
- [HashiCorp Learn: Automating ACLs](https://learn.hashicorp.com/consul/security/acl)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/77c34744-e0fe-450e-82ea-c699ae223d45/lesson/83a05b44-8210-4b24-b8f7-e61be2b04175)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/77c34744-e0fe-450e-82ea-c699ae223d45/lesson/5b8f403f-0e65-4f8d-8975-37ee158617f1)**
>
> Practice lab
