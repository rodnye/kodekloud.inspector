# Logging - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Observability/Logging)

---

## Table of Contents

- Logging
  - Logging in Docker
  - Logging in Kubernetes
  - Conclusion
  - Watch Video
  - Practice Lab
    - Multiple Containers in a Pod

---

## Content

Certified Kubernetes Application Developer - CKAD

Observability

# Logging

Welcome to this comprehensive guide on logging mechanisms in containerized environments. In this article, we explore logging in Docker before transitioning to Kubernetes logging practices. This guide is ideal for developers and system administrators looking to efficiently manage logs and troubleshoot containerized applications.

## Logging in Docker

Imagine a Docker container named "event simulator" that produces random events to mimic a web server. This container sends these event logs to its standard output. For instance, executing the container in the foreground using the command below:

```
docker run kodekloud/event-simulator
```

may yield output similar to:

```
docker run kodekloud/event-simulator
2018-10-06 15:57:15,937 - root - INFO - USER1 logged in
2018-10-06 15:57:16,943 - root - INFO - USER2 logged out
2018-10-06 15:57:17,944 - root - INFO - USER3 is viewing page3
2018-10-06 15:57:18,951 - root - INFO - USER4 is viewing page1
2018-10-06 15:57:19,954 - root - INFO - USER2 logged out
2018-10-06 15:57:20,955 - root - INFO - USER1 logged in
2018-10-06 15:57:21,956 - root - INFO - USER3 is viewing page2
2018-10-06 15:57:22,957 - root - INFO - USER4 is viewing page2
2018-10-06 15:57:23,959 - root - INFO - USER1 logged out
2018-10-06 15:57:24,963 - root - INFO - USER2 is viewing page2
2018-10-06 15:57:25,943 - root - INFO - USER4 is viewing page3
2018-10-06 15:57:26,965 - root - INFO - USER3 logged out
2018-10-06 15:57:27,965 - root - INFO - USER1 is viewing page2
2018-10-06 15:57:28,961 - root - INFO - USER4 is viewing page3
2018-10-06 15:57:29,967 - root - INFO - USER3 is viewing page1
2018-10-06 15:57:30,970 - root - INFO - USER4 logged in
2018-10-06 15:57:31,973 - root - INFO - USER1 is viewing page3
```

> [!important]
> **Detached Mode Tip**
>
> If you run the Docker container in detached mode using the `-d` option, the logs won't display on the console immediately. Instead, you can inspect the logs later by using the `docker logs` command along with the container ID.

For example, starting the container in detached mode:

```
docker run -d kodekloud/event-simulator
```

You can then view the logs with:

```
docker logs <container_id>
```

## Logging in Kubernetes

Transitioning to Kubernetes, the process is similar but integrated into a managed cluster environment. You can create a pod using the same Docker image defined in a pod specification file. Once the pod is running, you can stream its logs with the `kubectl logs` command using the `-f` flag.

Start by creating the pod:

```
kubectl create -f event-simulator.yaml
```

Then, follow the logs using:

```
kubectl logs -f event-simulator-pod
```

Below is the example pod definition file (`event-simulator.yaml`):

```
apiVersion: v1
kind: Pod
metadata:
  name: event-simulator-pod
spec:
  containers:
    - name: event-simulator
      image: kodekloud/event-simulator
```

Executing the above commands will display log messages such as:

```
2018-10-06 15:57:15,937 - root - INFO - USER1 logged in
2018-10-06 15:57:16,943 - root - INFO - USER2 logged out
2018-10-06 15:57:17,944 - root - INFO - USER2 is viewing page2
2018-10-06 15:57:18,951 - root - INFO - USER3 is viewing page3
2018-10-06 15:57:19,954 - root - INFO - USER4 is viewing page1
2018-10-06 15:57:20,955 - root - INFO - USER2 logged out
2018-10-06 15:57:21,956 - root - INFO - USER1 logged in
```

### Multiple Containers in a Pod

Kubernetes allows you to create pods with multiple containers. Suppose you update your pod specification to include an additional container called "image-processor" as follows:

```
apiVersion: v1
kind: Pod
metadata:
  name: event-simulator-pod
spec:
  containers:
    - name: event-simulator
      image: kodekloud/event-simulator
    - name: image-processor
      image: some-image-processor
```

> [!important]
> **Specify Container Name**
>
> When a pod contains more than one container, running the command:
>
> ```
> kubectl logs -f event-simulator-pod
> ```
>
> results in an error because Kubernetes cannot determine which container's logs to display. To view logs for a specific container, explicitly specify the container name. For example, to view logs for the "event-simulator" container:
>
> ```
> kubectl logs -f event-simulator-pod event-simulator
> ```

This command will then output logs similar to:

```
2018-10-06 15:57:15,937 - root - INFO - USER1 logged in
2018-10-06 15:57:16,943 - root - INFO - USER2 logged out
2018-10-06 15:57:17,944 - root - INFO - USER2 is viewing page2
```

## Conclusion

This guide has walked you through managing logs in both Docker and Kubernetes environments. Understanding these logging practices is critical for debugging and monitoring your applications. With these insights, you are now ready to move on to coding exercises that further reinforce your knowledge of logging in containerized environments.

Thank you for reading, and happy logging!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/d79d0450-406f-43ef-91ae-2f0c9dc1204c/lesson/365b947f-8be9-4d05-83fc-cc5485bcd714)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/d79d0450-406f-43ef-91ae-2f0c9dc1204c/lesson/f81c5e2a-68e2-476f-a97f-d54b5930dce7)**
>
> Practice lab
