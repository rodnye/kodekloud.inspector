# Configure Bridge and Bonding Devices Theory - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Networking/Configure-Bridge-and-Bonding-Devices-Theory)

---

## Table of Contents

- Configure Bridge and Bonding Devices Theory
  - Bridging Network Devices
  - Bonding Network Devices
  - Bonding Modes in Linux
  - Bridging versus Bonding
  - Additional Resources
  - Watch Video

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Networking

# Configure Bridge and Bonding Devices Theory

In this lesson, we explore two essential networking techniques: bridging and bonding. Both approaches allow multiple network devices to be combined into a single virtual device managed by the operating system, yet they serve distinct purposes for network connectivity and performance.

Bridging connects two or more separate networks, enabling devices on different segments to communicate as though they were on the same network. In contrast, bonding aggregates multiple network connections into a single logical interface to enhance throughput, resiliency, or both.

![The image illustrates the concepts of "Bridge" and "Bond" in networking, showing how network interfaces connect to networks and servers. The "Bridge" section connects two networks to multiple servers, while the "Bond" section connects a single network to multiple servers.](https://kodekloud.com/kk-media/image/upload/v1752881286/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-Bridge-and-Bonding-Devices-Theory/bridge-bond-networking-concepts.jpg)

Below, we provide a detailed explanation of bridging and bonding, supported by diagrams that clarify these fundamental concepts.

---

## Bridging Network Devices

When you bridge two or more network devices, a virtual bridge is created that interconnects them. This virtual bridge allows computers on different physical networks to communicate seamlessly, just as if they were on the same network.

Consider a server with two network interfaces (or network cards) connected via cables to different networks. By adding these interfaces to a bridge, devices on either network can interact without additional routing. In Linux, this virtual device is simply called a **bridge**, and each network interface attached to the bridge is known as a **port**.

![The image is a diagram explaining a network bridge, showing how a server connects two separate networks (Network 1 and Network 2) through network interfaces.](https://kodekloud.com/kk-media/image/upload/v1752881287/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-Bridge-and-Bonding-Devices-Theory/network-bridge-diagram-server-connection.jpg)

---

## Bonding Network Devices

Bonding combines multiple physical network devices into one logical interface. This configuration provides several benefits:

1.  **Resilience:** Maintains connectivity even if one network interface fails.
2.  **Increased Throughput:** Aggregates multiple network cards to achieve higher data transfer speeds.
3.  **Enhanced Reliability:** Offloads traffic to available interfaces if one experiences a slowdown.

Imagine a server with two network interfaces connected to the same network. Without bonding, Linux treats these interfaces as separate connections, and an application must select one. If that interface fails, connectivity is lost. With bonding, however, the system presents the two interfaces as a single virtual interface (or bond). Should one connection fail, Linux automatically switches to the other to ensure continuous connectivity.

![The image explains a network bond, showing a server with two network interfaces connected to a network to increase throughput.](https://kodekloud.com/kk-media/image/upload/v1752881289/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-Bridge-and-Bonding-Devices-Theory/network-bond-server-interfaces-diagram.jpg)

![The image explains a network bond, showing two network interfaces connected to a network, with one interface marked as inactive and the other as active.](https://kodekloud.com/kk-media/image/upload/v1752881289/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-Bridge-and-Bonding-Devices-Theory/network-bond-active-inactive-interfaces.jpg)

From an application's perspective, bonding simplifies configuration by representing multiple physical connections as a single network interface.

---

## Bonding Modes in Linux

Linux supports several bonding modes (Mode 0 through Mode 6). Choosing the correct mode allows you to tailor your bond configuration for optimal performance, load balancing, and redundancy.

- **Mode 0 (Round Robin):**  
  Data packets are transmitted sequentially across the interfaces.  
  ![The image illustrates a Linux bonding mode setup, specifically Mode 0 (Round-robin), showing a server connected to two network interfaces. It features the Linux mascot and is labeled "Bridge and Bond" by KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752881290/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-Bridge-and-Bonding-Devices-Theory/linux-bonding-mode-0-bridge-bond.jpg)
- **Mode 1 (Active Backup):**  
  Only one interface is active while the others act as backups that take over if the active connection fails.  
  ![The image illustrates a network bonding mode (active-backup) with a Linux penguin mascot, showing a server connected to two network interfaces, where one is active and the other is a backup.](https://kodekloud.com/kk-media/image/upload/v1752881291/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-Bridge-and-Bonding-Devices-Theory/network-bonding-active-backup-linux.jpg)
- **Mode 2 (XOR):**  
  Selects the interface based on the source and destination of the data packet, ensuring that identical connections use the same interface.
- **Mode 3 (Broadcast):**  
  Transmits data packets through all interfaces simultaneously.

  ![The image illustrates a Linux bonding mode setup, specifically Mode 2 (XOR), showing a server connected to two network interfaces.](https://kodekloud.com/kk-media/image/upload/v1752881292/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-Bridge-and-Bonding-Devices-Theory/linux-bonding-mode2-xor-setup.jpg)

- **Mode 4 (IEEE 802.3ad):**  
  Uses dynamic link aggregation to combine interfaces, improving throughput.

  ![The image shows a diagram of network bonding modes, specifically Mode 4 (IEEE 802.3ad), with a Linux penguin mascot and icons representing a server and two network interfaces.](https://kodekloud.com/kk-media/image/upload/v1752881293/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-Bridge-and-Bonding-Devices-Theory/network-bonding-mode4-diagram.jpg)

- **Mode 5 (Adaptive Transmit Load Balancing):**  
  Distributes outgoing traffic by selecting the least busy interface.

  ![The image illustrates a network bonding mode (Mode 5: Adaptive Transmit Load Balancing) with a Linux penguin mascot, showing a server connected to two network interfaces.](https://kodekloud.com/kk-media/image/upload/v1752881294/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-Bridge-and-Bonding-Devices-Theory/network-bonding-mode5-linux-penguin.jpg)

- **Mode 6 (Adaptive Load Balancing):**  
  Balances both incoming and outgoing traffic across the bonded interfaces.

  ![The image illustrates network bonding modes, specifically Mode 6 (Adaptive Load Balancing), with a Linux penguin mascot and icons representing a server and network interfaces.](https://kodekloud.com/kk-media/image/upload/v1752881296/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-Bridge-and-Bonding-Devices-Theory/network-bonding-mode6-adaptive-load-balancing.jpg)

Selecting the appropriate bonding mode depends on your network's needs, as each mode balances the tradeoffs between performance, redundancy, and load balancing.

> [!important]
> **Key Insight**
>
> For network deployments, understanding your objectives—whether maximizing throughput or ensuring constant connectivity—will guide your choice between bridging and bonding as well as the specific bonding mode to implement.

---

## Bridging versus Bonding

In summary, bridging and bonding offer different network solutions:

- **Bridging:** Connects two or more separate networks to enable seamless communication among devices as if they were on the same network.
- **Bonding:** Aggregates multiple network connections into a single logical interface to improve overall performance and reliability.

![The image compares "Bridge" and "Bond" network configurations, illustrating how a bridge connects two or more networks, while a bond provides two or more connections to a single network.](https://kodekloud.com/kk-media/image/upload/v1752881298/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-Bridge-and-Bonding-Devices-Theory/bridge-vs-bond-network-configurations.jpg)

These strategies are fundamental tools for network administrators. By implementing bridging and bonding appropriately, you can design networks that are robust, efficient, and adaptable to various operational requirements.

Talented network administrators continually explore these techniques to build resilient and high-performance network infrastructures.

---

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/2ba92913-296b-481d-af2d-6710bf3f7cdd/lesson/10bde95f-1427-4130-8898-2a5a56a9a657)**
>
> Watch video content
