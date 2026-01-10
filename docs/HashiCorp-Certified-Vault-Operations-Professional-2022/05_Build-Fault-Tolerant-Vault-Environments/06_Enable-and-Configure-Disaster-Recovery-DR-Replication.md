# Enable and Configure Disaster Recovery DR Replication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Build-Fault-Tolerant-Vault-Environments/Enable-and-Configure-Disaster-Recovery-DR-Replication)

---

## Table of Contents

- Enable and Configure Disaster Recovery DR Replication
  - What Is Vault Replication?
  - Performance vs. Disaster Recovery Replication
  - Replication Comparison
  - DR Secondary Characteristics
  - Reference Architectures
  - Networking Requirements
  - Enabling DR Replication
  - Configuring DR via the UI
  - Monitoring Replication
  - References
  - Watch Video
    - Two Data Centers
    - AWS Regions
    - On-Prem VMware Example
    - On-Prem to AWS Example
    - 1. Activate DR on the Primary
    - 2. Generate the Secondary Token
    - 3. Activate DR on the Secondary
      - How the Token Is Used

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Build Fault Tolerant Vault Environments

# Enable and Configure Disaster Recovery DR Replication

Vault Enterprise’s Disaster Recovery (DR) replication creates a warm-standby cluster that can be promoted instantly if your primary fails. In this guide, you’ll learn how Vault replication works, compare performance and DR modes, review reference architectures, and walk through both CLI and UI setup.

---

## What Is Vault Replication?

Vault replication offers a global, consistent view of your policies, secret engines, auth methods, KV data, and audit configurations—eliminating manual duplication and ensuring high availability across data centers or cloud regions. It uses a leader-follower model with one primary (leader) cluster and one or more secondary (follower) clusters. All inter-cluster communication is end-to-end encrypted with mutual TLS.

![The image explains Vault Replication, highlighting that it is available only in Vault Enterprise and operates on a leader-follower model with primary and secondary clusters. It emphasizes end-to-end encrypted communication and asynchronous data replication.](https://kodekloud.com/kk-media/image/upload/v1752878302/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/vault-replication-enterprise-leader-follower.jpg)

---

## Performance vs. Disaster Recovery Replication

Vault Enterprise supports two replication modes. Select the one that matches your use case:

| Feature          | Performance Replication                                      | Disaster Recovery (DR) Replication    |
| ---------------- | ------------------------------------------------------------ | ------------------------------------- |
| Data & Config    | Policies, Secrets engines, Auth methods, KV data, Audit logs | Same as Performance + Tokens & Leases |
| Read Traffic     | Served locally                                               | Not served (warm standby)             |
| Write Traffic    | Forwarded to primary                                         | Not served                            |
| Tokens & Leases  | Not replicated                                               | Replicated                            |
| Typical Use Case | Global read scaling                                          | Fast failover and seamless client ops |

![The image explains "Disaster Recovery Replication" for Vault, highlighting that it replicates configurations and data, cannot service reads from client requests, and requires client authentication with the primary cluster. It includes a diagram showing the flow between a primary and secondary cluster.](https://kodekloud.com/kk-media/image/upload/v1752878304/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/disaster-recovery-replication-vault-diagram.jpg)

---

## Replication Comparison

Here’s how a performance secondary, primary, and DR secondary differ. Only DR replication includes tokens and leases in the secondary:

![The image is a diagram comparing three clusters: Perf Secondary Cluster, Primary Cluster, and DR Secondary Cluster, showing data replication processes and components like Vault Policies, Secrets Engines, Auth Methods, and Audit Configurations.](https://kodekloud.com/kk-media/image/upload/v1752878305/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/cluster-comparison-data-replication-diagram.jpg)

---

## DR Secondary Characteristics

A DR secondary acts as a **warm standby**. It accepts replication logs but:

- Does **not** serve any client operations (reads or writes).
- Keeps most API paths disabled—even for admin or root tokens—until you promote it.

![The image is a slide about "Disaster Recovery Replication," explaining that it provides a warm-standby cluster where everything is replicated to secondary clusters, which do not respond to clients unless promoted to a primary cluster. It also notes that most paths on a secondary cluster are disabled, even for admins.](https://kodekloud.com/kk-media/image/upload/v1752878306/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/disaster-recovery-replication-warm-standby.jpg)

---

## Reference Architectures

Choose the topology that fits your environment:

### Two Data Centers

- Data Center A: Primary + local DR secondary
- Data Center B: Performance secondary + local DR secondary
- Clients talk to their local cluster; on failure, promote the DR node.

![The image illustrates a replication architecture between two data centers, showing a primary cluster and a DR replication cluster in Data Center A, and a performance replication cluster and DR replication cluster in Data Center B.](https://kodekloud.com/kk-media/image/upload/v1752878307/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/replication-architecture-data-centers-diagram.jpg)

### AWS Regions

- Northern Virginia: Primary + DR
- Northern California: Performance + DR
- Ideal for multi-region AWS deployments.

![The image illustrates a replication architecture on a map of the United States, showing AWS data centers on the east and west coasts with arrows indicating data replication between them.](https://kodekloud.com/kk-media/image/upload/v1752878308/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/aws-replication-architecture-map.jpg)

### On-Prem VMware Example

- Data Center A: Production primary + DR
- Data Center B: Performance + DR
- Separate non-prod environment mirroring production for QA/testing.

![The image is a diagram illustrating a real-world customer example of data replication between two data centers, showing production and non-production environments with VMware clusters. It highlights DR (Disaster Recovery) and performance replication processes.](https://kodekloud.com/kk-media/image/upload/v1752878310/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/data-replication-diagram-vmware-clusters.jpg)

### On-Prem to AWS Example

- On-prem DC: Production primary + DR
- AWS: Performance + DR
- Dedicated non-prod and QA clusters.

![The image is a diagram showing a real-world customer example of an on-premises datacenter setup with production, non-production, and QA environments, and their replication to AWS.](https://kodekloud.com/kk-media/image/upload/v1752878311/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/on-premises-datacenter-aws-replication-diagram.jpg)

---

## Networking Requirements

- Bidirectional Vault-to-Vault on ports **8200** (cluster bootstrap/API) and **8201** (replication/Raft forwarding).
- DNS resolution between clusters must be configured.

> [!important]
> **Warning**
>
> Open these ports only between trusted Vault clusters. Exposing replication ports publicly can lead to security risks.

---

## Enabling DR Replication

Follow these three steps to set up DR replication via the CLI:

![The image is a flowchart illustrating the setup process for a system, involving steps like activating a primary, fetching a secondary token, activating a secondary, and replication. It includes icons and brief descriptions for each step, with a Vault certification badge in the corner.](https://kodekloud.com/kk-media/image/upload/v1752878312/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/system-setup-flowchart-activation-replication.jpg)

### 1\. Activate DR on the Primary

Vault generates an internal CA and mutual-TLS certificates for secure inter-cluster links. If you’re behind a TLS-terminating load balancer, pass through port 8201.

![The image is a slide about activating DR replication in Vault, detailing the need to enable replication on each cluster, use an internal root CA, and establish mutual TLS connections. It also notes potential issues with load balancers terminating TLS.](https://kodekloud.com/kk-media/image/upload/v1752878313/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/dr-replication-vault-activation-slide.jpg)

```
vault write -f sys/replication/dr/primary/enable
```

### 2\. Generate the Secondary Token

Create a one-time, response-wrapped token to authorize the DR secondary. It includes the CA cert, client cert/key, and primary’s API address.

![The image is a slide discussing the concept of a "Secondary Token" used for permitting a secondary cluster to replicate from a primary cluster, highlighting its sensitivity, single-use nature, and the information it includes. It features a Vault certification badge and a cartoon character at the bottom right.](https://kodekloud.com/kk-media/image/upload/v1752878314/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/secondary-token-replication-slide.jpg)

```
vault write sys/replication/dr/primary/secondary-token id="us-east-2-dr"
```

Inspect the unwrapped token to see embedded details:

```
{
  "data": {
    "ca_cert": "...",
    "client_cert": "...",
    "client_key": { "type": "p521", "x": "...", "y": "...", "d": "..." },
    "cluster_id": "0d127970-99ce-152f-0311-3b081d126d43",
    "id": "secondary",
    "primary_cluster_addr": "https://vault-pr.hvcop.com:8201"
  }
}
```

> [!important]
> **Warning**
>
> Treat the secondary token like a password. It’s single-use and grants high privileges.

#### How the Token Is Used

1.  The secondary submits the wrapped token to the primary API (`:8200`).
2.  It unwraps the token and retrieves certs and cluster info.
3.  Replication over port 8201 then begins automatically.

![The image illustrates the process of how a secondary token is used, showing steps like token creation, submission, and unwrapping via an API address. It includes icons and a flowchart on a yellow background, with a Vault certification badge in the corner.](https://kodekloud.com/kk-media/image/upload/v1752878315/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/secondary-token-process-flowchart-api.jpg)

![The image is a flowchart illustrating the process of using a secondary token, showing steps from token creation to secondary cluster readiness. It includes labeled icons and a certification badge for a Vault Certified Operations Professional.](https://kodekloud.com/kk-media/image/upload/v1752878316/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/secondary-token-flowchart-operations-professional.jpg)

### 3\. Activate DR on the Secondary

```
vault write sys/replication/dr/secondary/enable token="<response-wrapped-token>"
```

Once the secondary connects, replication starts immediately.

---

## Configuring DR via the UI

You can also enable DR replication through Vault’s web interface:

1.  **Primary**
    - Navigate to **Status → Replication → Enable Replication**
    - Choose **Disaster Recovery – Primary**, then click **Enable**
    - Click **Add Secondary**, assign a name, and **Generate Token**. Copy the token.

    ![The image shows a user interface for configuring replication in Vault, specifically for adding a secondary in disaster recovery. It highlights options to view existing secondaries and add a new secondary.](https://kodekloud.com/kk-media/image/upload/v1752878317/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/vault-replication-configuration-ui.jpg)

2.  **Secondary**
    - Go to **Status → Replication → Enable Replication**
    - Select **Disaster Recovery – Secondary**
    - Paste the activation token and click **Enable**

    ![The image is a guide on configuring replication using a user interface, specifically for setting up a secondary cluster for disaster recovery replication. It includes steps to select disaster recovery, choose the secondary cluster mode, and paste the secondary activation token.](https://kodekloud.com/kk-media/image/upload/v1752878319/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Enable-and-Configure-Disaster-Recovery-DR-Replication/disaster-recovery-replication-guide-ui.jpg)

---

## Monitoring Replication

Use the Vault CLI to verify replication health and status:

```
vault read -format=json sys/replication/status
vault read -format=json sys/replication/performance/status
vault read -format=json sys/replication/dr/status
```

- `sys/replication/status`: Shows both performance and DR replication
- `sys/replication/performance/status`: Performance only
- `sys/replication/dr/status`: DR only

---

Now you’re ready to deploy DR replication in your Vault Enterprise environment or practice these steps for the [Vault Certified Operations Professional exam](https://www.hashicorp.com/certification/vault-operations-professional).

## References

- [Vault Enterprise Replication Documentation](https://www.vaultproject.io/docs/enterprise/replication)
- [Vault Certified Operations Professional Exam](https://www.hashicorp.com/certification/vault-operations-professional)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/c1dd23ce-c7fd-4564-84d8-4ff14b115bd7/lesson/d335d5fe-97c9-4b0a-b438-3ba91a278192)**
>
> Watch video content
