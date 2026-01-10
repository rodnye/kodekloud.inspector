# Demo KeyValue Secrets Engine Version 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Demo-KeyValue-Secrets-Engine-Version-1)

---

## Table of Contents

- Demo KeyValue Secrets Engine Version 1
  - 1. List Existing Secrets Engines
  - 2. Enable KV v1 at a Custom Path
  - 3. Verify the Engine Version
  - 4. Write Secrets
  - 5. Read Secrets
  - 6. Update Secrets
  - 7. JSON Output & Field Extraction
  - 8. Delete Secrets
  - 9. List Secret Keys
  - Summary Comparison: KV v1 vs. KV v2
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Demo KeyValue Secrets Engine Version 1

Welcome to this step-by-step guide on using the KV secrets engine version 1 in HashiCorp Vault. You will learn how to:

- List existing secrets engines
- Enable a KV v1 engine at a custom path
- Verify the engine version
- Write, read, update, and delete secrets
- Format output as JSON and extract specific fields
- List secret keys

All examples assume you have the [Vault CLI](https://www.vaultproject.io/docs/commands) installed, authenticated, and are connected to your Vault server via SSH.

---

## 1\. List Existing Secrets Engines

Inspect which secret engines are currently mounted:

```
vault secrets list
```

Example output:

| Path       | Type      | Accessor              | Description                      |
| ---------- | --------- | --------------------- | -------------------------------- |
| cubbyhole/ | cubbyhole | cubbyhole\\\_9c6c2ca2 | per-token private secret storage |
| identity/  | identity  | identity\\\_e55fbf01  | identity store                   |
| sys/       | system    | system\\\_ae43616e    | control, policy, and debugging   |
| transit/   | transit   | transit\\\_5bb3af5e   | data encryption as a service     |

> No KV engine is enabled yet.

---

## 2\. Enable KV v1 at a Custom Path

Enable a KV v1 engine at `training/`:

```
vault secrets enable -path=training kv
```

You should see:

```
Success! Enabled the kv secrets engine at: training/
```

Re-run the list command:

```
vault secrets list
```

Now you’ll spot:

| Path      | Type | Accessor       | Description |
| --------- | ---- | -------------- | ----------- |
| training/ | kv   | kv\\\_11d31683 | n/a         |

---

## 3\. Verify the Engine Version

Check the detailed mount info to confirm KV v1 (no versioning):

```
vault secrets list --detailed
```

Look for an empty `Options` map (`map[]`):

```
Path       Plugin  Accessor      Default TTL  Max TTL  Options  Description
training/  kv      kv_11d31683   n/a          n/a      map[]    n/a
```

> [!important]
> **Note**
>
> In **KV v2**, the options map includes `"version":"2"`.

---

## 4\. Write Secrets

Store a single key/value pair:

```
vault kv put training/apps/jenkins apikey=fkkj4ifkjwo2
```

Expected output:

```
Success! Data written to: training/apps/jenkins
```

---

## 5\. Read Secrets

Retrieve the secret:

```
vault kv get training/apps/jenkins
```

```
Key      Value
---      -----
apikey   fkkj4ifkjwo2
```

---

## 6\. Update Secrets

KV v1 always overwrites data. To update, write again:

```
vault kv put training/apps/jenkins user=vault-training-admin
```

Read back:

```
vault kv get training/apps/jenkins
```

```
Key    Value
----   ----------------------
user   vault-training-admin
```

To store multiple fields at once:

```
vault kv put training/apps/jenkins apikey=fkkj4ifkjwo2 user=vault-training-admin
```

```
vault kv get training/apps/jenkins
```

```
Key      Value
---      ----------------------
apikey   fkkj4ifkjwo2
user     vault-training-admin
```

---

## 7\. JSON Output & Field Extraction

Output secret as JSON and parse with `jq`:

```
vault kv get -format=json training/apps/jenkins
```

Sample JSON:

```
{
  "request_id": "…",
  "lease_id": "",
  "data": {
    "apikey": "fkkj4ifkjwo2",
    "user":   "vault-training-admin"
  }
}
```

Extract specific fields:

```
vault kv get -format=json training/apps/jenkins | jq -r .data.apikey
vault kv get -format=json training/apps/jenkins | jq -r .data.user
```

> [!important]
> **Note**
>
> Using JSON output is useful for automation and scripting.

---

## 8\. Delete Secrets

Remove the secret at a given path:

```
vault kv delete training/apps/jenkins
```

Attempt to read again:

```
vault kv get training/apps/jenkins
```

```
No value found at training/apps/jenkins
```

---

## 9\. List Secret Keys

Re-create sample secrets:

```
vault kv put training/apps/jenkins abc=123
vault kv put training/apps/azuredevops user=administrator
```

List keys under `training/`:

```
vault kv list training/
```

```
Keys
----
apps/
```

List under `training/apps/`:

```
vault kv list training/apps/
```

```
Keys
----
azuredevops
jenkins
```

- Entries ending with `/` are subdirectories.
- Others are secret paths.

---

## Summary Comparison: KV v1 vs. KV v2

| Feature                    | KV v1               | KV v2            |
| -------------------------- | ------------------- | ---------------- |
| Versioning                 | No                  | Yes              |
| Metadata & check-and-set   | N/A                 | Supported        |
| Path for data operations   | `kv put/get/delete` | `kv/data/...`    |
| Options map (`--detailed`) | `map[]`             | `map[version:2]` |

---

## Links and References

- [HashiCorp Vault Secrets Engines: KV](https://www.vaultproject.io/docs/secrets/kv)
- [Vault CLI Commands](https://www.vaultproject.io/docs/commands)
- [jq Manual](https://stedolan.github.io/jq/manual/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/e0ae6919-1c59-4449-be16-5ee20a32da96)**
>
> Watch video content
