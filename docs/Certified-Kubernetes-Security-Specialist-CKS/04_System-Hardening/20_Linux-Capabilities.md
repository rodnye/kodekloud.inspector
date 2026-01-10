# Linux Capabilities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/System-Hardening/Linux-Capabilities)

---

## Table of Contents

- Linux Capabilities
  - Demonstration Using Docker
  - Understanding Linux Process Privileges
  - Checking Capabilities
  - Visual Overview
  - Linux Capabilities in Kubernetes Containers
  - Default Capabilities in Linux
  - Modifying Container Capabilities
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

System Hardening

# Linux Capabilities

In this lesson, we explore how to add or remove Linux capabilities on Kubernetes pods and understand why certain operations, like changing the system date, can be restricted even when running as root.

Earlier, in our Seccomp lecture, we observed that even when a container runs with Seccomp set to unconfined, modifying the system date is prohibited. This behavior extends to Kubernetes pods as well. By default, Kubernetes pods do not utilize Seccomp, and a container—even running as root (UID 0)—may still be restricted from performing certain operations.

> [!important]
> **Key Information**
>
> When running containers with Docker, the default security settings include restrictions that prevent operations such as modifying the system clock, unless explicitly permitted by adjusting capabilities.

## Demonstration Using Docker

The example below demonstrates the restricted behavior using Docker:

```
docker run -it --rm --security-opt seccomp=unconfined docker/whalesay /bin/sh
# date -s '19 APR 2012 22:00:00'
date: cannot set date: Operation not permitted
Thu Apr 19 22:00:00 UTC 2012


kubectl run --rm -it ubuntu-sleeper --image=ubuntu -- bash
```

Even though the container runs as the root user (UID 0), the attempt to change the date fails. This behavior helps us understand how Linux processes operate under different privilege levels.

## Understanding Linux Process Privileges

Before Linux kernel 2.2, processes were classified into:

- **Privileged processes:** Run by the root user (UID 0) and bypass many kernel permission checks.
- **Unprivileged processes:** Run by non-root users and are subject to various kernel restrictions.

Starting with Linux kernel 2.2, the traditional superuser privileges were broken down into individual units called capabilities. This allows administrators to grant only specific privileges to processes, even if they run as the root user.

Some examples of these capabilities include:

- **CAP_CHOWN:** Allows changing file ownership.
- **CAP_NET_ADMIN:** Permits operations like modifying network interface configurations, managing routing tables, and binding processes to specific addresses.
- **CAP_SYS_BOOT:** Enables a process to reboot the system.
- **CAP_SYS_TIME:** Permits setting or adjusting the system clock.

For a comprehensive list of capabilities, consult the official Linux documentation.

## Checking Capabilities

You can determine the capabilities required by a command using the `getcap` command. For example, the `ping` command requires the `CAP_NET_RAW` capability:

```
getcap /usr/bin/ping
```

The expected output is:

```
/usr/bin/ping = cap_net_raw+ep
```

To inspect the capabilities of a running process, use the `getpcaps` command. For instance, to check the capabilities of the SSH daemon process:

1.  Locate the PID of the SSH daemon:

    ```
    ps -ef | grep /usr/sbin/sshd | grep -v grep
    ```

    Output:

    ```
    root     779     1  0 03:55 ?        00:00:00 /usr/sbin/sshd -D
    ```

2.  Use `getpcaps` with the PID:

    ```
    getpcaps 779
    ```

## Visual Overview

The image below compares Linux capabilities before and after Kernel 2.2, highlighting examples like CAP_CHOWN and CAP_SYS_TIME:

![The image illustrates Linux capabilities, comparing privileged processes before and after Kernel 2.2, highlighting specific capabilities like CAP_CHOWN and CAP_SYS_TIME.](https://kodekloud.com/kk-media/image/upload/v1752871738/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Linux-Capabilities/frame_100.jpg)

## Linux Capabilities in Kubernetes Containers

Returning to our Ubuntu sleeper pod example, attempting to change the date from within the container resulted in:

```
kubectl run --rm -it ubuntu-sleeper --image=ubuntu -- bash
root@ubuntu-sleeper:# date -s '19 APR 2012 22:00:00'
date: cannot set date: Operation not permitted
Thu Apr 19 22:00:00 UTC 2012
root@ubuntu-sleeper:#
```

This failure occurs because containers, even when running as root, are started with a limited set of capabilities. Docker, the container runtime, initiates containers with only 14 capabilities by default. Without the specific capability `CAP_SYS_TIME` required to modify the system clock, the operation is prohibited.

## Default Capabilities in Linux

The following Go code snippet demonstrates how default capabilities are defined in a Linux environment:

```
// DefaultCapabilities returns a Linux kernel default capabilities
func DefaultCapabilities() []string {
    return []string{
        "CAP_CHOWN",
        "CAP_DAC_OVERRIDE",
        "CAP_FOWNER",
        "CAP_MKNOD",
        "CAP_NET_RAW",
        "CAP_SETGID",
        "CAP_SETUID",
        "CAP_SETFCAP",
        "CAP_SETPCAP",
        "CAP_NET_BIND_SERVICE",
        "CAP_SYS_CHROOT",
        "CAP_KILL",
        "CAP_AUDIT_WRITE",
    }
}
```

## Modifying Container Capabilities

To adjust the capabilities for a container:

- **Add a Capability:** Update the container manifest under the security context by including the required capability (e.g., `CAP_SYS_TIME`) in the capabilities array. With this configuration, the container will be permitted to adjust the system clock.
- **Remove a Capability:** Use the drop field with an array of capabilities to be removed. For example, if you remove `CAP_CHOWN`, the `chown` command will no longer function within the container.

> [!important]
> **Security Consideration**
>
> Modifying container capabilities can expose the host system to security risks. Always ensure that only the necessary capabilities are granted and follow the principle of least privilege.

## Conclusion

Understanding how Linux capabilities function is crucial for effectively managing security in Kubernetes pods. Experiment with modifying capabilities to gain hands-on experience, and refer to the official documentation for more detailed information.

For more insights and detailed documentation on Kubernetes and container security, consider exploring these resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Linux Capabilities Documentation](https://man7.org/linux/man-pages/man7/capabilities.7.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/aa37d503-85f0-47ba-9360-31514b3c5030)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/058cc5f9-4239-44ec-8021-e9201d4edc2b)**
>
> Practice lab
