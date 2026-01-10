# Demo Multiple VMs Networking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Lab-Setup/Demo-Multiple-VMs-Networking)

---

## Table of Contents

- Demo Multiple VMs Networking
  - Cloning an Existing VM
  - Configuring the Network Adapters
  - Booting and Inspecting the VMs
  - Testing Connectivity
  - Demonstrating the Snapshot Feature
  - Final Remarks
  - Watch Video
    - Setting Up the Host-Only Network
    - Verifying Internet Connectivity
    - Networking Options Recap

---

## Content

DevOps Pre-Requisite Course

Lab Setup

# Demo Multiple VMs Networking

In this lesson, we will deploy multiple virtual machines (VMs) on VirtualBox and configure networking between them. We’ll demonstrate how to clone VMs and utilize snapshot functionalities for state backup and recovery. Creating a template VM is advisable so you can quickly produce multiple clones as needed.

## Cloning an Existing VM

Before cloning a VM, ensure that the VM is powered off. To clone a VM:

1.  Right-click the VM and select the clone option.
2.  Provide a new name (for example, "VM two") and choose the appropriate clone type. There are two options:
    - **Full clone**: Creates a complete copy of the existing disk. This option consumes the same amount of disk space as the original.
    - **Linked clone**: References the original disk and only uses additional space for changes made.

> [!important]
> **Warning**
>
> Linked clones depend on the original VM’s disk. Moving or deleting the original VM can cause issues with the linked clone.

After selecting the linked clone option, the new VM is created. With two VMs now available, proceed to adjust the network settings to enable communication.

## Configuring the Network Adapters

By default, VMs are configured with NAT, which isolates them from one another. The initial network configuration is depicted in the diagram below:

![The image shows the Oracle VM VirtualBox Manager interface with two CentOS virtual machines listed, both powered off, displaying system and storage details.](https://kodekloud.com/kk-media/image/upload/v1752873472/notes-assets/images/DevOps-Pre-Requisite-Course-Demo-Multiple-VMs-Networking/frame_110.jpg)

To allow inter-VM communication while preserving internet access, a dual-adapter configuration is used:

- **Adapter 1 (NAT):** Provides internet connectivity.
- **Adapter 2 (Host-only):** Enables direct communication between the VMs.

The VirtualBox network settings window is displayed below:

![The image shows a virtual machine network settings window with options for enabling network adapters, displaying tabs for Adapter 1 to Adapter 4.](https://kodekloud.com/kk-media/image/upload/v1752873474/notes-assets/images/DevOps-Pre-Requisite-Course-Demo-Multiple-VMs-Networking/frame_120.jpg)

### Setting Up the Host-Only Network

1.  Open VirtualBox and navigate to **File → Host Network Manager**.
2.  If no network exists, create a new one. In this lesson, a network named `Vboxnet1` is created with the IP address range starting at 192.168.57.1.
3.  Check the option to enable DHCP (to allow VMs to receive IP addresses automatically) and click **Close**.
4.  For each VM, go to the network settings and set the second adapter to **Host-only Adapter**, selecting the newly created network.

If your system has limited resources, consider reducing the allocated CPU and memory for the VMs.

## Booting and Inspecting the VMs

After configuring the network, power on both VMs. Log in using the OS account (for example, an account named "Matthew"). Since cloning copies the settings, the same account appears on both VMs.

Open the terminal on one VM to check the IP addresses. A new interface, typically named `enp0s8`, will be assigned an IP address (e.g., 192.168.57.3):

```
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 ...
    inet 10.0.2.15/24 ...
3: enp0s8: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 ...
    inet 192.168.57.3/24 ...
```

On the second VM, the host-only network interface should receive an IP such as 192.168.57.4. The host machine is also connected to this network with an IP of 192.168.57.1.

## Testing Connectivity

With the new network settings, the VMs can communicate directly. For example, ping from one VM to another without port forwarding:

```
mimushad ~ ping 192.168.57.4
PING 192.168.57.3 (192.168.57.3): 56 data bytes
64 bytes from 192.168.57.3: icmp_seq=0 ttl=64 time=0.502 ms
64 bytes from 192.168.57.3: icmp_seq=1 ttl=64 time=0.447 ms
--- 192.168.57.3 ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
```

You can also SSH into these VMs using their respective IP addresses and the root password.

### Verifying Internet Connectivity

Since the first adapter remains configured with NAT, both VMs should have internet access. Test this by pinging an external site, such as Google:

```
[root@osboxes ~]# ping www.google.com
PING www.google.com (74.125.68.147) 56(84) bytes of data.
64 bytes from sc-in-f147.1e100.net (74.125.68.147): icmp_seq=1 ttl=118 time=3.34 ms
64 bytes from sc-in-f147.1e100.net (74.125.68.147): icmp_seq=2 ttl=118 time=3.40 ms
--- www.google.com ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1002ms
```

To illustrate the impact of network configuration changes, alter Adapter 1 to use the host-only network rather than NAT. When this change is applied, the interface will acquire a new IP address and internet connectivity will be lost:

```
[root@osboxes ~]# ping www.google.com
PING www.google.com (74.125.68.103): 56(84) bytes of data.
64 bytes from 74.125.68.103: icmp_seq=1 ttl=120 time=13.4 ms
64 bytes from 74.125.68.103: icmp_seq=2 ttl=120 time=13.3 ms
--- www.google.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 1002ms
```

Checking the IP address on this interface will confirm that the VM no longer has internet access when solely configured with a host-only adapter.

### Networking Options Recap

| Networking Option | Use Case               | Description                                                                       |
| ----------------- | ---------------------- | --------------------------------------------------------------------------------- |
| NAT               | Internet Access        | Provides internet connectivity while isolating VMs from each other.               |
| Host-only         | Inter-VM Communication | Allows VMs to communicate with one another and with the host, no internet access. |
| NAT Network       | Combined Connectivity  | Enables VMs to communicate with each other while still providing internet access. |
| Bridged Adapter   | External Networking    | Makes VMs visible on the external network.                                        |

In this demo, we used a dual-adapter configuration: one adapter with NAT for internet and another with host-only networking for direct VM communication.

## Demonstrating the Snapshot Feature

Snapshots let you capture a VM's state at a particular moment, allowing for easy restoration if changes or errors occur. In this demo, we use the first VM to show how snapshots work.

1.  Create a directory for your application and initialize a file with sample content:

    ```
    [root@osboxes ~]# mkdir /opt/app
    [root@osboxes ~]# cd /opt/app
    [root@osboxes app]# ls
    [root@osboxes app]# echo "An example file" > example.txt
    [root@osboxes app]# cat example.txt
    An example file
    ```

2.  With the file in a good state, take a snapshot:
    - Open the snapshot window in VirtualBox.
    - Click the take snapshot button.
    - Name the snapshot (e.g., "good state") and add a brief description.

3.  Simulate a failure by overwriting the file with incorrect data:

    ```
    [root@osboxes ~]# echo "SLKSDJFLSKDJFLSDKJFLSDKF" > example.txt
    [root@osboxes ~]# cat example.txt
    SLKSDJFLSKDJFLSDKJFLSDKF
    ```

4.  To restore the original state:
    - Open the snapshots window.
    - Right-click the "good state" snapshot and select Restore. (Ensure the VM is shut down if necessary.)
    - Restart the VM and verify that `/opt/app/example.txt` has reverted to its previous content:

    ```
    [root@osboxes ~]# cd /opt/app/
    [root@osboxes app]# ls
    example.txt
    [root@osboxes app]# cat example.txt
    An example file
    ```

Snapshots are especially useful for testing software updates or major configuration changes, as they allow you to revert back to a known, stable state. You can also clone a snapshot to create a new VM starting from the saved state.

## Final Remarks

This lesson illustrated how to deploy multiple VMs on VirtualBox with both internet connectivity and host-only networking. It also covered practical cloning and snapshot techniques for backup and recovery. These features are essential for testing software and configurations within isolated virtualized environments.

See you in the next lesson!

For more details, visit [VirtualBox Documentation](https://www.virtualbox.org/manual/UserManual.html) and other helpful resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/9c8f26c1-90d7-488f-a675-1b77e777c173/lesson/0273320e-9fe4-4bf3-9f41-8f4886547ee9)**
>
> Watch video content
