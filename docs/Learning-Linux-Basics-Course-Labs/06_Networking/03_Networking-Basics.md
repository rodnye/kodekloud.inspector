# Networking Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Networking/Networking-Basics)

---

## Table of Contents

- Networking Basics
  - Key Commands Recap
  - Watch Video
  - Practice Lab

---

## Content

Learning Linux Basics Course & Labs

Networking

# Networking Basics

In this lesson, we explore essential networking concepts, including switching, routing, network interfaces, gateways, and routes. Imagine two devices—A and B (these could be laptops, desktops, or virtual machines)—trying to communicate. How does device A reach device B? The answer lies in connecting both devices to a switch.

A switch creates a localized network that interconnects devices. Each host must have an interface (either physical or virtual) to connect. To inspect a host’s interfaces, you can use the following command, which displays details for the interface named eth0:

```
[~]$ ip link
eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
```

Assuming the network address is 192.168.1.0, both devices receive IP addresses from this range. To view or assign IP addresses on these interfaces, you can use the `ip addr` command. For example, after ensuring the eth0 interface is up, assign an IP address on device A:

```
[~]$ ip addr add 192.168.1.10/24 dev eth0
```

Similarly, on device B assign a different IP address:

```
[~]$ ip addr add 192.168.1.11/24 dev eth0
```

With the interfaces active and IP addresses assigned, the devices can now communicate through the switch. Note that a switch only supports communication within the same network. To test connectivity, you might use the `ping` command:

```
[~]$ ping 192.168.1.11
Reply from 192.168.1.11: bytes=32 time=4ms TTL=117
Reply from 192.168.1.11: bytes=32 time=4ms TTL=117
```

Now, consider another network containing devices C and D with the network address 192.168.2.0, where device C has the IP address 192.168.2.10 and device D has 192.168.2.11. How does a device from the first network (for example, device B with IP 192.168.1.11) reach device C (IP 192.168.2.10)?

This is where a router comes into play. A router connects two networks; think of it as a server with multiple network ports, each belonging to a different network. In this example, the router is assigned IP address 192.168.1.1 on the first network and 192.168.2.1 on the second network. These dual assignments enable the router to facilitate communication between the two networks.

When device B sends a packet destined for device C, it must know the appropriate exit point (i.e., the router). This is achieved by configuring a default gateway or adding specific routes. Consider the gateway as the door that connects the local network to other networks or the Internet. Each device must know where this door is located.

To view the current routing configuration (the kernel’s routing table), use:

```
[~]$ route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
```

If no additional routes are configured, device B will only communicate within its own network (192.168.1.0). To allow device B to reach devices on network 192.168.2.0, configure a route specifying that packets destined for 192.168.2.0 should be sent via the router (gateway) at 192.168.1.1. For example, on device B execute:

```
ip route add 192.168.2.0/24 via 192.168.1.1
```

Similarly, device C requires a route entry enabling it to reach network 192.168.1.0 via the router's IP address on that network (192.168.2.1).

> [!important]
> **Note**
>
> For devices that also require Internet access (for example, connecting to Google, which might be in the 172.217.194.0 range), connect the router to the Internet and add a default route to the devices’ routing tables. A single default gateway entry allows devices to route any traffic destined for an unknown network through the router.

To configure a default gateway along with a specific route for network 192.168.1.0, you can use commands like these:

```
ip route add default via 192.168.2.1
ip route add 192.168.1.0/24 via 192.168.2.1
```

The output of the `route` command would then look similar to this:

```
route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
192.168.1.0     192.168.2.1     255.255.255.0   UG    0      0        0 eth0
0.0.0.0         192.168.2.1     255.255.255.255 UG    0      0        0 eth0
```

In this context, you can use either the word `default` or the IP address `0.0.0.0` interchangeably for the default route. An entry with `0.0.0.0` in the gateway field signals that no further gateway is needed for that route. In more complex networks with multiple routers (e.g., one for Internet access and another for internal communications), you would maintain separate routing table entries for internal traffic and default gateway traffic.

If you encounter issues reaching the Internet, reviewing the routing table to verify the default gateway configuration is a good troubleshooting step. For instance, if there is an incorrect route for the internal network, you might update it as follows:

```
ip route add 192.168.1.0/24 via 192.168.2.2
```

Then check the routing table again:

```
route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         192.168.2.1     0.0.0.0         UG    0      0        0 eth0
192.168.1.0     192.168.2.2     255.255.255.0   UG    0      0        0 eth0
```

## Key Commands Recap

Below is a summary of essential commands covered in this lesson:

| Command          | Purpose                                       | Example                                     |
| ---------------- | --------------------------------------------- | ------------------------------------------- |
| ip link          | Lists and modifies host interfaces            | `[~]$ ip link`                              |
| ip addr          | Displays IP addresses assigned to interfaces  | `[~]$ ip addr`                              |
| ip addr add      | Assigns an IP address to a specific interface | `[~]$ ip addr add 192.168.1.10/24 dev eth0` |
| ip route / route | Views the routing table                       | `[~]$ route`                                |
| ip route add     | Adds a new entry to the routing table         | `ip route add default via 192.168.2.1`      |

> [!important]
> **Warning**
>
> Remember that changes made using these commands are temporary and will be lost after a system restart. To ensure persistence, update the appropriate configuration files (e.g., /etc/network/interfaces on Linux).

By understanding these fundamentals, you now have the tools necessary for setting up and troubleshooting basic networks. For more in-depth information, consider exploring further [networking documentation](https://www.kernel.org/doc/html/latest/networking/index.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/beae84be-64d2-41b6-b807-575f4107dfc9/lesson/a453eeae-dad3-4c45-b821-54e9522efb50)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/beae84be-64d2-41b6-b807-575f4107dfc9/lesson/882728fb-a94b-43b0-bd4b-88da8e5882d6)**
>
> Practice lab
