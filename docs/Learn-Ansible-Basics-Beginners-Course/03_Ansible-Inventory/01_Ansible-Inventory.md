# Ansible Inventory - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learn-Ansible-Basics-Beginners-Course/Ansible-Inventory/Ansible-Inventory)

---

## Table of Contents

- Ansible Inventory
  - Watch Video

---

## Content

Learn Ansible Basics Beginners Course

Ansible Inventory

# Ansible Inventory

In this article, we explore how to configure an inventory in Ansible. By managing one or multiple systems simultaneously, Ansible establishes connections to target servers using protocols built into modern infrastructures. For Linux hosts, it relies on SSH, and for Windows systems, it uses PowerShell remoting. This agentless design eliminates the need for installing additional software on target machines—SSH connectivity alone is enough. Unlike many other orchestration tools that require agents, Ansible leverages native protocols to interact with your infrastructure.

Information about these target systems is stored in an inventory file. By default, Ansible uses the inventory file located at `/etc/ansible/hosts` unless you specify a custom file.

An inventory file is written in an INI-like format. It can list servers sequentially or group them by placing the group name in square brackets, followed by the list of servers. For example:

> [!important]
> **Inventory Structure Note**
>
> The example below demonstrates a basic inventory file structure that lists and groups servers without relying on any additional diagrams or images.

Consider the following inventory file which defines groups such as `[inventory]`, `[mail]`, `[db]`, and `[web]`:

```
[inventory]
server1.company.com
server2.company.com


[mail]
server3.company.com
server4.company.com


[db]
server5.company.com
server6.company.com


[web]
server7.company.com
server8.company.com
```

In many practical scenarios, you may want to refer to servers using friendly aliases (e.g., web server or database server). You can set an alias by specifying the `ansible_host` parameter, which defines the FQDN or IP address of the server. Other useful inventory parameters include:

- **ansible_connection:** Defines the connection method Ansible uses (e.g., `ssh` for Linux or `winrm` for Windows). Setting it to `localhost` means no remote connection is required.
- **ansible_port:** Specifies the port for the connection (default is 22 for SSH).
- **ansible_user:** Specifies the username for remote connections (for instance, `root` for Linux by default).
- **ansible_ssh_pass:** Specifies the SSH password. _Note:_ Storing passwords in plain text is strongly discouraged. It is best practice to configure key-based authentication, especially in production environments.

Below is a sample inventory configuration that includes these parameters. This setup works well for introductory lessons on Ansible as it focuses on fundamentals without delving deeply into intricate security configurations:

```
# Sample Inventory File
web       ansible_host=server1.company.com ansible_connection=ssh ansible_user=root
db        ansible_host=server2.company.com ansible_connection=winrm ansible_user=admin
mail      ansible_host=server3.company.com ansible_connection=ssh ansible_ssh_pass=P@#
web2      ansible_host=server4.company.com ansible_connection=winrm
localhost ansible_connection=localhost
```

By starting with this basic inventory configuration, you can concentrate on mastering Ansible fundamentals and later expand your inventory setup as your environment grows more complex.

We encourage you to apply these concepts through practice exercises and explore the rich capabilities of Ansible in managing your infrastructure efficiently.

Happy automating, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/d7059d07-b28b-4e04-a4a4-3638100f5266/lesson/ee852353-de0a-47f9-9795-a9afdb7badb7)**
>
> Watch video content
