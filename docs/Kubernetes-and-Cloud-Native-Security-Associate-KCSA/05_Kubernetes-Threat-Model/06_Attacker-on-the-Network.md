# Attacker on the Network - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Threat-Model/Attacker-on-the-Network)

---

## Table of Contents

- Attacker on the Network
  - Exhausting Compute Resources
  - Disrupting the Control Plane
  - Disrupting Networking
  - Mitigations
  - Summary
  - Watch Video
    - Firewall Configuration
    - Securing Nodes
    - Network Policies
    - Strong Authentication and Authorization
    - Monitoring and Logging

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Threat Model

# Attacker on the Network

In this guide, we explore how a network-level adversary can launch Denial of Service (DoS) attacks against a Kubernetes cluster. The following sections map out key attack vectors targeting compute resources, control-plane services, and pod networking, along with actionable mitigation strategies.

## Exhausting Compute Resources

An attacker may overload worker nodes and kubelets to reduce cluster capacity:

- Flood kubelet endpoints (`/healthz`, `/metrics`) or corrupt critical node files, causing nodes to report `NotReady`.
- Block kubelet health checks, forcing the scheduler to mark nodes as unschedulable.
- Trigger runaway CPU or memory consumption via malicious Pods to deplete node resources.

> [!important]
> **Note**
>
> Resource exhaustion not only disrupts workloads but can also trigger automatic node replacement if cluster autoscaling is enabled.

## Disrupting the Control Plane

Targeting core control-plane components can bring the entire cluster down. Common targets include etcd, the API server, the scheduler, and the controller manager.

| Component          | Ports                | Impact of Attack                                       |
| ------------------ | -------------------- | ------------------------------------------------------ |
| etcd               | `2379`, `2380`       | Break quorum, corrupt cluster state, block peer sync   |
| API Server         | `6443` (TLS), `8080` | Deny API calls from `kubectl` and internal controllers |
| Scheduler          | `10251`, `10259`     | Prevent new Pods from being assigned to nodes          |
| Controller Manager | `10252`, `10257`     | Halt replica loops, scaling, and other control tasks   |

> [!important]
> **Warning**
>
> Disrupting the API server or etcd can cause a full outage. Always secure these ports and validate firewall rules to avoid accidental lockouts.

![The image is a diagram of a "Compromised Network Attack Tree" showing various methods to disrupt a Kubernetes (K8s) cluster, including exhausting compute resources and disrupting networking.](https://kodekloud.com/kk-media/image/upload/v1752880804/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Attacker-on-the-Network/compromised-network-attack-tree-k8s.jpg)

## Disrupting Networking

Network-level denial-of-service can interfere with both internal communication and external access:

| Networking Component | Ports            | Attack Effects                                   |
| -------------------- | ---------------- | ------------------------------------------------ |
| kube-proxy           | `10256`, `10249` | Freeze Service-to-Pod traffic                    |
| DNS                  | `53`             | Block DNS resolution, causing service failures   |
| CNI Overlay Network  | (varies)         | Flood overlays, slow or sever Pod-to-Pod traffic |
| PXE / Network Boot   | (varies)         | Prevent new nodes from joining the cluster       |

---

## Mitigations

### Firewall Configuration

Restrict access to critical control-plane endpoints by allowing only trusted IP ranges:

- Limit the API server ports (`6443`, `8080`) to your control-plane bastion hosts.
- Block all unused Kubernetes ports at the network perimeter.
- Use cloud-native firewalls (e.g., AWS Security Groups, GCP Firewall Rules) for dynamic management.

### Securing Nodes

![The image is a diagram illustrating a Kubernetes setup for securing nodes, showing a flow from users through Nginx to frontend, Node.js, and MySQL pods. It emphasizes applying security patches and monitoring vulnerabilities.](https://kodekloud.com/kk-media/image/upload/v1752880805/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Attacker-on-the-Network/kubernetes-security-setup-diagram.jpg)

- Keep the host OS and Kubernetes components patched to the latest stable versions.
- Apply CIS Benchmarks or [Node Hardening Guides](https://kubernetes.io/docs/tasks/administer-cluster/securing-a-cluster/) for best practices.
- Monitor runtime vulnerabilities with tools like [Falco](https://falco.org/) or [Sysdig Secure](https://sysdig.com/products/secure/).

### Network Policies

Implement Kubernetes `NetworkPolicy` objects to enforce pod-level traffic controls:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: frontend
spec:
  podSelector: {}
  policyTypes:
  - Egress
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: backend
      podSelector: {}
```

> [!important]
> **Note**
>
> Define both `Ingress` and `Egress` policies to ensure complete traffic segmentation between namespaces and Pods.

### Strong Authentication and Authorization

- Enforce multi-factor authentication (MFA) for all control-plane access: API server, etcd, and SSH.
- Leverage Kubernetes Role-Based Access Control (RBAC) to grant least-privilege permissions.
- Rotate service account tokens and certificates regularly.

### Monitoring and Logging

Use Prometheus and Alertmanager to catch abnormal API usage and network spikes:

```
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: network-alert-rules
  namespace: default
spec:
  groups:
  - name: network-alerts
    rules:
    - alert: HighAPIRequests
      expr: sum(rate(apiserver_request_total[5m])) by (client) > 100
      labels:
        severity: warning
      annotations:
        summary: "High rate of API server requests detected"
        description: "Client {{ $labels.client }} exceeds 100 requests/sec average over 5m."
    - alert: HighNetworkTraffic
      expr: |
        sum(
          rate(container_network_receive_bytes_total[5m]) +
          rate(container_network_transmit_bytes_total[5m])
        ) by (pod) > 10000000
      for: 5m
      labels:
        severity: critical
      annotations:
        summary: "High network traffic detected for pod {{ $labels.pod }}"
        description: "Potential DoS or data exfiltration from pod {{ $labels.pod }}."
```

---

## Summary

Network-level attackers can cripple both the compute plane and control plane of your Kubernetes cluster. To defend effectively:

1.  Enforce strict firewall rules around control-plane ports.
2.  Keep nodes and cluster components up to date.
3.  Apply `NetworkPolicy` for granular traffic control.
4.  Use MFA and RBAC to secure API access.
5.  Monitor API calls and network metrics to detect and respond rapidly.

References:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [etcd Documentation](https://etcd.io/docs/)
- [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/6da25ade-b162-485c-b9b9-f351990e99c2/lesson/9242d8ee-730b-4b61-9a9f-2458d937eecd)**
>
> Watch video content
