# Node Selectors Logging - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Configuration/Node-Selectors-Logging)

---

## Table of Contents

- Node Selectors Logging
  - Understanding Node Selectors
  - Pod Definition Using Node Selectors
  - Labeling Your Nodes
  - Limitations of Node Selectors
  - Advanced Scheduling: Node Affinity and Anti-affinity
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Configuration

# Node Selectors Logging

Welcome to this article on Kubernetes node selectors. In this guide, we will explore how node selectors help schedule pods onto the most suitable nodes in your cluster.

## Understanding Node Selectors

Imagine you have a three-node cluster where two nodes are smaller with limited hardware resources and one node is larger with higher resources. Your cluster runs various workloads, but you want to ensure that resource-intensive data processing pods always run on the larger node. By default, Kubernetes can schedule any pod on any available node, which might result in a resource-heavy pod running on a smaller node.

To overcome this, you can restrict pods to run on specific nodes by using node selectors. A node selector allows you to define a key-value pair in your pod definition that corresponds to labels assigned to nodes.

## Pod Definition Using Node Selectors

Below is an example of a pod definition in YAML format that uses a node selector to ensure the pod runs exclusively on the larger node:

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

In this example, the `nodeSelector` property is added under the `spec` section, and it specifies the key-value pair `size: Large`. These labels must be assigned to the corresponding nodes.

## Labeling Your Nodes

Before creating a pod with a node selector, ensure your nodes are labeled appropriately. You can label a node using the following command:

```
kubectl label nodes <node-name> <label-key>=<label-value>
kubectl label nodes node-1 size=Large
```

After labeling the node, create the pod with the node selector. When the pod is created, it will be scheduled on the node labeled `size=Large` (in this example, node-1).

To create the pod, run:

```
kubectl create -f pod-definition.yaml
```

## Limitations of Node Selectors

While node selectors are effective for basic node restrictions, they have limitations when handling more complex scheduling requirements. For instance, if you need to schedule a pod on a node labeled either "Large" or "Medium" while excluding nodes labeled "Small," node selectors cannot express this conditional logic.

![The image illustrates node selector limitations, showing nodes labeled "Large" and "Medium," with a note indicating selection criteria: "Large OR Medium? NOT Small."](https://kodekloud.com/kk-media/image/upload/v1752871136/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Node-Selectors-Logging/frame_190.jpg)

> [!important]
> **Note**
>
> For advanced scheduling requirements, consider using Kubernetes node affinity and anti-affinity. These features offer greater flexibility in defining complex scheduling rules beyond simple node selectors.

## Advanced Scheduling: Node Affinity and Anti-affinity

Kubernetes introduced node affinity and anti-affinity to address more complex scheduling needs. These advanced features enable you to define rules that span multiple conditions, ensuring that pods are scheduled on nodes that better meet your workload requirements.

For more detailed information on advanced scheduling in Kubernetes, check out the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/).

By understanding both node selectors and node affinity, you can optimize your pod scheduling strategy and ensure that your workloads run efficiently on the most appropriate nodes.

Happy scheduling!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/eaafd013-3491-4c7b-8a11-d27fa1405ec9)**
>
> Watch video content
