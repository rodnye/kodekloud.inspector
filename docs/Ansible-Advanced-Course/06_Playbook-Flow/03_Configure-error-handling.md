# Configure error handling - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Playbook-Flow/Configure-error-handling)

---

## Table of Contents

- Configure error handling
  - Single Server Scenario
  - Multiple Servers Scenario
  - Halting Execution on Errors
  - Handling Partial Failures with Many Servers
  - Ignoring Non-Critical Errors
  - Implementing a Health Check
  - Using Blocks and Rescue
  - Watch Video
  - Practice Lab

---

## Content

Ansible Advanced Course

Playbook Flow

# Configure error handling

In this lesson, we explore error handling in Ansible and examine how playbooks respond when tasks fail during execution. Previously, we explored execution strategies and overall task flow; now we focus on managing failures effectively.

## Single Server Scenario

When deploying a web application to a single server, Ansible executes tasks sequentially. If one task fails—say, the first two tasks run successfully and the third fails—the playbook halts immediately. Below is a sample playbook structure for a single server deployment:

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
> In single-server scenarios, immediate task failure can be beneficial to prevent further misconfigurations or cascading errors.

## Multiple Servers Scenario

When running a playbook on multiple servers, Ansible completes each task on all targeted hosts before proceeding to the next one. For instance, it will install dependencies on all servers first, then continue with MySQL installation. If a task—such as starting the database—fails on one server (e.g., server two), Ansible removes that server from subsequent tasks and continues executing on the remaining healthy servers.

![The image shows a task failure in deploying a web application across three servers, with steps like installing dependencies and MySQL, and running a web server.](https://kodekloud.com/kk-media/image/upload/v1752869404/notes-assets/images/Ansible-Advanced-Course-Configure-error-handling/frame_60.jpg)

Ansible’s default behavior is to execute as many tasks as possible unless an alternative configuration is provided.

## Halting Execution on Errors

Consistency during deployment may require stopping the playbook as soon as any server fails. You can achieve this by enabling the `any_errors_fatal` option. With this option set to true, a failure on any task across any server halts the entire playbook execution. The updated playbook structure is as follows:

```
- name: Deploy web application
  hosts: server1,server2,server3
  any_errors_fatal: true
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
> **Important**
>
> Use `any_errors_fatal` when uniformity in deployment is critical, ensuring that any failure results in an immediate stop.

## Handling Partial Failures with Many Servers

When deploying on hundreds of servers, occasional individual task failures might be acceptable. You can rerun the playbook for those specific servers later. However, if a significant portion of servers fails a task, it indicates a broader problem and should stop the playbook execution. The `max_fail_percentage` option allows you to define a failure threshold. For example, setting `max_fail_percentage: 30` means that if more than 30% of the servers fail at a particular task, the playbook stops:

```
- name: Deploy web application
  hosts: server1,server2,server3
  max_fail_percentage: 30
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

## Ignoring Non-Critical Errors

In some cases, non-critical errors should not interrupt the overall playbook execution. For instance, you might include a notification task using the mail module to inform your team that the web server is ready even if the SMTP server is unstable. By setting the `ignore_errors` flag to yes, you ensure that the playbook continues even if this notification fails:

```
- name: Deploy web application
  hosts: server1,server2,server3
  any_errors_fatal: true
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


    - name: Send notification email
      mail:
        to: admin@company.com
        subject: Server Configured
        body: Web server has been configured
      ignore_errors: yes
```

## Implementing a Health Check

To further ensure the stability of your web server, you can run a health check that verifies the server log file does not contain error messages. In this task, the output of the command is captured using the `register` keyword, and the `failed_when` directive checks for the word "ERROR" in the output. If found, the task—and thus the playbook—fails:

```
- name: Deploy web application
  hosts: server1,server2,server3
  any_errors_fatal: true
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

    - name: Check server log for errors
      command: cat /var/log/server.log
      register: command_output
      failed_when: "'ERROR' in command_output.stdout"

    - name: Send notification email
      mail:
        to: admin@company.com
        subject: Web server Configured
        body: Web server has been configured
      ignore_errors: yes
```

## Using Blocks and Rescue

For more robust error handling, you can group related tasks into a block. If any task within the block fails, the reserved rescue section is executed. In the example below, if the tasks within the block fail, an alert email is sent to notify the administrators of the failure:

```
- name: Deploy web application
  hosts: server1,server2,server3
  any_errors_fatal: true
  tasks:
    - name: Install web application
      block:
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
      rescue:
        - name: Notify admins about playbook failure
          mail:
            to: admin@company.com
            subject: Playbook Failed
            body: Web server configuration failed
```

That concludes our review of error handling in Ansible. For further practice, try applying these techniques in your own playbooks to enhance reliability and troubleshoot issues effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/3a981414-5824-4a4b-aee9-099ac8d49e31/lesson/2e3ed793-c03e-4636-9018-11dbb99e0622)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/3a981414-5824-4a4b-aee9-099ac8d49e31/lesson/28e9ca61-573c-4294-b8c2-6b623e1043a2)**
>
> Practice lab
