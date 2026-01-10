# Start stop and check the status of network services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Manage-Basic-Networking/Start-stop-and-check-the-status-of-network-services)

---

## Table of Contents

- Start stop and check the status of network services
  - Using ss to Display Listening Services
  - Managing Service Status with systemctl
  - Using netstat for Network Status
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Red Hat Certified System Administrator(RHCSA)

Manage Basic Networking

# Start stop and check the status of network services

In this article, you will learn to manage network services on Linux by starting, stopping, and checking their status. Most servers run multiple services handling network connections. A common example is the SSH daemon (sshd), which continuously runs in the background and listens for remote login connections.

![The image shows a diagram with a user icon connected to a server running three services: sshd, httpd, and chronyd. The background is dark, and the services are highlighted in blue.](https://kodekloud.com/kk-media/image/upload/v1752883586/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Start-stop-and-check-the-status-of-network-services/user-icon-server-services-diagram.jpg)

Begin by inspecting the active programs and their waiting connections. Two useful utilities for this purpose are ss and netstat. While ss is the modern choice, netstat has been widely used historically and might be phased out on some distributions.

![The image shows a dark-themed interface with two utility icons labeled "ss" and "netstat," each featuring a gear symbol. The title "Utilities" is displayed at the top.](https://kodekloud.com/kk-media/image/upload/v1752883588/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Start-stop-and-check-the-status-of-network-services/dark-utilities-interface-ss-netstat.jpg)

## Using ss to Display Listening Services

The ss command is effective for viewing programs that are ready to accept incoming connections. Use the following flags with ss:

- **\-l:** List listening sockets.
- **\-t:** Display TCP connections.
- **\-u:** Display UDP connections.
- **\-n:** Show numeric values instead of resolving service names.
- **\-p:** Display the process using each socket.

> [!important]
> **Note**
>
> Using the -p flag requires root privileges to reveal processes that are owned by root. Prepend your command with sudo.

A helpful mnemonic for these options is "l-t-u-n-p" (listening, TCP, UDP, numeric, process) or simply remember "tunnel P." Execute the command below to see what is listening on your network ports:

```
$ sudo ss -ltunp
Netid  State    Recv-Q   Send-Q    Local Address:Port       Peer Address:Port     Process
udp    UNCONN   0        0         127.0.0.1:323            0.0.0.0:*             users:(("chronyd",pid=3669,fd=7))
tcp    LISTEN   0        128       0.0.0.0:22               0.0.0.0:*             users:(("sshd",pid=1031,fd=5))
tcp    LISTEN   0        128       [::]:22                  [::]:*                users:(("sshd",pid=1031,fd=7))
udp    UNCONN   0        0         [::1]:323                [::]:*                users:(("chronyd",pid=3669,fd=8))
```

In the output above, the "Local Address:Port" column indicates which services are listening and their respective ports. For instance, the SSH daemon listens on port 22, while chronyd is bound to port 323. An address like "127.0.0.1" (localhost) means the service accepts only local connections, whereas "0.0.0.0" signifies that the service accepts external connections.

Once you have the process details and PID, you can further inspect the process using the ps command or examine open files with lsof.

## Managing Service Status with systemctl

The systemctl command allows you to check a service’s status, stop it, or manage its startup behavior. To check the status of a service (for example, chronyd or sshd), use:

```
$ sudo systemctl status chronyd.service
$ sudo systemctl status sshd.service
```

If you need to stop a service, such as chronyd, run:

```
$ sudo systemctl stop chronyd.service
```

After stopping the service, you can verify that it is no longer listening on its designated port (e.g., port 323) by checking again with ss:

```
$ sudo ss -ltunp
Netid  State    Recv-Q  Send-Q      Local Address:Port    Peer Address:Port    Process
tcp    LISTEN   0       128         0.0.0.0:22           0.0.0.0:*            users:(("sshd",pid=1031,fd=5))
tcp    LISTEN   0       128         [::]:22              [::]:*               users:(("sshd",pid=1031,fd=7))
```

You can also disable a service from starting at boot using `systemctl disable` and later re-enable it with `systemctl enable` and `systemctl start`.

## Using netstat for Network Status

Netstat provides similar functionality with a slightly different output format. Note that netstat might not be installed by default on all systems. Use the command below for similar information:

```
$ sudo netstat -ltunp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address         Foreign Address           State      PID/Program name
tcp   0      0     0.0.0.0:111           0.0.0.0:*               LISTEN     1/systemd
tcp   0      0     192.168.122.1:53      0.0.0.0:*               LISTEN     1664/dnsmasq
tcp   0      0     0.0.0.0:22            0.0.0.0:*               LISTEN     1031/sshd
tcp   0      0     127.0.0.1:631         0.0.0.0:*               LISTEN     1030/cupsd
tcp6  0      0     :::111                :::*                    LISTEN     1/systemd
tcp6  0      0     :::22                 :::*                    LISTEN     1031/sshd
tcp6  0      0     :::631                :::*                    LISTEN     1030/cupsd
udp   0      0     0.0.0.0:5353          0.0.0.0:*                           872/avahi-daemon: r
udp   0      0     0.0.0.0:46828         0.0.0.0:*                           872/avahi-daemon: r
udp   0      0     192.168.122.1:53      0.0.0.0:*                           1664/dnsmasq
udp   0      0     0.0.0.0:67            0.0.0.0:*                           1/systemd
udp   0      0     0.0.0.0:111           0.0.0.0:*                           1/systemd
udp   0      0     127.0.0.1:323         0.0.0.0:*                           3669/chronyd
udp6  0      0     :::5353               :::*                                872/avahi-daemon: r
udp6  0      0     :::146504             :::*                                1/systemd
udp6  0      0     :::323                :::*                                3669/chronyd
udp6  0      0     fe80::a00:27ff:fe6b:546 :::*                                1024/NetworkManager
```

> [!important]
> **Tip**
>
> Netstat's formatted output can be more appealing and easier to read for some users. Ensure it is installed on your system before use.

## Conclusion

With these techniques, you can confidently manage the network services running on your Linux system. Use ss for a modern approach, netstat for a familiar format, and systemctl for service management. Start practicing these commands to ensure your network services are configured correctly and securely.

For additional information on Linux service management, check out the following resources:

- [Linux System Administration](https://www.linux.com/what-is-linux/)
- [Systemd Documentation](https://www.freedesktop.org/wiki/Software/systemd/)

Happy administrating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/5f16da06-6c71-4058-bfc5-6f4dd8754e9f/lesson/f9573a22-df51-4cc0-a815-02d6e8328b42)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/5f16da06-6c71-4058-bfc5-6f4dd8754e9f/lesson/7e2e97ab-424b-4669-8244-6dac1325a4d1)**
>
> Practice lab
