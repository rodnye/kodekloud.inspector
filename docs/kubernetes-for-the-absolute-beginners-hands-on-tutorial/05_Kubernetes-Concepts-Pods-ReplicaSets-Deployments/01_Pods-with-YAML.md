# Pods with YAML - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-Concepts-Pods-ReplicaSets-Deployments/Pods-with-YAML)

---

## Table of Contents

- Pods with YAML
  - API Version
  - Kind
  - Metadata
  - Spec
  - Creating the Pod
  - Verifying the Pod
  - Summary
  - Additional Resources
  - Watch Video
    - Listing All Pods
    - Viewing Detailed Pod Information

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes Concepts Pods ReplicaSets Deployments

# Pods with YAML

Welcome to this comprehensive guide on creating a Kubernetes Pod using a YAML configuration file. This guide will walk you through the structure of Kubernetes YAML files and explain the essential fields required to define objects like Pods, ReplicaSets, Deployments, and Services.

Kubernetes resource definition files follow a consistent structure and always include four top-level fields:

- apiVersion
- kind
- metadata
- spec

Each of these fields plays a significant role in defining the object. Let’s explore them in detail.

## API Version

The `apiVersion` field specifies the Kubernetes API version used to create the object. For Pods, the version is typically set as:

```
apiVersion: v1
```

Keep in mind that other objects may require different versions, such as `apps/v1` for Deployments or `extensions/v1beta1` in legacy configurations.

## Kind

The `kind` field indicates the type of Kubernetes object to be created. For a Pod, it is defined as:

```
kind: Pod
```

For other object types, you might use values like `ReplicaSet`, `Deployment`, or `Service`.

## Metadata

In the `metadata` section, you provide key information about the Kubernetes object. This includes the object's name and labels, which are key-value pairs that assist in organizing and filtering resources. Note the following:

- The `name` field must be a string.
- The `labels` field is a dictionary where you can define several key-value pairs.

For instance, if you set labels such as `app: myapp` and `type: front-end`, it becomes easier to filter and manage your Pods later.

> [!important]
> **Important**
>
> Ensure that within the metadata section you only include properties expected by Kubernetes. Proper indentation is crucial—children properties must be indented relative to their parent, and sibling properties must share the same indentation level.

## Spec

The `spec` section describes the desired state of the object. For a Pod, this primarily involves specifying the list of containers. Although a Pod can run multiple containers, this example focuses on a single container defined within an array for clarity. Each container configuration includes properties like the container's name and the Docker image used.

Below is an example of a complete YAML configuration for a Pod:

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

> [!important]
> **Pro Tip**
>
> Save the above configuration as a file (for example, `pod-definition.yml`) and use it to deploy your Pod.

## Creating the Pod

To create the Pod from your YAML file, run the following command:

```
kubectl create -f pod-definition.yml
```

## Verifying the Pod

Once the Pod is created, you can verify its status using several `kubectl` commands.

### Listing All Pods

To list all Pods in your cluster, use:

```
kubectl get pods
```

Example output:

```
NAME       READY   STATUS    RESTARTS   AGE
myapp-pod  1/1     Running   0          20s
```

### Viewing Detailed Pod Information

For detailed information about the Pod, execute:

```
kubectl describe pod myapp-pod
```

Example output:

```
Name:           myapp-pod
Namespace:      default
Node:           minikube/192.168.99.100
Start Time:     Sat, 03 Mar 2018 14:26:14 +0800
Labels:         app=myapp
Annotations:    <none>
Status:         Running
IP:             172.17.0.2
Containers:
  nginx:
    Container ID:   docker://830bb56c8c42a86b4b70e9c1488fae1bc38663e491b6c2f5a783e7688b8c9d
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:4771d09578c7ca665299110b3ee1e0a25392f5ea261d82e4ffe7a4cab1c5de
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
  ----              ------
  Normal Scheduled  34s ago from default-scheduler
  Normal SuccessfulMountVolume  34s ago from kubelet, minikube
  Normal Pulling    37s ago from kubelet, minikube (Pulling image "nginx")
  Normal Pulled     37s ago from kubelet, minikube (Successfully pulled image "nginx")
  Normal Created    27s ago from kubelet, minikube (Created container)
  Normal Started    27s ago from kubelet, minikube (Started container)
```

This detailed output provides insights into the Pod's configuration, including its creation time, assigned labels, container specifics, and lifecycle events.

## Summary

This lesson covered the essential components of YAML configurations for creating a Kubernetes Pod. We reviewed the purpose of the `apiVersion`, `kind`, `metadata`, and `spec` fields, and demonstrated how to apply these in a practical example. In subsequent lessons, we will explore additional Kubernetes objects and configurations.

Happy learning and happy deploying!

## Additional Resources

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/0919dae3-bc94-479f-b205-d52156817c98/lesson/adaf98fb-6681-41b8-abc4-059391ab4c17)**
>
> Watch video content
