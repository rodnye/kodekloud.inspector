# Create simple shell scripts that run ad hoc Ansible commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Install-and-Configure/Create-simple-shell-scripts-that-run-ad-hoc-Ansible-commands)

---

## Table of Contents

- Create simple shell scripts that run ad hoc Ansible commands
  - Setting Up Your Environment
  - Running Your Shell Script
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Ansible Advanced Course

Install and Configure

# Create simple shell scripts that run ad hoc Ansible commands

In this guide, you'll learn how to create efficient shell scripts that execute ad-hoc Ansible commands. These scripts are especially useful for automating multiple tasks sequentially – for example, running a command to ping all nodes and then printing the contents of the `/etc/hosts` file on each node.

> [!important]
> **Tip**
>
> Embedding Ansible configuration parameters as environment variables directly in your shell script ensures that your setup is consistently applied every time you run your commands.

## Setting Up Your Environment

Previously, we discussed configuring Ansible parameters through environment variables. Instead of setting these variables manually each time, you can include them in your shell script. This guarantees that the required configurations are always in place before any command execution.

Below is an example of a shell script that sets an environment variable and then runs several Ansible commands:

```
export ANSIBLE_GATHERING=explicit
ansible -m ping all
ansible -a 'cat /etc/hosts' all
ansible-playbook playbook.yml
```

## Running Your Shell Script

There are two convenient methods to execute your shell script:

| Method                                    | Command Example                                           |
| ----------------------------------------- | --------------------------------------------------------- |
| **Using the sh command**                  | `sh script_name.sh`                                       |
| **Making the script directly executable** | `chmod 755 script_name.sh` followed by `./script_name.sh` |

Choose the method that best suits your environment for running the script.

> [!important]
> **Security Warning**
>
> Before running any shell script, ensure you review its contents for security. Running untrusted scripts, especially with elevated privileges, may put your system at risk.

## Conclusion

Embedding environment variables within your shell scripts simplifies the execution of Ansible playbooks and ad-hoc commands, minimizing the risk of misconfiguration and saving time. For further study, consider revisiting related exercises on shell scripting and Ansible commands to reinforce your knowledge.

For additional resources, check out the [Ansible Documentation](https://docs.ansible.com/ansible/latest/user_guide/index.html) to enhance your understanding of best practices and advanced usage tips.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/f521e68d-4c4a-4fc5-bbd7-d394df07d086/lesson/a9507f1b-b51f-4d2b-aa06-d8302e36b34b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/f521e68d-4c4a-4fc5-bbd7-d394df07d086/lesson/8f928c2a-1da4-4fcf-a8c4-d9a0fd9698cc)**
>
> Practice lab
