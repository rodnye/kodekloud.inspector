# Dynamic Inventory - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Other-Topics/Dynamic-Inventory)

---

## Table of Contents

- Dynamic Inventory
  - Converting a Static Inventory to a Dynamic Inventory Script
  - Using Dynamic Inventory with Cloud Providers
  - Other Inventory Formats and Plugins
  - Scripts vs. Plugins
  - Testing Your Inventory
  - Further Reading
  - Watch Video
  - Practice Lab

---

## Content

Ansible Advanced Course

Other Topics

# Dynamic Inventory

In this article, we explore how dynamic inventory files work in Ansible and highlight the differences between dynamic and static inventories. Traditionally, you might have used a static inventory file—manually created with hostnames, IP addresses, and grouping details. For example, a basic static inventory file in INI format would look like this:

```
/etc/ansible/hosts
web1 ansible_host=172.20.1.100 ansible_ssh_pass=Passw0rd
web2 ansible_host=172.20.1.101 ansible_ssh_pass=Passw0rd


[web_servers]
web1
web2
```

This static approach works well for small setups with just a few servers. However, when managing large environments with hundreds or thousands of servers—whether on-premise or in the cloud—the manual upkeep of a static inventory becomes impractical, especially when servers are frequently provisioned or decommissioned.

> [!important]
> **Dynamic Inventory Benefits**
>
> Dynamic inventory allows Ansible to programmatically retrieve host and group data at runtime by querying external sources, such as CMDBs or cloud provider APIs. This eliminates the need for manual updates, ensuring that your inventory stays current.

## Converting a Static Inventory to a Dynamic Inventory Script

Assume you have a static inventory as shown above. To convert it into a dynamic inventory, you can create a Python script—say, `inventory.py`—that outputs the inventory data in JSON format. You can then run your playbook with either the static file or the dynamic script:

```
$ ansible-playbook playbook.yml -i inventory.txt
$ ansible-playbook playbook.yml -i inventory.py
```

Below is a simplified example of what the `inventory.py` script might look like:

```
#!/usr/bin/env python


import json
import argparse


def get_inventory_data():
    return {
        "web_servers": {
            "hosts": ["web1", "web2"]
        },
        "_meta": {
            "hostvars": {
                "web1": {
                    "ansible_host": "172.20.1.100",
                    "ansible_ssh_pass": "Passw0rd"
                },
                "web2": {
                    "ansible_host": "172.20.1.101",
                    "ansible_ssh_pass": "Passw0rd"
                }
            }
        }
    }


def read_cli_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--list', action='store_true', help='List inventory')
    parser.add_argument('--host', help='Get inventory for a specific host')
    return parser.parse_args()


if __name__ == "__main__":
    args = read_cli_args()
    inventory_data = get_inventory_data()
    if args.list:
        print(json.dumps(inventory_data))
```

When you run this script with the `--list` argument, it produces the complete inventory in JSON format:

```
$ ./inventory.py --list
{
  "web_servers": {
    "hosts": [
      "web1",
      "web2"
    ]
  },
  "_meta": {
    "hostvars": {
      "web1": {
        "ansible_host": "172.20.1.100",
        "ansible_ssh_pass": "Passw0rd"
      },
      "web2": {
        "ansible_host": "172.20.1.101",
        "ansible_ssh_pass": "Passw0rd"
      }
    }
  }
}
```

If the `--host` argument is passed, the script should return the specific host's variables in JSON format. Although this example is basic, it effectively demonstrates the concept of a dynamic inventory in Ansible. In production environments, you might enhance the script to fetch live inventory data from a CMDB or cloud service API.

> [!important]
> **Exam Tip**
>
> In certification exams, you are not typically required to write such inventory scripts. However, you should understand how these scripts function and supply inventory data to Ansible.

## Using Dynamic Inventory with Cloud Providers

Dynamic inventory is especially useful when managing cloud instances. For instance, to manage AWS instances, you can use the [EC2 inventory script](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2). After downloading the `ec2.py` script from the Ansible GitHub repository, run your playbook with the following command:

```
$ ansible-playbook playbook.yml -i ec2.py
```

Since the script interacts with AWS, you must authenticate first. A common method is to export your AWS credentials:

```
$ export AWS_ACCESS_KEY_ID=AK123
$ export AWS_SECRET_ACCESS_KEY=ABC123
$ ansible-playbook playbook.yml -i ec2.py
```

Once authenticated, the script retrieves the necessary data from AWS, enabling your playbooks to manage EC2 instances seamlessly.

## Other Inventory Formats and Plugins

In addition to static (INI) and dynamic (Python script) inventories, Ansible also supports YAML inventory files. For example, the same inventory data can be expressed in YAML as follows:

```
web_servers:
  hosts:
    web1:
      ansible_host: 172.20.1.100
      ansible_ssh_pass: Passw0rd
    web2:
      ansible_host: 172.20.1.101
      ansible_ssh_pass: Passw0rd
```

Ansible uses various inventory plugins to process these different formats:

- **INI plugin**: Reads inventory data from INI files.
- **Script plugin**: Executes a script and interprets its JSON output as inventory.
- **YAML plugin**: Interprets YAML-formatted files.

These plugins are essentially Python scripts working in the background, and Ansible’s extensible design even allows you to write your own plugins for custom data sources (e.g., XML).

You can control which inventory plugins are active via the Ansible configuration file, typically located at `/etc/ansible/ansible.cfg`, under the `[inventory]` section:

```
[inventory]
enable_plugins = host_list, script, auto, yaml, ini
```

## Scripts vs. Plugins

While the dynamic inventory script is a tried-and-true method, Ansible now recommends using inventory plugins. Although inventory scripts are simple and can be implemented in any language, inventory plugins offer better integration with the Ansible ecosystem and additional functionality.

Consider the following example of an advanced dynamic inventory script written in Python:

```
#!/usr/bin/env python


import json
import argparse


def get_inventory_data():
    return {
        "web_servers": {
            "hosts": ["web1", "web2"]
        },
        "_meta": {
            "hostvars": {
                "web1": {
                    "ansible_host": "172.20.1.100",
                    "ansible_ssh_pass": "Passw0rd"
                },
                "web2": {
                    "ansible_host": "172.20.1.101",
                    "ansible_ssh_pass": "Passw0rd"
                }
            }
        }
    }


def read_cli_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--list', action='store_true', help='List inventory')
    parser.add_argument('--host', help='Get inventory for a specific host')
    return parser.parse_args()


if __name__ == "__main__":
    args = read_cli_args()
    inventory_data = get_inventory_data()
    if args.list:
        print(json.dumps(inventory_data))
```

Here’s an excerpt showcasing how an inventory plugin might extend Ansible’s functionality:

```
from __future__ import absolute_import, division, print_function
__metaclass__ = type


import hashlib
import os
import string


from ansible.errors import AnsibleError, AnsibleParserError
from ansible.inventory.group import to_safe_group_name as original_safe
from ansible.parsing.utils.addresses import parse_address
from ansible.plugins import AnsiblePlugin
from ansible.plugins.cache import CachePluginAdjudicator as CacheObject
from ansible.module_utils._text import to_bytes, to_native


display = Display()


def expand_hostname_range(line=None):
    if line:
        # Example: Replace delimiters and split to get numeric bounds
        line = line.replace('!', '|').replace('|', ' ').split('|')
        bounds = [int(x) for x in line]
        if len(bounds) not in (2, 3):
            raise AnsibleError("Host range must be in the format begin:end or begin:end:step")
```

This example demonstrates that while you can create a basic dynamic inventory with a standalone script, inventory plugins offer a more robust, integrated solution for advanced use cases.

## Testing Your Inventory

Debugging your inventory configuration is simple with the `ansible-inventory` command. This utility displays how Ansible interprets your inventory data. For example, when testing the EC2 inventory script, you might run:

```
$ ansible-inventory -i ec2.py
{
  "_meta": {
    "hostvars": {
      "172.20.1.109": {
        "ansible_ssh_pass": "PasswOrd",
        "ansible_ssh_user": "root",
        "ec2_region": "ca-central-1",
        "ec2_state": "Running"
      },
      "172.20.1.110": {
        "ansible_ssh_pass": "PasswOrd",
        "ansible_ssh_user": "root",
        "ec2_region": "us-east-1",
        "ec2_state": "Running"
      }
    }
  },
  "all": {
    "children": {
      "group": {
        "hosts": [
          "172.20.1.109",
          "172.20.1.110"
        ]
      },
      "ungrouped": {}
    }
  }
}
```

> [!important]
> **Inventory Debugging**
>
> Using the `ansible-inventory` command is an excellent way to troubleshoot issues with inventory variables and to ensure that your dynamic inventory is working as expected.

---

That concludes our exploration of dynamic inventory in Ansible. Experiment with both static and dynamic inventories to find the best approach for your environment, and leverage Ansible's extensive inventory plugins for a streamlined and scalable automation experience.

## Further Reading

- [Ansible Documentation](https://docs.ansible.com/)
- [Dynamic Inventory Examples](https://docs.ansible.com/ansible/latest/user_guide/intro_dynamic_inventory.html)
- [EC2 Dynamic Inventory Script](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/5ce7e345-0c21-4fba-8735-a4d9f3302e0e/lesson/b09f2787-7c47-4441-b11f-878d781b2cec)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/5ce7e345-0c21-4fba-8735-a4d9f3302e0e/lesson/51af794b-f7f3-45c1-891c-1f85186a65ca)**
>
> Practice lab
