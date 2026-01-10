# Application Security Groups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Virtual-Networking/Application-Security-Groups)

---

## Table of Contents

- Application Security Groups
  - Overview
  - Practical Scenario
  - Configuring ASGs in the Azure Portal
  - Testing the Configuration
  - Benefits of Using ASGs with NSGs
  - Conclusion
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Virtual Networking

# Application Security Groups

Azure Application Security Groups (ASGs) provide a flexible and efficient way to manage network security by grouping virtual machines (VMs) based on their application roles rather than relying on explicit IP addresses. This logical grouping simplifies the configuration of Network Security Groups (NSGs) and streamlines network policy management in dynamic and scalable environments.

## Overview

ASGs enable you to organize your VMs with similar security requirements into logical groups. For example:

- VM1 and VM2, handling front-end duties, belong to an ASG named "web."
- VM3, managing business logic, is grouped under "logic."
- VM4, serving as the database, belongs to an ASG called "DB."

This grouping technique allows you to reference an ASG directly in your NSG rules instead of individual IP addresses, reducing management complexity and easing future modifications.

> [!important]
> **Note**
>
> Grouping VMs by application roles not only simplifies the creation of security rules but also enhances the overall manageability of your network security posture.

## Practical Scenario

In a typical environment, all communication within the Virtual Network is allowed by default. Suppose you want to restrict internet access such that only the front-end VMs (VM1 and VM2) are accessible externally, while both the logic (VM3) and database (VM4) VMs remain protected from direct internet exposure. Additionally, you may need to ensure that the front-end VMs do not interact directly with the database — only the logic tier should have that privilege.

Using ASGs, you can implement several NSG rules that reference these groups rather than managing each rule by individual IP addresses. This method simplifies rule creation and modification, especially as your network scales.

Below is a network diagram illustrating this setup: ![The image is a network diagram illustrating the setup of application security groups within a virtual network, showing connections between virtual machines, subnets, and the internet using specific TCP ports.](https://kodekloud.com/kk-media/image/upload/v1752884794/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Application-Security-Groups/application-security-groups-network-diagram.jpg)

## Configuring ASGs in the Azure Portal

The following steps outline how to configure ASGs using the Azure portal:

1.  **Access the Virtual Machine Settings:**

    Begin by opening the networking settings for VM1. In this demonstration:
    - Some predefined rules are temporarily removed to facilitate the setup.
    - SSH is allowed from external sources on VM1.

    ![The image shows a Microsoft Azure portal interface for managing virtual machines, specifically focusing on the networking settings of "workload-a-vm-1." A pop-up is asking to confirm the deletion of a security rule named "Allow_web."](https://kodekloud.com/kk-media/image/upload/v1752884796/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Application-Security-Groups/azure-portal-vm-network-settings.jpg)

2.  **Review Effective Security Rules:**

    ASGs work in harmony with NSGs applied at both the subnet and network interface controller (NIC) levels. When reviewing effective security rules:
    - You may notice that a rule allowing SSH from one source could be overwritten by another that denies SSH at the subnet level.
    - Ensure that conflicting NSG rules are disassociated from the subnet to maintain desired connectivity.

3.  **Creating Application Security Groups:**

    With your VMs already running web server workloads (from previous NSG configurations), create logical groups by following these steps:
    - Navigate to the **Application Security Groups** section in the Azure portal.
    - Create a new ASG — for instance, name it "VMs" for your web servers.
    - Similarly, create another ASG for non-web VMs if required.

    ![The image shows a Microsoft Azure portal interface for creating an application security group, with fields for project and instance details such as subscription, resource group, name, and region.](https://kodekloud.com/kk-media/image/upload/v1752884797/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Application-Security-Groups/azure-portal-application-security-group.jpg)

4.  **Assigning ASGs to Virtual Machines:**

    After creating the ASGs, assign them to the appropriate VMs by navigating to each VM’s networking settings. For example:
    - In the "Networking" section of a non-web VM, locate the "Application Security Groups" area and assign the corresponding ASG.

    ![The image shows a Microsoft Azure portal interface displaying details of an application security group named "b-vms," including its resource group, location, and subscription information. A notification about modifying the network interface is visible in the top right corner.](https://kodekloud.com/kk-media/image/upload/v1752884798/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Application-Security-Groups/azure-portal-application-security-group-2.jpg)

    > [!important]
    > **Note**
    >
    > Although the Application Security Groups blade displays the groups, actual assignments and modifications occur from within each virtual machine's configuration pane.

5.  **Creating Inbound NSG Rules Using ASGs:**

    To control traffic, create inbound NSG rules that reference your ASGs. For example, on VM1:
    - Navigate to the networking settings and add an inbound security rule.
    - Set the source to an Application Security Group (e.g., the ASG for front-end VMs).
    - Specify the destination as a particular IP (e.g., 192.168.1.4) or any VM.
    - Choose a service tag like HTTP or specify a custom port (e.g., port 80).
    - Set the action to "Allow."

    ![The image shows a Microsoft Azure portal interface where a user is configuring networking settings for a virtual machine, specifically adding an inbound security rule.](https://kodekloud.com/kk-media/image/upload/v1752884799/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Application-Security-Groups/azure-portal-networking-settings.jpg)

    After adding the rule, refresh the view to verify that traffic from the designated ASG can access the web server.

## Testing the Configuration

Once you have configured ASGs and NSG rules, testing the network setup is crucial to ensure proper security enforcement:

1.  Establish an SSH connection into VM1.
2.  Execute a connectivity test by using curl against the web server’s IP (e.g., 192.168.1.4):

    ```
    kodekloud@workload-b-vm-1:~$ curl 192.168.1.4
    ```

3.  If VM1 is removed from the ASG that permits web server access, connectivity may still persist due to default virtual network allowances. To enforce a block, create a high-priority NSG rule (using a lower numerical priority value, such as 100) to deny the unwanted traffic. This ensures that once removed from the ASG, the VM will no longer access the web server.

> [!important]
> **Warning**
>
> Ensure that you test the connectivity after applying rule changes. Improper configurations might expose VMs to unintended access.

## Benefits of Using ASGs with NSGs

Integrating ASGs with NSGs in Azure offers numerous advantages:

- **Streamlined Management:**  
  By referring to logical VM groups instead of individual IPs, rule management becomes more intuitive and less time-consuming.
- **Enhanced Scalability:**  
  ASGs allow you to manage a large number of VMs under common rules, supporting the growth and evolution of your network infrastructure.
- **Simplified Security Administration:**  
  The combined use of ASGs and NSGs reduces the complexity of managing network security, allowing for easier modifications and updates.
- **Seamless Architecture Integration:**  
  Whether your VMs span different subnets, virtual networks, or even subscriptions (connected via peering), ASGs and NSGs can be uniformly applied to maintain a cohesive security framework.

## Conclusion

By leveraging Application Security Groups together with Network Security Groups, you can achieve simplified, scalable, and consistent network security management across your Azure environment. Grouping related virtual machines by roles and referencing these groups in your NSG rules minimizes the overhead associated with manual IP-based configurations.

This comprehensive approach not only boosts security but also enhances operational efficiency, making it an ideal solution for modern, dynamic cloud environments. Thanks for reading!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/809fc274-7871-4b13-8f85-052b43442c81/lesson/09a84e9d-070f-4ac9-88e7-424d3d7fa7bd)**
>
> Watch video content
