# Deployments Update and Rollback - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-Concepts-Pods-ReplicaSets-Deployments/Deployments-Update-and-Rollback)

---

## Table of Contents

- Deployments Update and Rollback
  - Deployment Strategies
  - Updating a Deployment
  - Inspecting Deployment Details
  - Rolling Back a Deployment
  - Summary of Essential Commands
  - Watch Video
    - Method 1: Modify the Deployment Definition
    - Method 2: Update the Container Image Directly
    - Recreate Strategy Example
    - Rolling Update Strategy Example

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes Concepts Pods ReplicaSets Deployments

# Deployments Update and Rollback

Welcome to this comprehensive guide on managing deployments in Kubernetes. In this article, we explore how to update your application versions and safely roll back changes using Kubernetes deployment strategies.

When you create a deployment for the first time, Kubernetes automatically triggers a rollout, creating a new deployment revision (revision one). Later, if you update your application—for example, by changing the container image version—a new rollout generates another deployment revision (revision two). This revision history enables you to track changes and easily revert to a previous version if necessary.

For example, the diagram below illustrates a rollout with two revisions using different nginx versions (1.7.0 and 1.7.1):

![The image illustrates rollout and versioning with two revisions of nginx versions 1.7.0 and 1.7.1, each represented by icons.](https://kodekloud.com/kk-media/image/upload/v1752884854/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Deployments-Update-and-Rollback/frame_40.jpg)

To check the status of a rollout, execute the following command:

```
> kubectl rollout status deployment/myapp-deployment
Waiting for rollout to finish: 0 of 10 updated replicas are available...
Waiting for rollout to finish: 1 of 10 updated replicas are available...
Waiting for rollout to finish: 2 of 10 updated replicas are available...
Waiting for rollout to finish: 3 of 10 updated replicas are available...
Waiting for rollout to finish: 4 of 10 updated replicas are available...
Waiting for rollout to finish: 5 of 10 updated replicas are available...
Waiting for rollout to finish: 6 of 10 updated replicas are available...
Waiting for rollout to finish: 7 of 10 updated replicas are available...
Waiting for rollout to finish: 8 of 10 updated replicas are available...
Waiting for rollout to finish: 9 of 10 updated replicas are available...
deployment "myapp-deployment" successfully rolled out
```

You can also view the rollout history with:

```
> kubectl rollout history deployment/myapp-deployment
```

## Deployment Strategies

There are two primary deployment strategies in Kubernetes:

1.  **Recreate Strategy:**  
    In this method, when you have multiple replicas (such as five instances of your application), all existing instances are terminated before the new instances are deployed. This approach, while straightforward, causes downtime between shutting down the old pods and starting the new ones.

    The following diagram demonstrates the recreate strategy:

    ![The image illustrates a deployment strategy, showing the transition from nginx version 1.7.0 to 1.7.1, with red arrows indicating removal and green arrows indicating deployment.](https://kodekloud.com/kk-media/image/upload/v1752884855/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Deployments-Update-and-Rollback/frame_100.jpg)

2.  **Rolling Update Strategy:**  
    Here, the new version gradually replaces the old version without impacting application availability. Kubernetes incrementally scales up the new pods while scaling down the old ones. The diagram below depicts this seamless transition:

    ![The image illustrates a deployment strategy showing a transition from nginx version 1.7.0 to 1.7.1, with an application downtime indicated during the process.](https://kodekloud.com/kk-media/image/upload/v1752884856/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Deployments-Update-and-Rollback/frame_130.jpg)

If no strategy is specified, Kubernetes defaults to the rolling update strategy. The diagram below summarizes both "Recreate" and "Rolling Update" strategies:

![The image illustrates two deployment strategies, "Recreate" and "Rolling Update," showing the transition from nginx:1.7.0 to nginx:1.7.1, with application downtime in "Recreate."](https://kodekloud.com/kk-media/image/upload/v1752884857/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Deployments-Update-and-Rollback/frame_150.jpg)

## Updating a Deployment

Updating a deployment can involve modifying the Docker container image, changing labels, or adjusting the number of replicas. You have two methods to update a deployment:

### Method 1: Modify the Deployment Definition

Update your deployment YAML file (for example, `deployment-definition.yml`) by modifying parameters like the container image version. An updated example might look like this:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    app: myapp
    type: front-end
spec:
  replicas: 3
  selector:
    matchLabels:
      type: front-end
  template:
    metadata:
      name: myapp-pod
      labels:
        app: myapp
        type: front-end
    spec:
      containers:
      - name: nginx-container
        image: nginx:1.7.1
```

After saving the file, apply the changes using:

```
kubectl apply -f deployment-definition.yml
```

This command triggers a new rollout and generates a new deployment revision.

### Method 2: Update the Container Image Directly

If you want to quickly update the container image without changing the rest of the configuration, use:

```
kubectl set image deployment/myapp-deployment nginx-container=nginx:1.9.1
```

> [!important]
> **Note**
>
> Keep in mind that updating the image directly can lead to a mismatch with your deployment definition file. It is advisable to update and track changes consistently within your deployment YAML file.

## Inspecting Deployment Details

To understand how your rollout strategy is functioning, use:

```
kubectl describe deployment myapp-deployment
```

### Recreate Strategy Example

When using the recreate strategy, you may see entries showing that the old ReplicaSet is scaled down to zero before the new ReplicaSet is scaled up. For example:

```
Name:                   myapp-deployment
Namespace:              default
CreationTimestamp:      Sat, 03 Mar 2018 17:01:55 +0000
Labels:                 app=myapp
Annotations:            kubectl.kubernetes.io/revision=2
                        kubernetes.io/change-cause=kubectl apply --filename=...
Selector:               5 updated, 5 total | 5 available | 0 unavailable
StrategyType:          Recreate
Pod Template:
  Labels:              app=myapp
  Annotations:        nginx-container:
                      Image: nginx:1.7.1
                      Port: <none>
                      Environment: <none>
                      Mounts: <none>
Conditions:
  Type           Status  Reason
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:   <none>
NewReplicaSet:    myapp-deployment-54c7d6ccc (5/5 replicas created)
Events:
  Type    Reason             Age   From                  Message
  Normal  ScalingReplicaSet  11m   deployment-controller Scaled up replica set myapp-deployment-6795844b58 to 5
  Normal  ScalingReplicaSet  1m    deployment-controller Scaled down replica set myapp-deployment-6795844b58 to 0
  Normal  ScalingReplicaSet  56s   deployment-controller Scaled up replica set myapp-deployment-54c7d6ccc to 5
```

### Rolling Update Strategy Example

For the rolling update strategy, the output indicates a gradual scaling of the old and new ReplicaSets:

```
Name:                   myapp-deployment
Namespace:              default
CreationTimestamp:      Sat, 03 Mar 2018 17:16:53 +0800
Labels:                 app=myapp
Annotations:            kubectl.kubernetes.io/revision=2
                        kubectl.kubernetes.io/change-cause=kubectl apply --filename=...
Selector:               5 updated | 6 total | 4 available | 2 unavailable
StrategyType:          RollingUpdate
MinReadySeconds:       0
RollingUpdateStrategy: 25% max unavailable, 25% max surge
Pod Template:
  Labels:              app=myapp
  Annotations:        nginx-container:
                      Image: nginx
                      Port: <none>
                      Environment: <none>
                      Mounts: <none>
Conditions:
  Type           Status  Reason
  Available      True    MinimumReplicasAvailable
  Progressing    True    ReplicaSetUpdated
OldReplicaSet:     myapp-deployment-67c749c58c (1/1 replicas created)
NewReplicaSet:     myapp-deployment-75d7bdbd8d (5/5 replicas created)
Events:
  Type    Reason             Age   From                  Message
  Normal  ScalingReplicaSet  1m    deployment-controller Scaled up replica set myapp-deployment-67c749c58c to 5
  Normal  ScalingReplicaSet  15s   deployment-controller Scaled down replica set myapp-deployment-67c749c58c to 4
  Normal  ScalingReplicaSet  0s    deployment-controller Scaled up replica set myapp-deployment-75d7bdbd8d to 3
  Normal  ScalingReplicaSet  0s    deployment-controller Scaled down replica set myapp-deployment-67c749c58c to 3
  Normal  ScalingReplicaSet  0s    deployment-controller Scaled down replica set myapp-deployment-75d7bdbd8d to 0
  Normal  ScalingReplicaSet  0s    deployment-controller Scaled down replica set myapp-deployment-67c749c58c to 0
```

For further clarity, here are two more examples that detail the output for both strategies:

_Recreate Strategy Example:_

```
C:\Kubernetes>kubectl describe deployment myapp-deployment
Name:                   myapp-deployment
Namespace:              default
CreationTimestamp:      Sat, 03 Mar 2018 17:01:55 +0000
Labels:                 app=myapp
Annotations:            deployment.kubernetes.io/revision=2
                        kubectl.kubernetes.io/change-cause=kubectl apply --filename=...
Selector:               5 desired, 1 updated | 5 total | 5 available | 0 unavailable
StrategyType:          Recreate
MinReadySeconds:       0
Pod Template:
  Labels:    app=myapp
  Type:      front-end
  Containers:
    nginx-container:
      Image:   nginx:1.7.1
      Port:    <none>
      Environment: <none>
      Mounts:  <none>
  Volumes:   <none>
Conditions:
  Type          Status  Reason
  Available     True    MinimumReplicasAvailable
  Progressing   True    NewReplicaSetAvailable
OldReplicaSets: <none>
NewReplicaSet: myapp-deployment-54c7d6ccc (5/5 replicas created)
Events:
  Type    Reason             Age   From                    Message
  Normal  ScalingReplicaSet  11m   deployment-controller   Scaled up replica set myapp-deployment-6795844b58 to 5
  Normal  ScalingReplicaSet  1m    deployment-controller   Scaled down replica set myapp-deployment-6795844b58 to 0
  Normal  ScalingReplicaSet  56s   deployment-controller   Scaled up replica set myapp-deployment-54c7d6ccc to 5
```

_Rolling Update Strategy Example:_

```
C:\Kubernetes>kubectl describe deployment myapp-deployment
Name:                   myapp-deployment
Namespace:              default
CreationTimestamp:      Sat, 03 Mar 2018 17:16:53 +0800
Labels:                 app=myapp
Annotations:            deployment.kubernetes.io/revision=2
                        kubectl.kubernetes.io/change-cause=kubectl apply --filename=...
Selector:               5 desired, 1 updated | 6 total | 4 available | 2 unavailable
StrategyType:          RollingUpdate
MinReadySeconds:       0
RollingUpdateStrategy: 25% max unavailable, 25% max surge
Pod Template:
  Labels:    app=myapp
  Type:      front-end
  Containers:
    nginx-container:
      Image:   nginx
      Port:    <none>
      Environment: <none>
      Mounts:  <none>
  Volumes:   <none>
Conditions:
  Type          Status  Reason
  Available     True    MinimumReplicasAvailable
  Progressing   True    ReplicaSetUpdated
OldReplicaSet: myapp-deployment-67c749c58c (1/1 replicas created)
NewReplicaSet: myapp-deployment-75d7bdbd8d (5/5 replicas created)
Events:
  Type    Reason             Age   From                    Message
  Normal  ScalingReplicaSet  1m    deployment-controller   Scaled up replica set myapp-deployment-67c749c58c to 5
  Normal  ScalingReplicaSet  1m    deployment-controller   Scaled down replica set myapp-deployment-75d7bdbd8d to 2
  Normal  ScalingReplicaSet  0s    deployment-controller   Scaled up replica set myapp-deployment-67c749c58c to 4
  Normal  ScalingReplicaSet  0s    deployment-controller   Scaled down replica set myapp-deployment-75d7bdbd8d to 3
  Normal  ScalingReplicaSet  0s    deployment-controller   Scaled up replica set myapp-deployment-67c749c58c to 3
  Normal  ScalingReplicaSet  0s    deployment-controller   Scaled down replica set myapp-deployment-75d7bdbd8d to 2
```

When a deployment is created with multiple replicas (for example, five), Kubernetes automatically generates a ReplicaSet that manages pod creation. During an upgrade, a new ReplicaSet is created with the updated configuration while the old ReplicaSet gradually scales down. You can monitor these changes by listing the ReplicaSets:

![The image illustrates a Kubernetes deployment upgrade with two replica sets, each containing multiple pods.](https://kodekloud.com/kk-media/image/upload/v1752884859/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Deployments-Update-and-Rollback/frame_300.jpg)

## Rolling Back a Deployment

If issues are detected with the new version after an upgrade, Kubernetes makes it simple to roll back to a previous working deployment. Execute the following command to undo the latest rollout:

```
kubectl rollout undo deployment/myapp-deployment
```

This command stops the new ReplicaSet, scales down its pods, and scales up the pods from the previous ReplicaSet. Verify the rollback by comparing the output of `kubectl get replicasets` before and after the command.

Before the rollback, the output may appear similar to:

```
> kubectl get replicasets
NAME                             DESIRED   CURRENT   READY   AGE
myapp-deployment-67c749c58c     0         0         0       22m
myapp-deployment-7d57dbd8d      5         5         5       20m
```

After executing the rollback, the ReplicaSets will reverse their roles:

```
> kubectl get replicasets
NAME                             DESIRED   CURRENT   READY   AGE
myapp-deployment-67c749c58c     5         5         5       22m
myapp-deployment-7d57dbd8d      0         0         0       20m
```

The confirmation message will confirm the rollback:

```
deployment "myapp-deployment" rolled back
```

> [!important]
> **Warning**
>
> Always verify your ReplicaSet status after a rollback to ensure that the correct version is deployed and that the scale-up process is complete.

## Summary of Essential Commands

Below is a table summarizing key commands for managing deployments in Kubernetes:

| Command                                                                     | Description                                                 |
| --------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `kubectl create -f deployment-definition.yml`                               | Create a new deployment from the YAML definition            |
| `kubectl get deployments`                                                   | List all deployments                                        |
| `kubectl apply -f deployment-definition.yml`                                | Apply updates to the deployment from the YAML file          |
| `kubectl set image deployment/myapp-deployment nginx-container=nginx:1.9.1` | Update the image for a specific container in the deployment |
| `kubectl rollout status deployment/myapp-deployment`                        | Check the status of the rollout                             |
| `kubectl rollout undo deployment/myapp-deployment`                          | Roll back to the previous deployment revision               |

These commands enable you to create, update, monitor, and roll back deployments effectively.

This concludes our article on updating and rolling back Kubernetes deployments. For more detailed documentation, refer to the official [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/0919dae3-bc94-479f-b205-d52156817c98/lesson/6d1acf21-63fc-4d68-97d5-e6392803c5e7)**
>
> Watch video content
