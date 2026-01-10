# Root Tokens - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Assess-Vault-Tokens/Root-Tokens)

---

## Table of Contents

- Root Tokens
  - What Is a Root Token?
  - Best Practices for Root Tokens
  - Generating Root Tokens
  - Key Takeaways
  - References
  - Watch Video
    - 1. Initialization
    - 2. Creating from an Existing Root Token
    - 3. Emergency Recovery with Unseal/Recovery Keys
      - Step 1: Initialize Root Generation
      - Step 2: Submit Unseal Keys
      - Step 3: Decode the Root Token

---

## Content

HashiCorp Certified: Vault Associate Certification

Assess Vault Tokens

# Root Tokens

In Vault, a **root token** is the ultimate superuser credential. It carries the `root` policy, granting unrestricted access to every Vault operation. This guide covers what root tokens are, how to use them securely, and the various ways to generate or recover them.

![The image is a slide about root tokens, explaining their unlimited access, lack of expiration, and best practices for usage and revocation. It includes colorful text highlights and a cartoon character in the corner.](https://kodekloud.com/kk-media/image/upload/v1752878001/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Root-Tokens/root-tokens-access-best-practices-slide.jpg)

## What Is a Root Token?

A root token:

- Carries the `root` policy, allowing any Vault operation
- Is non-renewable by default (`token_renewable=false`)
- Has no expiration (TTL is ∞)

Running a lookup against a root token shows:

```
$ vault token lookup s.<root-token>
Key                Value
---                -----
token              s.<root-token>
token_duration     ∞
token_renewable    false
policies           ["root"]
```

> [!important]
> **Note**
>
> You can use an existing root token to create a new token with a finite TTL if desired.

## Best Practices for Root Tokens

Root tokens should be handled with extreme caution:

| Scenario             | Usage                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| Initial Setup        | Perform your Vault initialization tasks.                                                         |
| Testing Integrations | Validate new auth methods (e.g., [LDAP](https://ldap.com), [OIDC](https://openid.net/connect/)). |
| Emergency Recovery   | Regenerate in a crisis when standard auth is unavailable.                                        |

> [!important]
> **Warning**
>
> Root tokens grant unlimited access. Always revoke them immediately after use to avoid security risks:
>
> ```
> $ vault token revoke s.<root-token>
> Success! Revoked token (if it existed)
> ```

## Generating Root Tokens

You can obtain a root token through three primary methods:

| Method                     | When to Use                             | Command                        |
| -------------------------- | --------------------------------------- | ------------------------------ |
| Initialization             | First-time Vault setup                  | `vault operator init`          |
| Using an Existing Token    | Create additional root-level tokens     | `vault token create`           |
| Using Unseal/Recovery Keys | Emergency recovery when Vault is sealed | `vault operator generate-root` |

### 1\. Initialization

During Vault initialization, the CLI outputs your initial root token:

```
$ vault operator init
# ...
Initial Root Token: s.<initial-root-token>
# ...
```

### 2\. Creating from an Existing Root Token

If you already have a root token, log in and issue a new one:

```
$ vault login s.<existing-root-token>
Success! You are now authenticated.

$ vault token create
Key                Value
---                -----
token              s.<new-root-token>
token_duration     ∞
token_policies     ["root"]
policies           ["root"]
```

### 3\. Emergency Recovery with Unseal/Recovery Keys

In critical scenarios where Vault’s normal auth is down, you can regenerate a root token using a quorum of recovery keys.

![The image explains how to create a root token using unseal/recovery keys, detailing a three-step process involving initialization, key holder actions, and decoding.](https://kodekloud.com/kk-media/image/upload/v1752878003/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Root-Tokens/root-token-creation-unseal-keys.jpg)

#### Step 1: Initialize Root Generation

Generate a nonce and one-time password (OTP):

```
$ vault operator generate-root -init
Nonce        5b6e3831-2a45-4695-7757-5810074d36c8
Started      true
Progress     0/3
Complete     false
OTP          E87jF6ZeJo8NjJwytl7mvKLER
OTP Length   26
```

#### Step 2: Submit Unseal Keys

Each key holder submits their unseal key. Repeat until the threshold is met (e.g., 3/3):

```
$ vault operator generate-root
Root generation operation nonce: 5b6e3831-2a45-...
Unseal Key (will be hidden):
Progress   1/3
Complete   false
```

#### Step 3: Decode the Root Token

Once the threshold is reached, use the OTP to decrypt the encoded token:

```
$ vault operator generate-root \
    -otp="E87jF6ZeJo8NjJwytl7mvKLER" \
    -decode="G2NeKUZgXTsYYxILAC9ZFBguPw9ZBovFAs"
Root token: s.<recovered-root-token>
```

After resolving the emergency, **revoke** the recovered root token:

```
$ vault token revoke s.<recovered-root-token>
Success! Revoked token (if it existed)
```

## Key Takeaways

- Root tokens have unlimited privileges and no default expiration.
- Restrict use to initial setup, testing, or emergency recovery only.
- Always revoke root tokens immediately after use.
- Generate root tokens via initialization, an existing root token, or a quorum of unseal keys.

## References

- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)
- [Vault Operator Commands](https://www.vaultproject.io/docs/commands/operator)
- [HashiCorp Vault Best Practices](https://learn.hashicorp.com/collections/vault/best-practices)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/ffb53470-4115-4c47-aade-cb572b6b574f/lesson/59fe1273-e723-427c-9475-728705cf6c03)**
>
> Watch video content
