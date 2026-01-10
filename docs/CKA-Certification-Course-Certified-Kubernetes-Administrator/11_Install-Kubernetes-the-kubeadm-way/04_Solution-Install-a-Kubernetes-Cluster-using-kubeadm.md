# Solution Install a Kubernetes Cluster using kubeadm - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Install-Kubernetes-the-kubeadm-way/Solution-Install-a-Kubernetes-Cluster-using-kubeadm)

---

## Table of Contents

- Solution Install a Kubernetes Cluster using kubeadm
  - Step 1: Configure Container Runtime Forwarding Rules
  - Step 2: Install kubeadm, kubelet, and kubectl
  - Step 3: Verify Your Distribution
  - Step 4: Addressing GPG Key and Repository Setup Errors
  - Step 5: Verify the kubelet Version
  - Step 6: Bootstrap the Kubernetes Cluster
  - Step 7: Generate and Use the kubeadm Join Token
  - Step 8: Install a Network Plugin
  - Summary
  - Watch Video
    - 1. Update the Package Repository and Install Prerequisites
    - 2. Add the Google Cloud Public Signing Key
    - 3. Set Up the Kubernetes apt Repository
    - 4. Update the Package List and Install Components
    - Identify the Control Plane IP Address
    - Initialize the Cluster
    - On Node1, Configure the kubeconfig
    - Join the Cluster on Node1
    - Verify the Cluster Nodes

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Install Kubernetes the kubeadm way

# Solution Install a Kubernetes Cluster using kubeadm

In this guide, you'll learn how to install kubeadm along with the kubelet package on both the control plane and worker node (node1). To follow along, open two terminal sessions: one for the control plane and one via SSH connected to node1.

---

## Step 1: Configure Container Runtime Forwarding Rules

Before installing the Kubernetes components, configure the necessary system forwarding rules on both nodes. Run the following command on both the control plane and node1:

```
sudo sysctl --system
# Applying /etc/sysctl.d/10-console-messages.conf ...
kernel.printk = 4 4 4 7
# Applying /etc/sysctl.d/10-ipv6-privacy.conf ...
net.ipv6.conf.default.use_tempaddr = 2
# Applying /etc/sysctl.d/10-kernel-hardening.conf ...
kernel.kptr_restrict = 1
# Applying /etc/sysctl.d/10-link-restrictions.conf ...
fs.protected_symlinks = 1
# Applying /etc/sysctl.d/10-magic-sysrq.conf ...
kernel.sysrq = 176
# Applying /etc/sysctl.d/10-network-security.conf ...
net.ipv4.conf.default.rp_filter = 2
# Applying /etc/sysctl.d/10-np.file ...
net.ipv4.conf.all.rp_filter = 2
# Applying /etc/sysctl.d/10-zeropage.conf ...
vm.mmap_min_addr = 65536
# Applying /usr/lib/sysctl.d/50-default.conf ...
net.ipv4.conf.default.promote_secondaries = 1
# Setting key "net.ipv4.conf.all.promote_secondaries": Invalid argument
net.ipv4.ping_group_range = 0 2147483647
net.ipv4.conf.default.qdisc = fq_codel
# Applying /usr/lib/sysctl.d/99-sysctl.conf ...
kernel.pid_max = 4194304
net.bridge.bridge-nf-call-iptables = 1
net.bridge.bridge-nf-call-ipv4 = 1
net.ipv4.ip_forward = 1
sysctl: permission denied on key "fs.protected_fifos", ignoring
sysctl: permission denied on key "fs.protected_regular", ignoring
# Applying /etc/sysctl.conf ...
```

> [!important]
> **Note**
>
> The output might also recommend installing a specific version of the Kubernetes packages. Keep this in mind as you progress through the installation.

---

## Step 2: Install kubeadm, kubelet, and kubectl

Follow the steps below to install the Kubernetes components on both the control plane and node1. These instructions are based on Ubuntu; adjust as necessary for your distribution.

### 1\. Update the Package Repository and Install Prerequisites

```
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
```

### 2\. Add the Google Cloud Public Signing Key

If your Ubuntu release (e.g., Ubuntu 22.04) does not have the `/etc/apt/keyrings` directory, create it first:

```
sudo mkdir -p /etc/apt/keyrings
sudo curl -fsSL -o /etc/apt/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
```

### 3\. Set Up the Kubernetes apt Repository

```
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
```

### 4\. Update the Package List and Install Components

```
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

If you need to install version 1.26.0 specifically, run:

```
sudo apt install -y kubeadm=1.26.0-00 kubelet=1.26.0-00 kubectl=1.26.0-00
sudo apt-mark hold kubelet kubeadm kubectl
```

---

## Step 3: Verify Your Distribution

Before continuing, confirm that you're using the correct distribution. Run:

```
cat /etc/*-release
```

A sample output might be:

```
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=20.04
DISTRIB_CODENAME=focal
DISTRIB_DESCRIPTION="Ubuntu 20.04.5 LTS"
NAME="Ubuntu"
VERSION="20.04.5 LTS (Focal Fossa)"
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=focal
UBUNTU_CODENAME=focal
```

---

## Step 4: Addressing GPG Key and Repository Setup Errors

Sometimes an error may occur similar to:

```
sudo curl -fsLo /etc/apt/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
curl: (23) Failed writing body (0 != 1210)
```

> [!important]
> **Warning**
>
> If you encounter the error above, first create the required directory:
>
> sudo mkdir -p /etc/apt/keyrings
>
> Then re-run the curl command to download the key. Once the key is successfully downloaded, proceed with updating the package lists and installation:

```
sudo apt-get update
sudo apt install -y kubeadm=1.26.0-00 kubelet=1.26.0-00 kubectl=1.26.0-00
```

A sample session might look like:

```
controlplane ~ ➜  sudo curl -fsLo /etc/apt/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
curl: (23) Failed writing body (0 != 1210)
controlplane ~ ➜  mkdir -p /etc/apt/keyrings
controlplane ~ ➜  sudo curl -fsLo "deb [signed-by=/etc/apt/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
controlplane ~ ➜  sudo apt-get update
...
controlplane ~ ➜  sudo apt install -y kubeadm=1.26.0-00 kubelet=1.26.0-00 kubectl=1.26.0-00
```

---

## Step 5: Verify the kubelet Version

After installation, confirm the kubelet version with:

```
sudo kubelet --version
```

You should see output similar to:

```
Kubernetes v1.26.0
```

---

## Step 6: Bootstrap the Kubernetes Cluster

Since the cluster is not yet initialized, attempting to list nodes will generate errors. On the control plane, run:

```
kubectl get nodes
```

Expected errors might include:

```
E0215 00:17:50.307163   14693 memcache.go:238] couldn't get current server API group list: <nil>
...
error: the server doesn't have a resource type "nodes"
```

This is normal because the cluster still requires initialization with kubeadm.

### Identify the Control Plane IP Address

Before initializing, check the IP address of your control plane’s primary interface (for example, eth0):

```
ip addr
```

A sample interface output might be:

```
4: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc qdisc state UP group default
    link/ether 02:42:ac:20:25:1b brd ff:ff:ff:ff:ff:ff
    inet 192.7.220.6/24 brd 192.7.220.255 scope global eth0
       valid_lft forever preferred_lft forever
```

### Initialize the Cluster

Using the control plane's IP (e.g., 192.7.220.6), initialize the cluster with a specified pod network CIDR:

```
kubeadm init --apiserver-advertise-address=192.7.220.6 --pod-network-cidr=10.44.0.0/16
```

Upon successful initialization, the output will provide instructions to set up your default kubeconfig file. Follow these steps on the control plane:

```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
export KUBECONFIG=/etc/kubernetes/admin.conf
```

Verify the status of the nodes:

```
kubectl get nodes
```

At this point, you should see your control plane node listed—although it may be in a NotReady state until all components initialize.

---

## Step 7: Generate and Use the kubeadm Join Token

After initialization, a join token is provided in the kubeadm output. You can choose to generate a new token or use the one provided.

### On Node1, Configure the kubeconfig

```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
export KUBECONFIG=/etc/kubernetes/admin.conf
```

### Join the Cluster on Node1

Replace the IP address, token, and hash with those provided in your kubeadm init output:

```
kubeadm join 192.7.220.6:6443 --token 6cv4x4.ae6gyfism94cigu --discovery-token-ca-cert-hash sha256:efad364308264bb45460c10e6079c9a2ee28bc6732b2f404f46a8bf792
```

### Verify the Cluster Nodes

On the control plane, check if node1 has joined the cluster:

```
kubectl get nodes
```

A sample output could be:

```
NAME         STATUS     ROLES          AGE   VERSION
controlplane NotReady   control-plane  33s   v1.26.0
```

To validate on node1, you might also run:

```
sudo apt -y install kubeadm=1.26.0-00 kubelet=1.26.0-00 kubectl=1.26.0-00
sudo apt-mark hold kubelet kubeadm kubectl
clear
```

---

## Step 8: Install a Network Plugin

For pods to communicate across nodes, you must install a network plugin. The kubeadm output provides a list of available network add-ons. In this lesson, we will install Flannel.

On the control plane, run:

```
kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml
```

Wait a few seconds for the components to initialize. Verify that all pods are running with:

```
kubectl get pods -A
```

You should now see the Flannel pods alongside the control plane and node details.

---

## Summary

With these steps completed, you have successfully accomplished the following:

1.  Configured the system forwarding rules.
2.  Installed the necessary Kubernetes components (v1.26.0).
3.  Bootstrapped the control plane.
4.  Joined a worker node (node1) to the cluster.
5.  Deployed the Flannel network plugin for pod networking.

This concludes the Kubernetes cluster setup lab. For further details and troubleshooting, refer to the official [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/357c2670-c16c-49ac-aa27-8af52523afde/lesson/25b5216f-8a6f-4e43-ae75-0ea301b47f99)**
>
> Watch video content
