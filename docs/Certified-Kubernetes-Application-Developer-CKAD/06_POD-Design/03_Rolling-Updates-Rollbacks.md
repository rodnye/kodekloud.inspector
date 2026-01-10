# Rolling Updates Rollbacks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/POD-Design/Rolling-Updates-Rollbacks)

---

## Table of Contents

- Rolling Updates Rollbacks
  - Deployment Strategies
  - Updating a Deployment
  - Examining Deployment Details
  - Understanding the Underlying Process
  - Quick Reference Summary
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

POD Design

# Rolling Updates Rollbacks

Welcome to this comprehensive guide on how updates and rollbacks work within a Kubernetes deployment. In this article, we will explore the concepts of rollouts, versioning, and deployment strategies, empowering you to manage application upgrades with minimal downtime.

When you create a deployment, Kubernetes triggers an initial rollout, creating the first deployment revision (revision one). Later, when you update your application—for example, by changing the container image version—a new rollout occurs and a new deployment revision (revision two) is generated. This mechanism enables tracking changes and facilitates rolling back to a previous stable version if needed.

![The image illustrates a rollout and versioning process, showing two revisions of nginx versions 1.7.0 and 1.7.1, with corresponding icons.](https://kodekloud.com/kk-media/image/upload/v1752871257/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Rolling-Updates-Rollbacks/frame_40.jpg)

> **Tip:** Use the following command to view the status of your rollout:

```
kubectl rollout status deployment/myapp-deployment
```

The command output will be similar to:

```
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

To review the revision history of your deployment, run:

```
kubectl rollout history deployment/myapp-deployment
```

## Deployment Strategies

Kubernetes supports two primary deployment strategies:

1.  **Recreate Strategy**

    With the recreate strategy, if you have, for example, five replicas, all replicas are terminated and then replaced with new ones running the updated version. The main drawback is potential downtime, as the application is temporarily unavailable.

2.  **Rolling Update Strategy**

    The rolling update strategy gradually replaces the old version with the new one by updating replicas one at a time. This ensures continuous application availability during the upgrade. Note that Kubernetes uses the rolling update strategy by default when no specific strategy is configured.

The diagram below visually compares the two strategies:

![The image illustrates two deployment strategies, "Recreate" and "Rolling Update," showing the transition from nginx:1.7.0 to nginx:1.7.1 with application downtime in "Recreate."](https://kodekloud.com/kk-media/image/upload/v1752871259/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Rolling-Updates-Rollbacks/frame_150.jpg)

## Updating a Deployment

There are multiple methods to update your deployment. You can update the container image version, modify labels, or adjust the number of replicas. If you are using a deployment definition file, simply modify the file and apply the update:

```
kubectl apply -f deployment-definition.yml
```

This triggers a new rollout and creates a new deployment revision.

Alternatively, update just the container image with:

```
kubectl set image deployment/myapp-deployment nginx=nginx:1.9.1
```

> **Caution:** Updating with `kubectl set image` modifies the running configuration, which may differ from the file-based configuration. Remember to update your deployment definition file accordingly.

Below is an example deployment definition file after updating the container image version:

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

## Examining Deployment Details

Describing your deployment provides insights into the underlying processes and differences between deployment strategies.

When using the recreate strategy, the old ReplicaSet scales down to zero before the new one scales up. Run:

```
kubectl describe deployment myapp-deployment
```

You might see output similar to:

```
Name:                   myapp-deployment
Namespace:              default
CreationTimestamp:      Sat, 03 Mar 2018 17:01:55 +0000
Labels:                 app=myapp
Annotations:            deployment.kubernetes.io/revision=2
                        kubectl.kubernetes.io/change-cause=kubectl apply --filename=.../Kubernetes/Demo
Selector:               5 updated, 5 total / 5 available / 0 unavailable
StrategyType:          Recreate
MinReadySeconds:       0
Pod Template:
  Labels:    app=myapp
             type=front-end
  Containers:
   nginx-container:
     Image:        nginx:1.7.1
     Port:         <none>
     Environment:  <none>
     Mounts:       <none>
  Volumes:     <none>
Conditions:
  Type         Status  Reason
  Available    True    MinimumReplicasAvailable
  Progressing  True    NewReplicaSetAvailable
OldReplicaSets:   <none>
NewReplicaSet:    myapp-deployment-54c76dccc (5/5 replicas created)
Events:
  Type    Reason             Age   From                  Message
  Normal  ScalingReplicaSet  11m   deployment-controller Scaled up replica set myapp-deployment-6795844b58 to 5
  Normal  ScalingReplicaSet  1m    deployment-controller Scaled down replica set myapp-deployment-6795844b58 to 0
  Normal  ScalingReplicaSet  56s   deployment-controller Scaled up replica set myapp-deployment-54c76dccc to 5
```

For the rolling update strategy, the output indicates that the old ReplicaSet reduces gradually as the new one scales up:

```
kubectl describe deployment myapp-deployment
```

This produces an output similar to:

```
Name:                   myapp-deployment
Namespace:              default
CreationTimestamp:      Sat, 03 Mar 2018 17:16:53 +0800
Labels:                 app=myapp
Annotations:            deployment.kubernetes.io/revision=2
                        kubectl.kubernetes.io/change-cause=kubectl apply --filename=.../Kubernetes/Demo
Selector:               5 desired | 5 updated | 6 total | 4 available | 2 unavailable
StrategyType:          RollingUpdate
MinReadySeconds:       0
RollingUpdateStrategy: 25% max unavailable, 25% max surge
Pod Template:
  Labels:    app=myapp
             type=front-end
  Containers:
   nginx-container:
     Image:        nginx
     Port:         <none>
     Environment:  <none>
     Mounts:       <none>
  Volumes:     <none>
Conditions:
  Type         Status  Reason
  Available    True    MinimumReplicasAvailable
  Progressing  True    ReplicaSetUpdated
OldReplicaSets:    myapp-deployment-67c749c58c (1/1 replicas created)
NewReplicaSet:     myapp-deployment-75d78bd8d (5/5 replicas created)
Events:
  Type    Reason             Age   From                  Message
  Normal  ScalingReplicaSet  1m    deployment-controller Scaled up replica set myapp-deployment-67c749c58c to 5
  Normal  ScalingReplicaSet  15s   deployment-controller Scaled down replica set myapp-deployment-67c749c58c to 4
  Normal  ScalingReplicaSet  0s    deployment-controller Scaled up replica set myapp-deployment-75d78bd8d to 3
  Normal  ScalingReplicaSet  0s    deployment-controller Scaled down replica set myapp-deployment-67c749c58c to 0
```

The rolling update strategy preserves application availability by gradually transitioning from the old to the new ReplicaSet.

## Understanding the Underlying Process

When you create a deployment (for example, with five replicas), Kubernetes automatically creates a ReplicaSet that manages the corresponding pods. During an upgrade, a new ReplicaSet is created for the updated configuration while the old ReplicaSet gradually terminates its pods. You can monitor these changes by running:

```
kubectl get replicasets
```

This command displays both the old ReplicaSet (with zero pods) and the new ReplicaSet with the desired number of pods. If issues arise with the new release, Kubernetes allows you to roll back to the previous revision.

To perform a rollback, use:

```
kubectl rollout undo deployment/myapp-deployment
```

This command terminates the pods in the new ReplicaSet and restores the previous stable version. Compare the ReplicaSet status before and after the rollback:

Before rollback:

```
kubectl get replicasets
NAME                        DESIRED   CURRENT   READY   AGE
myapp-deployment-67c749c58c  0         0         0       22m
myapp-deployment-7d57dbd8d   5         5         5       20m
```

After rollback:

```
kubectl get replicasets
NAME                        DESIRED   CURRENT   READY   AGE
myapp-deployment-67c749c58c  5         5         5       22m
myapp-deployment-7d57dbd8d   0         0         0       20m
```

When you run the undo command, you should see:

```
kubectl rollout undo deployment/myapp-deployment
```

```
deployment "myapp-deployment" rolled back
```

## Quick Reference Summary

Below is a summary of the key commands used to create, update, monitor, and roll back your deployments:

| Command                                                           | Description                                       |
| ----------------------------------------------------------------- | ------------------------------------------------- |
| `kubectl create -f deployment-definition.yml`                     | Create a new deployment                           |
| `kubectl get deployments`                                         | List current deployments                          |
| `kubectl apply -f deployment-definition.yml`                      | Apply changes from the deployment definition file |
| `kubectl set image deployment/myapp-deployment nginx=nginx:1.9.1` | Update a deployment's container image             |
| `kubectl rollout status deployment/myapp-deployment`              | Check the status of the deployment rollout        |
| `kubectl rollout undo deployment/myapp-deployment`                | Roll back to the previous deployment revision     |

By mastering both the recreate and rolling update strategies along with the associated commands, you can effectively manage your Kubernetes deployments and minimize downtime during application updates.

![The image illustrates a Kubernetes deployment upgrade, showing two replica sets with pods, indicating a transition from one set to another.](https://kodekloud.com/kk-media/image/upload/v1752871260/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Rolling-Updates-Rollbacks/frame_300.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/c44b5e7c-5854-4c65-87bf-7e07cb026e71/lesson/e345d998-2d41-477d-b388-1f34615504c8)**
>
> Watch video content
