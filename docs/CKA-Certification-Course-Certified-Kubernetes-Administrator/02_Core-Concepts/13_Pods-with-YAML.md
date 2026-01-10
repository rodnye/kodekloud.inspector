# Pods with YAML - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Pods-with-YAML)

---

## Table of Contents

- Pods with YAML
  - Top-Level Fields in a Kubernetes YAML File
  - Creating and Verifying the Pod
  - Conclusion
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Core Concepts

# Pods with YAML

Welcome to this lesson on creating a Pod in Kubernetes using a YAML configuration file. In this guide, you'll learn how to structure your YAML file, create the Pod with kubectl, and verify its status. Kubernetes leverages YAML files to define objects such as Pods, ReplicaSets, Deployments, and Services. These definitions adhere to a consistent structure, with four essential top-level properties: apiVersion, kind, metadata, and spec.

## Top-Level Fields in a Kubernetes YAML File

Every Kubernetes definition file must include the following four fields:

```
apiVersion:
kind:
metadata:
spec:
```

1.  **apiVersion**  
    This field indicates the version of the Kubernetes API you are using. For a Pod, set `apiVersion: v1`. Depending on the object you define, you might need different versions such as apps/v1, extensions/v1beta1, etc.
2.  **kind**  
    This specifies the type of object being created. In this lesson, since we're creating a Pod, you'll define it as `kind: Pod`. Other objects might include ReplicaSet, Deployment, or Service.
3.  **metadata**  
    The metadata section provides details about the object, including its name and labels. It is represented as a dictionary. It is essential to maintain consistent indentation for sibling keys to ensure proper YAML nesting. For example:

    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: myapp-pod
      labels:
        app: myapp
    spec:
    ```

    > [!important]
    > **Indentation Reminder**
    >
    > Make sure that the properties under metadata (like name and labels) are indented to the same level. This is crucial for correct YAML parsing.

4.  **spec**  
    The spec section provides specific configuration details for the object. For a Pod, this is where you define its containers. Since a Pod can run multiple containers, the `containers` field is an array. In our example, with a single container, the array has just one item. The dash (`-`) indicates a list item, and each container must be defined with at least `name` and `image` keys.

Below is the complete YAML configuration for our Pod:

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

## Creating and Verifying the Pod

After you have saved your configuration (for example, as `pod-definition.yaml`), use the following command to create the Pod:

```
kubectl create -f pod-definition.yaml
```

Once the Pod is created, you can verify its status by listing all Pods:

```
kubectl get pods
```

You should see output similar to this:

```
NAME         READY   STATUS    RESTARTS   AGE
myapp-pod    1/1     Running   0          20s
```

To view detailed information about the Pod, run:

```
kubectl describe pod myapp-pod
```

This command provides extensive details, including metadata, node assignment, container specifics, and event history such as scheduling, volume mounting, and container start-up. Here is an example output:

```
Name:         myapp-pod
Namespace:    default
Node:         minikube/192.168.99.100
Start Time:   Sat, 03 Mar 2018 14:26:14 +0800
Labels:       app=myapp
Annotations:  <none>
Status:       Running
IP:           172.17.0.24
Containers:
  nginx:
    Container ID:   docker://830bb56c8c42a860b4b70e9c1488faelbc38663e49186bc2f5a78e7688b8c9d
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
  Type    Reason                 Age   From               Message
  ----    ------                 ----  ----               -------
  Normal  Scheduled              27s   default-scheduler  Successfully assigned myapp-pod to minikube
  Normal  SuccessfulMountVolume  27s   minikube           MountVolume.SetUp succeeded for volume "default-token-x95w7"
  Normal  Pulling                27s   minikube           pulling image "nginx"
  Normal  Pulled                 27s   minikube           Successfully pulled image "nginx"
  Normal  Created                27s   minikube           Created container
  Normal  Started                27s   minikube           Started container
```

> [!important]
> **Tip**
>
> Using `kubectl describe` helps you gain detailed insights into the internal state of your Pod, which can be invaluable for troubleshooting.

## Conclusion

In this lesson, you learned how to structure a Kubernetes YAML file for a Pod, create it using kubectl, and verify its status. This hands-on approach equips you to manage and troubleshoot your Kubernetes resources effectively. Happy Kubernetes-ing!

For more information, refer to the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/c6d2ac7d-8192-4cff-aa54-e36d888c5bd9/lesson/9fb5a3f6-ff8b-4b22-8e78-47c3ec4e5b49)**
>
> Watch video content
