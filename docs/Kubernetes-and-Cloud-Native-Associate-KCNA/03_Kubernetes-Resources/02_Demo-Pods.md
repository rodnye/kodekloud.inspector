# Demo Pods - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Kubernetes-Resources/Demo-Pods)

---

## Table of Contents

- Demo Pods
  - Pod Operations
  - Watch Video
    - Creating a Pod
    - Inspecting Pod Details
    - Viewing Pod Information in Wide Format

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Kubernetes Resources

# Demo Pods

In this tutorial, you'll learn how to deploy a pod in your Minikube cluster. A pod is the smallest and simplest deployable unit in Kubernetes, designed to hold one or more application containers. We'll use the `kubectl` command-line tool to interact with our cluster.

> [!important]
> **Note**
>
> You can specify an image tag or use an alternative container registry if your desired image is hosted elsewhere.

## Pod Operations

### Creating a Pod

To create a pod named "nginx" using the Docker image "nginx" (pulled from Docker Hub), run the following command:

```
kubectl run nginx --image=nginx
```

Once this command executes, Kubernetes creates the pod. You can verify its creation and status by checking the list of pods:

```
# kubectl run nginx --image=nginx
pod/nginx created


# kubectl get pods
NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          3s
```

The output confirms that the pod is running. The "READY" column indicates how many containers are in a ready state, "RESTARTS" shows the number of times the container has restarted, and "AGE" reflects how long the pod has been active.

### Inspecting Pod Details

For more in-depth information about the pod—including its labels, node assignment, internal IP address, and container specifics—use the `kubectl describe` command:

```
# kubectl run nginx --image=nginx
pod/nginx created


# kubectl get pods
NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          3s


# kubectl describe pod nginx
Name:           nginx
Namespace:      default
Priority:       0
Node:           minikube/192.168.99.100
Start Time:     Sat, 11 Jul 2020 00:49:39 -0400
Labels:         run=nginx
Annotations:    <none>
Status:         Running
IP:             172.17.0.3
IPs:
  IP: 172.17.0.3
Containers:
  nginx:
    Container ID:   docker://987785b312ad2e38c77132300f8709b8a027566462c2d18634ff13b34
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:a23a9056789b968a186c5205f4
```

This command output provides essential metadata and status details such as the pod's start time, the node it is running on, and its internal IP address (172.17.0.3). If multiple containers were running within the pod, each would be listed under the "Containers" section.

Additionally, the bottom section of the output displays event information that tracks the lifecycle of the pod—from scheduling on the Minikube node to pulling the image and finally creating and launching the container:

```
Initialized           True
Ready                 True
ContainersReady       True
PodScheduled          True
Volumes:
  default-token-f5ntk:
    Type:           Secret (a volume populated by a Secret)
    SecretName:     default-token-f5ntk
    Optional:       false
    QoS Class:      BestEffort
    Node-Selectors: <none>
    Tolerations:
      node.kubernetes.io/not-ready:NoExecute for 300s
      node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason             Age   From                Message
  ----    ------             ----  ----                -------
  Normal  Scheduled          46s   default-scheduler   Successfully assigned default/nginx to minikube
  Normal  Pulling            45s   kubelet, minikube   Pulling image "nginx"
  Normal  Pulled             44s   kubelet, minikube   Successfully pulled image "nginx"
  Normal  Created            44s   kubelet, minikube   Created container nginx
  Normal  Started            44s   kubelet, minikube   Started container nginx
```

### Viewing Pod Information in Wide Format

For a summary that also includes node and internal IP details, use the following command:

```
kubectl get pods -o wide
```

The output will resemble:

```
NAME    READY   STATUS    RESTARTS   AGE     IP           NODE       NOMINATED NODE
nginx   1/1     Running   0          2m28s   172.17.0.3   minikube   <none>
```

Here, each pod is assigned its own internal IP address (in this case, 172.17.0.3), which enables network communications within the cluster.

---

This demonstration has shown how to deploy a pod in a Minikube environment using the `kubectl` command line. In upcoming lessons, we will explore how to define pods using YAML configuration files for more complex deployment scenarios.

For further reading and detailed Kubernetes concepts, visit the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/509501a0-727a-41b9-b9a5-e022735c098e/lesson/9c2de9f5-180b-494e-970b-639cad788168)**
>
> Watch video content
