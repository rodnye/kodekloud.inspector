# Solution Init Containers Optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Solution-Init-Containers-Optional)

---

## Table of Contents

- Solution Init Containers Optional
  - Identifying Pods and Their Container Configurations
  - Detailed Pod Descriptions
  - Inspecting Specific Pods
  - Deploying a New Pod: "purple"
  - Updating a Pod to Add an Init Container
  - Troubleshooting a Failing Pod: "orange"
  - Watch Video
    - The "red" Pod
    - The "blue" Pod

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Application Lifecycle Management

# Solution Init Containers Optional

This guide walks you through a step-by-step lab on Kubernetes init containers. You will learn how to inspect pod configurations, differentiate between regular and init containers, update pod specifications to include an init container, and troubleshoot a failing pod.

---

## Identifying Pods and Their Container Configurations

Begin by listing all pods in your cluster. In this lab, there are three pods: red, green, and blue.

```
controlplane ~ ☸️  k get pods
NAME   READY   STATUS    RESTARTS   AGE
red    1/1     Running   0          23s
green  2/2     Running   0          23s
blue   1/1     Running   0          23s


controlplane ~ ~
```

From the output, note that the pod named green is running two containers. However, to identify if a pod includes an init container, further inspection is required.

---

## Detailed Pod Descriptions

Retrieve a detailed description of the pods to uncover specific container configurations:

```
controlplane ~ ⚡ k get pods
NAME    READY   STATUS    RESTARTS   AGE
red     1/1     Running   0          23s
green   2/2     Running   0          23s
blue    1/1     Running   0          23s
controlplane ~ ⚡
```

Using the `kubectl describe pod` command, you can view sections such as command, state, mounts, conditions, volumes, and events. Regular containers are listed under the "Containers" section, while init containers appear separately under "Init Containers".

For example, reviewing the blue pod displays the following snippet:

```
Command:
  sh
  -c
  echo The app is running! && sleep 3600
State: Running
Started: Sun, 17 Apr 2022 18:52:01 +0000
...
Init Containers:
  init=myservice:
    Container ID: containerd://28fa7c4e96d7b048794557903be8a61357eba3fa1e30568dcb3e30aa52adfbcd
    Image:
      Image ID: docker.io/library/busybox@sha256:d2b53584f580310186df7a2055ce3ff83cc0df6caacf1e3489bf
    Port: <none>
    Host Port: <none>
    Command:
      sh
      -c
      sleep 5
    State:
      Reason: Completed
      Exit Code: 0
      Started: Sun, 17 Apr 2022 18:51:55 +0000
      Finished: Sun, 17 Apr 2022 18:52:00 +0000
```

In this example, the blue pod’s init container uses the BusyBox image and executes a sleep command for 5 seconds before completing successfully (exit code 0). In contrast, the red and green pods only have regular containers listed under the "Containers" section.

---

## Inspecting Specific Pods

### The "red" Pod

The red pod runs a single container. Its configuration is shown below when describing the pod:

```
k describe pod
```

```
Name:           red
Namespace:      default
Node:           controlplane/172.25.0.75
Start Time:     Sun, 17 Apr 2022 18:51:51 +0000
Status:         Running
IP:             10.42.0.10
Containers:
  red-container:
    Container ID:   containerd://0666e968abfa50a6bd3c39159d14ae97d41963e182ad90f4d514d5a9508db2cf
    Image:          busybox:1.28
    Command:
      sh
      -c
      echo The app is running! && sleep 3600
    State:          Running
    Started:        Sun, 17 Apr 2022 18:51:54 +0000
    Ready:          True
```

> [!important]
> **Note**
>
> Since no "Init Containers" section is present, this pod does not include an init container.

### The "blue" Pod

The blue pod, on the other hand, includes at least one init container:

```
k describe pod blue
```

```
Name:           blue
Namespace:      default
Node:           controlplane/172.25.0.75
Start Time:     Sun, 17 Apr 2022 18:51:51 +0000
Status:         Running
IP:             10.42.0.11
Init Containers:
  init-myservice:
    Container ID:   containerd://28fa7c4e9d67b048794557903be8a61357eba3fa1e30568dcb3e30aa52adfbc
    Image:          busybox
    Command:
      sh
      -c
      sleep 5
    State:          Terminated
      Reason:       Completed
      Exit Code:    0
    Finished:       Sun, 17 Apr 2022 18:52:00 +0000
Containers:
  green-container-1:
    Container ID:   containerd://79ac76c9a8bcc8613d882e7f464e04182ef4630a6bb5296090e80b34eefa0e3
    Image:          busybox:1.28
    Command:
      sh
      -c
      echo The app is running! && sleep 3600
    State: Running
```

In this pod, the init container (named "init-myservice") successfully executed the sleep command before the main container started.

---

## Deploying a New Pod: "purple"

A new pod named purple is deployed with one container and two init containers. First, verify the pod's status:

```
k get pod purple
```

```
NAME    READY   STATUS         RESTARTS   AGE
purple  0/1     Init:0/2       0          11s
```

The status "Init:0/2" indicates that two init containers are configured. Inspecting the pod reveals:

```
Containers:
  purple-container:
    Command:
      sh
      -c
      echo The app is running! && sleep 3600
    State: Waiting
    Reason: PodInitializing
...
Init Containers:
  warm-up-1:
    Command:
      sh
      -c
      sleep 600
    State: Running
      Started: Sun, 17 Apr 2022 18:55:00 +0000
    Ready: False
  warm-up-2:
    Command:
      sh
      -c
      sleep 1200
    State: Waiting
    Reason: PodInitializing
    Ready: False
```

> [!important]
> **Note**
>
> The main purple application container will not start until both init containers complete their execution. In this example, the total wait time is 30 minutes (10 minutes + 20 minutes).

---

## Updating a Pod to Add an Init Container

Next, update the pod specification for the red pod to include an init container that uses the BusyBox image to sleep for 20 seconds. First, check the current state of the red pod:

```
k get pod red
```

```
NAME   READY   STATUS    RESTARTS   AGE
red    1/1     Running   0          5m52s
```

Then, edit the pod using the YAML snippet below:

```
apiVersion: v1
kind: Pod
metadata:
  name: red
  namespace: default
spec:
  initContainers:
    - name: busybox
      image: busybox
      command: [ "sleep", "20" ]
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
          name: kube-api-access-lcs9s
          readOnly: true
  dnsPolicy: ClusterFirst
  nodeName: controlplane
  restartPolicy: Always
```

After saving the changes, the pod will terminate and recreate with the updated specification. If the update is rejected because the pod does not accept live updates, force the replacement.

---

## Troubleshooting a Failing Pod: "orange"

A new pod named orange was deployed but is immediately encountering an init container crash loop. First, check its status:

```
k get pod orange
```

```
NAME    READY   STATUS                    RESTARTS   AGE
orange  0/1     Init:CrashLoopBackOff     1 (12s ago)   15s
```

Inspect the pod description to diagnose the issue. The init container "init-myservice" has an error:

```
Init Containers:
  init-myservice:
    Container ID: containerd://3b81363a5292435973b6739ed6360aacbf894e8e655f1a31c622aa72443f2e
    Image:          busybox
    Command:
      sh
      -c
      sleepee 2;
    State:          Terminated
      Reason:       Error
      Exit Code:    127
```

The command "sleepee" is misspelled, causing the init container to fail. To verify, check the init container logs:

```
k logs orange -c init-myservice
```

The logs confirm the error:

```
sh: sleeep: not found
```

> [!important]
> **Warning**
>
> Ensure that commands are correctly spelled in your container specifications because minor typos can prevent your pod from initializing properly.

To resolve the issue, update the pod configuration for orange with the corrected sleep command using the YAML snippet below:

```
apiVersion: v1
kind: Pod
metadata:
  name: orange
  namespace: default
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
          name: kube-api-access-ztghh
          readOnly: true
  dnsPolicy: ClusterFirst
  restartPolicy: Always
```

If live edits are rejected, save the modified YAML to a file and force the replacement with:

```
k replace --force -f <file-with-updated-pod-spec.yaml>
```

After replacing the pod, verify that the logs from the init container no longer contain errors:

```
k logs orange -c init-myservice
```

Then check the pod status:

```
k get pods orange
```

```
NAME    READY   STATUS    RESTARTS   AGE
orange  1/1     Running   0          27s
```

Now the init container terminates cleanly (exit code 0) and the main application container starts running normally.

---

This concludes the Kubernetes init containers lab. In this lesson, you learned to inspect pod configurations, differentiate between regular and init containers, update a pod to include an init container, and troubleshoot configuration errors due to command typos.

For more information on Kubernetes concepts, check out these resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/2ddcf79b-abb0-4aeb-ad0c-3d54c7b4fc64/lesson/e49fcabb-1859-4f44-aa0d-dabeadfeddd5)**
>
> Watch video content
