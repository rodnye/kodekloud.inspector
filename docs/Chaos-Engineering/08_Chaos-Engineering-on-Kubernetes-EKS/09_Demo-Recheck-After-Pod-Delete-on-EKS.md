# Demo Recheck After Pod Delete on EKS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Kubernetes-EKS/Demo-Recheck-After-Pod-Delete-on-EKS)

---

## Table of Contents

- Demo Recheck After Pod Delete on EKS
  - 1. Verify Pod Auto-Replacement
  - 2. Validate Application Availability & RUM Metrics
  - 3. Monitor EKS Control Plane Metrics
  - Conclusion
  - Links and References
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering on Kubernetes EKS

# Demo Recheck After Pod Delete on EKS

In this walkthrough, we’ll verify how Amazon EKS and Kubernetes self-heal after a Pod deletion, and confirm there’s no impact on end-users by monitoring the application UI, Real User Monitoring (RUM), and control plane metrics in CloudWatch.

---

## 1\. Verify Pod Auto-Replacement

After deleting a Pod, Kubernetes should automatically spin up a new one. Run:

```
kubectl get pods -n default
```

Expected output:

```
NAME                                      READY   STATUS      RESTARTS       AGE
petfood-6b56846cbc-85m66                  1/1     Running     0              23h
petfood-6b56846cbc-x5t16                  1/1     Running     0              23h
petfood-metric-6bd55449d8-6jp97           1/1     Running     0              23h
petfood-metric-6bd55449d8-dbrj8           1/1     Running     0              23h
pethistory-deployment-5f96c67c674-t4mhq   2/2     Running     0              34s
petsite-deployment-6db68bf8-lv6w4         1/1     Running     0              34s
petsite-deployment-6db68bf8-xqs7h         1/1     Running     2 (68m ago)    23h
xray-daemon-jh7ft                         1/1     Running     7 (55m ago)    23h
xray-daemon-rtlhh                         1/1     Running     8 (55m ago)    23h
```

> [!important]
> **Note**
>
> Kubernetes replaces the deleted `petsite-deployment` Pod within seconds, demonstrating built-in self-healing.

---

## 2\. Validate Application Availability & RUM Metrics

Next, confirm the application UI loads without errors and that RUM data in CloudWatch shows no spike in errors or user frustration signals.

![The image shows an AWS CloudWatch dashboard for monitoring application performance, displaying metrics like page loads, load time, and errors. It includes navigation tabs and filtering options for detailed analysis.](https://kodekloud.com/kk-media/image/upload/v1752871878/notes-assets/images/Chaos-Engineering-Demo-Recheck-After-Pod-Delete-on-EKS/aws-cloudwatch-dashboard-performance-metrics.jpg)

| Metric     | Use Case               | Observation        |
| ---------- | ---------------------- | ------------------ |
| Page Loads | Track user visits      | Stable             |
| Load Time  | Measure responsiveness | Within SLA         |
| Errors     | Detect failures        | No spikes detected |

A manual refresh confirms that user frustration signals remain at baseline:

![The image shows an AWS CloudWatch dashboard displaying metrics for "Largest Contentful Paint" and "First Input Delay," with graphs indicating performance over time. The metrics are categorized into positive, tolerable, and frustrating levels.](https://kodekloud.com/kk-media/image/upload/v1752871880/notes-assets/images/Chaos-Engineering-Demo-Recheck-After-Pod-Delete-on-EKS/aws-cloudwatch-dashboard-metrics-performance.jpg)

| Performance Metric       | Threshold (ms) | Level     |
| ------------------------ | -------------- | --------- |
| Largest Contentful Paint | < 2500         | Positive  |
| First Input Delay        | < 100          | Tolerable |

---

## 3\. Monitor EKS Control Plane Metrics

Finally, review your EKS cluster’s control plane metrics to ensure resource utilization stayed consistent throughout the experiment.

![The image shows an AWS CloudWatch dashboard for monitoring EKS services, displaying metrics like pod CPU and memory utilization, and the number of running services.](https://kodekloud.com/kk-media/image/upload/v1752871881/notes-assets/images/Chaos-Engineering-Demo-Recheck-After-Pod-Delete-on-EKS/aws-cloudwatch-eks-monitoring-dashboard.jpg)

| Metric             | Description                              | Observation   |
| ------------------ | ---------------------------------------- | ------------- |
| CPU Utilization    | Aggregate Pod CPU usage                  | Stable (~30%) |
| Memory Utilization | Aggregate Pod memory usage               | Stable (~40%) |
| Running Pods       | Total active Pods in `default` namespace | Consistent    |

> [!important]
> **Note**
>
> Stable control plane metrics confirm that pod deletion did not adversely affect cluster health.

---

## Conclusion

This demo highlights Kubernetes’ resilience on Amazon EKS:

- **Self-healing:** Deleted Pods are recreated almost instantly.
- **Zero user impact:** No UI errors or RUM spikes.
- **Stable cluster health:** Control plane metrics remain steady.

---

## Links and References

- [Kubernetes Self-Healing](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-health)
- [Amazon EKS Overview](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
- [CloudWatch RUM Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/67947884-154a-43e4-a0cf-1137e1264eee/lesson/97f4341b-1902-483e-afad-4b4caee0bb30)**
>
> Watch video content
