# Ansible Conditionals based on facts variables re use - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learn-Ansible-Basics-Beginners-Course/Ansible-Playbooks/Ansible-Conditionals-based-on-facts-variables-re-use)

---

## Table of Contents

- Ansible Conditionals based on facts variables re use
  - Scenario 1: Conditional Task Based on Operating System
  - Scenario 2: Conditional Task Based on Environment
  - Scenario 3: Common Tasks with Environment-Specific Conditions
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Learn Ansible Basics Beginners Course

Ansible Playbooks

# Ansible Conditionals based on facts variables re use

Imagine managing a diverse server fleet that includes Ubuntu 18.04, CentOS 7, and Windows Server 2019 machines. Automating the deployment of a web application across these systems requires performing specific actions based on each server's operating system and environment.

## Scenario 1: Conditional Task Based on Operating System

When you need to install a specific version of the Nginx web server only on Ubuntu 18.04 servers, Ansible facts become indispensable. These facts provide details such as the OS family and distribution version, which you can use to control task execution. The playbook snippet below checks for Ubuntu 18.04 servers and installs Nginx version 1.18.0 accordingly:

```
- name: Install Nginx on Ubuntu 18.04
  apt:
    name: nginx=1.18.0
    state: present
  when: ansible_facts['os_family'] == 'Debian' and ansible_facts['distribution_major_version'] == '18'
```

Ansible collects system-specific facts at runtime, allowing you to use variables like `ansible_facts['os_family']` and `ansible_facts['distribution_major_version']` to decide which tasks to run on which servers.

> [!important]
> **Tip**
>
> Utilize Ansible facts to make your playbooks dynamic and adaptable to the specifics of your managed hosts.

## Scenario 2: Conditional Task Based on Environment

Web applications often require different configurations based on the deployment environment—whether it's development, staging, or production. By defining an environment variable (e.g., `app_env`), you can direct Ansible to deploy the appropriate configuration file. The following playbook demonstrates how to select the correct configuration file using the template module:

```
- name: Deploy configuration file for the given environment
  template:
    src: "{{ app_env }}_config.j2"
    dest: "/etc/myapp/config.conf"
  vars:
    app_env: production
```

This strategy dynamically selects the configuration file (for example, `production_config.j2`) by passing the appropriate value to the `app_env` variable.

## Scenario 3: Common Tasks with Environment-Specific Conditions

Often, you'll need to execute a series of common tasks across all servers—such as installing packages, creating directories, and setting file permissions—while reserving certain actions exclusively for specific environments. For instance, starting the web application service might be reserved for production servers only. This can be achieved by checking an `environment` variable with a conditional statement:

```
- name: Install required packages
  apt:
    name:
      - package1
      - package2
    state: present


- name: Create necessary directories and set permissions
  file:
    path: "/path/to/directory"
    state: directory
    mode: '0755'


- name: Start web application service
  service:
    name: myapp
    state: started
  when: environment == 'production'
```

In this example, the task for starting the web application service only runs when the `environment` variable equals `'production'`. This conditional execution ensures that common tasks are reused efficiently across environments while still customizing certain actions for specific deployment contexts.

> [!important]
> **SEO Tip**
>
> Leverage conditional logic to create maintainable and scalable Ansible playbooks that adapt to varied server configurations and environments.

## Conclusion

Ansible's powerful combination of facts, variables, and conditional statements allows you to handle complex deployment requirements with ease. By tailoring task execution based on server properties and environmental variables, you can craft efficient playbooks that are both flexible and maintainable.

This approach ensures that only the necessary tasks run on each server, simplifying management and reducing potential errors across diverse deployment scenarios.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/f7bcdbad-4792-4e82-beaa-b799773214fd/lesson/81e76255-6255-4a57-be96-8bae5aa3bb2e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learn-ansible-basics-beginners-course/module/f7bcdbad-4792-4e82-beaa-b799773214fd/lesson/6a482ef8-c154-42de-8000-34cdfde5050d)**
>
> Practice lab
