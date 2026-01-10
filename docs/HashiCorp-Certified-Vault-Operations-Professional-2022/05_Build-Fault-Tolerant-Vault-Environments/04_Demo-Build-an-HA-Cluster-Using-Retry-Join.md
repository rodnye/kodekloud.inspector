# Demo Build an HA Cluster Using Retry Join - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Build-Fault-Tolerant-Vault-Environments/Demo-Build-an-HA-Cluster-Using-Retry-Join)

---

## Table of Contents

- Demo Build an HA Cluster Using Retry Join
  - Prerequisites
  - 1. Verify a Clean State
  - 2. Stop Vault on All Nodes
  - 3. Configure retry_join on vault-3 (10.1.101.25)
  - 4. Configure retry_join on vault-2 (10.1.101.108)
  - 5. Configure retry_join on vault-1 (10.1.101.199)
  - 6. Start Vault on All Nodes
  - 7. Initialize the Cluster
  - 8. Verify Cluster Peers
  - What’s Next?
  - Watch Video

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Build Fault Tolerant Vault Environments

# Demo Build an HA Cluster Using Retry Join

In this guide, you’ll learn how to deploy a three-node Vault High Availability (HA) cluster on EC2. By configuring the `retry_join` stanza in each Vault server’s configuration file, nodes will automatically discover and join the Raft-based cluster—eliminating any manual join steps after initialization.

## Prerequisites

- Three EC2 instances named **vault-1**, **vault-2**, **vault-3**, each running Vault 1.10.3+ent
- Raft storage backend
- AWS KMS auto-unseal configured
- Vault binary installed and a systemd unit in place

| Instance | Private IP   |
| -------- | ------------ |
| vault-1  | 10.1.101.199 |
| vault-2  | 10.1.101.108 |
| vault-3  | 10.1.101.25  |

> [!important]
> **Networking Requirements**
>
> Ensure all nodes can communicate over ports **8200** (API) and **8201** (Raft). Configure your security groups accordingly.

---

## 1\. Verify a Clean State

On any node (for example, **vault-3**), stop Vault and clear existing data. Then confirm that Vault is uninitialized:

```
sudo systemctl stop vault
sudo rm -rf /opt/vault/*


vault status
# Expected output:
# Key              Value
# ---              -----
# Initialized      false
# Sealed           true
# Storage Type     raft
# HA Enabled       true
# Version          1.10.3+ent
# Recovery Seal Type awskms
```

---

## 2\. Stop Vault on All Nodes

Before updating configuration, stop Vault on each server:

```
sudo systemctl stop vault
# Repeat this command on vault-1, vault-2, vault-3
```

---

## 3\. Configure retry_join on vault-3 (10.1.101.25)

Edit `/etc/vault/vault.hcl` on **vault-3** and add both peer addresses under the Raft storage stanza:

```
storage "raft" {
  path    = "/opt/vault"
  node_id = "vault-3"


  retry_join {
    leader_api_addr = "http://10.1.101.108:8200"
  }
  retry_join {
    leader_api_addr = "http://10.1.101.199:8200"
  }
}


listener "tcp" {
  address         = "0.0.0.0:8200"
  cluster_address = "0.0.0.0:8201"
  tls_disable     = true
}


seal "awskms" {
  region     = "us-east-1"
  kms_key_id = "arn:aws:kms:us-east-1:003674902126:key/…"
}


api_addr     = "http://10.1.101.25:8200"
cluster_addr = "http://10.1.101.25:8201"
cluster_name = "vault"
ui           = true
log_level    = "INFO"
```

---

## 4\. Configure retry_join on vault-2 (10.1.101.108)

On **vault-2**, update `/etc/vault/vault.hcl`:

```
storage "raft" {
  path    = "/opt/vault"
  node_id = "vault-2"


  retry_join {
    leader_api_addr = "http://10.1.101.25:8200"
  }
  retry_join {
    leader_api_addr = "http://10.1.101.199:8200"
  }
}


listener "tcp" {
  address         = "0.0.0.0:8200"
  cluster_address = "0.0.0.0:8201"
  tls_disable     = true
}


seal "awskms" {
  region     = "us-east-1"
  kms_key_id = "arn:aws:kms:us-east-1:003674902126:key/…"
}


api_addr     = "http://10.1.101.108:8200"
cluster_addr = "http://10.1.101.108:8201"
cluster_name = "vault"
ui           = true
log_level    = "INFO"
```

---

## 5\. Configure retry_join on vault-1 (10.1.101.199)

Finally, modify `/etc/vault/vault.hcl` on **vault-1**:

```
storage "raft" {
  path    = "/opt/vault"
  node_id = "vault-1"


  retry_join {
    leader_api_addr = "http://10.1.101.108:8200"
  }
  retry_join {
    leader_api_addr = "http://10.1.101.25:8200"
  }
}


listener "tcp" {
  address         = "0.0.0.0:8200"
  cluster_address = "0.0.0.0:8201"
  tls_disable     = true
}


seal "awskms" {
  region     = "us-east-1"
  kms_key_id = "arn:aws:kms:us-east-1:003674902126:key/…"
}


api_addr     = "http://10.1.101.199:8200"
cluster_addr = "http://10.1.101.199:8201"
cluster_name = "vault"
ui           = true
log_level    = "INFO"
```

---

## 6\. Start Vault on All Nodes

Bring Vault back online on each server:

```
sudo systemctl start vault
# Do this on vault-1, vault-2, vault-3
```

Verify that the service is running without errors:

```
sudo systemctl status vault
```

---

## 7\. Initialize the Cluster

Pick one node (e.g., **vault-1**) to initialize Vault:

```
vault operator init
# You will see Recovery Keys and an Initial Root Token
```

> [!important]
> **Auto-Unseal with AWS KMS**
>
> Since AWS KMS auto-unseal is enabled, Vault will automatically unseal itself—no manual unseal commands are needed.

---

## 8\. Verify Cluster Peers

Authenticate using the root token you received:

```
vault login <Initial Root Token>
```

Then list your Raft peers:

```
vault operator raft list-peers
# Output should show all three nodes and their roles:
# Node      Address            State     Voter
# ----      -------            -----     -----
# vault-1   10.1.101.199:8201  leader    true
# vault-2   10.1.101.108:8201  follower  true
# vault-3   10.1.101.25:8201   follower  true
```

Congratulations—your Vault HA cluster is up and running, with each node automatically discovering its peers via the `retry_join` configuration.

---

## What’s Next?

- Explore [AWS Auto-Join via Tags](https://www.vaultproject.io/docs/configuration/storage/raft#retry_join-aws) to replace static IPs with dynamic discovery.
- Review the official [Vault HA documentation](https://www.vaultproject.io/docs/enterprise/ha).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/c1dd23ce-c7fd-4564-84d8-4ff14b115bd7/lesson/8dd8efdb-098a-4bca-b2dd-1753b74c0590)**
>
> Watch video content
