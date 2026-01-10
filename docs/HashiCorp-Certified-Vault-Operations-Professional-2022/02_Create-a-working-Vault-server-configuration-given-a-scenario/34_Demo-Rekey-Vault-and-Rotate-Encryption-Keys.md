# Demo Rekey Vault and Rotate Encryption Keys - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Demo-Rekey-Vault-and-Rotate-Encryption-Keys)

---

## Table of Contents

- Demo Rekey Vault and Rotate Encryption Keys
  - Prerequisites
  - 1. Check Initial Vault Status
  - 2. Initialize the Vault Cluster
  - 3. Rekey the Vault Cluster
  - 4. Rotate the Encryption Key
  - Vault Key Management Commands
  - References
  - Watch Video
  - Practice Lab
    - 3.1 Initiate Rekey
    - 3.2 Submit Existing Recovery Keys
    - 4.1 Configure Environment Variables
    - 4.2 Check Current Key Status
    - 4.3 Rotate to a New Key

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Demo Rekey Vault and Rotate Encryption Keys

In this hands-on guide, you will learn how to rekey a Vault cluster and rotate its encryption keys using AWS KMS for auto-unseal. Rekeying lets you replace old recovery keys (for example when an employee leaves), while key rotation refreshes the master encryption key to maintain security.

## Prerequisites

- Vault Enterprise v1.10.0+ configured with AWS KMS auto-unseal
- `vault` CLI installed (>= v1.10.0)
- AWS IAM permissions for KMS
- Network access to Vault server

## 1\. Check Initial Vault Status

Verify that Vault is sealed and using AWS KMS for auto-unseal:

```
vault status
```

Expected output:

```
Key                        Value
---                        -----
Recovery Seal Type         awskms
Initialized                false
Sealed                     true
Total Recovery Shares      0
Threshold                  0
Unseal Progress            0/0
Unseal Nonce               n/a
Version                    1.10.0+ent
Storage Type               raft
HA Enabled                 true
```

## 2\. Initialize the Vault Cluster

Initialize Vault to set up Shamir sealing and generate recovery keys and a root token:

```
vault operator init > init.txt
```

Vault logs will display the security barrier setup and Raft storage configuration. Review the generated tokens:

```
cat init.txt
```

Sample output:

```
Recovery Key 1: yILFH1+RnXAWfkwDjPZGfpj2PtChxLHmcCzdBV2dBzhd
Recovery Key 2: XpdyFUPwzNviwcFttS2+fb5/7tiJCaKxgLdZcWr5JPL
Recovery Key 3: 7bNyeKbRz+kkKo3vtlPpcIXGObJcCFaEQL+IUJ5J9BXA
Recovery Key 4: qaFHQJwdMfIDaTcJwltHFDC+/hPjy91StnbZSOCWUKin
Recovery Key 5: FHjem7Hsw0TPkEyvdOvsh8Pp2JymJr6Aa74sajj40/yr


Initial Root Token: hvs.Wxqk6kDX3fAko3LoCCfczQ3D
Success! Vault is initialized.
Recovery key initialized with 5 key shares and a key threshold of 3.
```

Check status again—Vault should now be unsealed with Shamir recovery:

```
vault status
```

```
Recovery Seal Type         shamir
Initialized                true
Sealed                     false
Total Recovery Shares      5
Threshold                  3
Version                    1.10.0+ent
Storage Type               raft
HA Enabled                 true
...
```

## 3\. Rekey the Vault Cluster

Rekeying replaces existing recovery keys with a new set. This is crucial if a key is compromised or when rotating personnel access.

> [!important]
> **Warning**
>
> Losing all recovery keys renders your data unrecoverable. Always store keys securely and offsite.

### 3.1 Initiate Rekey

```
vault operator rekey -init -target=recovery
```

Output:

```
WARNING! If you lose the keys after they are returned, there is no recovery.
Nonce                      9e107605-d80a-c795-e7a2-589c2266b552
Started                    true
Rekey Progress             0/3
New Shares                 5
New Threshold              3
Verification Required      false
```

### 3.2 Submit Existing Recovery Keys

Submit any 3 of the existing 5 recovery keys (order does not matter). Each submission advances the progress:

```
vault operator rekey -target=recovery
# Enter Unseal Key (hidden)
```

Repeat until `Rekey Progress: 3/3`:

```
Key 1: C+YlFuzh0ds9hXmnbTs4QOy1cPvyTCKx8M4iklLDcu6D
Key 2: c07ohvE7H53xFAYxrzl8xTTXGEUcQH39d9HdIcrdaj
Key 3: gvxsl00uJKIwfq0h71sQRKHyC4fcI7svl9gdJ0DPNGp
Key 4: AOJ5LJvl/bhyV+MF/9FBdZB/j0YGRdNi1kpEel7i3Vjt
Key 5: KfHwPR7KVx4eDk4ZlaA2QoZ5IXVdXs1wQKOcY0cxpn


Vault rekeyed with 5 key shares and a key threshold of 3.
Please securely distribute the key shares printed above.
```

You now have a fresh set of recovery keys.

## 4\. Rotate the Encryption Key

Periodic encryption key rotation keeps your data encryption strong by refreshing the master key.

### 4.1 Configure Environment Variables

```
export VAULT_TOKEN=hvs.Wxqk6kDX3fAko3LoCCfczQ3D
export VAULT_ADDR=http://127.0.0.1:8200
```

### 4.2 Check Current Key Status

```
vault operator key-status
```

Example:

```
Key Term         1
Install Time     09 May 22 14:22 UTC
Encryption Count 199
```

### 4.3 Rotate to a New Key

```
vault operator rotate
```

```
Success! Rotated key
Key Term         2
Install Time     09 May 22 14:31 UTC
Encryption Count 0
```

Verify:

```
vault operator key-status
```

## Vault Key Management Commands

| Command                               | Description                                 |
| ------------------------------------- | ------------------------------------------- |
| vault operator init                   | Initialize Vault and generate recovery keys |
| vault operator rekey -init            | Start rekey process                         |
| vault operator rekey -target=recovery | Submit recovery keys to complete rekey      |
| vault operator key-status             | Display current encryption key metadata     |
| vault operator rotate                 | Rotate the Vault encryption key             |

## References

- [Vault CLI Documentation](https://developer.hashicorp.com/vault/docs/commands/operator)
- [Vault Security Concepts](https://www.vaultproject.io/docs/concepts)
- [AWS KMS Auto-Unseal](https://www.vaultproject.io/docs/secrets/aws/kms)

Practice these steps in a non-production environment to master Vault’s key management workflows.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/d7006525-2ee1-4eac-a91a-2bb1e16ba570)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/df72d3c4-15e6-4055-b47e-ab53e0a0aa8c)**
>
> Practice lab
