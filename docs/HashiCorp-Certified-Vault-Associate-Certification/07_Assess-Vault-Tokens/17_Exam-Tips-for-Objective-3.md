# Exam Tips for Objective 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Assess-Vault-Tokens/Exam-Tips-for-Objective-3)

---

## Table of Contents

- Exam Tips for Objective 3
  - Token Types Overview
  - Service vs. Batch Tokens
  - Root Token Essentials
  - Links and References
  - Watch Video
    - Practice with vault token

---

## Content

HashiCorp Certified: Vault Associate Certification

Assess Vault Tokens

# Exam Tips for Objective 3

Before you dive into exam questions, ensure you have a solid grasp of Vault’s token system. In this lesson, we’ll cover:

- An overview of all token types
- Key differences between Service and Batch tokens
- How to use the `vault token` command
- Root Token best practices

## Token Types Overview

![The image provides exam tips about different types of tokens, including Service, Batch, Root, Periodic, Orphan, and CIDR-Bound Tokens, and emphasizes understanding their unique characteristics and use cases.](https://kodekloud.com/kk-media/image/upload/v1752877985/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Exam-Tips-for-Objective-3/exam-tips-token-types-characteristics.jpg)

| Token Type | TTL Renewal       | Revocation | Storage Behavior                     |
| ---------- | ----------------- | ---------- | ------------------------------------ |
| Service    | Configurable ✓    | ✓          | Persisted in Vault’s storage backend |
| Batch      | ✗                 | ✗          | Encrypted blob, not persisted        |
| Root       | — (never expires) | ✓          | Persisted                            |
| Periodic   | ✓                 | ✓          | Persisted                            |
| Orphan     | ✓                 | ✓          | Persisted (no parent)                |
| CIDR-Bound | ✓                 | ✓          | Persisted (IP-restricted)            |

Key actions you should be able to perform:

- **List** all token types
- **Describe** TTL, renewal, revocation, and storage details for each
- **Match** real-world use cases to the appropriate token

## Service vs. Batch Tokens

![The image provides exam tips related to service and batch tokens, emphasizing the differences, storage practices, and the use of the "vault token" command. It features a stylized character in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752877986/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Exam-Tips-for-Objective-3/exam-tips-service-batch-tokens.jpg)

| Feature                | Service Tokens                 | Batch Tokens                        |
| ---------------------- | ------------------------------ | ----------------------------------- |
| Renewability           | Fully renewable                | Not renewable                       |
| Revocability           | Fully revocable                | Not revocable                       |
| Storage Backend Impact | Persisted to backend           | No backend storage                  |
| Use Case               | Long-lived clients, automation | One-time operations, scale concerns |

> [!important]
> **Note**
>
> Use batch tokens when you need to minimize storage-backend impact.

### Practice with `vault token`

Launch a local Dev Server and run:

```
# Create a batch token
vault token create -type=batch


# Renew a service token
vault token renew <service-token>


# Revoke any token
vault token revoke <token>
```

## Root Token Essentials

![The image provides exam tips related to root tokens and Vault, including creating and revoking root tokens, actions with a token accessor, and the default TTL in Vault.](https://kodekloud.com/kk-media/image/upload/v1752877988/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Exam-Tips-for-Objective-3/exam-tips-root-tokens-vault.jpg)

- **Creation Methods**  
  • Initial root token at initialization  
  • Generate new root with an existing root token  
  • Emergency root via unseal or recovery keys
- **Best Practice**: Always revoke root tokens immediately after completing privileged tasks.
- **Token Accessors** support only these operations: lookup, renew, revoke_self, revocation. For any other action, the actual token is required.
- **Default TTL**: 768 hours (32 days) if none specified.

> [!important]
> **Warning**
>
> Root tokens never expire by default and grant full access—handle them with extreme care.

---

After reviewing these concepts, be sure to complete the practice quizzes in this section to validate your understanding. Good luck on your exam preparation!

## Links and References

- [Vault Tokens](https://www.vaultproject.io/docs/concepts/tokens)
- [Vault Token CLI](https://www.vaultproject.io/docs/commands/token)
- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/ffb53470-4115-4c47-aade-cb572b6b574f/lesson/a5c8f0d1-9cbd-4315-a108-5c5a54a72df7)**
>
> Watch video content
