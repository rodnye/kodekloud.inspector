# Playbook run options - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Core-Components/Playbook-run-options)

---

## Table of Contents

- Playbook run options
  - Dry Run Option
  - Start at a Specific Task
  - Using Tags to Select or Skip Tasks
  - Watch Video

---

## Content

Ansible Advanced Course

Core Components

# Playbook run options

In this guide, we explore several additional options available when executing an Ansible playbook. These options enable features such as dry runs, starting at a specific task, and running or skipping tasks based on tags, thereby providing more control over your automation process.

## Dry Run Option

Before applying any changes on your managed nodes, you might want to simulate the playbook run to understand what changes would be made. The `--check` option performs this dry run, allowing you to preview the operations without making any modifications.

Consider the following playbook example that installs the httpd package:

```
---
- name: Install httpd
  hosts: all
  tasks:
    - yum:
        name: httpd
        state: installed
```

To execute this playbook in dry-run mode:

```
$ ansible-playbook playbook.yml --check
```

> [!important]
> **Dry Run Tip**
>
> Using `--check` is a valuable way to verify your playbook changes in a safe environment before enforcing them on production systems.

---

## Start at a Specific Task

Sometimes it is beneficial to run a playbook starting from a particular task, bypassing all previous tasks. The `--start-at-task` option lets you specify the task name from which the execution should begin.

For instance, given the following playbook:

```
---
- name: Install httpd
  hosts: all
  tasks:
    - name: Install httpd
      yum:
        name: httpd
        state: installed


    - name: Start httpd service
      service:
        name: httpd
        state: started
```

You can commence execution from the task "Start httpd service" by running:

```
$ ansible-playbook playbook.yml --start-at-task "Start httpd service"
```

## Using Tags to Select or Skip Tasks

Tagging is an effective method to organize your playbook by grouping plays or individual tasks, enabling you to selectively run or skip parts of the playbook. You can tag tasks and plays with specific labels so that when you execute the playbook, only the tagged tasks are considered.

Below is a sample playbook that applies tags to both the play and the individual tasks:

```
---
- name: Install httpd
  tags: [install, start]
  hosts: all
  tasks:
    - yum:
        name: httpd
        state: installed
      tags: install
    - service:
        name: httpd
        state: started
      tags: "start httpd service"
```

To run only tasks tagged with "install", execute:

```
$ ansible-playbook playbook.yml --tags "install"
```

Alternatively, to skip the tasks associated with the "install" tag:

```
$ ansible-playbook playbook.yml --skip-tags "install"
```

> [!important]
> **Tagging Best Practice**
>
> Using tags effectively organizes your playbook, which helps in isolating specific parts of your automation workflow and simplifies debugging.

---

That concludes an overview of the additional options available for running your Ansible playbook. These options enhance your control over execution, enabling safer and more efficient automation. Stay tuned as we explore even more advanced features in our next lesson.

For a deeper dive into Ansible, visit the [Ansible Documentation](https://docs.ansible.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/a8141931-256e-4d6a-8534-d83e82ae27c8/lesson/9e7ffa6a-e449-4e37-ad9f-964255e1ff3a)**
>
> Watch video content
