# Demo Promote a Secondary Cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Build-Fault-Tolerant-Vault-Environments/Demo-Promote-a-Secondary-Cluster)

---

## Table of Contents

- Demo Promote a Secondary Cluster
  - Quick Reference
  - 1. Verify Current DR Replication Status
  - 2. Demote the Current Primary Cluster
  - 3. Generate a DR Operation Token on the Secondary
  - 4. Promote the Secondary to Primary
  - 5. Verify the New Primary
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Build Fault Tolerant Vault Environments

# Demo Promote a Secondary Cluster

In this guide, you’ll learn how to safely **demote** the existing primary cluster in a Vault Disaster Recovery (DR) replication setup and then **promote** the DR secondary cluster to become the new primary. This procedure ensures minimal downtime and maintains data integrity across clusters.

> [!important]
> **Prerequisites**
>
> - Vault version **1.9+** installed on both clusters
> - Network connectivity between primary and secondary
> - Root or privileged token access on both clusters
> - `jq` installed for JSON formatting

## Quick Reference

| Step | Action                                   | Command                                            |
| ---- | ---------------------------------------- | -------------------------------------------------- |
| 1    | Verify DR replication status on primary  | `vault read sys/replication/dr/status`             |
| 2    | Demote primary to secondary              | `vault write -f sys/replication/dr/primary/demote` |
| 3    | Generate DR operation token on secondary | `vault operator generate-root -dr-token`           |
| 4    | Promote secondary to primary             | `vault write sys/replication/dr/secondary/promote` |
| 5    | Verify the new primary status and peers  | `vault operator raft list-peers`                   |

---

## 1\. Verify Current DR Replication Status

On your **primary** cluster, confirm that the DR replication relationship is healthy:

```
vault read -format=json sys/replication/dr/status | jq
```

Sample output:

```
{
  "mode": "primary",
  "state": "running",
  "known_secondaries": ["secondary-dallas"],
  "secondaries": [
    {
      "node_id": "secondary-dallas",
      "connection_status": "connected",
      "api_address": "http://10.1.101.108:8200",
      "cluster_address": "https://10.1.101.108:8201",
      "last_heartbeat": "2022-05-24T20:13:45Z"
    }
  ]
}
```

If the `connection_status` is not `connected`, troubleshoot network connectivity and TLS settings before proceeding.

---

## 2\. Demote the Current Primary Cluster

Demoting the primary ensures there is no conflict when promoting the secondary.

```
# Verify your token
vault token lookup

# Demote primary to secondary
vault write -f sys/replication/dr/primary/demote
```

> [!important]
> **Warning**
>
> Demoting the primary will briefly interrupt Vault service on that cluster. Ensure maintenance windows and inform your team.

Expected warning:

```
WARNING! The following warnings were returned from Vault:
* This cluster is being demoted to a replication secondary. Vault will be unavailable for a brief period and will resume service shortly.
```

---

## 3\. Generate a DR Operation Token on the Secondary

Switch context to your **DR secondary** cluster to create a one-time operation token required for promotion.

1.  **Initiate token generation**

    ```
    vault operator generate-root -dr-token
    ```

    You’ll receive an **operation nonce**.

2.  **Unseal with quorum of unseal keys**  
    Provide any 3 of 5 unseal keys from the former primary:

    ```
    vault operator generate-root -dr-token
    # Enter unseal key #1
    # Enter unseal key #2
    # Enter unseal key #3
    ```

    Vault returns an **encoded token**, e.g.:

    ```
    Encoded Token: LDJQkQUE6DhyVWITrMHJ2dCgFPjVQGAMLQPEfCw
    ```

3.  **Decode the DR operation token**

    ```
    vault operator generate-root -dr-token \
      -otp="2ac123e0-d768-ce9e-ed7f-58eba3091a8f" \
      -decode="LDJQkQUE6DhyVWITrMHJ2dCgFPjVQGAMLQPEfCw"
    ```

    Output:

    ```
    DR Operation Token: hvs.vjJaqI8ACON0@FlUQeKHDIJO
    ```

> [!important]
> **One-Time Token**
>
> The DR operation token is time-limited and can only be used once to promote the secondary.

---

## 4\. Promote the Secondary to Primary

Using the decoded token, promote the DR secondary:

```
vault write sys/replication/dr/secondary/promote \
  dr_operation_token="hvs.vjJaqI8ACON0@FlUQeKHDIJO"
```

You’ll see:

```
WARNING! The following warnings were returned from Vault:
* This cluster is being promoted to a replication primary. Vault will be unavailable for a brief period and will resume service shortly.
```

---

## 5\. Verify the New Primary

1.  **Authenticate** (if needed):

    ```
    vault login hvs.Y9MwsvPOH3zIZpBUymLF6Dk
    ```

2.  **List Raft peers**:

    ```
    vault operator raft list-peers
    ```

    Expected:

    ```
    Node     Address             State   Voter
    ----     -------             -----   -----
    vault-3 10.1.101.108:8201    leader  true
    ```

3.  **Test secrets engines**:

    ```
    vault secrets enable aws
    ```

    ```
    Success! Enabled the aws secrets engine at: aws/
    ```

At this point, your DR secondary cluster is fully promoted and ready to operate as the new primary. All write and read operations should now succeed on this cluster.

---

## Links and References

- [HashiCorp Vault DR Replication](https://www.vaultproject.io/docs/concepts/dr-replication)
- [Vault Operator Commands](https://www.vaultproject.io/docs/commands/operator)
- [Vault API: sys/replication/dr](https://www.vaultproject.io/api-docs/replication/dr)
- [HashiCorp Vault GitHub](https://github.com/hashicorp/vault)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/c1dd23ce-c7fd-4564-84d8-4ff14b115bd7/lesson/d6341e84-1d58-497c-92d1-fa086ac83364)**
>
> Watch video content
