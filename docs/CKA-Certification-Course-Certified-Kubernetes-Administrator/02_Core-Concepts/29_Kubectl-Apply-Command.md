# Kubectl Apply Command - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Kubectl-Apply-Command)

---

## Table of Contents

- Kubectl Apply Command
  - Basic Example
  - How kubectl apply Works Internally
  - Managing Removed Fields
  - Last Applied Configuration Annotation
  - Actionable Summary
  - Conclusion
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Core Concepts

# Kubectl Apply Command

In this article, we explore how the kubectl apply command works and what happens internally during its execution. Using kubectl apply for declarative management of Kubernetes objects is common practice, and here we dive into details such as configuration comparisons and update processing.

## Basic Example

Consider the following local YAML configuration file (nginx.yaml) that defines a Pod:

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    type: front-end-service
spec:
  containers:
    - name: nginx-container
      image: nginx:1.18
```

Apply this configuration with:

```
kubectl apply -f nginx.yaml
```

You can also apply all configuration files within a directory:

```
kubectl apply -f /path/to/config-files
```

## How kubectl apply Works Internally

When you run the kubectl apply command, it compares three sources:

1.  The local configuration file (e.g., nginx.yaml).
2.  The live object configuration stored on the Kubernetes cluster.
3.  The last applied configuration stored as an annotation on the live object.

If the object does not exist, Kubernetes creates it based on your local configuration. During creation, Kubernetes internally adds additional fields to monitor the object's status. Notice that the YAML configuration is converted to JSON and stored as the "last applied configuration" in an annotation. This information is used during subsequent updates to identify any differences.

> [!important]
> **Note**
>
> When the local configuration is changed (for example, updating the image version), kubectl apply performs a three-way merge using the local file, live configuration, and the last applied configuration.

For instance, if you update the image version from 1.18 to 1.19 in your local file:

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    type: front-end-service
spec:
  containers:
    - name: nginx-container
      image: nginx:1.19
```

and run:

```
kubectl apply -f nginx.yaml
```

kubectl compares the three configurations. If differences are detected—such as the updated image version—the live object is updated and the annotation storing the last applied configuration is refreshed.

## Managing Removed Fields

The last applied configuration annotation is crucial when fields are removed from your local configuration. For example, if you remove the "type" label:

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
      image: nginx:1.19
```

and run:

```
kubectl apply -f nginx.yaml
```

kubectl notices that the "type" label, which existed in the last applied configuration, is now absent locally. As a result, it removes this field from the live configuration.

## Last Applied Configuration Annotation

When kubectl apply is executed for the first time, the YAML configuration is converted to JSON and stored as an annotation under the key `kubectl.kubernetes.io/last-applied-configuration`. The following snippet shows an example of a live object with this annotation:

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: '{"apiVersion":"v1","kind":"Pod","metadata":{"annotations":{},"labels":{"run":"myapp-pod","type":"front-end-service"},"name":"myapp-pod"},"spec":{"containers":[{"image":"nginx:1.18","name":"nginx-container"}]}}'
  labels:
    app: myapp
    type: front-end-service
spec:
  containers:
    - name: nginx-container
      image: nginx:1.18
status:
  conditions:
    - lastProbeTime: null
```

This annotation is the key to performing a three-way merge in future apply operations. The process compares:

- The local file.
- The live object configuration.
- The last applied configuration.

This comparison ensures that Kubernetes makes precise updates. It’s important to note that mixing imperative commands (like kubectl create or kubectl replace) with declarative ones can lead to inconsistencies, as only kubectl apply stores the last applied configuration.

## Actionable Summary

| Step                 | Description                                                                  | Example Command             |
| -------------------- | ---------------------------------------------------------------------------- | --------------------------- |
| Initial Creation     | Creates the object and stores the configuration as an annotation             | kubectl apply -f nginx.yaml |
| Update Configuration | Modifies the object by comparing local, live, and last applied configuration | kubectl apply -f nginx.yaml |
| Remove a Field       | Deletes a field from live configuration when it is removed locally           | kubectl apply -f nginx.yaml |

> [!important]
> **Warning**
>
> Avoid mixing imperative commands with declarative approaches. Imperative actions like `kubectl create` or `kubectl replace` will not record the last applied configuration and may lead to inconsistencies when using kubectl apply.

## Conclusion

Understanding how kubectl apply processes local configurations, the live state of Kubernetes objects, and the last applied configuration annotation is crucial for managing resources declaratively. For more comprehensive information, please refer to the [Kubernetes documentation](https://kubernetes.io/docs/).

Thank you for reading this guide on the kubectl apply command. Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/c6d2ac7d-8192-4cff-aa54-e36d888c5bd9/lesson/cbd13479-4204-4e7a-adbc-b8a06e43317f)**
>
> Watch video content
