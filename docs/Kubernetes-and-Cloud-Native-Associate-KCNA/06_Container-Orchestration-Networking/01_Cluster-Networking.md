# Cluster Networking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Container-Orchestration-Networking/Cluster-Networking)

---

## Table of Contents

- Cluster Networking
  - Node Configuration
  - Essential Port Configurations
  - Network Security Considerations
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Container Orchestration Networking

# Cluster Networking

Welcome to this comprehensive guide on configuring networking for both master and worker nodes within a Kubernetes cluster. In this article, we detail the necessary network settings and port configurations required for optimal cluster communication and performance.

## Node Configuration

In a Kubernetes cluster, each node must have at least one network interface that is configured with:

- A unique IP address.
- A unique hostname.
- A distinct MAC address.

It is particularly important to ensure these settings are correctly applied if virtual machines (VMs) have been cloned from existing ones.

## Essential Port Configurations

Proper communication between Kubernetes components relies on opening specific network ports. Below is a list of the critical ports that must be accessible:

- **Port 6443:**  
  The Kubernetes API server, running on the master node, listens on this port. It must be open for:
  - Worker nodes.
  - The `kubectl` command-line tool.
  - External users.
  - Other control plane components.

- **Port 10250:**  
  The kubelet service runs on both the master and worker nodes and listens on this port for managing node-level operations.
- **Port 10259:**  
  The kube-scheduler service uses this port to operate smoothly.
- **Port 10257:**  
  The kube-controller-manager service requires this open port for its functions.
- **Ports 30000 to 32767:**  
  These ports are used by worker nodes to expose services to external users.
- **Port 2379:**  
  The etcd server, which handles key-value storage for the cluster, listens on this port.  
  If you are running multiple master nodes, ensure that **port 2380** is also open to facilitate communication between etcd clients.

> [!important]
> **Note**
>
> For a full list of required ports, please refer to the [official Kubernetes documentation](https://kubernetes.io/docs/).

## Network Security Considerations

When setting up your Kubernetes cluster, make sure that the following elements are included in your network security configuration:

- **Firewall Settings:** Ensure that appropriate ports are allowed.
- **iptables Rules:** Confirm that the necessary rules enable smooth communication between components.
- **Cloud Network Security Groups:** For clusters hosted on cloud platforms such as GCP, Azure, or AWS, verify that relevant security groups permit the required ports.

If any component exhibits communication issues, a primary troubleshooting step should be to review and adjust your port configuration settings.

By adhering to these guidelines, you can establish a secure and well-functioning networking environment within your Kubernetes cluster.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/35623c9b-b30e-4a5d-a868-cc9f30de96d2/lesson/e3e489b3-9441-4d74-8398-ea7454d42894)**
>
> Watch video content
