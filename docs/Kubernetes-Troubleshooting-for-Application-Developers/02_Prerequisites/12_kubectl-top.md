# kubectl top - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Prerequisites/kubectl-top)

---

## Table of Contents

- kubectl top
  - Comparing kubectl get and kubectl top
  - Inspecting Node Information
  - How kubectl top Works
  - Summary
  - Watch Video

---

## Content

Kubernetes Troubleshooting for Application Developers

Prerequisites

# kubectl top

In this article, we explore how to leverage the kubectl top command to gain real-time insights into CPU and memory usage of your Kubernetes cluster. By understanding these metrics for both pods and nodes, you can quickly diagnose issues such as memory exhaustion and make informed decisions about scaling workloads.

## Comparing kubectl get and kubectl top

Previously, we looked at the kubectl get command, which retrieves essential metadata about Kubernetes resources. For example, executing:

```
kubectl get pods -n kube-system
```

displays basic information such as readiness, status, restart counts, and age for each pod in the kube-system namespace:

```
controlplane ~ ➜  k get pods -n kube-system
NAME                                      READY   STATUS    RESTARTS   AGE
coredns-69f9c977-6lfhh                   1/1     Running   0          47m
coredns-69f9c977-dgsk2                    1/1     Running   0          47m
etcd-controlplane                         1/1     Running   0          47m
kube-apiserver-controlplane               1/1     Running   0          47m
kube-controller-manager-controlplane      1/1     Running   0          47m
kube-proxy-5rhnl                          1/1     Running   0          47m
kube-proxy-qfv5v                          1/1     Running   0          47m
kube-scheduler-controlplane               1/1     Running   0          47m
metrics-server-69fb86c66-fdw25             1/1     Running   0          47m
```

In contrast, the kubectl top command provides live metrics on resource usage. For instance, running:

```
kubectl top pods -n kube-system
```

yields the current CPU and memory consumption for each pod:

```
controlplane ~ ➜  k top pods -n kube-system
NAME                                      CPU(cores)   MEMORY(bytes)
coredns-69f9c977-6lfhh                   2m           16Mi
coredns-69f9c977-dgsk2                    2m           17Mi
etcd-controlplane                         21m          68Mi
kube-apiserver-controlplane               41m          392Mi
kube-controller-manager-controlplane      5m           57Mi
kube-proxy-5rhnl                          1m           22Mi
kube-proxy-qfv5v                          1m           22Mi
kube-scheduler-controlplane               3m           24Mi
metrics-server-69fb86c66-fdw25             3m           20Mi
```

## Inspecting Node Information

To view node details, use the following command:

```
kubectl get nodes
```

which displays each node's status, roles, age, and Kubernetes version:

```
controlplane ~ ➜  k get nodes
NAME         STATUS   ROLES           AGE     VERSION
controlplane Ready    control-plane   48m     v1.29.0
node01       Ready    <none>         47m     v1.29.0
```

For enhanced details such as internal IP, OS image, kernel version, and container runtime, append the `-o wide` flag:

```
kubectl get nodes -o wide
```

The output provides a comprehensive view:

```
controlplane ~ ➜  k get nodes -o wide
NAME          STATUS   ROLES           AGE     VERSION   INTERNAL-IP    EXTERNAL-IP   OS-IMAGE              KERNEL-VERSION       CONTAINER-RUNTIME
controlplane  Ready    control-plane   48m     v1.29.0   192.118.62.8   <none>        Ubuntu 22.04.3 LTS   5.4.0-1106-gcp       containerd://1.6.26
node01        Ready    <none>         47m     v1.29.0   192.118.62.10  <none>        Ubuntu 22.04.4 LTS   5.4.0-1106-gcp       containerd://1.6.26
```

To monitor the resource usage of each node, execute:

```
kubectl top nodes
```

This command displays key metrics such as CPU consumption, memory usage, and memory percentage:

```
controlplane ~ ➜  k top nodes
NAME         CPU(cores)   MEMORY(bytes)   MEMORY%
controlplane 130m         933Mi           0%
node01       82m          1553Mi          1%
```

> [!important]
> **Note**
>
> Ensure you have the metrics server installed in your cluster for the kubectl top command to return accurate data.

## How kubectl top Works

The kubectl top command depends on the metrics server, which collects and aggregates resource usage data from each node's kubelet. Without a properly configured metrics server, the command will not display any metrics. This tool is invaluable for quickly identifying resource bottlenecks and monitoring overall cluster performance, helping you decide whether to scale nodes or investigate pods using excessive resources.

## Summary

In summary, both kubectl get and kubectl top offer different perspectives on your Kubernetes cluster:

| Command     | Purpose                                   | Output Information                                                |
| ----------- | ----------------------------------------- | ----------------------------------------------------------------- |
| kubectl get | Retrieves metadata about resources        | Resource status, readiness, restart counts, and age               |
| kubectl top | Provides real-time resource usage metrics | CPU and memory usage for pods and nodes, plus additional insights |

Using these complementary commands, you can efficiently monitor your cluster's health and performance, diagnose issues, and make scaling decisions based on up-to-date resource consumption data.

For more Kubernetes insights, check out [Kubernetes Documentation](https://kubernetes.io/docs/).

Happy monitoring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/09c2c8a6-ba29-4d55-bea1-cd8584be9107/lesson/4e8dc3ab-6162-409c-941a-35683d19abba)**
>
> Watch video content
