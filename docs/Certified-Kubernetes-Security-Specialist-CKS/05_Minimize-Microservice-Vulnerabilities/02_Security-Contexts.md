# Security Contexts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Security-Contexts)

---

## Table of Contents

- Security Contexts
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Security Contexts

Welcome to this comprehensive guide on security contexts in Kubernetes. My name is Mumshad Mannambeth, and in this article, we will explore how security configurations can be applied to your containers and pods for enhanced protection.

When running Docker containers, you might recognize that you can specify security standards—such as setting a specific user ID or modifying Linux capabilities. For instance, you can run a container with a designated user or add a capability using the following commands:

```
docker run --user=1001 ubuntu sleep 3600
docker run --cap-add MAC_ADMIN ubuntu
```

Kubernetes offers similar capabilities, but with the added flexibility of applying these settings at both the Pod and container levels. Configuring security contexts at the Pod level allows the settings to automatically propagate to all containers within that Pod. However, if a container-level security context is defined, those settings take precedence over the Pod-level configurations.

> [!important]
> **Key Insight**
>
> Security contexts in Kubernetes not only ensure enhanced security but also standardize user privileges across containerized environments.

Below is an example of a Pod definition that demonstrates how to configure a security context for a container. In this example, the Pod uses an Ubuntu image with the `sleep` command. The configuration assigns a user ID using the `runAsUser` option and adds the `MAC_ADMIN` capability:

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

By understanding and applying these security best practices, you can ensure that your Kubernetes deployments are better protected from unauthorized access and potential vulnerabilities.

Thank you for reading this guide on security contexts in Kubernetes. You are now ready to explore configuring and troubleshooting these security settings in your deployments. For additional insights and best practices, consider exploring the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Container Security Practices](https://kubernetes.io/docs/concepts/security/overview/)
- [Docker Hub](https://hub.docker.com/)

We look forward to seeing you in our next article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/95fa6a35-2323-4c08-886c-dde070c78692)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/62cc10fa-4d66-40be-87d6-5002112f4a54)**
>
> Practice lab
