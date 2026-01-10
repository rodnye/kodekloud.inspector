# Solution Persistent Volumes and Persistent Volume Claims optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Storage/Solution-Persistent-Volumes-and-Persistent-Volume-Claims-optional)

---

## Table of Contents

- Solution Persistent Volumes and Persistent Volume Claims optional
  - Step 1. Viewing Application Logs
  - Step 2. Configuring a HostPath Volume
  - Step 3. Creating a Persistent Volume (PV)
  - Step 4. Creating a Persistent Volume Claim (PVC)
  - Step 5. Updating the Pod to Use the PVC
  - Step 6. Verifying Reclaim Policy and Cleanup Behavior
  - Lab Summary
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Storage

# Solution Persistent Volumes and Persistent Volume Claims optional

In this lesson, you will learn how to configure persistent storage for your Kubernetes pods using Persistent Volumes (PV) and Persistent Volume Claims (PVC). This lab demonstrates how to deploy a pod, inspect its logs, and ensure that the logs persist even if the pod is deleted.

---

## Step 1. Viewing Application Logs

A pod named "webapp" is running and writes its logs to `/log/app.log` inside the container. To view these logs, run:

```
kubectl exec webapp -- cat /log/app.log
```

This command displays the application events logged inside the container. Since these logs are stored on the container's ephemeral filesystem, deleting the pod will also remove the logs.

To confirm that no extra volumes are configured, list the pods:

```
kubectl get pods
```

Expected output:

```
NAME    READY   STATUS    RESTARTS   AGE
webapp  1/1     Running   0          107s
```

Then, inspect the pod details:

```
kubectl describe pod webapp
```

The description reveals that only the default volume for API access is present. This confirms that the log file (`/log/app.log`) resides solely within the container.

---

## Step 2. Configuring a HostPath Volume

To ensure log persistence, mount a host directory into the pod.

1.  Verify that the host directory `/var/log/webapp` is empty:

    ```
    ls /var/log/webapp
    ```

2.  Edit the pod manifest to add a new volume. Run:

    ```
    kubectl edit pod webapp
    ```

3.  In the pod specification, locate the `volumes:` section (currently showing only the kube API access volume) and add a new volume for logs. For example:

    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: webapp
      namespace: default
    spec:
      containers:
      - name: event-simulator
        image: kodekloud/event-simulator
        env:
          - name: LOG_HANDLERS
            value: file
        volumeMounts:
          - name: kube-api-access-lmntb
            mountPath: /var/run/secrets/kubernetes.io/serviceaccount
            readOnly: true
          - name: log-volume
            mountPath: /log
      volumes:
      - name: log-volume
        hostPath:
          path: /var/log/webapp
      - name: kube-api-access-lmntb
        projected:
          defaultMode: 420
          sources:
          - serviceAccountToken:
              path: token
              expirationSeconds: 3607
    ```

4.  If you encounter an error about immutable fields when saving the changes, save the modified manifest to a temporary file and force-replace the pod:

    ```
    kubectl replace --force -f /tmp/kubectl-edit-298569051.yaml
    ```

After the pod is recreated, the host directory `/var/log/webapp` will be mounted at `/log` in the container. Verify this by checking the log file:

```
cat /var/log/webapp/app.log
```

---

## Step 3. Creating a Persistent Volume (PV)

Next, create a persistent volume to provide external storage. Use the following example manifest to create a HostPath PV:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-log
spec:
  capacity:
    storage: 100Mi
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Retain
  hostPath:
    path: /pv/log
```

1.  Save the above manifest to a file named `pv.yaml`.
2.  Create the persistent volume:

    ```
    kubectl create -f pv.yaml
    ```

3.  Verify the PV creation:

    ```
    kubectl get pv
    ```

Expected output:

```
NAME     CAPACITY   ACCESS MODES    RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   AGE
pv-log   100Mi      ReadWriteMany   Retain           Available           <none>         3s
```

---

## Step 4. Creating a Persistent Volume Claim (PVC)

Claiming storage requires creating a PVC. Consider the following sample PVC manifest requesting 50Mi with an access mode of `ReadWriteOnce`:

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: claim-log-1
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 50Mi
```

1.  Save this content to a file named `pvc.yaml`.

> [!important]
> **Access Mode Mismatch**
>
> Although the PV is configured with `ReadWriteMany`, the PVC is initially set to `ReadWriteOnce`. This mismatch prevents the PVC from binding to the PV.

2.  Apply the PVC manifest:

    ```
    kubectl create -f pvc.yaml
    ```

3.  Check the PVC status:

    ```
    kubectl get pvc
    ```

You may see the status as "Pending":

```
NAME          STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   AGE
claim-log-1   Pending
```

4.  Verify that the PV remains available:

    ```
    kubectl get pv pv-log
    ```

To resolve the access mode incompatibility, update the PVC manifest to use `ReadWriteMany`:

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: claim-log-1
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 50Mi
```

5.  Force replace the PVC with the updated configuration:

    ```
    kubectl replace --force -f pvc.yaml
    ```

6.  Recheck the PVC status. It should now be bound to the PV with the appropriate capacity.

---

## Step 5. Updating the Pod to Use the PVC

With the PVC bound to the PV, update the "webapp" pod to use the PVC instead of a direct HostPath mount.

1.  Edit the pod manifest to remove the HostPath volume and replace it with the PVC reference. Use the following snippet for guidance:

    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: webapp
      namespace: default
    spec:
      containers:
      - name: event-simulator
        image: kodekloud/event-simulator
        env:
          - name: LOG_HANDLERS
            value: File
        volumeMounts:
          - name: kube-api-access-lmntb
            mountPath: /var/run/secrets/kubernetes.io/serviceaccount
            readOnly: true
          - name: log-volume
            mountPath: /log
      volumes:
      - name: log-volume
        persistentVolumeClaim:
          claimName: claim-log-1
      - name: kube-api-access-lmntb
        projected:
          defaultMode: 420
          sources:
            - serviceAccountToken:
                expirationSeconds: 3607
                path: token
    ```

2.  Force replace the pod with the updated manifest:

    ```
    kubectl replace --force -f <updated-pod-manifest-file.yaml>
    ```

3.  Confirm that application logs are being written to the persistent storage on the host. For example:

    ```
    cat /pv/log/app.log
    ```

---

## Step 6. Verifying Reclaim Policy and Cleanup Behavior

Reviewing the reclaim policy ensures proper cleanup behavior. Check the PV details:

```
kubectl get pv pv-log
```

Expected output:

```
NAME     CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                  STORAGECLASS   AGE
pv-log   100Mi      RWX            Retain           Bound    default/claim-log-1    <none>         9m47s
```

A PV with a "Retain" reclaim policy is not automatically deleted when the PVC is removed. To test this:

1.  Delete the PVC:

    ```
    kubectl delete pvc claim-log-1
    ```

2.  In a separate terminal or after a moment, verify the PVC status:

    ```
    kubectl get pvc
    ```

    The PVC might display a "Terminating" status if the volume is still in use.

3.  Once the PVC is removed, check the PV status:

    ```
    kubectl get pv pv-log
    ```

The PV should now appear in a "Released" state. With the "Retain" policy, you must manually reclaim or delete the PV if needed.

---

## Lab Summary

In this lab, you have successfully:

1.  Viewed application logs inside a pod.
2.  Configured a HostPath volume for log persistence.
3.  Created a PersistentVolume (PV) and a corresponding PersistentVolumeClaim (PVC).
4.  Updated the pod configuration to use the PVC.
5.  Verified the reclaim policy behavior, ensuring that a PV with a "Retain" policy remains available even after deleting the PVC.

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/883f0aa9-3aa9-45a6-bd26-3a87ded1e00e/lesson/3c8f7c4f-f459-44dc-ae0a-af927dd42e79)**
>
> Watch video content
