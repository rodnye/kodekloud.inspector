# Variable Scoping - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learn-Ansible-Basics-Beginners-Course/Ansible-Variables-and-Facts/Variable-Scoping)

---

## Table of Contents

- Variable Scoping
  - Host Scope
  - Play Scope
  - Global Variables
  - Summary of Variable Scopes
  - Watch Video

---

## Content

Learn Ansible Basics Beginners Course

Ansible Variables and Facts

# Variable Scoping

Understanding variable scope in Ansible is essential for effective configuration management. In this guide, we explore three primary scopes: Host Scope, Play Scope, and Global Variables. Mastering these concepts will help you write cleaner, more modular playbooks and troubleshoot variable-related issues more efficiently.

## Host Scope

Host-specific variables are defined directly in the inventory file or host-specific configurations. These variables are available only when tasks are executed on that host.

Consider the following inventory file where the `dns_server` variable is specified only for host `web2`:

```
/etc/ansible/hosts
web1 ansible_host=172.20.1.100
web2 ansible_host=172.20.1.101 dns_server=10.5.5.4
web3 ansible_host=172.20.1.102
```

When executing a playbook that prints the `dns_server` variable for all hosts:

```
---
- name: Print DNS server
  hosts: all
  tasks:
    - debug:
        msg: '{{ dns_server }}'
```

The play output is as follows:

```
PLAY [Check /etc/ansible/hosts file] ***********************************************************************


TASK [debug] ****************************************************************************************
ok: [web1] => {
    "dns_server": "VARIABLE IS NOT DEFINED!"
}
ok: [web2] => {
    "dns_server": "10.5.5.4"
}
ok: [web3] => {
    "dns_server": "VARIABLE IS NOT DEFINED!"
}
```

> [!important]
> **Note**
>
> In this case, the `dns_server` variable is only defined for `web2`, so it is accessible solely in the host scope for that specific host.

## Play Scope

Variables defined within a play are confined to that play's context. They do not persist into subsequent plays unless declared globally. This helps maintain clear boundaries for variable lifecycles within your playbook.

Consider the following playbook that uses the variable `ntp_server` in one play but not in another:

```
---
- name: Play1
  hosts: web1
  vars:
    ntp_server: 10.1.1.1
  tasks:
    - debug:
        var: ntp_server


- name: Play2
  hosts: web1
  tasks:
    - debug:
        var: ntp_server
```

The output for this playbook is:

```
PLAY [Play1] *********************************************************************


TASK [debug] **********************************************************************
ok: [web1] => {
    "ntp_server": "10.1.1.1"
}


PLAY [Play2] *********************************************************************


TASK [debug] **********************************************************************
ok: [web1] => {
    "ntp_server": "VARIABLE IS NOT DEFINED!"
}
```

> [!important]
> **Note**
>
> Variables set within a play are only available in that play. In the example above, `ntp_server` is defined in the first play and is not accessible in the second play.

## Global Variables

Global variables are accessible across all plays and tasks within a playbook. A common method to define global variables is by passing them as extra variables using the command line.

Consider a playbook without explicit variable definition in any play:

```
---
- name: Play1
  hosts: web1
  tasks:
    - debug:
        var: ntp_server


- name: Play2
  hosts: web1
  tasks:
    - debug:
        var: ntp_server
```

When you run the playbook with the following command, the `ntp_server` variable is set globally:

```
$ ansible-playbook playbook.yml --extra-vars "ntp_server=10.1.1.1"
```

The output will show that `ntp_server` is available in both plays:

```
PLAY [Play1] ********************************************************************


TASK [debug] *********************************************************************
ok: [web1] => {
    "ntp_server": "10.1.1.1"
}


PLAY [Play2] ********************************************************************


TASK [debug] *********************************************************************
ok: [web1] => {
    "ntp_server": "10.1.1.1"
}
```

> [!important]
> **Note**
>
> Passing `ntp_server` as an extra variable sets it as a global variable, making it accessible to every play and task in the playbook.

## Summary of Variable Scopes

| Scope Type       | Description                                                                                    | Example Usage                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Host Scope       | Variables defined for a specific host are available only when tasks are executed on that host. | Inventory file entries like `dns_server=10.5.5.4` on `web2`        |
| Play Scope       | Variables set within a play are confined to that play and do not persist to subsequent plays.  | Defined with `vars:` in a play block                               |
| Global Variables | Variables passed via command-line extra-vars or defined globally, accessible across all plays. | `ansible-playbook playbook.yml --extra-vars "ntp_server=10.1.1.1"` |

Having a solid grasp of these scopes will not only help in writing efficient and modular playbooks but also in troubleshooting and managing Ansible configurations effectively.

Thank you for reading this article. Happy automating, and see you in the next guide!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/c85e487f-ca75-448b-b7dd-f72e9519d9b9/lesson/c7708e18-56b6-4948-ba73-76ce8ceb6c45)**
>
> Watch video content
