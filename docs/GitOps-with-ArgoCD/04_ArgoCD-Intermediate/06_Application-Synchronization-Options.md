# Application Synchronization Options - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Intermediate/Application-Synchronization-Options)

---

## Table of Contents

- Application Synchronization Options
  - 1. Behavior When Synchronization is Disabled
  - 2. Enabling Synchronization Options
  - 3. Auto-Pruning in Action
  - Summary of Synchronization Benefits
  - Watch Video
  - Practice Lab
    - Manual Sync Required
    - Handling Deleted Manifests
    - Direct Cluster Changes via CLI
    - Activating Sync Options via Argo CD UI

---

## Content

GitOps with ArgoCD

ArgoCD Intermediate

# Application Synchronization Options

In this lesson, we explore various GitOps synchronization strategies using Argo CD and observe their real-time effects on a Kubernetes cluster. We use the previously introduced health check application to demonstrate these concepts.

Currently, if you inspect the application details in the Argo CD dashboard and scroll down to the sync policy section, you will notice that none of the synchronization options are enabled. Automatic sync, auto-pruning, and auto-healing are all disabled.

![The image shows a dashboard interface of an application in Argo CD, displaying details such as cluster, namespace, and sync status, with options to enable auto-sync.](https://kodekloud.com/kk-media/image/upload/v1752877546/notes-assets/images/GitOps-with-ArgoCD-Application-Synchronization-Options/argo-cd-dashboard-interface.jpg)

---

## 1\. Behavior When Synchronization is Disabled

### Manual Sync Required

Without automatic sync, any changes made to the Git repository must be synced manually. For example, if you update the number of replicas in the deployment YAML to one and save the changes, the application status will be marked as "OutOfSync" because the changes have not been applied to the Kubernetes cluster. To update the cluster, you must manually click the sync button.

### Handling Deleted Manifests

Consider a scenario where you delete the deployment manifest from the Git repository. The following YAML represents the deleted deployment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: random-shapes
spec:
  selector:
    matchLabels:
      app: random-shapes
  replicas: 1
  template:
    metadata:
      labels:
        app: random-shapes
    spec:
      containers:
        - name: random-shapes
          image: Siddhart67/php-random-shapes:v1
          imagePullPolicy: Always
          env:
            - configMapRef:
                name: moving-shapes-colors
```

Since automatic sync is disabled, the deletion in Git does not propagate to the Kubernetes cluster. The deployment remains active, meaning that a deletion from Git will not remove the resource from Kubernetes.

To restore consistency, reapply the deployment manifest. Below is the corrected version of the deployment YAML:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: random-shapes
spec:
  selector:
    matchLabels:
      app: random-shapes
  replicas: 1
  template:
    metadata:
      labels:
        app: random-shapes
    spec:
      containers:
        - name: random-shapes
          image: siddharth67/php-random-shapes:v1
          imagePullPolicy: Always
          envFrom:
            - configMapRef:
                name: moving-shapes-colors
```

After reapplying, the application becomes in sync once more.

### Direct Cluster Changes via CLI

Sometimes resources may be deleted directly using the command line. For instance, if you delete a service manually, you can view the current state of resources in the "health-check" namespace:

```
k -n health-check get all
```

The output might look like this:

```
pod/random-shapes-7c65b8b8bc-mm4p6     1/1     Running       0          10m
NAME                                   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)         AGE
service/random-shapes-svc             NodePort    10.102.175.255  <none>       80:32731/TCP    17m
NAME                                   READY     UP-TO-DATE    AVAILABLE    AGE
deployment.apps/random-shapes         1/1       1             1            17m
NAME                                   DESIRED   CURRENT       READY       AGE
replicaset.apps/random-shapes-5df44bc9  0         0             0           17m
replicaset.apps/random-shapes-7c65b8b8bc  1         1             1           10m
```

Delete the service with:

```
k -n health-check delete svc random-shapes-svc
```

Output:

```
service "random-shapes-svc" deleted
```

> [!important]
> **Warning**
>
> Since automatic sync is disabled, direct changes in Kubernetes are not reconciled with the Git repository. This practice violates GitOps principles, which emphasize Git as the single source of truth.

---

## 2\. Enabling Synchronization Options

Before enabling synchronization settings, ensure that the application is in a healthy state with all config maps, services, and deployments running as expected. When using NodePort services, note that the port number may change with each recreation. For example, a service YAML snippet might look like this:

```
apiVersion: v1
kind: Service
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"labels":{"app.kubernetes.io/instance":"health-check-app","name":"random-shapes-svc","namespace":"health-check"},"resourceVersion":"166772","uid":"5ebe39fc-8351-4592-brcb-e3c771c76b5"}}
  name: random-shapes-svc
  namespace: health-check
  resourceVersion: "166772"
  uid: 5ebe39fc-8351-4592-brcb-e3c771c76b5
spec:
  clusterIP: 10.182.234.107
  clusterIPs:
    - 10.182.234.107
  externalTrafficPolicy: Cluster
  internalTrafficPolicy: Cluster
  ipFamilies:
    - IPv4
  ipFamilyPolicy: SingleStack
  ports:
    - nodePort: 30271
      port: 80
      protocol: TCP
      targetPort: 80
  selector:
    app: random-shapes
  sessionAffinity: None
  type: NodePort
status:
  loadBalancer: {}
```

Here, NodePort 30271 is in use. In production, a load balancer or ingress controller would typically manage these mappings.

### Activating Sync Options via Argo CD UI

Enable the following synchronization options:

- **Automatic Sync**: Any change in Git synchronizes automatically with the Kubernetes cluster.
- **Resource Pruning**: Removes resources from the cluster when they are deleted from Git.
- **Self-Healing**: Automatically recreates or reverts resources that have been manually changed or deleted in the cluster.

For example, if you increase the replica count from one to four in the Git repository, the system will automatically sync, and you will observe four pods running.

The split-screen dashboard below demonstrates this workflow, with the Argo CD application dashboard on the left and the GitHub repository on the right:

![The image shows a split screen with an Argo CD application dashboard on the left, displaying the health and sync status of a "health-check-app," and a GitHub repository interface on the right, showing recent commits and files related to the app.](https://kodekloud.com/kk-media/image/upload/v1752877547/notes-assets/images/GitOps-with-ArgoCD-Application-Synchronization-Options/argo-cd-github-dashboard-split.jpg)

> [!important]
> **Note**
>
> Self-healing ensures that manual deletions are automatically reversed. For instance, if you delete the service manually, the system immediately recreates it based on the Git repository.

To verify, if you delete the service with:

```
k -n health-check delete svc random-shapes-svc
```

The auto-synchronization function will recreate the service almost instantly. Running:

```
k -n health-check get all
```

produces output similar to:

```
NAME                                             READY   STATUS    RESTARTS   AGE
pod/random-shapes-7c65b8b8bc-mm4p6              1/1     Running   0          22m
NAME                                             TYPE        CLUSTER-IP     EXTERNAL-IP   AGE
service/random-shapes-svc                       NodePort    10.102.175.255 <none>        22m
NAME                                             READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/random-shapes                   1/1     1            1           22m
NAME                                             DESIRED   CURRENT
replicaset.apps/random-shapes-5df44bc9b         0         0
replicaset.apps/random-shapes-7c65b8b8bc        1         1
```

Repeating the deletion command confirms that self-healing is active and the service remains intact.

---

## 3\. Auto-Pruning in Action

Previously, deleting a deployment manifest from Git left the resource active in Kubernetes. With auto-pruning enabled, removing a file from the Git repository triggers the deletion of the corresponding resource in the cluster.

For instance, consider the following deployment YAML:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: random-shapes
spec:
  selector:
    matchLabels:
      app: random-shapes
  replicas: 4
  template:
    metadata:
      labels:
        app: random-shapes
    spec:
      containers:
        - name: random-shapes
          image: siddharth67/php-random-shapes:v1
          imagePullPolicy: Always
          envFrom:
            - configMapRef:
                name: moving-shapes-colors
```

When you delete this file from Git, auto-pruning removes the deployment from the cluster. The split-screen diagram below demonstrates the synchronization process, with the Argo CD dashboard on the left and the Git dashboard on the right:

![The image shows a split screen with an Argo CD application dashboard on the left, displaying the status of a "health-check-app," and a Git repository interface on the right, showing recent commits and file changes.](https://kodekloud.com/kk-media/image/upload/v1752877548/notes-assets/images/GitOps-with-ArgoCD-Application-Synchronization-Options/argo-cd-health-check-git-dashboard.jpg)

After deletion, running:

```
k -n health-check get all
```

shows that the deployments (and their pods) are removed. Only remaining resources, such as services, may persist if not pruned.

Eventually, the UI will indicate that the application is unreachable because its resources have been removed.

---

## Summary of Synchronization Benefits

Enabling synchronization options in your GitOps workflow provides several key advantages:

- **Automatic Sync:** Changes in Git are immediately applied to the Kubernetes cluster.
- **Self-Healing:** Manual changes made directly in the cluster are automatically reverted to align with the Git repository.
- **Auto-Pruning:** Resources that have been removed from Git are automatically pruned from the cluster, ensuring consistency with the declared state.

![The image shows a dashboard interface of an application health check, displaying details like namespace, repo URL, sync status, and health status, with options to disable auto-sync and self-heal.](https://kodekloud.com/kk-media/image/upload/v1752877549/notes-assets/images/GitOps-with-ArgoCD-Application-Synchronization-Options/application-health-check-dashboard.jpg)

This concludes the demonstration of application synchronization options using Argo CD and GitOps principles.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/7d158b65-58ef-432d-9d26-61e245751bfe/lesson/b63854d3-630d-4c9f-925a-e625214428be)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/7d158b65-58ef-432d-9d26-61e245751bfe/lesson/3548c5bd-b208-4ee4-acce-b1e2fa43ac75)**
>
> Practice lab
