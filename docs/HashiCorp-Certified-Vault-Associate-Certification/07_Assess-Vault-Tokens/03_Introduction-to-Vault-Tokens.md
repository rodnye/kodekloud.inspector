# Introduction to Vault Tokens - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Assess-Vault-Tokens/Introduction-to-Vault-Tokens)

---

## Table of Contents

- Introduction to Vault Tokens
  - Hotel Analogy
  - Token Generation in Vault
  - Using Tokens to Retrieve Data
  - Vault Tokens Overview
  - Types of Tokens
  - Token Metadata
  - References
  - Watch Video
    - Inspecting a Service Token

---

## Content

HashiCorp Certified: Vault Associate Certification

Assess Vault Tokens

# Introduction to Vault Tokens

## Hotel Analogy

Imagine checking in at a hotel: you show your government-issued ID, and the receptionist hands you a single key card. With that card you can access your room, the gym, the VIP lounge, the spa—any area included in your reservation. You can swipe once and go in, without re-authenticating every time.

![The image shows a gym with various exercise equipment, including treadmills and stationary bikes, and a keycard with instructions.](https://kodekloud.com/kk-media/image/upload/v1752877992/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Vault-Tokens/gym-exercise-equipment-treadmills-bikes.jpg)

## Token Generation in Vault

Vault follows the same concept. After you authenticate—whether by username/password, [AppRole](https://www.vaultproject.io/docs/auth/approle), TLS certificate, or cloud credentials—Vault verifies your identity and issues a token. Each token has a configurable TTL (time to live), measured in seconds, minutes, hours, or days. Once the TTL expires, the token no longer works.

> [!important]
> **Warning**
>
> If you don’t renew a token before it expires, any requests using that token will be denied until you re-authenticate.

![The image shows a gym with various exercise equipment, including treadmills and stationary bikes, alongside a graphic of a keycard with instructions.](https://kodekloud.com/kk-media/image/upload/v1752877993/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Vault-Tokens/gym-exercise-equipment-keycard-instructions.jpg)

Vault tokens encapsulate permissions (read, write, list, etc.) tied to specific paths—much like a hotel key card restricts you to certain areas.

![The image illustrates a process of token generation in vault interfaces, showing authentication methods and token validity, with a visual representation of user interaction and access permissions.](https://kodekloud.com/kk-media/image/upload/v1752877994/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Vault-Tokens/token-generation-vault-authentication-diagram.jpg)

## Using Tokens to Retrieve Data

Whenever an application or user needs a secret or wants to perform an operation, it presents its Vault token. Vault checks:

- That the token exists and hasn’t expired
- That the token’s policies allow the requested action on the specified path

On successful validation, Vault returns the data—whether it’s a static secret or dynamically generated credentials (e.g., database or AWS access keys).

![The image illustrates the process of using a token to retrieve data from a vault, highlighting token validation, expiration, and permission checks. It includes a diagram showing data retrieval and return, with a focus on not needing to re-authenticate.](https://kodekloud.com/kk-media/image/upload/v1752877995/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Vault-Tokens/token-data-retrieval-vault-diagram.jpg)

## Vault Tokens Overview

Tokens are the primary authentication mechanism in Vault. Nearly every Vault operation requires presenting a valid token. The only exceptions are the authentication endpoints themselves (for example, `auth/<method>/login`).

Vault’s built-in token authentication method is always enabled. You can:

- Create tokens directly with the CLI:

  ```
  vault token create -policy="default" -orphan
  ```

- Attach one or more policies to each token to control its permissions
- Use external auth methods that ultimately issue Vault tokens

![The image is a slide titled "Vault Tokens," explaining that tokens are the core method for authentication in Vault, with details on their usage and policies. It includes bullet points and highlights key terms in different colors.](https://kodekloud.com/kk-media/image/upload/v1752877997/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Vault-Tokens/vault-tokens-authentication-policies-slide.jpg)

## Types of Tokens

Vault supports two main token types:

![The image is a slide titled "Types of Tokens," comparing service tokens and batch tokens in terms of storage, renewability, and use cases. Service tokens are default, persisted to storage, and can be renewed, while batch tokens are lightweight, not stored, and ideal for high-volume operations.](https://kodekloud.com/kk-media/image/upload/v1752877998/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Vault-Tokens/types-of-tokens-service-batch-comparison.jpg)

1.  Service Tokens (default)
    - Persisted to the storage backend (creation & lookup involve reads/writes)
    - Renewable and revocable
    - Can spawn child tokens
    - Can act as root tokens
    - Replicated to DR (disaster recovery) clusters, but not performance replicas

2.  Batch Tokens
    - Encrypted, stateless blobs not recorded in the backend
    - Lightweight and highly scalable (ideal for high-frequency operations)
    - Cannot be renewed or revoked
    - Automatically propagate to performance replication clusters

![The image is a comparison table of service tokens and batch tokens, highlighting their characteristics and performance costs. Service tokens are described as "Heavyweight" with multiple writes per token creation, while batch tokens are "Lightweight" with no storage cost for token creation.](https://kodekloud.com/kk-media/image/upload/v1752877999/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Vault-Tokens/service-tokens-vs-batch-tokens-table.jpg)

## Token Metadata

Every Vault token includes metadata fields that govern its behavior:

| Field                  | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| accessor               | Internal handle for referencing or revoking the token              |
| policies               | Policies attached to the token (permissions collection)            |
| ttl                    | Remaining time to live                                             |
| explicit\\\_max\\\_ttl | Maximum TTL set when the token was created                         |
| num\\\_uses            | How many times the token may be used (0 = unlimited)               |
| orphan                 | Indicates if the token has no parent (cannot be revoked by parent) |
| renewable              | Whether the token can be renewed                                   |
| type                   | `service` or `batch`                                               |

![The image describes information and metadata attached to a token, including details like accessor, policies, TTL, max TTL, number of uses left, orphaned token, and renewal status.](https://kodekloud.com/kk-media/image/upload/v1752878000/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Vault-Tokens/token-metadata-accessor-policies-ttl.jpg)

### Inspecting a Service Token

Run the CLI lookup command on a service token (prefix `s.`) to view its details:

```
vault token lookup s.d1BCdhug8buTgAnSZhtPm8Hp
```

Example output:

```
Key               Value
---               -----
accessor          5mXJQjjQvG44ymJz01SHihTG
creation_time     1630436317
creation_ttl      768h
display_name      token
entity_id         n/a
expire_time       2021-10-02T14:58:37.2194177-04:00
explicit_max_ttl  0s
id                s.d1BCdhug8buTgAnSZhtPm8Hp
issue_time        2021-08-31T14:58:37.2194177-04:00
meta              <nil>
num_uses          0
orphan            false
path              auth/token/create
policies          [default user]
renewable         true
ttl               767h59m47s
type              service
```

- **num_uses = 0** means unlimited uses.
- **policies = \[default user\]** indicates the token can perform actions allowed by both policies.
- **ttl** shows the remaining lifespan.
- **type = service** confirms it’s a service token (`s.` prefix).

> [!important]
> **Note**
>
> Batch tokens start with `b.` and will display `type = batch` in the lookup output.

## References

- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)
- [Vault CLI Documentation](https://www.vaultproject.io/docs/commands)
- [Token Concepts in Vault](https://www.vaultproject.io/docs/concepts/tokens)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/ffb53470-4115-4c47-aade-cb572b6b574f/lesson/04167e06-49b1-49b3-8299-b00833e21b6f)**
>
> Watch video content
