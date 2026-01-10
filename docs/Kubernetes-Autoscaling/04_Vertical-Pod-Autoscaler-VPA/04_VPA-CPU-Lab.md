# VPA CPU Lab - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Vertical-Pod-Autoscaler-VPA/VPA-CPU-Lab)

---

## Table of Contents

- VPA CPU Lab
  - Prerequisites
  - 1. Deploy the Flask Sample Application
  - 2. Create the VPA Configuration
  - 3. Apply the VPA Manifest
  - 4. Inspect Initial Recommendations
  - 5. Generate Load and Validate Recommendations
  - Summary
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes Autoscaling

Vertical Pod Autoscaler VPA

# VPA CPU Lab

In this hands-on lab, you will:

1.  Deploy a Flask sample application on Kubernetes.
2.  Monitor CPU utilization using `kubectl top`.
3.  Create a Vertical Pod Autoscaler (VPA) manifest to gather CPU recommendations.
4.  Generate load and validate the VPA’s CPU recommendations.

![The image is a lab overview with three steps: deploying a sample application, monitoring application resource usage, and applying VPA configuration to capture recommendations. It includes a stylized computer icon.](https://kodekloud.com/kk-media/image/upload/v1752880250/notes-assets/images/Kubernetes-Autoscaling-VPA-CPU-Lab/lab-overview-sample-app-monitoring.jpg)

---

## Prerequisites

- A running Kubernetes cluster (v1.18+).
- [Metrics Server](https://github.com/kubernetes-sigs/metrics-server) installed for `kubectl top`.
- `kubectl` configured to target your cluster.

> [!important]
> **Note**
>
> Ensure the Metrics Server is deployed in your cluster so you can retrieve pod metrics.

---

## 1\. Deploy the Flask Sample Application

Apply the provided deployment manifest to launch the Flask app named `flask-app-4`:

```
kubectl apply -f flask-app-deployment.yaml
```

Once the pods are ready, verify CPU usage:

```
kubectl top pods
```

Expected output:

```
NAME                          CPU(cores)   MEMORY(bytes)
flask-app-4-<pod-id>          1m           <some-memory>
```

You should see the pod consuming around **1 mCPU**, indicating minimal load.

---

## 2\. Create the VPA Configuration

Next, define a VPA object that collects CPU recommendations without modifying the pods. Save this as `vpa-cpu.yml`:

```
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: flask-app
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: flask-app-4
  updatePolicy:
    updateMode: "Off"         # Only recommendations; no automatic updates
  resourcePolicy:
    containerPolicies:
      - containerName: '*'    # Apply to all containers
        minAllowed:
          cpu: 100m
        maxAllowed:
          cpu: 1000m
        controlledResources: ["cpu"]
```

This manifest:

- Sets **100 mCPU** as the minimum and **1000 mCPU** (1 CPU) as the maximum.
- Restricts recommendations to CPU only.

> [!important]
> **Warning**
>
> Using `updateMode: "Off"` means your pods will not be resized automatically. Switch to `Auto` if you want VPA to apply changes.

You can compare other `updateMode` options:

| updateMode | Description                                        |
| ---------- | -------------------------------------------------- |
| Off        | Only provide recommendations; no pod modifications |
| Initial    | Apply recommendations on first pod creation        |
| Auto       | Automatically update requests based on VPA advice  |

For more details, see the [VerticalPodAutoscaler API reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#verticalpodautoscaler-v1-autoscaling-k8s-io).

---

## 3\. Apply the VPA Manifest

Create the VPA resource:

```
kubectl apply -f vpa-cpu.yml
```

You should see:

```
verticalpodautoscaler.autoscaling.k8s.io/flask-app created
```

---

## 4\. Inspect Initial Recommendations

Before generating any load, fetch the current VPA status:

```
kubectl get vpa flask-app -o yaml
```

Because the app is idle, the recommendation will default to the minimum bound (around **100 mCPU**).

---

## 5\. Generate Load and Validate Recommendations

Use your preferred load-testing tool (e.g., `hey`, `ab`, `wrk`) to apply CPU pressure:

```
hey -z 30s -c 50 http://<service-ip>/
```

Once the load test completes, check the VPA again:

```
kubectl get vpa flask-app -o yaml
```

You should see something like:

```
status:
  recommendation:
    containerRecommendations:
      - containerName: flask-app-4
        lowerBound:
          cpu: 100m
        target:
          cpu: 126m
        uncappedTarget:
          cpu: 126m
        upperBound:
          cpu: "1"
```

Here, the VPA now recommends **126 mCPU**, reflecting the increased CPU demand.

---

## Summary

In this lab you have:

1.  Deployed a Flask application and observed its CPU usage.
2.  Created a VPA manifest to collect CPU recommendations.
3.  Inspected initial recommendations at the minimum setting.
4.  Generated workload to trigger higher CPU recommendations.

Feel free to switch `updateMode` to `Auto` and watch VPA adjust pod resource requests automatically.

---

## Links and References

- [Kubernetes Vertical Pod Autoscaler](https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/)
- [Metrics Server on GitHub](https://github.com/kubernetes-sigs/metrics-server)
- [kubectl top – Resource Metrics](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#top)
- [Load Testing with hey](https://github.com/rakyll/hey)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/0a6c48bd-c431-4b14-b33b-250d02997055/lesson/a56af162-4e6a-40ea-978c-d8aff9dd829e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/0a6c48bd-c431-4b14-b33b-250d02997055/lesson/2a00b551-7fd9-454a-aac3-4ab2a66b7e0f)**
>
> Practice lab
