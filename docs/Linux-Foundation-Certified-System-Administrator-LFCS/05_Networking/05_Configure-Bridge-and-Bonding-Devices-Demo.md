# Configure Bridge and Bonding Devices Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Networking/Configure-Bridge-and-Bonding-Devices-Demo)

---

## Table of Contents

- Configure Bridge and Bonding Devices Demo
  - Inspecting the Bridge Example
  - Copying and Securing the Configuration File
  - Identifying Network Interfaces
  - Editing the Netplan File for Bridging
  - Reverting the Bridge Configuration
  - Configuring Network Bonding
  - Managing Bonded Interfaces
  - Watch Video
    - Viewing Bond Details

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Networking

# Configure Bridge and Bonding Devices Demo

In this lesson, you will learn how to bridge and bond network interfaces using Netplan on Ubuntu. We’ll start by exploring example YAML configuration files, then modify them to suit your network configuration. This guide is perfect for network administrators looking to optimize connectivity using bridges and bonded devices.

## Inspecting the Bridge Example

Begin by reviewing the example bridge configuration file located at `/usr/share/doc/netplan/examples/bridge.yaml`:

```
jeremy@kodekloud:~$ ls /usr/share/doc/netplan/examples/
bonding_router.yaml  bonding.yaml  bridge_vlan.yaml  bridge.yaml  dhcp_wired8021x.yaml  dhcp.yaml  direct_connect_gateway_ipv6.yaml  direct_connect_gateway.yaml  dummy-devices.yaml  infiniband.yaml  ipv6_tunnel.yaml  loopback_interface.yaml  modem.yaml  network_manager.yaml  offload.yaml  openvswitch.yaml  route_metric.yaml  source_routing.yaml  sriov_vlan.yaml  sriov.yaml  static_multiaddress.yaml  static_singlenci_multiip_multigateways.yaml  static.yaml  virtual-ethernet.yaml  vlan.yaml  vrf.yaml  vxlan.yaml  windows_dhcp_server.yaml  wireguard.yaml  wireless_adhoc.yaml  wireless_wpa3.yaml  wireless.yaml  wpa3_enterprise.yaml  wpa_enterprise.yaml


jeremy@kodekloud:~$ cat /usr/share/doc/netplan/examples/bridge.yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      dhcp4: no
  bridges:
    br0:
      dhcp4: yes
      interfaces:
        - enp3s0
```

This configuration defines a single Ethernet interface (`enp3s0`) with DHCP disabled, and a bridge (`br0`) that obtains an IP address via DHCP. This file serves as our starting template.

> [!important]
> **Note**
>
> Before making any modifications, verify that the network interfaces referenced in the configuration match your system’s hardware.

## Copying and Securing the Configuration File

Copy the example file to the Netplan configuration directory and set secure permissions:

```
jeremy@kodekloud:~$ sudo cp /usr/share/doc/netplan/examples/bridge.yaml /etc/netplan/99-bridge.yaml
[sudo] password for jeremy:
jeremy@kodekloud:~$ sudo chmod 600 /etc/netplan/99-bridge.yaml
```

## Identifying Network Interfaces

Determine the network interface names in your system with:

```
jeremy@kodekloud:~$ ip -c link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 100
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:03:bc:00 brd ff:ff:ff:ff:ff:ff
3: enp0s8: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 08:00:27:d2:01:dd brd ff:ff:ff:ff:ff:ff
4: enp0s9: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 08:00:27:ea:bb:00 brd ff:ff:ff:ff:ff:ff
```

Note that `enp0s3` is used for primary connectivity (e.g., SSH access) and should not be modified to avoid disconnection. In this lesson, we will use `enp0s8` and `enp0s9` for the bridge.

## Editing the Netplan File for Bridging

Update the Netplan configuration to create a bridge that combines `enp0s8` and `enp0s9`. Disable DHCP on the individual Ethernet interfaces and enable it solely on the bridge:

```
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s8:
      dhcp4: no
    enp0s9:
      dhcp4: no
  bridges:
    br0:
      dhcp4: yes
      interfaces:
        - enp0s8
        - enp0s9
```

Save the file and apply the configuration. Verify the network interface statuses with:

```
jeremy@kodekloud:~$ ip -c link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 100
   link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000
   link/ether 08:00:27:03:bc:2f brd ff:ff:ff:ff:ff:ff
3: enp0s8: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast master br0 state UP mode DEFAULT group default qlen 1000
   link/ether 08:00:27:f4:ce:41 brd ff:ff:ff:ff:ff:ff
4: enp0s9: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast master br0 state UP mode DEFAULT group default qlen 1000
   link/ether 08:00:27:19:88:7f brd ff:ff:ff:ff:ff:ff
5: br0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DEFAULT group default qlen 1000
   link/ether 8a:93:4f:ea:fb:f2 brd ff:ff:ff:ff:ff:ff
```

This output shows that `enp0s8` and `enp0s9` are now slaves to the bridge `br0`, which is assigned an IP address via DHCP.

## Reverting the Bridge Configuration

To remove the bridge configuration and free up the network interfaces, simply delete the YAML file and remove the bridge interface:

```
sudo ip link delete br0
```

> [!important]
> **Tip**
>
> For a complete reset of network settings in a production environment, consider rebooting the system after deleting the configuration.

## Configuring Network Bonding

Next, let’s configure network bonding to provide redundancy and load balancing. Begin by copying the bonding example file and setting secure permissions:

```
sudo cp /usr/share/doc/netplan/examples/bonding.yaml /etc/netplan/99-bond.yaml
sudo chmod 600 /etc/netplan/99-bond.yaml
```

Edit the bonding configuration file (`/etc/netplan/99-bond.yaml`) using your favorite text editor. The corrected configuration below ensures that the Ethernet interfaces are properly defined:

```
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s8:
      dhcp4: no
    enp0s9:
      dhcp4: no
  bonds:
    bond0:
      dhcp4: yes
      interfaces:
        - enp0s8
        - enp0s9
      parameters:
        mode: active-backup
        primary: enp0s8
        mii-monitor-interval: 100
```

In this configuration:

- The Ethernet interfaces `enp0s8` and `enp0s9` have DHCP disabled.
- A bond named `bond0` is configured with DHCP enabled.
- The bonding mode is set to active-backup (Mode 1) with `enp0s8` designated as the primary interface.
- The MII monitor checks link status every 100 milliseconds.

For additional bonding modes (such as balance-rr, balance-xor, broadcast, 802.3ad, balance-tlb, or balance-alb), review the bonding documentation and adjust the parameters accordingly.

> [!important]
> **Documentation Tip**
>
> For a deeper understanding of the bonding options and Netplan configuration, consult the manual by running:
>
> sudo man netplan
>
> Then search for "bonding" within the manual.

Apply the new Netplan configuration:

```
sudo netplan apply
```

After applying the changes, confirm the bonding setup with:

```
jeremy@kodekloud:~$ ip -c link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 100
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:0a:bc:7c brd ff:ff:ff:ff:ff:ff
3: enp0s8: <BROADCAST,MULTICAST,SLAVE,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast master bond0 state UP mode DEFAULT group default qlen 1000
    link/ether 2a:df:84:09:1a:e1 brd ff:ff:ff:ff:ff:ff
4: enp0s9: <BROADCAST,MULTICAST,SLAVE,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast master bond0 state UP mode DEFAULT group default qlen 1000
    link/ether 2a:df:84:09:1a:e1 brd ff:ff:ff:ff:ff:ff
5: bond0: <BROADCAST,MULTICAST,MASTER,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DEFAULT group default qlen 1000
    link/ether 2a:df:84:09:1a:e1 brd ff:ff:ff:ff:ff:ff
```

This output indicates that both `enp0s8` and `enp0s9` are slaves of `bond0`, which is receiving its IP configuration via DHCP.

### Viewing Bond Details

To inspect the bond’s details, read the bond status file:

```
cat /proc/net/bonding/bond0
```

This file provides comprehensive information about the bond’s parameters and operating status.

## Managing Bonded Interfaces

Bonded interfaces can be managed like regular Ethernet interfaces. For example, to bring the bond interface down and assign a static IP address, use:

```
sudo ip link set dev bond0 down
sudo ip addr add 10.0.0.9/24 dev bond0
```

> [!important]
> **Important**
>
> Changes made with the IP command are temporary and will be reset after a system reboot.

Thank you for following this tutorial. Happy networking, and see you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/2ba92913-296b-481d-af2d-6710bf3f7cdd/lesson/1c101353-86c6-4fc2-883a-874fbc94ccc1)**
>
> Watch video content
