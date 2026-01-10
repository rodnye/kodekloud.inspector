# Solutions Resource Requirements - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Configuration/Solutions-Resource-Requirements)

---

## Table of Contents

- Solutions Resource Requirements
  - Question 1: Verifying CPU Requirements for the "rabbit" Pod
  - Question 2: Troubleshooting the "elephant" Pod
  - Question 3: Increasing the Memory Limit for the "elephant" Pod
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Configuration

# Solutions Resource Requirements

In this lesson, we will walk through the solutions for the resource limits lab. Follow the steps below to verify CPU requirements for the "rabbit" pod, troubleshoot the "elephant" pod, and update its memory configuration.

---

## Question 1: Verifying CPU Requirements for the "rabbit" Pod

A pod named **rabbit** is deployed, and our task is to determine its CPU settings. Run the following command to describe the pod:

```
kubectl describe pod rabbit
```

Scroll through the output until you find the resources section. You should see details such as:

```
Exit Code: 128
Started: Thu, 01 Jan 1970 00:00:00 +0000
Finished: Tue, 02 Aug 2022 17:24:15 +0000
Ready: False
Restart Count: 5
Limits:
  cpu: 2
Requests:
  cpu: 1
Environment: <none>
Mounts:
  /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-27zq6 (ro)
Conditions:
  Type                Status
  Initialized        True
  Ready              False
  ContainersReady    False
  PodScheduled       True
Volumes:
  kube-api-access-27zq6:
    Type: Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds: 3607
    ConfigMapName: kube-root-ca.crt
    ConfigMapOptional: <nil>
    DownwardAPI: true
QoS Class: Burstable
Node-Selectors: <none>
Tolerations: node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
```

From the above information, notice that the **CPU request** is set to **1** while the limit is **2**. This indicates that the pod is configured to run with one CPU.

After verification, delete the **rabbit** pod with the command:

```
controlplane ~ ➜ kubectl delete pod rabbit
pod "rabbit" deleted
controlplane ~ ➜ []
```

---

## Question 2: Troubleshooting the "elephant" Pod

The **elephant** pod, deployed in the default namespace, is not reaching a running state. To diagnose the issue, describe the pod using:

```
kubectl describe pod elephant
```

In the output, locate the **Last State** section. You might observe output similar to the following:

```
Image: polinux/stress
Image ID: docker.io/polinux/stress@sha256:b6144f84f9c15dac80deb48d3a646b55c7043ab1d83ea0a697c09097aaad21aa
Port: <none>
Host Port: <none>
Command:
  stress
Args:
  --vm
  1
  --vm-bytes
  15M
  --vm-hang
  1
State: Waiting
Reason: CrashLoopBackOff
Last State: Terminated
Reason: OOMKilled
Exit Code: 1
Started: Tue, 02 Aug 2022 17:25:47 +0000
Finished: Tue, 02 Aug 2022 17:25:47 +0000
Ready: False
Restart Count: 1
Limits:
  memory: 10Mi
Requests:
  memory: 5Mi
Environment: <none>
Mounts:
  /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-h841s (ro)
Conditions:
```

> [!important]
> **Note**
>
> The **OOMKilled** status indicates the pod was terminated because it ran out of memory. The pod has a memory limit set at **10Mi**, but its process needs **15 MB**.

---

## Question 3: Increasing the Memory Limit for the "elephant" Pod

To resolve the OOMKilled issue, follow these steps to increase the memory limit from **10Mi** to **20Mi**:

1.  **Export the Current Pod Configuration**

    Export the current pod configuration to a YAML file by running:

    ```
    controlplane ~ ➜ kubectl get pod -o yaml > elephant.yaml
    ```

2.  **Delete the Existing Pod**

    Remove the current **elephant** pod with:

    ```
    controlplane ~ ➜ kubectl delete pod elephant
    pod "elephant" deleted
    controlplane ~ ➜
    ```

3.  **Edit the YAML Configuration**

    Open the `elephant.yaml` file using your favorite text editor (e.g., `vi`):

    ```
    controlplane ~ ➜ vi elephant.yaml
    ```

    Locate the section specifying the memory limits and update it from `10Mi` to `20Mi`.

4.  **Apply the Updated Configuration**

    Recreate the pod by applying the modified YAML file:

    ```
    controlplane ~ ➜ kubectl apply -f elephant.yaml
    pod/elephant created
    ```

5.  **Verify the Pod Status**

    Check to ensure the pod is running:

    ```
    controlplane ~ ➜ kubectl get pod
    NAME      READY   STATUS    RESTARTS   AGE
    elephant  1/1     Running   0          13s
    controlplane ~ ➜ []
    ```

6.  **Final Deletion**

    Once verified, delete the **elephant** pod as the lab instructions specify:

    ```
    controlplane ~ ➜ kubectl delete pod elephant
    ```

After completing these steps and confirming that the pod eventually reaches a running state, you have successfully completed the resource limits lab.

---

This concludes the Resource Limits Lab Solutions lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/1f12b761-1b82-4878-ab57-6037224886b3)**
>
> Watch video content
