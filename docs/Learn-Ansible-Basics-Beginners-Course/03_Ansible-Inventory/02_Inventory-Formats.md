# Inventory Formats - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learn-Ansible-Basics-Beginners-Course/Ansible-Inventory/Inventory-Formats)

---

## Table of Contents

- Inventory Formats
  - INI Format Example
  - YAML Format Example
  - Watch Video
  - Practice Lab

---

## Content

Learn Ansible Basics Beginners Course

Ansible Inventory

# Inventory Formats

When managing server inventories, choosing the right format can significantly streamline your operations. Consider the following examples that highlight common scenarios:

For a small startup with just a few servers handling basic tasks like web hosting and database management, a simple INI format inventory is often sufficient. This format is comparable to a basic organizational chart with only a few departments.  
![The image illustrates the need for different inventory formats, showing a multinational corporation linked to servers, e-commerce, customer support, and data analysis.](https://kodekloud.com/kk-media/image/upload/v1752881049/notes-assets/images/Learn-Ansible-Basics-Beginners-Course-Inventory-Formats/frame_20.jpg)

> [!important]
> **Tip**
>
> Using the INI format makes it easy to manage a limited number of servers without dealing with overly complex structures.

In contrast, a multinational corporation with hundreds of servers distributed globally will benefit from a more detailed and structured inventory. A YAML inventory format, which resembles a complex organizational chart with multiple departments, sub-departments, and teams, is ideal for handling diverse functions such as e-commerce, customer support, and data analysis.  
![The image compares inventory formats for small startups and multinational corporations, illustrating simple and complex structures, with YAML suggested for larger organizations.](https://kodekloud.com/kk-media/image/upload/v1752881049/notes-assets/images/Learn-Ansible-Basics-Beginners-Course-Inventory-Formats/frame_40.jpg)

Different inventory formats allow you to group your servers based on various criteria, such as their roles (e.g., web servers, database servers, application servers), geographic location (e.g., servers in the US, Europe, or Asia), or organizational structure. Ansible supports two main inventory formats: INI and YAML.

## INI Format Example

The INI format is straightforward and works well for smaller deployments. Below is an example:

```
[webservers]
web1.example.com
web2.example.com


[dbservers]
db1.example.com
db2.example.com
```

## YAML Format Example

For more complex environments, the YAML format is highly recommended. Here's an example of a YAML inventory designed for extensive and distributed systems:

```
all:
  children:
    webservers:
      hosts:
        web1.example.com:
        web2.example.com:
    dbservers:
      hosts:
        db1.example.com:
        db2.example.com:
```

> [!important]
> **Best Practice**
>
> When choosing an inventory format, consider the complexity and scale of your project. Align your choice with your organizational structure to ensure efficient management of server groups.

That concludes this lesson. We'll see you in the next one.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/d7059d07-b28b-4e04-a4a4-3638100f5266/lesson/0bbb5f18-60d9-4a8c-8bf7-dd9a09236d4a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/d7059d07-b28b-4e04-a4a4-3638100f5266/lesson/a3375048-30f6-4522-9d02-d85e4df5ab7c)**
>
> Practice lab
