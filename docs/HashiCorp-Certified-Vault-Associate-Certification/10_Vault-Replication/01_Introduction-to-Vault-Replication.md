# Introduction to Vault Replication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Vault-Replication/Introduction-to-Vault-Replication)

---

## Table of Contents

- Introduction to Vault Replication
  - Understanding Vault Replication
  - Performance Replication
  - Disaster Recovery (DR) Replication
  - Performance vs. DR Replication: Feature Comparison
  - Deep Dive: DR Cluster Behavior and Promotion
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Vault Replication

# Introduction to Vault Replication

Vault replication enables high availability and disaster recovery for your secret management platform. By leveraging Vault’s DR (Disaster Recovery) and Performance replication modes, you can synchronize policies, secrets, and leases across multiple clusters—ensuring seamless failover and consistent access in multi-region deployments.

## Understanding Vault Replication

Enterprises often distribute infrastructure across regions or data centers to maintain uptime. Vault, as the central secrets store, must follow the same architecture. Replication in HashiCorp Vault Enterprise (including HCP Vault) follows a leader-follower model:

- The **primary cluster** is the system of record.
- One or more **secondary clusters** receive asynchronous updates over mutual TLS.

Replication ensures:

- Global policy management: write policies once on primary, propagate automatically to all replicas.
- Consistent secrets: applications in any region read the same credentials and settings.
- Failover readiness: secondary clusters stand ready to assume primary duties if needed.

> [!important]
> **Note**
>
> Vault replication is an Enterprise-only feature. Evaluate your licensing and capacity requirements before enabling replication.

![The image explains Vault Replication, highlighting that it is available only in Vault Enterprise and operates on a leader-follower model with end-to-end encrypted communication. It includes a diagram showing replication from a primary to a secondary cluster.](https://kodekloud.com/kk-media/image/upload/v1752878277/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Vault-Replication/vault-replication-leader-follower-diagram.jpg)

Vault Enterprise supports two replication modes:

1.  **Performance Replication**
2.  **Disaster Recovery (DR) Replication**

We’ll start with Performance replication before diving into DR replication details.

---

## Performance Replication

Performance replication extends Vault to multiple data centers for low-latency reads. It replicates all configurations, policies, and secrets from the primary to one or more **performance secondary** clusters. Key characteristics:

- **Primary cluster**: serves all reads and writes.
- **Performance secondary**: serves local reads; forwards writes to primary.
- **Tokens & leases**: _not_ replicated—clients must re-authenticate after failover.

![The image is a diagram explaining "Performance Replication" in a system, highlighting features like configuration replication, client authentication, and read service capabilities. It includes a flow from a primary cluster to a secondary cluster, with icons representing vault clients and their services.](https://kodekloud.com/kk-media/image/upload/v1752878278/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Vault-Replication/performance-replication-diagram-configuration-authentication.jpg)

---

## Disaster Recovery (DR) Replication

DR replication creates a warm-standby cluster that includes tokens and leases. It mirrors policies, auth methods, secret engines, and all dynamic data. This mode is ideal for planned or unplanned primary outages:

- **DR secondary**: passive; does not serve client reads/writes until promotion.
- **Tokens & leases**: fully replicated—clients continue using existing credentials after failover.

![The image explains "Disaster Recovery Replication" for Vault, highlighting that it replicates configurations and data but cannot service client read requests. It includes a diagram showing the flow from a primary cluster to a secondary cluster, with notes on client authentication and token replication.](https://kodekloud.com/kk-media/image/upload/v1752878279/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Vault-Replication/disaster-recovery-replication-vault-diagram.jpg)

---

## Performance vs. DR Replication: Feature Comparison

| Feature                  | Performance Replication  | DR Replication     |
| ------------------------ | ------------------------ | ------------------ |
| Configuration & policies | ✓                        | ✓                  |
| Secret engines & data    | ✓                        | ✓                  |
| Tokens & leases          | ✗                        | ✓                  |
| Client reads             | Secondary only           | Primary only       |
| Client writes            | Primary only             | Primary only       |
| Licensing impact         | Additional secondary fee | Typically included |

![The image is a diagram comparing three clusters: Perf Secondary Cluster, Primary Cluster, and DR Secondary Cluster, showing data replication processes and types of replicated data.](https://kodekloud.com/kk-media/image/upload/v1752878281/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Vault-Replication/cluster-comparison-data-replication-diagram.jpg)

---

## Deep Dive: DR Cluster Behavior and Promotion

A DR secondary remains in standby until you invoke the promotion API. Until then:

- Most API endpoints are disabled (including root token generation).
- Any client request returns a “path is disabled” error.

Upon promotion:

1.  The DR cluster becomes the new primary.
2.  All replicated data, tokens, and leases become active.
3.  Client applications resume without re-authentication.

> [!important]
> **Warning**
>
> Only one DR cluster can be promoted at a time. Promoting a DR secondary will break replication links—you must reconfigure replication after failover.

![The image is a slide about Disaster Recovery Replication, explaining the function of warm-standby clusters and the limitations of DR clusters. It includes a Vault certification badge and a cartoon character at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878282/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Introduction-to-Vault-Replication/disaster-recovery-replication-warm-standby.jpg)

---

## Links and References

- [Vault Replication Overview](https://www.vaultproject.io/docs/enterprise/replication)
- [Vault Enterprise Licensing](https://www.vaultproject.io/docs/enterprise#licensing)
- [HCP Vault](https://cloud.hashicorp.com/products/vault)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cfd009a3-718e-46c1-b509-a1354fc1e2a6/lesson/f5be3c45-0525-4315-8fac-d95f7892b529)**
>
> Watch video content
