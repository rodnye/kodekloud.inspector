# Solution ReplicaSets optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Core-Concepts/Solution-ReplicaSets-optional)

---

## Table of Contents

- Solution ReplicaSets optional
  - Checking the Initial State
  - Verifying the New ReplicaSet
  - Determining the Image Used by the ReplicaSet
  - Examining the Pod Readiness Issue
  - Deleting a Pod Managed by the ReplicaSet
  - Creating ReplicaSets Using YAML Definition Files
  - Deleting Newly Created ReplicaSets
  - Updating the Original ReplicaSet's Image
  - Scaling the ReplicaSet
  - Final Commands Recap
  - Watch Video
    - Fixing the First Definition File
    - Fixing the Second Definition File
    - Scaling Up
    - Scaling Down

---

## Content

Certified Kubernetes Application Developer - CKAD

Core Concepts

# Solution ReplicaSets optional

In this guide, we review the ReplicaSets lab exercise by detailing each command, expected output, and the rationale behind every step. Follow along to understand how to diagnose issues, update configurations, and scale your ReplicaSet efficiently.

---

## Checking the Initial State

Before proceeding, verify there are no existing Pods or ReplicaSets in your cluster.

1.  List all Pods:

    ```
    kubectl get pods
    ```

    Expected output:

    ```
    No resources found in default namespace.
    ```

    This confirms that there are currently zero Pods running.

2.  List any existing ReplicaSets:

    ```
    kubectl get replicaset
    ```

    The command similarly shows no ReplicaSets at this point.

---

## Verifying the New ReplicaSet

After applying some changes, a new ReplicaSet is created. Confirm its presence using:

```
kubectl get replicaset
```

The output should display something similar to:

```
NAME             DESIRED   CURRENT   READY   AGE
new-replica-set  4         4         0       9s
```

This indicates that the new ReplicaSet is configured to have 4 Pods. Running the command a second time reaffirms the same output.

---

## Determining the Image Used by the ReplicaSet

To inspect the details of the ReplicaSet and determine which image is assigned to its Pods, execute:

```
kubectl describe replicaset new-replica-set
```

Within the Pod Template section under Containers, look for the image field:

```
Image: busybox777
```

Also, the command section appears as:

```
Command:
  sh
  -c
  echo Hello Kubernetes! && sleep 3600
```

This verifies that the ReplicaSet is initially using the image "busybox777".

---

## Examining the Pod Readiness Issue

If the Pods are not transitioning to the Ready state, further investigation is required:

1.  Check the replica status:

    ```
    kubectl describe replicaset new-replica-set
    ```

    You should see an excerpt like:

    ```
    Replicas: 4 current / 4 desired
    Pods Status: 0 Running / 4 Waiting / 0 Succeeded / 0 Failed
    ```

2.  Inspect one of the Pods to identify the issue:

    ```
    kubectl describe pod new-replica-set-7r2qw
    ```

    Notice the container is in a Waiting state with the reason:

    ```
    Reason: ImagePullBackOff
    ```

    And an associated event message:

    ```
    Failed to pull image "busybox777": ... pull access denied, repository does not exist or may require authorization
    ```

> [!important]
> **Warning**
>
> The error indicates that there is no image named "busybox777" available in the repository. Use the standard BusyBox image instead.

---

## Deleting a Pod Managed by the ReplicaSet

ReplicaSets are designed to maintain the desired number of Pods automatically. Even if you delete a Pod, the ReplicaSet immediately replicates a new one.

1.  List the Pods:

    ```
    kubectl get pods
    ```

    Example output:

    ```
    NAME                     READY   STATUS            RESTARTS   AGE
    new-replica-set-wkzjh    0/1     ImagePullBackOff   0          2m59s
    new-replica-set-vpkh8    0/1     ImagePullBackOff   0          2m59s
    new-replica-set-hr2zqw   0/1     ImagePullBackOff   0          2m59s
    new-replica-set-tn2mp    0/1     ImagePullBackOff   0          2m59s
    ```

2.  Delete one of the Pods:

    ```
    kubectl delete pod new-replica-set-wkzjh
    ```

    Confirmation output:

    ```
    pod "new-replica-set-wkzjh" deleted
    ```

3.  List the Pods again to note that the ReplicaSet has recreated the missing Pod.

---

## Creating ReplicaSets Using YAML Definition Files

Two YAML definition files are located in the `/root` directory:

- replicaset-definition-1.yaml
- replicaset-definition-2.yaml

### Fixing the First Definition File

The initial content of replicaset-definition-1.yaml is:

```
apiVersion: v1
kind: ReplicaSet
metadata:
  name: replicaset-1
spec:
  replicas: 2
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      labels:
        tier: frontend
    spec:
      containers:
      - name: nginx
        image: nginx
```

When running:

```
kubectl create -f /root/replicaset-definition-1.yaml
```

you encounter the error:

```
error: unable to recognize "/root/replicaset-definition-1.yaml": no matches for kind "ReplicaSet" in version "v1"
```

Inspecting the available API versions with:

```
kubectl explain replicaset
```

reveals that the correct API version is `apps/v1`. Update the file accordingly. After the change, creation should succeed.

### Fixing the Second Definition File

The content of replicaset-definition-2.yaml is:

```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: replicaset-2
spec:
  replicas: 2
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      labels:
        tier: nginx
    spec:
      containers:
        - name: nginx
          image: nginx
```

Creating it results in the error:

```
The ReplicaSet "replicaset-2" is invalid: spec.template.metadata.labels: Invalid value: map[string]string{"tier":"nginx"}: selector does not match template labels
```

This occurs because the selector (`tier: frontend`) does not match the Pod template labels (`tier: nginx`). Correct the Pod template labels to use `tier: frontend` so they match the selector. After this fix, create the ReplicaSet again using:

```
kubectl create -f /root/replicaset-definition-2.yaml
```

The ReplicaSet "replicaset-2" should now be successfully created.

---

## Deleting Newly Created ReplicaSets

After verification, remove replicaset-1 and replicaset-2 from your cluster.

1.  List the current ReplicaSets to check their status:

    ```
    kubectl get rs
    ```

    Example output:

    ```
    NAME                DESIRED   CURRENT   READY   AGE
    new-replica-set     4         4         0       10m
    replicaset-1        2         2         2       3m4s
    replicaset-2        2         2         2       22s
    ```

2.  Delete the ReplicaSets:

    ```
    kubectl delete rs replicaset-1
    kubectl delete rs replicaset-2
    ```

Confirmation messages will indicate that both ReplicaSets have been removed.

---

## Updating the Original ReplicaSet's Image

Since the original ReplicaSet ("new-replica-set") uses an incorrect image ("busybox777"), update it to use the proper BusyBox image.

1.  Edit the ReplicaSet:

    ```
    kubectl edit rs new-replica-set
    ```

    Locate the container section and update the image field:

    ```
    containers:
      - name: busybox-container
        image: busybox
    ```

2.  Save the changes and verify by describing the ReplicaSet:

    ```
    kubectl describe rs new-replica-set
    ```

Despite the update, existing Pods may still reflect the previous error because updating the ReplicaSet does not restart the existing Pods. To resolve this issue, manually delete the problematic Pods so that the ReplicaSet creates new ones with the corrected image:

```
kubectl delete pod new-replica-set-vpkh8 new-replica-set-tn2mp new-replica-set-7r2qw
```

After a short wait, list the Pods again:

```
kubectl get pods
```

New Pods should appear and transition to the Running state.

---

## Scaling the ReplicaSet

### Scaling Up

To increase the ReplicaSet to five replicas, run:

```
kubectl scale rs new-replica-set --replicas=5
```

Then verify the updated Pod count:

```
kubectl get pods
```

Expected output:

```
NAME                       READY   STATUS    RESTARTS   AGE
new-replica-set-f5gth      1/1     Running   0          55s
new-replica-set-nsbgx      1/1     Running   0          55s
new-replica-set-8z7z5      1/1     Running   0          55s
new-replica-set-whhll      1/1     Running   0          55s
new-replica-set-mwpnz      1/1     Running   0          4s
```

### Scaling Down

To scale the ReplicaSet down, you can edit the resource directly:

1.  Open the ReplicaSet for editing:

    ```
    kubectl edit rs new-replica-set
    ```

2.  Modify the replicas value from 5 to 2 in the YAML:

    ```
    spec:
      replicas: 2
    ```

3.  Save your changes. Verify the update with:

    ```
    kubectl get rs new-replica-set
    ```

The ReplicaSet will now adjust to maintain only two Pods.

---

## Final Commands Recap

Below is a summary of the commands used throughout this lab exercise:

```
# Check initial state
kubectl get pods
kubectl get replicaset


# After changes, verify new ReplicaSet and its details
kubectl get replicaset
kubectl describe replicaset new-replica-set


# Determine the image used and check Pod error
kubectl describe pod new-replica-set-7r2qw


# Demonstrate automatic Pod replacement
kubectl delete pod new-replica-set-wkzjh
kubectl get pods


# Create ReplicaSets from YAML and fix errors
kubectl create -f /root/replicaset-definition-1.yaml
kubectl create -f /root/replicaset-definition-2.yaml


# Delete newly created ReplicaSets
kubectl delete rs replicaset-1
kubectl delete rs replicaset-2


# Update the image in the original ReplicaSet
kubectl edit rs new-replica-set


# Delete faulty Pods so new ones are created with the correct image
kubectl delete pod new-replica-set-vpkh8 new-replica-set-tn2mp new-replica-set-7r2qw


# Scale the ReplicaSet upward
kubectl scale rs new-replica-set --replicas=5
kubectl get pods


# Scale the ReplicaSet downward using editing
kubectl edit rs new-replica-set
```

Happy learning and successful Kubernetes management!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/eae8cedf-d483-471f-8796-49f69baec6cf/lesson/393649a3-9f23-4b61-8571-296e8341d3a5)**
>
> Watch video content
