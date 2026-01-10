# Network Traffic and Ports - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Explain-Consul-Architecture/Network-Traffic-and-Ports)

---

## Table of Contents

- Network Traffic and Ports
  - Default Ports
  - DNS Considerations
  - Network Diagram
  - Accessing Consul Interfaces
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Explain Consul Architecture

# Network Traffic and Ports

Consul relies on HTTP/HTTPS for all cluster communications, secured by TLS certificates or a gossip encryption key. This guide covers default ports, DNS workaround strategies, and best practices for securing Consul network traffic.

## Default Ports

| Port (TCP/UDP)    | Purpose                                        | Protocol   | Notes                                  |
| ----------------- | ---------------------------------------------- | ---------- | -------------------------------------- |
| 8500 (TCP)        | API requests & UI access                       | HTTP/HTTPS | TLS enforced                           |
| 8301 (TCP/UDP)    | LAN gossip between servers & clients           | Gossip     | Must be open on every node             |
| 8302 (TCP/UDP)    | WAN gossip between data-center servers         | Gossip     | Server-to-server across data centers   |
| 8300 (TCP)        | Internal RPC forwarding                        | RPC        |                                        |
| 8600 (TCP/UDP)    | DNS interface for service discovery queries    | DNS        | Non-standard DNS port (not 53)         |
| 21000–21255 (TCP) | Sidecar proxy (Envoy) ports for Connect & mesh | HTTP       | Configurable range for service proxies |

## DNS Considerations

Queries to Consul’s DNS interface use port 8600 by default. To integrate with standard DNS port 53:

- **BIND or dnsmasq:** Run locally on each node to forward 53 → 8600.
- **Elevated privileges:** Binding to ports < 1024 (e.g., 53) on Linux requires root access.
- **AWS Route 53 Resolver:** Define forwarding rules that include port 8600.
- **Central DNS infrastructure:** Handle port translation upstream in your DNS servers.

> [!important]
> **Warning**
>
> Binding Consul to port 53 on Linux requires root privileges, increasing security risk. Use DNS proxies like BIND or dnsmasq instead.

## Network Diagram

Below is a high-level topology for a three-node Consul server cluster, client connections, and a federated data center:

![The image is a diagram illustrating network traffic and ports for a Consul setup, showing client traffic, cross datacenter traffic, and various ports used for Consul API, DNS, and gossip protocols.](https://kodekloud.com/kk-media/image/upload/v1752877847/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Network-Traffic-and-Ports/consul-network-traffic-ports-diagram.jpg)

1.  LAN Gossip (TCP/UDP 8301) between all clients and servers
2.  RPC (TCP 8300) for internal procedure calls
3.  API/UI (TCP 8500) for client queries and UI access
4.  DNS (TCP/UDP 8600) for service discovery lookups
5.  WAN Gossip (TCP/UDP 8302) between data-center server nodes

## Accessing Consul Interfaces

Consul offers three primary interfaces:

| Interface | Use Case                                    | Port | Notes                                      |
| --------- | ------------------------------------------- | ---- | ------------------------------------------ |
| API       | Programmatic service & configuration access | 8500 | TLS secured                                |
| CLI       | Local `consul` commands                     | N/A  | Non-leader nodes forward RPC to the leader |
| UI        | Web-based cluster monitoring                | 8500 | Enable via `ui = true` in configuration    |

> [!important]
> **Note**
>
> Ensure API and UI endpoints are restricted via firewall rules. Avoid exposing these directly to the Internet unless through secured mesh gateways.

## Links and References

- [Consul HTTP API](https://www.consul.io/api)
- [Consul Service Discovery](https://www.consul.io/docs/discovery)
- [Envoy Proxy for Consul Connect](https://www.envoyproxy.io)
- [BIND DNS Documentation](https://www.isc.org/bind/)
- [Terraform Consul Provider](https://registry.terraform.io/providers/hashicorp/consul)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/bb95f43b-3acb-4ce2-88ae-0c79beb3e569/lesson/12766b34-e8a7-4932-ad60-f7f4f154306d)**
>
> Watch video content
