# kubectl describe - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Prerequisites/kubectl-describe)

---

## Table of Contents

- kubectl describe
  - Basic Syntax
  - Detailed Node Information
  - Exploring the Events Section
  - Describing Other Kubernetes Resources
  - Retrieving a List of Cluster Events
  - Summary
  - Watch Video

---

## Content

Kubernetes Troubleshooting for Application Developers

Prerequisites

# kubectl describe

The "kubectl describe" command is a powerful utility that provides in-depth information about Kubernetes resources. It is essential for diagnosing issues and understanding the state of your cluster.

## Basic Syntax

The basic syntax for "kubectl describe" is:

```
kubectl describe <resource-type> <resource-name>
```

For example, to retrieve detailed information about a node named "node01":

```
kubectl describe node node01
```

Before describing a node, you may want to list all available nodes in your cluster:

```
controlplane ~ ⚡ k get nodes
NAME            STATUS         ROLES           AGE   VERSION
controlplane    Ready          control-plane   32m   v1.29.0
node01          Ready          <none>          31m   v1.29.0
```

## Detailed Node Information

Executing the describe command on "node01" provides comprehensive details about the node:

```
controlplane ~ ⚡ k describe node node01
Name:               node01
Roles:              <none>
Labels:             beta.kubernetes.io/arch=amd64
                    beta.kubernetes.io/os=linux
                    kubernetes.io/arch=amd64
                    kubernetes.io/hostname=node01
                    kubernetes.io/os=linux
Annotations:        flannel.alpha.coreos.com/backend-data: {"VNI":1,"VtepMAC":"56:f0:f8:91:6b:14"}
                    flannel.alpha.coreos.com/backend-type: vxlan
                    flannel.alpha.coreos.com/kube-subnet-manager: true
                    flannel.alpha.coreos.com/public-ip: 172.25.0.22
                    kubeadm.alpha.kubernetes.io/cri-socket: unix:///var/run/containerd/containerd.sock
                    node.alpha.kubernetes.io/ttl: 0
                    volumes.kubernetes.io/controller-managed-attach-detach: true
CreationTimestamp:  Thu, 04 Apr 2024 23:20:02 +0000
Taints:             <none>
Unschedulable:      false
Lease:
  HolderIdentity:   node01
  AcquireTime:      <unset>
  RenewTime:        Thu, 04 Apr 2024 23:51:40 +0000
Conditions:
  Type                               Status   LastHeartbeatTime                      LastTransitionTime                 Reason                       Message
  ----                               ------   ---------------------                  ---------------------              ------                       -------
  NetworkUnavailable                 False    Thu, 04 Apr 2024 23:20:07 +0000       Thu, 04 Apr 2024 23:20:07 +0000    FlannelIsUp                Flannel is running on this node
  MemoryPressure                     False    Thu, 04 Apr 2024 23:20:05 +0000       Thu, 04 Apr 2024 23:20:05 +0000    KubeletHasSufficientMemory   kubelet has sufficient memory
  DiskPressure                       False    Thu, 04 Apr 2024 23:20:05 +0000       Thu, 04 Apr 2024 23:20:05 +0000    KubeletHasNoDiskPressure     kubelet has no disk pressure
  PIDPressure                        False    Thu, 04 Apr 2024 23:20:05 +0000       Thu, 04 Apr 2024 23:20:05 +0000    KubeletHasSufficientPID      kubelet has sufficient PID available
  Ready                              True     Thu, 04 Apr 2024 23:48:07 +0000       Thu, 04 Apr 2024 23:20:05 +0000    KubeletReady                 kubelet is posting ready status
Addresses:
  InternalIP:       192.106.13.10
  Hostname:         node01
Capacity:
  cpu:              16
```

This output includes key details such as labels, annotations, taints, and conditions critical for troubleshooting.

> [!important]
> **Monitoring Tip**
>
> Regularly reviewing output from "kubectl describe" can help you proactively monitor your cluster's health and quickly pinpoint potential issues.

## Exploring the Events Section

A significant part of the describe output is the "Events" section, which logs important changes and messages related to the resource's lifecycle:

```
Allocated resources:
   (Total limits may be over 100 percent, i.e., overcommitted.)
   Resource                       Requests            Limits
   --------                       -----------         ------------
   cpu                            900m (5%)              1 (6%)
   memory                         1140Mi (0%)           1600Mi (1%)
   ephemeral-storage              0                     0
   hugepages-1Gi                  0 (0%)                0 (0%)
   hugepages-2Mi                  0 (0%)                0 (0%)


Events:
   Type    Reason                  Age    From                      Message
   ------  ------                  ----   ----                      -------
   Normal  Starting                31m    kube-proxy                Starting kubelet.
   Normal  Starting                31m    kubelet                   invalid capacity 0 on image filesystem
   Warning InvalidDiskCapacity      31m    kubelet                   Node node01 status is now: NodeHasSufficientMemory
   Normal  NodeHasSufficientMemory  31m    kubelet                   Node node01 status is now: NodeHasNoDiskPressure
   Normal  NodeHasSufficientPID     31m    kubelet                   Node node01 status is now: NodeHasSufficientPID
   Normal  NodeAllocatableInformed  31m    kubelet                   Updated Node Allocatable Limit across pods
   Normal  NodeReady               31m    kubelet                   Node node01: NodeReady
   Normal  RegisteredNode          31m    node-controller           Node node01 event: Registered Node node01 in Controller
```

The events provide a timeline of significant activities and state changes, making them invaluable when diagnosing issues.

## Describing Other Kubernetes Resources

The "kubectl describe" command is not limited to nodes. It can be used with any Kubernetes resource. For example, to inspect a pod in the "monitoring" namespace—such as a Grafana pod—you can utilize auto-complete to quickly specify its full name:

```
kubectl describe -n monitoring pod/grafana-68cd584679-jrwd5
```

This command returns detailed metadata about the pod, including its namespace, service account information, annotations, IP address, container details (like restart counts and image versions), and the status of readiness and liveness probes. The output also highlights various conditions (e.g., initialization, container readiness, scheduling) and an events section.

> [!important]
> **Resource Diagnosis**
>
> Using "kubectl describe" across different resource types enables you to narrow down issues and understand the detailed state of each component in your cluster.

## Retrieving a List of Cluster Events

For a broader overview of cluster activities, use the following command to list all events:

```
kubectl get events
```

This command provides a consolidated view of recent events and status changes across your Kubernetes cluster.

## Summary

The "kubectl describe" command is an indispensable tool for both developers and administrators working with Kubernetes. By providing detailed insights into metadata, conditions, and events, it enhances your troubleshooting capabilities and supports efficient cluster management.

For further reading and additional details on Kubernetes, consider exploring the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/09c2c8a6-ba29-4d55-bea1-cd8584be9107/lesson/1a2b613f-674a-4baf-9d9b-b70e31ca9d55)**
>
> Watch video content
