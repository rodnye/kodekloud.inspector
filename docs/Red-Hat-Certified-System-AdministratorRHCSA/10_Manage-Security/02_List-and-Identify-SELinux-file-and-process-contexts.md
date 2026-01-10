# List and Identify SELinux file and process contexts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Manage-Security/List-and-Identify-SELinux-file-and-process-contexts)

---

## Table of Contents

- List and Identify SELinux file and process contexts
  - Viewing Standard Permissions
  - Understanding SELinux Context Labels
  - Exploring Process Contexts
  - Viewing the Current User’s SELinux Context
  - Checking SELinux Enforcement Status
  - Summary
  - Further Reading
  - Watch Video

---

## Content

Red Hat Certified System Administrator(RHCSA)

Manage Security

# List and Identify SELinux file and process contexts

In this article, we'll explore how SELinux manages file and process contexts, offering an extra layer of security that goes beyond standard Linux file permissions. Traditional permissions (read, write, execute) are essential, but they may not fully protect your system against sophisticated attacks. SELinux enhances system security by confining processes and applying strict mandatory access control policies.

For example, imagine a web server running within a dedicated directory. If an attacker compromises the web server, they inherit its directory permissions, potentially exploiting system vulnerabilities. SELinux prevents this by isolating processes through detailed security contexts based on SELinux labels. On systems like CentOS Stream, SELinux is enabled by default, ensuring that even if a process is breached, its actions remain confined.

## Viewing Standard Permissions

The basic Linux command `ls -l` can be used to display the standard file and directory permissions:

```
$ ls -l
-rw-rw-r--. 1 aaron aaron 160 Dec  1 18:19 archive.tar.gz
```

This output shows the read, write, and execute permissions for a file. In contrast, SELinux labels provide a more granular form of security.

## Understanding SELinux Context Labels

SELinux introduces an additional security layer by assigning each file and process a security context label. This label comprises four components in the following order: user, role, type, and level. Consider the example label below:

```
unconfined_u:object_r:user_home_t:s0
```

- **User**: `unconfined_u`  
  Represents the SELinux user defined within the SELinux policy, which may differ from the Linux login username.
- **Role**: `object_r`  
  Specifies the role that helps determine permitted operations.
- **Type**: `user_home_t`  
  Defines the allowed operations for the file or process and effectively serves as a security "jail."
- **Level**: `s0`  
  Often used for multi-level security in organizations, indicating the sensitivity level of the object.

When an action is initiated, SELinux evaluates it by sequentially checking the SELinux user, role, and type/domain. This layered methodology ensures that only authorized processes access specific domains, thereby denying unauthorized actions.

> [!important]
> **Note**
>
> Remember: In SELinux, only files with the correct type (e.g., `sshd_exec_t` for SSH daemon) can initiate a process that transitions into the corresponding security domain.

## Exploring Process Contexts

Processes also carry SELinux security contexts. You can check the SELinux labels for running processes using the `ps` command with the `-Z` option:

```
$ ps axZ
system_u:system_r:accountsd_t:s0       995 ?    Ssl    0:00 /usr/libexec/accoun
system_u:system_r:NetworkManager_t:s0   1024 ?    Ssl    0:00 /usr/sbin/NetworkMa
system_u:system_r:sshd_t:s0-s0:c0.c1023 1030 ?    Ss     0:00 /usr/sbin/sshd -D
system_u:system_r:tuned_t:s0            1032 ?    Ssl    0:00 /usr/libexec/platfo
system_u:system_r:cupsd_t:s0-s0:c0.c1023 1033 ?    Ss     0:00 /usr/sbin/cupsd -l
```

In this listing, observe that the SSH daemon (`sshd`) runs within the `sshd_t` domain. Strict policies enforce that only files labeled with the correct type (in this case, often `sshd_exec_t`) can start a process that enters this domain. Conversely, processes running with the `unconfined_t` label operate with minimal restrictions.

## Viewing the Current User’s SELinux Context

To determine your current SELinux security context, use the `id` command with the `-Z` option:

```
$ id -Z
unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023
```

This output indicates how your login maps into the SELinux policy. To see how Linux users are mapped to SELinux users, execute:

```
$ sudo semanage login -l
Login Name    SELinux User      MLS/MCS Range    Service
__default__   unconfined_u      s0-s0:c0.c1023   *
root          unconfined_u      s0-s0:c0.c1023   *
```

> [!important]
> **Note**
>
> The default mapping assigns non-root users to the `unconfined_u` SELinux user, ensuring that even root processes are subject to the same security policies.

## Checking SELinux Enforcement Status

To check if SELinux is actively enforcing its security policies, use the `getenforce` command:

```
$ getenforce
Enforcing
```

The possible outputs are:

- **Enforcing**: SELinux policies are enforced, and unauthorized actions are blocked.
- **Permissive**: SELinux is not actively enforcing policies but logs actions that would have been denied.
- **Disabled**: SELinux is turned off, and no access control is performed.

## Summary

This article has outlined how SELinux uses security context labels to provide robust access control for both files and processes. By examining the SELinux user, role, and type/domain—and considering the security level—SELinux creates a comprehensive security framework that limits potential damage from compromised processes. This granular approach is essential for maintaining the integrity of your system in the face of modern cyber threats.

For further details and practical exercises to strengthen your understanding of SELinux and its use in securing Linux systems, continue exploring related documentation and hands-on tutorials.

## Further Reading

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [SELinux Project Wiki](https://selinuxproject.org/page/Main_Page)
- [Linux Security Modules Documentation](https://www.kernel.org/doc/html/latest/security/LSM.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/5935b82f-37ac-4f4e-b619-0a6f8824088b/lesson/6d5cd666-0642-4f1b-9c7a-7c97afaba6b6)**
>
> Watch video content
