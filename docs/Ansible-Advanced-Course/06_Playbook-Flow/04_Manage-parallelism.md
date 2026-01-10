# Manage parallelism - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Playbook-Flow/Manage-parallelism)

---

## Table of Contents

- Manage parallelism
  - Single Server Deployment
  - Multi-Server Deployment Using the Linear Strategy
  - Free Strategy
  - Batch Processing with Serial
  - Controlling Parallelism with Forks
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

Ansible Advanced Course

Playbook Flow

# Manage parallelism

In this lesson, we explore the various strategies that Ansible offers for executing playbooks efficiently. In Ansible, a strategy dictates how tasks are executed across hosts, detailing when and how tasks run concurrently.

## Single Server Deployment

When deploying a web application on a single server, all components (such as the database and web server) reside on one system. In the example below, tasks include installing dependencies, setting up MySQL, starting the MySQL service, installing Python Flask dependencies, and finally running the web server. All tasks are executed sequentially on the single server:

```
- name: Deploy web application
  hosts: server1
  tasks:
    - name: Install dependencies
      << code hidden >>

    - name: Install MySQL Database
      << code hidden >>

    - name: Start MySQL Service
      << code hidden >>

    - name: Install Python Flask Dependencies
      << code hidden >>

    - name: Run web-server
      << code hidden >>
```

> [!important]
> **Note**
>
> For single server deployments, task order is strictly sequential, ensuring each installation or configuration step completes before the next begins.

## Multi-Server Deployment Using the Linear Strategy

The linear strategy is Ansible’s default approach for multi-server deployments. In this scenario, the playbook targets multiple servers—such as three servers—executing each task across all hosts in parallel. However, Ansible waits until every server completes the current task before moving to the next one.

```
- name: Deploy web application
  hosts: server1,server2,server3
  tasks:
    - name: Install dependencies
      << code hidden >>

    - name: Install MySQL Database
      << code hidden >>

    - name: Start MySQL Service
      << code hidden >>

    - name: Install Python Flask Dependencies
      << code hidden >>

    - name: Run web-server
      << code hidden >>
```

> [!important]
> **Warning**
>
> If one server experiences delays during a task, it will hold up the progression of tasks across all targeted servers.

## Free Strategy

For scenarios where servers can progress at their own pace, you can use the "free" strategy. With this strategy, each host executes its tasks independently without waiting for others to complete the same task. To enable this, specify the strategy directive in your playbook:

```
- name: Deploy web application
  hosts: server1,server2,server3
  strategy: free
  tasks:
    - name: Install dependencies
      << code hidden >>

    - name: Install MySQL Database
      << code hidden >>

    - name: Start MySQL Service
      << code hidden >>

    - name: Install Python Flask Dependencies
      << code hidden >>

    - name: Run web-server
      << code hidden >>
```

## Batch Processing with Serial

In extensive deployments, processing servers in batches minimizes risk and load. The `serial` keyword lets you specify how many hosts to process at a time. For instance, to deploy to five servers in batches of three, update your playbook as follows:

```
- name: Deploy web application
  hosts: server1,server2,server3,server4,server5
  serial: 3
  tasks:
    - name: Install dependencies
      << code hidden >>

    - name: Install MySQL Database
      << code hidden >>

    - name: Start MySQL Service
      << code hidden >>

    - name: Install Python Flask Dependencies
      << code hidden >>

    - name: Run web-server
      << code hidden >>
```

This configuration processes three servers at a time. Once all tasks complete for the first batch, Ansible proceeds with the next group.

> [!important]
> **Custom Strategies**
>
> If the built-in strategies—linear, free, or serial—do not fully meet your deployment needs, consider developing a custom strategy plugin.

## Controlling Parallelism with Forks

A common query is: How many servers can Ansible manage concurrently? Even when deploying to hundreds of servers, Ansible uses the concept of forks to control the number of parallel connections. By default, Ansible sets 5 forks, meaning it will only execute tasks on five hosts concurrently. For example, if a playbook targets 100 servers, Ansible processes them in increments of five unless you change the configuration:

```
- name: Deploy web application
  hosts: server1,server2,server3,...,server100
  tasks:
    - name: Install dependencies
      << code hidden >>

    - name: Install MySQL Database
      << code hidden >>

    - name: Start MySQL Service
      << code hidden >>

    - name: Install Python Flask Dependencies
      << code hidden >>

    - name: Run web-server
      << code hidden >>
```

The number of forks is configured in the Ansible configuration file (ansible.cfg):

```
/etc/ansible/ansible.cfg
forks = 5
```

Increase this value if your hardware and network resources allow for more simultaneous connections.

![The image outlines a strategy for deploying a web application across three servers, detailing tasks like installing dependencies, MySQL, and running a web server.](https://kodekloud.com/kk-media/image/upload/v1752869405/notes-assets/images/Ansible-Advanced-Course-Manage-parallelism/frame_120.jpg)

## Summary

This lesson provided an overview of how Ansible manages parallelism through different strategies:

| Strategy         | Description                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Linear (Default) | Executes tasks across hosts in parallel but waits for every host to finish each task before moving forward.            |
| Free             | Allows each host to progress independently through tasks without waiting for other hosts.                              |
| Serial           | Controls the number of hosts processed at one time, ideal for large-scale deployments to reduce overall load and risk. |

Understanding these methods helps you optimize task execution across various server configurations and effectively manage deployment parallelism.

That's all for this article. In the next lesson, we continue our exploration of advanced Ansible concepts and best practices for enterprise deployments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/3a981414-5824-4a4b-aee9-099ac8d49e31/lesson/f3b186b4-e91c-42cc-a76c-65ada7f03d41)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/3a981414-5824-4a4b-aee9-099ac8d49e31/lesson/9609ab29-f5d4-4348-9c03-bd82b5fa7ed6)**
>
> Practice lab
