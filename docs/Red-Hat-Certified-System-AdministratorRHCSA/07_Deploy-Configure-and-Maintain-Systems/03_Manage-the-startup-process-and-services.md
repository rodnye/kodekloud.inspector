# Manage the startup process and services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Deploy-Configure-and-Maintain-Systems/Manage-the-startup-process-and-services)

---

## Table of Contents

- Manage the startup process and services
  - Understanding the Init System and Service Units
  - Example: Managing the SSH Daemon
  - Controlling Service States
  - Enabling and Disabling Services
  - Masking Services
  - Listing All Service Units
  - Conclusion
  - Watch Video
  - Practice Lab
    - Restart vs. Reload

---

## Content

Red Hat Certified System Administrator(RHCSA)

Deploy Configure and Maintain Systems

# Manage the startup process and services

In this article, you'll learn how to manage Linux startup processes and services effectively. We will discuss how systemd—the init system—handles the startup sequence, restarts failed applications, and orchestrates service dependencies.

When Linux boots, several critical applications launch automatically in a defined order. For instance, if "app2" depends on "app1", then app1 starts before app2. This ordered process happens seamlessly behind the scenes. Furthermore, if a vital application crashes, systemd automatically restarts it to maintain system reliability.

## Understanding the Init System and Service Units

The core mechanism responsible for this operation is the init system (short for initialization system). It reads configuration files called "units" that provide detailed instructions on how to:

- Start the system and individual services.
- Handle unexpected crashes.
- Reload configurations or restart services.

Service units—files ending with a `.service` extension—specifically define how to manage applications. A typical service unit describes: • The command to launch an application. • The behavior when a program crashes. • Commands to reload configurations or restart the service.

To explore all available options for a service unit, run:

```
$ man systemd.service
```

This command opens the manual page that explains the configuration options for service units:

```
SYSTEMD.SERVICE(5)                          systemd.service                          SYSTEMD.SERVICE(5)


NAME
       systemd.service - Service unit configuration


SYNOPSIS
       service.service


DESCRIPTION
       A unit configuration file whose name ends in ".service" encodes
       information about a process controlled and supervised by systemd.


       This man page lists the configuration options specific to this unit
       type. See systemd.unit(5) for the common options of all unit
       configuration files. The common configuration items are configured in
       the generic "[Unit]" and "[Install]" sections. The service specific
       configuration options are configured in the "[Service]" section.
```

## Example: Managing the SSH Daemon

For many servers, the SSH daemon is essential for remote connectivity. The SSH service unit guides systemd on how to start and maintain the daemon. To inspect this service file, use the command:

```
$ systemctl cat sshd.service
```

You might see output similar to this:

```
# /usr/lib/systemd/system/sshd.service
[Unit]
Description=OpenSSH server daemon
Documentation=man:sshd(8) man:sshd_config(5)
After=network.target sshd-keygen.target
Wants=sshd-keygen.target


[Service]
Type=notify
EnvironmentFile=/etc/crypto-policies/back-ends/opensshserver.config
EnvironmentFile=-/etc/sysconfig/sshd
ExecStart=/usr/sbin/sshd -D $OPTIONS $CRYPTO_POLICY
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
RestartSec=42s


[Install]
WantedBy=multi-user.target
```

In this configuration:

- The `ExecStart` directive tells systemd which command to execute to start the SSH daemon.
- `ExecReload` specifies how to reload the daemon's configuration.

To edit this service file completely, use:

```
$ sudo systemctl edit --full sshd.service
```

If you need to revert your changes and return to the default settings, run:

```
$ sudo systemctl revert sshd.service
```

To check the service status, including its PID, enabled state, and recent log messages, execute:

```
$ sudo systemctl status sshd.service
```

A typical status output might look like:

```
$ sudo systemctl status sshd.service
sshd.service - OpenSSH server daemon
   Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; vendor preset)
   Active: active (running) since Wed 2021-12-08 16:48:53 CST; 15min ago
     Docs: man:sshd(8)
           man:sshd_config(5)
 Main PID: 1031 (sshd)
    Tasks: 1 (limit: 23555)
   Memory: 2.1M
  CGroup: /system.slice/sshd.service
           └─1031 /usr/sbin/sshd -D -oCiphers=aes256-gcm@openssh.com,chacha20-poly1305


Dec 08 16:48:53 LFCS-CentOS systemd[1]: Starting OpenSSH server daemon...
Dec 08 16:48:53 LFCS-CentOS sshd[1031]: Server listening on 0.0.0.0 port 22.
Dec 08 16:48:53 LFCS-CentOS sshd[1031]: Server listening on :: port 22.
Dec 08 16:48:53 LFCS-CentOS systemd[1]: Started OpenSSH server daemon.
```

> [!important]
> **Note**
>
> An enabled service will start automatically during system boot. Always check recent log messages to diagnose startup issues.

## Controlling Service States

Managing service states with systemd involves starting, stopping, restarting, and reloading services. The following table summarizes common commands and their use cases:

| Command | Description                               | Example                             |
| ------- | ----------------------------------------- | ----------------------------------- |
| status  | Check the current status and logs         | sudo systemctl status sshd.service  |
| start   | Start a service (if not running)          | sudo systemctl start sshd.service   |
| stop    | Stop a running service                    | sudo systemctl stop sshd.service    |
| restart | Restart the service (stop then start)     | sudo systemctl restart sshd.service |
| reload  | Reload configuration without full restart | sudo systemctl reload sshd.service  |

### Restart vs. Reload

- **Restart:** Stops and then starts the service, which may interrupt current connections.
- **Reload:** Applies configuration changes without disrupting active connections (if supported).

After any action, you should verify the status:

```
$ sudo systemctl status sshd.service
```

If the configuration reload is successful, the logs may show entries such as:

```
Dec 08 17:26:20 LFCS-CentOS sshd[3952]: Received SIGHUP; restarting.
Dec 08 17:26:20 LFCS-CentOS systemd[1]: Reloaded OpenSSH server daemon.
```

> [!important]
> **Warning**
>
> Not all applications support a graceful reload. If a reload is not possible, systemd may perform a full restart.

## Enabling and Disabling Services

To control whether a service starts automatically at boot, use the following commands:

- **Disable a Service:** Prevents a service from launching on boot.

  ```
  $ sudo systemctl disable sshd.service
  ```

- **Check Service Status:** Verify if the service is enabled.

  ```
  $ sudo systemctl status sshd.service
  $ sudo systemctl is-enabled sshd.service
  ```

- **Enable a Service:** Ensures the service starts during boot.

  ```
  $ sudo systemctl enable sshd.service
  ```

When installing a new server application, you often want to enable and start it simultaneously:

```
$ sudo systemctl enable sshd.service
$ sudo systemctl start sshd.service
```

Or combine them into one step:

```
$ sudo systemctl enable --now sshd.service
```

To disable plus stop a service at the same time:

```
$ sudo systemctl disable --now sshd.service
```

> [!important]
> **Warning**
>
> Be cautious when disabling critical services such as the SSH daemon; doing so can lock you out of your system.

## Masking Services

Even after disabling a service, other components may inadvertently start it. Masking a service creates a symbolic link to /dev/null, ensuring the service can neither be started nor enabled.

To mask a service like atd (which schedules tasks), execute:

```
$ sudo systemctl mask atd.service
```

Any attempt to start or enable the masked service will result in an error, as shown below:

```
$ sudo systemctl enable atd.service
Failed to enable unit: Unit file /etc/systemd/system/atd.service is masked.
$ sudo systemctl start atd.service
Failed to start atd.service: Unit atd.service is masked.
```

To restore normal operations, simply unmask the service:

```
$ sudo systemctl unmask atd.service
```

## Listing All Service Units

Service unit names can sometimes be confusing. For example, the Apache web server might be listed as "httpd.service" instead of "apache.service." To list all service units, regardless of their state, run:

```
$ sudo systemctl list-units --type service --all
```

This command provides details like:

```
UNIT                                    LOAD      ACTIVE   SUB    DESCRIPTION
accounts-daemon.service                 loaded    active   running Accounts Service
alsa-restore.service                    loaded    inactive dead   Save/Restore Sound Card Settings
alsa-state.service                      loaded    active   running Manage Sound Card State
● apparmor.service                      not-found inactive dead   apparmor.service
atd.service                             loaded    active   running Job spooling tools
auditd.service                          loaded    active   running Security Auditing Service
auth-rpcgss-module.service              loaded    inactive dead   Kernel Module Supporting GSSAPI
...
```

## Conclusion

In this article, we covered how Linux manages startup processes and services using systemd. We explored service units and learned how to inspect, start, stop, reload, enable, disable, and mask services. With these tools and commands, you can manage critical applications effectively, ensuring your system remains stable.

Now it's time to put these concepts into practice in a lab environment to solidify your understanding.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/736506db-a70d-463d-a061-74c768d309b0/lesson/6122c847-8679-4bad-a5ba-e468f4532bdb)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/736506db-a70d-463d-a061-74c768d309b0/lesson/061c4741-156a-4dc1-ab0e-e2f6c26620dc)**
>
> Practice lab
