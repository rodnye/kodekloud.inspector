# PKI Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/PKI-Secrets-Engine)

---

## Table of Contents

- PKI Secrets Engine
  - Key Benefits of Vault PKI
  - Vault as an Intermediate CA
  - Certificate Management Architecture
  - Enabling the PKI Secrets Engine
  - Tuning the Maximum TTL
  - Generating and Signing an Intermediate CSR
  - Configuring CA and CRL URLs
  - Defining PKI Roles
  - Creating a PKI Role
  - Issuing Certificates
  - Revoking Certificates
  - Cleaning Up the Certificate Store
  - References
  - Watch Video
    - Example Role Configurations

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# PKI Secrets Engine

The PKI Secrets Engine in HashiCorp Vault dynamically issues and manages X.509 certificates for TLS and mutual TLS (mTLS) use cases. It automates private key generation, CSR submission, CA signing, and certificate retrieval—enforcing Vault’s authentication methods and ACL policies to authorize issuance.

## Key Benefits of Vault PKI

| Feature                                  | Benefit                                                         |
| ---------------------------------------- | --------------------------------------------------------------- |
| Automated Key & CSR Generation           | Eliminates manual certificate workflows                         |
| Short-lived Certificates                 | Reduces reliance on revocation lists; improves security posture |
| Unique Certificates per Workload         | Prevents sharing, wildcard, or self-signed usage                |
| Ephemeral TTLs                           | Ensures certificates expire quickly                             |
| Integration with Existing CA Hierarchies | Acts as an intermediate CA under an offline root                |

![The image is a slide about the PKI Secrets Engine, highlighting its benefits such as short TTLs for certificates, ease of allocation, and prevention of certificate sharing and MITM attacks. It also features a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878478/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-PKI-Secrets-Engine/pki-secrets-engine-benefits-slide.jpg)

Workloads can request certificates at runtime and discard them on shutdown, avoiding long-lived revocation lists.

## Vault as an Intermediate CA

Vault typically functions as an intermediate CA, integrating seamlessly with your offline root CA. The flow is:

1.  Vault generates an intermediate CSR.
2.  You sign it with the offline root CA.
3.  You import the signed intermediate certificate into Vault.
4.  Vault issues end-entity certificates on behalf of your root.

![The image is a slide about the PKI Secrets Engine, explaining the use of Vault as an intermediate CA, its integration with existing CA structures, and its capability to perform root and intermediate CA functions. It includes a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878479/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-PKI-Secrets-Engine/pki-secrets-engine-vault-ca-slide.jpg)

> [!important]
> **Warning**
>
> Never expose your root CA online. Keep the root CA offline and only use Vault’s intermediate for runtime operations.

## Certificate Management Architecture

A typical deployment architecture:

1.  **Root CA** (offline, long-lived)
2.  **Vault** running the PKI Secrets Engine (intermediate CA)
3.  **Clients** (VMs, containers, applications) that authenticate to Vault and request certificates

![The image illustrates a common architecture for certificate management, showing a Root Certificate Authority, a Vault with a PKI Secrets Engine as an Intermediate CA, and a process for requesting and responding with certificates.](https://kodekloud.com/kk-media/image/upload/v1752878480/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-PKI-Secrets-Engine/certificate-management-architecture-diagram.jpg)

Clients receive their unique certificates and private keys securely at runtime.

---

## Enabling the PKI Secrets Engine

Enable Vault’s PKI engine at the default or a custom path:

```
# Enable at default path "pki/"
vault secrets enable pki


# Or enable at custom path "hcvop_int/"
vault secrets enable -path=hcvop_int pki
```

## Tuning the Maximum TTL

Set the maximum lease TTL to enforce certificate lifetimes:

```
# Default PKI: max TTL = 30 days
vault secrets tune -max-lease-ttl=720h pki


# Custom PKI at "hcvop_int/": max TTL = 1 year
vault secrets tune -max-lease-ttl=8760h hcvop_int
```

---

## Generating and Signing an Intermediate CSR

1.  **Generate CSR in Vault** (outputs JSON, extract CSR):

    ```
    vault write -format=json \
      hcvop_int/intermediate/generate/internal \
      common_name="hcvop.com Intermediate" \
      | jq -r '.data.csr' > pki_intermediate.csr
    ```

2.  **Sign CSR** with your offline root CA and save as `intermediate.cert.pem`.
3.  **Import the signed certificate** back into Vault:

    ```
    vault write hcvop_int/intermediate/set-signed \
      certificate=@intermediate.cert.pem
    ```

---

## Configuring CA and CRL URLs

Clients fetch the issuer certificate and CRL via these URLs embedded in issued certs:

```
vault write pki/config/urls \
  issuing_certificates="https://vault.example.com:8200/v1/pki/ca" \
  crl_distribution_points="https://vault.example.com:8200/v1/pki/crl"
```

---

## Defining PKI Roles

A **role** in Vault maps policies to certificate settings (allowed domains, TTLs, SANs).

![The image is an informational slide about PKI roles, explaining the mapping between a policy and configuration in a secrets engine, with notable configurations listed. It includes a Vault certification badge and a cartoon character illustration.](https://kodekloud.com/kk-media/image/upload/v1752878481/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-PKI-Secrets-Engine/pki-roles-policy-configuration-slide.jpg)

### Example Role Configurations

![The image describes unique PKI roles with configurations for web, internal apps, and Kubernetes apps, detailing allowed domains, subdomain permissions, and maximum TTL. It also includes a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878482/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-PKI-Secrets-Engine/pki-roles-configurations-web-kubernetes.jpg)

| Role Name              | Allowed Domains | Subdomains | Bare Domains | Max TTL |
| ---------------------- | --------------- | ---------- | ------------ | ------- |
| **web\\\_dmz\\\_role** | dmz.hcvop.com   | ✓          | ✗            | 720h    |
| **internal\\\_apps**   | app.hcvop.com   | ✓          | —            | 24h     |
| **k8s\\\_apps**        | k8s.hcvop.com   | ✓          | ✗            | 4h      |

---

## Creating a PKI Role

```
vault write pki/roles/web_dmz_role \
  allowed_domains=dmz.hcvop.com \
  allow_subdomains=true \
  allow_bare_domains=false \
  allow_glob_domains=false \
  max_ttl=720h \
  allow_localhost=true \
  organization=hcvop \
  country=US
```

![The image illustrates a process for creating roles in a Vault system, showing how different PKI roles request certificates for various applications. It includes icons representing Vault, roles, and applications, with a certification badge in the top right corner.](https://kodekloud.com/kk-media/image/upload/v1752878483/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-PKI-Secrets-Engine/vault-pki-roles-certificate-process.jpg)

Applications authenticate to Vault and request certificates based on their assigned role.

---

## Issuing Certificates

Issue a certificate for a given role:

```
vault write pki/issue/web_dmz_role \
  common_name=dmzhcp01.dmz.hcvop.com \
  alt_names=portal.dmz.hcvop.com \
  max_ttl=720h
```

Response fields:

- `certificate`: TLS certificate (PEM)
- `issuing_ca`: CA certificate chain (Vault intermediate)
- `private_key`: Private key (returned **only once**)
- `private_key_type`: Key algorithm (e.g., rsa)
- `serial_number`: Unique cert serial number

> [!important]
> **Note**
>
> Always save the `private_key` immediately; Vault does not retain it for later retrieval.

---

## Revoking Certificates

Revoke by serial number:

```
vault write pki/revoke \
  serial_number="4d:00:01:30:20:2c:5e:31:ba:a9:7b"
```

The response includes revocation time in Unix and [RFC 3339](https://tools.ietf.org/html/rfc3339) formats.

---

## Cleaning Up the Certificate Store

Periodically tidy expired and revoked certificates:

```
vault write pki/tidy \
  tidy_cert_store=true \
  tidy_revoked_certs=true
```

Vault logs the tidy operation—monitor server logs for completion status.

---

## References

- [Vault PKI Secrets Engine](https://www.vaultproject.io/docs/secrets/pki)
- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)
- [X.509 Certificate Profile](https://tools.ietf.org/html/rfc5280)
- [Managing Certificate Revocation List (CRL)](https://tools.ietf.org/html/rfc5280#section-5.1.2.4)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/d4743df6-33f4-4e60-a234-1c657f4ba2e4)**
>
> Watch video content
