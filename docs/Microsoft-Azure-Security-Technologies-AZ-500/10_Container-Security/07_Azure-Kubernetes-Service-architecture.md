# Azure Kubernetes Service architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Container-Security/Azure-Kubernetes-Service-architecture)

---

## Table of Contents

- Azure Kubernetes Service architecture
  - Node Components
  - Interaction Between Master and Node Components
  - AKS Networking
  - Watch Video
    - Kubelet
    - Kube Proxy
    - Container Runtime

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Container Security

# Azure Kubernetes Service architecture

In this lesson, we explore the architecture of Azure Kubernetes Service (AKS). AKS simplifies container orchestration by leveraging two main types of nodes: Azure Managed (master) nodes and Customer Managed nodes. While the master node is fully managed by Azure, our focus will be on the components within the Customer Managed node and their interaction with the master to maintain the desired state of the cluster.

## Node Components

Understanding the components running on each node is critical for effective cluster management.

### Kubelet

Kubelet is the primary agent that runs on every node in a Kubernetes cluster. Its responsibilities include:

- Receiving pod specifications from the Kubernetes master when a pod is scheduled.
- Ensuring that the defined containers for each pod are running and healthy.
- Continuously monitoring pod status to maintain the integrity of the cluster.
- Communicating with the container runtime—such as Docker, Containerd, or others—via the Container Runtime Interface (CRI) to manage container lifecycles.

> [!important]
> **Note**
>
> Kubelet’s real-time monitoring and reporting ensure that any discrepancies between the desired and actual states of pods are promptly addressed.

### Kube Proxy

Kube Proxy plays an essential role in cluster networking by maintaining network rules to enable communication between pods. Its functions include:

- Observing the Kubernetes master for any service or endpoint updates.
- Configuring routing rules for each service, thereby forwarding traffic from a service's virtual IP to the correct backend port.
- Supporting various operational modes, including user space, iptables, and IPVS, that determine how traffic is handled.

Kube Proxy interacts with the virtual network interfaces at the node level, ensuring seamless pod-to-pod communication across the cluster.

### Container Runtime

The container runtime is responsible for running containers and managing their entire lifecycle. Kubernetes supports multiple container runtimes such as Docker, Containerd, CRI-O, among others compliant with the CRI. Key functions include:

- Pulling container images from a repository.
- Unpacking images and instantiating container processes.
- Managing container networking, storage, logging, and other features.

Kubelet utilizes the CRI to communicate with the container runtime, ensuring that every container within a pod is deployed and maintained according to the defined pod specifications.

## Interaction Between Master and Node Components

The synergy between master components and node components is integral to the operation of AKS. Here’s how the interaction unfolds:

- The master node, through components like the API server and scheduler, issues pod specifications.
- Kubelet on customer-managed nodes receives these specifications and ensures the associated containers are meeting the desired state.
- Kube Proxy continuously monitors for changes in the network configuration and updates routing rules as needed.
- The container runtime, guided by Kubelet via the CRI, is responsible for pulling images, starting containers, and handling their operational lifecycle.

In summary, the master node maintains the overall desired state of the cluster, while Kubelet, Kube Proxy, and the container runtime on the customer-managed nodes work together to ensure that workloads run smoothly and reliably.

## AKS Networking

With an understanding of the core node components and their interaction with the master node, we now turn to AKS networking. The next section details how network communication, routing, and service discovery are managed across the cluster, providing a comprehensive picture of the AKS architecture.

> [!important]
> **Warning**
>
> Ensure that network policies and security configurations are correctly set up to prevent unauthorized access and maintain the integrity of your AKS cluster.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/146650b0-63f9-4c4b-b452-716a780e5fc7/lesson/5f2dbc0e-4859-4098-80ea-d406b56998c6)**
>
> Watch video content
