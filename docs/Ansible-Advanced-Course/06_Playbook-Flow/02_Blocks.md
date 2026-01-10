# Blocks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Playbook-Flow/Blocks)

---

## Table of Contents

- Blocks
  - Initial Playbook Example
  - Adding User Escalation and Conditional Execution
  - Grouping Tasks with Blocks
  - Conclusion
  - Watch Video
  - Practice Lab
    - Key Benefits of Using Blocks

---

## Content

Ansible Advanced Course

Playbook Flow

# Blocks

In this lesson, you will learn how to use blocks in Ansible to streamline task configuration, group related tasks, and improve error handling. In our example, we set up an all-in-one server with a MySQL database and an Nginx web server. The MySQL-related tasks run as the "db-user" and the Nginx-related tasks run as the "web-user".

## Initial Playbook Example

Below is a simple playbook that installs and starts both MySQL and Nginx services:

```
- hosts: server1
  tasks:
    - name: Install MySQL
      yum:
        name: mysql-server
        state: present


    - name: Start MySQL Service
      service:
        name: mysql-server
        state: started


    - name: Install Nginx
      yum:
        name: nginx
        state: present


    - name: Start Nginx Service
      service:
        name: nginx
        state: started
```

## Adding User Escalation and Conditional Execution

To tailor this playbook for environments running CentOS, and to enforce different user privileges, we update the tasks by including `become_user` and `when` conditions. In this version, MySQL tasks run as "db-user" and Nginx tasks run as "web-user":

```
- hosts: server1
  tasks:
    - name: Install MySQL
      yum:
        name: mysql-server
        state: present
      become_user: db-user
      when: ansible_facts['distribution'] == 'CentOS'


    - name: Start MySQL Service
      service:
        name: mysql-server
        state: started
      become_user: db-user
      when: ansible_facts['distribution'] == 'CentOS'


    - name: Install Nginx
      yum:
        name: nginx
        state: present
      become_user: web-user
      when: ansible_facts['distribution'] == 'CentOS'


    - name: Start Nginx Service
      service:
        name: nginx
        state: started
      become_user: web-user
      when: ansible_facts['distribution'] == 'CentOS'
```

> [!important]
> **Tip**
>
> Using the `when` condition and `become_user` on each task can quickly become repetitive. Blocks allow you to group tasks and assign shared directives once per group.

## Grouping Tasks with Blocks

Blocks in Ansible help you logically group related tasks. This approach not only reduces redundancy but also improves error handling via rescue and always sections. Consider the following example:

```
- hosts: server1
  tasks:
    - block:
        - name: Install MySQL
          yum:
            name: mysql-server
            state: present


        - name: Start MySQL Service
          service:
            name: mysql-server
            state: started
          become_user: db-user
          when: ansible_facts['distribution'] == 'CentOS'
      rescue:
        - mail:
            to: admin@company.com
            subject: Installation Failed
            body: "DB Install Failed at {{ ansible_failed_task.name }}"
      always:
        - mail:
            to: admin@company.com
            subject: Installation Status
            body: "DB Install Status - {{ ansible_failed_result }}"
```

### Key Benefits of Using Blocks

| Benefit                 | Description                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| Reduced Redundancy      | Common directives can be applied to the entire block.              |
| Organized Task Grouping | Logical grouping improves task readability and maintenance.        |
| Enhanced Error Handling | The rescue and always sections allow for proactive error recovery. |

> [!important]
> **Remember**
>
> When you group tasks within a block, you can define error recovery (rescue) and actions that run regardless of success (always). This ensures a comprehensive overview of your deployment status.

## Conclusion

Blocks are a powerful feature in Ansible that make your playbooks more manageable and resilient. By grouping tasks and employing rescue mechanisms, you can reduce repetition and handle errors effectively. Practice with these concepts by creating your own playbook blocks to solidify your learning.

For further guidance on Ansible best practices, be sure to check out the [Ansible Documentation](https://docs.ansible.com/). Happy automating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/3a981414-5824-4a4b-aee9-099ac8d49e31/lesson/4c0d230b-8af4-4b3e-a092-e15e34081156)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/3a981414-5824-4a4b-aee9-099ac8d49e31/lesson/a1258bf4-8432-43d5-b940-bf4010c3964e)**
>
> Practice lab
