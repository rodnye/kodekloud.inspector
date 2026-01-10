# Configure a Highly Available Vault Cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Build-Fault-Tolerant-Vault-Environments/Configure-a-Highly-Available-Vault-Cluster)

---

## Table of Contents

- Configure a Highly Available Vault Cluster
  - Single-Node Setup (Not Recommended)
  - Key Characteristics of an Ideal Vault Cluster
  - Integrated Storage Overview
  - Configuring Integrated Storage
  - CLI Management for Integrated Storage
  - Manual Cluster Workflow
  - Viewing and Removing Peers
  - Links and References
  - Watch Video
    - Explicit Retry Join Hosts

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Build Fault Tolerant Vault Environments

# Configure a Highly Available Vault Cluster

In this guide, you’ll learn how to deploy a production-ready, highly available (HA) Vault cluster that offers redundancy, fault tolerance, seamless scalability, and fully replicated storage.

## Single-Node Setup (Not Recommended)

A single-node Vault server cannot tolerate failures or scale out. If the node goes offline, Vault becomes inaccessible—acceptable only for development or testing.

> [!important]
> **Warning**
>
> A single-node Vault instance has zero redundancy. Do **not** use this configuration in production.

![The image illustrates a single-node Vault server architecture, highlighting its lack of redundancy, scalability, and failure tolerance, and includes a configuration file and storage backend. It is labeled as not a recommended architecture.](https://kodekloud.com/kk-media/image/upload/v1752878291/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Configure-a-Highly-Available-Vault-Cluster/single-node-vault-server-architecture.jpg)

## Key Characteristics of an Ideal Vault Cluster

A robust, production-grade Vault cluster should:

- Replicate all data across every node
- Survive one or more node failures without downtime
- Scale horizontally as application demands grow
- Maintain a fully replicated, peer-to-peer architecture

![The image is a slide discussing the ideal characteristics of a cluster, emphasizing redundancy, failure tolerance, scalability, and a fully replicated architecture. It mentions the use of Integrated Storage over Consul for Vault Enterprise and notes that the Vault Operations Professional exam will not include Consul.](https://kodekloud.com/kk-media/image/upload/v1752878292/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Configure-a-Highly-Available-Vault-Cluster/ideal-cluster-characteristics-redundancy-scalability.jpg)

> [!important]
> **Note**
>
> Vault Enterprise supports two storage backends: Integrated Storage (Raft) and [Consul](https://www.consul.io/docs). For production, HashiCorp strongly recommends Integrated Storage (Raft). The [Vault Operations Professional exam](https://www.hashicorp.com/certification/vault-operations-professional) covers only Integrated Storage.

## Integrated Storage Overview

Integrated Storage (Raft) leverages the Raft consensus protocol to replicate data across Vault nodes. Every node retains a full copy of the data. The leader handles writes and streams updates to follower nodes. If the leader goes down, followers elect a new leader almost immediately.

![The image illustrates a multi-node cluster using integrated storage, showing how data is replicated among nodes labeled A, B, and C, with Node B as the Raft leader. It includes a diagram of data replication paths and storage components.](https://kodekloud.com/kk-media/image/upload/v1752878294/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Configure-a-Highly-Available-Vault-Cluster/multi-node-cluster-data-replication-diagram.jpg)

## Configuring Integrated Storage

Add a `storage "raft"` block to your Vault HCL configuration (`config.hcl`), then define your listener and seal settings:

```
storage "raft" {
  path    = "/opt/vault/data"
  node_id = "node-a.hcvop.com"


  # Auto-join using AWS tags
  retry_join {
    auto_join = "provider=aws region=us-east-1 tag_key=vault tag_value=east-1"
  }
}


listener "tcp" {
  address         = "0.0.0.0:8200"
  cluster_address = "0.0.0.0:8201"
  tls_disable     = 0
}


seal "awskms" {
  region     = "us-east-1"
  kms_key_id = "12345678-abcd-1234-abcd-123456789101"
}


api_addr     = "https://vault.hcvop.com:8200"
cluster_addr = "https://node-a.hcvop.com:8201"
cluster_name = "vault-prod-us-east-1"
ui           = true
log_level    = "INFO"
```

Key settings:

- `path`  
  Local filesystem path for Raft data. Must be identical on every node.
- `node_id`  
  Unique identifier for each Vault instance.
- `retry_join`  
  Automates cluster formation. You can use cloud provider tags or explicit host addresses.

### Explicit Retry Join Hosts

If you prefer manually listing each peer:

```
storage "raft" {
  path    = "/opt/vault/data"
  node_id = "node-a.hcvop.com"


  retry_join {
    leader_api_addr = "https://node-b.hcvop.com:8200"
  }
  retry_join {
    leader_api_addr = "https://node-c.hcvop.com:8200"
  }
  retry_join {
    leader_api_addr = "https://node-d.hcvop.com:8200"
  }
  retry_join {
    leader_api_addr = "https://node-e.hcvop.com:8200"
  }
}
```

## CLI Management for Integrated Storage

![The image is a slide about managing integrated storage via CLI using the `vault operator raft` command, listing commands like `list-peers`, `join`, `remove-peer`, and `snapshot` with their functions. It has a yellow background and a cartoon character at the bottom right.](https://kodekloud.com/kk-media/image/upload/v1752878295/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Configure-a-Highly-Available-Vault-Cluster/managing-integrated-storage-cli-vault.jpg)

Use `vault operator raft` subcommands to manage your cluster:

| Command                                | Description                                  |
| -------------------------------------- | -------------------------------------------- |
| `vault operator raft list-peers`       | List current cluster members and their roles |
| `vault operator raft join <leader>`    | Add a new follower to the Raft cluster       |
| `vault operator raft remove-peer <id>` | Remove a node gracefully from the cluster    |
| `vault operator raft snapshot`         | Create or restore a cluster snapshot         |

## Manual Cluster Workflow

1.  Initialize and unseal the leader (node A):

    ```
    vault operator init
    vault operator unseal
    ```

2.  On each follower (nodes B, C, …), join the cluster:

    ```
    vault operator raft join https://node-a.hcvop.com:8200
    ```

3.  If manual unseal is in use:

    ```
    vault operator unseal
    ```

    > [!important]
    > **Note**
    >
    > With auto-unseal (e.g., AWS KMS), Vault nodes unseal themselves after joining.

4.  Repeat steps 2–3 for each node until all peers have joined.

## Viewing and Removing Peers

Log in and inspect your Raft peers:

```
vault login <root_token>
vault operator raft list-peers
```

| Node   | Address          | State    | Voter |
| ------ | ---------------- | -------- | ----- |
| node-a | 10.0.101.22:8201 | leader   | true  |
| node-b | 10.0.101.23:8201 | follower | true  |
| node-c | 10.0.101.24:8201 | follower | true  |
| node-d | 10.0.101.25:8201 | follower | true  |
| node-e | 10.0.101.26:8201 | follower | true  |

To remove a peer:

```
vault operator raft remove-peer node-e
# Peer removed successfully!
```

After removal, re-run `vault operator raft list-peers` to confirm.

A hands-on lab will walk you through both manual and automated cluster formation.

## Links and References

- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)
- [Vault Integrated Storage (Raft)](https://www.vaultproject.io/docs/configuration/storage/raft)
- [Consul Storage Backend](https://www.consul.io/docs)
- [Vault Operations Professional Certification](https://www.hashicorp.com/certification/vault-operations-professional)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/c1dd23ce-c7fd-4564-84d8-4ff14b115bd7/lesson/8cfe546c-02ba-4273-a3e2-19f0d82fa146)**
>
> Watch video content
