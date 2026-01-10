# Horizontal Pod Autoscaler HPA 2025 Updates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Horizontal-Pod-Autoscaler-HPA-2025-Updates)

---

## Table of Contents

- Horizontal Pod Autoscaler HPA 2025 Updates
  - Manual Horizontal Scaling
  - Introducing the Horizontal Pod Autoscaler (HPA)
  - Declarative Configuration for HPA
  - Metrics Sources and External Adapters
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Application Lifecycle Management

# Horizontal Pod Autoscaler HPA 2025 Updates

In this article, we explore the Horizontal Pod Autoscaler (HPA) feature in Kubernetes and explain how it automates the scaling of workloads. We'll begin by examining the manual approach to scaling an application and then show how HPA streamlines this process.

## Manual Horizontal Scaling

As a Kubernetes administrator, you might manually scale your application to ensure it has enough resources during traffic spikes. Consider the following deployment configuration:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-app
          image: nginx
          resources:
            requests:
              cpu: "250m"
            limits:
              cpu: "500m"
```

In this configuration, each pod requests 250 millicores (mCPU) and is limited to 500 mCPU. To monitor the resource usage of a pod, you might run:

```
$ kubectl top pod my-app-pod
```

The output would be similar to:

```
NAME         CPU(cores)   MEMORY(bytes)
my-app-pod   450m         350Mi
```

Once you observe the pod’s CPU usage nearing the threshold (for example, at 450 mCPU), you would manually execute a scale command to add more pods:

```
$ kubectl scale deployment my-app --replicas=3
```

> [!important]
> **Manual Scaling Note**
>
> Manual scaling requires continuous monitoring and timely intervention, which may not be ideal during unexpected surges in traffic.

## Introducing the Horizontal Pod Autoscaler (HPA)

To address the shortcomings of manual scaling, Kubernetes offers the Horizontal Pod Autoscaler (HPA). HPA continuously monitors pod metrics—such as CPU, memory, or custom metrics—using the metrics-server. Based on these metrics, HPA automatically adjusts the number of pod replicas in a deployment, stateful set, or replica set. When resource usage exceeds a preset threshold, HPA increases the pod count; when usage declines, it scales down to conserve resources.

![The image is a diagram explaining the functions of a Horizontal Pod Autoscaler (HPA), highlighting its roles in observing metrics, adding pods, balancing thresholds, and tracking multiple metrics.](https://kodekloud.com/kk-media/image/upload/v1752869662/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Horizontal-Pod-Autoscaler-HPA-2025-Updates/horizontal-pod-autoscaler-diagram.jpg)

For example, with the nginx deployment above, you can create an HPA by running the command below. This command configures the "my-app" deployment to maintain 50% CPU utilization, scaling the number of pods between 1 and 10:

```
$ kubectl autoscale deployment my-app --cpu-percent=50 --min=1 --max=10
```

Kubernetes will then create an HPA that monitors the CPU metrics (using the pod's 500 mCPU limit) via the metrics-server. If the average CPU utilization exceeds 50%, HPA adjusts the replica count to meet demand without manual input.

To review the status of your HPA, use:

```
$ kubectl get hpa
```

This command shows the current CPU usage, threshold set, and the number of replicas—ensuring that pod counts remain within the defined limits. When the HPA is no longer needed, you can remove it with:

```
$ kubectl delete hpa my-app
```

## Declarative Configuration for HPA

Beyond the imperative approach, you can declare the HPA configuration with a YAML file. Here's an example using the `autoscaling/v2` API:

```
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 1
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50
```

This configuration ensures that the HPA monitors the CPU utilization of the "my-app" deployment, automatically adjusting the replica count as needed. Note that HPA, integrated into Kubernetes since version 1.23, relies on the metrics-server to obtain resource utilization data.

## Metrics Sources and External Adapters

Kubernetes supports not only the internal metrics-server for collecting CPU or memory metrics but also custom metrics adapters. These adapters can retrieve metrics from other internal sources or external metrics providers like Datadog or Dynatrace through an external adapter. For further details on advanced configurations, please explore our [Kubernetes Autoscaling](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling) course.

![The image is a flowchart illustrating a metrics system architecture, showing the interaction between components like the Metrics Server, Custom Metrics Adapter, and External Adapter, with connections to Datadog and Dynatrace. It includes elements such as HPA (Horizontal Pod Autoscaler) and Workload (Deployment).](https://kodekloud.com/kk-media/image/upload/v1752869663/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Horizontal-Pod-Autoscaler-HPA-2025-Updates/metrics-system-architecture-flowchart.jpg)

## Conclusion

This article provided a comprehensive overview of the Horizontal Pod Autoscaler (HPA) in Kubernetes. We discussed the drawbacks of manual scaling and demonstrated how HPA automates scaling based on real-time resource usage. Whether through imperative commands or declarative YAML configurations, HPA ensures that your applications can adapt dynamically to fluctuating workloads.

For additional insights and hands-on experience, consider enrolling in our [Kubernetes Autoscaling](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling) course.

Happy scaling!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/2ddcf79b-abb0-4aeb-ad0c-3d54c7b4fc64/lesson/9fc22af6-82b3-4cda-9a57-dd94e24ecb1d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/2ddcf79b-abb0-4aeb-ad0c-3d54c7b4fc64/lesson/a84abc2e-7511-4685-8dcc-73e3f80045bf)**
>
> Practice lab
