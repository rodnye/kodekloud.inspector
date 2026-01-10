# Logging - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Good-Practices-applied/Logging)

---

## Table of Contents

- Logging
  - Why Use Timestamped Logs
  - Quick Demo: Inline Timestamp
  - Reusable log Function
  - ISO 8601 Date Format
  - Best Practices
  - Links and References
  - Watch Video

---

## Content

Advanced Bash Scripting

Good Practices applied

# Logging

Track events with ISO 8601 timestamps by wrapping `date` calls in functions. This ensures consistent, machine-friendly logs across environments.

## Why Use Timestamped Logs

Timestamped entries help you:

- Debug sequences in real time
- Audit events in containerized workflows
- Reconstruct failures across distributed systems

## Quick Demo: Inline Timestamp

Use `echo` with command substitution to append UTC time:

```
echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ") : Script event happening"
```

Output:

```
2023-05-20T03:51:03Z : Script event happening
```

## Reusable `log` Function

Instead of repeating timestamp logic, encapsulate it:

```
#!/usr/bin/env bash
log() {
    echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ") ${*}" >&2
}


log "Hello World!"
```

Running `./log.sh` produces:

```
2023-06-01T05:42:45Z Hello World!
```

> [!important]
> **Note**
>
> Sending log messages to standard error (`>&2`) separates them from regular output and integrates better with redirection.

![The image features a diagram with a clock icon and connected nodes, accompanied by the text "Enabling us to track the flow and sequence of events," under the heading "Logging."](https://kodekloud.com/kk-media/image/upload/v1752868574/notes-assets/images/Advanced-Bash-Scripting-Logging/logging-clock-icon-diagram.jpg)

## ISO 8601 Date Format

Using `YYYY-MM-DDThh:mm:ssZ` guarantees consistency across locales. Common `date` specifiers:

| Specifier | Meaning               |
| --------- | --------------------- |
| %Y        | Year (4 digits)       |
| %m        | Month (01–12)         |
| %d        | Day of month (01–31)  |
| %H        | Hour (00–23)          |
| %M        | Minute (00–59)        |
| %S        | Second (00–59)        |
| %Z        | Time zone (e.g., UTC) |

Test formats:

```
date
date -u +"%Y-%m-%dT%H:%M:%SZ"
# 2023-05-19T15:53:19Z
```

> [!important]
> **Warning**
>
> Avoid over-logging. Too verbose logs can obscure critical information and degrade performance.

## Best Practices

- Write logs for humans: clear, concise, and actionable.
- Include only relevant data: timestamps, event messages, and context.
- Use consistent formatting to facilitate automated parsing.

![The image shows a signpost with two directions: "Judiciously and succinctly" marked with a red cross, and "Quality and relevance" marked with a green check.](https://kodekloud.com/kk-media/image/upload/v1752868575/notes-assets/images/Advanced-Bash-Scripting-Logging/signpost-judiciously-quality-relevance.jpg)

## Links and References

- [GNU date Manual](https://www.gnu.org/software/coreutils/manual/html_node/date-invocation.html)
- [ISO 8601 Standard Overview](https://en.wikipedia.org/wiki/ISO_8601)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/48c76c43-0257-44a4-b95d-36a8cceaff66/lesson/2bd191da-1441-4d28-a9b6-55fddb800b63)**
>
> Watch video content
