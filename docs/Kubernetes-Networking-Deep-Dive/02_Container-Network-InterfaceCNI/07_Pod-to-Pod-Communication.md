# Pod to Pod Communication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Container-Network-InterfaceCNI/Pod-to-Pod-Communication)

---

## Table of Contents

- Pod to Pod Communication
  - 1. Verify Cilium Status
  - 2. Deploy Pods and Observe Interface Creation
  - 3. Inspect the Pod Interface and Network Namespace
  - 4. Delete and Recreate a Pod
  - 5. Test Pod-to-Pod Connectivity by IP
  - 6. Pod-to-Pod Communication via DNS A Records
  - 7. Summary of Commands
  - Links and References
  - Watch Video

---

## Content

Kubernetes Networking Deep Dive

Container Network InterfaceCNI

# Pod to Pod Communication

Cilium’s CNI plugin provides transparent pod-to-pod connectivity, including support for DNS A records for pod hostnames. This guide walks through verifying Cilium, deploying pods, inspecting veth interfaces, and testing direct IP and DNS-based communication in a Kubernetes cluster.

## 1\. Verify Cilium Status

First, confirm that Cilium and its components are up and running:

```
cilium status
```

You should see output similar to:

```
Cilium:            OK
Operator:          OK
Envoy DaemonSet:   disabled (using embedded mode)
Hubble Relay:      disabled
ClusterMesh:       disabled


Deployment          cilium-operator      Desired: 1/1, Ready: 1/1, Available: 1/1
DaemonSet           cilium               Desired: 2/2, Ready: 2/2, Available: 2/2
Containers:         cilium (Running)
                    cilium-operator (Running)
Cluster Pods:       2/2 managed by Cilium
Helm chart version: cilium
Image versions:     cilium: quay.io/cilium/cilium:v1.15.3
                    cilium-operator: quay.io/cilium/operator-generic:v1.15.3
```

> [!important]
> **Note**
>
> If `Envoy DaemonSet` is disabled, Cilium is using its embedded proxy mode. For full L7 gateway features, enable the Envoy DaemonSet.

## 2\. Deploy Pods and Observe Interface Creation

Apply a manifest (`pods.yaml`) to spin up three simple pods in the default namespace:

```
kubectl apply -f pods.yaml
```

On your control‐plane node, tail the Cilium daemon logs to watch endpoint creation:

```
journalctl -u cilium -f
```

You should observe entries like:

```
level=info msg="Create endpoint request" addressing="&{10.0.1.207 ee7b43f3-... default}" containerID=b1c311eadc2... interface=eth0 subsys=daemon
level=info msg="New endpoint" ciliumEndpointName=default/pod1 ipv4=10.0.1.207 endpointID=1704 subsys=endpoints
```

## 3\. Inspect the Pod Interface and Network Namespace

On the node hosting **pod1**, list the CNI veth pair created by Cilium:

```
ip addr | grep -A1 lxc
```

Example output:

```
21: lxc7356c0cd4e00@if20: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 900
    link/ether 82:61:ee:60:27:3a brd ff:ff:ff:ff:ff:ff link-netns cni-ba760e87-7617-b4a3-197f-9baf33fa823d
```

Enter the network namespace and inspect `eth0`:

```
ip netns exec cni-ba760e87-7617-b4a3-197f-9baf33fa823d ip addr show eth0
```

Result:

```
20: eth0@if21: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 900
    inet 10.0.1.207/32 scope global eth0
```

This IP matches the address reported in the Cilium logs.

## 4\. Delete and Recreate a Pod

Delete **pod1** and observe endpoint cleanup:

```
kubectl delete pod pod1
```

Cilium logs will include:

```
level=info msg="Delete endpoint by containerID request" containerID=b1c311eacd... endpointID=1704 subsys=daemon
level=info msg="Removed endpoint" ciliumEndpointName=default/pod1 endpointID=1704 subsys=endpoint
```

Verify the veth interface is removed:

```
ip addr | grep lxc7356c0cd4e00
```

Recreate **pod1**:

```
kubectl apply -f pods.yaml
kubectl get pods -w
```

Watch for regeneration:

```
level=info msg="Rewrote endpoint BPF program" ciliumEndpointName=default/pod1 endpointID=3389 subsys=endpoint
```

## 5\. Test Pod-to-Pod Connectivity by IP

Retrieve the pod IPs:

```
kubectl get pods -o=jsonpath='{range .items[*]}{.metadata.name}: {.status.podIP}{"\n"}{end}'
```

| Pod  | IP         |
| ---- | ---------- |
| pod1 | 10.0.1.249 |
| pod2 | 10.0.1.14  |
| pod3 | 10.0.0.245 |

From **pod1**, ping **pod2** (same node):

```
kubectl exec -it pod1 -- ping -c 4 10.0.1.14
```

Ping **pod3** (remote node):

```
kubectl exec -it pod1 -- ping -c 4 10.0.0.245
```

And curl an HTTP server on **pod3** (port 80):

```
kubectl exec -it pod1 -- curl -vvv 10.0.0.245:80
```

## 6\. Pod-to-Pod Communication via DNS A Records

Check the pod’s DNS settings:

```
kubectl exec -it pod1 -- cat /etc/resolv.conf
```

```
search default.svc.cluster.local svc.cluster.local cluster.local
nameserver 10.96.0.10
options ndots:5
```

Cilium automatically creates DNS A records in the format:

```
<ip-with-dashes>.<namespace>.pod.cluster.local
```

For example, to ping **pod3** by DNS:

```
kubectl exec -it pod1 -- ping -c 4 10-0-0-245.default.pod.cluster.local
```

Or curl by name:

```
kubectl exec -it pod1 -- curl -vvv http://10-0-0-245.default.pod.cluster.local:80
```

> [!important]
> **Warning**
>
> Pod IPs are ephemeral. DNS A records tied to pod IPs can break when the pod restarts. For stable discovery, use a [Kubernetes Service](https://kubernetes.io/docs/concepts/services-networking/service/).

## 7\. Summary of Commands

| Task                             | Command                                           |
| -------------------------------- | ------------------------------------------------- | ------------- |
| Verify Cilium status             | `cilium status`                                   |
| Deploy pods                      | `kubectl apply -f pods.yaml`                      |
| Tail Cilium logs                 | `journalctl -u cilium -f`                         |
| Show veth interfaces             | `ip addr \\                                       | grep -A1 lxc` |
| Enter pod namespace              | `ip netns exec <netns> ip addr show eth0`         |
| Delete a pod                     | `kubectl delete pod pod1`                         |
| Test connectivity by IP          | `kubectl exec -it pod1 -- ping -c 4 <pod IP>`     |
| Test connectivity via DNS record | `kubectl exec -it pod1 -- ping -c 4 <dns record>` |

## Links and References

- [Cilium Documentation](https://docs.cilium.io/)
- [Kubernetes Pods](https://kubernetes.io/docs/concepts/workloads/pods/pod/)
- [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Linux Network Namespaces](https://man7.org/linux/man-pages/man7/namespaces.7.html)
- [Kubernetes DNS for Services and Pods](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/5eea49e6-caea-4e84-88a0-268ea6f263af/lesson/4907e379-345a-457a-a53f-3869a820d06a)**
>
> Watch video content
