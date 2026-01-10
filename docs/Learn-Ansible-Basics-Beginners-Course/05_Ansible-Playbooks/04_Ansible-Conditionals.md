# Ansible Conditionals - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learn-Ansible-Basics-Beginners-Course/Ansible-Playbooks/Ansible-Conditionals)

---

## Table of Contents

- Ansible Conditionals
  - Handling Different Operating Systems
  - Combining Tasks with Conditionals
  - Using Conditionals in Loops
  - Conditionals Based on Task Output
  - Summary Table of Conditionals Use Cases
  - Watch Video

---

## Content

Learn Ansible Basics Beginners Course

Ansible Playbooks

# Ansible Conditionals

In this guide, we explore how to leverage conditionals in Ansible to tailor task execution for different operating systems and specific scenarios. By integrating conditionals into your playbooks, you can maintain a single, streamlined playbook that adjusts its behavior based on the target system.

## Handling Different Operating Systems

Traditionally, you might maintain separate playbooks for different operating systems. For instance, one playbook for Debian-based systems using APT and another for Red Hat-based systems using YUM. Consider the following example for Debian systems:

```
---
- name: Install NGINX
  hosts: all
  tasks:
    - name: Install NGINX on Debian
      apt:
        name: nginx
        state: present
```

And a separate playbook for Red Hat systems:

```
---
- name: Install NGINX
  hosts: all
  tasks:
    - name: Install NGINX on Red Hat
      yum:
        name: nginx
        state: present
```

Maintaining multiple playbooks can be cumbersome, especially when directing tasks toward the correct server. Instead, a unified playbook utilizing conditionals can simplify the process.

## Combining Tasks with Conditionals

Ansible automatically populates the built-in variable `ansible_os_family` with the operating system type (e.g., Debian, RedHat, or SUSE). By using the `when` clause, you can conditionally execute tasks based on this variable. The following single playbook demonstrates this concept:

```
---
- name: Install NGINX on multiple OS families
  hosts: all
  tasks:
    - name: Install NGINX on Debian
      apt:
        name: nginx
        state: present
      when: ansible_os_family == "Debian" and ansible_distribution_version == "16.04"


    - name: Install NGINX on Red Hat or SUSE
      yum:
        name: nginx
        state: present
      when: ansible_os_family == "RedHat" or ansible_os_family == "SUSE"
```

> [!important]
> **Note**
>
> Ensure that the `ansible_os_family` and `ansible_distribution_version` facts are correctly set in your inventory and gathered before executing these tasks.

## Using Conditionals in Loops

In some cases, you may need to install multiple packages based on a specific attribute. For example, if you have a list of packages with a `required` property, you can loop through them and install only those marked as required. See the example below:

```
---
- name: Install software packages on Debian
  hosts: all
  vars:
    packages:
      - name: nginx
        required: true
      - name: mysql
        required: true
      - name: apache
        required: false
  tasks:
    - name: Install "{{ item.name }}" on Debian if required
      apt:
        name: "{{ item.name }}"
        state: present
      loop: "{{ packages }}"
      when: item.required
```

This task iterates over the `packages` list and uses the condition `when: item.required` to confirm that only the necessary packages are installed.

## Conditionals Based on Task Output

Another practical scenario involves triggering subsequent tasks based on the output of a preceding task. For example, you might want to monitor a service and send an email alert if it is found to be down. The following playbook demonstrates this approach:

```
- name: Check service status and send alert if service is down
  hosts: localhost
  tasks:
    - name: Check status of httpd service
      command: service httpd status
      register: result


    - name: Send email alert if httpd service is down
      mail:
        to: admin@company.com
        subject: "Service Alert"
        body: "Httpd Service is down"
      when: result.stdout.find('down') != -1
```

In this playbook, the output of the `service httpd status` command is captured using the `register` keyword. The subsequent task checks if the service status includes the word "down" and sends an alert if the condition is met.

> [!important]
> **Best Practice**
>
> Always validate the output captured from commands before using string methods like `find` to avoid unexpected behavior.

## Summary Table of Conditionals Use Cases

| Use Case                                   | Description                                                        | Example Module/Directive                     |
| ------------------------------------------ | ------------------------------------------------------------------ | -------------------------------------------- |
| OS-Specific Installation                   | Install packages based on the OS family                            | `apt` for Debian, `yum` for Red Hat/SUSE     |
| Conditional Package Installation in Loops  | Iterate over a list and install packages based on a condition      | `loop` with `when` clause                    |
| Conditional Execution Based on Task Output | Trigger follow-up tasks dependent on the result of a previous task | `register`, `when` with string method checks |

By mastering conditionals in Ansible, you can create dynamic and robust playbooks that adapt to different environments and operational requirements. Experiment with these techniques to further optimize your Ansible workflows.

Happy automating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/f7bcdbad-4792-4e82-beaa-b799773214fd/lesson/b274b2a6-14fa-42c4-8682-9e94608f7164)**
>
> Watch video content
