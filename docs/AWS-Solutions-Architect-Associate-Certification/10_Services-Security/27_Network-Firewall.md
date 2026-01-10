# Network Firewall - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Security/Network-Firewall)

---

## Table of Contents

- Network Firewall
  - Firewall Endpoints and Subnet Configuration
  - Key Features of AWS Network Firewall
  - Traffic Flow Process
  - Deployment Models
  - Rules Engines: Stateless vs. Stateful
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Security

# Network Firewall

In this lesson, we explore AWS Network Firewall, a fully managed service that secures your Virtual Private Cloud (VPC) by filtering incoming and outgoing traffic. By leveraging granular control and deep inspection features, AWS Network Firewall ensures that only authorized traffic is allowed in or out of your VPC.

> [!important]
> **Note**
>
> When deploying AWS Network Firewall, always configure dedicated Firewall Endpoints within exclusive subnets. Avoid sharing these subnets with other resources to ensure comprehensive protection.

## Firewall Endpoints and Subnet Configuration

To safeguard your VPC and its subnets, it is crucial to create dedicated Firewall Endpoints. These endpoints act as the primary points for traffic inspection. You must allocate a specific subnet for your firewall deployment because placing a Firewall Endpoint in a subnet with other resources could compromise their protection.

![The image is a diagram illustrating a network firewall setup within a Virtual Private Cloud (VPC), showing private and firewall subnets across two availability zones, connected to a central firewall endpoint.](https://kodekloud.com/kk-media/image/upload/v1752865909/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Network-Firewall/vpc-network-firewall-setup-diagram.jpg)

In the diagram above, you can observe that separate subnets have been deployed across various availability zones to serve as Firewall Endpoints. Reserving an exclusive subnet for these endpoints ensures that your other VPC resources remain effectively protected.

## Key Features of AWS Network Firewall

AWS Network Firewall offers a range of robust features designed to enhance your network security:

- **Centralized Rule Management:** Simplify administration with rule groups that ensure consistent policies across multiple VPCs.
- **Granular Traffic Control:** Define detailed rules based on IP addresses, ports, protocols, and other traffic attributes.
- **Deep Packet Inspection & Intrusion Detection:** Identify and block advanced threats at both network and application layers.
- **Comprehensive Logging:** Maintain detailed logs of network and firewall activity for security analysis, compliance, and troubleshooting.
- **Rule Synchronization:** Seamlessly synchronize rules across multiple firewall instances, ideal for complex network architectures and multi-VPC environments.

![The image lists five features of a network firewall: Simplified Rule Management, Granular Control, Advanced Threat Protection, Logging and Monitoring, and Rule Synchronization. Each feature is represented with an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752865910/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Network-Firewall/network-firewall-features-list.jpg)

## Traffic Flow Process

When AWS Network Firewall is enabled, traffic within your VPC is directed through a carefully managed inspection process:

- **Inbound Traffic:** Traffic from the Internet Gateway is first routed to the dedicated Firewall Endpoint in the firewall subnet. After being inspected and validated against the firewall rules, it is forwarded to the subnet hosting your resources.
- **Outbound Traffic:** Similarly, outbound traffic from your resources is sent to the Firewall Endpoint for inspection before exiting the VPC.

It is essential to configure your route tables properly to ensure that traffic passes through the Firewall Endpoint. Without this configuration, inbound or outbound traffic might bypass the firewall inspection.

> [!important]
> **Warning**
>
> Improper routing configuration can lead to traffic bypassing the firewall inspection, potentially exposing your network to security risks.

## Deployment Models

AWS Network Firewall supports two primary deployment models to suit different network architectures:

1.  **VPC Deployment:** Protects resources within a single VPC by directing traffic from the Internet Gateway to the Firewall Endpoint and then to the target subnet.
2.  **Transit Gateway Deployment:** Provides centralized protection across multiple VPCs or on-premises networks by connecting them through an AWS Transit Gateway, eliminating the need for deploying individual firewalls for each VPC.

## Rules Engines: Stateless vs. Stateful

AWS Network Firewall employs two distinct rules engines that allow you to tailor traffic inspection based on your security needs:

- **Stateless Rules Engine:** Analyzes each packet independently without considering the traffic context. This engine processes rules in a user-defined order—similar to network ACLs—to determine if packets should be allowed or dropped.
- **Stateful Rules Engine:** Inspects packets within the context of their ongoing traffic flow. It recognizes the request-response pattern, supports complex rules, and logs traffic details. The engine processes pass rules first, followed by drop rules, and finally alert rules. It functions similarly to VPC security groups and is compatible with Suricata IPS.

![The image illustrates the flow of network traffic through firewall stateless and stateful engines, showing how packets are inspected and either dropped or passed based on rules.](https://kodekloud.com/kk-media/image/upload/v1752865911/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Network-Firewall/network-traffic-firewall-flow-diagram.jpg)

By leveraging either stateless or stateful inspection—or even a combination of both—you can customize AWS Network Firewall to meet your specific security requirements, ensuring efficient and comprehensive VPC protection.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6b2d9e18-1714-499c-83d4-4d1f7ff29e66/lesson/bac7948a-5ef0-4a45-9dab-7be5f97df50d)**
>
> Watch video content
