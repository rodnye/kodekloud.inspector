# KeyValue Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/KeyValue-Secrets-Engine)

---

## Table of Contents

- KeyValue Secrets Engine
  - How to Store Secrets as Key/Value Pairs
  - Organizing a KV Engine Hierarchy
  - Enabling and Listing KV Version 1
  - Enabling and Listing KV Version 2
  - Upgrading a KV v1 Engine to v2
  - Understanding KV v2 Metadata and Path Prefixes
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# KeyValue Secrets Engine

In this guide, we’ll explore the Key/Value (KV) Secrets Engine in Vault, focusing on what Operations Professionals need to know. The KV Secrets Engine is ideal for storing **static secrets**—such as service-account passwords or API keys—that are generated outside Vault. While Vault also offers powerful dynamic credentials, static secrets remain ubiquitous in many environments.

Vault supports two flavors of the KV Secrets Engine:

- **Version 1**: A simple, non-versioned store.
- **Version 2**: A fully versioned store, tracking metadata (creation time, version number, deletion status, etc.).

Secrets can be accessed via the UI, CLI, or API. Access control is enforced by Vault policies that grant specific capabilities (`create`, `read`, `update`, `delete`) on defined paths. All data at rest is encrypted using AES-256. You can mount multiple KV engines at unique paths to isolate workloads.

![The image is a slide about the Key/Value Secrets Engine, explaining how it can be enabled at different paths, stores secrets as key-value pairs, and requires specific capabilities for writing and updating secrets.](https://kodekloud.com/kk-media/image/upload/v1752878473/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-KeyValue-Secrets-Engine/key-value-secrets-engine-slide.jpg)

---

## How to Store Secrets as Key/Value Pairs

To write secrets, choose a mount path and supply your key/value pairs. For example, after enabling the KV engine at `secret/`:

```
vault write secret/applications/web01 \
  user=dbadmin \
  password=P@ssw0rd \
  api=b93md83mdmapw
```

- **create** capability is required when writing to a new path.
- **update** capability is required for overwriting an existing secret.

> [!important]
> **Note**
>
> Ensure your Vault policies explicitly grant `create` and `update` permissions on the exact path (e.g., `secret/applications/web01`) or via wildcards (e.g., `secret/applications/*`).

---

## Organizing a KV Engine Hierarchy

Suppose you mount a KV engine at `apps/`. You can structure environments like this:

- `apps/AWS/prod` – Production credentials
- `apps/AWS/dev` – Development certificates

Example writes:

```
vault write apps/AWS/prod \
  user=dbadmin \
  password=P@ssw0rd \
  api=b93md83mdmapw

vault write apps/AWS/dev \
  cert='---BEGIN CERTI...' \
  key='---BEGIN PRIVA...'
```

You can also manage KV engines via the CLI.

---

## Enabling and Listing KV Version 1

```
# Enable a KV v1 engine at the default path kv/
vault secrets enable kv

# Enable a KV v1 engine at a custom path hcvop/
vault secrets enable -path=hcvop kv

# List all secrets engines with detailed info
vault secrets list --detailed
```

| Path       | Plugin    | Accessor          | Options   |
| ---------- | --------- | ----------------- | --------- |
| cubbyhole/ | cubbyhole | cubbyhole\\\_\\\* | map\\[\\] |
| kv/        | kv        | kv\\\_\\\*        | map\\[\\] |
| hcvop/     | kv        | kv\\\_\\\*        | map\\[\\] |

> [!important]
> **Note**
>
> An empty `map[]` under **Options** indicates a KV v1 store.

---

## Enabling and Listing KV Version 2

You can enable KV v2 with either shorthand or an explicit version flag.

Method 1 (shorthand):

```
vault secrets enable kv-v2
```

Method 2 (explicit):

```
vault secrets enable -path=training -version=2 kv
```

Re-run the listing:

```
vault secrets list --detailed
```

| Path       | Plugin    | Accessor          | Options            |
| ---------- | --------- | ----------------- | ------------------ |
| cubbyhole/ | cubbyhole | cubbyhole\\\_\\\* | map\\[\\]          |
| kv-v2/     | kv        | kv\\\_\\\*        | map\\[version:2\\] |
| training/  | kv        | kv\\\_\\\*        | map\\[version:2\\] |

> [!important]
> **Note**
>
> The `map[version:2]` entry marks a KV v2 store.

---

## Upgrading a KV v1 Engine to v2

You can convert an existing KV v1 mount to version 2. Be aware this action is **irreversible** without restoring from backup.

> [!important]
> **Warning**
>
> Upgrading to KV v2 cannot be undone. Ensure you have a backup of your Vault data before proceeding.

```
vault kv enable-versioning training/
# Success! Tuned the secrets engine at: training/
```

---

## Understanding KV v2 Metadata and Path Prefixes

KV v2 tracks detailed metadata (creation date, version, deletion status, custom fields) for every secret. To support versioning, KV v2 introduces two API path prefixes:

- **data/** – Stores the secret data
- **metadata/** – Stores the versioning metadata

![The image explains how KV V2 is different by adding metadata to key-value entries for versioning, introducing two prefixes: "cloud/data" for storing actual data and "cloud/metadata" for storing metadata about a secret. It also features a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878474/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-KeyValue-Secrets-Engine/kv-v2-metadata-versioning-diagram.jpg)

For a KV v2 engine mounted at `cloud/` with a secret path `apps/AWS/network`:

- Data path: `cloud/data/apps/AWS/network`
- Metadata path: `cloud/metadata/apps/AWS/network`

![The image explains the structure of KV V2, showing a hierarchy of paths for storing secrets in a cloud environment, with a specific path format and a "data/" prefix for reading secrets. It also features a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878475/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-KeyValue-Secrets-Engine/kv-v2-structure-secrets-cloud-diagram.jpg)

When working with the API or writing policies, you must include the `data/` and `metadata/` prefixes. The `vault kv` CLI commands automatically handle these prefixes for you:

![The image provides information about KV V2, highlighting that the `data/` and `metadata/` prefixes are required for API and Vault policies, but it does not change CLI interactions. It also features a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878477/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-KeyValue-Secrets-Engine/kv-v2-api-metadata-cli-interactions.jpg)

---

## Next Steps

You’re now ready to get hands-on with KV v1 and KV v2 in Vault. Practice writing policies, making API calls, and exploring the versioning features to master static secret management.

## Links and References

- [Vault KV Secrets Engine Documentation](https://www.vaultproject.io/docs/secrets/kv)
- [Vault Policies Guide](https://www.vaultproject.io/docs/concepts/policies)
- [Vault CLI Documentation](https://www.vaultproject.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/d1ee3cbb-649f-4986-83e6-d5acbbb94658)**
>
> Watch video content
