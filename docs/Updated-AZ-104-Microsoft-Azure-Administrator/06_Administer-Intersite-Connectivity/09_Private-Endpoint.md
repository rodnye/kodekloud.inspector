# Private Endpoint - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Intersite-Connectivity/Private-Endpoint)

---

## Table of Contents

- Private Endpoint
  - Benefits of Azure Private Endpoint
  - Configuring a Private Endpoint in the Azure Portal
  - Testing Private Endpoint Connectivity
  - Summary
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Intersite Connectivity

# Private Endpoint

In this article, we explore the concept of a private endpoint for an Azure Storage account. Unlike service endpoints—which allow access to Azure services over the Azure backbone network while still using public endpoints—Azure Private Link uses private endpoints to provide direct, secure connectivity using an IP address from your Virtual Network (VNet).

When using service endpoints, the source IP (for instance, that of your Virtual Machine or VM) remains unchanged, but the connection still terminates at a public endpoint. Although the traffic remains within the Azure backbone, this setup may not meet strict security requirements for a fully private network. Service endpoints are limited to Azure VNets; they do not extend to on-premises networks. When you add your on-premises IP to the storage firewall, traffic traverses the public internet, which often does not satisfy high-security standards.

Azure Private Link resolves these limitations. By creating a private endpoint for your storage account, the service appears within your VNet. In effect, the storage service receives a network interface from your VNet's address space, resulting in a connection established through a private IP address. You can deploy the private endpoint in the same VNet as your VM or in another VNet connected through peering, making the storage account accessible as a local resource rather than a public one.

## Benefits of Azure Private Endpoint

- **Private Connection to Azure Services:** Each supported PaaS solution receives a private IP address from your VNet.
- **Seamless Integration for On-Premises and Inter-VNet Connectivity:** On-premises networks can resolve service names to private IP addresses using VPN or ExpressRoute connections, thereby avoiding public internet routing.
- **Enhanced Data Exfiltration Protection:** Keeping traffic within a private network mitigates the chance of unauthorized data exposure.
- **Direct Access within Azure VNets:** Services become directly available via private IP addresses without the need for additional network configurations.

> [!important]
> **Note**
>
> Disabling public network access will render any previously configured service endpoints non-functional. Attempting to access the storage account via a VM without the proper configuration will result in an "Authorization Failure" error.

In the next sections, we will configure a private endpoint for your storage account using the Azure portal, integrate DNS settings, test connectivity, and verify that your configuration is working as expected.

## Configuring a Private Endpoint in the Azure Portal

To configure a private endpoint for your storage account, follow these steps:

1.  In the Azure portal, navigate to the **Private Endpoint** section.
2.  Create a new private endpoint by entering a name (for example, "PE Storage"). This action automatically creates a network interface linking the private endpoint to your storage account.
3.  Under resource selection, choose **Storage** and opt for the Blob endpoint if you store files in Blob storage.
4.  Select the appropriate Virtual Network and subnet. To simplify, you can choose the same subnet where your VM resides; however, the private endpoint can reside in a different subnet or even in a VNet that is connected via peering.

The image below illustrates the private endpoint creation page in the Azure portal:

![The image shows a Microsoft Azure portal page for creating a private endpoint, with fields for project and instance details such as subscription, resource group, name, and region.](https://kodekloud.com/kk-media/image/upload/v1752884621/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-Endpoint/azure-portal-private-endpoint-creation.jpg)

Next, configure the Virtual Network settings:

![The image shows a Microsoft Azure portal interface for creating a private endpoint, specifically on the "Virtual Network" configuration step. It includes options for selecting a virtual network, subnet, and configuring private IP settings.](https://kodekloud.com/kk-media/image/upload/v1752884623/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-Endpoint/azure-portal-private-endpoint-configuration.jpg)

After configuring the private endpoint, Azure automatically creates a private DNS zone to enable name resolution for the storage account. The DNS zone is formatted as "privatelink.blob.core.windows.net" and holds an A record mapping the storage account’s name to its private IP address. For Azure VMs using the Azure-provided DNS, the integration is automatic. However, for on-premises hosts, you must configure a conditional forwarder from your on-premises DNS to an Azure DNS resolver or a private resolver.

Review the DNS integration settings on the portal:

![The image shows a Microsoft Azure portal interface for creating a private endpoint, specifically focusing on DNS integration settings. It includes options for configuring a private DNS zone and selecting a resource group.](https://kodekloud.com/kk-media/image/upload/v1752884624/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-Endpoint/azure-portal-private-endpoint-dns-settings.jpg)

Once all settings are applied, wait for the private endpoint deployment to complete. The image below indicates the deployment progress:

![The image shows a Microsoft Azure portal page for creating a private endpoint, with details about the subscription, resource group, and virtual network. A notification indicates that a template deployment is being initialized.](https://kodekloud.com/kk-media/image/upload/v1752884625/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-Endpoint/azure-portal-private-endpoint-creation-2.jpg)

After creation, the Azure portal displays the following details:

- The private endpoint (sometimes abbreviated as "pe") along with an associated private link resource.
- DNS configurations mapping the storage account name to its private IP address.

The dashboard summarizes these details:

![The image shows a Microsoft Azure portal page displaying details of a private endpoint named "pe-st," including its resource group, location, subscription ID, and connection status. The provisioning state is marked as "Succeeded," and the connection status is "Approved."](https://kodekloud.com/kk-media/image/upload/v1752884627/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-Endpoint/azure-portal-private-endpoint-details.jpg)

Additionally, you can review the private DNS zone configuration:

![The image shows a Microsoft Azure portal page displaying details of a private DNS zone configuration for "privatelink.blob.core.windows.net," including resource group and subscription information.](https://kodekloud.com/kk-media/image/upload/v1752884628/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-Endpoint/azure-private-dns-zone-configuration.jpg)

Verify that your Virtual Network (e.g., vnet01) is properly linked:

![The image shows a Microsoft Azure portal page displaying virtual network links for a private DNS zone. It lists a completed link with the virtual network "vnet-01" and auto-registration disabled.](https://kodekloud.com/kk-media/image/upload/v1752884630/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-Endpoint/azure-portal-private-dns-vnet-links.jpg)

## Testing Private Endpoint Connectivity

After deploying the private endpoint, you must verify that the storage account resolves to a private IP address. On your VM, use the following command to inspect DNS resolution:

```
kodekloud@vm-01:~$ dig st90629754120320929.blob.core.windows.net
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 52399
;; flags: qr raa; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1


;; QUESTION SECTION:
;st90629754120320929.blob.core.windows.net. IN A


;; ANSWER SECTION:
st90629754120320929.blob.core.windows.net. 60 IN CNAME st90629754120320929.privatelink.blob.core.windows.net.
st90629754120320929.privatelink.blob.core.windows.net. 10 IN A 192.168.1.5


Query time: 8 msec
SERVER: 127.0.0.53#53(127.0.0.53) (UDP)
When: Fri Sep 29 12:40:23 UTC 2023
MSG SIZE  rcvd: 132
```

Next, test file access using curl. An attempt to access the storage account without proper authorization will yield an error:

```
kodekloud@vm-01:~$ curl https://st90629754120320929.blob.core.windows.net/demo/City3.png
<?xml version="1.0" encoding="utf-8"?>
<Error>
  <Code>AuthorizationFailure</Code>
  <Message>This request is not authorized to perform this operation.</Message>
</Error>
```

Once you have the correct authorization or you are simply testing connectivity via a file download, redirect the output to a file:

```
kodekloud@vm-01:~$ curl https://st90629754120320929.blob.core.windows.net/demo/City3.png > City4.png
```

Finally, list the directory contents to confirm the file has been downloaded:

```
kodekloud@vm-01:~$ ls
City1.jpg  City2.jpg  City3-copy.jpg  City3.jpg  City4.png
```

This confirms that the storage account now resolves via the private endpoint using the private DNS zone, with the resolution pointing to 192.168.1.5.

## Summary

Azure Private Endpoints offer a secure method for accessing storage accounts and other Azure services over a private connection using an IP from your Virtual Network. The seamless integration with Azure Private DNS Zones allows service names to resolve accurately to private IP addresses, simplifying connectivity for both Azure VMs and on-premises systems (when DNS forwarders are configured). This configuration improves your security posture by eliminating exposure to the public internet and reducing the risk of data exfiltration.

> [!important]
> **Next Steps**
>
> In the next module, we will explore techniques for managing and administering network traffic within your Azure environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/f7470a91-91f6-4c6c-8a03-565abfeb7aee/lesson/052b4988-4be8-4f66-8979-d5c22fb02036)**
>
> Watch video content
