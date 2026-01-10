# K8s PKI Certificate Creation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Platform-Security/K8s-PKI-Certificate-Creation)

---

## Table of Contents

- K8s PKI Certificate Creation
  - Certificate Overview
  - 1. Generate the CA Certificate
  - 2. Generate Client Certificates
  - 3. Using Client Certificates
  - 4. Server-Side Certificates
  - Links and References
  - Watch Video
    - 2.1 Admin User
    - 2.2 System Component Users
    - 4.1 etcd Server and Peers
    - 4.2 kube-apiserver
    - 4.3 Kubelet Server

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Platform Security

# K8s PKI Certificate Creation

Secure your Kubernetes cluster by generating TLS certificates using OpenSSL. This guide walks through creating a root Certificate Authority (CA), issuing client certificates for users and system components, and setting up server certificates for etcd, the API server, and kubelet nodes.

> [!important]
> **Prerequisites**
>
> - Ensure OpenSSL is installed (`openssl version`).
> - Work in a secure directory with strict file permissions.
> - Replace placeholder IPs, hostnames, and node names to match your environment.

## Certificate Overview

| Artifact                              | Purpose                                  | Example Command Snippet                  |
| ------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `ca.key` / `ca.crt`                   | Root CA private key and self-signed cert | `openssl genrsa -out ca.key 2048`        |
| `admin.key` / `admin.crt`             | Cluster-admin user credentials           | `openssl req -new -key admin.key…`       |
| `etcd-server.key` / `etcd-server.crt` | etcd server TLS pair                     | `openssl x509 -req -in etcd-server.csr…` |

---

## 1\. Generate the CA Certificate

Protect your CA private key at all costs—this key signs every other certificate in your cluster.

> [!important]
> **Warning**
>
> Protect `ca.key` securely. If compromised, all cluster certificates become untrusted.

```
openssl genrsa -out ca.key 2048
openssl req -new -key ca.key -subj "/CN=KUBERNETES-CA" -out ca.csr
openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt
```

- **ca.key**: Private key for your root CA.
- **ca.csr**: Certificate Signing Request with CA identity.
- **ca.crt**: Self-signed root certificate trusted by all components.

---

## 2\. Generate Client Certificates

Client certificates authenticate users and system services to the API server. All CSRs are signed by the root CA.

### 2.1 Admin User

Create a key, CSR, and certificate for the cluster administrator. Membership in `system:masters` grants full control.

```
openssl genrsa -out admin.key 2048
openssl req -new -key admin.key \
  -subj "/CN=kube-admin/O=system:masters" \
  -out admin.csr
openssl x509 -req -in admin.csr \
  -CA ca.crt -CAkey ca.key \
  -out admin.crt
```

- **Common Name (CN)**: Identifier seen in API audit logs.
- **Organization (O)**: Group membership.

### 2.2 System Component Users

Repeat the process for each Kubernetes control-plane component:

- kube-scheduler
- kube-controller-manager
- kube-proxy

![The image shows a certificate for "Kube Scheduler" with related icons and text about generating keys, certificate signing requests, and signing certificates.](https://kodekloud.com/kk-media/image/upload/v1752880884/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-K8s-PKI-Certificate-Creation/kube-scheduler-certificate-signing-keys.jpg)

Each CSR’s CN must be prefixed with `system:` (e.g., `/CN=system:kube-scheduler`).

---

## 3\. Using Client Certificates

You can invoke the API directly with `curl`:

```
curl https://kube-apiserver:6443/api/v1/pods \
  --key admin.key \
  --cert admin.crt \
  --cacert ca.crt
```

Or embed credentials in a `kubeconfig` file:

```
apiVersion: v1
clusters:
- cluster:
    certificate-authority: ca.crt
    server: https://kube-apiserver:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kube-admin
  name: admin-context
current-context: admin-context
kind: Config
users:
- name: kube-admin
  user:
    client-certificate: admin.crt
    client-key: admin.key
```

Most Kubernetes clients leverage `kubeconfig` to manage certificates and endpoints.

---

## 4\. Server-Side Certificates

All Kubernetes servers must trust the CA root (`ca.crt`) and present valid certificates signed by it.

![The image is a diagram showing the organization of client and server certificates for Kubernetes components, including keys and certificates for various services like kube-scheduler, kube-controller-manager, and kubelet.](https://kodekloud.com/kk-media/image/upload/v1752880886/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-K8s-PKI-Certificate-Creation/kubernetes-client-server-certificates-diagram.jpg)

### 4.1 etcd Server and Peers

Generate a certificate for the etcd server and peers in HA clusters:

```
openssl genrsa -out etcd-server.key 2048
openssl req -new -key etcd-server.key \
  -subj "/CN=etcd-server" \
  -out etcd-server.csr
openssl x509 -req -in etcd-server.csr \
  -CA ca.crt -CAkey ca.key \
  -out etcd-server.crt
```

For peer communication, use `/CN=etcd-peer`. Then configure your `etcd` service:

```
# etcd.yaml
etcd:
  --advertise-client-urls=https://127.0.0.1:2379
  --listen-client-urls=https://127.0.0.1:2379
  --cert-file=/path-to-certs/etcd-server.crt
  --key-file=/path-to-certs/etcd-server.key
  --client-cert-auth=true
  --trusted-ca-file=/path-to-certs/ca.crt
  --listen-peer-urls=https://127.0.0.1:2380
  --initial-advertise-peer-urls=https://127.0.0.1:2380
  --peer-cert-file=/path-to-certs/etcd-peer.crt
  --peer-key-file=/path-to-certs/etcd-peer.key
  --peer-client-cert-auth=true
  --peer-trusted-ca-file=/path-to-certs/ca.crt
```

![The image illustrates the structure of ETCD servers and peers, showing certificates and keys for secure communication. It includes a visual representation of a certificate labeled "ETCD-SERVER."](https://kodekloud.com/kk-media/image/upload/v1752880887/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-K8s-PKI-Certificate-Creation/etcd-servers-peers-structure-diagram.jpg)

### 4.2 kube-apiserver

The API server certificate must cover all DNS names and IP addresses used by the service. Create an OpenSSL config (`openssl.cnf`) with an `[ alt_names ]` section:

```
[ req ]
distinguished_name = req_distinguished_name
req_extensions     = v3_req


[ v3_req ]
subjectAltName = @alt_names


[ alt_names ]
DNS.1 = kube-apiserver
DNS.2 = kubernetes
DNS.3 = kubernetes.default
DNS.4 = kubernetes.default.svc
DNS.5 = kubernetes.default.svc.cluster.local
IP.1  = 10.32.0.1
# Add more IPs/hostnames as needed
```

Generate and sign the CSR:

```
openssl genrsa -out apiserver.key 2048
openssl req -new -key apiserver.key \
  -subj "/CN=kube-apiserver" \
  -config openssl.cnf \
  -out apiserver.csr
openssl x509 -req -in apiserver.csr \
  -CA ca.crt -CAkey ca.key \
  -extensions v3_req \
  -extfile openssl.cnf \
  -out apiserver.crt
```

![The image shows a digital certificate for a Kube API server, including details like IP addresses and a key icon representing security credentials.](https://kodekloud.com/kk-media/image/upload/v1752880888/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-K8s-PKI-Certificate-Creation/kube-api-server-digital-certificate.jpg)

Configure the API server service:

```
ExecStart=/usr/local/bin/kube-apiserver \
  --advertise-address=${INTERNAL_IP} \
  --bind-address=0.0.0.0 \
  --etcd-servers=https://127.0.0.1:2379 \
  --etcd-cafile=/var/lib/kubernetes/ca.crt \
  --etcd-certfile=/var/lib/kubernetes/apiserver-etcd-client.crt \
  --etcd-keyfile=/var/lib/kubernetes/apiserver-etcd-client.key \
  --client-ca-file=/var/lib/kubernetes/ca.crt \
  --tls-cert-file=/var/lib/kubernetes/apiserver.crt \
  --tls-private-key-file=/var/lib/kubernetes/apiserver.key \
  --kubelet-certificate-authority=/var/lib/kubernetes/ca.crt \
  --kubelet-client-certificate=/var/lib/kubernetes/apiserver-kubelet-client.crt \
  --kubelet-client-key=/var/lib/kubernetes/apiserver-kubelet-client.key \
  --service-account-key-file=/var/lib/kubernetes/service-account.pem \
  --authorization-mode=Node,RBAC \
  --service-cluster-ip-range=10.32.0.0/24 \
  --service-node-port-range=30000-32767 \
  --v=2
```

### 4.3 Kubelet Server

Each Kubernetes node requires its own TLS certificate named after the node:

```
openssl genrsa -out kubelet-node01.key 2048
openssl req -new -key kubelet-node01.key \
  -subj "/CN=system:node:node01/O=system:nodes" \
  -out kubelet-node01.csr
openssl x509 -req -in kubelet-node01.csr \
  -CA ca.crt -CAkey ca.key \
  -out kubelet-node01.crt
```

- **CN**: `system:node:<nodeName>`
- **O**: `system:nodes`

Embed the certificates in the kubelet configuration (`/var/lib/kubelet/config.yaml`):

```
kind: KubeletConfiguration
apiVersion: kubelet.config.k8s.io/v1beta1
authentication:
  x509:
    clientCAFile: "/var/lib/kubernetes/ca.crt"
authorization:
  mode: Webhook
clusterDomain: "cluster.local"
clusterDNS:
  - "10.32.0.10"
podCIDR: "${POD_CIDR}"
resolvConf: "/run/systemd/resolve/resolv.conf"
runtimeRequestTimeout: "15m"
tlsCertFile: "/var/lib/kubelet/kubelet-node01.crt"
tlsPrivateKeyFile: "/var/lib/kubelet/kubelet-node01.key"
```

![The image shows a diagram of Kubernetes nodes with client certificates for three nodes (node01, node02, node03) under the "KUBECTL NODES (CLIENT CERT)" heading, illustrating their authentication setup.](https://kodekloud.com/kk-media/image/upload/v1752880889/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-K8s-PKI-Certificate-Creation/kubernetes-nodes-client-certificates-diagram.jpg)

---

That completes the Kubernetes PKI certificate generation process. For automation, explore how `kubeadm` handles this [in the docs](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-certs/).

## Links and References

- [Kubernetes TLS Bootstrapping](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet-tls-bootstrapping/)
- [OpenSSL Documentation](https://www.openssl.org/docs/)
- [Kubernetes Certificates with kubeadm](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-certs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/1ec5483f-4641-4e58-af0c-a9b5b2b1357f)**
>
> Watch video content
