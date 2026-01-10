# Deployments Update and Rollback - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Deployments-Update-and-Rollback)

---

## Table of Contents

- Deployments Update and Rollback
  - Rollouts and Versioning
  - Deployment Strategies
  - Applying Updates
  - Inspecting Deployment Details
  - Rolling Back
  - Creating a Deployment with kubectl run
  - Summary of Key Commands
  - References
  - Watch Video
    - Recreate
    - RollingUpdate (default)

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Deployments Update and Rollback

In Kubernetes, Deployments automate application updates, versioning, and rollbacks. This guide covers:

- How rollouts create revisions
- Deployment update strategies
- Applying and inspecting updates
- Undoing changes

## Rollouts and Versioning

Whenever you create or modify a Deployment, Kubernetes starts a new rollout, creating a revision:

![The image shows a diagram titled "Rollout and Versioning" with two revisions of Nginx versions, 1.7.0 and 1.7.1, represented by icons.](https://kodekloud.com/kk-media/image/upload/v1752873991/notes-assets/images/Docker-Certified-Associate-Exam-Course-Deployments-Update-and-Rollback/rollout-versioning-nginx-revisions.jpg)

To monitor your rollout and review history:

```
kubectl rollout status deployment/myapp-deployment
# Waiting for rollout to finish: 0 of 10 updated replicas are available...
# ...
kubectl rollout history deployment/myapp-deployment
# REVISION  CHANGE-CAUSE
# 1         initial create
# 2         updated image to nginx:1.7.1
```

> [!important]
> **Note**
>
> Use `kubectl rollout status` to ensure a smooth update before proceeding with any dependent tasks.

## Deployment Strategies

Kubernetes supports two primary update strategies:

### Recreate

This strategy terminates all existing Pods before creating new ones—resulting in downtime.

![The image illustrates a deployment strategy showing a transition from version 1.7.0 to 1.7.1 of nginx, with an application downtime indicated during the process.](https://kodekloud.com/kk-media/image/upload/v1752873992/notes-assets/images/Docker-Certified-Associate-Exam-Course-Deployments-Update-and-Rollback/nginx-deployment-strategy-1-7-0-to-1-7-1.jpg)

> [!important]
> **Warning**
>
> Recreate will interrupt service during the update. Use only when downtime is acceptable.

### RollingUpdate (default)

With RollingUpdate, old Pods are replaced incrementally, ensuring continuous availability.

![The image illustrates two deployment strategies: "Recreate," which results in application downtime, and "Rolling Update," which maintains application availability by updating instances incrementally.](https://kodekloud.com/kk-media/image/upload/v1752873994/notes-assets/images/Docker-Certified-Associate-Exam-Course-Deployments-Update-and-Rollback/deployment-strategies-recreate-rolling-update.jpg)

If you omit a strategy in your `Deployment` spec, RollingUpdate applies by default.

## Applying Updates

You can update a Deployment by editing its YAML or using `kubectl set image`.

deployment.yaml:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    app: myapp
    tier: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      tier: frontend
  template:
    metadata:
      labels:
        app: myapp
        tier: frontend
    spec:
      containers:
        - name: nginx-container
          image: nginx:1.7.0
```

Apply the manifest:

```
kubectl apply -f deployment.yaml
# deployment "myapp-deployment" configured
```

Or update the image directly:

```
kubectl set image deployment/myapp-deployment \
  nginx-container=nginx:1.9.1
# deployment "myapp-deployment" image updated
```

Each change creates a new revision and triggers a rollout.

## Inspecting Deployment Details

To see strategy settings, ReplicaSet events, and scaling details:

```
kubectl describe deployment myapp-deployment
```

Example for **Recreate**:

```
Name:                   myapp-deployment
StrategyType:           Recreate
Replicas:               5 desired | 5 total | 5 available
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  11m   deployment-controller  Scaled up replica set myapp-deployment-6795… to 5
```

Example for **RollingUpdate**:

```
Name:                   myapp-deployment
StrategyType:           RollingUpdate
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Replicas:               5 desired | 6 total | 4 available | 2 unavailable
Events:
  Type    Reason             Age  From                   Message
  ----    ------             ---- ----                   -------
  Normal  ScalingReplicaSet  1m   deployment-controller  Scaled up replica set myapp-deployment-67c7… to 5
```

Under the hood, each Deployment manages ReplicaSets:

![The image is a diagram illustrating a Kubernetes deployment with two replica sets. Replica Set 1 contains five pods, while Replica Set 2 is empty.](https://kodekloud.com/kk-media/image/upload/v1752873995/notes-assets/images/Docker-Certified-Associate-Exam-Course-Deployments-Update-and-Rollback/kubernetes-deployment-replica-sets-diagram.jpg)

List ReplicaSets:

```
kubectl get replicasets
# NAME                         DESIRED CURRENT READY AGE
# myapp-deployment-67c749c58c  0       0       0     22m
# myapp-deployment-75d7bdbd8d  5       5       5     20m
```

## Rolling Back

To revert a faulty rollout:

```
kubectl rollout undo deployment/myapp-deployment
# deployment "myapp-deployment" rolled back
```

After rollback, ReplicaSet counts swap:

```
kubectl get replicasets
# NAME                         DESIRED CURRENT READY AGE
# myapp-deployment-67c749c58c  5       5       5     22m
# myapp-deployment-75d7bdbd8d  0       0       0     20m
```

## Creating a Deployment with `kubectl run`

Although `kubectl run nginx --image=nginx` creates a Deployment by default:

```
kubectl run nginx --image=nginx
# deployment "nginx" created
```

> [!important]
> **Note**
>
> Using manifest files ensures version control, repeatability, and easier collaboration.

## Summary of Key Commands

| Command                          | Description                                  |
| -------------------------------- | -------------------------------------------- |
| kubectl create deployment        | Create a new Deployment                      |
| kubectl get deployments          | List Deployments                             |
| kubectl apply -f deployment.yaml | Apply or update a Deployment manifest        |
| kubectl set image                | Update container image in a Deployment       |
| kubectl rollout status           | Monitor rollout progress                     |
| kubectl rollout history          | View revision history                        |
| kubectl rollout undo             | Roll back to the previous revision           |
| kubectl describe deployment      | Show detailed Deployment settings and events |

## References

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/b17579bc-b0dc-45f5-af0c-38781ca2779d)**
>
> Watch video content
