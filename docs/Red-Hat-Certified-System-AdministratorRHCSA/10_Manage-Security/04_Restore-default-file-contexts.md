# Restore default file contexts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Manage-Security/Restore-default-file-contexts)

---

## Table of Contents

- Restore default file contexts
  - Using Boolean Values to Modify SELinux Settings at Boot Time
  - Diagnosing and Addressing Routine SELinux Policy Violations
  - Restoring Default File Contexts for Apache
  - Summary
  - Watch Video
  - Practice Lab
    - 1. Booting in Permissive Mode
    - 2. Disabling SELinux Support at Boot
    - 3. Enabling Auto Relabel
    - Example: Changing the HTTPD Port

---

## Content

Red Hat Certified System Administrator(RHCSA)

Manage Security

# Restore default file contexts

In this lesson, we explore two key concepts related to SELinux:

1.  Modifying SELinux settings at boot time using Boolean values.
2.  Diagnosing and resolving routine SELinux policy violations.

---

## Using Boolean Values to Modify SELinux Settings at Boot Time

We'll start by modifying SELinux behavior directly from the GRUB boot screen of a RHEL machine.

![The image shows a boot menu for Red Hat Enterprise Linux, offering options to select or edit the boot process.](https://kodekloud.com/kk-media/image/upload/v1752883592/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Restore-default-file-contexts/red-hat-enterprise-linux-boot-menu.jpg)

At the GRUB screen, press "E" to edit the default kernel entry. In the editor, scroll down to the line beginning with "linux". Press Control + E to jump to the end of this line, then move the cursor one space before the "quiet" keyword. Here, you can append one of the following Boolean parameters to adjust SELinux behavior at boot:

### 1\. Booting in Permissive Mode

Appending `enforcing=0` will start SELinux in permissive mode while still applying the appropriate SELinux labels. This method is the Red Hat recommended approach to boot in permissive mode. For example:

```
load_video
set gfx_payload=keep
insmod gzio
linux ($root)/vmlinuz-4.18.0-372.19.1.el8_6.x86_64 root=/dev/mapper/rhel-root \
ro crashkernel=auto resume=/dev/mapper/rhel-swap rd.lvm.lv=rhel/root rd.lvm.lv=rhel/swap rhgb quiet enforcing=0
initrd ($root)/initramfs-4.18.0-372.19.1.el8_6.x86_64.img $tuned_initrd
```

### 2\. Disabling SELinux Support at Boot

Alternatively, you can disable SELinux entirely during boot by appending `selinux=0` to the kernel command line. When this parameter is used, no SELinux components will be loaded by the kernel. A subsequent boot without this parameter will trigger an automatic filesystem relabel.

```
load_video
set gfx_payload=keep
insmod gfxio
linux ($root)/vmlinuz-4.18.0-372.19.1.el8_6.x86_64 root=/dev/mapper/rhel-root \
ro crashkernel=auto resume=/dev/mapper/rhel-swap rd.lvm.lv=rhel/root rd.lvm.lv=rhel/swap rhgb quiet selinux=0
initrd ($root)/initramfs-4.18.0-372.19.1.el8_6.x86_64.img $tumed_initrd
```

### 3\. Enabling Auto Relabel

You can force a full filesystem relabel by appending `autorelabel=1`. This is equivalent to creating the `/etc/selinux/auto_relabel` file and rebooting.

```
load_video
set gfx_payload=keep
insmod gzio
linux ($root)/vmlinuz-4.18.0-372.19.1.el8_6.x86_64 root=/dev/mapper/rhel-root \
ro crashkernel=auto resume=/dev/mapper/rhel-swap rd.lvm.lv=rhel/root rd.lvm.lv=rhel/swap rhgb quiet autorelabel=1
initrd ($root)/initramfs-4.18.0-372.19.1.el8_6.x86_64.img $tuned_initrd
```

After making your desired changes, press Control + X to boot normally. This concludes the first part of the lesson.

---

## Diagnosing and Addressing Routine SELinux Policy Violations

Once the system has booted, log in to your RHEL system.

![The image shows a Red Hat login screen with a user named "aaron" and a password entry field. The Red Hat logo is displayed at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752883593/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Restore-default-file-contexts/red-hat-login-screen-aaron.jpg)

Even though some systems may boot into a text console, this demonstration uses graphical mode for ease of use. Next, we will explore how to handle one common SELinux issue by changing the default HTTPD port.

### Example: Changing the HTTPD Port

A typical issue arises when you modify the default port for the Apache HTTPD service. First, verify HTTPD is installed, then inspect the Apache configuration file to locate the `Listen` directive.

![The image shows a text editor window displaying a configuration file for the Apache HTTP server, containing comments and instructions for server setup.](https://kodekloud.com/kk-media/image/upload/v1752883594/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Restore-default-file-contexts/apache-http-server-config-file.jpg)

By default, Apache listens on port 80. Assume you change this setting to port 88. Edit the configuration file with:

```
sudo vi /etc/httpd/conf/httpd.conf
```

After saving your changes, attempt to start Apache:

```
sudo systemctl start httpd.service
```

If the service fails to start, you might see an error similar to:

```
Job for httpd.service failed because the control process exited with error code.
See "systemctl status httpd.service" and "journalctl -xe" for details.
```

Checking the status helps reveal that Apache encountered a permission error when binding to port 88:

```
sudo systemctl status httpd.service
```

Example output:

```
httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; disabled; vendor preset: disabled)
   Active: failed (Result: exit-code) since Wed 2022-09-07 01:36:08 CDT; 29s ago
     Docs: man:httpd.service(8)
  Process: 3853 ExecStart=/usr/sbin/httpd $OPTIONS -DFOREGROUND (code=exited, status=1/FAILURE)
 Main PID: 3853 (code=exited, status=1/FAILURE)


Sep 07 01:36:08 rhel8-node1 httpd[3853]: (13)Permission denied: AH00072: make_sock: could not bind to address 0.0.0.0:88
Sep 07 01:36:08 rhel8-node1 httpd[3853]: AH00015: Unable to open logs
```

Investigating further with `journalctl -xe` may point out that SELinux is preventing HTTPD from binding to port 88:

```
... SELinux is preventing /usr/sbin/httpd from name_bind access on the tcp_socket port 88. For complete SELinux messages run: sealert -l <alert_id>
```

The error message advises generating a local policy module with the following commands:

```
ausearch -c 'httpd' --raw | audit2allow -M my-httpd
semodule -X 300 -i my-httpd.pp
```

It is recommended to switch to the root shell for these operations:

```
sudo -i
```

Then, execute the commands:

```
ausearch -c 'httpd' --raw | audit2allow -M my-httpd
semodule -X 300 -i my-httpd.pp
```

Once the policy module `my-httpd` is installed, restart Apache:

```
systemctl start httpd.service
systemctl status httpd.service
```

A successful service status should indicate that Apache is active and running on port 88:

```
httpd.service - The Apache HTTP Server
   Active: active (running) since Wed 2022-09-07 01:39:14 CDT; 95s ago
   ...
Sep 07 01:39:14 rhel8-node1 httpd[3977]: Server configured, listening on: port 88
```

Confirm the service response with a curl command:

```
curl 127.0.0.1:88
```

You should see the HTML content of Apache's default page in the terminal.

---

## Restoring Default File Contexts for Apache

Another common issue occurs when file contexts do not align with SELinux expectations, particularly when Apache’s `DocumentRoot` is changed to a non-default directory.

In this scenario, modify the Apache configuration file to update the `DocumentRoot`. For example, change it to `/kodedu`:

```
# DocumentRoot: The directory out of which you will serve your documents.
DocumentRoot "/kodedu"


# Further configuration...
```

![The image shows a terminal window displaying the configuration file for an Apache HTTP server, with comments and settings related to server directives and log file paths.](https://kodekloud.com/kk-media/image/upload/v1752883595/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Restore-default-file-contexts/apache-http-server-configuration-terminal.jpg)

After updating the configuration, create the new document root directory and add a simple HTML file:

```
mkdir /kodedu
echo "KodeKloud" > /kodedu/kodekloud.html
```

Restart Apache to apply the changes:

```
systemctl restart httpd.service
```

When you access `http://127.0.0.1:88/kodekloud.html`, you might receive a "Forbidden" error. This error indicates that SELinux is denying access because the file contexts are incorrect. Check the current SELinux labels with:

```
ls -laZ /kodedu/
```

Files in `/kodedu` often have a generic context (e.g., `default_t`) instead of the required `httpd_sys_content_t`.

> [!important]
> **Tip**
>
> To resolve this, use the `semanage` command to assign the proper context.

Apply the correct file context with:

```
semanage fcontext -a -t httpd_sys_content_t '/kodedu(/.*)?'
```

Then, run the following command to update the file contexts recursively:

```
restorecon -R /kodedu/
```

Confirm the updated context by checking again:

```
ls -laZ /kodedu/
```

Finally, verify that the Apache default page is accessible:

```
curl 127.0.0.1:88/kodekloud.html
```

The output should display the expected HTML ("KodeKloud") content.

---

## Summary

In this lesson, you learned how to:

- Use Boolean values at boot time to modify SELinux behavior.
- Diagnose SELinux policy violations through `systemctl` and `journalctl`.
- Generate and apply local SELinux policy modules.
- Correct file contexts using `semanage` and `restorecon` to resolve access issues with Apache.

Proceed to your next lab or lecture with these troubleshooting techniques to ensure a secure and smoothly functioning SELinux environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/5935b82f-37ac-4f4e-b619-0a6f8824088b/lesson/f0b8a7df-876c-4dc6-b244-5646249e9b1e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/5935b82f-37ac-4f4e-b619-0a6f8824088b/lesson/cd35f9c8-f07f-423e-bf97-73b96b18d76f)**
>
> Practice lab
