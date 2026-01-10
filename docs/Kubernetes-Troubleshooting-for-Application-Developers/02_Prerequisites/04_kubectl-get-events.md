# kubectl get events - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Prerequisites/kubectl-get-events)

---

## Table of Contents

- kubectl get events
  - Retrieving Events for a Specific Namespace
  - Understanding Event Types
  - Troubleshooting with Events
  - Viewing Events in Resource Descriptions
  - Conclusion
  - Watch Video

---

## Content

Kubernetes Troubleshooting for Application Developers

Prerequisites

# kubectl get events

This article explores how to use the `kubectl get events` command to monitor and troubleshoot Kubernetes clusters and applications. The events resource provides critical insights into the lifecycle of your resources—from pod scheduling to container health—making it an essential tool for Kubernetes administrators.

## Retrieving Events for a Specific Namespace

To retrieve events from a specific namespace, such as "monitoring", run the following command:

```
kubectl get events -n monitoring
```

This command displays events ordered by recency, with the oldest events appearing at the top and the most recent ones at the bottom. For example, you might see:

```
controlplane ➜ ✗ kubectl get events -n monitoring
LAST SEEN   TYPE     REASON              OBJECT
40m         Normal   Scheduled           pod/grafana-68cd584679-jrwd5
39m         Normal   Pulling             pod/grafana-68cd584679-jrwd5
39m         Normal   Pulled              pod/grafana-68cd584679-jrwd5
39m         Normal   Created             pod/grafana-68cd584679-jrwd5
39m         Normal   Started             pod/grafana-68cd584679-jrwd5
39m         Warning  Unhealthy           pod/grafana-68cd584679-jrwd5
           00: connect: connection refused
40m         Normal   SuccessfulCreate    replicaset/grafana-68cd584679
40m         Normal   ScalingReplicaSet   deployment/grafana
42m         Warning  FailedScheduling    replicaset/prometheus-alertmanager-0
40m         Normal   SuccessfulCreate    statefulset/prometheus-alertmanager
40m         Normal   Scheduled           pod/prometheus-kube-state-metrics-65468947fb-nvhtm
40m         Normal   SuccessfulCreate    pod/prometheus-kube-state-metrics-65468947fb-nvhtm
40m         Normal   Pulling             pod/prometheus-kube-state-metrics-65468947fb-nvhtm
40m         Normal   Pulled              pod/prometheus-kube-state-metrics-65468947fb-nvhtm
39m         Normal   Created             pod/prometheus-kube-state-metrics-65468947fb-nvhtm
39m         Normal   Started             pod/prometheus-kube-state-metrics-65468947fb-nvhtm
39m         Normal   ScalingReplicaSet   pod/prometheus-kube-state-metrics
40m         Normal   Scheduled           pod/prometheus-node-exporter-4jh6s
40m         Normal   Pulled              pod/prometheus-node-exporter-4jh6s
40m         Warning  Failed              pod/prometheus-node-exporter-4jh6s
           06bf48ed4c73 spec: failed to generate spec: path "/" is mounted on "/" but it is not a shared or slave mount
4m55s       Normal   Pulled              pod/prometheus-node-exporter-4jh6s
40m         Warning  Failed              pod/prometheus-node-exporter-4jh6s
           7140646a50761 spec: failed to generate spec: path "/" is mounted on "/" but it is not a shared or slave mount
39m32s      Warning  Failed              pod/prometheus-node-exporter-4jh6s
           399b92d6016 spec: failed to generate spec: path "/" is mounted on "/" but it is not a shared or slave mount
39m         Warning  Failed              pod/prometheus-node-exporter-4jh6s
           06bf48ed4c73 spec: failed to generate spec: path "/" is mounted on "/" but it is not a shared or slave mount
40m         Warning  Failed              pod/prometheus-node-exporter-4jh6s
           6537a206d848 spec: failed to generate spec: path "/" is mounted on "/" but it is not a shared or slave mount
```

> [!important]
> **Tip**
>
> Viewing events in chronological order helps you track the progression of operations and quickly pinpoint where issues begin.

## Understanding Event Types

The "TYPE" column in the event output indicates the nature of the event:

- **Normal**: Represents standard operations such as pod scheduling, pulling container images, or the successful creation of deployments and replicasets.
- **Warning**: Highlights potential issues such as scheduling failures or container health problems.

Consider the following example which shows both normal events and a warning:

```
controlplane ➜ kubectl get events -n monitoring
LAST SEEN   TYPE      REASON              OBJECT
40m         Normal    Scheduled           pod/grafana-68cd584679-jrw5
40m         Normal    Pulling             pod/grafana-68cd584679-jrw5
39m         Normal    Pulled              pod/grafana-68cd584679-jrw5
39m         Normal    Created             pod/grafana-68cd584679-jrw5
39m         Normal    Started             pod/grafana-68cd584679-jrw5
39m         Warning   Unhealthy           pod/grafana-68cd584679-jrw5
           00: connect: connection refused
40m         Normal    SuccessfulCreate    deployment/grafana
42m         Warning   FailedScheduling    pod/prometheus-alertmanager-0
40m         Normal    SuccessfulCreate    statefulset/prometheus-alertmanager
...
```

> [!important]
> **Warning**
>
> Warnings indicate issues that require your attention. Always review the detailed messages following these warnings to understand the root cause.

## Troubleshooting with Events

By closely monitoring event outputs, you can identify and troubleshoot issues that occur during the lifecycle of your Kubernetes applications. For instance, a scheduling issue might be highlighted as follows:

```
controlplane ➜ kubectl get events -n monitoring
LAST SEEN   TYPE       REASON            OBJECT
40m         Normal     Scheduled         pod/grafana-68cd584679-jrw5
40m         Normal     Pulling           pod/grafana-68cd584679-jrw5
39m         Normal     Created           pod/grafana-68cd584679-jrw5
39m         Normal     Started           pod/grafana-68cd584679-jrw5
39m         Warning    Unhealthy         pod/grafana-68cd584679-jrw5
           00: connect: connection refused
40m         Normal     SuccessfulCreate  deployment/grafana
42m23s      Warning    FailedScheduling  statefulset/prometheus-alertmanager
...
```

The detailed error message (e.g., "spec: failed to generate spec: path "/" is mounted on "/" but it is not a shared or slave mount") can help you identify issues related to mount propagation errors, unavailable container images, or scheduling conflicts.

## Viewing Events in Resource Descriptions

In addition to the `kubectl get events` command, events also appear in detailed resource descriptions provided by commands such as `kubectl describe`. When describing a deployment, for example, the events section at the bottom offers context about resource states:

```
controlplane ➜ kubectl describe deployment grafana -n monitoring
...
Events:
  Type     Reason                  Age                  From                     Message
  ----     ------                  ----                 ----                     -------
  Normal   Scheduled               40m                  default-scheduler        Successfully assigned monitoring/grafana-68cd584679-jrw5 to node01
  Normal   Pulling                 39m                  kubelet, node01          Pulling image "docker.io/grafana/grafana:10.4.0"
  Normal   Pulled                  39m                  kubelet, node01          Successfully pulled image "docker.io/grafana/grafana:10.4.0" in 11.172s (29.202s including waiting)
  Normal   Created                 39m                  kubelet, node01          Created pod: grafana-68cd584679-jrw5
  Warning  Unhealthy               39m                  kubelet, node01          Readiness probe failed: Get "http://10.244.1.13:3000/api/health": dial tcp 10.244.1.13:3000: connect: connection refused
...
```

This detailed output is invaluable for diagnosing issues that occur during both deployment and runtime.

## Conclusion

The `kubectl get events` command is a vital tool for managing Kubernetes clusters. It offers a chronological view of events that captures both routine operations and potential issues, enabling administrators to quickly detect and resolve problems. By understanding the different event types and examining detailed error messages, you can ensure the reliability and health of your Kubernetes applications.

Happy troubleshooting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/09c2c8a6-ba29-4d55-bea1-cd8584be9107/lesson/7bb3d0e4-1864-4e2d-8631-2f78dee5d760)**
>
> Watch video content
