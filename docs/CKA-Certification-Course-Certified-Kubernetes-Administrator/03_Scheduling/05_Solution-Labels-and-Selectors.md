# Solution Labels and Selectors - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Scheduling/Solution-Labels-and-Selectors)

---

## Table of Contents

- Solution Labels and Selectors
  - 1. Listing Pods and Filtering by Environment
  - 2. Counting Pods in the Finance Business Unit
  - 3. Counting All Objects in the Production Environment
  - 4. Identifying a Specific Pod with Multiple Labels
  - 5. Fixing a ReplicaSet Definition
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Scheduling

# Solution Labels and Selectors

In this lesson, we explore practical examples using labels and selectors in Kubernetes. You will learn how to filter pods by environment, business unit, and tier, and how to troubleshoot and fix issues in a ReplicaSet definition.

---

## 1\. Listing Pods and Filtering by Environment

Begin by listing all the pods to review what is currently deployed:

```
kubectl get pods
```

Example output:

```
NAME           READY   STATUS    RESTARTS   AGE
app-1-prrks    1/1     Running   0          41s
db-1-dmslz     1/1     Running   0          41s
db-2-prm79     1/1     Running   0          41s
db-1-pbbph     1/1     Running   0          41s
db-1-rc4h6     1/1     Running   0          41s
db-1-f5w9r     1/1     Running   0          41s
auth           1/1     Running   0          41s
app-2-z5fgv    1/1     Running   0          41s
app-1-hg9t9    1/1     Running   0          41s
app-1-zxxd0    1/1     Running   0          41s
app-1-w9cbq    1/1     Running   0          41s
```

Each pod is labeled with keys such as ENV and BU. To filter pods in the development environment (assumed key "env" with value "dev"), use the following command:

```
kubectl get pods --selector env=dev
```

If you want to remove the header and count the pods automatically, add the `--no-headers` option and pipe the output to the word count command:

```
kubectl get pods --selector env=dev --no-headers | wc -l
```

This command indicates that there are 7 pods in the development environment.

---

## 2\. Counting Pods in the Finance Business Unit

To determine the number of pods belonging to the finance business unit (assumed label `bu=finance`), execute:

```
kubectl get pods --selector bu=finance --no-headers | wc -l
```

This command returns 6 pods associated with the finance BU.

---

## 3\. Counting All Objects in the Production Environment

First, list only the pods in the production environment (assumed label `env=prod`):

```
kubectl get pods --selector env=prod --no-headers
```

For a more comprehensive view that includes services and ReplicaSets, use:

```
kubectl get all --selector env=prod --no-headers
```

An example output might look like this:

```
pod/db-2-prm79              1/1     Running   0          3m13s
pod/auth                    1/1     Running   0          3m13s
pod/app-2-z5fgv             1/1     Running   0          3m13s
pod/app-1-zzxdf             1/1     Running   0          3m13s
service/app-1               ClusterIP   10.43.108.231   <none> 3306/TCP   3m12s
replicaset.apps/db-2        1         1     1          3m13s
replicaset.apps/app-2       1         1     1          3m13s
```

By counting the number of lines using `wc -l`, you determine that there are 7 objects in total in the production environment.

---

## 4\. Identifying a Specific Pod with Multiple Labels

To find the pod that meets all three criteria—being in the production environment, belonging to the finance business unit, and operating in the front-end tier—follow these steps:

1.  **List the pods in the production environment:**

    ```
    kubectl get pods --selector env=prod --no-headers
    ```

    Example output:

    ```
    pod/db-2-prm79   1/1   Running   0   3m15s
    pod/auth         1/1   Running   0   3m15s
    pod/app-2-z5fgv  1/1   Running   0   3m15s
    pod/app-1-zzxdf  1/1   Running   0   3m13s
    ```

2.  **Combine selectors for environment, business unit, and tier:**

    ```
    kubectl get all --selector env=prod,bu=finance,tier=frontend
    ```

    The command returns:

    ```
    NAME               READY   STATUS    RESTARTS   AGE
    pod/app-1-zzxdf    1/1     Running   0          4m7s
    ```

This confirms that the pod "app-1-zzxdf" meets all specified criteria.

---

## 5\. Fixing a ReplicaSet Definition

The final task involves resolving a label mismatch error in a ReplicaSet YAML definition file.

Below is the original ReplicaSet configuration:

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

When you create the ReplicaSet using:

```
kubectl create -f replicaset-definition-1.yaml
```

you see the following error:

```
The ReplicaSet "replicaset-1" is invalid: spec.template.metadata.labels: Invalid value: map[string]string{"tier":"nginx"}: selector does not match template labels
```

> [!important]
> **Warning**
>
> The error occurs because the label in the selector (`tier: front-end`) does not match the label in the pod template (`tier: nginx`). These values must be identical.

To resolve the error, update the template labels to match the selector. For example, change the label in the pod template to `tier: front-end`:

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

After saving the changes, create the ReplicaSet again:

```
kubectl create -f replicaset-definition-1.yaml
```

You should see an output similar to:

```
replicaset.apps/replicaset-1 created
```

To verify that the ReplicaSet was successfully created, run:

```
kubectl get rs
```

Example output:

```
NAME           DESIRED   CURRENT   READY   AGE
db-2           1         1         1       5m39s
db-1           4         4         4       5m39s
app-2          1         1         1       5m39s
app-1          2         1         1       5m40s
replicaset-1   2         2         2       5m40s
```

> [!important]
> **Note**
>
> Ensure that selector labels and template labels always match to avoid deployment errors and ensure that your ReplicaSet manages the correct pods.

---

This concludes the lesson on using labels and selectors in Kubernetes. For more information on Kubernetes object management, consider checking out the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/973feb09-9555-4376-9c4b-01b913fc3388)**
>
> Watch video content
