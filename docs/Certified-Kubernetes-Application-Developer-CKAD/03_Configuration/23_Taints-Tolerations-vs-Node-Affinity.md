# Taints Tolerations vs Node Affinity - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Configuration/Taints-Tolerations-vs-Node-Affinity)

---

## Table of Contents

- Taints Tolerations vs Node Affinity
  - Problem Overview
  - First Approach: Taints and Tolerations
  - Second Approach: Node Affinity
  - Combining Taints, Tolerations, and Node Affinity
  - Final Thoughts
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Configuration

# Taints Tolerations vs Node Affinity

Hello, and welcome to this comprehensive lesson. In this guide, we will explore how to combine taints and tolerations with node affinity in Kubernetes to ensure that specific pods run exclusively on designated nodes. In our example, we consider a Kubernetes cluster with three nodes and three pods, each associated with one of three colors: blue, red, and green. The objective is to schedule the blue pod on the blue node, the red pod on the red node, and the green pod on the green node, even when the cluster is shared with other teams running different pods on various nodes.

## Problem Overview

In a shared cluster environment, we want to ensure that:

- Our dedicated nodes do not run pods from other teams.
- Our pods are not placed on nodes that are primarily serving other workloads.

To solve this, we explore two approaches:

## First Approach: Taints and Tolerations

In this method, each node is tainted with its respective color (blue, red, or green). Correspondingly, each pod is given a toleration that matches the node’s taint. This ensures that:

- Only pods with the appropriate toleration can be scheduled on the tainted node.

For example, the green pod will only be scheduled on the green node, and the blue pod on the blue node. However, while taints and tolerations can prevent pods lacking the correct toleration from being scheduled on these nodes, they do not guarantee that the pods will preferentially use the dedicated nodes. Consequently, there might be cases where the red pod is scheduled on a node without the corresponding taint and toleration, resulting in undesired pod placement.

## Second Approach: Node Affinity

Node affinity offers another strategy by allowing you to:

- Label nodes with their respective colors (blue, red, and green).
- Define node affinity rules or selectors on pods to match these labels.

This method directs pods to the correct nodes based on labels. Although node affinity helps achieve the desired pod distribution, it does not prevent other pods from being scheduled on the same nodes, which could lead to conflicts with other teams’ deployments.

## Combining Taints, Tolerations, and Node Affinity

To fully dedicate nodes exclusively for specific pods, you can harness the strengths of both approaches by combining them:

![The image illustrates "Taints/Tolerations and Node Affinity" with colored icons and server representations labeled Blue, Red, Green, and Other.](https://kodekloud.com/kk-media/image/upload/v1752871162/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Taints-Tolerations-vs-Node-Affinity/frame_130.jpg)

1.  > [!important]
    > **Step 1: Taints**
    >
    > First, apply taints on your nodes. This ensures that pods without the matching toleration are not scheduled on these nodes.
2.  > [!important]
    > **Step 2: Node Affinity**
    >
    > Next, implement node affinity rules on your pods. This guarantees that the pods are scheduled only on the nodes with the corresponding color labels.

By using both strategies together, you achieve strict node allocation. This method ensures that only your dedicated pods run on their targeted nodes, thereby preventing any unintended pod placements from other teams.

## Final Thoughts

This lesson has demonstrated the effective combination of taints, tolerations, and node affinity to achieve precise pod placement in a shared Kubernetes cluster. You are encouraged to experiment with these configurations in your own cluster environment to deepen your understanding of Kubernetes scheduling policies and improve your cluster management practices.

Happy Kubernetes configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/2da98bb8-a5aa-4068-b941-5ed445de573f)**
>
> Watch video content
