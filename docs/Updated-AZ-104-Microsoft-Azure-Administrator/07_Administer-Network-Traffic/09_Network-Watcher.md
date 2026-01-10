# Network Watcher - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Network-Traffic/Network-Watcher)

---

## Table of Contents

- Network Watcher
  - Exploring Network Watcher in the Azure Portal
  - Watch Video
    - IP Flow Verify
    - NSG Diagnostics
    - Next Hop
    - Effective Security Rules
    - VPN Troubleshoot
    - Packet Capture
    - Connection Troubleshoot
    - Topology

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Network Traffic

# Network Watcher

Azure Network Watcher is a robust suite of diagnostic and monitoring tools designed to help you gain deep insights into your Azure network infrastructure's performance, health, and security.

![The image shows a list of network diagnostic tools, monitoring options, and logs under the title "Network Watcher." It includes tools like IP flow verify, NSG diagnostic, and monitoring options like Topology and Network Performance Monitor.](https://kodekloud.com/kk-media/image/upload/v1752884707/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Watcher/network-watcher-diagnostic-tools.jpg)

Below, you will find a detailed overview of several key network diagnostic tools that are essential for both troubleshooting and exam preparation:

1.  **IP Flow Verify**

    IP Flow Verify determines if a packet is allowed or denied based on the current Network Security Group (NSG) rules. It is especially useful when you suspect that a particular port is being blocked. For example, you can simulate traffic to confirm whether the NSG is inadvertently preventing connectivity.

2.  **Next Hop**

    The Next Hop tool helps you trace the path a packet takes within your Azure Virtual Network. This is beneficial when troubleshooting routing issues. If you have configured a route table to forward traffic to a firewall but cannot see the traffic at the firewall, Next Hop can reveal whether the traffic is correctly directed.

3.  **VPN Diagnostics**

    VPN Diagnostics enables you to assess the health of your VPN Gateways and connections, ensuring that secure connectivity to your on-premises infrastructure is maintained. Diagnostic data is stored in a designated storage account, which can be reviewed later to troubleshoot connectivity problems.

4.  **NSG Flow Logs**

    NSG Flow Logs capture detailed information about ingress and egress IP traffic as it flows through your NSGs. These logs are crucial for auditing and analyzing network security policies. Once the logs are collected, they are stored in a storage account for further analysis.

5.  **Connection Troubleshoot**

    Connection Troubleshoot provides insights into the connectivity between two endpoints. It displays information like travel time, intermediate hops, and any issues that may be blocking the connection, thus simplifying the troubleshooting process.

6.  **Topology**

    The Topology feature offers a visual map of the components within your Virtual Network. It displays the arrangement of resources such as virtual machines, subnets, and network interfaces, helping you understand the overall architectural layout of your solution.

> [!important]
> **Note**
>
> Each tool within Network Watcher plays a vital role in ensuring clear visibility into your network's operation and security. This guide will walk you through how each feature functions within the Azure Portal.

---

## Exploring Network Watcher in the Azure Portal

To get started, log into the [Azure Portal](https://portal.azure.com/) and search for "Network Watcher." Once you access the service, you'll see a list of available tools to diagnose and monitor your network.

### IP Flow Verify

To diagnose traffic connectivity issues for a virtual machine:

1.  Navigate to IP Flow Verify.
2.  Select a virtual machine (e.g., the Gembox VM) and choose its network interface.
3.  Set the protocol to TCP and the direction to inbound.
4.  Specify the local IP address and port (for example, local port 3389) and then provide the remote IP address along with its corresponding port (e.g., 3389).

![The image shows the "Network Watcher | IP flow verify" page in the Microsoft Azure portal, where users can specify network diagnostic settings for a virtual machine.](https://kodekloud.com/kk-media/image/upload/v1752884709/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Watcher/network-watcher-ip-flow-verify.jpg)

This tool checks if traffic from the specified remote IP and port can reach the target machine. For instance, if using a Linux VM configured with a "deny all inbound" rule, port 3389 may be blocked. In such cases, testing port 22 (a common SSH port) might show successful connectivity.

### NSG Diagnostics

NSG Diagnostics collects logs from your NSGs and sends them to a storage account for further analysis. These logs help you review traffic patterns and evaluate the impact of your security rules.

### Next Hop

The Next Hop tool determines the subsequent route for network packets. For instance, if two virtual machines within the same Virtual Network are involved, the expected next hop is typically "vnet local." The test will indicate if the system’s default route or a user-defined route (UDR) is in effect. If an external internet destination is involved or a virtual appliance with a UDR is used, the tool will display "internet" or "virtual appliance" along with the corresponding IP address and details.

![The image shows the "Network Watcher | Next hop" page in Microsoft Azure, where a user is configuring network diagnostic tools by specifying a target virtual machine and destination IP address.](https://kodekloud.com/kk-media/image/upload/v1752884710/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Watcher/network-watcher-next-hop-azure.jpg)

### Effective Security Rules

This feature aggregates and displays all effective NSG rules when multiple NSGs are applied (such as at both the subnet and network interface levels). It consolidates these rules, allowing you to easily understand the overall security posture impacting your resources.

### VPN Troubleshoot

VPN Troubleshoot allows you to diagnose issues with your VPN Gateway and its connections. By selecting an appropriate storage account, you can capture diagnostic metrics like bandwidth and throughput, which help identify potential issues such as packet drops.

![The image shows the Microsoft Azure portal, specifically the Network Watcher VPN troubleshoot page, where users can diagnose the health of virtual network gateways or connections. It includes options to select a subscription, resource group, and location, with a section for selecting a storage account.](https://kodekloud.com/kk-media/image/upload/v1752884711/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Watcher/azure-portal-network-watcher-vpn-troubleshoot.jpg)

### Packet Capture

Packet Capture eliminates the need to install separate tools like Wireshark or TCPdump on your virtual machine. Instead, you can initiate a packet capture session directly from the Azure Portal by:

- Selecting the target virtual machine.
- Specifying the storage account for saving the capture file.
- Applying filters, such as capturing traffic on a specific port (e.g., port 53).

After capturing the network traffic, you can download the .pcap file and analyze it using Wireshark.

![The image shows the Microsoft Azure portal with the "Network Watcher | Packet capture" interface open, displaying options for configuring a packet capture session.](https://kodekloud.com/kk-media/image/upload/v1752884713/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Watcher/azure-portal-network-watcher-packet-capture.jpg)

### Connection Troubleshoot

Connection Troubleshoot helps verify connectivity between two endpoints. For example, to test connectivity between the Gembox VM and another virtual machine (e.g., a blue VM):

1.  Choose IPv4.
2.  Select the desired protocol (such as TCP) and specify the destination port (e.g., 22).
3.  Run the diagnostic test to collect data on next hop details, round trip times, effective NSG rules, and port accessibility.

![The image shows the Microsoft Azure Network Watcher interface, specifically the "Connection Troubleshoot" section, where a user is configuring settings for diagnosing network connectivity issues between virtual machines.](https://kodekloud.com/kk-media/image/upload/v1752884714/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Watcher/azure-network-watcher-connection-troubleshoot.jpg)

The detailed results will include insights into connectivity status, NSG rules (both inbound and outbound), next hop information, and overall network performance.

### Topology

The Topology tool provides a visual layout of your Virtual Network. By selecting a particular virtual network, you can view its topology, which includes resources such as virtual machines, network interfaces, and subnets. For example, you might see a diagram displaying components such as a gateway NSG, blue subnet, and red subnet. Expanding a subnet (like the blue subnet) allows you to view the underlying resources, including each virtual machine and its associated network interface.

![The image shows the Microsoft Azure Network Watcher interface displaying a network topology with two nodes, "blue-01" and "jumpbox-vm," both showing successful status. A pop-up message indicates unsaved edits will be discarded.](https://kodekloud.com/kk-media/image/upload/v1752884715/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Watcher/azure-network-watcher-topology.jpg)

Expanding further:

![The image shows the Microsoft Azure Network Watcher interface displaying a network topology diagram. It includes various nodes and connections representing virtual networks and resources.](https://kodekloud.com/kk-media/image/upload/v1752884716/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Watcher/azure-network-watcher-topology-diagram.jpg)

This visual representation provides a clear understanding of how virtual machines, multiple NICs, and their IP configurations are interconnected.

---

That concludes our in-depth overview of Azure Network Watcher. With these powerful tools at your disposal, managing and troubleshooting your Azure network has never been easier.

> [!important]
> **Next Steps**
>
> In the next section, we will dive into best practices for administering Azure Storage. Stay tuned to expand your Azure knowledge!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/50248c52-4b17-4c2d-87f8-52a42eff2d2f/lesson/1e4f0186-2a9f-4d86-af45-e86419735858)**
>
> Watch video content
