# Start Stop and Check Status of Network Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Networking/Start-Stop-and-Check-Status-of-Network-Services)

---

## Table of Contents

- Start Stop and Check Status of Network Services
  - Viewing Active Network Connections
  - Stopping and Disabling Services
  - Inspecting Process Details
  - Using the Netstat Utility
  - Conclusion
  - Watch Video
  - Practice Lab
    - Using the SS Utility
    - Detailed Analysis of SS Output
    - Checking Service Status with systemctl

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Networking

# Start Stop and Check Status of Network Services

In this guide, we explore how to manage network services in Linux by starting, stopping, and checking their status. Many servers run multiple services—such as the SSH daemon—that listen for incoming network connections. The SSH daemon, for example, runs in the background, enabling remote login capabilities.

Let's begin by examining the programs currently active and waiting for incoming network connections.

![The image shows a diagram with a user icon connected to a server running three services: sshd, mariadbd, and nginx.](https://kodekloud.com/kk-media/image/upload/v1752881326/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Start-Stop-and-Check-Status-of-Network-Services/user-server-services-diagram.jpg)

## Viewing Active Network Connections

Two commonly used utilities for viewing active network connections are **SS** and **Netstat**. While **SS** is the modern alternative, **Netstat** is older and may eventually be deprecated in future Linux releases.

![The image shows a dark interface labeled "Utilities" with two icons: "ss" and "netstat," each represented by a gear symbol.](https://kodekloud.com/kk-media/image/upload/v1752881326/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Start-Stop-and-Check-Status-of-Network-Services/utilities-dark-interface-ss-netstat.jpg)

### Using the SS Utility

To list all programs that are ready to accept incoming connections, issue the following command:

```
sudo ss -ltunp
```

This command provides output similar to the partial example below. In later sections, we will examine a complete output listing all the fields.

```
$ sudo ss -ltunp
Netid State     Recv-Q Send-Q Local Address:Port
tcp   LISTEN    0      128    0.0.0.0:22
```

Below is a brief overview of the options used:

- **\-l**: Only display sockets currently listening for connections.
- **\-t**: Filter to show only TCP connections.
- **\-u**: Include UDP connections.
- **\-n**: Show numeric values (such as port numbers) instead of resolving service names.
- **\-p**: Display the process using each socket (root privileges are required to view processes owned by root).

> [!important]
> **Tip**
>
> Using the `-n` option ensures that you see exact port numbers. For example, port 22 in the output confirms the SSH daemon's listening port.

A useful mnemonic to remember these options is **L-T-U-N-P** (Listening, TCP, UDP, Numeric, Process). Alternatively, arrange them as **TUNLP** (Tunnel Programs) for ease of recall.

If you are ever uncertain about the available options, check the SS help page:

```
ss --help
```

### Detailed Analysis of SS Output

Let’s inspect the output in detail, focusing on the local address and port columns:

```
$ sudo ss -ltunp
Netid State  Recv-Q Send-Q Local Address:Port
tcp   LISTEN 0      128    0.0.0.0:22


$ sudo ss -tunlp


$ ss --help
Usage: ss [ OPTIONS ]
       ss [ OPTIONS ] [ FILTER ]
  -h, --help         this message
  -V, --version      output version information
  -n, --numeric      don't resolve service names
  -r, --resolve      resolve host names
  -a, --all          display all sockets
  -l, --listening    display listening sockets
  -e, --options      show timer information
  -E, --extended     show detailed socket information
  -m, --memory       show socket memory usage
  -p, --processes    show process using socket
```

An IP address like 127.0.0.1 in the Local Address column indicates that the service is only accepting connections from the local machine (localhost). For example, a web server (NGINX) connecting to a database server (MariaDB) on the same machine typically uses 127.0.0.1 on port 3306.

Consider the following enhanced SS output:

```
$ sudo ss -ltunp
Netid State  Recv-Q Send-Q    Local Address:Port     Peer Address:Port      Process
tcp   LISTEN 0      80       127.0.0.1:3306       0.0.0.0:*             users:(("mariadb",pid=738,fd=20))
tcp   LISTEN 0      128      0.0.0.0:22           0.0.0.0:*             users:(("sshd",pid=679,fd=3))
tcp   LISTEN 0      128      [::]:22              [::]:*                users:(("sshd",pid=679,fd=4))
```

In this example:

- **MariaDB** listens on `127.0.0.1:3306`, limiting its access to the localhost.
- **SSHD** listens on both IPv4 (`0.0.0.0:22`) and IPv6 (`[::]:22`), allowing both local and external connections.

Another SS output reiterates these points:

```
$ sudo ss -ltunp
Netid State  Recv-Q Send-Q Local Address:Port   Peer Address:Port   Process
tcp   LISTEN 0      80     127.0.0.1:3306      0.0.0.0:*         users:(("mariadb",pid=738,fd=20))
tcp   LISTEN 0      128    0.0.0.0:22          0.0.0.0:*         users:(("sshd",pid=679,fd=3))
tcp   LISTEN 0      128    :::22                :::*               users:(("sshd",pid=679,fd=4))
```

### Checking Service Status with systemctl

To verify the status of these network services, you can use the `systemctl` command as follows:

```
systemctl status mariadb.service
systemctl status ssh.service
```

> [!important]
> **Service Naming Convention**
>
> On Ubuntu, the SSH service is often listed as `ssh` (without a trailing "d"). In contrast, other distributions like Red Hat may refer to it as `sshd`.

Below is an example of the output for both MariaDB and SSH services:

```
$ sudo ss -ltunp
Netid State  Recv-Q Send-Q       Local Address:Port        Peer Address:Port        Process
tcp   LISTEN 0      80         127.0.0.1:3306            0.0.0.0:*                users:(("mariadb",pid=738,fd=20))
tcp   LISTEN 0      128        0.0.0.0:22               0.0.0.0:*                users:(("sshd",pid=679,fd=3))
tcp   LISTEN 0      128        [::]:22                  [::]:*                   users:(("sshd",pid=679,fd=4))


$ systemctl status mariadb.service
● mariadb.service - MariaDB 10.6.16 database server
   Loaded: loaded (/lib/systemd/system/mariadb.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2024-04-01 03:28:40 UTC; 16min ago
     Docs: man:mariadb(8)
           https://mariadb.com/kb/en/library/systemd/
 Main PID: 738 (mariadb)


$ systemctl status ssh.service
● ssh.service - OpenBSD Secure Shell server
   Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2024-04-01 03:28:39 UTC; 17min ago
     Docs: man:sshd(8)
           man:sshd_config(5)
 Main PID: 679 (sshd)
```

## Stopping and Disabling Services

To stop the MariaDB service, use the following command. After you stop it, re-run the SS command to verify that port 3306 no longer appears.

```
sudo systemctl stop mariadb.service
```

The SS output after stopping MariaDB might look like this:

```
$ sudo ss -ltunp
Netid State  Recv-Q Send-Q    Local Address:Port  Peer Address:Port  Process
tcp   LISTEN 0      128      0.0.0.0:22          0.0.0.0:*         users:(("sshd",pid=679,fd=3))
tcp   LISTEN 0      128      [::]:22             [::]:*            users:(("sshd",pid=679,fd=4))
```

Prevent MariaDB from starting automatically at boot with:

```
sudo systemctl disable mariadb.service
```

You can later re-enable and start the service as needed.

## Inspecting Process Details

After confirming the SSH daemon's process ID from the SS output (e.g., PID 679), you can use the `ps` command to inspect it further:

```
$ ps 679
PID TTY          STAT TIME COMMAND
679 ?            Ss   0:00 sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups
```

Further details about the process, including open files and sockets, can be retrieved using `lsof`:

```
$ sudo lsof -p 679
COMMAND PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
sshd    679 root   cwd    DIR  253,0     4096    2 /
sshd    679 root   rtd    DIR  253,0     4096    2 /
sshd    679 root   txt    REG  253,0   921288 9677 /usr/sbin/sshd
sshd    679 root   mem    REG  253,0   149760 11119 /usr/lib/x86_64-linux-gnu/libgpg-error.so.0.32.1
```

## Using the Netstat Utility

Although SS offers modern functionality, you can also use the Netstat utility to produce a similar output:

```
sudo netstat -ltunp
```

Below is an example of Netstat's formatted output:

```
$ sudo netstat -ltunp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address         Foreign Address       State       PID/Program name
tcp        0      0 0.0.0.0:111           0.0.0.0:*             LISTEN      1/systemd
tcp        0      0 192.168.122.1:53      0.0.0.0:*             LISTEN      1664/dnsmasq
tcp        0      0 0.0.0.0:22            0.0.0.0:*             LISTEN      1031/sshd
tcp        0      0 127.0.0.1:631         0.0.0.0:*             LISTEN      1030/cupsd
tcp6       0      0 :::111                :::*                  LISTEN      1/systemd
tcp6       0      0 :::22                 :::*                  LISTEN      1031/sshd
tcp6       0      0 :::631                :::*                  LISTEN      1030/cupsd
udp        0      0 0.0.0.0:5353          0.0.0.0:*                         872/avahi-daemon: r
udp        0      0 0.0.0.0:46828         0.0.0.0:*                         872/avahi-daemon: r
udp        0      0 192.168.122.1:53      0.0.0.0:*                         1664/dnsmasq
udp        0      0 0.0.0.0:67            0.0.0.0:*                         1664/dnsmasq
udp        0      0 0.0.0.0:0             0.0.0.0:*                         1/systemd
udp6       0      0 :::3533               :::*                              872/avahi-daemon: r
udp6       0      0 :::46504              :::*                              872/avahi-daemon: r
udp6       0      0 :::111                :::*                              1/systemd
udp6       0      0 :::323                :::*                              3669/chronyd
udp6       0      0 fe80::a00:27ff:fe6b:546 :::*                           1024/NetworkManager
```

While Netstat’s output is often neatly formatted for readability, remember that it may not be installed by default on every system.

## Conclusion

This article detailed the processes involved in starting, stopping, and checking the status of network services on Linux using both SS and Netstat tools, as well as `systemctl` for service management. Understanding these fundamentals will help you effectively monitor your system's network services and troubleshoot connectivity issues when they arise.

For further reading, consider exploring:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

Happy troubleshooting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/2ba92913-296b-481d-af2d-6710bf3f7cdd/lesson/36b2c86a-e779-44be-86ae-4e7c6dd81058)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/2ba92913-296b-481d-af2d-6710bf3f7cdd/lesson/3e903fa8-d9b9-4735-8300-49c1170577a6)**
>
> Practice lab
