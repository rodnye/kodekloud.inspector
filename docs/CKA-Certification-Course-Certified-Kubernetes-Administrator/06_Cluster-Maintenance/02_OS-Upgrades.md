# OS Upgrades - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Cluster-Maintenance/OS-Upgrades)

---

## Table of Contents

- OS Upgrades
  - Draining a Node
  - Cordon vs. Drain
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Cluster Maintenance

# OS Upgrades

Welcome to this lesson on handling node upgrades in a Kubernetes cluster. In this guide, we will explore various scenarios that require taking a node offline, such as routine maintenance, base software upgrades, or the application of security patches. We also review options to minimize service interruptions during these events.

Imagine a cluster with several nodes where each node runs pods serving your applications. What happens if a node goes down? The pods on that node become inaccessible, and depending on your deployment strategy, this could impact your users. For instance, if you have multiple replicas of a "blue" pod, your users will still be served by the remaining replicas. However, if a "green" pod is the only instance running, its unavailability results in downtime.

Kubernetes offers mechanisms to handle such situations:

- If a node comes back online quickly, the pods are simply restarted.
- If a node remains down for more than five minutes, Kubernetes marks the pods on that node as dead. For pods managed by a ReplicaSet, new pods are automatically created on other nodes. In contrast, pods that are not part of a ReplicaSet will not be restarted, potentially leading to downtime.

> [!important]
> **Quick Recap**
>
> When a node is down for a short duration (less than five minutes) and your workload has multiple replicas, a quick upgrade and reboot might be acceptable.

## Draining a Node

For situations where the recovery time is uncertain, the safer method is to drain the node. Draining involves gracefully terminating the pods running on that node so they are recreated on other nodes. At the same time, draining marks the node as unschedulable (cordoned), preventing new pods from being scheduled on it until explicitly allowed.

After the node's workloads have been safely relocated, you can reboot the node. When it comes back online, it remains unschedulable until you uncordon it, allowing new pods to be scheduled. It is important to note that pods moved to other nodes do not automatically revert to the original node after uncordoning. If they were deleted or if new pods have been scheduled across the cluster, Kubernetes maintains the current distribution.

To perform these operations, run the following commands:

```
kubectl drain node-1
kubectl uncordon node-1
```

## Cordon vs. Drain

In addition to draining and uncordoning, Kubernetes provides the cordon command. Unlike drain, cordon only marks a node as unschedulable without terminating or relocating the currently running pods. This ensures that no new pods will be scheduled on the node.

> [!important]
> **Warning**
>
> Be cautious when using cordon on a node with critical workloads. Since existing pods remain and new pods cannot be scheduled, your application might become overloaded or experience unexpected behavior.

That concludes this lesson on managing node upgrades in a Kubernetes cluster. You are encouraged to practice these techniques in a hands-on lab or test environment to reinforce your understanding of draining, cordoning, and uncordoning nodes.

Keep building your skills with these essential Kubernetes operations!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/51676566-4860-4564-ad8e-4723a266211e/lesson/ceacec4c-e29b-493c-875a-0972434ed474)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/51676566-4860-4564-ad8e-4723a266211e/lesson/5b430a96-65c1-49b9-9456-54a4a3955050)**
>
> Practice lab
