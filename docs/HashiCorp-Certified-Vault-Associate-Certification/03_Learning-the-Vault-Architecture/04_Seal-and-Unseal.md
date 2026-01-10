# Seal and Unseal - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Learning-the-Vault-Architecture/Seal-and-Unseal)

---

## Table of Contents

- Seal and Unseal
  - Vault Sealed State
  - Why Seal Vault Manually?
  - Sealing & Unsealing Methods
  - Step-by-Step Demo
  - Best Practices for Key Shards
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Learning the Vault Architecture

# Seal and Unseal

Vault’s **seal and unseal** mechanism protects your data at rest by ensuring the encryption key is only accessible in memory when explicitly unlocked. Every time Vault starts, it launches in a **sealed** state. In this state, Vault knows where your data resides (via its configured storage backend) but cannot decrypt it until the master key is reconstructed.

## Vault Sealed State

When Vault is sealed:

- Only `vault status` and the unseal operation are permitted.
- All other actions—reading or writing secrets, generating tokens, etc.—remain blocked.

Unsealing Vault reconstructs the master key, decrypts the in-memory encryption key, and allows normal operations. Sealing removes the encryption key from memory, requiring a fresh unseal to resume.

![The image is a slide titled "Seal and Unseal," explaining the concept of sealing a Vault, which involves discarding the encryption key and requiring an unseal for further operations. It lists reasons for sealing, such as key exposure, network intrusion detection, and malware presence.](https://kodekloud.com/kk-media/image/upload/v1752878215/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Seal-and-Unseal/seal-and-unseal-vault-concept.jpg)

## Why Seal Vault Manually?

Common reasons to seal Vault immediately include:

- Suspected exposure of unseal key shards (e.g., accidentally published in a public repo)
- Departure or unavailability of key-holding personnel
- Detection of network intrusion
- Malware or spyware discovered on Vault nodes

> [!important]
> **Warning**
>
> If unseal key shards are compromised or lost, Vault cannot decrypt the data at rest until a valid threshold of shards is provided. Store and distribute shards securely.

## Sealing & Unsealing Methods

Vault supports three primary unseal mechanisms:

| Method              | Description                                                                           | Example Providers                             |
| ------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------- |
| Key Sharding        | Default Shamir’s Secret Sharing splits the master key into N shares with a threshold. | n=5 shares, threshold=3                       |
| Cloud Auto Unseal   | Integrates with a cloud KMS to auto-unseal on startup.                                | AWS KMS, Azure Key Vault                      |
| Transit Auto Unseal | Uses a remote Vault (transit cluster) to protect and unseal the master key.           | Vault Transit Secrets Engine (remote cluster) |

![The image illustrates three options for sealing and unsealing: Key Sharding (Shamir), Cloud Auto Unseal, and Transit Auto Unseal, each represented with distinct icons and colors.](https://kodekloud.com/kk-media/image/upload/v1752878216/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Seal-and-Unseal/sealing-unsealing-options-key-sharding.jpg)

---

When Vault is initialized, the master key is split into multiple **key shards** using [Shamir’s Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing). For example, Vault might create 5 shards with a threshold of 3. Each shard is handed to a different trusted individual.

To unseal:

1.  Provide at least the threshold number of shards.
2.  Vault combines them to reconstruct the master key.
3.  The master key decrypts the encryption key in memory, and Vault transitions to an **unsealed** state.

![The image illustrates the process of unsealing with key shards using Shamir's Secret Sharing Algorithm, showing how key shards combine to form a master key, which then protects an encryption key and vault data.](https://kodekloud.com/kk-media/image/upload/v1752878217/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Seal-and-Unseal/shamir-secret-sharing-unsealing-process-diagram.jpg)

## Step-by-Step Demo

1.  Verify sealed status:

    ```
    vault status
    # Key                Value
    # ---                -----
    # Seal Type          shamir
    # Sealed             true
    # Total Shares       5
    # Threshold          3
    # Unseal Progress    0/3
    ```

2.  Submit two shards (order doesn’t matter):

    ```
    vault unseal <key-shard-1>
    # Unseal Progress: 1/3


    vault unseal <key-shard-2>
    # Unseal Progress: 2/3
    ```

3.  Provide the third shard:

    ```
    vault unseal <key-shard-3>
    # Key                Value
    # ---                -----
    # Seal Type          shamir
    # Sealed             false
    # Total Shares       5
    # Threshold          3
    # Version            1.7.0
    # Storage Type       consul
    # Cluster Name       vault-cluster
    # Cluster ID         xxx-xxx-xxx-xxx
    # HA Enabled         true
    ```

Once unsealed, Vault displays runtime and cluster details and begins serving requests.

## Best Practices for Key Shards

![The image is a slide titled "Unsealing with Key Shards," detailing guidelines for securely managing key shards, including distribution among employees and encryption practices.](https://kodekloud.com/kk-media/image/upload/v1752878218/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Seal-and-Unseal/unsealing-key-shards-guidelines-slide.jpg)

- **Separate custody:** Distribute shares so no single person holds the threshold.
- **Encrypt at rest:** Supply [PGP public keys](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) during initialization to encrypt each shard.
- **Offline storage:** Keep shards out of online systems and automated backups.
- **Balance threshold:** A higher threshold boosts security but may affect availability.

> [!important]
> **Note**
>
> Preparing PGP keys for shard encryption helps ensure that only the intended recipient can decrypt their shard.

---

## Links and References

- [Vault Secrets Engines](https://www.vaultproject.io/docs/secrets)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs/)
- [Shamir’s Secret Sharing on Wikipedia](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing)
- [AWS KMS](https://aws.amazon.com/kms/)
- [Azure Key Vault](https://azure.microsoft.com/services/key-vault/)
- [Vault Transit Secrets Engine](https://www.vaultproject.io/docs/secrets/transit)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/f544757d-0901-47a3-a0e6-d9ab7822ef7a/lesson/f3adb868-9878-4649-956d-933c562078c0)**
>
> Watch video content
