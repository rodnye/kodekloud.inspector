# Demo Pods with YAML - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Demo-Pods-with-YAML)

---

## Table of Contents

- Demo Pods with YAML
  - Step 1: Creating the YAML File
  - Step 2: Saving and Verifying the YAML File
  - Step 3: Creating the Pod in the Cluster
  - Step 4: Inspecting the Pod Details
  - Conclusion
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Core Concepts

# Demo Pods with YAML

In this lesson, we will create a Kubernetes Pod using a YAML definition file instead of the "kubectl run" command. This method offers more control by allowing you to define pod specifications explicitly in a file. You can choose any text editor for this task; for instance, Windows users may prefer Notepad++ over Notepad, while Linux users might opt for vim. In future sections, we will explore additional IDEs and tools to streamline YAML editing, but we will stick with the basics for now.

## Step 1: Creating the YAML File

Open your terminal and use vim to create a file named pod.yaml:

```
vim pod.yaml
```

Inside the file, define the following key elements:

- **apiVersion:** Should be set to `v1` for a Pod.
- **kind:** Must be `Pod` (case-sensitive).
- **metadata:** A dictionary that includes the pod's name and any labels used for grouping.
- **spec:** Contains the pod specifications, including a list of containers.

> [!important]
> **Note**
>
> Be sure to follow proper indentation rules. Use two spaces per level (avoid tabs), as misalignment can lead to errors.

Below is a complete example configuration for a single-container Pod using the `nginx` image:

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    app: nginx
    tier: frontend
spec:
  containers:
    - name: nginx
      image: nginx
```

> [!important]
> **Tip**
>
> To add additional containers, insert another block within the containers list with the appropriate name and image.

## Step 2: Saving and Verifying the YAML File

After editing the file, exit vim and save your changes by typing:

```
:wq
```

Verify the contents of your YAML file with:

```
cat pod.yaml
```

The output should match the YAML configuration shown above.

## Step 3: Creating the Pod in the Cluster

Create the Pod on your Kubernetes cluster using your YAML file. You can use either the `kubectl create` or `kubectl apply` command. Here’s an example with `kubectl apply`:

```
kubectl apply -f pod.yaml
# Output:
# pod/nginx created
```

To check the status of your Pod, run:

```
kubectl get pods
```

Initially, you might see an output similar to this:

```
NAME    READY   STATUS              RESTARTS   AGE
nginx   0/1     ContainerCreating   0          7s
```

After a short while, re-running the command should show the Pod in a running state:

```
kubectl get pods
```

Example output:

```
NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          9s
```

## Step 4: Inspecting the Pod Details

For a detailed overview of your Pod, use the `kubectl describe` command:

```
kubectl describe pod nginx
```

This command provides comprehensive details about the Pod, including container statuses, event logs, volumes, and node assignments. Below is an example of typical output:

```
Initialized              True
Ready                    True
ContainersReady          True
PodScheduled             True
Volumes:
  default-token-f5ntk:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-f5ntk
    Optional:    false
QoS Class:   BestEffort
Node-Selectors: <none>
Tolerations: node.kubernetes.io/not-ready:NoExecute for 300s
             node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type     Reason        Age   From                Message
  ----     ------        ----  ----                -------
  Normal   Scheduled     21s   default-scheduler   Successfully assigned default/nginx to minikube
  Normal   Pulling       20s   kubelet, minikube   Pulling image "nginx"
  Normal   Pulled        14s   kubelet, minikube   Successfully pulled image "nginx"
  Normal   Created       14s   kubelet, minikube   Created container nginx
  Normal   Started       14s   kubelet, minikube   Started container nginx
```

## Conclusion

This demonstration has guided you through creating a Kubernetes Pod using a YAML configuration file. This approach not only reinforces good configuration practices but also provides enhanced flexibility compared to command-based object creation. In our next lesson, we will cover advanced IDEs and tools to further ease YAML file management.

For additional reading and resources, check out:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/c6d2ac7d-8192-4cff-aa54-e36d888c5bd9/lesson/94035645-87a0-4b78-a5f8-e66a3f3c228c)**
>
> Watch video content
