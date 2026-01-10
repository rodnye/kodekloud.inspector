# MacVLAN Network - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/MacVLAN-Network)

---

## Table of Contents

- MacVLAN Network
  - Why Use MACVLAN?
  - 1. Creating a MACVLAN Network
  - 2. MACVLAN Modes
  - 3. Summary of Docker Network Drivers
  - 4. Next Steps
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# MacVLAN Network

Containers typically use network namespaces for isolation, but some legacy applications require direct attachment to the physical LAN. Docker’s MACVLAN driver assigns each container its own MAC address on a virtual interface, making the container appear as a standalone host on your network. This guide covers how to create a MACVLAN network, the available modes, and a comparison of Docker’s built-in network drivers.

## Why Use MACVLAN?

- Direct Layer 2 connectivity with your physical network
- Unique MAC addresses for each container
- Support for legacy applications requiring their own IP on the LAN

> [!important]
> **Note**
>
> Before you begin, ensure the parent interface (`eth0` in these examples) is active and not part of another bridge. You may need to bring it up with `ip link set eth0 up`.

## 1\. Creating a MACVLAN Network

Use the `macvlan` driver when creating a Docker network:

```
docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 \
  my_macvlan_net
```

Parameters:

- `-d macvlan`  
  Selects the MACVLAN driver.
- `--subnet` / `--gateway`  
  Defines the IP range and default gateway on the physical LAN.
- `-o parent=eth0`  
  Binds Docker’s MACVLAN to the host interface `eth0`.
- `my_macvlan_net`  
  Your custom network name.

## 2\. MACVLAN Modes

MACVLAN supports two primary modes for segmenting and isolating traffic:

| Mode                    | Description                                             | Use Case                                               |
| ----------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| Bridge (`bridge`)       | Creates a Layer 2 bridge on the parent interface.       | Simple flat network where all containers share a VLAN. |
| 802.1Q Trunk (`802.1q`) | Tags traffic on a VLAN subinterface (e.g., `eth0.100`). | Segmented VLAN routing and filtering per container.    |

> [!important]
> **Warning**
>
> Your physical switch must support 802.1Q tagging, and the parent interface must be configured as a trunk port to carry multiple VLANs.

## 3\. Summary of Docker Network Drivers

Here’s a quick reference table comparing Docker’s built-in network drivers:

| Driver  | Description                                                                           | Typical Use Case                              |
| ------- | ------------------------------------------------------------------------------------- | --------------------------------------------- |
| none    | Disables all networking for the container.                                            | Security testing, isolated workloads          |
| host    | Shares the host’s network namespace; removes network isolation.                       | High-performance scenarios, monitoring tools  |
| bridge  | Default driver; creates a local L2 bridge on a single host.                           | Single-host deployments, simple microservices |
| overlay | Creates an L3 overlay across multiple hosts (requires a key-value store backend).     | Multi-host Swarm services, cross-node traffic |
| macvlan | Assigns unique MAC addresses for L2 connectivity, available in bridge and VLAN modes. | Legacy apps, direct LAN access                |
| ipvlan  | Operates at L2 but routes at host level for higher scalability in dense networks.     | Large-scale deployments with many endpoints   |

## 4\. Next Steps

Once your MACVLAN network is created, you can launch containers on it:

```
docker run -d --network my_macvlan_net --name webserver nginx
```

Each container will receive an IP from your defined subnet and appear as a physical host on the LAN.

## Links and References

- [Docker Network Drivers](https://docs.docker.com/network/)
- [Linux VLAN Documentation](https://www.kernel.org/doc/Documentation/networking/vlan.txt)
- [Kubernetes CNI MACVLAN Plugin](https://github.com/containernetworking/plugins/tree/main/plugins/main/macvlan)

That concludes this lesson on Docker MACVLAN networks. Advanced multi-VLAN and trunking scenarios will be covered in a future guide.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/05f49e5b-7ee1-451e-9ea3-f11c3f1508a3)**
>
> Watch video content
