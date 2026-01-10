# Readiness Probes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Observability/Readiness-Probes)

---

## Table of Contents

- Readiness Probes
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Observability

# Readiness Probes

Welcome to this comprehensive guide on observability in Kubernetes. In this guide, we explore readiness and liveness probes, logging, and monitoring concepts to help you build reliable applications.

![The image lists course objectives, including core concepts, configuration, multi-container pods, observability, pod design, services, networking, and state persistence, with specific focus on readiness and liveness probes.](https://kodekloud.com/kk-media/image/upload/v1752871242/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Readiness-Probes/frame_10.jpg)

Below is a brief recap of the pod lifecycle stages, which is essential for understanding how readiness probes function:

- When a pod is first created, it enters a **Pending** state while the scheduler selects an appropriate node for placement. If no node is immediately available, the pod stays in the Pending state. Use `kubectl describe pod` to investigate any delays.
- After scheduling, the pod transitions to the **ContainerCreating** state as images are pulled and containers begin their startup process.
- Once all containers launch successfully, the pod moves into the **Running** state and remains there until the application completes execution or is terminated.

![The image shows a "POD Status" chart with labels: "Pending," "Running," and "ContainerCreating," alongside colored bars representing different statuses.](https://kodekloud.com/kk-media/image/upload/v1752871243/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Readiness-Probes/frame_80.jpg)

To view the current status of your pods, run the following command:

```
osboxes@kubemaster:~$ kubectl get pods
NAME                        READY   STATUS    RESTARTS   AGE
jenkins-566f687bf-c7nzf     1/1     Running   0          12m
nginx-65899c769f-9lzh       1/1     Running   0          6h
redis-b48685f8b-fbnmx       1/1     Running   0          6h
```

For more detailed insights, inspect the pod’s conditions. Initially, when a pod is scheduled, the "PodScheduled" condition becomes true. Following initialization, the "Initialized" condition is set to true, and finally, once all containers are ready, the "ContainersReady" condition is affirmed. When all these conditions are true, the pod is officially considered ready.

![The image illustrates Kubernetes pod conditions: PodScheduled, Initialized, ContainersReady, and Ready, each with TRUE and FALSE status indicators, alongside a visual representation of a pod.](https://kodekloud.com/kk-media/image/upload/v1752871245/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Readiness-Probes/frame_130.jpg)

Examine these conditions by running:

```
osboxes@kubemaster:~$ kubectl describe pod <pod-name>
```

Additionally, the `kubectl get pods` command output reflects the ready state, confirming whether the application's components are fully operational:

```
osboxes@kubemaster:~$ kubectl get pods
NAME                                     READY   STATUS    RESTARTS   AGE
jenkins-566f687bf-c7nzf                  1/1     Running   0          12m
nginx-65899c769f-9lwzh                  1/1     Running   0          6h
redis-b48685f8b-fbnmx                    1/1     Running   0          6h
```

> [!important]
> **Note**
>
> The **ready** condition signifies that the application inside the pod can receive traffic. However, this status might not reflect the actual readiness of your application, as different applications require varying warm-up times.

For example:

- A minimal script might be ready within milliseconds.
- A database service may take several seconds to become responsive.
- Complex web servers could require minutes to fully initialize.

A Jenkins server, for instance, might take 10 to 15 seconds to initialize followed by a brief warm-up period. Without suitable readiness checks, traffic might be erroneously routed to an unready pod:

```
osboxes@kubemaster:~$ kubectl get all
NAME          READY   STATUS    RESTARTS   AGE
pod/jenkins   1/1     Running   0          11s
```

Kubernetes relies on the pod’s ready condition to determine if it should receive traffic. By default, it assumes that container creation equates to readiness. This is where readiness probes are critically important—they help signal the true readiness of the application within the container.

As an application developer, you can define tests (probes) that confirm the application has reached a ready state. Examples include:

- An HTTP GET request to check API responsiveness for a web application.
- A TCP port check for database services.
- Executing a custom command that confirms the application is ready.

![The image illustrates three types of readiness probes: HTTP Test, TCP Test, and Exec Command, with corresponding icons and descriptions.](https://kodekloud.com/kk-media/image/upload/v1752871246/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Readiness-Probes/frame_330.jpg)

To configure a readiness probe, include the `readinessProbe` field in your pod specification. For an HTTP-based readiness probe, specify the endpoint path and port. For example:

```
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp
  labels:
    name: simple-webapp
spec:
  containers:
  - name: simple-webapp
    image: simple-webapp
    ports:
    - containerPort: 8080
    readinessProbe:
      httpGet:
        path: /api/ready
        port: 8080
      initialDelaySeconds: 10
      periodSeconds: 5
      failureThreshold: 8
```

There are three primary types of readiness probes you can use:

1.  **HTTP GET Probe:**

    ```
    readinessProbe:
      httpGet:
        path: /api/ready
        port: 8080
    ```

2.  **TCP Socket Probe:**

    ```
    readinessProbe:
      tcpSocket:
        port: 3306
    ```

3.  **Exec Command Probe:**

    ```
    readinessProbe:
      exec:
        command:
          - cat
          - /app/is_ready
    ```

In addition to the probe type, you can also configure parameters such as:

- `initialDelaySeconds`: The delay before the first probe.
- `periodSeconds`: How frequently the probe is executed.
- `failureThreshold`: The number of consecutive failures that trigger the pod to be marked as not ready.

Now, consider a multi-pod setup under a ReplicaSet or Deployment. When scaling up, a new pod might take a minute or more to warm up. Without properly configured readiness probes, traffic could be routed to a pod that isn't fully ready, leading to potential service disruptions.

![The image illustrates "POD Conditions" with a diagram showing three ready pods connected to a green triangle, indicating successful status.](https://kodekloud.com/kk-media/image/upload/v1752871247/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Readiness-Probes/frame_450.jpg)

> [!important]
> **Note**
>
> A correctly configured readiness probe ensures that only pods that pass the readiness checks will receive traffic. This maintains a smooth user experience even during pod updates or scaling events.

That concludes our discussion on readiness probes. To further reinforce these concepts, we encourage you to practice with the available labs and exercises. For more details on Kubernetes observability, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

Happy probing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/d79d0450-406f-43ef-91ae-2f0c9dc1204c/lesson/f99d93ad-d916-49b0-a931-85d105a07d0e)**
>
> Watch video content
