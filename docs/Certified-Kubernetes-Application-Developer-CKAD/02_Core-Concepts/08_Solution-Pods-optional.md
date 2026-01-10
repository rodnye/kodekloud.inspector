# Solution Pods optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Core-Concepts/Solution-Pods-optional)

---

## Table of Contents

- Solution Pods optional
  - Listing Existing Pods
  - Creating a New Pod with the nginx Image
  - Inspecting Pod Details and Verifying the Image
  - Working with a Multi-Container Pod
  - Deleting the Erroneous Web App Pod
  - Creating and Correcting a Redis Pod
  - Conclusion
  - Watch Video
    - Step 1: Create the YAML File
    - Step 2: Create the Redis Pod
    - Step 3: Update the YAML File with the Correct Image

---

## Content

Certified Kubernetes Application Developer - CKAD

Core Concepts

# Solution Pods optional

In this lab, you will learn how to work with Pods in Kubernetes using both imperative commands and declarative YAML configurations. The lab covers checking existing Pods, creating new Pods with different images, inspecting their details, troubleshooting common errors, and updating configurations to fix issues.

---

## Listing Existing Pods

Start by listing the Pods in your default namespace. This step helps you verify that no unexpected Pods are running before you begin:

```
kubectl get pods
```

If no Pods are running, the output will look similar to:

```
controlplane ~ ⟫ kubectl get pods
No resources found in default namespace.
controlplane ~ ⟫
```

---

## Creating a New Pod with the nginx Image

Next, create a new Pod that uses the nginx image by executing:

```
kubectl run nginx --image=nginx
```

The output should confirm the creation of the Pod:

```
kubectl run nginx --image=nginx
pod/nginx created
```

Verify the creation by listing the Pods again:

```
kubectl get pods
```

You may see multiple Pods, especially if you have done previous exercises. For example:

```
controlplane ~ ➜ kubectl get pods
NAME            READY   STATUS              RESTARTS   AGE
nginx           0/1     ContainerCreating   0          17s
newpods-llstt   0/1     ContainerCreating   0          11s
newpods-pnnx8   0/1     ContainerCreating   0          11s
newpods-k87fx   0/1     ContainerCreating   0          11s
```

> [!important]
> **Note**
>
> Some Pods might still display "ContainerCreating" as they are in the process of being set up.

---

## Inspecting Pod Details and Verifying the Image

To inspect the details of a specific Pod and verify which image is used, run:

```
kubectl describe pod <pod-name>
```

For example, the detailed output may include:

```
Node:         controlplane/172.25.0.47
Start Time:   Fri, 15 Apr 2022 18:12:04 +0000
Labels:       tier=busybox
...
Containers:
  busybox:
    Container ID:   containerd://b05cd692af1f3b433883f9a8ece19ec2e8c4fcf861aa97ae6a82857ed6037a6d
    Image:          busybox
    Image ID:       docker.io/library/busybox@sha256:d2b533584f580310186df7a2055ce3ff83cc0df6caacf1e3489bf
    Command:
      sleep
      1000
    State:           Running
...
```

In this excerpt, the image used is **busybox**. You can also use the wide output option to display node information:

```
kubectl get pods -o wide
```

The output might be:

```
NAME              READY   STATUS    RESTARTS   AGE     IP            NODE         NOMINATED NODE   READY
newpods-pnnx8    1/1     Running   0          2m3s    10.42.0.10   controlplane  <none>           <none>
newpods-llstt    1/1     Running   0          2m3s    10.42.0.12   controlplane  <none>           <none>
newpods-k87fx    1/1     Running   0          2m3s    10.42.0.11   controlplane  <none>           <none>
nginx            1/1     Running   0          2m9s    10.42.0.9    controlplane  <none>           <none>
```

---

## Working with a Multi-Container Pod

Consider a Pod named `webapp` that contains two containers. To view the details of this multi-container Pod, run:

```
kubectl describe pod webapp
```

A sample excerpt from the description might show:

```
Priority: 0
Node: controlplane/172.25.0.47
Start Time: Fri, 15 Apr 2022 18:14:22 +0000
...
Containers:
  nginx:
    Container ID: containerd://42fc9932fb07a3047ea1902a6255e75139e981a37426e0d31ea5ec7a833481d
    Image: nginx
    State: Running
    Ready: True
    Restart Count: 0
    ...
  agentx:
    Container ID: agentx
    Image: agentx
    State: Waiting
    Reason: ErrImagePull
    Ready: False
    Restart Count: 0
    ...
```

In this Pod, the **nginx** container is running normally, while the **agentx** container is in a waiting state due to an image pull error (ErrImagePull). When you list the Pods, observe that the READY column indicates the number of ready containers versus the total containers:

```
kubectl get pods
NAME            READY   STATUS             RESTARTS   AGE
newpods-pnnx8   1/1     Running            0          2m33s
newpods-llstt   1/1     Running            0          2m33s
newpods-k87fx   1/1     Running            0          2m33s
nginx           1/1     Running            0          2m39s
webapp          0/1     ImagePullBackOff   0          15s
```

> [!important]
> **Warning**
>
> The `ErrImagePull` error indicates that Kubernetes failed to pull the image for the **agentx** container, likely because the image name is incorrect or the image does not exist on Docker Hub.

---

## Deleting the Erroneous Web App Pod

Since the `webapp` Pod contains an image pull error, remove it by running:

```
kubectl delete pod webapp
```

You should see a deletion confirmation:

```
pod "webapp" deleted
```

---

## Creating and Correcting a Redis Pod

Now, create a new Pod named `redis` using an intentionally incorrect image name (`redis123`). This exercise demonstrates how to use declarative YAML and fix common errors.

### Step 1: Create the YAML File

Generate the Pod definition using a dry run:

```
kubectl run redis --image=redis123 --dry-run=client -o yaml
```

Redirect the output to a file named `redis.yaml`. The file should resemble:

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
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

### Step 2: Create the Redis Pod

Apply the YAML file to create the Pod:

```
kubectl create -f redis.yaml
```

The expected output is:

```
pod/redis created
```

Verify the Pod status:

```
kubectl get pods
```

The output may look like:

```
NAME            READY   STATUS         RESTARTS   AGE
newpods-pnnx8   1/1     Running        0          8m16s
newpods-llstt   1/1     Running        0          8m16s
newpods-k87fx   1/1     Running        0          8m16s
nginx           1/1     Running        0          8m22s
redis           0/1     ErrImagePull   0          10s
```

Since the image name `redis123` is invalid, the Pod enters an `ErrImagePull` state.

### Step 3: Update the YAML File with the Correct Image

Edit the `redis.yaml` file to update the image name from `redis123` to `redis`. The updated file should be:

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
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

Apply the changes with:

```
kubectl apply -f redis.yaml
```

You might see a warning indicating that the Pod is missing an annotation necessary for future apply operations. After updating, verify the status again:

```
kubectl get pods
```

An example output is:

```
NAME            READY   STATUS    RESTARTS   AGE
newpods-pnnx8   1/1     Running   0          9m38s
newpods-llstt   1/1     Running   0          9m38s
newpods-k87fx   1/1     Running   0          9m44s
nginx           1/1     Running   0          9m44s
redis           1/1     Running   0          92s
```

The `redis` Pod is now running correctly thanks to the valid Docker image.

---

## Conclusion

In this lab, you learned how to:

- List existing Pods in a Kubernetes cluster.
- Create new Pods using imperative commands with different images.
- Inspect detailed information about Pods to verify configurations.
- Troubleshoot common issues like image pull errors.
- Use declarative YAML configurations to manage and update Pods.

Happy clustering and keep exploring more Kubernetes features!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/eae8cedf-d483-471f-8796-49f69baec6cf/lesson/30117c21-15b2-4bd2-871e-a5e4f49635c6)**
>
> Watch video content
