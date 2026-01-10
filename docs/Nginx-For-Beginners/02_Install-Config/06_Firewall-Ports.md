# Firewall Ports - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Install-Config/Firewall-Ports)

---

## Table of Contents

- Firewall Ports
  - Built-In Firewalls Across Operating Systems
  - Understanding Ports
  - Managing UFW on Debian/Ubuntu
  - Managing firewalld on Red Hat/Fedora
  - Inspecting Open Ports with netstat
  - Links and References
  - Watch Video
    - Debian & Ubuntu (UFW)
    - Red Hat & Fedora (firewalld)
    - Windows & macOS

---

## Content

Nginx For Beginners

Install Config

# Firewall Ports

A firewall is a security barrier—hardware or software—between your system and the Internet. It inspects and filters incoming and outgoing traffic, blocking unauthorized access while permitting legitimate communication.

![The image illustrates a firewall acting as a barrier between a computer system and the internet, with a visual representation of a server, monitor, and a router.](https://kodekloud.com/kk-media/image/upload/v1752882295/notes-assets/images/Nginx-For-Beginners-Firewall-Ports/firewall-barrier-server-monitor-router.jpg)

Much like a home security system that monitors all “doors and windows,” a firewall triggers alarms when it detects suspicious activity. Hardware firewalls operate on the same principle but are deployed in network appliances or data centers.

## Built-In Firewalls Across Operating Systems

### Debian & Ubuntu (UFW)

Debian and Ubuntu include the Uncomplicated Firewall (UFW), which is **disabled by default**—permitting all traffic until activated.

![The image shows the logos of Debian and Ubuntu with a note about the Uncomplicated Firewall (UFW), indicating it is off by default but can be enabled to restrict traffic.](https://kodekloud.com/kk-media/image/upload/v1752882296/notes-assets/images/Nginx-For-Beginners-Firewall-Ports/debian-ubuntu-ufw-logos.jpg)

### Red Hat & Fedora (firewalld)

Red Hat and Fedora rely on **firewalld**, also off by default. Install or enable it with YUM or DNF if it’s missing.

![The image shows logos for Red Hat and Fedora, with a note about the "firewalld" service, indicating it is off by default but can be enabled to restrict traffic.](https://kodekloud.com/kk-media/image/upload/v1752882297/notes-assets/images/Nginx-For-Beginners-Firewall-Ports/red-hat-fedora-firewalld-logos.jpg)

Both UFW and firewalld serve as front ends to **iptables**, the underlying Linux utility managing packet filtering.

![The image shows logos for Red Hat and Fedora, with text about installing a firewall via YUM and mentions that iptables comes pre-installed in all Linux distributions.](https://kodekloud.com/kk-media/image/upload/v1752882297/notes-assets/images/Nginx-For-Beginners-Firewall-Ports/red-hat-fedora-firewall-yum.jpg)

### Windows & macOS

- Windows Firewall comes **enabled by default**.
- macOS Firewall is **disabled by default** but can be activated in System Preferences.

![The image shows icons for Windows and Apple with labels "Windows Firewall" and "Firewall," along with a toggle switch labeled "OFF" and "ON."](https://kodekloud.com/kk-media/image/upload/v1752882299/notes-assets/images/Nginx-For-Beginners-Firewall-Ports/windows-apple-firewall-toggle-icons.jpg)

> [!important]
> **Warning**
>
> Always keep your firewall enabled to reduce the attack surface of your server.

---

## Understanding Ports

A port is a logical communication endpoint—think of it as a “door” or “window” in your network. Each service listens on a specific port number.

![The image shows an illustration of a network cable and port, with text explaining that a port is a communication endpoint for data flow in and out of a computer or network device.](https://kodekloud.com/kk-media/image/upload/v1752882300/notes-assets/images/Nginx-For-Beginners-Firewall-Ports/network-cable-port-illustration.jpg)

When you visit websites:

- HTTP traffic → port **80**
- HTTPS traffic → port **443**

Other services use different ports. Expose only what’s necessary.

| Port | Service | Description             |
| ---- | ------- | ----------------------- |
| 22   | SSH     | Secure shell access     |
| 25   | SMTP    | Email delivery          |
| 53   | DNS     | Domain name resolution  |
| 80   | HTTP    | Unencrypted web traffic |
| 443  | HTTPS   | Encrypted web traffic   |

![The image lists common network ports along with their associated services, such as HTTP, HTTPS, SMTP, and others, with their respective port numbers and functions.](https://kodekloud.com/kk-media/image/upload/v1752882301/notes-assets/images/Nginx-For-Beginners-Firewall-Ports/common-network-ports-services-list.jpg)

**Best practice:** On public web servers, open only ports **80** and **443**, or restrict other ports via IP allow-lists.

---

## Managing UFW on Debian/Ubuntu

1.  Allow SSH first to prevent lockout:

    ```
    sudo ufw allow 22/tcp
    ```

2.  Enable UFW:

    ```
    sudo ufw enable
    ```

3.  Open HTTP and HTTPS:

    ```
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    ```

4.  Reload to apply:

    ```
    sudo ufw reload
    ```

5.  View rules with indices:

    ```
    sudo ufw status numbered
    ```

6.  Delete a specific rule:

    ```
    sudo ufw delete <rule-number>
    ```

---

## Managing firewalld on Red Hat/Fedora

1.  Install (if needed):

    ```
    sudo yum update && sudo yum install firewalld
    ```

2.  Start and enable at boot:

    ```
    sudo systemctl start firewalld
    sudo systemctl enable firewalld
    ```

3.  Open port permanently (e.g., HTTP):

    ```
    sudo firewall-cmd --permanent --add-port=80/tcp
    sudo firewall-cmd --reload
    ```

4.  Remove a port:

    ```
    sudo firewall-cmd --permanent --remove-port=80/tcp
    sudo firewall-cmd --reload
    ```

5.  Check active zones and ports:

    ```
    sudo firewall-cmd --list-all
    ```

---

## Inspecting Open Ports with netstat

`netstat` lists active connections and listening ports. Install it if missing:

```
# Debian/Ubuntu
sudo apt update
sudo apt install net-tools


# Red Hat/Fedora/CentOS
sudo yum install net-tools
```

Run:

```
sudo netstat -nltup
```

Sample output:

```
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1042/sshd
tcp6       0      0 :::22                   :::*                    LISTEN      1042/sshd
udp        0      0 127.0.0.1:323           0.0.0.0:*                          634/chronyd
udp6       0      0 :::323                  :::*                               634/chronyd
```

`netstat` helps you verify which ports your services are actively listening on—essential for troubleshooting connectivity and firewall configurations.

---

## Links and References

- [UFW Documentation](https://help.ubuntu.com/community/UFW)
- [firewalld Guide](https://firewalld.org/documentation/)
- [iptables Tutorial](https://wiki.nftables.org/wiki-nftables/index.php/Main_Page)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/0de43784-b08d-4ce0-8470-a7541b78fe58/lesson/4ff8592e-fd7b-4f7f-9a35-39994c529479)**
>
> Watch video content
