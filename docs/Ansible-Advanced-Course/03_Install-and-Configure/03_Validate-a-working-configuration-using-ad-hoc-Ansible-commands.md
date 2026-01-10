# Validate a working configuration using ad hoc Ansible commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Install-and-Configure/Validate-a-working-configuration-using-ad-hoc-Ansible-commands)

---

## Table of Contents

- Validate a working configuration using ad hoc Ansible commands
  - Using a YAML Playbook for Connectivity Testing
  - Executing Ad-Hoc Commands Directly
  - Running Arbitrary Commands
  - Privilege Escalation with Ad-Hoc Commands
  - Watch Video
  - Practice Lab

---

## Content

Ansible Advanced Course

Install and Configure

# Validate a working configuration using ad hoc Ansible commands

In this article, you will learn how to run ad hoc commands with Ansible. Although YAML-based playbooks are the recommended method for automating tasks—enabling reusability, version control with Git, and easy sharing—ad hoc commands provide a quick and efficient alternative for testing modules, verifying connectivity, or gathering one-off information from multiple servers.

> [!important]
> **Note**
>
> The Ansible `ping` module is used to verify SSH connectivity to target machines using the configured credentials, not for performing an ICMP ping.

## Using a YAML Playbook for Connectivity Testing

For administrators managing virtual machines, a simple playbook using the `ping` module is an excellent way to test connectivity. Below is an example playbook that pings all target servers:

```
---
- name: Ping Servers
  hosts: all
  tasks:
    - ping:
```

To run the playbook, execute the following command in your terminal:

```
ansible-playbook playbook.yml
```

## Executing Ad-Hoc Commands Directly

If you prefer not to create a playbook, you can achieve the same result using an ad hoc command. Use the `-m` option to specify the module and designate the target hosts. The command below pings all servers:

```
ansible -m ping all
```

When executed, the output appears in JSON format for each host, similar to the following:

```
web2 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
web1 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

## Running Arbitrary Commands

To run an arbitrary command on all hosts, use the `-a` option to pass the command directly. For instance, to display the contents of the `/etc/hosts` file, run:

```
ansible -a 'cat /etc/hosts' all
```

The output will be similar to this:

```
web1 | CHANGED | rc=0 >>
127.0.0.1 localhost
::1 localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
172.20.1.100 web1
web2 | CHANGED | rc=0 >>
127.0.0.1 localhost
::1 localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
172.20.1.100 web1
```

## Privilege Escalation with Ad-Hoc Commands

You can also include privilege escalation options (such as `become` or `become_user`) with these ad hoc commands, just as you would when using a playbook. This flexibility makes ad hoc commands a powerful tool for managing your infrastructure on the fly.

Continue exploring additional methods to effectively utilize ad hoc commands in Ansible for efficient infrastructure management.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/f521e68d-4c4a-4fc5-bbd7-d394df07d086/lesson/f0fbb1e8-71a9-4034-b92d-0eb449dcf703)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/f521e68d-4c4a-4fc5-bbd7-d394df07d086/lesson/582c7565-c029-463b-819d-3d009da2c66c)**
>
> Practice lab
