# Unsealing with Key Shards - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Learning-the-Vault-Architecture/Unsealing-with-Key-Shards)

---

## Table of Contents

- Unsealing with Key Shards
  - Distributing Key Shards
  - Unsealing Process
  - Key Shard Best Practices
  - Links and References
  - Watch Video
    - 1. Check Vault Status (Sealed)
    - 2. Submit Unseal Shards
    - 3. Verify Vault Status (Unsealed)

---

## Content

HashiCorp Certified: Vault Associate Certification

Learning the Vault Architecture

# Unsealing with Key Shards

In this guide, you’ll learn how HashiCorp Vault protects its master key using Shamir’s Secret Sharing algorithm. Vault splits the master key into multiple unseal keys (key shards), so no single person ever holds the entire master key. Each shard is entrusted to a different custodian, and only a quorum of shards can reconstruct the master key.

![The image illustrates the process of unsealing with key shards using Shamir's Secret Sharing Algorithm, showing how key shards combine to form a master key, which then protects an encryption key and vault data.](https://kodekloud.com/kk-media/image/upload/v1752878222/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Unsealing-with-Key-Shards/shamir-secret-sharing-unsealing-process-diagram.jpg)

## Distributing Key Shards

When Vault initializes (`vault operator init`), it generates a specified number of shares and a threshold number required to unseal. By default, Vault creates 5 shares and a threshold of 3.

![The image shows five people labeled as "Trusted Employees" with colorful key icons above them, suggesting a concept of unsealing with key shards.](https://kodekloud.com/kk-media/image/upload/v1752878224/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Unsealing-with-Key-Shards/trusted-employees-key-icons-unsealing.jpg)

| Total Shares | Threshold | Description                                                |
| ------------ | --------- | ---------------------------------------------------------- |
| 5            | 3         | Any 3 of the 5 key shards must be combined to unseal Vault |

Each key shard is distributed to a separate trusted individual (e.g., security team members or management).

## Unsealing Process

When Vault is sealed, no operations can occur until enough unseal keys are submitted. Each submitted key shard increments the unseal progress. Once the threshold is reached, Vault reconstructs the master key, decrypts its encryption key, and transitions to the unsealed state.

### 1\. Check Vault Status (Sealed)

```
$ vault status
Key                     Value
---                     -----
Seal Type               shamir
Sealed                  true
Total Shares            5
Threshold               3
Unseal Progress         0/3
```

### 2\. Submit Unseal Shards

1.  Submit first key → Unseal Progress 1/3
2.  Submit second key → Unseal Progress 2/3
3.  Submit third key → Unseal Progress 3/3 → Vault transitions to **unsealed**

### 3\. Verify Vault Status (Unsealed)

```
$ vault status
Key                     Value
---                     -----
Seal Type               shamir
Sealed                  false
Total Shares            5
Threshold               3
Version                 1.7.0
Storage Type            consul
Cluster Name            vault-cluster
Cluster ID              xxx-xxx-xxx-xxx
HA Enabled              true
```

> [!important]
> **Note**
>
> Vault logs the unseal progress but never records the actual key shards. This ensures shards remain confidential.

## Key Shard Best Practices

Implement these practices to maintain strong security for your unseal keys:

| Practice         | Description                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------- |
| PGP Encryption   | Provide each custodian’s public PGP key during initialization so Vault encrypts each shard. |
| Offline Storage  | Store shards in secure offline devices (e.g., hardware safe or encrypted USB).              |
| Access Controls  | Restrict physical and digital access to unseal key holders only.                            |
| Custodian Roster | Maintain an up-to-date list of key holders and confirm availability.                        |

> [!important]
> **Warning**
>
> Ensure that at least the threshold number of custodians is reachable whenever Vault restarts or is sealed. Losing access to even one shard beyond the threshold can lock you out.

## Links and References

- [Shamir’s Secret Sharing on Wikipedia](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)
- [Vault Operator Init](https://www.vaultproject.io/docs/commands/operator/init)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/f544757d-0901-47a3-a0e6-d9ab7822ef7a/lesson/ffee6ca3-1697-4591-ae32-49fb54ddaa8a)**
>
> Watch video content
