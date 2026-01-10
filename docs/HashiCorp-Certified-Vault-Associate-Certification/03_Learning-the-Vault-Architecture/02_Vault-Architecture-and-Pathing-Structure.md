# Vault Architecture and Pathing Structure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Learning-the-Vault-Architecture/Vault-Architecture-and-Pathing-Structure)

---

## Table of Contents

- Vault Architecture and Pathing Structure
  - Vault Architecture
  - Vault Paths and Routing
  - System-Reserved Paths
  - Links and References
  - Watch Video
    - Mounting Engines and Auth Methods

---

## Content

HashiCorp Certified: Vault Associate Certification

Learning the Vault Architecture

# Vault Architecture and Pathing Structure

In this lesson, we’ll examine HashiCorp Vault’s core architecture, how it secures data, and the path-based routing that directs requests to the appropriate internal component. Understanding these fundamentals will help you design, operate, and troubleshoot Vault more effectively.

## Vault Architecture

Vault exposes its functionality exclusively through an HTTPS API. Clients—whether humans or applications—authenticate and interact with Vault over secure TLS connections. Internally, Vault consists of:

- **Storage Backend**  
  A durable, encrypted storage layer. Vault supports [Consul](https://www.consul.io/), DynamoDB, AWS S3, and more. In development mode, an in-memory backend is used. Vault always writes _encrypted_ data to the backend.
- **Core Components**  
  These include the policy store, audit devices, system backend, secrets engines, authentication methods, and the path-routing logic that connects them.
- **Cryptographic Barrier**  
  This barrier ensures that all data crossing the boundary between the untrusted storage/network and Vault’s trusted core is automatically encrypted or decrypted. Only authenticated requests carrying valid tokens or credentials may traverse this barrier.

![The image illustrates the architecture of a Vault system, showing components like the core, token store, audit devices, and storage backend, along with API interaction and encrypted storage.](https://kodekloud.com/kk-media/image/upload/v1752878228/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Architecture-and-Pathing-Structure/vault-system-architecture-components-diagram.jpg)

Vault does not trust external storage or transport. Before any data is written to the backend, it passes through the cryptographic barrier and is encrypted. Likewise, data fetched from storage or received over the network is decrypted only if the caller is properly authenticated.

## Vault Paths and Routing

Every Vault request is routed based on its path prefix. The path determines which component handles the request:

- **Secrets Engines** (e.g., `kv`, `database`, `aws`)
- **Auth Methods** (e.g., `userpass`, `github`, `aws`)
- **Audit Devices** (e.g., file, syslog)
- **System Backend** (mounted at `/sys`)

![The image is a slide titled "Vault Paths," explaining that everything in Vault is path-based, with components like secret engines and auth methods mounted at specified paths. It also mentions that available paths depend on enabled features and that the system backend is mounted at the /sys endpoint.](https://kodekloud.com/kk-media/image/upload/v1752878230/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Architecture-and-Pathing-Structure/vault-paths-secret-engines-auth-methods.jpg)

### Mounting Engines and Auth Methods

When enabling a component, you can specify a custom mount path with the `-path` flag. If you omit the flag, Vault uses the component’s name as the path:

```
# Enable the database secrets engine at the default path "database/"
vault secrets enable database

# Enable the Azure auth method at a custom path "my-azure/"
vault auth enable -path=my-azure azure
```

> [!important]
> **Note**
>
> The Vault UI provides a simple text field to specify custom mount paths, mirroring the CLI’s `-path` behavior.

## System-Reserved Paths

Vault reserves certain paths that are integral to its operation. You cannot disable or remove these:

| Path         | Purpose                                                      |
| ------------ | ------------------------------------------------------------ |
| `auth/`      | Configure and manage authentication methods                  |
| `cubbyhole/` | Token-scoped private key/value storage                       |
| `identity/`  | Manage identity entities, groups, and aliases                |
| `secret/`    | Default KV v2 secrets engine in development mode             |
| `sys/`       | System backend for policies, audit devices, and mount points |

![The image is a slide titled "Vault Paths," explaining that Vault components can be enabled at any path with a default path option, and lists system reserved paths with descriptions.](https://kodekloud.com/kk-media/image/upload/v1752878230/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Architecture-and-Pathing-Structure/vault-paths-components-reserved-paths.jpg)

> [!important]
> **Warning**
>
> In production, Vault does **not** enable the `secret/` KV v2 engine by default. Always explicitly enable and configure the KV engine paths you need.

## Links and References

- [Vault Architecture Overview (HashiCorp Docs)](https://www.vaultproject.io/docs/architecture)
- [Vault HTTP API](https://www.vaultproject.io/api-docs)
- [Secrets Engines](https://www.vaultproject.io/docs/secrets)
- [Authentication Methods](https://www.vaultproject.io/docs/auth)
- [Audit Devices](https://www.vaultproject.io/docs/audit)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/f544757d-0901-47a3-a0e6-d9ab7822ef7a/lesson/33616e2d-9ef3-410a-96a4-3a27534899bb)**
>
> Watch video content
