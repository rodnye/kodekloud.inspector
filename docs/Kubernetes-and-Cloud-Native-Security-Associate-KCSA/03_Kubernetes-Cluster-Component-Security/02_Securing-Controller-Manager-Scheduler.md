# Securing Controller Manager Scheduler - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Cluster-Component-Security/Securing-Controller-Manager-Scheduler)

---

## Table of Contents

- Securing Controller Manager Scheduler
  - Controller Manager and Scheduler Roles
  - 1. Isolation on Dedicated Nodes
  - 2. Role-Based Access Control (RBAC)
  - 3. Encrypting Communications with TLS
  - 4. Audit Logging
  - Summary of Best Practices
  - Links and References
  - Watch Video

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Cluster Component Security

# Securing Controller Manager Scheduler

In this guide, we detail security best practices for hardening the Kubernetes Controller Manager and Scheduler—two pivotal control-plane processes responsible for maintaining your cluster’s desired state. Implementing these measures helps protect against lateral movement, unauthorized access, and data breaches.

## Controller Manager and Scheduler Roles

A Kubernetes cluster uses these control-plane components:

- **Controller Manager**
  - Monitors node and pod health
  - Maintains the desired number of pod replicas
  - Manages service accounts via controllers (e.g., ReplicationController, EndpointController, NamespaceController, ServiceAccountController)

- **Scheduler**
  - Assigns pods to nodes based on resource availability and scheduling constraints

![The image illustrates the architecture of Kubernetes Controller Manager and Scheduler, showing their roles in managing node health, pod health, and service accounts within a cluster.](https://kodekloud.com/kk-media/image/upload/v1752880760/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Securing-Controller-Manager-Scheduler/kubernetes-controller-manager-scheduler-architecture.jpg)

## 1\. Isolation on Dedicated Nodes

Running the Controller Manager and Scheduler on isolated master nodes prevents compromised application pods from reaching critical control-plane components.

- Dedicate nodes exclusively for control-plane services
- Taint master nodes to avoid scheduling regular workloads
- Monitor and patch these nodes independently

![The image illustrates the architecture of a Kubernetes cluster, highlighting the controller manager, scheduler, and nodes with pods.](https://kodekloud.com/kk-media/image/upload/v1752880761/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Securing-Controller-Manager-Scheduler/kubernetes-cluster-architecture-diagram.jpg)

By isolating control-plane components:

- You limit lateral movement if an application pod is breached
- You can apply updates and security patches without impacting user workloads

> [!important]
> **Note**
>
> Use `kubectl taint nodes` and node selectors to keep control-plane pods off worker nodes.

![The image illustrates a Kubernetes cluster with nodes, showing the controller manager and scheduler components, along with pods distributed across the nodes.](https://kodekloud.com/kk-media/image/upload/v1752880762/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Securing-Controller-Manager-Scheduler/kubernetes-cluster-nodes-diagram.jpg)

## 2\. Role-Based Access Control (RBAC)

Adopt least-privilege RBAC policies so the Controller Manager and Scheduler only have access to the resources they need.

| Component          | Permissions Granted                     | Permissions Denied                      |
| ------------------ | --------------------------------------- | --------------------------------------- |
| Controller Manager | Manage ReplicaSets, Services, Endpoints | Secrets, NetworkPolicies, ConfigMaps    |
| Scheduler          | List and watch pods, nodes, bindings    | Creating roles, accessing etcd directly |

![The image illustrates the Kubernetes Controller Manager and Scheduler, showing how RBAC manages pod replicas, service accounts, and scheduling tasks within a cluster of nodes.](/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Securing-Controller-Scheduler-rbac-diagram.jpg)

> [!important]
> **Note**
>
> Review the [Kubernetes RBAC documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) when defining your ClusterRoles and RoleBindings.

## 3\. Encrypting Communications with TLS

Ensure all communication between the Controller Manager, Scheduler, API Server, and etcd is encrypted:

- Enable mutual TLS (mTLS) for client-server and server-server connections
- Use a reputable Certificate Authority (CA) or [cert-manager](https://cert-manager.io/)
- Automate certificate renewal to avoid expired credentials

![The image illustrates a Kubernetes cluster architecture, showing nodes with controller manager, scheduler, and pods, connected via SSL.](https://kodekloud.com/kk-media/image/upload/v1752880763/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Securing-Controller-Manager-Scheduler/kubernetes-cluster-architecture-diagram-2.jpg)

> [!important]
> **Warning**
>
> Expired certificates can silently fail, causing control-plane outages. Implement automated alerts to track upcoming expirations.

## 4\. Audit Logging

Activate audit logging for both the Controller Manager and Scheduler to record every API request and response. These logs are essential for forensic analysis and anomaly detection.

```
Event Type: PATCH
Timestamp: 2024-11-09T12:34:56Z
Description: ReplicaSet controller updated deployment "my-deployment" in namespace "default" to adjust replicas to 3. Request by user "system:serviceaccount:kube-system:replicaset-controller" from IP 10.10.10.10. Status: 200 OK.

Event Type: GET
Timestamp: 2024-11-09T12:35:12Z
Description: Kube Controller Manager retrieved config map "kube-root-ca.crt" in namespace "kube-system". Request by user "system:serviceaccount:kube-system:kube-controller-manager" from IP 10.10.10.11. Status: 200 OK.

Event Type: PATCH
Timestamp: 2024-11-09T12:35:45Z
Description: Horizontal Pod Autoscaler adjusted settings for "my-app-autoscaler" in namespace "default" to min replicas 2, max replicas 10, target CPU utilization 80%. Request by user "system:serviceaccount:kube-system:horizontal-pod-autoscaler" from IP 10.10.10.12. Status: 200 OK.
```

Use monitoring stacks like [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) to set up alerts for suspicious API patterns.

---

## Summary of Best Practices

![The image lists seven security practices for Kubernetes Controller Manager and Scheduler, including isolating nodes, using RBAC, encrypting communications, enabling audit logging, securing settings, running the latest version, and scanning for vulnerabilities.](https://kodekloud.com/kk-media/image/upload/v1752880764/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Securing-Controller-Manager-Scheduler/kubernetes-security-practices-list.jpg)

1.  Isolate Controller Manager and Scheduler on dedicated, tainted nodes
2.  Apply least-privilege RBAC policies
3.  Encrypt all control-plane traffic (TLS/mTLS)
4.  Enable detailed audit logging with real-time monitoring
5.  Secure default configurations and protect `kubeconfig` files
6.  Keep Kubernetes up to date with security patches
7.  Regularly scan for vulnerabilities and remediate promptly

## Links and References

- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- [Kubernetes RBAC Reference](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [Prometheus Monitoring](https://prometheus.io/)
- [Grafana Dashboards](https://grafana.com/)
- [cert-manager](https://cert-manager.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/ca772db3-53aa-44c1-b424-3d32a046b683/lesson/52d1f427-cc90-4a23-b923-31f7e7e71b8c)**
>
> Watch video content
