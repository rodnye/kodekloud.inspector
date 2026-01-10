# PODs with YAML - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/PODs-with-YAML)

---

## Table of Contents

- PODs with YAML
  - Table of Contents
  - Understanding the Top-Level Fields
  - Pod Definition Skeleton
  - Detailed Field Breakdown
  - Deploying Your Pod
  - Inspecting Your Pod
  - Summary
  - Links and References
  - Watch Video
    - apiVersion
    - kind
    - metadata
    - spec
    - List All Pods
    - Describe a Pod

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# PODs with YAML

Welcome to this comprehensive guide where you'll learn how to define and manage a Kubernetes Pod using a YAML configuration file. Kubernetes relies on declarative YAML manifests to create and update resources such as Pods, Deployments, and Services. By the end of this tutorial, you'll understand the required fields, best practices for YAML structure, and how to deploy and inspect your Pod.

## Table of Contents

1.  [Understanding the Top-Level Fields](#understanding-the-top-level-fields)
2.  [Pod Definition Skeleton](#pod-definition-skeleton)
3.  [Detailed Field Breakdown](#detailed-field-breakdown)
4.  [Deploying Your Pod](#deploying-your-pod)
5.  [Inspecting Your Pod](#inspecting-your-pod)
6.  [Summary](#summary)
7.  [Links and References](#links-and-references)

---

## Understanding the Top-Level Fields

Every Kubernetes manifest shares four mandatory top-level fields. These fields tell Kubernetes what to create, how to version it, and any additional identifying metadata or configuration details.

| Field      | Description                                                | Example             |
| ---------- | ---------------------------------------------------------- | ------------------- |
| apiVersion | API group and version for the resource                     | `v1`                |
| kind       | Type of Kubernetes object (Pod, Deployment, Service, etc.) | `Pod`               |
| metadata   | Key/value pair metadata, including `name` and `labels`     | `name: myapp-pod`   |
| spec       | Desired state specification, varies per resource type      | `containers: [...]` |

> [!important]
> **YAML Indentation Matters**
>
> YAML is indentation-sensitive. Always use spaces (not tabs) and ensure child elements are indented correctly under their parent keys.

---

## Pod Definition Skeleton

Start with the minimal skeleton for a Pod manifest:

```
apiVersion: v1
kind: Pod
metadata:
spec:
```

You’ll expand each section to specify your Pod’s name, labels, and container settings.

---

## Detailed Field Breakdown

### apiVersion

Defines the API group and version that Kubernetes will use to process this resource.  
For Pods, it’s always:

```
apiVersion: v1
```

### kind

Specifies the type of object to create. For this tutorial:

```
kind: Pod
```

Other common values include `Deployment`, `Service`, and `ReplicaSet`.

### metadata

Contains identifying information such as the resource’s name and optional labels for grouping and selection.

```
metadata:
  name: myapp-pod
  labels:
    app: myapp
    tier: frontend
```

- **name:** A unique identifier for the Pod within its namespace.
- **labels:** Arbitrary key/value pairs for organizational or selection purposes.

### spec

Defines the desired state. In a Pod, this means listing the containers it should run.

```
spec:
  containers:
    - name: nginx-container
      image: nginx:latest
      ports:
        - containerPort: 80
```

Key points:

- `containers` is a YAML list; you can define multiple containers per Pod.
- Each container requires at least a `name` and `image`.
- You can optionally define ports, environment variables, volume mounts, and more.

> [!important]
> **Field Name Constraints**
>
> Kubernetes object names must:
>
> - Contain only lowercase alphanumeric characters and `-`.
> - Start and end with an alphanumeric character.
> - Be unique within a namespace.

---

## Deploying Your Pod

1.  Save your manifest to `pod-definition.yaml`.
2.  Run the following command to create the Pod:

```
kubectl create -f pod-definition.yaml
```

You should see:

```
pod/myapp-pod created
```

---

## Inspecting Your Pod

### List All Pods

```
kubectl get pods
```

Sample output:

```
NAME        READY   STATUS    RESTARTS   AGE
myapp-pod   1/1     Running   0          30s
```

### Describe a Pod

To view detailed status and event logs:

```
kubectl describe pod myapp-pod
```

Key sections in the output include `Labels`, `Containers`, `Conditions`, and recent `Events`.

---

## Summary

In this lesson, you learned how to:

1.  Structure a basic Kubernetes Pod manifest with the required top-level fields.
2.  Define metadata and container specifications in YAML.
3.  Deploy your Pod using `kubectl create`.
4.  Inspect status and logs with `kubectl get` and `kubectl describe`.

Up next, we’ll explore Deployments and how they automate pod scaling and updates.

---

## Links and References

- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- [Kubernetes API Concepts](https://kubernetes.io/docs/concepts/overview/kubernetes-api/)
- [Kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/7aedae91-8b20-49ab-8c8b-a893168ee158)**
>
> Watch video content
