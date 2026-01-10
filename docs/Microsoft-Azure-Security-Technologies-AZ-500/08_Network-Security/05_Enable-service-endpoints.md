# Enable service endpoints - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Network-Security/Enable-service-endpoints)

---

## Table of Contents

- Enable service endpoints
  - Scenario Overview
  - Configuring the Storage Account
  - Benefits of Azure Service Endpoints
  - Demonstration Using the Azure Portal
  - Setting Up the Storage Container and Uploading Files
  - Restricting Public Access and Enabling Service Endpoints
  - Transition to Private Link
  - Watch Video
    - Running the Infrastructure Script

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Network Security

# Enable service endpoints

In this lesson, we explore how to enable service endpoints in Azure and understand how they enhance security by extending your virtual network’s private address space to Azure service resources. Azure service endpoints allow you to securely connect your virtual network to Azure services such as Storage, SQL Database, and more without exposing your data to the public internet.

---

## Scenario Overview

Consider the following scenario:

- You have a virtual network (VNet) with a subnet hosting a virtual machine (VM).
- The VM has an IP address of 192.168.1.4.
- There is a storage account, named "KodeKloud storage account," which currently has public internet access enabled.
- The VM accesses the storage account using a URL like `<storage-account-name>.blob.core.windows.net` that resolves to a public IP address.

The goal is to restrict public access to the storage account while still allowing the VM to connect securely. This is achieved by:

1.  Blocking all public access through a firewall policy on the storage account.
2.  Allowing access only from the designated subnet in your virtual network via a service endpoint.

The network diagram below illustrates a setup where a VM in a virtual network accesses a storage account over a public IP. With a service endpoint enabled, even though DNS still resolves to a public IP, the source IP is that of the VM’s private IP.

![The image illustrates a network diagram showing a virtual machine within a virtual network connecting to a storage account via a public IP, with a focus on service endpoints.](https://kodekloud.com/kk-media/image/upload/v1752882120/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-service-endpoints/network-diagram-virtual-machine-storage.jpg)

---

## Configuring the Storage Account

Initially, you configure the storage account to block all public access by enforcing a firewall policy. Although this policy blocks internet access, you explicitly allow communication from the subnet where your VM resides. This means that the VM will be able to connect to the storage account over the service endpoint, using its private IP as the source. Even if the DNS resolves to a public IP address, the traffic remains on the Microsoft Azure backbone network.

To summarize:

- A VM is set up in your Azure virtual network.
- A storage account holding critical data is configured with a firewall that denies public access.
- A service endpoint is enabled on the subnet hosting the VM, thereby extending the VNet’s private IP address space to the storage account.
- Within the storage account’s network settings, you specify that only the selected subnet can access the storage, ensuring a secure connection via Azure’s backbone network.

This configuration not only enhances security but also optimizes the connection pathway by bypassing the public internet.

---

## Benefits of Azure Service Endpoints

Azure service endpoints offer several advantages:

1.  **Improved Security**  
    Service endpoints restrict access to Azure services (such as Storage or SQL Database) so that only your virtual network can connect to them instead of the entire internet.
2.  **Utilization of Microsoft’s Backbone Network**  
    By leveraging Microsoft’s global backbone network, service endpoints ensure that traffic between your VNet and Azure services bypasses the public internet for enhanced security and reliability.
3.  **Ease of Setup and Management**  
    Configuring service endpoints is straightforward using the Azure portal, simplifying network security management.
4.  **Wide Range of Supported Services**  
    Service endpoints extend support to many Azure services, including Azure Storage, Azure SQL Database, Synapse Analytics, PostgreSQL, Cognitive Services, Container Registry, App Services, and more.

![The image outlines the benefits of service endpoints, highlighting improved security for Azure services, leveraging Microsoft's backbone network, ease of setup and management, and supported services.](https://kodekloud.com/kk-media/image/upload/v1752882121/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-service-endpoints/service-endpoints-benefits-azure.jpg)

> [!important]
> **Note**
>
> Azure service endpoints secure your connections by ensuring that traffic remains on Microsoft’s private network infrastructure.

---

## Demonstration Using the Azure Portal

In this section, we implement the architecture using the Azure portal. For this demonstration, you will need a VM and a storage account. You can create these resources manually or by using the provided PowerShell script named `service-endpoints-prep-infra.ps1`.

### Running the Infrastructure Script

Open your PowerShell terminal and navigate to the directory containing the script:

```
PS C:\Users\RithinSkaria\Documents\kodekloud-az500\080-Network Security\> cd '.\080-Network Security\'
PS C:\Users\RithinSkaria\Documents\kodekloud-az500\080-Network Security\> ls

Directory: C:\Users\RithinSkaria\Documents\kodekloud-az500\080-Network Security

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a-----         9/29/2023  2:46 PM          2568 nsg-prep-infra.ps1
-a-----         9/29/2023  2:53 PM          1152 service-endpoints-prep-infra.ps1
PS C:\Users\RithinSkaria\Documents\kodekloud-az500\080-Network Security\> ./
```

Wait for the script to execute. Once complete, the storage account and virtual machine will be created as required. The resource group now contains all necessary components, as shown in the Azure portal below:

![The image shows a Microsoft Azure portal interface displaying a resource group named "rg-se-workload-20230929" with various resources listed, such as a storage account, virtual machine, and network components, all located in the East US region.](https://kodekloud.com/kk-media/image/upload/v1752882123/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-service-endpoints/azure-portal-resource-group-rg-se-workload.jpg)

---

## Setting Up the Storage Container and Uploading Files

1.  Navigate to the storage account in the Azure portal.
2.  Create a new container under the "Containers" section (for example, name it "demo").
3.  Upload files to the container. Initially, these files are accessible via the public internet, but they will later be protected by the service endpoint configuration.

After uploading a file, copy its URL and test it in a web browser. At this point, the file is accessible publicly.

Next, switch to the virtual machine (e.g., VM01) via SSH. In the Azure portal, locate VM01 in your resource group:

![The image shows the Microsoft Azure portal interface displaying details of a virtual machine named "vm-01," including its status, location, operating system, and network information.](https://kodekloud.com/kk-media/image/upload/v1752882124/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-service-endpoints/azure-portal-vm-01-details.jpg)

Log in to VM01 and download a file from the storage account using the `wget` command:

```
kodekloud@vm-01:~$ wget https://st906297541203029.blob.core.windows.net/demo/City3.png -O City3.jpg
--2023-09-29 12:07:39--  https://st906297541203029.blob.core.windows.net/demo/City3.png
Resolving st906297541203029.blob.core.windows.net (st906297541203029.blob.core.windows.net)... 52.239.169.4
Connecting to st906297541203029.blob.core.windows.net (st906297541203029.blob.core.windows.net)|52.239.169.4|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 4030282 (3.8M) [image/png]
Saving to: ‘City3.jpg’

City3.jpg
2023-09-29 12:07:39 (78.1 MB/s) - ‘City3.jpg’ saved [4030282/4030282]

kodekloud@vm-01:~$
```

This demonstrates that the file can be downloaded from the VM using the storage account’s URL.

---

## Restricting Public Access and Enabling Service Endpoints

Now, secure the storage account by modifying its networking settings:

1.  Go to the storage account’s **Networking** settings.
2.  Change the configuration from "All networks" to "Selected virtual networks and IP addresses."
3.  Add the existing virtual network (e.g., VNet01) and select the relevant subnet.

![The image shows a Microsoft Azure portal interface focused on networking settings for a storage account. It includes options for configuring virtual networks, firewalls, and exceptions.](https://kodekloud.com/kk-media/image/upload/v1752882125/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-service-endpoints/azure-portal-networking-settings.jpg)

After saving these changes, a service endpoint is automatically created. Consequently, attempting to access the file using a public IP via a browser results in an authorization failure, while the VM continues to access it seamlessly via the service endpoint.

To test this:

- Open an incognito browser window to confirm that accessing the file results in an authorization error.
- From within the VM, download the file again with a similar `wget` command:

```
kodekloud@vm-01:~$ wget https://st906297541203029.blob.core.windows.net/demo/City3.png -O City3-copy.jpg
--2023-09-29 12:13:50--  https://st906297541203029.blob.core.windows.net/demo/City3.png
Resolving st906297541203029.blob.core.windows.net (st906297541203029.blob.core.windows.net)... 52.239.169.4
Connecting to st906297541203029.blob.core.windows.net (st906297541203029.blob.core.windows.net)|52.239.169.4|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 4030282 (3.8M) [image/png]
Saving to: ‘City3-copy.jpg’

City3-copy.jpg      100%[======================================>]   3.84M  --.-KB/s    in 0.04s

2023-09-29 12:13:50 (91.1 MB/s) - ‘City3-copy.jpg’ saved [4030282/4030282]

kodekloud@vm-01:~$
```

Any attempt to directly access other files through the public endpoint will fail with an authorization error:

```
<Error>
  <Code>AuthorizationFailure</Code>
  <Message>This request is not authorized to perform this operation. RequestId:d7aa5c5d-801e-001d-3ace-f29ada000000 Time:2023-09-29T12:14:04.6652314Z</Message>
</Error>
```

To further verify connectivity, try downloading another file (ensuring the correct file extension is used):

```
kodekloud@vm-01:~$ wget https://st9062975412030299.blob.core.windows.net/demo/City2.jpg -O City2.jpg
--2023-09-29 12:19:07--  https://st9062975412030299.blob.core.windows.net/demo/City2.jpg
Resolving st9062975412030299.blob.core.windows.net (st9062975412030299.blob.core.windows.net)... 52.239.169.4
Connecting to st9062975412030299.blob.core.windows.net (st9062975412030299.blob.core.windows.net)|52.239.169.4|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 105108 (103K) [image/jpeg]
Saving to: ‘City2.jpg’

City2.jpg          100%[==================>] 102.64K --.-KB/s    in 0.01s

2023-09-29 12:19:07 (9.51 MB/s) - ‘City2.jpg’ saved [105108/105108]

kodekloud@vm-01:~$
```

This confirms that even though the endpoint resolved publicly, the VM accesses the file via its private IP on Azure’s backbone network.

> [!important]
> **Warning**
>
> After changing the network settings on your storage account, public access will be denied. Ensure that all necessary service endpoints are configured correctly to avoid access issues.

---

## Transition to Private Link

While service endpoints secure access by directing traffic through Azure’s backbone network, private links provide an additional layer of security by mapping the service directly into your virtual network with a private IP. This eliminates exposure to public endpoints altogether.

Test private link connectivity with a similar command:

```
kodekloud@vm-01:~$ wget https://st90629754120230929.blob.core.windows.net/demo/City2.jpg -O City2.jpg
--2023-09-29 12:19:07--  https://st90629754120230929.blob.core.windows.net/demo/City2.jpg
Resolving st90629754120230929.blob.core.windows.net (st90629754120230929.blob.core.windows.net)... 52.239.169.4
Connecting to st90629754120230929.blob.core.windows.net (st90629754120230929.blob.core.windows.net)|52.239.169.4|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 105108 (103K) [image/jpeg]
Saving to: ‘City2.jpg’

City2.jpg          100%[==================================>] 102.64K  --.-KB/s    in 0.01s

2023-09-29 12:19:07 (9.51 MB/s) - ‘City2.jpg’ saved [105108/105108]

kodekloud@vm-01:~$
```

With both service endpoints and private links, your traffic remains on the secure Azure backbone network, ensuring optimal performance and enhanced security.

---

In this lesson, you learned how to configure Azure service endpoints to secure your Storage Account while allowing controlled access from your virtual network. The demonstration covered firewall configuration, network settings via the Azure portal, and connectivity testing via a virtual machine. We also briefly introduced private links as an alternative that further secures your connection by removing public endpoint exposure.

Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/0489a935-a4dd-41c6-b5d3-6054c570299b/lesson/6c9e7e48-a370-4b6f-88bd-89245052da61)**
>
> Watch video content
