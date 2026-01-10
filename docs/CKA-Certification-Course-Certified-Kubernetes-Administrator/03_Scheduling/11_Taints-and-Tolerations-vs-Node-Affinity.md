# Taints and Tolerations vs Node Affinity - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Scheduling/Taints-and-Tolerations-vs-Node-Affinity)

---

## Table of Contents

- Taints and Tolerations vs Node Affinity
  - Using Taints and Tolerations
  - Using Node Affinity
  - Combining Taints and Tolerations with Node Affinity
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Scheduling

# Taints and Tolerations vs Node Affinity

Welcome to this article where we explain how to control pod placement in a Kubernetes cluster by combining taints, tolerations, and node affinity. In our example, we have three nodes and three pods, each identified by a distinct color—blue, red, and green. Our objective is to ensure that each pod is scheduled on the node with the corresponding color while preventing unwanted workloads from running on these dedicated nodes.

> [!important]
> **Key Concepts**
>
> In Kubernetes, taints and tolerations are primarily used to repel pods from nodes unless they explicitly tolerate the taint, whereas node affinity is used to attract pods to nodes that satisfy specific label criteria.

## Using Taints and Tolerations

To begin, we apply a taint to each node that marks it with its respective color (blue, red, or green). Then, each pod is configured with a corresponding toleration. With this setup, the Kubernetes scheduler places the pods on nodes that accept their tolerations. For instance, the green pod is placed on the green node and the blue pod on the blue node.

![The image illustrates "Taints and Tolerations" with colored icons and server symbols labeled Blue, Red, Green, and Other, likely representing a Kubernetes concept.](https://kodekloud.com/kk-media/image/upload/v1752869912/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Taints-and-Tolerations-vs-Node-Affinity/frame_50.jpg)

However, while taints and tolerations ensure that pods with matching tolerations are admitted by the nodes, they do not guarantee exclusive scheduling. Consequently, a pod (for example, a red pod) might still be scheduled on an untainted node, leading to undesired placements.

## Using Node Affinity

To overcome the limitation of taints and tolerations, we leverage node affinity. This method involves labeling each node with its specific color and then configuring node selectors or advanced affinity rules in the pod specifications. Node affinity ensures a pod lands only on the node with the matching label.

While node affinity directs pods to the correct nodes, it does not restrict other pods from also being scheduled on these nodes. This means that although our desired pods are correctly placed, the nodes might still host pods not meant for them.

## Combining Taints and Tolerations with Node Affinity

For exclusive node usage, combining both strategies is the optimal solution. The integration works as follows:

1.  Apply taints on nodes and specify corresponding tolerations in pod configurations to block any pod without the proper toleration.
2.  Use node affinity rules to ensure that each pod is only scheduled on a node with a matching label.

This combined approach dedicates the nodes exclusively to the intended pods, assuring correct pod assignments and preventing interference by other workloads.

![The image illustrates "Taints/Tolerations and Node Affinity" with colored boxes and server icons labeled Blue, Red, Green, and Other.](https://kodekloud.com/kk-media/image/upload/v1752869913/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Taints-and-Tolerations-vs-Node-Affinity/frame_130.jpg)

> [!important]
> **Summary**
>
> In summary, leveraging both taints/tolerations and node affinity in Kubernetes ensures precise pod scheduling. This approach is particularly useful in multi-tenant clusters where exclusive node usage is critical.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/072fadcf-5696-4577-89c4-66900d61b524)**
>
> Watch video content
