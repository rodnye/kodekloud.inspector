# Demo Connecting to VM on Mac - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Lab-Setup/Demo-Connecting-to-VM-on-Mac)

---

## Table of Contents

- Demo Connecting to VM on Mac
  - Connecting on Mac
  - Setting Up Port Forwarding
  - Watch Video
    - Step 1: Check the IP Address
    - Step 2: Verify SSH Service
    - Step 3: SSH into the VM

---

## Content

DevOps Pre-Requisite Course

Lab Setup

# Demo Connecting to VM on Mac

In this guide, we demonstrate how to connect to a Linux VM running on VirtualBox using different network configurations. While the demo covers both Windows and Mac environments, the fundamental concepts remain the same. The key difference lies in the network configuration: Windows uses a bridged adapter that assigns an external IP address, whereas Mac uses the default NAT configuration.

On the left, you can see the Mac configuration, and on the right, the Windows configuration. In the Windows deployment, a bridged adapter allows the VM to join the external network, obtaining an IP address from it. This enables SSH connectivity as if the VM were another physical host on your network.

![The image shows network settings for virtual machines on Mac and Windows, highlighting adapter configurations in virtualization software.](https://kodekloud.com/kk-media/image/upload/v1752873443/notes-assets/images/DevOps-Pre-Requisite-Course-Demo-Connecting-to-VM-on-Mac/frame_50.jpg)

When using NAT, as on Mac, the VM does not receive an IP address on the external network. Instead, SSH access requires you to configure port forwarding. Both network configurations—bridged and NAT—are available on Windows and Mac, offering different connectivity options depending on your needs.

## Connecting on Mac

When you power on the system, if the console appears too small, adjust the scale from the View menu to 300%. A welcome screen and wizard may appear; simply complete them and close the wizard.

### Step 1: Check the IP Address

Open the terminal from the applications menu and check the VM's IP address:

```
[osboxes@osboxes ~]$ ip
```

The VM will display an IP address of 10.0.2.15. This is a private internal IP assigned by the NAT router, meaning it is not accessible externally from the host. Do not attempt to ping or SSH into this IP directly from the host. Even if multiple VMs use NAT (resulting in the same IP), they remain isolated from one another. However, with a functioning internet connection, all VMs can access external sites. Verify connectivity by pinging an external website:

```
[osboxes@osboxes ~]$ ping www.google.com
PING www.google.com (142.250.4.99) 56(84) bytes of data.
64 bytes from 142.250.4.99: icmp_seq=1 ttl=63 time=3.30 ms
64 bytes from 142.250.4.99: icmp_seq=2 ttl=63 time=3.34 ms
64 bytes from 142.250.4.99: icmp_seq=3 ttl=63 time=3.52 ms


--- www.google.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2004ms
rtt min/avg/max/mdev = 3.300/3.390/3.522/0.106 ms
[osboxes@osboxes ~]$
```

> [!important]
> **Note**
>
> The VM's IP (10.0.2.15) is assigned for internal communication by the NAT router and is not reachable from your host directly.

### Step 2: Verify SSH Service

Before attempting to SSH, ensure that the SSH service is running on the VM:

```
[osboxes@osboxes ~]$ service sshd status
Redirecting to /bin/systemctl status sshd.service
● sshd.service - OpenSSH server daemon
   Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-04-13 15:15:51 EDT; 10min ago
     Docs: man:sshd(8)
           man:sshd_config(5)
 Main PID: 1026 (sshd)
    Tasks: 1
   CGroup: /system.slice/sshd.service
           └─1026 /usr/sbin/sshd -D


Apr 13 15:15:51 osboxes systemd[1]: Starting OpenSSH server daemon...
Apr 13 15:15:51 osboxes sshd[1026]: Server listening on 0.0.0.0 port 22.
Apr 13 15:15:51 osboxes sshd[1026]: Server listening on :: port 22.
Apr 13 15:15:51 osboxes systemd[1]: Started OpenSSH server daemon.
[osboxes@osboxes ~]$
```

Since the NAT configuration does not provide an externally reachable IP, port forwarding is required to enable SSH access.

## Setting Up Port Forwarding

1.  **Open the VM Settings:** Navigate to the Networking section.
2.  **Select Port Forwarding:** Choose the Port Forwarding option to add a new rule.
3.  **Configure the Port Forwarding Rule:**
    - The VM’s SSH service listens on port 22.
    - Since the host may also use port 22, choose an alternative host port (e.g., 2222) to forward to port 22 on the VM.
    - Name the rule (e.g., "SSH port").

Once configured, you can SSH into the VM using the loopback IP address (127.0.0.1) and the designated host port:

![The image shows a virtual machine network settings window, configuring SSH with TCP protocol, host port 2222, and guest port 22, on a CentOS VM.](https://kodekloud.com/kk-media/image/upload/v1752873444/notes-assets/images/DevOps-Pre-Requisite-Course-Demo-Connecting-to-VM-on-Mac/frame_260.jpg)

### Step 3: SSH into the VM

To connect, execute the following command (adjust the username as needed):

```
ssh root@127.0.0.1 -p 2222
```

Once connected, you can run commands on the VM. For example, inspect the OS release files to confirm the system is running CentOS 7:

```
VERSION="7 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="7"
PRETTY_NAME="CentOS Linux 7 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:7"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"
CENTOS_MANTISBT_PROJECT="CentOS-7"
CENTOS_MANTISBT_PROJECT_VERSION="7"
REDHAT_SUPPORT_PRODUCT="centos"
REDHAT_SUPPORT_PRODUCT_VERSION="7"
CentOS Linux release 7.7.1908 (Core)
CentOS Linux release 7.7.1908 (Core)
cpe:/o:centos:centos:7
[root@osboxes ~ ]# clear
```

> [!important]
> **Verification**
>
> The displayed OS release details confirm that you have connected to the correct CentOS 7 system.

That concludes this demo. Enjoy smooth SSH connectivity to your Linux VM on Mac!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/9c8f26c1-90d7-488f-a675-1b77e777c173/lesson/cb98a95e-8733-4a48-b86e-ab77076a6a44)**
>
> Watch video content
