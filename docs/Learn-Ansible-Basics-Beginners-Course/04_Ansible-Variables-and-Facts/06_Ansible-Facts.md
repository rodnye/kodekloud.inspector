# Ansible Facts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learn-Ansible-Basics-Beginners-Course/Ansible-Variables-and-Facts/Ansible-Facts)

---

## Table of Contents

- Ansible Facts
  - Simple Playbook Example
  - Displaying Ansible Facts
  - Disabling Fact Gathering
  - Targeted Fact Gathering
  - Watch Video
  - Practice Lab

---

## Content

Learn Ansible Basics Beginners Course

Ansible Variables and Facts

# Ansible Facts

In this lesson, we explore how Ansible collects system information, known as Facts, during playbook execution. When a playbook runs, Ansible connects to each target machine and automatically gathers essential details such as:

- **Architecture** (e.g., 32-bit vs 64-bit)
- **Operating system version**
- **Processor and memory specifications**
- **Network interfaces, IP addresses, FQDN, and MAC addresses**
- **Disk details**

This comprehensive data collection is managed by the setup module, which is executed automatically at the beginning of every playbook unless explicitly disabled.

> [!important]
> **Note**
>
> The collected data is stored in the variable `ansible_facts`, which can be used in subsequent tasks to tailor configurations and decisions based on system characteristics.

## Simple Playbook Example

Consider the following playbook that prints a simple hello message. Even though only the debug task is specified in the playbook, Ansible first gathers facts from each host:

```
---
- name: Print hello message
  hosts: all
  tasks:
    - debug:
        msg: Hello from Ansible!
```

When you run this playbook, the output includes two key tasks: one that gathers facts and another that prints the debug message.

```
PLAY [Print hello message] *******************************


TASK [Gathering Facts] ***********************************
ok: [web2]
ok: [web1]


TASK [debug] *********************************************
ok: [web1] => {
    "msg": "Hello from Ansible!"
}
ok: [web2] => {
    "msg": "Hello from Ansible!"
}
```

## Displaying Ansible Facts

To gain deeper insights, you can modify your playbook to print the `ansible_facts` variable instead of a simple message. This approach allows you to view extensive system details for each host:

```
---
- name: Print Ansible Facts
  hosts: all
  tasks:
    - debug:
        var: ansible_facts
```

Running this playbook produces output similar to the example below, featuring details such as IP configurations, system architecture, operating system information, DNS settings, and memory statistics:

```
PLAY [Reset nodes to previous state] ***********************************************************************


TASK [Gathering Facts] ***************************************************************************************
ok: [web2]
ok: [web1]


TASK [debug] ************************************************************************************************
ok: [web1] =>
  "ansible_facts": {
    "all_ipv4_addresses": [
      "172.20.1.100"
    ],
    "architecture": "x86_64",
    "date_time": {
      "date": "2019-09-07",
    },
    "distribution": "Ubuntu",
    "distribution_file_variety": "Debian",
    "distribution_major_version": "16",
    "distribution_release": "xenial",
    "distribution_version": "16.04",
    "dns": {
      "nameservers": [
        "127.0.0.11"
      ]
    },
    "fqdn": "web1",
    "hostname": "web1",
    "interfaces": [
      "lo",
      "eth0"
    ],
    "machine": "x86_64",
    "memfree_mb": 72,
    "memory_mb": {
      "real": {
        "free": 72,
        "total": 985,
        "used": 913
      }
    }
  },
```

The rich details provided by `ansible_facts` can be invaluable when configuring systems dynamically—whether you are setting up logical volumes, managing network settings, or optimizing system performance based on the hardware characteristics of your servers.

## Disabling Fact Gathering

If your playbook does not require this additional overhead of gathering facts, you can disable it by setting the `gather_facts` option to `no`:

```
---
- name: Print hello message without gathering facts
  hosts: all
  gather_facts: no
  tasks:
    - debug:
        var: ansible_facts
```

With `gather_facts: no`, Ansible skips the facts collection phase and executes only the specified tasks. Note that fact-gathering behavior can be further controlled by the setting in the Ansible configuration file (typically located at `/etc/ansible/ansible.cfg`):

```
# /etc/ansible/ansible.cfg
# By default, plays will gather facts automatically. The settings include:
# smart     - Gather by default, but do not regather if already gathered
# implicit  - Gather by default, turn off with gather_facts: False
# explicit  - Do not gather by default; must enable with gather_facts: True
gathering = implicit
```

If both the playbook and configuration file specify fact-gathering options, the playbook setting takes precedence.

## Targeted Fact Gathering

Remember that Ansible collects facts only for the hosts included in the playbook. For example, if your inventory has two hosts (web1 and web2) but you run the playbook only on web1, facts will be gathered solely for web1:

```
---
- name: Print Ansible Facts for web1 only
  hosts: web1
  tasks:
    - debug:
        var: ansible_facts
```

This behavior might result in missing facts for hosts not targeted by the playbook.

Later in this lesson, we will delve into how to parse and utilize these facts in conjunction with variables and Jinja2 templates to create dynamic and adaptable playbook configurations.

---

By understanding and leveraging Ansible Facts, you can create more efficient, responsive, and tailored automation scripts that adapt based on the actual state and configuration of your systems.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/c85e487f-ca75-448b-b7dd-f72e9519d9b9/lesson/f8cb5a3e-d4c8-4412-ba10-a332b7ea6b66)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/c85e487f-ca75-448b-b7dd-f72e9519d9b9/lesson/a34818eb-2eea-44c9-847a-86d1db6ca208)**
>
> Practice lab
