# TLS in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/TLS-in-Kubernetes)

---

## Table of Contents

- TLS in Kubernetes
  - TLS Components in a Kubernetes Cluster
  - Watch Video
    - Server Certificates
    - Client Certificates
    - Grouping Certificates
    - The Role of the Certificate Authority (CA)

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# TLS in Kubernetes

Welcome to this in-depth lesson on securing your Kubernetes cluster with TLS certificates. In this guide, we'll explain the roles and naming conventions of various certificates, and then demonstrate how these concepts apply within a Kubernetes environment.

In a previous discussion, we explored the basics of public and private keys and their role in securing connections. The certificates we reviewed included:

- **Server Certificates:** Deployed on servers.
- **Root Certificates:** Held by the Certificate Authority (CA) to sign server certificates.
- **Client Certificates:** Used by clients to authenticate themselves to the server.

> [!important]
> **Naming Conventions**
>
> Certificate files follow specific naming conventions:
>
> - Certificates containing public keys typically use `.crt` or `.pem` extensions (e.g., `server.crt` or `client.pem`).
> - Private keys often have the term "key" as their extension (e.g., `.key`) or within the filename (e.g., `server-key.pem`).

The image below illustrates the Certificate Authority (CA) system, showing the root, client, and server certificates along with their public and private keys:

![The image illustrates a Certificate Authority (CA) system, showing root, client, and server certificates, along with public and private keys for secure communication.](https://kodekloud.com/kk-media/image/upload/v1752871611/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-TLS-in-Kubernetes/frame_60.jpg)

## TLS Components in a Kubernetes Cluster

A secure Kubernetes cluster requires encrypted TLS communications between the master and worker nodes. Whether you are an administrator using `kubectl` or an internal service within the cluster, every interaction relies on TLS-secured connections. There are two main requirements:

1.  Server components (e.g., API server, etcd, kubelet) must use TLS certificates to secure communications.
2.  Client components (e.g., administrative users, scheduler, controller-manager, kube-proxy) must present valid client certificates for authentication.

### Server Certificates

Below we identify the key server components and their associated certificates:

- **Kube API Server:**  
  The Kube API server provides an HTTPS service for internal components and external users. It requires a server certificate and a private key (`api-server.cert` and `api-server.key`) to secure these communications.
- **etcd Server:**  
  Acting as the primary data store for the cluster, the etcd server necessitates its certificate and key pair, named `etcd-server.crt` and `etcd-server.key`.
- **Kubelet (Worker Nodes):**  
  Every worker node runs the kubelet service, which exposes an HTTPS API endpoint for communication with the API server. For these endpoints, a certificate and key pair (`kubelet.cert` and `kubelet.key`) is used.

The diagram below summarizes the server certificates used by the Kube API, etcd, and kubelet services:

![The image illustrates server certificates for Kube-API, ETCD, and Kubelet servers, showing their respective certificate and key files.](https://kodekloud.com/kk-media/image/upload/v1752871613/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-TLS-in-Kubernetes/frame_240.jpg)

### Client Certificates

Now, review the client components that interact with the servers:

- **Admin User:**  
  Administrators connect to the Kubernetes cluster via `kubectl` or direct REST API calls. The admin user authenticates with a client certificate (`admin.crt`) and corresponding key (`admin.key`).
- **Scheduler:**  
  The scheduler queries the API server for pending pods and orchestrates their deployment on the appropriate worker nodes. It uses a certificate and key pairing (`scheduler.cert` and `scheduler.key`) for authentication.
- **Kube Controller Manager:**  
  Similar to the scheduler, the controller manager communicates with the API server using its own certificate for secure authentication.
- **Kube Proxy:**  
  The kube proxy manages network rules on worker nodes and requires a dedicated client certificate (`kube-proxy.crt` and `kube-proxy.key`).

> [!important]
> **Inter-Component Communication**
>
> Sometimes, servers also act as clients when communicating with other services. For example, the Kube API server communicates with the etcd server. In these scenarios, it can use its own certificate (`api-server.crt`/`api-server.key`) or a separate certificate pair specifically generated for authenticating with etcd.

The diagram below provides an overview of how client certificates and keys are used for authentication among Kubernetes components:

![The image illustrates the client certificates and keys used for authentication between Kubernetes components like Kube-API server, ETCD server, and others.](https://kodekloud.com/kk-media/image/upload/v1752871614/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-TLS-in-Kubernetes/frame_390.jpg)

### Grouping Certificates

To simplify management, certificates in a Kubernetes cluster can be categorized into two groups:

| Certificate Group   | Description                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| Client Certificates | Used by administrators, the scheduler, controller-manager, and kube-proxy to access the Kube API server. |
| Server Certificates | Employed by the Kube API server, etcd server, and kubelet to authenticate incoming client connections.   |

### The Role of the Certificate Authority (CA)

A Certificate Authority (CA) is needed to sign both client and server certificates. Kubernetes requires at least one CA per cluster. In some deployments, a separate CA may be used for the control plane and for etcd. In this lesson, we focus on a single CA whose certificate and key are named `CA.crt` and `CA.key`.

The following diagram offers a comprehensive overview of the client and server certificates for various Kubernetes components, all signed by the CA:

![The image illustrates client and server certificates for Kubernetes components, including admin, scheduler, controller-manager, kube-proxy, etcd server, kube-API server, and kubelet server.](https://kodekloud.com/kk-media/image/upload/v1752871615/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-TLS-in-Kubernetes/frame_420.jpg)

This concludes the overview of the TLS certificates used in a Kubernetes cluster along with their respective roles. In the next section of this lesson, we will explore how to generate and sign these certificates using the CA.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/acb7948c-cae2-4fba-8c38-af1e97ffa190)**
>
> Watch video content
