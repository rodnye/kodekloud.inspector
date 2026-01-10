# Configure IPv4 and IPv6 Networking and Hostname Resolution Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Networking/Configure-IPv4-and-IPv6-Networking-and-Hostname-Resolution-Demo)

---

## Table of Contents

- Configure IPv4 and IPv6 Networking and Hostname Resolution Demo
  - Viewing Network Interfaces
  - Activating an Interface
  - Manually Adding IP Addresses
  - Removing IP Addresses and Deactivating an Interface
  - Making Permanent Changes with Netplan
  - Creating a New Netplan Configuration File
  - Adding DNS Resolvers and Routes in Netplan
  - Configuring Local Hostname Resolution
  - Additional Tips and Resources
  - Conclusion
  - Watch Video

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Networking

# Configure IPv4 and IPv6 Networking and Hostname Resolution Demo

In this lesson, you'll learn how to configure network settings on an Ubuntu machine. We will explore network interfaces and addresses using the ip command and then apply permanent changes with Netplan. Detailed command outputs and sample configuration files are provided throughout.

---

## Viewing Network Interfaces

The ip command displays comprehensive details about your network configuration. For example, running:

```
ip link
```

displays all the network interfaces on your system. Physical devices (such as Ethernet and wireless cards) and virtual interfaces are shown. The loopback interface (lo) is virtual and used for local communication (e.g., connecting to a database on 127.0.0.1), while an interface like enp0s3 represents a physical Ethernet adapter.

To view IP addresses assigned to the interfaces, you can use either:

```
ip addr
```

or the shorthand version:

```
ip a
```

A sample output may look like this:

```
jeremy@kodelkoud:~$ ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host noprefixroute
       valid_lft forever preferred_lft forever
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 08:00:27:3a:7b:de brd ff:ff:ff:ff:ff:ff
    inet 10.0.0.201/24 metric 100 brd 10.0.0.255 scope global dynamic enp0s3
       valid_lft 171723sec preferred_lft 171723sec
    inet6 2601:1c0:5400:71b0::c56f/128 scope global dynamic noprefixroute
       valid_lft 344588sec preferred_lft 344588sec
    inet6 2601:1c0:5400:71b0:0:a0:27f:fe3a:7bde/64 scope global dynamic mngtmpaddr noprefixroute
       valid_lft 300sec preferred_lft 300sec
3: enp0s8: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether 08:00:27:5a:01:1f brd ff:ff:ff:ff:ff:ff
```

Notice that the third interface (enp0s8) is marked as DOWN since it does not have an IP address assigned. You can also highlight important details of the output by using the -c (color) option. However, ensure that you place the -c option in the middle of the command. For example:

```
jeremy@kodekloud:~$ ip -c addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host noprefixroute
       valid_lft forever preferred_lft forever

2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 08:00:27:3b:7e:de brd ff:ff:ff:ff:ff:ff
    inet 10.0.0.201/24 metric 100 brd 10.0.0.255 scope global dynamic enp0s3
       valid_lft 171707sec preferred_lft 171707sec
    inet6 2601:1c0:5400:71b0::c56f/128 scope global dynamic noprefixroute
       valid_lft 344577sec preferred_lft 344577sec
    inet6 2601:1c0:5400:71b0:a00:27ff:fe3a:7bde/64 scope global dynamic mngtmpaddr noprefixroute
       valid_lft 299sec preferred_lft 299sec
    inet6 fe80::a00:27ff:fe3a:7bde/64 scope link
       valid_lft forever preferred_lft forever

3: enp0s8: <BROADCAST,MULTICAST>
    link/ether 08:00:27:5a:01:1f brd ff:ff:ff:ff:ff:ff
    inet 10.0.0.201/24 metric 100 brd 10.0.0.255 scope global dynamic enp0s3
       valid_lft 171707sec preferred_lft 171707sec
```

Here, the interface enp0s8 remains clearly marked as DOWN due to the absence of an IP address.

---

## Activating an Interface

To activate an inactive interface (for example, enp0s8), run the following command:

```
sudo ip link set dev enp0s8 up
```

This command performs the following steps:

1.  Specifies the link device.
2.  Uses the `set` parameter to configure a property.
3.  Identifies the device using `dev`.
4.  Applies the action of bringing the interface UP.

After executing the command and re-checking the IP addresses, the interface should be reported as UP and might receive an IPv6 address automatically. A typical session might look like:

```
jeremy@kodekloud:~$ ip -c addr
Command "-c" is unknown, try "ip address help".
jeremy@kodekloud:~$ sudo ip link set dev enp0s8 up
[sudo] password for jeremy:
jeremy@kodekloud:~$ ip -c addr
```

---

## Manually Adding IP Addresses

You can manually assign IP addresses to an interface. For example, to add an IPv4 address to enp0s8:

```
sudo ip addr add 10.0.0.40/24 dev enp0s8
```

This command sets the IPv4 address 10.0.0.40 with a /24 subnet mask on enp0s8.

Similarly, to add an IPv6 address, run:

```
sudo ip addr add fe80::921b:eff:fe3d:abcd/64 dev enp0s8
```

After these commands are executed, running `ip -c addr` will confirm that the addresses have been added. Remember, an interface can have multiple IP addresses.

---

## Removing IP Addresses and Deactivating an Interface

To remove an IP address (for example, an IPv6 address) and then bring the interface down, use the following commands:

```
sudo ip addr delete fe80::5054:ff:fe1f:8050/64 dev enp0s8
sudo ip link set dev enp0s8 down
```

Keep in mind that changes made using the ip command are temporary and will be lost upon reboot. The ip command is typically used for testing new configurations or troubleshooting existing settings.

---

## Making Permanent Changes with Netplan

Permanent network configurations on Ubuntu Server are managed by Netplan. Netplan reads configuration files from the `/etc/netplan` directory and instructs lower-level networking services (such as systemd-networkd) to configure the system.

To view the current Netplan configuration, run:

```
sudo netplan get
```

A sample output might be:

```
network:
  version: 2
  ethernets:
    enp0s3:
      dhcp4: true
```

You can then list the configuration files in the Netplan directory with:

```
ls /etc/netplan
```

For example, you may see a file named `50-cloud-init.yaml`. To view its contents, use:

```
sudo cat /etc/netplan/50-cloud-init.yaml
```

---

## Creating a New Netplan Configuration File

When configuring a different Ethernet device (such as enp0s8) with static IP settings, it's a good practice to create a new configuration file. Files are processed in alphabetical order, so prefixing your file with a number like `99` ensures it is applied last. Here’s an example configuration:

```
network:
  ethernets:
    enp0s8:
      dhcp4: false
      dhcp6: false
      addresses:
        - 10.0.0.9/24
        - fe80::921b:eff:fe3d:abcd/64
  version: 2
```

Ensure you maintain proper indentation in YAML. The hyphen (`-`) indicates a list element; additional properties should be indented correctly.

To apply the new configuration, you have two options. A safe method is to try the configuration first:

```
sudo netplan try
```

This command initiates a countdown and will revert the changes if you do not confirm by pressing ENTER before the timeout expires. You may also specify a shorter timeout using the `--timeout` option. If a mistake is made, press Ctrl+C to cancel.

> [!important]
> **Warning**
>
> If you see a warning like:
>
> Permissions for /etc/netplan/99-mysettings.yaml are too open. Netplan configuration should NOT be accessible by others.
>
> Then adjust the file permissions with:
>
> ```
> sudo chmod 600 /etc/netplan/99-mysettings.yaml
> ```

---

## Adding DNS Resolvers and Routes in Netplan

You can further customize your network settings in Netplan by adding DNS resolvers and network routes. Here’s an example configuration to set custom DNS servers for enp0s8 and define routes:

```
network:
  ethernets:
    enp0s8:
      dhcp4: false
      dhcp6: false
      addresses:
        - 10.0.0.9/24
        - fe80::921b:eff:fe3d:abcd/64
      nameservers:
        addresses:
          - 8.8.4.4
          - 8.8.8.8
      routes:
        - to: 192.168.0.0/24
          via: 10.0.0.100
        - to: default
          via: 10.0.0.1
  version: 2
```

In this example, the `nameservers` block specifies Google's public DNS servers. The `routes` block includes:

- A specific route directing traffic for the 192.168.0.0/24 network via 10.0.0.100.
- A default route directing all other traffic via 10.0.0.1.

Apply these settings using:

```
sudo netplan try
```

After confirmation, verify the network routes with:

```
ip route
```

You might see output similar to:

```
default via 10.0.0.1 dev enp0s8 proto static
default via 10.0.0.1 dev enp0s3 proto dhcp src 10.0.0.201 metric 100
10.0.0.0/24 dev enp0s8 proto kernel scope link src 10.0.0.9
10.0.0.0/24 dev enp0s3 proto kernel scope link src 10.0.0.201 metric 100
192.168.0.0/24 via 10.0.0.100 dev enp0s8 proto static
```

To check the configured DNS resolvers, run:

```
resolvectl status
```

If you prefer setting global resolvers, edit `/etc/systemd/resolved.conf` by uncommenting the DNS line and adding your desired DNS addresses:

```
DNS=1.1.1.1 9.9.9.9
```

Then restart the resolver service:

```
sudo systemctl restart systemd-resolved.service
```

Verify the updated global DNS configuration with:

```
resolvectl status
resolvectl dns
```

---

## Configuring Local Hostname Resolution

For local hostname resolution without relying on external DNS servers, update the `/etc/hosts` file. For example, to associate the hostname "dbserver" with the IP address 127.0.123.123, add the following line:

```
127.0.123.123 dbserver
```

After saving the file, test the configuration with:

```
ping dbserver
```

You should see output similar to:

```
PING dbserver (127.0.123.123) 56(84) bytes of data.
64 bytes from dbserver (127.0.123.123): icmp_seq=1 ttl=64 time=0.055 ms
```

To map a complex hostname (for testing purposes), for example directing "example.com" to 1.2.3.4, add:

```
1.2.3.4 example.com
```

---

## Additional Tips and Resources

Netplan YAML files are designed for readability, but they require careful attention to format. If you need further assistance, consult the manual pages:

```
man netplan
```

To search within the manual, use `/address` or `/default routes` and then press "n" to navigate through the results.

Example configurations are also provided in `/usr/share/doc/netplan/examples`. Consider these examples:

- **DHCP Configuration Example:**

  ```
  jeremy@kodekloud:~$ cat /usr/share/doc/netplan/examples/dhcp.yaml
  network:
    version: 2
    renderer: networkd
    ethernets:
      enp3s0:
        dhcp4: true
  ```

- **Static Configuration Example:**

  ```
  jeremy@kodekloud:~$ cat /usr/share/doc/netplan/examples/static.yaml
  network:
    version: 2
    renderer: networkd
    ethernets:
      enp3s0:
        addresses:
          - 10.10.10.2/24
        nameservers:
          search: [mydomain, otherdomain]
          addresses: [10.10.10.1, 1.1.1.1]
        routes:
          - to: default
            via: 10.10.10.1
  ```

You can list the contents of the documentation directory with:

```
ls /usr/share/doc
```

---

## Conclusion

In this lesson, you learned how to discover and modify network settings using the ip command and how to implement permanent changes with Netplan. Topics covered include configuring IPv4 and IPv6 addresses, setting DNS resolvers, defining custom network routes, and mapping hostnames locally via the /etc/hosts file. With these tools, you are well-equipped to troubleshoot and configure network interfaces on Ubuntu systems.

Now, let's jump ahead to the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/2ba92913-296b-481d-af2d-6710bf3f7cdd/lesson/8ba863e9-3bc2-4ab2-97b5-51e946de0805)**
>
> Watch video content
