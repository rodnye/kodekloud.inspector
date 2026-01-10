# Curriculum - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Introduction/Curriculum)

---

## Table of Contents

- Curriculum
  - Linux Basics
  - Lab Environment and Troubleshooting
  - Networking in Linux
  - Source Code Management
  - Applications and Build Process
  - Web Servers
  - Databases
  - Multi-Tier Application Deployment and Data Structures
  - Watch Video

---

## Content

DevOps Pre-Requisite Course

Introduction

# Curriculum

Explore the essential objectives of this course, designed as a DevOps and cloud prerequisites guide to prepare you for the upcoming [Fundamentals of DevOps](https://learn.kodekloud.com/user/courses/fundamentals-of-devops) course. This curriculum covers a variety of topics, each introduced with sufficient detail to provide a solid understanding and hands-on practice.

## Linux Basics

Begin your journey by mastering fundamental Linux commands and the command-line interface (CLI). In this section, you will also get acquainted with the vi editor, an essential tool for editing configuration files in Linux. Below is an example demonstrating basic file creation and content manipulation:

```
touch new_file.txt
Hi
cat > new_file.txt
This is some sample contents
^C
cat new_file.txt  # Outputs: This is some sample contents
```

After mastering these basics, you’ll learn how to install software and manage dependencies in Linux—including configuring and controlling various system services.

## Lab Environment and Troubleshooting

At KodeKloud, our courses include embedded labs that provide a ready-to-use environment. However, you may also wish to set up your own persistent lab environment for development, experimentation, and troubleshooting. This section guides you in creating a custom lab environment, with particular focus on resolving common challenges, such as network configuration issues in VirtualBox.

![The image outlines a curriculum covering Linux basics, networking, SCM, applications, web servers, databases, multi-tier applications, JSON/YAML, and virtualization using VirtualBox and Vagrant.](https://kodekloud.com/kk-media/image/upload/v1752873430/notes-assets/images/DevOps-Pre-Requisite-Course-Curriculum/frame_60.jpg)

## Networking in Linux

Networking in Linux can be complex, but this section simplifies it by covering key topics such as:

- Configuring network interfaces and IP addresses.
- Troubleshooting connectivity issues, including problems where a virtual machine loses internet access or when multiple VMs struggle to communicate.
- Configuring routing and DNS settings.

In addition, practical labs are provided to help you troubleshoot DNS-related issues effectively.

## Source Code Management

In modern DevOps and cloud environments, interactions with source code repositories are vital. This section introduces popular source code management tools like Git. You will gain hands-on experience with essential Git commands for pulling, modifying, and pushing code changes.

![The image outlines a curriculum covering Linux basics, GIT, application basics, web servers, databases, multi-tier applications, and JSON/YAML, with specific GIT tasks listed.](https://kodekloud.com/kk-media/image/upload/v1752873431/notes-assets/images/DevOps-Pre-Requisite-Course-Curriculum/frame_130.jpg)

## Applications and Build Process

This section focuses on the application lifecycle—covering development through deployment. It is aimed at non-developers and those with little or no coding experience. You will learn about widely used applications including Python, NodeJS, and Java, which serve as examples for understanding build pipelines and automation in a DevOps environment.

![The image outlines a curriculum for non-developers, covering Linux basics, networking, Git, applications, web servers, databases, and more, with a focus on Python, NodeJS, and Java.](https://kodekloud.com/kk-media/image/upload/v1752873433/notes-assets/images/DevOps-Pre-Requisite-Course-Curriculum/frame_150.jpg)

## Web Servers

Delve into the fundamentals of web servers and web frameworks. You will explore popular web server technologies such as Apache, HTTPD, NGINX, Gunicorn, and PM2. The section covers topics such as selecting IP addresses and ports, configuring server interfaces, and securing web servers with SSL/TLS certificates.

For instance, consider this simple Flask application:

```
from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(port=8000)
```

Another example featuring a Java-based Spring Boot application:

```
// Code hidden for brevity
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }


    @GetMapping("/products")
    public String[] getProducts() {
        return getProductList();
    }
}
```

![The image displays a curriculum outline covering topics like Linux basics, web servers, databases, and web frameworks, alongside a network diagram and command line interface.](https://kodekloud.com/kk-media/image/upload/v1752873434/notes-assets/images/DevOps-Pre-Requisite-Course-Curriculum/frame_220.jpg)

## Databases

Gain an understanding of different database types, such as MySQL and MongoDB, and learn how web servers interface with these databases. This section emphasizes essential administration tasks over advanced SQL queries. For example, installing and managing MySQL on a Linux system is demonstrated below:

```
wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
rpm -ivh mysql80-community-release-el7-3.noarch.rpm
yum install mysql-server
service mysqld start
service mysqld status
```

Basic SQL commands for managing database privileges are also covered:

```
mysql> GRANT <PERMISSION> ON <DB.TABLE> TO 'john'@'%';
mysql> GRANT SELECT ON school.persons TO 'john'@'%';
mysql> GRANT SELECT, UPDATE ON school.persons TO 'john'@'%';
```

> [!important]
> **Note**
>
> Ensure you replace placeholder values in SQL commands with actual database names, user names, and permissions as required.

## Multi-Tier Application Deployment and Data Structures

Integrate the skills learned throughout the course by deploying a multi-tier LAMP stack application. This practical project includes setting up a web front end, a web server, and a database server. You will also explore common data structures such as JSON and YAML. These data formats are essential in configuration tools like Ansible, Docker, and Kubernetes.

![The image shows a curriculum outline with topics like Linux Basics and Web Servers, alongside a product list featuring items like laptops and VR devices.](https://kodekloud.com/kk-media/image/upload/v1752873435/notes-assets/images/DevOps-Pre-Requisite-Course-Curriculum/frame_270.jpg)

> [!important]
> **Get Started**
>
> When you’re ready, dive into the lab exercises and detailed demonstrations to reinforce your understanding of DevOps fundamentals. Enjoy the lesson and happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/10cc998e-4162-40ec-be18-d26a77d7a474/lesson/751142bf-483a-4c17-a634-2e2fceae5692)**
>
> Watch video content
