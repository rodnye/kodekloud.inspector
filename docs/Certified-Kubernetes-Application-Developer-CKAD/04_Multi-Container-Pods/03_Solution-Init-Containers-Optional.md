# Solution Init Containers Optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Multi-Container-Pods/Solution-Init-Containers-Optional)

---

## Table of Contents

- Solution Init Containers Optional
  - Identifying the Pod with an Init Container
  - Question 1 Recap
  - Analyzing the Purple Pod
  - Updating a Pod to Use an Init Container
  - Fixing the Issue with the Orange Pod
  - Conclusion
  - Additional Resources
  - Watch Video
    - Red Pod Analysis
    - Green Pod Analysis
    - Blue Pod Analysis
    - Steps to Update the "red" Pod
    - Steps to Fix the Orange Pod

---

## Content

Certified Kubernetes Application Developer - CKAD

Multi Container Pods

# Solution Init Containers Optional

In this lesson, we address several tasks related to init containers. We demonstrate how to identify pods with init containers, update a pod configuration to use a new init container, and fix an issue causing a CrashLoopBackOff in one pod. Follow the steps below for a comprehensive guide.

---

## Identifying the Pod with an Init Container

First, list all the pods with:

```
kubectl get pods
```

Example output:

```
NAME    READY   STATUS    RESTARTS   AGE
red     1/1     Running   0          54s
green   2/2     Running   0          54s
blue    1/1     Running   0          54s
```

We have three pods: red, green, and blue. To determine which pod includes an init container, execute:

```
kubectl describe pod <pod-name>
```

### Red Pod Analysis

When you inspect the red pod, you see an init container section alongside the main container. Here’s a snippet from the red pod's description:

```
Annotations: <none>
Status: Running
IP: 10.42.0.11
IPs:
  IP: 10.42.0.11
Init Containers:
  init-myservice:
    Container ID: containerd://06b2eef4bb35af6bbd7d436785fa8988bbe43617def32fb320bb1cc0f9d88708
    Image: busybox
    Image ID: docker.io/library/busybox@sha256:ef320ff10026a50cf5f0213d35537ce0041ac1d96e9b78
    Port: <none>
    Host Port: <none>
    Command:
      sh
      -c
      sleep 5
    State: Terminated
    Reason: Completed
    Exit Code: 0
    Started: Tue, 02 Aug 2022 18:16:26 +0000
    Finished: Tue, 02 Aug 2022 18:16:31 +0000
    Ready: True
    Restart Count: 0
    Environment: <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-wqxmr (ro)
Containers:
  green-container-1:
    Container ID: containerd://0124061f1d72bf48f8b8692e2a68c39962c53a43e639eb4f27cabcfb4637b51
    Image: busybox:1.28
```

Although an init container is shown in the red pod, further analysis of other pods is required.

### Green Pod Analysis

The green pod does not include an init container. Its configuration is similar to the following:

```
IP:
  IP: 10.42.0.9
Containers:
  red-container:
    Container ID: containerd://73700f570a1c0df8222bd892b67bf9c9b37f5747a800a0bd9623e8db3fbfb
    Image: busybox:1.28
    Image ID: docker.io/library/busybox@sha256:141c253bc4c3fd0a201d32dc1f493bcf3fff03b6d416dea4f41046e0f37d47
    Port: <none>
    Host Port: <none>
    Command:
      - sh
      - -c
      - echo The app is running! && sleep 3600
    State: Running
    Started: Tue, 02 Aug 2022 18:16:25 +0000
    Ready: True
    Restart Count: 0
    Environment: <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-vslgg (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  kube-api-access-vslgg:
    Type: Projected (a volume that contains injected data from multiple sources)
```

Since it lacks an init container, proceed to the next pod.

### Blue Pod Analysis

The blue pod includes a well-defined init container. Its description shows:

```
Status: Running
IP:
  IP: 10.42.0.10
Containers:
  green-container-1:
    Container ID: containerd://2c091a018044c1d3a06dfae0056a7715c7469cc353d2314651b967661ff8086a
    Image: busybox:1.28
    Image ID: docker.io/library/busybox@sha256:141c253bc4c3fd0a201d32dc1f493bcf3fff003b6d6f416dea4f410460e0f37d47
    Port: <none>
    Host Port: <none>
    Command:
      sh
      -c
      echo The app is running! && sleep 3600
    State: Running
    Started: Tue, 02 Aug 2022 18:16:25 +0000
    Ready: True
    Restart Count: 0
    Environment: <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-2kr6f (ro)
Init Containers:
  init-myservice:
    Container ID: containerd://06b2eef4bb35a6fbbd7d436785fa8988bbe43617def32fb320bb1cc0f9d88708
    Image: busybox
    Image ID: docker.io/library/busybox@sha256:ef320ff10026a50cf5f021d35537ce0041ac1d96e9b79800bafd8c9eff6c693
    Port: <none>
    Host Port: <none>
    Command:
      - sh
      - -c
      - sleep 5
    State: Terminated
    Reason: Completed
```

Thus, the blue pod is the one with an init container using the "busybox" image. The container ran a "sleep 5" command, and its state is confirmed as Terminated (Reason: Completed).

---

## Question 1 Recap

- **Pod with an init container:** blue
- **Init container's image:** busybox
- **Init container's state:** Terminated (Reason: Completed)

---

## Analyzing the Purple Pod

A new application named purple was deployed. Its configuration includes multiple init containers. To examine it, run:

```
kubectl describe pod purple
```

This outputs a snippet similar to:

```
Name:           purple
Namespace:      default
Priority:       0
Node:           controlplane/172.25.0.95
Start Time:     Tue, 02 Aug 2022 18:18:43 +0000
Status:         Pending
IP:             10.42.0.12
IPs:
  IP:           10.42.0.12
Init Containers:
  warm-up-1:
    Container ID:   containerd://86f76be333d14dcd7ff161cab46d35fddb2e22fcd4867b8f25848f386beabb10
    Image:          busybox:1.28
    Command:
      sh
      -c
      sleep 600
    State:          Running
      Started:      Tue, 02 Aug 2022 18:18:44 +0000
    Ready:          False
    Restart Count:  0
  warm-up-2:
    Container ID: <none>
    Image:        busybox:1.28
    Command:
      sh
      -c
      sleep 1200
    State:        Waiting
    Reason:       PodInitializing
    Ready:        False
    Restart Count:  0
Containers:
  purple-container:
    Container ID: <none>
    Image:        busybox:1.28
```

The purple pod has **two init containers**:

- **warm-up-1:** sleeps for 600 seconds (10 minutes)
- **warm-up-2:** sleeps for 1200 seconds (20 minutes)

They run sequentially, so the main container only starts after both complete. The total wait time before availability is 1800 seconds (30 minutes).

---

## Updating a Pod to Use an Init Container

The next task is to update the "red" pod to incorporate an init container. The new init container uses the busybox image to sleep for 20 seconds instead of a longer duration.

### Steps to Update the "red" Pod

1.  **Export the current configuration:**

    ```
    kubectl get pod red -o yaml > red.yaml
    ```

2.  **Delete the existing red pod:**

    ```
    kubectl delete pod red
    ```

3.  **Edit red.yaml** to add the init container. Below is the updated configuration:

    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: red
      namespace: default
    spec:
      initContainers:
      - name: red-initcontainer
        image: busybox
        command:
        - "sleep"
        - "20"
      containers:
      - name: red-container
        image: busybox:1.28
        imagePullPolicy: IfNotPresent
        command:
        - sh
        - -c
        - echo The app is running! && sleep 3600
        volumeMounts:
        - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
          name: kube-api-access-vslgg
          readOnly: true
      dnsPolicy: ClusterFirst
      enableServiceLinks: true
    ```

4.  **Apply the new configuration:**

    ```
    kubectl apply -f red.yaml
    ```

After applying, verify that the red pod is recreated and the new init container executes the "sleep 20" command before starting the main container.

---

## Fixing the Issue with the Orange Pod

The orange pod is encountering an issue with its init container, as it is stuck in a crash loop. Listing pods shows:

```
kubectl get pods
```

Output example:

```
NAME      READY   STATUS                     RESTARTS   AGE
green     2/2     Running                    0          7m2s
blue      1/1     Running                    0          7m2s
purple    0/1     Init:0/2                   0          4m40s
orange    0/1     Init:CrashLoopBackOff      1 (12s ago) 16s
red       1/1     Running                    0          29s
```

Describing the orange pod reveals an error in the init container command:

```
Command:
  sh
  -c
  sleeep 2;
```

The typo "sleeep" (with an extra "e") causes the container to fail (Exit Code: 127) and triggers a CrashLoopBackOff.

> [!important]
> **Warning**
>
> Ensure that command spelling is correct, as errors like this prevent the container from starting and lead to repeated restarts.

### Steps to Fix the Orange Pod

1.  **Export the orange pod configuration:**

    ```
    kubectl get pod orange -o yaml > orange.yaml
    ```

2.  **Delete the existing orange pod:**

    ```
    kubectl delete pod orange
    ```

3.  **Edit orange.yaml** to correct the command in the init container. The updated configuration should be:

    ```
    spec:
      initContainers:
      - name: init-myservice
        image: busybox
        imagePullPolicy: Always
        command:
        - sh
        - -c
        - sleep 2
      containers:
      - name: orange-container
        image: busybox:1.28
        imagePullPolicy: IfNotPresent
        command:
        - sh
        - -c
        - echo The app is running! && sleep 3600
        volumeMounts:
        - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
          name: kube-api-access-dsgpf
          readOnly: true
      dnsPolicy: ClusterFirst
      enableServiceLinks: true
    ```

4.  **Apply the corrected configuration:**

    ```
    kubectl apply -f orange.yaml
    ```

Once updated, the orange pod should operate normally without entering a crash loop.

---

## Conclusion

This guide provided a step-by-step walkthrough of:

- Identifying pods with init containers (examining red, green, and blue pods)
- Reviewing key details such as image names, commands, and the state of init containers
- Updating a pod's configuration (red pod) to replace a lengthy sleep command in its init container with a shorter one
- Diagnosing and fixing a typo in the orange pod that caused a CrashLoopBackOff

Following these steps will help you efficiently manage and troubleshoot init containers in your Kubernetes environment.

---

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/c679b7ba-0bdd-4f3d-b4a6-296d299406fe/lesson/2bb89822-5f12-468d-9b95-7678146d5545)**
>
> Watch video content
