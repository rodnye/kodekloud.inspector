# Comparing Versions of Vault - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Introduction-to-Vault/Comparing-Versions-of-Vault)

---

## Table of Contents

- Comparing Versions of Vault
  - Vault Editions Comparison
  - Vault Open Source
  - Vault Enterprise
  - Vault on HashiCorp Cloud Platform (HCP)
  - Links and References
  - Watch Video
    - Enterprise Modules

---

## Content

HashiCorp Certified: Vault Associate Certification

Introduction to Vault

# Comparing Versions of Vault

Vault provides flexible secret management tailored to your deployment needs. You can run Vault:

- **Self-Hosted**: Open Source or Enterprise edition managed by you.
- **Managed (HCP)**: Fully-hosted Vault service on HashiCorp Cloud Platform.

![The image compares three versions of Vault: Open Source, Enterprise, and Vault on HCP, highlighting their features and management options.](https://kodekloud.com/kk-media/image/upload/v1752878184/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Comparing-Versions-of-Vault/vault-versions-comparison-features-management.jpg)

## Vault Editions Comparison

| Edition       | Deployment Model                      | Key Features                                            |
| ------------- | ------------------------------------- | ------------------------------------------------------- |
| Open Source   | Self-Hosted                           | Dynamic Secrets, ACL Policies, Auto Unseal, Local HA    |
| Enterprise    | Self-Hosted                           | DR & Performance Replication, Namespaces, HSM, Sentinel |
| HCP (Managed) | Fully Hosted (AWS; Azure/GCP planned) | Push-button Deploy, Auto Upgrades, Scalable HA          |

## Vault Open Source

The **Open Source** edition of Vault is licensed freely and supports core secret-management capabilities:

- Dynamic Secrets
- Access Control Policies & ACL Templates
- Auto Unseal (backported in Vault 1.0)
- Unseal Workflows & Vault Agent
- Local High Availability (3+ node clusters)
- Full HTTP API for integrations

Although feature-rich, Open Source runs within a single data center or region and lacks:

- Cross-datacenter replication
- Built-in HSM or MFA integrations
- Automated backup workflows

![The image is a slide about "Vault – Open Source," highlighting its features and integrations, such as high availability and API integration, and noting limitations like no replication capabilities and limited scalability.](https://kodekloud.com/kk-media/image/upload/v1752878185/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Comparing-Versions-of-Vault/vault-open-source-features-integrations-slide.jpg)

## Vault Enterprise

Designed for large-scale, mission-critical deployments, **Vault Enterprise** extends the Open Source platform with:

- Disaster Recovery & Performance Replication across regions
- Multi-tenant Namespaces
- Read Replicas for scaling read-heavy workloads
- HSM Integration, FIPS 140-2, Seal Wrap
- Sentinel policy-as-code enforcement
- Automated Snapshot Agent for backups

> [!important]
> **Note**
>
> Vault Enterprise modules are sold separately. Contact your HashiCorp representative for licensing and feature add-ons.

![The image is a slide titled "Vault – Enterprise" that lists features included in the enterprise version of Vault, such as access to all features, replication capabilities, and integration with applications. It also notes that it is not self-managed by HashiCorp.](https://kodekloud.com/kk-media/image/upload/v1752878186/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Comparing-Versions-of-Vault/vault-enterprise-features-slide.jpg)

### Enterprise Modules

The base **Enterprise Platform** includes:

- Namespaces
- Disaster Recovery Cluster

Additional modules unlock advanced capabilities:

![The image is a comparison chart of features between "Enterprise Platform" and "Enterprise Modules" for Vault Enterprise, highlighting categories like "Multi-Datacenter & Scale," "Governance & Policy," and "Advanced Data Protection."](https://kodekloud.com/kk-media/image/upload/v1752878188/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Comparing-Versions-of-Vault/enterprise-platform-modules-comparison-chart.jpg)

1.  Multi-Datacenter & Scale
    - Replication (Performance & DR)
    - Read Replicas
    - Path Filtering
2.  Governance & Policy
    - Control Groups
    - MFA Integration
    - HSM & Seal Wrap
    - Sentinel Policy Engine
3.  Advanced Data Protection
    - KMIP Interface
    - Transform Secrets Engine

## Vault on HashiCorp Cloud Platform (HCP)

HashiCorp Cloud Platform (HCP) delivers Vault Enterprise features as a managed service:

- Push-button Deployment (Dev or Prod clusters)
- Hourly Billing for proof-of-concept testing
- Automatic Upgrades and Patching
- Scalable, Highly Available Infrastructure
- Reduced Operational Overhead

![The image is a presentation slide about Vault on HashiCorp Cloud Platform (HCP), highlighting features like full management, click-button deployment, and expert support, with a diagram showing HashiCorp-managed and customer-managed components.](https://kodekloud.com/kk-media/image/upload/v1752878189/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Comparing-Versions-of-Vault/vault-hcp-presentation-slide-features.jpg)

In HCP deployments, HashiCorp provisions your Vault cluster in their cloud account. Connect your applications using:

- VPC Peering
- Transit Gateway

> [!important]
> **Warning**
>
> Vault on HCP is currently available only on AWS. Azure and GCP support are planned for future releases.

To get started, visit:  
`https://cloud.hashicorp.com`

## Links and References

- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)
- [HCP Vault Overview](https://www.hashicorp.com/products/vault)
- [Sentinel Policy as Code](https://www.hashicorp.com/products/sentinel)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/b8d194ad-b4a2-463b-826a-5ad71a059e36/lesson/f074354a-1ea5-470e-a93e-9dae00aba750)**
>
> Watch video content
