# Variable Types - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learn-Ansible-Basics-Beginners-Course/Ansible-Variables-and-Facts/Variable-Types)

---

## Table of Contents

- Variable Types
  - String Variables
  - Number Variables
  - Boolean Variables
  - List Variables
  - Dictionary Variables
  - Watch Video

---

## Content

Learn Ansible Basics Beginners Course

Ansible Variables and Facts

# Variable Types

In this article, we explore the various types of variables available in Ansible. Ansible supports several variable types, including String, Number, Boolean, List, and Dictionary. Each type has specific use cases and unique properties that help manage data effectively within your playbooks.

## String Variables

String variables in Ansible represent sequences of characters. They can be defined in a playbook, an inventory file, or even passed via command-line arguments. For example, the snippet below defines a string variable called `username` with the value `"admin"`:

```
username: "admin"
```

## Number Variables

Number variables store integer or floating point values and are often used in mathematical operations. In the example below, `max_connections` is a number variable set to `100`:

```
max_connections: 100
```

## Boolean Variables

Boolean variables in Ansible hold truthy or falsy values and are primarily used in conditional statements. For instance, the following example defines a Boolean variable `debug_mode` set to `true`. For a comprehensive list of acceptable truthy and falsy values, refer to the [Ansible Documentation](https://docs.ansible.com/ansible/latest/index.html).

```
debug_mode: true
```

## List Variables

List variables store an ordered collection of values. Lists in Ansible can contain items of any type and enable referencing the entire list or individual elements using their index with double curly brackets.

Below is an example playbook that demonstrates how to use list variables effectively:

```
- name: Install Packages Playbook
  hosts: your_target_hosts
  vars:
    packages:
      - nginx
      - postgresql
      - git


  tasks:
    - name: Display all packages
      debug:
        var: packages


    - name: Display the first package
      debug:
        msg: "The first package is {{ packages[0] }}"


    - name: Install packages using package manager (apt/yum)
      become: true  # Escalate privileges for package installation if required
      debug:
        msg: "Installing package {{ item }}"
      loop: "{{ packages }}"
```

## Dictionary Variables

Dictionary variables store collections of key-value pairs. Both keys and values can be of any type. In the example below, the variable `user` is a dictionary containing two key-value pairs. You can reference the entire dictionary or access a specific value via its key using double curly brackets.

```
user:
  name: "admin"
  password: "secret"
```

> [!important]
> **Note**
>
> Understanding these variable types is fundamental to building efficient and dynamic automation tasks with Ansible. Use the appropriate type based on your data requirements to enhance the clarity and maintainability of your playbooks.

This article covered the basic variable types in Ansible, including examples for String, Number, Boolean, List, and Dictionary variables. For more detailed information, be sure to check out additional resources in the [Ansible Documentation](https://docs.ansible.com/ansible/latest/index.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/c85e487f-ca75-448b-b7dd-f72e9519d9b9/lesson/b4430755-0371-402e-82b8-651e826dc199)**
>
> Watch video content
