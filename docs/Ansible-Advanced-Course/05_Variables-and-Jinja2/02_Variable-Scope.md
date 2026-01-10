# Variable Scope - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Variables-and-Jinja2/Variable-Scope)

---

## Table of Contents

- Variable Scope
  - Host-Level Variables
  - Play-Level Variables
  - Global Variables
  - Conclusion
  - Watch Video

---

## Content

Ansible Advanced Course

Variables and Jinja2

# Variable Scope

In this article, we explore the concept of variable scope in Ansible and explain how the location where variables are defined determines their accessibility.

## Host-Level Variables

Consider an inventory file where the DNS server is specified only for the host `web2`:

```
/etc/ansible/hosts
web1 ansible_host=172.20.1.100
web2 ansible_host=172.20.1.101 dns_server=10.5.5.4
web3 ansible_host=172.20.1.102
```

In this example, running a playbook that prints the `dns_server` variable for all hosts results in the variable being defined only for `web2`:

```
---
- name: Print DNS Server
  hosts: all
  tasks:
    - debug:
        msg: "{{ dns_server }}"
```

The output will be:

```
PLAY [Check /etc/hosts file] *********************************************************
TASK [debug] *********************************************************************
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

This demonstrates the host scope: each host only accesses the variables defined specifically for it.

![The image illustrates a network diagram showing variable scopes for hosts, including web servers (web1, web2, web3) and a DNS server with IP 10.5.5.4.](https://kodekloud.com/kk-media/image/upload/v1752869410/notes-assets/images/Ansible-Advanced-Course-Variable-Scope/frame_60.jpg)

When a playbook runs, Ansible associates variables with each host based on inventory and group variable files. By default, the primary scope during playbook execution is the host scope.

## Play-Level Variables

Next, consider a scenario where a variable is defined within a play. In the following playbook, the variable `ntp_server` is defined only in the first play, making it accessible there but not in the second play:

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

The output will be:

```
PLAY [Play1] *********************************************************************
TASK [debug] *********************************************************************
ok: [web1] => {
    "ntp_server": "10.1.1.1"
}


PLAY [Play2] *********************************************************************
TASK [debug] *********************************************************************
ok: [web1] => {
    "ntp_server": "VARIABLE IS NOT DEFINED!"
}
```

This example illustrates the play scope: variables defined in one play do not automatically carry over to subsequent plays.

## Global Variables

Global (or extra) variables are available throughout the entire execution of a playbook. For instance, if you run the playbook with an extra variable like so:

```
$ ansible-playbook playbook.yml --extra-vars "ntp_server=10.1.1.1"
```

And use this playbook:

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

Both plays will have access to the `ntp_server` variable, producing the following output:

```
PLAY [Play1] *****************************************************************
TASK [debug] ******************************************************************
ok: [web1] => {
  "ntp_server": "10.1.1.1"
}


PLAY [Play2] *****************************************************************
TASK [debug] ******************************************************************
ok: [web1] => {
  "ntp_server": "10.1.1.1"
}
```

## Conclusion

Understanding variable scopes—host, play, and global—is essential for managing configurations and troubleshooting within Ansible playbooks. Each scope offers a level of variable visibility that can be strategically utilized to create efficient and modular playbooks.

> [!important]
> **Note**
>
> For further details on variable precedence and advanced usage, consult the [Ansible Documentation](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html).

Thank you for reading, and happy automating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/15e6b588-6cfc-48cd-a773-e365ac3a32ef/lesson/31b7636d-5056-48e5-aedf-b9c554e01e58)**
>
> Watch video content
