# Vault Initialization - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Learning-the-Vault-Architecture/Vault-Initialization)

---

## Table of Contents

- Vault Initialization
  - What Happens During Initialization
  - Key Shares, Thresholds, and Recovery Keys
  - Encrypting Unseal Keys and Root Token
  - Initialization Methods
  - Post-Initialization Steps
  - Links and References
  - Watch Video
    - CLI Examples

---

## Content

HashiCorp Certified: Vault Associate Certification

Learning the Vault Architecture

# Vault Initialization

Vault initialization is a one-time operation that prepares your storage backend to securely store and manage secrets. During this step, Vault generates encryption keys, shards them, and issues an initial root token. Initialization must be performed exactly once per Vault cluster—never re-initialize after a restore or node failure.

## What Happens During Initialization

When you run:

```
$ vault operator init <options>
```

Vault will:

1.  Generate a **master key** that encrypts the data-encryption key.
2.  Create a **data-encryption key** for all subsequent operations.
3.  Split the master key into key shares (using Shamir’s Secret Sharing) or generate recovery keys if an auto-unseal mechanism is enabled.
4.  Issue the **initial root token** for first-time authentication.

> [!important]
> **Note**
>
> Initialization writes to your storage backend only once. If your cluster is lost or restored from backup, you skip initialization and go straight to unsealing.

## Key Shares, Thresholds, and Recovery Keys

By default:

- **Key shares**: 5
- **Threshold**: 3 (number of shares needed to unseal)

Customize these values:

```
$ vault operator init \
    -key-shares=10 \
    -key-threshold=6
```

If you use a cloud KMS or HSM for auto-unseal, Vault generates **recovery keys** instead of traditional unseal keys. These recovery keys are only needed for manual recovery or re-sealing.

## Encrypting Unseal Keys and Root Token

Protect your unseal/recovery keys and root token with PGP encryption. Supply one or more public keys during initialization:

```
$ vault operator init \
    -pgp-keys="alice_pubkey.pem" \
    -pgp-keys="bob_pubkey.pem"
```

Each key share (and the root token, optionally) is encrypted to the corresponding PGP public key. Only private key holders can decrypt them.

## Initialization Methods

Vault supports three initialization interfaces:

| Method | Use Case                                     | Example                                 |
| ------ | -------------------------------------------- | --------------------------------------- |
| CLI    | Stand up a new cluster or quick manual setup | `vault operator init`                   |
| API    | Automation workflows, CI/CD pipelines        | HTTP `PUT /v1/sys/init`                 |
| UI     | Interactive setup via Vault Web UI           | Navigate to **System → Initialization** |

### CLI Examples

Default initialization:

```
$ vault operator init
```

Custom shares, threshold, and PGP encryption:

```
$ vault operator init \
    -key-shares=7 \
    -key-threshold=4 \
    -pgp-keys="team1_pub.pem" \
    -pgp-keys="team2_pub.pem"
```

## Post-Initialization Steps

1.  **Auto-Unseal**  
    Vault contacts the configured KMS/HSM and unseals automatically.
2.  **Manual Unseal**  
    Supply unseal key shares on a single Vault node:

    ```
    $ vault operator unseal <key-share-1>
    $ vault operator unseal <key-share-2>
    $ vault operator unseal <key-share-3>
    ```

3.  **Authenticate**  
    Log in with the initial root token:

    ```
    $ vault login <initial-root-token>
    ```

Once unsealed and authenticated, you can configure policies, enable secrets engines, and onboard applications.

---

## Links and References

- [Vault Initialization API](https://www.vaultproject.io/api-docs/system/init)
- [Shamir’s Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing)
- [Auto-Unseal with AWS KMS](https://www.vaultproject.io/docs/secrets/aws#auto-unseal)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/f544757d-0901-47a3-a0e6-d9ab7822ef7a/lesson/3c10741c-af07-473d-8249-ea46d0c22664)**
>
> Watch video content
