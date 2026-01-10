# Deployments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Deployments)

---

## Table of Contents

- Deployments
  - Why Use a Deployment?
  - How Deployments Work
  - Resource Comparison
  - Writing a Deployment Manifest
  - Deploying and Inspecting Resources
  - Next Steps & References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Deployments

Kubernetes Deployments automate application upgrades, scaling, and self-healing in production environments. They enable rolling updates, controlled rollbacks, and pause/resume capabilities—all without downtime. In this guide, you’ll learn how Deployments manage ReplicaSets and Pods, define a Deployment manifest, and inspect your resources using `kubectl`.

## Why Use a Deployment?

- **Rolling Updates**: Replace pods one by one to avoid service interruption.
- **Rollbacks**: Instantly revert to a previous version if something goes wrong.
- **Pause & Resume**: Apply several changes as a batch and resume when ready.
- **Declarative Scaling**: Increase or decrease replicas in your manifest.

## How Deployments Work

A Deployment sits above ReplicaSets and Pods:

1.  **Pod**: The basic execution unit (one or more containers).
2.  **ReplicaSet**: Ensures a specified number of pod replicas run at any time.
3.  **Deployment**: Manages ReplicaSets and orchestrates updates, rollbacks, and scaling.

![The image illustrates a Kubernetes deployment structure, showing a deployment with multiple pods and a replica set, along with versioning and control icons.](https://kodekloud.com/kk-media/image/upload/v1752873996/notes-assets/images/Docker-Certified-Associate-Exam-Course-Deployments/kubernetes-deployment-pods-replica-set.jpg)

## Resource Comparison

| Resource Type | Purpose                                   | Example Command                               |
| ------------- | ----------------------------------------- | --------------------------------------------- |
| Pod           | Single instance of one or more containers | `kubectl run nginx --image=nginx`             |
| ReplicaSet    | Maintains desired pod replicas            | `kubectl create -f replicaset-definition.yml` |
| Deployment    | Declarative updates and rollbacks         | `kubectl apply -f deployment-definition.yml`  |

## Writing a Deployment Manifest

Create a YAML file (`deployment-definition.yml`) to declare your desired state:

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
      labels:
        app: myapp
        type: front-end
    spec:
      containers:
        - name: nginx-container
          image: nginx:latest
          ports:
            - containerPort: 80
```

- **apiVersion**: The API group (`apps/v1`).
- **kind**: Must be `Deployment`.
- **metadata**: Identifies the Deployment (`name` and `labels`).
- **spec.replicas**: Desired number of pods.
- **spec.selector**: Matches labels on pods.
- **spec.template**: Defines the pod spec, just like a ReplicaSet.

> [!important]
> **Note**
>
> Using `kubectl apply -f` is recommended for idempotent updates. It creates or updates resources based on your manifest.

## Deploying and Inspecting Resources

1.  **Create or update the Deployment**

    ```
    kubectl apply -f deployment-definition.yml
    ```

2.  **View Deployments**

    ```
    kubectl get deployments
    ```

    Example output:

    ```
    NAME              READY   UP-TO-DATE   AVAILABLE   AGE
    myapp-deployment  3/3     3            3           30s
    ```

3.  **List ReplicaSets**

    ```
    kubectl get rs
    ```

4.  **Check Pods**

    ```
    kubectl get pods
    ```

5.  **See All Resources**

    ```
    kubectl get all
    ```

> [!important]
> **Warning**
>
> If an update fails, rollback immediately:
>
> ```
> kubectl rollout undo deployment/myapp-deployment
> ```

## Next Steps & References

- Learn more about [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- Explore the [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- Official [Kubernetes Documentation](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/d31c12f3-afcb-46dd-b90b-0b0e8abd08d4)**
>
> Watch video content
