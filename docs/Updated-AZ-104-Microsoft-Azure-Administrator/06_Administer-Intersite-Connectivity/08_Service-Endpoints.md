# Service Endpoints - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Intersite-Connectivity/Service-Endpoints)

---

## Table of Contents

- Service Endpoints
  - Implementing the Architecture in the Azure Portal
  - Accessing Storage from the VM
  - Private Link Comparison
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Intersite Connectivity

# Service Endpoints

Azure Service Endpoints enhance security by extending your virtual network's private address space to Azure resources. This guide explores how service endpoints work and provides a step-by-step implementation using the Azure portal.

Imagine you have a virtual network with a subnet containing a virtual machine (VM) with the IP address 192.168.1.4. Additionally, suppose you have a storage account (named “KodeKloud storage account”) with public internet access enabled. In the default configuration, the VM accesses the storage account using its public IP—for example, the Blob service endpoint is accessible via a URL formatted as:

KodeKloudStorageAccountName.blob.core.windows.net

This name resolves to a public IP, meaning the storage account is accessible over the internet.

If you need to restrict public access to the storage account, you can enforce a firewall policy that blocks all public traffic. However, the virtual machine still requires access to the storage account. This is where service endpoints come into play. By configuring a service endpoint on the storage account, you can limit connections solely from your workload subnet. Even though the storage account continues to resolve to a public IP, the connectivity between the VM and storage account occurs using the VM's private IP via Azure's secure backbone network.

To summarize the initial setup:

- A VM exists inside your Azure virtual network.
- A storage account holds critical data.
- Service endpoints for the Storage Accounts service are enabled on the VM’s subnet.

This configuration extends your VNet's private IP address space to the storage account. In the storage account settings, you configure network rules to accept connections only from the designated subnet by selecting the option to allow access from selected networks. Consequently, the VM securely connects to the storage account via a service endpoint, ensuring that the traffic remains on the Microsoft Azure backbone—enhancing both security and performance.

![The image illustrates a network diagram showing a virtual machine within a virtual network using a service endpoint to connect to an Azure storage account, with internet access blocked.](https://kodekloud.com/kk-media/image/upload/v1752884631/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Service-Endpoints/network-diagram-virtual-machine-azure.jpg)

Below are some key benefits of using Azure service endpoints:

1.  Enhanced Security for Azure Services  
    Service endpoints strictly regulate access to critical Azure resources, such as Azure Storage or Azure SQL Database.
2.  Leveraging the Microsoft Backbone Network  
    Traffic is routed over Microsoft’s secure backbone network, bypassing the public internet and resulting in a more reliable and faster connection.
3.  Simple Setup and Management  
    Configuring service endpoints via the Azure portal is straightforward, reducing operational overhead.
4.  Wide Range of Supported Services  
    Service endpoints support many Azure services, including Azure Storage, Azure SQL Database, Synapse Analytics, PostgreSQL, Cognitive Services, Container Registry, App Services, and more.

![The image is an infographic titled "Service Endpoints" highlighting benefits such as better security for Azure services, leveraging Microsoft's backbone network, ease of setup and management, and supported services.](https://kodekloud.com/kk-media/image/upload/v1752884633/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Service-Endpoints/service-endpoints-infographic-azure.jpg)

> [!important]
> **Note**
>
> Even though the storage account retains a public endpoint, the service endpoint ensures that the traffic between your VM and the storage account stays private within the Azure backbone network.

In conclusion, Azure Service Endpoints provide a robust mechanism for securing access to Azure services. By restricting public internet access and allowing traffic only from specific virtual networks, you ensure secure and efficient connectivity.

---

## Implementing the Architecture in the Azure Portal

In this section, we will implement the architecture using the Azure portal. The demonstration involves deploying a virtual machine and a storage account. A deployment script, "service-endpoints-prep-infra," is available to provision these resources.

The following PowerShell snippet shows the creation of the infrastructure:

```
PS C:\Users\RithinSkaria\Documents\kodekloud-az104\060-Administer Intersite Connectivity>> ls


Directory: C:\Users\RithinSkaria\Documents\kodekloud-az104\060-Administer Intersite Connectivity


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----         12/8/2023   12:37 PM          1436 peering-pref-infra.ps1
-a----         12/8/2023   2:43 PM           1246 service-endpoints-prep-infra.ps1


PS C:\Users\RithinSkaria\Documents\kodekloud-az104\060-Administer Intersite Connectivity>> .\service-endpoints-prep-infra.ps1


Creating VM
workload-a-vm - FQDN : vm-01-abfb51.eastus.cloudapp.azure.com
Creating storage


StorageAccountName                   ResourceGroupName    PrimaryLocation      SkuName         Kind        AccessTier    CreationTime
--------------------                   -----------------    ---------------      -------         ----        ----------    -------------
st118683879520232108 rg-se-workload-20230929        eastus        Standard_LRS   StorageV2  Hot          12/8/2023 ...
```

After running the script, navigate to the storage account in the Azure portal. Create a new container (for example, name it “demo”) in the containers section to store your files.

![The image shows a Microsoft Azure portal interface displaying a storage account's container section, with one existing container named "logs" and a new container creation panel on the right.](https://kodekloud.com/kk-media/image/upload/v1752884635/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Service-Endpoints/azure-portal-storage-containers.jpg)

Once the container is created, upload your desired files. After selecting and browsing for files, confirm that the blobs are uploaded successfully.

![The image shows a Microsoft Azure portal interface for uploading blobs to a container named "demo," with several image files listed under current uploads.](https://kodekloud.com/kk-media/image/upload/v1752884636/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Service-Endpoints/azure-portal-upload-blobs-demo.jpg)

At this time, you can copy the URL of any uploaded file and paste it into a browser to verify that it is accessible over the public internet.

---

## Accessing Storage from the VM

Next, access the virtual machine (for instance, VM01 within the RGSE resource group) via SSH. After logging in, the terminal prompt will appear as follows:

```
kodekloud@vm-01:~$
```

From here, you can use wget to download a file from the storage account. For example:

```
kodekloud@vm-01:~$ wget https://st90629754120320929.blob.core.windows.net/demo/City3.png -O City3.jpg
--2023-09-29 12:07:39--  https://st90629754120320929.blob.core.windows.net/demo/City3.png
Resolving st90629754120320929.blob.core.windows.net (st90629754120320929.blob.core.windows.net)... 52.239.169.4
Connecting to st90629754120320929.blob.core.windows.net (st90629754120320929.blob.core.windows.net)|52.239.169.4|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 4030282 (3.8M) [image/png]
Saving to: ‘City3.jpg’


City3.jpg           100%[==============================================================>]   3.84M   78.1 MB/s    in 0.05s


2023-09-29 12:07:39 (78.1 MB/s) - ‘City3.jpg’ saved [4030282/4030282]
```

Later, to enhance security by restricting public access, modify the networking settings in the storage account. In the Networking section of the storage account, change the access option from “All networks” to “Selected virtual networks and IP addresses.” Then, add your existing virtual network (e.g., VNet01 and its default subnet where your VM is located). Once saved, a service endpoint is created. This configuration means that while accessing the file via a browser will now result in an authorization failure, the VM can still download the file over the service endpoint.

![The image shows a Microsoft Azure portal interface focused on the networking settings of a storage account, with options for configuring firewalls, virtual networks, and network routing preferences.](https://kodekloud.com/kk-media/image/upload/v1752884637/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Service-Endpoints/azure-portal-networking-settings.jpg)

After saving the network configuration, verify that the settings have been applied by checking the notifications.

![The image shows a Microsoft Azure portal interface focused on the networking settings of a storage account, with options for configuring firewalls and virtual networks. A notification indicates that firewall and virtual network settings have been successfully saved.](https://kodekloud.com/kk-media/image/upload/v1752884638/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Service-Endpoints/azure-portal-networking-settings-2.jpg)

Open an incognito window and try accessing the blob URL from your browser; you should see an authorization failure message similar to:

```
<Error>
  <Code>AuthorizationFailure</Code>
  <Message>This request is not authorized to perform this operation. RequestId:a79ecbc2-881e-001d-5ce0-f29dada000000 Time:2023-09-29T12:13:35.9352713Z</Message>
</Error>
```

Return to the VM and try downloading the file again using wget:

```
kodekloud@vm-01:~$ wget https://st906297541203029.blob.core.windows.net/demo/City3.png -O City3.jpg
--2023-09-29 12:07:39--  https://st906297541203029.blob.core.windows.net/demo/City3.png
Resolving st906297541203029.blob.core.windows.net (st906297541203029.blob.core.windows.net)... 52.239.169.4
Connecting to st906297541203029.blob.core.windows.net (st906297541203029.blob.core.windows.net)|52.239.169.4|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 403282 (3.8M) [image/png]
Saving to: ‘City3.jpg’


City3.jpg            100%[===================>]   3.84M  78.1 MB/s    in 0.05s


2023-09-29 12:07:39 (78.1 MB/s) - ‘City3.jpg’ saved [403282/403282]
```

This confirms that even though public access is restricted, the VM can securely download the file through the service endpoint. You can further experiment with different file URLs to verify connectivity or to intentionally trigger authorization failures on invalid requests.

For further validation, try downloading another file (e.g., City2.jpg):

```
kodekloud@vm-01:~$ wget https://st9062975412030299.blob.core.windows.net/demo/City2.jpg -O City2.jpg
--2023-09-29 12:19:07--  https://st9062975412030299.blob.core.windows.net/demo/City2.jpg
Resolving st9062975412030299.blob.core.windows.net (st9062975412030299.blob.core.windows.net)... 52.239.169.4
Connecting to st9062975412030299.blob.core.windows.net (st9062975412030299.blob.core.windows.net)|52.239.169.4|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 105108 (103K) [image/jpeg]
Saving to: ‘City2.jpg’


City2.jpg           100%[================================>] 102.64K  --.-KB/s    in 0.01s


2023-09-29 12:19:07 (9.51 MB/s) - ‘City2.jpg’ saved [105108/105108]
```

Even though the storage account uses a public endpoint, the traffic between your VM and the storage account flows securely over the Azure backbone network via the service endpoint.

---

## Private Link Comparison

Private Link provides secure connectivity similar to service endpoints but with different mechanisms for managing connectivity and access control. The example below demonstrates file download using Private Link:

```
kodekloud@vm-01:~$ wget https://st9062975412030929.blob.core.windows.net/demo/City2.jpg -O City2.jpg
--2023-09-29 12:19:07--  https://st9062975412030929.blob.core.windows.net/demo/City2.jpg
Resolving st9062975412030929.blob.core.windows.net (st9062975412030929.blob.core.windows.net)... 52.239.169.4
Connecting to st9062975412030929.blob.core.windows.net (st9062975412030929.blob.core.windows.net)|52.239.169.4|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 105108 (103K) [image/jpeg]
Saving to: ‘City2.jpg’


City2.jpg           100%[===================================>] 102.64K  --.-KB/s    in 0.01s


2023-09-29 12:19:07 (9.51 MB/s) - ‘City2.jpg’ saved [105108/105108]
```

While both Private Link and Service Endpoints provide secure connectivity from your virtual network to Azure service resources, they differ in configuration and management. Understanding these differences helps determine the best option based on your security and connectivity requirements.

> [!important]
> **Warning**
>
> Avoid exposing sensitive data to the public internet. Always validate your network configurations to ensure that only trusted sources have access to your critical resources.

---

This article demonstrated how to secure storage account access using Azure Service Endpoints by restricting public internet access and allowing traffic only from specified virtual networks. With this setup, your VM utilizes its private IP to access the storage account's public endpoint, ensuring that all communication remains on the secure Microsoft Azure backbone network.

For further reading, consider exploring [Azure Networking Documentation](https://docs.microsoft.com/azure/networking/) for additional best practices and advanced configurations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/f7470a91-91f6-4c6c-8a03-565abfeb7aee/lesson/5ced50ce-6893-4def-b4cb-bb978e039102)**
>
> Watch video content
