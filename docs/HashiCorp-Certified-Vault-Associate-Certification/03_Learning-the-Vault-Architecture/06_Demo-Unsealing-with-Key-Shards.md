# Demo Unsealing with Key Shards - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Learning-the-Vault-Architecture/Demo-Unsealing-with-Key-Shards)

---

## Table of Contents

- Demo Unsealing with Key Shards
  - Prerequisites
  - 1. Check Vault Status
  - 2. Review Vault Configuration
  - 3. Initialize Vault
  - 4. Unseal Vault
  - 5. Authenticate and List Secrets Engines
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Learning the Vault Architecture

# Demo Unsealing with Key Shards

In this guide, you’ll walk through unsealing a Vault server using Vault’s default Shamir Secret Sharing mechanism. We’ll cover checking the Vault status, reviewing configuration, initializing Vault to generate key shards, unsealing with those shards, and finally authenticating and listing secrets engines.

## Prerequisites

| Requirement        | Details                                          |
| ------------------ | ------------------------------------------------ |
| SSH Access         | Connect to an AWS node where Vault is installed. |
| Vault Binary       | Installed and available in your `$PATH`.         |
| Configuration File | Basic HCL at `/etc/vault.d/vault.hcl`.           |

> [!important]
> **Note**
>
> Ensure you have write permissions to `/etc/vault.d` and that Vault can read this directory.

---

## 1\. Check Vault Status

Before initialization, verify Vault is neither initialized nor unsealed:

```
vault status
```

Expected output:

```
Key              Value
----             -----
Seal Type        shamir
Initialized      false
Sealed           true
Total Shares     0
Threshold        0
Unseal Progress  0/0
Unseal Nonce     n/a
Version          1.7.1
Storage Type     raft
HA Enabled       true
```

---

## 2\. Review Vault Configuration

Vault uses Shamir’s Secret Sharing by default, so you don’t need a `seal` stanza. Confirm your config resembles:

```
storage "raft" {
  path      = "/opt/vault/data"
  node_id   = "node-a-us-east-1"
  retry_join {
    auto_join = "provider=aws region=us-east-1 tag_key=vault tag_value=us-east-1"
  }
}

listener "tcp" {
  address         = "0.0.0.0:8200"
  cluster_address = "0.0.0.0:8201"
  tls_disable     = 1
}

api_addr     = "http://10.1.0.37:8200"
cluster_addr = "http://10.1.0.37:8201"
cluster_name = "vault-prod-us-east-1"
ui           = true
log_level    = "INFO"
```

> [!important]
> **Note**
>
> You can find more on Vault seal configurations in the [Vault Seal/Unseal Concepts](https://www.vaultproject.io/docs/concepts/seal) guide.

---

## 3\. Initialize Vault

Initialization generates the unseal key shares (5 shares, threshold 3) and the initial root token. Keep these secrets secure—any 3 shares will unseal the Vault.

```
vault operator init
```

Sample output:

```
Unseal Key 1: MxKr/oY8RKMd19gV75hNUK0ExE7JmZjeufCxTNCts+8W9
Unseal Key 2: zy1sDEWUYqLAm8v9F1ukM0Mfs4AIdR3E3FhIZ
Unseal Key 3: 78eRyYcIndlyP2hmOF5pfnAXD6g6d0Phwqxtbgi6
Unseal Key 4: BbTvQb68JE1OlwIgfKFa1wsqRRIxZIlot5I838IzS
Unseal Key 5: tMSPooLeVPBzxfbyMN1CvExInIcbshFJDUN06XnnC8b

Initial Root Token: s.EPAXM61G2egrqULVd61Stphx

Vault initialized with 5 key shares and a key threshold of 3.
```

After initialization, Vault remains sealed:

```
vault status
```

```
Key             Value
----            -----
Seal Type       shamir
Initialized     true
Sealed          true
Total Shares    5
Threshold       3
Unseal Progress 0/3
Version         1.7.1
Storage Type    raft
HA Enabled      true
```

> [!important]
> **Warning**
>
> Store unseal keys and root tokens in a secure location. Exposure of these allows full control over your Vault.

---

## 4\. Unseal Vault

Run the unseal command three times, providing a different key each time:

```
vault operator unseal
```

Repeat until `Unseal Progress` reaches `3/3`:

```
Unseal Key (will be hidden): BbTvQb68JE1OlwIgfKFa1wsqRRIxZIlot5I838IzC
Unseal Progress                1/3
...
Unseal Key (will be hidden): MxKr/oY8RKMd19gV75hNUK0ExE7JmZjeufCxTNCts+8W9
Unseal Progress                2/3
...
Unseal Key (will be hidden): tMSPooLeVPBzxfbyMN1CvExInIcbshFJDUN06XnnC8b
Sealed                         false
Cluster Name                   vault-prod-us-east-1
HA Mode                        standby
Raft Committed Index           24
Raft Applied Index             24
```

Vault is now unsealed and ready for operations.

---

## 5\. Authenticate and List Secrets Engines

Log in with your initial root token, then view the enabled secrets engines:

```
vault login s.EPAXM61G2egrqULVd61Stphx
vault secrets list
```

Expected output:

```
Success! You are now authenticated. Token policies: ["root"]

Path        Type        Accessor
----        ----        --------
cubbyhole/  cubbyhole   cubbyhole_8ab2d9b8
identity/   identity    identity_7e99b119
sys/        system      system_2ab43a59
```

---

## Links and References

- [Vault Documentation: Getting Started](https://www.vaultproject.io/docs)
- [Shamir's Secret Sharing Explained](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/f544757d-0901-47a3-a0e6-d9ab7822ef7a/lesson/cbd99f3a-0029-4df2-ab6a-4b28a6c8a130)**
>
> Watch video content
