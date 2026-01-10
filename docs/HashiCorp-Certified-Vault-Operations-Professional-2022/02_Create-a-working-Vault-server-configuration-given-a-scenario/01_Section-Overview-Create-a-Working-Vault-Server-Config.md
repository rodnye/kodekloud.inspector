# Section Overview Create a Working Vault Server Config - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Section-Overview-Create-a-Working-Vault-Server-Config)

---

## Table of Contents

- Section Overview Create a Working Vault Server Config
  - Available Secrets Engines
  - Generic Secrets Engine Features
  - Enabling Secrets Engines
  - Enabling via UI
  - References
  - Watch Video
    - CLI: vault secrets
    - Custom Path & Description
      - Example: Listing Secrets Engines

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Section Overview Create a Working Vault Server Config

In this lesson, you’ll learn how to build a production-ready Vault server setup. We’ll walk through:

- Launching Vault and managing its configuration files
- Enabling and tuning Secrets Engines
- Auto-unseal and Integrated Storage
- Configuring authentication methods
- Secure initialization, root token regeneration, and key rotation

![The image is an objective overview for creating a working Vault server configuration, listing tasks such as enabling secret engines, practicing production hardening, and configuring authentication methods. It includes a certification badge and a cartoon character illustration.](https://kodekloud.com/kk-media/image/upload/v1752878491/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Section-Overview-Create-a-Working-Vault-Server-Config/vault-server-configuration-overview-illustration.jpg)

Each of these steps is essential for a resilient, compliant Vault deployment. Let’s start by enabling and configuring the Secrets Engines.

---

## Available Secrets Engines

Vault supports a wide range of Secrets Engines for cloud providers, directories, databases, and more. While Vault can integrate with AWS, Azure, GCP, Active Directory, and others, our focus will be on the core, cross-platform engines:

| Secrets Engine | Use Case                                |
| -------------- | --------------------------------------- |
| Cubbyhole      | Per-token secret storage (built-in)     |
| Database       | Dynamic credentials for databases       |
| Key/Value (KV) | Generic storage (v1 vs. v2 versioning)  |
| Identity       | Vault’s identity store (built-in)       |
| PKI            | X.509 certificate issuance              |
| Transit        | Data encryption and auto-unseal support |

![The image lists various "Available Secrets Engines" such as Active Directory, AWS, Google Cloud, and more, with a Vault certification badge in the corner.](https://kodekloud.com/kk-media/image/upload/v1752878492/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Section-Overview-Create-a-Working-Vault-Server-Config/available-secrets-engines-vault-badge.jpg)

---

## Generic Secrets Engine Features

Vault’s generic engines share powerful capabilities:

- **Database Secrets Engine**  
  Manage credentials for MySQL, PostgreSQL, Oracle, and more via a single plugin-based engine.
- **Key/Value (KV) Secrets Engine**  
  KV v2 adds versioning and metadata on top of the simple key/value store.
- **PKI Secrets Engine**  
  Issue and revoke X.509 certificates with customizable roles, CA certs, and TTLs.
- **Transit Secrets Engine**  
  Encrypt/decrypt data without storing it, and integrate with Auto Unseal systems.
- **Cubbyhole & Identity Engines**  
  Enabled by default; provide per-token isolated storage and an identity backend.

![The image is a slide about "Generic Secrets Engines," detailing features like database support, Key/Value versions, PKI certificates, and data encryption with Transit. It includes a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878493/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Section-Overview-Create-a-Working-Vault-Server-Config/generic-secrets-engines-features-slide.jpg)

---

## Enabling Secrets Engines

By default, `cubbyhole/` and `identity/` are mounted. All other engines must be enabled at a unique mount path.

> [!important]
> **Note**
>
> Vault’s `cubbyhole/` and `identity/` engines are mounted by default and cannot be disabled.

You interact with each engine via its mount path:

- **Default mount**: use the engine type (e.g., `aws/`, `kv/`).
- **Custom mount**: choose any path (e.g., `team1-db/`).

![The image is a slide about enabling secrets engines, explaining that Cubbyhole and Identity are enabled by default, while others must be enabled using CLI, API, or UI. It also mentions that secrets engines are isolated at unique paths, which do not need to match the engine's name or type.](https://kodekloud.com/kk-media/image/upload/v1752878494/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Section-Overview-Create-a-Working-Vault-Server-Config/secrets-engines-cubbyhole-identity-enabled.jpg)

### CLI: vault secrets

Vault’s primary CLI for secrets engines:

| Command               | Description                           |
| --------------------- | ------------------------------------- |
| vault secrets enable  | Enable a new secrets engine           |
| vault secrets disable | Disable an existing mount             |
| vault secrets list    | Show enabled engines                  |
| vault secrets move    | Change an engine’s mount path         |
| vault secrets tune    | Adjust engine parameters (e.g., TTLs) |

```
$ vault secrets enable aws
Success! Enabled the aws secrets engine at: aws/


$ vault secrets tune -default-lease-ttl=72h pki/
Success! Tuned the pki secrets engine at: pki/


$ vault secrets disable aws/
Success! Disabled the secrets engine at: aws/


$ vault secrets list
Path        Type        Accessor         Description
----        ----        --------         -----------
cubbyhole/  cubbyhole   cubbyhole_...    per-token private secret storage
identity/   identity    identity_...     identity store
pki/        pki         pki_...          n/a
```

For detailed output (including KV version), use:

```
$ vault secrets list -detailed
```

> [!important]
> **Warning**
>
> Always choose a unique mount path to prevent conflicts when enabling multiple secrets engines.

### Custom Path & Description

You can customize both the mount path and its metadata:

```
$ vault secrets enable \
    -path="cloud-kv" \
    -description="Team A Key/Value Store" \
    kv-v2
```

- `-path="cloud-kv"`: custom mount point
- `-description="Team A Key/Value Store"`: shown in `vault secrets list`
- `kv-v2`: engine type (Key/Value version 2)

#### Example: Listing Secrets Engines

```
$ vault secrets list
Path            Type        Accessor            Description
----            ----        --------            -----------
aws/            aws         aws_dafa7adc        n/a
cloud-kv/       kv          kv_fa270a3f         Team A Key/Value Store
cubbyhole/      cubbyhole   cubbyhole_88c8e2e3  per-token private secret storage
identity/       identity    identity_e60e93cb   identity store
pki/            pki         pki_123456ab        n/a
transit/        transit     transit_7b8038ca    n/a
```

_Note_: KV engines always show as `kv` in `vault secrets list`; the version is visible with `-detailed`.\*

---

## Enabling via UI

In the Vault UI, go to **Secrets** → **Enable new engine**. Select the engine type, configure options, and mount it—all in one guided flow.

![The image is a user interface screenshot showing a list of enabled secrets engines, with an option to enable additional ones. It includes labels and annotations for clarity, and features a cartoon character at the bottom right.](https://kodekloud.com/kk-media/image/upload/v1752878496/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Section-Overview-Create-a-Working-Vault-Server-Config/secrets-engines-ui-screenshot-cartoon.jpg)

---

With your Secrets Engines enabled and tuned, you’re now prepared to dive into the Key/Value Secrets Engine details—exploring data versioning, access control, and best practices.

## References

- [Vault CLI Commands](https://www.vaultproject.io/docs/commands/secrets)
- [Vault Concepts](https://www.vaultproject.io/docs/concepts)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/b799d1ad-2e72-4cd7-baef-99960fa753b1)**
>
> Watch video content
