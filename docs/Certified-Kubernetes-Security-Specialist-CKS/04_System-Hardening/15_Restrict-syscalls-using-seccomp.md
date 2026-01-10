# Restrict syscalls using seccomp - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/System-Hardening/Restrict-syscalls-using-seccomp)

---

## Table of Contents

- Restrict syscalls using seccomp
  - The Role of Seccomp
  - Default Docker Seccomp Profile
  - Custom Seccomp Profiles
  - Watch Video
    - Demonstrating Seccomp in Action
    - Seccomp Modes

---

## Content

Certified Kubernetes Security Specialist (CKS)

System Hardening

# Restrict syscalls using seccomp

In this article, we’ll explore how to restrict the system calls (syscalls) that applications can invoke, limiting them to only those essential for their operation. This approach minimizes the attack surface, boosting security by preventing access to all 435+ available Linux syscalls.

Even seemingly simple commands, such as using the touch command, trigger multiple syscalls. For example, running:

```
strace -c touch /tmp/error.log
% time     seconds  usecs/call     calls    errors  syscall
-------  -----------  -----------  --------  -------  ----------------
  0.00    0.000000        0     1              1    read
  0.00    0.000000        0     6              0    close
  0.00    0.000000        0     2              0    fstat
  0.00    0.000000        0     5              0    mmap
  0.00    0.000000        0     4              0    mprotect
  0.00    0.000000        0     1              0    munmap
  0.00    0.000000        0     3              0    brk
  0.00    0.000000        0     3              3    access
  0.00    0.000000        0     1              0    dup2
  0.00    0.000000        0     1              0    execve
  0.00    0.000000        0     1              0    arch_prctl
  0.00    0.000000        0     3              0    openat
  0.00    0.000000        0     1              0    utimensat
-------  -----------  -----------  --------  -------  ----------------
100.00    0.000000      32     3    total
```

Running the command again shows similar syscall statistics, illustrating that even everyday applications use numerous syscalls:

```
strace -c touch /tmp/error.log
% time     seconds  usecs/call  calls  errors syscall
------ ----------- ----------- ------ --------- ----------------
 0.00      0.000000         0.0      1       0  read
 0.00      0.000000         0.0      6       0  close
 0.00      0.000000         0.0      2       0  fstat
 0.00      0.000000         0.0      5       0  mmap
 0.00      0.000000         0.0      4       0  mprotect
 0.00      0.000000         0.0      1       0  munmap
 0.00      0.000000         0.0      3       0  brk
 0.00      0.000000         0.0      3       3  access
 0.00      0.000000         0.0      2       0  dup2
 0.00      0.000000         0.0      1       0  execve
 0.00      0.000000         0.0      1       0  arch_prctl
 0.00      0.000000         0.0      3       0  openat
 0.00      0.000000         0.0      1       0  utimensat
------ ----------- ----------- ------ --------- ----------------
100.00     0.000000        32.0     32       3  total
```

Allowing unrestricted syscall access increases the risk of exploitation. For instance, the [Dirty COW vulnerability](https://en.wikipedia.org/wiki/Dirty_COW) in 2016 exploited the ptrace syscall to write to a read-only file, leading to privilege escalation and container escape.

![The image describes CVE-2016-5195, a Linux kernel vulnerability known as "Dirty COW," allowing privilege escalation via a race condition in memory handling.](https://kodekloud.com/kk-media/image/upload/v1752871750/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Restrict-syscalls-using-seccomp/frame_60.jpg)

## The Role of Seccomp

By default, the Linux kernel permits all user-space programs to invoke any syscall. Seccomp (Secure Computing) is a kernel-level feature, introduced in 2005 and available since Linux version 2.6.12, that allows you to sandbox applications by filtering their allowed syscalls.

To verify if your kernel supports Seccomp, run:

```
grep -i seccomp /boot/config-$(uname -r)
CONFIG_HAVE_ARCH_SECCOMP_FILTER=y
CONFIG_SECCOMP_FILTER=y
CONFIG_SECCOMP=y
```

If these options are set to "y", then Seccomp is supported on your system.

### Demonstrating Seccomp in Action

First, run a container using the popular Docker whalesay image. This container prints Docker’s signature whale ASCII art alongside a provided argument (here, "hello!"):

```
docker run docker/whalesay cowsay hello!
< hello! >
       ------
        \
         \
          ##     :
       ## ## ##  ==
       ## ## ##  ===
        '""""""'   /
         ~~~  ~~~~~~~~~~~~~~~~~~~ ~  ---
```

Next, start another container with an interactive shell. Inside the container, try changing the system time. Note that the shell runs as PID 1:

```
docker run -it --rm docker/whalesay /bin/sh
#
# date -s '19 APR 2012 22:00:00'
date: cannot set date: Operation not permitted
```

You can inspect the container’s process status by reading `/proc/1/status`. The Seccomp field should indicate a value of 2, meaning a filtered Seccomp profile is in use.

### Seccomp Modes

Seccomp operates in three distinct modes:

- **Mode 0:** Seccomp is disabled.
- **Mode 1:** Strict mode, permitting only four syscalls: read, write, exit, and sigreturn.
- **Mode 2:** Filter mode, allowing a defined subset of syscalls based on a filtering profile. Our container example uses Mode 2.

The diagram below summarizes these modes:

![The image outlines three syscall restriction modes: Mode 0 (DISABLED), Mode 1 (STRICT), and Mode 2 (FILTERED).](https://kodekloud.com/kk-media/image/upload/v1752871751/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Restrict-syscalls-using-seccomp/frame_220.jpg)

> [!important]
> **Note**
>
> Docker automatically applies a default Seccomp filter if your host supports Seccomp. This default filter is defined via a JSON document that whitelists approximately 60 syscalls.

## Default Docker Seccomp Profile

The default Docker profile is designed to block dangerous syscalls such as ptrace, which was exploited in the Dirty COW vulnerability. Here is an example snippet of a default Seccomp JSON profile used by Docker:

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
        "arch_prctl",
        "brk",
        "capget",
        "capset",
        "mkdir",
        "close",
        "execve",
        "...",
        "clone"
      ],
      "action": "SCMP_ACT_ALLOW"
    }
  ]
}
```

The key elements of any Seccomp JSON profile are:

1.  **Architectures** – Defines the supported CPU architectures (e.g., x86_64, x86, x32).
2.  **Syscalls** – An array listing syscall names and their permitted actions.
3.  **Default Action** – Determines how to handle syscalls not explicitly listed. Whitelist profiles typically deny undeclared syscalls.

A **whitelist profile** explicitly allows certain syscalls while denying all others:

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
        "<syscall-1>",
        "<syscall-2>",
        "<syscall-3>"
      ],
      "action": "SCMP_ACT_ALLOW"
    }
  ]
}
```

In contrast, a **blacklist profile** allows all syscalls by default and only denies those specifically listed:

```
{
  "defaultAction": "SCMP_ACT_ALLOW",
  "architectures": [
    "SCMP_ARCH_X86_64",
    "SCMP_ARCH_X86",
    "SCMP_ARCH_X32"
  ],
  "syscalls": [
    {
      "names": [
        "<syscall-1>",
        "<syscall-2>",
        "<syscall-3>"
      ],
      "action": "SCMP_ACT_ERRNO"
    }
  ]
}
```

> [!important]
> **Warning**
>
> While blacklist profiles are easier to implement, they are inherently less secure compared to whitelist profiles due to the possibility of overlooking dangerous syscalls.

The default Docker Seccomp profile on x86 blocks around 60 syscalls related to functions such as system time adjustments, file system mounts, and kernel module loading. This is why changing the system time in our earlier container failed:

```
docker run -it --rm docker/whalesay /bin/sh
#
# date -s '19 APR 2012 22:00:00'
date: cannot set date: Operation not permitted
```

For a complete list of blocked syscalls, refer to the [Docker documentation](https://docs.docker.com/engine/security/seccomp/).

## Custom Seccomp Profiles

Although Docker’s default profile enhances security by restricting many dangerous syscalls, you can further harden your container by using a custom Seccomp profile. For example, to block the mkdir syscall, you might modify the default filter and save it as custom.json:

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
        "arch_prctl",
        "brk",
        "capget",
        "capset",
        "close",
        "execve",
        "clone"
      ],
      "action": "SCMP_ACT_ALLOW"
    }
  ]
}
```

Start a container using your custom profile with the --security-opt flag:

```
docker run -it --rm --security-opt seccomp=/root/custom.json docker/whalesay /bin/sh
```

Within this container, attempting to create a directory using mkdir will result in an error:

```
/ #
/ # mkdir test
mkdir: can't create directory 'test': Operation not permitted
```

It is also possible to disable Seccomp entirely using the "unconfined" flag, though this is strongly discouraged:

```
docker run -it --rm --security-opt seccomp=unconfined docker/whalesay /bin/sh
#
```

Even without a Seccomp profile, certain syscalls (like those used to change the system time) may remain blocked by additional Docker security measures:

```
docker run -it --rm --security-opt seccomp=unconfined docker/whalesay /bin/sh
# date -s '19 APR 2012 22:00:00'
date: cannot set date: Operation not permitted
```

Additional security layers are discussed in further lessons.

---

For more guidance on Docker security and related topics, please refer to the [Docker Documentation](https://docs.docker.com/engine/security/seccomp/) and other linked resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/5e9b6232-59d3-44b3-8716-a5dfe51a2411)**
>
> Watch video content
