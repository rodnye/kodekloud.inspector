# Additional Modules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Ansible-Modules/Additional-Modules)

---

## Table of Contents

- Additional Modules
  - Package Module
  - Service Module
  - Firewalld Module
  - LVM Modules
  - File System and File Modules
  - Archive and Unarchive Modules
  - Cron Module
  - User, Group, and Authorized Keys Modules
  - Watch Video
  - Practice Lab
    - Example: Specific Date and Time
    - Example: Using Wildcards
    - Example: Using Step Values

---

## Content

Ansible Advanced Course

Ansible Modules

# Additional Modules

In this lesson, we introduce several additional Ansible modules designed to extend your automation capabilities. In the upcoming labs, you will gain hands-on experience with these modules while exploring their various options. For detailed reference on each module, please check the respective module documentation.

Let's get started!

---

## Package Module

To install packages on a target host, use the module that corresponds to the host's package manager. For instance, use the `yum` module for CentOS or Red Hat Enterprise Linux and the `apt` module for Ubuntu. Starting with Ansible 2.0, you can also use the unified `package` module which automatically selects the correct package manager based on the host. However, keep in mind that package names might differ between operating systems—for example, the web server package is known as "httpd" on CentOS but "apache2" on Ubuntu. In such scenarios, managing package names with variables or conditionals becomes crucial.

> [!important]
> **Note**
>
> Using the `package` module with a single package name (e.g., `httpd`) might not work across different operating systems. Consider advanced techniques such as variables and conditionals to handle such variations.

Below is an example playbook that demonstrates three approaches:

```
---
- name: Install web server packages on multiple platforms
  hosts: all
  tasks:
    - name: Install web server on CentOS
      yum:
        name: httpd
        state: installed


    - name: Install web server on Ubuntu
      apt:
        name: apache2
        state: installed


    - name: Install web server on any host using package module
      package:
        name: httpd
        state: installed
```

---

## Service Module

The `service` module is used to manage system services. Whether you need to start, stop, or restart a service, or ensure it is enabled to start at boot time, this module has you covered.

```
---
- name: Ensure httpd service is running and enabled
  hosts: all
  tasks:
    - service:
        name: httpd
        state: started
        enabled: yes
```

---

## Firewalld Module

For firewall configuration on CentOS or Red Hat systems, the `firewalld` module is the go-to tool. Configure rules based on port, protocol, service, or source address, and specify the appropriate zone. By default, Ansible applies changes immediately; however, if you need rules to persist after reboots, set the `permanent` option to `yes`. Keep in mind that with `permanent` enabled, rules will not take immediate effect unless the `immediate` option is also set to `yes`.

```
---
- name: Add firewalld rule to allow HTTP traffic on port 8080
  hosts: all
  tasks:
    - firewalld:
        port: 8080/tcp
        service: http
        source: 192.0.0.0/24
        zone: public
        state: enabled
        permanent: yes
        immediate: yes
```

---

## LVM Modules

The LVM modules allow you to manage Logical Volume Management efficiently. Start by creating a volume group using the `lvg` module, then create logical volumes within the group using the `lvol` module. The example below creates a volume group named "vg1" on specified physical devices, followed by the creation of a logical volume "lvol1" with a size of 2GB.

```
---
- hosts: all
  tasks:
    - name: Create LVM Volume Group "vg1"
      lvg:
        vg: vg1
        pvs: /dev/sdb1,/dev/sdb2


    - name: Create Logical Volume "lvol1" with 2GB size
      lvol:
        vg: vg1
        lv: lvol1
        size: 2g
```

---

## File System and File Modules

The filesystem and file management modules are essential for creating filesystems, mounting devices, and managing files or directories. Use the filesystem module to create filesystems on devices and the mount module for mounting. The `file` module comes in handy for creating files, directories, and symbolic links with specific permissions and ownership settings.

For example, the following playbook creates an application directory and an empty HTML file with defined ownership and permissions:

```
---
- hosts: all
  tasks:
    - name: Create application directory
      file:
        path: /opt/app/web
        state: directory


    - name: Create index.html file with proper ownership and mode
      file:
        path: /opt/app/web/index.html
        state: touch
        owner: app-owner
        group: app-owner
        mode: '0644'
```

---

## Archive and Unarchive Modules

The `archive` module is useful for compressing files or directories. By default, it creates a GZ archive, though you can specify different formats using the `format` option. Conversely, the `unarchive` module decompresses files and can transfer archives from the Ansible controller to target systems. When working with files already existing on the remote host, set `remote_src: yes`.

```
---
- hosts: all
  tasks:
    - name: Compress the /opt/app/web folder
      archive:
        path: /opt/app/web
        dest: /tmp/web.gz
        format: gz


    - name: Uncompress the archive on the remote host
      unarchive:
        src: /tmp/web.gz
        dest: /opt/app/web
        remote_src: yes
```

---

## Cron Module

The `cron` module automates the configuration of scheduled tasks (cron jobs) on managed nodes. With this module, you can specify details such as the job name, command, and exact schedule parameters like month, day, hour, minute, and even weekday.

### Example: Specific Date and Time

Schedule a job to execute on February 19 at 08:10.

```
---
- hosts: all
  tasks:
    - name: Create a scheduled task for February 19 at 08:10
      cron:
        name: Run daily health report
        job: sh /opt/scripts/health.sh
        month: 2
        day: 19
        hour: 8
        minute: 10
```

### Example: Using Wildcards

Run the task every day at 08:10 using wildcards for the month and day values.

```
---
- hosts: all
  tasks:
    - name: Create a scheduled daily task at 08:10
      cron:
        name: Run daily health report
        job: sh /opt/scripts/health.sh
        month: "*"
        day: "*"
        hour: 8
        minute: 10
        weekday: "*"
```

This schedule corresponds to the following cron syntax:

```
10 8 * * *
```

### Example: Using Step Values

Configure a task to run every two minutes using step values in the minute field:

```
---
- hosts: all
  tasks:
    - name: Create a scheduled task to run every two minutes
      cron:
        name: Run daily health report
        job: sh /opt/scripts/health.sh
        month: "*"
        day: "*"
        hour: "*"
        minute: "*/2"
        weekday: "*"
```

Which is equivalent to the cron entry:

```
*/2 * * * *
```

---

## User, Group, and Authorized Keys Modules

Managing user accounts and groups is made simple with the `user` and `group` modules. The `user` module allows you to set properties such as user ID, default group, login shell, and more. Additionally, the `group` module is used to create or manage user groups.

```
---
- hosts: all
  tasks:
    - name: Create a new user "maria"
      user:
        name: maria
        uid: 1001
        group: developers
        shell: /bin/bash


    - name: Create the "developers" group
      group:
        name: developers
```

To manage SSH keys for user accounts, use the `authorized_keys` module. This module distributes public SSH keys to specified user accounts on managed nodes.

```
---
- hosts: all
  tasks:
    - name: Configure SSH keys for user "maria"
      authorized_keys:
        user: maria
        state: present
        key: |
          ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABQC4WKn4K2G3iWg9HdCGo34gh+......root@97a1b9c3a
```

---

That concludes the overview of these additional Ansible modules. In upcoming labs, you'll have plenty of practical exercises to deepen your understanding and enhance your skills with these modules.

Happy automating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/c47e8f27-3b16-4603-966c-b440295e5b75/lesson/9478e060-9029-4a0a-a881-7c3d9ae2d670)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/c47e8f27-3b16-4603-966c-b440295e5b75/lesson/26d68ac9-5c2d-42e7-b2b7-465622ea8883)**
>
> Practice lab
