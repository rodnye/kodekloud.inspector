# VPA CPU Memory in Action Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Vertical-Pod-Autoscaler-VPA/VPA-CPU-Memory-in-Action-Demo)

---

## Table of Contents

- VPA CPU Memory in Action Demo
  - 1. Deploy the Sample Application
  - 2. Review and Apply the VPA Configuration
  - 3. Generate Load Without Evictions
  - 4. Enable Automatic Updates
  - 5. Observe Pod Evictions & Resource Adjustments
  - Links and References
  - Further Reading
  - Watch Video
  - Practice Lab
    - Describe the Initial Recommendation

---

## Content

Kubernetes Autoscaling

Vertical Pod Autoscaler VPA

# VPA CPU Memory in Action Demo

In this hands-on guide, you’ll learn how to configure Kubernetes’ Vertical Pod Autoscaler (VPA) for both CPU and memory. We’ll cover:

1.  Deploying a sample Flask application
2.  Applying a VPA manifest with updates disabled
3.  Generating load and inspecting VPA Updater logs (no evictions yet)
4.  Enabling automatic updates and observing pod evictions and resource adjustments

> [!important]
> **Prerequisites**
>
> Ensure you have a running Kubernetes cluster (v1.15+) with the VPA Admission Controller and Updater components installed.

---

## 1\. Deploy the Sample Application

Apply the Deployment and Service for our Flask app:

```
kubectl apply -f /root/vpa-cpu-app.yml
# deployment.apps/flask-app created
# service/flask-app-service created
```

Verify the pods and service are running:

```
kubectl get pods,svc | grep flask-app
```

---

## 2\. Review and Apply the VPA Configuration

Inspect the VPA manifest below. The `updateMode` is set to `Off`, so no live adjustments will occur:

```
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: flask-app
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: flask-app
  updatePolicy:
    updateMode: "Off"
  evictionRequirements:
    - resources: ["cpu", "memory"]
      changeRequirement: TargetHigherThanRequests
  resourcePolicy:
    containerPolicies:
      - containerName: "*"
        minAllowed:
          cpu: 100m
          memory: 100Mi
        maxAllowed:
          cpu: 800m
          memory: 500Mi
        controlledResources: ["cpu", "memory"]
```

Apply the VPA object:

```
kubectl apply -f /root/vpa-cpu-vpa.yml
# verticalpodautoscaler.autoscaling.k8s.io/flask-app created
```

### Describe the Initial Recommendation

With no traffic and `updateMode: Off`, the VPA will only show its configured bounds:

```
kubectl describe vpa flask-app
# Recommendation:
#   Container Name:  flask-app
#   Lower Bound:     Cpu: 100m
#   Target:          Cpu: 100m
#   Uncapped Target: Cpu: 25m
#   Upper Bound:     Cpu: 800m
```

---

## 3\. Generate Load Without Evictions

Start a load test to drive up CPU usage:

```
sh load.sh
# Hello, World!Hello, World!Hello, World!...
```

Now tail the VPA Updater logs in the `kube-system` namespace. Since updates are disabled, you’ll see skip messages:

```
kubectl logs -f deployment/vpa-updater -n kube-system
# I0104 12:28:33.901166 updater.go:150] skipping VPA object default/flask-app because its mode is not "Recreate" or "Auto"
# W0104 12:28:33.901197 updater.go:166] no VPA objects to process
```

> [!important]
> **Understanding VPA Logs**
>
> The Updater only evicts pods when the VPA’s `updateMode` is set to `Auto` or `Recreate`.

---

## 4\. Enable Automatic Updates

Switch the VPA into `Auto` mode so it can evict and restart pods with new resource requests:

```
kubectl edit vpa flask-app
# Change updatePolicy.updateMode from "Off" to "Auto"
```

Confirm the change:

```
kubectl get vpa flask-app -o=jsonpath='{.spec.updatePolicy.updateMode}'
# Auto
```

| updateMode | Description           | Pod Behavior                               |
| ---------- | --------------------- | ------------------------------------------ |
| Off        | Live updates disabled | No pod evictions                           |
| Auto       | Automatic updates     | Pods evicted & restarted with new requests |

---

## 5\. Observe Pod Evictions & Resource Adjustments

With load still running, watch the Updater logs:

```
kubectl logs -f deployment/vpa-updater -n kube-system
# I0104 12:39:33.906873 update_priority_calculator.go:146] pod accepted for update default/flask-app-67b666c5fc-k9rtg with priority 586 - processed recommendations: flask-app: target: 587m; uncappedTarget: 587m;
# I0104 12:39:33.906962 updater.go:228] evicting pod default/flask-app-67b666c5fc-k9rtg
# I0104 12:39:33.919716 event.go:298] Event(...): type: 'Normal' reason: 'EvictedByVPA' Pod was evicted by VPA Updater to apply resource recommendation.
```

Check the updated pods and their ages:

```
kubectl get pods
# NAME                                READY STATUS    RESTARTS AGE
# flask-app-67b666c5fc-41b5s         1/1   Running   0        43s
# flask-app-67b666c5fc-96jfj         1/1   Running   0        103s
```

You should now see new pods running with the VPA-recommended CPU and memory requests. This completes the VPA demo.

---

## Links and References

- [Vertical Pod Autoscaler Overview](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#vertical-pod-autoscaler)
- [VPA GitHub Repository](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler)

## Further Reading

- [Kubernetes Resource Management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
- [Autoscaling in Kubernetes](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/0a6c48bd-c431-4b14-b33b-250d02997055/lesson/7e2670d7-d84d-4b77-bdd9-76412f7eb472)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/0a6c48bd-c431-4b14-b33b-250d02997055/lesson/b054efb8-e4cf-4587-aa92-57fa6faa837b)**
>
> Practice lab
