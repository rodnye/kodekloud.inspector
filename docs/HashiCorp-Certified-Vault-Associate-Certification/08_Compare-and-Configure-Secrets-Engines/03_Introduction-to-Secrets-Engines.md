# Introduction to Secrets Engines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-and-Configure-Secrets-Engines/Introduction-to-Secrets-Engines)

---

## Table of Contents

- Introduction to Secrets Engines
  - What Are Secrets Engines?
  - Defining a Secret
  - Dynamic Credentials Workflow
  - Built-In Secrets Engines
  - Key/Value (KV) Secrets Engine
  - Database Secrets Engine
  - Grouping Secrets Engines by Function
  - Overview of Built-In Engines
  - Next Steps
  - References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare and Configure Secrets Engines

# Introduction to Secrets Engines

When you check into a hotel, you receive a room key—much like obtaining a token in [HashiCorp Vault](https://www.vaultproject.io/). Once Authenticated, you can use that token (or key card) to access your room, gym, or spa without returning to the front desk every time.

![The image shows a hotel reception scene with two people, one handing over a room key, and a close-up of a keycard with instructions. The title "Vault Interfaces" is at the top.](https://kodekloud.com/kk-media/image/upload/v1752878091/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Secrets-Engines/hotel-reception-keycard-vault-interfaces.jpg)

In Vault, **Secrets Engines** are like these hotel amenities: they represent the capabilities you want to access once you present a valid token.

![The image shows a gym with treadmills, exercise bikes, and fitness equipment, alongside a graphic of a hotel key card with instructions. The text mentions "Vault Interfaces" and includes a cartoon character with sunglasses.](https://kodekloud.com/kk-media/image/upload/v1752878094/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Secrets-Engines/gym-fitness-equipment-key-card.jpg)

Once your token is validated, you can interact with one or more Secrets Engines without re-authenticating. These engines provide functionality such as storing static credentials, generating dynamic secrets, encrypting data, issuing certificates, and more.

![The image illustrates the concept of Vault Secrets Engines, showing how vault clients use tokens to access various secrets engines like Kubernetes, databases, and cloud services. It includes icons representing different components such as KV, PKI, and Transit.](https://kodekloud.com/kk-media/image/upload/v1752878094/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Secrets-Engines/vault-secrets-engines-concept-diagram.jpg)

> [!important]
> **Note**
>
> Secrets Engines are the primary reason to deploy Vault. They deliver on Vault’s promise: centralized, dynamic, and secure management of sensitive information.

---

## What Are Secrets Engines?

A **Secrets Engine** is a plugin-style component in Vault that you enable at a specific mount path. Each engine can:

- **Store** static key/value data
- **Generate** dynamic credentials on demand
- **Encrypt/Decrypt** data (via the Transit engine)
- **Issue** certificates (via the PKI engine)

You can enable multiple engines—including multiple instances of the same type—by assigning unique mount paths.

![The image is a slide about "Secrets Engines," explaining their role in storing, generating, or encrypting data, and highlighting their functionality as plugins in Vault. It also mentions that secrets engines are enabled and isolated at a unique path.](https://kodekloud.com/kk-media/image/upload/v1752878096/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Secrets-Engines/secrets-engines-vault-functionality-slide.jpg)

---

## Defining a Secret

A **secret** is any piece of data your organization considers sensitive:

- Usernames and passwords
- API keys, tokens, or SSH credentials
- TLS certificates and private keys
- Database credentials
- Application configuration files

![The image explains what constitutes a secret within an organization, listing examples like usernames, passwords, TLS certificates, API keys, database credentials, and application data.](https://kodekloud.com/kk-media/image/upload/v1752878097/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Secrets-Engines/organization-secrets-examples-list.jpg)

Vault treats secrets as a service. You generate, manage, and revoke them on demand, backed by leases and audit trails:

- **Dynamic Credentials**: Unique, short-lived credentials reduce blast radius.
- **Automatic Revocation**: Secrets expire at the end of their lease.
- **Audit Trails**: Full visibility into who accessed what and when.

> **Scenario:** A fleet of web servers requests dynamic database credentials from Vault. If one server is compromised, only its credentials are affected. You can pinpoint and revoke its credentials without impacting others.

![The image is an infographic titled "Secrets as a Service," explaining how to use Vault to manage credentials, with features like automatic revocation, audit trails, and access control. It includes a flowchart showing the process from a Vault Admin to an Amazon S3 Bucket.](https://kodekloud.com/kk-media/image/upload/v1752878098/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Secrets-Engines/secrets-as-a-service-vault-infographic.jpg)

---

## Dynamic Credentials Workflow

1.  **Application Request**  
    The web app requests AWS credentials from Vault’s AWS Secrets Engine.
2.  **Credential Generation**  
    Vault dynamically creates IAM credentials tied to a lease.
3.  **Use of Credentials**  
    The application uses these to access AWS services (e.g., S3).
4.  **Automatic Revocation**  
    Credentials expire and are revoked at the end of their lease.

On the admin side, you typically run:

```
vault secrets enable aws
vault write aws/config/root \
    access_key=<YOUR_ACCESS_KEY> secret_key=<YOUR_SECRET_KEY> region=us-west-2
vault write aws/roles/app-role \
    iam_policy_json=@policy.json \
    ttl=60m
```

---

## Built-In Secrets Engines

Vault includes a broad set of engines by default. Select and enable the ones you need:

| Category                  | Examples                                                    |
| ------------------------- | ----------------------------------------------------------- |
| Cloud Platforms           | AWS, Azure, Google Cloud, Alibaba Cloud                     |
| Databases                 | MySQL, PostgreSQL, MongoDB, Oracle, Cassandra, Snowflake    |
| Identity & Access         | Active Directory, Consul, OpenLDAP, Cubbyhole               |
| Key Management            | AWS KMS, Azure Key Vault, GCP KMS, _(Enterprise Only)_ KMIP |
| Encryption & Certificates | Transit, Transform _(Enterprise Only)_, PKI, Venafi         |
| Utilities                 | SSH, TOTP, Terraform Cloud                                  |

![The image lists various "Secrets Engines" in colorful boxes, including services like AWS, Google Cloud, and MongoDB Atlas. It features a stylized character in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878099/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Secrets-Engines/secrets-engines-aws-google-mongodb.jpg)

---

## Key/Value (KV) Secrets Engine

Use the KV engine to store static data.

- **KV v1**: Overwrites on write; no history.
- **KV v2**: Versioned store; supports history and rollback.

![The image is a diagram titled "Secrets Engines" showing a flow from "KV" to "Key/Value – Version 1" and "Key/Value – Version 2." It includes a small character illustration in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878100/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Secrets-Engines/secrets-engines-diagram-kv-flow.jpg)

---

## Database Secrets Engine

Dynamically generate database credentials for many backends:

- Cassandra, Couchbase, Elasticsearch, HANA DB, InfluxDB
- MongoDB, Microsoft SQL Server, MySQL/MariaDB (Aurora, RDS)
- Oracle, PostgreSQL, Redshift, Snowflake
- Custom database plugins

![The image is a diagram titled "Secrets Engines" showing a list of database types, including Cassandra, MongoDB, PostgreSQL, and others, connected to a "Database" label.](https://kodekloud.com/kk-media/image/upload/v1752878101/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Secrets-Engines/secrets-engines-database-types-diagram.jpg)

---

> [!important]
> **Warning**
>
> Key Management and Transform engines are **Enterprise Only**. Ensure your Vault license includes these features before enabling.

---

## Grouping Secrets Engines by Function

![The image lists various "Secrets Engines" grouped by function, including cloud services, databases, identity management, and encryption tools. It features icons representing each category and a pixelated design on the right side.](https://kodekloud.com/kk-media/image/upload/v1752878102/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Secrets-Engines/secrets-engines-functions-icons-pixelated.jpg)

- **Cloud Platforms**: AWS, Azure, GCP, Alibaba
- **Databases**: SQL/NoSQL backends
- **Identity/Access**: Active Directory, Consul, OpenLDAP, Cubbyhole
- **Security & Encryption**: KMIP, PKI, Transit, Transform, Venafi
- **Storage**: KV v1 & v2

---

## Overview of Built-In Engines

![The image describes different secrets engines and their functions, including Active Directory, AliCloud, AWS, Azure, and Consul, each with a brief explanation of their credential management capabilities.](https://kodekloud.com/kk-media/image/upload/v1752878103/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Secrets-Engines/secrets-engines-credential-management-overview.jpg)

- **Active Directory**  
  Rotate service account passwords; Vault requires a service account for rotation.
- **Cloud (AWS/Azure/GCP)**  
  Dynamic cloud credentials for resource access.
- **Consul**  
  Issue ACL tokens programmatically.
- **Cubbyhole**  
  Token-scoped private storage space.
- **Database**  
  On-demand DB credentials.
- **KMIP** _(Enterprise)_  
  Vault acts as a KMIP server for storage encryption.
- **KV (v1/v2)**  
  Simple vs. versioned key/value storage.
- **Identity**  
  Built-in identity and group management.
- **MongoDB Atlas, Nomad, OpenLDAP**  
  Platform-specific credential generators.
- **PKI**  
  Vault as a Certificate Authority for TLS/mTLS.
- **RabbitMQ, SSH, TOTP, Terraform Cloud**  
  Short-lived credentials and tokens.
- **Transit**  
  Encryption-as-a-service; stateless crypto API.
- **Transform** _(Enterprise)_  
  Data tokenization and masking.
- **Venafi**  
  Certificate issuance via Venafi integration.

![The image is a slide titled "Secrets Engines" that explains the functions of different secrets engines like Cubbyhole, Database, Google Cloud, Google Cloud KMS, and Key Management. Each engine's purpose is briefly described, focusing on data storage, credential generation, and key management.](https://kodekloud.com/kk-media/image/upload/v1752878104/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Secrets-Engines/secrets-engines-data-storage-credential-management.jpg)

![The image is an informational graphic about different "Secrets Engines" in Vault, describing their functions such as KMIP, KV, Identity, MongoDB Atlas, and Nomad. Each engine is briefly explained with its specific role and capabilities.](https://kodekloud.com/kk-media/image/upload/v1752878105/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Secrets-Engines/vault-secrets-engines-info-graphic.jpg)

![The image describes different secrets engines and their functions, including OpenLDAP, PKI, RabbitMQ, SSH, and Terraform Cloud. Each engine is associated with specific tasks like managing credentials, generating certificates, and providing secure authentication.](https://kodekloud.com/kk-media/image/upload/v1752878107/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Secrets-Engines/secrets-engines-functions-openldap-pki.jpg)

---

## Next Steps

You’ve learned the core concepts and built-in Secrets Engines in Vault. In the following sections, we’ll dive into configuration examples, best practices, and real-world use cases for each engine.

---

## References

- [Vault Documentation – Secrets Engines](https://www.vaultproject.io/docs/secrets)
- [Dynamic Secrets](https://www.vaultproject.io/docs/concepts/dynamic-secrets)
- [KV Secrets Engine](https://www.vaultproject.io/docs/secrets/kv)
- [HashiCorp Vault on GitHub](https://github.com/hashicorp/vault)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cb962cde-84d3-4b26-8875-e8f093d77244/lesson/4421d57f-b1ad-4f4c-a3fc-9d901aae3664)**
>
> Watch video content
