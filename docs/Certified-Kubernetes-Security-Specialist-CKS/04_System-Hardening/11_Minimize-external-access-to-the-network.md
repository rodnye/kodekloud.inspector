# Minimize external access to the network - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/System-Hardening/Minimize-external-access-to-the-network)

---

## Table of Contents

- Minimize external access to the network
  - Verifying Port Bindings
  - Approaches to Network Security
  - Next Steps: Configuring UFW
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

System Hardening

# Minimize external access to the network

In this lesson, we explore tools and techniques that restrict network access to your servers. Understanding how services bind to ports is critical for establishing a secure environment. For instance, an SSH server typically listens on port 22, meaning that any device on the network could potentially access it unless proper restrictions are in place.

## Verifying Port Bindings

You can verify if a port is actively listening for incoming connections with the following commands. Notice that when port 22 is bound to IP address 0.0.0.0, it indicates that the service is accessible from any network interface:

```
systemctl status ssh
```

```
cat /etc/services | grep ssh
```

```
ssh             22/tcp                     # SSH Remote Login Protocol
```

Without any additional configuration, any device on the network can establish a connection to the server on the open ports. To see a broader picture of the active ports, the `netstat` command can be used to list all listening ports:

```
netstat -an | grep -w LISTEN
```

```
tcp        0      0 127.0.0.1:10248         0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:10249         0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:2379          0.0.0.0:*               LISTEN
tcp        0      0 10.53.64.6:2379         0.0.0.0:*               LISTEN
tcp        0      0 10.53.64.6:2380         0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:42893         0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:2381          0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.11:46607        0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:10257         0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:10259         0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:53              0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN
tcp6       0      0 :::10250                :::*                    LISTEN
tcp6       0      0 :::6443                 :::*                    LISTEN
tcp6       0      0 :::10256                :::*                    LISTEN
tcp6       0      0 :::22                   :::*                    LISTEN
tcp6       0      0 :::8888                 :::*                    LISTEN
```

> [!important]
> **Security Best Practice**
>
> Applying the principle of least privilege is essential—limit access only to necessary ports and services to reduce your system’s attack surface.

## Approaches to Network Security

In real-world environments with interconnected clients and servers across multiple routers and switches, adopting layered security measures is critical. There are two primary approaches to enforcing network security:

1.  **Network-wide Security:**  
    Utilize external firewalls or dedicated security appliances such as Cisco ASA, Juniper NextGen Firewall, Barracuda NextGen Firewall, or Fortinet devices. These solutions allow you to define complex rules that control the flow of traffic across the entire network.
2.  **Server-level Security:**  
    Implement host-based firewalls using tools like iptables, firewalld, or UFW on Linux systems, and leverage built-in firewall capabilities on Windows servers. This approach restricts network access on a per-server basis.

## Next Steps: Configuring UFW

In the next section, we will demonstrate how to use UFW (Uncomplicated Firewall) from the command line to configure a Linux firewall effectively. UFW simplifies the process of setting firewall rules for both incoming and outgoing connections.

For additional insights on firewall configuration and network security best practices, consider consulting the following resources:

- [UFW Documentation](https://help.ubuntu.com/community/UFW)
- [iptables Man Page](https://linux.die.net/man/8/iptables)

This guide equips you with the foundational knowledge to minimize external network access and enhance your overall security posture.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/aa5b922c-75d8-4df0-8ad8-dc272920caa9)**
>
> Watch video content
