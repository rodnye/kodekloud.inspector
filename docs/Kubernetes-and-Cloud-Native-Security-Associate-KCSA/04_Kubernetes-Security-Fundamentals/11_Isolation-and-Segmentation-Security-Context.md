# Isolation and Segmentation Security Context - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Security-Fundamentals/Isolation-and-Segmentation-Security-Context)

---

## Table of Contents

- Isolation and Segmentation Security Context
  - Why Security Contexts Matter
  - Security Context Levels
  - Pod-Level Security Context
  - Container-Level Security Context
  - Best Practices
  - Further Reading
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Security Fundamentals

# Isolation and Segmentation Security Context

Welcome to this lesson on **Security Contexts in Kubernetes**. Security contexts allow you to control permissions and access for Pods and containers. You will learn:

- How to mirror Docker security options in Kubernetes
- The difference between Pod-level and Container-level configurations
- Best practices for applying user IDs and Linux capabilities

For detailed reference, see the [Kubernetes Security Context Documentation](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/).

---

## Why Security Contexts Matter

Security contexts help you enforce least-privilege container execution:

- Define which Linux user or group a container runs as
- Grant or restrict Linux capabilities (e.g., `NET_ADMIN`, `SYS_TIME`)
- Enable Pod-level settings that apply to all containers

If you’ve used Docker, you may be familiar with:

```
# Run container as a specific user
docker run --user=1001 ubuntu sleep 3600


# Grant a Linux capability
docker run --cap-add MAC_ADMIN ubuntu
```

Kubernetes adopts the same principles, but you configure them in your Pod spec.

---

## Security Context Levels

Kubernetes lets you apply security contexts at two scopes:

| Level           | Applies To              | Common Settings                                         |
| --------------- | ----------------------- | ------------------------------------------------------- |
| Pod-level       | All containers in a Pod | `runAsUser`, `runAsGroup`, `fsGroup`                    |
| Container-level | A single container      | `runAsUser`, `runAsGroup`, `capabilities`, `privileged` |

---

## Pod-Level Security Context

A Pod-level security context propagates settings to every container within that Pod. This is ideal for defining a consistent user and group ID across all containers.

```
apiVersion: v1
kind: Pod
metadata:
  name: web-pod
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
  containers:
    - name: ubuntu
      image: ubuntu
      command: ["sleep", "3600"]
```

> [!important]
> **Note**
>
> You cannot set Linux capabilities (`capabilities.add`) at the Pod level. To grant capabilities, use a container-level security context.

---

## Container-Level Security Context

When you need fine-grained control—such as adding or dropping specific Linux capabilities—apply the security context directly to the container:

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
        runAsGroup: 3000
        capabilities:
          add: ["MAC_ADMIN", "NET_RAW"]
          drop: ["ALL"]
        privileged: false
```

> [!important]
> **Warning**
>
> Running containers in `privileged` mode grants all Linux capabilities and should be avoided unless absolutely necessary.

---

## Best Practices

- Always run containers as non-root users (`runAsUser` ≥ 1000).
- Use Pod-level context for uniform settings; override at the container level only when needed.
- Drop unnecessary capabilities (`capabilities.drop: ["ALL"]`) and add only those required.

---

## Further Reading

- [Kubernetes Pods Security Context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)
- [Docker Run Reference](https://docs.docker.com/engine/reference/run/)
- [Understanding Linux Capabilities](https://man7.org/linux/man-pages/man7/capabilities.7.html)

Keep practicing with these configurations to strengthen your cluster’s security. See you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/87ba5cde-ab72-444a-a323-6cd6a9d1bafd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/ae705c0e-4b0f-4921-a49d-b02b75cb12d7)**
>
> Practice lab
