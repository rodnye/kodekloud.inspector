# Demo Pods with YAML - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Kubernetes-Resources/Demo-Pods-with-YAML)

---

## Table of Contents

- Demo Pods with YAML
  - Step 1: Create the YAML File
  - Step 2: Define the Pod Structure
  - Step 3: Configure Container Specifications
  - Complete YAML Configuration
  - Step 4: Save Your YAML File
  - Step 5: Verify the YAML File
  - Step 6: Create the Pod
  - Step 7: Check Pod Status
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Kubernetes Resources

# Demo Pods with YAML

In this tutorial, you'll learn how to create a Kubernetes pod using a YAML definition file instead of the "kubectl run" command. Defining pod specifications in YAML provides better control over configuration and is a best practice in Kubernetes management.

The instructions below assume you're working on a Linux terminal using the Vim editor, but you can use any text editor of your choice. For Windows users, tools like Notepad++ offer enhanced syntax support compared to Notepad, while Linux users may prefer editors such as VI or Vim. In future lessons, we'll explore more advanced tools and IDEs to streamline YAML editing.

---

## Step 1: Create the YAML File

Open your terminal and create a file named "pod.yaml" using Vim:

```
vim pod.yaml
```

---

## Step 2: Define the Pod Structure

Begin your YAML file by specifying the four essential root-level properties: **apiVersion**, **kind**, **metadata**, and **spec**. Below are some key points to remember:

- **apiVersion**: For pods, this should be set to `v1`.
- **kind**: Must be defined as `Pod` (case sensitive).
- **metadata**: This section contains a dictionary where you can specify the pod's name and additional labels.
- **spec**: Contains pod specifications including the list of containers.

> [!important]
> **Important**
>
> Always use spaces for indentation (preferably two spaces) and avoid tabs to ensure YAML validity.

---

## Step 3: Configure Container Specifications

Within the **spec** section, include the **containers** property, which is a list of container objects. Each container should have:

- A unique name (e.g., `nginx`)
- An image reference (e.g., `nginx`)

For multiple containers, add additional objects to the list.

---

## Complete YAML Configuration

Below is a complete YAML configuration for a pod running a single container with the nginx image:

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

---

## Step 4: Save Your YAML File

Save the file and exit Vim by typing:

```
:wq
```

---

## Step 5: Verify the YAML File

To confirm the file's content and proper formatting, use the `cat` command as shown below:

```
admin@ubuntu-server kubernetes-for-beginners # cat pod.yaml
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

Take note of the alignment for **metadata** and **spec**. Correct indentation ensures that YAML is parsed correctly by Kubernetes.

---

## Step 6: Create the Pod

You can now create the pod using either the **create** or **apply** command with the `-f` option, which points to your YAML file:

```
kubectl apply -f pod.yaml
```

After running this command, you should see an output similar to:

```
pod/nginx created
```

---

## Step 7: Check Pod Status

To view the status of your pod, execute:

```
kubectl get pods
```

Initially, the pod may display a "ContainerCreating" state. After a brief period, it should transition to "Running".

For detailed information about your pod, including its specifications and current state, use:

```
kubectl describe pod nginx
```

This command provides comprehensive details that are helpful for troubleshooting and validation.

---

By following these steps, you have successfully defined and created a Kubernetes pod using a YAML configuration file. This method enhances reproducibility and clarity in your Kubernetes deployments.

For more Kubernetes basics and deep dives into YAML configurations, check out these resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/509501a0-727a-41b9-b9a5-e022735c098e/lesson/19f0117d-d8f5-4c7b-9e5d-b9b39c1f0faf)**
>
> Watch video content
