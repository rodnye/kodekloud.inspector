# Solution Explore Environment optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/Solution-Explore-Environment-optional)

---

## Table of Contents

- Solution Explore Environment optional
  - 1. How Many Nodes Are in the Cluster?
  - 2. What Is the Internal IP Address of the Control Plane Node?
  - 3. Which Network Interface Is Configured for Cluster Connectivity on the Control Plane Node?
  - 4. What Is the MAC Address of the Control Plane Node’s Network Interface?
  - 5. What Is the IP Address Assigned to Node One?
  - 6. What Is the MAC Address Assigned to Node One?
  - 7. What Is the Container Runtime’s Bridge Interface on the Host?
  - 8. What Is the State of Interface cni0?
  - 9. What Is the Default Gateway Used When Pinging Google from the Control Plane Node?
  - 10. On Which Port Is the Kube Scheduler Listening?
  - 11. Which ETCD Port Sees More Client Connections?
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Networking

# Solution Explore Environment optional

In this guide, we will answer several questions regarding your Kubernetes cluster environment and illustrate how to retrieve the required details using various commands.

---

## 1\. How Many Nodes Are in the Cluster?

To find out how many nodes are part of your cluster, run:

```
kubectl get nodes
```

The command outputs a list of nodes. In this example, there are two nodes—one functioning as the control plane and another as a worker node.

```
controlplane ~ ➜ kubectl get nodes
NAME           STATUS   ROLES          AGE   VERSION
controlplane   Ready    control-plane   20m   v1.26.0
node01         Ready    <none>         19m   v1.26.0


controlplane ~ ➜
```

---

## 2\. What Is the Internal IP Address of the Control Plane Node?

Use the `-o wide` option with `kubectl get nodes` to view additional details, including the internal IP address:

```
kubectl get nodes -o wide
```

Locate the control plane node entry. In this sample output, the internal IP for the control plane is `192.5.114.3`.

```
controlplane ~ ⟶ kubectl get nodes -o wide
NAME           STATUS   ROLES          AGE    VERSION      INTERNAL-IP     EXTERNAL-IP    OS-IMAGE                  KERNEL-VERSION       CONTAINERS
controlplane   Ready    control-plane  20m    v1.26.0      192.5.114.3     <none>         Ubuntu 20.04.5 LTS        5.4.0-1100-gcp       containerd
node01         Ready    <none>         19m    v1.26.0      192.5.114.6     <none>         Ubuntu 20.04.5 LTS        5.4.0-1100-gcp       containerd
```

---

## 3\. Which Network Interface Is Configured for Cluster Connectivity on the Control Plane Node?

To determine which network interface is used for cluster connectivity, run:

```
ip address
```

Review the output and look for the interface that shows the relevant IP address (in this case, an IP ending in `.3`). In the sample provided, the `eth0` interface has the correct binding.

```
controlplane ~ ⌁ ip address
1: lo: <LOOPBACK UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever


2: flannel.1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue state UNKNOWN group default
    link/ether 7a:88:3a:71:47:f7 brd ff:ff:ff:ff:ff:ff
    inet 10.244.1.1/32 scope global flannel.1
       valid_lft forever preferred_lft forever


3: cni0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue state UP group default
    link/ether 4a:ba:dc:3d:2c:7b brd ff:ff:ff:ff:ff:ff
    inet 10.244.0.2/24 scope global cni0
       valid_lft forever preferred_lft forever


4: veth38a0c647: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue master cni0 state UP group default
    link/ether 4e:41:6e:6b:6d:bb brd ff:ff:ff:ff:ff:ff


5: veth0f5b312d: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue master cni0 state UP group default
    link/ether 5e:9b:da:c5:43:fa brd ff:ff:ff:ff:ff:ff
    inet 192.168.0.2/24 brd 192.168.0.255 scope global eth0
       valid_lft forever preferred_lft forever


6: eth0@if49800f: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master cni0 state UP group default
    link/ether 56:1b:87:f1:9a:05 brd ff:ff:ff:ff:ff:ff
    inet 172.25.0.42/24 brd 172.25.0.255 scope global eth1
       valid_lft forever preferred_lft forever
```

> [!important]
> **Note**
>
> The interface selected for cluster connectivity is the one with the IP address matching that of the control plane node.

---

## 4\. What Is the MAC Address of the Control Plane Node’s Network Interface?

Once you know the interface name (in this example, `eth0`), you can use the following command to display its MAC address:

```
ip address show eth0
```

The MAC address appears in the output; for instance, you might see a value like `5e:9b:da:c5:43:fa`. Use this value as needed.

---

## 5\. What Is the IP Address Assigned to Node One?

To discover the internal IP address of the worker node (node one), run:

```
kubectl get nodes -o wide
```

Examine the entry corresponding to `node01`. In the sample output below, the worker node's internal IP address is `192.5.114.6`.

```
NAME           STATUS   ROLES           AGE     VERSION      INTERNAL-IP     EXTERNAL-IP   OS-IMAGE            KERNEL-VERSION      CONTAINER-RUNTIME
controlplane   Ready    control-plane   21m     v1.26.0      192.5.114.3     <none>        Ubuntu 20.04.5 LTS   5.4.0-1100-gcp      containerd
node01         Ready    <none>         21m     v1.26.0      192.5.114.6     <none>        Ubuntu 20.04.5 LTS   5.4.0-1100-gcp      containerd
```

---

## 6\. What Is the MAC Address Assigned to Node One?

To retrieve node one's MAC address, SSH into node one and execute:

```
ip address
```

Scroll through the output until you find the interface associated with the internal IP (e.g., matching `192.5.114.6`). The corresponding MAC address—in this case, `02:42:c0:05:72:06`—is the answer.

```
root@node01 ~  # ip address
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: flannel.1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue state UNKNOWN group default
    link/ether 36:1c:bg:bf:ef:db brd ff:ff:ff:ff:ff:ff
    inet 10.244.0.1/32 scope global flannel.1
       valid_lft forever preferred_lft forever
598: eth0@if599: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:c0:05:72:06 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 192.5.114.6/24 brd 192.5.114.255 scope global eth0
       valid_lft forever preferred_lft forever
600: eth1@if601: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:ac:19:00:28 brd ff:ff:ff:ff:ff:ff link-netnsid 1
    inet 172.25.0.32/24 brd 172.25.0.255 scope global eth1
       valid_lft forever preferred_lft forever
```

---

## 7\. What Is the Container Runtime’s Bridge Interface on the Host?

ContainerD commonly uses a CNI plugin to manage networking, which creates a bridge interface. Typically, this interface is named `cni0`. Confirm by listing all network interfaces:

```
ip address
```

In the output, the `cni0` interface is visible and serves as the bridge for container connectivity.

```
controlplane ~ ⟶ ip address
...
3: cni0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue state UP group default
    link/ether 2a:4d:3a:9c:2f:a2 brd ff:ff:ff:ff:ff:ff
    inet 10.244.0.2/24 brd 10.244.0.255 scope global cni0
       valid_lft forever preferred_lft forever
...
```

> [!important]
> **Note**
>
> The `cni0` bridge interface is essential for container networking. Ensure your CNI configuration is correct for proper connectivity.

---

## 8\. What Is the State of Interface cni0?

To check the current state of the `cni0` interface, run:

```
ip address show cni0
```

The output will display details, including the interface state. In the provided output, the state is `UP`.

```
controlplane ~ ➜ ip address show cni0
3: cni0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue master cni0 state UP group default
    link/ether ba:4d:3a:9c:1a:20 brd ff:ff:ff:ff:ff:ff
    inet 10.244.0.2/24 brd 10.244.0.255 scope global cni0
       valid_lft forever preferred_lft forever
```

---

## 9\. What Is the Default Gateway Used When Pinging Google from the Control Plane Node?

To identify the route taken for external traffic, inspect the default routing table using:

```
ip route
```

The output indicates the default gateway. For example, the default route via `172.25.0.1` on interface `eth1` is used for external connectivity.

```
controlplane ~ ➜ ip route
default via 172.25.0.1 dev eth1
10.244.0.0/24 dev cni0 proto kernel scope link src 10.244.0.1
172.25.0.0/24 via 10.244.1.0 dev flannel.1 onlink
172.25.0.0/24 dev eth1 proto kernel scope link src 172.25.0.42
192.5.114.0/24 dev eth0 proto kernel scope link src 192.5.114.3
controlplane ~ ➜
```

Thus, the default gateway is `172.25.0.1`.

---

## 10\. On Which Port Is the Kube Scheduler Listening?

To determine the port on which the Kube Scheduler is active, use the netstat command with filtering options:

```
netstat -np1 | grep -i scheduler
```

The output shows that the scheduler is listening on port `10259` on localhost.

```
tcp        0      0 127.0.0.1:10259        0.0.0.0:*              LISTEN      3281/kube-scheduler
```

---

## 11\. Which ETCD Port Sees More Client Connections?

ETCD typically listens on multiple ports, such as `2379` (client communication) and `2380` (peer communication). To inspect ETCD-related sockets, run:

```
netstat -npl | grep -i etcd
```

A sample output could be:

```
0.0.0.0:2379 LISTEN 3318/etcd
0.0.0.0:2380 LISTEN 3318/etcd
0.0.0.0:12381 LISTEN 3318/etcd
127.0.0.1:12381 LISTEN 3318/etcd
```

To count established connections for each port, use the following commands:

```
netstat -npa | grep -i etcd | grep -i 2379 | wc -l
netstat -npa | grep -i etcd | grep -i 2380 | wc -l
```

> [!important]
> **Note**
>
> Typically, port `2379` will show significantly more client connections compared to port `2380`, which is reserved for peer-to-peer communication among ETCD members.

---

This concludes the lab. Each step illustrated above demonstrates how to gather network and runtime configuration details within your Kubernetes cluster environment.

For further reading on Kubernetes networking and node configuration, please visit the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/44bc9a9f-319c-40ee-babd-0f7b53a70de7/lesson/c2aca0e1-b344-4507-ad33-535c6833cc28)**
>
> Watch video content
