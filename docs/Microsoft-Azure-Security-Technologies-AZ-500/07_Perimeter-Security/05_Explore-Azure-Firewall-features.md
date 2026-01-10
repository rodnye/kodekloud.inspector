# Explore Azure Firewall features - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Perimeter-Security/Explore-Azure-Firewall-features)

---

## Table of Contents

- Explore Azure Firewall features
  - Key Benefits of Azure Firewall
  - Azure Firewall Variants
  - Azure Firewall Manager
  - Implementing Azure Firewall
  - Watch Video
    - High Availability
    - Scalability
    - Redundancy
    - Multiple Rule Types
    - Threat Intelligence
    - Public IP Support
    - Azure Firewall Standard
    - Azure Firewall Premium
    - Key Features of Azure Firewall Manager

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Perimeter Security

# Explore Azure Firewall features

Azure Firewall is a managed, cloud-based network security service provided by Microsoft Azure that safeguards your virtual network resources. It offers advanced threat protection and filters harmful network traffic while enforcing and auditing connectivity policies across multiple subscriptions and virtual networks. This ensures a well-monitored and secure networking environment.

While third-party firewalls (often referred to as network virtual appliances or NVAs) are available in Azure, Azure Firewall offers several distinct benefits that set it apart.

## Key Benefits of Azure Firewall

### High Availability

Azure Firewall is designed to be always available without requiring additional load balancers or complex configurations. This inherent high availability ensures that your security measures remain operational even during maintenance or unexpected events.

### Scalability

With auto-scaling capabilities, Azure Firewall adapts dynamically to changing traffic loads. It automatically scales up during periods of high demand and scales down when traffic decreases, ensuring optimal performance at all times.

### Redundancy

Operating across multiple availability zones, Azure Firewall eliminates any single point of failure. This redundancy guarantees continuous operation, even if one zone experiences issues.

### Multiple Rule Types

Azure Firewall supports a variety of rule types, including application rules, network rules, and network address translation (NAT) rules. This multi-rule approach provides precise control over traffic flow and ensures that only authorized network access is permitted.

### Threat Intelligence

Leveraging continuously updated intelligence feeds from Microsoft, Azure Firewall proactively identifies and blocks potentially harmful traffic. This helps you stay ahead of emerging threats by incorporating real-time threat data.

### Public IP Support

Azure Firewall supports both public and private IP addresses. This flexibility enables you to secure public-facing applications as well as manage internal network communications effectively.

> [!important]
> **Summary**
>
> Azure Firewall offers high availability, scalability, redundancy, versatile rule types, proactive threat intelligence, and flexible IP address support, making it a robust security solution for your Azure environment.

## Azure Firewall Variants

Azure Firewall is available in two distinct variants: Standard and Premium. Both variants offer a comprehensive set of features, with key differences in capabilities.

### Azure Firewall Standard

Azure Firewall Standard serves as a centralized node for all traffic entering and exiting your Azure infrastructure. It secures both spoke networks and on-premises connection points (via site-to-site VPN or ExpressRoute) by default denying all traffic until explicit rules permit specific types of communication.

Key features of the Standard Firewall include:

- **Stateful Inspection:** Monitors all sessions entering and exiting the network to ensure compliance with defined rules.
- **Network Traffic Filtering:** Controls inbound and outbound traffic based on source, destination, and port.
- **Application FQDN Filtering:** Regulates outbound traffic to specific domains by allowing access only to approved sites.
- **Threat Intelligence:** Uses data-driven insights to identify and block risky IP addresses and domains.
- **Azure Monitor Integration:** Provides logging and analytics capabilities to maintain a close watch over network activities.

Below is a diagram that illustrates the Azure Firewall Standard setup, demonstrating its integration with various components like spoke VNets, on-premises connections, and policy-driven traffic filtering:

![The image is a diagram illustrating the Azure Firewall Standard setup, showing its integration with VNET/VWAN, user configuration policies, and threat intelligence for traffic filtering. It includes components like Spoke VNets, on-premises connections, and indicates that traffic is denied by default unless explicitly allowed.](https://kodekloud.com/kk-media/image/upload/v1752882171/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Explore-Azure-Firewall-features/azure-firewall-standard-setup-diagram.jpg)

### Azure Firewall Premium

Azure Firewall Premium includes all Standard features and introduces advanced functionalities for enhanced security. Its additional capabilities provide deeper traffic inspection and intrusion prevention measures.

Premium features include:

- **TLS Inspection:** Decrypts and re-encrypts both inbound and outbound traffic to inspect for hidden malicious content.
- **Intrusion Detection and Prevention System (IDPS):** Detects and blocks malicious activity by analyzing data packets across the network.
- **Web Categories and URL Filtering:** Offers granular control over outbound HTTPS traffic by categorizing websites and filtering URLs. For example, this feature can block access to sites associated with cryptocurrency.
- **Anti-Malware Inspection:** Scans files in transit for malware and other threats, further enhancing your network’s security posture.

The diagram below details the features and structure of Azure Firewall Premium, including TLS inspection, IDPS, URL filtering, and web categories:

![The image is a diagram illustrating the features and structure of Azure Firewall Premium, including TLS inspection, IDPS, URL filtering, and web categories, with connections to spoke VNets and on-premises traffic filtering. Traffic is denied by default, and the diagram shows the flow of data through the firewall.](https://kodekloud.com/kk-media/image/upload/v1752882171/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Explore-Azure-Firewall-features/azure-firewall-premium-diagram.jpg)

## Azure Firewall Manager

Azure Firewall Manager is a centralized management solution that simplifies the configuration and orchestration of firewall settings across multiple instances and regions. This centralized approach ensures consistent security policies applied across a diverse infrastructure.

### Key Features of Azure Firewall Manager

- **Centralized Configuration:** Manage all Azure Firewall instances from a single interface, simplifying administration and ensuring a uniform security posture.
- **Policy Management:** Define and propagate consistent firewall rules across multiple firewalls to reduce the risk of misconfiguration.
- **Integrated Security Management:** Seamlessly integrates with Azure Virtual WAN to enable automated setup, streamlined policy application, and efficient route management.
- **Threat Intelligence:** Leverages Microsoft Threat Intelligence to proactively detect and mitigate potential threats across all managed firewalls.
- **Multi-Region and Multi-Cloud Support:** Provides governance for resources distributed across various Azure regions or even different cloud providers.
- **Secure Virtual Hub:** Establishes a consolidated hub for enforcing security and routing policies, acting as a fortified checkpoint between networks.

The following diagram shows the centralized management architecture, where multiple Azure Firewall instances across various regions are managed by a global administrator using Azure Firewall Manager:

![The image is a diagram of the Azure Firewall Manager, illustrating the integration of Azure Firewall with Zscaler, secured vHub, and Hub VNet, managed by global and local admins. It shows connections to HQ/Branch, end-user devices, and data centers via Virtual WAN, ER, and VPN.](https://kodekloud.com/kk-media/image/upload/v1752882172/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Explore-Azure-Firewall-features/azure-firewall-manager-diagram.jpg)

Azure Firewall Manager is particularly valuable for organizations operating multiple firewalls—such as having a primary firewall in West Europe and a disaster recovery firewall in North Europe—by ensuring consistent policy enforcement across regions.

## Implementing Azure Firewall

With a clear understanding of Azure Firewall’s capabilities—including the differences between Standard and Premium variants and the centralized controls provided by Azure Firewall Manager—you are now ready to implement Azure Firewall in your environment. This implementation ensures a robust defense against malicious intrusions while providing intuitive management and flexibility across your network infrastructure.

For more details on getting started and best practices, visit the [Azure Firewall documentation](https://docs.microsoft.com/en-us/azure/firewall/).

> [!important]
> **Next Steps**
>
> Explore additional resources such as [Azure Networking Overview](https://docs.microsoft.com/en-us/azure/networking/) and [Microsoft Threat Protection](https://www.microsoft.com/security/) to further enhance your cybersecurity strategy.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/cb10a3ae-53f4-4588-ad61-042af34f31ab/lesson/4671886e-0e8f-4ff7-808e-d6772c5b9de9)**
>
> Watch video content
