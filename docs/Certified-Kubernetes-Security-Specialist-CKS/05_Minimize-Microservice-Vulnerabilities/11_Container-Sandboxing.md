# Container Sandboxing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Container-Sandboxing)

---

## Table of Contents

- Container Sandboxing
  - Virtual Machines vs. Containers
  - Sandboxing Techniques for Containers
  - Final Thoughts
  - Watch Video
    - Container Process Isolation
    - Seccomp (Secure Computing Mode)
    - AppArmor
    - References

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Container Sandboxing

In this article, we explore methods to enhance container isolation through sandboxing techniques, contrasting them with the isolation provided by virtual machines (VMs). This detailed guide is designed to help you understand the security implications and best practices for safeguarding your containerized environments.

## Virtual Machines vs. Containers

Every virtual machine is built on a physical infrastructure that includes sufficient RAM, storage, and multiple CPU cores. The process typically involves:

1.  Installing an operating system on the physical hardware.
2.  Running a hypervisor (such as Oracle VirtualBox, a Type-2 hypervisor) on top of that operating system.
3.  Creating multiple VMs, each with individually allocated CPU and memory.
4.  Allowing each VM to run its own operating system and dedicated kernel.

This robust isolation enables secure hosting of different environments, such as various customer workloads, on the same physical server—a common setup in multi-tenant environments. Cloud-based VMs adhere to the same principles.

In contrast, containers operate differently. On a host server—be it physical or virtual—containers share the same underlying kernel. They are essentially processes running on the host. Consider the following diagram:

![The image compares virtual machines and containers, highlighting their components and infrastructure layers, including applications, libraries, dependencies, guest OS, hypervisor, Docker, host OS, and hardware.](https://kodekloud.com/kk-media/image/upload/v1752871632/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Container-Sandboxing/frame_110.jpg)

### Container Process Isolation

For instance, when you run a BusyBox container executing the sleep command for 1000 seconds, the container launches the process as the root user with a PID of 1. Running the process status command (ps) inside the container shows a single PID, whereas executing ps on the host reveals a different PID. This discrepancy is enabled by process ID namespaces. While the host can view all container processes, each container maintains its own isolated PID namespace. However, terminating the process on the host will result in stopping the container as well.

Below is an example demonstrating the launch and inspection of such a container:

```
root@ubuntu-server:~# docker run -d --name sleeping-container busybox sleep 1000
e2fd5090c9a51eb7cc91a466871f84adb55c2e6c1cf4ea0028a8

root@ubuntu-server:~# docker exec -ti sleeping-container ps -ef
PID USER     TIME COMMAND
  1  root     0:00 sleep 1000
 11  root     0:00 ps -ef
```

Applications in containers, similar to those running directly on an operating system, execute in user space and access hardware resources through system calls. However, because containers share a single kernel, every container’s system call is processed by that same kernel. This shared kernel approach introduces security risks. For example, an exploit such as Dirty COW could compromise the kernel, thereby exposing all containers and potentially allowing unauthorized host access.

The following diagram illustrates the container sandboxing scenario:

![The image illustrates container sandboxing, showing applications with libraries and dependencies running in containers on Docker, atop a host OS and hardware infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752871633/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Container-Sandboxing/frame_210.jpg)

## Sandboxing Techniques for Containers

To mitigate the inherent risks associated with shared kernels, additional protection measures in the form of sandboxing are applied. In security, sandboxing refers to any technique that isolates components within a system from one another. Below are some common approaches and tools used to enhance container security:

### Seccomp (Secure Computing Mode)

Docker uses a default seccomp profile to restrict containers from executing dangerous system calls. In platforms such as Kubernetes, seccomp profiles further limit container privileges by allowing only necessary system calls. The following is an example of a seccomp whitelist-based profile:

```
{
  "defaultAction": "SCMP_ACT_ERRNO",
  "architectures": [
    "SCMP_ARCH_X86_64",
    "SCMP_ARCH_X86",
    "SCMP_ARCH_X32"
  ],
  "syscalls": [
    {
      "names": [
        "execve",
        "brk",
        "access",
        "capset",
        "clone"
      ],
      "action": "SCMP_ACT_ALLOW"
    }
  ]
}
```

> > [!important]
> > **Note**
> >
> > When configuring seccomp profiles, it is vital to ensure that only the necessary system calls are allowed. This whitelisting approach minimizes potential vulnerabilities.

### AppArmor

AppArmor offers fine-grained control over the resources accessible to a container. Unlike seccomp’s whitelist method, AppArmor can start with a broad allow policy and then restrict specific operations. For example, the AppArmor profile below denies write access to the /proc directory:

```
profile apparmor-deny-write flags=(attach_disconnected) {
    # Deny all file writes to /proc.
    deny /proc/* w,
}
```

Both seccomp and AppArmor adhere to the principle of limiting container capabilities—either through explicit whitelisting of permitted actions or by blacklisting known risky operations. Whitelisting provides a higher security level by permitting only specified system calls, while blacklisting offers more flexibility in environments with diverse applications, reducing the likelihood of restrictive rules that may impede functionality.

In scenarios where many different applications run within containers, it may be impractical to maintain unique profiles for each container. However, if your deployment consists of a few common applications (for example, Nginx or MySQL), it is more manageable to maintain a limited set of security profiles.

Below is an alternative seccomp profile example for less complex scenarios, allowing only a minimal set of system calls:

```
{
  "defaultAction": "SCMP_ACT_ERRNO",
  "architectures": [
    "SCMP_ARCH_X86_64"
  ],
  "syscalls": [
    {
      "name": "lseek",
      "action": "SCMP_ACT_ALLOW"
    },
    {
      "name": "capset",
      "action": "SCMP_ACT_ALLOW"
    },
    {
      "name": "getuid",
      "action": "SCMP_ACT_ALLOW"
    },
    {
      "name": "getgid",
      "action": "SCMP_ACT_ALLOW"
    }
  ]
}
```

> > [!important]
> > **Warning**
> >
> > Every security measure presents trade-offs. Thoroughly test your chosen sandboxing policies to ensure they do not inadvertently hinder application functionality.

## Final Thoughts

It is important to remember that no single sandboxing approach is universally perfect. The optimal method depends on your specific requirements and the applications you run in your containers. A well-tested and appropriately configured sandbox will help reduce the risk of a compromised container affecting the host system and its other containers.

In the upcoming part of this article, we will explore an alternative approach to container sandboxing and further security measures.

---

### References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/cb62e103-2544-447d-98cd-d669d79bd382)**
>
> Watch video content
