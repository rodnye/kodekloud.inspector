# Why Do We Need to Autoscale - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Manual-Scaling/Why-Do-We-Need-to-Autoscale)

---

## Table of Contents

- Why Do We Need to Autoscale
  - Benefits of Autoscaling
  - Autoscaling Components in Kubernetes
  - Cluster Scaling
  - Core Autoscaling Tools
  - Pod Scaling vs. Cluster Scaling
  - Bringing It All Together
  - Links & References
  - Watch Video

---

## Content

Kubernetes Autoscaling

Manual Scaling

# Why Do We Need to Autoscale

When your application experiences an unexpected spike in traffic, manual intervention often comes too late. Autoscaling dynamically adjusts compute resources—whether nodes or Pods—to match demand, ensuring seamless performance and preventing costly downtime.

## Benefits of Autoscaling

1.  **Cost Savings**  
    Autoscaling prevents overprovisioning by scaling down idle resources, reducing your cloud spend.
2.  **Improved Availability**  
    Automatically adds capacity during peak traffic—perfect for flash sales or feature launches.
3.  **Efficient Resource Utilization**  
    Matches compute to workload, avoiding crashes from insufficient capacity and idle infrastructure.
4.  **True Elasticity**  
    Adapts to unpredictable workloads without manual effort, a hallmark of cloud-native design.
5.  **Fault Tolerance & Recovery**  
    Distributes load and replaces unhealthy resources to maintain resilience.
6.  **Simplified Operations**  
    Frees your team from firefighting infrastructure so they can focus on building features.

![The image is a diagram explaining the benefits of autoscaling in Kubernetes (K8s), highlighting improved application availability, efficient resource utilization, and elasticity.](https://kodekloud.com/kk-media/image/upload/v1752880233/notes-assets/images/Kubernetes-Autoscaling-Why-Do-We-Need-to-Autoscale/kubernetes-autoscaling-benefits-diagram.jpg)

---

## Autoscaling Components in Kubernetes

Kubernetes offers two primary autoscaling layers:

- **Cluster Scaling** adjusts the number of worker nodes (VMs).
- **Pod Scaling** modifies the replica count or resource requests of your applications.

![The image is a diagram illustrating "Scaling in Kubernetes," showing two main types: Cluster Scaling (worker node scaling) and Pod Scaling (pod, deployment, and statefulset scaling).](https://kodekloud.com/kk-media/image/upload/v1752880234/notes-assets/images/Kubernetes-Autoscaling-Why-Do-We-Need-to-Autoscale/scaling-in-kubernetes-diagram.jpg)

---

## Cluster Scaling

Cluster scaling manages your node pool size to ensure there’s enough CPU, memory, disk, or GPU capacity for all Pods. Kubernetes’ **Cluster Autoscaler** inspects pending Pods and resource requests, then adds or removes VMs accordingly.

```
# Example: Deploy Cluster Autoscaler on your cluster
kubectl apply -f https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/deploy/cluster-autoscaler.yaml
```

> [!important]
> **Note**
>
> Make sure your cloud provider permissions (IAM roles) are configured so the autoscaler can spin up or tear down nodes.

![The image illustrates a Kubernetes cluster with multiple worker nodes and a cluster autoscaler.](https://kodekloud.com/kk-media/image/upload/v1752880236/notes-assets/images/Kubernetes-Autoscaling-Why-Do-We-Need-to-Autoscale/kubernetes-cluster-worker-nodes-autoscaler.jpg)

---

## Core Autoscaling Tools

| Autoscaler                | Purpose                                    | Documentation                                                                            |
| ------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Cluster Autoscaler (CA)   | Scale VMs based on pending Pods            | [GitHub](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler)        |
| Horizontal Pod Autoscaler | Scale Pod replicas by CPU/memory           | [Kubernetes](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) |
| Vertical Pod Autoscaler   | Adjust Pod resource requests/limits        | [Kubernetes](https://kubernetes.io/docs/tasks/run-application/vertical-pod-autoscaling/) |
| KEDA                      | Event-driven scaling from external sources | [KEDA](https://keda.sh/)                                                                 |

---

## Pod Scaling vs. Cluster Scaling

| Aspect          | Cluster Scaling              | Pod Scaling                            |
| --------------- | ---------------------------- | -------------------------------------- |
| What it adjusts | Number of worker nodes (VMs) | Number of Pods or resource settings    |
| Primary impact  | Infrastructure capacity      | Application concurrency and throughput |
| Key benefits    | Ensures node-level resources | Ensures right replica count & sizing   |

![The image compares "Cluster Scaling" and "Pod Scaling" strategies, highlighting aspects like scaling nodes, cluster availability, and capacity for clusters, and scaling pods/replicas and application availability for pods.](https://kodekloud.com/kk-media/image/upload/v1752880237/notes-assets/images/Kubernetes-Autoscaling-Why-Do-We-Need-to-Autoscale/cluster-scaling-vs-pod-scaling.jpg)

---

## Bringing It All Together

Effective Kubernetes autoscaling leverages both cluster and pod strategies:

- Cluster Autoscaler maintains sufficient node capacity.
- Pod Autoscalers (HPA/VPA/KEDA) tailor application replicas and resource requests.

Together, they ensure cost-efficient, resilient, and performant workloads in dynamic environments.

![The image explains the need for different strategies in Kubernetes, highlighting "Cluster Scaling" for infrastructure and "Pod Scaling" for applications, ensuring both have the required capacity.](https://kodekloud.com/kk-media/image/upload/v1752880238/notes-assets/images/Kubernetes-Autoscaling-Why-Do-We-Need-to-Autoscale/kubernetes-scaling-strategies-diagram.jpg)

> [!important]
> **Next Steps**
>
> In the next lesson, we’ll dive into hands-on configurations for HPA, VPA, and Cluster Autoscaler, complete with best practices and troubleshooting tips.

---

## Links & References

- [Kubernetes Autoscaling Concepts](https://kubernetes.io/docs/concepts/cluster-administration/autoscaling/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/)
- [Terraform Registry](https://registry.terraform.io/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/66710f67-c094-4a4c-b718-4a031d1ddebe/lesson/e57460fa-c121-4d31-b5a2-1d54caee9b49)**
>
> Watch video content
