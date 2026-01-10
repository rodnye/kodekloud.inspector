# Vault Configuration File - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Learning-the-Vault-Architecture/Vault-Configuration-File)

---

## Table of Contents

- Vault Configuration File
  - Running Vault with a Config File
  - Key Configuration Components
  - Configuration Structure
  - Production-Ready Configuration Example
  - Vault Contents vs. Config File
  - Summary of Stanzas
  - Links & References
  - Watch Video
  - Practice Lab
    - Basic Stanza Examples

---

## Content

HashiCorp Certified: Vault Associate Certification

Learning the Vault Architecture

# Vault Configuration File

In this guide, you’ll learn how to configure HashiCorp Vault for reliable, long-term operation—whether you’re running a single-node server or a multi-node cluster. Vault servers load their settings from a configuration file written in HCL or JSON. This file defines:

- **Storage backend** (Consul, S3, DynamoDB, Integrated Storage)
- **Listener settings** (API and cluster addresses, ports, TLS)
- **Seal mechanism** (AWS KMS, Azure KMS, Transit)
- **Cluster parameters** (cluster name, UI, API address, log level)
- **Optional stanzas** (telemetry, audit devices, etc.)

## Running Vault with a Config File

To start Vault using your configuration file:

```
vault server -config /etc/vault.d/vault.hcl
```

> [!important]
> **Note**
>
> In production environments, manage Vault with a service manager like **systemd** or **Windows Service Manager** to ensure automatic startup and proper log handling.

## Key Configuration Components

| Component     | Description                                      | Example                                              |
| ------------- | ------------------------------------------------ | ---------------------------------------------------- |
| Storage       | Persistent data backend                          | `storage "consul" { ... }`                           |
| Listener      | Network interface, ports, and TLS settings       | `listener "tcp" { address = "0.0.0.0:8200" }`        |
| Seal          | Auto-unseal mechanism configuration              | `seal "awskms" { region = "us-east-1" }`             |
| Telemetry     | Metrics collection and export                    | `telemetry { prometheus_retention_time = "24h" }`    |
| Audit devices | Write-ahead logs of Vault requests and responses | `audit "file" { path = "/var/log/vault_audit.log" }` |

## Configuration Structure

A Vault configuration file comprises multiple named stanzas and top-level parameters. Here’s the skeleton in HCL:

```
listener "tcp" {
  <param1> = <value1>
  <param2> = <value2>
}

seal "awskms" {
  <param1> = <value1>
  <param2> = <value2>
}

# Top-level settings
api_addr     = "<address>"
ui           = true
cluster_name = "<name>"
```

- **listener**: Defines the API port, cluster port, and TLS options.
- **storage**: Configures where Vault persists its data.
- **seal**: Sets up the auto-unseal provider (e.g., KMS).
- **telemetry**: Controls metrics export.

Top-level parameters include:

- `api_addr`
- `cluster_addr`
- `ui`
- `cluster_name`
- `log_level`

### Basic Stanza Examples

```
listener "tcp" {
  address         = "0.0.0.0:8200"
  cluster_address = "0.0.0.0:8201"
  tls_disable     = true    # Do NOT disable TLS in production
}

seal "awskms" {
  region     = "us-east-1"
  kms_key_id = "12345678-abcd-1234-abcd-123456789101"
}
```

- **listener**: Binds Vault to all interfaces on ports 8200 (API) and 8201 (cluster).
- **seal**: Configures AWS KMS for automatic unseal.

> [!important]
> **Warning**
>
> Disabling TLS (`tls_disable = true`) is insecure. Always enable TLS (`tls_disable = false`) in production and provide valid certificates.

## Production-Ready Configuration Example

Use this HCL template as a starting point for a highly available, production-grade Vault cluster:

```
storage "consul" {
  address = "127.0.0.1:8500"
  path    = "vault/"
  token   = "1a2b3c4d-1234-abdc-1234-1a2b3c4d5e6a"
}

listener "tcp" {
  address                  = "0.0.0.0:8200"
  cluster_address          = "0.0.0.0:8201"
  tls_disable              = false
  tls_cert_file            = "/etc/vault.d/client.pem"
  tls_key_file             = "/etc/vault.d/cert.key"
  tls_disable_client_certs = true
}

seal "awskms" {
  region     = "us-east-1"
  kms_key_id = "12345678-abcd-1234-abcd-123456789101"
  endpoint   = "example.kms.us-east-1.vpce.amazonaws.com"
}

api_addr     = "https://vault-us-east-1.example.com:8200"
cluster_addr = "https://node-us-east-1.example.com:8201"
cluster_name = "vault-prod-us-east-1"
ui           = true
log_level    = "INFO"
```

- **storage.consul**: Persists Vault data to a local Consul agent.
- **tls_disable = false**: Enforces TLS; certificates must be valid.
- **seal.awskms.endpoint**: Uses a VPC endpoint for secure AWS KMS access.

## Vault Contents vs. Config File

The Vault configuration file does _not_ manage:

- Secrets Engines
- Auth Methods
- Audit Devices (beyond file/device declaration)
- Vault Policies, Entities, and Groups

These resources are created **inside** Vault after initialization and unseal, using the CLI or API.

## Summary of Stanzas

| Stanza    | Required | Description                            |
| --------- | -------- | -------------------------------------- |
| listener  | Yes      | API and cluster bindings, TLS settings |
| storage   | Yes      | Backend for storing Vault data         |
| seal      | No\\\*   | Auto-unseal provider                   |
| telemetry | No       | Metrics publishing settings            |
| audit     | No       | Audit device declarations              |
| database  | No       | Database credentials rotation          |

\*Vault can run without an auto-unseal seal stanza, but manual unseal is required at each startup.

## Links & References

- [Vault Configuration Docs](https://www.vaultproject.io/docs/configuration)
- [HashiCorp Vault Getting Started](https://learn.hashicorp.com/vault)
- [Consul Storage Backend](https://www.vaultproject.io/docs/configuration/storage/consul)
- [AWS KMS Auto-Unseal](https://www.vaultproject.io/docs/secrets/aws)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/f544757d-0901-47a3-a0e6-d9ab7822ef7a/lesson/0ba0097f-db0a-4b08-9ddf-434cabaa2dc2)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/f544757d-0901-47a3-a0e6-d9ab7822ef7a/lesson/b4b46309-766d-4d7e-99f7-604811d3d563)**
>
> Practice lab
