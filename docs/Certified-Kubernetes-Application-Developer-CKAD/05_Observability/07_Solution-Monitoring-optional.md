# Solution Monitoring optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Observability/Solution-Monitoring-optional)

---

## Table of Contents

- Solution Monitoring optional
  - Inspecting Deployed Pods
  - Deploying the Metrics Server
  - Verifying Metrics Collection
  - Analyzing Resource Consumption
  - Recap
  - Watch Video
    - Step 1: Clone the Repository
    - Step 2: Review the Repository Contents
    - Step 3: Deploy the Metrics Server
    - Check Node Resource Utilization
    - Check Pod Resource Utilization
    - Node Resource Analysis
    - Pod Resource Analysis
    - Final Verification

---

## Content

Certified Kubernetes Application Developer - CKAD

Observability

# Solution Monitoring optional

In this lesson, you will learn how to monitor your Kubernetes cluster by inspecting deployed Pods and deploying a metrics server to track resource usage.

---

## Inspecting Deployed Pods

Begin by verifying the running Pods in your cluster. Execute the following command:

```
kubectl get pods
```

You should see output similar to the following:

```
NAME       READY   STATUS              RESTARTS   AGE
elephant   1/1     Running             0          20s
lion       1/1     Running             0          20s
rabbit     0/1     ContainerCreating   0          20s
```

At this point, the "elephant" and "lion" Pods are running, while "rabbit" is still initializing.

---

## Deploying the Metrics Server

To monitor resource usage, you'll deploy the metrics server. This lab uses a preconfigured Git repository containing all the necessary configurations.

> [!important]
> **Note**
>
> Do not use these configurations in a production environment. Always refer to the official documentation before deploying to production.

### Step 1: Clone the Repository

Clone the repository by running:

```
git clone https://github.com/kodekloudhub/kubernetes-metrics-server.git
```

After cloning, you should see output similar to this:

```
Cloning into 'kubernetes-metrics-server'...
remote: Enumerating objects: 24, done.
remote: Counting objects: 100% (12/12), done.
remote: Compressing objects: 100% (12/12), done.
remote: Total 24 (delta 4), reused 0 (delta 0), pack-reused 12
Unpacking objects: 100% (24/24), done.
```

### Step 2: Review the Repository Contents

First, check the directory structure:

```
ls
```

You should see a directory named `kubernetes-metrics-server` and possibly a file like `sample.yaml`. Next, navigate into the repository directory and list its files:

```
cd kubernetes-metrics-server/
ls
```

You will find key configuration files such as:

- README.md
- aggregated-metrics-reader.yaml
- auth-delegator.yaml
- metrics-server-deployment.yaml
- metrics-server-service.yaml
- resource-reader.yaml (if present)

### Step 3: Deploy the Metrics Server

Deploy the metrics server by creating all required objects with the following command:

```
kubectl create -f .
```

You should see output indicating that roles, role bindings, deployments, and services have been created successfully:

```
clusterrole.rbac.authorization.k8s.io/system:aggregated-metrics-reader created
clusterrole.rbac.authorization.k8s.io/system:metrics-server:system:auth-delegator created
clusterrole.rbac.authorization.k8s.io/system:metrics-server:auth-reader created
clusterrole.apiresources.k8s.io created
deployment.apps/metrics-server created
service/metrics-server created
clusterrolebinding.rbac.authorization.k8s.io/system:metrics-server created
```

![The image shows a GitHub repository for "kubernetes-metrics-server" with files, commit history, and contributor information, intended for development and learning environments.](https://kodekloud.com/kk-media/image/upload/v1752871249/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Solution-Monitoring-optional/frame_70.jpg)

It may take a few minutes for the metrics server to start gathering and reporting data. Verify this by listing the Pods again:

```
kubectl get pods
```

---

## Verifying Metrics Collection

After deployment, you can view resource usage by using the `kubectl top` commands.

### Check Node Resource Utilization

Run the following command:

```
kubectl top node
```

Expected output:

```
NAME         CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
controlplane 470m         1%     1252Mi          0%
node01       57m          0%     349Mi           0%
```

### Check Pod Resource Utilization

To view the resource allocation for each Pod, execute:

```
kubectl top pod
```

Expected output:

```
NAME       CPU(cores)   MEMORY(bytes)
elephant   20m          32Mi
lion       1m           18Mi
rabbit     131m         252Mi
```

---

## Analyzing Resource Consumption

Use the collected metrics to identify resource usage by both nodes and Pods.

### Node Resource Analysis

1.  **Identifying the Node with the Highest CPU Consumption**

    From the `kubectl top node` output, the "controlplane" node shows a CPU usage of approximately 470 milli cores, which is significantly higher than node01's 57 milli cores.

    **Answer:** The controlplane node consumes the most CPU.

2.  **Identifying the Node with the Highest Memory Consumption**

    The controlplane node also consumes 1252Mi of memory compared to node01's 349Mi.

    **Answer:** The controlplane node consumes the most memory.

### Pod Resource Analysis

1.  **Identifying the Pod with the Highest Memory Consumption**

    The "rabbit" Pod consumes 252Mi of memory, which is higher than the other two Pods.

    **Answer:** The "rabbit" Pod consumes the most memory.

2.  **Identifying the Pod with the Lowest CPU Consumption**

    The "lion" Pod uses only 1m of CPU, making it the least resource-intensive among the Pods.

    **Answer:** The "lion" Pod consumes the least CPU.

---

## Recap

In this lesson, you performed the following steps:

- Inspected running Pods using the `kubectl get pods` command.
- Cloned and explored a preconfigured metrics server repository.
- Deployed the metrics server using `kubectl create -f .`.
- Verified node and Pod resource usage utilizing the `kubectl top` commands.
- Analyzed resource consumption to identify which nodes and Pods were consuming the most or least CPU and memory.

### Final Verification

Run the following commands one more time to confirm metrics collection:

```
kubectl top node
```

Expected output:

```
NAME           CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
controlplane   470m         1%     1252Mi          0%
node01         57m          0%     349Mi           0%
```

```
kubectl top pod
```

Expected output:

```
NAME        CPU(cores)   MEMORY(bytes)
elephant    20m          32Mi
lion        1m           18Mi
rabbit      131m         252Mi
```

This concludes the lesson on monitoring cluster components using the metrics server. For additional Kubernetes monitoring resources, consider visiting the [Kubernetes Documentation](https://kubernetes.io/docs/).

Happy monitoring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/d79d0450-406f-43ef-91ae-2f0c9dc1204c/lesson/acefb49a-e3d3-4d33-89b5-a90ffcb948e9)**
>
> Watch video content
