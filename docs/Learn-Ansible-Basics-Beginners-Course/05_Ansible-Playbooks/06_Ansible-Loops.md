# Ansible Loops - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learn-Ansible-Basics-Beginners-Course/Ansible-Playbooks/Ansible-Loops)

---

## Table of Contents

- Ansible Loops
  - Basic Looping Example
  - Visualizing Loop Execution
  - Looping Over an Array of Dictionaries
  - The with_items Directive
  - Other Looping Directives and Lookup Plugins
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Learn Ansible Basics Beginners Course

Ansible Playbooks

# Ansible Loops

In this tutorial, you'll learn how to simplify your Ansible playbooks by using loops. Loops help you execute the same task multiple times by iterating over a list of items, making your playbooks more structured, maintainable, and efficient. A common scenario is creating multiple users on target systems without the need to duplicate tasks.

## Basic Looping Example

Consider a traditional playbook that creates individual users by repeating nearly identical tasks:

```
- name: Create users
  hosts: localhost
  tasks:
    - user:
        name: joe
        state: present
    - user:
        name: george
        state: present
    - user:
        name: ravi
        state: present
    - user:
        name: mani
        state: present
    - user:
        name: kiran
        state: present
    - user:
        name: jazlan
        state: present
    - user:
        name: emaan
        state: present
    - user:
        name: mazin
        state: present
    - user:
        name: izaan
        state: present
    - user:
        name: mike
        state: present
    - user:
        name: menaal
        state: present
    - user:
        name: shoeb
        state: present
    - user:
        name: rani
        state: present
```

This approach results in a lot of duplicated code. Instead, using a loop allows the `user` module to be called repeatedly for each value in the list. Here's how you can streamline the playbook:

```
- name: Create users using a loop
  hosts: localhost
  tasks:
    - user:
        name: "{{ item }}"
        state: present
      loop:
        - joe
        - george
        - ravi
        - mani
        - kiran
        - jazlan
        - emaan
        - mazin
        - izaan
        - mike
        - menaal
        - shoeb
        - rani
```

In this improved version, the `loop` directive iterates over the usernames. For each iteration, the current value is assigned to the variable `item`, which you reference using `{{ item }}`. This reduces repetition significantly and enhances readability.

## Visualizing Loop Execution

To help you grasp how loops execute tasks, imagine the loop expanded manually:

```
- name: Create users (expanded loop)
  hosts: localhost
  tasks:
    - user:
        name: "joe"
        state: present
    - user:
        name: "george"
        state: present
    - user:
        name: "ravi"
        state: present
    - user:
        name: "mani"
        state: present
    # ... and so on for each user
```

Each repetition of the task uses a different value from the list in exactly the same manner as the loop.

## Looping Over an Array of Dictionaries

When your requirements include passing multiple parameters (like a username along with a user ID), you can iterate over a list of dictionaries. In each iteration, the dictionary’s keys (e.g., `name` and `uid`) can be accessed for dynamic task creation:

```
- name: Create users with UID assignments
  hosts: localhost
  tasks:
    - user:
        name: "{{ item.name }}"
        state: present
        uid: "{{ item.uid }}"
      loop:
        - name: joe
          uid: 1010
        - name: george
          uid: 1011
        - name: ravi
          uid: 1012
        - name: mani
          uid: 1013
        - name: kiran
          uid: 1014
        - name: jazlan
          uid: 1015
        - name: emaan
          uid: 1016
        - name: mazin
          uid: 1017
        - name: izaaan
          uid: 1018
        - name: mike
          uid: 1019
```

By using dictionaries, each loop iteration can handle intricate data, making your playbook versatile and powerful.

## The with_items Directive

Prior to the introduction of the `loop` directive, Ansible used `with_items` for iterating over lists. Although both methods produce the same result for simple use cases, it is recommended to use the newer `loop` directive to enhance readability and consistency in your playbooks.

```
- name: Create users with with_items
  hosts: localhost
  tasks:
    - user:
        name: "{{ item }}"
        state: present
      with_items:
        - joe
        - george
        - ravi
        - mani
```

> [!important]
> **Note**
>
> For better clarity and future-proof playbooks, prefer using `loop` over `with_items`.

## Other Looping Directives and Lookup Plugins

Beyond basic loops, Ansible offers several looping directives powered by lookup plugins. These plugins allow iteration over various data sources such as files, URLs, and even databases. Below are some examples:

```
- name: Create users using with_items
  hosts: localhost
  tasks:
    - user:
        name: "{{ item }}"
        state: present
      with_items:
        - joe
        - george
        - ravi
        - mani


- name: View configuration files
  hosts: localhost
  tasks:
    - debug:
        var: item
      with_file:
        - "/etc/hosts"
        - "/etc/resolv.conf"
        - "/etc/ntp.conf"


- name: Retrieve data from multiple URLs
  hosts: localhost
  tasks:
    - debug:
        var: item
      with_url:
        - "https://site1.com/get-servers"
        - "https://site2.com/get-servers"
        - "https://site3.com/get-servers"


- name: Check multiple MongoDB instances
  hosts: localhost
  tasks:
    - debug:
        msg: "DB={{ item.database }} PID={{ item.pid }}"
      with_mongodb:
        - database: dev
          connection_string: "mongodb://dev.mongo/"
        - database: prod
          connection_string: "mongodb://prod.mongo/"
```

Here is a quick overview of some common lookup plugins:

| Lookup Plugin                  | Use Case                                   |
| ------------------------------ | ------------------------------------------ |
| with\\\_dict                   | Looping over dictionary key/value pairs    |
| with\\\_etcd                   | Retrieving data from an etcd datastore     |
| with\\\_env                    | Iterating through environment variables    |
| with\\\_filetree               | Looping through a directory tree           |
| with\\\_ini                    | Parsing INI files                          |
| with\\\_inventory\\\_hostnames | Accessing hostnames from an inventory file |
| with\\\_k8s                    | Interacting with Kubernetes objects        |
| with\\\_openshift              | Interacting with OpenShift                 |
| with\\\_password               | Generating or handling passwords           |
| with\\\_sequence               | Creating a sequence of numbers             |
| with\\\_subelements            | Iterating over nested lists                |

These lookup plugins can be considered as custom scripts that enable you to access data from diverse sources, further extending Ansible’s functionality.

## Conclusion

Understanding and utilizing loops in Ansible is critical for creating efficient, scalable, and maintainable playbooks. By leveraging loops, whether simple arrays or complex dictionaries, you can significantly reduce code duplication and enhance the clarity of your automation scripts.

> [!important]
> **Happy Automating!**
>
> Experiment with different looping constructs to find the best fit for your automation needs. For additional guidance, explore the [Ansible Documentation](https://docs.ansible.com/ansible/latest/index.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/f7bcdbad-4792-4e82-beaa-b799773214fd/lesson/29b70a5a-01c8-4f73-8b84-b05cf561aeff)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/f7bcdbad-4792-4e82-beaa-b799773214fd/lesson/22b01097-2e79-4c84-9f8c-4af7e837006c)**
>
> Practice lab
