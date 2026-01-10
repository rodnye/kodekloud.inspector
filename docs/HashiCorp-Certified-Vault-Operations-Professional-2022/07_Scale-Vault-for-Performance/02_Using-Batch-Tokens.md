# Using Batch Tokens - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Scale-Vault-for-Performance/Using-Batch-Tokens)

---

## Table of Contents

- Using Batch Tokens
  - What Are Batch Tokens?
  - Service Tokens vs. Batch Tokens
  - Identifying Token Types
  - Batch Token Replication
  - Creating Batch Tokens
  - DR Operations Batch Token
  - Summary
  - Links and References
  - Watch Video
    - Non-Orphan Tokens
    - Orphan Tokens
    - Direct Token Creation
    - Via AppRole

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Scale Vault for Performance

# Using Batch Tokens

In this lesson, you’ll learn how to work with **batch tokens** in Vault—lightweight, non-persistent tokens designed for high-throughput operations and seamless replication.

## What Are Batch Tokens?

Batch tokens are encrypted binary large objects (BLOBs) that Vault issues directly to clients without persisting them to storage. They excel in scenarios requiring:

- High-volume cryptographic operations (e.g., Transit encrypt/decrypt)
- Frequent KV reads and writes
- Replication to performance and DR clusters

![The image is a slide titled "Introduction to Batch Tokens," describing batch tokens as encrypted binary large objects designed to be lightweight, scalable, and ideal for high-volume operations. It also mentions their use in DR Replication cluster promotion.](https://kodekloud.com/kk-media/image/upload/v1752878620/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Using-Batch-Tokens/introduction-to-batch-tokens-slide.jpg)

> [!important]
> **Note**
>
> Batch tokens are never written to the storage backend. This makes them faster to create and cheaper to replicate across performance clusters.

## Service Tokens vs. Batch Tokens

Batch tokens trade off some features for speed and replication agility. Key differences include:

- **Renewability & Revocation**: Batch tokens are not renewable, listable, or manually revocable.
- **Accessors & Cubbyholes**: They lack token accessors and cubbyholes.
- **Child Tokens**: You cannot create child tokens from batch tokens.
- **TTL Configuration**: No periodic issuance or explicit max TTL.
- **Replication**: Orphan batch tokens replicate to performance and DR clusters; non-orphans do not.

![The image is a comparison table between service tokens and batch tokens, highlighting their differences in features such as renewability, revocability, and TTL settings. It emphasizes the importance of understanding these differences.](https://kodekloud.com/kk-media/image/upload/v1752878621/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Using-Batch-Tokens/service-tokens-vs-batch-tokens-table.jpg)

![The image is a comparison table between Service Tokens and Batch Tokens, highlighting differences in usage across performance replication clusters, creation scalability, and cost. It emphasizes the importance of understanding these differences.](https://kodekloud.com/kk-media/image/upload/v1752878622/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Using-Batch-Tokens/service-tokens-vs-batch-tokens-table-2.jpg)

## Identifying Token Types

Starting with Vault 1.10, tokens are prefixed to indicate their type:

| Prefix | Token Type     |
| ------ | -------------- |
| hvs.   | Service Token  |
| hvb.   | Batch Token    |
| hvr.   | Recovery Token |

Batch tokens tend to be longer (≈128 bytes) than service tokens (≈96 bytes). Always plan for tokens up to 255 bytes in length.

![The image explains how to identify token types in Vault using prefixes: "hvs." for Service Token, "hvb." for Batch Token, and "hvr." for Recovery Token. It also features a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878623/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Using-Batch-Tokens/vault-token-types-identification-guide.jpg)

![The image explains token size changes in HashiCorp Vault, noting the initial root token size and recommending planning for a maximum length of 255 bytes. It includes a certification badge and a character illustration.](https://kodekloud.com/kk-media/image/upload/v1752878624/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Using-Batch-Tokens/hashicorp-vault-token-size-changes.jpg)

```
# Service Token (96 bytes)
hvs.CAESIA4CZQisJNn9eq3g5TS5xP0-DPkFDsshli_jb5UH28AuGiAKHGh2cy5wZjPU1NsVlpWaTQxSFUyczFuQk9DOFgQHQ

# Batch Token (128 bytes)
hvb.AAAAAQKskxnAqTz0Ah3qu5Hc4Q3lYdqCocdDZjLXhyLAjuhhBJktOCrBaJVbKwE6AVsxD6WAFvlZ2UHs2MUb1gcpqYvro-kfVv10x7tKZ9GqUObUwKnn5341sU
```

## Batch Token Replication

Vault supports two replication modes for batch tokens:

### Non-Orphan Tokens

Batch tokens created with a parent token remain bound to the original cluster. Performance secondaries cannot validate the parent, so these tokens do **not** replicate.

![The image illustrates the process of replicating batch tokens in a non-orphan token scenario, showing that batch tokens are only valid on the primary cluster where they were created and are not replicated to the secondary performance cluster.](https://kodekloud.com/kk-media/image/upload/v1752878625/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Using-Batch-Tokens/replicating-batch-tokens-primary-cluster.jpg)

### Orphan Tokens

Orphan batch tokens have no parent and are automatically replicated to all performance and DR clusters. Use these when you need a single token valid across multiple clusters.

![The image illustrates the replication of orphaned batch tokens between a primary cluster and a secondary performance cluster, highlighting that these tokens have no parent and are valid on any cluster in the replica set.](https://kodekloud.com/kk-media/image/upload/v1752878626/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Using-Batch-Tokens/orphaned-batch-tokens-replication-diagram.jpg)

## Creating Batch Tokens

### Direct Token Creation

Use the `vault token create` command:

```
vault token create -type=batch -orphan=true -policy=hcvop
```

Example output:

```
Key                  Value
---                  -----
Token                hvb.AAAAAQKsxnAqTz0Ah3qu5Hc4Q31YdqCocdDZjLXhyLAjuhhBJktOCrBaIJVbKwE6AVsxD6WAFvlI2ZUHs2MUb1gcpqYvro-kfVv
token_accessor       n/a
token_duration       768h
token_renewable      false
token_policies       ["default" "hcvop"]
```

> [!important]
> **Note**
>
> The `-orphan=true` flag ensures this token replicates across performance and DR clusters.

### Via AppRole

Configure an AppRole to issue batch tokens:

```
vault write auth/approle/role/hcvop \
  policies=devops \
  token_type="batch" \
  token_ttl="60s"
```

## DR Operations Batch Token

A DR operations batch token lets you promote a DR secondary without needing unseal or recovery keys. Grant it the following permissions:

![The image is a slide about "DR Operation Batch Token," explaining its use in promoting a DR secondary cluster without needing unseal/recovery keys, and emphasizing the importance of proper permissions. It includes a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878627/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Using-Batch-Tokens/dr-operation-batch-token-slide.jpg)

```
path "sys/replication/dr/secondary/promote" {
  capabilities = ["update"]
}

path "sys/replication/dr/secondary/update-primary" {
  capabilities = ["update"]
}

path "sys/storage/raft/autopilot/state" {
  capabilities = ["update", "read"]
}
```

1.  Create an orphan batch token with the `dr-ops` policy:

    ```
    vault token create -type=batch -orphan=true -policy=dr-ops
    ```

2.  Use it to promote the DR secondary:

    ```
    vault write sys/replication/dr/secondary/promote
    ```

## Summary

- Batch tokens are lightweight, non-persistent tokens for high-throughput workloads.
- Only **orphan** batch tokens replicate to performance and DR clusters.
- Token prefixes (`hvs.`, `hvb.`, `hvr.`) and lengths help identify types.
- Create batch tokens directly or via auth methods like AppRole.
- Use DR operations batch tokens to streamline disaster recovery promotions.

## Links and References

- [Vault Token Authentication](https://www.vaultproject.io/docs/concepts/tokens)
- [Transit Secrets Engine](https://www.vaultproject.io/docs/secrets/transit)
- [Replication Overview](https://www.vaultproject.io/docs/enterprise/replication)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b6a41fdb-447c-43b2-9489-6c8459821fab/lesson/b61adae2-2ce4-42e7-ac3b-85dcb723150b)**
>
> Watch video content
