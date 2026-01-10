# Introduction to Container Network Interface CNI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Container-Network-InterfaceCNI/Introduction-to-Container-Network-Interface-CNI)

---

## Table of Contents

- Introduction to Container Network Interface CNI
  - What Is CNI?
  - How CNI Works
  - CNI Specification Overview
  - Chaining and Delegation
  - Result Types
  - Key Features of CNI
  - Popular CNI Plugins
  - Conclusion
  - References
  - Watch Video
    - Network Configuration Files
    - Plugin Execution Protocol
    - Execution Flow
    - Comparison of Popular CNIs
      - Core Operations

---

## Content

Kubernetes Networking Deep Dive

Container Network InterfaceCNI

# Introduction to Container Network Interface CNI

As your Kubernetes cluster grows and hosts more workloads, networking complexity can quickly become a bottleneck. The Kubernetes networking model requires every pod to communicate seamlessly across nodes, demanding consistent, automated configuration management. In this guide, we’ll explore the Container Network Interface (CNI)—its purpose, architecture, specification, and key features—before surveying the most popular CNI plugins in today’s ecosystem.

![The image lists section objectives related to CNI, including understanding CNI, how it works, its specification, and key features. The background is a gradient of blue and green.](https://kodekloud.com/kk-media/image/upload/v1752880270/notes-assets/images/Kubernetes-Networking-Deep-Dive-Introduction-to-Container-Network-Interface-CNI/cni-objectives-understanding-specification-features.jpg)

## What Is CNI?

The Container Network Interface is a **CNCF** project defining a standard for configuring network interfaces in Linux and Windows containers. It provides:

- A **specification** for network configuration files (JSON).
- **Libraries** for writing networking plugins.
- A **protocol** that container runtimes (e.g., containerd, CRI-O) use to invoke plugins.

When a container is created or deleted, CNI allocates or cleans up network resources, delivering a unified interface for orchestrators like Kubernetes.

## How CNI Works

Under the hood, the container runtime handles network setup by invoking one or more CNI plugin binaries. Here’s the typical workflow in Kubernetes:

1.  **API Server → Kubelet**: Request to create a Pod.
2.  **Kubelet → Runtime**: Allocate a new network namespace for the pod.
3.  **Runtime → CNI Plugin**: Invoke plugin(s) with JSON config via stdin.
4.  **Plugin(s) → Runtime**: Return interface details on stdout.
5.  **Runtime → Container**: Launch container in the prepared namespace.

![The image illustrates the workflow of how CNI (Container Network Interface) operates within Kubernetes, showing the interaction between components like Kube API, Kubelet, Runtime, and CNI, along with network namespaces and interfaces.](https://kodekloud.com/kk-media/image/upload/v1752880271/notes-assets/images/Kubernetes-Networking-Deep-Dive-Introduction-to-Container-Network-Interface-CNI/cni-workflow-kubernetes-components-diagram.jpg)

> [!important]
> **Note**
>
> CNI plugin binaries must be installed on every node (default: `/opt/cni/bin`). Without them, pods may fail to start.

## CNI Specification Overview

The CNI spec comprises:

- A JSON schema for network configuration.
- A naming convention for network definitions and plugin lists.
- An execution protocol using environment variables.
- A mechanism for chaining multiple plugins.
- Standard data types for operation results.

![The image is an infographic titled "CNI Specification," featuring a clipboard and gear icon, with a list of five components related to network configuration and execution procedures.](https://kodekloud.com/kk-media/image/upload/v1752880272/notes-assets/images/Kubernetes-Networking-Deep-Dive-Introduction-to-Container-Network-Interface-CNI/cni-specification-infographic-clipboard-gear.jpg)

### Network Configuration Files

Configuration lives in a JSON file interpreted by the runtime at execution time. You can chain multiple plugins:

```
{
  "cniVersion": "1.1.0",
  "name": "dbnet",
  "plugins": [
    {
      "type": "bridge",
      "bridge": "cni0",
      "keyA": ["some", "plugin", "configuration"],
      "ipam": {
        "type": "host-local",
        "subnet": "10.1.0.0/16",
        "gateway": "10.1.0.1",
        "routes": [{"dst": "0.0.0.0/0"}]
      }
    },
    {
      "dns": {"nameservers": ["10.1.0.1"]}
    },
    {
      "type": "tuning",
      "capabilities": {"mac": true},
      "sysctl": {"net.core.somaxconn": "500"}
    },
    {
      "type": "portmap",
      "capabilities": {"portMappings": true}
    }
  ]
}
```

Each object in `plugins` is invoked in sequence for setup or teardown.

### Plugin Execution Protocol

CNI relies on environment variables to pass context:

![The image is a slide titled "Protocol for Interaction," listing environment parameters related to container networking, such as CNI_COMMAND, CNI_CONTAINERID, and others.](https://kodekloud.com/kk-media/image/upload/v1752880274/notes-assets/images/Kubernetes-Networking-Deep-Dive-Introduction-to-Container-Network-Interface-CNI/protocol-for-interaction-container-networking.jpg)

| Variable           | Description                                  |
| ------------------ | -------------------------------------------- |
| CNI\\\_COMMAND     | Operation (`ADD`, `DEL`, `CHECK`, `VERSION`) |
| CNI\\\_CONTAINERID | Unique container identifier                  |
| CNI\\\_NETNS       | Path to container’s network namespace        |
| CNI\\\_IFNAME      | Interface name inside the container          |
| CNI\\\_ARGS        | Additional plugin-specific arguments         |
| CNI\\\_PATH        | Paths to locate CNI plugin binaries          |

#### Core Operations

- **ADD**: Attach and configure an interface.
- **DEL**: Detach and cleanup.
- **CHECK**: Validate current network state.
- **VERSION**: Query supported CNI versions.

A network attachment is uniquely identified by `CNI_CONTAINERID` + `CNI_IFNAME`. Plugins read JSON config from stdin and write results to stdout.

### Execution Flow

![The image is a diagram titled "Execution of Network Configurations" showing options for adding or deleting an attachment, with buttons labeled "ADD" and "DELETE."](https://kodekloud.com/kk-media/image/upload/v1752880275/notes-assets/images/Kubernetes-Networking-Deep-Dive-Introduction-to-Container-Network-Interface-CNI/execution-network-configurations-diagram.jpg)

When running **ADD**:

1.  Derive the network configuration.
2.  Execute plugin binaries **in listed order** with `CNI_COMMAND=ADD`.
3.  Halt on any failure and return an error.
4.  Persist success data for later `CHECK` or `DEL`.

![The image is a flowchart titled "Execution Order of Operations," showing a sequence of steps: "Derive configuration," "Execute Plugins in order," "Execute CNI_COMMAND=ADD," and "If failure, halt and return error."](https://kodekloud.com/kk-media/image/upload/v1752880275/notes-assets/images/Kubernetes-Networking-Deep-Dive-Introduction-to-Container-Network-Interface-CNI/execution-order-operations-flowchart.jpg)

The **DEL** operation runs plugins in **reverse order**. **CHECK** follows the same sequence as `ADD` but performs validations only.

![The image is a flowchart titled "Execution Order of Operations," showing a sequence of steps: deriving configuration, executing plugins, executing a command, and handling failure.](https://kodekloud.com/kk-media/image/upload/v1752880276/notes-assets/images/Kubernetes-Networking-Deep-Dive-Introduction-to-Container-Network-Interface-CNI/execution-order-operations-flowchart-2.jpg)

## Chaining and Delegation

CNI supports chaining multiple plugins. A parent plugin can delegate tasks to child plugins. On failure, the parent invokes a **DEL** on all delegates before returning an error, ensuring cleanup.

## Result Types

CNI operations return standardized JSON for:

- **Success**: Contains `cniVersion`, configured interfaces, IPs, routes, DNS.
- **Error**: Includes `code`, `msg`, `details`, `cniVersion`.
- **Version**: Lists supported spec versions.

![The image shows a diagram of result types with three hexagons labeled "Success," "Error," and "Version," alongside a section labeled "PrevResult" with items "cniVersion" and "Interfaces."](https://kodekloud.com/kk-media/image/upload/v1752880277/notes-assets/images/Kubernetes-Networking-Deep-Dive-Introduction-to-Container-Network-Interface-CNI/result-types-hexagons-diagram.jpg)

Example **error** response:

```
{
  "cniVersion": "1.1.0",
  "code": 7,
  "msg": "Invalid Configuration",
  "details": "Network 192.168.0.0/31 too small to allocate from."
}
```

## Key Features of CNI

![The image lists five key features: Standardized Interfaces, Flexibility, Dynamic Configuration, Ease of Integration, and Compatibility, each with corresponding icons.](https://kodekloud.com/kk-media/image/upload/v1752880278/notes-assets/images/Kubernetes-Networking-Deep-Dive-Introduction-to-Container-Network-Interface-CNI/key-features-standardized-flexibility-compatibility.jpg)

1.  **Standardized Interface**: Unified API for all container runtimes.
2.  **Flexibility**: Supports a vast ecosystem of plugins.
3.  **Dynamic Configuration**: Runtime-driven setup and teardown.
4.  **Ease of Integration**: Embeds directly into container runtimes.
5.  **Compatibility**: Versioned specs for interoperability.

## Popular CNI Plugins

![The image lists popular Container Network Interfaces (CNIs) including Flannel, Weave Net, Calico, and Cilium, with a focus on Flannel, describing it as a CoreOS creation that offers layer-3 IPv4 networking but lacks advanced features like network policies.](https://kodekloud.com/kk-media/image/upload/v1752880280/notes-assets/images/Kubernetes-Networking-Deep-Dive-Introduction-to-Container-Network-Interface-CNI/popular-cnis-flannel-weave-calico-cilium.jpg)

**Flannel** – A CoreOS project providing simple IPv4 layer-3 networking.  
**Weave Net** – Weaveworks’ layer-2 overlay with built-in encryption and network policies.

![The image is about popular CNIs (Container Network Interfaces) and highlights "Calico," describing it as created by Tigera, known for advanced network security, and employing BGP routing. It features an illustration of a cat with a ball of yarn.](https://kodekloud.com/kk-media/image/upload/v1752880281/notes-assets/images/Kubernetes-Networking-Deep-Dive-Introduction-to-Container-Network-Interface-CNI/popular-cnis-calico-network-security.jpg)

**Calico** – Tigera’s solution featuring scalable BGP routing and robust network policies.

![The image lists popular CNIs (Container Network Interfaces) including Flannel, Weave Net, Calico, and Cilium, with a focus on Cilium's features such as enhanced security using eBPF and inter-cluster service mesh support.](https://kodekloud.com/kk-media/image/upload/v1752880282/notes-assets/images/Kubernetes-Networking-Deep-Dive-Introduction-to-Container-Network-Interface-CNI/cni-list-flannel-weave-calico-cilium.jpg)

**Cilium** – Leverages eBPF for deep network and security visibility, plus inter-cluster service mesh capabilities.

Many cloud providers (AWS, Azure, GCP) also offer CNI implementations optimized for their platforms.

### Comparison of Popular CNIs

| Plugin    | Type         | Key Features                          |
| --------- | ------------ | ------------------------------------- |
| Flannel   | L3 Overlay   | Simple IPv4 overlay, minimal policy   |
| Weave Net | L2 Overlay   | Encryption, built-in network policies |
| Calico    | BGP Routing  | Scalable, advanced security policies  |
| Cilium    | eBPF-Powered | Fine-grained policies, service mesh   |

## Conclusion

![The image is a slide with the title "Conclusion" and a statement about CNI plugins standardizing and simplifying Kubernetes networking. It includes a logo and is copyrighted by KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752880283/notes-assets/images/Kubernetes-Networking-Deep-Dive-Introduction-to-Container-Network-Interface-CNI/conclusion-cni-plugins-kubernetes-networking.jpg)

CNI delivers a standardized, extensible framework that streamlines Kubernetes networking. By understanding its specification, execution model, and popular plugins, cluster operators can design robust, flexible network architectures.

## References

- [Kubernetes Networking Concepts](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
- [CNI Specification on GitHub](https://github.com/containernetworking/cni/blob/main/SPEC.md)
- [Container Network Interface (CNI) Project](https://www.cncf.io/projects/container-network-interface/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/5eea49e6-caea-4e84-88a0-268ea6f263af/lesson/92357493-dc8c-43d3-b0b3-f67ceed4e400)**
>
> Watch video content
