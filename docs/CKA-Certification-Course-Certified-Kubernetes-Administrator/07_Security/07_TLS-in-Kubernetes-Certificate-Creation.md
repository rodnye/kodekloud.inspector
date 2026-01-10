# TLS in Kubernetes Certificate Creation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/TLS-in-Kubernetes-Certificate-Creation)

---

## Table of Contents

- TLS in Kubernetes Certificate Creation
  - 1. Generating CA Certificates
  - 2. Creating Client Certificates
  - 3. Using Client Certificates in API Requests
  - 4. Server-Side Certificates
  - 5. Kube API Server Certificates
  - 6. Kubelet Certificates
  - Conclusion
  - Additional Resources
  - Watch Video
    - 2.1 Admin User Certificate
    - 4.1 Etcd Server Certificate
    - 5.1 Creating the API Server Certificate

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# TLS in Kubernetes Certificate Creation

In this guide, you will learn how to generate TLS certificates for a Kubernetes cluster using OpenSSL. While there are other popular tools such as EasyRSA and CFSSL, we will focus on using OpenSSL to create both Certificate Authority (CA) and client/server certificates. This approach secures the communications within your Kubernetes cluster and ensures certified access.

---

## 1\. Generating CA Certificates

First, create the Certificate Authority (CA) certificates. The process involves generating a private key, creating a Certificate Signing Request (CSR) that includes the CA's common name, and finally signing the CSR with the private key to produce the CA certificate. The completed process provides the CA with its private key (`ca.key`) and root certificate (`ca.crt`), which are essential for subsequently signing other certificates.

```
openssl genrsa -out ca.key 2048
openssl req -new -key ca.key -subj "/CN=KUBERNETES-CA" -out ca.csr
openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt
```

> [!important]
> **Note**
>
> The CA certificate is the cornerstone of your certificate infrastructure, so ensure that you safeguard the private key.

---

## 2\. Creating Client Certificates

### 2.1 Admin User Certificate

To generate a certificate for the admin user:

1.  Create a private key for the admin.
2.  Generate a CSR for the admin user specifying the common name (CN) and organizational unit (OU) to reflect group membership (e.g., `system:masters`). This consistency ensures that the admin identity is properly logged in audit trails and recognized in `kubectl` commands.
3.  Sign the admin CSR with the CA certificate to produce the final admin certificate.

```
openssl genrsa -out admin.key 2048
openssl req -new -key admin.key -subj "/CN=kube-admin/O=system:masters" -out admin.csr
openssl x509 -req -in admin.csr -CA ca.crt -CAkey ca.key -out admin.crt
```

The resulting `admin.crt` file functions as a secure credential, akin to a username and password pair, for authenticating the admin user with the Kubernetes API server.

A similar process is followed to generate client certificates for other components such as the scheduler, controller manager, and kube-proxy.

![The image illustrates the process of generating and signing certificates for "Kube Scheduler," showing keys, certificate requests, and a certificate.](https://kodekloud.com/kk-media/image/upload/v1752869972/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-TLS-in-Kubernetes-Certificate-Creation/frame_230.jpg)

---

## 3\. Using Client Certificates in API Requests

Client certificates eliminate the requirement for using a username and password when making REST API calls to the Kubernetes API server. The admin certificate, for example, can be used to securely communicate with the server by specifying the key, certificate, and CA certificate in your request.

```
curl https://kube-apiserver:6443/api/v1/pods \
  --key admin.key --cert admin.crt --cacert ca.crt
```

The API server will respond with a JSON object listing the pods:

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

Most Kubernetes clients can load these connection parameters via a kubeconfig file that consolidates the information required to reach the API server.

![The image illustrates a diagram of client certificates for Kubernetes components, including admin, scheduler, controller-manager, kube-proxy, and kubelet, with associated keys and certificates.](https://kodekloud.com/kk-media/image/upload/v1752869973/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-TLS-in-Kubernetes-Certificate-Creation/frame_260.jpg)

---

## 4\. Server-Side Certificates

For secure communication, both client and server certificates must trust the same CA root certificate. This certificate is used by both parties to verify the authenticity of the certificate they receive.

![The image illustrates client and server certificates for Kubernetes components, including admin, scheduler, controller-manager, kube-proxy, kubelet, and etcd server, with associated keys.](https://kodekloud.com/kk-media/image/upload/v1752869975/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-TLS-in-Kubernetes-Certificate-Creation/frame_330.jpg)

### 4.1 Etcd Server Certificate

The etcd server, a critical component in high availability configurations, also requires a certificate. If etcd is running as a cluster, remember to generate peer certificates to secure inter-member communications. Once created, the certificates are referenced in the etcd configuration file (commonly, `etcd.yaml`). See the example below:

```
cat etcd.yaml
- --advertise-client-urls=https://127.0.0.1:2379
- --key-file=/path-to-certs/etcdserver.key
- --cert-file=/path-to-certs/etcdserver.crt
- --client-cert-auth=true
- --data-dir=/var/lib/etcd
- --initial-advertise-peer-urls=https://127.0.0.1:2380
- --initial-cluster=master=https://127.0.0.1:2380
- --listen-client-urls=https://127.0.0.1:2379
- --listen-peer-urls=https://127.0.0.1:2380
- --name=master
- --peer-cert-file=/path-to-certs/etcdpeer1.crt
- --peer-client-cert-auth=true
- --peer-key-file=/etc/kubernetes/pki/etcd/peer.key
- --peer-trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
- --snapshot-count=10000
- --trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
```

The `--trusted-ca-file` option ensures that etcd client connections are authenticated using the CA certificate.

---

## 5\. Kube API Server Certificates

The Kube API server is the primary access point for the cluster and is known by several aliases such as "kubernetes", "kubernetes.default", and "kubernetes.default.svc.cluster.local", as well as its IP address. This diversity requires that its certificate includes multiple Subject Alternative Names (SANs).

### 5.1 Creating the API Server Certificate

Start by generating a CSR for the API server:

```
openssl req -new -key apiserver.key -subj "/CN=kube-apiserver" -out apiserver.csr
```

Then, create an OpenSSL configuration file (e.g., `openssl.cnf`) to include all necessary SANs:

```
[req]
req_extensions = v3_req
distinguished_name = req_distinguished_name


[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
subjectAltName = @alt_names


[alt_names]
DNS.1 = kubernetes
DNS.2 = kubernetes.default
DNS.3 = kubernetes.default.svc
DNS.4 = kubernetes.default.svc.cluster.local
IP.1 = 10.96.0.1
IP.2 = 172.17.0.87
```

After configuring the CSR with the SANs, sign the certificate using your CA certificate and key. Specify the final certificate parameters in your kube-apiserver configuration, as shown in the configuration snippet below:

```
ExecStart=/usr/local/bin/kube-apiserver \
  --advertise-address=${INTERNAL_IP} \
  --allow-privileged=true \
  --apiserver-count=3 \
  --authorization-mode=Node,RBAC \
  --bind-address=0.0.0.0 \
  --enable-swagger-ui=true \
  --etcd-cafile=/var/lib/kubernetes/ca.pem \
  --etcd-certfile=/var/lib/kubernetes/apiserver-etcd-client.crt \
  --etcd-keyfile=/var/lib/kubernetes/apiserver-etcd-client.key \
  --etcd-servers=https://127.0.0.1:2379 \
  --event-ttl=1h \
  --kubelet-certificate-authority=/var/lib/kubernetes/ca.pem \
  --kubelet-client-certificate=/var/lib/kubernetes/apiserver-kubelet-client.crt \
  --kubelet-client-key=/var/lib/kubernetes/apiserver-kubelet-client.key \
  --kubelet-https=true \
  --runtime-config=api/all \
  --service-account-key-file=/var/lib/kubernetes/service-account.pem \
  --service-cluster-ip-range=10.32.0.0/24 \
  --service-node-port-range=30000-32767 \
  --client-ca-file=/var/lib/kubernetes/ca.pem \
  --tls-cert-file=/var/lib/kubernetes/apiserver.crt \
  --tls-private-key-file=/var/lib/kubernetes/apiserver.key \
  --v=2
```

> [!important]
> **Tip**
>
> Ensure that all DNS names and IP addresses used by the API server are correctly listed in the SAN section of your OpenSSL configuration.

---

## 6\. Kubelet Certificates

The kubelet is a critical component running on each node, managing node-specific operations and secure communication with the API server. For this purpose, every node needs its own certificate and key pair. When generating these certificates, name them according to the node's identity (e.g., node01, node02, node03).

It is also a best practice to generate a separate certificate for the node when it acts as a client to the API server. This certificate should include an identity format such as "system:node" to ensure the API server can assign the appropriate group membership (e.g., `system:nodes`).

![The image illustrates Kubernetes node certificates for nodes 01, 02, and 03, showing their authentication with a kubelet server using client certificates and keys.](https://kodekloud.com/kk-media/image/upload/v1752869976/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-TLS-in-Kubernetes-Certificate-Creation/frame_640.jpg)

Once generated, include these certificates in the kubeconfig files for the respective nodes to guarantee secure communication.

---

## Conclusion

This guide has detailed the steps required to generate both client and server certificates using OpenSSL in a Kubernetes environment. You learned how to create a CA certificate, generate and sign client certificates (including for administrative use), and produce server certificates for both etcd and the API server. By including multiple domain names and IP addresses in your certificates, you ensure a robust and flexible security architecture for your cluster.

Future topics will explore how to inspect certificate details and how tools like kubeadm streamline certificate management in Kubernetes clusters.

---

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/701f4f60-3899-4058-be82-25b9f5021fc1)**
>
> Watch video content
