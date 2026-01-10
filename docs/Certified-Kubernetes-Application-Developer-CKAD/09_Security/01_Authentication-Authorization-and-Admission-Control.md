# Authentication Authorization and Admission Control - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Security/Authentication-Authorization-and-Admission-Control)

---

## Table of Contents

- Authentication Authorization and Admission Control
  - Securing Kubernetes Cluster Hosts
  - Protecting the Kube API Server
  - Securing Inter-Component Communications
  - Managing Pod Communications with Network Policies
  - Watch Video
    - Authentication Methods
    - Authorization Strategies

---

## Content

Certified Kubernetes Application Developer - CKAD

Security

# Authentication Authorization and Admission Control

Welcome to this comprehensive lesson on Kubernetes security. In this module, we dive into the core security primitives essential for production-grade Kubernetes deployments. We'll explore how Kubernetes secures its API, manages user access, and controls inter-component communication.

> [!important]
> **Note**
>
> Before diving deeper, ensure your infrastructure hosts are secure by disabling root access, disabling password-based authentication, and exclusively using SSH key-based authentication.

## Securing Kubernetes Cluster Hosts

The foundation of a secure Kubernetes environment is protecting the underlying physical or virtual infrastructure. Ensure that your cluster hosts adhere to industry security best practices:

- Disable root access.
- Turn off password-based authentication.
- Enable SSH key-based authentication.

Remember, if the base infrastructure is compromised, the entire Kubernetes cluster is vulnerable.

## Protecting the Kube API Server

At the heart of Kubernetes lies the Kube API Server, which serves as the gateway for all operations—be it through `kubectl` or direct API calls. As such, strict control over who can access the cluster and what actions they can perform is vital.

### Authentication Methods

Authentication determines the identity of a user or a process accessing the API server. Kubernetes supports multiple authentication mechanisms, including:

- **User IDs and Passwords:** Stored in static files.
- **Tokens:** Issued for API access.
- **Certificates:** Securing communications.
- **External Authentication Providers:** For example, LDAP.
- **Service Accounts:** For machine-to-machine interactions.

![The image is a slide titled "Authentication" listing access methods: username/password, username/tokens, certificates, LDAP, and service accounts.](https://kodekloud.com/kk-media/image/upload/v1752871274/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Authentication-Authorization-and-Admission-Control/frame_120.jpg)

### Authorization Strategies

Once authenticated, authorization dictates what actions users are permitted to perform. Kubernetes primarily employs Role-Based Access Control (RBAC) to manage permissions. Additional strategies include:

- **Attribute-Based Access Control (ABAC)**
- **Node Authorization**
- **Webhook Modes**

![The image lists types of authorization: RBAC, ABAC, Node Authorization, and Webhook Mode, under the heading "Authorization: What can they do?"](https://kodekloud.com/kk-media/image/upload/v1752871276/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Authentication-Authorization-and-Admission-Control/frame_140.jpg)

## Securing Inter-Component Communications

Every component within Kubernetes communicates over a network, sometimes traversing untrusted networks. To ensure data security, Kubernetes uses TLS encryption for communications among critical components such as:

- Kube API Server
- etcd Cluster
- Kube Controller Manager
- Kube Scheduler
- Kubelet and Kube Proxy on worker nodes

Detailed procedures for configuring and managing TLS certificates are covered in the course content.

![The image illustrates the relationship between Kubernetes components using TLS certificates, centered around the Kube ApiServer, connecting to ETCD Cluster, Kubelet, Kube Proxy, Kube Controller Manager, and Kube Scheduler.](https://kodekloud.com/kk-media/image/upload/v1752871277/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Authentication-Authorization-and-Admission-Control/frame_160.jpg)

## Managing Pod Communications with Network Policies

By default, all pods within a Kubernetes cluster can communicate freely, which may not be desirable for every workload or application. Network policies allow administrators to define rules that restrict pod-to-pod interactions, thereby reducing potential attack vectors and isolating sensitive components.

![The image illustrates network policies using a diagram of four devices with colored circles and pentagons, indicating connections or groupings.](https://kodekloud.com/kk-media/image/upload/v1752871278/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Authentication-Authorization-and-Admission-Control/frame_190.jpg)

This high-level overview provides a solid foundation on Kubernetes security primitives. Each of these topics is explored in greater depth throughout the course, ensuring you have the knowledge to build a robust and secure Kubernetes environment.

Let’s move forward into the detailed modules.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/feba5918-7808-4f30-8d7b-6ac10e569e02)**
>
> Watch video content
