# Solution Pods optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Solution-Pods-optional)

---

## Table of Contents

- Solution Pods optional
  - 1. Verify Existing Pods
  - 2. Creating a Pod with the Nginx Image
  - 3. Inspecting Pod Details
  - 4. Working with a Multi-Container Pod (Web App)
  - 5. Deleting the Faulty Web App Pod
  - 6. Creating and Modifying a Redis Pod Using a YAML Definition
  - Conclusion
  - Watch Video
    - Determine Node Placement
    - Generating and Applying a YAML File
    - Updating the YAML to Correct the Image

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Core Concepts

# Solution Pods optional

In this lesson, you'll explore a hands-on lab that deepens your understanding of Kubernetes pods. We'll start by checking existing pods, create new ones with various images, inspect pod details, and adjust a pod configuration using YAML.

---

## 1\. Verify Existing Pods

First, examine the current pods running in your Kubernetes cluster by executing:

```
kubectl get pods
```

You might see an output similar to this:

```
kubectl get pods
No resources found in default namespace.
```

> [!important]
> **Namespace Reminder**
>
> This command checks pods in the default namespace. In future lessons, we'll dive deeper into namespaces and how they manage resources.

---

## 2\. Creating a Pod with the Nginx Image

To create a new pod using the Nginx image, use the following command:

```
kubectl run nginx --image=nginx
```

The pod creation is confirmed in the output:

```
pod/nginx created
```

After creating the pod, run the command again to see all current pods:

```
kubectl get pods
```

You might see a list similar to this:

```
NAME              READY   STATUS              RESTARTS   AGE
nginx             0/1     ContainerCreating   0          17s
newpods-llstt    0/1     ContainerCreating   0          11s
newpods-pnnx8    0/1     ContainerCreating   0          11s
newpods-k87fx    0/1     ContainerCreating   0          11s
```

Here, several pods have been created and will be examined further.

---

## 3\. Inspecting Pod Details

To inspect details about one of the newly created pods (for example, `newpods-llstt`), use:

```
kubectl describe pod newpods-llstt
```

This command outputs extensive information such as start time, node assignment, labels, and container details. In the section under "Containers," you should see an entry like:

```
Containers:
  busybox:
    Container ID:   containerd://b05cd692af1f3b433883f9a8ece19ec2e8c4fcf861aa97ae6a82857ed6037a6d
    Image:          busybox
    ...
```

The above confirms that the image used in the pod is `busybox`.

### Determine Node Placement

To see which nodes are hosting your pods, run:

```
kubectl get pods -o wide
```

Sample output:

```
NAME             READY   STATUS    RESTARTS   AGE   IP              NODE           NOMINATED NODE   READINESS GATES
SS GATES         1/1     Running   0          2m3s  10.42.0.10     controlplane   <none>           <none>
newpods-pnnx8    1/1     Running   0          2m3s  10.42.0.12     controlplane   <none>           <none>
newpods-llstt    1/1     Running   0          2m3s  10.42.0.11     controlplane   <none>           <none>
newpods-k87fx    1/1     Running   0          2m3s  10.42.0.9      controlplane   <none>           <none>
nginx            1/1     Running   0          2m9s  10.42.0.9      controlplane   <none>           <none>
```

All listed pods are running on the `controlplane` node.

---

## 4\. Working with a Multi-Container Pod (Web App)

Now consider a pod named `webapp` that includes two containers—one running the `nginx` image and the other using the `agentx` image. Check the status of the pods with:

```
kubectl get pods
```

You may observe output like the following:

```
NAME            READY   STATUS             RESTARTS   AGE
newpods-pnnx8   1/1     Running            0          2m33s
newpods-llstt   1/1     Running            0          2m33s
newpods-k87fx   1/1     Running            0          2m33s
nginx           1/1     Running            0          2m39s
webapp          1/2     ImagePullBackOff   0          15s
```

The `READY` column uses an X/Y format, where X represents the number of containers ready, and Y is the total containers in the pod. Here, the `webapp` pod shows that while one container (`nginx`) is running, the second container (`agentx`) is not, due to an image pull error.

To further inspect the `webapp` pod and diagnose the issue, run:

```
kubectl describe pod webapp
```

You'll notice that:

- The `nginx` container is in a Running state.
- The `agentx` container is in a Waiting state with the reason `ErrImagePull`, indicating that the image "agentx" could not be pulled from Docker Hub.

> [!important]
> **Image Pull Error**
>
> The error indicates that the Docker image `agentx` does not exist or cannot be found on Docker Hub. Verify the image name before redeploying.

---

## 5\. Deleting the Faulty Web App Pod

Since the `webapp` pod has an error, remove it using:

```
kubectl delete pod webapp
```

The standard output should confirm deletion:

```
pod "webapp" deleted
```

---

## 6\. Creating and Modifying a Redis Pod Using a YAML Definition

Next, you will create a pod named `redis` using an intentionally incorrect image (`redis123`) to simulate an error scenario. Although you can use `kubectl run` to create a pod, it's recommended to define it with a YAML file for better control and maintainability.

### Generating and Applying a YAML File

First, generate the YAML definition using a dry run:

```
kubectl run redis --image=redis123 --dry-run=client -o yaml > redis.yaml
```

The generated `redis.yaml` file looks like this:

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

Create the pod from the YAML file:

```
kubectl create -f redis.yaml
```

Check the pod status:

```
kubectl get pods
```

Expected output is similar to:

```
NAME             READY   STATUS         RESTARTS   AGE
newpods-pnnx8    1/1     Running        0          8m16s
newpods-llstt    1/1     Running        0          8m16s
newpods-k87fx    1/1     Running        0          8m16s
nginx            1/1     Running        0          8m22s
redis            0/1     ErrImagePull   0          10s
```

Because the image name is incorrect, the `redis` pod is in an `ErrImagePull` state.

### Updating the YAML to Correct the Image

To fix this error, edit the `redis.yaml` file to use the correct image name. Replace `redis123` with `redis`:

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

Apply the updated configuration:

```
kubectl apply -f redis.yaml
```

You might see a warning regarding a missing annotation, which is normal when applying changes to imperatively created resources.

Finally, verify that the pod is running:

```
kubectl get pods
```

An expected output would be:

```
NAME             READY   STATUS    RESTARTS   AGE
newpods-pnnx8    1/1     Running   0          9m38s
newpods-llstt    1/1     Running   0          9m38s
newpods-k87fx    1/1     Running   0          9m38s
nginx            1/1     Running   0          9m38s
redis            1/1     Running   0          92s
```

This confirms that the corrected pod is now in a running state.

---

## Conclusion

In this lab, you learned how to:

- Verify the current pod count.
- Create new pods using different images.
- Inspect detailed pod configurations with `kubectl describe`.
- Understand the significance of the `READY` column.
- Delete faulty pods.
- Define and modify pod configurations using YAML.

These practical exercises provide a solid foundation for working with pods in Kubernetes. Happy learning and explore further to master Kubernetes operations!

---

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/c6d2ac7d-8192-4cff-aa54-e36d888c5bd9/lesson/b7461b35-9ba1-4d83-afb8-b2bf9db7d9ae)**
>
> Watch video content
