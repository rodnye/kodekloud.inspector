# Benefits and Use Cases of Seal Wrapping - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Understand-the-Hardware-Security-Module-HSM-Integration/Benefits-and-Use-Cases-of-Seal-Wrapping)

---

## Table of Contents

- Benefits and Use Cases of Seal Wrapping
  - What Is Seal Wrapping?
  - Configuring Seal Wrapping
  - Enabling Seal Wrapping on a Secrets Engine
  - Conclusion
  - References
  - Watch Video
    - Default Seal-Wrapped Data

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Understand the Hardware Security Module HSM Integration

# Benefits and Use Cases of Seal Wrapping

HashiCorp Vault encrypts data at rest with AES-256, but seal wrapping adds a second layer of encryption using an HSM for FIPS 140-2 compliance. This “double encryption” ensures data is encrypted first by Vault’s master key, then again by the HSM’s key.

> [!important]
> **FIPS Certified Binaries**
>
> As of Vault 1.10.3, HashiCorp publishes FIPS-certified binaries suffixed with `-fips` that do not require an HSM.

![The image explains "Seal Wrapping," a method for providing double encryption and FIPS 140-2 compliance by integrating with an HSM, allowing Vault to be used in high-security environments. It also notes that HashiCorp offers Vault binaries for FIPS compliance without HSM integration starting from version 1.10.3.](https://kodekloud.com/kk-media/image/upload/v1752878630/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Benefits-and-Use-Cases-of-Seal-Wrapping/seal-wrapping-double-encryption-fips.jpg)

## What Is Seal Wrapping?

Seal wrapping encrypts Vault’s ciphertext a second time with HSM-managed keys, enabling Vault in high-security environments (PCI, HIPAA, DoD, NATO).

By combining:

- AES-256 encryption by Vault’s master key
- Secondary HSM encryption

Vault achieves FIPS 140-2 Level 3 compliance when paired with a Level 3 HSM.

### Default Seal-Wrapped Data

Vault seal-wraps the most sensitive assets by default:

![The image is a slide titled "What is Seal Wrapped by Default?" listing items such as Recovery Key, Any stored key shares, The root key, and The keyring. It includes a Vault certification badge.](https://kodekloud.com/kk-media/image/upload/v1752878630/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Benefits-and-Use-Cases-of-Seal-Wrapping/what-is-seal-wrapped-default-slide.jpg)

| Resource      | Description                    |
| ------------- | ------------------------------ |
| Recovery Key  | Master recovery key shares     |
| Stored Shares | All encrypted key shares       |
| Root Key      | Primary root token key         |
| Keyring       | Internal cryptographic keyring |

## Configuring Seal Wrapping

Seal wrapping is on by default for supported HSM seals. To disable it (trading security for a slight performance boost):

```
# vault.hcl
disable_sealwrap = true
```

> [!important]
> **Warning**
>
> Disabling seal wrapping reduces your security posture. Only disable if HSM double-encryption is not required.

![The image is a slide discussing enabling seal wrapping in Vault, with bullet points explaining its default status, configuration options, and benefits for backend mounts. It includes a Vault certification badge and a cartoon character illustration.](https://kodekloud.com/kk-media/image/upload/v1752878631/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Benefits-and-Use-Cases-of-Seal-Wrapping/enabling-seal-wrapping-vault-slide.jpg)

## Enabling Seal Wrapping on a Secrets Engine

When mounting a secrets engine, enable HSM seal wrapping with `-seal-wrap` (CLI) or `seal_wrap = true` (HCL):

```
# Enable KV secrets engine with HSM seal wrapping
vault secrets enable -seal-wrap kv
```

```
# Verify enabled secrets engines
vault secrets list -detailed
```

| Path       | Plugin    | Seal Wrap |
| ---------- | --------- | --------- |
| cubbyhole/ | cubbyhole | false     |
| identity/  | identity  | false     |
| kv/        | kv        | true      |

## Conclusion

Seal wrapping is key for high-security Vault deployments requiring FIPS 140-2 Level 3 compliance with an HSM or when using HashiCorp’s FIPS-certified binaries. It ensures that Vault’s most critical secrets remain protected under dual encryption.

## References

- [Vault Documentation](https://www.vaultproject.io/docs)
- [FIPS 140-2 Overview](https://csrc.nist.gov/projects/cryptographic-module-validation-program/fips-140)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/72879dfa-5358-4743-b2f1-62bdd686d0ea/lesson/009b9b68-a1ef-47e1-96b8-08ac43f0868e)**
>
> Watch video content
