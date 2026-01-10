# Security Kubernetes Security Primitives - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Container-Orchestration-Security/Security-Kubernetes-Security-Primitives)

---

## Table of Contents

- Security Kubernetes Security Primitives
  - Securing the Underlying Hosts
  - Kubernetes-Specific Security Measures
  - TLS Encryption
  - Network Policies
  - Watch Video
    - Authentication
    - Authorization

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Container Orchestration Security

# Security Kubernetes Security Primitives

Hello, and welcome to this lesson on Kubernetes security primitives. In this article, we explore the foundational security measures required for running production-grade applications on Kubernetes. Understanding these security components is essential for maintaining a robust and secure cluster.

![The image features the text "Security-Kubernetes Security Primitives" on a blue background with a network design.](https://kodekloud.com/kk-media/image/upload/v1752880600/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Security-Kubernetes-Security-Primitives/frame_10.jpg)

## Securing the Underlying Hosts

Before diving into Kubernetes-specific features, it is vital to secure the physical or virtual hosts that form the cluster. Ensure all host access is protected by:

- Disabling root access
- Disabling password-based authentication
- Enforcing SSH key-based authentication
- Implementing other critical security measures

A compromise at this level can jeopardize the entire infrastructure.

![The image illustrates "Secure Hosts" with three outlined devices and notes on disabling password authentication and using SSH key-based authentication.](https://kodekloud.com/kk-media/image/upload/v1752880601/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Security-Kubernetes-Security-Primitives/frame_40.jpg)

## Kubernetes-Specific Security Measures

Focusing specifically on Kubernetes, the core component is the kube-apiserver. This component is the central point of contact for operations, whether accessed via the kubectl utility or directly through its API. Its security is paramount, so consider these key questions:

- Who can access the cluster?
- What actions can they perform once access is granted?

![The image discusses securing Kubernetes, focusing on the "kube-apiserver" and questioning who can access it.](https://kodekloud.com/kk-media/image/upload/v1752880602/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Security-Kubernetes-Security-Primitives/frame_90.jpg)

### Authentication

Access to the API server is managed through robust authentication mechanisms. Methods include:

- Static files with user IDs and passwords
- Tokens and certificates
- External authentication providers (e.g., LDAP)
- Machine-to-machine interactions managed through service accounts

![The image lists authentication methods: username/password, username/tokens, certificates, LDAP, and service accounts, under the question "Who can access?"](https://kodekloud.com/kk-media/image/upload/v1752880603/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Security-Kubernetes-Security-Primitives/frame_120.jpg)

### Authorization

Once authenticated, the system determines valid actions through authorization. Kubernetes primarily uses Role-Based Access Control (RBAC), where permissions are assigned based on roles or group memberships. Additional methods include Attribute-Based Access Control (ABAC) and webhooks for extended flexibility.

![The image is a slide titled "Authorization" with options for RBAC and ABAC Authorization.](https://kodekloud.com/kk-media/image/upload/v1752880604/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Security-Kubernetes-Security-Primitives/frame_140.jpg)

> [!important]
> **Secure Communication Within the Cluster**
>
> All communications between essential cluster components—such as the etcd cluster, kube-controller-manager, scheduler, API server, and nodes (kubelet and kube-proxy)—are secured with TLS encryption. This ensures that every interaction within the cluster remains confidential and tamper-proof.

## TLS Encryption

An entire section of Kubernetes documentation is dedicated to configuring TLS certificates. These certificates secure intra-cluster communication, safeguarding sensitive data exchanged between:

- Kube ApiServer
- ETCD Cluster
- Kubelet
- Additional components

![The image illustrates the use of TLS certificates in a Kubernetes architecture, showing connections between components like Kube ApiServer, ETCD Cluster, Kubelet, and others.](https://kodekloud.com/kk-media/image/upload/v1752880604/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Security-Kubernetes-Security-Primitives/frame_160.jpg)

## Network Policies

By default, pods within the cluster can communicate freely. However, to tighten security, you can implement network policies, which restrict communication between pods and enhance overall cluster security.

![The image illustrates network policies with four smartphone-like icons, each containing colored circles and interconnected by dashed lines and pentagons.](https://kodekloud.com/kk-media/image/upload/v1752880605/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Security-Kubernetes-Security-Primitives/frame_190.jpg)

---

This high-level overview has introduced the key security primitives in Kubernetes. In the upcoming sections, we will explore each component in greater depth to help you build a secure and resilient Kubernetes cluster.

For additional insights, consider exploring the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/9cdabd48-a7e9-400d-b6b7-e8f2c2f7ee5f/lesson/d8e7f8d9-9796-49a3-b59d-0486a29b2cf4)**
>
> Watch video content
