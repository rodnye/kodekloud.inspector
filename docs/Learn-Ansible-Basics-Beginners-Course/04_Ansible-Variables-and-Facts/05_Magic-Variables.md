# Magic Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learn-Ansible-Basics-Beginners-Course/Ansible-Variables-and-Facts/Magic-Variables)

---

## Table of Contents

- Magic Variables
  - Accessing Variables from Other Hosts
  - Using Groups and Group Names
  - Other Common Magic Variables
  - Watch Video

---

## Content

Learn Ansible Basics Beginners Course

Ansible Variables and Facts

# Magic Variables

In this lesson, we explore the concept of magic variables in Ansible. Magic variables enable you to dynamically access information from other hosts, groups, and the play context, making your playbooks more flexible and powerful.

Previously, we discussed variable scopes and noted that each host has its own set of associated variables.

Consider the following example inventory file, which defines a DNS server for the host "web2":

```
/etc/ansible/hosts
web1 ansible_host=172.20.1.100
web2 ansible_host=172.20.1.101 dns_server=10.5.5.4
web3 ansible_host=172.20.1.102
```

When you run an Ansible playbook, a separate subprocess is created for each host. During execution, Ansible performs a variable interpolation phase where it gathers variables from various sources. Since variables defined for one host are not automatically shared with others, the `{{ hostvars["web2"].dns_server }}` variable set for "web2" is not available on "web1" or "web3."

This is where magic variables become essential, allowing a subprocess running on one host to access variables from another host.

## Accessing Variables from Other Hosts

The magic variable `hostvars` lets you retrieve variables from any host defined in your inventory. For instance, to obtain the DNS server IP address specified on "web2" from any host, you can use the following playbook:

```
---
- name: Print DNS server from web2
  hosts: all
  tasks:
    - debug:
        msg: '{{ hostvars["web2"].dns_server }}'
```

When you run this playbook, the output will be similar to:

```
PLAY [Print DNS server from web2] *********************************************


TASK [debug] ******************************************************************
ok: [web1] => {
    "msg": "10.5.5.4"
}
ok: [web2] => {
    "msg": "10.5.5.4"
}
ok: [web3] => {
    "msg": "10.5.5.4"
}
```

> **Note:** When facts are gathered, you can access additional details about other hosts (such as their IP address, architecture, devices, mounts, or processor details) using a similar approach.

The playbook below demonstrates how to access several facts from "web2":

```
---
- name: Print detailed info from web2
  hosts: all
  tasks:
    - debug:
        msg: '{{ hostvars["web2"].dns_server }}'
    - debug:
        msg: '{{ hostvars["web2"].ansible_host }}'
    - debug:
        msg: '{{ hostvars["web2"].ansible_facts.architecture }}'
    - debug:
        msg: '{{ hostvars["web2"].ansible_facts.devices }}'
    - debug:
        msg: '{{ hostvars["web2"].ansible_facts.mounts }}'
    - debug:
        msg: '{{ hostvars["web2"].ansible_facts.processor }}'
```

Both dot notation and bracket notation are effective ways to access these dictionary attributes.

## Using Groups and Group Names

Another valuable magic variable is `groups`, which provides a list of hosts under a specified inventory group. Consider the following inventory configuration:

```
/etc/ansible/hosts
web1 ansible_host=172.20.1.100
web2 ansible_host=172.20.1.101
web3 ansible_host=172.20.1.102


[web_servers]
web1
web2
web3


[americas]
web1
web2


[asia]
web3
```

To display all hosts in the "americas" group, use the following debug command:

```
- debug:
    msg: '{{ groups["americas"] }}'
```

Additionally, the magic variable `group_names` returns all the groups that the current host is a member of. For example, if you run a task on "web1" that prints `group_names`, it will output both "web_servers" and "americas":

```
- debug:
    msg: "{{ group_names }}"
```

## Other Common Magic Variables

Below are some other frequently used magic variables in Ansible:

- `inventory_hostname:`  
  This variable holds the name of the host as specified in the inventory file, which might differ from its fully qualified domain name (FQDN). For example:

  ```
  ---
  - name: Show inventory hostname
    hosts: web1
    tasks:
      - debug:
          msg: "{{ inventory_hostname }}"
  ```

- **Nested Fact Access:**  
  You can retrieve deeply nested facts by combining dictionary accesses. For example:

  ```
  {{ hostvars[host]["ansible_facts"]["eth0"]["ipv4"]["address"] }}
  # Configuration snippet specific to webservers (only if "webserver" is in the host's group names)
  ```

- **Other Play-Related Variables:**
  - `ansible_play_hosts` lists all hosts still active in the current play.
  - `ansible_play_batch` contains the hostnames in the current batch of execution.
  - `ansible_playbook_python` specifies the path to the Python executable used by the Ansible command-line tool.

> **Note:** For more detailed information on magic variables and their usage, please refer to the [official Ansible documentation](https://docs.ansible.com/ansible/latest/reference_appendices/special_variables.html).

This concludes our discussion on magic variables in Ansible. By leveraging these powerful features, you can create more dynamic and efficient playbooks that adapt based on the data available across your entire inventory.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/c85e487f-ca75-448b-b7dd-f72e9519d9b9/lesson/aabf3fd3-1a3f-4bb5-8843-65aed0bf576a)**
>
> Watch video content
