# Enable and Configure Secrets Engines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Enable-and-Configure-Secrets-Engines)

---

## Table of Contents

- Enable and Configure Secrets Engines
  - What Are Secrets Engines?
  - Generic Secrets Engines
  - Enabling Secrets Engines
  - Enabling Engines via UI
  - Next Steps
  - Links and References
  - Watch Video
    - Enable with Vault CLI
    - Sample Output

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Enable and Configure Secrets Engines

Secrets Engines are the heart of HashiCorp Vault, providing dynamic secrets, encryption, identity management, and more. In this guide, we’ll explore how to enable, configure, and manage Vault’s Secrets Engines—both generic and cloud-integrated—using the Vault CLI, API, and UI.

- What are Vault Secrets Engines?
- Generic vs. Cloud-Integrated Engines
- Enabling Engines with CLI
- Enabling Engines via UI
- Next Steps

## What Are Secrets Engines?

Vault Secrets Engines enable integration with external platforms and back-end systems by generating dynamic secrets, certificates, encryption, and identity data. While Vault supports a wide range of cloud providers and services, this tutorial focuses on the core generic engines tested in the HashiCorp Certified Vault Operations Professional exam.

![The image lists various "Available Secrets Engines" related to Vault, including services like AWS, Google Cloud, and MongoDB Atlas. It also features a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878445/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Secrets-Engines/available-secrets-engines-vault-services.jpg)

## Generic Secrets Engines

Vault’s generic Secrets Engines do not require deep expertise in external platforms. These are commonly used across environments and covered in Vault certification:

![The image is a slide about "Generic Secrets Engines," detailing features like database support, Key/Value versions, PKI certificates, and data encryption with Transit. It includes a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878446/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Secrets-Engines/generic-secrets-engines-features-slide.jpg)

| Engine     | Function                          | Key Features                                    |
| ---------- | --------------------------------- | ----------------------------------------------- |
| Database   | Dynamic database credentials      | 13+ platforms (MySQL, PostgreSQL, Oracle, etc.) |
| KV (v1/v2) | Key/Value storage                 | v1 (simple) & v2 (versioned, metadata)          |
| PKI        | Certificate issuance & management | X.509/TLS certificates                          |
| Transit    | Encryption-as-a-Service           | Data encryption, auto-unseal                    |
| Cubbyhole  | Per-token private secret storage  | Enabled by default                              |
| Identity   | Identity data storage             | Enabled by default                              |

## Enabling Secrets Engines

Engines can be enabled at a custom mount path using the Vault CLI, API, or UI. The UI offers a simple way to enable common engines, but some advanced configurations require CLI or API.

![The image is a slide about enabling secrets engines, detailing default settings, enabling methods, and path configurations. It includes a Vault certification badge and a cartoon character illustration.](https://kodekloud.com/kk-media/image/upload/v1752878447/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Secrets-Engines/enabling-secrets-engines-vault-slide.jpg)

> [!important]
> **Naming Best Practices**
>
> Use meaningful mount paths (e.g., `prod-db/` or `teams/cloud-kv/`) to simplify management and auditing.

### Enable with Vault CLI

The `vault secrets` command suite manages engine lifecycle:

- `enable`: Mount a new engine
- `disable`: Unmount an engine
- `list`: View enabled engines
- `move`: Rename or relocate a mount path
- `tune`: Adjust engine settings (TTLs, descriptions)

```
# Enable AWS Secrets Engine at default path
vault secrets enable aws


# Disable the AWS Secrets Engine
vault secrets disable aws


# List all enabled Secrets Engines
vault secrets list


# Move a Secrets Engine to a new mount path
vault secrets move new-path/ old-path/


# Tune PKI engine default lease TTL to 72 hours
vault secrets tune -default-lease-ttl=72h pki/


# Enable KV v2 at custom path with description
vault secrets enable \
  --path="cloud-kv" \
  --description="My Secrets Engine" \
  kv-v2


# View detailed mount information
vault secrets list --detailed
```

### Sample Output

```
Path             Type          Accessor                Description
----             ----          ---------               -----------
aws/             aws           aws_dafa7adc            n/a
azure/           aws           aws_1a214ff6            n/a
vault-ops-pro/   kv            kv_28b1ceaa             Earn Your HCVOP Certification
cloud-team-kv/   kv            kv_fa270a3f             n/a
cubbyhole/       cubbyhole     cubbyhole_88c8e2e3      per-token private secret storage
dev-team-kv/     kv            kv_55c319c4             n/a
identity/        identity      identity_e60e93cb       identity store
kv-v2/           kv            kv_eea3206c             n/a
sys/             system        system_66b0d8ee         system endpoints used for control
transit/         transit       transit_7b8038ca        n/a
```

> [!important]
> **Permissions Required**
>
> Ensure your Vault token has the `root` policy or appropriate `sys/mount` and `sys/cap` capabilities to enable and configure Secrets Engines.

## Enabling Engines via UI

1.  Open the Vault UI and navigate to the **Secrets** tab.
2.  Click **Enable New Secrets Engine**.
3.  Select an engine type, configure the mount path and options, then click **Save**.
4.  For engines not fully supported in the UI, switch to the CLI or API for advanced settings.

![The image is a screenshot of a user interface for enabling secrets engines, showing a list of already enabled engines and an option to add more. It includes annotations and a cartoon character in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878448/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Secrets-Engines/secrets-engines-ui-screenshot-annotations.jpg)

## Next Steps

Now that you’ve learned how to enable and manage Vault Secrets Engines, the next sections will dive deeper into configuring each engine:

1.  Key/Value (KV) Secrets Engine
2.  Database Secrets Engine
3.  Public Key Infrastructure (PKI)
4.  Transit Secrets Engine
5.  Identity and Cubbyhole Engines

Stay tuned to master dynamic secrets, encryption, and certificate automation in HashiCorp Vault.

## Links and References

- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)
- [Vault CLI Commands](https://www.vaultproject.io/docs/commands/secrets)
- [HashiCorp Learn: Vault Secrets Engines](https://learn.hashicorp.com/collections/vault/secrets)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/0aa8745e-4c7d-4213-9c38-b099d71c6c8e)**
>
> Watch video content
