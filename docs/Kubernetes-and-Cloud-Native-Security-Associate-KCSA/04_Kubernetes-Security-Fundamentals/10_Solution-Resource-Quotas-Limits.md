# Solution Resource Quotas Limits - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Security-Fundamentals/Solution-Resource-Quotas-Limits)

---

## Table of Contents

- Solution Resource Quotas Limits
  - Pod "rabbit": Identifying CPU Requests
  - Pod "elephant": Diagnosing Memory Issues
  - Updating the Memory Limit
  - Resource Summary
  - Clean Up
  - Further Reading
  - Watch Video

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Security Fundamentals

# Solution Resource Quotas Limits

In this guide, we demonstrate how Kubernetes enforces CPU and memory constraints using two example pods, **rabbit** and **elephant**. You will learn how to:

- Identify resource requests and limits
- Diagnose pod failures caused by insufficient resources
- Update pod specifications to prevent OOM kills

## Pod "rabbit": Identifying CPU Requests

First, confirm that the **rabbit** pod is running and examine its resource settings:

```
kubectl get pod rabbit
kubectl describe pod rabbit
```

Excerpt from the description shows:

```
Containers:
  cpu-stress:
    Limits:
      cpu: 2
    Requests:
      cpu: 1
```

Here, the **rabbit** pod requests **1 CPU** and caps at **2 CPUs**.

To clean up:

```
kubectl delete pod rabbit
# pod "rabbit" deleted
```

![The image shows a terminal window displaying Kubernetes pod details and events, alongside a task prompt to delete the "rabbit" pod.](https://kodekloud.com/kk-media/image/upload/v1752880800/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Solution-Resource-Quotas-Limits/kubernetes-pod-details-delete-rabbit.jpg)

---

## Pod "elephant": Diagnosing Memory Issues

When you deploy the **elephant** pod, it enters a CrashLoopBackOff:

```
kubectl get pods
NAME       READY   STATUS             RESTARTS   AGE
elephant   0/1     CrashLoopBackOff   1          8s
```

Inspect its status and events:

```
kubectl describe pod elephant
```

Key output sections:

```
Containers:
  mem-stress:
    State: Waiting
    Reason: CrashLoopBackOff
    Last State:
      Terminated:
        Reason: OOMKilled
        Exit Code: 1
    Limits:
      memory: 10Mi
    Requests:
      memory: 5Mi
...
Events:
  Type     Reason          Age   From               Message
  Normal   Scheduled       23s   default-scheduler  Successfully assigned default/elephant to controlplane
  Normal   Pulled          20s   kubelet            Successfully pulled image "polinux/stress"
  Normal   Started         18s   kubelet            Started container mem-stress
  Normal   Back-off        18s   kubelet            Back-off restarting failed container
```

The pod is **OOMKilled** because it exceeded its **10Mi** memory limit while the `stress` workload uses around **15Mi**.

> [!important]
> **Warning**
>
> The CrashLoopBackOff status indicates the container repeatedly failed due to out-of-memory errors. Always ensure your `limits.memory` exceed the actual usage of your application.

![The image shows a Kubernetes pod named "elephant" with a memory issue, requiring an increase in its memory limit from 15Mi to 20Mi. The terminal displays details about the pod's status, including a "CrashLoopBackOff" error due to being "OOMKilled."](https://kodekloud.com/kk-media/image/upload/v1752880801/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Solution-Resource-Quotas-Limits/kubernetes-pod-elephant-memory-issue.jpg)

---

## Updating the Memory Limit

You cannot patch resource limits on a running pod. Instead, edit the pod manifest and recreate it:

```
kubectl edit pod elephant
```

The YAML editor opens. Find the `resources` section and change:

```
spec:
  containers:
  - name: mem-stress
    resources:
      limits:
        memory: 20Mi
      requests:
        memory: 5Mi
```

Save and exit. You’ll see an error because live edits to limits are not allowed:

```
error: pods "elephant" is invalid
A copy of your changes has been stored to "/tmp/kubectl-edit-*.yaml"
error: Edit cancelled, no valid changes were saved.
```

Apply the updated manifest by deleting and recreating the pod:

```
kubectl replace --force -f /tmp/kubectl-edit-*.yaml
```

Verify the new memory configuration:

```
kubectl describe pod elephant | grep -A3 "Limits:"
```

Expected output:

```
Limits:
  memory: 20Mi
Requests:
  memory: 5Mi
...
Ready: True
```

![The image shows a code editor with a YAML configuration file for a Kubernetes pod named "elephant," alongside instructions to increase its memory limit to 20Mi.](https://kodekloud.com/kk-media/image/upload/v1752880803/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Solution-Resource-Quotas-Limits/kubernetes-pod-elephant-yaml-config.jpg)

---

## Resource Summary

| Pod      | CPU Request | CPU Limit | Memory Request | Memory Limit |
| -------- | ----------- | --------- | -------------- | ------------ |
| rabbit   | 1 CPU       | 2 CPU     | –              | –            |
| elephant | –           | –         | 5Mi            | 20Mi         |

---

## Clean Up

Remove the **elephant** pod to finish the exercise:

```
kubectl delete pod elephant
# pod "elephant" deleted
```

---

## Further Reading

- [Resource Management for Pods and Containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- [Understanding CrashLoopBackOff](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-application/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/95af14d5-1ed4-4440-88f2-2d32fd4e737e)**
>
> Watch video content
