# Replication Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Vault-Replication/Replication-Architecture)

---

## Table of Contents

- Replication Architecture
  - Performance vs. DR Replication
  - Example: Two Data Centers
  - AWS Regional Replication
  - Global Deployment
  - Real-World On-Premises Examples
  - Networking Requirements
  - Links and References
  - Watch Video
    - Customer A: VMware Active-Active
    - Customer B: On-Premises to AWS
    - Port Reference

---

## Content

HashiCorp Certified: Vault Associate Certification

Vault Replication

# Replication Architecture

Vault supports two replication modes—performance and disaster recovery (DR)—to scale reads and provide robust failover. In this guide, we’ll cover:

1.  Conceptual overview
2.  Reference topologies (cloud & on-premises)
3.  Networking requirements

---

## Performance vs. DR Replication

Vault replication modes at a glance:

| Mode              | Use Case                                   | What Replicates                       | Promotion Behavior                          |
| ----------------- | ------------------------------------------ | ------------------------------------- | ------------------------------------------- |
| Performance       | Scale reads, reduce latency in local sites | Data (secrets, configs)               | N/A                                         |
| Disaster Recovery | Failover with token and lease preservation | Data + Tokens (from any cluster tier) | DR replica becomes new primary on promotion |

> [!important]
> **Token Behavior**
>
> - Tokens created on a primary or performance cluster replicate **only** to their DR cluster.
> - Performance secondaries never receive tokens directly from the primary.
> - Promoting a DR cluster restores all tokens and leases for uninterrupted operation.

Clients always connect to their local cluster for both reads and writes. On failure, you promote the regional DR to primary.

---

## Example: Two Data Centers

Imagine two sites, A and B, each with primary, performance, and DR replicas:

1.  **Primary** in Data Center A
2.  **Performance Replica** in Data Center B
3.  **DR Replica** for Primary in Data Center A
4.  **DR Replica** for Performance in Data Center B

Flow:

- Clients in A → Primary; Clients in B → Performance Replica
- Primary → Performance Replica (data only)
- Primary & Performance → their DR clusters (data + tokens)
- On outage, promote the corresponding DR to restore service

---

## AWS Regional Replication

A common AWS pattern spans two regions, each with local DR:

![The image illustrates a replication architecture on a map of the United States, showing AWS data centers on the east and west coasts with arrows indicating data replication between them.](https://kodekloud.com/kk-media/image/upload/v1752878283/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Replication-Architecture/aws-replication-architecture-map.jpg)

- **us-east-1**: Primary + DR
- **us-west-1**: Performance Replica + DR

---

## Global Deployment

For global scale, replicate from one primary to multiple regions, each with its own DR:

![The image is a world map highlighting data replication and performance between Dallas and London, with a focus on primary and disaster recovery (DR) systems. It also features a cartoon character in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878284/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Replication-Architecture/world-map-data-replication-dallas-london.jpg)

Start with Dallas → London (with DR):

![The image is a map showing data replication and performance replication between data centers in Dallas, London, and Sydney. It illustrates connections and roles of primary and disaster recovery (DR) systems across these locations.](https://kodekloud.com/kk-media/image/upload/v1752878286/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Replication-Architecture/data-replication-performance-map-dallas-london-sydney.jpg)

Extend further to **Sydney**, maintaining consistent policies, auth methods, secrets engines, and configurations across all clusters.

---

## Real-World On-Premises Examples

### Customer A: VMware Active-Active

High-availability with VMware clusters across two data centers:

![The image illustrates a real-world customer example of data replication between two data centers, showing production and non-production environments with VMware clusters and replication processes.](https://kodekloud.com/kk-media/image/upload/v1752878287/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Replication-Architecture/data-replication-vmware-clusters-example.jpg)

- Production DC A: Primary + DR
- Production DC B: Performance Replica + DR
- Non-Prod: QA and sandbox mirrors for testing

### Customer B: On-Premises to AWS

Hybrid topology connecting on-premises primary to AWS:

![The image is a diagram illustrating a real-world customer example of an on-premises datacenter setup with production, non-production, and QA environments, showing data replication to AWS.](https://kodekloud.com/kk-media/image/upload/v1752878289/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Replication-Architecture/on-premises-datacenter-aws-replication-diagram.jpg)

- On-Prem Production: Primary + DR
- AWS: Performance Replica + DR
- Non-Prod & QA: Separate clusters for dev and testing

---

## Networking Requirements

Replicating Vault clusters requires simple connectivity and DNS resolution:

![The image outlines networking requirements for communication between a primary cluster and a DR replication cluster, emphasizing the need for DNS resolution and specific TCP ports.](https://kodekloud.com/kk-media/image/upload/v1752878290/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Replication-Architecture/networking-requirements-primary-dr-cluster.jpg)

> [!important]
> **Network Security**
>
> - Open **TCP 8200** and **8201** bi-directionally between clusters.
> - Restrict access using firewalls or security groups.
> - Ensure each cluster can resolve its peers’ DNS names.

### Port Reference

| Source                        | Destination                    | Port   | Protocol | Direction      | Purpose               |
| ----------------------------- | ------------------------------ | ------ | -------- | -------------- | --------------------- |
| Vault → Vault (bootstrapping) | Peer Vault clusters            | 8200   | TCP      | Bi-directional | Cluster bootstrap     |
| Vault → Vault (replication)   | Peer Vault clusters            | 8201   | TCP      | Bi-directional | Data & RPC forwarding |
| Client → Load Balancer        | Vault API endpoint             | 8200   | TCP      | Inbound        | Client operations     |
| Load Balancer → Vault         | Vault API servers              | 8200   | TCP      | Internal       | Load balanced traffic |
| Vault → External Services     | Database secrets engines, etc. | varies | TCP      | Outbound       | Secrets engine access |

![The image is a table detailing networking ports, including source, destination, port, protocol, direction, and purpose. It also features a Vault certification badge and a cartoon character at the bottom right.](https://kodekloud.com/kk-media/image/upload/v1752878290/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Replication-Architecture/networking-ports-table-vault-badge.jpg)

---

## Links and References

- [Vault Replication Guide](https://www.vaultproject.io/docs/enterprise/replication)
- [AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/)
- [On-Prem Deployment Patterns](https://learn.hashicorp.com/tutorials/vault/installation)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cfd009a3-718e-46c1-b509-a1354fc1e2a6/lesson/cc89e40f-69eb-4eb0-a268-8495f42de950)**
>
> Watch video content
