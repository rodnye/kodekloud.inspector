# Kubernetes Question 8 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Kubernetes/Kubernetes-Question-8)

---

## Table of Contents

- Kubernetes Question 8
  - Kubelet Eviction Configuration
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Kubernetes

# Kubernetes Question 8

Welcome to this lesson on Kubernetes pod eviction and disk space management.

In this session, we will explore managing disk space in a 10-node Kubernetes cluster where each node has 500 GB of disk space. We address a critical question: If a node reaches high disk utilization—around 85%—can Kubernetes automatically evict pods and redeploy them on a healthier node to prevent complete node overload? This mechanism ensures that if a node's disk usage approaches 100%, only the impacted pods are evicted rather than rendering the node unusable.

![The image contains a question about managing disk space in a cluster of 10 nodes, each with 500GB of disk. It asks if a pod can be evicted and redeployed when disk usage reaches 85%.](https://kodekloud.com/kk-media/image/upload/v1752873380/notes-assets/images/DevOps-Interview-Preparation-Course-Kubernetes-Question-8/disk-space-management-cluster-question.jpg)

The answer is yes. Kubernetes can manage this scenario through pod eviction policies configured at the node level via the Kubelet. The Kubelet monitors each node’s resource utilization and, when thresholds are breached, selectively evicts pods based on internal algorithms and the Quality of Service (QoS) classification of each pod. This strategy prevents the node from being saturated while allowing the pods to be rescheduled on nodes with sufficient available resources.

Imagine a simplified scenario with two nodes:

- **Node 1:** Hosts two pods. When its disk utilization exceeds 85%, rather than shutting down the entire node, the pods are gracefully evicted.
- **Node 2:** Receives the evicted pods if it has enough resources available.

![The image illustrates a concept of node eviction in a computing environment, showing two nodes with one exceeding 85% capacity, leading to an eviction process.](https://kodekloud.com/kk-media/image/upload/v1752873381/notes-assets/images/DevOps-Interview-Preparation-Course-Kubernetes-Question-8/node-eviction-capacity-illustration.jpg)

> [!important]
> **Note**
>
> Pod eviction is driven by an internal algorithm that prioritizes pods with lower QoS. These pods receive a grace period to exit gracefully. If they fail to terminate in time, they are forcefully evicted to reclaim essential resources.

## Kubelet Eviction Configuration

Kubelet employs two categories of eviction thresholds: eviction hard and eviction soft. The eviction hard thresholds trigger immediate pod eviction when resource limits are breached, whereas eviction soft thresholds allow a grace period before taking action. The example below demonstrates how you can configure these settings on a node:

```
kubelet \
  --eviction-hard=memory.available<500Mi,nodefs.available<10%,nodefs.inodesFree<5%,imagefs.available<15% \
  --eviction-soft=memory.available<1Gi,nodefs.available<15%,nodefs.inodesFree<10%,imagefs.available<20% \
  --eviction-soft-grace-period=memory.available=1m30s,nodefs.available=1m30s,nodefs.inodesFree=1m30s,imagefs.available=1m30s \
  --eviction-max-pod-grace-period=60 \
  --eviction-pressure-transition-period=5m \
  --pod-manifest-path=/etc/kubernetes/manifests \
  --fail-swap-on=false \
  --hostname-override=${hostname} \
  --node-ip=<node-ip> \
  --kubeconfig=/var/lib/kubelet/kubeconfig \
  --bootstrap-kubeconfig=/var/lib/kubelet/bootstrap-kubeconfig \
  --config=/var/lib/kubelet/config.yaml \
  --container-runtime=docker \
  --container-runtime-endpoint=unix:///var/run/docker.sock \
  --runtime-request-timeout=15m \
  --volume-plugin-dir=/usr/libexec/kubernetes/kubelet-plugins/volume/exec/ \
  --logtostderr=true \
  --v=2
```

In this configuration:

- **Eviction Hard Thresholds:** The node triggers pod eviction immediately if the available memory drops below 500 Mi, or if node filesystem availability is under 10%, inodes free are less than 5%, or image filesystem availability falls below 15%.
- **Eviction Soft Thresholds:** This setting provides a grace period of 1 minute and 30 seconds before evicting pods when available memory is below 1 Gi, node filesystem availability is under 15%, inodes free drop below 10%, or image filesystem availability is less than 20%.

The Kubelet continuously monitors these metrics and, upon detecting threshold breaches, sends termination signals to selected pods. The pods are expected to shut down gracefully during the configured grace period; if not, they are forcefully terminated to free resources and maintain node health.

> [!important]
> **Warning**
>
> Keep in mind that enabling automatic eviction is not a permanent solution to resource constraints. It is essential to implement robust monitoring and alerting systems to diagnose and resolve the underlying issues causing high resource usage.

This configuration is especially useful when new deployments inadvertently cause pods to consume more disk space than anticipated, potentially degrading node performance and impacting other pods.

That concludes this lesson. Thank you for reading, and we look forward to seeing you in the next lesson.

For further reading, check out these resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/9c606af3-d2d0-4d2c-9ef5-dc99d8409b6c/lesson/5d61c562-1f9e-4121-a262-11b1ceaab10d)**
>
> Watch video content
