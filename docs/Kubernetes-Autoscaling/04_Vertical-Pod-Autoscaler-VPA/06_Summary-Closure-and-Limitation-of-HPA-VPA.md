# Summary Closure and Limitation of HPA VPA - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Vertical-Pod-Autoscaler-VPA/Summary-Closure-and-Limitation-of-HPA-VPA)

---

## Table of Contents

- Summary Closure and Limitation of HPA VPA
  - Key Kubernetes Autoscaling Tools
  - Core Concepts
  - Pairing HPA and VPA
  - Known Limitations of VPA
  - Additional Considerations
  - Conclusion
  - Further Reading
  - Watch Video

---

## Content

Kubernetes Autoscaling

Vertical Pod Autoscaler VPA

# Summary Closure and Limitation of HPA VPA

In this guide, we revisit Kubernetes autoscaling, comparing the Horizontal Pod Autoscaler (HPA) and Vertical Pod Autoscaler (VPA). You’ll learn when to use each autoscaler, how to combine them safely, and what limitations to watch for in production.

## Key Kubernetes Autoscaling Tools

| Autoscaler                      | Scaling Type | Metrics                                                                                            | Ideal Use Case                          | Pod Restarts                                       |
| ------------------------------- | ------------ | -------------------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------- |
| Horizontal Pod Autoscaler (HPA) | Horizontal   | CPU (native), custom ([Prometheus adapter](https://github.com/kubernetes-sigs/prometheus-adapter)) | Stateless apps, varying traffic         | No                                                 |
| Vertical Pod Autoscaler (VPA)   | Vertical     | CPU/memory requests                                                                                | Stateful or resource-sensitive services | Yes (updates resource settings, triggers restarts) |

## Core Concepts

- **HPA**: Automatically adjusts the number of pod replicas based on metrics such as CPU utilization or [custom metrics via the Prometheus adapter](https://github.com/kubernetes-sigs/prometheus-adapter).
- **VPA**: Recommends or applies CPU/memory resource adjustments to existing pods, which can trigger restarts when updating requests and limits.

![The image is a comparison table between Horizontal Pod Autoscaler (HPA) and Vertical Pod Autoscaler (VPA), highlighting differences in scaling type, use case, and resource support.](https://kodekloud.com/kk-media/image/upload/v1752880239/notes-assets/images/Kubernetes-Autoscaling-Summary-Closure-and-Limitation-of-HPA-VPA/hpa-vpa-comparison-table.jpg)

![The image is a comparison table between Horizontal Pod Autoscaler (HPA) and Vertical Pod Autoscaler (VPA), highlighting their scaling types, use cases, resource support, and limitations.](https://kodekloud.com/kk-media/image/upload/v1752880240/notes-assets/images/Kubernetes-Autoscaling-Summary-Closure-and-Limitation-of-HPA-VPA/hpa-vpa-comparison-table-2.jpg)

## Pairing HPA and VPA

You can safely combine both autoscalers by delegating different metrics:

- Let **HPA** scale horizontally using custom metrics (e.g., queue length, request latency).
- Let **VPA** handle resource recommendations for CPU and memory.

> [!important]
> **Warning**
>
> Avoid running HPA and VPA on the same metric (CPU or memory) to prevent conflicting recommendations and pod flapping.

## Known Limitations of VPA

![The image lists four known limitations related to VPA (Vertical Pod Autoscaler), including issues with pod recreation, conflicts with HPA (Horizontal Pod Autoscaler), and admission controller conflicts.](https://kodekloud.com/kk-media/image/upload/v1752880241/notes-assets/images/Kubernetes-Autoscaling-Summary-Closure-and-Limitation-of-HPA-VPA/vpa-limitations-pod-recreation-hpa.jpg)

1.  **Pod Recreation**  
    VPA updates resource requests by restarting pods, which can briefly disrupt service.
2.  **HPA Conflicts**  
    Using HPA and VPA on identical metrics (CPU/memory) often leads to scaling loops.
3.  **Admission Controller**  
    If VPA-recommended resources exceed node capacity, the admission plugin may block pod creation.
4.  **Unmanaged Pods**  
    VPA only adjusts pods owned by controllers (e.g., Deployment, StatefulSet), ignoring standalone pods.

## Additional Considerations

![The image lists known limitations of VPA (Vertical Pod Autoscaler), including handling OOM events, being untested in large clusters, potentially exceeding resources, and causing conflicts with overlapping resources.](https://kodekloud.com/kk-media/image/upload/v1752880242/notes-assets/images/Kubernetes-Autoscaling-Summary-Closure-and-Limitation-of-HPA-VPA/vpa-limitations-oom-events-clusters.jpg)

- **OOM Handling**  
  VPA can proactively prevent out-of-memory crashes by increasing memory requests, but it may miss rare edge cases.
- **Large-Cluster Performance**  
  VPA’s behavior in large-scale environments is not fully validated; conduct thorough testing before production rollout.
- **Resource Saturation**  
  Recommendations exceeding available capacity cause pods to stay in `Pending` state.
- **Overlapping Recommendations**  
  Multiple VPA resources applied to the same pods can generate scheduling contention.

> [!important]
> **Note**
>
> Integrate the [Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler) to dynamically add nodes when pods remain pending.

## Conclusion

Select the right autoscaler based on your workload profile:

- Use **HPA** for horizontally scalable, stateless applications with fluctuating demand.
- Use **VPA** for fine-tuning resource allocations in stateful or resource-sensitive services.
- Combine HPA and VPA only when each operates on distinct metrics to avoid conflicts.

Autoscaling optimizes application performance and infrastructure costs. Always validate autoscaler behavior and limitations in your environment before going live.

## Further Reading

- [Kubernetes Documentation](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Prometheus Adapter](https://github.com/kubernetes-sigs/prometheus-adapter)
- [Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/0a6c48bd-c431-4b14-b33b-250d02997055/lesson/06e84505-415c-4ede-88ab-c64f8467b84a)**
>
> Watch video content
