# Security Contexts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Configuration/Security-Contexts)

---

## Table of Contents

- Security Contexts
  - Docker vs. Kubernetes Security Context
  - Example Pod Definition
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Application Developer - CKAD

Configuration

# Security Contexts

Hello and welcome to this lesson on security contexts in Kubernetes.

My name is Mumshad Mannambeth, and in this guide, I'll walk you through how Kubernetes manages security contexts. Previously, we explored Docker container security, where you can define user IDs and modify Linux capabilities for your containers. Kubernetes extends this capability, allowing you to configure similar security settings.

## Docker vs. Kubernetes Security Context

In Docker, you may run containers with security options like these:

```
docker run --user=1001 ubuntu sleep 3600
docker run --cap-add MAC_ADMIN ubuntu
```

In Kubernetes, containers run within Pods. You have the flexibility to set security contexts either at the container level or at the Pod level. Settings defined at the Pod level affect all containers in that Pod. However, if the same security context options are specified for both the Pod and individual containers, the container-level settings override those at the Pod level.

> [!important]
> **Security Hierarchy**
>
> Security settings specified at the container level have a higher precedence than those set at the Pod level. Always verify your configuration to ensure the intended security policies are applied.

## Example Pod Definition

Consider the following example of a Pod definition file. In this configuration, an Ubuntu container is started with the `sleep` command. The security context is defined within the container specification using the `securityContext` field. Here, the `runAsUser` parameter sets the user ID for the container, and the `capabilities` option adds specific Linux capabilities:

```
apiVersion: v1
kind: Pod
metadata:
  name: web-pod
spec:
  containers:
    - name: ubuntu
      image: ubuntu
      command: ["sleep", "3600"]
      securityContext:
        runAsUser: 1000
        capabilities:
          add: ["MAC_ADMIN"]
```

This example illustrates how to configure user permissions and capabilities in Kubernetes. Take some time to practice viewing, configuring, and troubleshooting security context issues using this configuration.

> [!important]
> **Next Steps**
>
> After you experiment with this configuration, explore how to integrate more advanced security policies across multiple Pods and clusters. Delving deeper into Kubernetes security will strengthen your operational best practices.

That's it for now—I look forward to seeing you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/04ba9675-066e-4ea2-bd32-fc95f1f91a21)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/3aaded14-eaf2-4e11-b76b-9e5601f3dbf6)**
>
> Practice lab
