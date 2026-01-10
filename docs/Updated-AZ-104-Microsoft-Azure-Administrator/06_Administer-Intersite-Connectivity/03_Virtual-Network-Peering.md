# Virtual Network Peering - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Intersite-Connectivity/Virtual-Network-Peering)

---

## Table of Contents

- Virtual Network Peering
  - Overview of Virtual Network Peering
  - Key Benefits and Capabilities
  - Demonstration Setup
  - Configuring Virtual Network Peering
  - Conclusion
  - Watch Video
  - Practice Lab
    - Setting Up the Environment
    - Testing Connectivity Between Virtual Machines
    - Verifying the Peering Connection

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Intersite Connectivity

# Virtual Network Peering

Virtual Network Peering in Microsoft Azure enables seamless connectivity between separate virtual networks (VNets) as if they were part of a single, unified network. In this guide, you'll explore the concept, benefits, and configuration of Virtual Network Peering, along with a detailed demonstration setup.

## Overview of Virtual Network Peering

Virtual Network Peering simplifies the process of connecting resources across different VNets without the need for additional gateways, hubs, or public internet exposure. There are two primary types of peering:

- **Global VNet Peering:** Connects VNets across different Azure regions.
- **Regional VNet Peering:** Connects VNets within the same Azure region.

Both configurations offer secure, high-speed communication and reduce complexity when managing network architectures.

## Key Benefits and Capabilities

- **High-Speed Data Transfer:** Optimized for robust performance with low latency, ensuring seamless application communication.
- **Utilization of Microsoft Backbone Network:** When peered, data flows over Microsoft’s secure private backbone network instead of the public internet.
- **Seamless Connectivity:** Supports connectivity across VNets in different regions, subscriptions, and even Azure Active Directory tenants, facilitating scalable and resilient network architectures.

![The image is an infographic about Virtual Network Peering, highlighting types of peering, high-speed data transfer, use of Microsoft's backbone network, and connectivity across Azure virtual networks.](https://kodekloud.com/kk-media/image/upload/v1752884652/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Virtual-Network-Peering/virtual-network-peering-infographic.jpg)

> [!important]
> **Note**
>
> Ensure you have the necessary permissions and network configurations in place before starting the peering setup.

## Demonstration Setup

In this section, we will create an environment using a PowerShell script to test Virtual Network Peering. The provided repository includes a folder named "060-Administer Intersite Connectivity" containing the script `peering-pref-infra.ps1`.

### Setting Up the Environment

Begin by navigating to the correct directory in your terminal:

```
PS C:\Users\RithinSkaria\Documents> cd .\kodekloud-az104\
PS C:\Users\RithinSkaria\Documents\kodekloud-az104> cd '.\060-Administer Intersite Connectivity\'
PS C:\Users\RithinSkaria\Documents\kodekloud-az104\060-Administer Intersite Connectivity> ls


    Directory: C:\Users\RithinSkaria\Documents\kodekloud-az104\060-Administer Intersite Connectivity


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----        12/8/2023   12:03 PM          1959 peering-pref-infra.ps1
PS C:\Users\RithinSkaria\Documents\kodekloud-az104\060-Administer Intersite Connectivity>
```

Run the script to deploy two Linux virtual machines in separate virtual networks—one in East US and another in West US. After the deployment is complete, verify your Azure context using the command:

```
PS C:\Users\RithinSkaria\Documents\kodekloud-az104\060-Administer Intersite Connectivity> Get-AzContext


Name
----
Kodekloud Azure Admin - PoC 1 (2cd1a8... rithinska... Kodekloud... AzureCloud  1e0fa212...
PS C:\Users\RithinSkaria\Documents\kodekloud-az104\060-Administer Intersite Connectivity>
```

### Testing Connectivity Between Virtual Machines

After deployment, note the IP assignments:

- The East US VM is part of the East US VNet and is assigned the IP address 192.168.0.4.
- The West US VM is in a separate IP range, for instance, 192.168.1.4.

To test connectivity, establish an SSH connection to the East US VM:

```
PS C:\Users\RithinSkaria\Documents\kodekloud-az104\060-Administer Intersite Connectivity>> ssh kodekloud@172.191.37.104
```

Upon confirming the host's authenticity, the terminal will display the Ubuntu system information for the East US VM:

```
kodekloud@vm-eus:~$
```

Next, try to ping the West US VM from the East US VM:

```
kodekloud@vm-eus:~$ ping 192.168.1.4
PING 192.168.1.4 (192.168.1.4) 56(84) bytes of data.
```

At this point, the ping will fail because the two VNets have not yet been peered.

## Configuring Virtual Network Peering

To establish a peering connection:

1.  Open the Azure portal and navigate to the **Virtual Network** section of either the East US or West US VNet.
2.  Select the **Peerings** option.
3.  Follow these steps:
    - Click **Add peering**.
    - Enter a link name (e.g., "USWS link").
    - Configure the following settings:
      - Allow VNets to access the peered network: Yes.
      - Allow the VNET (West US) to receive forwarded traffic from the peered network: Yes.
      - Optionally enable Gateway Transit (this is not required for the demonstration).
    - For the remote virtual network, select the corresponding VNet (e.g., "WUS US link") and enable forwarded traffic.
    - Click **Add** to create the peering connection.

> [!important]
> **Note**
>
> Both VNets must be configured simultaneously for peering to work correctly. The settings ensure secure data flow between the networks.

![The image shows the Microsoft Azure portal interface, specifically the "Peerings" section for a virtual network named "vnet-wus," with a peering status of "Initiated" to "vnet-eus." Notifications indicate successful addition of virtual network peering.](https://kodekloud.com/kk-media/image/upload/v1752884653/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Virtual-Network-Peering/azure-portal-peerings-vnet-wus.jpg)

### Verifying the Peering Connection

After configuring peering, return to the SSH session on the East US VM. The previously unsuccessful ping to the West US VM should now succeed. Additionally, you can initiate an SSH connection between the two VMs using their internal IP addresses (e.g., connecting from 192.168.0.4 to 192.168.1.4).

By default, the Network Security Group (NSG) rule "Allow VNET inbound" permits traffic between peered VNets. There is no need to manually open additional ports unless custom traffic rules are required.

## Conclusion

This guide demonstrated the end-to-end process of setting up Virtual Network Peering in Azure, from deploying virtual machines in separate regions to configuring and verifying secure connectivity through peering.

Stay tuned for the next section, which will cover setting up a VPN Gateway for advanced connectivity scenarios.

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/f7470a91-91f6-4c6c-8a03-565abfeb7aee/lesson/ecfc5c37-65e2-497a-a222-57dafad279dc)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/f7470a91-91f6-4c6c-8a03-565abfeb7aee/lesson/628f77b7-26bd-4d3f-a13d-41811b13bc5a)**
>
> Practice lab
