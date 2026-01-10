# Facts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Core-Components/Facts)

---

## Table of Contents

- Facts
  - Basic Playbook Example
  - Displaying Gathered Facts
  - Disabling Fact Gathering
  - Targeting Specific Hosts
  - Conclusion
  - Watch Video
  - Practice Lab
    - Playbook Targeting a Single Host
    - Example Inventory File (/etc/ansible/hosts)

---

## Content

Ansible Advanced Course

Core Components

# Facts

In this article, we explore Ansible facts—vital details automatically collected during playbook execution. When Ansible connects to a target machine, it gathers a wide range of system and network information. This data, including system architecture, OS version, processor details, memory statistics, network interfaces, IP addresses, FQDN, MAC addresses, disks, volumes, mounts, and even date/time settings, is stored in a collective variable called “facts.”

Ansible leverages the setup module to gather these facts. This module runs automatically before any playbook tasks, even if it is not explicitly specified.

> [!important]
> **Tip**
>
> Even if you do not include the setup module in your playbook, facts are gathered by default.

## Basic Playbook Example

Below is a simple playbook that prints a hello message. Notice that besides displaying the message, Ansible first collects facts using the setup module:

```
- name: Print hello message
  hosts: all
  tasks:
    - debug:
        msg: "Hello from Ansible!"
```

When you run this playbook, the output includes two tasks—the fact gathering task and the debug message display. An example output is:

```
PLAY [Print hello message] ***************************************************


TASK [Gathering Facts] *******************************************************
ok: [web2]
ok: [web1]


TASK [debug] *****************************************************************
ok: [web1] => {
    "msg": "Hello from Ansible!"
}
ok: [web2] => {
    "msg": "Hello from Ansible!"
}
```

## Displaying Gathered Facts

All the system details gathered by Ansible are stored in a variable named `ansible_facts`. To display these facts, modify your playbook as shown below:

```
- name: Print all gathered facts
  hosts: all
  tasks:
    - debug:
        var: ansible_facts
```

The resulting output contains a comprehensive list of system information, including IP addresses, system architecture, operating system details, DNS configurations, network interfaces, memory allocation, processor information, and more:

```
PLAY [Print all gathered facts] ********************************************


TASK [Gathering Facts] **************************************************
ok: [web2]
ok: [web1]


TASK [debug] **************************************************************
ok: [web1] => {
    "ansible_facts": {
        "all_ipv4_addresses": [
            "172.20.1.100"
        ],
        "architecture": "x86_64",
        "date_time": {
            "date": "2019-09-07"
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
    }
}
```

This information can be particularly useful when configuring devices, managing logical volumes, or making decisions based on disk space or system resources.

## Disabling Fact Gathering

There are scenarios where fact gathering may be unnecessary or even undesired. You can disable automatic fact gathering by setting the `gather_facts` parameter to `no` in your playbook:

```
- name: Print hello message without gathering facts
  hosts: all
  gather_facts: no
  tasks:
    - debug:
        msg: "Hello from Ansible!"
```

When fact gathering is disabled, only the explicitly defined tasks run. Keep in mind that the Ansible configuration file (typically found at `/etc/ansible/ansible.cfg`) also controls this behavior. The `gathering` setting in the configuration file can be specified as follows:

- **smart**: Gathers facts by default, but avoids re-gathering if the data already exists.
- **implicit**: Automatically gathers facts; you can disable this with `gather_facts: False` in your playbook.
- **explicit**: Does not gather facts by default; you must explicitly set `gather_facts: True` in the playbook when needed.

An example snippet from the configuration file is:

```
/etc/ansible/ansible.cfg
# Plays will gather facts by default, containing system details.
# smart - gather facts by default, but don't re-gather if already gathered.
# implicit - gather facts automatically; turn off with gather_facts: False in the playbook.
# explicit - do not gather facts by default; must specify gather_facts: True in the playbook.
gathering = implicit
```

To illustrate the effect of disabling fact gathering, consider the following playbook. It shows that the `ansible_facts` variable remains empty:

```
- name: Print facts disabled
  hosts: all
  gather_facts: no
  tasks:
    - debug:
        var: ansible_facts
```

And the output will be:

```
PLAY [Print facts disabled] ***********************************************


TASK [debug] ***************************************************************
ok: [web1] => {
    "ansible_facts": {}
}
ok: [web2] => {
    "ansible_facts": {}
}
```

> [!important]
> **Important**
>
> Disabling fact gathering can improve playbook performance if you do not need the collected information, but be cautious when your playbook logic depends on those facts.

## Targeting Specific Hosts

Ansible gathers facts only for hosts that are targeted in the playbook. For instance, if your inventory includes two hosts (`web1` and `web2`) but the playbook targets only `web1`, facts will be gathered only for `web1`. This behavior is demonstrated in the example below:

### Playbook Targeting a Single Host

```
- name: Print facts for a specific host
  hosts: web1
  tasks:
    - debug:
        var: ansible_facts
```

### Example Inventory File (/etc/ansible/hosts)

```
web1
web2
```

If you intend to reference facts from hosts not explicitly targeted by your playbook, ensure that they are included in the host specification.

## Conclusion

Ansible facts are an essential aspect of playbook execution, providing detailed insights into the target systems. They can help tailor your automation tasks based on system-specific data. In the subsequent sections, we will explore deeper into parsing these facts and incorporating them into variables and Jinja2 templates, further enhancing your playbook capabilities.

For further reading, check out the following resources:

- [Ansible Documentation](https://docs.ansible.com/ansible/latest/index.html)
- [Ansible Setup Module](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/setup_module.html)
- [Jinja2 Templating in Ansible](https://docs.ansible.com/ansible/latest/user_guide/playbooks_templating.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/a8141931-256e-4d6a-8534-d83e82ae27c8/lesson/79bc6c0e-5fce-4113-8178-302b96fe6f0e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/a8141931-256e-4d6a-8534-d83e82ae27c8/lesson/5369bff1-154b-49ef-a22b-0371afcce5cc)**
>
> Practice lab
