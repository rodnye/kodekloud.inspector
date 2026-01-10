# Use variables to retrieve the results of running commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Variables-and-Jinja2/Use-variables-to-retrieve-the-results-of-running-commands)

---

## Table of Contents

- Use variables to retrieve the results of running commands
  - Capturing Command Output with a Registered Variable
  - Understanding the Registered Variable Content
  - Accessing Specific Elements from the Registered Variable
  - Using Registered Variables Across Multiple Plays
  - Verifying Command Output with Verbose Mode
  - Watch Video
  - Practice Lab

---

## Content

Ansible Advanced Course

Variables and Jinja2

# Use variables to retrieve the results of running commands

In this article, you'll learn how to capture the output of tasks executed with Ansible using the `register` directive and reuse that data later in your playbook. Capturing command output can be invaluable—for instance, if you want to read the contents of a file and then use that information in subsequent tasks.

## Capturing Command Output with a Registered Variable

Consider the following playbook that executes a shell command to display the contents of the `/etc/hosts` file on each host. Initially, the playbook might be written like this without capturing the output:

```
- name: Check /etc/hosts file
  hosts: all
  tasks:
    - shell: cat /etc/hosts
    - debug:
        var:
```

When you run the playbook, the output might look similar to this:

```
PLAY [Check /etc/hosts file] *********************************************************


TASK [shell] **************************************************************************
changed: [web1]
changed: [web2]


PLAY RECAP ***************************************************************************
web1                       : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
web2                       : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
```

To capture the output, you can register the result of the shell command into a variable (for example, `result`). The revised playbook is shown below:

```
- name: Check /etc/hosts file
  hosts: all
  tasks:
    - shell: cat /etc/hosts
      register: result


    - debug:
        var: result
```

When executed, Ansible stores the result of the shell command into the `result` variable. Running the updated playbook produces debug output that looks like this:

```
PLAY [Check /etc/hosts file] ******************************************************************


TASK [shell] **********************************************************************************
changed: [web1]
changed: [web2]


PLAY RECAP ************************************************************************************
web1                        : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
web2                        : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
```

## Understanding the Registered Variable Content

The content stored in the `result` variable depends on the module that was executed. When using the shell module, the output is captured as a JSON object. For example, the `result` variable might contain data like the following:

```
{
  "ok": {
    "web2": {
      "output": {
        "ansible_facts": {
          "discovered_interpreter_python": "/usr/bin/python"
        }
      },
      "changed": true,
      "cmd": "cat /etc/hosts",
      "failed": false,
      "rc": 0,
      "start": "2019-09-12 05:25:34.158877",
      "end": "2019-09-12 05:25:34.161974",
      "delta": "00:00:00.003097",
      "stderr": "",
      "stderr_lines": [],
      "stdout": "127.0.0.1\tlocalhost\n::1\tlocalhost ip6-localhost ip6-loopback\nfe00::0\tip6-localnet\nff00::0\tip6-mcastprefix\nff02::1\tip6-allnodes\nff02::2\tip6-allrouters\n172.20.1.101\tweb2",
      "stdout_lines": [
        "127.0.0.1\tlocalhost",
        "::1\tlocalhost ip6-localhost ip6-loopback",
        "fe00::0\tip6-localnet",
        "ff00::0\tip6-mcastprefix",
        "ff02::1\tip6-allnodes",
        "ff02::2\tip6-allrouters",
        "172.20.1.101\tweb2"
      ]
    }
  }
}
```

This JSON output includes several key attributes:

- **rc**: The return code of the command (0 indicates success).
- **stdout** and **stdout_lines**: The standard output from the command, which in this example is the contents of `/etc/hosts`.
- **stderr** and **stderr_lines**: Any error messages generated during command execution.
- **Timestamps and delta**: Timing details that show when the command started, ended, and the duration of execution.

> [!important]
> **Note**
>
> Registered variables in Ansible are host-scoped. This means the variable is only available for the specific host where the task was executed and can be accessed throughout the remainder of the playbook for that host.

## Accessing Specific Elements from the Registered Variable

In many cases, you might only want to display specific parts of the command output. For instance, if you're only interested in the standard output (the file contents of `/etc/hosts`), you can reference `result.stdout` in your debug task:

```
- name: Check /etc/hosts file
  hosts: all
  tasks:
    - shell: cat /etc/hosts
      register: result


    - debug:
        var: result.stdout
```

Similarly, if you want to check the command's return code, you can reference `result.rc`:

```
- name: Check /etc/hosts file
  hosts: all
  tasks:
    - shell: cat /etc/hosts
      register: result


    - debug:
        var: result.rc
```

## Using Registered Variables Across Multiple Plays

Since registered variables are host-scoped, you can also access them in subsequent plays within the same playbook. For example:

```
- name: Check /etc/hosts file
  hosts: all
  tasks:
    - shell: cat /etc/hosts
      register: result


    - debug:
        var: result.rc


- name: Second Play
  hosts: all
  tasks:
    - debug:
        var: result.rc
```

This approach makes it possible to carry information from one set of tasks to another throughout your playbook.

## Verifying Command Output with Verbose Mode

Another convenient way to view task output is to run your playbook with the `-v` option. This provides verbose output without the need to add explicit debug statements. For more details, refer to the [Ansible Documentation](https://docs.ansible.com/ansible/latest/index.html).

That’s it for now. Practice these techniques to further enhance your Ansible playbooks and streamline your automation processes.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/15e6b588-6cfc-48cd-a773-e365ac3a32ef/lesson/72f0439e-d1c7-49a8-a169-c5889303216c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/15e6b588-6cfc-48cd-a773-e365ac3a32ef/lesson/0917132e-ef05-4669-8809-d1fd7902b9cc)**
>
> Practice lab
