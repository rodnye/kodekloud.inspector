# Node Selectors - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Scheduling/Node-Selectors)

---

## Table of Contents

- Node Selectors
  - Configuring Node Selectors
  - Labeling a Node
  - Limitations and Advanced Scheduling
  - Further Resources
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Scheduling

# Node Selectors

Welcome to this lesson on node selectors in Kubernetes. In this guide, you'll learn how to ensure that specific pods run only on designated nodes within your cluster. Node selectors help align your pod deployments with the underlying hardware characteristics of your nodes, enhancing performance and resource management.

Imagine managing a three-node cluster where two nodes have limited hardware resources, and one node is equipped with higher resources. Different workloads run in your cluster, and data processing tasks that demand more computing power should ideally be scheduled on the larger node. Without any scheduling constraints, any pod might land on any node—even on one with insufficient resources—leading to performance bottlenecks.

> [!important]
> **Key Concept**
>
> Node selectors restrict pod placement by matching key-value pairs defined in the pod’s specification against the labels on the nodes.

## Configuring Node Selectors

To ensure that a pod is restricted to run on a specific node, you can modify the pod's definition file using node selectors. Below is an example of a pod definition YAML file that deploys a data processing image exclusively on a node labeled as "Large":

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
spec:
  containers:
    - name: data-processor
      image: data-processor
  nodeSelector:
    size: Large
```

In this configuration, the Kubernetes scheduler identifies the appropriate node by matching the label with the key-value pair `size: Large`. Ensure that you pre-label the target node accordingly.

## Labeling a Node

Before deploying your pod, you must label your node so that it can be recognized by the selector. Use the following command to label a node (for example, `node-1`) as "Large":

```
kubectl label nodes node-1 size=Large
```

Once the node is labeled, create the pod by applying your configuration:

```
kubectl create -f pod-definition.yaml
```

Kubernetes will then schedule your pod on the node that matches the selector—in this case, the larger node.

## Limitations and Advanced Scheduling

While node selectors are ideal for simple scenarios involving a single label, they come with certain limitations. For instance, if you need to schedule a pod on a node that is either large or medium, or on any node that is not labeled as small, a basic node selector may not suffice. In these cases, consider using node affinity and anti-affinity features, which offer advanced scheduling capabilities to define more complex placement rules.

> [!important]
> **Important**
>
> Make sure that your nodes are pre-labeled with the correct key-value pairs before deploying your pods. Failure to do so may prevent the scheduler from matching pods to the intended nodes.

## Further Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/833e6757-cd53-40da-a134-890758c175e2)**
>
> Watch video content
