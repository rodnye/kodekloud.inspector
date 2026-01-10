# VPN Gateway - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Compute-and-Networking/VPN-Gateway)

---

## Table of Contents

- VPN Gateway
  - Key Features of VPN Gateway
  - Benefits
  - Use Cases
  - Transition to ExpressRoute
  - Watch Video
    - Secure Connectivity
    - Site-to-Site VPN
    - Point-to-Site VPN
    - Enhanced Security
    - Scalability
    - Seamless Integration

---

## Content

AZ900: Microsoft Azure Fundamentals

Compute and Networking

# VPN Gateway

VPN Gateway is a specialized Virtual Network Gateway that enables secure, encrypted communication between an Azure Virtual Network and on-premises networks. Essentially, the Azure VPN Gateway acts as a secure bridge that extends your on-premises network into the Azure Cloud or over the public internet while maintaining high levels of security and reliability.

Imagine a scenario where your cloud resources reside in an Azure Virtual Network and your on-premises data center requires a secure connection to these resources. The VPN Gateway establishes this secure connection via a VPN tunnel.

![The image is a diagram illustrating a VPN Gateway setup, showing an encrypted traffic gateway connecting an Azure Virtual Network to an on-premises network via a VPN tunnel.](https://kodekloud.com/kk-media/image/upload/v1752868301/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-VPN-Gateway/vpn-gateway-setup-diagram.jpg)

In this architecture, you deploy a VPN Gateway in Azure and connect it to a corresponding gateway device in your on-premises network. The two devices establish a VPN tunnel—a secure pathway that enables data packets to travel between Azure and your on-premises environment. Although the tunnel runs over the public internet, all traffic is fully encrypted, ensuring that the information remains confidential and protected from unauthorized access.

> [!important]
> **Note**
>
> Ensure that both your Azure VPN Gateway and on-premises gateway devices are configured correctly to maintain optimal security and performance.

## Key Features of VPN Gateway

### Secure Connectivity

VPN Gateway creates a private, encrypted tunnel for data traveling between your Azure and on-premises networks. This secure channel ensures that your sensitive data remains protected as it traverses the public infrastructure.

### Site-to-Site VPN

A site-to-site VPN configuration functions like a secure bridge between entire networks. In this setup, both your Azure environment and on-premises network deploy their gateway devices. The resulting VPN tunnel allows resources in both networks to communicate seamlessly, almost as if they were on the same local network.

### Point-to-Site VPN

For individual device connections—such as those used by remote workers—a point-to-site VPN ensures secure connectivity between personal devices and the Azure Virtual Network. This configuration is particularly beneficial when enabling remote work scenarios, as it grants access to corporate resources without exposing them to the public internet.

![The image outlines key features of a VPN Gateway, highlighting secure connectivity, site-to-site VPN, and point-to-site VPN.](https://kodekloud.com/kk-media/image/upload/v1752868302/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-VPN-Gateway/vpn-gateway-key-features-diagram.jpg)

## Benefits

### Enhanced Security

By leveraging industry-standard encryption protocols, Azure VPN Gateway ensures that data is kept confidential and tamper-proof during transit.

### Scalability

VPN Gateway is designed to accommodate growing organizational requirements. With various SKUs and sizes available based on bandwidth needs, you can select a configuration that aligns with your performance and capacity requirements—much like choosing an internet plan that fits your needs.

### Seamless Integration

As an integral part of the Azure ecosystem, VPN Gateway natively integrates with other Azure services. This integration facilitates smooth communication between cloud and on-premises resources. For instance, a virtual machine in Azure can securely communicate with an on-premises machine over the VPN tunnel without needing a public IP address.

![The image outlines the benefits of a VPN Gateway, highlighting enhanced security, scalability, and integration. Each benefit is represented with an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752868304/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-VPN-Gateway/vpn-gateway-benefits-icons.jpg)

## Use Cases

VPN Gateway is ideal for scenarios such as:

- **Secure On-Premises Extension:** Extending your on-premises network into the cloud through a secure, encrypted site-to-site VPN connection.
- **Remote Worker Access:** Providing secure access to corporate resources for remote employees using point-to-site VPN connections.

![The image illustrates common use cases for a VPN gateway, showing a cloud connected to two computer monitors, with labels for "Secure on-premises extension" and "Remote worker access."](https://kodekloud.com/kk-media/image/upload/v1752868304/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-VPN-Gateway/vpn-gateway-use-cases-diagram.jpg)

> [!important]
> **Warning**
>
> Always verify your VPN configurations and encryption protocols to avoid vulnerabilities that could expose your networks to security risks.

## Transition to ExpressRoute

Beyond VPN Gateway, another approach for connecting Azure environments to on-premises networks is ExpressRoute. Unlike traditional VPN tunnels, ExpressRoute provides a dedicated, private connection that can deliver enhanced reliability and performance. For detailed information on how ExpressRoute compares to VPN Gateway, refer to the [Microsoft Azure ExpressRoute documentation](https://docs.microsoft.com/en-us/azure/expressroute/).

By understanding the features, benefits, and use cases of VPN Gateway, you can make informed decisions on securing the connectivity between your cloud and on-premises environments. This ensures not only robust security but also the scalability and integration needed for modern hybrid network architectures.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/8eca3741-67ac-4ee2-8439-aa23c16d33dd/lesson/f31add9d-2f29-4c66-8178-45feebe58c6c)**
>
> Watch video content
