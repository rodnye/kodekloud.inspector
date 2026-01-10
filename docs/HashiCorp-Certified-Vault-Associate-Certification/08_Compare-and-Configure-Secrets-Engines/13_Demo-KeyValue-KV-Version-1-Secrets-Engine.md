# Demo KeyValue KV Version 1 Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-and-Configure-Secrets-Engines/Demo-KeyValue-KV-Version-1-Secrets-Engine)

---

## Table of Contents

- Demo KeyValue KV Version 1 Secrets Engine
  - 1. List Enabled Secrets Engines
  - 2. Enable a KV Version 1 Secrets Engine
  - 3. Verify the Engine Version
  - 4. Write and Read Secrets
  - 5. Update Secrets
  - 6. Write Multiple Key/Value Pairs
  - 7. Filter JSON Output with jq
  - 8. Delete Secrets
  - 9. List Keys in a Path
  - Conclusion
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare and Configure Secrets Engines

# Demo KeyValue KV Version 1 Secrets Engine

In this guide, you’ll explore how to enable and manage the Key/Value (KV) version 1 secrets engine in HashiCorp Vault. You will learn to list existing secrets engines, mount a new KV engine, perform CRUD operations on secrets, and filter JSON output with `jq`.

## 1\. List Enabled Secrets Engines

Run the following command to see which secrets engines are mounted:

```
vault secrets list
```

| Path       | Type      | Accessor              | Description                                         |
| ---------- | --------- | --------------------- | --------------------------------------------------- |
| cubbyhole/ | cubbyhole | cubbyhole\\\_9c6c2ca2 | Per-token private secret storage                    |
| identity/  | identity  | identity\\\_e55fbf01  | Identity store                                      |
| sys/       | system    | system\\\_ae43616e    | System endpoints for control, policy, and debugging |
| transit/   | transit   | transit\\\_5bb3af5e   | n/a                                                 |

## 2\. Enable a KV Version 1 Secrets Engine

By default, `kv` enables version 1. Mount it at the path `training`:

```
vault secrets enable -path=training kv
```

Success! You should see:

```
Enabled the kv secrets engine at: training/
```

Verify the new mount:

```
vault secrets list
```

| Path      | Type | Accessor       | Description |
| --------- | ---- | -------------- | ----------- |
| training/ | kv   | kv\\\_1d131683 | n/a         |
| …         | …    | …              | …           |

> [!important]
> **Note**
>
> If you need KV version 2 (with versioning, metadata, and rollback), use `-version=2`.

## 3\. Verify the Engine Version

Use `--detailed` to confirm the KV engine version:

```
vault secrets list --detailed
```

Look for an empty `Options` map (`map[]`), which indicates KV v1:

```
Path        Plugin  Accessor       Options
----        ------  --------       -------
training/   kv      kv_1d131683    map[]
```

## 4\. Write and Read Secrets

Write a secret at `training/apps/jenkins`:

```
vault kv put training/apps/jenkins apikey=secret123
```

Read it back:

```
vault kv get training/apps/jenkins
```

Output:

```
Key      Value
---      -----
apikey   secret123
```

## 5\. Update Secrets

Writing to the same path replaces existing data:

```
vault kv put training/apps/jenkins apikey=newsecret456
vault kv get training/apps/jenkins
```

Result:

```
Key      Value
---      -----
apikey   newsecret456
```

## 6\. Write Multiple Key/Value Pairs

You can include several pairs in one command:

```
vault kv put training/apps/jenkins apikey=secret789 user=vault-admin
vault kv get training/apps/jenkins
```

Result:

```
Key      Value
---      -----
apikey   secret789
user     vault-admin
```

## 7\. Filter JSON Output with jq

Retrieve secret data in JSON:

```
vault kv get -format=json training/apps/jenkins
```

Sample output:

```
{
  "request_id": "...",
  "data": {
    "apikey": "secret789",
    "user": "vault-admin"
  }
}
```

Extract fields:

```
vault kv get -format=json training/apps/jenkins \
  | jq -r '.data.apikey'
vault kv get -format=json training/apps/jenkins \
  | jq -r '.data.user'
# vault-admin
```

## 8\. Delete Secrets

> [!important]
> **Warning**
>
> In KV v1, deleting a secret permanently removes it—no version history is kept.

```
vault kv delete training/apps/jenkins
vault kv get training/apps/jenkins
```

You should see:

```
No value found at training/apps/jenkins
```

## 9\. List Keys in a Path

First, add a couple of secrets:

```
vault kv put training/apps/jenkins abc=123
vault kv put training/apps/azuredevops user=administrator
```

List subpaths under `training/apps`:

```
vault kv list training/apps
```

| Keys         |
| ------------ |
| azuredevops/ |
| jenkins/     |

To list only data keys (no trailing slash):

```
vault kv list training/apps/
```

| Keys        |
| ----------- |
| azuredevops |
| jenkins     |

## Conclusion

You’ve now learned how to:

- Mount the KV version 1 secrets engine
- Write, read, update, and delete secrets
- List secrets and filter JSON output

For KV version 2 features like versioning and rollback, see the [HashiCorp Vault KV Secrets Engine](https://www.vaultproject.io/docs/secrets/kv).

## Links and References

- [Vault Secrets Engines](https://www.vaultproject.io/docs/secrets)
- [jq Manual](https://stedolan.github.io/jq/)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cb962cde-84d3-4b26-8875-e8f093d77244/lesson/5fc94cd5-5a16-48d8-88d5-0cbc856d29e0)**
>
> Watch video content
