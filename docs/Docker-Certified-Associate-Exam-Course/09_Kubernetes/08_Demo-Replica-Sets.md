# Demo Replica Sets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Demo-Replica-Sets)

---

## Table of Contents

- Demo Replica Sets
  - Directory Structure
  - 1. Defining the ReplicaSet
  - 2. Deploying the ReplicaSet
  - 3. ReplicaSet Self-Healing
  - 4. Preventing Extra Pods
  - 5. Scaling the ReplicaSet
  - Links and References
  - Watch Video
    - 5.1 Using kubectl edit
    - 5.2 Using kubectl scale

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Demo Replica Sets

In this guide, you’ll learn how to define, deploy, self-heal, and scale a Kubernetes ReplicaSet. A ReplicaSet ensures a specified number of Pod replicas are running at all times, providing high availability and fault tolerance.

## Directory Structure

Assuming your project root is named `Kubernetes-for-Beginners`, the layout might look like this:

```
Kubernetes-for-Beginners/
├── pods/
│   └── nginx.yaml
└── replicasets/
    └── replicaset.yaml
```

## 1\. Defining the ReplicaSet

Create the file `replicasets/replicaset.yaml`:

```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: myapp-replicaset
  labels:
    app: myapp
spec:
  selector:
    matchLabels:
      env: production
  replicas: 3
  template:
    metadata:
      name: nginx-2
      labels:
        env: production
    spec:
      containers:
        - name: nginx
          image: nginx
```

> [!important]
> **Note**
>
> The `selector.matchLabels` field must exactly match the labels under `template.metadata.labels`. The labels in `metadata.labels` on the ReplicaSet itself are not used for Pod selection.

For reference, here’s the original Pod definition in `pods/nginx.yaml`:

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx-2
  labels:
    env: production
spec:
  containers:
    - name: nginx
      image: nginx
```

## 2\. Deploying the ReplicaSet

From the project root, apply the ReplicaSet manifest:

```
cd replicasets
kubectl create -f replicaset.yaml
```

Verify the ReplicaSet and its Pods:

```
kubectl get replicaset
# NAME                DESIRED   CURRENT   READY   AGE
kubectl get pods
# NAME                         READY   STATUS    RESTARTS   AGE
# myapp-replicaset-8nxxl       1/1     Running   0          24s
# myapp-replicaset-jlgr2       1/1     Running   0          24s
# myapp-replicaset-pm4rl       1/1     Running   0          24s
```

| Command                    | Description                                   |
| -------------------------- | --------------------------------------------- |
| `kubectl create -f <file>` | Create resources from a manifest file         |
| `kubectl get replicaset`   | List all ReplicaSets in the current namespace |
| `kubectl get pods`         | List all Pods in the current namespace        |

## 3\. ReplicaSet Self-Healing

To observe self-healing, delete one of the Pods:

```
kubectl delete pod myapp-replicaset-8nxxl
```

After a few seconds, the ReplicaSet controller will recreate a replacement Pod:

```
kubectl get pods
# NAME                         READY   STATUS    RESTARTS   AGE
# myapp-replicaset-jlgr2       1/1     Running   0          45s
# myapp-replicaset-pm4rl       1/1     Running   0          45s
# myapp-replicaset-<new-id>    1/1     Running   0          15s
```

You can inspect events to confirm:

```
kubectl describe replicaset myapp-replicaset
```

Check the **Events** section for Pod creation and deletion entries.

## 4\. Preventing Extra Pods

If you manually create a Pod matching the ReplicaSet’s selector, the controller will delete it to maintain the desired count.

```
# pods/nginx.yaml (modified)
apiVersion: v1
kind: Pod
metadata:
  name: nginx-external
  labels:
    env: production
spec:
  containers:
    - name: nginx
      image: nginx
```

```
kubectl create -f ../pods/nginx.yaml
kubectl get pods
# NAME                         READY   STATUS        RESTARTS   AGE
# myapp-replicaset-...         1/1     Running       0          2m
# nginx-external               0/1     Terminating   0          5s
```

> [!important]
> **Warning**
>
> The ReplicaSet controller enforces the desired replica count by deleting any excess Pods that match its selector.

## 5\. Scaling the ReplicaSet

### 5.1 Using `kubectl edit`

```
kubectl edit replicaset myapp-replicaset
```

Locate the `spec.replicas` field and adjust it:

```
 spec:
-  replicas: 3
+  replicas: 4
```

Save and exit. Verify new Pod creation:

```
kubectl get pods
# myapp-replicaset-...   1/1   Running   0   6s
```

### 5.2 Using `kubectl scale`

```
kubectl scale replicaset myapp-replicaset --replicas=2
kubectl get pods
# NAME                         READY   STATUS    RESTARTS   AGE
# myapp-replicaset-jlgr2       1/1     Running   0          6m
# myapp-replicaset-pm4rl       1/1     Running   0          6m
```

Excess Pods beyond the new replica count are gracefully terminated.

---

## Links and References

- [Kubernetes ReplicaSet Concepts](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)
- [Kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Deployments vs ReplicaSets](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/972ebd7a-dbd7-488c-b8e2-b075a9ecbefd)**
>
> Watch video content
