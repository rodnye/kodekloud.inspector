# Ansible Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learn-Ansible-Basics-Beginners-Course/Introduction/Ansible-Introduction)

---

## Table of Contents

- Ansible Introduction
  - Example 1: Adding a User
  - Example 2: Enhanced Script with Validation and Targeted Execution
  - Real-World Use Cases
  - Watch Video
    - Traditional Shell Script
    - Equivalent Ansible Playbook
    - Improved Shell Script with User Existence Check
    - Ansible Playbook Targeting Specific Servers

---

## Content

Learn Ansible Basics Beginners Course

Introduction

# Ansible Introduction

In this article, we introduce Ansible—a tool that revolutionizes IT automation by reducing repetitive manual tasks. Whether you're a systems engineer, IT administrator, or any IT specialist, you likely encounter tasks like provisioning new hosts, configuring systems, patching dozens of servers, performing migrations, deploying applications, or executing security and compliance audits. Traditionally, these operations required complex custom scripts, significant coding expertise, and time-consuming maintenance.

Ansible streamlines IT automation with an easy-to-learn framework that replaces lengthy scripts with concise playbooks. Below, we compare traditional shell scripting with simple Ansible playbooks to illustrate how you can automate tasks effortlessly.

---

## Example 1: Adding a User

### Traditional Shell Script

Consider this shell script that adds a user to a Linux system:

```
#!/bin/bash
# Script to add a user to a Linux system
if [ "$(id -u)" -eq 0 ]; then
    username="johndoe"
    read -s -p "Enter password: " password
    useradd "$username" >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "User has been added"
    else
        echo "Failed to add the user!"
    fi
else
    echo "This script must be run as root."
fi
```

### Equivalent Ansible Playbook

Ansible simplifies the process dramatically. The playbook below performs the same operation on the localhost with just a few lines:

```
- hosts: localhost
  tasks:
    - name: Add the user johndoe
      user:
        name: johndoe
```

---

## Example 2: Enhanced Script with Validation and Targeted Execution

### Improved Shell Script with User Existence Check

This enhanced shell script checks if the user already exists before attempting to add them:

```
#!/bin/bash
# Script to add a user to a Linux system with validation
if [ "$(id -u)" -eq 0 ]; then
    username="johndoe"
    read -s -p "Enter password: " password
    grep -q "^$username:" /etc/passwd
    if [ $? -ne 0 ]; then
        useradd "$username"
        echo "$password" | passwd --stdin "$username"
        echo "User has been added"
    else
        echo "User '$username' already exists!"
    fi
else
    echo "This script must be run as root."
fi
```

### Ansible Playbook Targeting Specific Servers

Changing the execution target in Ansible is as simple as modifying one line. For instance, to perform the same task on a specific group of web servers in a disaster recovery environment, use this playbook:

```
- hosts: all_my_web_servers_in_DR
  tasks:
    - name: Add the user johndoe
      user:
        name: johndoe
```

> [!important]
> **Note**
>
> Using Ansible, you can easily shift focus from a single host to multiple servers by updating the target hosts. This provides flexibility in managing both local and remote environments.

---

## Real-World Use Cases

Imagine needing to restart several hosts in a specific order. For instance, you may need to shut down your web servers first, followed by database servers, then reboot and restart them in reverse order. With Ansible, creating such a playbook is straightforward and can be executed whenever necessary.

Another common scenario involves provisioning a complex infrastructure that spans both public and private clouds, managing hundreds of virtual machines. Ansible can provision VMs on platforms like Amazon AWS and private environments such as VMware. It then configures applications, updates configuration files, installs necessary software packages, and modifies firewall rules. Moreover, its extensive library of built-in modules facilitates integration with other systems—such as pulling data from your CMDB or triggering automated workflows via ServiceNow.

![The image illustrates a complex use case involving ServiceNow, databases, cloud, and multiple servers, with a person presenting the diagram.](https://kodekloud.com/kk-media/image/upload/v1752881106/notes-assets/images/Learn-Ansible-Basics-Beginners-Course-Ansible-Introduction/frame_190.jpg)

Explore the extensive guides and hundreds of playbook examples available in the [Ansible Documentation](https://docs.ansible.com) to deepen your understanding and broaden your automation skills.

![The image shows a webpage of Ansible Documentation with a person standing in front, wearing a navy and orange sweater.](https://kodekloud.com/kk-media/image/upload/v1752881108/notes-assets/images/Learn-Ansible-Basics-Beginners-Course-Ansible-Introduction/frame_200.jpg)

---

This article provided an overview of Ansible, showcasing its benefits and advantages over traditional scripting. In the upcoming lessons, we will guide you through setting up an Ansible hands-on lab environment and delve into more advanced playbook configurations. Stay tuned for the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/1b3f113a-1512-4858-a794-1b74c3541725/lesson/1d3be0a0-a3f5-489c-98c3-8f04b428ecbe)**
>
> Watch video content
