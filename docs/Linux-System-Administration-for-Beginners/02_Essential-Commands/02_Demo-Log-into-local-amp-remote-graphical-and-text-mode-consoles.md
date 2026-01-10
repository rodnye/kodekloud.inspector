# Demo Log into local amp remote graphical and text mode consoles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Essential-Commands/Demo-Log-into-local-amp-remote-graphical-and-text-mode-consoles)

---

## Table of Contents

- Demo Log into local amp remote graphical and text mode consoles
  - 1. Local Graphical Login on CentOS
  - 2. Remote Graphical Login via RDP
  - 3. Remote Text-Mode Login with SSH
  - Links and References
  - Watch Video

---

## Content

Linux System Administration for Beginners

Essential Commands

# Demo Log into local amp remote graphical and text mode consoles

Welcome to this demonstration on three common Linux login methods. We’ll cover:

| Login Method           | Environment        | Key Steps                                             |
| ---------------------- | ------------------ | ----------------------------------------------------- |
| Local Graphical        | CentOS VM (GNOME)  | Select user → Enter password → Sign In                |
| Remote Graphical (RDP) | Windows/Linux host | Open RDP client → Connect to VM IP → Authenticate     |
| Remote Text-Mode (SSH) | Terminal access    | `ssh user@host` → Enter password → Manage remote host |

---

## 1\. Local Graphical Login on CentOS

1.  Power on your CentOS VM with GNOME installed.
2.  At the login screen:
    - Click your **Username**.
    - Type your **Password**.
    - Press **Sign In**.
3.  GNOME will load by default.
4.  To end your session, click your user menu in the top-right corner and select **Log Out**.

---

## 2\. Remote Graphical Login via RDP

On your host machine, launch the Remote Desktop client (e.g., Remote Desktop Connection on Windows or `remmina` on Linux).

1.  Enter your VM’s IP address and click **Connect**:

![The image shows a Remote Desktop Connection window open on a CentOS virtual machine running in Oracle VM VirtualBox. The CentOS login screen is visible in the background.](https://kodekloud.com/kk-media/image/upload/v1752881473/notes-assets/images/Linux-System-Administration-for-Beginners-Demo-Log-into-local-amp-remote-graphical-and-text-mode-consoles/remote-desktop-centos-virtualbox-login.jpg)

> [!important]
> **Warning**
>
> Ensure the CentOS VM’s firewall allows TCP port 3389 for RDP. If needed, run:
>
> ```
> sudo firewall-cmd --add-port=3389/tcp --permanent
> sudo firewall-cmd --reload
> ```

2.  When prompted, enter your **Username** (`student`) and **Password**:

![The image shows a login screen for a remote desktop connection with fields for session type, username, and password. The background is teal, and there's a logo with the text "Just connecting."](https://kodekloud.com/kk-media/image/upload/v1752881474/notes-assets/images/Linux-System-Administration-for-Beginners-Demo-Log-into-local-amp-remote-graphical-and-text-mode-consoles/remote-desktop-login-screen-teal.jpg)

3.  After logging in, open **Activities** and launch **GNOME Terminal**:

![The image shows a computer desktop with a terminal window open, displaying a command prompt. The background features a geometric blue pattern.](https://kodekloud.com/kk-media/image/upload/v1752881475/notes-assets/images/Linux-System-Administration-for-Beginners-Demo-Log-into-local-amp-remote-graphical-and-text-mode-consoles/computer-desktop-terminal-command-prompt.jpg)

---

## 3\. Remote Text-Mode Login with SSH

From the GNOME Terminal in your remote session (`student@LFCS-CentOS2`), connect to the target VM (`192.168.0.17`) as user **aaron**:

```
ssh aaron@192.168.0.17
```

> [!important]
> **Note**
>
> Your password won’t be displayed as you type for security reasons.

Once authenticated, you may see output like:

```
Activate the web console with: systemctl enable --now cockpit.socket
Last login: Tue Oct 19 04:22:38 2021
```

Your prompt should now reflect the remote host (e.g., `aaron@LFCS-CentOS`). When you’re done:

```
exit
```

This command closes the SSH session and returns you to `student@LFCS-CentOS2`. To end the graphical RDP session, simply log out or close the RDP window.

---

That’s all for this lesson. See you in the next one!

## Links and References

- [SSH Documentation](https://www.openssh.com/manual.html)
- [GNOME Desktop Environment](https://help.gnome.org/)
- [Remote Desktop Services](https://docs.microsoft.com/windows-server/remote/remote-desktop-services)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/b9bdc6de-c9ba-4044-a631-705604f9ca53)**
>
> Watch video content
