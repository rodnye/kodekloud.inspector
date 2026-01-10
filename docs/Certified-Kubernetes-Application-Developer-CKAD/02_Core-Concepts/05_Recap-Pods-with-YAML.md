# Recap Pods with YAML - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Core-Concepts/Recap-Pods-with-YAML)

---

## Table of Contents

- Recap Pods with YAML
  - Key Components of a Kubernetes YAML File
  - Complete YAML Example for a Pod
  - Verifying Your Pod
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Core Concepts

# Recap Pods with YAML

In this lesson, we explore how to create a Kubernetes Pod using a YAML configuration file. YAML files are fundamental to Kubernetes and are used to define various objects such as Pods, ReplicaSets, Deployments, and Services. Every Kubernetes definition file follows a standard structure with four top-level fields: apiVersion, kind, metadata, and spec. These properties are required for your configuration file to be valid.

## Key Components of a Kubernetes YAML File

1.  **apiVersion**  
    This field specifies the version of the Kubernetes API that is used to create the object. For a Pod, you'll typically use "v1". Different objects may require other versions such as apps/v1beta or extensions/v1beta, but for our purpose, "v1" is used.
2.  **kind**  
    The kind denotes the type of object you're creating. In this lesson, we're creating a Pod. Other valid values include ReplicaSets, Deployments, or Services.
3.  **metadata**  
    Metadata provides essential information about the object, including its name, labels, and other identifying data. It is important that all properties under metadata (like name and labels) are indented consistently. This indentation ensures that these properties are recognized as siblings rather than nested incorrectly.

    > [!important]
    > **Note**
    >
    > Ensure that all sibling properties under metadata share the same indentation level to avoid YAML parsing errors.

    Below is an example YAML snippet demonstrating proper indentation:

    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: myapp-pod
      labels:
        app: myapp
    spec:
    ```

4.  **spec**  
    The spec section contains the detailed configuration for the object. In the case of a Pod, this is where you specify one or more containers and their properties. Although a Pod can run multiple containers, in this example, we define a single container.

## Complete YAML Example for a Pod

Below is a complete YAML configuration for creating a Pod with one container that runs the nginx image:

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    type: front-end
spec:
  containers:
    - name: nginx-container
      image: nginx
```

After saving this configuration to a file (for example, `pod-definition.yaml`), you can create the Pod in Kubernetes with the following command:

```
kubectl create -f pod-definition.yaml
```

## Verifying Your Pod

Once you have created the Pod, you can check its status using:

```
kubectl get pods
```

This command lists all the Pods currently running. A sample output might look like this:

```
NAME        READY   STATUS    RESTARTS   AGE
myapp-pod   1/1     Running   0          20s
```

To view detailed information about the Pod—including node placement, container details, and recent events—use the following command:

```
kubectl describe pod myapp-pod
```

An example excerpt from the detailed output is shown below:

```
Name:              myapp-pod
Namespace:         default
Node:              minikube/192.168.99.100
Start Time:        Sat, 03 Mar 2018 14:26:14 +0800
Labels:            app=myapp
Annotations:       <none>
Status:            Running
IP:                172.17.0.24
Containers:
  nginx-container:
    Container ID:   docker://830bb56c8c42a860b4b70e9c1488fae1bc38663e4918b6c2f5a78e768b8c9d
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:4771d09578c7ca65299e110b3ee1c0a2592f5ea2618d32e4ffe7a4cab1c5de
    Port:           <none>
    State:          Running
      Started:      Sat, 03 Mar 2018 14:26:21 +0800
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-x95w7 (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  PodScheduled      True
Events:
  Type    Reason                  Age   From                  Message
  Normal  Scheduled               27s   default-scheduler     Successfully assigned myapp-pod to minikube
  Normal  SuccessfulMountVolume   27s   minikube              MountVolume.SetUp succeeded for volume "default-token-x95w7"
  Normal  Pulling                 27s   minikube              pulling image "nginx"
  Normal  Pulled                  27s   minikube              Successfully pulled image "nginx"
  Normal  Created                 27s   minikube              Created container
  Normal  Started                 27s   minikube              Started container
```

This detailed output provides crucial insights into the Pod’s specifications, such as its running state, the container image details, and the events that occurred—from scheduling to container initiation.

> [!important]
> **Tip**
>
> Review the YAML configuration structure and verify command outputs to ensure your Kubernetes objects are correctly defined and running as expected.

Happy coding and enjoy exploring Kubernetes with YAML!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/eae8cedf-d483-471f-8796-49f69baec6cf/lesson/39763c09-57f7-4797-a726-4b7f8ecb0658)**
>
> Watch video content
