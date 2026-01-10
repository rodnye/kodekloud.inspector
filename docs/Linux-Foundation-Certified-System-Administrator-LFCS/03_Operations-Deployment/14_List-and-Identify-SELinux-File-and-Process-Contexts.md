# List and Identify SELinux File and Process Contexts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Operations-Deployment/List-and-Identify-SELinux-File-and-Process-Contexts)

---

## Table of Contents

- List and Identify SELinux File and Process Contexts
  - How SELinux Works at a High Level
  - Viewing SELinux File Labels
  - SELinux Process Contexts
  - SELinux User Context and Role Mapping
  - Checking SELinux Enforcement Status
  - Watch Video

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Operations Deployment

# List and Identify SELinux File and Process Contexts

In this lesson, we explore how SELinux applies security contexts to both files and processes. Traditional Linux access controls such as file permissions and directory settings are often too coarse to handle sophisticated cyber threats. Although these basic permissions allow read, write, or execute actions, they typically do not enforce fine-grained restrictions. SELinux bridges this gap by introducing advanced security contexts that enable highly granular access control.

> [!important]
> **Note**
>
> SELinux is enabled by default on Red Hat-based operating systems, whereas it requires manual configuration on Ubuntu. We will discuss Ubuntu SELinux configuration in a future lesson.

![The image shows a graphic of SELinux with a Linux penguin icon, stating it is enabled by default on Red Hat OS.](https://kodekloud.com/kk-media/image/upload/v1752881345/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-List-and-Identify-SELinux-File-and-Process-Contexts/selinux-redhat-default-enabled-graphic.jpg)

## How SELinux Works at a High Level

At its core, SELinux uses security contexts—extended metadata labels on files and processes—to determine which actions are permitted or denied. A typical SELinux file label includes four components in the following order:

1.  **SELinux User** (e.g., `unconfined_u`)
2.  **Role** (e.g., `object_r`)
3.  **Type** (e.g., `user_home_t`)
4.  **Level** (e.g., `s0`)

For example, the context label:

```
unconfined_u:object_r:user_home_t:s0
```

indicates that the file is associated with the SELinux user `unconfined_u`, the role `object_r`, the type or domain `user_home_t`, and the security level `s0`.

SELinux’s decision-making process follows these steps:

- **User Mapping**: The system first checks the SELinux user, which may be different from the Linux login username. Each login is mapped to an SELinux user as specified by the policy.
- **Role Verification**: The system then determines if the user has the necessary permissions to assume a specific role. For example, a developer may be confined to using roles such as `developer_r` or `docker_r`, while roles like `sysadmin_r` remain off limits.
- **Type-Based Access Control**: The type component enforces the most granular security. When processes or files are assigned a specific type, they are confined to a strict set of permitted actions.
- **Security Level**: Although rarely used in standard configurations, the level field enables multi-level security controls for organizations with multiple clearance layers.

## Viewing SELinux File Labels

While the `ls -l` command displays standard file permissions, SELinux adds an extra layer of metadata referred to as a security context or label. To view these additional details, use the `-Z` option:

```
$ ls -lZ
-rw-rw-r--. 1 aaron aaron 160 Dec  1 18:19 archive.tar.gz
```

In this output, the extra field represents the SELinux context. This label at the filesystem level enables SELinux to determine which actions are permitted or denied on the file.

## SELinux Process Contexts

Just as files receive security contexts, processes are also assigned SELinux contexts. To view process contexts, use the `ps` command with the `-Z` option:

```
$ ps axZ
system_u:system_r:accountsd_t:s0         995 ?    Ssl    0:00 /usr/libexec/accounts-daemon
system_u:system_r:NetworkManager_t:s0    1024 ?    Ssl    0:00 /usr/sbin/NetworkManager
system_u:system_r:sshd_t:s0-s0:c0.c1023   1030 ?    Ss     0:00 /usr/sbin/sshd -D -
system_u:system_r:tuned_t:s0             1032 ?    Ssl    0:00 /usr/libexec/platform-tuned
system_u:system_r:cupsd_t:s0-s0:c0.c1023   1033 ?    Ss     0:00 /usr/sbin/cupsd -l
```

In the example above, notice that the SSH daemon operates within the `sshd_t` domain. Only executables labeled with `sshd_exec_t` (the type for the SSH daemon file) can run in this domain. To verify the SSH daemon file’s SELinux context, run:

```
$ ls -Z /usr/sbin/sshd
system_u:object_r:sshd_exec_t:s0 /usr/sbin/sshd
```

This strict relationship between file types and process domains ensures that if a process becomes compromised, it remains confined within its limited security domain, thereby minimizing potential damage.

## SELinux User Context and Role Mapping

SELinux assigns a security context to each user session. Upon login, a Linux user is mapped to an SELinux user. You can view your current SELinux user context with:

```
$ id -Z
unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023
```

Here, the logged-in user is mapped to `unconfined_u` along with an associated role and type that impose minimal restrictions by default. Most access control decisions are enforced by the role and type components. For further insight into user-to-role mappings, you can list the allowed logins and SELinux user configurations:

```
$ sudo semanage login -l
Login Name      SELinux User       MLS/MCS Range     Service
__default__     unconfined_u       s0-s0:c0.c1023   *
root            unconfined_u       s0-s0:c0.c1023   *
```

```
$ sudo semanage user -l
Labeling         MLS/Prefix         MLS/MCS Level     MCS Range
root             sysadm             s0                s0-s0:c0.c1023
staff_u          staff              s0                s0-s0:c0.c1023
sysadm_u         sysadm             s0                s0-s0:c0.c1023
system_u         user               s0                s0-s0:c0.c1023
unconfined_u     unconfined         s0                s0-s0:c0.c1023
user_u           user               s0                s0-s0:c0.c1023
```

These commands provide a clear view of how Linux logins are mapped to SELinux users along with their permitted roles and clearance levels.

## Checking SELinux Enforcement Status

To determine whether SELinux is actively enforcing policies, use the following command:

```
$ getenforce
Enforcing
```

If the output is "Enforcing," SELinux is actively blocking unauthorized actions. If the output shows "Permissive," SELinux logs actions that would be denied but does not block them. A status of "Disabled" indicates that SELinux is currently inactive.

> [!important]
> **Summary**
>
> In summary, SELinux uses multi-layered security contexts—composed of user, role, type, and level—to enforce strict access controls on both files and processes. Even if a process is compromised, these stringent policies confine it to a safe security domain, significantly reducing potential system damage.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cb813f7f-73bd-40ee-a088-d31ba20c51de/lesson/7a8d974f-fbdb-4962-989d-2e7bb511bd1f)**
>
> Watch video content
