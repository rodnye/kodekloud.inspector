# Configure User Resource Limits - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Users-and-Groups/Configure-User-Resource-Limits)

---

## Table of Contents

- Configure User Resource Limits
  - Understanding the Limits Configuration File
  - Detailed Examples of Configuration
  - Common Resource Items
  - Example Combined Configuration
  - Setting a Custom Limit Example
  - Viewing and Adjusting Current Resource Limits
  - Conclusion
  - Watch Video
    - Domain Field
    - Explanation of Limit Types

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Users and Groups

# Configure User Resource Limits

Managing resource limits is essential when multiple users access a Linux system. This guide explains how to configure user resource limits in Linux using the `/etc/security/limits.conf` file. By setting appropriate limits, you ensure that no individual user can monopolize system resources—for instance, preventing any user from consuming 80% of the CPU.

## Understanding the Limits Configuration File

The file located at `/etc/security/limits.conf` contains settings that control resource usage. It begins with several comments explaining the syntax and usage rules. As you scroll through the file, you will see sample entries akin to the following:

```
$ sudo vim /etc/security/limits.conf
#<domain>          <type> <item>       <value>
#                   soft   core         0
#                   hard   rss          10000
#@student           hard   nproc        20
#@faculty           soft   nproc        20
#@faculty           hard   nproc        50
#ftp                hard   nproc        0
#@student           -      maxlogins    4
```

Each entry is composed of four fields in order:

1.  **Domain:** Specifies the user or group.
2.  **Type:** Indicates whether the limit is `soft`, `hard`, or both (using `-`).
3.  **Item:** The resource being limited.
4.  **Value:** The maximum allowed value for the resource.

### Domain Field

The domain field defines the scope of the limit:

- **Username:** For example, `trinity`.
- **Group Name:** Denoted by a prefix `@` (e.g., `@developers`).
- **Asterisk (`*`):** Sets a default limit for all users not explicitly mentioned.

In this example, an asterisk (`*`) entry is used to impose a default CPU time limit of 5 minutes for every user unless overridden by a specific user configuration.

> [!important]
> **User vs. Global Limits**
>
> User-specific limits take precedence over global (`*`) entries. For instance, if `trinity` has a defined limit, it will override the global settings.

## Detailed Examples of Configuration

Below is a detailed example illustrating how to set up different resource limits:

```
$ sudo vim /etc/security/limits.conf
#<domain>      <type>  <item>      <value>
**              soft    core        0
**              hard    rss         10000
#@student       hard    nproc       20
#@faculty       soft    nproc       20
#@faculty       hard    nproc       50
#ftp            hard    nproc       0
#@student       -       maxlogins   4
trinity         hard    nproc       10
@developers     soft    nproc       20
*               soft    cpu         5
```

### Explanation of Limit Types

- **Hard Limit:** The absolute maximum that cannot be exceeded.  
  _Example:_ If set to 30 processes, the user cannot exceed that number.
- **Soft Limit:** The initial threshold applied at login. Users can temporarily raise the soft limit up to the hard limit as needed.  
  _Example:_ A soft limit of 10 processes can be increased to a hard limit of 20 processes.
- **Combined Limit (`-`):** Applies the same limit to both soft and hard categories simultaneously.

Consider the following configuration for user `trinity`:

```
$ sudo vim /etc/security/limits.conf
#<domain>          <type>   <item>         <value>
#**                soft     core           0
#**                hard     rss            10000
#@student          hard     nproc          20
#@faculty          soft     nproc          20
#@faculty          hard     nproc          50
#ftp               hard     nproc          0


trinity           hard     nproc          10
@developers       soft     nproc          20
*                 soft     cpu            5
```

In this setup, the global asterisk provides default limits, while `trinity` has a dedicated process limit, ensuring her settings override the defaults.

Now, explore a further example that demonstrates both soft and hard limits:

```
$ sudo vim /etc/security/limits.conf
#<domain>     <type>     <item>          <value>
#**            soft       core            0
#**            hard       rss             10000
#@student     hard       nproc           20
#@faculty     soft       nproc           20
#@faculty     hard       nproc           50
#ftp          hard       nproc           0
#@student     -          maxlogins       4
trinity       hard       nproc           30
trinity       hard       nproc           20
trinity       soft       nproc           10
trinity       -          nproc           20
```

Here, `trinity` initially has a soft limit of 10 processes but can temporarily raise it to 20. However, the combined limit (`-`) enforces a strict maximum of 20 processes upon login.

## Common Resource Items

Some common items you might limit include:

- **nproc:** Maximum number of concurrent processes.
- **fsize:** Maximum file size (in kilobytes). For example, 1024 KB equals 1 MB.
- **cpu:** CPU time limit in minutes. Note that a process running for 1 second at 100% CPU uses 1 second from the allocated CPU time, while 50% usage deducts 0.5 seconds.

For a complete list of options, refer to the limits.conf manual page:

```
$ man limits.conf
```

## Example Combined Configuration

The following YAML snippet represents a combined configuration example:

```
#<domain>          <type>  <item>          <value>
#                   #
#**                soft    core            0
#**                hard    rss             10000
#@student          hard    nproc           20
#@faculty          soft    nproc           20
#@faculty          hard    nproc           50
#ftp               hard    nproc           0
#@student          -       maxlogins       4
trinity           hard    nproc           30
trinity           hard    fsize           1024
trinity           hard    cpu             1
```

## Setting a Custom Limit Example

To restrict `trinity` to a maximum of 3 concurrent processes, find the following line in your configuration:

```
#@student   -       maxlogins      4
```

Immediately after that line, add the new limit (make sure not to comment it out):

```
#@student   -       maxlogins      4
trinity    -       nproc          3
```

After saving the file, log in as `trinity` using:

```
$ sudo -iu trinity
```

Once logged in, you should see only the bash shell process running by default:

```
$ ps | less
PID TTY      TIME CMD
6314 pts/0  00:00:00 bash
6348 pts/0  00:00:00 ps
6349 pts/0  00:00:00 less
```

Now, with the updated configuration:

```
#@student   -       maxlogins      4
trinity    -       nproc          3
```

`trinity` is limited to 3 concurrent processes. Attempting to spawn a fourth process will trigger errors similar to:

```
$ ls -a | grep bash | less
bash: fork: retry: Resource temporarily unavailable.
bash: fork: retry: Resource temporarily unavailable.
bash: fork: retry: Resource temporarily unavailable.
bash: fork: retry: Resource temporarily unavailable.
bash: fork: retry: Resource temporarily unavailable.
```

These errors confirm that the 3-process limit is enforced correctly.

To exit `trinity`'s session, simply type:

```
$ logout
```

## Viewing and Adjusting Current Resource Limits

You can check your current resource limits using the `ulimit -a` command, which displays all settings along with their units:

```
$ ulimit -a
core file size         (blocks, -c)          0
data seg size          (kbytes, -d)    unlimited
scheduling priority    (-e)                  0
file size              (blocks, -f)    unlimited
pending signals        (-i)              14722
max locked memory      (kbytes, -l)         64
max memory size        (kbytes, -m)    unlimited
open files             (-n)              1024
pipe size              (512 bytes, -p)       8
POSIX message queues   (bytes, -q)      819200
real-time priority     (-r)                  0
stack size             (kbytes, -s)       8192
cpu time               (seconds, -t)    unlimited
max user processes     (-u)              14722
virtual memory         (kbytes, -v)    unlimited
file locks             (-x)           unlimited
```

For example, the `-u` flag shows the maximum number of processes a user can run. To lower this limit (e.g., to 5000 processes), execute:

```
$ ulimit -u 5000
```

> [!important]
> **Raising Limits**
>
> By default, a user can only decrease their limits. If both hard and soft limits exist, the soft limit can be increased up to the hard limit only once per session.

After adjusting the limit, verify the changes with another `ulimit -a`. Remember, any future commands can only lower the limit further unless restarted.

## Conclusion

In this lesson, you have learned how to configure and enforce user resource limits in Linux through the `/etc/security/limits.conf` file. Properly managing these limits ensures balanced resource distribution among multiple users and maintains system stability.

For more information, refer to the [Linux man pages](https://linux.die.net/man/5/limits.conf) and additional resources on system administration.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/b36d272b-24e2-44e1-82cb-20a5cfa93635/lesson/d1ff1109-94fb-4ee8-9c41-6aaa85250142)**
>
> Watch video content
