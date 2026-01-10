# Virtual Box Networking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Lab-Setup/Virtual-Box-Networking)

---

## Table of Contents

- Virtual Box Networking
  - Host-Only Networking
  - NAT Networking
  - Bridged Networking
  - Internet Connectivity and IP Forwarding
  - Port Forwarding
  - Watch Video

---

## Content

DevOps Pre-Requisite Course

Lab Setup

# Virtual Box Networking

In this lesson, we explore the various networking options available within VirtualBox, including NAT, bridged, and host-only networks. Many users face challenges when configuring these options, particularly when it comes to connectivity between multiple VMs or troubleshooting internet access. Before diving into VirtualBox-specific settings, let's briefly review essential networking concepts.

Computers such as laptops and servers connect using different types of network interfaces or adapters. For example, a wired Ethernet adapter uses a cable connected to a hub or switch, while a wireless adapter connects via Wi-Fi. Every network interface is assigned an IP address—either manually or automatically through a DHCP server. For instance, if an Ethernet-connected laptop is assigned the IP address 192.168.1.5, running the command below will display the network details:

```
ip addr show
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 02:0e:0c:9a:00:f0 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.5/24 brd 192.168.1.255 scope global enp0s3
```

If the same laptop uses a Wi-Fi adapter, it will obtain a different IP address, as shown below:

```
ip addr show
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 02:0e:0c:9a:00:f0 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.5/24 brd 192.168.1.255 scope global enp0s3
3: wlp0s2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether dc:fb:48:dd:4b:4f brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.6/24 brd 192.168.1.255 scope global wlp0s2
```

A single system can maintain multiple interfaces, enabling it to connect to diverse networks simultaneously. Some interfaces might offer internet connectivity while others remain isolated.

Once you create a virtual machine (VM) in VirtualBox, open the VM’s Settings and navigate to the Networking tab. By default, the first adapter is enabled and set to NAT mode. VirtualBox allows up to four adapters, each of which can be configured with different network types (NAT, bridged, or host-only) based on your requirements.

![The image shows a VirtualBox networking setup for a CentOS virtual machine, highlighting network adapter options like NAT and Bridged Adapter.](https://kodekloud.com/kk-media/image/upload/v1752873479/notes-assets/images/DevOps-Pre-Requisite-Course-Virtual-Box-Networking/frame_160.jpg)

Below, we detail common scenarios and configurations for VirtualBox networking.

---

## Host-Only Networking

A host-only network is ideal when you need communication between VMs and your host machine without exposing the VMs to the external network. Consider a scenario where your physical machine has an IP of 192.168.1.10 on an external LAN, and you provision several VirtualBox VMs. By default, these VMs lack network connectivity and IP addresses, meaning they cannot interact with each other or external systems.

To facilitate internal communication:

- Create a host-only network on your host machine. For example, set the network IP range to 192.168.5.0.
- When the virtual interfaces of your VMs attach to this network, they are assigned IP addresses within this range (such as 192.168.5.2, 192.168.5.3, etc.).
- VirtualBox also creates a virtual interface on the host (e.g., vboxnet0) with an IP like 192.168.5.1.

![The image illustrates a network diagram showing a host-only network with IP addresses, connected to a LAN with a specific IP range.](https://kodekloud.com/kk-media/image/upload/v1752873480/notes-assets/images/DevOps-Pre-Requisite-Course-Virtual-Box-Networking/frame_290.jpg)

> [!important]
> **Note**
>
> A host-only network confines communication to the host and associated VMs, providing a secure way to test configurations without external network exposure.

To create a host-only network in VirtualBox:

1.  On macOS, go to File → Host Network Manager (similar options exist for Windows and Linux).
2.  Click the "Create" button to establish a new host-only network.
3.  Attach each VM’s network adapter to this host-only network through the VM settings.
4.  With DHCP enabled on the host-only network, VMs automatically receive an appropriate IP address.

![The image shows VirtualBox's Host Network Manager interface, displaying network settings for a host-only network with IP configuration details and a network diagram.](https://kodekloud.com/kk-media/image/upload/v1752873481/notes-assets/images/DevOps-Pre-Requisite-Course-Virtual-Box-Networking/frame_360.jpg)

---

## NAT Networking

In some scenarios, VMs need the ability to access external systems, such as when a host machine (with an IP like 192.168.1.10) runs a service hosted at 192.168.1.11. While a host-only network restricts VMs to internal communication, a NAT (Network Address Translation) network allows VMs to access external resources.

When a VM on a NAT network sends a request to an external system, the NAT engine on the host modifies the source IP to match its own. When data returns, the NAT engine reassigns the destination IP back to the VM.

![The image illustrates a Network Address Translation (NAT) network setup, showing IP addresses and data flow between devices within a LAN and a NAT network.](https://kodekloud.com/kk-media/image/upload/v1752873483/notes-assets/images/DevOps-Pre-Requisite-Course-Virtual-Box-Networking/frame_530.jpg)

![The image illustrates a Network Address Translation (NAT) network, showing data transfer between devices with specific IP addresses within a LAN.](https://kodekloud.com/kk-media/image/upload/v1752873483/notes-assets/images/DevOps-Pre-Requisite-Course-Virtual-Box-Networking/frame_540.jpg)

To establish a NAT network in VirtualBox:

1.  Open VirtualBox Preferences and select the Network tab.
2.  Under NAT Networks, click the plus (+) button to create a new NAT network.
3.  In the VM’s Network settings, set the adapter type to "NAT Network" and select the network you created.

Note that VirtualBox provides two NAT modes:

- **NAT (default):** Each VM is isolated; they can access the external network but not each other.
- **NAT Network:** All VMs share the same NAT engine, allowing communication between VMs on the same network.

---

## Bridged Networking

Bridged networking is used when a VM needs to appear as a separate machine on the physical LAN—ideal for hosting services like a web server. With bridged mode, the VM connects directly to the LAN and receives an IP address from the network’s DHCP server (e.g., 192.168.1.12 or 192.168.1.13), just like any other physical host.

![The image illustrates a bridge network setup, showing interconnected devices with specific IP addresses within a LAN environment.](https://kodekloud.com/kk-media/image/upload/v1752873484/notes-assets/images/DevOps-Pre-Requisite-Course-Virtual-Box-Networking/frame_770.jpg)

With bridged networking, external devices can communicate with the VM directly, making it suitable for production services that require network accessibility.

---

## Internet Connectivity and IP Forwarding

VMs configured with NAT (or NAT Network) automatically receive internet connectivity if the host machine has internet access. In bridged mode, since the VM is recognized as a standard network host, internet connectivity is handled in the same way as for any physical machine on the LAN.

However, VMs on a host-only network are isolated from external networks. To allow these VMs to access the internet, you can configure IP forwarding on the host machine. This process essentially converts your host into a router, directing traffic from the host-only network to the external network.

![The image illustrates three types of internet connectivity: NAT, Host-Only, and Bridged, showing their network configurations and connectivity possibilities.](https://kodekloud.com/kk-media/image/upload/v1752873485/notes-assets/images/DevOps-Pre-Requisite-Course-Virtual-Box-Networking/frame_920.jpg)

Alternatively, you can add a second adapter to each VM configured for NAT, ensuring continuous internet access.

---

## Port Forwarding

Port forwarding in VirtualBox allows you to map a port on the host machine to a port on the guest VM. This is especially useful when running services such as a web server or SSH on a VM that uses NAT. For example, if a web server is running on port 80 in the VM, you can configure port forwarding so that requests to port 80 on the host are redirected to port 80 on the VM.

A common use case for port forwarding is SSH. You can map port 22 on the VM (the standard SSH port) to a different port on the host (such as 2222). This means you can SSH into the host at port 2222, and the connection will be forwarded to the VM:

```
host> ssh 192.168.1.10 -p 2222
```

This setup is particularly helpful when managing multiple VMs and services, as you can define distinct port mappings for each VM and protocol (TCP/UDP) in VirtualBox's network settings.

![The image shows a port forwarding configuration window with rules for TCP protocols, mapping host ports to guest ports on a virtual network.](https://kodekloud.com/kk-media/image/upload/v1752873486/notes-assets/images/DevOps-Pre-Requisite-Course-Virtual-Box-Networking/frame_1130.jpg)

---

That concludes our exploration of VirtualBox networking. With these insights, you are now better prepared to diagnose connectivity issues, select the correct networking mode, and configure settings based on your environment’s needs.

Happy networking, and see you in the next lesson!

For more detailed information on networking concepts and VirtualBox settings, be sure to explore additional resources such as [VirtualBox Documentation](https://www.virtualbox.org/manual/) and [Networking Basics](https://www.geeksforgeeks.org/computer-networking-tutorial/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/9c8f26c1-90d7-488f-a675-1b77e777c173/lesson/e171db9e-7ece-438e-85e7-20c5e9e43de1)**
>
> Watch video content
