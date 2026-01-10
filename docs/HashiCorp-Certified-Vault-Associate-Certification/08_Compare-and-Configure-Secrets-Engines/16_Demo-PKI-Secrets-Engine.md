# Demo PKI Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-and-Configure-Secrets-Engines/Demo-PKI-Secrets-Engine)

---

## Table of Contents

- Demo PKI Secrets Engine
  - Step-by-Step Overview
  - 1. Enable and Tune the Root PKI Engine
  - 2. Generate the Root Certificate
  - 3. Configure CA and CRL Distribution URLs
  - 4. Enable and Tune the Intermediate PKI Engine
  - 5. Generate the Intermediate CSR
  - 6. Sign the Intermediate CSR with the Root
  - 7. Import the Signed Intermediate Certificate
  - 8. Create a Role for Issuing Certificates
  - 9. Issue a Certificate from the Intermediate
  - 10. View Engines and Certificates in the Vault Web UI
  - References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare and Configure Secrets Engines

# Demo PKI Secrets Engine

Welcome to this hands-on guide for Vault’s PKI Secrets Engine. In this tutorial, you will:

- Deploy a root Certificate Authority (CA) in Vault
- Create and sign an intermediate CA
- Define a role for issuing certificates
- Request certificates from the intermediate CA

Follow along with the full HashiCorp Learn tutorial: [Building Your Own Certificate Authority (CA) Using Vault](https://learn.hashicorp.com/tutorials/vault/pki-engine).

![The image shows a webpage from HashiCorp Learn about building your own Certificate Authority (CA) using Vault. It includes a navigation menu and a list of steps for the process.](https://kodekloud.com/kk-media/image/upload/v1752878073/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-PKI-Secrets-Engine/hashicorp-learn-build-certificate-authority.jpg)

> [!important]
> **Prerequisites**
>
> - A running Vault cluster (we’ll use AWS).
> - Vault CLI installed and authenticated.
> - `jq` installed for JSON parsing.

## Step-by-Step Overview

| Step | Action                                           | Path       | TTL             |
| ---- | ------------------------------------------------ | ---------- | --------------- |
| 1    | Enable Root PKI Engine                           | `pki/`     | 87600h (10 yrs) |
| 2    | Generate Root Certificate                        | —          | 87600h          |
| 3    | Configure CA & CRL URLs                          | —          | —               |
| 4    | Enable Intermediate PKI Engine                   | `pki_int/` | 43800h (5 yrs)  |
| 5    | Generate Intermediate CSR                        | —          | —               |
| 6    | Sign Intermediate CSR with Root                  | —          | 43800h          |
| 7    | Import Signed Intermediate Certificate           | —          | —               |
| 8    | Create Certificate Role                          | `pki_int/` | 720h            |
| 9    | Issue a Certificate from the Intermediate Engine | `pki_int/` | 24h (example)   |
| 10   | View Engines & Certificates in the Vault UI      | —          | —               |

---

## 1\. Enable and Tune the Root PKI Engine

First, verify no PKI engine is enabled:

```
vault secrets list
```

Enable the root PKI engine and set its maximum lease TTL to 10 years:

```
vault secrets enable pki
vault secrets tune --max-lease-ttl=87600h pki
```

---

## 2\. Generate the Root Certificate

Create an internal root CA certificate. This outputs only the PEM-format certificate:

```
vault write -field=certificate pki/root/generate/internal \
    common_name="vaultadvanced.com" ttl=87600h \
  > ca_cert.crt
```

Confirm the file:

```
ls -l ca_cert.crt
```

---

## 3\. Configure CA and CRL Distribution URLs

Point Vault to the endpoints where clients can retrieve the issuing CA and CRL:

```
vault write pki/config/urls \
    issuing_certificates="http://127.0.0.1:8200/v1/pki/ca" \
    crl_distribution_points="http://127.0.0.1:8200/v1/pki/crl"
```

---

## 4\. Enable and Tune the Intermediate PKI Engine

Remove any existing intermediate engine, then enable a fresh one with a 5-year TTL:

```
vault secrets disable pki_int


vault secrets enable -path=pki_int -description="Intermediate CA" pki
vault secrets tune --max-lease-ttl=43800h pki_int
```

---

## 5\. Generate the Intermediate CSR

Have the intermediate engine generate a private key and CSR. Extract the CSR to a file:

```
vault write -format=json pki_int/intermediate/generate/internal \
    common_name="vaultadvanced.com Intermediate Authority" \
  | jq -r '.data.csr' > pki_intermediate.csr
```

Verify both the CA and CSR files:

```
ls -l ca_cert.crt pki_intermediate.csr
```

---

## 6\. Sign the Intermediate CSR with the Root

Submit the CSR to the root engine and save the signed intermediate certificate:

```
vault write -format=json pki/root/sign-intermediate \
    csr=@pki_intermediate.csr ttl=43800h \
  | jq -r '.data.certificate' > intermediate.cert.pem
```

---

## 7\. Import the Signed Intermediate Certificate

Configure the intermediate engine to use its signed certificate:

```
vault write pki_int/intermediate/set-signed \
    certificate=@intermediate.cert.pem
```

---

## 8\. Create a Role for Issuing Certificates

Define a role named `vaultadvanced` that can issue certificates for `vaultadvanced.com` and its subdomains:

```
vault write pki_int/roles/vaultadvanced \
    allowed_domains="vaultadvanced.com" \
    allow_subdomains=true \
    max_ttl="720h"
```

Verify the new role:

```
vault read pki_int/roles/vaultadvanced
```

---

## 9\. Issue a Certificate from the Intermediate

Request a certificate with a 24-hour TTL:

```
vault write pki_int/issue/vaultadvanced \
    common_name="learn.vaultadvanced.com" ttl="24h"
```

> [!important]
> **Secure Your Private Key**
>
> The `private_key` is only returned at issuance. Store it securely, as Vault will not retain it for later retrieval.

You can issue additional short-lived certificates, for example:

```
vault write pki_int/issue/vaultadvanced \
    common_name="atm01.vaultadvanced.com" ttl="1h"
```

---

## 10\. View Engines and Certificates in the Vault Web UI

![The image shows a web interface for HashiCorp Vault, displaying a list of secret engines such as "cubbyhole" and "pki." There is a warning about using a root token and a welcome message offering a tour of the Vault Web UI.](https://kodekloud.com/kk-media/image/upload/v1752878074/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-PKI-Secrets-Engine/hashicorp-vault-web-ui-secret-engines.jpg)

In the UI, navigate to **pki/** and **pki_int/** to inspect roles and issued certificates (serial numbers only, no private keys).

---

## References

- [Vault PKI Secrets Engine](https://www.vaultproject.io/docs/secrets/pki)
- [Building Your Own Certificate Authority (CA) Using Vault](https://learn.hashicorp.com/tutorials/vault/pki-engine)
- [Vault CLI Installation](https://www.vaultproject.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cb962cde-84d3-4b26-8875-e8f093d77244/lesson/e1eac443-0e80-4628-868d-87484e7a4d49)**
>
> Watch video content
