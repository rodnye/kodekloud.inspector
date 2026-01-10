# Ensure Immutability of Containers at Runtime - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Monitoring-Logging-and-Runtime-Security/Ensure-Immutability-of-Containers-at-Runtime)

---

## Table of Contents

- Ensure Immutability of Containers at Runtime
  - Enforcing a Read-Only File System
  - Using Volumes to Allow Limited Write Access
  - Testing the Immutable Container with Privileged Mode
  - Best Practices for Container Immutability
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

Monitoring Logging and Runtime Security

# Ensure Immutability of Containers at Runtime

In this article, we explore various methods to ensure that Kubernetes pods adhere to the concept of immutability. Although containers are designed to be immutable by default, it is still possible to perform in-place updates. For instance, one can copy files directly into a pod or obtain a shell within the container to make changes. Here, we discuss how to prevent unauthorized modifications during runtime.

## Enforcing a Read-Only File System

One effective method to maintain container immutability is by ensuring that the pod’s file system remains read-only after startup. This can be implemented through the security context in the pod definition.

Consider the following configuration for an Nginx pod:

```
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: nginx
  name: nginx
spec:
  containers:
  - image: nginx
    name: nginx
    securityContext:
      readOnlyRootFilesystem: true
```

Using the `readOnlyRootFilesystem: true` field in the security context ensures that the Nginx container starts with a read-only root file system, preventing any unauthorized copying or writing. However, this configuration might disrupt application functionality. For example, deploying the pod as configured above could result in an error because Nginx typically requires write permissions for certain directories.

If you create the pod with this configuration, you may see the following output:

```
kubectl create -f nginx.yaml
pod/nginx created


kubectl get pods
NAME    READY   STATUS    RESTARTS   AGE
nginx   0/1     Error     0          20s
```

Nginx requires write access to directories such as `/var/run` (to store runtime data) and `/var/cache/nginx` (for caching). The pod logs will indicate failures when it attempts to write to these directories.

!!! note "Important" Before enforcing a read-only file system, ensure your applications do not depend on writing to the root file system during runtime.

## Using Volumes to Allow Limited Write Access

To resolve these issues, mount volumes on the directories that require write access. In the example below, we use an `emptyDir` volume since the data does not need to persist after the pod terminates. The updated configuration is as follows:

```
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: nginx
  name: nginx
spec:
  containers:
  - image: nginx
    name: nginx
    securityContext:
      readOnlyRootFilesystem: true
    volumeMounts:
    - name: cache-volume
      mountPath: /var/cache/nginx
    - name: runtime-volume
      mountPath: /var/run
  volumes:
  - name: cache-volume
    emptyDir: {}
  - name: runtime-volume
    emptyDir: {}
```

After applying this configuration, the `/var/cache/nginx` and `/var/run` directories inside the container become writable through the mounted volumes, while the rest of the file system remains read-only. Once recreated, the pod should initialize successfully.

## Testing the Immutable Container with Privileged Mode

In some cases, you might want to observe the behavior of an immutable container even when it's running in privileged mode. Although using the privileged flag is generally discouraged, this example demonstrates that the read-only root file system still prevents modifications, even for a privileged container.

Create a pod with the configuration below:

```
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: nginx
  name: nginx
spec:
  containers:
  - image: nginx
    name: nginx
    securityContext:
      readOnlyRootFilesystem: true
      privileged: true
    volumeMounts:
    - name: cache-volume
      mountPath: /var/cache/nginx
    - name: runtime-volume
      mountPath: /var/run
  volumes:
  - name: cache-volume
    emptyDir: {}
  - name: runtime-volume
    emptyDir: {}
```

On deployment, you might observe messages similar to:

```
kubectl create -f nginx.yaml
pod/nginx created


kubectl get pods
NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          20s
```

Attempting a package update inside the container will still fail due to the read-only root file system:

```
kubectl exec -ti nginx -- apt update
Reading package lists... Done
E: List directory /var/lib/apt/lists/partial is missing. - Acquire (30: Read-only file system)
command terminated with exit code 100
```

Despite the container being privileged, the read-only setting prevents modifications necessary for updating packages. Moreover, note that changes within the `/proc` pseudo file system, such as modifying the swappiness value, can impact the host machine. This example reinforces the importance of avoiding the privileged flag to maintain container immutability.

!!! warning "Security Warning" Avoid using the privileged flag unless absolutely necessary. Privileged containers can perform actions that inadvertently affect the host system and compromise security.

## Best Practices for Container Immutability

To ensure that your containers remain immutable, follow these best practices:

| Best Practice              | Description                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------- |
| Read-Only Root File System | Set containers with a read-only root file system to prevent in-place modifications.                   |
| Limited Write Volumes      | Mount volumes (e.g., `emptyDir` or persistent volumes) only on directories that require write access. |
| Avoid Privileged Mode      | Refrain from using the privileged flag to limit the container’s impact on the host system.            |
| Non-Root Containers        | Run containers as non-root users whenever possible to minimize risks.                                 |
| Enforce Security Policies  | Use Pod Security Policies (PSPs) to enforce immutability and other security best practices.           |

Below is an example of a Pod Security Policy that reinforces these practices:

```
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: example
spec:
  privileged: false
  readOnlyRootFilesystem: true
  runAsUser:
    rule: RunAsNonRoot
  seLinux:
    rule: RunAsAny
  supplementalGroups:
    rule: RunAsAny
  fsGroup:
    rule: RunAsAny
```

This policy ensures that containers are non-privileged, have a read-only root file system, run as non-root users, and do not carry unnecessary privileges.

## Conclusion

Ensuring the immutability of containers at runtime is critical for maintaining the integrity and security of your applications in Kubernetes. By enforcing a read-only file system, using limited write-access volumes, and avoiding the privileged flag, you can create a robust and secure environment for your containers. Apply these best practices along with Pod Security Policies to maximize your container’s security.

Now, put these concepts into practice with hands-on exercises to reinforce your understanding and secure your containers effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/c0d849e1-54be-4d78-8936-6ce49434b88d/lesson/e69c4be9-7505-4b77-a0dd-6a8bfccbb79b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/c0d849e1-54be-4d78-8936-6ce49434b88d/lesson/71a86fa2-0c82-4bd5-a5f1-bba594c39290)**
>
> Practice lab
