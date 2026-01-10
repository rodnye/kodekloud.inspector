# Demo Unsealing with Transit Auto Unseal - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Learning-the-Vault-Architecture/Demo-Unsealing-with-Transit-Auto-Unseal)

---

## Table of Contents

- Demo Unsealing with Transit Auto Unseal
  - Environment Overview
  - 1. Configure the Transit Cluster
  - 2. Configure the Target Cluster
  - 3. Initialize and Verify Auto Unseal
  - 4. Post-Unseal Operations
  - Conclusion
  - Links and References
  - Watch Video
    - 1.1 Enable the Transit Secrets Engine
    - 1.2 Create an Encryption Key
    - 1.3 Define an Unseal Policy
    - 1.4 Create a Token for Auto Unseal
    - 2.1 Verify Vault Status
    - 2.2 Update Vault Configuration
    - 2.3 Restart Vault

---

## Content

HashiCorp Certified: Vault Associate Certification

Learning the Vault Architecture

# Demo Unsealing with Transit Auto Unseal

In this guide, we’ll show you how to configure one Vault cluster as a centralized Transit auto-unseal backend for another Vault cluster. Using Vault’s Transit Secrets Engine, the target cluster will automatically unseal during initialization, reducing manual intervention.

## Environment Overview

We have two Vault clusters running in an AWS environment:

| Cluster         | IP Address | Role                          |
| --------------- | ---------- | ----------------------------- |
| Transit Cluster | 10.0.1.209 | Transit Secrets Engine server |
| Target Cluster  | 10.0.1.37  | Raft-backed Vault instance    |

Open SSH sessions to both nodes before proceeding:

```
# Transit Cluster
ssh ec2-user@10.0.1.209


# Target Cluster
ssh ec2-user@10.0.1.37
```

> [!important]
> **Warning**
>
> Ensure that both nodes can communicate over port `8200` and that the Vault CLI is installed and in your `PATH`.

---

## 1\. Configure the Transit Cluster

### 1.1 Enable the Transit Secrets Engine

Verify existing engines and enable `transit`:

```
vault secrets list
vault secrets enable transit
```

### 1.2 Create an Encryption Key

Create a new key named `unseal-key`:

```
vault write -f transit/keys/unseal-key
vault list transit/keys
```

### 1.3 Define an Unseal Policy

Create a file named `policy.hcl` with the following content:

```
path "transit/encrypt/unseal-key" {
  capabilities = ["update"]
}


path "transit/decrypt/unseal-key" {
  capabilities = ["update"]
}
```

Upload the policy:

```
vault policy write unseal policy.hcl
```

### 1.4 Create a Token for Auto Unseal

Generate a token scoped to the `unseal` policy:

```
vault token create -policy=unseal
```

> [!important]
> **Note**
>
> Save the `token` output securely. You will reference it in the target cluster’s configuration (for example, by exporting it as `VAULT_SEAL_TOKEN`).

---

## 2\. Configure the Target Cluster

### 2.1 Verify Vault Status

On the target node, check that Vault is initialized and sealed:

```
vault status
```

### 2.2 Update Vault Configuration

Edit `/etc/vault.d/vault.hcl` to include your Raft storage and the transit seal stanza:

```
storage "raft" {
  path    = "/opt/vault3/data"
  node_id = "node-us-east-1"


  retry_join {
    auto_join = "provider=aws region=us-east-1 tag_key=vault tag_value=us-east-1"
  }
}


seal "transit" {
  address    = "http://10.0.1.209:8200"
  token      = "s.v9hDNIycSM8ZL7wsFo9vD0i"
  key_name   = "unseal-key"
  mount_path = "transit"
}


listener "tcp" {
  address         = "0.0.0.0:8200"
  cluster_address = "0.0.0.0:8201"
  tls_disable     = true
}


api_addr     = "http://10.0.1.37:8200"
cluster_addr = "http://10.0.1.37:8201"
cluster_name = "vault-prod-us-east-1"
ui           = true
log_level    = "INFO"
```

### 2.3 Restart Vault

Restart and verify that the seal type is now Transit:

```
sudo systemctl restart vault
vault status
```

---

## 3\. Initialize and Verify Auto Unseal

Initialize the target cluster:

```
vault operator init
```

You should see your recovery keys and root token. Immediately after, Vault will auto-unseal:

```
vault status
```

The `Sealed` field should read `false`, and `Recovery Seal Type` will switch to `shamir`.

---

## 4\. Post-Unseal Operations

Log in with the initial root token:

```
vault login <initial-root-token>
```

Enable additional engines and store sample data:

```
vault secrets enable azure
vault secrets enable -path=vaultcourse kv


vault kv put vaultcourse/bryan bryan=bryan
vault kv get vaultcourse/bryan
```

Restarting Vault will now preserve the unsealed state:

```
sudo systemctl restart vault
vault status
```

---

## Conclusion

You’ve successfully set up a centralized Transit Secrets Engine to auto-unseal a Raft-backed Vault cluster. This setup automates unsealing, streamlines recovery, and maintains best practices for security and operations.

---

## Links and References

- [Vault Transit Secrets Engine](https://www.vaultproject.io/docs/secrets/transit)
- [Vault Auto Unseal with Transit](https://www.vaultproject.io/docs/seal/transit-auto-unseal)
- [Vault Raft Storage Backend](https://www.vaultproject.io/docs/storage/raft)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/f544757d-0901-47a3-a0e6-d9ab7822ef7a/lesson/66d6b1c0-e689-444c-8d5f-a30aa4c84101)**
>
> Watch video content
