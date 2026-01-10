# Ansible Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learn-Ansible-Basics-Beginners-Course/Ansible-Variables-and-Facts/Ansible-Variables)

---

## Table of Contents

- Ansible Variables
  - Variables in Inventory Files
  - Defining Variables in Playbooks
  - Using Variables for Firewall Configurations
  - Conclusion
  - Watch Video
    - Sample Variable Definitions
    - Jinja2 Templating Illustration

---

## Content

Learn Ansible Basics Beginners Course

Ansible Variables and Facts

# Ansible Variables

In this lesson, we will explore how variables work in Ansible. Variables in Ansible serve the same purpose as in other scripting or programming languages: they store dynamic values that can differ between systems or tasks. For instance, when applying patches with a single playbook to hundreds of servers, variables provide unique information such as hostnames, usernames, or passwords for each server.

## Variables in Inventory Files

Previously, we encountered variables within the inventory file. In the example below, variables define settings such as the Ansible host, connection type, and SSH password:

```
Web1 ansible_host=server1.company.com ansible_connection=ssh ansible_ssh_pass=P@ssW
db ansible_host=server2.company.com ansible_connection=winrm ansible_ssh_pass=P@s
Web2 ansible_host=server3.company.com ansible_connection=ssh ansible_ssh_pass=P@ssW
```

## Defining Variables in Playbooks

Variables can also be declared directly within a playbook. Consider the following playbook that adds a DNS entry to the `/etc/resolv.conf` file. Here, the variable `dns_server` is defined using the `vars` directive:

```
- name: Add DNS server to resolv.conf
  hosts: localhost
  vars:
    dns_server: 10.1.250.10
  tasks:
    - lineinfile:
        path: /etc/resolv.conf
        line: "nameserver 10.1.250.10"
```

However, the above playbook contains a hard-coded IP address. To improve its flexibility, replace the fixed IP with the variable `dns_server` using Jinja2 templating. Simply enclose the variable name in double curly braces:

```
- name: Add DNS server to resolv.conf
  hosts: localhost
  vars:
    dns_server: 10.1.250.10
  tasks:
    - lineinfile:
        path: /etc/resolv.conf
        line: "nameserver {{ dns_server }}"
```

## Using Variables for Firewall Configurations

Consider a playbook for configuring a firewall. The playbook below sets various firewall rules. However, many values are hard-coded, making it difficult to reuse the playbook in different scenarios:

```
- name: Set Firewall Configurations
  hosts: web
  tasks:
    - firewalld:
        service: https
        permanent: true
        state: enabled


    - firewalld:
        port: 8081/tcp
        permanent: true
        state: disabled


    - firewalld:
        port: 161-162/udp
        permanent: true
        state: disabled


    - firewalld:
        source: 192.0.2.0/24
        Zone: internal
        state: enabled
```

A more flexible approach is to move these values into the inventory or a dedicated variables file. When using the inventory file, the playbook refers to variables using Jinja2 templating. Modifying the inventory file alone updates the playbook's behavior without editing the playbook itself. An even more organized strategy is to store host-specific variables in a file such as `web.yml`, ensuring these values are automatically available when the playbook runs.

> [!important]
> **Tip**
>
> When incorporating a variable into a string, enclose it within quotes if the variable appears at the beginning. However, if it appears in the middle of the string, quotes are not strictly necessary.

Below is an updated example of the firewall configuration playbook using variables:

```
- name: Set Firewall Configurations
  hosts: web
  tasks:
    - firewalld:
        service: https
        permanent: true
        state: enabled


    - firewalld:
        port: "{{ http_port }}/tcp"
        permanent: true
        state: disabled


    - firewalld:
        port: "{{ snmp_port }}/udp"
        permanent: true
        state: disabled


    - firewalld:
        source: "{{ inter_ip_range }}/24"
        zone: internal
        state: enabled
```

### Sample Variable Definitions

The following examples demonstrate how variables can be defined in both the inventory file and a dedicated variable file.

**Inventory File Example:**

```
# Sample Inventory File
Web http_port=8081 snmp_port=161-162 inter_ip_range=192.0.2.0
```

**Variable File Example (web.yml):**

```
# Sample variable file - web.yml
http_port: 8081
snmp_port: 161-162
inter_ip_range: 192.0.2.0
```

### Jinja2 Templating Illustration

Here’s a brief illustration of using Jinja2 templating to inject variables:

```
{{
Jinja2 Templating
source: {{ inter_ip_range }}
}}
```

## Conclusion

In this lesson, we learned how to define and use variables in Ansible playbooks and inventory files. By leveraging Jinja2 templating, you can create more flexible, maintainable, and scalable playbooks. Now, let's proceed to the exercises and practice working with variables in various coding challenges.

For more details about Ansible and best practices, be sure to check the [Ansible Documentation](https://docs.ansible.com/ansible/latest/index.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/c85e487f-ca75-448b-b7dd-f72e9519d9b9/lesson/7e54d942-3b14-4171-93f4-9450be50b9ca)**
>
> Watch video content
