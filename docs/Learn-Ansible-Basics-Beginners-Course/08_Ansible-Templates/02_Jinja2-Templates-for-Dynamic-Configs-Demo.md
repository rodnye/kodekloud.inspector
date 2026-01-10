# Jinja2 Templates for Dynamic Configs Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learn-Ansible-Basics-Beginners-Course/Ansible-Templates/Jinja2-Templates-for-Dynamic-Configs-Demo)

---

## Table of Contents

- Jinja2 Templates for Dynamic Configs Demo
  - File-Related Filters
  - Variable Interpolation in Playbooks
  - Deploying a Web Server
  - Dynamic Content with Jinja2 Templates
  - Dynamic Configuration Files
    - Inventory File (/etc/ansible/hosts)
    - Playbook Using the nsupdate Module
    - Initial Setup with Static Files
    - Inventory File (remains unchanged)
    - Updated Playbook (playbook.yml) Using the Template Module
    - Jinja2 Template File (index.html.j2)
    - Nginx Configuration Template
    - Redis Configuration Template with Default Filters
    - Generating Configurations with Jinja2 Loops
      - Inventory File (/etc/ansible/hosts)
      - Playbook (playbook.yml) Using the Copy Module
      - Local HTML File (index.html)
      - Template for resolv.conf (resolv.conf.j2)

---

## Content

Learn Ansible Basics Beginners Course

Ansible Templates

# Jinja2 Templates for Dynamic Configs Demo

In this lesson, we explore how Ansible extends Jinja2 by incorporating filters tailored specifically for infrastructure management. While the base Jinja2 templating engine offers many built-in filters (see the [Jinja2 website](https://jinja.palletsprojects.com/) for more details), Ansible enhances this functionality with additional filters for tasks such as converting between YAML and JSON, manipulating file paths across Linux and Windows systems, managing passwords, and processing regular expressions.

![The image lists various Ansible filters, including functions like `abs()`, `capitalize()`, `join()`, `to_json()`, and `combine()`, used for data manipulation in Ansible.](https://kodekloud.com/kk-media/image/upload/v1752881077/notes-assets/images/Learn-Ansible-Basics-Beginners-Course-Jinja2-Templates-for-Dynamic-Configs-Demo/frame_40.jpg)

## File-Related Filters

Let's begin by reviewing some file-related filters. For example, to extract the file name from a Linux file path such as `/etc/hosts`, you can use the `basename` filter. This returns `hosts`. However, note that this filter will not correctly handle Windows file paths due to the use of backslashes. In that case, the `win_basename` filter is required.

Similarly, if you need to split a Windows path into its drive letter and remaining path, apply the `win_splitdrive` filter. This filter returns an array—where the first element is the drive letter and the second element is the rest of the path. You can chain it with the `first` filter to obtain only the drive letter if needed.

```
{{ "/etc/hosts" | basename }}
{{ "c:\\windows\\hosts" | win_basename }}
{{ "c:\\windows\\hosts" | win_splitdrive }}
{{ "c:\\windows\\hosts" | win_splitdrive | first }}
```

## Variable Interpolation in Playbooks

In a standard Ansible playbook, Jinja2 templates undergo variable interpolation before task execution. Consider the following examples for an inventory file and a playbook snippet that uses the `nsupdate` module.

### Inventory File (/etc/ansible/hosts)

```
web1 ansible_host=172.20.1.100 dns_server=10.5.5.4
web2 ansible_host=172.20.1.101 dns_server=10.5.5.4
web3 ansible_host=172.20.1.102 dns_server=10.5.5.4
```

### Playbook Using the nsupdate Module

```
---
- name: Update DNS server
  hosts: all
  tasks:
    - nsupdate:
        server: '{{ dns_server }}'
```

## Deploying a Web Server

Consider a scenario where you need to deploy a web server by copying a local `index.html` file to each web server's default directory using Ansible's `copy` module. You can start with a static inventory, playbook, and HTML file, then enhance the solution with a templated approach.

### Initial Setup with Static Files

#### Inventory File (/etc/ansible/hosts)

```
[web_servers]
web1 ansible_host=172.20.1.100
web2 ansible_host=172.20.1.101
web3 ansible_host=172.20.1.102
```

#### Playbook (playbook.yml) Using the Copy Module

```
- hosts: web_servers
  tasks:
    - name: Copy index.html to remote servers
      copy:
        src: index.html
        dest: /var/www/nginx-default/index.html
```

#### Local HTML File (index.html)

```
<!DOCTYPE html>
<html>
<body>
This is a Web Server
</body>
</html>
```

When you run this playbook, the `index.html` file is copied to each web server. However, if you want each server's homepage to display its own hostname and IP address, you can leverage variable interpolation within a Jinja2 template.

## Dynamic Content with Jinja2 Templates

A better approach is to convert your static HTML file into a dynamic Jinja2 template. Rename the file to `index.html.j2` and introduce variables. Below is an example showing the updated inventory, playbook, and Jinja2 template that customizes each server's index page based on its name.

### Inventory File (remains unchanged)

```
[web_servers]
web1 ansible_host=172.20.1.100
web2 ansible_host=172.20.1.101
web3 ansible_host=172.20.1.102
```

### Updated Playbook (playbook.yml) Using the Template Module

```
- hosts: web_servers
  tasks:
    - name: Copy index.html to remote servers
      template:
        src: index.html.j2
        dest: /var/www/nginx-default/index.html
```

### Jinja2 Template File (index.html.j2)

```
<!DOCTYPE html>
<html>
<body>
This is {{ inventory_hostname }} Server
</body>
</html>
```

When this playbook is executed, Ansible processes the Jinja2 template for each host, replacing `{{ inventory_hostname }}` with the host's actual name. For instance, if `inventory_hostname` is `web1`, the generated file will be:

```
<!DOCTYPE html>
<html>
<body>
This is web1 Server
</body>
</html>
```

Similarly, `web2` and `web3` will receive personalized HTML files.

> **Note:** This templating approach is not limited to static web pages. You can also generate configuration files for services such as Nginx or Redis dynamically.

## Dynamic Configuration Files

### Nginx Configuration Template

Below is an example of an Nginx configuration template (`nginx.conf.j2`) that uses variables to define the upstream server and image directory.

```
server {
    location / {
        fastcgi_pass {{ host }}:{{ port }};
        fastcgi_param QUERY_STRING $query_string;
    }


    location ~ \.(gif|jpg|png)$ {
        root {{ image_path }};
    }
}
```

This template could render a configuration file like:

```
server {
    location / {
        fastcgi_pass localhost:9000;
        fastcgi_param QUERY_STRING $query_string;
    }


    location ~ \.(gif|jpg|png)$ {
        root /data/images;
    }
}
```

### Redis Configuration Template with Default Filters

You can also incorporate Jinja2 filters to provide fallback values within configuration files. For instance, the following Redis configuration template uses the `default` filter:

```
bind {{ ip_address }}
protected-mode yes
port {{ redis_port | default('6379') }}
tcp-backlog 511
# Unix socket.
timeout 0
# TCP keepalive.
tcp-keepalive {{ tcp_keepalive | default('300') }}
daemonize no
supervised no
```

When rendered, this might produce:

```
bind 192.168.1.100
protected-mode yes
port 6379
tcp-backlog 511
# Unix socket.
timeout 0
# TCP keepalive.
tcp-keepalive 300
daemonize no
supervised no
```

### Generating Configurations with Jinja2 Loops

Jinja2 loops allow you to generate configuration file entries dynamically. For example, you can generate a list of nameserver entries for the `/etc/resolv.conf` file using a for loop.

#### Template for resolv.conf (resolv.conf.j2)

```


nameserver {{ name_server }},
,[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
```
