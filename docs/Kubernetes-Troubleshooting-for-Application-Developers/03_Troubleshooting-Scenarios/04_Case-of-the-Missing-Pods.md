# Case of the Missing Pods - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Troubleshooting-Scenarios/Case-of-the-Missing-Pods)

---

## Table of Contents

- Case of the Missing Pods
  - Deploying the API Application
  - Investigating the Deployment Status
  - Adjusting the Namespace Resource Quota
  - Deploying the Analytics Application
  - Conclusion
  - Watch Video

---

## Content

Kubernetes Troubleshooting for Application Developers

Troubleshooting Scenarios

# Case of the Missing Pods

In this guide, we explore a common Kubernetes issue—missing pods. You will learn how to deploy applications in the staging namespace and troubleshoot why the expected pods fail to start.

## Deploying the API Application

We begin by creating a deployment for a simple web application named "api" in the staging namespace. The deployment manifest specifies that five replicas should run.

Before applying the new deployment, inspect the current resources in the staging namespace. At this point, only one deployment, "data processor," exists with three running pods:

```
controlplane ~ ➜ cat api-deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: staging
spec:
  replicas: 5
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: kodekloud/webapp-color
          ports:
            - containerPort: 8080
```

```
controlplane ~ ➜ k get all -n staging
NAME                                         READY   STATUS    RESTARTS   AGE
pod/data-processor-75597df6-6kkst           1/1     Running   0          2m41s
pod/data-processor-75597df6-bzd1q            1/1     Running   0          2m41s
pod/data-processor-75597df6-gnthx            1/1     Running   0          2m41s


NAME                                                 READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/data-processor                       3/3     3            3           2m41s


NAME                                                   READY   DESIRED   CURRENT   READY   AGE
replicaset.apps/data-processor-75597df6              3       3         3         3       2m41s
```

Apply the API deployment with the following command:

```
controlplane ~ ➜ k apply -f api-deployment.yml
deployment.apps/api created
```

Monitor the pods as they start up:

```
controlplane ~ ➜ k get pods -n staging --watch
NAME                            READY   STATUS    RESTARTS   AGE
api-7548899bdb-7nbgb            1/1     Running   0          12s
api-7548899bdb-hmqkz            1/1     Running   0          12s
data-processor-75597df6-6kkst    1/1     Running   0          3m10s
data-processor-75597df6-bzd1q    1/1     Running   0          3m10s
data-processor-75597df6-gnthx    1/1     Running   0          3m10s
```

Even though five replicas were specified for the API deployment, only two pods are running. There are no pods in a pending or container-creating state, which suggests that node resource unavailability or taints are not the issue. The deployment is attempting to create additional pods, but three replicas remain unavailable.

## Investigating the Deployment Status

Gather more details by describing the deployment:

```
controlplane ~ ➜ k describe deployment -n staging api
Name:                api
Namespace:           staging
CreationTimestamp:   Sat, 18 May 2024 00:08:41 +0000
Labels:              <none>
Annotations:         deployment.kubernetes.io/revision: 1
Selector:            app=api
Replicas:            5 desired | 2 updated | 2 total | 2 available | 3 unavailable
StrategyType:        RollingUpdate
MinReadySeconds:     0
RollingUpdateStrategy: 25% max unavailable, 25% max surge
Pod Template:
  Labels:        app=api
  Containers:
   api:
    Image:      kodekloud/webapp-color
    Port:       8080/TCP
    Host Port:  0/TCP
Conditions:
  Type            Status  Reason
  ----            ------  ------
  Available       False   MinimumReplicasUnavailable
  ReplicaFailure  True    FailedCreate
  Progressing     True    ReplicaSetUpdated
OldReplicaSets:  <none>
NewReplicaSet:   api-7548899bdb (2/5 replicas created)
Events:
  Type    Reason             Age   From                     Message
  ----    ------             ----  ----                     -------
  Normal  ScalingReplicaSet  85s   deployment-controller    Scaled up replica set api-7548899bdb to 5
```

The events reveal that the deployment controller scaled the replica set to five, but there is an error related to resource quotas. A closer look at the events shows the following error:

```
2m31s   Warning   FailedCreate  replicaset/api-7548899bdb  Error creating: pods "api-7548899bdb-n4k9j" is forbidden: exceeded quota: pod-quota, requested: pods=1, used: 5, limited: pods=5
```

This error indicates that the "pod-quota" resource quota is capping the number of pods in the staging namespace at five. Since there are already five pods running (including those from the data processor deployment), the API deployment cannot create additional pods.

## Adjusting the Namespace Resource Quota

First, confirm the existing resource quota for the staging namespace:

```
controlplane ~ ➜ k describe ns staging
Name:         staging
Labels:       kubernetes.io/metadata.name=staging
Annotations:  <none>
Status:       Active


Resource Quotas
Name:            pod-quota
Resource         Used  Hard
--------         ---   ---
pods             5     5
```

> [!important]
> **Tip**
>
> To support additional deployments, consider increasing the pod quota in the namespace.

Edit the resource quota to raise the hard limit—for example, to 10 pods:

```
controlplane ~ ➜ k edit resourcequota -n staging pod-quota
```

Update the manifest as shown below:

```
apiVersion: v1
kind: ResourceQuota
metadata:
  name: pod-quota
  namespace: staging
spec:
  hard:
    pods: "10"
status:
  hard:
    pods: "5"
  used:
    pods: "5"
```

After updating the quota, restart the API deployment to initiate the creation of the additional pods:

```
controlplane ~ ➜ k rollout restart deployment -n staging api
```

Verify that new pods are created by listing them:

```
controlplane ~ ➜ k get pods -n staging
NAME                                 READY   STATUS        RESTARTS   AGE
api-7548899bd-7bngb                  1/1     Running       0          5m10s
api-7548899bdb-mkqkz                 1/1     Terminating   0          5m10s
api-7548899bdb-srcvg                 1/1     Terminating   0          7s
api-7548899bdb-t88x7                 1/1     Terminating   0          7s
api-79744dcd-4b4j2                   1/1     Running       0          7s
api-79744dcd-fgktmz                  1/1     Running       0          7s
api-79744dcd-fgtmgr                  1/1     Running       0          7s
data-processor-755794d6-6fks7        0/1     Running       0          8m8s
data-processor-755794d6-bzd1q        0/1     Running       0          8m8s
data-processor-755794d6-gnthx        0/1     Running       0          8m8s
```

The older pods are terminating as the new ones come up, and eventually, five API pods are running.

## Deploying the Analytics Application

Next, deploy another web application, "analytics," with a single replica. With the updated namespace quota, this deployment should not encounter quota issues. The deployment manifest is as follows:

```
controlplane ~ ➜ cat analytics-deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: analytics
  namespace: staging
spec:
  replicas: 1
  selector:
    matchLabels:
      name: web-dashboard
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      labels:
        name: web-dashboard
    spec:
      serviceAccountName: analytics-service-account
      containers:
        - name: web-dashboard
          image: kodekloud/webapp-contest
          imagePullPolicy: Always
```

Apply the deployment:

```
controlplane ~ ➜ k apply -f analytics-deployment.yml
deployment.apps/analytics created
```

Monitor the pods:

```
controlplane ~ ➜ k get pods -n staging --watch
NAME                                       READY   STATUS    RESTARTS   AGE
api-7974d4cdf9-4b4jt                        1/1     Running   0          3m44s
api-7974d4cdf9-fttpj                        1/1     Running   0          3m3s
api-7974d4cdf9-ktmzk                        1/1     Running   0          3m44s
api-7974d4cdf9-tgmzr                        1/1     Running   0          3m44s
api-7974d4cdf9-v7rph                        1/1     Running   0          3m3s
data-processor-75597d6f-6kkst               1/1     Running   0          11m
data-processor-75597d6f-bzdlq                1/1     Running   0          11m
data-processor-75597d6f-gnthx                1/1     Running   0          11m
```

However, the analytics pod does not appear to be created. Describing the deployment indicates that the desired replica is unavailable:

```
controlplane ~ ➜ k describe deployments.apps -n staging analytics
Name:                   analytics
Namespace:              staging
CreationTimestamp:      Sat, 18 May 2024 00:17:16 +0000
Labels:                 <none>
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               name=web-dashboard
Replicas:               1 desired | 0 updated | 0 total | 0 available | 1 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:               name=web-dashboard
  Service Account:      analytics-service-account
  Containers:
   web-dashboard:
    Image:          kodekloud/webapp-contest
    ImagePullPolicy: Always
Conditions:
  Type                 Status  Reason
  ----                 ------  -----
  Progressing          True    NewReplicaSetCreated
  Available            False   MinimumReplicasUnavailable
  ReplicaFailure       True    FailedCreate
OldReplicaSets:       <none>
NewReplicaSet:        analytics-7dd875747b (0/1 replicas created)
Events:
  Type     Reason                  Age   From                      Message
  ----     ------                  ----  ----                      -------
  Normal   ScalingReplicaSet       57s   deployment-controller     Scaled up replica set analytics-7dd875747b to 1
```

Event logs further indicate an error related to the service account:

```
... Error creating: pods "analytics-7dd875747b-" is forbidden: error looking up service account staging/analytics-service-account: ...
```

Examine the service accounts in the staging namespace:

```
controlplane ~ ➜ k get sa -n staging
NAME      SECRETS   AGE
default   0         13m
```

Since the service account "analytics-service-account" is missing, create it using the following command:

```
controlplane ~ ➜ k create sa analytics-service-account -n staging
serviceaccount/analytics-service-account created
```

Restart the analytics deployment to apply the changes:

```
controlplane ~ ➜ k rollout restart deployment -n staging analytics
deployment.apps/analytics restarted
```

Check the pods again to verify that the analytics pod is created:

```
controlplane ~ ➜ k get pods -n staging
NAME                                 READY   STATUS              RESTARTS   AGE
analytics-5cfbc5fc7b-lr8wd            0/1     ContainerCreating   0          6s
api-79744dc4df-4b4jt                  1/1     Running             0          11m
api-79744dc4df-fgktj                  1/1     Running             0          11m
api-79744dc4df-tgzmz                  1/1     Running             0          11m
api-79744dc4df-v7rph                  1/1     Running             0          11m
data-processor-755797d6-6kkst         1/1     Running             0          19m
data-processor-755797d6-bzd1q         1/1     Running             0          19m
data-processor-755797d6-gnthx         1/1     Running             0          19m
```

After a short period, the analytics pod transitions from ContainerCreating to Running.

## Conclusion

In this guide, we addressed two common issues that can lead to missing pods in a Kubernetes cluster:

1.  A resource quota that restricts the creation of new pods in a namespace.
2.  A missing dependency—in this case, a required service account.

> [!important]
> **Key Takeaways**
>
> - Check resource quotas imposed on the namespace if pods are not being created as expected.
> - Verify that all required service accounts and other dependencies are present.
> - Use "kubectl describe" to access detailed event logs and error messages.

By increasing the pod quota and creating the missing service account, the deployments functioned as intended, ensuring proper pod creation in the staging namespace.

For more in-depth Kubernetes troubleshooting, consider reviewing the [Kubernetes Documentation](https://kubernetes.io/docs/) for additional best practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/00b453ca-0b3e-43a5-93bf-7aadf635b190)**
>
> Watch video content
