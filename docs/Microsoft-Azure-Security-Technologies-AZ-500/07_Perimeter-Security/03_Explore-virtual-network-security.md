# Explore virtual network security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Perimeter-Security/Explore-virtual-network-security)

---

## Table of Contents

- Explore virtual network security
  - Network Structure
  - Securing Traffic
  - Application Separation
  - Environment Separation
  - Protection of Internet-Facing Applications
  - DNS Management
  - Traffic Balancing
  - Conclusion
  - Watch Video
    - On-Premises
    - Azure
    - On-Premises
    - Azure
    - On-Premises
    - Azure
    - On-Premises
    - Azure
    - On-Premises
    - Azure
    - On-Premises
    - Azure

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Perimeter Security

# Explore virtual network security

Welcome back! In this article, we dive deep into virtual network security by comparing traditional on-premises setups with modern Azure environments. We'll examine essential topics such as network security controls, traffic filtering, application isolation, environment separation, protections for internet-facing applications, DNS management, and traffic balancing. Discover how Azure streamlines, automates, and abstracts many of the security challenges typically encountered in on-premises deployments.

---

## Network Structure

In a traditional on-premises setup, physical hardware—including servers, routers, and firewalls—is installed and maintained within the organization's premises. Typically, an in-house IT team manages a local data center hosting bespoke applications.

In contrast, Azure offers a fully virtualized network architecture managed through the Azure portal. This approach provides enhanced flexibility and scalability, allowing you to adjust virtual networks and bandwidth on demand without having to procure additional hardware.

---

## Securing Traffic

### On-Premises

On-premises infrastructure relies on dedicated firewalls and intrusion prevention systems (IPS) to filter and monitor traffic. Popular solutions include Cisco and FortiGate firewalls, which help protect against both inbound and outbound threats.

### Azure

Azure leverages services such as Azure Firewall and Network Security Groups (NSGs) to secure network traffic. These cloud-native tools offer a layered defense mechanism similar to traditional environments, but with reduced overhead and higher manageability.

---

## Application Separation

### On-Premises

Historically, isolating applications on-premises required deploying separate servers or virtual machines (VMs) for each application to ensure dedicated resource allocation and secure isolation.

### Azure

Azure permits similar isolation by using VMs, with the added benefit of the Azure App Service Environment. This feature provides a dedicated environment ensuring that each application remains isolated, much like maintaining separate server farms, but with greater operational simplicity.

---

## Environment Separation

### On-Premises

On-premises solutions often segregate development, testing, and production environments through physical or virtual isolation. This might involve using entirely different hardware or distinct virtualized setups.

### Azure

Azure simplifies environment separation with the use of separate subscriptions or resource groups. By logically partitioning resources, you can effectively isolate development from production environments without additional physical hardware investments.

> [!important]
> **Key Insight**
>
> Azure environments enable you to rapidly scale and adjust configurations, offering operational agility that is often challenging to achieve with traditional on-premises infrastructure.

---

## Protection of Internet-Facing Applications

### On-Premises

For on-premises systems, protection typically involves configuring firewall rules and deploying web application firewalls (WAF) to safeguard against external threats.

### Azure

Azure streamlines this process by offering robust services like the Azure Application Gateway and Azure Front Door, both of which feature built-in WAF capabilities. Additionally, while on-premises DDoS protection might require extra hardware or third-party solutions, Azure automatically enables a basic DDoS protection plan for all virtual networks and public IP addresses. For those requiring enhanced protection, Azure also offers a standard DDoS plan with additional threat intelligence services.

---

## DNS Management

### On-Premises

Managing DNS on-premises often requires maintaining self-hosted DNS servers or relying on third-party providers.

### Azure

Azure DNS is a managed service that simplifies domain management and traffic routing, eliminating the need for maintaining your own DNS infrastructure. This service streamlines operations and improves reliability while ensuring high availability.

---

## Traffic Balancing

### On-Premises

To distribute traffic, on-premises infrastructures usually depend on physical load balancers that ensure no single server becomes overwhelmed.

### Azure

Azure enhances traffic distribution by offering multiple load balancing solutions, including:

- **Azure Load Balancer**
- **Azure Application Gateway**
- **Azure Traffic Manager**
- **Azure Front Door**

For example, Azure Traffic Manager is a DNS-based load balancer that distributes traffic based on geographic location or latency, ensuring optimal application performance across regions.

---

## Conclusion

This article compared the security features of on-premises setups with Azure's managed, cloud-based solutions. Azure not only reduces the dependency on physical hardware but also offers scalable, flexible, and simplified management of your network security needs.

Our next article will explore how to enable Distributed Denial-of-Service (DDoS) protection in Azure, ensuring even higher levels of security for your applications.

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/cb10a3ae-53f4-4588-ad61-042af34f31ab/lesson/533e0707-afe1-4540-baca-691801cf128a)**
>
> Watch video content
