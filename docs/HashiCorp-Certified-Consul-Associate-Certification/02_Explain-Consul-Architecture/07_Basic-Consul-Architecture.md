# Basic Consul Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Explain-Consul-Architecture/Basic-Consul-Architecture)

---

## Table of Contents

- Basic Consul Architecture
  - Consul Agent Deployment
  - Agent Operational Modes
  - Consul Data Centers
  - Key Protocols
  - Links and References
  - Watch Video
    - Server Mode
    - Client Mode
    - Dev Mode
    - Single Data Center
    - Multi-Data Center

---

## Content

HashiCorp Certified: Consul Associate Certification

Explain Consul Architecture

# Basic Consul Architecture

In this lesson, we’ll explore the core technical components of Consul: agent deployment patterns, operational modes, data center concepts, and the underlying protocols.

## Consul Agent Deployment

The Consul agent is a lightweight, long-running daemon that enables service discovery, health checking, and key/value storage on any host. Thanks to its platform-agnostic design, you can run the agent in various environments:

| Environment       | Examples                                |
| ----------------- | --------------------------------------- |
| Local             | Laptop                                  |
| On-Premises       | Physical server, VMware, Hyper-V        |
| Public Cloud      | AWS, Azure, GCP                         |
| Virtualized       | VMware VMs, Hyper-V VMs                 |
| Containers        | Docker, Kubernetes pods                 |
| Operating Systems | Linux, macOS, FreeBSD, Solaris, Windows |

Running consistent agent binaries across your infrastructure provides a unified control plane for service registration and health monitoring.

![The image is a diagram titled "Consul Basics," showing the deployment of a Consul agent on various platforms and operating systems, with connections to server, client, and dev mode.](https://kodekloud.com/kk-media/image/upload/v1752877813/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Basic-Consul-Architecture/consul-basics-deployment-diagram.jpg)

## Agent Operational Modes

A single Consul binary supports three modes—**server**, **client**, and **dev**—configured via JSON files or CLI flags at startup.

![The image illustrates "Agent Modes" with a diagram showing a server and multiple clients, each labeled as "Agent." The server is also referred to as "Server Mode," "Server Agent," or "Consul Node," while the client is known as "Client Mode" or "Client Agent."](https://kodekloud.com/kk-media/image/upload/v1752877814/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Basic-Consul-Architecture/agent-modes-server-client-diagram.jpg)

### Server Mode

Consul servers form the cluster’s control plane. Their key responsibilities include:

- **Cluster state & membership**: Track all nodes and maintain a consistent cluster view.
- **Service registry**: Store service entries and respond to DNS/HTTP API queries.
- **Quorum management**: Elect a leader and provide high availability via Raft consensus.
- **Data center gateway**: Forward queries between DCs in multi-DC deployments.

Without a quorum of servers, the Consul cluster cannot operate.

### Client Mode

Client agents run alongside application services (e.g., web servers, databases) and handle:

- **Service registration**: Register local services with the server cluster.
- **Health checks**: Execute and report checks, influencing traffic routing.
- **API forwarding**: Relay DNS/RPC requests to servers.
- **LAN gossip**: Participate in local failure detection and membership updates.
- **Stateless operation**: Join or leave the cluster without persistent state.

### Dev Mode

Dev mode is intended for local testing and demonstrations—**never** production.

> [!important]
> **Warning**
>
> Dev mode uses a single in-memory server without TLS or disk persistence. All data is lost on shutdown.

![The image compares server, client, and dev modes in a system, highlighting their roles and characteristics. It outlines functions like state membership, service registration, and testing/demo usage.](https://kodekloud.com/kk-media/image/upload/v1752877815/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Basic-Consul-Architecture/server-client-dev-modes-comparison.jpg)

## Consul Data Centers

A **data center** in Consul represents a logical cluster co-located in one physical region or network. All members within a DC use the LAN gossip pool for low-latency communication.

### Single Data Center

Key traits:

- One cluster in a single region
- Private network (no public internet)
- LAN gossip only
- Low-latency, high-bandwidth communication

![The image is a comparison chart explaining what a single datacenter is and is not. It lists characteristics such as being single-cluster, private, and having low latency, while contrasting with features like multi-cloud and multiple Consul clusters.](https://kodekloud.com/kk-media/image/upload/v1752877816/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Basic-Consul-Architecture/single-datacenter-comparison-chart.jpg)

### Multi-Data Center

Federated Consul DCs allow cross-DC service discovery and failover. Each DC remains an independent cluster, communicating over WAN gossip or mesh gateways:

- Multi-cloud / multi-region deployments
- Physical DCs in different locations
- Multiple clusters within one site

![The image illustrates a multi-datacenter setup, showing a single datacenter with servers and clients, and connections to other datacenters, including VMware, AWS, Azure, and GCP.](https://kodekloud.com/kk-media/image/upload/v1752877817/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Basic-Consul-Architecture/multi-datacenter-setup-servers-clients.jpg)

Typical scenarios:

- On-prem primary DC with a cloud-based failover DC
- Federated clusters across AWS, GCP, and Azure

![The image is a presentation slide about "Multi-Datacenter," explaining its features such as multi-cloud, Consul cluster federation, and WAN communication. It includes a pixelated design on the right side.](https://kodekloud.com/kk-media/image/upload/v1752877818/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Basic-Consul-Architecture/multi-datacenter-presentation-slide-features.jpg)

## Key Protocols

Consul’s distributed architecture relies on two core protocols:

![The image illustrates key protocols in a network, showing a Gossip Protocol (Serf) connecting servers and clients, and a Consensus Protocol (Raft) linking servers.](https://kodekloud.com/kk-media/image/upload/v1752877819/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Basic-Consul-Architecture/gossip-consensus-protocols-network-illustration.jpg)

| Protocol                                                          | Purpose                                                                        |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Raft](<https://en.wikipedia.org/wiki/Raft_\(computer_science\)>) | Server-only consensus: leader election, log replication, and quorum management |
| [Serf (Gossip)](https://www.serf.io/)                             | Cluster membership, failure detection, and message broadcast over LAN and WAN  |

Understanding these components is critical for designing, deploying, and managing a resilient Consul architecture optimized for service discovery and health monitoring.

## Links and References

- [Consul Documentation](https://www.consul.io/docs)
- [Raft Consensus Algorithm](<https://en.wikipedia.org/wiki/Raft_(computer_science)>)
- [Serf (Gossip Protocol)](https://www.serf.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/bb95f43b-3acb-4ce2-88ae-0c79beb3e569/lesson/a156f929-1466-4e8d-836a-0181edd9e8c3)**
>
> Watch video content
