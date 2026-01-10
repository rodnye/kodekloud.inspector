# Demo Build an HA Cluster Manually - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Build-Fault-Tolerant-Vault-Environments/Demo-Build-an-HA-Cluster-Manually)

---

## Table of Contents

- Demo Build an HA Cluster Manually
  - Cluster Topology
  - 1. Verify Vault Status on All Nodes
  - 2. Initialize the Leader (vault-3)
  - 3. List Raft Peers on vault-3
  - 4. Join vault-1 to the Cluster
  - 5. Add vault-2 to the Raft Cluster
  - 6. Test Leader Failover
  - 7. Manual Step-Down
  - Summary
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Build Fault Tolerant Vault Environments

# Demo Build an HA Cluster Manually

In this tutorial, you’ll manually deploy a three-node Vault cluster on AWS EC2 using the Raft storage backend and AWS KMS auto-unseal. This configuration provides strong consistency, high-availability failover, and seamless unsealing.

## Cluster Topology

We have three EC2 instances running Vault v1.10.3+ent:

| Node    | IP Address   | Role               |
| ------- | ------------ | ------------------ |
| vault-3 | 10.1.101.25  | Initial leader     |
| vault-1 | 10.1.101.199 | Follower candidate |
| vault-2 | 10.1.101.108 | Follower candidate |

Each instance is configured with:

- `storage "raft"` (Vault Raft storage backend)
- `seal "awskms"` (AWS KMS auto-unseal)

## 1\. Verify Vault Status on All Nodes

On each node, confirm Vault is running but neither initialized nor unsealed:

```
vault status
```

Expected output:

Key Value

---

Recovery Seal Type awskms  
Initialized false  
Sealed true  
Version 1.10.3+ent  
Storage Type raft  
HA Enabled true

## 2\. Initialize the Leader (vault-3)

SSH into vault-3 and run:

```
vault operator init
```

Save the recovery keys and the Initial Root Token securely.

```
vault status
```

Now you should see `Initialized true` but `Sealed true`. AWS KMS will auto-unseal followers when they join.

> [!important]
> **Warning**
>
> Store your recovery keys and root token in a secure vault or vaultless backup. Losing them can lock you out of your cluster.> [!important]
> **Note**
>
> Ensure the IAM role attached to each EC2 instance has permissions to decrypt with your AWS KMS key, or auto-unseal will fail.

## 3\. List Raft Peers on vault-3

Authenticate with the root token and list peers:

```
vault login <root-token>
vault operator raft list-peers
```

Initially, only vault-3 appears as the `leader`.

## 4\. Join vault-1 to the Cluster

On vault-1:

```
vault operator raft join http://10.1.101.25:8200
```

Back on vault-3, watch vault-1 join and become a voter:

```
vault operator raft list-peers
```

Repeat until vault-1’s **Voter** column is `true`. Then on vault-1:

```
vault status
```

You should see:

- `Initialized true`
- `Sealed false`
- `Performance Standby Node true`

## 5\. Add vault-2 to the Raft Cluster

On vault-2:

```
vault operator raft join http://10.1.101.25:8200
```

Confirm all three peers are present and voters on any node:

```
vault operator raft list-peers
```

## 6\. Test Leader Failover

1.  **Stop** Vault on the current leader (vault-3):

    ```
    sudo systemctl stop vault
    ```

2.  On vault-1 or vault-2, confirm a new leader election:

    ```
    vault operator raft list-peers
    ```

3.  **Restart** vault-3:

    ```
    sudo systemctl start vault
    ```

vault-3 rejoins as a follower and does not reclaim leadership automatically.

## 7\. Manual Step-Down

Force the current leader to step down manually (on vault-1, for example):

```
vault operator step-down
```

Confirm the new leader:

```
vault operator raft list-peers
```

## Summary

- Initialized vault-3 and formed a single-node cluster.
- Joined vault-1 and vault-2 with `vault operator raft join`.
- Verified AWS KMS auto-unseal on followers.
- Simulated automatic leader election by stopping the leader.
- Demonstrated manual failover using `vault operator step-down`.

Next, we’ll automate cluster formation with the \[Raft retry-join configuration\] and EC2 tags for dynamic membership.

## Links and References

- [Vault Raft Storage Backend](https://www.vaultproject.io/docs/concepts/raft-backend)
- [Vault AWS KMS Auto-Unseal](https://www.vaultproject.io/docs/seal/aws-kms)
- [Raft Retry-Join Configuration](https://www.vaultproject.io/docs/configuration/retry-join#raft)
- [Using EC2 Tags](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/c1dd23ce-c7fd-4564-84d8-4ff14b115bd7/lesson/81a2a13d-24d9-4754-89d7-13e97ce7e060)**
>
> Watch video content
