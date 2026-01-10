# Use conditionals to control play execution - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Playbook-Flow/Use-conditionals-to-control-play-execution)

---

## Table of Contents

- Use conditionals to control play execution
  - Installing NGINX on Multiple Operating Systems
  - Using Conditionals in Loops
  - Using Conditionals with Registered Variables
  - Conclusion
  - Watch Video
  - Practice Lab
    - Example: Installing NGINX on a Debian System
    - Example: Installing NGINX on Debian and Red Hat Systems
    - Example: Combining Conditions
    - Example: Notifying When a Service is Down

---

## Content

Ansible Advanced Course

Playbook Flow

# Use conditionals to control play execution

In this article, we explore how to use conditionals in Ansible to control task execution based on the operating system and other dynamic factors. Instead of maintaining separate playbooks for different OS distributions, you can consolidate them into a single playbook that intelligently executes tasks based on conditions.

## Installing NGINX on Multiple Operating Systems

Different operating systems require different package managers. For example, Debian uses APT while Red Hat uses yum. Traditionally, you might have separate playbooks for each OS, but conditionals allow you to handle both in one file.

### Example: Installing NGINX on a Debian System

Use the following playbook snippet to install NGINX on a Debian system using the apt module:

```
---
- name: Install NGINX
  hosts: all
  tasks:
    - name: Install NGINX on Debian
      apt:
        name: nginx
        state: present
      when: ansible_os_family == "Debian"
```

### Example: Installing NGINX on Debian and Red Hat Systems

Ansible provides the built-in variable `ansible_os_family` that lets you determine the OS flavor. This example demonstrates installing NGINX on both Debian and Red Hat systems in a single playbook:

```
---
- name: Install NGINX
  hosts: all
  tasks:
    - name: Install NGINX on Debian
      apt:
        name: nginx
        state: present
      when: ansible_os_family == "Debian"


    - name: Install NGINX on Redhat
      yum:
        name: nginx
        state: present
      when: ansible_os_family == "RedHat"
```

Notice the use of the double equal sign (`==`) when comparing values of `ansible_os_family`.

> [!important]
> **Combining Conditions**
>
> You can combine conditions using logical operators. Use the `or` operator to execute a task if any condition is true, and `and` if all conditions must be met.

### Example: Combining Conditions

The playbook below shows how to install NGINX on Debian when the OS version is "16.04" and on either Red Hat or SUSE systems:

```
---
- name: Install NGINX
  hosts: all
  tasks:
    - name: Install NGINX on Debian version 16.04
      apt:
        name: nginx
        state: present
      when: ansible_os_family == "Debian" and ansible_distribution_version == "16.04"


    - name: Install NGINX on Redhat or SUSE
      yum:
        name: nginx
        state: present
      when: ansible_os_family == "RedHat" or ansible_os_family == "SUSE"
```

## Using Conditionals in Loops

You can also apply conditionals within loops. Suppose you have an array of packages to install, each with a `required` property. The following playbook installs only the packages marked as required:

```
---
- name: Install Software Packages
  hosts: all
  vars:
    packages:
      - name: nginx
        required: True
      - name: mysql
        required: True
      - name: apache
        required: False
  tasks:
    - name: Install "{{ item.name }}" on Debian
      apt:
        name: "{{ item.name }}"
        state: present
      loop: "{{ packages }}"
      when: item.required == True
```

This condition ensures that even though the loop iterates over all items, only the packages with `required` set to true are installed.

## Using Conditionals with Registered Variables

Often, you may want to perform tasks based on the output of previous commands. For example, you might check if a service is down and send an email alert if it is.

### Example: Notifying When a Service is Down

The playbook below checks the status of the "httpd" service and registers the output. If the service is found to be down, it sends an email notification:

```
- name: Check service status and alert if down
  hosts: localhost
  tasks:
    - name: Check status of httpd service
      command: service httpd status
      register: result


    - name: Send alert email if httpd service is down
      mail:
        to: admin@company.com
        subject: Service Alert
        body: Httpd Service is down
      when: result.stdout.find('down') != -1
```

In this example, the `find()` method searches for the string "down" in `result.stdout`. If found (i.e., the return value is not -1), the email alert is triggered.

## Conclusion

Using conditionals in Ansible playbooks allows you to create versatile tasks that respond to the specific characteristics of your hosts. By leveraging built-in variables like `ansible_os_family` and using logical operators, you can streamline your automation workflows and maintain clean, efficient playbooks.

Continue exploring and practicing these techniques to build robust Ansible automation strategies that adapt dynamically to your infrastructure's needs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/3a981414-5824-4a4b-aee9-099ac8d49e31/lesson/43fa4839-9805-49dc-8657-b378f010313c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/3a981414-5824-4a4b-aee9-099ac8d49e31/lesson/ce029d47-7477-471a-9b9a-8516c498e58c)**
>
> Practice lab
