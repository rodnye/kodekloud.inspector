# Create a Token based on Use Cases - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Assess-Vault-Tokens/Create-a-Token-based-on-Use-Cases)

---

## Table of Contents

- Create a Token based on Use Cases
  - 1. Periodic Token
  - 2. Service Token with Use Limits
  - 3. Orphan Token
  - 4. CIDR-Bound Token
  - 5. Batch Token
  - Additional Resources
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp Certified: Vault Associate Certification

Assess Vault Tokens

# Create a Token based on Use Cases

When working with HashiCorp Vault, selecting the right token type ensures secure, efficient access for your applications and users. Whether you’re architecting a long-running service, enforcing strict usage limits, or preparing for the [Vault Associate exam](https://www.hashicorp.com/certification/vault-associate), this guide walks you through the five main Vault token types and their optimal use cases.

| Token Type                | Ideal For                                     | Key Feature                                                    |
| ------------------------- | --------------------------------------------- | -------------------------------------------------------------- |
| Periodic Token            | Long-running applications                     | Renewable indefinitely without reissuance                      |
| Service Token (Use-Limit) | Short-lived tasks with fixed invocation count | Automatically revoked after a set number of uses               |
| Orphan Token              | Child tokens that outlive their parent        | Independent lifecycle—cannot be revoked by parent token repeal |
| CIDR-Bound Token          | Network-restricted access                     | Bound to specific IP or CIDR range                             |
| Batch Token               | Multi-cluster replication                     | Ephemeral — not persisted to storage, minimizing overhead      |

---

## 1\. Periodic Token

Use a **periodic token** when you have a service that cannot handle token replacement mid-flight but still requires ongoing authentication. These tokens come with a finite TTL but **no maximum TTL**, allowing endless renewals.

> [!important]
> **Note**
>
> To renew a periodic token:
>
> ```
> vault token renew <your-periodic-token>
> ```

![The image is a slide titled "Create a Token Based on Needs," listing requirements for a periodic token, including handling long-running apps and indefinite renewal.](https://kodekloud.com/kk-media/image/upload/v1752877979/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Create-a-Token-based-on-Use-Cases/create-token-based-on-needs-requirements.jpg)

---

## 2\. Service Token with Use Limits

When you need to enforce a fixed invocation count—regardless of how much TTL remains—opt for a **service token** configured with a usage limit. Vault will automatically revoke it after the specified number of successful requests.

| Configuration | Example |
| ------------- | ------- |
| Max uses      | 3       |
| TTL           | 1h      |

![The image is a slide titled "Create a Token Based on Needs," detailing a requirement to limit a token's use to three times regardless of its remaining TTL, with a highlighted section labeled "Service Token with Use Limits."](https://kodekloud.com/kk-media/image/upload/v1752877980/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Create-a-Token-based-on-Use-Cases/create-token-use-limits-slide.jpg)

---

## 3\. Orphan Token

An **orphan token** has no parent association—making it immune to parent token revocation. Use it when you need a child token to survive beyond its creator’s lifecycle.

> [!important]
> **Note**
>
> Orphan tokens are ideal for background jobs or off-line processes that must persist independently.

![The image is a slide titled "Create a Token Based on Needs," listing requirements for an "Orphan Token," which is not impacted by its parent's lifecycle and has an extended expiration.](https://kodekloud.com/kk-media/image/upload/v1752877981/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Create-a-Token-based-on-Use-Cases/create-token-orphan-requirements-slide.jpg)

---

## 4\. CIDR-Bound Token

To restrict token usage to a specific IP or network block, create a **CIDR-bound token**. This is simply a service token with additional `--cidr` parameters:

```
vault token create \
  --period=24h \
  --cidr=10.3.5.16/32 \
  --policy=my-policy
```

Even if the token is exfiltrated, it won’t work outside the defined network.

![The image is a slide titled "Create a Token Based on Needs," explaining the concept of a CIDR-Bound Token, which is a token used by a specific host or within a certain network block. It includes a note that it's a regular service token with additional CIDR-bound configuration.](https://kodekloud.com/kk-media/image/upload/v1752877983/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Create-a-Token-based-on-Use-Cases/create-token-cidr-bound-concept.jpg)

---

## 5\. Batch Token

For global, multi-cluster environments, **batch tokens** automatically propagate across replication sets without ever hitting the storage backend. This reduces write amplification and storage load when you need to issue large volumes of tokens.

> [!important]
> **Warning**
>
> Batch tokens are not persisted. If a Vault node goes down before replication completes, the token may not be recoverable.

![The image is a slide titled "Create a Token Based on Needs," listing requirements for token replication and storage efficiency, with a highlighted "Batch Token" button.](https://kodekloud.com/kk-media/image/upload/v1752877984/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Create-a-Token-based-on-Use-Cases/create-token-replication-storage-efficiency.jpg)

---

## Additional Resources

- [Vault Token Management](https://www.vaultproject.io/docs/concepts/tokens)
- [Vault Replication Overview](https://www.vaultproject.io/docs/enterprise/replication)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/ffb53470-4115-4c47-aade-cb572b6b574f/lesson/dc8bee7f-bf83-46d9-995f-2b155ab78fda)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/ffb53470-4115-4c47-aade-cb572b6b574f/lesson/578517b1-7bed-4d16-bced-7ce86572aa4f)**
>
> Practice lab
