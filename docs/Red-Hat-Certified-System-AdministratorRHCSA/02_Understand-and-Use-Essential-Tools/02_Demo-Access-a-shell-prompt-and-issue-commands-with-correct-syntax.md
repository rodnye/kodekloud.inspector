# Demo Access a shell prompt and issue commands with correct syntax - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/Demo-Access-a-shell-prompt-and-issue-commands-with-correct-syntax)

---

## Table of Contents

- Demo Access a shell prompt and issue commands with correct syntax
  - Graphical Login on a Local Machine
  - Graphical Remote Login via RDP
  - Text Mode Login via SSH
  - Watch Video

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# Demo Access a shell prompt and issue commands with correct syntax

Welcome to this comprehensive guide on logging into Linux machines using various methods. In this lesson, we will cover three distinct approaches for accessing a Linux environment:

1.  Graphical login on a local machine.
2.  Graphical remote login via RDP.
3.  Text-based login using SSH.

---

## Graphical Login on a Local Machine

In this section, we use a CentOS virtual machine (VM) that is already booted and configured with a graphical interface. To log in, follow these steps:

- On the login screen, select your username.
- Enter your password, then click **Sign In**.

After a brief moment, the default GNOME desktop environment will load, similar to the login you experience on your personal computer. Once your session begins, you can log out when ready to proceed to the next method.

---

## Graphical Remote Login via RDP

In this part, we demonstrate remote access via **Windows Remote Desktop (RDP)**. A dedicated VM is configured to accept RDP connections. To establish a remote login session, perform the following:

1.  Open your Remote Desktop connection tool.
2.  Enter the target IP address (pre-filled for demonstration) and click **Connect**.

![The image shows a CentOS virtual machine running in Oracle VM VirtualBox with a Remote Desktop Connection window open, prompting for a computer address and username.](https://kodekloud.com/kk-media/image/upload/v1752883621/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Demo-Access-a-shell-prompt-and-issue-commands-with-correct-syntax/centos-vm-virtualbox-remote-desktop.jpg)

A login screen appears, pre-populated with the username "student." Type the corresponding password and click **OK**. The remote graphical session will then commence, displaying the machine's IP address at the top of the window.

![The image shows a login screen for a remote desktop session with fields for session type, username, and password. The background is teal, and the interface includes an "OK" and "Cancel" button.](https://kodekloud.com/kk-media/image/upload/v1752883622/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Demo-Access-a-shell-prompt-and-issue-commands-with-correct-syntax/remote-desktop-login-screen.jpg)

Within the session, navigate to the **Activities** menu and select the GNOME Terminal to launch a virtual terminal emulator.

---

## Text Mode Login via SSH

From the GNOME Terminal session, where you are logged in as "student" on LFCS-CentOS2, initiate an SSH connection to another machine with the following command:

```
[student@LFCS-Centos2 ~]$ ssh aaron@192.168.0.17
```

After executing the command, you will be prompted for the password associated with the user "aaron." Note that as you type, no characters will display on the screen. Once you press **Enter** and the password is authenticated, you should see a confirmation message similar to:

```
aaron@192.168.0.17's password:
Activate the web console with: systemctl enable --now cockpit.socket
Last login: Tue Oct 19 04:22:38 2021
[aaron@LFCS-CentOS7 ~]$
```

This output confirms your successful login to the remote machine. To exit the SSH session and return to your "student" session on LFCS-CentOS2, type:

```
[aaron@LFCS-CentOS7 ~]$ exit
```

After closing the terminal emulator, be sure to log out of your session to complete the process.

---

> [!important]
> **Note**
>
> For more detailed guidance on SSH configurations and management, refer to the [OpenSSH documentation](https://www.openssh.com/manual.html).

This concludes our lesson on accessing a shell prompt and issuing commands with the correct syntax. Thank you for following along, and we look forward to guiding you in our next session.

For further reading and additional resources, check out:

- [Linux Documentation Project](https://www.tldp.org/)
- [CentOS Wiki](https://wiki.centos.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/6d092a50-22b8-4916-a518-e94a0c283b62)**
>
> Watch video content
