# Monitor and Understand Audit Logs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Monitor-a-Vault-Environment/Monitor-and-Understand-Audit-Logs)

---

## Table of Contents

- Monitor and Understand Audit Logs
  - Supported Audit Devices
  - Audit Log Workflow
  - Enabling an Audit Device
  - Listing and Disabling Audit Devices
  - Inspecting a Sample Audit Entry
  - Permissions for Audit Device Management
  - Links and References
  - Watch Video
    - Safety and High Availability

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Monitor a Vault Environment

# Monitor and Understand Audit Logs

In this guide, you’ll learn how to monitor HashiCorp Vault activity by capturing every request and response through audit logs. Audit logs provide a comprehensive, tamper-evident record of all Vault operations—crucial for security, compliance, and troubleshooting.

![The image is a slide titled "Introduction to Audit Devices," detailing how to keep a detailed log of authenticated requests and responses, format logs using JSON, hash sensitive information with HMAC-SHA256, and protect log files. It includes a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878574/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Monitor-and-Understand-Audit-Logs/introduction-to-audit-devices-logs.jpg)

Audit logs are stored in JSON by default, making them easy to query with tools like `jq`. Vault automatically hashes any sensitive data (tokens, secrets) using HMAC-SHA256 and a unique salt, ensuring that no raw secret ever appears in logs.

> [!important]
> **Warning**
>
> Never disable HMAC hashing in production. Without hashing, sensitive values and tokens may be exposed in plaintext.

Always secure your log files with strict permissions and immutable storage to maintain an unalterable audit trail.

## Supported Audit Devices

Vault offers three primary audit devices. You can mount one or more simultaneously to ensure high availability.

| Device Type | Description                                            | Common Use Case                      |
| ----------- | ------------------------------------------------------ | ------------------------------------ |
| **file**    | Appends JSON logs to a local file.                     | Simple setups; file rotation by user |
| **syslog**  | Sends entries to a local syslog daemon or remote host. | Centralized logging via syslog       |
| **socket**  | Streams logs over TCP, UDP, or UNIX sockets.           | Guaranteed delivery with TCP stream  |

![The image is an infographic detailing the audit devices supported by Vault, including File, Syslog, and Socket, with brief descriptions of each. It also features a Vault certification badge and a cartoon character at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878575/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Monitor-and-Understand-Audit-Logs/vault-audit-devices-infographic.jpg)

### Safety and High Availability

Audit devices are disabled by default. As soon as you enable one, Vault will require successful log writes before processing any request. If logging fails (e.g., disk full, syslog unreachable), Vault halts client operations—prioritizing safety over availability. To mitigate this, enable multiple audit devices (for example, `file` and `syslog`) so that at least one remains writable.

> [!important]
> **Note**
>
> Enabling two audit devices ensures redundancy. If one path fails, Vault continues logging on the other.

![The image provides important information about audit devices in Vault, emphasizing the need for multiple audit devices and the requirement for Vault to write logs before completing requests, prioritizing safety over availability. It also notes that if Vault cannot write to a persistent log, it will stop responding to client requests.](https://kodekloud.com/kk-media/image/upload/v1752878576/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Monitor-and-Understand-Audit-Logs/vault-audit-devices-logs-safety.jpg)

## Audit Log Workflow

1.  **Configure Audit Devices**  
    Vault Admin mounts one or more audit devices using `vault audit enable`.
2.  **Write Logs**  
    Vault writes JSON entries to the configured device(s).
3.  **Collect Logs**  
    A local collector (e.g., Fluentd, Splunk Forwarder) tails the file or listens on syslog/socket.
4.  **Aggregate & Analyze**  
    Logs are forwarded to SIEM or monitoring platforms (Splunk, Datadog).
5.  **Alerting & Dashboards**  
    Create dashboards and alerts—for example, when a root token is created or a policy is changed.

![The image illustrates an "Audit Log Workflow" showing the process from a Vault Admin configuring an audit device, to logs being collected by a Vault Server, and then sent to a Log Aggregation Platform for consumption and analysis.](https://kodekloud.com/kk-media/image/upload/v1752878577/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Monitor-and-Understand-Audit-Logs/audit-log-workflow-vault-server-logs.jpg)

## Enabling an Audit Device

Use `vault audit enable` with the target type and parameters:

```
# Enable the default file audit device
vault audit enable file file_path="/var/log/vault_audit.log"
# Enable file audit on a custom mount point "logs/"
vault audit enable -path=logs file \
  file_path="/var/log/audit.log"
# Output: Success! Enabled the file audit device at: logs/
```

For **syslog** or **socket**, replace `file` with `syslog` or `socket` and add the required flags.  
Run `vault audit enable -help` for full parameter details.

## Listing and Disabling Audit Devices

Quickly view or remove audit devices:

```
# List all enabled audit devices
vault audit list
# Example output:
# Path    Type    Description
# ----    ----    -----------
# file/   file    n/a
# Disable the syslog audit device
vault audit disable syslog/
# Output: Success! Disabled audit device at: syslog/
```

## Inspecting a Sample Audit Entry

Pipe JSON logs through `jq` for readability:

```
cat /var/log/vault_audit.log | jq
```

```
{
  "time": "2022-12-25T21:20:12.40607Z",
  "type": "response",
  "auth": {
    "client_token": "hmac-sha256:c134d4c72a6cd891102c654b0b897f3b747a3366e88b6b2fc25247bd977ec949",
    "display_name":"root",
    "policies":    ["root"],
    "token_type":  "service",
    "issue_time":  "2022-12-25T11:07:35-04:00"
  },
  "request": {
    "id":        "96801004-f2a5-a994-bc7a-0b15e3739db9",
    "operation": "update",
    "path":      "secret/data/myapp"
  },
  "response": {
    "status": "success"
  }
}
```

Notice how tokens and sensitive fields are hashed rather than exposed in plain text.

## Permissions for Audit Device Management

To grant a policy permission to create, read, and manage an audit device, include the `sudo` capability:

```
# Policy to manage the file audit device
path "sys/audit/file" {
  capabilities = [
    "create",
    "read",
    "update",
    "delete",
    "list",
    "sudo"
  ]
}
```

Without `sudo`, roles cannot enable, disable, or reconfigure audit devices.

## Links and References

- [Vault Audit Devices](https://www.vaultproject.io/docs/audit)
- [Vault CLI Documentation](https://www.vaultproject.io/docs/commands/audit)
- [JSON Query with jq](https://stedolan.github.io/jq/)

---

This concludes our overview of Vault audit devices and log management. In the next hands-on lab, you’ll enable devices, generate log entries, and configure a log collector for centralized monitoring.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/36cf9665-35d2-4dbc-9ddc-fc00ca80cbd4/lesson/bc202187-a5f5-43d7-a625-b7e904688541)**
>
> Watch video content
