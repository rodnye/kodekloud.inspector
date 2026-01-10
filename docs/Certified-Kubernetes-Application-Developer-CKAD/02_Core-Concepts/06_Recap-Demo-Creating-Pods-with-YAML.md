# Recap Demo Creating Pods with YAML - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Core-Concepts/Recap-Demo-Creating-Pods-with-YAML)

---

## Table of Contents

- Recap Demo Creating Pods with YAML
  - Creating the Pod Definition File
  - Deploying the Pod
  - Additional Resources
  - Watch Video
    - 1. Create a New Project and File
    - 2. Define the Metadata
    - 3. Adding Optional Labels
    - 4. Define the Pod Spec
    - 1. Setup Folder Structure on the Kubernetes Master Node
    - 2. Create the YAML File
    - 3. Clean Up Existing Pods
    - 4. Create the Pod

---

## Content

Certified Kubernetes Application Developer - CKAD

Core Concepts

# Recap Demo Creating Pods with YAML

Welcome to this comprehensive guide on creating a Kubernetes pod using a YAML definition file. In this article, you will learn how to write a YAML file from scratch and deploy it into a Kubernetes cluster. You can create YAML files using any text editor, such as Notepad, Notepad++, or Atom, or even an integrated development environment (IDE) like PyCharm. I recommend PyCharm for its excellent YAML support. If you're interested, visit [PyCharm by JetBrains](https://jetbrains.com/PyCharm) to download the Professional or free Community edition.

![The image shows a webpage for PyCharm, a Python IDE for professional developers, with a download button and navigation links at the top.](https://kodekloud.com/kk-media/image/upload/v1752871185/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Recap-Demo-Creating-Pods-with-YAML/frame_60.jpg)

![The image shows a webpage for downloading PyCharm, offering Professional and Community editions for Python development, with download buttons and additional information.](https://kodekloud.com/kk-media/image/upload/v1752871187/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Recap-Demo-Creating-Pods-with-YAML/frame_70.jpg)

Below is a step-by-step walkthrough to guide you in creating a pod definition file and deploying it on your Kubernetes environment.

---

## Creating the Pod Definition File

### 1\. Create a New Project and File

Begin by creating a new project called `pod`. Inside this project, create a file named `pod-definition.yaml`. Every Kubernetes YAML file typically includes the following root-level properties: `apiVersion`, `kind`, `metadata`, and `spec`. For a pod, set the `apiVersion` to `v1` and `kind` to `Pod`.

### 2\. Define the Metadata

In the `metadata` section, provide essential details such as the pod's `name` and associated `labels` for grouping. For instance:

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
```

When using PyCharm, you'll notice a tree-view panel that displays the YAML file structure. This visualization confirms that `apiVersion`, `kind`, `metadata`, and `spec` are at the same root level. Make sure the `name` and `labels` entries have identical indentation. Incorrect indentation might mistakenly nest `labels` under `name`, leading to errors.

### 3\. Adding Optional Labels

Enhance your pod's metadata by adding extra labels, such as cost center or geographical location, to better organize your resources. Here’s an example:

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    costcenter: amer
    location: NA
spec:
```

This flexible labeling approach enables more efficient management of your deployments.

### 4\. Define the Pod Spec

Under the `spec` section, specify the container details. The `containers` field accepts an array; each container is introduced by a dash (`-`) followed by its configuration, such as `name` and `image`. The example below defines a pod with a single container running an Nginx image:

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
    - name: nginx-container
      image: nginx
```

For scenarios with multiple containers, add another item to the list. For example:

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
    - name: nginx-container
      image: nginx
    - name: backend-container
      image: redis
```

> [!important]
> **Note**
>
> For this demonstration, we are only using one container.

---

## Deploying the Pod

After finalizing your `pod-definition.yaml`, follow these instructions to deploy it to your Kubernetes cluster.

### 1\. Setup Folder Structure on the Kubernetes Master Node

Log in to your Kubernetes master node and create a directory structure for your demos:

```
root@kubemaster:/home/osboxes# mkdir demos
root@kubemaster:/home/osboxes# cd demos
root@kubemaster:/home/osboxes/demos# mkdir pod
root@kubemaster:/home/osboxes/demos# cd pod
```

### 2\. Create the YAML File

Paste the contents of your `pod-definition.yaml` into a new file on the master node. For instance, execute:

```
root@kubemaster:/home/osboxes/demos/pod# cat > pod-definition.yml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
    - name: nginx-container
      image: nginx
```

After creating the file, verify its contents using the `cat` command.

### 3\. Clean Up Existing Pods

Before deploying your new pod, ensure there are no conflicting pods already running. If a pod was previously deployed with a command like `kubectl run`, delete it by executing:

```
root@kubemaster:/home/osboxes/demos/pod# kubectl get pods
NAME                           READY   STATUS    RESTARTS   AGE
nginx-8586cf59-wf5r4           1/1     Running   0          59m
root@kubemaster:/home/osboxes/demos/pod# kubectl delete deployment nginx
```

Confirm the deletion by listing pods again:

```
root@kubemaster:/home/osboxes/demos/pod# kubectl get pods
No resources found.
```

### 4\. Create the Pod

Now, create the pod with the following command:

```
root@kubemaster:/home/osboxes/demos/pod# kubectl create -f pod-definition.yml
pod "myapp-pod" created
```

You can monitor the pod’s creation by running:

```
root@kubemaster:/home/osboxes/demos/pod# kubectl get pods
NAME        READY   STATUS             RESTARTS   AGE
myapp-pod   0/1     ContainerCreating   0          8s
```

After a few moments, check the pod status again:

```
root@kubemaster:/home/osboxes/demos/pod# kubectl get pods
NAME        READY   STATUS      RESTARTS   AGE
myapp-pod   1/1     Running     0          19s
```

This confirms the pod has been successfully created and is now running in your cluster.

---

That concludes our guide on creating a Kubernetes pod using a YAML file. In the next article, we’ll explore additional tips for managing YAML files in PyCharm. Happy coding and deployment!

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/eae8cedf-d483-471f-8796-49f69baec6cf/lesson/cdfea1e4-4fe7-41af-8154-f42b8e5f6bd3)**
>
> Watch video content
