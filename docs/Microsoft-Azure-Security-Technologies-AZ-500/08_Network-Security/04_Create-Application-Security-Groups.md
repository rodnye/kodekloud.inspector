# Create Application Security Groups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Network-Security/Create-Application-Security-Groups)

---

## Table of Contents

- Create Application Security Groups
  - Configuring ASGs in the Azure Portal
  - Testing Your Configuration
  - Benefits of Integrating ASGs and NSGs
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Network Security

# Create Application Security Groups

Application Security Groups (ASGs) in Azure provide a powerful way to define fine-grained network policies based on workloads rather than relying solely on explicit IP addresses. By grouping virtual machines (VMs) with similar security postures, ASGs simplify network security management. For example, you can group front-end VMs under an ASG named "web," logic VMs under ASG "logic," and database VMs under ASG "DB." This setup significantly simplifies your Network Security Group (NSG) rules by allowing you to reference ASGs instead of individual IP addresses.

In a typical scenario, all communication within a virtual network is allowed by default. However, you might want only designated VMs (such as web servers) to be accessible from the internet while keeping logic and database VMs isolated. Furthermore, you may restrict direct communication between front-end and database VMs by allowing only logic VMs to interact with the database.

![The image is a diagram illustrating the creation of application security groups within a virtual network, showing the flow of HTTP and TCP traffic between subnets and virtual machines.](https://kodekloud.com/kk-media/image/upload/v1752882082/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-Application-Security-Groups/application-security-groups-diagram.jpg)

Using ASGs streamlines NSG configurations. Even if you have multiple logic servers, you can group them under a single ASG and reference that group in your NSG rules.

> [!important]
> **Quick Tip**
>
> Using ASGs reduces the complexity of security rule maintenance. When a VM is removed from an ASG, the corresponding NSG rule automatically updates, simplifying policy management.

## Configuring ASGs in the Azure Portal

Follow these steps to set up and assign ASGs to your VMs:

1.  **Configure VM Networking Settings:**
    - Navigate to a VM (e.g., VM1) in the Azure portal and access its networking settings.
    - Temporarily remove any pre-defined rules for demonstration purposes. For instance, allow SSH on VM1 while ensuring that subnet-level rules do not conflict. Use the "effective security rules" option to see how NSGs function at both the subnet and NIC level.
    - Go to the NSGs section and disassociate any conflicting subnet-level rules if necessary so the desired rule (like SSH access) takes precedence.

2.  **Create ASGs:**
    - In the Azure portal, navigate to the Application Security Groups section and create a new group. For example, create an ASG for VMs hosting web servers.
    - Similarly, create another ASG for non-web VMs.

![The image shows a Microsoft Azure portal page with a deployment in progress for "Microsoft.ApplicationSecurityGroup." It includes details like subscription, resource group, and start time.](https://kodekloud.com/kk-media/image/upload/v1752882083/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-Application-Security-Groups/azure-portal-deployment-progress.jpg)

3.  **Assign ASGs to VMs:**
    - Open the networking settings of each VM (e.g., VM1) and configure the "Application Security Groups" section by assigning the appropriate ASGs.
    - Repeat this process for each applicable VM. Note that direct configuration must be done at the individual VM blade; the ASG blade only displays current information.

![The image shows a Microsoft Azure portal interface focused on the networking settings of a virtual machine named "workload-b-vm-1." It displays options for configuring network interfaces, security rules, and application security groups.](https://kodekloud.com/kk-media/image/upload/v1752882085/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-Application-Security-Groups/azure-portal-network-settings-workload-vm.jpg)

![The image shows a Microsoft Azure portal interface displaying details of an application security group named "b-vms," including its resource group, location, and subscription information.](https://kodekloud.com/kk-media/image/upload/v1752882086/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-Application-Security-Groups/azure-portal-application-security-group.jpg)

4.  **Apply NSG Rules Referencing ASGs:**
    - From VM1’s networking interface, add an inbound rule where the source is an application security group.
    - Configure the rule with the following options:

      | Option      | Example Setting                                         |
      | ----------- | ------------------------------------------------------- |
      | Source      | ASG associated with web server VMs                      |
      | Destination | Any (or a specific VM/IP as needed)                     |
      | Protocol    | Custom port (e.g., 80 for HTTP) or service tag for HTTP |
      | Action      | Allow                                                   |
      | Egress      | Set appropriately if needed                             |

![The image shows the Microsoft Azure portal interface, specifically the networking settings for a virtual machine, with a panel open to add an inbound security rule.](https://kodekloud.com/kk-media/image/upload/v1752882087/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-Application-Security-Groups/azure-portal-networking-settings.jpg)

Once the rule is applied, VMs associated with the specified ASG can access the web server running on VM1.

![The image shows a Microsoft Azure portal interface displaying the networking settings for a virtual machine named "workload-a-vm-1," including its IP configuration and inbound port rules.](https://kodekloud.com/kk-media/image/upload/v1752882087/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-Application-Security-Groups/azure-portal-networking-settings-workload-a-vm-1.jpg)

## Testing Your Configuration

To verify your configuration, follow these steps:

1.  **Test from a VM (e.g., BVM1):**
    - Log into BVM1 and attempt to access the web server on VM1 using cURL:

      ```
      kodekloud@workload-b-vm-1:~$ curl 192.168.1.4
      kodekloud@workload-b-vm-1:~$ ^C
      kodekloud@workload-b-vm-1:~$
      Connection to 20.127.51.98 closed.
      ```

2.  **Verify Connectivity via SSH from Windows:**

    ```
    PS C:\Users\RithinSkaria> ssh kodekloud@20.127.51.98
    kodekloud@20.127.51.98's password:
    PS C:\Users\RithinSkaria> ssh kodekloud@20.127.51.98
    kex_exchange_identification: read: Connection reset
    Connection reset by 20.127.51.98 port 22
    PS C:\Users\RithinSkaria>
    ```

3.  **Confirm Access on the Web Page:**
    - Once inside BVM1, check the web page output. An example output might look similar to:

      ```
      root@workload-a-vm-1:~#
      Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s
      just raised the bar for easy, resilient and secure K8s cluster deployment.
      https://ubuntu.com/engage/secure-kubernetes-at-the-edge


      Expanded Security Maintenance for Applications is not enabled.


      u updates can be applied immediately.


      Enable ESM Apps to receive additional future security updates.
      See https://ubuntu.com/esm or run: sudo pro status


      The list of available updates is more than a week old.
      To check for new updates run: sudo apt update


      Last login: Fri Sep 29 09:27:13 2023 from 212.70.99.128
      To run a command as administrator (user "root"), use "sudo <command>".
      See "man sudo_root" for details.


      kodekloud@workload-b-vm-1:~$
      ```

> [!important]
> **Security Reminder**
>
> Even if a VM is removed from an ASG, it may remain accessible due to the default virtual network rules. To enforce stricter access, consider adding a higher-priority NSG rule (e.g., priority 100) that explicitly denies unwanted traffic.

By grouping VMs using ASGs and applying NSG rules that reference these groups, you simplify network security management. If a VM is removed from an ASG, the associated NSG rule no longer applies, ensuring that your security policies are always aligned with your current infrastructure.

## Benefits of Integrating ASGs and NSGs

Integrating ASGs with NSGs in Azure provides several advantages:

| Benefit                                | Description                                                                                                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Streamlined Management Experience      | Simplifies administration by unifying the configuration of network policies for grouped VMs.                                                |
| Enhanced Limits and Scalability        | Increases capacity to manage an ever-growing number of VMs without performance degradation.                                                 |
| Simplification of Security Measures    | Makes defining and enforcing security policies more intuitive and less complex, reducing operational overhead.                              |
| Seamless Integration with Architecture | Allows ASGs and NSGs to blend smoothly with your existing network setup, even across multiple VNets or subscriptions connected via peering. |

![The image is a graphic with four colored boxes, each highlighting a benefit: streamlined management experience, enhanced limits and scalability, simplification of security measures, and seamless integration with architecture.](https://kodekloud.com/kk-media/image/upload/v1752882088/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-Application-Security-Groups/benefits-streamlined-management-scalability-security-integration.jpg)

In summary, the integration of ASGs with NSGs enables a simplified, scalable, and seamlessly integrated network security management solution in Azure. Rather than managing individual NSG rules for each VM, you can group similar machines and apply a single rule across the group, thereby reducing operational complexity.

The discussion will continue with an exploration of service endpoints.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/0489a935-a4dd-41c6-b5d3-6054c570299b/lesson/9be9c9f7-dc8e-4799-9f8e-263fb650c02f)**
>
> Watch video content
