# Magic Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Variables-and-Jinja2/Magic-Variables)

---

## Table of Contents

- Magic Variables
  - Inventory File Example
  - Using the "hostvars" Magic Variable
  - Exploring Other Magic Variables: "groups" and "group_names"
  - Understanding "inventory_hostname"
  - Magic Variables in Jinja2 Templates
    - Inventory Example with Groups

---

## Content

Ansible Advanced Course

Variables and Jinja2

# Magic Variables

In this article, we explore how magic variables in Ansible simplify accessing variables across hosts. Previously, we delved into variable scopes and saw that host variables are defined for each individual host. Now, we will build on that foundation using magic variables.

## Inventory File Example

Consider the following inventory file, where a DNS server is specified for host "web2":

```
/etc/ansible/hosts
web1 ansible_host=172.20.1.100
web2 ansible_host=172.20.1.101 dns_server=10.5.5.4
web3 ansible_host=172.20.1.102
```

When an Ansible playbook starts, it creates separate subprocesses for each host. Before executing tasks on these hosts, Ansible performs variable interpolation by gathering variables from multiple sources and associating them with their respective hosts. As a result, the DNS server IP defined for "web2" is available solely on that host.

> **Tip:** If you need to access the DNS server information from another host, magic variables offer a clean solution.

## Using the "hostvars" Magic Variable

The magic variable `hostvars` enables you to retrieve variables set on one host from another host. For example, to retrieve the DNS server defined on "web2", use the following playbook:

```
---
- name: Print DNS server IP
  hosts: all
  tasks:
    - debug:
        msg: "{{ hostvars['web2'].dns_server }}"
```

```
PLAY [Check /etc/hosts file] **********************************************************************************


TASK [debug] **************************************************************************************************
ok: [web1] => {
    "dns_server": "10.5.5.4"
}
ok: [web2] => {
    "dns_server": "10.5.5.4"
}
ok: [web3] => {
    "dns_server": "10.5.5.4"
}
```

Because each host is defined with an `ansible_host` parameter, gathering facts permits access to detailed information about other hosts. This includes architecture, devices, mounts, processors, and more. Everything available from a host’s facts can be accessed with `hostvars`. For instance:

```
---
- name: Print details from web2
  hosts: all
  tasks:
    - debug:
        msg: "{{ hostvars['web2'].dns_server }}"
    - debug:
        msg: "{{ hostvars['web2'].ansible_host }}"
    - debug:
        msg: "{{ hostvars['web2'].ansible_facts.architecture }}"
    - debug:
        msg: "{{ hostvars['web2'].ansible_facts.devices }}"
    - debug:
        msg: "{{ hostvars['web2'].ansible_facts.mounts }}"
    - debug:
        msg: "{{ hostvars['web2'].ansible_facts.processor }}"
```

Both expression formats yield the same results. You may notice that the official Ansible documentation sometimes presents these expressions with slight variations.

## Exploring Other Magic Variables: "groups" and "group_names"

Another essential magic variable is `groups`. It returns a list of all hosts within a specified group. In contrast, `group_names` returns all the groups that the current host belongs to.

### Inventory Example with Groups

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

To retrieve the list of hosts in the "americas" group, you can use:

```
- debug:
    msg: "{{ groups['americas'] }}"
```

When running a playbook on host "web1", the `group_names` variable returns the groups that host is a member of (for instance, "web_servers" and "americas"):

```
msg: "{{ group_names }}"
```

## Understanding "inventory_hostname"

A related magic variable, `inventory_hostname`, returns the hostname as specified in the inventory file rather than its fully qualified domain name (FQDN). For example:

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

```
msg: "{{ inventory_hostname }}"
```

> **Further Reading:** For more details on magic variables, consult the official Ansible documentation, especially the sections on variable usage in playbooks.

## Magic Variables in Jinja2 Templates

Magic variables can also be extremely useful in Jinja2 templates. Below are a couple of examples:

```
{{ hostvars['test.example.com']['ansible_facts']['distribution'] }}
```

```


# Execute tasks that apply to all app servers.,
,[object Object],[object Object],[object Object],[object Object]
```
