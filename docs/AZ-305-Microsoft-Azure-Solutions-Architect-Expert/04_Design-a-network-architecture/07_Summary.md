# Summary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-network-architecture/Summary)

---

## Table of Contents

- Summary
  - Connecting On-Premises to Azure
  - Central Virtual Network Configuration
  - Deploying SPOC Networks and the Three-Tier Application
  - Global Traffic Management
  - Conclusion
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a network architecture

# Summary

In this article, we explore an architectural design that connects an on-premises environment to Azure. The design leverages private connectivity, centralized traffic inspection, and fault tolerance through a failover path. Additionally, we detail the deployment of a three-tier application across two SPOC (Single Point of Connectivity) networks located in West US and West Europe.

---

## Connecting On-Premises to Azure

The following outlines the architecture for connecting your on-premises environment to Azure. Use these descriptions to visualize the architecture components and their interactions.

1.  **On-Premises and Azure Representation:**
    - Envision a component labeled "On-Premises" that represents your on-premises infrastructure.
    - Above it, picture a larger component labeled "Azure" that hosts elements such as Virtual Networks and three-tier applications.

2.  **Private Connection using ExpressRoute:**  
    To establish a secure, private connection, integrate ExpressRoute into the design:
    - Picture a bidirectional line labeled "ExpressRoute" linking the on-premises environment to Azure.
    - Envision a dedicated gateway subnet that contains an ExpressRoute gateway component, emphasizing that the primary connection occurs between on-premises and the ExpressRoute gateway.

3.  **Failover Path with VPN Gateway:**  
    For resiliency, if the ExpressRoute connection fails, a VPN gateway will serve as a backup:
    - Imagine a secondary connection represented by a uniquely styled, dashed line illustrating its backup status.
    - This VPN-based pathway ensures continuous connectivity between the on-premises environment and Azure.

---

## Central Virtual Network Configuration

The architecture requires a central Virtual Network (VNet) that is segmented into distinct functional areas:

1.  **Traffic Inspection (Azure Firewall):**
    - Visualize the central VNet as a hub containing a dedicated subnet for the Azure Firewall.
    - All inbound and outbound traffic—from both the VPN gateway and ExpressRoute—is routed through this firewall for inspection.

    > [!important]
    > **Note**
    >
    > Each packet is inspected to ensure both security and compliance standards are maintained before it reaches other network segments.

2.  **Bastion for RDP/SSH:**
    - Include a dedicated Bastion subnet within the central hub.
    - Label this component as "Azure Bastion" to highlight its role in providing secure RDP or SSH access without exposing public IP addresses.

---

## Deploying SPOC Networks and the Three-Tier Application

To host a three-tier application, deploy two SPOC networks—one in West US and one in West Europe. The following steps detail this deployment:

1.  **SPOC Network Creation and Peering:**
    - Imagine two separate network segments labeled "SPOC WUS" for West US and "SPOC WEU" for West Europe.
    - Establish peering connections between each SPOC network and the central VNet to facilitate secure communication.

2.  **Subnets for the Three-Tier Application:**  
    Within each SPOC network, create the following sub-networks:

    | Sub-network | Description                                                    |
    | ----------- | -------------------------------------------------------------- |
    | Front-end   | Hosts user-facing application components                       |
    | Mid-tier    | Runs business logic and processes requests on port 8080        |
    | Database    | Connects to the SQL PaaS with additional security restrictions |

3.  **Traffic Inspection and Load Balancing:**
    - Implement an Application Gateway with Web Application Firewall (WAF) capabilities to inspect all web requests before they reach the front-end.
    - Deploy a standard load balancer to direct traffic from the Application Gateway to mid-tier virtual machines on port 8080.
    - Trace the traffic flow: Requests originate at the Application Gateway, pass to the front-end components, route through the load balancer to the mid-tier systems, and finally proceed to port 8080.

4.  **SQL PaaS Database and Private Endpoint Connection:**
    - The SQL PaaS is deployed as a separate component labeled "SQL PaaS."
    - Secure a private connection between the mid-tier subnet and the SQL PaaS using a private endpoint.
    - Visualize a connection line linking the mid-tier to the SQL PaaS through this dedicated private channel.

5.  **Enforcing Network Security via NSG:**
    - Apply a Network Security Group (NSG) rule that denies any direct traffic from the front-end subnet to the database subnet, ensuring that data flows only through controlled, secure pathways.

---

## Global Traffic Management

For optimal user experience, implement global traffic management to direct users to their closest deployment region based on latency:

- Picture a component labeled "Azure Traffic Manager" that accepts internet requests.
- The Traffic Manager then intelligently directs these requests to the appropriate Application Gateway in either West US or West Europe.
- Once the request reaches the Application Gateway, it follows the established path: front-end system → load balancer → mid-tier → SQL PaaS (via a private endpoint).

---

## Conclusion

This architecture demonstrates a reliable method to connect an on-premises environment to Azure using ExpressRoute for dedicated private connectivity complemented by a VPN failover path. The central Virtual Network enhances security and accessibility with traffic inspection through the Azure Firewall and secure remote access via Azure Bastion. Meanwhile, SPOC networks ease the distributed deployment of a three-tier application reinforced by load balancing, a private endpoint to SQL PaaS, and global traffic routing with Azure Traffic Manager.

Future articles will delve into designing compute solutions in Azure and strategies for selecting the optimal compute option tailored to your needs.

Thank you for reading, and best of luck with your Azure architecture design!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/61e4ebd3-ea7b-4ade-94f7-e203f93b60c9/lesson/1193d894-4a3b-4117-953a-60f6e3ade47d)**
>
> Watch video content
