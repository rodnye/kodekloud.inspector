# Jinja2 Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Variables-and-Jinja2/Jinja2-Basics)

---

## Table of Contents

- Jinja2 Basics
  - Templating in Practice
  - Core Concepts of Jinja2
    - Defining Blocks and Iterating Over Elements

---

## Content

Ansible Advanced Course

Variables and Jinja2

# Jinja2 Basics

In this article, we explore Jinja2—a powerful templating engine for Python that allows you to generate dynamic content by mixing static templates with customized data. Whether you are sending personalized emails or generating dynamic web pages and configuration files, Jinja2 helps streamline the process by separating the presentation layer from the data.

> **Overview**  
> Templating engines work by taking a template (a generic document) and merging it with a set of variables to produce a customized output. For example, a company CEO might use a standard invitation template while personalizing the recipient's details for each employee.

![The image shows a "Templating Engine" with personalized invitation letters for a company event, addressed to different individuals and their family members.](https://kodekloud.com/kk-media/image/upload/v1752869406/notes-assets/images/Ansible-Advanced-Course-Jinja2-Basics/frame_80.jpg)

## Templating in Practice

```
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }}</title>
</head>
<body>
    {{ msg }}
</body>
</html>
```

```
<!DOCTYPE html>
<html>
<head>
    <title>Our Site</title>
</head>
<body>
    Welcome!
</body>
</html>
```

```
- hosts: web1
  tasks:
    - file:
        path: "{{ file }}"
        state: touch
```

```
[mysqld]
innodb-buffer-pool-size={{ pool_size }}
datadir={{ datadir }}
user={{ mysql }}
```

## Core Concepts of Jinja2

Jinja2 supports a wide array of features including variable substitution, filters, loops, and conditionals. Consider the examples below to understand the basic syntax and functionalities.

### Defining Blocks and Iterating Over Elements

```
<title>,</title>
<ul>,
    <li><a href="{{ user.url }}">{{ user.username }}</a></li>,
</ul>
,[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
```
