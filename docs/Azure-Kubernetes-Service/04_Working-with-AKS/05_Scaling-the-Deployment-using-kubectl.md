# Scaling the Deployment using kubectl - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Working-with-AKS/Scaling-the-Deployment-using-kubectl)

---

## Table of Contents

- Scaling the Deployment using kubectl
  - 1. Inspect the current Deployment and Service
  - 2. Scale to 5 replicas
  - 3. Scale to the pod limit (30 replicas)
  - 4. Namespaces and system pods
  - Next steps
  - Links and References
  - Watch Video
    - Validate load balancing
    - Filter non-running pods
    - Inspect pod scheduling events
    - Namespace overview

---

## Content

Azure Kubernetes Service

Working with AKS

# Scaling the Deployment using kubectl

In this tutorial, you’ll learn how to scale an Azure Kubernetes Service (AKS) deployment and understand the per-node pod limit enforced by Azure CNI. We’ll cover:

1.  Inspecting your current Deployment and Service
2.  Scaling the Deployment to 5 replicas
3.  Hitting the 30-pod per-node limit
4.  Examining Namespaces and system pods

---

## 1\. Inspect the current Deployment and Service

Before scaling, verify your application’s replica count and external endpoint.

```
# Check the Deployment replicas
kubectl get deployments
# Output example:
# NAME            READY   UP-TO-DATE   AVAILABLE   AGE
# Find the LoadBalancer’s public IP
kubectl get service
# NAME            TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)         AGE
# kodekloudapp    LoadBalancer   10.0.199.121    20.247.251.108  80:30895/TCP    73m
# kubernetes      ClusterIP      10.0.0.1        <none>          443/TCP         124m
```

---

## 2\. Scale to 5 replicas

Increase your Deployment to five pods:

```
kubectl scale deployment kodekloudapp --replicas=5
kubectl get deployment kodekloudapp
# NAME            READY   UP-TO-DATE   AVAILABLE   AGE
# kodekloudapp    5/5     5            5           76m
```

### Validate load balancing

Open three incognito browser windows and navigate to your Service’s public IP. You should see traffic routed to different pods:

![The image shows three browser windows displaying the "KodeKloudApp" homepage with a welcome message, system name, and IP address highlighted in yellow. Each window has a different system name and IP address.](https://kodekloud.com/kk-media/image/upload/v1752869529/notes-assets/images/Azure-Kubernetes-Service-Scaling-the-Deployment-using-kubectl/kodekloudapp-homepage-browser-windows.jpg)

---

## 3\. Scale to the pod limit (30 replicas)

When you created the AKS cluster, you configured Azure CNI with a maximum of 30 pods per node. Let’s push the Deployment to that limit:

```
kubectl scale deployment kodekloudapp --replicas=30
kubectl get deployment kodekloudapp
# NAME            READY   UP-TO-DATE   AVAILABLE   AGE
# kodekloudapp    16/30   30           16          78m
```

Only 16 pods are running; the rest remain `Pending`:

```
kubectl get pods
# NAME                           READY   STATUS    RESTARTS   AGE
# kodekloudapp-677fc758c5-5k92g  0/1     Pending   0          57s
# kodekloudapp-677fc758c5-bbp84  0/1     Pending   0          57s
# ...
```

### Filter non-running pods

List pods that aren’t in the `Running` phase:

```
kubectl get pods --field-selector=status.phase!=Running
```

### Inspect pod scheduling events

Describe one pending pod to see why it isn’t scheduled:

```
kubectl describe pod kodekloudapp-677fc758c5-5k92g
```

In the **Events** section you’ll find:

```
Warning  FailedScheduling   2m     default-scheduler   0/1 nodes are available: 1 Too many pods.
Normal   NotTriggerScaleUp  110s   cluster-autoscaler  max node group size reached
```

---

## 4\. Namespaces and system pods

AKS uses several namespaces to isolate workloads. System pods in `kube-system` count toward your per-node limit.

```
kubectl get namespaces
# NAME              STATUS   AGE
# default           Active   129m
# kube-node-lease   Active   129m
# kube-public       Active   129m
# kube-system       Active   129m
```

### Namespace overview

| Namespace       | Purpose                     | Pod Count |
| --------------- | --------------------------- | --------- |
| default         | User applications           | 16        |
| kube-node-lease | Node heartbeat leases       | 0         |
| kube-public     | Public config and resources | 0         |
| kube-system     | Core cluster services       | 12+       |

```
kubectl get pods --namespace kube-system
# NAME                                               READY   STATUS    RESTARTS   AGE
# ama-logs-rs-7f8bcb7c6f-5dlqq                       1/1     Running   0          131m
# coredns-59b6bf8b4f-lwt4c                           1/1     Running   0          131m
# metrics-server-7d74d8758-wfsdd                     2/2     Running   0          130m
# ...
```

> [!important]
> **Warning**
>
> Azure CNI assigns IPs from your VNet based on the `--max-pods` setting at cluster creation. **You cannot change this limit post-creation**.

---

## Next steps

To work around the per-node pod limit, consider:

- Deploying multiple node pools with different `--max-pods` settings
- Switching to Kubenet or Azure CNI Overlay networks
- Splitting workloads across separate namespaces and node pools

---

## Links and References

- [Kubernetes Scaling Documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#scaling-a-deployment)
- [AKS Networking Concepts](https://learn.microsoft.com/azure/aks/concepts-network)
- [Azure CNI IP Management](https://learn.microsoft.com/azure/aks/configure-azure-cni)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/2e4891fe-2f53-4239-9ab9-8b15ba4c6369/lesson/9448e603-60d1-4b69-9175-3ae44984a0d8)**
>
> Watch video content
