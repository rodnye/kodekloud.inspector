# Demo Pods - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-Concepts/Demo-Pods)

---

## Table of Contents

- Demo Pods
  - Creating a Pod with Nginx
  - Inspecting Pod Details
  - Viewing Pods with Extended Information
  - Summary
  - Watch Video

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes Concepts

# Demo Pods

In this guide, we will walk through the process of deploying a pod within your Minikube cluster and inspecting its details using the kubectl command-line utility. This tutorial is ideal for developers and Kubernetes practitioners looking to get started with pod management in a local environment.

> [!important]
> **Prerequisites**
>
> Ensure you have Minikube installed and a cluster running. Your kubectl should be configured to communicate with your Minikube cluster.

## Creating a Pod with Nginx

A pod is the smallest deployable unit in Kubernetes. To create a pod named "nginx" using the official Nginx image from [Docker Hub](https://hub.docker.com/_/nginx), execute the following command:

```
kubectl run nginx --image=nginx
```

In this command:

- "nginx" is both the pod name and the Docker image name.
- The Docker image must be available on Docker Hub or any other container registry. You can also specify an image tag or a custom registry if needed.

After running the command, you should see output similar to this:

```
pod/nginx created
kubectl get pods
NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          3s
```

This output confirms that the pod has been created and is running:

- **READY:** Indicates the container is ready.
- **RESTARTS:** Shows the number of times the container has restarted.
- **AGE:** Displays how long the pod has been running.

## Inspecting Pod Details

To view detailed information about the pod, including labels, node assignment, and network configurations, use:

```
kubectl describe pod nginx
```

The output might look like this:

```
Name:         nginx
Namespace:    default
Priority:     0
Node:         minikube/192.168.99.100
Start Time:   Sat, 11 Jul 2020 00:49:39 -0400
Labels:       run=nginx
Annotations:  <none>
Status:       Running
IP:           172.17.0.3
IPs:
  IP:        172.17.0.3
Containers:
  nginx:
    Container ID:   docker://987785b312ad2e38c77132300f8709b8a027566462c2d18634ff13b34de25479
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:a93c8a0b0974c967aebe868a186e5c205f4d3bcb5423a56559f2f9599074bbcd
    Port:           <none>
    Host Port:      <none>
    State:          Running
    Started:        Sat, 11 Jul 2020 00:49:41 -0400
```

Key details include:

- The pod is labeled with `run=nginx` by default.
- It is scheduled on the Minikube node with IP address `192.168.99.100`, and the pod itself has the internal IP `172.17.0.3`.
- Container-specific information such as Container ID, image details, and current state are also provided.

Below the description, you will find an events section outlining the pod's lifecycle, which might appear as follows:

```
Initialized              True
Ready                    True
ContainersReady          True
PodScheduled             True
Volumes:
  default-token-f5ntk:
    Type: Secret (a volume populated by a Secret)
    SecretName: default-token-f5ntk
    Optional: false
    QoS Class: BestEffort
    Node-Selectors: <none>
    Tolerations: node.kubernetes.io/not-ready:NoExecute for 300s
                  node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason        Age   From               Message
  ----    ------        ----  ----               -------
  Normal  Scheduled     46s   default-scheduler  Successfully assigned default/nginx to minikube
  Normal  Pulling       45s   kubelet, minikube  Pulling image "nginx"
  Normal  Pulled        44s   kubelet, minikube  Successfully pulled image "nginx"
  Normal  Created       44s   kubelet, minikube  Created container nginx
  Normal  Started       44s   kubelet, minikube  Started container nginx
```

> [!important]
> **Understanding Pod Events**
>
> Each event provides a timestamp and message detailing stages such as scheduling, image pulling, container creation, and container start. This is crucial for troubleshooting.

## Viewing Pods with Extended Information

To get additional details such as the node and internal IP address where the pod is running, use the `--wide` flag:

```
kubectl get pods -o wide
```

The output might be:

```
NAME    READY   STATUS    RESTARTS   AGE     IP            NODE      NOMINATED NODE
nginx   1/1     Running   0          2m28s   172.17.0.3   minikube   <none>
```

This display confirms that each pod in a Kubernetes cluster receives its own internal IP address. In this example, the "nginx" pod has the IP address `172.17.0.3`.

## Summary

This demonstration showed you how to deploy a pod using a simple command in Minikube, inspect its configuration and lifecycle events with `kubectl describe`, and view extended information with the `--wide` flag. You can also create pods using YAML definition files for more advanced configurations.

For further reading, consider exploring:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Concepts: Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- [Minikube Installation Guide](https://minikube.sigs.k8s.io/docs/start/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/5b966a64-54c6-46ff-b284-4299f34c8f84/lesson/7b962369-07a0-44ce-9ebf-54c01042c16e)**
>
> Watch video content
