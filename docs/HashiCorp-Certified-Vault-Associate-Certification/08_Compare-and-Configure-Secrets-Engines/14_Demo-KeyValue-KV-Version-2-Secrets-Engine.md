# Demo KeyValue KV Version 2 Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-and-Configure-Secrets-Engines/Demo-KeyValue-KV-Version-2-Secrets-Engine)

---

## Table of Contents

- Demo KeyValue KV Version 2 Secrets Engine
  - 1. List Existing Secrets Engines
  - 2. Upgrade an Existing KV v1 Mount to KV v2
  - 3. Enable a New KV v2 Mount
  - 4. Write and Read Versioned Secrets
  - 5. Delete, Undelete, and Destroy Versions
  - 6. View and Tune Metadata
  - 7. Fully Delete a Secret Path
  - 8. Vault UI: Create and Manage Secrets
  - 9. Writing Policies for KV v2
  - 10. Calling the HTTP API
  - Conclusion
  - Links and References
  - Watch Video
    - 2.1 Check Mount Details
    - 2.2 Enable Versioning on the Mount
    - 4.1 Write a Secret
    - 4.2 Update the Secret
    - 4.3 Read the Latest Version
    - 4.4 Read a Specific Version
    - 5.1 Delete the Latest Version
    - 5.2 Undelete a Version
    - 5.3 Destroy a Version Permanently
    - 6.1 Show Metadata for a Path
    - 6.2 Set Custom Metadata
      - Query Metadata via JSON & jq

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare and Configure Secrets Engines

# Demo KeyValue KV Version 2 Secrets Engine

In this guide, we’ll walk through using the HashiCorp Vault Key/Value Version 2 (KV v2) Secrets Engine. You’ll learn how to:

- Upgrade an existing KV v1 mount to KV v2
- Enable a new KV v2 mount
- Write, read, and manage versioned secrets
- Delete, undelete, and destroy secret versions
- View and configure metadata (including custom metadata)
- Define policies for KV v2 (data/ and metadata/ prefixes)
- Interact with the Vault HTTP API for KV v2

---

## 1\. List Existing Secrets Engines

First, verify which secrets engines are currently enabled:

```
$ vault secrets list
Path         Type      Accessor             Description
----         ----      --------             -----------
cubbyhole/   cubbyhole cubbyhole_9c6c2ca2   per-token private secret storage
identity/    identity  identity_e55fbf01     identity store
sys/         system    system_ae43616e       system endpoints for control, policy, and debugging
training/    kv        kv_1131683            n/a
transit/     transit   transit_5b3af5e       n/a
```

Here, `training/` is mounted as KV v1. Let’s upgrade it to KV v2.

---

## 2\. Upgrade an Existing KV v1 Mount to KV v2

### 2.1 Check Mount Details

```
$ vault secrets list --detailed
Path       Plugin  Accessor      Default TTL  Max TTL  Options  Description
----       ------  --------      -----------  -------  -------  -----------
training/  kv      kv_1d131683   n/a          n/a      map[]    n/a
```

The `training/` mount shows `kv_1d131683`, indicating version 1.

### 2.2 Enable Versioning on the Mount

```
$ vault kv enable-versioning training/
Success! Tuned the secrets engine at: training/
```

Verify that versioning is now enabled:

```
$ vault secrets list --detailed
Path       Plugin  Accessor      Options        Description
----       ------  --------      -------        -----------
training/  kv      kv_1d131683   map[version:2] n/a
```

---

## 3\. Enable a New KV v2 Mount

To start fresh with a KV v2 mount (for example, at `kvv2/`):

```
$ vault secrets enable -path=kvv2 kv-v2
Success! Enabled the kv-v2 secrets engine at: kvv2/
```

Confirm the new mount:

```
$ vault secrets list
Path       Type    Accessor       Description
----       ----    --------       -----------
kvv2/      kv      kv_0559442e    n/a
```

---

## 4\. Write and Read Versioned Secrets

### 4.1 Write a Secret

Create an initial secret for a CircleCI application:

```
$ vault kv put kvv2/apps/circleci admin=password
```

The CLI hides the internal `data/` prefix. You should see:

```
=== Metadata ===
Key              Value
---              -----
created_time     2022-03-25T14:18:15.817666Z
custom_metadata  <nil>
deletion_time    n/a
destroyed        false
version          1
```

### 4.2 Update the Secret

Rotate to a stronger password:

```
$ vault kv put kvv2/apps/circleci admin=P@ssw0rd!
```

A new version (`version 2`) is created.

### 4.3 Read the Latest Version

```
$ vault kv get kvv2/apps/circleci
==== Secret Path ====
kvv2/data/apps/circleci


==== Metadata ====
Key           Value
---           -----
created_time  2022-03-25T14:19:38.741912Z
version       2


==== Data ====
Key    Value
---    -----
admin  P@ssw0rd!
```

### 4.4 Read a Specific Version

```
$ vault kv get -version=1 kvv2/apps/circleci
```

This returns the original (`version 1`) data:

```
admin   password
```

---

## 5\. Delete, Undelete, and Destroy Versions

### 5.1 Delete the Latest Version

```
$ vault kv delete kvv2/apps/circleci
Success! Data deleted (if it existed) at: kvv2/apps/circleci
```

A subsequent `vault kv get kvv2/apps/circleci` shows metadata only—no data—since version 2 is marked deleted.

### 5.2 Undelete a Version

```
$ vault kv undelete --versions=2 kvv2/apps/circleci
Success! Data written to: kvv2/undelete/apps/circleci
```

Now the data is restored:

```
$ vault kv get kvv2/apps/circleci
==== Data ====
Key    Value
---    -----
admin  P@ssw0rd!
```

> [!important]
> **Note**
>
> Undeleting a version does **not** create a new version; it simply unmarks the version as deleted.

### 5.3 Destroy a Version Permanently

> [!important]
> **Warning**
>
> Destroying a version is irreversible. Data cannot be recovered except via backup.

```
$ vault kv destroy --versions=1 kvv2/apps/circleci
Success! Data destroyed for version(s): [1]
```

Now version 1 is permanently gone (`destroyed = true`).

---

## 6\. View and Tune Metadata

### 6.1 Show Metadata for a Path

```
$ vault kv metadata get kvv2/apps/circleci
```

Returns both engine settings and per-version status:

```
cas_required         false
created_time         2022-03-25T14:19:38.741912Z
current_version      2
delete_version_after 0s
max_versions         0
oldest_version       0
updated_time         2022-03-25T14:19:38.741912Z


Version 1: destroyed = true
Version 2: destroyed = false
```

### 6.2 Set Custom Metadata

```
$ vault kv metadata put -custom-metadata=env=prod,team=devops kvv2/apps/circleci
Success! Data written to: kvv2/metadata/apps/circleci
```

Verify in the secret output:

```
$ vault kv get kvv2/apps/circleci
==== Metadata ====
Key              Value
---              -----
custom_metadata  map[env:prod team:devops]
```

#### Query Metadata via JSON & jq

```
$ vault kv get -format=json kvv2/apps/circleci \
    | jq -r '.data.metadata.custom_metadata.env'
prod
```

---

## 7\. Fully Delete a Secret Path

To remove all versions and metadata:

```
$ vault kv metadata delete kvv2/apps/circleci
Success! Data deleted (if it existed) at: kvv2/metadata/apps/circleci
```

After this, both `vault kv list kvv2/apps` and `vault kv get kvv2/apps/circleci` return nothing.

---

## 8\. Vault UI: Create and Manage Secrets

Use the Vault UI for an interactive experience:

> > [!important]
> > **Note**
> >
> > In the Vault UI, navigate to the **kvv2** engine, click **Create secret**, specify the path `apps/artifactory`, enter your key/value pairs, and save.

![The image shows a web interface for creating a secret in HashiCorp Vault, with fields for specifying the path and secret data. There are options to save or cancel the entry.](https://kodekloud.com/kk-media/image/upload/v1752878070/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-KeyValue-KV-Version-2-Secrets-Engine/hashicorp-vault-secret-creation-interface.jpg)

After saving, you can view version history, metadata, delete or copy the secret, or create new versions:

![The image shows a web interface of HashiCorp Vault displaying a secret stored under the path "apps/artifactory" with a hidden value. The interface includes options for managing the secret, such as deleting, copying, and creating new versions.](https://kodekloud.com/kk-media/image/upload/v1752878071/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-KeyValue-KV-Version-2-Secrets-Engine/hashicorp-vault-secret-management-interface.jpg)

---

## 9\. Writing Policies for KV v2

Policies must reference the `data/` and `metadata/` prefixes explicitly:

```
path "kvv2/data/apps/artifactory" {
  capabilities = ["read"]
}


path "kvv2/metadata/apps/artifactory" {
  capabilities = ["read", "list"]
}
```

Requests without the correct prefix will be denied.

---

## 10\. Calling the HTTP API

When using `curl`, include `/v1/<mount>/data/…` and set your token in the header:

```
export VAULT_TOKEN="s.yourRootToken"
curl --header "X-Vault-Token: $VAULT_TOKEN" \
     http://127.0.0.1:8200/v1/kvv2/data/apps/artifactory | jq
```

A sample JSON response:

```
{
  "data": {
    "data": {
      "artifact": "jenkins"
    },
    "metadata": {
      "version": 1,
      "custom_metadata": null,
      "created_time": "2022-03-25T14:33:10Z"
    }
  }
}
```

---

## Conclusion

By now you should be familiar with:

- Upgrading KV v1 to KV v2
- Mounting and using new KV v2 engines
- Writing, reading, deleting, undeleting, and destroying versioned secrets
- Viewing and tuning metadata (including custom metadata)
- Defining policies that use the `data/` and `metadata/` prefixes
- Interacting with the KV v2 HTTP API

Explore these features in your Vault environment to build secure, versioned secret workflows.

---

## Links and References

- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs/secrets/kv/kv-v2)
- [Vault KV Version 2 API](https://www.vaultproject.io/api-docs/secret/kv/kv-v2)
- [HashiCorp Vault GitHub](https://github.com/hashicorp/vault)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cb962cde-84d3-4b26-8875-e8f093d77244/lesson/4dcd2b44-6ae8-4562-bb13-e721dc7eaf14)**
>
> Watch video content
