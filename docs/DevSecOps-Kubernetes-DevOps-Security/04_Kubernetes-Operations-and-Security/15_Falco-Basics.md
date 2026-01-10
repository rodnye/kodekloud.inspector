# Falco Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Kubernetes-Operations-and-Security/Falco-Basics)

---

## Table of Contents

- Falco Basics
  - Key Features
  - How Falco Works
  - Example: Detecting a Shell in an Nginx Pod
  - Falco Outputs and UI Integration
  - Sample Alert Payload
  - Links and References
  - Watch Video
    - Falco Console Output

---

## Content

DevSecOps - Kubernetes DevOps & Security

Kubernetes Operations and Security

# Falco Basics

Falco is an open-source, cloud-native runtime security project that detects unexpected application behavior and alerts on threats at runtime. With a single sensor, Falco provides complete visibility into container and application activity using customizable rules.

## Key Features

- Real-time anomaly detection (e.g., unexpected shells, suspicious syscalls)
- Full container visibility via a kernel module or eBPF sensor
- Flexible alerting with extendable rule engine
- Multiple output channels for seamless integration

## How Falco Works

1.  A Falco sensor runs on each host (kernel module or eBPF).
2.  The sensor captures syscalls and container metadata.
3.  Events are evaluated against your Falco ruleset.
4.  When a rule condition is met, Falco emits an alert.

By default, Falco can detect scenarios such as:

- A shell spawned inside a container
- A server process spawning an unexpected child
- A sensitive file (e.g., `/etc/shadow`) being accessed

These often represent the first steps of an attacker who has gained container access.

## Example: Detecting a Shell in an Nginx Pod

Consider an Nginx pod in your Kubernetes cluster. If someone executes a shell inside that pod, Falco’s default rules will trigger:

```
kubectl exec -it nginx-pod -- /bin/bash
```

### Falco Console Output

```
15:00:46.499981927: Notice A shell was spawned in a container with an attached terminal (user=root uid=0 loginuid=19048
    container=9048a10aaf_7 (id=cbfbb5e6d496) shell=bash parent=func cmdline=bash terminal=34816
    container_id=cbfbb5e6d496 image=nginx)
Events detected: 6
Rule counts by severity:
    INFO:    2
    NOTICE:  3
    WARNING: 1


Triggered rules by rule name:
    Delete or rename shell history:    1
    Launch Privileged Container:       2
    Terminal shell in container:       3


Syscall event drop monitoring:
    - event drop detected: 0 occurrences
    - num times actions taken: 0
```

This alert provides:

- **Timestamp & Severity:** `Notice`
- **Container Details:** image `nginx`, container ID
- **Rule Name:** `Terminal shell in container`
- **Context:** user, shell type, parent process, etc.

> [!important]
> **Note**
>
> You can author custom Falco rules to match your environment’s threat models. See the [Falco Rules Language](https://falco.org/docs/rules/) for examples.

## Falco Outputs and UI Integration

Falco supports these output channels out of the box:

| Output Channel | Description                                |
| -------------- | ------------------------------------------ |
| stdout         | Print alerts to standard output            |
| file           | Write alerts to a local file               |
| gRPC           | Stream events over gRPC                    |
| http           | Send alerts via HTTP webhook               |
| shell          | Execute custom commands on alert detection |

To enhance Falco with a user interface and external notification services, deploy **[Falco Sidekick](https://github.com/falcosecurity/falcosidekick)**. Sidekick enables you to:

- Ship alerts to Slack, Elasticsearch, PagerDuty, and more
- Expose a web UI for browsing and filtering events
- Persist events in durable backends

> [!important]
> **Warning**
>
> Running Falco’s kernel module or eBPF sensor requires root privileges. Ensure your host policies and least-privilege guidelines are followed.

## Sample Alert Payload

Below is a structured alert payload that you could send to Slack or another endpoint:

```
user.name:    root
environment:  production
datacenter:   paris
fd.name:      /bin/hack
proc.cmdline: touch /bin/hack
rule:         Fake rule
priority:     Error
time:         2021-04-13 20:58:00.746609046 +0000 UTC
```

With Falco Sidekick, configure HTTP or webhook integrations to automatically push this payload into your alerting system of choice.

---

In this article, you learned how Falco uses a single sensor and rule engine to secure containerized workloads at runtime. You saw how to detect an interactive shell in a container, inspect the alert output, and integrate Falco with external systems via Sidekick. Next, explore writing custom Falco rules and deploying Falco on Kubernetes.

## Links and References

- [Falco Documentation](https://falco.org/docs/)
- [Falco Rules Language](https://falco.org/docs/rules/)
- [Falco Sidekick GitHub](https://github.com/falcosecurity/falcosidekick)
- [Kubernetes Exec Reference](https://kubernetes.io/docs/tasks/debug-application-cluster/exec-command/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/ab723f63-9891-41a6-97b6-aaf8b5a3e93e)**
>
> Watch video content
