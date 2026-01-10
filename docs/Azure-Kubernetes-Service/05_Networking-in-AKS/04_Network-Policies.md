# Network Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Networking-in-AKS/Network-Policies)

---

## Table of Contents

- Network Policies
  - Limitations of Azure NSGs in AKS
  - Kubernetes Network Policies
  - Azure Network Policy Engine
  - Calico Network Policies
  - Troubleshooting Network Policies
  - Links and References
  - Watch Video

---

## Content

Azure Kubernetes Service

Networking in AKS

# Network Policies

Modern container networking demands more than subnet-level filtering. While Azure Network Security Groups (NSGs) can secure inbound and outbound traffic—including Azure CNI–provisioned pods—their reliance on static IPs makes them ill-suited for dynamic Kubernetes pods. NSG rules tied to pod IPs break when pods restart, and NSGs can’t filter by Kubernetes labels (for example, blocking traffic from `secure` pods to `unsecure` pods). Kubernetes Network Policies fill this gap by enabling label-based, pod-to-pod traffic controls.

## Limitations of Azure NSGs in AKS

- Pod IPs are ephemeral; NSG rules must be constantly updated.
- NSGs cannot reference Kubernetes constructs like namespaces or labels.
- Fine-grained policy (e.g., “allow traffic only from pods with label `app=frontend`”) requires a native Kubernetes mechanism.

## Kubernetes Network Policies

A `NetworkPolicy` is a native Kubernetes API object for controlling pod traffic. You define policies in YAML, selecting pods by labels and specifying allowed ingress and egress flows.

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: demo-policy
  namespace: demo
spec:
  podSelector:
    matchLabels:
      role: server
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
  egress:
  - to:
    - ipBlock:
        cidr: 10.2.0.0/22
      ports:
      - port: 80
```

| Policy Type | Description                                  |
| ----------- | -------------------------------------------- |
| Ingress     | Controls incoming traffic to selected pods   |
| Egress      | Controls outgoing traffic from selected pods |

> [!important]
> **Note**
>
> When at least one `NetworkPolicy` selects a pod, all other traffic is denied by default. Be sure to explicitly allow the flows your application requires.

For more details, see [NetworkPolicy | Kubernetes Concepts](https://kubernetes.io/docs/concepts/services-networking/network-policies/).

## Azure Network Policy Engine

Azure’s built-in network policy engine runs as a DaemonSet on every node. It watches `NetworkPolicy` objects and enforces rules using:

- **Linux nodes**: iptables + Linux bridge
- **Windows nodes** (preview): Host Networking Service (HNS) ACLs

This engine integrates with Azure CNI and the Azure Policy Manager.

![The image illustrates Azure Network Policies within a Kubernetes cluster, showing components like secure and unsecure labels, Linux Kernel, IP Tables, Bridge, Azure CNI, and Azure Policy Manager.](https://kodekloud.com/kk-media/image/upload/v1752869497/notes-assets/images/Azure-Kubernetes-Service-Network-Policies/azure-network-policies-kubernetes-diagram.jpg)

Azure Network Policies are the default in AKS for both Linux and Windows (Windows support is preview). You can also install the Azure policy engine on self-managed AKS clusters running on Azure VMs.

## Calico Network Policies

Calico by Tigera is an open-source networking and network security solution. It implements the Kubernetes `NetworkPolicy` API and extends it with additional features:

- GlobalNetworkPolicy for cross-namespace rules
- NetworkSets and ServiceSets for object grouping
- Integrated logging and compliance profiles

You can deploy Calico on AKS as a first-party add-on. Key differences between Azure and Calico network policies include supported platforms, networking modes, compliance features, and observability.

![The image is a comparison table of Azure and Calico policies, detailing capabilities such as supported platforms, networking options, compliance, features, support, and logging.](https://kodekloud.com/kk-media/image/upload/v1752869498/notes-assets/images/Azure-Kubernetes-Service-Network-Policies/azure-calico-policies-comparison-table.jpg)

> [!important]
> **Warning**
>
> If you choose Calico, Microsoft support engineers may not diagnose issues stemming from Calico components. For troubleshooting, refer to the [Calico documentation](https://docs.projectcalico.org/).

## Troubleshooting Network Policies

To view policy enforcement logs for either engine:

```
kubectl logs -n kube-system <network-policy-pod>
```

Replace `<network-policy-pod>` with the DaemonSet pod name (e.g., `azure-npm-daemonset` or `calico-node-xxxxx`).

## Links and References

- [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Azure CNI Networking](https://docs.microsoft.com/azure/aks/configure-azure-cni)
- [Calico Documentation](https://docs.projectcalico.org/)
- [Azure NSG Overview](https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/96320ff1-0141-4a5f-ab22-ed42e7995612/lesson/5d356f44-3b56-4562-91df-e9f7092252bd)**
>
> Watch video content
