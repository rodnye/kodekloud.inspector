# API Server - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Cluster-Component-Security/API-Server)

---

## Table of Contents

- API Server
  - Key Access-Control Decisions
  - Authentication
  - Authorization
  - TLS Encryption Between Components
  - Further Reading & References
  - Watch Video

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Cluster Component Security

# API Server

The Kubernetes API server is the central management entity of a cluster. All interactions—whether via `kubectl`, client libraries, or direct REST calls—route through this component. As the first line of defense, you must tightly control who can communicate with the API server and what operations they can perform.

## Key Access-Control Decisions

1.  **Authentication**: Verify the identity of users or processes.
2.  **Authorization**: Determine which actions authenticated subjects can execute.

---

## Authentication

Kubernetes supports multiple authentication mechanisms. Choose methods based on your environment’s security requirements:

| Method              | Description                                                | Use Case                                 |
| ------------------- | ---------------------------------------------------------- | ---------------------------------------- |
| Static Credentials  | Username/password pairs defined in files                   | Small test clusters                      |
| Bearer Tokens       | Secrets or service account tokens                          | Automated clients, CI/CD pipelines       |
| Client Certificates | X.509 certificates for users and components                | Production clusters with strong security |
| External Providers  | Integrate with LDAP, OIDC, or webhook token authentication | Enterprise SSO                           |
| Service Accounts    | Automatically managed tokens for in-cluster workloads      | Pods requiring API access                |

> [!important]
> **Note**
>
> Service accounts are the default identity for workloads inside a cluster. Always assign the minimal set of permissions.

![The image is a slide titled "Authentication" with a focus on access methods, listing options like username and passwords, tokens, certificates, and LDAP.](https://kodekloud.com/kk-media/image/upload/v1752880743/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-API-Server/authentication-access-methods-slide.jpg)

For detailed setup, see [Authentication in Kubernetes](https://kubernetes.io/docs/reference/access-authn-authz/authentication/).

---

## Authorization

After a user or process is authenticated, Kubernetes must decide which API operations they can perform. The most common authorization module is Role-Based Access Control (RBAC), but other options exist:

| Module             | Description                                                                         |
| ------------------ | ----------------------------------------------------------------------------------- |
| RBAC               | Grant roles to users or service accounts, defining allowed API groups and resources |
| ABAC               | Policy-based on user attributes                                                     |
| Node Authorization | Restricts kubelet actions to pods running on the same node                          |
| Webhook Mode       | Delegates authorization to an external service                                      |

![The image is a slide titled "Authorization" with a list of authorization types: RBAC, ABAC, Node Authorization, and Webhook Mode.](https://kodekloud.com/kk-media/image/upload/v1752880744/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-API-Server/authorization-types-rbac-abac-node-webhook.jpg)

> [!important]
> **Warning**
>
> Misconfigured RBAC rules can inadvertently grant excessive privileges. Always follow the principle of least privilege.

Learn more in the [Role-Based Access Control](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) documentation.

---

## TLS Encryption Between Components

All communication between the API server and other cluster components is encrypted via TLS. This includes:

- etcd cluster
- kube-controller-manager
- kube-scheduler
- kubelet and kube-proxy on worker nodes

Maintaining a robust certificate management process is critical to prevent unauthorized access and ensure data integrity.

![The image is a diagram showing the relationship between various Kubernetes components (ETCD Cluster, Kubelet, Kube Proxy, Kube Controller Manager, Kube Scheduler) and the Kube ApiServer, with TLS certificates indicated between them.](https://kodekloud.com/kk-media/image/upload/v1752880745/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-API-Server/kubernetes-components-relationship-diagram.jpg)

For certificate generation and rotation guidance, refer to [TLS in Kubernetes](https://kubernetes.io/docs/concepts/cluster-administration/certificates/).

---

## Further Reading & References

- [Kubernetes API Overview](https://kubernetes.io/docs/concepts/overview/kubernetes-api/)
- [Authentication Strategies](https://kubernetes.io/docs/reference/access-authn-authz/authentication/)
- [Authorization Modules](https://kubernetes.io/docs/reference/access-authn-authz/authorization/)
- [Securing etcd](https://kubernetes.io/docs/tasks/administer-cluster/securing-a-cluster/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/ca772db3-53aa-44c1-b424-3d32a046b683/lesson/f785afe6-0060-48c3-b621-7919bcbf8f76)**
>
> Watch video content
