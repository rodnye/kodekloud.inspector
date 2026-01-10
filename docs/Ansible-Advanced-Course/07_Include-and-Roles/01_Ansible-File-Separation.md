# Ansible File Separation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Include-and-Roles/Ansible-File-Separation)

---

## Table of Contents

- Ansible File Separation
  - Watch Video
  - Practice Lab

---

## Content

Ansible Advanced Course

Include and Roles

# Ansible File Separation

In this lesson, you will learn how to separate variables from your Ansible inventory file to simplify maintenance and improve organization. When dealing with numerous inventory items, embedding variables within the inventory file itself can quickly become cumbersome. A more efficient approach is to define host-specific variables in dedicated YAML files.

For each server (for example, web1, web2, and web3), create a YAML file with the same name as the host inside the **host_vars** directory. Then, move the corresponding variables from the inventory file into these new files. When transferring the variables, make sure to replace the equal sign (`=`) with a colon followed by a space (`:` ) to adhere to proper YAML syntax. Ansible automatically processes these files during playbook execution, matching them with the corresponding host based on the file name.

Below is an example of an inventory file entry before variables are separated:

```
[web_servers]
web1 ansible_host=172.20.1.100 dns_server=10.1.1.5
web2 ansible_host=172.20.1.101 dns_server=10.1.1.5
web3 ansible_host=172.20.1.102 dns_server=10.1.1.5
```

Since the DNS server detail is common across all the servers in the group, you can also move this variable into a group variable file. Group variables should reside in the **group_vars** directory and the file must be named after the group. The recommended folder structure is as follows:

- For host variables, use a folder named **host_vars**.
- For group variables, use a folder named **group_vars**.

It is a best practice to place the inventory file along with the **host_vars** and **group_vars** directories inside a single **inventory** directory to keep all related information centralized.

---

> [!important]
> **Note**
>
> If your variable file is not located in one of Ansible’s default directories, you can still load external variables by using the `include_vars` module within your playbook.

Consider a scenario where you store a set of variables in a central repository (for example, in `/opt/apps/common-data/email`) that is shared across multiple playbooks. Below is a simplified file structure:

```
# inventory file (e.g., inventory/hosts)
[web_servers]
web1
web2
web3
```

And the corresponding variable files:

```
# host_vars/web1.yml
ansible_host: 172.20.1.100
```

```
# host_vars/web2.yml
ansible_host: 172.20.1.101
```

```
# host_vars/web3.yml
ansible_host: 172.20.1.103
```

```
# group_vars/web_servers.yml
dns_server: 10.1.1.5
```

To include variables stored outside the default directories, add a task in your playbook that utilizes the `include_vars` module. For example, to load email-related variables before executing a mail task, your playbook might include the following:

```
- name: Deploy Web & DB Server
  hosts: web-db-server
  tasks:
    - include_vars:
        file: /opt/apps/common-data/email/info.yml
        name: email_data


    - mail:
        to: "{{ email_data.admin_email }}"
        subject: Service Alert
        body: Httpd Service is down
```

The content of the included file (`/opt/apps/common-data/email/info.yml`) should be structured as follows:

```
admin_email: admin@company.com
```

To view the processed Ansible inventory—including all host and group variables along with the applied variable precedence—use the `ansible-inventory` command with the `-y` parameter. This outputs the final inventory in YAML format. For example:

```
$ ansible-inventory -i inventory/ -y
all:
  children:
    ungrouped: {}
    web_servers:
      hosts:
        web1:
          ansible_host: 172.20.1.100
          ansible_ssh_pass: Passw0rd
          dns_server: 8.8.8.8
          size: big
        web2:
          ansible_host: 172.20.1.101
          ansible_ssh_pass: Passw0rd
          dns_server: 8.8.8.8
          size: small
```

Remember, this output is the result of Ansible's post-processing of your original inventory data and displays the final variable values that Ansible uses after applying variable precedence.

---

In some cases, you may wish to reuse task definitions for installing and configuring services across different playbooks, such as a single playbook that can handle both database and web server configurations. To achieve this modularity, divide your tasks into separate files (for example, **tasks/db.yml** and **tasks/web.yml**) and incorporate them into your playbook using the `include_tasks` directive. The following example demonstrates how to structure such a playbook:

```
- name: Deploy Web & DB Server
  hosts: web-db-server
  tasks:
    - include_tasks: tasks/db.yml
    - include_tasks: tasks/web.yml
```

This approach allows you to easily create new playbooks that include only the tasks necessary for database configuration, web server setup, or both.

> [!important]
> **Tip**
>
> Reinforce your understanding of `include_tasks` and variable management by experimenting with different inventory structures and playbook configurations. This modular approach enhances maintainability and scalability.

By following these practices, you can streamline your Ansible configurations and make your deployment processes more efficient. Experiment with using separate variable files and task includes to improve your ongoing projects.

Happy automating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/83cb0b64-331d-4d78-b7ae-467159165549/lesson/59e57457-9ec7-4206-b494-9df4607011ae)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/83cb0b64-331d-4d78-b7ae-467159165549/lesson/f3bc4809-817c-4d90-afff-9d17c536eaad)**
>
> Practice lab
