# Solution Labels and Selectors optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/POD-Design/Solution-Labels-and-Selectors-optional)

---

## Table of Contents

- Solution Labels and Selectors optional
  - Step 1: Count Pods in the Dev Environment
  - Step 2: Count Pods in the Finance Business Unit
  - Step 3: Count All Objects in the Prod Environment
  - Step 4: Identify a Specific Pod in the Prod Environment
  - Step 5: Fixing a ReplicaSet Definition
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

POD Design

# Solution Labels and Selectors optional

In this lesson, we explore practical techniques for using labels and selectors to manage Kubernetes objects. You will learn how to filter Pods, count resources, and troubleshoot configuration issues using real-world examples.

---

## Step 1: Count Pods in the Dev Environment

Begin by listing all the Pods:

```
kubectl get pods
```

To filter Pods running in the dev environment, assume the environment label key is `env` and the value is `"dev"`:

```
kubectl get pods --selector env=dev
```

For a manual count, you might simply observe the output if there are few Pods. However, for larger sets, use the following command to count Pods, excluding the header line by adding the `--no-headers` option:

```
kubectl get pods --selector env=dev --no-headers | wc -l
```

> [!important]
> **Tip**
>
> The command above returns the number of Pods in the dev environment. In our example, the output shows there are seven Pods.

---

## Step 2: Count Pods in the Finance Business Unit

To count the Pods that belong to the finance business unit, assume the business unit label key is `bu` and filter by the value `"finance"`. Run:

```
kubectl get pods --selector bu=finance --no-headers | wc -l
```

The result indicates that there are six Pods associated with the finance business unit.

---

## Step 3: Count All Objects in the Prod Environment

In this step, you'll count all Kubernetes objects (including Pods, Services, ReplicaSets, etc.) in the prod environment. Replace the Pod-specific command with `kubectl get all`:

```
kubectl get all --selector env=prod --no-headers | wc -l
```

This command returns the total number of objects in the prod environment. In our case, the output is seven.

---

## Step 4: Identify a Specific Pod in the Prod Environment

Next, identify the Pod that meets all of the following criteria:

- It is in the prod environment.
- It belongs to the finance business unit.
- It is part of the frontend tier.

Combine multiple labels by separating them with commas:

```
kubectl get all --selector env=prod,bu=finance,tier=frontend
```

This command returns the specific Pod. In our example, the Pod name begins with "ZZ XDF…".

---

## Step 5: Fixing a ReplicaSet Definition

The final task involves troubleshooting an issue with a ReplicaSet definition. Below is the original YAML file:

```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: replicaset-1
spec:
  replicas: 2
  selector:
    matchLabels:
      tier: front-end
  template:
    metadata:
      labels:
        tier: nginx
    spec:
      containers:
        - name: nginx
          image: nginx
```

When attempting to create this ReplicaSet:

```
kubectl create -f replicaset-definition-1.yaml
```

You receive the following error:

```
The ReplicaSet "replicaset-1" is invalid: spec.template.metadata.labels: Invalid value: map[string]string{"tier":"nginx"}: selector does not match template labels
```

> [!important]
> **Configuration Mismatch**
>
> The error occurs because the `matchLabels` in the selector (`tier: front-end`) do not match the label defined in the Pod template (`tier: nginx`). Ensure that the selector and the template labels are identical.

To resolve the error, update the template labels to match the selector:

```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: replicaset-1
spec:
  replicas: 2
  selector:
    matchLabels:
      tier: front-end
  template:
    metadata:
      labels:
        tier: front-end
    spec:
      containers:
      - name: nginx
        image: nginx
```

After updating the YAML file, create the ReplicaSet again:

```
kubectl create -f replicaset-definition-1.yaml
```

The ReplicaSet should now be created successfully. Verify its creation by listing the ReplicaSets.

---

That concludes this lesson on using labels and selectors with Kubernetes. For more advanced topics and troubleshooting, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/c44b5e7c-5854-4c65-87bf-7e07cb026e71/lesson/68847a8b-90cf-4360-a6e9-ff07a551d04a)**
>
> Watch video content
