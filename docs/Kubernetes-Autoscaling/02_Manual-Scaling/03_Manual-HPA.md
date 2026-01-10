# Manual HPA - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Manual-Scaling/Manual-HPA)

---

## Table of Contents

- Manual HPA
  - High-Level Architecture
  - Lab Objectives
  - Demonstrating Manual Scaling
  - Key Takeaways
  - Next Steps
  - References
  - Watch Video
  - Practice Lab
    - 1. Scale the Deployment
    - 2. Verify the New Pods
    - 3. Common Commands

---

## Content

Kubernetes Autoscaling

Manual Scaling

# Manual HPA

In this lesson, you’ll learn how to manually adjust the replica count of a Kubernetes Deployment to see how pod creation, hostnames, and application behavior change. This manual process lays the groundwork for understanding the [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/).

## High-Level Architecture

Imagine your Kubernetes cluster as a growing city:

- **Deployments** are neighborhoods.
- **Pods** are individual houses.
- **Applications** run inside those houses, serving end users.

![The image is a diagram showing a Kubernetes cluster with a deployment containing pods, and users accessing the pods.](https://kodekloud.com/kk-media/image/upload/v1752880230/notes-assets/images/Kubernetes-Autoscaling-Manual-HPA/kubernetes-cluster-deployment-diagram.jpg)

## Lab Objectives

In this hands-on lab, you will:

- Scale a Deployment up and down by changing its replica count.
- Observe how each pod receives a unique hostname.
- Understand the effects of replication on application throughput and identity.

![The image is a lab overview describing objectives related to scaling a Kubernetes deployment, focusing on hostname changes and the impact of increasing replicas on application output.](https://kodekloud.com/kk-media/image/upload/v1752880231/notes-assets/images/Kubernetes-Autoscaling-Manual-HPA/kubernetes-scaling-deployment-overview.jpg)

> [!important]
> **Prerequisites**
>
> Ensure you have a running Kubernetes cluster and `kubectl` configured to interact with it.

## Demonstrating Manual Scaling

### 1\. Scale the Deployment

Run the following command to increase replicas to three:

```
kubectl scale deployment flask-web-app --replicas=3
```

### 2\. Verify the New Pods

List the pods and confirm there are three running instances:

```
kubectl get pods
```

Expected output:

```
NAME                                     READY   STATUS    RESTARTS   AGE
flask-web-app-59d5f5df85-4pvbq           1/1     Running   0          2m12s
flask-web-app-59d5f5df85-f4ktj           1/1     Running   0          111s
flask-web-app-59d5f5df85-sc6jq           1/1     Running   0          2m12s
```

Each pod now has a unique hostname that changes whenever pods are replaced.

### 3\. Common Commands

| Command                                   | Description                         |
| ----------------------------------------- | ----------------------------------- |
| `kubectl scale deployment ... --replicas` | Adjusts the number of pod replicas. |
| `kubectl get pods`                        | Lists all pods with status and age. |

> [!important]
> **Ephemeral Hostnames**
>
> Pods are ephemeral. Their hostnames and IPs can change on restart or rescheduling. For stable network IDs, consider using a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/).

## Key Takeaways

![The image presents key takeaways about scaling, hostnames, and application behavior in deployments, highlighting how increasing replicas adds pods, each pod gets a unique hostname, and scaling can affect application behavior.](https://kodekloud.com/kk-media/image/upload/v1752880232/notes-assets/images/Kubernetes-Autoscaling-Manual-HPA/scaling-hostnames-application-behavior.jpg)

- Manually scaling a Deployment is like adding or removing houses in a neighborhood.
- Each pod gets its own hostname; they’re not preserved across restarts.
- More replicas boost capacity but can affect apps that rely on host-specific data.
- For stateful applications, use StatefulSets or external storage to maintain stable identities.

## Next Steps

You’ve now seen how manual replica changes work under the hood. Next, we’ll automate this process using the [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) to dynamically adjust pod counts based on CPU or memory metrics.

## References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
- [kubectl scale Command](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#scale)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/66710f67-c094-4a4c-b718-4a031d1ddebe/lesson/4c3caee4-e0bd-4a9e-90ba-ac8e9ea9230f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/66710f67-c094-4a4c-b718-4a031d1ddebe/lesson/07c8db56-dd00-44c2-9da0-d391e677e204)**
>
> Practice lab
