# Demo Pods with YAML - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-Concepts-Pods-ReplicaSets-Deployments/Demo-Pods-with-YAML)

---

## Table of Contents

- Demo Pods with YAML
  - Step 1: Preparing the YAML File
  - Step 2: Verifying the YAML File
  - Step 3: Creating the Pod
  - Step 4: Checking Pod Status
  - Next Steps
  - Watch Video

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes Concepts Pods ReplicaSets Deployments

# Demo Pods with YAML

In this article, we will walk you through the process of creating a Kubernetes Pod using a YAML definition file. Instead of using the traditional "kubectl run" command, you will learn how to define all pod specifications within a YAML file and then deploy the pod with the appropriate kubectl commands. This approach not only promotes consistency but also enhances version control.

## Step 1: Preparing the YAML File

Choose your favorite text editor to create the YAML file. On Windows, Notepad++ is a recommended option due to its syntax support, while on Linux, editors like vi or vim work well. In this example, we will use vim.

Open your terminal and create a new file named `pod.yaml`:

```
vim pod.yaml
```

Inside `pod.yaml`, we define four top-level properties: `apiVersion`, `kind`, `metadata`, and `spec`. Consider the following key points:

- **apiVersion**: Use `"v1"` for a pod.
- **kind**: Set this to `"Pod"` (note the case sensitivity with a capital "P").
- **metadata**: This section acts as a dictionary where you can specify the pod’s name and labels. In our example, we assign the name `"nginx"` and labels such as `app: nginx` and `tier: frontend`.
- **spec**: Under this key, you define a list of containers. Each container has attributes like a name and an image. Here, we define a single container also named `"nginx"` using the Docker Hub image `nginx`.

Below is the complete YAML file for our pod definition:

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
> **Note**
>
> Ensure consistent indentation in your YAML file. Use two spaces per indent level (avoid using tabs) to guarantee that keys like `name` and `labels` are recognized as children of the `metadata` key, and similarly for entries under `spec`.

After editing the file, save and exit vim by pressing Escape and typing `:wq`.

## Step 2: Verifying the YAML File

To confirm that your YAML file is correctly saved and formatted, use the `cat` command:

```
cat pod.yaml
```

You should see the YAML content displayed exactly as defined.

## Step 3: Creating the Pod

To deploy the pod to your Kubernetes cluster, you have the option of using either the `create` or `apply` commands. Although both function similarly when creating new objects, we will use the `apply` command:

```
kubectl apply -f pod.yaml
```

The expected output should be:

```
pod/nginx created
```

## Step 4: Checking Pod Status

Once created, it is important to verify that the pod is running properly. First, list all pods using:

```
kubectl get pods
```

At first, the pod may be in a "ContainerCreating" state before transitioning to "Running." For detailed information about the pod, including container statuses, volumes, and events, run the following describe command:

```
kubectl describe pod nginx
```

An example output of this command might look like:

```
Initialized                True
Ready                      True
ContainersReady            True
PodScheduled               True
Volumes:
  default-token-f5ntk:
    Type:          Secret (a volume populated by a Secret)
    SecretName:    default-token-f5ntk
    Optional:      false
QoS Class:     BestEffort
Node-Selectors: <none>
Tolerations:
  node.kubernetes.io/not-ready:NoExecute for 300s
  node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age   From               Message
  ----    -----      ----  ----               ------
  Normal  Scheduled  21s   default-scheduler  Successfully assigned default/nginx to m
  Normal  Pulling    20s   kubelet, minikube  Pulling image "nginx"
  Normal  Pulled     14s   kubelet, minikube  Successfully pulled image "nginx"
  Normal  Created    14s   kubelet, minikube  Created container nginx
  Normal  Started    14s   kubelet, minikube  Started container nginx
```

> [!important]
> **Tip**
>
> For further troubleshooting or monitoring, refer to the detailed events in the `kubectl describe pod nginx` output. This information is crucial for debugging pod-related issues.

## Next Steps

In the following section, we will share some tips and tricks to simplify YAML development with various integrated development environments (IDEs). This will help you efficiently manage and deploy Kubernetes configurations.

---

For more detailed Kubernetes documentation, visit [Kubernetes Documentation](https://kubernetes.io/docs/).  
If you need additional resources or support, consider exploring:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Terraform Registry](https://registry.terraform.io/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/0919dae3-bc94-479f-b205-d52156817c98/lesson/ce127af3-6ffe-4ff9-a547-3f7a314882bc)**
>
> Watch video content
