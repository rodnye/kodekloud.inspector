# Falco Configuration Files - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Monitoring-Logging-and-Runtime-Security/Falco-Configuration-Files)

---

## Table of Contents

- Falco Configuration Files
  - Main Configuration File
  - Loading Rule Files
  - Additional Configuration Options
  - Defining Output Channels
  - Falco Rules Files
  - Hot Reloading the Falco Configuration
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

Monitoring Logging and Runtime Security

# Falco Configuration Files

In this article, we explore the configuration files used by Falco. You will learn how to update existing rules, add custom rules, and gain insight into how Falco processes these configurations at startup.

Previously, we covered writing basic Falco rules. Now, we will focus on where these rules are stored and how Falco loads them during initialization.

## Main Configuration File

Falco’s primary configuration file is a YAML file located at:

/etc/falco/falco.yaml

During the startup process, Falco reads this file and applies its settings. You can verify which configuration file is in use by checking the Falco service unit file (look for the "-c" flag) or by reviewing the logs with the journalctl command.

Below is an excerpt from the Falco logs confirming the configuration file in use:

```
-- Logs begin at Tue 2021-04-13 21:45:35 UTC, end at Tue 2021-04-13 21:51:31 UTC. --
Apr 13 21:45:36 node01 systemd[1]: Starting Falco: Container Native Runtime Security...
Apr 13 21:45:36 node01 systemd[1]: Started Falco: Container Native Runtime Security.
Apr 13 21:45:36 node01 falco[9817]: Falco version 0.28.0 (driver version 5c0b863ddade7a45568c0ac97d037422c9efb750)
Apr 13 21:45:36 node01 falco[9817]: Tue Apr 13 21:45:36 2021: Falco version 0.28.0 (driver version 5c0b863ddade7a45568c0ac97d037422c9efb750)
Apr 13 21:45:36 node01 falco[9817]: Falco initialized with configuration file /etc/falco/falco.yaml
Apr 13 21:45:36 node01 falco[9817]: Tue Apr 13 21:45:36 2021: Falco initialized with configuration file /etc/falco/falco.yaml
```

Within this configuration file, you will find settings that specify:

- The locations of rule files.
- Formatting options for logs and output messages.
- Configurable output channels, among other parameters.

## Loading Rule Files

Falco leverages the "rules_file" field in the configuration file to load all necessary rules. This field accepts a list of files that contain rule definitions. By default, the built-in rules are stored in `/etc/falco/falco_rules.yaml` and are always the first file in the list.

The order of files is crucial: if a rule appears in more than one file, the definition from the later file in the list will take precedence.

For example:

```
rules_file:
  - /etc/falco/falco_rules.yaml
  - /etc/falco/falco_rules.local.yaml
  - /etc/falco/k8s_audit_rules.yaml
  - /etc/falco/rules.d/
```

> [!important]
> **Note**
>
> Custom rules or modifications should be added to `/etc/falco/falco_rules.local.yaml` to avoid being overwritten by package updates.

## Additional Configuration Options

Other significant options in the Falco configuration include the JSON output setting and logging configurations. By enabling JSON output, events are logged in JSON format rather than plain text. Additional settings control where logs are sent (e.g., standard error, syslog) and the log level for Falco's own messages.

Below is an example of a configuration file with additional options:

```
rules_file:
  - /etc/falco/falco_rules.yaml
  - /etc/falco/falco_rules.local.yaml
  - /etc/falco/k8s_audit_rules.yaml
  - /etc/falco/rules.d
json_output: false
log_stderr: true
log_syslog: true
log_level: info
```

## Defining Output Channels

By default, Falco logs its events to standard output, but you can configure various output channels to suit your needs. For instance, you can enable file logging, program output to external tools (such as sending alerts via a Slack webhook), or even HTTP output to a specified endpoint.

The following example demonstrates how to configure different output channels:

```
stdout_output:
  enabled: true


file_output:
  enabled: true
  filename: /opt/falco/events.txt


program_output:
  enabled: true
  program: "jq '{text: .output}' | curl -d @- -X POST https://hooks.slack.com/services/XXXX"


http_output:
  enabled: true
  url: http://some.url/some/path/
```

After making changes to the configuration file, ensure you reload Falco’s configuration and restart the engine for the updates to take effect.

## Falco Rules Files

The file `/etc/falco/falco_rules.yaml` houses Falco's built-in rules, lists, and macros. An example of a built-in rule that detects when a terminal shell is started within a container is shown below:

```
- rule: Terminal shell in container
  desc: A shell was used as the entrypoint/exec point into a container with an attached terminal.
  condition: >
    spawned_process and container
    and shell_procs and proc.tty != 0
    and container_entrypoint
    and not user_expected_terminal_shell_in_container_conditions
  output: >
    A shell was spawned in a container with an attached terminal (user=%user.name user_loginuid=%user.loginuid %container.info
    shell=%proc.name parent=%proc.pname cmdline=%proc.cmdline terminal=%proc.tty container_id=%container.id image=%container.image.repository)
  priority: NOTICE
```

> [!important]
> **Warning**
>
> Direct modifications to `/etc/falco/falco_rules.yaml` may be lost during package updates. Always add custom changes to `/etc/falco/falco_rules.local.yaml`.

For example, to adjust the rule's priority from NOTICE to WARNING and to introduce a custom rule that triggers a critical alert for abnormal file reads, you can define the rules as follows:

```
- rule: Terminal shell in container
  desc: A shell was used as the entrypoint/exec point into a container with an attached terminal.
  condition: >
    spawned_process and container
    and shell_procs and proc.tty != 0
    and container_entrypoint
    and not user_expected_terminal_shell_in_container_conditions
  output: >
    A shell was spawned in a container with an attached terminal (user=%user.name user_loginuid=%user.loginuid %container.info
    shell=%proc.name parent=%proc.pname cmdline=%proc.cmdline terminal=%proc.tty container_id=%container.id image=%container.image.repository)
  priority: WARNING


- rule: Anomalous read in kodekloud/webapp pod
  desc: Detect suspicious file reads in a custom webapp container.
  condition: >
    open_read and container
    and container.image.repository == "kodekloud/simple-webapp"
    and fd.directory != "/opt/app"
  output: >
    A file was opened and read outside the /opt/app directory (user=%user.name user_loginuid=%user.loginuid
    container_id=%container.id image=%container.image.repository)
  priority: CRITICAL
```

After updating your rules, remember to reload the Falco configuration and restart the engine for the changes to be applied.

## Hot Reloading the Falco Configuration

To apply configuration changes without restarting the entire Falco service, you can use hot reloading. When running via systemd, Falco’s process ID (PID) is stored in `/var/run/falco.pid`. You can reload the configuration by sending a SIGHUP (signal hangup) to the Falco process. For example:

```
cat /var/run/falco.pid
7183
kill -1 $(cat /var/run/falco.pid)
```

This command instructs Falco to reload its configuration and restart the engine without a full service restart, ensuring your custom rules and settings are immediately active.

---

That concludes our in-depth guide on Falco configuration files. Now, put your newfound knowledge into practice by applying these concepts in your environment.

For more information on Falco and container security, be sure to check out the [Falco Documentation](https://falco.org/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/c0d849e1-54be-4d78-8936-6ce49434b88d/lesson/5e5fd05e-4725-4988-817c-6f8036b2f7e5)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/c0d849e1-54be-4d78-8936-6ce49434b88d/lesson/a17a72ac-3fa6-420f-b58d-3740a1ffe114)**
>
> Practice lab
