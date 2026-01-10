# Demo Kubernetes Network Model - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Kubernetes-Networking/Demo-Kubernetes-Network-Model)

---

## Table of Contents

- Demo Kubernetes Network Model
  - Environment Setup
  - Inspecting Pods
  - Exploring Network Namespaces on the Node
  - Host Network Interfaces
  - Inspecting a Pod’s Network Namespace
  - Verifying Shared Network Namespace in pod1
  - Pod-to-Pod Communication
  - References
  - Watch Video
    - Describe pod1
    - Describe pod2
    - Intra-Pod Communication

---

## Content

Kubernetes Networking Deep Dive

Kubernetes Networking

# Demo Kubernetes Network Model

Welcome to this hands-on demo where we explore the Kubernetes networking model. You’ll learn how containers within the same Pod share network namespaces, how Pods communicate across the cluster, and how the CNI plugin sets up virtual interfaces.

---

## Environment Setup

In the **default** namespace, we’ve deployed two Pods:

| Pod  | Containers                                                    | Description          |
| ---- | ------------------------------------------------------------- | -------------------- |
| pod1 | `container1` (sleep), `container2` (sleep), `nginx` (port 80) | Multi-container Pod  |
| pod2 | `nginx` (port 80)                                             | Single-container Pod |

---

## Inspecting Pods

### Describe pod1

```
kubectl describe pod pod1
```

```
Name:           pod1
Namespace:      default
Containers:
  container1:
    Image:      centos
    State:      Running
  container2:
    Image:      centos
    State:      Running
  nginx:
    Image:      nginx:latest
    Port:       80/TCP
    State:      Running
Conditions:
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
QoS Class:        BestEffort
Node:             node01/192.168.121.34
```

### Describe pod2

```
kubectl describe pod pod2
```

```
Name:           pod2
Namespace:      default
Containers:
  nginx:
    Image:      nginx:latest
    Port:       80/TCP
    State:      Running
Conditions:
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
QoS Class:        BestEffort
Node:             node01/192.168.121.34
```

---

## Exploring Network Namespaces on the Node

First, SSH into the node where these Pods are running:

```
[object Object],


ssh root@192.168.121.34
```

List all PID-based namespaces:

```
lsns -t pid
```

You’ll see entries for CNI “pause” containers and each workload container:

```
        NS TYPE NPROCS   PID USER  COMMAND
4026531836 pid     114     1 root  /sbin/init
4026532225 pid    5536  5521 root  /pause           # pod1 namespace
4026532383 pid    5584  5530 root  kube-proxy ...
4026532216 pid    6488    32 root  /pause           # pod2 namespace
4026532208 pid    6533    34 root  nginx: master process
4026532210 pid    6933    39 root  nginx: master process
…etc.
```

Identify the network namespace for a specific PID (e.g., `6933`):

```
ip netns identify 6933
```

```
cni-f25c9350-2560-67d4-850f-234062252ea1
```

The `cni-…` prefix indicates creation by the CNI plugin.

---

## Host Network Interfaces

On the node, view all interfaces:

```
ip addr
```

Filter for virtual Ethernet pairs (`veth`) created by CNI:

```
ip addr | grep -A1 veth
```

```
8:  vethwe-datapath@vethwe-bridge: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1376 …
    link/ether 56:4e:80:f3:fb:01 brd ff:ff:ff:ff:ff:ff
9:  vethwe-bridge@vethwe-datapath: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1376 …
    link/ether 4e:43:6f:73:1a:d7 brd ff:ff:ff:ff:ff:ff
```

Each `veth` pair connects a Pod’s network namespace to the host or overlay network.

---

## Inspecting a Pod’s Network Namespace

1.  Map container PIDs to namespaces:

    ```
    for pid in 6814 6848 6901 6933; do
      echo "PID $pid → $(ip netns identify $pid)"
    done
    ```

2.  Inspect one namespace’s network interfaces:

    ```
    ip netns exec cni-f25c9350-2560-67d4-850f-234062252ea1 ip addr
    ```

    ```
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 …
        inet 127.0.0.1/8 scope host lo
    18: eth0@if19: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9000 …
        link/ether 02:80:62:3b:84:1c brd ff:ff:ff:ff:ff:ff
        inet 10.0.0.57/32 scope global eth0
    ```

---

## Verifying Shared Network Namespace in pod1

Both `container1` and `container2` share the same network namespace and IP address.

```
kubectl exec pod1 -c container1 -- ip addr
```

```
1: lo: <LOOPBACK,UP,LOWER_UP> …
    inet 127.0.0.1/8 …
18: eth0@if19: …
    inet 10.0.0.57/32 scope global eth0
```

```
kubectl exec pod1 -c container2 -- ip addr
```

```
1: lo: <LOOPBACK,UP,LOWER_UP> …
    inet 127.0.0.1/8 …
18: eth0@if19: …
    inet 10.0.0.57/32 scope global eth0
```

### Intra-Pod Communication

From `container1`, fetch the NGINX welcome page over localhost:

```
kubectl exec pod1 -c container1 -- curl -s localhost:80 -vvv
```

```
<!DOCTYPE html>
<html>
<head>
  <title>Welcome to nginx!</title>
</head>
<body>
  <h1>Welcome to nginx!</h1>
  <p>If you see this page, the nginx web server is successfully installed and working.</p>
</body>
</html>
```

```
* Connected to localhost (::1:80)
< HTTP/1.1 200 OK
< Server: nginx/1.27.0
```

---

## Pod-to-Pod Communication

Retrieve all Pod IPs in the default namespace:

```
kubectl get pods -o=jsonpath='{range .items[*]}{"podName: "}{.metadata.name}{" podIP: "}{.status.podIP}{"\n"}{end}'
```

```
podName: pod1 podIP: 10.0.0.57
podName: pod2 podIP: 10.0.0.58
```

From `pod1`, connect to the NGINX server on `pod2`:

```
kubectl exec pod1 -c container1 -- curl -s 10.0.0.58:80 -vvv
```

```
* Connected to 10.0.0.58 (10.0.0.58) port 80 (#0)
< HTTP/1.1 200 OK
< Server: nginx/1.27.0
```

This confirms **cluster-wide Pod-to-Pod connectivity**, a core requirement of the Kubernetes networking model.

---

## References

- [Kubernetes Networking Concepts](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
- [ip-netns Manual](https://man7.org/linux/man-pages/man8/ip-netns.8.html)
- [CNI GitHub Repository](https://github.com/containernetworking/cni)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/0ef9d5a8-532a-4e0a-8fdc-fc2845255bd7/lesson/bbf4fc46-899f-491f-9057-6055472c16d7)**
>
> Watch video content
