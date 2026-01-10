# Pending Pods - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Troubleshooting-Scenarios/Pending-Pods)

---

## Table of Contents

- Pending Pods
  - Example 1: Data Processor Pod – Insufficient CPU
  - Example 2: ML API Pod – Node Selector Mismatch
  - Example 3: Web App Pod – Untolerated Taint
  - Summary
  - Watch Video

---

## Content

Kubernetes Troubleshooting for Application Developers

Troubleshooting Scenarios

# Pending Pods

In this lesson, we explore a common Kubernetes issue—pods remaining in the pending state. This guide covers three scenarios that cause pods to get stuck during scheduling and provides actionable solutions.

When a pod is in the pending state, Kubernetes has received the request to run it, but no available node meets the pod’s scheduling requirements. Let’s start by checking the pods in our cluster. As seen below, three pods are currently pending:

![The image shows a terminal interface for managing Kubernetes pods, with three pods listed as "Pending" and various details like CPU and memory usage. The interface includes commands and shortcuts for interacting with the pods.](https://kodekloud.com/kk-media/image/upload/v1752880437/notes-assets/images/Kubernetes-Troubleshooting-for-Application-Developers-Pending-Pods/kubernetes-pods-terminal-interface.jpg)

Below, we examine three examples that highlight different causes for pending pods.

---

## Example 1: Data Processor Pod – Insufficient CPU

The first scenario involves the data processor pod. Running the describe command reveals that our cluster has two nodes. The scheduler indicates failures due to insufficient CPU on one node and an untolerated taint on the control plane node. The output is as follows:

```
Describe(staging/data-processor-64596d6fbfb-b7csp)
Environment: <none>
Mounts:
  /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-htgcx (ro)
Conditions:
  Type            Status
  PodScheduled    False
Volumes:
  kube-api-access-htgcx:
    Type: Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds: 3607
    ConfigMapName: kube-root-ca.crt
    ConfigMapOptional: <nil>
    DownwardAPI: true
QoS Class: Burstable
Node-Selectors: <none>
Tolerations:
  node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
  node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
  workload-machine-learning:NoSchedule
Events:
  Type    Reason              Age                  From                  Message
  ------  -----               ---                  ----                  -------
  Warning FailedScheduling    27s (x2 over 5m49s)  default-scheduler     0/2 nodes are available: 1 Insufficient cpu, 1 node(s) had untolerated taint {node-role.kubernetes.io/control-plane: }. preemption: 0/2 nodes are available: 1 No preemption victims found for incoming pod, 1 Preemption is not helpful for scheduling.
```

The event logs indicate that the first node flagged "Insufficient cpu". To understand this, we inspect the pod's CPU requests:

```
Describe(staging/data-processor-64596d6fbfb-b7csp)
Environment: <none>
Mounts:
  /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-htgxc (ro)
Conditions:
  Type             Status
  PodScheduled     False
Volumes:
  kube-api-access-htgxc:
    Type: Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds: 3607
    ConfigMapName: kube-root-ca.crt
    ConfigMapOptional: <nil>
    DownwardAPI: true
QoS Class: Burstable
Node-Selectors: <none>
Tolerations:
  node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
  node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
  workload=machine-learning:NoSchedule
Events:
  Type    Reason              Age                  From                  Message
  ----    ------              ----                 ----                  -------
  Warning FailedScheduling    27s (x2 over 5m49s)  default-scheduler     0/2 nodes are available: 1 Insufficient cpu, 1 node(s) had untolerated taint {node-role.kubernetes.io/control-plane: }. preemption: 0/2 nodes are available: 1 No preemption victims found for incoming pod, 1 Preemption is not helpful for scheduling.
```

The pod requires two CPUs. However, the node (ignoring the control plane) has a total of two CPUs and is already running three pods, leaving no capacity to satisfy the new request:

```
Describe(staging/data-processor-6459d6fbfb-b7csp)
Port:                    <none>
Host Port:               <none>
Limits:
  cpu:                   2
Requests:
  cpu:                   2
Environment:             <none>
Mounts:
  /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-htgcx (ro)
Conditions:
  Type            Status
  PodScheduled    False
Volumes:
  kube-api-access-htgcx:
    Type:               Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds: 3607
    ConfigMapName:      kube-root-ca.crt
    ConfigMapOptional:  <nil>
    DownwardAPI:        true
QoS Class:              Burstable
Node-Selectors:         <none>
Tolerations:            node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
```

> [!important]
> **Solution Tip**
>
> To resolve the issue, you can reduce the CPU request (for example, from "2" to "1") so that the pod fits into the available node capacity.

The pod specification defines both CPU requests and limits as shown below:

![The image shows a terminal interface for managing Kubernetes deployments using K9s, displaying three deployments with their readiness status, all of which are not ready.](https://kodekloud.com/kk-media/image/upload/v1752880438/notes-assets/images/Kubernetes-Troubleshooting-for-Application-Developers-Pending-Pods/kubernetes-k9s-deployments-not-ready.jpg)

Here is the YAML snippet for the data processor deployment:

```
generation: 1
name: data-processor
namespace: staging
resourceVersion: "1550"
uid: 5456ffa2-213b-4bb1-a02b-7cab5327388


spec:
  progressDeadlineSeconds: 600
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: data-processor
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: data-processor
    spec:
      containers:
      - image: vish/stress
        imagePullPolicy: Always
        name: data-processor
        resources:
          limits:
            cpu: "2"
          requests:
            cpu: "2"
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
      dnsPolicy: ClusterFirst
```

The Kubernetes scheduler only considers the CPU requests, not the limits. If a node has sufficient free resources based on requests, the pod is scheduled; otherwise, it remains pending. After updating the CPU request, the pod transitions from pending to running. If your workload truly demands the original allocation, consider scaling your cluster by adding a new node.

---

## Example 2: ML API Pod – Node Selector Mismatch

The second example focuses on the ML API pod. The scheduler logs indicate that one node did not meet the pod's node affinity and that the control plane node carries an untolerated taint:

```
Context: kubernetes-admin@kubernetes
Cluster: kubernetes
User: kubernetes-admin
K9S Rev: v0.32.4
K8S Rev: v1.29.0
CPU: 3%
MEM: 53%


Describe(staging/ml-api-6b9bb6c9f4-n2rbm)


Environment: <none>
Mounts:
  /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-4wb5b (ro)
Conditions:
  Type            Status
  PodScheduled    False
Volumes:
  kube-api-access-4wb5b:
    Type: Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds: 3607
    ConfigMapName: kube-root-ca.crt
    ConfigMapOptional: <nil>
    DownwardAPI: true
QoS Class: BestEffort
Node-Selectors:
  type: gpu
Tolerations:
  node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
  node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
  workload-machine-learning:NoSchedule
Events:
  Type    Reason              Age                Message
  ----    ------              ---                -------
  Warning FailedScheduling    3m55s (x2 over 9m17s) default-scheduler  0/2 nodes are available: 1 node(s) didn't match Pod's node affinity /selector, 1 node(s) had untolerated taint {node-role.kubernetes.io/control-plane: }. preemption: 0/2 nodes are available: 2 Preemption is not helpful for scheduling.
```

The pod specifies a node selector with the label "type=gpu", but none of the nodes have this label. To confirm, running:

```
kubectl describe pod staging/ml-api-6b9bb6c9f4-n2rbm
```

shows that the pod requires a node with "type: gpu". The solution is to label the appropriate node:

```
kubectl label nodes node01 type=gpu
```

After adding the label, the ML API pod moves to the ContainerCreating state, indicating that it has been successfully scheduled.

---

## Example 3: Web App Pod – Untolerated Taint

The final scenario involves the web app pod, which remains pending due to untolerated taints related to the control plane and a taint from "workload: machine-learning". The pod description highlights this condition:

```
Context: kubernetes-admin@kubernetes
Cluster: kubernetes
User: kubernetes-admin
K9S Rev: v0.32.4
K8S Rev: v1.29.0
CPU: 3%
MEM: 52%


Name: web-app-564cb8d898-d521w
Namespace: staging
Priority: 0
Service Account: default
Node: <none>
Labels: app=webapp-color
pod-template-hash=564cb8d898
Annotations: <none>
Status: Pending
IP: <none>
IPs: <none>
Controlled By: ReplicaSet/web-app-564cb8d898
Containers:
  webapp-color:
    Image: kodekloud/webapp-color
    Port: 8080/TCP
    Host Port: 0/TCP
    Environment: <none>
    Mounts: /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-s6w5r (ro)
Conditions:
  Type: Status
  PodScheduled: False
Volumes:
  kube-api-access-s6w5r:
```

A closer look at the pod details confirms the absence of a toleration for the key "workload" with value "machine-learning":

```
Describe(staging/web-app-564cb8d898-d521w)


Host Port: 0/TCP
Environment: <none>
Mounts:
  /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-s6w5r (ro)
Conditions:
  Type         Status
  PodScheduled False
Volumes:
  kube-api-access-s6w5r:
    Type: Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds: 3607
    ConfigMapName: kube-root-ca.crt
    ConfigMapOptional: <nil>
    DownwardAPI: true
QoS Class: BestEffort
Node-Selectors: <none>
Tolerations:
  - node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
  - node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type     Reason               Age                         From                    Message
  ----     ------               ---                         ----                    -------
  Warning  FailedScheduling     265s (x3 over 10m)          default-scheduler       0/2 nodes are available: 1 node(s) had untolerated taint {node-role.kubernetes.io/control-plane: }, 1 node(s) had untolerated taint {workload: machine-learning}. preemption: 0/2 nodes are available: 2 Preemption is not helpful for scheduling.
```

A taint prevents pods from being scheduled on a node unless they have an appropriate toleration. To fix this issue, modify the web app deployment to include the toleration for the taint "workload: machine-learning". Below is the deployment YAML snippet before the change:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: staging
  annotations: {}
  resourceVersion: "4365"
  uid: 662b25b6-6953-4ab0-8b74-eaa4c00bc150
spec:
  progressDeadlineSeconds: 600
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: webapp-color
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: webapp-color
    spec:
      containers:
      - name: webapp-color
        image: kodekloud/webapp-color
        imagePullPolicy: Always
        ports:
        - containerPort: 8080
          protocol: TCP
```

Include the following toleration in the pod specification to resolve the issue:

```
    spec:
      tolerations:
      - key: workload
        operator: Equal
        value: machine-learning
      containers:
      - name: webapp-color
        image: kodekloud/webapp-color
        imagePullPolicy: Always
        ports:
        - containerPort: 8080
          protocol: TCP
```

After applying these changes, the updated deployment allows the pod to tolerate the taint, and it is scheduled successfully. A sample of the updated deployment is shown below:

```
creationTimestamp: "2024-06-07T23:08:07Z"
generation: 18
name: web-app
namespace: staging
resourceVersion: "4365"
uid: 662b25b6-6953-4ab0-8b74-eaa4c00bc150
spec:
  progressDeadlineSeconds: 600
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: webapp-color
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: webapp-color
    spec:
      tolerations:
      - key: workload
        operator: Equal
        value: machine-learning
      containers:
      - name: webapp-color
        image: kodekloud/webapp-color
        imagePullPolicy: Always
        ports:
        - containerPort: 8080
          protocol: TCP
```

---

## Summary

In this lesson, we reviewed three common scenarios that cause pods to remain in the pending state:

1.  The data processor pod was pending due to insufficient CPU availability. The issue was resolved by reducing the CPU request (or by scaling the cluster).
2.  The ML API pod was pending because it required a node that matched a specific node selector ("type: gpu"). Labeling the node correctly allowed it to schedule.
3.  The web app pod was pending due to an untolerated taint. Adding an appropriate toleration in the deployment enabled the pod to be scheduled.

By understanding these challenges and solutions, you can ensure your pods are scheduled successfully in Kubernetes. Happy troubleshooting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/889721c1-14b7-4b16-b8a1-1c0b97530ab3)**
>
> Watch video content
