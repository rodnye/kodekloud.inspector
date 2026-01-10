# Enable Distributed Denial of Service DDoS Protection - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Perimeter-Security/Enable-Distributed-Denial-of-Service-DDoS-Protection)

---

## Table of Contents

- Enable Distributed Denial of Service DDoS Protection
  - Azure DDoS Protection Offerings
  - Enabling DDoS Protection in Azure
  - Watch Video
    - Key Differences Between Protection Plans
    - Step 1: Creating a Public IP Address
    - Step 2: Configuring DDoS Protection for the Public IP
    - Step 3: Creating a DDoS Protection Plan
    - Choosing Between Per IP and DDoS Protection Plans

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Perimeter Security

# Enable Distributed Denial of Service DDoS Protection

Distributed Denial-of-Service (DDoS) attacks aim to overwhelm your critical resources by flooding them with excessive traffic from diverse sources. Imagine a small ticket booth suddenly swarmed by a massive crowd; the booth quickly becomes incapable of serving even those waiting patiently. Similarly, a DDoS attack overloads websites or email services with requests, rendering them unresponsive.

In a typical DDoS scenario:

- An attacker targets a specific victim—such as a website or an email server.
- The attacker harnesses numerous compromised devices (botnets) to generate a flood of requests.
- The inundated traffic prevents legitimate users from accessing the service.

![The image illustrates a Distributed Denial of Service (DDoS) attack, showing an attacker using botnets to target a victim's computer system.](https://kodekloud.com/kk-media/image/upload/v1752882162/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Distributed-Denial-of-Service-DDoS-Protection/ddos-attack-botnets-victim.jpg)

Azure acts like a modern mall, where each shop (online application) is guarded by built-in security measures. Azure DDoS Protection ensures your online services remain operational and secure during a DDoS attack.

## Azure DDoS Protection Offerings

Azure provides two primary offerings that integrate with robust application design and best practices:

1.  **DDoS IP Protection**  
    This pay-per-protected IP model secures each public IP address individually. Key features include:
    - Mitigation policies tailored to your application needs
    - Detailed mitigation reports, metrics, alerts, and flow logs
    - Integration with Microsoft Sentinel for enhanced monitoring

    > [!important]
    > **Note**
    >
    > DDoS IP Protection supports only standard public IP addresses. Basic Tier public IP addresses are not eligible, making this option ideal for protecting one or two dedicated public-facing IPs.

2.  **DDoS Network Protection**  
    Charged per 100 protected IP addresses, this plan dynamically adjusts to safeguard all resources within your virtual network. It protects IPv4 and IPv6 addresses across various resources, such as virtual network interfaces, application gateways, and load balancers. Benefits include:
    - Rapid response support during DDoS attacks
    - Cost protection from unexpected financial impacts
    - Discounts on Web Application Firewall (WAF) usage for additional layers of security

![The image is an infographic about Azure DDoS Protection, highlighting features of DDoS IP Protection and DDoS Network Protection, including pricing models and value-added services.](https://kodekloud.com/kk-media/image/upload/v1752882163/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Distributed-Denial-of-Service-DDoS-Protection/azure-ddos-protection-infographic.jpg)

### Key Differences Between Protection Plans

- **DDoS IP Protection**: Provides per-IP protection ideal for a limited number of resources with standard public IP addresses.
- **DDoS Network Protection**: Offers comprehensive protection for multiple resources, including Basic Tier public IPs, making it the better option for environments with extensive internet exposure.

Azure continuously monitors traffic patterns and leverages intelligent analytics—without storing any customer data—to detect and mitigate suspicious traffic spikes that resemble DDoS attacks.

![The image shows a webpage from Microsoft Azure detailing a comparison of features between DDoS IP Protection and DDoS Network Protection tiers. It includes a table listing various features and their availability in each tier, along with additional resources and documentation links.](https://kodekloud.com/kk-media/image/upload/v1752882164/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Distributed-Denial-of-Service-DDoS-Protection/azure-ddos-protection-comparison.jpg)

## Enabling DDoS Protection in Azure

Follow these steps to enable Azure DDoS Protection for your resources using the Azure portal.

### Step 1: Creating a Public IP Address

Begin by creating a public IP address with the Standard SKU (the Basic SKU is not supported for DDoS IP Protection).

1.  In the Azure portal, click on "Create public IP address."
2.  Fill out the required details (e.g., set Resource Group to `rgprod` and Name to `PIP-demo`).
3.  Ensure that the SKU is set to "Standard."
4.  Click on "Review and create," then "Create."

![The image shows a Microsoft Azure portal page for creating a public IP address. It includes fields for instance details like region and configuration details such as name, IP version, SKU, and availability zone.](https://kodekloud.com/kk-media/image/upload/v1752882165/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Distributed-Denial-of-Service-DDoS-Protection/azure-portal-public-ip-creation.jpg)

Once the public IP address is created, navigate to its resource page.

### Step 2: Configuring DDoS Protection for the Public IP

1.  Within the public IP resource page, click on "Protect IP address."
2.  A notice will display that the public IP is not yet connected to any backend resource.
3.  Choose from three available options:
    - Inherit the DDoS Protection from an existing plan applied to the associated virtual network.
    - Apply a dedicated DDoS Protection plan for this specific IP.
    - Create a DDoS Protection Plan to cover all resources across your subscriptions.

After making your selection, click "Save" to enable DDoS protection for this public IP.

![The image shows a Microsoft Azure portal interface for configuring DDoS protection on a public IP address. It includes options for setting the protection status and type, with a warning about connecting the IP to a backend resource.](https://kodekloud.com/kk-media/image/upload/v1752882166/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Distributed-Denial-of-Service-DDoS-Protection/azure-ddos-protection-portal.jpg)

### Step 3: Creating a DDoS Protection Plan

For broader protection across multiple resources, create a DDoS Protection Plan:

1.  In the Azure portal, search for “DDoS” and select "DDoS Protection Plan."
2.  Click "Create" and provide the required details:
    - Resource Group: Use an existing resource group or create a new one.
    - Name: For example, "DDoS Plan East US."
3.  Once the plan is deployed, you can link various resources (public IP addresses, virtual network interfaces, application gateways, load balancers, etc.) across subscriptions and resource groups to this single plan. Note that each plan supports up to 100 protected IPs—additional IPs may incur extra costs.

![The image shows a Microsoft Azure portal page for DDoS protection plans, indicating that there are no DDoS protection plans currently displayed. There is an option to create a new DDoS protection plan.](https://kodekloud.com/kk-media/image/upload/v1752882167/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Distributed-Denial-of-Service-DDoS-Protection/azure-ddos-protection-plans-page.jpg)

![The image shows a Microsoft Azure portal page for creating a DDoS protection plan, with fields for project and instance details.](https://kodekloud.com/kk-media/image/upload/v1752882168/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Distributed-Denial-of-Service-DDoS-Protection/azure-ddos-protection-plan-portal.jpg)

After deploying the plan, view and manage your protected resources by clicking "Protected resources." You can then add virtual networks, firewalls, application gateways, bastion hosts, load balancers, and any resource that possesses a public IP.

![The image shows a Microsoft Azure portal interface displaying a DDoS protection plan overview with no protected resources listed. The sidebar includes options like Overview, Activity log, and Protected resources.](https://kodekloud.com/kk-media/image/upload/v1752882169/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Distributed-Denial-of-Service-DDoS-Protection/azure-portal-ddos-protection-overview.jpg)

If available, you may also add VNets by clicking "Add a VNet" to extend the plan’s coverage.

![The image shows a Microsoft Azure portal page for managing a DDoS protection plan, specifically the "Protected resources" section, with no resources currently listed.](https://kodekloud.com/kk-media/image/upload/v1752882170/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Distributed-Denial-of-Service-DDoS-Protection/azure-ddos-protection-portal-2.jpg)

### Choosing Between Per IP and DDoS Protection Plans

- Use the **per IP plan** if you need to secure one or two public-facing IP addresses.
- Select the **DDoS Protection Plan** when you have multiple IP addresses or resources (such as virtual networks, firewalls, and load balancers) that require comprehensive protection. Although the network plan involves slightly higher costs, it delivers extensive coverage for your entire infrastructure.

With Azure DDoS Protection enabled, you can operate with confidence knowing that your online assets are safeguarded against disruptive DDoS attacks.

For additional security measures, consider exploring services like [Azure Firewall](https://learn.microsoft.com/en-us/azure/firewall/).

> [!important]
> **Additional Information**
>
> For more insights into protecting your infrastructure, visit the [Microsoft Azure Security documentation](https://learn.microsoft.com/en-us/azure/security/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/cb10a3ae-53f4-4588-ad61-042af34f31ab/lesson/5a9f0c3f-2356-4f40-aedb-bc404415cde3)**
>
> Watch video content
