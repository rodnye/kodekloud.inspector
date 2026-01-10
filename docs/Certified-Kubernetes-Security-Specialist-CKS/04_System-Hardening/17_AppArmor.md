# AppArmor - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/System-Hardening/AppArmor)

---

## Table of Contents

- AppArmor
  - Introducing AppArmor
  - Creating and Using AppArmor Profiles
  - AppArmor Profile Modes
  - Watch Video
    - Verifying AppArmor
    - Checking AppArmor Profile Status

---

## Content

Certified Kubernetes Security Specialist (CKS)

System Hardening

# AppArmor

In this lesson, we explore AppArmor, a robust Linux security module designed to limit an application's access to system resources. By enforcing strict restrictions, AppArmor helps reduce the attack surface and enhances container security beyond what Seccomp profiles provide.

Previously, we examined Seccomp profiles in Kubernetes. Although Seccomp is effective at limiting the available syscalls for container operations, it does not manage access to specific resources such as files or directories. For example, a custom Seccomp profile can block the MKDIR syscall to prevent the creation of new directories.

Consider the following custom Seccomp profile that allows only a selected set of syscalls while denying all others (including MKDIR by default):

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
        "close",
        "brk"
      ],
      "action": "SCMP_ACT_ALLOW"
    }
  ]
}
```

You can run a container with this Seccomp profile as shown below:

```
docker run -it --security-opt seccomp=/root/custom.json docker/whalesay /bin/sh
```

Inside the container, if you try to create a directory:

```
# mkdir test
```

You will encounter an error similar to:

```
mkdir: can't create directory 'test': Operation not permitted
```

> [!important]
> **Note**
>
> While Seccomp restricts which system calls a container can execute, it does not control access to the filesystem. For enhanced resource-level security, AppArmor is used.

## Introducing AppArmor

AppArmor confines applications to a limited set of resources, including specific file and directory permissions, network settings, and Linux capabilities. It is installed and enabled by default on most Linux distributions.

### Verifying AppArmor

To ensure that AppArmor is active, run the following command:

```
systemctl status apparmor
```

Additionally, make sure that the AppArmor kernel module is loaded on every node hosting your container. You can verify this by checking the enabled parameter:

```
cat /sys/module/apparmor/parameters/enabled
```

The expected output should be:

```
Y
```

To view all loaded AppArmor profiles, inspect the profiles file:

```
cat /sys/kernel/security/apparmor/profiles
```

This command might produce output similar to:

```
docker-default (enforce)
/usr/sbin/tcpdump (enforce)
/usr/sbin/ntpd (enforce)
/usr/lib/snapd/snap-confine (enforce)
/usr/lib/snapd/snap-confine/mount-namespace-capture-helper (enforce)
/usr/lib/connman/scripts/dhclient-script (enforce)
/usr/lib/NetworkManager/nm-dhcp-helper (enforce)
/usr/lib/NetworkManager/nm-dhcp-client.action (enforce)
/sbin/dhclient (enforce)
/usr/bin/man (enforce)
/usr/bin/man_filter (enforce)
```

## Creating and Using AppArmor Profiles

An AppArmor profile is a plain text file that defines the resources accessible to an application, such as Linux capabilities, network access, and file permissions. For instance, the profile below restricts write access across the entire filesystem:

```
profile apparmor-deny-write flags=(attach_disconnected) {
    file,
    # Deny all file writes.
    deny /** w,
}
```

This profile initially permits filesystem access with the "file" shorthand, then explicitly denies write operations on any file under the root directory and its subdirectories.

Similarly, to prevent remounting the root filesystem as read-only, you can create the following profile:

```
profile apparmor-deny-remount-root flags=(attach_disconnected) {
  # Deny remounting the root filesystem as read-only.
  deny mount options=(ro, remount) -> /,
}
```

> [!important]
> **Warning**
>
> Ensure that your AppArmor profiles are correctly configured. Incorrect settings may lead to unexpected behavior or reduced security. Always test profiles in a controlled environment before deploying them in production.

### Checking AppArmor Profile Status

The `aa-status` tool provides a comprehensive view of AppArmor’s current state. Running this command displays details such as loaded profiles, their modes (enforce, complain, or unconfined), and the processes constrained by these profiles.

Example output of `aa-status`:

```
aa-status
apparmor module is loaded.
12 profiles are loaded.
12 profiles are in enforce mode.
    /sbin/dhclient
    /usr/bin/man
    /usr/lib/NetworkManager/nm-dhcp-client.action
    /usr/lib/NetworkManager/nm-dhcp-helper
    ...
    /usr/sbin/tcpdump
    docker-default
    man_filter
    man_groff
0 profiles are in complain mode.
11 processes have profiles defined.
11 processes are in enforce mode:
    /sbin/dhclient (621)
    docker-default (3970)
    docker-default (4025)
    docker-default (9853)
    docker-default (9964)
0 processes are in complain mode.
0 processes are 'unconfined' but have a profile defined.
```

## AppArmor Profile Modes

AppArmor profiles operate in three distinct modes:

- **Enforce mode:** The profile rules are strictly enforced on the application.
- **Complain mode:** The application is allowed to perform actions outside the defined profile rules while logging such actions as warnings.
- **Unconfined mode:** No restrictions are applied, and actions are not logged.

Moving forward, we will discuss how to create and manage AppArmor profiles using dedicated AppArmor utilities.

For more details on securing containerized environments, you may refer to the following resources:

- [Linux Security Modules (LSM) Overview](https://en.wikipedia.org/wiki/Linux_Security_Modules)
- [Kubernetes Security Best Practices](https://kubernetes.io/docs/concepts/security/overview/)

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/06f55a49-58d3-4d83-815f-0350ebc9c803)**
>
> Watch video content
