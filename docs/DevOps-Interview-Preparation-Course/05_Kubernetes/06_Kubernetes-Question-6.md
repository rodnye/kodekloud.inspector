# Kubernetes Question 6 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Kubernetes/Kubernetes-Question-6)

---

## Table of Contents

- Kubernetes Question 6
  - Overview
  - Applying a Taint to a Node
  - Real-World Use Case
  - How Taints and Tolerations Work in Interviews
  - Conclusion
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Kubernetes

# Kubernetes Question 6

In this guide, we explore how to schedule specific Pods exclusively on designated Nodes within a Kubernetes cluster. This technique is particularly useful in real-world deployments where dedicated nodes are needed for certain applications. The solution revolves around Kubernetes taints and tolerations.

## Overview

To control which Pods are scheduled on particular nodes, Kubernetes allows you to add a taint to those nodes. A taint prevents Pods from being deployed on a node unless they include a matching toleration. Think of this mechanism like a movie theater that offers both regular and deluxe tickets. Only guests with the deluxe ticket—granting extra benefits such as complimentary popcorn and extra leg space—can access premium seating. In Kubernetes, the node's taint serves as a reservation label, and only Pods with a corresponding toleration (the deluxe ticket, in this analogy) are admitted.

> [!important]
> **Note**
>
> Using taints and tolerations is a best practice for scenarios that require isolated workloads or dedicated hardware utilization. It prevents accidental scheduling of Pods on nodes reserved for specialized tasks.

## Applying a Taint to a Node

To apply a taint to a node, use the following command:

```
kubectl taint nodes nodex key=value:Effect
```

- **nodex**: The name of the target node.
- **key=value**: A custom label for identification.
- **Effect**: Specifies the scheduling behavior (e.g., NoSchedule).

When a node is tainted, the Kubernetes scheduler ensures that only Pods containing the matching toleration are scheduled on that node.

## Real-World Use Case

Consider a Kubernetes cluster with three nodes: node one, node two, and node three. If node three is reserved for running defense applications, you can taint node three to restrict scheduling only to Pods with the appropriate toleration. For instance, if you have defense application Pods, their specifications must include a matching toleration to be scheduled on node three.

Conversely, if Application X lacks the necessary toleration, its Pods will not be scheduled on node three. This setup is also useful during maintenance events. You can apply a maintenance taint to block new Pods from being scheduled on a node until maintenance is complete.

## How Taints and Tolerations Work in Interviews

When discussing taints and tolerations during interviews, you can explain their roles as follows:

- Taints are applied to nodes to repel any Pods that do not explicitly tolerate the taint.
- Tolerations are added to Pod specifications, indicating that the Pod can bypass the node's taint restrictions.

A concise explanation might be: "To ensure that only specific Pods are deployed on dedicated nodes, we apply taints to those nodes. Only Pods with a matching toleration in their specification—reflecting the taint's key and value—will be scheduled on the tainted nodes."

## Conclusion

Leveraging taints and tolerations enables effective control over Pod placements within your Kubernetes cluster. This approach is essential for scenarios that require dedicated hardware resources, such as isolating defense applications to node three or managing maintenance events where no new Pods should be scheduled.

> [!important]
> **Happy Clustering**
>
> I hope this article has provided clarity on scheduling Pods with taints and tolerations. Explore more Kubernetes concepts to optimize your deployments!

For further reading, consider checking out the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/9c606af3-d2d0-4d2c-9ef5-dc99d8409b6c/lesson/dd6f6e66-db65-4b15-8f68-ee1770fb380e)**
>
> Watch video content
