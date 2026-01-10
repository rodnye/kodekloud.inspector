# Configure Networking and Ports - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Deploy-a-Single-Datacenter/Configure-Networking-and-Ports)

---

## Table of Contents

- Configure Networking and Ports
  - Default Consul Ports
  - DNS Port Considerations
  - bind_addr vs. advertise_addr
  - Additional Resources
  - Watch Video
    - Redirecting DNS Traffic with iptables
    - Example: NAT Scenario

---

## Content

HashiCorp Certified: Consul Associate Certification

Deploy a Single Datacenter

# Configure Networking and Ports

In this guide, you’ll learn how to set up Consul’s network addresses and ports so that both internal agents and external clients can communicate reliably. Whether you have a single network interface or a complex NAT topology, these settings ensure that your Consul cluster remains accessible and secure.

## Default Consul Ports

Consul exposes several ports by default. Ensure that clients and applications can reach these ports on every node:

| Interface     | Protocol | Port | Purpose                       |
| ------------- | -------- | ---- | ----------------------------- |
| HTTP API      | TCP      | 8500 | RESTful HTTP API              |
| LAN gossip    | TCP/UDP  | 8301 | Cluster membership and gossip |
| DNS interface | TCP/UDP  | 8600 | Service discovery via DNS     |

![The image provides instructions on configuring Consul network addresses and ports, emphasizing DNS settings and the need to avoid running Consul as a root user.](https://kodekloud.com/kk-media/image/upload/v1752877801/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Configure-Networking-and-Ports/consul-network-configuration-dns-settings.jpg)

## DNS Port Considerations

By default, Consul listens on port 8600 for DNS queries. In environments where DNS is restricted to UDP/TCP port 53, it’s better to redirect traffic rather than run Consul as root.

> [!important]
> **Warning**
>
> Binding to ports below 1024 requires root privileges. Instead, redirect DNS requests with `iptables`, `firewalld`, or `dnsmasq` to maintain security.

### Redirecting DNS Traffic with iptables

```
# Redirect UDP port 53 to Consul’s 8600
sudo iptables -t nat -A PREROUTING -p udp --dport 53 -j REDIRECT --to-ports 8600


# Redirect TCP port 53 to Consul’s 8600
sudo iptables -t nat -A PREROUTING -p tcp --dport 53 -j REDIRECT --to-ports 8600
```

## bind_addr vs. advertise_addr

Consul uses two key settings for network configuration:

- **bind_addr**: The local network interface on which Consul listens for cluster communications (gossip, RPC).
- **advertise_addr**: The address other agents and external clients use to reach this node.

On a system with a single NIC, both can point to the same IP. In a multi-interface or NAT setup, bind to the private interface and advertise the public-facing IP.

![The image is a slide about configuring Consul network addresses and ports, explaining the use of the `-bind` and `-advertise` interfaces, and their relevance for Consul server agent nodes with multiple interfaces or behind a NAT device.](https://kodekloud.com/kk-media/image/upload/v1752877802/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Configure-Networking-and-Ports/consul-network-addresses-configuration-slide.jpg)

### Example: NAT Scenario

Imagine a Consul server behind NAT:

- Private interface (LAN gossip/RPC): `10.0.4.56`
- Public (NAT) address: `10.0.9.32`

Use a `config.hcl` like this:

```
bind_addr      = "10.0.4.56"
advertise_addr = "10.0.9.32"
```

With these settings:

- The agent listens on `10.0.4.56` for internal cluster traffic.
- Other agents and clients connect to `10.0.9.32`.

## Additional Resources

- [Consul Networking](https://www.consul.io/docs/agent/options#networking)
- [Consul Service Discovery](https://www.consul.io/docs/discovery)
- [iptables Documentation](https://linux.die.net/man/8/iptables)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/a1f79019-1fbb-4b11-8935-0f09bdc9da3c/lesson/4d6e0f75-3b6c-47ab-a332-0b39d73be685)**
>
> Watch video content
