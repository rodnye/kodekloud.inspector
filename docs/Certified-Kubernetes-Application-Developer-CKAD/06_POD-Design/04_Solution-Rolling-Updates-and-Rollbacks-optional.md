# Solution Rolling Updates and Rollbacks optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/POD-Design/Solution-Rolling-Updates-and-Rollbacks-optional)

---

## Table of Contents

- Solution Rolling Updates and Rollbacks optional
  - Checking the Application Deployment
  - Q1: What Is the Current Color of the Web Application?
  - Q2: What Container Image Is Used to Deploy the Application?
  - Q3: What Is the Current Deployment Strategy?
  - Upgrading the Application to Version 2
  - Scaling Considerations During a Rollout
  - Changing the Deployment Strategy to Recreate
  - Upgrading the Application to Version 3
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

POD Design

# Solution Rolling Updates and Rollbacks optional

In this lesson, we explore rolling updates and rollbacks, with a focus on rolling updates. We will demonstrate how to verify your environment and update your application while ensuring minimal downtime. For simplicity, we use an alias (k) for kubectl. The alias is confirmed to be set with the following output:

```
kubectl [flags] [options]


Use "kubectl <command> --help" for more information about a given command.
Use "kubectl options" for a list of global command-line options (applies to all commands).


controlplane ~ ⬢ alias
alias k='kubectl'
alias kubectl='k3s kubectl'
alias vi='vim'


controlplane ~ ⬢ cl
```

## Checking the Application Deployment

We have deployed a simple web application. First, inspect the Pods:

```
controlplane ~ ⟩ k get pod
NAME                            READY   STATUS    RESTARTS   AGE
frontend-5c74c57d95-mkjgh      1/1     Running   0          48s
frontend-5c74c57d95-dkbjj      1/1     Running   0          48s
frontend-5c74c57d95-gk6xp      1/1     Running   0          48s
frontend-5c74c57d95-xpwbt      1/1     Running   0          48s
```

Then, check the Deployment details:

```
controlplane ~ ⟩ k get deploy
NAME       READY   UP-TO-DATE   AVAILABLE   AGE
frontend   4/4     4            4           55s


controlplane ~ ⟩
```

Wait for the application to be fully deployed. Once it is ready, open the provided web app portal in your browser. The application displays the message “hello, front end moment.”

## Q1: What Is the Current Color of the Web Application?

Recheck the Pods and Deployment information:

```
controlplane ~ ↗ k get pod
NAME                                     READY   STATUS    RESTARTS   AGE
frontend-5c74c57d95-nkgjh                1/1     Running   0          48s
frontend-5c74c57d95-dkbj1                 1/1     Running   0          48s
frontend-5c74c57d95-gk6xp                1/1     Running   0          48s
frontend-5c74c57d95-xpwbt                1/1     Running   0          48s


controlplane ~ ↗ k get deploy
NAME      READY   UP-TO-DATE   AVAILABLE   AGE
frontend  4/4     4            4           55s
```

After running a test script that sends multiple requests, the output confirms the application color is blue:

```
Hello, Application Version: v1 ; Color: blue OK
Hello, Application Version: v1 ; Color: blue OK
...
```

This script simulates multiple users accessing the web application, confirming that all responses return the blue color. Additionally, the deployment details confirm that four Pods have been created as expected.

## Q2: What Container Image Is Used to Deploy the Application?

To inspect the container image, first get the deployment details:

```
controlplane ~ ⟩ k get deploy
NAME      READY   UP-TO-DATE   AVAILABLE   AGE
frontend  4/4     4            4           2m41s


controlplane ~ ⟩ []
```

Then, describe the deployment to view the pod template:

```
controlplane ~ ⟩ k describe deploy frontend
Name:                   frontend
Namespace:              default
CreationTimestamp:      Sat, 16 Apr 2022 20:35:48 +0000
Labels:                 <none>
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               name=webapp
Replicas:               4 desired | 4 updated | 4 total | 4 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        20
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:    name=webapp
  Containers:
   simple-webapp:
      Image: kodekloud/web-app-color:v1
      Port: 8080/TCP
      Host Port: 0/TCP
      Environment: <none>
      Mounts: <none>
Conditions:
  Type              Status  Reason
  Available         True    MinimumReplicasAvailable
  Progressing       True    NewReplicaSetAvailable
OldReplicaSet:      <none>
NewReplicaSet:      frontend-5c74c57d95 (4/4 replicas created)
Events:
  Type    Reason            Age   From                      Message
  Normal  ScalingReplicaSet  3m4s  deployment-controller     Scaled up replica set frontend-5c74c57d95 to 4
controlplane ~ ⟩
```

The container image used is "kodekloud/web-app-color:v1".

## Q3: What Is the Current Deployment Strategy?

The deployment details show that a rolling update strategy is in use. With this strategy, Pods are replaced one at a time, ensuring continuous availability. Specifically, only 25% of Pods are allowed to be unavailable at any given moment, preventing complete downtime.

> [!important]
> **Note**
>
> A rolling update strategy allows gradual replacement of Pods to ensure that some instances are always available during an upgrade.

## Upgrading the Application to Version 2

To upgrade the application, update the image in the deployment to version 2 using the "kubectl set image" command. Our container name is "simple-webapp". Run the following command:

```
kubectl set image deploy frontend simple-webapp=kodekloud/webapp-color:v2
```

After executing the command, verify that the image has been updated by describing the deployment again. You should now see version v2 in the container image field.

Run the curl test (or your test script) again:

```
./curl-test.sh
```

The output may initially show a mix of blue and green responses:

```
Hello, Application Version: v1 ; Color: blue OK
Hello, Application Version: v2 ; Color: green OK
...
```

This indicates a gradual rollout where some Pods still run the older version (blue) and others have been updated (green). Eventually, all responses will reflect the new version.

## Scaling Considerations During a Rollout

With the current rolling update settings (25% max unavailable) and a deployment of 4 replicas, only one Pod is taken down at a time. The following command confirms these updates and settings:

```
controlplane ~ ✗ k set image deploy frontend simple-webapp=kodekloud/webapp-color:v2
deployment.apps/frontend image updated


controlplane ~ ✗ k describe deploy frontend
Name:                   frontend
Namespace:              default
CreationTimestamp:      Sat, 16 Apr 2022 20:35:48 +0000
...
Replicas:               4 desired | 2 updated | 5 total | 3 available | 2 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        20
RollingUpdateStrategy:  25% max unavailable, 25% max surge
...
```

## Changing the Deployment Strategy to Recreate

If you prefer to minimize complexities related to gradual updates, you can change the deployment strategy to "Recreate". This strategy terminates all running Pods before creating new ones. To update the deployment strategy, use `kubectl edit` on the deployment and modify the strategy section as shown below:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    deployment.kubernetes.io/revision: "2"
  creationTimestamp: "2022-04-16T20:35:48Z"
  generation: 2
  name: frontend
  namespace: default
  resourceVersion: "1053"
  uid: a8b0a6e3-1c54-47e6-9e4a-b037be079fab
spec:
  minReadySeconds: 20
  progressDeadlineSeconds: 600
  replicas: 4
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      name: webapp
  strategy:
    type: Recreate
  template:
    metadata:
      creationTimestamp: null
      labels:
        name: webapp
    spec:
      containers:
        - image: kodekloud/webapp-color:v2
          imagePullPolicy: IfNotPresent
          name: simple-webapp
      ports:
        - /tmp/kubectl-edit-2730099630.yaml 68L, 181B
```

After saving the changes, verify that the strategy has been updated to "Recreate". Note that the recreate strategy does not support rolling update parameters.

> [!important]
> **Warning**
>
> Switching to the "Recreate" strategy may cause temporary downtime since all Pods are terminated before new ones are created.

## Upgrading the Application to Version 3

Finally, upgrade the application by setting the deployment image to version 3:

```
kubectl set image deploy frontend simple-webapp=kodekloud/webapp-color:v3
```

Then, run your test script once again:

```
./curl-test.sh
```

Since the deployment strategy is now set to “Recreate”, you might experience a brief period of downtime with failed requests (e.g., "Failed" messages or "bad gateway" errors) during the Pod replacement process. Once the new Pods are running, the output should stabilize to:

```
Hello, Application Version: v3 ; Color: red OK
Hello, Application Version: v3 ; Color: red OK
...
```

This confirms that the new version (v3) displaying red is fully deployed.

That concludes the lesson on rolling updates and rollbacks.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/c44b5e7c-5854-4c65-87bf-7e07cb026e71/lesson/9019fdb8-e076-4a54-ac3f-8cf1f5d9ae26)**
>
> Watch video content
