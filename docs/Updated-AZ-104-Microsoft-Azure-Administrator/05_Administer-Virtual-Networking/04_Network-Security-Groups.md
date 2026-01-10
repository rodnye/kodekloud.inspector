# Network Security Groups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Virtual-Networking/Network-Security-Groups)

---

## Table of Contents

- Network Security Groups
  - Core Functionalities of Network Security Groups
  - NSG Rule Attributes
  - NSG Rule Evaluation Example
  - Configuring and Testing NSGs in Azure
  - Creating a New NSG to Block SSH Traffic
  - Augmented Network Security Rules
  - Watch Video
    - Filtering Traffic
    - Rule Set
    - Association
    - Evaluation
    - Deploying the Test Environment
    - Verifying NSG Settings via the Azure Portal
    - Establishing Connectivity via SSH
    - Advanced NSG Scenario – Denying Specific Traffic

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Virtual Networking

# Network Security Groups

In this article, we explore Network Security Groups (NSGs) in Azure, detailing their core functions, configurations, and how to integrate them with Azure Firewall to achieve layered network security.

Azure provides two primary services for network security:

- **Azure Firewall:** Best for centralized rule and logging management, supporting layer-seven filtering (e.g., by application or Fully Qualified Domain Name).
- **Network Security Groups (NSGs):** Operate at layer four of the OSI model and govern inbound and outbound access to network resources such as network interfaces, subnets, and VMs. NSGs enforce rules based on IP protocol, port number, and address prefix.

> [!important]
> **Key Comparison**
>
> For complex, large-scale environments requiring centralized management, use Azure Firewall. For simpler, resource-level access control, NSGs are ideal. Both services can complement each other to deliver multiple layers of filtering.

---

## Core Functionalities of Network Security Groups

### Filtering Traffic

NSGs monitor the source and destination IP addresses and ports for all inbound and outbound traffic. They then allow or deny traffic according to a set of predefined rules operating at layer four of the OSI model.

### Rule Set

- NSGs contain a prioritized list of rules where each rule specifies whether to allow or deny traffic.
- The priority is defined by a numerical value (lower numbers indicate higher priority).
- For example, a rule with priority 100 is processed before one with priority 400, while default rules typically have values in the 65,000 range.

### Association

An NSG can be associated with both subnets and individual network interfaces. This association strategy allows uniform rule enforcement across a network, while providing the option to override subnet-level rules at the network interface level.

### Evaluation

- Rules applied at both the subnet and NIC levels are evaluated independently.
- Inbound or outbound traffic must be permitted at both levels to successfully reach a resource.

![The image is a diagram about Network Security Groups (NSG), showing four components: Filter Traffic, Rule Set, Evaluation, and Association, surrounding a shield icon.](https://kodekloud.com/kk-media/image/upload/v1752884810/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Security-Groups/network-security-groups-diagram.jpg)

The diagram above illustrates that an inbound or outbound packet must be approved by both subnet and NIC NSGs before reaching its destination, thus establishing a secure perimeter around Azure resources.

---

## NSG Rule Attributes

When configuring NSG rules, you specify several attributes to control network traffic:

- **Service:** Define either custom or predefined services (e.g., HTTP, HTTPS, RDP, SSH) for the corresponding open ports.
- **Port Range:** Specify a single port or a range of ports.
- **Priority:** A numerical value (commonly between 100 and 4,096 for custom rules; default rules use values around 65,000) that indicates rule precedence.
- **Action:** Determine whether traffic will be allowed or denied.

![The image is a graphic titled "Explore Network Security Groups (NSG)" featuring four colorful icons labeled Service, Priority, Port Range, and Action.](https://kodekloud.com/kk-media/image/upload/v1752884812/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Security-Groups/explore-network-security-groups-icons.jpg)

These attributes empower administrators to craft robust NSG rule sets that effectively manage network traffic and enforce security policies.

---

## NSG Rule Evaluation Example

Consider a virtual network hosting a web server VM within a subnet. An NSG associated at the subnet level governs inbound traffic before it reaches the VM. For instance, to allow HTTP traffic (port 80) to the web server:

1.  Create a rule on the subnet NSG permitting traffic on port 80.
2.  Optionally, apply an additional NSG rule at the NIC level for further filtering.
3.  Traffic is allowed only if both NSGs permit the connection.
4.  If either NSG denies the traffic, it is blocked.

For outbound connections initiated from a VM:

- The NIC-level NSG evaluates the traffic first.
- Then, the subnet-level NSG evaluates it.
- The outgoing traffic is allowed only if both NSG levels approve it.

![The image illustrates the deployment of Network Security Groups (NSG) within a subnet, showing the flow of HTTP traffic through two NSGs.](https://kodekloud.com/kk-media/image/upload/v1752884813/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Security-Groups/nsg-deployment-http-traffic-diagram.jpg)

This example demonstrates how paired NSG evaluations enforce a secure environment for both inbound and outbound communications.

---

## Configuring and Testing NSGs in Azure

### Deploying the Test Environment

To test NSGs, deploy a set of virtual machines, a virtual network, and NSGs using the provided script. Locate the `nsg-prep-infra.ps1` script in the "050- Administer Virtual Networking" folder of your training materials.

Before running the script, ensure that you are in the correct subscription context. For example:

```
PS > cd <path-to-your-training-materials>
PS > cd .\050- Administer Virtual Networking\
PS > ls


    Directory: <your-training-materials-path>\050- Administer Virtual Networking


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----         12/7/2023  6:03 PM          2560 nsg-prep-infra.ps1
```

After confirming your context with `Get-AzContext`, run the script:

```
PS > .\nsg-prep-infra.ps1
```

The script will create a resource group and deploy four VMs (workload-a-vm-1, workload-a-vm-2, workload-b-vm-1, and workload-b-vm-2) to test NSGs. Verify the deployment through the Azure Portal by checking the VMs and their associated NSGs.

### Verifying NSG Settings via the Azure Portal

1.  Open the Azure Portal and navigate to **Virtual Machines** to see the list of four VMs.
2.  Select a VM (e.g., workload-a-vm-1) and inspect its **Networking** settings.
3.  Notice that an NSG is applied to the network interface, with default rules like:
    - Allow VNet inbound (priority around 65,000).
    - Allow Azure Load Balancer for health probes.
    - Deny all inbound traffic.

These default settings ensure that only permitted traffic (e.g., SSH on port 22) reaches the VM.

![The image shows a Microsoft Azure portal interface displaying details of a virtual machine named "workload-a-vm-1," including its status, location, operating system, and network information.](https://kodekloud.com/kk-media/image/upload/v1752884814/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Security-Groups/azure-portal-workload-a-vm-1.jpg)

### Establishing Connectivity via SSH

Use the public IP address of a VM (such as workload-a-vm-1) to test connectivity via SSH. Since SSH (port 22) is allowed by default, the connection should succeed. Below is an example SSH session:

```
PS > ssh kodekloud@172.173.168.151
The authenticity of host '172.173.168.151 (172.173.168.151)' can't be established.
ED25519 key fingerprint is SHA256:FgaCDyU+yuqGbyz1RkWrhJTxIlyIZkJqg3P7QzelHyo.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '172.173.168.151' (ED25519) to the list of known hosts.
kodekloud@172.173.168.151's password:
```

After logging in, update the system and install Apache. Change the landing page to display a custom message:

```
root@workload-a-vm-1:/home/kodekloud# echo "From VM-A-1" > /var/www/html/index.html
```

Verify the update using `curl`:

```
root@workload-a-vm-1:/home/kodekloud# curl localhost
```

If browsing via the public IP produces no response, it indicates that port 80 is not open. To enable HTTP access, add an inbound NSG rule with the following configuration:

- **Source:** Any
- **Source Port Range:** \*
- **Destination:** Any
- **Service:** HTTP
- **Priority:** 100 (for example)
- **Action:** Allow

After creating the rule, accessing the site via the public IP should reflect the updated index page.

### Advanced NSG Scenario – Denying Specific Traffic

To further refine security, NSG rules can be modified to block specific traffic. For example, to block inbound traffic from a particular IP range (e.g., 192.168.2.0/24, typically corresponding to VMs in subnet B), create a rule with:

- **Action:** Deny
- **Priority:** A value higher than default rules (e.g., 100)

Even though a default rule (priority 65,000) may allow VNet communication, a higher priority deny rule will override this behavior.

![The image shows a Microsoft Azure portal interface, specifically the networking settings for a virtual machine named "workload-a-vm-1." It includes configuration details for inbound port rules, with a focus on allowing HTTP traffic from a specified IP range.](https://kodekloud.com/kk-media/image/upload/v1752884816/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Security-Groups/azure-portal-networking-workload-a-vm-1.jpg)

To test the modified rule:

1.  SSH into another VM (e.g., workload-b-vm-1) to simulate inter-VM communication.
2.  Use `curl` to connect to the IP address of workload-a-vm-1.
3.  If the deny rule is active, the connection will be blocked despite system routes allowing communication.

For example:

```
kodekloud@workload-b-vm-1:~$ curl 192.168.1.4
```

After updating the NSG rule, the connection should fail if the deny policy is correctly enforced.

![The image shows the Microsoft Azure portal interface, specifically the networking settings for a virtual machine named "workload-a-vm-1," displaying inbound port rules and network security group details.](https://kodekloud.com/kk-media/image/upload/v1752884817/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Security-Groups/azure-portal-network-settings-workload-a-vm-1.jpg)

For outbound traffic, note that if an inbound rule allows traffic, the corresponding outbound connection is automatically permitted. Outbound traffic that does not match an allow rule will be blocked.

![The image shows a Microsoft Azure portal interface displaying the networking settings for a virtual machine named "workload-a-vm-1," including outbound port rules and network security group details.](https://kodekloud.com/kk-media/image/upload/v1752884818/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Security-Groups/azure-portal-network-settings-workload-a-vm-1-2.jpg)

---

## Creating a New NSG to Block SSH Traffic

Next, create a new NSG to block SSH traffic at the subnet level, effectively overriding the NIC-level rule that allows SSH by default:

1.  In the Azure Portal, create a new NSG (e.g., "block SSH NSG") within the appropriate resource group.
2.  Add an inbound rule with the following details to **Deny** SSH (port 22) from any source.
3.  Associate the NSG with the target subnet (e.g., subnet B).

Once associated, attempts to SSH into any VM within that subnet will be blocked at the subnet level, bypassing the NIC-level allow rule.

![The image shows the Microsoft Azure portal page indicating that a deployment named "Microsoft.NetworkSecurityGroup-20230929123037" is complete. It includes details like the subscription, resource group, and options for further actions.](https://kodekloud.com/kk-media/image/upload/v1752884819/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Security-Groups/azure-portal-deployment-complete.jpg)

![The image shows the Microsoft Azure portal displaying inbound security rules for a network security group. It lists rules with details such as priority, name, port, protocol, source, destination, and action (allow or deny).](https://kodekloud.com/kk-media/image/upload/v1752884820/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Network-Security-Groups/azure-portal-inbound-security-rules.jpg)

Test the new configuration by attempting to SSH into a VM from the affected subnet. You should receive a connection error (for example, “connection reset by port 22”), confirming that the NSG rule is blocking SSH traffic.

---

## Augmented Network Security Rules

Augmented NSG rules allow you to specify a range of ports or multiple IP addresses in a single rule. This reduces the complexity and number of individual rules needed.

- Instead of creating separate rules for different ports, list them as comma-separated values or specify a range (e.g., 80-85).
- Similarly, define multiple source IP ranges in one rule (e.g., "192.168.1.0/24,192.168.3.0/24").

This approach enhances manageability and simplifies your NSG configurations.

---

With this comprehensive understanding of NSGs, their evaluation process, and configuration strategies, you are now equipped to manage network traffic and enforce security policies effectively in your Azure environments. Next, we will explore Application Security Groups and how they further extend these capabilities.

For more detailed guidance on Azure networking and security, refer to the following links:

- [Azure Networking Documentation](https://docs.microsoft.com/azure/networking/)
- [Azure Firewall Overview](https://docs.microsoft.com/azure/firewall/overview)
- [Microsoft Azure Security Documentation](https://docs.microsoft.com/azure/security/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/809fc274-7871-4b13-8f85-052b43442c81/lesson/d9e36647-99bc-4e75-9b04-0806991313f3)**
>
> Watch video content
