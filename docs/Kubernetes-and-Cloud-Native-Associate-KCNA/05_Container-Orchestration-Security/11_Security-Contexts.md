# Security Contexts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Container-Orchestration-Security/Security-Contexts)

---

## Table of Contents

- Security Contexts
  - Security Options in Docker
  - Applying Security Contexts in Kubernetes
  - Next Steps
  - Additional Resources
  - Watch Video
    - Example: Pod Definition with Container-Level Security Context

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Container Orchestration Security

# Security Contexts

Welcome to this comprehensive lesson on security contexts in Kubernetes. In this tutorial, Mumshad Mannambeth explains how to enhance container security by configuring user IDs and Linux capabilities.

> [!important]
> **Overview**
>
> When running Docker containers, you can specify security standards such as the user ID and Linux capabilities. This concept extends to Kubernetes, where you configure security both at the pod level and for individual containers.

## Security Options in Docker

Before diving into Kubernetes, here are two examples of how to run Docker containers with specific security settings:

```
docker run --user=1001 ubuntu sleep 3600
docker run --cap-add MAC_ADMIN ubuntu
```

These commands illustrate how to set the user ID and modify Linux capabilities when running a container.

## Applying Security Contexts in Kubernetes

Kubernetes encapsulates containers within pods, offering flexibility in security configurations. You can apply a security context at the pod level to affect all containers or at the container level, where container settings override the pod defaults if both are specified.

### Example: Pod Definition with Container-Level Security Context

The following YAML file defines a pod where an Ubuntu container runs the `sleep` command. Notice how the security context is set to run the container as user 1000 and includes the added capability `MAC_ADMIN`.

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

> [!important]
> **Key Point**
>
> When both pod-level and container-level security contexts are defined, the container-level settings take precedence.

## Next Steps

That’s the end of this lesson on security contexts in Kubernetes. Practice viewing, configuring, and troubleshooting these contexts within your clusters using the coding exercises provided. For more detailed guidance on Kubernetes security, be sure to explore related documentation and resources.

Happy coding, and see you in the next lesson!

---

## Additional Resources

- [Kubernetes Overview](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/9cdabd48-a7e9-400d-b6b7-e8f2c2f7ee5f/lesson/fa04b0b9-4756-4663-9334-481c4a3471bb)**
>
> Watch video content
