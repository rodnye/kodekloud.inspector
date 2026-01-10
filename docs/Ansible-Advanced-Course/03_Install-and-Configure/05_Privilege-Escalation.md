# Privilege Escalation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Install-and-Configure/Privilege-Escalation)

---

## Table of Contents

- Privilege Escalation
  - Understanding User Privileges
  - Configuring Privilege Escalation in Ansible
  - Summary
  - Watch Video
    - Example: Installing a Package Without Escalation
    - Example: Switching User Accounts
    - Basic Inventory and Playbook Without Privilege Escalation
    - Enabling Privilege Escalation with the become Directive
    - Using Alternative Privilege Escalation Methods
    - Targeting a Specific User With become_user
    - Prompting for a Privilege Escalation Password
      - In the Ansible Configuration File
      - In the Inventory File
      - In the Playbook

---

## Content

Ansible Advanced Course

Install and Configure

# Privilege Escalation

In this guide, you'll learn how to configure privilege escalation on managed nodes using Ansible. Privilege escalation is the process of temporarily obtaining elevated permissions (typically root or administrative privileges) to perform system tasks that a regular user cannot.

![The image features the text "Ansible Privilege Escalation" on a red and dark background, possibly indicating a topic related to Ansible's security features.](https://kodekloud.com/kk-media/image/upload/v1752869400/notes-assets/images/Ansible-Advanced-Course-Privilege-Escalation/frame_10.jpg)

## Understanding User Privileges

Every user on a system is assigned a set of permissions. Consider a development server for a web application where various user accounts exist:

- **root:** Full system privileges (often locked for direct login).
- **Administrator/Developer:** Limited privileges necessary for everyday tasks.
- **Dedicated Users:** Specific accounts for tools or applications like Nginx, databases, and monitoring tools.

A typical workflow in such an environment involves an administrator logging in (using a password or SSH key), installing packages that require elevated privileges, and then configuring applications under designated user accounts.

![The image displays a hierarchy of user roles, with "root" at the top, followed by "admin," "developer," "nginx," "monitor," and "mysql" users.](https://kodekloud.com/kk-media/image/upload/v1752869401/notes-assets/images/Ansible-Advanced-Course-Privilege-Escalation/frame_60.jpg)

### Example: Installing a Package Without Escalation

For instance, if an administrator logs in to install a package:

```
ssh -i id_ras admin@server1
su
yum install nginx
# Permission Denied
```

The command fails because installing packages requires root privileges. By configuring the admin user to use the sudo utility (or a similar mechanism), the admin can escalate privileges and perform the installation successfully.

### Example: Switching User Accounts

The process of switching to another user to configure an application is also a form of privilege escalation. For example:

```
ssh -i id_ras admin@server1
sudo yum install nginx
su nginx
su mysql
# Configure MySQL
```

In scenarios like this, privilege escalation is essential for transitioning between different user roles during the configuration process.

## Configuring Privilege Escalation in Ansible

Ansible allows you to replicate the behavior of privilege escalation that you manually perform on the command line.

### Basic Inventory and Playbook Without Privilege Escalation

Consider an inventory file that connects to a lamp server with the admin user. Although it's often a good practice to create a dedicated user for Ansible tasks, this example uses the admin user:

```
# inventory file
lamp-dev1 ansible_host=172.20.1.100 ansible_user=admin


# playbook file
---
- name: Install nginx
  hosts: all
  tasks:
    - yum:
        name: nginx
        state: latest
```

Running the playbook without privilege escalation will fail because the admin user lacks the required permissions.

### Enabling Privilege Escalation with the become Directive

To fix the issue, add the "become" directive to the playbook. This instructs Ansible to perform tasks with elevated privileges, similar to using the sudo command:

```
# inventory file
lamp-dev1 ansible_host=172.20.1.100 ansible_user=admin


# playbook file
---
- name: Install nginx
  become: yes
  hosts: all
  tasks:
    - yum:
        name: nginx
        state: latest
```

With the "become" directive, Ansible runs the tasks with elevated permissions, successfully installing Nginx.

### Using Alternative Privilege Escalation Methods

By default, Ansible uses sudo for privilege escalation. However, if you prefer another method such as "doas" or "pfexec," you can specify it using the "become_method" option:

```
# inventory file
lamp-dev1 ansible_host=172.20.1.100 ansible_user=admin


# playbook file
---
- name: Install nginx
  become: yes
  become_method: doas
  hosts: all
  tasks:
    - yum:
        name: nginx
        state: latest
```

### Targeting a Specific User With become_user

You can also designate a specific target user (e.g., the nginx user) using the "become_user" directive. This tells Ansible to switch to a particular user before executing tasks. You can define these settings in multiple locations:

- In the Ansible configuration file (/etc/ansible/ansible.cfg)
- In the inventory file as host parameters (prefixed with "ansible\_")
- Directly in the playbook
- Via command-line arguments

#### In the Ansible Configuration File

```
# /etc/ansible/ansible.cfg
become              = True
become_method       = doas
become_user         = nginx
```

#### In the Inventory File

```
# inventory file
lamp-dev1 ansible_host=172.20.1.100 ansible_user=admin ansible_become=yes ansible_become_user=nginx
```

#### In the Playbook

```
# playbook file
---
- name: Install nginx
  hosts: all
  tasks:
    - yum:
        name: nginx
        state: latest
```

Keep in mind that any values specified directly in the playbook override those in the inventory file, and command-line parameters have the highest precedence, while settings in the default configuration file have the lowest.

> [!important]
> **Tip**
>
> For complex environments, consider consolidating privilege escalation settings in the Ansible configuration file to simplify management.

### Prompting for a Privilege Escalation Password

Sometimes, escalating privileges may require a password (similar to using sudo). Ansible can prompt you for this password by using the "--ask-become-pass" option on the command line:

```
$ ansible-playbook --become --become-method=doas --become-user=nginx --ask-become-pass
```

When you run the playbook with this option, Ansible will prompt you to enter the appropriate password for privilege escalation.

## Summary

This article covered how to configure privilege escalation in Ansible by:

- Understanding different user roles and privileges.
- Using the "become" directive to execute tasks with elevated permissions.
- Configuring alternative methods with "become_method" and targeting specific users with "become_user."
- Overriding settings in the inventory file, playbook, and command-line.
- Prompting for privilege escalation passwords when needed.

Review the available practice exercises to apply and further solidify your understanding of these concepts. For more detailed information, refer to the [Ansible Documentation](https://docs.ansible.com/).

Happy automating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/f521e68d-4c4a-4fc5-bbd7-d394df07d086/lesson/ee54bc41-4847-484b-8014-e206253caafe)**
>
> Watch video content
