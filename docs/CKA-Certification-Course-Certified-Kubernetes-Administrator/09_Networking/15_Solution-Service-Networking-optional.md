# Solution Service Networking optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/Solution-Service-Networking-optional)

---

## Table of Contents

- Solution Service Networking optional
  - 1. Determining the Node IP Range
  - 2. Identifying the Pod IP Range
  - 3. Determining the Service IP Range
  - 4. Examining the Kube Proxy Deployment
  - 5. Ensuring Kube Proxy Runs on Every Node
  - Summary
  - Watch Video
    - 4.1 Number of Kube Proxy Pods
    - 4.2 Kube Proxy Proxy Mode

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Networking

# Solution Service Networking optional

In this guide, we analyze the networking configuration of a Kubernetes cluster. We will review the node IP range, pod IP allocation, service IP range, and kube-proxy configuration. The sections below include command outputs and configuration excerpts to explain each concept in detail.

---

## 1\. Determining the Node IP Range

First, verify the IP addresses of the nodes in your cluster (note that these addresses do not pertain to pods or services). Run the following command:

```
kubectl get nodes -o wide
```

You might see output similar to:

```
NAME           STATUS   ROLES           AGE   VERSION   INTERNAL-IP     EXTERNAL-IP   OS-IMAGE               KERNEL-VERSION
controlplane   Ready    control-plane   52m   v1.26.0   192.168.10.10   <none>       Ubuntu 20.04.5 LTS     5.4.0-1104-gc
node01         Ready    <none>         51m   v1.26.0   192.168.10.3    <none>       Ubuntu 20.04.5 LTS     5.4.0-1104-gc
```

In this example, the control plane has an internal IP of 192.168.10.10. To ensure which network interface uses this IP, run:

```
ip add
```

Locate the interface (e.g., Ethernet 0) that shows the IP 192.168.10.10. Since the IP belongs to the 192.168.10.x range, the subnet is 192.168.10.0/24.

> [!important]
> **Note**
>
> A /24 subnet mask means the last octet is reserved for host addresses.

---

## 2\. Identifying the Pod IP Range

To understand your pod network setup, check node details with:

```
kubectl get nodes -o wide
```

Then, examine the network interfaces on your control plane node:

```
ip add
```

You may notice interfaces related to your networking solution (e.g., Weave). For example, an interface might show an IP address from the range 10.244.0.0/16, indicating the pod CIDR.

To verify the pod network range, inspect the logs from one of the Weave pods:

```
kubectl logs weave-net-rbx4p -n kube-system
```

Scroll through the logs to find an entry such as "added entry to weave-addr" which confirms the pod allocation range as 10.244.0.0/16. This means every pod receives an IP address from the 10.244.0.0/16 subnet.

---

## 3\. Determining the Service IP Range

The service IP range for the cluster is defined in the API server configuration. Locate the kube-apiserver manifest file, typically found at `/etc/kubernetes/manifests/kube-apiserver.yaml`. Look for the flag:

```
--service-cluster-ip-range=10.96.0.0/12
```

Below is an excerpt from the kube-apiserver manifest:

```
component: kube-apiserver
tier: control-plane
name: kube-apiserver
namespace: kube-system
spec:
  containers:
    - command:
      - kube-apiserver
      - --advertise-address=192.168.10.10
      - --allow-privileged=true
      - --authorization-mode=Node,RBAC
      - --client-ca-file=/etc/kubernetes/pki/ca.crt
      - --enable-admission-plugins=NodeRestriction
      - --enable-bootstrap-token-auth=true
      - --etcd-cafile=/etc/kubernetes/pki/etcd/ca.crt
      - --etcd-certfile=/etc/kubernetes/pki/apiserver-etcd-client.crt
      - --etcd-keyfile=/etc/kubernetes/pki/apiserver-etcd-client.key
      - --kubelet-client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt
      - --kubelet-client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key
      - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
      - --proxy-client-cert-file=/etc/kubernetes/pki/front-proxy-client.crt
      - --proxy-client-key-file=/etc/kubernetes/pki/front-proxy-client.key
      - --requestheader-allowed-names=front-proxy-client
      - --requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.crt
      - --requestheader-extra-headers-prefix=X-Remote-Extra-
      - --requestheader-username-headers=X-Remote-User
      - --secure-port=6443
      - --service-account-issuer=https://kubernetes.default.svc.cluster.local
      - --service-account-key-file=/etc/kubernetes/pki/sa.pub
      - --service-account-signing-key-file=/etc/kubernetes/pki/sa.key
      - --service-cluster-ip-range=10.96.0.0/12
      - --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
  imagePullPolicy: IfNotPresent
```

This configuration confirms that services are assigned IP addresses within the 10.96.0.0/12 range.

> [!important]
> **SEO Keyword**
>
> Service cluster IP range, API server configuration, Kubernetes networking setup.

---

## 4\. Examining the Kube Proxy Deployment

### 4.1 Number of Kube Proxy Pods

Kube-proxy is typically deployed as one pod per node. To count the number of kube-proxy pods, run:

```
kubectl get pods -n kube-system
```

A sample output might be:

```
NAME                                      READY   STATUS    RESTARTS   AGE
coredns-787d4945fb-f4x5m                   1/1     Running   0          55m
coredns-787d4945fb-mrrrj                   1/1     Running   0          55m
etcd-controlplane                         1/1     Running   0          55m
kube-apiserver-controlplane               1/1     Running   0          55m
kube-controller-manager-controlplane      1/1     Running   0          55m
kube-proxy-12gks                          1/1     Running   0          55m
kube-scheduler-controlplane               1/1     Running   0          55m
weave-net-rbx4p                           2/2     Running   0          55m
weave-net-vclkp                           2/2     Running   0          55m
```

In this example, one kube-proxy pod is running on each node. If your cluster has two nodes, expect to see two kube-proxy pods.

### 4.2 Kube Proxy Proxy Mode

To determine the proxy mode used by kube-proxy, check the logs of one of the kube-proxy pods:

```
kubectl logs kube-proxy-125qk -n kube-system
```

Key log entries such as:

```
I0503 04:01:01.695829    1 server_others.go:131] "Using iptables proxy"
```

indicate that kube-proxy is operating in IPTables mode.

---

## 5\. Ensuring Kube Proxy Runs on Every Node

Kube-proxy must run on every node to manage the network rules effectively. This is achieved by deploying kube-proxy as a DaemonSet. A DaemonSet automatically ensures that one instance of a pod runs on every node in the cluster.

To verify this configuration, execute:

```
kubectl get daemonset -n kube-system
```

A sample output could be:

```
NAME           DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR
kube-proxy     2         2         2       2            2           kubernetes.io/os=linux
weave-net      2         2         2       2            2           <none>
```

This confirms that kube-proxy is deployed as a DaemonSet, ensuring a consistent network setup across all cluster nodes.

> [!important]
> **Warning**
>
> Ensure that any changes to the DaemonSet configuration are carefully validated to prevent disruptions to cluster networking.

---

## Summary

| Component        | IP Range/Mode   | Details                                                |
| ---------------- | --------------- | ------------------------------------------------------ |
| Node IP Range    | 192.168.10.0/24 | Derived from control plane interface configuration     |
| Pod IP Range     | 10.244.0.0/16   | Confirmed via Weave logs and network interface details |
| Service IP Range | 10.96.0.0/12    | Configured in the kube-apiserver manifest              |
| Kube Proxy Mode  | IPTables        | Verified via kube-proxy logs                           |
| Deployment       | DaemonSet       | Ensures one kube-proxy pod per node                    |

By reviewing node interfaces, Weave logs, and the API server configuration, you can confirm the cluster’s networking setup and understand the kube-proxy deployment strategy. For further details on Kubernetes networking, check out the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/cluster-administration/networking/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/44bc9a9f-319c-40ee-babd-0f7b53a70de7/lesson/af6f5867-b78e-4b4b-804c-ab49d9662008)**
>
> Watch video content
