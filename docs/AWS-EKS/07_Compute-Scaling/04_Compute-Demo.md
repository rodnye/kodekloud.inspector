# Compute Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/Compute-Scaling/Compute-Demo)

---

## Table of Contents

- Compute Demo
  - 1. Cluster Setup: Managed Node Group & Fargate Profiles
  - 2. Verifying Webhooks & Node Status
  - 3. Manual Scaling of the Managed Node Group
  - 4. Deploying Workloads to Fargate
  - 5. Standard Nginx Deployment on Managed Nodes
  - 6. Dynamic Scaling with Karpenter
  - 7. Karpenter Default Provisioner Configuration
  - 8. Summary: EKS Compute Options Comparison
  - Links and References
  - Watch Video

---

## Content

AWS EKS

Compute Scaling

# Compute Demo

In this guide, we’ll walk through real-time auto scaling on Amazon EKS using three compute options:

1.  Managed Node Groups
2.  Fargate Profiles
3.  Karpenter Provisioner

By the end, you’ll understand how to deploy workloads that scale automatically based on demand.

---

## 1\. Cluster Setup: Managed Node Group & Fargate Profiles

We’ve created:

- A managed Node Group named **main** (desired capacity: 2)
- Two Fargate profiles: **default** and **fargate** (selects `namespace: fargate`)

![The image shows an AWS Elastic Kubernetes Service (EKS) console with details about node groups and Fargate profiles. It indicates no nodes are present, but there is one active node group and two active Fargate profiles.](https://kodekloud.com/kk-media/image/upload/v1752862747/notes-assets/images/AWS-EKS-Compute-Demo/aws-eks-console-node-groups-fargate.jpg)

When you schedule a Pod in the **fargate** namespace, the Fargate mutating webhook injects a custom scheduler that routes Pods to serverless Fargate compute.

![The image shows an AWS console page for configuring a Fargate profile in an Elastic Kubernetes Service (EKS) cluster, with the status marked as active and a section for pod selectors.](https://kodekloud.com/kk-media/image/upload/v1752862748/notes-assets/images/AWS-EKS-Compute-Demo/aws-eks-fargate-profile-configuration.jpg)

---

## 2\. Verifying Webhooks & Node Status

First, confirm the Fargate mutation webhook is installed:

```
kubectl get mutatingwebhookconfigurations.admissionregistration.k8s.io
```

```
NAME                                           WEBHOOKS   AGE
0500-amazon-eks-fargate-mutation.amazonaws.com 2          4h39m
pod-identity-webhook                           1          4h45m
vpc-resource-mutating-webhook                  1          4h45m
```

Next, list the current nodes in your cluster (you should see only the managed nodes):

```
kubectl get nodes
```

```
NAME                                              STATUS   ROLES    AGE   VERSION
i-05b0938045882bc66.us-west-2.compute.internal    Ready    <none>   4h    v1.29.0-eks-5e0fdde
i-0b67dcfad12062f1d.us-west-2.compute.internal    Ready    <none>   4h    v1.29.0-eks-5e0fdde
```

View the **main** Node Group details via `eksdemo` or your preferred CLI:

```
eksdemo get mng -c kodekloud
```

```
+-------+--------+------+-------+-----+-----+-----------------------------+-----------+
| Age   | Status | Name | Nodes | Min | Max | Version                     | Type      |
+-------+--------+------+-------+-----+-----+-----------------------------+-----------+
| 4h    | ACTIVE | main | 2     | 0   | 10  | ami-09167e9f270af0d8 (eks)  | ON_DEMAND |
+-------+--------+------+-------+-----+-----+-----------------------------+-----------+
```

> [!important]
> **Note**
>
> We currently have no [Cluster Autoscaler](https://docs.aws.amazon.com/eks/latest/userguide/cluster-autoscaler.html) installed, so we’ll adjust the Node Group sizes manually below.

---

## 3\. Manual Scaling of the Managed Node Group

To force-scale the **main** Node Group down to 1 node:

```
eksdemo update mng main -c kodekloud --min 1 --max 1
```

```
Updating nodegroup with 1 Nodes, 1 Max...done
```

Within a minute, one managed node will terminate.

---

## 4\. Deploying Workloads to Fargate

Let’s create a namespace and a Deployment that matches the **fargate** profile:

```
apiVersion: v1
kind: Namespace
metadata:
  name: fargate
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fargate-nginx
  namespace: fargate
spec:
  replicas: 1
  selector:
    matchLabels:
      app: fargate-nginx
  template:
    metadata:
      labels:
        app: fargate-nginx
    spec:
      terminationGracePeriodSeconds: 0
      containers:
        - name: fargate-nginx
          image: public.ecr.aws/nginx/nginx:latest
```

Apply the manifest:

```
kubectl apply -f fargate-deploy.yaml
```

Watch the Pod in **Pending** state until Fargate provisions a node:

```
kubectl get pods -n fargate --watch
```

Describe the pending Pod to verify the custom scheduler:

```
kubectl get pod fargate-nginx-<id> -n fargate -o yaml
```

```
spec:
  schedulerName: fargate-scheduler
  tolerations:
    - key: node.kubernetes.io/not-ready
      operator: Exists
      effect: NoExecute
      tolerationSeconds: 300
    - key: node.kubernetes.io/unreachable
      operator: Exists
      effect: NoExecute
      tolerationSeconds: 300
```

Once Fargate provisioning completes, you’ll see a new node:

```
kubectl get nodes
```

```
NAME                                                               STATUS
fargate-ip-192-168-138-113.us-west-2.compute.internal              Ready
i-05b0938045882bc66.us-west-2.compute.internal                     Ready
```

Scale the Fargate deployment to **5** replicas:

```
kubectl scale deploy fargate-nginx -n fargate --replicas 5
kubectl get pods -n fargate
```

```
NAME                                   READY   STATUS    AGE
fargate-nginx-58f48f6b79-7ggz5         0/1     Pending   4s
fargate-nginx-58f48f6b79-gldtV         0/1     Pending   4s
fargate-nginx-58f48f6b79-h8pzw         0/1     Pending   4s
fargate-nginx-58f48f6b79-p46sq         1/1     Running   2m24s
fargate-nginx-58f48f6b79-sjzxz         0/1     Pending   4s
```

> [!important]
> **Note**
>
> Fargate creates one node per Pod, which can add provisioning latency for rapid scaling.

---

## 5\. Standard Nginx Deployment on Managed Nodes

Deploy a typical Nginx workload in the default namespace:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      terminationGracePeriodSeconds: 0
      containers:
        - name: nginx
          image: public.ecr.aws/nginx/nginx:latest
```

```
kubectl apply -f nginx-deploy.yaml
kubectl get pods
```

```
NAME                     READY   STATUS    AGE
nginx-56cd7bd595-abcde   1/1     Running   30s
nginx-56cd7bd595-fghij   1/1     Running   30s
```

These Pods schedule immediately on existing on-demand nodes.

---

## 6\. Dynamic Scaling with Karpenter

Karpenter automatically provisions compute when Pods remain unscheduled due to resource constraints.

> [!important]
> **Note**
>
> Make sure you’ve installed Karpenter and configured the required IAM roles. See the [Karpenter documentation](https://karpenter.sh/) for setup instructions.

1.  **Verify Karpenter pods**:

    ```
    kubectl get pods -n kube-system | grep karpenter
    ```

2.  **Scale the Nginx deployment** to 25 replicas:

    ```
    kubectl scale deploy nginx --replicas 25
    ```

3.  **Add CPU requests** to force new node provisioning:

    ```
    kubectl set resources deployment nginx --requests=cpu=500m
    ```

4.  **Watch Pods and Nodes**:

    ```
    kubectl get pods --all-namespaces --watch
    kubectl get nodes
    ```

    Example of new C5 nodes:

    ```
    NAME                                                      STATUS   AGE    VERSION
    i-048b7c8a501cda49d.us-west-2.compute.internal            Ready    66s    v1.29.0-eks-5e0fdde
    i-0c1d8c0722d4758b1.us-west-2.compute.internal            Ready    25s    v1.29.0-eks-5e0fdde
    # ... existing fargate and managed nodes ...
    ```

5.  **Inspect a Karpenter-provisioned node**:

    ```
    kubectl get node i-048b7c8a501cda49d -o yaml
    ```

    ```
    metadata:
      labels:
        beta.kubernetes.io/instance-type: c5.2xlarge
        karpenter.amazonaws.com/instance-family: c5
        karpenter.k8s.aws/instance-cpu: "8"
        karpenter.sh/managed-by: karpenter
    spec: {}
    ```

---

## 7\. Karpenter Default Provisioner Configuration

View and describe the default Provisioner to see its constraints:

```
kubectl get provisioners
```

```
NAME
default
```

```
kubectl get provisioner default -o yaml
```

```
spec:
  requirements:
    - key: kubernetes.io/arch
      operator: In
      values: ["amd64"]
    - key: kubernetes.io/os
      operator: In
      values: ["linux"]
    - key: karpenter.sh/capacity-type
      operator: In
      values: ["on-demand","spot"]
    - key: karpenter.k8s.aws/instance-category
      operator: In
      values: ["c","m","r"]
    - key: karpenter.k8s.aws/instance-generation
      operator: Gt
      values: ["2"]
  limits:
    cpu: 1000
status:
  resources:
    cpu: "16"
    memory: 31792072Ki
    pods: "116"
```

This provisioner restricts instances to Linux/AMD64 of category C, M, or R (generation > 2) and allows up to 1,000 CPUs.

---

## 8\. Summary: EKS Compute Options Comparison

| Compute Option     | Description                                | Characteristics                                         |
| ------------------ | ------------------------------------------ | ------------------------------------------------------- |
| Managed Node Group | Always-on EC2 capacity with lifecycle APIs | Stable, version-managed nodes, manual or autoscaled     |
| Fargate Profiles   | Serverless pods on demand                  | One node per Pod, isolation, longer startup latency     |
| Karpenter          | Dynamic, request-driven node provisioning  | Fast scale-out, flexible instance types, cost-efficient |

---

## Links and References

- [Amazon EKS User Guide](https://docs.aws.amazon.com/eks/latest/userguide/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Karpenter Documentation](https://karpenter.sh/)
- [AWS Fargate for EKS](https://docs.aws.amazon.com/eks/latest/userguide/fargate.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/1210661b-7eda-423b-b5f3-b758257d1221/lesson/fd0fef27-384f-42eb-9f0f-df1c3503ea0e)**
>
> Watch video content
