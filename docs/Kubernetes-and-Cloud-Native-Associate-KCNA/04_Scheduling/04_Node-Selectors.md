# Node Selectors - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Scheduling/Node-Selectors)

---

## Table of Contents

- Node Selectors
  - Using Node Selectors in Pod Definitions
  - Understanding Labels and Node Selectors
  - Labeling Your Nodes
  - Deploying the Pod
  - Limitations of Node Selectors
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Scheduling

# Node Selectors

Welcome to this guide on Kubernetes node selectors. In this article, you'll learn how to restrict pod scheduling to specific nodes based on labels. Imagine a three-node cluster where two nodes have limited hardware resources, and one node is larger and more powerful. To ensure resource-intensive tasks run on the larger node, you can utilize node selectors. By default, Kubernetes schedules pods on any available node, which might inadvertently assign a high-demand pod to a smaller node. Using node selectors, you can guarantee that pods land on nodes that meet the required label criteria.

## Using Node Selectors in Pod Definitions

To restrict a pod to run only on a node labeled as large, add a `nodeSelector` field to the pod specification. Below is an example demonstrating how to define a pod with a node selector:

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

In this example, the `nodeSelector` ensures that the pod is scheduled only on nodes having the label key `size` with the value `Large`.

## Understanding Labels and Node Selectors

The key-value pair (`size: Large`) in the node selector must match the labels assigned to the nodes. Labels play a critical role in Kubernetes, not only with node selection but also for services, ReplicaSets, and deployments. It is essential to label your nodes accurately before deploying pods that use node selectors.

## Labeling Your Nodes

Before creating a pod with a node selector, label the appropriate node. Use the following command to add a label to a node:

```
kubectl label nodes <node-name> <label-key>=<label-value>
```

For instance, to label a node named `node-1` as large, run:

```
kubectl label nodes node-1 size=Large
```

This command sets the label `size=Large` on `node-1`, ensuring that any pod requiring this label via its `nodeSelector` will be scheduled on the correct node.

## Deploying the Pod

Once your node is labeled and your pod definition includes the node selector, deploy your pod with:

```
kubectl create -f pod-definition.yml
```

This command creates the pod named `myapp-pod`, which will be scheduled on `node-1` thanks to the matching label.

> [!important]
> **Note**
>
> Ensure that your node labels are kept up-to-date as your cluster evolves. This helps maintain consistent and predictable pod scheduling.

## Limitations of Node Selectors

While node selectors are a simple and effective method for basic pod scheduling, they come with limitations. If your scheduling requirements extend beyond a single label match—for instance, if you need to schedule pods on either a large or medium node or exclude nodes labeled as small—node selectors alone won't suffice. For more complex scheduling scenarios, consider using node affinity or anti-affinity. However, for straightforward cases, node selectors provide an easy-to-use solution.

![The image illustrates node selector limitations, showing nodes of different sizes, emphasizing selection of "Large" or "Medium" nodes, excluding "Small" ones.](https://kodekloud.com/kk-media/image/upload/v1752880695/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Node-Selectors/frame_190.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/4fab542c-3091-4f8e-ad7c-91d96d54b049/lesson/5f461a14-4f2a-4ba2-80b3-63a9070c9cce)**
>
> Watch video content
