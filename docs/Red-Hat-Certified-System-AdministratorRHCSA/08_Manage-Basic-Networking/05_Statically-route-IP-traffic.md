# Statically route IP traffic - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Manage-Basic-Networking/Statically-route-IP-traffic)

---

## Table of Contents

- Statically route IP traffic
  - Adding Static Routes
  - Making Routes Permanent
  - Conclusion
  - Watch Video

---

## Content

Red Hat Certified System Administrator(RHCSA)

Manage Basic Networking

# Statically route IP traffic

In this guide, we explain how to configure static IP routing on a Linux system, enabling communication between distinct networks. This tutorial is particularly useful in scenarios where you have separate networks that require interconnectivity using a dedicated routing device.

Imagine two computers, Computer A and Computer B, each connected to its own network—Network 1 and Network 2, respectively. By default, these computers cannot communicate with each other because they reside on isolated networks. Now, consider introducing a third computer, Computer C, which is physically connected to both networks by having two IP addresses (one on each network). Computer C can effectively act as a router to forward data packets between the two networks.

Even after interconnecting the networks via Computer C, Computer A will be unaware of how to reach hosts on Network 2 (for example, 192.168.0.1) without proper route configuration. To bridge the communication gap, you need to add a static route on Computer A. Suppose Computer A has an IP address of 10.0.0.1, and you need to reach the network 192.168.0.0/24. You can specify that packets destined for that network should go through the gateway at 10.0.0.100, which is Computer C's IP address on the interface connected to Network 1. Remember to update these IP addresses to match your actual network configuration.

## Adding Static Routes

You can add a static route using the following command:

```
sudo ip route add 192.168.0.0/24 via 10.0.0.100
```

If your system hosts multiple network interfaces, it is advisable to specify which interface should be used. For example, if your interface is named `enp0s3`, modify the command accordingly:

```
sudo ip route add 192.168.0.0/24 via 10.11.12.100 dev enp0s3
```

To remove an existing route, use the delete directive. Additionally, you might want to add a default route that directs all traffic for unknown networks to a designated gateway—here, 10.0.0.100. If a packet is destined for an IP such as 1.2.3.4 with no specific route found, the system will consult the default route to determine how to forward the packet.

Below are the commands for route manipulation:

```
sudo ip route add 192.168.0.0/24 via 10.0.0.100
sudo ip route add 192.168.0.0/24 via 10.11.12.100
sudo ip route add 192.168.0.0/24 via 10.11.12.100 dev enp0s3
sudo ip route del 192.168.0.0/24
sudo ip route add default via 10.0.0.100
sudo ip route del default via 10.0.0.100
```

> [!important]
> **Note**
>
> Routes added using the ip command are temporary and will be lost after a reboot. This method is ideal for immediate testing and verification of new routing configurations.

## Making Routes Permanent

To ensure that your routing configurations persist after a reboot, integrate them into your system's network configuration. Start by identifying the active NetworkManager connection using the following command:

```
sudo nmcli connection show
```

An example output might look like:

```
NAME    UUID                                  TYPE      DEVICE
enp0s3  fadff03a-8b55-4b81-b582-3e84b50fa8f5  ethernet  enp0s3
```

Once you've identified the active connection (in this case, named `enp0s3`), add a persistent route to direct all traffic destined for the network 192.168.0.0/24 through Computer C at 10.0.0.100.

Keep in mind that NetworkManager will not automatically apply these changes until you either reboot or manually reload the connection settings. To update the settings immediately, run:

```
sudo nmcli connection reload
```

Alternatively, you can use the interactive text user interface provided by nmtui:

```
sudo nmtui
```

Using nmtui, select the desired connection, navigate to the routing configuration section, add the required route, and then reapply the connection settings to activate your changes.

> [!important]
> **Reminder**
>
> Persistent routing configurations vary depending on your Linux distribution. Consult your distribution’s documentation for specific instructions if adjustments are needed.

## Conclusion

This article has covered both temporary and permanent methods of configuring static IP routes in Linux. We discussed how to add and delete routes using the `ip` command for quick testing, as well as how to make changes permanent by updating NetworkManager settings. These techniques are essential for managing inter-network communication in complex deployments.

We hope this guide on Linux networking aids in your system configuration and enhances your understanding of static routing.

For further reading, please explore these resources:

- [Linux Networking Documentation](https://www.kernel.org/doc/html/latest/networking/)
- [NetworkManager Documentation](https://developer.gnome.org/NetworkManager/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/5f16da06-6c71-4058-bfc5-6f4dd8754e9f/lesson/cda0a65f-94fe-4889-8da3-69cbb84d95f9)**
>
> Watch video content
