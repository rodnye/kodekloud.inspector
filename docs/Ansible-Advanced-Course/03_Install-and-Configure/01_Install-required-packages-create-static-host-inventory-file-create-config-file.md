# Install required packages create static host inventory file create config file - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Install-and-Configure/Install-required-packages-create-static-host-inventory-file-create-config-file)

---

## Table of Contents

- Install required packages create static host inventory file create config file
  - Installing Ansible
  - Creating an Inventory File
  - Creating and Overriding the Configuration File
  - Quick Reference
  - Watch Video
  - Practice Lab
    - Using Package Managers
    - Using pip
    - Default Inventory File Example
    - Custom Inventory File Example
    - Default Configuration File Example
    - Custom Configuration File Example

---

## Content

Ansible Advanced Course

Install and Configure

# Install required packages create static host inventory file create config file

In this lesson, you'll learn how to install the Ansible control machine, set up a static host inventory file, and configure Ansible using a custom configuration file. The control node hosts the core Ansible software and stores all your playbooks. Remember that Ansible must be installed on a Linux machine. Although you can run Ansible from a Linux VM on Windows, it cannot be installed directly on Windows. However, Windows machines can be managed as target nodes in your Ansible environment.

> [!important]
> **Note**
>
> Ansible can be installed using various methods. Use Linux package managers (yum, dnf, apt-get) for a quick setup, or use pip for the latest version and greater flexibility.

## Installing Ansible

You have two main options for installing Ansible: using your system’s package manager or the Python package manager pip.

### Using Package Managers

For systems based on different distributions, execute the following commands:

For Red Hat or CentOS:

```
$ sudo yum install ansible
```

For Fedora:

```
$ sudo dnf install ansible
```

For Ubuntu or Debian:

```
$ sudo apt-get install ansible
```

### Using pip

If you already have Python installed, pip allows you to install or upgrade Ansible. On enterprise Linux, you may need to install the extra EPEL-release packages first:

```
$ sudo yum install epel-release
$ sudo yum install python-pip
$ sudo pip install ansible
```

To upgrade Ansible:

```
$ sudo pip install --upgrade ansible
```

To install a specific version, such as 2.4:

```
$ sudo pip install ansible==2.4
```

## Creating an Inventory File

When Ansible is installed via a package manager, a default inventory file is created at `/etc/ansible/hosts`. If no other inventory file is specified, Ansible will use this file by default. However, you can create your own static inventory file anywhere, such as alongside your playbooks.

### Default Inventory File Example

```
/etc/ansible/hosts


# This is the default Ansible 'hosts' file.
#
# Location: /etc/ansible/hosts
#
# - Comments start with the '#' character
# - Blank lines are ignored
# - Groups of hosts are defined using [group_name] headers
# - Hostnames or IP addresses can be specified
## Example 1: Ungrouped hosts (specify before any group headers).


## green.example.com
## blue.example.com
## 192.168.100.1
## 192.168.100.10


## [webservers]
## alpha.example.org
## beta.example.org
## 192.168.1.100
## 192.168.1.110
```

### Custom Inventory File Example

```
/opt/my-playbook/hosts
web1 ansible_host=192.168.1.100
web2 ansible_host=192.168.1.101
```

When executing a playbook, you can specify the path to your custom inventory file with the `-i` option.

## Creating and Overriding the Configuration File

Ansible uses a default configuration file located at `/etc/ansible/ansible.cfg` when installed via a package manager. This file defines the default parameters and behaviors. You can modify these defaults directly or create a custom configuration file within your playbook directory with only the settings you wish to override.

### Default Configuration File Example

```
/etc/ansible/ansible.cfg
[defaults]
inventory       = /etc/ansible/hosts
log_path        = /var/log/ansible.log
library         = /usr/share/my_modules/
roles_path      = /etc/ansible/roles
action_plugins  = /usr/share/ansible/plugins/action
gathering       = implicit
# SSH timeout
timeout         = 10
display_skipped_hosts = True
nocolor         = 1
forks           = 5
```

### Custom Configuration File Example

```
/opt/my-playbook/ansible.cfg
[defaults]
gathering       = explicit
```

> [!important]
> **Important**
>
> When installing Ansible via pip, the default inventory and configuration files are not created automatically. You will need to create these files manually.

That’s it for this lesson. Feel free to explore installing Ansible in the hands-on labs and experiment with different configuration settings. Good luck, and see you in the next lesson!

---

## Quick Reference

| Task                              | Command Example                      |
| --------------------------------- | ------------------------------------ |
| Install Ansible on CentOS/Red Hat | `sudo yum install ansible`           |
| Install Ansible on Fedora         | `sudo dnf install ansible`           |
| Install Ansible on Ubuntu/Debian  | `sudo apt-get install ansible`       |
| Install Ansible with pip          | `sudo pip install ansible`           |
| Upgrade Ansible with pip          | `sudo pip install --upgrade ansible` |
| Install Specific Version (2.4)    | `sudo pip install ansible==2.4`      |

For further details, check out the [Ansible Documentation](https://docs.ansible.com/ansible/latest/index.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/f521e68d-4c4a-4fc5-bbd7-d394df07d086/lesson/e2a722a6-a353-4910-a5a8-8a87723b4559)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/f521e68d-4c4a-4fc5-bbd7-d394df07d086/lesson/36ded66e-f98c-40c3-bfb9-c62509c553e1)**
>
> Practice lab
