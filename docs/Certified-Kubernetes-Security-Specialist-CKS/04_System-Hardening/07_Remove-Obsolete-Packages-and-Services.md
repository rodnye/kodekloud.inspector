# Remove Obsolete Packages and Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/System-Hardening/Remove-Obsolete-Packages-and-Services)

---

## Table of Contents

- Remove Obsolete Packages and Services
  - Managing Services with systemd
  - Disabling Unnecessary Services
  - Further Reading
  - Watch Video
    - Listing All Installed Services

---

## Content

Certified Kubernetes Security Specialist (CKS)

System Hardening

# Remove Obsolete Packages and Services

In this guide, we'll explore best practices for keeping your system lean and secure by eliminating unnecessary packages and services. Over time, systems can accumulate software installed by default from snapshots or image templates, which increases complexity and enlarges your security attack surface.

> [!important]
> **Review Regularly**
>
> Regularly auditing installed software and services is vital. This process helps ensure that only essential components are maintained and updated with the latest security patches. For example, verify whether Apache is genuinely needed on Kubernetes cluster nodes or if it was installed inadvertently.

![The image advises installing only necessary packages, listing "kubelet," "kubeadm," "Container runtime," and "kubectl" in green, and "apache2" in red.](https://kodekloud.com/kk-media/image/upload/v1752871749/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Remove-Obsolete-Packages-and-Services/frame_50.jpg)

## Managing Services with systemd

Modern Linux distributions commonly use systemd to manage services. The `systemctl` utility provides comprehensive control to view service status, start, and stop essential services.

For instance, to check the status of the Apache service, run:

```
systemctl status apache2
Loaded: loaded (/lib/systemd/system/apache2.service; enabled; vendor preset: enabled)
Drop-In: /lib/systemd/system/apache2.service.d
 └─apache2-system.conf
Active: active (running) since Mon 2021-03-29 18:01:14 UTC; 1s ago
Process: 19026 ExecStart=/usr/sbin/apachectl start (code=exited, status=0/SUCCESS)
Main PID: 19037 (apache2)
Tasks: 55 (limit: 7372)
CGroup: /system.slice/apache2.service
 ├─19037 /usr/sbin/apache2 -k start
 ├─19038 /usr/sbin/apache2 -k start
 └─19039 /usr/sbin/apache2 -k start
```

This output confirms that Apache is active and running, with its main configuration file located at `/lib/systemd/system/apache2.service`. While many packages install their service files automatically, some services might be manually added to launch additional processes. It is crucial to identify and manage only the services required for your environment.

### Listing All Installed Services

To view all services installed on your system, use:

```
systemctl list-units --type service
```

A sample output includes:

```
apache2.service         loaded active running   The Apache HTTP Server
apparmor.service        loaded active exited    AppArmor initialization
containerd.service      loaded active running   containerd container runtime
dbus.service            loaded active running   D-Bus System Message Bus
docker.service          loaded active running   Docker Application Container Engine
ebtables.service        loaded active exited    ebtables ruleset management
kmod-static-nodes.service loaded active exited   Create list of required static device nodes
kubelet.service         loaded active running   kubelet: The Kubernetes Node Agent
proxy.service           loaded active running   kubectl proxy 8888
systemd-journal-flush.service loaded active exited Flush Journal to Persistent Storage
```

## Disabling Unnecessary Services

If you determine that a service file is not needed, you can disable and stop it. For example, to disable Apache:

```
systemctl stop apache2
systemctl disable apache2
```

You might see output similar to:

```
Synchronizing state of apache2.service with SysV service script with /lib/systemd/systemd-sysv-install.
Executing: /lib/systemd/systemd-sysv-install disable apache2
```

After stopping the service, remove the corresponding package. For example, to remove Apache using `apt`:

```
apt remove apache2
```

A sample removal process output would be:

```
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following packages were automatically installed and are no longer required:
  apache2-bin apache2-data apache2-utils libapr1 libaprutil1 libaprutil1-dbd-sqlite3
  libapru1-ldap liblua5.2-0 ssl-cert
Use 'apt autoremove' to remove them.
The following packages will be REMOVED:
  apache2
0 upgraded, 0 newly installed, 1 to remove and 23 not upgraded.
After this operation, 536 kB disk space will be freed.
Do you want to continue? [Y/n] Y
(Reading database ... 15908 files and directories currently installed.)
Removing apache2 (2.4.29-1ubuntu4.14) ...
invoke-rc.d: policy-rc.d denied execution of stop.
invoke-rc.d: policy-rc.d denied execution of stop.
```

> [!important]
> **Caution**
>
> Before purging any package, ensure that it is not required by other services or dependencies. Removing essential software may disrupt system functionality.

## Further Reading

For additional best practices in configuring and managing services, refer to section 2 of the [CIS Benchmarks for Distribution Independent Linux](https://www.cisecurity.org/cis-benchmarks/).

By following these guidelines, you can streamline your system by maintaining only the essential packages and services, thereby reducing complexity and enhancing overall security.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/3238a3aa-4ff7-4ab7-a8cf-6a3101b2078c)**
>
> Watch video content
