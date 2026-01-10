# Site to Site and Point to Site - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Intersite-Connectivity/Site-to-Site-and-Point-to-Site)

---

## Table of Contents

- Site to Site and Point to Site
  - Site-to-Site Connection
  - Point-to-Site Connection
  - Gateway Transit
  - Watch Video
    - Key Components
    - Setting Up a Site-to-Site Connection
    - Overview of the Setup Process
    - Demonstration in the Azure Portal

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Intersite Connectivity

# Site to Site and Point to Site

This guide details how to establish both Site-to-Site and Point-to-Site VPN connections in Azure. It covers the required resources, configurations, and step-by-step procedures for securely linking your on-premises network or individual devices to an Azure Virtual Network.

---

## Site-to-Site Connection

A Site-to-Site connection creates a secure VPN tunnel between your on-premises VPN device and an Azure VPN Gateway in your Virtual Network Gateway subnet. This setup enables seamless data transfer between your local environment and Azure as if they were part of the same network.

### Key Components

1.  **Gateway Subnet**  
    Begin by creating a dedicated gateway subnet within your Virtual Network (VNet) in Azure. This subnet is exclusively reserved for the Azure Virtual Network Gateway.
2.  **Virtual Network Gateway (VPN Gateway)**  
    Deployed within the gateway subnet, the VPN Gateway encrypts and decrypts data, maintains the VPN tunnel, and manages the connectivity between Azure and on-premises resources.
3.  **Local Network Gateway**  
    This resource acts as a reference for your on-premises VPN device by storing its public IP address and address range. For example, if your on-premises device has an IP address of 13.12.11.11, configure the Local Network Gateway to reference this IP accordingly.
4.  **On-Premises VPN Device**  
    The VPN appliance (either physical or virtual) on your local network must be configured to align with the Azure VPN Gateway settings. Once the Site-to-Site connection is established, the Azure VPN Gateway and your on-premises VPN device communicate to form a secure tunnel.

The diagram below illustrates the overall architecture of a Site-to-Site VPN connection, including the gateway subnet, VPN gateway, local network gateway, and the on-premises VPN device:

![The image is a diagram illustrating a site-to-site connection, showing components like a gateway subnet, VPN gateway, local network gateway, on-premises VPN device, and the site-to-site connection.](https://kodekloud.com/kk-media/image/upload/v1752884639/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Site-to-Site-and-Point-to-Site/site-to-site-connection-diagram.jpg)

### Setting Up a Site-to-Site Connection

1.  **Configure the Virtual Network Gateway:**  
    In the Azure portal, navigate to your Virtual Network Gateway. Although the creation process for the Virtual Network Gateway is outside the scope of this guide, reviewing its configuration can help you understand the overall setup.
2.  **Add a Connection:**  
    Under the "Connections" section of the Virtual Network Gateway, click on "Add connection." You can choose between a VNet-to-VNet connection (for connecting to another VNet) or a Site-to-Site connection. For this guide, select Site-to-Site and assign a suitable name (e.g., "Demo Site-to-Site East US").

    ![The image shows a Microsoft Azure portal interface for creating a connection, with fields for project and instance details such as subscription, resource group, connection type, name, and region. The "Review + create" and "Next: Settings" buttons are visible at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752884641/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Site-to-Site-and-Point-to-Site/azure-portal-connection-setup.jpg)

3.  **Configure Connection Settings:**  
    In the next step, select the appropriate Virtual Network Gateway and reference the Local Network Gateway. Provide details such as the public IP address (or FQDN) of your on-premises VPN device and its served address range.

    ![The image shows a Microsoft Azure portal interface for creating a connection, with settings for a virtual network gateway and a search for "local network gateways" in progress.](https://kodekloud.com/kk-media/image/upload/v1752884642/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Site-to-Site-and-Point-to-Site/azure-portal-virtual-network-gateway.jpg)

4.  **Finalize the Connection:**  
    Specify additional parameters such as BGP (if needed), private IP addressing, policy settings, and connection modes. Make sure these settings are mirrored on your on-premises VPN device. After reviewing and confirming all settings, the Site-to-Site VPN connection will be established.

---

## Point-to-Site Connection

A Point-to-Site connection is designed for individual devices to securely connect to an Azure VNet, creating a virtual experience that mimics being physically present within an Azure data center. This connection is ideal for remote workers, developers, and IT professionals requiring on-demand access to Azure resources.

### Overview of the Setup Process

1.  **Gateway Subnet and VPN Gateway:**  
    Like the Site-to-Site setup, a Point-to-Site connection requires an existing gateway subnet and Virtual Network Gateway.
2.  **Point-to-Site VPN Configuration:**  
    Within the Azure portal, configure the VPN client settings by specifying an address pool for VPN clients, choosing a tunnel type (such as IKEv2, OpenVPN, or SSTP), and selecting an authentication method. Supported authentication methods include Azure Certificate Authentication, RADIUS Authentication, and Azure Active Directory integration. If you opt for Azure Active Directory, provide the tenant ID, audience, and issuer details as outlined in the official documentation.
3.  **Download and Install the VPN Client:**  
    After finalizing the Point-to-Site configuration, download the VPN client package from the Azure portal. Windows users can opt for the "Azure VPN" app available in the Windows Store. Once installed, import the configuration details and connect to the Azure VNet securely.

The flowchart below outlines the key steps involved in establishing a Point-to-Site VPN connection:

![The image is a flowchart illustrating the steps for a Point-to-Site Connection, including Gateway Subnet, VPN Gateway, P2S Configuration, Download, and Connect.](https://kodekloud.com/kk-media/image/upload/v1752884643/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Site-to-Site-and-Point-to-Site/point-to-site-connection-flowchart.jpg)

### Demonstration in the Azure Portal

1.  **Access Point-to-Site Configuration:**  
    In the Virtual Network Gateway settings of the Azure portal, navigate to the "Point-to-Site configuration" tab (instead of "Connections"). Click on "Configure now" to begin setting up the connection.
2.  **Set Up VPN Client Settings:**  
    Enter the necessary details, such as the address pool for connected clients, preferred tunnel type, and selected authentication method. After saving these settings, download the VPN client configuration.
3.  **Connect to Azure:**  
    Install and launch the VPN client on your device. Use the provided settings to establish a secure connection to your Azure Virtual Network. Once connected, you can access Azure virtual machines and other resources as if they were part of your local network.

> [!important]
> **Note**
>
> For enhanced security, ensure that the configurations on your on-premises VPN device precisely match the settings in the Azure portal.

---

## Gateway Transit

Both Site-to-Site and Point-to-Site VPN connections leverage Gateway Transit. This feature allows on-premises networks and remote clients to extend the secure connection established by the Azure VPN Gateway. Implementing Gateway Transit ensures that all connected devices benefit from robust, secure connectivity.

Happy networking!

For further reading on Azure VPN solutions, consider reviewing the [Azure VPN Gateway documentation](https://learn.microsoft.com/en-us/azure/vpn-gateway/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/f7470a91-91f6-4c6c-8a03-565abfeb7aee/lesson/e60f2c26-54e6-4fb1-b01d-0004a230d439)**
>
> Watch video content
