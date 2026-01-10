# Configuration files - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Core-Components/Configuration-files)

---

## Table of Contents

- Configuration files
  - Overriding Configuration Settings
  - Setting Environment Variables
  - Exploring Configuration Options
  - Watch Video
  - Practice Lab

---

## Content

Ansible Advanced Course

Core Components

# Configuration files

In this lesson, we will explore configuration files in Ansible and understand how they influence Ansible's behavior. When you install Ansible, a default configuration file is generated. On Windows, for example, it might be located at `C:\ansible\ansible.cfg`, while on Linux the default file is commonly found at `/etc/ansible/ansible.cfg`. This file regulates Ansible's default behavior by splitting settings into several sections. The primary section is usually at the top (commonly named `[defaults]`), followed by sections for inventory, privilege escalation, SSH connection, colors, and others. Each section contains various options with corresponding values.

For example, a typical configuration file may appear as follows:

```
/etc/ansible/ansible.cfg
[default]
[inventory]
[privilege_escalation]
[paramiko_connection]
[ssh_connection]
[persistent_connection]
[colors]
```

These sections define settings such as the default inventory file location, log file path, directories for modules, roles, or plugins, as well as options like fact gathering and SSH connection timeouts. Consider the following sample configuration:

```
[defaults]
inventory          = /etc/ansible/hosts
log_path           = /var/log/ansible.log
library            = /usr/share/my_modules/
roles_path         = /etc/ansible/roles
action_plugins     = /usr/share/ansible/plugins/action
gathering          = implicit
# SSH timeout
timeout            = 10
forks              = 5


[inventory]
enable_plugins     = host_list, virtualbox, yaml, constructed
```

This configuration sets essential parameters:

- Inventory location
- Log file location
- Module library and roles path
- Behavior controlling fact gathering
- Connection timeout and the number of hosts to target simultaneously when executing playbooks

Under the `[inventory]` section, options are provided to enable specific inventory plugins.

> [!important]
> **Tip**
>
> For more detailed configuration options and explanations, refer to the [Ansible Configuration Documentation](https://docs.ansible.com/ansible/latest/installation_guide/intro_configuration.html).

---

## Overriding Configuration Settings

The values used in the default configuration file apply whenever you run playbooks from any location on your control machine. For instance, if you have multiple playbooks—each for web, database, or network tasks—you might require tailored settings for each. Examples include:

- **Web playbooks:** Disable fact gathering.
- **Database playbooks:** Enable fact gathering but disable colored output.
- **Network playbooks:** Extend the SSH timeout to 20 seconds.

To handle these scenarios, you can copy the default configuration file into each playbook's directory and modify only the necessary parameters. When running a playbook, Ansible first searches for an `ansible.cfg` in the current directory; if it is found, that file is used. Otherwise, Ansible defaults to `/etc/ansible/ansible.cfg`.

What if you want to use a configuration file stored in an alternative location (e.g., `/opt/ansible-web.cfg`) for multiple playbooks? You can specify the location of this configuration file through the `ANSIBLE_CONFIG` environment variable before running your playbook. For example:

```
ANSIBLE_CONFIG=/opt/ansible-web.cfg
```

Ansible determines which configuration file to use based on the following order of precedence:

| Priority | Configuration File Source                                        |
| -------- | ---------------------------------------------------------------- |
| 1        | The file specified by the `ANSIBLE_CONFIG` environment variable. |
| 2        | The `ansible.cfg` file in the current directory.                 |
| 3        | The `ansible.cfg` file in the user's home directory.             |
| 4        | The default `ansible.cfg` file in `/etc/ansible/`.               |

_Note:_ These files do not have to include every parameter; only the parameters you wish to override need to be specified. Parameters not defined in the highest-priority file will inherit their values from the next available file in the priority chain.

For example, if your storage playbooks should use the default configuration except for modifying the fact-gathering behavior, you don't need to copy the entire file. Instead, you can override just the necessary parameter. If the default configuration has:

```
/etc/ansible/ansible.cfg
gathering = implicit
```

You can change it to explicit by setting:

```
ANSIBLE_GATHERING=explicit
```

---

## Setting Environment Variables

Ansible supports determining configuration parameters based on environment variables. Generally, you can convert the parameter name to uppercase and prefix it with `ANSIBLE_`. In this case, `gathering` becomes `ANSIBLE_GATHERING`.

There are various ways to set this environment variable:

- **Inline with the playbook command:**

  ```
  ANSIBLE_GATHERING=explicit ansible-playbook playbook.yml
  ```

- **Export for the duration of a shell session:**

  ```
  export ANSIBLE_GATHERING=explicit
  ansible-playbook playbook.yml
  ```

If you require persistent configuration across sessions or for multiple users, it is recommended to create a local copy of the configuration file within your playbook directory, update the necessary parameter, and check this file into your version control system.

> [!important]
> **Warning**
>
> Avoid modifying environment variables without verifying their impact on other playbooks. Always test configuration changes in a controlled environment.

---

## Exploring Configuration Options

To explore the available configuration options and view their corresponding environment variables, you can utilize the following commands:

```
$ ansible-config list  # Lists all configurations and their default values
$ ansible-config view  # Shows the configuration file currently active
```

If you are unsure which setting is active, the `ansible-config dump` command can help you. It displays a comprehensive list of all settings that Ansible has picked up, along with their source:

```
$ ansible-config dump  # Shows the current settings
$ export ANSIBLE_GATHERING=explicit
$ ansible-config dump | grep GATHERING
DEFAULT_GATHERING(env: ANSIBLE_GATHERING) = explicit
```

The output above confirms that the `gathering` parameter is set to explicit and shows that it was derived from the environment variable `ANSIBLE_GATHERING`. This feature is particularly useful for troubleshooting configuration issues.

---

That’s it for this lesson. You can now apply your knowledge by practicing with Ansible configuration files and enhancing your skills. The configuration file is well documented and self-explanatory, allowing you to identify and modify the necessary options. We will be testing some of these configuration skills during future challenges. Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/a8141931-256e-4d6a-8534-d83e82ae27c8/lesson/00961e6e-a6a9-4a56-a95c-633457fe398e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/a8141931-256e-4d6a-8534-d83e82ae27c8/lesson/2228aacd-a348-4ca4-9d74-7cac0ad238ea)**
>
> Practice lab
