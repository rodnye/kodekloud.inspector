# Taints and Tolerations vs Node Affinity - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Scheduling/Taints-and-Tolerations-vs-Node-Affinity)

---

## Table of Contents

- Taints and Tolerations vs Node Affinity
  - Using Taints and Tolerations
  - Using Node Affinity
  - Combining Taints, Tolerations, and Node Affinity
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Scheduling

# Taints and Tolerations vs Node Affinity

Welcome to this lesson. In this guide, we explore how taints and tolerations work alongside node affinity to control pod placement within a Kubernetes cluster. Imagine a scenario with three nodes and three pods, each uniquely identified by their colors: blue, red, and green. The goal is to schedule the blue pod onto the blue node, the red pod onto the red node, and the green pod onto the green node.

Our Kubernetes cluster is shared among multiple teams. Therefore, it is crucial to ensure that no pod from another team is accidentally scheduled on our dedicated nodes, and our pods are not deployed on nodes assigned to other teams.

## Using Taints and Tolerations

Taints and tolerations are a powerful mechanism to control pod placement. Follow these steps to use them effectively:

1.  **Apply Taints to Nodes:**  
    Taint each node with a key-value pair corresponding to its color (e.g., blue, red, or green). This marks the nodes and repels any pod that does not have a matching toleration.
2.  **Set Tolerations on Pods:**  
    Configure each pod with a toleration that matches its designated node’s taint. When pods are created, Kubernetes verifies node taints and only schedules pods that have appropriate tolerations. For example, the green pod, which carries the matching toleration, will only be scheduled on the green node, and the same applies to the blue and red pods.

> [!important]
> **Key Consideration**
>
> While taints and tolerations allow pods with the proper tolerations to be scheduled on tainted nodes, they do not enforce that these pods are preferentially scheduled onto these nodes. This means that a pod (like the red pod) could potentially be scheduled on a node that lacks any specific taint if the scheduling criteria permit.

## Using Node Affinity

Node affinity offers an additional layer of control for scheduling:

1.  **Labeling Nodes:**  
    Assign each node a label that corresponds to its color (blue, red, or green).
2.  **Setting Node Selectors on Pods:**  
    Configure each pod with a node selector that matches the node’s label. This enforces that pods only get scheduled on nodes that have the corresponding label, ensuring that pods land on the intended nodes.

However, node affinity alone does not stop other teams' pods from being scheduled on these nodes.

## Combining Taints, Tolerations, and Node Affinity

To fully dedicate nodes to specific pods and prevent external interference, it is best to combine both strategies:

1.  **Prevent External Pod Scheduling:**  
    Use taints on the nodes and matching tolerations on your pods to ensure that only the correct pods are scheduled on these nodes.
2.  **Enforce Correct Pod Placement:**  
    Apply node affinity settings to ensure that pods are scheduled strictly on nodes with the appropriate labels.

![The image illustrates "Taints/Tolerations and Node Affinity" with colored icons representing nodes labeled as Blue, Red, Green, and Other.](https://kodekloud.com/kk-media/image/upload/v1752880710/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Taints-and-Tolerations-vs-Node-Affinity/frame_140.jpg)

By combining these techniques, you ensure that nodes are exclusively dedicated to specific pods while preventing any external pods from being scheduled on them.

That concludes this lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/4fab542c-3091-4f8e-ad7c-91d96d54b049/lesson/65c9160e-14cb-4411-bf14-01447de8bc4b)**
>
> Watch video content
