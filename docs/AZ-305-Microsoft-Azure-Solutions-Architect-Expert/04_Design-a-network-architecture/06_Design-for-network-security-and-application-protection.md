# Design for network security and application protection - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-network-architecture/Design-for-network-security-and-application-protection)

---

## Table of Contents

- Design for network security and application protection
  - Service Endpoint
  - Private Link
  - Network Security Groups (NSGs)
  - Azure Firewall
  - Web Application Firewall (WAF)
  - DDoS Protection
  - Azure Bastion
  - Just-In-Time (JIT) VM Access
  - Architectural Scenario
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a network architecture

# Design for network security and application protection

This article provides an in-depth overview of strategies for enhancing application protection and network security using Microsoft Azure services. Discover how to leverage Service Endpoints, Private Links, Network Security Groups, Azure Firewall, Web Application Firewall (WAF), DDoS protection, Azure Bastion, and Just-In-Time (JIT) access for Virtual Machines to build a resilient and secure Azure environment.

---

## Service Endpoint

Service Endpoints enable resources within your virtual network to securely access Azure PaaS services without routing traffic over the public internet. Once configured—for instance, to access an Azure Storage account—outbound traffic from your virtual machines uses the VM’s private IP address. Although the service name still resolves to a public IP, the traffic flows solely over Microsoft’s backbone network, enhancing security by eliminating the need for public IP assignments.

To set up a Service Endpoint, configure the storage account firewall to allow traffic originating from the Service Endpoint of your virtual network. Once enabled, outbound requests carry the private IP address, ensuring secure and efficient communication.

![The image illustrates a service endpoint setup for Azure, showing a virtual machine connecting securely to Azure Storage Service via Microsoft's backbone network, with key points on security, routing, and ease of setup.](https://kodekloud.com/kk-media/image/upload/v1752867076/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-security-and-application-protection/azure-service-endpoint-setup.jpg)

The configuration process is straightforward: simply select the required subscription, resource group, and virtual network, and the Service Endpoint will activate within seconds.

---

## Private Link

Private Link extends the concept of secure connectivity by assigning a private IP address from your virtual network directly to the PaaS service. Unlike Service Endpoints—where the service name still resolves to a public IP—Private Link incorporates the service into your network as if it were a native network interface.

Key advantages of using Private Link include:

- Communication exclusively over private IP addresses.
- Simplified integration with on-premises networks via ExpressRoute or VPN without additional NAT requirements.
- Enhanced security by removing exposure to the public internet.

![The image is an infographic from KodeKloud about "Private Link," illustrating private connectivity to PaaS services using a private IP address from a virtual network. It highlights three points: private connectivity, connectivity from on-premises, and eliminating public internet access.](https://kodekloud.com/kk-media/image/upload/v1752867077/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-security-and-application-protection/private-link-infographic-paas-connectivity.jpg)

---

## Network Security Groups (NSGs)

Network Security Groups (NSGs) serve as virtual firewalls that filter traffic at the subnet and network interface levels within your virtual network. NSGs use customizable rules based on factors such as port, protocol, direction, and Azure service tags to allow or deny traffic.

Key features include:

- **Traffic Filtering:** Define granular rules to permit or block traffic based on your security requirements.
- **Rule Inheritance:** NSGs applied at the subnet level automatically protect all associated virtual machine interfaces, though you can attach NSGs directly to a NIC to override inherited rules.
- **Default Behavior:** Inbound traffic is blocked by default (with the exception of VNet and Azure load balancer health probes), while outbound traffic is allowed unless specifically restricted.

![The image is an infographic about Network Security Groups, explaining traffic filtering, applicability for inbound and outbound traffic, and scopes for subnets or network interfaces.](https://kodekloud.com/kk-media/image/upload/v1752867079/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-security-and-application-protection/network-security-groups-infographic.jpg)

---

## Azure Firewall

Azure Firewall is a robust, cloud-native security service designed to protect your virtual networks. Deployed within its dedicated subnet, the Azure Firewall acts as a central point for inspecting and filtering traffic between on-premises networks and Azure, or among various virtual networks.

Key capabilities include:

- **Comprehensive Protection:** Utilize network and application rules to block unauthorized traffic.
- **Centralized Rule Management:** By default, all traffic is denied until you explicitly define permissions.
- **Hub-and-Spoke Deployment:** Commonly used in a centralized hub-and-spoke architecture for efficient traffic inspection and routing.
- **Managed Service:** Enjoy automated scalability, availability, maintenance, and patching managed by Microsoft.

![The image is an infographic about Azure Firewall, illustrating its role in protecting virtual network resources with a diagram showing traffic flow and key features like network protection, rules and policies, and deployment. It includes text explaining how Azure Firewall manages traffic and enhances security.](https://kodekloud.com/kk-media/image/upload/v1752867080/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-security-and-application-protection/azure-firewall-traffic-flow-infographic.jpg)

> [!important]
> **Note**
>
> For more detailed configuration instructions, see the [Azure Firewall Documentation](https://docs.microsoft.com/en-us/azure/firewall/).

---

## Web Application Firewall (WAF)

The Web Application Firewall (WAF) safeguards your web applications from common attack vectors such as cross-site scripting (XSS) and SQL injection. WAF can operate in two modes:

- **Prevention Mode:** Actively blocks malicious traffic.
- **Detection Mode:** Monitors and logs suspicious activity without blocking, allowing you to fine-tune security policies before full enforcement.

Deploying WAF initially in detection mode ensures that legitimate traffic is not inadvertently blocked; once the policies are refined, you can switch to prevention mode for maximum protection.

WAF policies are centrally managed and can be applied across multiple applications via Azure Application Gateway, Azure Front Door, or a CDN.

![The image is an infographic about Web Application Firewall (WAF), illustrating its role in protecting against attacks like XSS and SQL injection, and highlighting features like protection modes, central management, and support.](https://kodekloud.com/kk-media/image/upload/v1752867081/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-security-and-application-protection/web-application-firewall-infographic.jpg)

Several deployment architectures are available to suit different needs:

1.  **Azure Firewall Alone:** Best for non-HTTP workloads.
2.  **WAF Alone:** Ideal for web application protection, combined with NSGs for broader traffic control.
3.  **Parallel Deployment:** Use WAF for HTTP traffic and Azure Firewall for other network traffic.
4.  **WAF in Front:** Filter HTTP traffic with WAF first, then use the firewall for deeper inspection.
5.  **Azure Firewall in Front:** Inspect all traffic using Azure Firewall, then forward web-specific traffic to WAF for final processing.

![The image is an infographic from KodeKloud comparing Azure Firewall and WAF (Web Application Firewall) scenarios, detailing five configurations: Azure Firewall alone, WAF alone, in parallel, WAF in the front, and Azure Firewall in the front.](https://kodekloud.com/kk-media/image/upload/v1752867082/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-security-and-application-protection/azure-firewall-waf-comparison-infographic.jpg)

---

## DDoS Protection

Azure's built-in Distributed Denial of Service (DDoS) protection safeguards your virtual networks from large-scale attacks. While all virtual networks come with basic DDoS protection enabled, the Standard SKU offers enhanced features:

- **Always-On Monitoring:** Constantly analyzes traffic with adaptive tuning to detect anomalies.
- **Layered Defense and Alerting:** Provides advanced attack analytics along with comprehensive alerting features.
- **Targeted Security:** The Standard plan is particularly recommended for public-facing resources to maximize security.

![The image illustrates a DDoS protection plan, showing a flow from the internet through a DDoS standard plan to computers, with three key features: always-on monitoring, multi-layer protection and alerting, and plan recommendations.](https://kodekloud.com/kk-media/image/upload/v1752867084/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-security-and-application-protection/ddos-protection-plan-diagram.jpg)

The DDoS Standard Plan uses adaptive tuning to differentiate between legitimate and malicious traffic, ensuring that only genuine requests reach your applications.

---

## Azure Bastion

Azure Bastion enables secure, seamless RDP and SSH connectivity to your Azure Virtual Machines without the need for public IP addresses. Traditionally, accessing VMs without public IPs required a jump host, but Azure Bastion allows you to initiate secure sessions directly from the Azure Portal over SSL/TLS.

Benefits of using Azure Bastion include:

- **Enhanced Security:** Eliminates reliance on public IPs and exposure of RDP/SSH ports.
- **Centralized Management:** Deploy Bastion in a hub network to manage access across multiple virtual networks.
- **Fully Managed Service:** Microsoft handles all maintenance, patching, and scalability requirements.

![The image illustrates the Azure Bastion architecture, showing secure VM access within a virtual network without public IPs, and highlights benefits like secure connections, eliminating port exposure, and centralization.](https://kodekloud.com/kk-media/image/upload/v1752867085/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-security-and-application-protection/azure-bastion-architecture-diagram.jpg)

---

## Just-In-Time (JIT) VM Access

Just-In-Time (JIT) access, part of the Microsoft Defender for Cloud Standard plan, reduces the exposure of management ports (like RDP and SSH) by blocking inbound traffic until explicit permission is granted. This temporary access model minimizes the risk of attacks on commonly targeted ports.

When you request access:

- Pre-existing deny rules for the management ports are temporarily lifted.
- Access is granted for a predefined duration, after which the firewall rules are automatically reinstated.
- This method significantly lowers the attack surface while still providing necessary administrative access.

![The image is an informational graphic about "JIT access" for virtual machines, detailing steps to lock inbound traffic, access when required, and planning, alongside a flowchart for enabling just-in-time VM access.](https://kodekloud.com/kk-media/image/upload/v1752867087/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-security-and-application-protection/jit-access-virtual-machines-graphic.jpg)

> [!important]
> **Note**
>
> Ensure that your VMs are also protected by Network Security Groups or a firewall when enabling JIT access.

---

## Architectural Scenario

Consider a scenario where a client requires a resilient private connection from their on-premises network to Azure, complete with failover mechanisms. The design includes a central hub with two spokes hosting a three-tier application deployed across two regions. Additional requirements include load balancing, a secure private connection to a SQL PaaS database, and strict traffic controls between the front-end subnet and the database subnet.

![The image outlines a scenario with requirements for Vendetta Corp to connect their on-premises environment to Azure, including network and application specifications. It details the need for a private connection, traffic inspection, and specific routing and load balancing for a three-tier application.](https://kodekloud.com/kk-media/image/upload/v1752867088/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-security-and-application-protection/vendetta-corp-azure-connection-diagram.jpg)

Take a moment to sketch your architectural diagram using Visio, PowerPoint, or your preferred design tool. Use this guidance to ensure your solution meets both network and application protection criteria.

---

This article has provided a comprehensive look at advanced network security and application protection strategies using Azure services. By understanding and implementing these components, you can build a robust, secure, and scalable infrastructure optimized for modern cloud environments. Happy designing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/61e4ebd3-ea7b-4ade-94f7-e203f93b60c9/lesson/77dba010-25c1-42c3-8480-6e0b68f2c55a)**
>
> Watch video content
