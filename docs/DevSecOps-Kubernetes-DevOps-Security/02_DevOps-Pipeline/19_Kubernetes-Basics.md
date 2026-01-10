# Kubernetes Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevOps-Pipeline/Kubernetes-Basics)

---

## Table of Contents

- Kubernetes Basics
  - Why Use Kubernetes?
  - Core Resource Types
  - Pod
  - ReplicaSet
  - Deployment
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevOps Pipeline

# Kubernetes Basics

Kubernetes is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications. In this lesson, you'll learn the core Kubernetes objects—Pods, ReplicaSets, and Deployments—and see how they work together in a cluster.

## Why Use Kubernetes?

Key advantages of Kubernetes:

- **Self-Healing:** Automatically restarts or replaces failed containers.
- **Automated Rollouts & Rollbacks:** Gradually roll out changes and roll back if there’s an issue.
- **Efficient Scheduling:** Optimizes placement of containers based on resource requirements.
- **Built-In Load Balancing:** Distributes traffic across containers to ensure reliability.
- **Service Discovery & DNS Management:** Simplifies communication between microservices.

## Core Resource Types

| Resource Type | Purpose                                                       | Example Command                                       |
| ------------- | ------------------------------------------------------------- | ----------------------------------------------------- |
| Pod           | Smallest deployable unit, encapsulates one or more containers | `kubectl run nginx-pod --image=nginx --restart=Never` |
| ReplicaSet    | Maintains a stable set of pod replicas                        | `kubectl apply -f replicaset.yaml`                    |
| Deployment    | Declarative updates for pods and ReplicaSets                  | `kubectl apply -f deployment.yaml`                    |

## Pod

A **Pod** is the basic building block in Kubernetes. It represents one or more containers that share storage, network, and a specification for how to run the containers.

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: frontend
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
```

Apply this manifest:

```
kubectl apply -f pod.yaml
```

> [!important]
> **Note**
>
> Pods are ephemeral. When a Pod dies, it won't be recreated unless managed by a higher-level controller (e.g., ReplicaSet).

## ReplicaSet

A **ReplicaSet** ensures a specified number of pod replicas are running at all times. It will create or delete Pods to match the desired replica count.

```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: frontend-rs
  labels:
    app: frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

Deploy the ReplicaSet:

```
kubectl apply -f replicaset.yaml
```

Use the following command to verify:

```
kubectl get rs
```

## Deployment

A **Deployment** provides declarative updates for Pods and ReplicaSets. You can easily roll out new versions, pause, or roll back to a previous state without downtime.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deploy
  labels:
    app: frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

Apply and inspect resources:

```
kubectl apply -f deployment.yaml
kubectl get pod,deploy,rs
```

Sample output:

```
NAME                                     READY   STATUS    RESTARTS   AGE
pod/frontend-deploy-6bcf78fb7-mdd5j     1/1     Running   0          43s
pod/frontend-deploy-6bcf78fb7-xsdm6     1/1     Running   0          43s

NAME                              READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/frontend-deploy   2/2     2            2           43s

NAME                                       READY   AGE
replicaset.apps/frontend-deploy-6bcf78fb7  2/2     43s
```

> [!important]
> **Warning**
>
> Always specify `selector.matchLabels` correctly in your Deployment to avoid orphaned ReplicaSets.

## Next Steps

In upcoming lessons, we'll integrate these Kubernetes resources into a CI/CD pipeline using Jenkins and explore advanced topics such as Services, ConfigMaps, and Secrets.

## Links and References

- [Kubernetes Concepts](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- [ReplicaSet Documentation](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)
- [Deployment Documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/a02c6427-e202-4307-989b-5d70cd252683)**
>
> Watch video content
