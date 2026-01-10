# Registering Variables and Variable Precedence - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learn-Ansible-Basics-Beginners-Course/Ansible-Variables-and-Facts/Registering-Variables-and-Variable-Precedence)

---

## Table of Contents

- Registering Variables and Variable Precedence
  - Understanding Variable Precedence
  - Registering Task Outputs with the register Directive
  - Viewing Task Output Verbosely
  - Watch Video
    - Overriding Variables at Different Levels

---

## Content

Learn Ansible Basics Beginners Course

Ansible Variables and Facts

# Registering Variables and Variable Precedence

In this lesson, we’ll explore how variables work in Ansible, discuss the concept of variable precedence, and demonstrate how to register outputs from tasks. Variables in Ansible allow you to store key configuration data such as DNS server IPs, NTP server IPs, firewall rules, and more. They are integral not only for establishing connectivity with hosts but also for dynamic configuration during playbook execution.

## Understanding Variable Precedence

Consider an inventory file example in which each host is defined with its unique IP via the host variable (ansible_host) and a group variable is assigned to set a common DNS server for all hosts in the group.

```
/etc/ansible/hosts
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

When an Ansible playbook is executed with this inventory, Ansible creates host objects, organizes them into groups, and applies the group-level variables accordingly. In this example, every host in the web_servers group receives the variable dns_server with the value 10.5.5.3.

### Overriding Variables at Different Levels

What happens when the same variable is defined at multiple levels? Suppose you modify the inventory for web2 to override the group variable:

```
/etc/ansible/hosts
web1 ansible_host=172.20.1.100
web2 ansible_host=172.20.1.101 dns_server=10.5.5.4
web3 ansible_host=172.20.1.102


[web_servers]
web1
web2
web3


[web_servers:vars]
dns_server=10.5.5.3
```

In this scenario, the host-level variable defined for web2 takes precedence over the group-level definition. Similarly, if you define a variable directly in the playbook, the playbook-level variable will override both host and group variables:

```
---
- name: Configure DNS Server
  hosts: all
  vars:
    dns_server: 10.5.5.5
  tasks:
    - nsupdate:
        server: '{{ dns_server }}'
```

> [!important]
> **Important**
>
> Variables passed via the command line using the --extra-vars option have the highest precedence. For example, executing the playbook as shown below will override all other definitions.

```
$ ansible-playbook playbook.yml --extra-vars "dns_server=10.5.5.6"
```

For a comprehensive understanding of variable precedence, refer to the [official Ansible documentation](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#variable-precedence-overview).

![The image shows a list of Ansible variable precedence, detailing the order in which variables are applied, with a link to Ansible documentation.](https://kodekloud.com/kk-media/image/upload/v1752881079/notes-assets/images/Learn-Ansible-Basics-Beginners-Course-Registering-Variables-and-Variable-Precedence/frame_190.jpg)

---

## Registering Task Outputs with the register Directive

In many scenarios, you might need to capture the output of a task for later use in your playbook. The register directive is used for this purpose. For instance, to store and later display the contents of the /etc/hosts file, you can use a playbook like this:

```
---
- name: Check /etc/hosts file
  hosts: all
  tasks:
    - shell: cat /etc/hosts
      register: result


    - debug:
        var: result
```

When this play is executed, Ansible captures the output of the shell command in the variable named result. This registered variable contains essential details such as the return code (rc), command output (stdout and stdout_lines), and execution times. Note that the structure of the registered variable may vary depending on the module used.

If you prefer to display only the command output, adjust the debug task as follows:

```
---
- name: Check /etc/hosts file
  hosts: all
  tasks:
    - shell: cat /etc/hosts
      register: result


    - debug:
        var: result.stdout
```

Likewise, to print just the return code of the command, use:

```
---
- name: Check /etc/hosts file
  hosts: all
  tasks:
    - shell: cat /etc/hosts
      register: result


    - debug:
        var: result.rc
```

> [!important]
> **Scope Reminder**
>
> Remember that variables registered with the register directive have host-level scope. This means they are available only for the duration of the playbook execution on the specific host where they were registered.

---

## Viewing Task Output Verbosely

If you want to debug or inspect task outputs without modifying your playbook, run the playbook with the --verbose (-v) flag. For example:

```
$ ansible-playbook -i inventory playbook.yml -v
```

A typical verbose output might look like this:

```
PLAY [localhost] ******************************************************************


TASK [Gathering Facts] ************************************************************
ok: [localhost]


TASK [shell] ***********************************************************************
changed: [localhost] => {
    "changed": true,
    "cmd": "cat /etc/hosts",
    "delta": "0:00:00.282432",
    "end": "2019-09-24 07:37:26.404478",
    "rc": 0,
    "start": "2019-09-24 07:37:26.158046",
    "stderr": "",
    "stderr_lines": [],
    "stdout": "127.0.0.1\tlocalhost\n::1\tlocalhost ip6-localhost ip6-loopback\nfe00::0\tip6-allnodes\nff02::1\tip6-allrouters\n172.20.1.2\t6fde05fbbc0d"
}


PLAY RECAP ***********************************************************************
localhost                  : ok=2    changed=1    unreachable=0    failed=0
```

This verbose mode displays detailed information about each task’s execution, including command outputs and other essential metadata.

---

This lesson provided an overview of registering variables, understanding variable precedence, and using the register directive to capture task outputs in Ansible. For further details and advanced examples, be sure to consult the [Ansible Documentation](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#variable-precedence-overview).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/c85e487f-ca75-448b-b7dd-f72e9519d9b9/lesson/568d6d25-fe53-4359-b446-457f8827d315)**
>
> Watch video content
