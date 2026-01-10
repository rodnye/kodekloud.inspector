# Enable and Configure Performance Replication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Scale-Vault-for-Performance/Enable-and-Configure-Performance-Replication)

---

## Table of Contents

- Enable and Configure Performance Replication
  - Performance vs. DR Replication
  - Multi-Region Topology
  - Active–Active Deployment
  - Token and Lease Behavior
  - Offloading Local Writes and Dynamic Secrets
  - Interaction with External Services
  - Setup Flow
  - Monitoring Replication
  - References
  - Watch Video
    - CLI Commands

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Scale Vault for Performance

# Enable and Configure Performance Replication

Vault Enterprise performance replication delivers an active–active, multi-region solution for high availability and low-latency reads. It replicates configuration, policies, and secrets across clusters so that applications can read locally, while writes are forwarded to the primary. This guide covers:

- Key differences between Performance and DR replication
- Client authentication patterns in active–active deployments
- Step-by-step setup and monitoring

## Performance vs. DR Replication

Performance replication synchronizes Vault policies, secrets engine configurations and data, authentication methods, audit backends, and more—**excluding** tokens and leases. DR replication includes tokens and leases but does **not** serve reads from secondaries until failover.

| Feature                   | Performance Replication | DR Replication                |
| ------------------------- | ----------------------- | ----------------------------- |
| Active–active reads       | Yes                     | No (reads only post-failover) |
| Configurations & policies | Yes                     | Yes                           |
| Secrets data              | Yes                     | Yes                           |
| Authentication methods    | Yes                     | Yes                           |
| Audit backends            | Yes                     | Yes                           |
| Tokens & leases           | No                      | Yes                           |

![The image is a diagram comparing performance and disaster recovery (DR) replication across clusters, showing data flow and replication types between a primary cluster, a performance secondary cluster, and a DR secondary cluster. It includes details on replicated data such as vault policies, secrets engines, auth methods, and audit configurations.](https://kodekloud.com/kk-media/image/upload/v1752878603/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Performance-Replication/performance-disaster-recovery-replication-diagram.jpg)

- Primary cluster: handles reads & writes.
- Performance secondaries: serve local reads; forward writes to primary.
- DR secondaries: replicate tokens & leases; do not serve reads until failover.

## Multi-Region Topology

You can provision multiple performance secondaries from a single primary. Each region points to its nearest Vault cluster for read-heavy operations and dynamic secret generation, minimizing latency.

![The image illustrates application communication across three cloud regions (US-East, US-East2, and EU-West) with performance replication clusters and local apps interacting with local vault clusters. It shows the flow of performance replication between the regions.](https://kodekloud.com/kk-media/image/upload/v1752878604/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Performance-Replication/application-communication-cloud-regions-diagram.jpg)

- Local apps authenticate and read secrets from the regional cluster.
- Write requests (e.g., secret writes, policy updates) travel to the primary and propagate back to all secondaries.

## Active–Active Deployment

With performance replication, Vault clusters operate in an active–active mode. Applications always connect to their closest endpoint for optimal performance.

![The image is a slide about "Performance Replication," explaining its role in providing active solutions for applications across multiple data centers, with details on authentication and failover processes.](https://kodekloud.com/kk-media/image/upload/v1752878605/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Performance-Replication/performance-replication-active-solutions-slide.jpg)

- Apps authenticate to the local cluster; tokens and leases remain local.
- On secondary failover, clients must point to the new endpoint and re-authenticate.

> [!important]
> **Failover Reminder**
>
> If a performance secondary becomes unavailable, update client DNS or endpoint settings and re-authenticate against the promoted cluster.

## Token and Lease Behavior

Tokens and leases created on a performance secondary are scoped to that cluster and **cannot** be used on the primary or other secondaries.

![The image illustrates a performance replication process, showing a failed cluster with a red cross and skull, and a transition to another cluster where clients need to re-authenticate. It includes icons representing code and a character in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878606/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Performance-Replication/performance-replication-failed-cluster.jpg)

- Failure of a secondary requires clients to switch endpoints and re-authenticate.
- **Exception**: DR replicas retain valid tokens and leases upon promotion.

## Offloading Local Writes and Dynamic Secrets

Secondaries handle dynamic credential generation (e.g., AWS IAM, database creds) locally, reducing write load on the primary and improving scalability.

![The image is a slide about "Performance Replication" in Vault, explaining how performance replicated clusters handle secret retrieval and dynamic credential generation locally, offloading some write operations from the primary cluster. It also notes that requests to write data or update configurations are forwarded to the primary cluster.](https://kodekloud.com/kk-media/image/upload/v1752878607/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Performance-Replication/performance-replication-vault-clusters-slide.jpg)

- Local operations (token creation, lease issuance, dynamic secrets) stay within the secondary.
- Configuration changes (KV updates, policy and auth method modifications) are forwarded to the primary and then replicated.

## Interaction with External Services

Performance secondaries directly contact external services—such as AWS or databases—for dynamic credential issuance, further offloading the primary.

![The image illustrates a diagram of interaction with external services, showing a primary cluster and a performance replication cluster connecting to AWS and a database, with requests for database and AWS credentials.](https://kodekloud.com/kk-media/image/upload/v1752878608/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Performance-Replication/interaction-diagram-external-services-aws-database.jpg)

## Setup Flow

The performance replication setup mirrors DR replication steps:

1.  Activate the primary for performance replication.
2.  Generate a secondary token on the primary.
3.  Enable the secondary with the token.
4.  Monitor replication health.

![The image is a flowchart illustrating the setup process for a system, involving steps like activating a primary, fetching a secondary token, activating a secondary, and replication. It includes icons and brief descriptions for each step, with a Vault certification badge in the corner.](https://kodekloud.com/kk-media/image/upload/v1752878609/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Performance-Replication/system-setup-flowchart-activation-replication.jpg)

### CLI Commands

```
# 1. Enable performance replication on the primary
vault write -f sys/replication/performance/primary/enable

# 2. Generate a secondary token
vault write sys/replication/performance/primary/secondary-token id="region-west"

# 3. Enable performance replication on the secondary
vault write sys/replication/performance/secondary/enable token="s.XYZ1234"
```

> [!important]
> **Data Replacement Warning**
>
> Enabling replication on a secondary wipes its existing data and replaces it with the primary’s data, including unseal and recovery keys.

## Monitoring Replication

Check status using:

```
# Overall replication status
vault read -format=json sys/replication/status

# Performance replication
vault read -format=json sys/replication/performance/status

# DR replication (if configured)
vault read -format=json sys/replication/dr/status
```

---

## References

- [Vault Replication Concepts](https://www.vaultproject.io/docs/enterprise/replication)
- [High Availability with Vault Performance Replication](https://www.hashicorp.com/blog/vault-performance-replication)
- [Vault CLI Documentation](https://www.vaultproject.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b6a41fdb-447c-43b2-9489-6c8459821fab/lesson/2efdccb7-4865-412b-8473-d628f3a139b4)**
>
> Watch video content
