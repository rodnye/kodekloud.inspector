# Privilege Escalation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Threat-Model/Privilege-Escalation)

---

## Table of Contents

- Privilege Escalation
  - Why Use sudo?
  - Configuring sudo: /etc/sudoers
  - Best Practices for sudo Configuration
  - Hands-On Exercises
  - Links and References
  - Watch Video
    - Attempting a Restricted Operation
    - Elevate with sudo

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Threat Model

# Privilege Escalation

Privilege escalation allows a non-root user to perform tasks requiring superuser rights. Instead of enabling direct root logins—which poses security risks—you can delegate specific commands to trusted users via `sudo`. This approach enforces the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) and keeps your system secure.

## Why Use sudo?

- Grants temporary elevated rights without sharing the root password
- Provides an audit trail of executed commands
- Limits users to only the commands they need

### Attempting a Restricted Operation

Without `sudo`, installing packages fails:

```
$ apt install nginx
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), are you root?
```

### Elevate with sudo

Prepend `sudo`, authenticate with your own password, and the command succeeds:

```
$ sudo apt install nginx
[sudo] password for michael:
```

> [!important]
> **Note**
>
> If you see `User michael is not in the sudoers file`, add your user to the `sudo` group or update `/etc/sudoers` accordingly.

## Configuring sudo: /etc/sudoers

All `sudo` policies live in `/etc/sudoers` and included files under `/etc/sudoers.d/`. Always edit with `visudo` to prevent syntax errors:

```
sudo visudo
```

Here’s a sample excerpt:

```
# User privilege specification
root    ALL=(ALL:ALL) ALL


# Members of the admin group may gain root privileges
%admin  ALL=(ALL)       ALL


# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL)   ALL


# Allow mark to run any command
mark    ALL=(ALL:ALL)   ALL


# Allow sarah to reboot the system
sarah   localhost=/usr/bin/shutdown -r now


# See sudoers(5) for more information on "#include" directives:
#includedir /etc/sudoers.d
```

| Field                | Description                                           | Example                          |
| -------------------- | ----------------------------------------------------- | -------------------------------- |
| User or Group        | Username (e.g., `mark`) or group (`%sudo`)            | `%admin`                         |
| Host(s)              | Hosts where the rule applies (usually `ALL`)          | `localhost`                      |
| Run-As Specification | User and group for command execution (in `(` and `)`) | `(ALL:ALL)`                      |
| Commands             | Allowed commands or `ALL` for full rights             | `/usr/bin/shutdown -r now`       |
| Comments             | Lines beginning with `#` are ignored                  | `# User privilege specification` |

> [!important]
> **Warning**
>
> Never edit `/etc/sudoers` with a regular text editor. Syntax errors can lock out all sudo access. Always use `visudo`.

## Best Practices for sudo Configuration

- Grant only the commands necessary for a task
- Use group-based rules to simplify management
- Avoid `NOPASSWD` unless automation requires it
- Keep custom rules in `/etc/sudoers.d/` for modularity

## Hands-On Exercises

1.  Create a test user:

    ```
    sudo useradd -m bob
    sudo passwd bob
    ```

2.  Add the user to the `sudo` group:

    ```
    sudo usermod -aG sudo bob
    ```

3.  Switch to `bob` and install a package:

    ```
    su - bob
    sudo apt update && sudo apt install htop
    ```

4.  Customize a rule in `/etc/sudoers.d/custom_rules` to allow `bob` to restart services without a password.

## Links and References

- [sudo Manual Page](https://www.sudo.ws/man/1.8.31/sudoers.man.html)
- [Visudo Documentation](https://linux.die.net/man/8/visudo)
- [Principle of Least Privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege)
- [Kali Linux Privilege Escalation Guide](https://www.kali.org/docs/practice/privilege-escalation/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/6da25ade-b162-485c-b9b9-f351990e99c2/lesson/95be0e42-0b15-4321-bd4c-41508664fd26)**
>
> Watch video content
