# Configure Replication using the Vault CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Vault-Replication/Configure-Replication-using-the-Vault-CLI)

---

## Table of Contents

- Configure Replication using the Vault CLI
  - Prerequisites
  - Step 1: Enable DR on the Primary Cluster
  - Step 2: Generate the Secondary Token
  - Step 3: Enable DR on the Secondary Cluster
  - Example Workflow
  - Troubleshooting
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Vault Replication

# Configure Replication using the Vault CLI

HashiCorp Vault’s Disaster Recovery (DR) replication ensures high availability by maintaining a standby cluster that can take over in case of a primary failure. This guide shows you how to configure DR replication using the Vault CLI in Vault Enterprise.

## Prerequisites

- Vault Enterprise license
- Two Vault clusters (Primary and Secondary)
- Network connectivity on port `8200` between clusters
- Vault CLI configured (`VAULT_ADDR` and token)

> \[!note\] DR replication is an enterprise-only feature. Verify your Vault version supports DR replication before proceeding.

## Step 1: Enable DR on the Primary Cluster

On the **primary** Vault server, run:

```
vault write -f sys/replication/dr/primary/enable
```

| Endpoint                          | Action                           |
| --------------------------------- | -------------------------------- |
| sys/replication/dr/primary/enable | Enable DR replication on primary |

## Step 2: Generate the Secondary Token

Still on the primary cluster, generate a token for the secondary:

```
vault write sys/replication/dr/primary/secondary-token id="us-east2-dr"
```

- `id`: A meaningful identifier (e.g., region or datacenter).
- The command returns a `token` to use in Step 3.

> \[!warning\] Keep the secondary token secret—avoid committing it to code repositories or logs.

## Step 3: Enable DR on the Secondary Cluster

On the **secondary** Vault server, use the token from Step 2:

```
vault write sys/replication/dr/secondary/enable token="s.XXXXXXXXXXXXXX"
```

| Endpoint                            | Action                             |
| ----------------------------------- | ---------------------------------- |
| sys/replication/dr/secondary/enable | Enable DR replication on secondary |

## Example Workflow

```
# On Primary Cluster
$ vault write -f sys/replication/dr/primary/enable
Success! DR replication primary enabled.


$ vault write sys/replication/dr/primary/secondary-token id="us-east2-dr"
Key    Value
---    -----
token  s.XXXXXXXXXXXXXX


# On Secondary Cluster
$ vault write sys/replication/dr/secondary/enable token="s.XXXXXXXXXXXXXX"
Success! DR replication secondary enabled.
```

## Troubleshooting

| Issue                            | Resolution                                     |
| -------------------------------- | ---------------------------------------------- |
| Network connectivity issues      | Open TCP port `8200` between Vault clusters    |
| DNS or endpoint misconfiguration | Verify DNS records or update `VAULT_ADDR`      |
| Vault API not reachable          | Ensure Vault service is running and accessible |

> \[!note\] After setup, the secondary cluster continuously receives data. In a primary outage, promote the secondary to minimize downtime.

## Links and References

- [Vault DR Replication Documentation](https://www.vaultproject.io/docs/enterprise/replication/dr)
- [Vault CLI Commands](https://www.vaultproject.io/docs/commands)
- [Vault Networking Guide](https://www.vaultproject.io/docs/concepts/operations/networking)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cfd009a3-718e-46c1-b509-a1354fc1e2a6/lesson/3e9172c7-564e-4180-8f4f-55a30b46bd1a)**
>
> Watch video content
