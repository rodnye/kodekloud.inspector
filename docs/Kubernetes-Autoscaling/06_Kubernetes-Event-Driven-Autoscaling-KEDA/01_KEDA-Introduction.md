# KEDA Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Kubernetes-Event-Driven-Autoscaling-KEDA/KEDA-Introduction)

---

## Table of Contents

- KEDA Introduction
  - Kubernetes Autoscaling Options Recap
  - Horizontal Pod Autoscaler (HPA)
  - Vertical Pod Autoscaler (VPA)
  - Cluster Proportional Autoscaler (CPA)
  - Event-Driven Scaling Scenario
  - Why KEDA?
  - Introducing KEDA Components
  - Conclusion
  - Watch Video

---

## Content

Kubernetes Autoscaling

Kubernetes Event Driven Autoscaling KEDA

# KEDA Introduction

Welcome to this lesson on Kubernetes Event-Driven Autoscaling (KEDA). In modern cloud-native environments, workloads often experience unpredictable spikes. Traditional autoscalers like HPA, VPA, and CPA address CPU, memory, or infrastructure scaling, but they fall short when you need real-time, event-driven reactions or scale-to-zero capabilities. Here, we’ll explore how KEDA bridges that gap and empowers your Kubernetes clusters for true event-driven scaling.

Before diving into KEDA, let’s quickly recap the built-in Kubernetes autoscaling options.

---

## Kubernetes Autoscaling Options Recap

| Autoscaler | Scale Type       | Metrics                                | Scale to Zero |
| ---------- | ---------------- | -------------------------------------- | ------------- |
| HPA        | Horizontal Pods  | CPU, memory, custom, external metrics  | No            |
| VPA        | Vertical Pods    | Adjusts CPU/memory requests per pod    | N/A           |
| CPA        | Cluster Services | Node count or CPU cores (proportional) | No            |

![The image is a recap of autoscaling options available in Kubernetes Event-Driven Autoscaling (KEDA), featuring Horizontal Pod Autoscaling (HPA), Vertical Pod Autoscaling (VPA), and Cluster Proportional Autoscaling (CPA).](https://kodekloud.com/kk-media/image/upload/v1752880203/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/keda-autoscaling-options-recap.jpg)

---

## Horizontal Pod Autoscaler (HPA)

HPA automatically adjusts the number of pod replicas in a Deployment or ReplicaSet based on observed metrics:

- **Metrics supported**: CPU, memory, custom, external
- **Polling interval**: ~15 s by default

Advantages:

- Built into Kubernetes, minimal setup for CPU/memory
- Automatically adjusts replica count under load
- Extensible via custom or external metric adapters

Disadvantages:

- Cannot scale down to zero (at least one replica always exists)
- Limited to predefined thresholds and polling intervals
- Custom metrics require additional adapters
- Event-driven triggers can be complex to integrate

![The image is a comparison chart of the advantages and disadvantages of Horizontal Pod Autoscaling (HPA). Advantages include dynamic pod scaling and custom metrics support, while disadvantages include limited scaling triggers and increased operational complexity.](https://kodekloud.com/kk-media/image/upload/v1752880204/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/hpa-advantages-disadvantages-chart.jpg)

---

## Vertical Pod Autoscaler (VPA)

Instead of scaling out, VPA tunes the CPU and memory requests of individual pods:

Advantages:

- Automates resource estimation per pod
- Reduces manual tuning and resource waste
- Ideal for steady workloads

Disadvantages:

- Triggers pod restarts, which can cause downtime
- Does not adjust replica count (use alongside HPA)
- Slow reaction to sudden workload spikes
- Over-provisioning may lead to unschedulable pods unless mitigated

![The image is a table comparing the advantages and disadvantages of Vertical Pod Autoscaling (VPA), highlighting benefits like automated resource tuning and cost efficiency, and drawbacks such as potential downtime risk and no horizontal scaling.](https://kodekloud.com/kk-media/image/upload/v1752880205/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/vpa-advantages-disadvantages-table.jpg)

---

## Cluster Proportional Autoscaler (CPA)

CPA ensures critical cluster services scale in proportion to the cluster size:

Advantages:

- Automatically scales system pods (CoreDNS, kube-proxy, etc.)
- Prevents infrastructure bottlenecks
- Simple proportional configuration

Disadvantages:

- Not workload-aware (ignores application load)
- Linear scaling only; lacks precision
- Interval-based adjustments may lag

![The image explains Cluster Proportional Autoscaling (CPA), which scales system components like DNS or network proxies proportionally to cluster size, unlike HPA or VPA that scale based on pod resource usage.](https://kodekloud.com/kk-media/image/upload/v1752880206/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/cluster-proportional-autoscaling-diagram.jpg)

| Advantage                   | Disadvantage                        |
| --------------------------- | ----------------------------------- |
| Infrastructure pods scaling | Not application-load aware          |
| Prevents system bottlenecks | Linear/proportional only            |
| Minimal setup               | Polling intervals can delay scaling |

![The image is a table comparing the advantages and disadvantages of Cluster Proportional Autoscaling (CPA). Advantages include system component scaling and automated infrastructure scaling, while disadvantages include infrastructure-focused scaling and limited performance tuning.](https://kodekloud.com/kk-media/image/upload/v1752880207/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/cpa-advantages-disadvantages-table.jpg)

![The image is a table comparing the advantages and disadvantages of Cluster Proportional Autoscaling (CPA), highlighting aspects like system component scaling and infrastructure-focused scaling.](https://kodekloud.com/kk-media/image/upload/v1752880209/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/cpa-advantages-disadvantages-table-2.jpg)

---

## Event-Driven Scaling Scenario

Consider a public HTTP API with highly variable traffic:

1.  **Sudden traffic spikes** require rapid scale-up.
2.  **Long idle periods** demand scale-to-zero to save costs.
3.  **No complex custom adapters** for metrics.

Neither HPA, VPA, nor CPA fully satisfy this scenario:

1.  **HPA**
    - Scales on CPU/memory only
    - Polling delay can overload pods
    - Cannot scale to zero  
      ![The image is a diagram explaining the concept of Horizontal Pod Autoscaler (HPA) with three points: scaling based on CPU, delay in detecting CPU load, and delay leading to pod overwhelming.](https://kodekloud.com/kk-media/image/upload/v1752880210/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/horizontal-pod-autoscaler-diagram.jpg)

2.  **VPA**
    - Adjusts resource requests per pod
    - Causes pod restarts and potential downtime
    - Not optimized for request-driven scaling  
      ![The image is a diagram titled "VPA" with two points: "Adjust resources per pod" and "Delay in detecting CPU load," each accompanied by icons.](https://kodekloud.com/kk-media/image/upload/v1752880210/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/vpa-resource-adjustment-diagram.jpg)

3.  **CPA**
    - Only scales system components
    - Ignores HTTP request load  
      ![The image is a diagram with three points related to CPA: "Not aware of HTTP load," "Only scale infrastructure components," and "Irrelevant in this scenario," each marked with numbered icons.](https://kodekloud.com/kk-media/image/upload/v1752880212/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/cpa-diagram-http-load-scaling.jpg)

> [!important]
> **Warning**
>
> Relying solely on traditional autoscalers can lead to resource waste or unhandled traffic spikes.

---

## Why KEDA?

KEDA (Kubernetes Event-Driven Autoscaling) extends Kubernetes with event-based scaling. Key features:

- Scale on any external event: message queue depth, HTTP requests, Prometheus alerts, and more.
- Instant reaction to events and **scale down to zero** when idle.
- Native Kubernetes integration, no heavy adapters required.

![The image illustrates the concept of scaling an HTTP workload, showing an API that can scale up based on incoming requests and scale down during idle periods to save costs, with a note about handling sudden bursts of traffic.](https://kodekloud.com/kk-media/image/upload/v1752880213/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/http-scaling-workload-api-diagram.jpg)

![The image is a presentation slide about the importance of KEDA, highlighting its role in event-driven scaling challenges and flexibility to scale based on external events like message queues and HTTP requests.](https://kodekloud.com/kk-media/image/upload/v1752880214/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/keda-event-driven-scaling-presentation.jpg)

---

## Introducing KEDA Components

KEDA’s architecture consists of:

![The image is an infographic detailing the components of KEDA, including Keda Operator, Metrics Server, Admission Webhooks, Trigger Authentication, Scaler, and ScaledObject, with brief descriptions of each.](https://kodekloud.com/kk-media/image/upload/v1752880215/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/keda-components-infographic.jpg)

1.  **KEDA Operator**  
    Manages `ScaledObject` and `ScaledJob` CRDs, reconciling external triggers with Kubernetes scaling.
2.  **Metrics Server**  
    Aggregates external metrics into Kubernetes API‐compatible format.  
    ![The image is a diagram titled "KEDA – Metrics Server," showing a green circle labeled "Metrics Server" with icons, and a box listing key responsibilities: "Decision-making metrics" and "Aggregator."](https://kodekloud.com/kk-media/image/upload/v1752880216/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/keda-metrics-server-diagram.jpg)
3.  **Admission Webhook**  
    Validates and mutates scaled objects on create/update, enforcing correct scaling policies.  
    ![The image is a diagram titled "KEDA – Admission Webhook," showing key responsibilities such as validating scaled objects and enforcing and transforming resources.](https://kodekloud.com/kk-media/image/upload/v1752880217/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/keda-admission-webhook-diagram.jpg)
4.  **Trigger Authentication**  
    Securely stores credentials for external services, preventing secrets in scaled objects.  
    ![The image is about "KEDA – Trigger Authentication" and outlines key responsibilities, including external authentication and securing sensitive information.](https://kodekloud.com/kk-media/image/upload/v1752880219/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/keda-trigger-authentication-responsibilities.jpg)
5.  **Scaler**  
    Interfaces with external event sources (e.g., Prometheus, Azure, AWS) to fetch metrics and decide scaling actions.  
    ![The image is a diagram titled "KEDA – Scaler," showing a green circle labeled "Scaler" with a syringe icon, and a box listing the key responsibility: "Fetch external metrics."](https://kodekloud.com/kk-media/image/upload/v1752880220/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/keda-scaler-diagram-external-metrics.jpg)
6.  **ScaledObject**  
    A custom resource linking your Deployment or Job to a scaler, defining thresholds, and min/max replica counts.  
    ![The image is an illustration about KEDA's ScaledObject, highlighting its key responsibilities: linking Kubernetes deployment or job, defining metrics, and defining range (min and max).](https://kodekloud.com/kk-media/image/upload/v1752880221/notes-assets/images/Kubernetes-Autoscaling-KEDA-Introduction/keda-scaledobject-illustration-responsibilities.jpg)

---

## Conclusion

With KEDA, you achieve true event-driven autoscaling in Kubernetes—reacting instantly to external events, scaling to zero, and simplifying your infrastructure. You’ve now seen how KEDA complements HPA, VPA, and CPA to deliver flexible, cost-effective scaling for modern workloads.

Thanks for reading! For more details, visit the [KEDA Documentation](https://keda.sh/) and the [Kubernetes Autoscaling Guide](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/c218f836-7d7e-425b-a8b7-0148914eb040/lesson/1b14abfc-5f0a-41ce-8bb4-4b9908578d76)**
>
> Watch video content
