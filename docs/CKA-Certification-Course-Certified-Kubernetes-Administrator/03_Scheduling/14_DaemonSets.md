# DaemonSets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Scheduling/DaemonSets)

---

## Table of Contents

- DaemonSets
  - Use Cases for DaemonSets
  - Creating a DaemonSet
  - How DaemonSets Schedule Pods
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Scheduling

# DaemonSets

Welcome to this comprehensive guide on DaemonSets in Kubernetes. In this article, we will dive deep into how DaemonSets work, explore their primary use cases, and provide a step-by-step example to help you deploy one in your cluster.

DaemonSets ensure that exactly one copy of a pod runs on every node in your Kubernetes cluster. When you add a new node, the DaemonSet automatically deploys the pod on the new node. Likewise, when a node is removed, the corresponding pod is also removed. This guarantees that a single instance of the pod is consistently available on each node.

![The image illustrates Kubernetes concepts: Daemon Sets, ReplicaSets, and Deployments, using colored dots within outlined boxes to represent different components and their distribution.](https://kodekloud.com/kk-media/image/upload/v1752869886/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-DaemonSets/frame_40.jpg)

## Use Cases for DaemonSets

DaemonSets are particularly useful in scenarios where you need to run background services or agents on every node. Some common use cases include:

- **Monitoring agents and log collectors:** Deploy monitoring tools or log collectors across every node to ensure comprehensive cluster-wide visibility without manual intervention.
- **Essential Kubernetes components:** Deploy critical components, such as kube-proxy, which Kubernetes requires on all worker nodes.
- **Networking solutions:** Ensure consistent deployment of networking agents like those used in VNet or weave-net across all nodes.

![The image illustrates a use case for Daemon Sets, showing their connection to a Monitoring Solution and Logs Viewer.](https://kodekloud.com/kk-media/image/upload/v1752869888/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-DaemonSets/frame_80.jpg)

![The image illustrates a Kubernetes DaemonSet use case for kube-proxy, showing multiple nodes each running a kube-proxy instance.](https://kodekloud.com/kk-media/image/upload/v1752869889/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-DaemonSets/frame_100.jpg)

![The image illustrates a networking use case for Daemon Sets, showing multiple nodes labeled "weave-net" with colored circles representing network components.](https://kodekloud.com/kk-media/image/upload/v1752869890/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-DaemonSets/frame_120.jpg)

## Creating a DaemonSet

Creating a DaemonSet is analogous to creating a ReplicaSet. The DaemonSet YAML configuration consists of a pod template under the `template` section and a selector that binds the DaemonSet to its pods. A typical DaemonSet definition includes the API version, kind, metadata, and specifications. Note that the API version is `apps/v1` and the kind is set to `DaemonSet`.

Below is an example DaemonSet definition file that deploys a monitoring agent:

```
# daemon-set-definition.yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: monitoring-daemon
spec:
  selector:
    matchLabels:
      app: monitoring-agent
  template:
    metadata:
      labels:
        app: monitoring-agent
    spec:
      containers:
        - name: monitoring-agent
          image: monitoring-agent
```

:::note Important Ensure that the labels in the selector match those in the pod template. Consistent labeling is crucial for the proper functioning of your DaemonSet. :::

Once your YAML file is ready, create the DaemonSet using the following command:

```
kubectl create -f daemon-set-definition.yaml
```

Verify the DaemonSet's creation by running:

```
kubectl get daemonsets
```

This command produces output similar to:

```
NAME               DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   AGE
monitoring-daemon  1         1         1       1            1           41
```

For more detailed information on your DaemonSet, use:

```
kubectl describe daemonset monitoring-daemon
```

## How DaemonSets Schedule Pods

Prior to Kubernetes version 1.12, scheduling a pod on a specific node was often achieved by manually setting the `nodeName` property within the pod specification. However, since version 1.12, DaemonSets leverage the default scheduler in conjunction with node affinity rules. This improvement ensures that a pod is automatically scheduled on every node without manual intervention.

![The image explains Kubernetes node scheduling, showing default behavior till v1.12 and changes with NodeAffinity from v1.12, featuring nodes labeled node01 to node06.](https://kodekloud.com/kk-media/image/upload/v1752869890/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-DaemonSets/frame_240.jpg)

:::note Tip DaemonSets are an ideal solution for deploying services that must run on every node, such as monitoring agents and essential networking components. Leveraging node affinity simplifies management as your cluster scales. :::

## Conclusion

DaemonSets provide an efficient mechanism to ensure that key services are uniformly deployed across your Kubernetes cluster. Whether you're running log collectors, monitoring agents, or essential network components like kube-proxy and weave-net, DaemonSets help maintain consistency and reliability in dynamic environments.

For further reading, explore these resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [DaemonSets Concept](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)

Happy clustering!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/140b1ac2-fe89-494c-b64f-dfae87311d7f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/398221f8-e4b8-4e41-a0f8-1d130f510379)**
>
> Practice lab
