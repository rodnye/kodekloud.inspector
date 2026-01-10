# Redundancy Zones - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Explain-Consul-Architecture/Redundancy-Zones)

---

## Table of Contents

- Redundancy Zones
  - How Redundancy Zones Work
  - Example: Three Availability Zones
  - Handling an Entire Zone Failure
  - Benefits of Using Redundancy Zones
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Explain Consul Architecture

# Redundancy Zones

Consul Enterprise’s **Redundancy Zones** feature partitions your server cluster into distinct fault domains—such as cloud availability zones or separate on-premise racks—to improve both scaling and high availability. By assigning exactly one voting server per zone and running additional non-voting peers alongside it, Consul ensures automatic promotion and maintains quorum if a voting member fails.

![The image is a slide titled "Redundancy Zones," explaining the benefits of using non-voting servers for scaling and resiliency, and the process of promoting non-voting members if a voting member or zone fails.](https://kodekloud.com/kk-media/image/upload/v1752877851/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Redundancy-Zones/redundancy-zones-non-voting-servers.jpg)

## How Redundancy Zones Work

1.  Define fault domains (e.g., AZs or data center racks).
2.  Deploy one **voting** server and one or more **non-voting** servers in each zone.
3.  On voting-server failure, a non-voting peer is **automatically promoted** within the same zone.

> [!important]
> **Note**
>
> Fault domains can be any logical grouping—availability zones, racks, or even geographic regions. This setup prevents a single domain failure from taking down your entire cluster.

## Example: Three Availability Zones

Imagine an AWS setup with **three availability zones** (AZ1, AZ2, AZ3) and a six-node Consul server cluster:

![The image illustrates redundancy zones with voting and non-voting servers across three availability zones (AZ1, AZ2, AZ3), highlighting features like quorum and resiliency. It is labeled as an "Enterprise Feature" and includes a visual representation of server status.](https://kodekloud.com/kk-media/image/upload/v1752877852/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Redundancy-Zones/redundancy-zones-voting-servers-diagram.jpg)

| Availability Zone | Voting Servers | Non-Voting Servers |
| ----------------- | -------------- | ------------------ |
| AZ1               | 1              | 1                  |
| AZ2               | 1              | 1                  |
| AZ3               | 1              | 1                  |

- If the **voting server in AZ2 fails**, its non-voting peer in AZ2 is promoted.
- Quorum (3 of 5 voting servers) is maintained with one voting member in each zone.
- Topology still spans three zones, giving you time to replace the failed node.

## Handling an Entire Zone Failure

If a entire zone (for example, AZ1) goes offline:

- **AZ2**: 1 voting, 1 non-voting
- **AZ3**: 1 voting, 1 non-voting
- **Quorum remains intact** (2 of 3 voting servers), and Consul continues to serve requests.

![The image illustrates redundancy zones with servers, highlighting a failed zone (AZ1) and showing that quorum and resiliency are maintained in AZ2 and AZ3. It emphasizes enterprise features with a focus on maintaining system integrity despite failures.](https://kodekloud.com/kk-media/image/upload/v1752877853/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Redundancy-Zones/redundancy-zones-servers-quorum-resiliency.jpg)

> [!important]
> **Warning**
>
> If two or more zones fail simultaneously, you risk losing quorum. Always monitor zone health and automate node replacements.

## Benefits of Using Redundancy Zones

- High availability with cross-zone failover
- Automated promotion of non-voting peers
- Fault-domain isolation to prevent cascade failures
- Simplified operations in multi-region or hybrid environments

## Links and References

- [Consul Enterprise Redundancy Zones](https://www.consul.io/docs/enterprise/ha)
- [Kubernetes Service Discovery with Consul](https://www.consul.io/docs/connect)
- [HashiCorp Learn: Failover and Recovery](https://learn.hashicorp.com/consul/high-availability)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/bb95f43b-3acb-4ce2-88ae-0c79beb3e569/lesson/5194dacc-d8e3-458a-bc53-e5e4dc27b5c6)**
>
> Watch video content
