# Demo KeyValue Secrets Engine Version 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Demo-KeyValue-Secrets-Engine-Version-2)

---

## Table of Contents

- Demo KeyValue Secrets Engine Version 2
  - 1. List Existing Secrets Engines
  - 2. Upgrade an Existing KV v1 Mount to KV v2
  - 3. Enable a New KV v2 Engine
  - 4. Writing and Reading Versioned Secrets
  - 5. Versioning Secrets
  - 6. Soft Delete and Undelete
  - 7. Hard Delete (Destroy)
  - 8. Metadata Operations
  - 9. JSON Output and Filtering
  - 10. Cleanup: Delete All Metadata
  - 11. KV v2 Prefixes in ACL Policies
  - 12. Managing Secrets via the Web UI
  - 13. Accessing KV v2 via the HTTP API
  - References
  - Watch Video
    - 4.1 Write a Secret
    - 4.2 Read the Latest Version
    - 6.1 Soft Delete
    - 6.2 Undelete
    - 8.1 View All Metadata
    - 8.2 Add Custom Metadata

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Demo KeyValue Secrets Engine Version 2

In this guide, we’ll dive into HashiCorp Vault’s Key/Value (KV) Secrets Engine Version 2. You’ll learn how to:

- List and inspect enabled secrets engines
- Upgrade a KV v1 mount to KV v2
- Enable a brand-new KV v2 engine
- Write, read, and version secrets
- Perform soft deletes (undelete) and hard deletes (destroy)
- Manage metadata and custom metadata
- Configure KV v2 prefixes in ACL policies
- Interact with KV v2 via the HTTP API

We’ll cover both the CLI and the Vault web UI to give you a complete picture of versioned secret management.

---

## 1\. List Existing Secrets Engines

First, verify which engines are enabled:

```
vault secrets list
```

Example output:

```
Path          Type       Accessor         Description
----          ----       --------         -----------
cubbyhole/    cubbyhole  cubbyhole_xyz    per-token private secret storage
identity/     identity   identity_abc     identity store
sys/          system     system_def       system endpoints used for control, policy, and debugging
training/     kv         kv_12345         n/a
transit/      transit    transit_67890    n/a
```

By default, the `training/` mount is KV v1.

| Path       | Type      | Description                        |
| ---------- | --------- | ---------------------------------- |
| cubbyhole/ | cubbyhole | Per-token private secret storage   |
| identity/  | identity  | Identity data store                |
| sys/       | system    | System control endpoints           |
| training/  | kv (v1)   | Default KV v1 mount                |
| transit/   | transit   | Encryption/decryption as a service |

See [Vault CLI documentation](https://www.vaultproject.io/docs/commands/secrets) for more on the `vault secrets list` command.

---

## 2\. Upgrade an Existing KV v1 Mount to KV v2

To enable versioning on the existing `training/` mount:

1.  Inspect the mount in detail:

    ```
    vault secrets list --detailed
    ```

2.  Enable versioning:

    ```
    vault kv enable-versioning training/
    ```

3.  Confirm the mount now uses KV v2:

    ```
    vault secrets list --detailed
    ```

You should see `options: {version: 2}` for the `training/` path.

> [!important]
> **Note**
>
> Upgrading to v2 is non-destructive. All existing KV v1 data remains accessible under the new KV v2 mount.

---

## 3\. Enable a New KV v2 Engine

To create a fresh KV v2 mount at `kvv2/`:

```
vault secrets enable -path=kvv2 kv-v2
```

Verify:

```
vault secrets list
```

Look for `kvv2/` with `type: kv` and `options: {version: 2}`.

---

## 4\. Writing and Reading Versioned Secrets

### 4.1 Write a Secret

```
vault kv put kvv2/apps/circleci admin=password
```

Output example:

```
==== Secret Path ====
kvv2/data/apps/circleci
==== Metadata ======
Key             Value
created_time    2022-03-25T14:18:15.817666Z
custom_metadata <nil>
deletion_time   n/a
destroyed       false
version         1
```

> [!important]
> **Note**
>
> The CLI automatically prepends `/data/` when writing, so you only specify `kvv2/apps/circleci`.

### 4.2 Read the Latest Version

```
vault kv get kvv2/apps/circleci
```

```
==== Secret Path ====
kvv2/data/apps/circleci


==== Metadata ====
Key             Value
created_time    2022-03-25T14:18:15.817666Z
version         1


==== Data ====
Key     Value
admin   password
```

---

## 5\. Versioning Secrets

Update to create version 2:

```
vault kv put kvv2/apps/circleci admin=P@ssw0rd!
```

Retrieve specific versions:

```
vault kv get -version=1 kvv2/apps/circleci   # Version 1
vault kv get kvv2/apps/circleci             # Latest (Version 2)
```

---

## 6\. Soft Delete and Undelete

### 6.1 Soft Delete

```
vault kv delete kvv2/apps/circleci
```

Now, `vault kv get kvv2/apps/circleci` shows metadata without data.

### 6.2 Undelete

```
vault kv undelete --versions=2 kvv2/apps/circleci
vault kv get kvv2/apps/circleci
```

Version 2 is restored and data is visible again.

---

## 7\. Hard Delete (Destroy)

Permanently remove version 1:

```
vault kv destroy --versions=1 kvv2/apps/circleci
```

Reading that version now shows `destroyed = true`; it cannot be undeleted.

> [!important]
> **Warning**
>
> Destroying versions is irreversible. Always ensure you have backups or retention policies if you need historic data.

---

## 8\. Metadata Operations

### 8.1 View All Metadata

```
vault kv metadata get kvv2/apps/circleci
```

You’ll see:

- `cas_required`
- `current_version`
- `max_versions`
- Per-version status (created, deleted, destroyed)

### 8.2 Add Custom Metadata

```
vault kv metadata put kvv2/apps/circleci custom1=foo custom2=bar
```

Reading the secret shows your custom key-value pairs under **Metadata**.

---

## 9\. JSON Output and Filtering

Fetch JSON and parse with `jq`:

```
vault kv get -format=json kvv2/apps/circleci \
  | jq -r '.data.metadata.custom2'
# Output: bar
```

This is useful for automation and CI pipelines.

---

## 10\. Cleanup: Delete All Metadata

To remove both data and metadata for a secret path:

```
vault kv metadata delete kvv2/apps/circleci
```

Running `vault kv list kvv2/apps` now returns nothing.

---

## 11\. KV v2 Prefixes in ACL Policies

When you write ACL policies for KV v2, include both `data/` and `metadata/` paths:

```
path "kvv2/data/apps/artifactory" {
  capabilities = ["read"]
}


path "kvv2/metadata/apps/artifactory" {
  capabilities = ["read", "list"]
}
```

---

## 12\. Managing Secrets via the Web UI

Vault’s UI offers point-and-click management for KV v2 secrets:

**Browse secrets and create a new entry**  
Click **Secrets > kvv2** and select **Create secret**.  
![The image shows a web interface for managing secrets in HashiCorp Vault, with options for "azuredevops" and "jenkins" under the "training" section. The interface includes a search bar and a "Create secret" button."](https://kodekloud.com/kk-media/image/upload/v1752878427/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-KeyValue-Secrets-Engine-Version-2/hashicorp-vault-secrets-management-interface.jpg)

**Enter secret data**  
Provide `artifact = "jenkins"` or other key-value pairs, then save.  
![The image shows a web interface for creating a secret in HashiCorp Vault, with fields for specifying the secret path and data. There are options to save or cancel the entry."](https://kodekloud.com/kk-media/image/upload/v1752878427/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-KeyValue-Secrets-Engine-Version-2/hashicorp-vault-secret-creation-interface.jpg)

**View stored JSON**  
Select the secret to see its JSON key-value data.  
![The image shows a web interface for HashiCorp Vault, displaying a secret stored under the path "apps/artifactory" with a JSON key-value pair. The secret's value is obscured for security."](https://kodekloud.com/kk-media/image/upload/v1752878428/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-KeyValue-Secrets-Engine-Version-2/hashicorp-vault-web-interface-secret-json.jpg)

**Create an ACL policy**  
Under **Policies**, click **Create policy**, enter a name and HCL, then save.  
![The image shows a user interface for creating an ACL policy, with fields for entering a name and policy details, and options to create or cancel the policy."](https://kodekloud.com/kk-media/image/upload/v1752878429/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-KeyValue-Secrets-Engine-Version-2/acl-policy-creation-user-interface.jpg)

---

## 13\. Accessing KV v2 via the HTTP API

To retrieve secret data over HTTP, include `/data/` in the path:

```
curl --header "X-Vault-Token: $VAULT_TOKEN" \
     http://127.0.0.1:8200/v1/kvv2/data/apps/artifactory \
  | jq
```

Response:

```
{
  "request_id": "...",
  "data": {
    "data": {
      "artifact": "jenkins"
    },
    "metadata": {
      "created_time": "...",
      "version": 1
    }
  }
}
```

For KV v1 mounts, omit the `/data/` prefix.

---

## References

- [Vault KV Secrets Engine v2](https://www.vaultproject.io/docs/secrets/kv/kv-v2)
- [Vault CLI Commands](https://www.vaultproject.io/docs/commands)
- [Vault HTTP API](https://www.vaultproject.io/api-docs)

That wraps up our deep dive into the KV v2 engine. Enjoy secure, versioned secret management with HashiCorp Vault!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/778922e5-1ae1-4bbf-accb-b2bb7d08bee5)**
>
> Watch video content
