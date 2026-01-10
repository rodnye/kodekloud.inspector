# TLS in Kubernetes Certificate Creation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/TLS-in-Kubernetes-Certificate-Creation)

---

## Table of Contents

- TLS in Kubernetes Certificate Creation
  - Generating the CA Certificate
  - Generating Client Certificates
  - Certificate Authorities and Mutual Trust
  - Generating Server-Side Certificates
  - Summary
  - Watch Video
    - Admin User Certificate
    - ETCD Server Certificate
    - Kube API Server Certificate
    - Kubelet Server and Client Certificates

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# TLS in Kubernetes Certificate Creation

In this article, we explain how to generate certificates for a Kubernetes cluster using OpenSSL. While tools like EasyRSA and CFSSL are also available, our focus here is on using OpenSSL. We will start by creating the Certificate Authority (CA) certificates, and then move on to generating client certificates for users and server certificates for core components.

## Generating the CA Certificate

To begin, generate the CA private key, create a certificate signing request (CSR) with the common name "KUBERNETES-CA", and then self-sign it. The CSR includes all certificate details but is unsigned until the CA key is applied.

Run these commands to create your CA certificates:

```
openssl genrsa -out ca.key 2048
openssl req -new -key ca.key -subj "/CN=KUBERNETES-CA" -out ca.csr
openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt
```

At this point, you have successfully created the CA certificate (`ca.crt`) and its corresponding private key (`ca.key`).

## Generating Client Certificates

### Admin User Certificate

For the admin user, a private key is generated first. Then, a CSR is created with the common name "kube-admin". The certificate is signed using the CA certificate and private key. This naming is essential since it is used within audit logs and other system functions.

Run the following commands to generate the admin user's certificate:

```
openssl genrsa -out admin.key 2048
openssl req -new -key admin.key -subj "/CN=kube-admin" -out admin.csr
openssl x509 -req -in admin.csr -CA ca.crt -CAkey ca.key -out admin.crt
```

> [!important]
> **Including Group Details**
>
> To differentiate admin users from basic users, you can include group details in the CSR by specifying the Organizational Unit (OU). For example, adding the group `system:masters` grants administrative privileges:
>
> ```
> openssl genrsa -out admin.key 2048
> openssl req -new -key admin.key -subj "/CN=kube-admin/O=system:masters" -out admin.csr
> openssl x509 -req -in admin.csr -CA ca.crt -CAkey ca.key -out admin.crt
> ```

The above commands create a signed certificate indicating admin privileges. Similar procedures are used to generate certificates for other Kubernetes components (such as the kube scheduler, controller manager, and kube proxy). These certificates enable secure authentication with the kube API server, allowing REST API calls that use the key, client certificate, and CA certificate. For example:

```
curl https://kube-apiserver:6443/api/v1/pods \
  --key admin.key --cert admin.crt --cacert ca.crt
```

This call returns a JSON response similar to:

```
{
  "kind": "PodList",
  "apiVersion": "v1",
  "metadata": {
    "selfLink": "/api/v1/pods"
  },
  "items": []
}
```

Most Kubernetes clients consolidate these parameters into a configuration file called KubeConfig, which details the API server endpoint and corresponding certificates.

## Certificate Authorities and Mutual Trust

Both clients and servers must use a shared CA root certificate for secure communication. This mutual trust ensures that the certificates presented by each party are signed by a trusted authority, much like how browsers validate a website’s certificate.

## Generating Server-Side Certificates

### ETCD Server Certificate

For the etcd server, which is critical in high-availability deployments, the certificate generation process is analogous to that for clients. The etcd server may also require additional peer certificates for secure inter-cluster communication.

After generating the key and certificate for the etcd server, reference them in your etcd configuration file. For example, review your configuration via:

```
cat etcd.yaml
```

And the content of `etcd.yaml` might look like this:

```
etcd:
  --advertise-client-urls=https://127.0.0.1:2379
  --key-file=/path-to-certs/etcdserver.key
  --cert-file=/path-to-certs/etcdserver.crt
  --client-cert-auth=true
  --data-dir=/var/lib/etcd
  --initial-advertise-peer-urls=https://127.0.0.1:2380
  --initial-cluster=master=https://127.0.0.1:2380
  --listen-client-urls=https://127.0.0.1:2379
  --listen-peer-urls=https://127.0.0.1:2380
  --name=master
  --peer-cert-file=/path-to-certs/etcdpeer1.crt
  --peer-client-cert-auth=true
  --peer-key-file=/path/to/etcd/peer.key
  --peer-trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
  --snapshot-count=10000
  --trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
```

> [!important]
> **Security Reminder**
>
> The CA root certificate is critical to verify that only valid clients can establish connections with the etcd server.

### Kube API Server Certificate

The kube API server is the central component of the Kubernetes control plane. This server is recognized by multiple DNS names and IP addresses, so its certificate must include all alternate names.

1.  Generate a key and CSR for the kube API server:

    ```
    openssl req -new -key apiserver.key -subj "/CN=kube-apiserver" -out apiserver.csr
    ```

2.  Create an OpenSSL configuration file (e.g., `openssl.cnf`) with the following content to define Subject Alternative Names (SAN):

    ```
    [req]
    req_extensions = v3_req
    distinguished_name = req_distinguished_name


    [ v3_req ]
    basicConstraints = CA:FALSE
    keyUsage = nonRepudiation
    subjectAltName = @alt_names


    [alt_names]
    DNS.1 = kubernetes
    DNS.2 = kubernetes.default
    DNS.3 = kubernetes.default.svc
    DNS.4 = kubernetes.default.svc.cluster.local
    IP.1 = 10.96.0.1
    IP.2 = 172.17.0.87
    ```

3.  Sign the certificate using the CA certificate and key. Once complete, the kube API server certificate is ready for use.

The kube API server’s configuration references these certificates to secure communications. For example:

```
ExecStart=/usr/local/bin/kube-apiserver \\
  --advertise-address=${INTERNAL_IP} \\
  --allow-privileged=true \\
  --apiserver-count=3 \\
  --authorization-mode=Node,RBAC \\
  --bind-address=0.0.0.0 \\
  --enable-swagger-ui=true \\
  --etcd-cafile=/var/lib/kubernetes/ca.pem \\
  --etcd-certfile=/var/lib/kubernetes/apiserver-etcd-client.crt \\
  --etcd-keyfile=/var/lib/kubernetes/apiserver-etcd-client.key \\
  --etcd-servers=https://127.0.0.1:2379 \\
  --event-ttl=1h \\
  --kubelet-certificate-authority=/var/lib/kubernetes/ca.pem \\
  --kubelet-client-certificate=/var/lib/kubernetes/apiserver-kubelet-client.crt \\
  --kubelet-client-key=/var/lib/kubernetes/apiserver-kubelet-client.key \\
  --kubelet-https=true \\
  --runtime-config=api/all \\
  --service-account-key-file=/var/lib/kubernetes/service-account.pem \\
  --service-cluster-ip-range=10.32.0.0/24 \\
  --service-node-port-range=30000-32767 \\
  --client-ca-file=/var/lib/kubernetes/ca.pem \\
  --tls-cert-file=/var/lib/kubernetes/apiserver.crt \\
  --tls-private-key-file=/var/lib/kubernetes/apiserver.key \\
  --v=2
```

### Kubelet Server and Client Certificates

Each Kubernetes node runs a kubelet, which serves as an HTTPS API server to manage node operations. Every node must possess its own key and certificate pair, typically named after the node (e.g., node-01, node-02, node-03).

The node-specific certificates are then referenced inside the kubelet configuration file. For example:

```
kind: KubeletConfiguration
apiVersion: kubelet.config.k8s.io/v1beta1
authentication:
  x509:
    clientCAFile: "/var/lib/kubernetes/ca.pem"
authorization:
  mode: Webhook
clusterDomain: "cluster.local"
```

Client certificates for the kubelet enable authentication against the kube API server. They follow a naming convention using the prefix "system:node:" followed by the node name, ensuring that the API server assigns the correct permissions.

![The image illustrates Kubernetes node certificates for nodes 01, 02, and 03, showing their association with kubelet client certificates and keys for secure communication.](https://kodekloud.com/kk-media/image/upload/v1752871420/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-TLS-in-Kubernetes-Certificate-Creation/frame_630.jpg)

## Summary

In this article, we covered the following key steps:

1.  **Generating the CA Certificates:**  
    Creating a self-signed CA to sign all other certificates.
2.  **Creating Client Certificates:**  
    Generating certificates for admin users and control plane components (like the kube scheduler, controller manager, and kube proxy) for secure authentication.
3.  **Securing the Kube API Server:**  
    Producing a kube API server certificate that includes multiple DNS names and IP addresses to guarantee trust.
4.  **Generating Server-Side Certificates:**  
    Producing certificates for the etcd server and node-specific certificates for kubelets to enable secure component-to-component communications.

All these certificates play a crucial role in ensuring secure communication within the Kubernetes cluster by verifying the identity of each component via the shared CA certificate.

![The image illustrates the process of generating and signing certificates for "Kube Scheduler," showing keys, certificate signing requests, and a certificate.](https://kodekloud.com/kk-media/image/upload/v1752871604/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-TLS-in-Kubernetes-Certificate-Creation/frame_230.jpg)

![The image illustrates client and server certificates for Kubernetes components, including admin, scheduler, controller-manager, kube-proxy, etcd server, kube-api server, and kubelet server.](https://kodekloud.com/kk-media/image/upload/v1752871606/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-TLS-in-Kubernetes-Certificate-Creation/frame_300.jpg)

![The image illustrates ETCD server and peer configurations, showing certificates and keys, alongside a certificate labeled "ETCD-SERVER" with a decorative border.](https://kodekloud.com/kk-media/image/upload/v1752871607/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-TLS-in-Kubernetes-Certificate-Creation/frame_350.jpg)

![The image shows a certificate for a Kube API server, including details like IP addresses and domain names, alongside icons representing a certificate and key.](https://kodekloud.com/kk-media/image/upload/v1752871610/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-TLS-in-Kubernetes-Certificate-Creation/frame_420.jpg)

In the next article, we will explore how to view certificate information and how KubeADM automates certificate configuration.

Happy securing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/ba0dbcbe-ece9-4738-8ac8-b2d0c1853e5b)**
>
> Watch video content
