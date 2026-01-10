# Connecting to VMs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Virtual-Machines/Connecting-to-VMs)

---

## Table of Contents

- Connecting to VMs
  - Connecting Using Public IP Address and Jumpbox
  - Connecting with Azure Bastion
  - Overview of Connection Methods
  - Connecting via SSH
  - Deploying VMs for Azure Bastion
  - Configuring Azure Bastion
  - Next Steps
  - Watch Video
    - Connecting to the Linux VM via Azure Bastion
    - Connecting to the Windows VM via Azure Bastion

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Virtual Machines

# Connecting to VMs

In this lesson, you'll learn how to connect to the virtual machines (VMs) created in the previous lesson using different methods. We will cover accessing VMs via public IP addresses, jumpboxes, and Azure Bastion. Each method has its own benefits and security considerations.

## Connecting Using Public IP Address and Jumpbox

One common method to access a virtual machine is by using its public IP address. With a public IP, you can:

- Use an SSH client (for Linux)
- Use an RDP client (for Windows)

Another secure option is to connect via a jumpbox. A jumpbox is a machine with a public IP address placed within a dedicated subnet, while your workloads run in a different, private subnet within the same virtual network. By connecting to the jumpbox, you can then access other machines securely on the private network.

![The image illustrates a network setup for connecting to virtual machines using a jumpbox within a virtual network, showing connections via private and public IPs. It includes elements like a virtual machine, public IP, and user access.](https://kodekloud.com/kk-media/image/upload/v1752884427/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Connecting-to-VMs/network-setup-jumpbox-virtual-machines.jpg)

## Connecting with Azure Bastion

Azure Bastion is a managed service that simplifies VM connectivity by allowing secure, direct browser-based access to your VMs. This method eliminates the need to deploy and manage jumpbox VMs, download special clients, or expose any ports directly to the internet.

> [!important]
> **Security Advantage**
>
> Azure Bastion enhances security by ensuring that no public ports are exposed, which helps protect your infrastructure from potential attackers.

![The image is a diagram illustrating how to connect to virtual machines using Azure Bastion, showing the flow from a bastion host through a virtual network to users.](https://kodekloud.com/kk-media/image/upload/v1752884428/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Connecting-to-VMs/azure-bastion-virtual-machines-diagram.jpg)

## Overview of Connection Methods

Below is an overview of available connection methods based on the operating system, protocol, and authentication:

- **Windows:**
  - **RDP:** Uses TCP port 3389. Authenticate with a password.
  - **WinRM:** Utilizes PowerShell for remote management over TCP port 5986 (requires certificate configuration).

- **Linux:**
  - **SSH:** Utilizes TCP port 22. Supports authentication via passwords or SSH key pairs.

![The image is a diagram showing methods for connecting to virtual machines, detailing operating systems, protocols/ports, and authentication methods. It includes Windows and Linux systems with protocols like RDP, WinRM, and SSH, and authentication via passwords, certificates, or keys.](https://kodekloud.com/kk-media/image/upload/v1752884429/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Connecting-to-VMs/vm-connection-methods-diagram.jpg)

## Connecting via SSH

To connect to a Linux VM using its public IP address, open your terminal and run:

```
ssh kodekloud@20.124.250.11
```

When you run the command, you will be prompted to verify the host authenticity and enter the password:

```
The authenticity of host '20.124.250.11 (20.124.250.11)' can't be established.
ED25519 key fingerprint is SHA256:WF3fDk9RW5FBHx6A619YVajH2O27TNQGyGPdCZZU.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '20.124.250.11' (ED25519) to the list of known hosts.
kodekloud@20.124.250.11's password:
```

Once authenticated, you are connected to the VM using its public IP address. Alternatively, you can reconnect using the jumpbox that was set up earlier.

Below is a sample output of system information from one of our VMs to confirm connectivity via the jumpbox:

```
System information as of Sun Dec 10 18:11:58 UTC 2023
System load:  0.0                Processes:              100
Usage of /:   1.1% of 28.9GB     Users logged in:        0
Memory usage: 31%                IPv4 address for eth0: 10.0.0.4
Swap usage:   0%

Expanded Security Maintenance for Applications is not enabled.

0 updates can be applied immediately.

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status

The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.
kodeKLOUD@az-vm-01:~$
```

## Deploying VMs for Azure Bastion

Now, let’s explore how to use Azure Bastion. The following PowerShell script creates two VMs—one Linux and one Windows—both with private IP addresses. These VMs are ideal for secure access via Bastion.

```
#Create Windows VM
New-AzVm `
    -ResourceGroupName $rg `
    -Name 'win-ra-vm' `
    -Location $region `
    -Image 'MicrosoftWindowsServer:WindowsServer:2022-datacenter-azure-edition:latest' `
    -VirtualNetworkName 'vnet-remoteaccess' `
    -SubnetName 'windows' `
    -SecurityGroupName 'windows-nsg' `
    -Credential $credential

#Create Linux VM
New-AzVm `
    -ResourceGroupName $rg `
    -Name 'linux-ra-vm' `
    -Location $region `
    -Image 'Ubuntu2204' `
    -VirtualNetworkName 'vnet-remoteaccess' `
    -SubnetName 'linux' `
    -SecurityGroupName 'linux-nsg' `
    -Credential $credential `
    -Size $VMSize
```

After the script completes, verify that the VMs appear in the virtual machines list. Since these VMs do not have public IP addresses, they are perfectly suited for private access using Azure Bastion.

![The image shows a Microsoft Azure portal displaying a list of virtual machines, including details like name, type, subscription, location, status, operating system, size, and public IP address.](https://kodekloud.com/kk-media/image/upload/v1752884431/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Connecting-to-VMs/azure-portal-virtual-machines-list.jpg)

## Configuring Azure Bastion

Follow these steps to set up a Bastion host:

1.  Navigate to the Bastion resource in the Azure portal.
2.  Create a new Bastion host with the settings below:
    - **Resource Group:** Remote Access
    - **Name:** RABastion01
    - **Region:** East US
    - **Tier:** Basic (to minimize costs)
3.  Choose the virtual network (vnet-remoteaccess) and ensure Bastion has a dedicated subnet named "AzureBastionSubnet" by clicking on "Manage subnet configuration."
4.  Create a new public IP address.
5.  Click "Review and Create" to deploy Bastion.

![The image shows a Microsoft Azure portal page for creating a Bastion host, with fields for project and instance details such as subscription, resource group, name, region, and tier.](https://kodekloud.com/kk-media/image/upload/v1752884432/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Connecting-to-VMs/azure-portal-bastion-host-creation.jpg)

Once the Bastion host is deployed, you can connect to your VMs privately through your browser.

### Connecting to the Linux VM via Azure Bastion

1.  Open the Azure portal and navigate to the Linux VM.
2.  Click on "Connect" and select "Connect via Bastion."
3.  Enter your username and password, then click "Connect."

A new browser tab will open with an SSH session to the Linux VM. You can run commands as usual. For example, update the package list:

```
kodekloud@linux-ra-vm:~$ sudo -s
root@linux-ra-vm:/home/kodekloud# apt update
Get:1 http://azure.archive.ubuntu.com/ubuntu jammy InRelease [119 kB]
Get:2 http://azure.archive.ubuntu.com/ubuntu jammy-backports InRelease [109 kB]
Get:3 http://azure.archive.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
...
```

### Connecting to the Windows VM via Azure Bastion

1.  In the Azure portal, navigate to the Windows VM.
2.  Click on "Connect" and choose "Connect via Bastion."
3.  Enter the required credentials and click "Connect."

This will open an RDP session in your browser with the Windows login screen. Once you sign in, you can securely manage the Windows VM.

> [!important]
> **Bastion Benefits**
>
> Using Azure Bastion provides secure, private access to your VMs without exposing them to the public internet.

## Next Steps

In the next lesson, we will explore how to configure high availability for your virtual machines. By following these best practices, you'll enhance the security and efficiency of your remote access setup.

For more information, refer to the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/34d9af06-fc33-4556-a3f2-2e7a5c5db484/lesson/e818446d-8a52-4ec6-8922-2b7981ff8000)**
>
> Watch video content
