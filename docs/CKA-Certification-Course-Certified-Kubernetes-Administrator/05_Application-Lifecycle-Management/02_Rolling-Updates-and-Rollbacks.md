# Rolling Updates and Rollbacks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Rolling-Updates-and-Rollbacks)

---

## Table of Contents

- Rolling Updates and Rollbacks
  - Understanding Rollouts and Versioning
  - Deployment Strategies
  - Updating a Deployment
  - Viewing Deployment Details
  - Upgrading and Rolling Back
  - Summary of Commands
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Application Lifecycle Management

# Rolling Updates and Rollbacks

Welcome to this guide on managing updates and rollbacks in Kubernetes deployments. In this article, we explore key concepts such as rollouts, versioning, and various deployment strategies. We also provide practical commands to update your deployments with minimal downtime and to revert changes when necessary.

> [!important]
> **Overview**
>
> This article covers the process of monitoring deployment rollouts, updating container images, and performing rollbacks using Kubernetes commands.

## Understanding Rollouts and Versioning

When you create a deployment, Kubernetes initiates a rollout that establishes the first deployment revision (revision one). Later, when you update your application—say by changing the container image version—Kubernetes triggers another rollout, creating a new revision (revision two). These revisions help you track changes and enable rollbacks to previous versions if issues arise.

![The image illustrates rollout and versioning with two revisions of nginx:1.7.0 and nginx:1.7.1, each containing multiple instances.](https://kodekloud.com/kk-media/image/upload/v1752869667/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Rolling-Updates-and-Rollbacks/frame_40.jpg)

To monitor and review these rollouts, you can use the following commands:

Check the rollout status:

```
kubectl rollout status deployment/myapp-deployment
```

View the history of rollouts:

```
kubectl rollout history deployment/myapp-deployment
```

## Deployment Strategies

There are different strategies to update your applications. For example, consider a scenario where your web application is running five replicas.

One approach is the "recreate" strategy, which involves shutting down all existing instances before deploying new ones. However, this method results in temporary downtime as the application becomes inaccessible during the update.

![The image illustrates a deployment strategy showing a transition from nginx version 1.7.0 to 1.7.1, with an application downtime during the process.](https://kodekloud.com/kk-media/image/upload/v1752869668/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Rolling-Updates-and-Rollbacks/frame_120.jpg)

A more seamless approach is the "rolling update" strategy. Here, instances are updated one at a time, ensuring continuous application availability throughout the process.

![The image illustrates two deployment strategies: "Recreate" and "Rolling Update," showing the transition from nginx version 1.7.0 to 1.7.1, with application downtime in "Recreate."](https://kodekloud.com/kk-media/image/upload/v1752869670/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Rolling-Updates-and-Rollbacks/frame_140.jpg)

If no strategy is specified when creating a deployment, Kubernetes uses the rolling update strategy by default.

## Updating a Deployment

There are several methods to update your deployment, such as adjusting the container image version, modifying labels, or changing the replica count. A common practice is to update your deployment definition file and then apply the changes.

For example, consider the following deployment definition:

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

After updating the file, apply the changes:

```
kubectl apply -f deployment-definition.yml
```

This action triggers a new rollout and creates a new deployment revision.

Alternatively, you can update the container image directly using the following command:

```
kubectl set image deployment/myapp-deployment nginx-container=nginx:1.9.1
```

> [!important]
> **Important**
>
> Remember, using `kubectl set image` updates the running deployment but does not modify your deployment definition file. Ensure you update the file as well for future reference.

## Viewing Deployment Details

To retrieve detailed information about your deployment—including rollout strategy, scaling events, and more—use:

```
kubectl describe deployment myapp-deployment
```

This output shows different details depending on the strategy used:

- **Recreate Strategy:** Events indicate that the old ReplicaSet is scaled down to zero before scaling up the new ReplicaSet.
- **Rolling Update Strategy:** The old ReplicaSet is gradually scaled down while the new ReplicaSet scales up.

For example, a deployment with the recreate strategy might display the following events:

```
Name:                   myapp-deployment
Namespace:              default
CreationTimestamp:      Sat, 03 Mar 2018 17:01:55 +0000
Labels:                 app=myapp
Annotations:            deployment.kubernetes.io/revision=2
                        kubectl.kubernetes.io/change-cause=kubectl apply --filename=deployment-definition.yml
Selector:               5 desired, 1 updated, 5 total, 5 available, 0 unavailable
StrategyType:           Recreate
MinReadySeconds:        0
Pod Template:
  Labels:  app=myapp
           type=front-end
  Containers:
   nginx-container:
    Image:      nginx:1.7.1
    Port:       <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   myapp-deployment-54c7d6ccc (5/5 replicas created)
Events:
  Type    Reason             Age   From                    Message
  -----   ------             ----  ----                    -------
  Normal  ScalingReplicaSet  11m   deployment-controller  Scaled up replica set myapp-deployment-6795844b58 to 5
  Normal  ScalingReplicaSet  11m   deployment-controller  Scaled down replica set myapp-deployment-6795844b58 to 0
  Normal  ScalingReplicaSet  56s   deployment-controller  Scaled up replica set myapp-deployment-54c7d6ccc to 5
```

In contrast, a rolling update strategy output would reflect gradual scaling changes:

```
kubectl describe deployment myapp-deployment
```

```
Name:                   myapp-deployment
Namespace:              default
CreationTimestamp:      Sat, 03 Mar 2018 17:16:53 +0800
Labels:                 app=myapp
Annotations:            deployment.kubernetes.io/revision=2
                        kubectl.kubernetes.io/change-cause=kubectl apply --filename=deployment-definition.yml
Selector:               6 desired, 5 updated, 6 total, 4 available, 2 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=myapp
           type=front-end
  Containers:
   nginx-container:
    Image:      nginx
    Port:       <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    ReplicaSetUpdated
OldReplicaSets:   myapp-deployment-67c749c58c (1/1 replicas created)
NewReplicaSet:    myapp-deployment-75d7bdbd8d (5/5 replicas created)
Events:
  Type    Reason             Age   From                    Message
  -----   ------             ----  ----                    -------
  Normal  ScalingReplicaSet  1m    deployment-controller   Scaled up replica set myapp-deployment-67c749c58c to 5
  Normal  ScalingReplicaSet  1m    deployment-controller   Scaled down replica set myapp-deployment-75d7bdbd8d to 2
  Normal  ScalingReplicaSet  1m    deployment-controller   Scaled up replica set myapp-deployment-67c749c58c to 4
  Normal  ScalingReplicaSet  1m    deployment-controller   Scaled down replica set myapp-deployment-75d7bdbd8d to 3
  Normal  ScalingReplicaSet  0s    deployment-controller   Scaled down replica set myapp-deployment-75d7bdbd8d to 1
  Normal  ScalingReplicaSet  0s    deployment-controller   Scaled down replica set myapp-deployment-67c749c58c to 0
```

## Upgrading and Rolling Back

During an upgrade, Kubernetes creates a new ReplicaSet for the updated containers while the original ReplicaSet continues to run the old version. This rolling update process ensures that new pods replace the old ones gradually without causing downtime.

![The image illustrates a Kubernetes deployment with two replica sets, each containing multiple pods, labeled "Upgrades."](https://kodekloud.com/kk-media/image/upload/v1752869671/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Rolling-Updates-and-Rollbacks/frame_300.jpg)

If an issue is detected after an upgrade, you can revert to the previous version using the rollback feature. To perform a rollback, run:

```
kubectl rollout undo deployment/myapp-deployment
```

This command scales down the new ReplicaSet, restoring pods from the older ReplicaSet. Verify the state of ReplicaSets before and after a rollback with:

```
kubectl get replicasets
```

For example, before the rollback you might see:

```
NAME                                 DESIRED   CURRENT   READY   AGE
myapp-deployment-67c749c58c          0         0         0       22m
myapp-deployment-7d57dbd8d           5         5         5       20m
```

After executing the rollback command, the old ReplicaSet is restored while the new one is scaled down.

## Summary of Commands

Below is a quick reference table of the key commands discussed in this article:

| Command Description                               | Command                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------- |
| Create the deployment                             | kubectl create -f deployment-definition.yml                               |
| List existing deployments                         | kubectl get deployments                                                   |
| Update deployment from the YAML definition        | kubectl apply -f deployment-definition.yml                                |
| Update the container image with kubectl set image | kubectl set image deployment/myapp-deployment nginx-container=nginx:1.9.1 |
| Check the status of the rollout                   | kubectl rollout status deployment/myapp-deployment                        |
| Rollback to a previous deployment revision        | kubectl rollout undo deployment/myapp-deployment                          |

With these commands and strategies, you can manage your Kubernetes deployments confidently, ensuring minimal downtime and a reliable process for both updates and rollbacks.

For additional information, see the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/2ddcf79b-abb0-4aeb-ad0c-3d54c7b4fc64/lesson/d8aad7db-1779-46a7-8cf5-8c2a9cffe930)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/2ddcf79b-abb0-4aeb-ad0c-3d54c7b4fc64/lesson/83db36b1-b9db-43c4-a217-0b83cfba401c)**
>
> Practice lab
