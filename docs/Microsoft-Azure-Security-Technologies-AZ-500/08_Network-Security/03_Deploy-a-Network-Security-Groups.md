# Deploy a Network Security Groups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Network-Security/Deploy-a-Network-Security-Groups)

---

## Table of Contents

- Deploy a Network Security Groups
  - NSG Rule Evaluation and Traffic Flow
  - Hands-On Deployment via the Azure Portal
  - Configuring a Web Server on a VM
  - Service Tags and NSG Rule Overrides
  - Testing NSG Changes and Blocking Traffic
  - Applying a New NSG to Block SSH
  - Augmented Network Security Rules
  - Next Steps: Application Security Groups
  - Watch Video
    - Deploying the Infrastructure

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Network Security

# Deploy a Network Security Groups

This article provides a detailed guide on deploying and managing Network Security Groups (NSGs) in Azure. NSGs use prioritized rule evaluations, where lower numerical values indicate higher priority. Every NSG comes with a set of default rules that cannot be modified or deleted; however, you can override these by adding new rules with higher precedence.

NSG rules are built around several key attributes:

• **Service**  
 Allows specification of either custom or predefined services (e.g., HTTP, HTTPS, RDP, SSH) to open the necessary ports.

• **Port Range**  
 Enables configuration of individual ports or a range of ports for flexible traffic management.

• **Priority**  
 Ranging from 100 to 4096, lower numbers denote higher priority. For example, a rule with priority 100 processes before one with priority 200. (Default rules typically have priorities around 65,000.)

• **Action**  
 Specifies whether the rule will allow or deny traffic.

![The image is a graphic titled "Explore Network Security Groups (NSG)" featuring four colorful icons labeled Service, Priority, Port Range, and Action.](https://kodekloud.com/kk-media/image/upload/v1752882089/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-Network-Security-Groups/explore-network-security-groups-icons.jpg)

By leveraging these attributes, network administrators can craft a robust set of rules that ensure only permitted traffic reaches Azure resources while blocking undesired traffic.

---

## NSG Rule Evaluation and Traffic Flow

Consider a virtual network containing one or more subnets. You can associate an NSG either with a subnet or directly with a virtual machine’s network interface (NIC). For instance, if you have a web server running on a VM within a subnet and you need to allow HTTP traffic (port 80), you would create an NSG rule permitting that port. When traffic flows into the network, the NSG first evaluates the subnet-level rules; if the traffic is allowed, it then checks the NIC-level rules. Only if both NSGs grant access will the web server receive the request. Conversely, if either NSG denies traffic, the request is blocked before reaching the VM.

![The image illustrates the deployment of Network Security Groups (NSG) within a subnet, showing HTTP traffic flow through two NSGs to a computer system.](https://kodekloud.com/kk-media/image/upload/v1752882090/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-Network-Security-Groups/nsg-deployment-http-traffic-diagram.jpg)

For outbound traffic, the process mirrors inbound evaluation. Outbound traffic from a VM first encounters the NIC-level NSG before being assessed by the subnet-level NSG. Enforcing NSGs at both levels is optional; you might apply a common policy at the subnet level and optionally override with more specific policies at the NIC level.

---

## Hands-On Deployment via the Azure Portal

In this demonstration, we deploy a virtual network with two subnets, each hosting two virtual machines labeled Workloads A and B. The deployment script is available in your repository under the folder **080-Network Security** with the file named `nsg-prep-infra.ps1`.

### Deploying the Infrastructure

Set the subscription context and deploy the resources using the following PowerShell commands:

```
PS C:\Users\RithinSkaria\Documents\kodekoud-az500\080-Network Security> Get-AzSubscription
Creating Azure resources
2% |
[0
Creating networkSecurityGroups/workload-a-vm-1, publicIPAddresses/workload-a-vm-1-pip.

PS C:\Users\RithinSkaria\Documents\kodekoud-az500\080-Network Security> Set-AzContext -SubscriptionId 3e17f88a-ad65-4ebe-a407-4dc4ca01a73
Name
----
Kodekloud AZ-500 PoC3 (3e17f88a-ad65-...)

PS C:\Users\RithinSkaria\Documents\kodekoud-az500\080-Network Security> .\nsg-prep-infra.ps1
Adding resource group : rg-nsg-workloads-20230929
Adding workload-a network configuration
Creating workload-a-vm-1
```

After deployment, you can view the virtual machines in the Azure portal. In this example, four VMs are deployed: A1, A2, B1, and B2.

![The image shows a Microsoft Azure portal interface displaying a list of virtual machines, including details like name, type, subscription, location, status, operating system, size, and public IP address.](https://kodekloud.com/kk-media/image/upload/v1752882091/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-Network-Security-Groups/azure-portal-virtual-machines-list.jpg)

Additionally, you can review the connected devices within the virtual network:

![The image shows a Microsoft Azure portal interface displaying a list of connected devices within a virtual network, including details like device names, types, IP addresses, and subnets.](https://kodekloud.com/kk-media/image/upload/v1752882092/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-Network-Security-Groups/azure-portal-connected-devices-list.jpg)

For deeper insights, inspect the networking settings for a VM (e.g., workload-a-vm-1), which show inbound port rules and associated NSG details:

![The image shows a Microsoft Azure portal interface displaying the networking settings for a virtual machine named "workload-a-vm-1," including inbound port rules and network security group details.](https://kodekloud.com/kk-media/image/upload/v1752882094/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-Network-Security-Groups/azure-portal-network-settings-workload-a-vm-1.jpg)

---

## Configuring a Web Server on a VM

Next, sign into one of the VMs (assumed to be acting as a web server) and configure Apache to host a simple webpage. Use SSH to connect to the VM:

```
PS C:\Users\RithinSkaria\Documents\kodekoud-az500\080-Network Security> ssh kodekloud@172.173.168.151
The authenticity of host '172.173.168.151 (172.173.168.151)' can't be established.
ED25519 key fingerprint is SHA256:FgaCDYu+yuqGbyz1R4KhrJTxILYl72KJqg3PZqeLHy0.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```

Switch to the root user:

```
kodekloud@workload-a-vm-1:~$ sudo -s
root@workload-a-vm-1:/home/kodekloud#
```

Install the necessary packages to set up the Apache web server. (The outputs below represent the process of fetching and installing packages; actual output may vary.)

```
Get:31 http://azure.archive.ubuntu.com/ubuntu jammy-security/main amd64 Packages [804 kB]
Get:32 http://azure.archive.ubuntu.com/ubuntu jammy-security/universe amd64 Packages [785 kB]
...
Fetched 27.4 MB in 5s (5585 kB/s)
Reading package lists... Done
...
```

Once Apache is installed, update the default webpage with the following command:

```
root@workload-a-vm-1:/home/kodekloud# echo "From VM-A-1" > /var/www/html/index.html
```

After configuring the VM, verify the network settings again:

![The image shows a Microsoft Azure portal interface, specifically the networking settings for a virtual machine named "workload-a-vm-1." It includes options for configuring inbound port rules and setting source IP addresses for network security.](https://kodekloud.com/kk-media/image/upload/v1752882095/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-Network-Security-Groups/azure-portal-network-settings-workload-a-vm-1-2.jpg)

---

## Service Tags and NSG Rule Overrides

Service tags are groups of IP addresses maintained by Microsoft for its public services (such as Storage, Synapse, and Databases). Instead of manually managing dynamic IP addresses, you can reference service tags (e.g., "Internet," "Load Balancer," "Storage") in your NSG rules.

For example, if your VM needs access to a Storage account, you can allow traffic based solely on the Storage service tag rather than opening access to the entire Internet. NSG rule attributes also allow specification of source and destination criteria, such as IP ranges and service tags.

Consider the following scenario to override the default virtual network communication rule (with priority around 65,000):

1.  Modify the rule to deny traffic from a specific source IP range (e.g., 192.168.2.0/24 for VMs in subnet B).
2.  Although system routes permit virtual network (VNet) communication, a custom deny rule with a priority of 100 will block traffic from that range.
3.  To demonstrate this effect, open a new terminal and SSH into one of the VMs (e.g., workload-b-vm-1). Initially, executing a `curl` command to workload A's IP address will display the expected webpage:

    ```
    kodekloud@workload-b-vm-1:~$ curl 192.168.1.4
    From VM-A-1
    ```

4.  After updating the NSG rule to deny traffic, retrying the `curl` command will yield no output because the request is blocked.

This scenario demonstrates how an NSG rule with a higher priority (i.e., a lower numerical value) effectively overrides the default rule that permits virtual network communication.

![The image shows a Microsoft Azure portal interface, specifically the networking settings for a virtual machine named "workload-a-vm-1," with a focus on configuring inbound port rules and service tags.](https://kodekloud.com/kk-media/image/upload/v1752882096/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-Network-Security-Groups/azure-portal-networking-settings-workload-a-vm-1.jpg)

Because inbound traffic first encounters the subnet-level NSG, a custom deny rule at that level (set at priority 100) can block traffic—even if a default allow rule exists at priority 65,000.

---

## Testing NSG Changes and Blocking Traffic

To verify the impact of NSG modifications, try updating an inbound rule. For example, change an existing rule to deny SSH (port 22) traffic and apply the updated NSG to the subnet. The image below displays the inbound security rules before and after incorporating a deny rule:

![The image shows a Microsoft Azure portal screen displaying inbound security rules for a network security group. It lists rules with details such as priority, name, port, protocol, source, destination, and action (allow or deny).](https://kodekloud.com/kk-media/image/upload/v1752882097/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-Network-Security-Groups/azure-portal-inbound-security-rules.jpg)

After the NSG rule is modified to deny traffic, attempts to initiate an SSH connection or execute `curl` on port 22 (or HTTP traffic) will fail. For example, trying to `curl` workload A’s IP will return no output, and SSH attempts will be reset due to the NSG block.

For added flexibility, you can also configure augmented network security rules. These allow you to combine multiple ports or IP ranges into a single rule using comma-separated values or hyphenated ranges, thereby reducing management complexity.

![The image shows a Microsoft Azure portal interface with inbound security rules for a network security group. A panel on the right is open for adding a new inbound security rule, specifying source IP addresses, port ranges, and protocol options.](https://kodekloud.com/kk-media/image/upload/v1752882099/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-Network-Security-Groups/azure-portal-inbound-security-rules-2.jpg)

---

## Applying a New NSG to Block SSH

To further illustrate, let’s create a new Network Security Group specifically designed to block SSH (port 22) traffic:

1.  In the Azure portal, create a new NSG (e.g., “NSGsBlock”).
2.  Add an inbound rule that denies traffic on port 22 from any source.
3.  Associate this NSG with the appropriate subnet. (Remember, if a network interface is already associated with another NSG, you cannot attach a second NSG to that NIC.)

After applying these changes, attempting to SSH into a VM within the affected subnet will result in a connection reset:

```
kodekloud@workload-b-vm-1:~$ curl 192.168.1.4
kodekloud@workload-b-vm-1:~$
```

The logs and subsequent connection attempts confirm that port 22 traffic is being blocked at the subnet level, preventing traffic from ever reaching the VM’s NIC.

---

## Augmented Network Security Rules

Augmented network security rules simplify administration by allowing multiple ports or IP address ranges to be managed within a single rule. Instead of creating separate rules for each port or IP range, combine them using comma-separated values or hyphenated ranges. This streamlined approach reduces rule clutter and simplifies management.

For instance, if your application requires several port ranges or must allow access from multiple IP subnets (e.g., 192.168.1.0/24 and 192.168.3.0/24), you can specify these ranges within one consolidated rule.

With NSGs fully configured and thoroughly tested, you have successfully secured the traffic flowing to and from your Azure virtual machines.

---

## Next Steps: Application Security Groups

In the next section, we will explore Application Security Groups (ASGs). ASGs allow you to group similar servers and apply security rules based on these groups rather than using individual IP addresses. This further streamlines network security management in Azure.

> [!important]
> **Note**
>
> For more information on NSG best practices and advanced configurations, refer to the [Azure Network Security documentation](https://docs.microsoft.com/azure/virtual-network/network-security-groups-overview).

Happy securing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/0489a935-a4dd-41c6-b5d3-6054c570299b/lesson/33f15c8d-f8a1-47a4-908c-d9208800b689)**
>
> Watch video content
