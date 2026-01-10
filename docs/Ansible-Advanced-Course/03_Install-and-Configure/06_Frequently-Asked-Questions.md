# Frequently Asked Questions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Install-and-Configure/Frequently-Asked-Questions)

---

## Table of Contents

- Frequently Asked Questions
  - Boolean Values in YAML
  - The YAML Document Separator (---)
  - Using Double Curly Braces and Variable Interpolation
  - Ansible SSH Connection Variables
  - Preparing for a Hands-On Coding Exercise
  - Watch Video
  - Practice Lab

---

## Content

Ansible Advanced Course

Install and Configure

# Frequently Asked Questions

This article addresses common questions related to YAML syntax and Ansible playbooks. Explore our examples to understand the flexibility of YAML Boolean values, the purpose of document start markers, best practices for variable interpolation, and the difference between legacy and updated Ansible SSH connection variables.

---

## Boolean Values in YAML

YAML allows for various representations of Boolean values. In Ansible, options can be set using yes/true/TRUE/True as well as no/false/FALSE/False. All these forms are interpreted the same way. For instance, the following playbook tasks are functionally equivalent:

```
- name: Gather facts using various boolean forms (true)
  gather_facts: yes
  gather_facts: true
  gather_facts: TRUE
  gather_facts: True


- name: Gather facts using various boolean forms (false)
  gather_facts: no
  gather_facts: false
  gather_facts: FALSE
  gather_facts: False
```

> [!important]
> **Note**
>
> Ansible does not differentiate between the different representations of Boolean values. Choose the style that best fits your project conventions.

---

## The YAML Document Separator (---)

The three dashes (---) at the beginning of a YAML file mark the start of a document. While this marker is optional for single-document files, it is especially useful when merging multiple YAML files into one document. Consider the following example:

```
---
- name: Print DNS server
  hosts: all
  tasks:
    - debug:
        msg: Hello
```

For most playbooks, including or omitting the YAML document separator will not affect Ansible’s behavior.

---

## Using Double Curly Braces and Variable Interpolation

Ansible playbooks process variables using Jinja2 templates, and variable interpolation is typically done with double curly braces (e.g., `{{ variable_name }}`). However, there are certain nuances to keep in mind:

- Options that explicitly expect a variable name (such as the `var` parameter of the debug module or within the `when` condition) should be used without double curly braces.
- When combining text with variables or when a variable is the sole content of a field, enclose it in quotes with double curly braces.

Consider the example below:

```
- name: Print DNS server information
  hosts: all
  tasks:
    - debug:
        msg: "{{ dns_server_ip }}"
        var: dns_server_ip
        when: ansible_host != 'web'
        with_items: "{{ db_servers }}"
```

**Key Points:**

- The `msg` field outputs the value of `dns_server_ip` using double curly braces.
- The `var` parameter and the `when` condition expect the variable names directly without interpolation.
- The `with_items` directive uses double curly braces within quotes to indicate a list variable.

> [!important]
> **Important**
>
> When constructing playbooks, always assess the context in which a variable is used. Using or omitting double curly braces incorrectly may lead to unexpected behavior.

---

## Ansible SSH Connection Variables

A common source of confusion is whether to use `ansible_ssh_pass` or `ansible_password` for SSH passwords. Although both work, `ansible_ssh_pass` is considered a legacy option. The updated and recommended variable is `ansible_password`. Here are two inventory file examples:

Legacy approach:

```
/etc/ansible/hosts
web1 ansible_host=172.20.1.100 ansible_ssh_pass=Passw0rd
web2 ansible_host=172.20.1.101 ansible_ssh_pass=Passw0rd
```

Recommended approach:

```
/etc/ansible/hosts
web1 ansible_host=172.20.1.100 ansible_password=Passw0rd
web2 ansible_host=172.20.1.101 ansible_password=Passw0rd
```

> [!important]
> **Tip**
>
> For new playbooks and configurations, always use `ansible_password` to ensure compatibility with current best practices.

---

## Preparing for a Hands-On Coding Exercise

In the upcoming coding exercise, you will work with multiple playbooks to apply these concepts and troubleshoot common YAML and Ansible syntax errors. The objective is to enhance your proficiency in writing correct and efficient YAML-based playbooks.

During the exercise, you will be given playbooks with intentional errors. Your task is to diagnose and resolve these issues. This hands-on troubleshooting will reinforce your understanding of YAML syntax and Ansible best practices while ensuring your work doesn't impact any managed systems.

Happy learning and troubleshooting!

---

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/f521e68d-4c4a-4fc5-bbd7-d394df07d086/lesson/f1739857-7765-49cc-8448-288b0a321f2e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/f521e68d-4c4a-4fc5-bbd7-d394df07d086/lesson/2ab3b99d-dbe2-4f0a-a8ff-18c14a5f11fc)**
>
> Practice lab
