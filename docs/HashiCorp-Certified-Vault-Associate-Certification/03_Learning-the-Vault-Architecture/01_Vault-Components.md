# Vault Components - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Learning-the-Vault-Architecture/Vault-Components)

---

## Table of Contents

- Vault Components
  - Storage Backends
  - Secrets Engines
  - Auth Methods
  - Audit Devices
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Learning the Vault Architecture

# Vault Components

Understand the four pillars that power HashiCorp Vault: Storage Backends, Secrets Engines, Auth Methods, and Audit Devices. Mastering these will enable you to deploy and manage Vault securely and at scale.

---

## Storage Backends

Vault stores all its data—keys, secrets, configuration—in a single, pluggable Storage Backend. This includes:

- **Encryption in Transit**: TLS secures data as it moves.
- **Encryption at Rest**: AES-256 encrypts data on disk.

> [!important]
> **Note**
>
> A Vault cluster can be configured with exactly one storage backend. For high availability or geo-replication, run multiple clusters with distinct backends.

| Backend   | High Availability | Key Features                             |
| --------- | ----------------- | ---------------------------------------- |
| Consul    | Yes               | Native snapshots, leader election        |
| DynamoDB  | Yes               | Point-in-time recovery, horizontal scale |
| File / S3 | Depends           | Simple setup, manual backup required     |

The chosen backend is declared in `vault.hcl` under the `storage` stanza. Each backend type has its own set of configuration parameters.

![The image is a slide titled "Storage Backends," explaining the configuration and encryption of Vault data storage, highlighting differences in backend capabilities, and noting that only one storage backend is used per Vault cluster.](https://kodekloud.com/kk-media/image/upload/v1752878231/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Components/storage-backends-vault-configuration-encryption.jpg)

---

## Secrets Engines

Secrets Engines are responsible for managing or generating secrets. You mount them at specific paths and interact via API, CLI, or integrations.

| Engine Type    | Use Case                                           |
| -------------- | -------------------------------------------------- |
| KV (Key/Value) | Store and retrieve static secrets                  |
| Database       | Generate dynamic database credentials              |
| AWS / GCP      | Provision cloud IAM credentials dynamically        |
| Transit        | Perform cryptographic operations (encrypt/decrypt) |

> [!important]
> **Note**
>
> Secrets Engines are isolated by mount path. You can enable multiple instances of the same engine under different paths for segmentation.

Enable an engine with:

```
vault secrets enable <engine_type>
```

Then configure it via its API endpoints.

![The image is a slide titled "Secrets Engines," explaining their role in managing secrets, storing, generating, and encrypting data, and their ability to connect to services for dynamic credentials. It also mentions enabling multiple engines and interactions through a "path."](https://kodekloud.com/kk-media/image/upload/v1752878233/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Components/secrets-engines-managing-storing-data.jpg)

---

## Auth Methods

Auth Methods connect external identity systems to Vault, authenticate clients, and issue tokens scoped by policies.

| Category        | Examples                       |
| --------------- | ------------------------------ |
| Human-centric   | LDAP, OIDC, Username/Password  |
| Machine-centric | AppRole, Kubernetes, TLS Certs |

Vault ships with the **token** auth method by default, providing the initial root token for setup.

> [!important]
> **Note**
>
> The root token from initialization should be used sparingly. Rotate or revoke it after enabling safer auth methods.

Enable a new auth method with:

```
vault auth enable <method_name>
```

Then configure it using its dedicated API paths.

![The image is a slide titled "Auth Methods," explaining Vault's authentication components, identity management, and token issuance. It highlights the differentiation between human and system methods, the goal of obtaining a token, and the default authentication method for new deployments.](https://kodekloud.com/kk-media/image/upload/v1752878235/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Components/auth-methods-vault-authentication-slide.jpg)

---

## Audit Devices

Audit Devices capture every Vault request and response in JSON format. They ensure full accountability and tamper-proof logging by hashing sensitive fields.

- **Mandatory Logging**: Requests only succeed once written to at least one audit device.
- **Multiple Devices**: Enable file, syslog, socket, or other endpoints simultaneously.
- **JSON Output**: Simplifies integration with SIEM and log analysis tools.

> [!important]
> **Warning**
>
> If an audit device becomes unavailable (disk full, network failure), Vault will block operations to maintain audit integrity.

Configure an audit device with:

```
vault audit enable <device_type>
```

Then adjust its settings via the audit API.

![The image is a slide titled "Audit Devices," detailing features such as logging requests and responses, using JSON formatting, hashing sensitive information, enabling multiple audit devices, and prioritizing safety over availability.](https://kodekloud.com/kk-media/image/upload/v1752878236/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Components/audit-devices-logging-json-hashing.jpg)

---

- [Vault Storage Backends](https://www.vaultproject.io/docs/configuration/storage)
- [Vault Secrets Engines](https://www.vaultproject.io/docs/secrets)
- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)
- [Vault Audit Devices](https://www.vaultproject.io/docs/audit)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/f544757d-0901-47a3-a0e6-d9ab7822ef7a/lesson/0784516b-1e4e-4c80-942e-b762ea3dd7a2)**
>
> Watch video content
