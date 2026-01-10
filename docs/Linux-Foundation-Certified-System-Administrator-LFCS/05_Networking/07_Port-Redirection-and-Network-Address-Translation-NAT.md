# Port Redirection and Network Address Translation NAT - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Networking/Port-Redirection-and-Network-Address-Translation-NAT)

---

## Table of Contents

- Port Redirection and Network Address Translation NAT
  - Understanding Port Redirection
  - Network Address Translation (NAT) Explained
  - Configuring Port Redirection in Linux
  - Configuring Port Redirection with iptables
  - A Brief Look at nftables
  - Maintaining Persistence of the Rules
  - Optional Considerations and Additional Firewall Rules
  - Quick Reference Commands
  - Watch Video
    - Enabling IP Forwarding

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Networking

# Port Redirection and Network Address Translation NAT

In this lesson, you'll learn how to set up port redirection and network address translation (NAT). These techniques enable a public-facing server to direct incoming traffic to the correct private servers behind a firewall.

---

## Understanding Port Redirection

In many network configurations, servers operate on a private internal network that is not directly accessible from the Internet. In these cases, a public server acts as an intermediary between the Internet and the private network. Connected to both networks, the public server can forward incoming connections to the appropriate private server by using properly defined redirection rules.

For example, when a device on the Internet connects to the public server on port 80—commonly used for web traffic—the server must know which internal server should handle the request. Port redirection (or port forwarding) allows you to create rules that, for instance:

- Forward incoming connections on port 80 to Server 1.
- Redirect connections on port 993 to Server 2.
- Route connections on port 3306 to Server 3.

---

## Network Address Translation (NAT) Explained

Data transmitted over networks is broken into small packets. Each packet carries header information such as the source and destination IP addresses, which are essential for guiding the packet through different network devices.

![The image illustrates port redirection, showing how different ports (80, 993, 3306) from the internet are redirected to specific servers (Server 1, Server 2, Server 3) within an internal network.](https://kodekloud.com/kk-media/image/upload/v1752881316/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Port-Redirection-and-Network-Address-Translation-NAT/port-redirection-internal-network.jpg)

For example, an IPv4 packet includes various header fields that help routers and switches forward it correctly from the sender to the intended recipient. The source and destination addresses ensure that both data and any necessary responses are routed properly.

![The image illustrates the components of a network packet, showing the flow from a sender with a source IP address to a receiver with a destination IP address, with data in between.](https://kodekloud.com/kk-media/image/upload/v1752881317/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Port-Redirection-and-Network-Address-Translation-NAT/network-packet-components-flow.jpg)

When data travels from server to server via network devices, both the source and destination information in the packet header allow responses to find the way back. Consider this scenario:

![The image illustrates the structure of a network packet, showing various fields like version, IHL, and ports, and how data is routed to different servers within an internal network.](https://kodekloud.com/kk-media/image/upload/v1752881318/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Port-Redirection-and-Network-Address-Translation-NAT/network-packet-structure-diagram.jpg)

Imagine an external device with IP address 203.0.0.113 sending data to a public server with IP 123.4. When the public server receives a connection on port 80, it changes the destination IP from 123.4 to 10.0.0.5 (Server 1's private IP) and forwards the packet. However, because the packet retains the original source IP (203.0.0.113), Server 1’s reply would try to reach that external IP directly, bypassing the public server.

To resolve this, the public server performs NAT on the source IP by replacing it with its own public address. This ensures that responses correctly route back to the public server and then to the external device.

![The image illustrates Network Address Translation (NAT) with a focus on "Masquerading," showing the translation of a private IP address (10.0.0.5) to a public IP address (203.0.113.1).](https://kodekloud.com/kk-media/image/upload/v1752881319/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Port-Redirection-and-Network-Address-Translation-NAT/nat-masquerading-ip-translation.jpg)

This process, known as masquerading, is similar to how home routers allow multiple devices to share a single public IP address.

---

## Configuring Port Redirection in Linux

Before you can set up port redirection, you must enable IP forwarding on your machine. This allows the system to forward packets between interfaces. By default, IP forwarding is disabled.

### Enabling IP Forwarding

On Ubuntu, it is recommended to enable IP forwarding in `/etc/sysctl.d/99-sysctl.conf` rather than in `/etc/sysctl.conf` because the latter might be overwritten during system updates. Open the file with your preferred editor and uncomment the following lines as needed:

```
sudo vim /etc/sysctl.d/99-sysctl.conf
# Uncomment the next line to enable packet forwarding for IPv4
#net.ipv4.ip_forward=1
# Uncomment the next line to enable packet forwarding for IPv6
# Enabling this option disables Stateless Address Autoconfiguration based on Router Advertisements for this host
#net.ipv6.conf.all.forwarding=1
```

After making these changes, reload the sysctl configuration:

```
sudo sysctl --system
```

Verify that the values for IP forwarding are set to 1.

---

## Configuring Port Redirection with iptables

Linux processes network data using the netfilter framework. Although nftables is the modern tool, iptables remains widely used and will convert its rules to nftables rules automatically.

Consider the following scenario:

Assume the interface `enp1s0` manages traffic from the internal network range 10.0.0.0/24, and `enp6s0` is used for outbound traffic to the Internet. First, configure a rule that forwards incoming TCP connections on port 8080 to an internal address (for example, 192.168.0.5 on port 80):

```
sudo iptables -t nat -A PREROUTING -i enp1s0 -s 10.0.0.0/24 -p tcp --dport 8080 -j DNAT --to-destination 192.168.0.5:80
```

![The image is a flowchart illustrating the iptables chain, showing the sequence of processing steps like raw, connection tracking, mangle, nat, and filter between a network interface and a local process.](https://kodekloud.com/kk-media/image/upload/v1752881320/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Port-Redirection-and-Network-Address-Translation-NAT/iptables-chain-flowchart-processing-steps.jpg)

> [!important]
> **IPTables Reminder**
>
> Remember that while these iptables rules are useful for illustrating concepts, you should restrict the rules by specifying interfaces and source IP ranges in production environments to minimize potential abuse.

Even if a connection is initiated from an external machine, the packet's source address remains unchanged. As a result, when the internal server replies, it would attempt to send the response directly to the external IP address, which is not reachable from within the internal network.

To ensure return packets are properly routed back through the public server, modify the source address using a masquerade rule in the POSTROUTING chain:

```
sudo iptables -t nat -A POSTROUTING -s 10.0.0.0/24 -o enp6s0 -j MASQUERADE
```

This rule dynamically replaces the source IP with the public IP of the outgoing interface.

![The image illustrates a network diagram showing port redirection from an external network (10.0.0.0/24) through port 8080 to an internal network (192.168.0.1), directing traffic to Server 1 on port 80.](https://kodekloud.com/kk-media/image/upload/v1752881322/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Port-Redirection-and-Network-Address-Translation-NAT/network-diagram-port-redirection.jpg)

---

## A Brief Look at nftables

Although iptables is more familiar to many, nftables provides a modern alternative. Below is an example configuration using nftables that mirrors the iptables example:

```
table ip nat {
    chain PREROUTING {
        type nat hook prerouting priority dnat; policy accept;
        iifname "enp1s0" meta l4proto tcp ip saddr 10.0.0.0/24 tcp dport 8080 counter packets 0 bytes 0 dnat to 192.168.0.5:80
    }
    chain POSTROUTING {
        type nat hook postrouting priority srcnat; policy accept;
        oifname "enp6s0" ip saddr 10.0.0.0/24 counter packets 0 bytes 0 masquerade
    }
}
```

To list your active nftables rules, use:

```
sudo nft list ruleset
```

Many distributions, including Ubuntu, automatically convert iptables rules to nftables, simplifying the transition.

---

## Maintaining Persistence of the Rules

Keep in mind that iptables rules configured as above are temporary and will be lost after a system reboot. To save these rules permanently on Ubuntu, install the iptables-persistent package:

```
sudo apt install iptables-persistent
```

When prompted, confirm the default options to save your rules. For subsequent rule modifications, use:

```
sudo netfilter-persistent save
```

> [!important]
> **Security Reminder**
>
> Avoid unrestricted forwarding. Always restrict rules to specific interfaces and IP ranges to prevent unauthorized use of your network setup.

---

## Optional Considerations and Additional Firewall Rules

Using options such as `-i`, `-o`, and `-s` in iptables commands allows you to restrict rules to specific network interfaces or IP ranges—a best practice in production environments. Unrestricted rules could enable malicious actors to misuse your server.

For example, if you are using UFW (Uncomplicated Firewall) on Ubuntu, the default policy is to deny forwarding. To allow traffic, you may need to adjust UFW settings. Here is an example configuration:

```
sudo ufw allow 22
sudo ufw enable
sudo ufw route allow from 10.0.0.0/24 to 192.168.0.5
```

This configuration allows SSH (port 22) and routes packets from the 10.0.0.0/24 network to the internal server at 192.168.0.5. Customize these rules to match your network architecture and security requirements.

For further details on UFW syntax and command splits, refer to the UFW manual:

```
man ufw-framework
```

---

## Quick Reference Commands

Below is a table summarizing some useful commands for configuring port redirection and NAT on Linux:

| Action                       | Command                                                                    |
| ---------------------------- | -------------------------------------------------------------------------- |
| Enable IP Forwarding         | Edit `/etc/sysctl.d/99-sysctl.conf` and reload with `sudo sysctl --system` |
| List iptables NAT Rules      | `sudo iptables -L -t nat`                                                  |
| Flush iptables NAT Table     | `sudo iptables --flush --table nat`                                        |
| List nftables Rules          | `sudo nft list ruleset`                                                    |
| Save iptables/nftables Rules | `sudo netfilter-persistent save`                                           |

---

This lesson provided an overview of port redirection and NAT, including both underlying principles and practical configuration using iptables (with a glimpse at nftables). In the next lesson, we will explore advanced networking configurations to further enhance your network’s efficiency and security.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/2ba92913-296b-481d-af2d-6710bf3f7cdd/lesson/975636ae-2572-4d22-899b-e4890128d9a4)**
>
> Watch video content
