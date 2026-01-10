# SCC Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Openshift-Security/SCC-Overview)

---

## Table of Contents

- SCC Overview
  - What are Security Context Constraints (SCC)?
  - SCC vs. Network Policy
  - SCC and Open Policy Agent (OPA)
  - Leveraging Linux Native Security Features
  - Practical Examples of Security Context in Kubernetes
  - Demo: Putting Security Contexts into Action
  - Watch Video
    - Example 1: Setting Run-As User and Group
    - Example 2: Configuring a Read-Only Filesystem
    - Example 3: Managing Privileged Containers

---

## Content

OpenShift 4

Openshift Security

# SCC Overview

Security in the Kubernetes ecosystem is often overlooked, even though it plays a crucial role in maintaining a reliable and secure environment. In many organizations, a significant disparity exists between the number of developers and dedicated security engineers. In some cases, there may not even be a dedicated security team at all.

A recent Red Hat State of Kubernetes and Container Security report revealed that nearly 70% of security issues are caused by misconfigurations, while 27% stem from runtime security incidents. These alarming statistics highlight the critical need to address security challenges effectively.

![The image is a webpage excerpt titled "How to handle Kubernetes security," discussing the importance of addressing security vulnerabilities, misconfigurations, and runtime threats in Kubernetes. It cites a report indicating that 24% of serious container security issues are vulnerabilities, 70% are misconfigurations, and 27% are runtime incidents.](https://kodekloud.com/kk-media/image/upload/v1752882744/notes-assets/images/OpenShift-4-SCC-Overview/kubernetes-security-handling-guide.jpg)

## What are Security Context Constraints (SCC)?

Security Context Constraints (SCC) provide a robust mechanism for controlling pod permissions. Think of SCC as the access control system for pods—it defines what a pod is allowed to do, which resources it can access, and its overall security credentials. While Role-Based Access Control (RBAC) manages user permissions, SCC focuses on system-level security, including integrations with third-party applications. Moreover, SCC leverages native Linux capabilities, such as SELinux, enabling you to apply familiar policies directly to your pods.

![The image features the text "Security Context Constraints" with a penguin wearing sunglasses and a safe dial on its belly, alongside the text "Use Linux Natives ... SELinux" and two red downward arrows.](https://kodekloud.com/kk-media/image/upload/v1752882746/notes-assets/images/OpenShift-4-SCC-Overview/security-context-constraints-penguin.jpg)

> [!important]
> **Key Information**
>
> SCC not only enhances security by limiting pod actions but also complements other controls like RBAC and network policies, creating a layered defense strategy.

## SCC vs. Network Policy

Both SCC and network policies are vital for Kubernetes security, yet they focus on different aspects:

- **Network Policies**: These are designed to manage inbound and outbound traffic at the network level, considering factors like IP addresses, ports, and the OSI model. Their primary focus is regulating communication between pods and external entities.
- **Security Context Constraints (SCC)**: These govern privileges and access control from an application and system perspective. SCC ensures that a pod operates within defined restrictions regarding system-level permissions and resources.

![The image compares "Network Policy" and "SCC" (Security Context Constraints) in terms of allowing or restricting access, focusing on networking and application perspectives respectively.](https://kodekloud.com/kk-media/image/upload/v1752882747/notes-assets/images/OpenShift-4-SCC-Overview/network-policy-scc-comparison.jpg)

Both tools work in tandem to enforce robust security policies, ensuring that pods adhere to their minimum required permissions.

## SCC and Open Policy Agent (OPA)

Although SCC is integrated into the Kubernetes system, there are similar tools such as Open Policy Agent (OPA) that extend security capabilities. OPA allows for advanced policy enforcement, but SCC serves as a strong first layer of defense, establishing fundamental access controls and aiding in early identification of security vulnerabilities.

![The image shows a search bar with the query "what about Open Policy Agent?" and buttons labeled "OPA" and "SCC" below it, along with an icon of a box.](https://kodekloud.com/kk-media/image/upload/v1752882748/notes-assets/images/OpenShift-4-SCC-Overview/search-bar-open-policy-agent.jpg)

## Leveraging Linux Native Security Features

One practical approach to enhancing security is by using Linux native features such as AppArmor—a security module within the Linux kernel. AppArmor helps in restricting container access to resources by controlling file permissions and network access for specific applications. Note that AppArmor is specific to Linux environments, and its implementation may vary on Windows worker nodes.

![The image is a webpage from the Kubernetes documentation discussing how to restrict a container's access to resources using AppArmor. It includes an overview of AppArmor's functionality and its role in enhancing security.](https://kodekloud.com/kk-media/image/upload/v1752882749/notes-assets/images/OpenShift-4-SCC-Overview/kubernetes-apparmor-resource-restriction.jpg)

## Practical Examples of Security Context in Kubernetes

The OWASP Top 10 for Kubernetes project, building on insights from reports like Red Hat’s, emphasizes the importance of setting secure contexts for workloads. Defined security contexts help establish a strong security posture by ensuring that containers operate with the minimum required privileges.

Below are consolidated examples of applying security contexts using YAML:

### Example 1: Setting Run-As User and Group

This example demonstrates how to configure a pod’s security context by assigning specific user and group IDs:

```
apiVersion: v1
kind: Pod
metadata:
  name: root-user
spec:
  containers:
    - name: example-container
      image: example-image
  securityContext:
    runAsUser: 0        # Run as root user
    runAsGroup: 5554    # Set a specific group for non-root operations
```

### Example 2: Configuring a Read-Only Filesystem

Enforcing a read-only filesystem is a common security measure that prevents modifications to the container’s root filesystem:

```
apiVersion: v1
kind: Pod
metadata:
  name: read-only-fs
spec:
  containers:
    - name: readonly-container
      image: example-image
      securityContext:
        readOnlyRootFilesystem: true  # Define the root filesystem as read-only
```

### Example 3: Managing Privileged Containers

For containers that require elevated privileges, it’s essential to clearly define security policies. The example below shows how to enable privileged mode:

```
apiVersion: v1
kind: Pod
metadata:
  name: privileged-pod
spec:
  containers:
    - name: privileged-container
      image: example-image
      securityContext:
        privileged: true   # Grant privileged access
        # To restrict privileges, you would set:
        # privileged: false
```

## Demo: Putting Security Contexts into Action

The following examples demonstrate practical implementations of security contexts, focusing on a read-only filesystem and privileged mode settings.

```
apiVersion: v1
kind: Pod
metadata:
  name: demo-read-only-fs
spec:
  containers:
    - name: demo-container
      image: example-image
      securityContext:
        readOnlyRootFilesystem: true
```

```
apiVersion: v1
kind: Pod
metadata:
  name: demo-privileged-pod
spec:
  containers:
    - name: demo-container
      image: example-image
      securityContext:
        privileged: true   # Container runs with elevated privileges
```

These examples underscore the importance of defining clear and precise security contexts to mitigate vulnerabilities and ensure that Kubernetes workloads operate with the minimum necessary permissions.

By combining SCC with network policies and native Linux security features, you can build a robust security framework, significantly strengthening your Kubernetes environment.

For further reading, visit [Kubernetes Documentation](https://kubernetes.io/docs/) or explore more about [Linux Security Modules](https://wiki.ubuntu.com/AppArmor).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/413252bb-7455-41fa-86eb-e3e9370c8f08/lesson/b9527348-27a8-4159-a5f5-64942dec28aa)**
>
> Watch video content
