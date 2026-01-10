# Performance Standby Nodes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Scale-Vault-for-Performance/Performance-Standby-Nodes)

---

## Table of Contents

- Performance Standby Nodes
  - Vault Open Source HA Cluster
  - Vault Enterprise with Performance Standby Nodes
  - Scaling Out Read Performance
  - Consistency and Eventual Replication
  - Health Checks and Targeting Standbys
  - Enabling and Disabling Performance Standby
  - References
  - Watch Video
    - Defining a Read

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Scale Vault for Performance

# Performance Standby Nodes

Understanding Performance Standby Nodes is critical for scaling read throughput in Vault Enterprise. This guide covers:

- Vault Open Source HA behavior
- Vault Enterprise Performance Standby features
- Scaling out read performance
- Consistency and replication
- Health checks and routing
- Enabling/disabling performance standby

> [!important]
> **Exam Objective**
>
> You need to _describe_ what performance standby nodes are and why they’re used. Configuration commands aren’t required for the HashiCorp exam.

---

## Vault Open Source HA Cluster

In **Vault Open Source**, an HA cluster contains:

- 1 active node (handles all reads and writes)
- Multiple standby nodes (forward requests to active, monitor health)

A load balancer must direct client traffic to the active node. If a client request lands on a standby, Vault uses RPC forwarding (or returns a redirect) so that only the active processes reads and writes.

![The image illustrates a Vault clustering setup with five nodes, where Node C is active, and the others are on standby. It also shows a developer making credential requests with read and write permissions.](https://kodekloud.com/kk-media/image/upload/v1752878610/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Performance-Standby-Nodes/vault-clustering-setup-five-nodes.jpg)

Because standby nodes don’t respond to reads or writes locally, scaling in Vault OSS means scaling **up**—increasing CPU, memory, or disk size rather than adding more nodes.

![The image illustrates a Vault Clustering setup with five nodes, where Node C is active, and the others are on standby. It shows a developer making a credential request, with a note that Vault OSS is a scale-up application.](https://kodekloud.com/kk-media/image/upload/v1752878611/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Performance-Standby-Nodes/vault-clustering-setup-five-nodes-2.jpg)

| Feature               | Vault Open Source | Vault Enterprise          |
| --------------------- | ----------------- | ------------------------- |
| Active writes         | Yes               | Yes                       |
| Standby reads         | No                | Yes (performance standby) |
| Scaling method        | Scale-up          | Scale-out                 |
| Licensing requirement | None              | Enterprise license        |

---

## Vault Enterprise with Performance Standby Nodes

Vault Enterprise introduces **Performance Standby** nodes that:

- Serve **read** requests locally
- Forward **write** requests to the active node
- Scale out read capacity by adding more performance standby nodes

![The image illustrates a Vault Clustering setup for enterprise, showing multiple Vault nodes (A to E) with their read and write capabilities, and a developer making credential requests. Node C is active, while others are in performance standby.](https://kodekloud.com/kk-media/image/upload/v1752878613/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Performance-Standby-Nodes/vault-clustering-setup-nodes-diagram.jpg)

![The image is a slide about "Vault Enterprise with Performance Standby," explaining how performance standby nodes can handle read requests to scale a cluster and maintain high availability. It includes a reminder that this functionality is specific to Vault Enterprise.](https://kodekloud.com/kk-media/image/upload/v1752878614/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Performance-Standby-Nodes/vault-enterprise-performance-standby-slide.jpg)

---

## Scaling Out Read Performance

To scale read performance in Vault Enterprise:

1.  **Add performance standby nodes** to your cluster.
2.  **Configure your load balancer** or DNS to route read-only traffic to performance standby nodes.
3.  **Use health checks** to differentiate between active (writes+reads) and performance standby (reads only).

![The image illustrates a system architecture for "Scaling Out with Performance Secondaries," showing an active node and multiple performance standby nodes connected in a sequence. It includes a label indicating scaling out for read performance.](https://kodekloud.com/kk-media/image/upload/v1752878615/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Performance-Standby-Nodes/scaling-out-performance-secondaries-architecture.jpg)

### Defining a Read

A **read** is any Vault operation that does _not_ result in a storage write. Examples include:

```
vault read secret/data/my-app/config
```

Common read-only engines:

- **Key/Value Secrets Engine**: fetching secrets
- **Transit Secrets Engine**: encrypt/decrypt without persisting data
- **SSH Signing**: signing client keys without storage

Performance standby nodes can service these requests locally, reducing load on the active node.

---

## Consistency and Eventual Replication

When using [Integrated Storage](https://www.vaultproject.io/docs/operations/storage/integrated), replication to performance standbys is **eventual**. After a write:

1.  Active node commits locally.
2.  Changes replicate asynchronously to standby nodes.
3.  Standbys serve fresh data only after replication completes.

> [!important]
> **Eventual Consistency**
>
> A client reading immediately from a performance standby might see stale data or receive an error until replication finishes.

![The image illustrates a diagram of a system with five Vault Nodes labeled A to E, showing their roles in eventual consistency. Node C is marked as "Active" and "Write," while the others are in "Performance Standby."](https://kodekloud.com/kk-media/image/upload/v1752878615/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Performance-Standby-Nodes/vault-nodes-consistency-diagram.jpg)

---

## Health Checks and Targeting Standbys

Use Vault’s health endpoint and a load balancer to route traffic:

Endpoint:

```
GET /v1/sys/health
```

HTTP status codes:

| Status Code | Meaning                          |
| ----------- | -------------------------------- |
| 200         | Active (initialized & unsealed)  |
| 473         | Performance standby (reads only) |
| 501/503     | Uninitialized or sealed          |

Configure your load balancer to send read-only clients to nodes returning **473** and all other traffic to **200**.

![The image is a slide explaining how to target a performance standby in Vault, detailing health information endpoints and default status codes. It includes a note that these details are not needed for an exam.](https://kodekloud.com/kk-media/image/upload/v1752878617/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Performance-Standby-Nodes/vault-performance-standby-health-info.jpg)

---

## Enabling and Disabling Performance Standby

Performance standby is **enabled by default** for Vault Enterprise with a valid license. To disable:

```
# Vault server configuration
disable_performance_standby = true
```

After restarting, the node will no longer advertise performance standby status.

---

## References

- [Vault HA Concepts](https://www.vaultproject.io/docs/concepts/ha)
- [Performance Standby in Enterprise](https://www.vaultproject.io/docs/enterprise/ha/performance-standby)
- [Integrated Storage Overview](https://www.vaultproject.io/docs/operations/storage/integrated)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b6a41fdb-447c-43b2-9489-6c8459821fab/lesson/b4aeb833-e804-4138-913b-280fc9b0e988)**
>
> Watch video content
