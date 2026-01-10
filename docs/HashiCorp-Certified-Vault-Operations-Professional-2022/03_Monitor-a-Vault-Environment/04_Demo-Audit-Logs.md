# Demo Audit Logs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Monitor-a-Vault-Environment/Demo-Audit-Logs)

---

## Table of Contents

- Demo Audit Logs
  - Table of Contents
  - 1. List Existing Audit Devices
  - 2. Disable an Audit Device
  - 3. Enable the File Audit Device
  - 4. Generate Audit Events
  - 5. View and Pretty-Print Audit Logs
  - 6. Disable the File Audit Device
  - Summary of Commands
  - Links and References
  - Watch Video
  - Practice Lab
    - Raw JSON Output
    - Pretty-Print with jq

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Monitor a Vault Environment

# Demo Audit Logs

In this lesson, you’ll learn how to configure and inspect Vault’s audit device. We’ll cover:

- Listing existing audit devices
- Disabling and re-enabling audit devices
- Generating audit events
- Viewing and pretty-printing audit logs
- Cleaning up when finished

For more details, see the official [Vault Audit Device documentation](https://www.vaultproject.io/docs/audit).

---

## Table of Contents

1.  [List Existing Audit Devices](#1-list-existing-audit-devices)
2.  [Disable an Audit Device](#2-disable-an-audit-device)
3.  [Enable the File Audit Device](#3-enable-the-file-audit-device)
4.  [Generate Audit Events](#4-generate-audit-events)
5.  [View and Pretty-Print Audit Logs](#5-view-and-pretty-print-audit-logs)
6.  [Disable the File Audit Device](#6-disable-the-file-audit-device)

---

## 1\. List Existing Audit Devices

To see which audit devices are currently enabled, run:

```
vault audit list
```

Example output:

```
Path   Type   Description
----   ----   ----------
logs/  file   n/a
```

---

## 2\. Disable an Audit Device

If you need a clean slate, disable any existing audit device first:

```
vault audit disable logs
```

> Success! Disabled audit device (if it was enabled) at: logs/

Verify there are no active audit devices:

```
vault audit list
```

Output:

```
No audit devices are enabled.
```

---

## 3\. Enable the File Audit Device

Configure Vault to write audit logs to a local file:

> [!important]
> **Note**
>
> Be mindful of disk usage—audit files can grow quickly depending on the volume of requests.

```
vault audit enable file file_path="/Users/bk/vault/vault_audit.log"
```

> Success! Enabled the file audit device at: file/

Confirm it’s active:

```
vault audit list
```

Output:

```
Path   Type   Description
----   ----   ----------
file/  file   n/a
```

Ensure the log file appears in your working directory:

```
ls
```

Sample result:

```
vault_audit.log  vault.hcl  data/
```

---

## 4\. Generate Audit Events

Perform common Vault operations to create log entries:

1.  List all enabled secrets engines:

    ```
    vault secrets list
    ```

2.  Write a KV secret:

    ```
    vault kv put kv/hcvop certification="HashiCorp"
    ```

3.  Delete the secret:

    ```
    vault kv delete kv/hcvop
    ```

4.  Clear the screen to prepare for log inspection:

    ```
    clear
    ```

---

## 5\. View and Pretty-Print Audit Logs

### Raw JSON Output

Audit logs are stored as newline-delimited JSON. To view raw entries:

```
cat /Users/bk/vault/vault_audit.log
```

You’ll see entries like:

```
{"time":"2023-10-11T17:10:19.747Z","type":"response", …}
```

### Pretty-Print with jq

For easier reading, pipe through `jq`:

```
cat /Users/bk/vault/vault_audit.log | jq
```

Example of a request/response entry:

```
{
  "time": "2023-10-11T17:10:19.747Z",
  "type": "response",
  "auth": { /* … */ },
  "request": {
    "id": "request_id",
    "operation": "operation_name",
    /* … */
  }
}
```

Example of a KV delete operation:

```
{
  "request": {
    "operation": "delete",
    "mount_type": "kv",
    /* … */
  },
  "path": "kv/data/hcvop",
  "response": { "mount_type": "kv" }
}
```

---

## 6\. Disable the File Audit Device

When you’re done, remove the audit device to prevent further log growth:

> [!important]
> **Warning**
>
> Disabling the audit device stops new entries but does not delete existing logs. Archive or remove them manually if needed.

```
vault audit disable file
```

> Success! Disabled audit device (if it was enabled) at: file/

Verify no devices remain:

```
vault audit list
```

Output:

```
No audit devices are enabled.
```

---

## Summary of Commands

| Task                            | Command                                                 |
| ------------------------------- | ------------------------------------------------------- | --- |
| List audit devices              | `vault audit list`                                      |
| Disable an audit device         | `vault audit disable <path>`                            |
| Enable file audit device        | `vault audit enable file file_path="…/vault_audit.log"` |
| Generate sample events          | `vault kv put` / `vault kv delete`                      |
| View raw logs                   | `cat vault_audit.log`                                   |
| Pretty-print logs               | `cat vault_audit.log \\                                 | jq` |
| Disable file audit device again | `vault audit disable file`                              |

---

## Links and References

- [Vault Audit Devices](https://www.vaultproject.io/docs/audit)
- [HashiCorp Vault CLI Commands](https://www.vaultproject.io/docs/commands)
- [jq Manual](https://stedolan.github.io/jq/manual/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/36cf9665-35d2-4dbc-9ddc-fc00ca80cbd4/lesson/236dc78c-af33-4815-90fc-c86b6ee99ba9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/36cf9665-35d2-4dbc-9ddc-fc00ca80cbd4/lesson/db266764-4afa-4364-a1fd-eed8fb3a04fe)**
>
> Practice lab
