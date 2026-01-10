# Deploy private links - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Network-Security/Deploy-private-links)

---

## Table of Contents

- Deploy private links
  - Understanding Connectivity Options
  - Scenario Overview
  - Setting Up a Private Link
  - Verifying DNS Resolution and Connectivity
  - Conclusion
  - Watch Video
    - Disabling Public Access

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Network Security

# Deploy private links

In this lesson, we will deploy private links in Azure. Previously, we discussed service endpoints and examined how they allow access to Azure services over the backbone network. Now, we will explore an alternative connectivity option—Azure Private Link—that offers secure, private access.

![The image illustrates a network diagram showing a virtual machine within a workload subnet connected to an Azure Storage Service via a service endpoint.](https://kodekloud.com/kk-media/image/upload/v1752882110/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-private-links/network-diagram-virtual-machine-azure-storage.jpg)

## Understanding Connectivity Options

When evaluating Azure connectivity, two prominent features come into play:

- **Azure Service Endpoints:** These allow your virtual network to securely access Azure services over the backbone network. However, with service endpoints, the connection targets the public endpoint of the storage account while retaining your VM’s private IP. This means that the service remains publicly exposed, which might not meet strict security requirements.
- **Azure Private Link:** By creating a private endpoint for a storage account, the service appears as if it is part of your virtual network. A network interface is created with a private IP address from the VNet address space, enabling secure connectivity from your VM even when the endpoint is deployed in a different VNet (given proper peering).

Using Private Link offers several key benefits:

- Data traffic between your resources and Azure services remains within the private network.
- Azure services are accessed using a private IP, effectively making them part of your own network.
- It supports connectivity between VNets in different regions and provides on-premises access via a private IP.

> [!important]
> **Security Note**
>
> If your environment requires private IP provisioning within your VNet and strict traffic isolation, Azure Private Link is the recommended solution over service endpoints.

## Scenario Overview

Imagine you have previously configured a VM and a storage account with a service endpoint. With the service endpoint, the VM accesses the storage account via its public endpoint, and the traffic, though secured over the backbone network, is not entirely private.

To achieve complete privacy, you will disable public network access for the storage account and set up a private connection using a Private Link.

![The image is a graphic titled "Private Link" highlighting benefits such as Azure services via private connection, seamless integration, risk elimination, and direct availability.](https://kodekloud.com/kk-media/image/upload/v1752882111/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-private-links/private-link-azure-benefits-graphic.jpg)

### Disabling Public Access

In the Azure portal, you previously set up a service endpoint. Now, disable public network access for your storage account. With public access turned off, the VM will no longer be able to reach the storage account via the service endpoint.

![The image shows a Microsoft Azure portal interface focused on the networking settings of a storage account. It displays options for configuring firewalls, virtual networks, and network routing preferences.](https://kodekloud.com/kk-media/image/upload/v1752882112/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-private-links/azure-portal-networking-settings.jpg)

When you try to access an image stored in the storage account from the VM, it will result in an authorization failure:

```
kodekloud@vm-01:~$
```

```
kodekloud@vm-01:~$ curl https://st90629754120230929.blob.core.windows.net/demo/City3.png
<?xml version="1.0" encoding="utf-8"?>
<Error>
  <Code>AuthorizationFailure</Code>
  <Message>The request is not authorized to perform this operation.</Message>
  <RequestId>19641fa9-a01e-0078-19d0-f2349e000000</RequestId>
  <Time>2023-09-29T12:30:57.198727Z</Time>
</Error>
kodekloud@vm-01:~$
```

This confirms that with public access disabled, the VM cannot access the storage account via the public endpoint.

## Setting Up a Private Link

Next, we will create a private connection by configuring a private endpoint:

1.  **Navigate to the Private Endpoint Section:**  
    In the Azure portal, go to the private endpoint connection area.

    ![The image shows a Microsoft Azure portal interface focused on the networking settings of a storage account. It displays options for configuring public network access and network routing preferences.](https://kodekloud.com/kk-media/image/upload/v1752882114/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-private-links/azure-portal-network-settings-storage.jpg)

2.  **Create a New Private Endpoint:**  
    Provide a name (e.g., "PE storage") and select the blob endpoint on your storage account. For the virtual network, choose the one where your VM resides. The private endpoint can be deployed in the same subnet or a different one—as long as the VNets are peered.

    ![The image shows a Microsoft Azure interface for creating a private endpoint, with options to select a virtual network and subnet, configure a private IP, and set an application security group.](https://kodekloud.com/kk-media/image/upload/v1752882115/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-private-links/azure-private-endpoint-configuration.jpg)

3.  **DNS Integration:**  
    After creating the private endpoint, an automatic private DNS zone (typically named private-link.blob.core.windows.net) is provisioned. This zone includes an A record mapping the storage account's name to its private IP address.  
    Ensure that any virtual networks requiring DNS resolution are linked with this private DNS zone. For VMs that use Azure-provided DNS, this setup is seamless. For on-premises environments, you may need to configure a DNS conditional forwarder.

    ![The image shows a Microsoft Azure portal interface for creating a private endpoint, specifically focusing on the DNS integration step. It includes options for configuring a private DNS zone and selecting a subscription and resource group.](https://kodekloud.com/kk-media/image/upload/v1752882116/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-private-links/azure-portal-private-endpoint-dns.jpg)

4.  **Review Private Endpoint Details:**  
    Once deployment completes, verify the private endpoint details in the Azure portal, which include subscription, resource group, and virtual network information.

    ![The image shows a Microsoft Azure portal interface for creating a private endpoint, displaying details such as subscription, resource group, and virtual network information. The "Review + create" step is highlighted, indicating the final review before creation.](https://kodekloud.com/kk-media/image/upload/v1752882116/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-private-links/azure-portal-private-endpoint-creation.jpg)

5.  **Confirm Private DNS Records:**  
    Upon checking the DNS zone associated with the private endpoint, you will see that it includes the DNS record for your storage account.

    ![The image shows a Microsoft Azure portal interface displaying details of a private endpoint, including resource group, location, subscription ID, and connection status.](https://kodekloud.com/kk-media/image/upload/v1752882117/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-private-links/azure-portal-private-endpoint-details.jpg)

    ![The image shows a Microsoft Azure portal interface displaying DNS configuration details for a private DNS zone, including resource group, subscription information, and DNS records.](https://kodekloud.com/kk-media/image/upload/v1752882119/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-private-links/azure-portal-dns-configuration.jpg)

## Verifying DNS Resolution and Connectivity

Return to your VM to validate the new DNS resolution. Use the following `dig` command to confirm that the domain resolves to a private IP address and includes a CNAME record pointing to privatelink.blob.core.windows.net:

```
kodekLoud@vm-01:~$ dig st90629754120230929.blob.core.windows.net
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 52399
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; id: 65494
;; QUESTION SECTION:
;st90629754120230929.blob.core.windows.net. IN A

;; ANSWER SECTION:
st90629754120230929.blob.core.windows.net. 60 IN CNAME st90629754120230929.privatelink.blob.core.windows.net.
st90629754120230929.privatelink.blob.core.windows.net. 10 IN A 192.168.1.5

;; Query time: 8 msec
;; SERVER: 127.0.0.53#53(127.0.0.53)
;; WHEN: Fri Sep 29 12:40:13 UTC 2023
;; MSG SIZE rcvd: 132
kodekLoud@vm-01:~$
```

Finally, verify connectivity by accessing the file again:

```
kodekLoud@vm-01:~$ curl https://st90629754120230929.blob.core.windows.net/demo/City3.png
Warning: Binary output can mess up your terminal. Use "--output -" to tell
Warning: curl to save to file instead.
```

Then download the file:

```
kodekLoud@vm-01:~$ curl https://st90629754120230929.blob.core.windows.net/demo/City3.png > City4.png
100 3935k 100 3935k 0 0 12.9M 0 --:--:-- --:--:-- --:--:-- 13.0M
```

List the files to confirm the download:

```
kodekLoud@vm-01:~$ ls
City1.jpg  City2.jpg  City3-copy.jpg  City3.jpg  City4.png
```

This confirms that the storage account is now accessible over a private IP address. If the DNS resolution does not return a private IP, double-check your DNS configuration, including virtual network links, forwarders, or DNS records.

> [!important]
> **Additional Resources**
>
> For more details on private DNS zones and extensive network troubleshooting, refer to the [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) course.

## Conclusion

In this lesson, you learned how to deploy Azure Private Link to secure your storage account with a private endpoint and ensure that traffic remains strictly within your private network. This approach eliminates public exposure risks and integrates Azure services seamlessly into your virtual network.

Next, we will move on to implementing load balancing in Azure.

Happy networking!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/0489a935-a4dd-41c6-b5d3-6054c570299b/lesson/38aae97e-09c6-4766-bb5a-05f53167e1b2)**
>
> Watch video content
