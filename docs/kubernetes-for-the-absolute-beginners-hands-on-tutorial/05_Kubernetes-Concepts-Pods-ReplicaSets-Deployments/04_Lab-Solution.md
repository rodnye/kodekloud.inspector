# Lab Solution - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-Concepts-Pods-ReplicaSets-Deployments/Lab-Solution)

---

## Table of Contents

- Lab Solution
  - Listing Existing Pods
  - Creating a New Pod with the Nginx Image
  - Inspecting Pod Details
  - Determining Pod Node Placement
  - Checking Container Status Within a Pod
  - Deleting the Web App Pod
  - Creating a New Pod with a Mistaken Redis Image
  - Correcting the Redis Pod Image
  - Conclusion
  - Watch Video

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes Concepts Pods ReplicaSets Deployments

# Lab Solution

In this article, we will guide you through a series of tasks related to managing pods in Kubernetes. You will learn how to list existing pods, create pods with different images, inspect pod details, troubleshoot image pull errors, and update pod configurations using YAML definitions.

──────────────────────────────

## Listing Existing Pods

To view the pods currently running in the default namespace, use the following command:

```
kubectl get pods
```

The output might look similar to this:

```
controlplane ~ → kubectl get pods
No resources found in default namespace.
controlplane ~ →
```

This output indicates that there are no pods running in the default namespace at the moment.

──────────────────────────────

## Creating a New Pod with the Nginx Image

To create a new pod using the `nginx` image, run the command below. Make sure to specify both the pod name and the image:

```
kubectl run nginx --image=nginx
```

After executing the command, you should see a confirmation message. Verify the pod list with:

```
controlplane ~ ➜ kubectl run nginx --image=nginx
pod/nginx created

controlplane ~ ➜ kubectl get pods
NAME            READY   STATUS              RESTARTS   AGE
nginx           0/1     ContainerCreating   0          17s
newpods-llstt   0/1     ContainerCreating   0          11s
newpods-pnnx8   0/1     ContainerCreating   0          11s
newpods-k87fx   0/1     ContainerCreating   0          11s
```

In this example, along with the newly created `nginx` pod, there are several other pods present (assumed to be a total of four pods during this lab exercise).

──────────────────────────────

## Inspecting Pod Details

To determine which container image a specific pod is using, inspect one of the pods in detail. For example, to inspect the pod named `newpods-llstt`, use:

```
kubectl describe pod newpods-llstt
```

A snippet of the output may resemble:

```
Name:           newpods-llstt
Namespace:      default
Priority:       0
Node:           controlplane/172.25.0.47
Start Time:     Fri, 15 Apr 2022 18:12:04 +0000
Labels:         tier=busybox
Annotations:    <none>
Status:         Running
IP:             10.42.0.12
Containers:
  busybox:
    Container ID:   containerd://b05cd692a1f13b433883f9a8ece19ec2e8c4fc861aa97ae6a82857ed6037a6d
    Image:          busybox
    Image ID:       docker.io/library/busybox@sha256:d2b535841580310186df7a2055ce3ff83cc0df6caacf1e3489bf
    Command:
      sleep
      1000
    State:          Running
    Started:        Fri, 15 Apr 2022 18:12:19 +0000
    Ready:          True
    Restart Count:  0
```

This output confirms that the container named `busybox` is using the `busybox` image.

──────────────────────────────

## Determining Pod Node Placement

To view the nodes on which your pods are running, use the `-o wide` option:

```
kubectl get pods -o wide
```

Sample output:

```
controlplane ~ ➜ kubectl get pods -o wide
NAME            READY   STATUS    RESTARTS   AGE     IP           NODE          NOMINATED NODE   READINESS GATES
newpods-pnnx8   1/1     Running   0          2m3s    10.42.0.10   controlplane   <none>           <none>
newpods-llstt   1/1     Running   0          2m3s    10.42.0.12   controlplane   <none>           <none>
newpods-k87fx   1/1     Running   0          2m3s    10.42.0.11   controlplane   <none>           <none>
nginx           1/1     Running   0          2m9s    10.42.0.9    controlplane   <none>           <none>
```

Every pod in this output is running on the `controlplane` node.

──────────────────────────────

## Checking Container Status Within a Pod

Consider a pod named `webapp` that contains two containers—one running `nginx` and another named `agentx`. To inspect the container details, use:

```
kubectl describe pod webapp
```

A relevant excerpt from the output might be:

```
Containers:
  nginx:
    Image:          nginx
    State:          Running
    Started:        Fri, 15 Apr 2022 18:14:24 +0000
    Ready:          True
  agentx:
    Image:          agentx
    State:          Waiting
    Reason:         ErrImagePull
    Ready:          False
```

The `agentx` container is currently waiting due to an image pull error—`ErrImagePull` indicates that Kubernetes was unable to locate the `agentx` Docker image on Docker Hub. The `READY` column in the `kubectl get pods` output will reflect this status (e.g., `1/2` indicating that only one out of two containers is ready).

> [!important]
> **Note**
>
> When troubleshooting image pull errors, verifying the image name and tag is essential. Ensure the image exists on the container registry you are using.

──────────────────────────────

## Deleting the Web App Pod

If you need to remove the `webapp` pod, execute the following command:

```
kubectl delete pod webapp
```

The output will confirm the pod deletion:

```
pod "webapp" deleted
```

──────────────────────────────

## Creating a New Pod with a Mistaken Redis Image

In this exercise, you will create a pod named `redis` using an intentional mistake in the image tag (`redis123`) to simulate an error scenario. Instead of using the `kubectl run` command directly, you will generate a YAML configuration file.

First, generate the YAML definition with a dry-run command:

```
kubectl run redis --image=redis123 --dry-run=client -o yaml
```

Redirect the output to a file named `Redis.yaml`. The generated YAML might appear as follows:

```
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: redis
  name: redis
spec:
  containers:
  - image: redis123
    name: redis
  dnsPolicy: ClusterFirst
  restartPolicy: Always
  status: {}
```

Create the pod using the YAML file:

```
kubectl create -f Redis.yaml
```

The pod will be created but will enter an error state due to the incorrect image name.

> [!important]
> **Warning**
>
> The pod will not run correctly until you update the image to a valid one. This step is crucial for ensuring the application runs as expected.

──────────────────────────────

## Correcting the Redis Pod Image

To resolve the error, update your YAML definition to use the correct image, `redis`. You can update the file directly and then apply your changes, or use the `kubectl edit` command.

The image below illustrates the process of updating the Redis pod’s image:

![A terminal interface with instructions to change a pod's image to "redis" and ensure it is in a running state.](https://kodekloud.com/kk-media/image/upload/v1752884862/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Lab-Solution/frame_620.jpg)

After editing, the YAML should be updated as follows:

```
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: redis
  name: redis
spec:
  containers:
  - image: redis
    name: redis
  dnsPolicy: ClusterFirst
  restartPolicy: Always
  status: {}
```

Apply the modified YAML with:

```
kubectl apply -f Redis.yaml
```

You might encounter a warning about the missing `kubectl.kubernetes.io/last-applied-configuration` annotation. The output will be similar to:

```
Warning: resource pods/redis is missing the kubectl.kubernetes.io/last-applied-configuration annotation which is required by kubectl apply. kubectl apply should only be used on resources created declaratively by either kubectl create --save-config or kubectl apply. The missing annotation will be patched automatically.
pod/redis configured
```

Confirm that the pod is now running by executing:

```
kubectl get pods
```

A sample output might look like this:

```
NAME           READY   STATUS    RESTARTS   AGE
newpods-pnnx8  1/1     Running   0          9m38s
newpods-llstt  1/1     Running   0          9m38s
newpods-k87fx  1/1     Running   0          9m44s
nginx          1/1     Running   0          9m44s
redis          1/1     Running   0          92s
```

The updated `redis` pod now indicates that all containers are running and ready.

──────────────────────────────

## Conclusion

In this lab solution, you learned how to:

- List pods in the default namespace.
- Create a pod using the `kubectl run` command.
- Inspect pod details to verify container images and node assignment.
- Troubleshoot image pull errors by diagnosing pod statuses (e.g., the `agentx` container).
- Create and update a pod using a YAML configuration.

Thank you for following along, and happy Kubernetes learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/0919dae3-bc94-479f-b205-d52156817c98/lesson/064c1be4-073a-45c4-8192-2d5b86cbda6e)**
>
> Watch video content
