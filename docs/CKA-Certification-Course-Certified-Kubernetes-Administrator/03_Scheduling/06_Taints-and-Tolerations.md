# Taints and Tolerations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Scheduling/Taints-and-Tolerations)

---

## Table of Contents

- Taints and Tolerations
  - How Taints and Tolerations Work
  - Tainting a Node
  - Adding Tolerations to Pods
  - Understanding the NoExecute Effect
  - Master Node Taints
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Scheduling

# Taints and Tolerations

In this article, we explore the relationship between pods and nodes, and demonstrate how taints and tolerations control pod scheduling on specific nodes. Think of it like using a repellent on a person to keep bugs away. In Kubernetes, a taint is applied to a node (the repellent) to repel pods unless they have a matching toleration (an immunity to the repellent). This ensures that only intended pods can run on tainted nodes.

![A figure with a bug symbol on its chest is positioned between the words "Intolerant," "Tolerant," and "Taint," suggesting a concept of tolerance and contamination.](https://kodekloud.com/kk-media/image/upload/v1752869914/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Taints-and-Tolerations/frame_60.jpg)

## How Taints and Tolerations Work

Two factors determine whether a pod can run on a node:

1.  The taint applied on the node.
2.  The pod's toleration for that taint.

In Kubernetes, taints and tolerations are used solely for scheduling control, not security. Consider a simple cluster with three worker nodes (node one, two, and three) and four pods (A, B, C, and D). By default, without any taints or tolerations, the scheduler distributes the pods evenly across all nodes.

Suppose you want to dedicate node one to a specific application:

- First, taint node one (using, for example, the key-value pair "app=blue") so that no pods are scheduled there by default.
- Then, add an appropriate toleration to the dedicated pod (Pod D) so that it alone can run on node one.

When the scheduler assigns pods:

- Pod A, lacking a toleration, will be scheduled on node two.
- Pod B is repelled from node one and lands on node three.
- Pod C, without a matching toleration, is scheduled on node two or three.
- Pod D, having the correct toleration, is scheduled on node one.

![The image shows three nodes labeled Node 1, Node 2, and Node 3, with containers A, B, C, and D, and a note indicating "Taint=blue."](https://kodekloud.com/kk-media/image/upload/v1752869915/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Taints-and-Tolerations/frame_240.jpg)

## Tainting a Node

To taint a node, use the following command where you specify the node name along with a taint in the format of a key-value pair and taint effect:

```
kubectl taint nodes node-name key=value:taint-effect
```

For example, to taint node one so that it only accepts pods associated with the application blue, run:

```
kubectl taint nodes node1 app=blue:NoSchedule
```

There are three taint effects:

- **NoSchedule:** Pods that do not tolerate the taint will not be scheduled on the node.
- **PreferNoSchedule:** The scheduler tries to avoid placing non-tolerating pods on the node, but it is not strictly enforced.
- **NoExecute:** New pods without a matching toleration will not be scheduled, and existing pods will be evicted from the node.

## Adding Tolerations to Pods

To allow a specific pod to run on a tainted node, add a toleration to the pod’s manifest. For example, to enable Pod D to run on node one (tainted with "app=blue:NoSchedule"), modify the pod definition as follows:

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
spec:
  containers:
    - name: nginx-container
      image: nginx
  tolerations:
    - key: "app"
      operator: "Equal"
      value: "blue"
      effect: "NoSchedule"
```

This toleration lets the pod bypass the taint and be scheduled on node one.

## Understanding the NoExecute Effect

Using the **NoExecute** taint effect has a more immediate impact. Suppose node one is tainted with the key-value pair "app=blue" and the effect NoExecute. In an initially untainted cluster, all pods schedule normally. But once the taint is applied:

- Pods without a matching toleration (e.g., Pod C) will be evicted from node one if already running, or prevented from being scheduled.
- Pods with the correct toleration (e.g., Pod D) continue to run on node one.

![The image illustrates Kubernetes nodes with a "NoExecute" taint, showing pods A, B, C, and D distributed across Node 1, Node 2, and Node 3.](https://kodekloud.com/kk-media/image/upload/v1752869916/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Taints-and-Tolerations/frame_420.jpg)

> [!important]
> **Note**
>
> Taints and tolerations are used to ensure that pods are not accidentally scheduled on nodes that should run only specific workloads, but they do not guarantee that a pod will run on a particular node. For node-specific scheduling, consider using node affinity.

## Master Node Taints

While the discussion so far has focused on worker nodes, master nodes are also capable of running pods. By default, Kubernetes applies a taint to master nodes to prevent workload pods from being scheduled there. This setup ensures that master nodes are reserved for critical system components. To check the taint on a master node, use the following command:

```
kubectl describe node kubemaster | grep Taint
```

The output will display a taint similar to:

```
Taints:             node-role.kubernetes.io/master:NoSchedule
```

This configuration follows best practices by ensuring that only essential components run on the master node.

## Summary

Taints and tolerations provide a powerful mechanism for controlling pod scheduling in Kubernetes clusters:

| Feature                 | Description                                                                                       | Example Command or Manifest Snippet                          |
| ----------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Tainting a Node         | Prevents pods from being scheduled on a node unless they tolerate the taint.                      | `kubectl taint nodes node1 app=blue:NoSchedule`              |
| Toleration in a Pod     | Allows a pod to run on a tainted node by including a toleration in its manifest.                  | See the YAML snippet above                                   |
| Taint Effect: NoExecute | Evicts pods not tolerating the taint from a node and prevents new non-tolerant pods from joining. | Command similar to the taint command with `NoExecute` effect |

Now that you understand taints and tolerations, experiment with their configuration in your Kubernetes cluster to better control pod placement. For more details on advanced scheduling techniques, check out [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **Warning**
>
> Remember that taints and tolerations only influence pod scheduling. If you need to enforce pod placement on specific nodes, use node affinity rules.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/13ae696a-b90f-48f8-a312-3d9af15c8fb8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/19dd5144-dcff-4696-ab65-37dba4328bbe)**
>
> Practice lab
