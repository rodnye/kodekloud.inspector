# Solution View Certification Details - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/Solution-View-Certification-Details)

---

## Table of Contents

- Solution View Certification Details
  - 1. Certificate Files for the Kube API Server
  - 2. The API Server Serving Certificate
  - 3. The ETCD Server Certificate
  - 4. Analyzing Certificate Details
  - 5. Certificate Validity Durations
  - 6. Troubleshooting kubectl Connection and ETCD Certificate Issues
  - 7. Final Verification
  - Certificate Overview
  - Watch Video
    - a. Kube API Server Certificate Common Name and Issuer
    - b. Alternate Names Verification
    - c. ETCD Server Certificate Common Name
    - a. Kube API Server Certificate Validity
    - b. Root CA Certificate Validity

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# Solution View Certification Details

In this article, we explore the lab solution for inspecting certificate details within a Kubernetes control plane. You will learn how to review manifest file snippets, identify certificate and key files used by the Kube API Server for secure communications (with both ETCD and the Kubelet), and troubleshoot common TLS issues.

---

## 1\. Certificate Files for the Kube API Server

The Kube API Server manifest—typically located at `/etc/kubernetes/manifests/kube-apiserver.yaml`—specifies various TLS parameters. The following excerpt demonstrates the configuration and certificate file usage:

```
namespace: kube-system
spec:
  containers:
    - name: kube-apiserver
      command:
        - kube-apiserver
        - --advertise-address=10.46.98.9
        - --allow-privileged=true
        - --authorization-mode=Node,RBAC
        - --client-ca-file=/etc/kubernetes/pki/ca.crt
        - --enable-admission-plugins=NodeRestriction
        - --enable-bootstrap-token-auth=true
        - --etcd-cafile=/etc/kubernetes/pki/etcd/ca.crt
        - --etcd-certfile=/etc/kubernetes/pki/apiserver-etcd-client.crt
        - --etcd-keyfile=/etc/kubernetes/pki/apiserver-etcd-client.key
        - --etcd-servers=https://127.0.0.1:2379
        - --insecure-port=0
        - --kubelet-client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt
        - --kubelet-client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key
        - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
        - --proxy-client-cert-file=/etc/kubernetes/pki/front-proxy-client.crt
        - --proxy-client-key-file=/etc/kubernetes/pki/front-proxy-client.key
        - --requestheader-allowed-names=front-proxy-client
        - --requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.crt
        - --requestheader-extra-headers-prefix=X-Remote-Extra-
        - --requestheader-group-headers=X-Remote-Group
        - --requestheader-username-headers=X-Remote-User
        - --secure-port=6443
        - --service-account-issuer=https://kubernetes.default.svc.cluster.local
        - --service-account-key-file=/etc/kubernetes/pki/sa.pub
        - --service-account-signing-key-file=/etc/kubernetes/pki/sa.key
        - --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
      image: k8s.gcr.io/kube-apiserver:v1.20.0
      imagePullPolicy: IfNotPresent
      livenessProbe:
        failureThreshold: 8
        httpGet:
          host: 10.46.98.9
```

In this configuration:

- The API server’s serving credentials are provided by files such as `/etc/kubernetes/pki/apiserver.crt` and `/etc/kubernetes/pki/apiserver.key` (demonstrated in later snippets).
- A dedicated certificate and key pair is used for secure communication with the ETCD server (specified with the `--etcd-certfile` and `--etcd-keyfile` flags).
- A separate certificate is set for authenticating the Kubelet using the flags `--kubelet-client-certificate` and `--kubelet-client-key`.

---

## 2\. The API Server Serving Certificate

The subsequent snippet confirms the certificate and key utilized by the Kube API server to serve HTTPS traffic:

```
namespace: kube-system
spec:
  containers:
    - name: kube-apiserver
      command:
        - kube-apiserver
        - --advertise-address=10.46.98.9
        - --allow-privileged=true
        - --authorization-mode=Node,RBAC
        - --client-ca-file=/etc/kubernetes/pki/ca.crt
        - --enable-admission-plugins=NodeRestriction
        - --enable-bootstrap-token-auth=true
        - --etcd-cafile=/etc/kubernetes/pki/etcd/ca.crt
        - --etcd-certfile=/etc/kubernetes/pki/apiserver-etcd-client.crt
        - --etcd-keyfile=/etc/kubernetes/pki/apiserver-etcd-client.key
        - --insecure-port=0
        - --kubelet-client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt
        - --kubelet-client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key
        - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
        - --proxy-client-cert-file=/etc/kubernetes/pki/front-proxy-client.crt
        - --proxy-client-key-file=/etc/kubernetes/pki/front-proxy-client.key
        - --requestheader-allowed-names=proxy-client
        - --requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.crt
        - --requestheader-group-headers=X-Remote-Group
        - --requestheader-username-headers=X-Remote-User
        - --secure-port=6443
        - --service-account-issuer=https://kubernetes.default.svc.cluster.local
        - --service-account-keyfile=/etc/kubernetes/pki/sa.pub
        - --service-account-signing-keyfile=/etc/kubernetes/pki/sa.key
        - --tls-cert-file=/etc/kubernetes/pki/apiserver.crt
        - --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
      image: k8s.gcr.io/kube-apiserver:v1.20.0
      imagePullPolicy: IfNotPresent
      livenessProbe:
        failureThreshold: 8
        httpGet:
          host: 10.46.98.9
```

Notice the use of `--tls-cert-file` and `--tls-private-key-file` flags, which designate the locations of the certificate file `/etc/kubernetes/pki/apiserver.crt` and its matching private key `/etc/kubernetes/pki/apiserver.key` used for HTTPS communications with clients.

---

## 3\. The ETCD Server Certificate

Understanding ETCD server configuration is critical for troubleshooting certificate-related issues in the control plane. The ETCD pod mounts the PKI directory and specifies its certificate files as demonstrated below:

```
kind: Pod
metadata:
  labels:
    component: etcd
    tier: control-plane
  name: etcd
  namespace: kube-system
spec:
  containers:
  - command:
    - etcd
    - --advertise-client-urls=https://10.46.98.9:2379
    - --cert-file=/etc/kubernetes/pki/etcd/server.crt
    - --client-cert-auth=true
    - --data-dir=/var/lib/etcd
    - --initial-advertise-peer-urls=https://10.46.98.9:2380
    - --initial-cluster=controlplane=https://10.46.98.9:2380
    - --key-file=/etc/kubernetes/pki/etcd/server.key
    - --listen-client-urls=https://127.0.0.1:2379,https://10.46.98.9:2379
    - --listen-metrics-urls=http://127.0.0.1:2381
    - --listen-peer-urls=https://10.46.98.9:2380
    - --name=controlplane
    - --peer-cert-file=/etc/kubernetes/pki/etcd/peer.crt
    - --peer-client-cert-auth=true
    - --peer-key-file=/etc/kubernetes/pki/etcd/peer.key
    - --peer-trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
    - --snapshot-count=10000
    - --trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
  image: k8s.gcr.io/etcd:3.4.13-0
  imagePullPolicy: IfNotPresent
  livenessProbe:
    httpGet:
      host: 127.0.0.1
      path: /health
      port: 2381
    failureThreshold: 8
```

Key details from this configuration:

- The ETCD server’s serving certificate is `/etc/kubernetes/pki/etcd/server.crt`.
- Its matching private key is `/etc/kubernetes/pki/etcd/server.key`.
- The trusted CA for authenticating clients and establishing peer connections is provided via `/etc/kubernetes/pki/etcd/ca.crt`.

A volume mount in the ETCD pod’s manifest ensures that these certificate files are available from the host system.

---

## 4\. Analyzing Certificate Details

A closer examination of certificate details using OpenSSL can help confirm that each component is configured correctly.

### a. Kube API Server Certificate Common Name and Issuer

Run the following OpenSSL command to inspect the API server certificate:

```
root@controlplane:~# openssl x509 -in /etc/kubernetes/pki/apiserver.crt -text -noout
```

The output will include:

- **Issuer:** CN = kubernetes
- **Subject:** CN = kube-apiserver

This confirms that the certificate is issued by the Kubernetes CA with the common name “kube-apiserver.”

### b. Alternate Names Verification

Alternate names in the certificate’s Subject Alternative Name (SAN) list generally include:

- controlplane.kubernetes
- kubernetes.default
- kubernetes.default.svc
- kubernetes.default.svc.cluster.local
- IP addresses (e.g., 10.46.98.9)

If an alias such as “kube-master” is missing from the SAN list, it indicates that “kube-master” is not configured on the kube-apiserver certificate.

### c. ETCD Server Certificate Common Name

For the ETCD server, inspect the certificate using this command:

```
root@controlplane:~# openssl x509 -in /etc/kubernetes/pki/etcd/server.crt -text -noout
```

The output reveals:

- **Issuer:** CN = etcd-ca
- **Subject:** CN = controlplane

This indicates that the ETCD server certificate is issued by the ETCD CA with the common name set to “controlplane.”

---

## 5\. Certificate Validity Durations

The validity period of your certificates is crucial to maintaining secure operations.

### a. Kube API Server Certificate Validity

When you run the OpenSSL command on `/etc/kubernetes/pki/apiserver.crt`, you may see that the certificate is valid from April 17, 2022, to April 17, 2023—a one-year duration.

### b. Root CA Certificate Validity

Inspecting the root CA certificate (e.g., `/etc/kubernetes/pki/ca.crt`) reveals a validity period of approximately 10 years (from April 17, 2022, to April 14, 2032).

---

## 6\. Troubleshooting kubectl Connection and ETCD Certificate Issues

After updating control plane configurations, you might encounter errors such as:

```
root@controlplane:~# kubectl get pods
The connection to the server controlplane:6443 was refused - did you specify the right host or port?
```

This error suggests that the kube-apiserver cannot be reached. One troubleshooting approach is to inspect the API server container using Docker:

```
root@controlplane:~# docker ps -a | grep kube-apiserver
```

Often, you may spot errors in the API server logs, for example:

```
error while dialing TCP 127.0.0.1:2379
```

Since port 2379 is associated with ETCD, checking the ETCD server logs might reveal an error like:

```
open /etc/kubernetes/pki/etcd/server-certificate.crt: no such file or directory
```

This indicates that the ETCD server is looking for a certificate in an incorrect location (e.g., `server-certificate.crt` instead of `server.crt`). To resolve such issues:

1.  Ensure the certificate file exists on the host at `/etc/kubernetes/pki/etcd/` (typically as `server.crt` and `server.key`).
2.  Update the ETCD manifest file to use the correct certificate file path.
3.  Save the changes and allow time for the container to restart.

> [!important]
> **Tip**
>
> If you encounter TLS handshake errors (e.g., "certificate signed by unknown authority") in the API server logs, verify that the ETCD connection references the correct CA file. The ETCD trusted CA should be `/etc/kubernetes/pki/etcd/ca.crt`, and the client certificate parameters (`--etcd-certfile` and `--etcd-keyfile`) should be consistent with ETCD requirements.

---

## 7\. Final Verification

After resolving certificate configuration issues, verify that communication between components is restored. For example, running:

```
root@controlplane:~# kubectl get nodes
```

should output details similar to:

```
NAME          STATUS   ROLES                  AGE   VERSION
controlplane  Ready    control-plane,master   41m   v1.20.0
```

This output confirms that the kube-apiserver is operational with proper TLS settings.

---

## Certificate Overview

| Component             | Certificate File                                 | Key File                                         | Issuer     |
| --------------------- | ------------------------------------------------ | ------------------------------------------------ | ---------- |
| Kube API Server       | /etc/kubernetes/pki/apiserver.crt                | /etc/kubernetes/pki/apiserver.key                | kubernetes |
| ETCD Server           | /etc/kubernetes/pki/etcd/server.crt              | /etc/kubernetes/pki/etcd/server.key              | etcd-ca    |
| Kubelet Communication | /etc/kubernetes/pki/apiserver-kubelet-client.crt | /etc/kubernetes/pki/apiserver-kubelet-client.key | \\-        |

---

This article underscores the importance of verifying certificate and key configurations in your Kubernetes manifests. By ensuring proper file paths and matching certificate data across the API server, ETCD, and Kubelet, you can maintain a secure and reliable control plane environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/509ce9e1-f72f-4b02-8f2a-9dde3097b364)**
>
> Watch video content
