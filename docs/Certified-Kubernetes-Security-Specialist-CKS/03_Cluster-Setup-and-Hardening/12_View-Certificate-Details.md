# View Certificate Details - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/View-Certificate-Details)

---

## Table of Contents

- View Certificate Details
  - Native Service Configuration Example
  - Kubeadm-Deployed Cluster Example
  - Steps to Perform a Certificate Health Check
  - Troubleshooting with Service Logs
  - Organizing Certificate Details
  - Conclusion
  - Watch Video
    - For Native OS Services
    - For Kubeadm-Deployed Clusters

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# View Certificate Details

Welcome to this lesson on viewing and verifying certificate details in an existing Kubernetes cluster. In this guide, you'll learn how to perform a thorough health check of all certificates used within your cluster—a crucial task when troubleshooting certificate-related issues or auditing your Kubernetes environment.

Before diving into certificate inspection, it’s essential to understand how your cluster was set up. Kubernetes clusters can be deployed in various ways, and each method manages certificates differently:

- When deploying a cluster from scratch, administrators generate each certificate manually.
- With automated provisioning tools like kubeadm, certificates are automatically generated and configured while deploying Kubernetes components as native services or pods.

## Native Service Configuration Example

For clusters set up using native OS services, certificates are embedded in service configuration files. Consider the following example from the kube-apiserver service configuration:

```
cat /etc/systemd/system/kube-apiserver.service
[Service]
ExecStart=/usr/local/bin/kube-apiserver \
    --advertise-address=172.17.0.32 \
    --allow-privileged=true \
    --apiserver-count=3 \
    --authorization-mode=Node,RBAC \
    --bind-address=0.0.0.0 \
    --client-ca-file=/var/lib/kubernetes/ca.pem \
    --enable-swagger-ui=true \
    --etcd-cafile=/var/lib/kubernetes/ca.pem \
    --etcd-certfile=/var/lib/kubernetes/kubernetes-key.pem \
    --etcd-keyfile=/var/lib/kubernetes/kubernetes-key.pem \
    --event-ttl=1h \
    --kubelet-certificate-authority=/var/lib/kubernetes/ca.pem \
    --kubelet-client-key=/var/lib/kubernetes/kubelet-key.pem \
    --kubelet-https=true \
    --service-node-port-range=30000-32767 \
    --tls-cert-file=/var/lib/kubernetes/kubernetes.pem \
    --tls-private-key-file=/var/lib/kubernetes/kubernetes-key.pem \
    --v=2
```

## Kubeadm-Deployed Cluster Example

With kubeadm, Kubernetes components run as pods. The configuration for the kube-apiserver, for example, can be found in the manifest file:

```
cat /etc/kubernetes/manifests/kube-apiserver.yaml
spec:
  containers:
    - command:
        - kube-apiserver
        - --authorization-mode=Node,RBAC
        - --advertise-address=172.17.0.32
        - --allow-privileged=true
        - --client-ca-file=/etc/kubernetes/pki/ca.crt
        - --disable-admission-plugins=PersistentVolumeLabel
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
```

## Steps to Perform a Certificate Health Check

1.  **Create an Inventory:**  
    Start by enumerating all certificate files in your cluster. Collect details such as file paths, configured names, alternate names (SANs), organization information, issuer, and expiration dates.

    > > [!important]
    > > **Tip**
    > >
    > > For kubeadm-provisioned clusters, examine the kube-apiserver manifest file located in the `/etc/kubernetes/manifests` directory to identify certificate usage.

2.  **Review Certificate Details in Manifest Files:**  
    Examine the certificate file details directly in the configuration. For example, the following snippet from a kube-apiserver manifest includes multiple certificate parameters:

    ```
    spec:
      containers:
      - command:
        - kube-apiserver
        - --authorization-mode=Node,RBAC
        - --advertise-address=172.17.0.32
        - --allow-privileged=true
        - --client-ca-file=/etc/kubernetes/pki/ca.crt
        - --disable-admission-plugins=PersistentVolumeLabel
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
        - --secure-port=6443
        - --service-account-key-file=/etc/kubernetes/pki/sa.pub
        - --service-cluster-ip-range=10.96.0.0/12
        - --tls-cert-file=/etc/kubernetes/pki/apiserver.crt
        - --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
    ```

3.  **Inspect Each Certificate:**  
    Use OpenSSL to inspect individual certificates. For example, to view the details of the API server certificate, run:

    ```
    openssl x509 -in /etc/kubernetes/pki/apiserver.crt -text -noout
    ```

    This command displays important certificate information such as the subject name (e.g., kube-apiserver), alternate names, validity periods, and issuer. In kubeadm setups, the Kubernetes CA is typically named "Kubernetes" by default. Repeat this process for each certificate file.

## Troubleshooting with Service Logs

When issues arise, reviewing service logs can help pinpoint the problem. Depending on how your cluster is deployed, use one of the following methods:

### For Native OS Services

Retrieve logs using journalctl. For example, to view logs for the etcd service:

```
journalctl -u etcd.service -l
2019-02-13 02:53:28.144631 I | etcdmain: etcd Version: 3.2.18
2019-02-13 02:53:28.144680 I | etcdmain: Git SHA: eddf599c6
2019-02-13 02:53:28.144684 I | etcdmain: Go Version: go1.8.7
2019-02-13 02:53:28.144688 I | etcdmain: Go OS/Arch: linux/amd64
2019-02-13 02:53:28.144692 I | etcdmain: setting maximum number of CPUs to 4, total number of available CPUs is 4
2019-02-13 02:53:28.144734 N | etcdmain: the server is already initialized as member before, starting as etcd member...
2019-02-13 02:53:28.146525 I | etcdserver: name = master
2019-02-13 02:53:28.146637 I | etcdserver: data dir = /var/lib/etcd
2019-02-13 02:53:28.146642 I | etcdserver: member dir = /var/lib/etcd/member
2019-02-13 02:53:28.146645 I | etcdserver: heartbeat = 100ms
2019-02-13 02:53:28.146648 I | etcdserver: election = 1000ms
2019-02-13 02:53:28.146677 I | etcdserver: snapshot count = 10000
2019-02-13 02:53:28.185353 I | etcdserver/api: enabled capabilities for version 3.2
2019-02-13 02:53:28.185588 I | embed: ClientTLS: cert = /etc/kubernetes/pki/etcd/server.crt, key = /etc/kubernetes/pki/etcd/server.key, ca = /etc/kubernetes/pki/etcd/old-ca.crt, client-cert-auth = true
2019-02-13 02:53:30.080017 I | etcdserver: ready to serve client requests
2019-02-13 02:53:30.080130 I | etcdserver: published {Name:master ClientURLs:[https://127.0.0.1:2379]} to cluster
2019-02-13 02:53:30.080281 I | embed: serving client requests on 127.0.0.1:2379
WARNING: 2019/02/13 02:53:30: Failed to dial 127.0.0.1:2379: connection error: desc = "transport: authentication handshake failed: remote error: tls: bad certificate"; please retry.
```

### For Kubeadm-Deployed Clusters

Since components run as pods, you can use kubectl to fetch logs. However, if the API server or etcd is down and kubectl commands fail, use Docker to list containers and view logs:

```
docker ps -a
```

Then inspect a container's logs:

```
docker logs 87fc
```

> > [!important]
> > **Warning**
> >
> > If you encounter connection issues while checking logs, ensure that the certificate paths and configurations are accurate.

## Organizing Certificate Details

Compile a comprehensive list of certificate information including file paths, configured names, alternate names, organizations, issuers, and expiration dates. Organizing this data (for example, in an Excel spreadsheet or a table) can be invaluable for ongoing certificate management and audits.

![The image shows a table detailing Kubernetes certificate configurations, including default CNs, parent CAs, recommended key paths, certificate paths, commands, and certificate arguments.](https://kodekloud.com/kk-media/image/upload/v1752871618/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-View-Certificate-Details/frame_210.jpg)

This table provides a structured reference to quickly verify that each certificate is correctly configured and up to date.

## Conclusion

You now have a comprehensive guide to verify certificate details in your Kubernetes cluster. By following these steps and inspecting the relevant log files and manifest configurations, you can ensure that every certificate is valid and correctly configured. Practice these commands and techniques on your cluster to maintain a secure and reliable Kubernetes environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/39c4246e-7a13-4187-beac-585ff0d7b1fa)**
>
> Watch video content
