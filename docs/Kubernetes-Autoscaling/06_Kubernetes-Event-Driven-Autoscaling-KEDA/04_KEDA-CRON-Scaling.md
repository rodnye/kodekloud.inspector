# KEDA CRON Scaling - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Kubernetes-Event-Driven-Autoscaling-KEDA/KEDA-CRON-Scaling)

---

## Table of Contents

- KEDA CRON Scaling
  - How KEDA Cron Triggers Work
  - Common Use Cases
  - 24-Hour Scaling Graph
  - Defining the Cron Trigger in KEDA
  - Complete ScaledObject Example
  - Links and References
  - Watch Video
  - Practice Lab
    - When to Use Time-Based Scaling

---

## Content

Kubernetes Autoscaling

Kubernetes Event Driven Autoscaling KEDA

# KEDA CRON Scaling

Schedule Kubernetes Horizontal Pod Autoscaling (HPA) using KEDA’s Cron trigger to automatically adjust replica counts at specific times. This approach helps you:

- Handle predictable traffic spikes (e.g., morning rush).
- Save resources by scaling down during idle periods.
- Automate capacity management for promotional events.

## How KEDA Cron Triggers Work

A Cron trigger in KEDA allows you to:

1.  Specify an IANA timezone for scheduling.
2.  Define start and end times with standard CRON expressions.
3.  Set a `desiredReplicas` count for the active window.

![The image is a diagram illustrating "KEDA Cron" with icons representing Cron, KEDA, a database, and a time zone.](https://kodekloud.com/kk-media/image/upload/v1752880199/notes-assets/images/Kubernetes-Autoscaling-KEDA-CRON-Scaling/keda-cron-diagram-icons.jpg)

When the clock matches your `start` expression, KEDA scales the target Deployment up to `desiredReplicas`. After the `end` expression, it scales back down (respecting your `minReplicaCount`).

## Common Use Cases

| Scenario               | Schedule                           | Benefit                            |
| ---------------------- | ---------------------------------- | ---------------------------------- |
| Daily Traffic Spike    | 0 6 \\_ \\_ \\_ – 0 8 \\_ \\_ \\_  | Pre-warm pods for morning users    |
| Promotional Campaign   | 0 12 \\_ \\_ 5 – 0 18 \\_ \\_ 5    | Extra capacity during Friday sales |
| Off-Hours Optimization | 0 20 \\_ \\_ \\_ – 0 6 \\_ \\_ \\_ | Scale down to save costs overnight |

![The image outlines the concept of KEDA Cron for predetermined scaling, detailing the requirement, solution, outcome, and a real-life use case for handling traffic spikes.](https://kodekloud.com/kk-media/image/upload/v1752880200/notes-assets/images/Kubernetes-Autoscaling-KEDA-CRON-Scaling/keda-cron-scaling-diagram.jpg)

### When to Use Time-Based Scaling

- **Predictable Load Windows**: Morning routines, lunch peaks, end-of-business-day reporting.
- **Short-Lived Events**: Flash sales, marketing campaigns.
- **Cost Management**: Turn off extra capacity when it isn’t needed.

## 24-Hour Scaling Graph

![The image is a graph showing KEDA Cron's predetermined scaling of workload instances over a 24-hour period, with increased activity between 6:00 am and 6:00 pm.](https://kodekloud.com/kk-media/image/upload/v1752880202/notes-assets/images/Kubernetes-Autoscaling-KEDA-CRON-Scaling/keda-cron-scaling-graph-24h.jpg)

This graph illustrates:

- **Baseline**: Default replica count until 06:00.
- **Scale-Up**: Jump to `desiredReplicas` during the 6:00–20:00 window.
- **Scale-Down**: Return to baseline after 20:00.

## Defining the Cron Trigger in KEDA

Add a Cron trigger under `spec.triggers` in your `ScaledObject` manifest:

```
triggers:
  - type: cron
    metadata:
      timezone: Asia/Kolkata       # IANA Time Zone Database
      start: "0 6 * * *"           # 06:00 daily
      end: "0 20 * * *"            # 20:00 daily
      desiredReplicas: "10"        # Target replicas during active window
```

> [!important]
> **CRON Field Reference**
>
> | Field        | Range | Description        |
> | ------------ | ----- | ------------------ | -------------- |
> | minute       | 0–59  | Minute of the hour |
> | hour         | 0–23  | Hour of the day    |
> | day-of-month | 1–31  | Date               |
> | month        | 1–12  | Month number       |
> | day-of-week  | 0–6   | Weekday (Sun=0)    | > [!important] |
>
> **Timezone Accuracy**
>
> Make sure to use the exact IANA timezone string (e.g., `America/New_York`). An incorrect value can prevent your schedule from triggering.

## Complete ScaledObject Example

Below is a full example combining the Cron trigger with a Deployment target. It scales `my-deployment` up to 10 replicas between 06:00 and 20:00 Asia/Kolkata time, then scales down to zero after a 5 minute cooldown.

```
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: cron-scaledobject
  namespace: default
spec:
  scaleTargetRef:
    name: my-deployment
  minReplicaCount: 0
  cooldownPeriod: 300            # 5 minutes before scaling down
  triggers:
    - type: cron
      metadata:
        timezone: Asia/Kolkata
        start: "0 6 * * *"
        end: "0 20 * * *"
        desiredReplicas: "10"
```

With this configuration, KEDA automatically aligns your application’s capacity to match scheduled demand patterns, improving performance and cost efficiency.

## Links and References

- [KEDA v2 Cron Trigger Documentation](https://keda.sh/docs/2.0/scalers/cron/)
- [IANA Time Zone Database](https://www.iana.org/time-zones)
- [Kubernetes HPA Guide](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/c218f836-7d7e-425b-a8b7-0148914eb040/lesson/9e740c2e-e6fe-4358-9ad6-710868c57124)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/c218f836-7d7e-425b-a8b7-0148914eb040/lesson/0dfeafae-cad9-4b5f-9afe-16ade758ed6d)**
>
> Practice lab
