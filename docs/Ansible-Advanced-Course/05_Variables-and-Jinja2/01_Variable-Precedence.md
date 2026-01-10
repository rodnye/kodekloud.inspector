# Variable Precedence - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Variables-and-Jinja2/Variable-Precedence)

---

## Table of Contents

- Variable Precedence
  - Host Versus Group Variables
  - Variables Defined in Playbooks
  - Extra Variables from the Command Line
  - Overview of Precedence
  - Watch Video

---

## Content

Ansible Advanced Course

Variables and Jinja2

# Variable Precedence

This article explains how variables work in Ansible and outlines the concept of variable precedence—i.e., which value Ansible uses when the same variable is defined in multiple locations.

Ansible variables store information that might differ between hosts. They serve two main purposes:

• Configuring connectivity for Ansible itself.  
• Defining settings for your playbooks (for example, configuring DNS server IPs, NTP server IPs, firewall rules, etc.).

> [!important]
> **Note**
>
> Ansible variables are assigned to host objects during playbook execution. Initially, group variables are associated with each host, and then any host-specific variables override these values.

Below is an example inventory file that defines host variables for each host and includes a group variable for the DNS server:

```
# /etc/ansible/hosts
web1 ansible_host=172.20.1.100
web2 ansible_host=172.20.1.101
web3 ansible_host=172.20.1.102


[web_servers]
web1
web2
web3


[web_servers:vars]
dns_server=10.5.5.3
```

## Host Versus Group Variables

When the same variable is defined both on the host level and in the group, the host-specific variable takes precedence. Consider modifying the inventory for "web2" as follows:

```
# /etc/ansible/hosts
web1 ansible_host=172.20.1.100
web2 ansible_host=172.20.1.101  dns_server=10.5.5.4
web3 ansible_host=172.20.1.102


[web_servers]
web1
web2
web3


[web_servers:vars]
dns_server=10.5.5.3
```

In this scenario, Ansible first associates the group variable (dns_server=10.5.5.3) with all hosts. However, since "web2" is explicitly defined with its own variable (dns_server=10.5.5.4), that value is used during playbook execution.

## Variables Defined in Playbooks

Variables can also be declared directly within a playbook. Defining variables at the play level overrides both host and group inventory variables. For example, consider the following playbook that configures the DNS server using a play-level variable:

```
---
- name: Configure DNS Server
  hosts: all
  vars:
    dns_server: 10.5.5.5
  tasks:
    - name: Update DNS settings
      nsupdate:
        server: '{{ dns_server }}'
```

Here, the playbook variable (dns_server: 10.5.5.5) overrides the inventory-defined values during playbook runtime.

## Extra Variables from the Command Line

Extra variables passed via the command line have the highest precedence in Ansible. For instance, running the following command:

```
$ ansible-playbook playbook.yml --extra-vars "dns_server=10.5.5.6"
```

ensures that the value provided (dns_server=10.5.5.6) supersedes any values defined in the inventory or playbook. The command below demonstrates a similar override with a different value:

```
$ ansible-playbook playbook.yml --extra-vars "dns_server=10.5.6"
```

In both cases, the extra variable takes precedence over all others.

## Overview of Precedence

Ansible applies variables following a defined hierarchical order. The order starts from the lowest precedence (role default variables), then proceeds through inventory and playbook variables, and finally applies extra vars provided directly on the command line (the highest precedence). This structure guarantees that more specific variables override more general ones.

![The image shows a list of Ansible variable precedence, detailing the order in which variables are applied, from role defaults to extra vars.](https://kodekloud.com/kk-media/image/upload/v1752869409/notes-assets/images/Ansible-Advanced-Course-Variable-Precedence/frame_190.jpg)

That concludes our discussion on variable precedence in Ansible. In the next article, we will explore additional methods to manage and override variables effectively in your Ansible deployments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/15e6b588-6cfc-48cd-a773-e365ac3a32ef/lesson/dd9f5da1-334f-4a98-b268-7fc6d22cad8b)**
>
> Watch video content
