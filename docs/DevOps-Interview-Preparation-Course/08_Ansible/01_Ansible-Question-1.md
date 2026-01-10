# Ansible Question 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Ansible/Ansible-Question-1)

---

## Table of Contents

- Ansible Question 1
  - Overview
  - Example Inventory Configuration
  - Interview Tip
  - Conclusion
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Ansible

# Ansible Question 1

In this lesson, we explore how Ansible can efficiently manage multiple servers that use different SSH ports and unique usernames while running the same playbook (often referred to as a runbook). This approach is essential when dealing with servers that do not share a common configuration for connection parameters.

## Overview

Typically, Ansible relies on a common hosts inventory file along with a shared configuration file (ansible.cfg) to define connection details such as the default username. For example, cloud setups like AWS might use the EC2 user as a default. However, when individual servers require distinct SSH ports and usernames, these default configurations become insufficient.

> [!important]
> **Key Insight**
>
> When working with servers that have varying connection parameters, you must override the defaults by specifying the SSH port and username for each host directly within the inventory file.

## Example Inventory Configuration

Below is an example that demonstrates how to define unique connection parameters for each host. In this configuration, two servers are specified with their respective IP addresses, SSH ports, and usernames:

```
[webservers]
10.4.20.90 ansible_port=4000 ansible_user=roger
39.12.3.23 ansible_port=8001 ansible_user=luffy
```

When you run an Ansible playbook, Ansible reads the inventory file to fetch each host's IP address, SSH port, and username. With these specific parameters, Ansible reliably connects to each server and executes the playbook commands, thereby handling different connection settings seamlessly.

## Interview Tip

This configuration strategy is a common interview topic. When asked how to manage multiple hosts with different connection credentials, the correct answer is to explicitly specify the `ansible_port` and `ansible_user` for each host in the inventory file. This approach allows Ansible to connect using the correct credentials for every server.

## Conclusion

Managing hosts with varying connection parameters in Ansible is straightforward once you override the default settings by defining the SSH port and username in the inventory file. This technique ensures that Ansible connects to each server properly and executes playbooks without any connection issues.

By following this method, you can tackle real-world scenarios as well as interview questions with confidence. Happy automating!

For more information, check out [Ansible Documentation](https://docs.ansible.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/5f30e8bf-5784-4569-b729-cbca5e6072af/lesson/cb3ea926-f00d-47b2-986c-1d7a0f4c7112)**
>
> Watch video content
