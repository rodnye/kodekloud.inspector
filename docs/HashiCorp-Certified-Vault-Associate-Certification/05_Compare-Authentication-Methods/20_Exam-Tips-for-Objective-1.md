# Exam Tips for Objective 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-Authentication-Methods/Exam-Tips-for-Objective-1)

---

## Table of Contents

- Exam Tips for Objective 1
  - 1. Core Purpose of Auth Methods
  - 2. Know What Vault Supports
  - 3. Understand High-Level Workflows
  - 4. Human-Based vs. System-Based Methods
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare Authentication Methods

# Exam Tips for Objective 1

> [!important]
> **Note**
>
> Use this checklist to solidify your understanding of Vault’s authentication methods before the HashiCorp Certified Vault Associate exam.

---

## 1\. Core Purpose of Auth Methods

- Validate a client’s identity before granting access.
- Issue Vault tokens that are bound to specific policies.
- Remember: **Auth Methods handle authentication**, while **policies handle authorization**.
- Your end goal in any Auth Method flow is to obtain a valid Vault token (unless you already have one).

![The image provides exam tips related to authentication methods, focusing on validating identities, issuing tokens, and understanding policies and Vault support. It includes colorful text highlights and a cartoon character in the corner.](https://kodekloud.com/kk-media/image/upload/v1752878028/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Exam-Tips-for-Objective-1/exam-tips-authentication-methods-vault.jpg)

---

## 2\. Know What Vault Supports

No matter which method you pick—LDAP, OIDC, GitHub, AWS, or a custom plugin—the result is always a Vault token. Be ready to answer questions like “Does Vault support X provider?” by understanding every Auth Method at a high level.

| Auth Method | Category     | Common Use Case                   |
| ----------- | ------------ | --------------------------------- |
| LDAP        | Human-based  | Centralized user directory        |
| OIDC        | Human-based  | Single sign-on (SSO) integrations |
| GitHub      | Human-based  | GitHub Organization membership    |
| AWS         | System-based | IAM role authentication           |
| Azure       | System-based | Managed identities for Azure VMs  |
| AppRole     | System-based | Machine-to-machine authentication |

---

## 3\. Understand High-Level Workflows

- Skim each Auth Method’s flow: how credentials are exchanged, how tokens are returned.
- Watch for exam keywords like **“frequently rotated”**, **“existing provider”**, or **“no static secrets”**—these hint at specific methods.
- You’re **not restricted** to a provider’s native method. For example, an Azure VM could use AppRole, OIDC, TLS certificates, or the Azure method itself.

![The image provides exam tips related to authentication methods, emphasizing understanding high-level operations, remembering key terms, and flexibility in method usage. It features a cartoon character in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878029/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Exam-Tips-for-Objective-1/exam-tips-authentication-methods-cartoon.jpg)

---

## 4\. Human-Based vs. System-Based Methods

| Method Type  | Examples                      | Interaction | Credential Source |
| ------------ | ----------------------------- | ----------- | ----------------- |
| Human-based  | LDAP, OIDC, GitHub            | Manual      | User credentials  |
| System-based | AWS, Azure, GCP, AppRole, TLS | Automated   | Platform identity |

- **Human-based** (interactive): require user input (LDAP, OIDC, GitHub).
- **System-based** (non-interactive): use platform or machine credentials (AWS, Azure, GCP, AppRole, TLS).

![The image provides exam tips on authentication methods, distinguishing between human-based (e.g., LDAP, OIDC) and system-based (e.g., AWS, Azure) methods. It emphasizes understanding interactive and complex credential systems.](https://kodekloud.com/kk-media/image/upload/v1752878031/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Exam-Tips-for-Objective-1/exam-tips-authentication-methods-credentials.jpg)

---

Master these concepts, and you’ll be prepared to answer any Vault Associate exam questions on authentication methods.

## Links and References

- [Vault Authentication Documentation](https://www.vaultproject.io/docs/auth)
- [HashiCorp Certified: Vault Associate Exam Guide](https://learn.hashicorp.com/vault/associate)
- [Vault Policies Overview](https://www.vaultproject.io/docs/concepts/policies)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/eebfb593-8885-43b0-a9ba-9f88af87092e/lesson/de3a757f-39ee-4faa-ae48-5cec340ef771)**
>
> Watch video content
