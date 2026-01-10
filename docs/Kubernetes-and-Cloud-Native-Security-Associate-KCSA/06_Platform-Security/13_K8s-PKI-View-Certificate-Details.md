# K8s PKI View Certificate Details - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Platform-Security/K8s-PKI-View-Certificate-Details)

---

## Table of Contents

- K8s PKI View Certificate Details
  - 1. Cluster Provisioning Methods
  - 2. Gather Certificate Paths
  - 3. Inspect Certificates with OpenSSL
  - 4. Document Certificate Metadata
  - 5. Troubleshooting and Logs
  - Links and References
  - Watch Video
  - Practice Lab
    - 1.1 Manual Deployment (Native OS Services)
    - 1.2 kubeadm Deployment (Static Pods)
    - 5.1 Native Services
    - 5.2 kubeadm (Static Pods)

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Platform Security

# K8s PKI View Certificate Details

In this guide, you’ll learn how to locate, inspect, and verify all TLS certificates in an existing Kubernetes cluster. As a cluster administrator, performing a certificate health check ensures control-plane components and nodes trust the correct Certificate Authority (CA) and have valid, unexpired certificates.

## 1\. Cluster Provisioning Methods

First, determine how your control-plane is deployed. This affects where certificate files live and how services reference them.

### 1.1 Manual Deployment (Native OS Services)

When Kubernetes components are managed by **systemd**, certificate flags appear in each service unit. For example, view the API server unit:

```
cat /etc/systemd/system/kube-apiserver.service
[Service]
ExecStart=/usr/local/bin/kube-apiserver \
  --advertise-address=172.17.0.32 \
  --client-ca-file=/var/lib/kubernetes/ca.pem \
  --etcd-cafile=/var/lib/kubernetes/ca.pem \
  --etcd-certfile=/var/lib/kubernetes/kubernetes.pem \
  --etcd-keyfile=/var/lib/kubernetes/kubernetes-key.pem \
  --kubelet-certificate-authority=/var/lib/kubernetes/ca.pem \
  --kubelet-client-cert-file=/var/lib/kubernetes/kubelet-client.crt \
  --kubelet-client-key=/var/lib/kubernetes/kubelet-client.key \
  --tls-cert-file=/var/lib/kubernetes/kubernetes.crt \
  --tls-private-key-file=/var/lib/kubernetes/kubernetes-key.pem \
  --allow-privileged=true \
  --service-node-port-range=30000-32767 \
  --v=2
```

### 1.2 kubeadm Deployment (Static Pods)

With **kubeadm**, control-plane components run as static pods. Check the manifest under `/etc/kubernetes/manifests/kube-apiserver.yaml`:

```
apiVersion: v1
kind: Pod
metadata:
  name: kube-apiserver
  namespace: kube-system
spec:
  containers:
  - name: kube-apiserver
    image: k8s.gcr.io/kube-apiserver:v1.X.Y
    command:
      - kube-apiserver
      - --client-ca-file=/etc/kubernetes/pki/ca.crt
      - --etcd-cafile=/etc/kubernetes/pki/etcd/ca.crt
      - --etcd-certfile=/etc/kubernetes/pki/apiserver-etcd-client.crt
      - --etcd-keyfile=/etc/kubernetes/pki/apiserver-etcd-client.key
      - --kubelet-client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt
      - --kubelet-client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key
      - --tls-cert-file=/etc/kubernetes/pki/apiserver.crt
      - --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
      - --service-account-key-file=/etc/kubernetes/pki/sa.pub
      - --secure-port=6443
      - --service-cluster-ip-range=10.96.0.0/12
      - --authorization-mode=Node,RBAC
```

## 2\. Gather Certificate Paths

Extract every file path ending in `.crt`, `.key`, or `.pem` from service units or manifests.

| File Extension | Description                |
| -------------- | -------------------------- |
| .crt           | X.509 certificate          |
| .key           | Private key                |
| .pem           | Certificate or private key |

> [!important]
> **Note**
>
> Track each certificate’s path along with its Common Name (CN), Subject Alternative Names (SANs), issuer, organization (O), and expiration date.

## 3\. Inspect Certificates with OpenSSL

For each certificate file, run:

```
openssl x509 -in /etc/kubernetes/pki/apiserver.crt -text -noout
```

Key fields to verify:

- **Subject**: confirms the CN (e.g., `CN=kube-apiserver`)
- **X509v3 Subject Alternative Name**: ensure all required IPs/DNS entries exist
- **Issuer**: usually the Kubernetes CA (`O=kubernetes`)
- **Validity**: check `Not Before` and `Not After` dates for expiry

> [!important]
> **Warning**
>
> Expired or misconfigured certificates can prevent API server communication. Always verify the `Not After` date to avoid downtime!

## 4\. Document Certificate Metadata

Organize certificate details in a spreadsheet or table for easy tracking. An example layout:

![The image shows a table listing Kubernetes certificate details, including paths, common names, alternative names, organizations, issuers, and expiration dates.](https://kodekloud.com/kk-media/image/upload/v1752880891/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-K8s-PKI-View-Certificate-Details/kubernetes-certificate-details-table.jpg)

Refer to the [official Kubernetes certificates documentation](https://kubernetes.io/docs/concepts/cluster-administration/certificates/) for certificate requirements and best practices.

## 5\. Troubleshooting and Logs

If a component fails due to certificate issues, view logs to pinpoint TLS errors.

### 5.1 Native Services

```
journalctl -u etcd.service -l
```

Sample output snippet:

```
2019-02-13T02:53:28.185353Z I | embed: ClientTLS: cert = /etc/kubernetes/pki/etcd/server.crt, key = /etc/kubernetes/pki/etcd/server.key
WARNING: transport: authentication handshake failed: remote error: tls: bad certificate
```

### 5.2 kubeadm (Static Pods)

Fetch API server logs:

```
kubectl -n kube-system logs kube-apiserver-<node-name>
```

If `kubectl` is unavailable, use Docker:

```
docker ps -a
docker logs <container-id>
```

---

## Links and References

- [Kubernetes Certificates](https://kubernetes.io/docs/concepts/cluster-administration/certificates/)
- [OpenSSL x509 Documentation](https://www.openssl.org/docs/man1.1.1/man1/openssl-x509.html)
- [kubeadm Init Certificates](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/#certificate-key)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/51d1ce51-9556-426f-96ef-813db6a288b4)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/9c9acf86-2ae2-417b-9f84-c6a476e6edf5)**
>
> Practice lab
