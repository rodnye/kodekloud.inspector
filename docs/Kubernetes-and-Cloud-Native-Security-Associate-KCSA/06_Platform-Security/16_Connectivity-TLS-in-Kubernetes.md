# Connectivity TLS in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Platform-Security/Connectivity-TLS-in-Kubernetes)

---

## Table of Contents

- Connectivity TLS in Kubernetes
  - 1. TLS Fundamentals: Keys, Certificates, and CAs
  - 2. TLS Requirements in Kubernetes
  - 3. Certificate Assignments for Kubernetes Components
  - 4. Certificate Authority and Signing Strategy
  - 5. References and Further Reading
  - Watch Video
    - Naming Conventions
    - 3.1 Server-Side Certificates
    - 3.2 Client-Side Certificates
    - 4.1 CA-Managed Certificate Hierarchy
      - Inter-Service Authentication

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Platform Security

# Connectivity TLS in Kubernetes

In this guide, you’ll learn how to encrypt and authenticate all traffic in a Kubernetes cluster using TLS. We’ll cover:

- The role of keys, certificates, and Certificate Authorities (CAs)
- TLS requirements for Kubernetes control plane and data plane
- Mapping server and client certificates to Kubernetes components
- Best practices for generating and signing certificates

By the end, you’ll understand how to implement mutual TLS (mTLS) across every communication channel in your cluster.

---

## 1\. TLS Fundamentals: Keys, Certificates, and CAs

Before diving into Kubernetes-specific details, let’s recap the core concepts:

- **Public/Private Key Pair**  
  Each entity (server or client) generates a private key and a corresponding public key.
- **Server Certificates** (`server.crt`, `server.key`)  
  Used by services exposing HTTPS endpoints.
- **Client Certificates** (`client.crt`, `client.key`)  
  Prove a client’s identity to the server.
- **Certificate Authority (CA)** (`ca.crt`, `ca.key`)  
  Signs certificates and establishes a trust chain.

### Naming Conventions

> [!important]
> **Certificate File Naming**
>
> - Public certificates: use `.crt` or `.pem`
> - Private keys: use `.key` or include “key” in the filename
> - Examples: `apiserver.crt` + `apiserver.key`, `client.pem`, `client-key.pem`

---

## 2\. TLS Requirements in Kubernetes

All Kubernetes communications—intra-cluster or external—must be both encrypted and authenticated:

1.  **Server Certificates**  
    Each service that exposes an HTTPS endpoint (API server, etcd, kubelet).
2.  **Client Certificates**  
    Every client connecting to those services (`kubectl`, system components).

Mutual TLS ensures that both sides verify each other’s identity and encrypt data in transit.

---

## 3\. Certificate Assignments for Kubernetes Components

### 3.1 Server-Side Certificates

| Component        | Certificate File  | Key File          |
| ---------------- | ----------------- | ----------------- |
| API Server       | `apiserver.crt`   | `apiserver.key`   |
| etcd Server      | `etcd-server.crt` | `etcd-server.key` |
| Kubelet (worker) | `kubelet.crt`     | `kubelet.key`     |

```
# Server certificate files on disk
ls /etc/kubernetes/pki/
# apiserver.crt   apiserver.key   etcd-server.crt   etcd-server.key   kubelet.crt   kubelet.key
```

### 3.2 Client-Side Certificates

| Client                    | Certificate File         | Key File                 |
| ------------------------- | ------------------------ | ------------------------ |
| Administrator (`kubectl`) | `admin.crt`              | `admin.key`              |
| Kube-Scheduler            | `scheduler.crt`          | `scheduler.key`          |
| Kube-Controller-Manager   | `controller-manager.crt` | `controller-manager.key` |
| Kube-Proxy                | `kube-proxy.crt`         | `kube-proxy.key`         |

```
# Client certificate files on disk
ls /etc/kubernetes/pki/
# admin.crt   admin.key   scheduler.crt   scheduler.key   controller-manager.crt   controller-manager.key   kube-proxy.crt   kube-proxy.key
```

#### Inter-Service Authentication

- **API Server → etcd**: The API server acts as a client to etcd. You can reuse `apiserver.crt/key` or use a dedicated pair.
- **API Server → Kubelet**: When the API server calls kubelet’s HTTPS endpoint, it presents a client certificate (either its serving cert or a separate client cert).

In each mTLS handshake, both parties authenticate and establish an encrypted channel, ensuring data integrity and confidentiality.

---

## 4\. Certificate Authority and Signing Strategy

You need a CA to sign every server and client certificate. Kubernetes supports:

- A **single CA** for all components
- **Multiple CAs** (e.g., one CA for etcd, another for the rest)

In this walkthrough, we’ll use a single CA:

- **CA Public Certificate**: `ca.crt`
- **CA Private Key**: `ca.key`

> [!important]
> **Protect Your CA Key**
>
> Never store `ca.key` on nodes that aren’t fully secured. Loss of the CA key compromises your entire cluster.

### 4.1 CA-Managed Certificate Hierarchy

1.  Generate the CA key and certificate (`ca.key`/`ca.crt`).
2.  For each server and client:
    - Generate a CSR (Certificate Signing Request).
    - Sign the CSR with the CA key, specifying the proper Extended Key Usages (`serverAuth` or `clientAuth`).
3.  Distribute the signed certificates and corresponding keys to each component.

---

## 5\. References and Further Reading

- [Kubernetes TLS Bootstrapping](https://kubernetes.io/docs/reference/command-line-tools-reference/kubeadm/kubeadm-init/#certificate-configuration)
- [Understanding TLS in Kubernetes](https://kubernetes.io/docs/tasks/tls/managing-tls-in-a-cluster/)
- [etcd Security](https://etcd.io/docs/v3.4/op-guide/security/)

| Resource                    | Description                             |
| --------------------------- | --------------------------------------- |
| Kubernetes Official Docs    | Deep dive into components and TLS setup |
| Certificate Management (CA) | Best practices for CA hierarchies       |
| mTLS in Distributed Systems | Benefits of mutual TLS in microservices |

By following these steps, you’ll ensure that every interaction within your Kubernetes cluster is both encrypted and authenticated, delivering a robust security posture for your applications and infrastructure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/bcccc856-d8a2-4b5f-9f08-c880a46fa7ca)**
>
> Watch video content
